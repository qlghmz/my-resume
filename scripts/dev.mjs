import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
};

function blocked(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  return parts.some((part) => DENY_DIRS.has(part));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://127.0.0.1:${PORT}`);
  const pathname = decodeURIComponent(url.pathname);

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
});
