import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  listPublishablePosts,
  syndicatePost,
  readManifest,
  refreshManifest,
  readPayloadBody,
} from "./syndicate/lib/run.mjs";
import { PLATFORMS } from "./syndicate/lib/platforms.mjs";
import { pickLocale } from "./syndicate/lib/load.mjs";

const PORT = Number(process.env.PORT) || 8787;
const ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const DENY_DIRS = new Set(["node_modules", ".git", ".wrangler", "src", "scripts"]);
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".md": "text/markdown; charset=utf-8",
};

function blocked(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  return parts.some((part) => DENY_DIRS.has(part));
}

/** Author-only local UI — never under public site root / CF assets. */
function localToolFile(pathname) {
  if (!pathname.startsWith("/tools/syndicate")) return null;
  const rel =
    pathname === "/tools/syndicate" || pathname === "/tools/syndicate/"
      ? "index.html"
      : pathname.slice("/tools/syndicate/".length);
  if (!rel || rel.includes("..") || path.isAbsolute(rel)) return null;
  return path.join(ROOT, "scripts", "syndicate", "ui", rel);
}

function json(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(body);
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  return JSON.parse(raw);
}

async function handleApi(req, res, url) {
  const { pathname } = url;

  if (pathname === "/api/syndicate/catalog" && req.method === "GET") {
    const { posts } = await listPublishablePosts();
    return json(res, 200, {
      platforms: PLATFORMS,
      posts: posts.map((p) => ({
        id: p.id,
        date: p.date,
        href: p.href,
        category: p.category,
        titleZh: pickLocale(p.title, "zh"),
        titleEn: pickLocale(p.title, "en"),
      })),
    });
  }

  if (pathname === "/api/syndicate/manifest" && req.method === "GET") {
    return json(res, 200, await readManifest());
  }

  if (pathname === "/api/syndicate/body" && req.method === "GET") {
    const id = url.searchParams.get("id");
    const platform = url.searchParams.get("platform");
    if (!id || !platform) return json(res, 400, { error: "id and platform required" });
    try {
      const body = await readPayloadBody(id, platform);
      return json(res, 200, { id, platform, body });
    } catch {
      return json(res, 404, { error: "payload not found — generate first" });
    }
  }

  if (pathname === "/api/syndicate" && req.method === "POST") {
    try {
      const body = await readJsonBody(req);
      const id = body.id;
      if (!id) return json(res, 400, { error: "id required" });
      const { summary } = await syndicatePost(id, {
        platforms: body.platforms,
        locale: body.locale || "zh",
        mode: body.mode || "dry-run",
      });
      const manifest = await refreshManifest();
      return json(res, 200, { summary, manifest });
    } catch (err) {
      return json(res, 400, { error: err.message || String(err) });
    }
  }

  return json(res, 404, { error: "unknown api" });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://127.0.0.1:${PORT}`);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname.startsWith("/api/")) {
    try {
      await handleApi(req, res, url);
    } catch (err) {
      json(res, 500, { error: err.message || String(err) });
    }
    return;
  }

  // Local author tool only (files live under scripts/, excluded from deploy).
  const toolPath = localToolFile(pathname);
  if (toolPath) {
    if (!pathname.endsWith("/") && pathname === "/tools/syndicate") {
      res.writeHead(302, { Location: `/tools/syndicate/${url.search}` });
      res.end();
      return;
    }
    try {
      const body = await fs.readFile(toolPath);
      const ext = path.extname(toolPath);
      res.writeHead(200, {
        "Content-Type": MIME[ext] ?? "application/octet-stream",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex",
      });
      res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
    return;
  }

  if (blocked(pathname)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  let filePath = path.resolve(ROOT, pathname === "/" ? "index.html" : `.${pathname}`);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end();
    return;
  }

  try {
    let stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      if (!pathname.endsWith("/")) {
        res.writeHead(302, { Location: `${pathname}/${url.search}` });
        res.end();
        return;
      }
      filePath = path.join(filePath, "index.html");
    }
    const body = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, {
      "Content-Type": MIME[ext] ?? "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Local preview  http://127.0.0.1:${PORT}/`);
  console.log(`  Works        http://127.0.0.1:${PORT}/works/`);
  console.log(`  Resume       http://127.0.0.1:${PORT}/resume/`);
  console.log(`  Blog         http://127.0.0.1:${PORT}/blog/`);
  console.log(`  Contact      http://127.0.0.1:${PORT}/contact/`);
  console.log(`  Japanese     http://127.0.0.1:${PORT}/ja/`);
  console.log(`  Syndicate    http://127.0.0.1:${PORT}/tools/syndicate/`);
});
