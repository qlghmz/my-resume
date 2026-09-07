import {
  articleToMarkdown,
  backlinkBlock,
  frontlinkBlock,
} from "./markdown.mjs";
import { canonicalUrl, pickLocale } from "./load.mjs";

/**
 * Platform adapters: shape the same article for each target.
 * All include a link back to the canonical site post.
 */
export const PLATFORMS = [
  {
    id: "cnblogs",
    name: "博客园",
    region: "cn",
    publish: "metaweblog",
    note: "可用 MetaWeblog API 直发；本地默认 dry-run。",
  },
  {
    id: "juejin",
    name: "掘金",
    region: "cn",
    publish: "manual",
    note: "无稳定公开写接口；导出 Markdown，可用 SyncCaster 粘贴。",
  },
  {
    id: "csdn",
    name: "CSDN",
    region: "cn",
    publish: "manual",
    note: "导出 Markdown + 文首原文声明。",
  },
  {
    id: "devto",
    name: "Dev.to",
    region: "en",
    publish: "api",
    note: "支持 canonical_url；本地生成 front matter。",
  },
  {
    id: "medium",
    name: "Medium",
    region: "en",
    publish: "manual",
    note: "Medium Integration Token 可发；本地先出带 canonical 的稿。",
  },
];

function baseMeta(post, article, locale) {
  const title = pickLocale(article.title || post.title, locale);
  const summary = pickLocale(post.summary || article.lede, locale);
  const tags = article.tags || [];
  const canonical = canonicalUrl(post);
  return { title, summary, tags, canonical, locale };
}

function wrapBody(article, canonical, locale, { frontlink = true, backlink = true } = {}) {
  const raw = articleToMarkdown(article, locale);
  const front = frontlink ? frontlinkBlock(canonical, locale) : "";
  const back = backlink ? backlinkBlock(canonical, locale) : "";
  return `${front}${raw}\n${back}`.trim() + "\n";
}

function yamlFrontMatter(obj) {
  return (
    "---\n" +
    Object.entries(obj)
      .map(([k, v]) => {
        if (Array.isArray(v)) return `${k}: [${v.map((x) => `"${x}"`).join(", ")}]`;
        if (typeof v === "boolean") return `${k}: ${v}`;
        return `${k}: "${String(v).replace(/"/g, '\\"')}"`;
      })
      .join("\n") +
    "\n---\n\n"
  );
}

export function buildPayload(platformId, post, article, locale = "zh") {
  const platform = PLATFORMS.find((p) => p.id === platformId);
  if (!platform) throw new Error(`Unknown platform: ${platformId}`);

  const loc = platform.region === "en" ? "en" : locale;
  const meta = baseMeta(post, article, loc);

  let body;
  let frontMatter = null;

  if (platform.id === "devto") {
    frontMatter = {
      title: meta.title,
      published: false,
      tags: meta.tags
        .slice(0, 4)
        .map((t) => String(t).toLowerCase().replace(/\s+/g, "")),
      canonical_url: meta.canonical,
      description: meta.summary.slice(0, 140),
    };
    body =
      yamlFrontMatter(frontMatter) +
      wrapBody(article, meta.canonical, loc);
  } else if (platform.id === "medium") {
    frontMatter = {
      title: meta.title,
      canonicalUrl: meta.canonical,
      tags: meta.tags.slice(0, 5),
      publishStatus: "draft",
    };
    body = wrapBody(article, meta.canonical, loc);
  } else {
    frontMatter = {
      title: meta.title,
      tags: meta.tags,
      canonical: meta.canonical,
    };
    body = wrapBody(article, meta.canonical, "zh");
  }

  return {
    platform: platform.id,
    platformName: platform.name,
    publish: platform.publish,
    note: platform.note,
    title: meta.title,
    summary: meta.summary,
    tags: meta.tags,
    canonical: meta.canonical,
    locale: loc,
    frontMatter,
    body,
    charCount: body.length,
  };
}

export function buildAllPayloads(post, article, platformIds, locale = "zh") {
  const ids = platformIds?.length ? platformIds : PLATFORMS.map((p) => p.id);
  return ids.map((id) => buildPayload(id, post, article, locale));
}
