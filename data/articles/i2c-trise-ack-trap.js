window.ARTICLE = {
  id: "i2c-trise-ack-trap",
  date: "2026.03.15",
  title: {
    zh: "Linux I2C 驱动调试实录：如何用寄存器快照外加示波器，揪出隐藏的时序陷阱",
    en: "Embedded Linux I2C Debugging: How a Register Dump Saved Me from an Invisible Timing Trap",
    ja: "Linux I2C ドライバ実録：レジスタダンプとオシロで隠れたタイミング罠を追う",
  },
  lede: {
    zh: "CCR 看起来完美，真正翻车的是 TRISE。",
    en: "CCR looked flawless. TRISE was the real trap.",
    ja: "CCR は完璧に見えた。本当に落としたのは TRISE だった。",
  },
  tags: ["Embedded", "Linux", "I2C", "Driver", "Hardware"],
  tagLabel: { zh: "嵌入式", en: "Embedded", ja: "組み込み" },
  related: [
    {
      href: "/resume/#ls2p300",
      label: {
        zh: "龙芯 LS2P300：驱动与大小核协同",
        en: "Loongson LS2P300: drivers & big–little IPC",
        ja: "Loongson LS2P300：ドライバと大小核連携",
      },
    },
  ],
  sections: [
    {
      paragraphs: [
        {
          zh: "最近在处理一个引脚资源受限的项目，需要通过 I2C 总线挂载拓展芯片来外扩 GPIO。本以为是常规任务，却碰上了偶发性恶魔：系统频繁抛出 EIO (-5)，从机偶发无 ACK。",
          en: "Recently I worked on a layout where the host MCU needed more GPIOs, so we hung an I2C expander. Standard architecture — until intermittent EIO (-5) errors and missing slave ACKs showed up.",
          ja: "最近、ピン資源が限られた案件で、I2C バスに拡張チップを載せて GPIO を増やす必要があった。定番作業のつもりが、間欠的な悪魔に遭遇：システムが頻繁に EIO (-5) を投げ、スレーブが偶発的に ACK しない。",
        },
        {
          zh: "面对软硬件交织的模糊报错，盲目改驱动多半是碰运气。我选择了结构化组合拳：示波器抓波 + 失败瞬间硬件寄存器 Dump。",
          en: "Instead of guessing at the driver, I took a structured path: scope the bus and dump physical I2C registers at the moment of failure.",
          ja: "ソフトとハードが絡む曖昧なエラーに対し、ドライバを当てずっぽうにいじるのは運任せになりやすい。構造化された手を選んだ：オシロで波形を掴み、失敗瞬間のハードウェアレジスタを Dump。",
        },
      ],
    },
    {
      heading: {
        zh: "完美的假象",
        en: "The Illusion",
        ja: "完璧な錯覚",
      },
      paragraphs: [
        {
          zh: "检查分频寄存器 CCR，按 100 kHz Standard Mode 手算完全对得上，波特率在纸面上无懈可击。",
          en: "The Clock Control Register (CCR) was calculated correctly for 100 kHz Standard Mode. On paper the baud rate looked flawless.",
          ja: "分周レジスタ CCR を確認すると、100 kHz Standard Mode の手計算と完全に一致し、紙の上のボーレートは隙がなかった。",
        },
      ],
    },
    {
      heading: {
        zh: "异常的现场",
        en: "The Symptom",
        ja: "異常の現場",
      },
      paragraphs: [
        {
          zh: "示波器上 SCL 上升沿有轻微拖尾（爬坡偏慢）；内核在失败瞬间打出的寄存器快照显示 SR1.AF = 1（应答失败）。",
          en: "The oscilloscope showed a slight trailing edge on the SCL rise. The register snapshot at failure captured SR1.AF = 1 (Acknowledge Failure).",
          ja: "オシロでは SCL 立ち上がりにわずかな遅れ（傾きが遅い）；失敗瞬間のカーネルレジスタスナップショットは SR1.AF = 1（Acknowledge Failure）を示していた。",
        },
      ],
    },
    {
      heading: {
        zh: "致命的根因",
        en: "The Root Cause",
        ja: "致命的な根因",
      },
      paragraphs: [
        {
          zh: "问题出在常被忽略的 TRISE（最大上升时间寄存器）。配置值过小，硬件状态机抢跑——SCL 还没爬到稳定高电平（Vih）就开始采样或进入下一比特，于是误码和 NACK。",
          en: "TRISE (maximum rise time) was set too low. The I2C state machine jumped the gun — sampling before SCL had reached a valid high (Vih).",
          ja: "見落としがちな TRISE（最大立ち上がり時間レジスタ）が原因だった。設定値が小さすぎ、ハードの状態機械が先走り——SCL が安定した High（Vih）に達する前にサンプリングや次ビットへ進み、誤符号と NACK になった。",
        },
      ],
    },
    {
      heading: {
        zh: "闭环与验证",
        en: "The Fix",
        ja: "修正と検証",
      },
      paragraphs: [
        {
          zh: "按外设时钟（PCLK）与 I2C 规范重算 TRISE，修正 Device Tree / 驱动初始化。10,000 次循环压力测试零报错。",
          en: "I recomputed TRISE from PCLK and the I2C spec, updated Device Tree / driver init, and the bus stayed clean across a 10,000-cycle stress test.",
          ja: "ペリフェラルクロック（PCLK）と I2C 仕様から TRISE を再計算し、Device Tree／ドライバ初期化を修正。10,000 回ループのストレステストでエラーゼロ。",
        },
      ],
    },
    {
      heading: {
        zh: "一点心得",
        en: "Key Takeaway",
        ja: "ひとつの学び",
      },
      paragraphs: [
        {
          zh: "上层驱动框架常会掩盖物理层波形。抽象层报出模糊错误时，直接读 MMIO 打一份寄存器快照——硬件比代码更诚实。",
          en: "High-level abstractions often mask physical reality. When a driver throws a generic error, dump the hardware registers. Registers do not lie.",
          ja: "上位ドライバの枠組みは物理層の波形を隠しがちだ。抽象層が曖昧なエラーを出したときは、MMIO を読んでレジスタスナップショットを取る——ハードウェアはコードより正直だ。",
        },
      ],
    },
  ],
};
