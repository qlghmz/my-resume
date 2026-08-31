# 个人站

本地：`npm run dev` → http://127.0.0.1:8787/

首页是 Persona 3 Reload 风格暂停菜单（静态 HTML/CSS/JS，无框架）。未使用 Atlus 官方素材/字体/BGM。

- `/` 主菜单
- `/works/` 作品
- `/resume/` 简历
- `/blog/` 博客
- `/contact/` 联系

## 双语（i18n）

同一套 URL，**不**按地区跳转到 `/en/`、`/zh/`。

- 默认语言：浏览器 `navigator.languages`（`zh*` → 中文，否则优先英文，再否则中文）
- 自选：右上角 / HUD 的 `ZH | EN`，写入 `localStorage`（`jh.locale`）
- 文案形状：`{ zh: "…", en: "…" }` 写在同一条记录旁，改一条就补齐各语言
- 加语言：在 `js/i18n.js` 的 `LOCALES` 注册新码，再给各 `L` 对象加对应键；缺键会回退 `en` → `zh`

| 文件 | 内容 |
| --- | --- |
| `js/i18n.js` | 检测 / `L` / `t` / `setLocale` / `apply` |
| `data/ui.js` | 壳文案（导航、首页、空态…） |
| `data/works.js` / `data/posts.js` | 列表条目 |
| `data/resume.js` | 简历章节 |
| `data/articles/*.js` | 博文正文 |

页面壳用 `data-i18n="nav.works"` 等属性；动态列表由 `js/render.js` 渲染。

## 缓存（`_headers`）

合入 `main` 后随 Worker assets 上线。**以后改站不要加会命中 `/css` `/js` `/img` 的全站 `/*` Cache-Control**（Cloudflare 会把多条规则的头合并，叠两个 `max-age` 等于没优化）。

| 路径 | Cache-Control | 原因 |
| --- | --- | --- |
| `/`、`/works/*`、`/resume/*`、`/blog/*`、`/contact/*` | `max-age=0, must-revalidate` | 博客、文案一更就看见 |
| `/data/*` | `max-age=0, must-revalidate` | 列表与正文数据常改 |
| `/css/*`、`/js/*` | `max-age=604800`（7 天）+ `must-revalidate` | 壳资源；跳转可走磁盘缓存 |
| `/img/*` | `max-age=2592000`（30 天）+ `must-revalidate` | 图片少改 |

写博客 / 改正文：只动 `data/`、`blog/`、页面 HTML 即可，缓存规则不用改。  
刚改完 CSS/JS 若浏览器仍像旧的：硬刷新一次。  
新增顶级栏目目录时：在 `_headers` 里为该路径补一条 `max-age=0`（不要用 `/*`）。

## 版本

当前线上基线：**v1.1.0**

| 东西 | 规则 |
| --- | --- |
| `main` | 生产。合入后才算发布。 |
| 分支 | 从 `main` 拉：`feat/...`、`fix/...`、`release/vX.Y.Z` |
| PR | 所有改动都走 Pull Request，不要直推 `main` |
| tag | 合入 `main` 后打 `vX.Y.Z`，与这次发布对应 |

### 日常流程

```text
git checkout main && git pull
git checkout -b feat/短名
# 改完、commit、push
# 开 PR → 检查 → merge 进 main
git checkout main && git pull
git tag -a vX.Y.Z -m "简短说明"
git push origin vX.Y.Z
```

## 部署

线上 https://resume.tensorview.cc 是 Cloudflare Worker **`resume-tensorview-cc`**（assets-only，没有 `main` 脚本）。

合入 GitHub **不等于**上线。以前 `/` 会 302 到 `/en/`（旧双语页），是因为线上还跑着带 Worker 脚本的旧部署。`wrangler.jsonc` 里不要再加 `main`，也不要把 `/` 指到 `/en/`。

### 合入 `main` 之后自动上线

1. Cloudflare → API Tokens → 用 **Edit Cloudflare Workers** 模板建 token（要能写 Workers，不能只用 DNS Edit）
2. GitHub 仓库 Settings → Secrets → Actions → 加 `CLOUDFLARE_API_TOKEN`
3. 合入 `main`（或 Actions 里手动跑 **Deploy**）

PR 上只做 `wrangler deploy --dry-run`，不会改生产。

### 本地先上线

```text
npx wrangler login
npm run deploy
```

不要把「只能改 DNS」的 token 设成 `CLOUDFLARE_API_TOKEN`，Wrangler 会优先用它然后部署失败。OAuth 过期就重新 `wrangler login`。
