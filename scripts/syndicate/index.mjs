#!/usr/bin/env node
/**
 * Local multi-platform syndication.
 *
 *   npm run syndicate -- --list
 *   npm run syndicate -- --id taobao-outsource-group-half-year
 *   npm run syndicate -- --all
 *   npm run syndicate -- --id xxx --platforms cnblogs,devto,qiita
 *
 * Auto-publish (Dev.to + Qiita; needs tokens in .env):
 *   npm run syndicate -- --id xxx --platforms devto,qiita --publish
 *   npm run syndicate -- --id xxx --platforms devto,qiita --publish --live
 *
 * Preview UI: npm run dev → http://127.0.0.1:8787/tools/syndicate/
 */
import {
  listPublishablePosts,
  syndicatePost,
  refreshManifest,
} from "./lib/run.mjs";
import { PLATFORMS } from "./lib/platforms.mjs";
import { pickLocale } from "./lib/load.mjs";
import { loadEnv } from "./lib/env.mjs";

function parseArgs(argv) {
  const opts = {
    list: false,
    all: false,
    id: null,
    platforms: null,
    locale: "zh",
    publish: false,
    live: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--list") opts.list = true;
    else if (a === "--all") opts.all = true;
    else if (a === "--id") opts.id = argv[++i];
    else if (a.startsWith("--id=")) opts.id = a.slice(5);
    else if (a === "--platforms") opts.platforms = argv[++i];
    else if (a.startsWith("--platforms=")) opts.platforms = a.slice(12);
    else if (a === "--locale") opts.locale = argv[++i];
    else if (a === "--publish") opts.publish = true;
    else if (a === "--live") {
      opts.live = true;
      opts.publish = true;
    } else if (a === "--help" || a === "-h") opts.help = true;
  }
  if (opts.platforms) {
    opts.platforms = opts.platforms.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return opts;
}

function statusLine(p) {
  const mark = p.status === "error" ? "✗" : "✓";
  const bits = [`${mark} ${p.platformName.padEnd(8)} → ${p.file}`];
  if (p.status && p.status !== "written") bits.push(`[${p.status}]`);
  if (p.remote?.url) bits.push(p.remote.url);
  if (p.publishError) bits.push(`ERROR: ${p.publishError}`);
  else bits.push(`(${p.charCount} chars)`);
  return `  ${bits.join(" ")}`;
}

async function main() {
  loadEnv();
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(`Usage:
  npm run syndicate -- --list
  npm run syndicate -- --id <post-id>
  npm run syndicate -- --all
  npm run syndicate -- --id <id> --platforms cnblogs,juejin,devto,qiita

Auto-publish (tokens in .env — see .env.example):
  npm run syndicate -- --id <id> --platforms devto,qiita --publish
  npm run syndicate -- --id <id> --platforms devto,qiita --publish --live

  --publish   Call Dev.to / Qiita APIs (draft / private by default)
  --live      Make public (implies --publish)

Platforms: ${PLATFORMS.map((p) => p.id).join(", ")}
Output:    syndicate-out/
Preview:   http://127.0.0.1:8787/tools/syndicate/
`);
    return;
  }

  if (opts.list || (!opts.id && !opts.all)) {
    const { posts } = await listPublishablePosts();
    console.log(`Publishable posts (${posts.length}):\n`);
    for (const p of posts) {
      console.log(`  ${p.id}`);
      console.log(`    ${pickLocale(p.title, "zh")}`);
      console.log(`    ${p.href}`);
      console.log("");
    }
    console.log("Platforms:");
    for (const pl of PLATFORMS) {
      const flag = pl.autoPublish ? "auto" : pl.publish;
      console.log(`  ${pl.id.padEnd(10)} ${pl.name}  [${flag}]  ${pl.note}`);
    }
    await refreshManifest();
    if (!opts.id && !opts.all) {
      console.log("\nTip: npm run syndicate -- --id <post-id>");
      console.log("     npm run syndicate -- --id <post-id> --platforms devto,qiita --publish");
      console.log("     then open http://127.0.0.1:8787/tools/syndicate/");
    }
    if (!opts.id && !opts.all) return;
  }

  const { posts } = await listPublishablePosts();
  const ids = opts.all ? posts.map((p) => p.id) : [opts.id];
  const mode = opts.publish ? "publish" : "dry-run";

  if (opts.publish && opts.live) {
    console.log("\n⚠  --live: will make Dev.to / Qiita posts PUBLIC");
  } else if (opts.publish) {
    console.log("\n→ --publish: Dev.to draft / Qiita private (review then open with --live)");
  }

  let hadError = false;
  for (const id of ids) {
    console.log(`\n→ syndicating ${id} …`);
    const { summary } = await syndicatePost(id, {
      platforms: opts.platforms,
      locale: opts.locale,
      mode,
      live: opts.live,
    });
    console.log(`  title: ${summary.title}`);
    console.log(`  canonical: ${summary.canonical}`);
    for (const p of summary.platforms) {
      console.log(statusLine(p));
      if (p.status === "error") hadError = true;
    }
  }

  console.log(`\nDone. Preview: http://127.0.0.1:8787/tools/syndicate/`);
  if (hadError) process.exit(1);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
