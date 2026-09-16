/**
 * Generate /ja/* HTML mirrors with Japanese static meta + locale hint.
 * Run: node ./scripts/generate-ja-pages.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const SITE = "https://resume.tensorview.cc";

const PAGES = [
  {
    src: "index.html",
    dest: "ja/index.html",
    title: "Dong Jiahui · 個人サイト",
    description:
      "董家輝の個人サイト。組み込み Linux・カメラ・端末 AI の作品、履歴書、技術ブログ。",
    canonical: "/ja/",
  },
  {
    src: "works/index.html",
    dest: "ja/works/index.html",
    title: "作品 · 董家輝",
    description:
      "選りすぐりの作品：Loongson ドライバ、眼圧計 MCU/Qt、RK3588 カメラ、TensorView など。",
    canonical: "/ja/works/",
  },
  {
    src: "resume/index.html",
    dest: "ja/resume/index.html",
    title: "履歴書 · 董家輝",
    description:
      "董家輝の履歴書。組み込み Linux ドライバエンジニア。得力集団 / 佳目医療の経歴とプロジェクト。",
    canonical: "/ja/resume/",
  },
  {
    src: "blog/index.html",
    dest: "ja/blog/index.html",
    title: "ブログ · 董家輝",
    description: "日常・技術・キャリア成長に関するノートとエッセイ。",
    canonical: "/ja/blog/",
  },
  {
    src: "contact/index.html",
    dest: "ja/contact/index.html",
    title: "連絡 · 董家輝",
    description: "董家輝への連絡：WeChat jdong8464、メール、GitHub。",
    canonical: "/ja/contact/",
  },
  {
    src: "blog/rk3588-rga-multi-camera.html",
    dest: "ja/blog/rk3588-rga-multi-camera.html",
    title: "RK3588 RGA 複数カメラ · 董家輝",
    description:
      "RK3588 RGA ハードウェア加速による 3 系統カメラ同時プレビュー設計。",
    canonical: "/ja/blog/rk3588-rga-multi-camera.html",
  },
  {
    src: "blog/i2c-trise-ack-trap.html",
    dest: "ja/blog/i2c-trise-ack-trap.html",
    title: "Linux I2C TRISE 罠 · 董家輝",
    description:
      "レジスタダンプとオシロで見つけた Linux I2C の隠れタイミング罠。",
    canonical: "/ja/blog/i2c-trise-ack-trap.html",
  },
  {
    src: "blog/ai-video-creation-engine.html",
    dest: "ja/blog/ai-video-creation-engine.html",
    title: "分散 AI 動画エンジン · 董家輝",
    description: "FastAPI + GPU/NVENC の分散 AI 動画制作エンジン。",
    canonical: "/ja/blog/ai-video-creation-engine.html",
  },
  {
    src: "blog/taobao-outsource-group-half-year.html",
    dest: "ja/blog/taobao-outsource-group-half-year.html",
    title: "外注グループ半年 · 董家輝",
    description: "淘宝外注グループで半年間受注した流れと落とし穴。",
    canonical: "/ja/blog/taobao-outsource-group-half-year.html",
  },
  {
    src: "blog/outsource-ai-side-hustle-part-2.html",
    dest: "ja/blog/outsource-ai-side-hustle-part-2.html",
    title: "外注パート2 · 董家輝",
    description: "AI で Web 副業を受けた実体験：収入感とつらい案件。",
    canonical: "/ja/blog/outsource-ai-side-hustle-part-2.html",
  },
];

function patchHtml(html, page) {
  let out = html;
  out = out.replace(/<html\s+lang="[^"]*"/i, '<html lang="ja"');
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="description" content="${page.description}" />`,
  );
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i,
    `<link rel="canonical" href="${SITE}${page.canonical}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:title" content="${page.title}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:description" content="${page.description}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:url" content="${SITE}${page.canonical}" />\n  <meta property="og:locale" content="ja_JP" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:title" content="${page.title}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:description" content="${page.description}" />`,
  );
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${page.title}</title>`);

  // Noto Sans JP for Japanese pages
  out = out.replace(
    /family=Noto\+Sans\+SC:wght@500;700;900/g,
    "family=Noto+Sans+SC:wght@500;700;900&family=Noto+Sans+JP:wght@500;700;900",
  );

  if (!out.includes("__JH_LOCALE_HINT")) {
    out = out.replace(
      /<script src="\/js\/i18n\.js"><\/script>/,
      `<script>window.__JH_LOCALE_HINT="ja";</script>\n  <script src="/js/i18n.js"></script>`,
    );
  }

  return out;
}

async function main() {
  for (const page of PAGES) {
    const src = path.join(ROOT, page.src);
    const dest = path.join(ROOT, page.dest);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    const html = await fs.readFile(src, "utf8");
    await fs.writeFile(dest, patchHtml(html, page), "utf8");
    console.log("wrote", page.dest);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
