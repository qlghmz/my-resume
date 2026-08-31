window.ARTICLE = {
  id: "rk3588-rga-multi-camera",
  date: "2026.02.07",
  title: {
    zh: "基于 RK3588 RGA 硬件加速的三路相机并发预览方案设计",
    en: "Architecting High-Performance Multi-Camera Streaming with RGA Hardware Acceleration",
  },
  lede: {
    zh: "用 RGA + DMA 零拷贝撑起三路高清预览",
    en: "RGA + DMA zero-copy for three high-res camera streams",
  },
  tags: ["Embedded", "Linux", "Rockchip", "RGA", "C++", "Qt"],
  tagLabel: { zh: "嵌入式", en: "Embedded" },
  sections: [
    {
      paragraphs: [
        {
          zh: "在最近的嵌入式 Linux 项目中，我负责核心视觉采集模块，目标是三路高分辨率相机（同轴、USB 及无线图传）同时开启与实时预览。若继续用 CPU 软解（如 cv::cvtColor）做 YUV→RGB，会抢走算力，拖垮 UI。",
          en: "In a recent RK3588 Embedded Linux project I owned the vision capture path: three high-resolution streams (coaxial, USB, wireless) previewed at once. CPU soft conversion would choke the UI thread under that throughput.",
        },
      ],
      figures: [
        {
          src: "/img/blog/rk3588-legacy.jpg",
          caption: {
            zh: "传统 CPU 软解路径：高负载读写与 UI 争抢算力。",
            en: "Legacy CPU soft-decode path: heavy memory traffic fights the UI thread.",
          },
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
          zh: "基于 Rockchip SoC，我把流水线建在内置 RGA（2D Raster Graphic Acceleration）上，并用 DMA 零拷贝：物理连续内存里的原始 YUV 直接喂给 RGA 做格式转换与缩放，绕过多余 Cache 刷新，吃满总线带宽。",
          en: "I designed around the on-SoC RGA from day one. A DMA path feeds raw YUV from contiguous buffers into RGA for YUV→RGB and scaling, skipping extra CPU cache churn.",
        },
      ],
      figures: [
        {
          src: "/img/blog/rk3588-rga.jpg",
          caption: {
            zh: "RGA 硬件加速方案：CPU 只下轻量配置，像素路径走 DMA。",
            en: "RGA hardware path: CPU only configures; pixels stay on DMA.",
          },
        },
      ],
    },
    {
      heading: {
        zh: "攻克的技术难点",
        en: "Technical challenges",
      },
      bullets: [
        {
          zh: "<strong>内存对齐：</strong>RGA 对地址对齐极严。用 posix_memalign 做 4K 页对齐内存池，稳定 DMA，避免撕裂与段错误。",
          en: "<strong>Strict alignment:</strong> posix_memalign 4K page-aligned pools keep DMA stable and avoid tearing / faults.",
        },
        {
          zh: "<strong>异构源统一：</strong>三路接口不同（MIPI / USB），格式也不一样（UYVY / YUYV）。统一 Buffer 层按 V4L2 元数据动态配 RGA 通道。",
          en: "<strong>Heterogeneous sources:</strong> a unified buffer layer configures RGA from V4L2 metadata (UYVY vs YUYV, MIPI vs USB).",
        },
      ],
      figures: [
        {
          src: "/img/blog/rk3588-cover.jpg",
          caption: {
            zh: "现场预览界面：同轴 / 视野 / RX 可切换，硬件控制与存图在同一套 UI。",
            en: "Live preview UI: switch coaxial / FOV / RX with hardware controls in one panel.",
          },
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
          zh: "三路并发预览流畅。满负载下视频路径 CPU 占用仍很低，给业务与复杂 UI 留足余量——嵌入式里软硬结合仍然关键。",
          en: "All three cameras preview smoothly with negligible CPU on the video path, leaving headroom for business logic and UI. Hardware-aware design still wins in embedded.",
        },
      ],
    },
  ],
};
