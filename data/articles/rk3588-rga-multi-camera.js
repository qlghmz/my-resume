window.ARTICLE = {
  id: "rk3588-rga-multi-camera",
  date: "2026.02.07",
  title: {
    zh: "基于 RK3588 RGA 硬件加速的三路相机并发预览方案设计",
    en: "Architecting High-Performance Multi-Camera Streaming with RGA Hardware Acceleration",
  },
  lede: {
    zh: "用 RGA 硬件加速搭建高性能多相机流式预览",
    en: "Architecting High-Performance Multi-Camera Streaming with RGA Hardware Acceleration",
  },
  tags: ["Embedded", "Linux", "Rockchip", "RGA", "C++", "Qt"],
  tagLabel: { zh: "嵌入式", en: "Embedded" },
  sections: [
    {
      paragraphs: [
        {
          zh: "在最近的嵌入式 Linux 项目开发中，我负责核心的视觉采集模块，目标是实现三路高分辨率相机（包括同轴、USB 及无线图传）的同时开启与实时预览。面对如此高吞吐量的视频流数据，我在架构设计初期就意识到：如果沿用传统的 CPU 软解（如 cv::cvtColor）进行 YUV 到 RGB 的格式转换，必然会抢占宝贵的 CPU 算力，导致 UI 交互卡顿。",
          en: "In my recent Embedded Linux project (RK3588), I was tasked with simultaneously capturing and previewing three distinct high-resolution camera streams (Coaxial, USB, and Wireless transmission). A traditional CPU-based approach would bottleneck such high-throughput video data and choke the UI thread.",
        },
      ],
    },
    {
      heading: {
        zh: "架构选型与实现方案",
        en: "The architectural decision",
      },
      paragraphs: [
        {
          zh: "基于对 Rockchip 硬件架构的理解，我直接采用了 SoC 内置的 RGA (2D Raster Graphic Acceleration) 引擎作为核心处理单元。我设计了一套基于 DMA 的零拷贝取图机制。通过直接操作物理连续内存，将多路相机的原始 YUV 数据直接喂给 RGA 硬件进行格式转换与缩放，绕过 CPU 的 Cache 刷新，最大化利用了总线带宽。",
          en: "I designed the pipeline around the RGA engine from day one. A DMA-based path feeds raw YUV from V4L2 buffers into RGA for YUV-to-RGB conversion and scaling, bypassing extra CPU cache operations.",
        },
      ],
    },
    {
      heading: {
        zh: "攻克的技术难点",
        en: "Technical challenges",
      },
      paragraphs: [
        {
          zh: "虽然 RGA 效率极高，但在落地时我解决了以下底层挑战：",
          en: "RGA is efficient, but shipping it required solving these low-level issues:",
        },
      ],
      bullets: [
        {
          zh: "<strong>内存管理的严苛要求：</strong>RGA 对内存地址有严格的对齐约束。我通过 posix_memalign 实现了 4K 页对齐的内存池管理，确保硬件 DMA 传输的稳定性，解决了潜在的画面撕裂与段错误问题。",
          en: "<strong>Strict memory alignment:</strong> posix_memalign memory pool for 4K page-aligned buffers, preventing DMA errors and tearing.",
        },
        {
          zh: "<strong>异构源的统一抽象：</strong>三路相机接口不同（MIPI / USB），输出格式（UYVY / YUYV）也不尽相同。我封装了统一的 Buffer 处理层，根据 V4L2 捕获的元数据动态配置 RGA 通道，实现对不同硬件源的透明兼容。",
          en: "<strong>Heterogeneous sources:</strong> a unified buffer layer dynamically configures RGA channels from source metadata (UYVY vs YUYV, MIPI vs USB).",
        },
      ],
    },
    {
      heading: {
        zh: "最终成果",
        en: "Outcome",
      },
      paragraphs: [
        {
          zh: "该方案成功实现了三路相机的并发流畅预览。在满负载运行下，CPU 依然保持在极低的占用率，为后续的业务逻辑和复杂 UI 渲染留足了算力空间。这再次证明了在嵌入式开发中，软硬结合的设计思维至关重要。",
          en: "The system supports concurrent, smooth preview of all three cameras with negligible CPU use for video processing, leaving headroom for business logic and UI — a reminder that software–hardware co-design matters in embedded work.",
        },
      ],
    },
  ],
};
