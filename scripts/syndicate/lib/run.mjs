import fs from "node:fs/promises";
import path from "node:path";
import { ROOT, loadPosts, loadArticle, pickLocale } from "./load.mjs";
import { PLATFORMS, buildAllPayloads } from "./platforms.mjs";
import { publishPayload, canAutoPublish } from "./publish.mjs";
import { loadEnv } from "./env.mjs";

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

async function readRemoteMeta(jobDir, platformId) {
  try {
    const raw = await fs.readFile(path.join(jobDir, `${platformId}.json`), "utf8");
    const meta = JSON.parse(raw);
    return meta.remote || null;
  } catch {
    return null;
  }
}

/**
 * @param {string} id
 * @param {{
 *   platforms?: string[],
 *   locale?: string,
 *   mode?: "dry-run" | "publish",
 *   live?: boolean,
 * }} options
 */
export async function syndicatePost(id, options = {}) {
  const {
    platforms = PLATFORMS.map((p) => p.id),
    locale = "zh",
    mode = "dry-run",
    live = false,
  } = options;

  loadEnv();

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

    const prevRemote = await readRemoteMeta(jobDir, payload.platform);
    let status = mode === "dry-run" ? "written" : "pending";
    let remote = prevRemote;
    let publishError = null;

    if (mode === "publish") {
      if (!canAutoPublish(payload.platform)) {
        status = "skipped-manual";
      } else {
        try {
          const pub = await publishPayload(
            { ...payload, body: payload.apiBody || payload.body },
            {
              live,
              remoteId: prevRemote?.id || null,
            },
          );
          if (pub?.skipped) {
            status = "skipped-manual";
          } else {
            remote = {
              id: pub.remoteId,
              url: pub.url,
              published: pub.published,
              updatedAt: stamp,
              live,
            };
            status = pub.published ? "published" : "drafted";
          }
        } catch (err) {
          status = "error";
          publishError = err.message || String(err);
        }
      }
    }

    const result = {
      ...payload,
      mode,
      live,
      status,
      remote,
      publishError,
      file: path.relative(ROOT, file).replace(/\\/g, "/"),
      writtenAt: stamp,
    };

    const { body: _b, apiBody: _a, ...meta } = result;
    await fs.writeFile(
      path.join(jobDir, `${payload.platform}.json`),
      JSON.stringify(meta, null, 2),
      "utf8",
    );
    results.push(result);
  }

  const summary = {
    id,
    title: pickLocale(article.title || post.title, locale),
    canonical: results[0]?.canonical,
    mode,
    live,
    writtenAt: stamp,
    platforms: results.map((r) => ({
      platform: r.platform,
      platformName: r.platformName,
      file: r.file,
      charCount: r.charCount,
      publish: r.publish,
      autoPublish: r.autoPublish,
      status: r.status,
      remote: r.remote || null,
      publishError: r.publishError || null,
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
