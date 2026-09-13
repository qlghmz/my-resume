# 个人站数据复盘手册

> 站点：https://resume.tensorview.cc  
> 统计栈：Cloudflare Web Analytics + Umami +（待接）Google Search Console + Giscus + 机会日志  
> 适用：有 **1～2 周数据** 后开始按本手册复盘；第 1 个月建立基线，第 2 个月起做对比。

---

## 1. 站点目标（North Star）

个人站不是「做完放着」，而是 **嵌入式工程师的职业产品**。成功不等于万级 PV，而是：

| 优先级 | 目标 | 怎么算「做到了」 |
| --- | --- | --- |
| **P0** | 被目标读者看见 | 有稳定 UV；Search Console 有展示/点击 |
| **P1** | 读者愿意深读 | 技术文有 `article_scroll`；平均访问时长 > 30s |
| **P2** | 读者靠近转化 | `/resume/`、`/contact/` 有访问；`click_github` 偶发 |
| **P3** | 产生真实机会 | 机会日志里有面试/私信/合作，且能追溯到文章或来源 |

**不追求的虚荣指标：** 总 PV 绝对值、与 Medium 大 V 对比、单日 spike without 后续机会。

---

## 2. 阶段目标（可量化基线）

个人嵌入式简历站的 **合理预期**（供对照，不是 KPI 考核）：

| 阶段 | 时间 | Umami UV/周 | Search 展示/月 | 机会（月） | 重点动作 |
| --- | --- | --- | --- | --- | --- |
| **冷启动** | 0～4 周 | 0～20 | 0～500 | 0～1 | 接 Search Console；别自刷；发 1 篇可搜索长文 |
| **起步** | 1～3 月 | 20～80 | 500～5k | 0～2 | 改 CTR 差的标题；博客系列化 |
| **有效** | 3～6 月 | 80～200 | 5k～20k | 1～3 | 强化 `/resume/` 入口；记录哪篇带来机会 |
| **成熟** | 6 月+ | 200+ | 20k+ | 稳定偶发 | 内容维护 > 新功能 |

若长期 **UV=0 且 Search 展示=0**：优先查收录与发文，而非改 UI。

---

## 3. 四层指标定义

### 3.1 发现层（Search Console）

| 指标 | 含义 | healthy 信号 | 需行动 |
| --- | --- | --- | --- |
| **展示（Impressions）** | 搜索结果里出现过多少次 | 逐月缓升 | 3 个月仍为 0 → 查收录/sitemap |
| **点击（Clicks）** | 从 Google 点进来 | 与展示同向 | 展示高点击低 → 改 title/description |
| **CTR** | 点击/展示 | 1%～5%（技术长尾可更低） | <0.5% 且排名靠前 → 改标题 |
| **平均排名** | 搜索位置 | 技术词进入前 30 即可 | 有展示无排名 → 内容深度不够 |
| **索引页数** | 被收录 URL 数 | ≈ sitemap 已发布页 | 新文 2 周未收录 → 手动提交 URL |

### 3.2 阅读层（Cloudflare + Umami）

| 指标 | 工具 | 含义 | 备注 |
| --- | --- | --- | --- |
| **Visits / UV** | CF / Umami | 独立访客 | 看 **周趋势**，不看单日 |
| **Page views** | 两者 | 页面浏览量 | PV/UV ≈ 1.5～3 正常 |
| **Top pages** | Umami → Pages | 热门路径 | 博客文 > 首页 > 简历 是常见健康形态 |
| **Countries** | Umami → 地点 | 中/外占比 | 嵌入式中文内容：CN 为主正常；有 US/EU 说明英文/SEO 有效 |
| **Referrers** | Umami → 来源 | 从哪来 | google / github / direct / 社群域名 |
| **Core Web Vitals** | CF → 性能 | LCP/INP/CLS | 变差优先修性能，不是加功能 |

### 3.3 行动层（Umami Events + 路径）

| 信号 | 事件 / 路径 | 解读 |
| --- | --- | --- |
| 认真看简历 | `goal_resume` 或 `/resume/` PV | 强意向 |
| 想联系 | `goal_contact`、`click_email` | 很强意向 |
| 看代码 | `click_github` | 技术读者 |
| 读完文章 | `article_scroll` depth ≥ 50 | 内容质量 OK |
| 对某项目感兴趣 | `work_click` + work id | 可加强该作品描述 |
| 博客入口 | `blog_open` / `goal_article` | 哪篇值得写续集 |

**转化漏斗（简化）：**

```text
goal_article（或博客 PV）
  → article_scroll 50%+
    → goal_resume
      → click_github / click_email
        → 机会日志有记录
```

### 3.4 结果层（机会日志，人工）

| 字段 | 说明 |
| --- | --- |
| 日期 | 发生日 |
| 来源 | Google / V2EX / 朋友 / HR / BOSS / 未知 |
| 是否提到网站 | 是/否 |
| 相关文章或页面 | 如 rk3588 文、简历 |
| 结果 | 面试 / 私信 / 合作 / 无后续 |

**North Star 落地指标：** 每月 **≥1 条** 与站点内容相关的有效联系（不要求每站都有，长期为 0 才需调整策略）。

---

## 4. 数据质量标准（什么算「可信」）

### 4.1 已自动排除

| 干扰 | 处理方式 |
| --- | --- |
| 其他子域名 | Umami `domains` + CF 只绑 `resume.tensorview.cc` |
| `/js` `/img` 等资源请求 | 仅在 HTML 页加载 beacon，不算 PV |
| 常见爬虫 | CF **Exclude bots = Yes**；Umami 内置 bot 过滤 |
| 本地开发 | `ignoreLocalhost: true`，127.0.0.1 不上报 |

