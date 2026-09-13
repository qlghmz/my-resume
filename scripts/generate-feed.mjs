import fs from "node:fs/promises";
import path from "node:path";
import { ROOT, pickLocale, canonicalUrl, siteOrigin } from "./syndicate/lib/load.mjs";
import { listPublishablePosts } from "./syndicate/lib/run.mjs";

const FEED_META = {
  title: "董家辉 · 博客",
  subtitle: "嵌入式 Linux、I2C、RK3588 RGA、AI 视频等技术笔记。",
  authorName: "董家辉",
};

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** posts.js uses `2026.09.08` or `2025.12` (year-month). */
function parsePostDate(dateStr) {
  if (!dateStr) return new Date(0);
  const parts = dateStr.split(".").map((part) => Number.parseInt(part, 10));
  const [year, month = 1, day = 1] = parts;
  if (!Number.isFinite(year)) return new Date(0);
  return new Date(Date.UTC(year, (month || 1) - 1, day || 1));
}

function toAtomDate(date) {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

function buildEntry(post) {
  const url = canonicalUrl(post);
  const title = pickLocale(post.title, "zh");
  const summary = pickLocale(post.summary, "zh");
  const published = toAtomDate(parsePostDate(post.date));

  return [
    "  <entry>",
    `    <title>${escapeXml(title)}</title>`,
    `    <link href="${escapeXml(url)}" rel="alternate" type="text/html" />`,
    `    <id>${escapeXml(url)}</id>`,
    `    <published>${published}</published>`,
    `    <updated>${published}</updated>`,
    `    <summary type="text">${escapeXml(summary)}</summary>`,
    "  </entry>",
  ].join("\n");
}

async function main() {
  const site = siteOrigin();
  const { posts } = await listPublishablePosts();
  const sorted = [...posts].sort(
    (a, b) => parsePostDate(b.date).getTime() - parsePostDate(a.date).getTime(),
  );
  const updated = sorted.length ? parsePostDate(sorted[0].date) : new Date();
  const feedUrl = `${site}/feed.xml`;

  const xml = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <title>${escapeXml(FEED_META.title)}</title>`,
    `  <subtitle type="text">${escapeXml(FEED_META.subtitle)}</subtitle>`,
    `  <link href="${escapeXml(`${site}/blog/`)}" rel="alternate" type="text/html" />`,
    `  <link href="${escapeXml(feedUrl)}" rel="self" type="application/atom+xml" />`,
    `  <id>${escapeXml(`${site}/blog/`)}</id>`,
    `  <updated>${toAtomDate(updated)}</updated>`,
    "  <author>",
    `    <name>${escapeXml(FEED_META.authorName)}</name>`,
    `    <uri>${escapeXml(site)}</uri>`,
    "  </author>",
    ...sorted.map(buildEntry),
    "</feed>",
    "",
  ].join("\n");

  const out = path.join(ROOT, "feed.xml");
  await fs.writeFile(out, xml, "utf8");
  console.log(`Wrote ${path.relative(process.cwd(), out)} (${sorted.length} entries)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
