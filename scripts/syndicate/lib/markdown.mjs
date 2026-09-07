import { pickLocale } from "./load.mjs";

function stripToMd(html) {
  return String(html || "")
    .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em>(.*?)<\/em>/gi, "*$1*")
    .replace(/<i>(.*?)<\/i>/gi, "*$1*")
    .replace(/<code>(.*?)<\/code>/gi, "`$1`")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

/**
 * Convert site ARTICLE object → Markdown body (no title heading).
 */
export function articleToMarkdown(article, locale = "zh") {
  const parts = [];
  const lede = pickLocale(article.lede, locale);
  if (lede) parts.push(lede, "");

  for (const sec of article.sections || []) {
    const heading = pickLocale(sec.heading, locale);
    if (heading) parts.push(`## ${heading}`, "");

    for (const p of sec.paragraphs || []) {
      const text = stripToMd(pickLocale(p, locale));
      if (text) parts.push(text, "");
    }

    const bullets = sec.bullets || [];
    if (bullets.length) {
      for (const b of bullets) {
        parts.push(`- ${stripToMd(pickLocale(b, locale))}`);
      }
      parts.push("");
    }

    for (const fig of sec.figures || []) {
      if (!fig?.src) continue;
      const caption = stripToMd(pickLocale(fig.caption, locale));
      parts.push(`![${caption || ""}](${fig.src})`);
      if (caption) parts.push(`*${caption}*`);
      parts.push("");
    }
  }

  return parts.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

export function backlinkBlock(canonical, locale = "zh") {
  if (locale === "en") {
    return [
      "---",
      "",
      `> **Original post:** [${canonical}](${canonical})`,
      "",
    ].join("\n");
  }
  return [
    "---",
    "",
    `> **原文（主站）：** [${canonical}](${canonical})`,
    "",
  ].join("\n");
}

export function frontlinkBlock(canonical, locale = "zh") {
  if (locale === "en") {
    return [
      `> This article was first published on my site: [${canonical}](${canonical})`,
      "",
    ].join("\n");
  }
  return [
    `> 本文首发于个人站，完整版本与后续更新以原文为准：[${canonical}](${canonical})`,
    "",
  ].join("\n");
}