### 4.2 站长自排除（避免污染数据）

日常 **预览、改样式、检查链接** 前，在浏览器控制台执行：

```js
localStorage.setItem('jh.statsExclude', '1')  // 本机不再上报
localStorage.removeItem('jh.statsExclude')    // 恢复上报
```

或用无痕窗口专门测试 Realtime（测完关窗口）。

### 4.3 读数时如何辨认真人 vs 噪音

| 更像真人 | 更像噪音 |
| --- | --- |
| Referrer 为 google / github / 社群 | 无 Referrer 暴增 + 0 秒停留 |
| `article_scroll` 有 50%+ | 只有首页 PV，无 Events |
| 多国正常分布 | 单一奇怪 UA 刷屏 |
| 周末/工作日晚间有访问 | 每天固定时刻相同 pattern（可能是自己忘了自排除） |

**原则：** 不追求 100% 纯真人；用 **趋势 + 组合信号** 做决策。

---

## 5. 复盘节奏

### 5.1 每周（5 分钟，周日晚或周一）

- [ ] Umami：**过去 7 天** UV、Top 3 pages、Top Referrer
- [ ] 有无新 **Events**（`goal_resume`、`click_github`）
- [ ] 是否发了新文 / 改了标题（记在日历，方便后面对照）
- [ ] 自问：本周有没有 **机会日志** 可记？

### 5.2 每月（15～20 分钟，每月 1 号）

按顺序打开四个后台，填 **§7 月报模板**。

1. **Search Console**（发现）
2. **Umami**（阅读 + 行动）
3. **Cloudflare Web Analytics**（性能 + PV 交叉验证）
4. **Giscus**（评论）
5. **机会日志**（结果）

### 5.3 每次发新文后（+7 天、+28 天）

| 检查点 | 看什么 |
| --- | --- |
| +7 天 | Search Console 是否收录；Umami 该 URL 有无 PV |
| +28 天 | 该文搜索展示/点击；`article_scroll`；是否进 Top pages |

---

## 6. 决策规则（数据 → 动作）

| 观察到 | 判断 | 下一步 |
| --- | --- | --- |
| 某文展示 >500、CTR <0.5% | 标题/摘要不吸引 | 改 title + meta，不改正文 |
| 某文 PV 高、`goal_resume` 低 | 读者未导向转化 | 文末加 CTA：简历/联系 |
| 博客 PV 高、首页/简历低 | 缺少站内导流 | 博客页链到 `/resume/` |
| 某技术词展示涨 | SEO 方向对了 | 写同系列第 2 篇 |
| growth 类文 PV 高、Search 低 | 正常（靠转发） | 不指望 SEO，看评论/机会 |
| 全站 UV flat、Search flat | 收录或推广不足 | 提交 sitemap + 1 篇长文 + 1 次外链分享 |
| CN 流量 >90% | 中文读者为主 | 中文 SEO/社群；英文可维持不扩写 |
| 美欧 Referrer 出现 | 英文/GitHub 有效 | 保持 EN 页面质量 |
| CWV 变差 | 性能回归 | 查图片/字体，先修 perf |
| 机会日志 3 月为空 | 站未触达目标人群 | 简历外链、社群一次、改一篇最强 SEO 文 |

---

## 7. 月报模板（复制到 Notion / 飞书）

```markdown
## 站点月报 — YYYY-MM

### 摘要（三句话）
- 流量：
- 搜索：
- 机会：

### 发现（Search Console）
| 指标 | 本月 | 上月 | 变化 |
| --- | --- | --- | --- |
| 展示 | | | |
| 点击 | | | |
| 平均 CTR | | | |
| Top 查询词 1～3 | | | |

### 阅读（Umami，过去 30 天）
| 指标 | 本月 | 上月 |
| --- | --- | --- |
| UV | | |
| PV | | |
| 跳出率 | | |
| 平均访问时长 | | |

Top pages：
1.
2.
3.

Countries Top 3：
Referrers Top 3：

### 行动（Umami Events）
| 事件 | 次数 | 备注 |
| --- | --- | --- |
| goal_resume | | |
| goal_contact | | |
| click_github | | |
| article_scroll 50%+ | | |

### 性能（Cloudflare）
- LCP / INP / CLS：正常 / 需优化
- Visits（CF）：___（与 Umami 交叉验证）

### 互动（Giscus）
- 新评论：有/无，在哪篇

### 结果（机会日志）
| 日期 | 来源 | 相关页面 | 结果 |
| --- | --- | --- | --- |

### 本月内容动作
- 发了：
- 改了标题/SEO：

### 下月计划（只选 1～2 件）
- [ ]
- [ ]
```

---

## 8. 机会日志模板（TSV，勿提交含隐私的实盘）

```text
日期	来源	提到网站	相关页面	结果	备注
2026-09-15	Google	是	/blog/rk3588-rga-multi-camera	GitHub私信	问RGA方案
```

保存位置建议：本机 `~/Documents/resume-opportunities.tsv` 或 Notion，**不要 commit 进 Git**。

---

## 9. 工具入口速查

| 工具 | URL / 路径 |
| --- | --- |
| Umami | https://cloud.umami.is → 网站 **resume** |
| Cloudflare Web Analytics | Dashboard → Analytics & Logs → Web Analytics |
| Search Console | https://search.google.com/search-console |
| Giscus | GitHub repo → Discussions |
| 站点配置 | 仓库 `site/data/analytics.js` |
| 接入 CLI | `npm run setup:analytics -- --help` |

---

## 10. 修订记录

| 日期 | 说明 |
| --- | --- |
| 2026-09-13 | 初版：四层目标、阶段基线、周/月复盘、月报模板 |
