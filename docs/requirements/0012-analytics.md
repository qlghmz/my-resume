# 需求 0012 — 站点访问统计与产品化复盘

| 项 | 值 |
| --- | --- |
| 需求编号 | **0012** |
| 分支 | `feat/0012-analytics` |
| 状态 | 待合入 `main`（**不打 tag**） |
| 目标 | 为个人站建立可量化、可复盘的数据栈与文档，支撑「发现 → 阅读 → 行动 → 结果」四层分析 |

---

## 背景

个人站需要像产品一样用数据驱动迭代：知道有没有被看到、读者从哪来、是否进入简历/联系转化，并在有数据后按统一标准复盘。此前站点无统计；Umami Cloud API 需 Pro，故采用 **Cloudflare Web Analytics + Umami Hobby（手动 Website ID）** 双栈。

---

## 功能需求

| 编号 | 需求 | 验收 |
| --- | --- | --- |
| **REQ-0012-001** | 全站接入 Cloudflare Web Analytics（beacon） | `data/analytics.js` 含 CF token；线上 HTML 加载 beacon；CF 仪表盘可见 `resume.tensorview.cc` |
| **REQ-0012-002** | 全站接入 Umami Hobby（行为与国家/来源） | `umami.enabled` + `websiteId`；Umami Realtime/Pages/Countries 有数据（接入后） |
| **REQ-0012-003** | 双栈配置单点维护 | `data/analytics.js` 统一开关；`js/analytics.js` 同时加载 CF + Umami |
| **REQ-0012-004** | CLI 一键写入配置并部署 | `npm run setup:analytics -- --token=… [--umami-id=…] --deploy` |
| **REQ-0012-005** | 转化事件埋点（Umami Events） | `goal_*`、`click_github`、`click_email`、`work_click`、`blog_open`、`blog_category`、`article_scroll`、`nav_click`、`lang_switch` |
| **REQ-0012-006** | 本地开发不上报 | `ignoreLocalhost: true`；`127.0.0.1:8787` 不计入统计 |
| **REQ-0012-007** | 站长自排除，避免自刷污染 | `localStorage jh.statsExclude=1` 时跳过全部统计 |
| **REQ-0012-008** | 尊重 Do Not Track | `respectDoNotTrack: true` |
| **REQ-0012-009** | 产品化复盘文档 | `docs/analytics-playbook.md`：目标、阶段基线、指标定义、周/月复盘、月报模板、决策规则 |
| **REQ-0012-010** | README 接入说明与 playbook 链接 | 「访问统计」章节 + 指向 playbook |
| **REQ-0012-011** | 所有页面加载统计脚本 | 9 个 HTML 页引入 `data/analytics.js` + `js/analytics.js` |
| **REQ-0012-012** | 仅公开追踪 id 入库 | CF token、Umami Website ID 可提交；禁止登录密码 / API secret |

---

## 非功能需求

| 编号 | 需求 | 验收 |
| --- | --- | --- |
| **NFR-0012-001** | 免费档可用 | 不依赖 Umami Pro API；CF Web Analytics 免费 |
| **NFR-0012-002** | 统计范围限定本站 | Umami `domains: resume.tensorview.cc`；不含其他子域名 |
| **NFR-0012-003** | 可随时关闭 | `enabled: false` 或清空 id/token 后部署即停 |
| **NFR-0012-004** | 不影响页面功能 | 统计脚本 defer 加载；失败不阻塞站点 |

---

## 范围外（后续需求）

| 编号 | 说明 |
| --- | --- |
| **OUT-0012-001** | Google Search Console 验证（用户自行在 GSC 完成，README 已有步骤） |
| **OUT-0012-002** | 机会日志实盘文件（存本机/Notion，不进 Git） |
| **OUT-0012-003** | 发版 tag（本次合入 **不打 tag**） |

---

## 涉及文件

| 路径 | 变更 |
| --- | --- |
| `data/analytics.js` | 双栈配置（CF + Umami） |
| `js/analytics.js` | beacon 加载、事件、自排除 |
| `scripts/setup-analytics.mjs` | CLI 配置与 deploy |
| `js/layout.js` / `render.js` / `blog-deck.js` | 导航与转化埋点 |
| `index.html` 等 9 页 | 脚本引用 |
| `docs/analytics-playbook.md` | 复盘手册 |
| `docs/requirements/0012-analytics.md` | 本文档 |
| `README.md` | 接入摘要 |
| `package.json` | `setup:analytics` script |

---

## 合入后人工确认

- [ ] Umami Overview / Realtime 有访问（无痕访问线上站后）
- [ ] Cloudflare Web Analytics 有 Visits（可能有延迟）
- [ ] 站长日常预览前设置 `jh.statsExclude` 或无痕测试
- [ ] 择机完成 Search Console 验证
