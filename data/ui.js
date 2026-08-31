window.UI = {
  meta: {
    title: {
      home: { zh: "Dong Jiahui · 个人网站", en: "Dong Jiahui · Personal Site" },
      works: { zh: "作品 · 董家辉", en: "Works · Dong Jiahui" },
      resume: { zh: "简历 · 董家辉", en: "Resume · Dong Jiahui" },
      blog: { zh: "博客 · 董家辉", en: "Blog · Dong Jiahui" },
      contact: { zh: "联系 · 董家辉", en: "Contact · Dong Jiahui" },
      article: {
        zh: "基于 RK3588 RGA 硬件加速的三路相机并发预览方案设计 · 董家辉",
        en: "RK3588 RGA Multi-Camera Preview · Dong Jiahui",
      },
    },
  },
  a11y: {
    skip: { zh: "跳至主要内容", en: "Skip to main content" },
    site: { zh: "站点", en: "Site" },
    lang: { zh: "语言", en: "Language" },
    menu: { zh: "主菜单", en: "Main menu" },
    searchWorks: { zh: "搜索作品", en: "Search works" },
  },
  nav: {
    main: { zh: "主页", en: "Main" },
    works: { zh: "作品", en: "Works" },
    resume: { zh: "简历", en: "Resume" },
    blog: { zh: "博客", en: "Blog" },
    contact: { zh: "联系", en: "Contact" },
  },
  footer: {
    copy: { zh: "© {year} 董家辉", en: "© {year} Dong Jiahui" },
    esc: { zh: "Esc 返回主菜单", en: "Esc back to menu" },
  },
  home: {
    kicker: { zh: "个人网站", en: "Personal Site" },
    role: {
      zh: "个人网站 · 嵌入式工程师",
      en: "Personal Site · Embedded Engineer",
    },
    cmdLabel: { zh: "指令", en: "Command" },
    keysEnter: { zh: "Enter 确认", en: "Enter Confirm" },
    keysEsc: { zh: "Esc 关闭", en: "Esc Close" },
    desc: {
      works: { zh: "查看项目、工装与竞赛", en: "Projects, fixtures, and contests" },
      resume: { zh: "完整经历与教育背景", en: "Full experience and education" },
      blog: { zh: "嵌入式与相机笔记", en: "Embedded and camera notes" },
      contact: { zh: "邮件、微信与 GitHub", en: "Email, WeChat, and GitHub" },
      github: { zh: "打开代码仓库", en: "Open GitHub repositories" },
    },
    zhLabel: {
      works: { zh: "作品", en: "Works" },
      resume: { zh: "简历", en: "Resume" },
      blog: { zh: "博客", en: "Blog" },
      contact: { zh: "联系", en: "Contact" },
      github: { zh: "代码", en: "Code" },
    },
  },
  works: {
    heading: { zh: "精选作品", en: "Selected Works" },
    intro: {
      zh: "工作里做过的系统、工具和竞赛。点进去看简历详情、文章或 GitHub。",
      en: "Systems, tools, and contests from work. Open resume details, articles, or GitHub.",
    },
    searchPh: {
      zh: "搜索作品，例如：相机、NCNN、工装、竞赛…",
      en: "Search works, e.g. camera, NCNN, fixture, contest…",
    },
    empty: {
      zh: "还没有作品。打开 data/works.js 加一条即可出现在这里。",
      en: "No works yet. Add an entry in data/works.js.",
    },
    noMatch: {
      zh: "没有找到匹配的作品，换个关键词试试。",
      en: "No matching works. Try another keyword.",
    },
    ctaDefault: { zh: "查看详情", en: "View details" },
  },
  resume: {
    heading: { zh: "简历", en: "Resume" },
    counter: { zh: "CV", en: "CV" },
    blurb: {
      zh: "男 · 24 岁 · 本科 · 2 年+ 经验 · 浙大宁波理工学院 · 计算机科学与技术",
      en: "Male · 24 · B.S. · 2+ years exp · Zhejiang University Ningbo Institute of Technology · Computer Science",
    },
  },
  blog: {
    heading: { zh: "技术博客", en: "Tech Blog" },
    intro: {
      zh: "嵌入式 Linux、相机和板端推理相关的笔记。悬停左侧目录，右侧卡牌会翻面切换。",
      en: "Notes on embedded Linux, cameras, and on-device inference. Hover the TOC — the card flips to match.",
    },
    empty: {
      zh: "还没有文章。打开 data/posts.js 加一条，并在 blog/ 下放 HTML 即可。",
      en: "No posts yet. Add an entry in data/posts.js and an HTML page under blog/.",
    },
    read: { zh: "阅读", en: "Read" },
    back: { zh: "← 博客列表", en: "← Blog list" },
    backBottom: { zh: "← 返回博客列表", en: "← Back to blog" },
    deck: {
      toc: { zh: "目录", en: "Index" },
      hint: {
        zh: "悬停翻牌 · 点击打开文章 · ↑↓ 键也可",
        en: "Hover to flip · click to open · ↑↓ keys too",
      },
      draft: { zh: "草稿", en: "Draft" },
      soon: { zh: "即将写", en: "Coming soon" },
    },
  },
  contact: {
    heading: { zh: "联系", en: "Contact" },
    intro: {
      zh: "打招呼、看代码，或加微信。",
      en: "Say hello, browse code, or add WeChat.",
    },
    github: { zh: "Github", en: "Github" },
    mail: { zh: "邮件", en: "Mail" },
    wechat: { zh: "微信", en: "WeChat" },
  },
};
