import {
  articleToMarkdown,
  backlinkBlock,
  frontlinkBlock,
} from "./markdown.mjs";
import { canonicalUrl, pickLocale } from "./load.mjs";

/**
 * Platform adapters: shape the same article for each target.
 * All include a link back to the canonical site post.
 * autoPublish: wired in lib/publishers/* (Dev.to / Qiita).
 */
export const PLATFORMS = [
  {
    id: "cnblogs",
    name: "博客园",
    region: "cn",
    publish: "metaweblog",
    autoPublish: false,
    note: "可用 MetaWeblog API 直发；本地默认 dry-run。",
  },
  {
    id: "juejin",
    name: "掘金",
    region: "cn",
    publish: "manual",
    autoPublish: false,
    note: "无稳定公开写接口；导出 Markdown，可用 SyncCaster 粘贴。",
  },
  {
    id: "csdn",
    name: "CSDN",
    region: "cn",
    publish: "manual",
    autoPublish: false,
    note: "导出 Markdown + 文首原文声明。",
  },
  {
    id: "devto",
    name: "Dev.to",
    region: "en",
    publish: "api",
    autoPublish: true,
    note: "自动发布（DEVTO_API_KEY）。默认草稿；--live 公开。支持 canonical_url。",
  },
  {
    id: "qiita",
    name: "Qiita",
    region: "ja",
    publish: "api",
    autoPublish: true,
    note: "日本技术博客自动发布（QIITA_TOKEN，需 write_qiita）。默认限定公开；--live 公开。",
  },
  {
    id: "medium",
    name: "Medium",
    region: "en",
    publish: "manual",
    autoPublish: false,
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

  // Locale: EN platforms → en, JA → ja, CN → requested locale (default zh)
  let loc = locale;
  if (platform.region === "en") loc = "en";
  else if (platform.region === "ja") loc = "ja";

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
    // File keeps YAML for manual paste; API publisher uses structured fields + body without YAML.
    const mdBody = wrapBody(article, meta.canonical, loc);
    body = yamlFrontMatter(frontMatter) + mdBody;
  } else if (platform.id === "qiita") {
    frontMatter = {
      title: meta.title,
      tags: meta.tags.slice(0, 5),
      canonical: meta.canonical,
      private: true,
    };
    body = wrapBody(article, meta.canonical, loc);
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

  // API body: markdown without YAML front matter (title/tags sent separately)
  const apiBody =
    platform.id === "devto"
      ? wrapBody(article, meta.canonical, loc)
      : body;

  return {
    platform: platform.id,
    platformName: platform.name,
    publish: platform.publish,
    autoPublish: !!platform.autoPublish,
    note: platform.note,
    title: meta.title,
    summary: meta.summary,
    tags: meta.tags,
    canonical: meta.canonical,
    locale: loc,
    frontMatter,
    body,
    apiBody,
    charCount: body.length,
  };
}

export function buildAllPayloads(post, article, platformIds, locale = "zh") {
  const ids = platformIds?.length ? platformIds : PLATFORMS.map((p) => p.id);
  return ids.map((id) => buildPayload(id, post, article, locale));
}
