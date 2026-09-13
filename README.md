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

当前线上基线：**v1.5.0**

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

合入 GitHub **不等于**上线：需要 Actions 里的 **Deploy** 成功（或本地 `npm run deploy`）。

### 合入 `main` 之后自动上线

1. Cloudflare → [API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token** → 模板 **Edit Cloudflare Workers**（要能写 Workers，不能只用 DNS Edit）
2. 复制 token，在本机执行（只设一次）：
   ```bash
   gh secret set CLOUDFLARE_API_TOKEN --repo qlghmz/my-resume
   ```
   粘贴 token 后回车。仓库 Settings → Secrets → Actions 里应能看到同名 Secret。
3. 合入 `main`（或 Actions 里手动 **Run workflow** → Deploy）

PR 上只做 `wrangler deploy --dry-run`，不会改生产。Secret 缺失时 Deploy 会明确报错，不会静默失败。

### 本地先上线

```text
npx wrangler login
npm run deploy
```

不要把「只能改 DNS」的 token 设成 `CLOUDFLARE_API_TOKEN`，Wrangler 会优先用它然后部署失败。OAuth 过期就重新 `wrangler login`。

## SEO / 搜索收录

仓库已带：

| 文件 / 能力 | 作用 |
| --- | --- |
| `robots.txt` | 允许抓取，并指向站点地图 |
| `sitemap.xml` | 首页、作品、简历、博客列表与已发布文章 |
| 每页 `description` + Open Graph / Twitter | 搜索摘要与分享卡片 |
| `js/seo.js` | 按语言切换标题/描述；文章页用 lede + cover |
| 首页 / 简历 / 联系 | Person 结构化数据（JSON-LD） |

### 接入 Google / Bing（你只需做一次）

1. 打开 [Google Search Console](https://search.google.com/search-console) → 添加资源 `https://resume.tensorview.cc`
2. 验证方式选 **HTML 标签**，复制 `content="...."` 里的码
3. 打开 [Bing Webmaster](https://www.bing.com/webmasters) → 同样添加并拿 `msvalidate.01` 码
4. 在任意已部署页（建议 `index.html`）里，找到注释掉的：
   ```html
   <!-- Search Console: uncomment after you get verification codes
   <meta name="google-site-verification" content="PASTE_GOOGLE_CODE" />
   <meta name="msvalidate.01" content="PASTE_BING_CODE" />
   -->
   ```
   去掉注释，换成你的码，合入上线后再点控制台「验证」
5. 验证成功后，在控制台提交站点地图：  
   `https://resume.tensorview.cc/sitemap.xml`

新发博文时：写入 `data/posts.js`（非 draft）+ 文章 HTML，并在 `sitemap.xml` 加一条 `<url>`。

## 访问统计（量化方案）

站点用 **成熟开源方案组合**，不在仓库里自建统计后台：

| 层级 | 工具 | 后台在哪看 | 量什么 |
| --- | --- | --- | --- |
| 全站流量 + 转化 | [Umami](https://github.com/umami-software/umami)（MIT） | Umami Cloud 或自托管仪表盘 | PV、UV、来源、国家、设备、自定义事件 |
| 搜索发现 | Google Search Console | Google 控制台 | 展示、点击、搜索词、收录 |
| 评论互动 | Giscus / GitHub Discussions | GitHub 仓库 Discussions | 谁评论、哪篇有讨论 |

代码：`data/analytics.js`（开关与 websiteId）+ `js/analytics.js`（Umami 脚本与事件）。默认 **关闭**，配好 Umami 后再打开。

### 一次性接入 Umami（CLI，推荐）

1. 登录 [Umami Cloud](https://cloud.umami.is) → 头像 → **Settings → API keys → Create key**（复制一次即可）
2. 在本机 `site/` 目录执行（PowerShell）：

   ```powershell
   $env:UMAMI_API_KEY="粘贴 API key"
   npm run setup:analytics -- --deploy
   ```

   脚本会自动：查找或创建 `resume.tensorview.cc` 网站 → 写入 `data/analytics.js` → `wrangler deploy`。

   若你已在网页里建过站，也可直接用 Website ID：

   ```powershell
   npm run setup:analytics -- --website-id=你的UUID --deploy
   ```

3. 打开 Umami **Realtime**，访问 https://resume.tensorview.cc 验证

手动改配置仍可用：编辑 `data/analytics.js` 后 `npm run deploy`。

自托管：Docker 一键部署 Umami，把 `scriptHost` 改成 `https://analytics.你的域名`，后台与追踪脚本同域。

### 安全说明

- **Website ID 可以出现在前端**（与 Google Analytics 测量 id 一样），访客看得到也改不了你的后台
- **不要把 Umami 管理员密码、数据库密码、API secret 写进仓库**
- Umami 后台：强密码 + 2FA；自托管不要裸奔暴露 3000 端口
- `enabled: false` 或清空 `websiteId` 可立刻停统计
- 本地 `127.0.0.1:8787` 默认不上报（`ignoreLocalhost`）
- 尊重浏览器 **Do Not Track**（`respectDoNotTrack`）

### 已追踪事件（Umami → Events）

| 事件 | 含义 |
| --- | --- |
| `goal_home` / `goal_works` / `goal_resume` / `goal_blog` / `goal_contact` | 进入对应栏目 |
| `goal_article` | 打开文章（`slug`） |
| `article_scroll` | 文章阅读深度 25/50/75/90% |
| `home_nav` | 首页菜单跳转 |
| `nav_click` | 顶栏导航 |
| `work_click` | 作品卡片（`work` id） |
| `blog_open` | 打开博文（`post` slug） |
| `blog_category` | 切换博客分类架 |
| `click_github` / `click_email` | 联系/GitHub 点击 |
| `lang_switch` | 切换 ZH/EN |

页面浏览量由 Umami 脚本自动记录；上表是「有没有起作用」的转化信号。

### Search Console（搜索层，与 Umami 互补）

按上文 **SEO / 搜索收录** 接入。每月看：

- 哪些搜索词带来展示（决定下一篇写什么）
- 哪些 URL 有点击但 CTR 低（改标题/描述）
- 新文章是否被索引

### 每月复盘（15 分钟）

1. **Umami**：UV、Top 页面、Referrer、Events（`goal_resume`、`click_github` 等）
2. **Search Console**：展示/点击/查询词 Top 10
3. **Giscus**：新评论在哪篇
4. **机会日志**（自己记，表格即可）：日期 | 来源 | 是否看过站 | 结果（面试/私信/无）

根据数据决定下月动作：

- 某技术文搜索展示高、点击低 → 改标题，不急着写新文
- 博客有流量、`goal_resume` 少 → 文章末尾加强「看简历/联系」
- 某分类 `blog_category` 常点但无文 → 补该架内容
- 全站 flat → 检查 Search Console 收录 + 发 1 篇可搜索长文

### 对外推广（可选）

简历、签名、社群发帖链接可加 UTM，Umami 里看来源更清楚：

```text
https://resume.tensorview.cc/blog/rk3588-rga-multi-camera?utm_source=v2ex&utm_medium=post&utm_campaign=rk3588
```
