#!/usr/bin/env node
/**
 * Local multi-platform syndication (dry-run by default).
 *
 *   npm run syndicate -- --list
 *   npm run syndicate -- --id taobao-outsource-group-half-year
 *   npm run syndicate -- --all
 *   npm run syndicate -- --id xxx --platforms cnblogs,devto
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

function parseArgs(argv) {
  const opts = {
    list: false,
    all: false,
    id: null,
    platforms: null,
    locale: "zh",
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
    else if (a === "--help" || a === "-h") opts.help = true;
  }
  if (opts.platforms) {
    opts.platforms = opts.platforms.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return opts;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(`Usage:
  npm run syndicate -- --list
  npm run syndicate -- --id <post-id>
  npm run syndicate -- --all
  npm run syndicate -- --id <id> --platforms cnblogs,juejin,devto

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
      console.log(`  ${pl.id.padEnd(10)} ${pl.name}  [${pl.publish}]  ${pl.note}`);
    }
    await refreshManifest();
    if (!opts.id && !opts.all) {
      console.log("\nTip: npm run syndicate -- --id <post-id>");
      console.log("     then open http://127.0.0.1:8787/tools/syndicate/");
    }
    if (!opts.id && !opts.all) return;
  }

  const { posts } = await listPublishablePosts();
  const ids = opts.all ? posts.map((p) => p.id) : [opts.id];

  for (const id of ids) {
    console.log(`\n→ syndicating ${id} …`);
    const { summary } = await syndicatePost(id, {
      platforms: opts.platforms,
      locale: opts.locale,
      mode: "dry-run",
    });
    console.log(`  title: ${summary.title}`);
    console.log(`  canonical: ${summary.canonical}`);
    for (const p of summary.platforms) {
      console.log(`  ✓ ${p.platformName.padEnd(8)} → ${p.file}  (${p.charCount} chars)`);
    }
  }

  console.log(`\nDone. Preview: http://127.0.0.1:8787/tools/syndicate/`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
