window.BLOG_CATEGORIES = [
  {
    id: "daily",
    label: { zh: "日常", en: "Daily" },
  },
  {
    id: "tech",
    label: { zh: "技术", en: "Tech" },
  },
  {
    id: "growth",
    label: { zh: "个人发展", en: "Growth" },
  },
];

window.POSTS = [
  {
    id: "taobao-outsource-group-half-year",
    category: "growth",
    date: "2026.09.06",
    href: "/blog/taobao-outsource-group-half-year.html",
    title: {
      zh: "淘宝外包群接单半年：流程怎么走，坑在哪里",
      en: "Six Months in Taobao Outsource Groups: The Flow and the Traps",
    },
    summary: {
      zh: "个人分享，不是埋怨行业。淘宝网店进群 → 报价开工 → 月底结算；钱、单价、抽成和回头客上的真实感受。",
      en: "Personal sharing, not a rant. Shop groups → quote & build → month-end pay; notes on cash timing, rates, cuts, and repeats.",
    },
  },
  {
    id: "i2c-trise-ack-trap",
    category: "tech",
    date: "2026.03.15",
    href: "/blog/i2c-trise-ack-trap.html",
    title: {
      zh: "Linux I2C 驱动调试实录：寄存器快照 + 示波器揪出隐藏时序陷阱",
      en: "Embedded Linux I2C Debugging: How a Register Dump Saved Me from an Invisible Timing Trap",
    },
    summary: {
      zh: "偶发 EIO / 无 ACK。CCR 看着完美，示波器却看到 SCL 拖尾；失败瞬间 SR1.AF=1，根因是 TRISE 配小了。",
      en: "Intermittent EIO and missing ACKs. CCR looked perfect, but the scope showed SCL trailing edges; SR1.AF=1 at failure — TRISE was set too low.",
    },
  },
  {
    id: "rk3588-rga-multi-camera",
    category: "tech",
    date: "2026.02.07",
    href: "/blog/rk3588-rga-multi-camera.html",
    cover: "/img/blog/rk3588-cover.jpg",
    title: {
      zh: "基于 RK3588 RGA 硬件加速的三路相机并发预览方案设计",
      en: "Architecting High-Performance Multi-Camera Streaming with RGA Hardware Acceleration",
    },
    summary: {
      zh: "三路高分辨率相机同时预览。RGA + DMA 零拷贝做格式转换，统一异构源，CPU 占用很低。",
      en: "Concurrent preview of three high-res cameras. RGA + DMA zero-copy conversion with a unified buffer layer — low CPU use.",
    },
  },
  {
    id: "ai-video-creation-engine",
    category: "tech",
    date: "2026.01.30",
    href: "/blog/ai-video-creation-engine.html",
    cover: "/img/blog/ai-video-cover.jpg",
    title: {
      zh: "我构建了一个分布式 AI 视频创作引擎",
      en: "Reimagining Video Creation with AI & GPU Acceleration",
    },
    summary: {
      zh: "FastAPI + 分布式 GPU / NVENC。DeepSeek 改写、Edge-TTS 配音，合成相对 CPU 方案提速约 8–10 倍。",
      en: "FastAPI + distributed GPU / NVENC. DeepSeek copywriting, Edge-TTS voiceover — about 8–10× faster than CPU rendering.",
    },
  },
  {
    id: "tonometer-freertos-threads",
    category: "tech",
    date: "2025.12",
    draft: true,
    href: "#",
    title: {
      zh: "眼压机 MCU：FreeRTOS 四线程与气路 / 电机队列设计",
      en: "Tonometer MCU: FreeRTOS four-thread and pneumatic / motor queues",
    },
    summary: {
      zh: "uart / handle / pump / motor 如何用队列协作，以及 DMA 串口帧的分段接收——草稿占位。",
      en: "How uart / handle / pump / motor cooperate via queues, plus segmented DMA UART framing — draft placeholder.",
    },
  },
];
