import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "../../..",
);

const SITE = "https://resume.tensorview.cc";

function runDataFile(code, filename) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename });
  return sandbox.window;
}

export async function loadPosts() {
  const file = path.join(ROOT, "data", "posts.js");
  const code = await fs.readFile(file, "utf8");
  const win = runDataFile(code, "posts.js");
  return {
    categories: win.BLOG_CATEGORIES || [],
    posts: win.POSTS || [],
  };
}

export async function loadArticle(id) {
  const file = path.join(ROOT, "data", "articles", `${id}.js`);
  const code = await fs.readFile(file, "utf8");
  const win = runDataFile(code, `${id}.js`);
  if (!win.ARTICLE) throw new Error(`No ARTICLE in data/articles/${id}.js`);
  return win.ARTICLE;
}

export function pickLocale(value, locale = "zh") {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[locale] || value.zh || value.en || "";
}

export function canonicalUrl(post) {
  const href = post?.href;
  if (href && href.startsWith("http")) return href;
  if (href && href !== "#") return `${SITE}${href.startsWith("/") ? "" : "/"}${href}`;
  return `${SITE}/blog/`;
}

export function siteOrigin() {
  return SITE;
}
