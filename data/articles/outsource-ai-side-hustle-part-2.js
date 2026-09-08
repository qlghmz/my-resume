window.ARTICLE = {
  id: "outsource-ai-side-hustle-part-2",
  date: "2026.09.08",
  title: {
    zh: "外包篇 2：AI 接互联网零活，钱从哪来、坑在哪",
    en: "Outsourcing Part 2: AI Side Jobs on the Web — Where Money and Pain Come From",
  },
  lede: {
    zh: "接上篇。这回写我实际做过哪些互联网外包、怎么用 AI 赶活，以及两笔特别磨人的单。还是个人经历，不是教程，也不是骂谁。",
    en: "Sequel to part 1. What web/mini-program gigs I actually shipped, how I used AI to move fast, and two jobs that drained me. Personal notes — not a playbook, not a rant.",
  },
  tags: ["Side Hustle", "Outsourcing", "AI", "Freelance", "Growth"],
  tagLabel: { zh: "个人发展", en: "Growth" },
  sections: [
    {
      paragraphs: [
        {
          zh: "上篇主要拆淘宝外包群的链路和抽成。这篇补「人在干活时」的一面：项目长什么样、收入大概什么量级、哪些客户体验还行、哪些单我事后只想提醒自己一句——下次别接。",
          en: "Part 1 mapped Taobao middleman groups and cuts. This one is the doing: what the jobs looked like, rough income, which clients were fine, and which ones left me with one rule — don’t take that kind of job again.",
        },
      ],
    },
    {
      heading: {
        zh: "一、我做过哪些活",
        en: "1. What I actually built",
      },
      paragraphs: [
        {
          zh: "互联网相关的外包，我这边做过不少「小而全」的站点：软件下载站、API 中转站、类似 Reddit 的论坛、WordPress 外贸站、辅导班官网之类。小程序也接过，比如接扣子（Coze）做问答回复，以及工程车监控这类偏业务的小程序。",
          en: "Most were compact full-stack web jobs: software download sites, API relay/proxy stations, Reddit-like forums, WordPress trade sites, tutoring-school landing pages. Mini programs too — e.g. Coze-backed Q&A, and a construction-vehicle monitoring app.",
        },
        {
          zh: "这些活里，代码主体基本是 AI 写的。我的方案很简单：闲鱼买按月的 AI Pro，再配 Cursor；额度够用，一个月下来简单单子可以顺畅推完。我更像是定需求、盯边界、改到客户能验收，而不是从零手敲每一行。",
          en: "AI wrote most of the code. My setup was plain: a monthly AI Pro plan bought on Xianyu, plus Cursor — enough quota to push simple gigs through a month. My job was scope, edges, and getting to acceptance — not typing every line from scratch.",
        },
      ],
    },
    {
      heading: {
        zh: "二、收入大概什么水平",
        en: "2. Rough income",
      },
      paragraphs: [
        {
          zh: "如果每个月都在做这类相对简单的任务，多出来 3～4k 副业收入是比较常见的体感。运气好、接到一手、抽成少的单，一个月冲到 8k 也有可能——但这块波动很大，别按上限做规划。",
          en: "In a normal month of these simpler jobs, an extra ¥3–4k side income felt common. With luck — first-hand work, thin middle cut — ¥8k in a month is possible. High variance; don’t budget on the ceiling.",
        },
        {
          zh: "所以它更像「能动嘴和动手、把交付啃完」的兼职杠杆：搭配别的副业，有机会摸到接近主业的收入；前提是单子本身还行。淘宝中介转手的那种，单价被压得很死，长期很亏——上篇写过，这里不展开。",
          en: "Think of it as side-hustle leverage: talk, ship, collect — stack other gigs and you might approach full-time income. That needs decent jobs. Taobao-agency handoffs crush the rate; I covered that in part 1.",
        },
      ],
    },
    {
      heading: {
        zh: "三、两笔特别磨人的单",
        en: "3. Two jobs that really hurt",
      },
      paragraphs: [
        {
          zh: "不是每单都惨。有些做完、验收过，过程挺干净。但有两笔我印象很深，值得单独记一记。",
          en: "Not every job was painful. Some shipped, got accepted, and felt clean. Two stuck with me hard enough to write down.",
        },
      ],
    },
    {
      heading: {
        zh: "1. 两天的 HTML，拖了将近两个月",
        en: "1. A two-day HTML site that stretched nearly two months",
      },
      paragraphs: [
        {
          zh: "有一家要做 App 下载站。客观说，就是个一两天能收工的静态页。结果拖了将近两个月——不是页面做不完，是客户说 App 还没改完，每改一版就要我往七牛上传一次。活本身简单，时间被对方节奏绑死，单价摊下来很亏，心里也别扭。",
          en: "One client wanted an app download site. Objectively a one-to-two-day static page. It ran nearly two months — not because the page was hard, but because their app wasn’t ready, and each build meant another Qiniu upload from me. Easy work, calendar owned by them; effective rate tanked and it felt awful.",
        },
        {
          zh: "事后教训：交付物如果依赖客户自己的产品节奏，一定要先谈清楚「改几次、怎么计时/计价、超时怎么办」。否则你等于免费给他们当上传员。",
          en: "Lesson: if delivery depends on the client’s own product cadence, lock how many update rounds, how time is billed, and what happens when they slip — or you’re their unpaid upload clerk.",
        },
      ],
    },
    {
      heading: {
        zh: "2. 急单 + 卡服务器：千万别接「一周必须上」",
        en: "2. Rush job + a crawling server: never take “must ship in a week”",
      },
      paragraphs: [
        {
          zh: "另一单是中转站，客户要一周做完。这次让我彻底记住：急单尽量别接。对方可以按小时催，微信一开就是一串消息；你的日历被对方的焦虑占满。",
          en: "Another was a relay/transfer station with a one-week deadline. That taught me: skip rush jobs when you can. They can ping by the hour; WeChat opens to a wall of messages, and their anxiety owns your calendar.",
        },
        {
          zh: "更烦的是环境：用的是中介的服务器，巨卡。我在 GitHub 编好、再上传部署，每一步都要等很久；一个小改动往往半天才能看到效果。客户又不停提各种莫名其妙的小改。自己很急、天天催开发，却不怎么去压中介；中介照样拿大头。这种结构里，程序员最亏，也最没意义。",
          en: "Worse: we were on the agency’s server, painfully slow. Build on GitHub, upload, deploy — each step crawled; a tiny tweak could eat half a day before you saw it live. The client kept inventing tiny changes, rushed me daily, barely pushed the middleman — who still took the fat cut. In that setup the developer loses twice, and it barely makes sense.",
        },
      ],
    },
    {
      heading: {
        zh: "四、顺的单，也不等于不累",
        en: "4. Smooth jobs still cost attention",
      },
      paragraphs: [
        {
          zh: "也有不少单：需求相对清楚，做完验收就过，这类其实很省心。但即便如此，客户经常是完全不懂技术和需求的小白——无效沟通、来回改口径还是会发生。活不重，心会有点累。",
          en: "Plenty of jobs were fine: clear enough scope, ship, accept. Even then, many clients know neither tech nor product — so you still eat empty talk and shifting asks. Light work, heavy mental overhead.",
        },
        {
          zh: "如果只当副业、不想把上班那套压力再扛一遍，其实还挺舒服：动动手指和嘴巴，把交付对齐就行。再叠一点别的兼职，有机会摸到主业量级的收入。关键仍是单源：尽量找一手、抽成少的；淘宝中介盘里的，长期不划算。",
          en: "As a true side hustle — not another full-time stress layer — it can feel okay: fingers, voice, ship. Stack other gigs and you might near full-time income. Source still matters: prefer first-hand, thin-cut work. Taobao middleman boards stay a bad deal long-term.",
        },
      ],
    },
    {
      heading: {
        zh: "五、我自己会记住的几条",
        en: "5. Rules I’m keeping",
      },
      bullets: [
        {
          zh: "<strong>别接纯急单：</strong>一周死线 + 按小时催，往往意味着范围会飘、你的晚上会没。",
          en: "<strong>Skip pure rush jobs:</strong> a one-week hard deadline plus hourly pings usually means scope creep and no evenings.",
        },
        {
          zh: "<strong>别绑在客户未就绪的产品上无限改：</strong>上传、发包次数要事先计价或封顶。",
          en: "<strong>Don’t bind to an unfinished client product forever:</strong> cap or bill upload/release rounds up front.",
        },
        {
          zh: "<strong>尽量避开「中介服务器 + 中介抽成」双杀：</strong>环境烂、钱又薄，改一次等半天最折磨。",
          en: "<strong>Avoid agency server + agency cut together:</strong> bad env, thin pay, half-day deploys per tweak.",
        },
        {
          zh: "<strong>AI 提速很实在，但谈判和边界还是人定：</strong>Cursor 能写代码，定不了客户什么时候停改。",
          en: "<strong>AI speeds coding; you still set boundaries:</strong> Cursor writes code — it won’t stop a client’s change loop.",
        },
        {
          zh: "<strong>渠道优先一手：</strong>副业可以舒服，但不该长期待在抽成最厚的链路里。",
          en: "<strong>Prefer first-hand channels:</strong> side work can be pleasant — not inside the thickest cut forever.",
        },
      ],
    },
    {
      heading: {
        zh: "写在最后",
        en: "Closing",
      },
      paragraphs: [
        {
          zh: "以上仍是个人体感。互联网零活 + AI，确实体感上能多一份现金流；爽不爽，很大程度取决于单从哪来、期限松不松、环境能不能让你快速迭代。想看链路和抽成，回上篇；后面如果还有值得记的坑，再写篇 3。",
          en: "Still personal. Web gigs plus AI can add real cashflow; whether it feels good hangs on where the job comes from, how loose the deadline is, and whether the env lets you iterate fast. For the pipeline and cuts, see part 1. If more traps are worth writing down, there’ll be a part 3.",
        },
      ],
    },
  ],
};
