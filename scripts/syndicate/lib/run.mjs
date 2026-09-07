import fs from "node:fs/promises";
import path from "node:path";
import { ROOT, loadPosts, loadArticle, pickLocale } from "./load.mjs";
import { PLATFORMS, buildAllPayloads } from "./platforms.mjs";

export const OUT_DIR = path.join(ROOT, "syndicate-out");

export async function listPublishablePosts() {
  const { posts, categories } = await loadPosts();
  const out = [];
  for (const post of posts) {
    if (post.draft || !post.href || post.href === "#") continue;
    try {
      await loadArticle(post.id);
      out.push(post);
    } catch {
      /* no article body yet */
    }
  }
  return { posts: out, categories };
}

export async function syndicatePost(id, options = {}) {
  const {
    platforms = PLATFORMS.map((p) => p.id),
    locale = "zh",
    mode = "dry-run",
  } = options;

  const { posts } = await loadPosts();
  const post = posts.find((p) => p.id === id);
  if (!post) throw new Error(`Post not found: ${id}`);
  if (post.draft) throw new Error(`Post is draft: ${id}`);

  const article = await loadArticle(id);
  const payloads = buildAllPayloads(post, article, platforms, locale);

  const stamp = new Date().toISOString();
  const jobDir = path.join(OUT_DIR, id);
  await fs.mkdir(jobDir, { recursive: true });

  const results = [];
  for (const payload of payloads) {
    const file = path.join(jobDir, `${payload.platform}.md`);
    await fs.writeFile(file, payload.body, "utf8");
    const metaFile = path.join(jobDir, `${payload.platform}.json`);
    const result = {
      ...payload,
      mode,
      status: mode === "dry-run" ? "written" : "pending",
      file: path.relative(ROOT, file).replace(/\\/g, "/"),
      writtenAt: stamp,
    };
    // Drop huge body from json duplicate — keep path
    const { body: _b, ...meta } = result;
    await fs.writeFile(metaFile, JSON.stringify(meta, null, 2), "utf8");
    results.push(result);
  }

  const summary = {
    id,
    title: pickLocale(article.title || post.title, locale),
    canonical: results[0]?.canonical,
    mode,
    writtenAt: stamp,
    platforms: results.map((r) => ({
      platform: r.platform,
      platformName: r.platformName,
      file: r.file,
      charCount: r.charCount,
      publish: r.publish,
      status: r.status,
    })),
  };

  await fs.writeFile(
    path.join(jobDir, "summary.json"),
    JSON.stringify(summary, null, 2),
    "utf8",
  );

  await refreshManifest();
  return { summary, results };
}

export async function refreshManifest() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  let entries = [];
  try {
    const dirs = await fs.readdir(OUT_DIR, { withFileTypes: true });
    for (const d of dirs) {
      if (!d.isDirectory()) continue;
      try {
        const raw = await fs.readFile(
          path.join(OUT_DIR, d.name, "summary.json"),
          "utf8",
        );
        entries.push(JSON.parse(raw));
      } catch {
        /* skip */
      }
    }
  } catch {
    entries = [];
  }
  entries.sort((a, b) => String(b.writtenAt).localeCompare(String(a.writtenAt)));
  const manifest = {
    generatedAt: new Date().toISOString(),
    platforms: PLATFORMS,
    jobs: entries,
  };
  await fs.writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8",
  );
  return manifest;
}

export async function readManifest() {
  try {
    const raw = await fs.readFile(path.join(OUT_DIR, "manifest.json"), "utf8");
    return JSON.parse(raw);
  } catch {
    return refreshManifest();
  }
}

export async function readPayloadBody(id, platform) {
  const file = path.join(OUT_DIR, id, `${platform}.md`);
  return fs.readFile(file, "utf8");
}
