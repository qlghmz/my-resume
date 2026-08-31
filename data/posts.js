window.POSTS = [
  {
    id: "i2c-trise-ack-trap",
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
];
