window.RESUME = {
  sections: [
    {
      id: "work-deli",
      heading: { zh: "工作经历", en: "Work Experience", ja: "職歴" },
      counter: { zh: "得力集团", en: "Deli Group", ja: "得力集団" },
      org: {
        zh: "得力集团有限公司 · 嵌入式 Linux 驱动工程师",
        en: "Deli Group Co., Ltd. · Embedded Linux Driver Engineer",
        ja: "得力集団有限公司 · 組み込み Linux ドライバエンジニア",
      },
      cards: [
        {
          id: "ls2p300",
          meta: { zh: "2026.02 – 至今", en: "2026.02 – Present", ja: "2026.02 – 現在" },
          title: {
            zh: "龙芯 LS2P300 SoC 平台驱动开发与系统集成（JuraL 打印扫描一体机）",
            en: "Loongson LS2P300 SoC drivers & integration (JuraL MFP)",
            ja: "Loongson LS2P300 SoC プラットフォームのドライバ開発とシステム統合（JuraL 複合機）",
          },
          lead: {
            zh: "项目运行于龙芯 LS2P300 三核 SoC：主核 Linux 6.6 + 两个小核 FreeRTOS（打印引擎 / 扫描引擎），负责 Linux 侧外设驱动调试、应用层接口与大小核协同。",
            en: "LS2P300 triple-core SoC: Linux 6.6 on the big core + FreeRTOS on two small cores (print / scan engines). Own Linux-side peripheral bring-up, app APIs, and big–little coordination.",
            ja: "Loongson LS2P300 三核 SoC：大核 Linux 6.6 + 小核 FreeRTOS 2 基（印刷／スキャンエンジン）。Linux 側の周辺ドライバ立ち上げ、アプリ API、大小核連携を担当。",
          },
          bullets: [
            {
              zh: "<strong>I2C 控制器驱动：</strong>排查 SGM4593 IO 拓展板硬件 I2C 无 ACK；定位原厂驱动 TRISE 固定配置错误，按 APB 时钟与 I2C 模式公式重算上升时间后恢复通信；封装统一 I2C IO 接口（大核直控 / 小核 Mailbox 转发），完成并发互斥测试。",
              en: "<strong>I2C controller:</strong> fixed SGM4593 expander no-ACK; corrected vendor TRISE register math from APB clock / I2C mode; unified I2C IO API (direct + Mailbox forward) with concurrency tests.",
              ja: "<strong>I2C コントローラ：</strong>SGM4593 IO 拡張のハード I2C 無 ACK を調査。ベンダー駆動の TRISE 固定設定誤りを特定し、APB クロックと I2C モードの式で立ち上がり時間を再計算して通信を復旧。統一 I2C IO API（大核直控／小核 Mailbox 転送）を封装し、並行排他試験を完了。",
            },
            {
              zh: "<strong>SPI / OP 面板驱动：</strong>分析 OP 面板 SPI 逐字节中断刷新（~2 万中断/秒）；研究 CR/IER/SR/DR 等寄存器，推进 DMA SPI 传输以降低中断开销。",
              en: "<strong>SPI / OP panel:</strong> analyzed byte-interrupt refresh (~20k IRQ/s); studied CR/IER/SR/DR; moving to DMA SPI to cut IRQ cost.",
              ja: "<strong>SPI / OP パネル：</strong>OP パネル SPI のバイト割り込み刷新（約 2 万 IRQ/秒）を分析。CR/IER/SR/DR などを調査し、DMA SPI 転送で割り込み負荷を低減中。",
            },
            {
              zh: "<strong>大小核通信：</strong>梳理 Mailbox（/dev/mailbox、/dev/mailbox2）、共享内存与 SysV 消息队列；调整启动顺序，解决小核先于 U209 传感器初始化的竞态。",
              en: "<strong>Big–little IPC:</strong> Mailbox (/dev/mailbox, /dev/mailbox2), shared memory, SysV queues; fixed boot-order race before U209 sensor init.",
              ja: "<strong>大小核通信：</strong>Mailbox（/dev/mailbox、/dev/mailbox2）、共有メモリ、SysV メッセージキューを整理。起動順を調整し、小核が U209 センサ初期化より先に走る競合を解消。",
            },
            {
              zh: "<strong>设备树与构建：</strong>参与 ls2p300 平台 DTS 与 Buildroot 交叉编译环境；熟悉 LoongArch 工具链与内核驱动模块开发。",
              en: "<strong>DT & build:</strong> ls2p300 DTS and Buildroot cross env; LoongArch toolchain and kernel module workflow.",
              ja: "<strong>デバイスツリーとビルド：</strong>ls2p300 プラットフォームの DTS と Buildroot クロス環境に関与。LoongArch ツールチェーンとカーネルモジュール開発に精通。",
            },
            {
              zh: "<strong>技术栈：</strong>Linux 6.6 · LoongArch · 龙芯 LS2P300 · I2C/SPI/GPIO · Mailbox · FreeRTOS · Device Tree · Buildroot",
              en: "<strong>Stack:</strong> Linux 6.6 · LoongArch · LS2P300 · I2C/SPI/GPIO · Mailbox · FreeRTOS · Device Tree · Buildroot",
              ja: "<strong>技術スタック：</strong>Linux 6.6 · LoongArch · Loongson LS2P300 · I2C/SPI/GPIO · Mailbox · FreeRTOS · Device Tree · Buildroot",
            },
          ],
        },
      ],
    },
    {
      id: "work-jiamu",
      heading: { zh: "工作经历", en: "Work Experience", ja: "職歴" },
      counter: { zh: "佳目医疗", en: "Jiamu Medical", ja: "佳目医療" },
      org: {
        zh: "浙江佳目医疗科技有限公司 · 2024.08 – 2026.01（约 1.5 年）",
        en: "Zhejiang Jiamu Medical Technology Co., Ltd. · 2024.08 – 2026.01 (~1.5 yrs)",
        ja: "浙江佳目医療科技有限公司 · 2024.08 – 2026.01（約 1.5 年）",
      },
      cards: [
        {
          id: "mcu",
          meta: { zh: "2025.08 – 2026.01", en: "2025.08 – 2026.01", ja: "2025.08 – 2026.01" },
          title: {
            zh: "医用款眼压机 MCU 程序开发（MCU RTOS）",
            en: "Medical tonometer MCU firmware (MCU RTOS)",
            ja: "医用眼圧計 MCU プログラム開発（MCU RTOS）",
          },
          lead: {
            zh: "完成整个 MCU 系统、外设的开发，协助电机工程师完成电机控制。",
            en: "Owned the full MCU system and peripherals; assisted motor control bring-up.",
            ja: "MCU システム全体と周辺を担当し、モータ制御の立ち上げをモータエンジニアと協働。",
          },
          bullets: [
            {
              zh: "<strong>系统：</strong>FreeRTOS，四个线程 uart、handle、pump、motor，等待队列指令运作。",
              en: "<strong>System:</strong> FreeRTOS with uart / handle / pump / motor threads driven by queues.",
              ja: "<strong>システム：</strong>FreeRTOS。uart / handle / pump / motor の 4 スレッドがキュー指令で動作。",
            },
            {
              zh: "<strong>外设：</strong>IO（风扇、电源使能、trigger）、UART（上位机 + 电机驱动板）、ADC（手柄/气体压力/压力传感器）、I²C（气压传感器、按键板）、EXTI（光耦、手柄按键、按键板中断）。",
              en: "<strong>Peripherals:</strong> GPIO (fan, power enable, trigger); UART (host + motor board); ADC (handle / gas / pressure); I²C (baro, keypad); EXTI (optocoupler, keys).",
              ja: "<strong>周辺：</strong>IO（ファン、電源イネーブル、trigger）、UART（上位機 + モータ駆動板）、ADC（ハンドル／気体圧力／圧力センサ）、I²C（気圧センサ、キーパッド）、EXTI（フォトカプラ、ハンドルキー、キーパッド割り込み）。",
            },
            {
              zh: "<strong>串口：</strong>协议 head,command_type,seq,uTick,length,data,crc,tail；分段接收；DMA 发送和接收。",
              en: "<strong>UART:</strong> head,command_type,seq,uTick,length,data,crc,tail; segmented RX; DMA TX/RX.",
              ja: "<strong>UART：</strong>プロトコル head,command_type,seq,uTick,length,data,crc,tail；分割受信；DMA 送受信。",
            },
            {
              zh: "<strong>手柄 / 气路 / 电机：</strong>DMA 实时检测手柄与按键并入队；打气至指定气缸压力、开阀吹气取值；S 曲线加减速。",
              en: "<strong>Handle / pneumatics / motor:</strong> DMA key sampling to queues; inflate to target, valve blow sample; S-curve accel/decel.",
              ja: "<strong>ハンドル／気路／モータ：</strong>DMA でハンドルとキーをリアルタイム検出しキューへ；目標シリンダ圧まで加圧し、弁開放で送気サンプリング；S 字加減速。",
            },
          ],
        },
        {
          id: "mmitest",
          meta: { zh: "2024.08 – 2026.01", en: "2024.08 – 2026.01", ja: "2024.08 – 2026.01" },
          title: {
            zh: "眼压机 mmitest、longtest 工厂测试与老化工具（Qt RK3588 RGA）",
            en: "Tonometer mmitest / longtest factory & burn-in tools (Qt, RK3588, RGA)",
            ja: "眼圧計 mmitest / longtest 工場・エージングツール（Qt、RK3588、RGA）",
          },
          lead: {
            zh: "基于 Qt 的工厂测试与老化工具，运行于 RK3588，涵盖串口、相机、气路/电机校准与老化、传感器与外设测试、固件更新等。",
            en: "Qt factory and burn-in suite on RK3588: serial, cameras, pneumatic/motor cal & aging, sensors, firmware update.",
            ja: "Qt ベースの工場・エージングツール。RK3588 上で UART、カメラ、気路／モータ校正とエージング、センサ／周辺試験、ファーム更新などをカバー。",
          },
          bullets: [
            {
              zh: "<strong>平台与 RGA：</strong>Rockchip RGA（wrapbuffer_fd / wrapbuffer_virtualaddr），V4L2 DMA 或指针 UYVY/YUYV 经 imresize 转 RGB 供 Qt 显示；同轴（DMA FD）与 USB（虚拟地址）输入。",
              en: "<strong>Platform & RGA:</strong> wrapbuffer_fd / virtualaddr; V4L2 DMA or pointer UYVY/YUYV → RGB via imresize; coax (DMA FD) and USB (vaddr) paths.",
              ja: "<strong>プラットフォームと RGA：</strong>Rockchip RGA（wrapbuffer_fd / wrapbuffer_virtualaddr）。V4L2 DMA またはポインタの UYVY/YUYV を imresize で RGB 化し Qt 表示。同軸（DMA FD）と USB（仮想アドレス）入力。",
            },
            {
              zh: "<strong>相机：</strong>RkCamera + V4L2（MPLANE 同轴 UYVY / CAPTURE USB YUYV）；mmap、VIDIOC_EXPBUF 导出 DMA FD；GLVideoWidget OpenGL 预览，RX 路 Bayer SBGGR8 fragment shader Debayer。",
              en: "<strong>Cameras:</strong> RkCamera + V4L2 (MPLANE coax UYVY / CAPTURE USB YUYV); mmap + EXPBUF DMA FD; OpenGL preview; Bayer SBGGR8 debayer shader on RX.",
              ja: "<strong>カメラ：</strong>RkCamera + V4L2（MPLANE 同軸 UYVY / CAPTURE USB YUYV）；mmap、VIDIOC_EXPBUF で DMA FD をエクスポート；GLVideoWidget OpenGL プレビュー、RX 路は Bayer SBGGR8 フラグメントシェーダで Debayer。",
            },
            {
              zh: "<strong>串口与界面：</strong>QSerialPort 协议解析，McuControl 分发；气路/电机/相机/老化/固件更新/一键测试/传感器/ScreenTest/VirtualKeyboard 等模块。",
              en: "<strong>Serial & UI:</strong> QSerialPort parse + McuControl dispatch; modules for pneumatics, motor, camera, aging, OTA, one-click test, sensors, ScreenTest, VirtualKeyboard.",
              ja: "<strong>UART と UI：</strong>QSerialPort でプロトコル解析、McuControl で配送。気路／モータ／カメラ／エージング／ファーム更新／ワンクリック試験／センサ／ScreenTest／VirtualKeyboard などのモジュール。",
            },
            {
              zh: "<strong>校准：</strong>打气/吹气自校准、出厂气路与光学校准、整机老化流程。",
              en: "<strong>Calibration:</strong> inflate/blow auto-cal, factory pneumatic & optics cal, full-unit burn-in.",
              ja: "<strong>校正：</strong>加圧／送気の自動校正、出荷時の気路・光学校正、整機エージング工程。",
            },
          ],
        },
        {
          id: "debian-image",
          title: {
            zh: "公司 Debian 镜像制作与固件打包（RK3588/RK3399 Ubuntu）",
            en: "Debian image build & firmware pack (RK3588/RK3399 Ubuntu)",
            ja: "社内 Debian イメージ作成とファームウェア梱包（RK3588/RK3399 Ubuntu）",
          },
          bullets: [
            {
              zh: "rsync 导出 rootfs → dd + mkfs.ext4 → e2fsck + resize2fs -M → rk3588/rk3399-mkupdate.sh 打包 update.img，供 RKDevTool 刷机。",
              en: "rsync rootfs → dd + mkfs.ext4 → e2fsck + resize2fs -M → rk*-mkupdate.sh → update.img for RKDevTool.",
              ja: "rsync で rootfs を書き出し → dd + mkfs.ext4 → e2fsck + resize2fs -M → rk3588/rk3399-mkupdate.sh で update.img を梱包し、RKDevTool で書き込み。",
            },
          ],
        },
        {
          id: "ymodem-ota",
          title: {
            zh: "眼压机自动更新工具（MCU 固件 + Ymodem Qt）",
            en: "Tonometer auto-update tool (MCU firmware + Ymodem Qt)",
            ja: "眼圧計自動更新ツール（MCU ファーム + Ymodem Qt）",
          },
          bullets: [
            {
              zh: "Ymodem（SOH/STX、128/1024 字节、CRC）+ 串口帧（0xAA55…0x66BB）；SlaveCheck 区分 BootLoader/应用；YmodemMaster 与 mmitest 协议一致。",
              en: "Ymodem (SOH/STX, 128/1024, CRC) + frame 0xAA55…0x66BB; SlaveCheck BootLoader vs app; YmodemMaster aligned with mmitest.",
              ja: "Ymodem（SOH/STX、128/1024 バイト、CRC）+ UART フレーム（0xAA55…0x66BB）；SlaveCheck で BootLoader／アプリを区別；YmodemMaster は mmitest と同一プロトコル。",
            },
          ],
        },
        {
          id: "optics",
          title: {
            zh: "optics 光学测试工具（Qt OpenCV）",
            en: "Optics optical test tool (Qt, OpenCV)",
            ja: "optics 光学試験ツール（Qt、OpenCV）",
          },
          bullets: [
            {
              zh: "检测两条横向斜率白线中心点：形态学膨胀 + 边缘检测取中点（主方案）；投影法因精度不足取消。",
              en: "Find midpoints of two sloped white lines: dilate + edges (primary); projection dropped for accuracy.",
              ja: "傾斜した 2 本の横白線の中心点を検出：形態学膨張 + エッジで中点（主方式）；投影法は精度不足で不採用。",
            },
          ],
        },
        {
          id: "dicom",
          meta: { zh: "2024.08 – 2024.12", en: "2024.08 – 2024.12", ja: "2024.08 – 2024.12" },
          title: {
            zh: "dicom 医学成像文件制作（dicomtk + OpenCV）",
            en: "DICOM medical imaging files (DCMTK + OpenCV)",
            ja: "dicom 医用画像ファイル作成（DCMTK + OpenCV）",
          },
          bullets: [
            {
              zh: "DICOMDIR 保存/读取，结构 DICOM/UserID/TestTime/；两张图片 + 一个多帧视频共三个 DICOM 文件。",
              en: "DICOMDIR save/load under DICOM/UserID/TestTime/; two stills + one multi-frame video.",
              ja: "DICOMDIR の保存／読込、構成は DICOM/UserID/TestTime/；静止画 2 + マルチフレーム動画 1 の計 3 DICOM ファイル。",
            },
          ],
        },
        {
          id: "ad8555",
          meta: { zh: "2025.04 – 2025.06", en: "2025.04 – 2025.06", ja: "2025.04 – 2025.06" },
          title: {
            zh: "ad8555 烧录工装（MCU）",
            en: "AD8555 programming fixture (MCU)",
            ja: "ad8555 書き込み治具（MCU）",
          },
          bullets: [
            {
              zh: "DIGIN 烧写 AD8555 寄存器配置模式/倍率；ADC 读回验证；脉冲时序 &gt;50µs 为高、&lt;10µs 为低、位间隔 20µs。",
              en: "DIGIN program mode/gain; ADC verify; pulse &gt;50µs high, &lt;10µs low, 20µs bit gap.",
              ja: "DIGIN で AD8555 レジスタのモード／ゲインを書き込み；ADC で読み戻し検証；パルス時序は &gt;50µs を High、&lt;10µs を Low、ビット間隔 20µs。",
            },
          ],
        },
        {
          id: "eye-detect",
          meta: { zh: "2024.09 – 2024.12", en: "2024.09 – 2024.12", ja: "2024.09 – 2024.12" },
          title: {
            zh: "眼压机 眼球检测（YOLOv8 + OpenCV + PID + ncnn）",
            en: "Tonometer eye detection (YOLOv8 + OpenCV + PID + ncnn)",
            ja: "眼圧計 眼球検出（YOLOv8 + OpenCV + PID + ncnn）",
          },
          bullets: [
            {
              zh: "红外相机 + 结构光；YOLOv8 训练左眼/右眼/瞳孔/空/光斑五类，转 ncnn 嵌入式推理；光斑间距深度估计，Z 轴扫掠找回双光斑。",
              en: "IR + structured light; YOLOv8 five classes → ncnn; spot spacing for depth; Z sweep to recover dual spots.",
              ja: "赤外カメラ + 構造光；YOLOv8 で左眼／右眼／瞳孔／空／光斑の 5 クラスを学習し ncnn で組み込み推論；光斑間隔で深度推定、Z 軸掃引で双光斑を再取得。",
            },
          ],
        },
        {
          id: "iop-model",
          meta: {
            zh: "2024.03 – 2024.09 · 实习期间完成",
            en: "2024.03 – 2024.09 · Internship",
            ja: "2024.03 – 2024.09 · インターン期間に完了",
          },
          title: {
            zh: "眼压机 眼压计算模型（ResNet + ncnn）",
            en: "IOP estimation model (ResNet + ncnn)",
            ja: "眼圧計 眼圧推定モデル（ResNet + ncnn）",
          },
          bullets: [
            {
              zh: "分类改回归输出 float；最大形变点数据集 + 660 维吹气值输入；ncnn 嵌入式部署。",
              en: "Classification → float regression; peak-deformation dataset + 660-dim blow vector; ncnn on-device.",
              ja: "分類を回帰に変え float 出力；最大変形点データセット + 660 次元の送気値入力；ncnn で組み込み展開。",
            },
          ],
        },
        {
          id: "sam2",
          meta: { zh: "2025.06", en: "2025.06", ja: "2025.06" },
          title: {
            zh: "眼角膜检测标注（SAM2）",
            en: "Cornea annotation (SAM2)",
            ja: "角膜検出アノテーション（SAM2）",
          },
          bullets: [
            {
              zh: "600 视频 × 52 帧多边形标注；SAM2 推理脚本 + 点击引导，效率提升 ≥2×。",
              en: "600 videos × 52 frames polygon labels; SAM2 scripts + click prompts; ≥2× faster.",
              ja: "動画 600 × 52 フレームのポリゴンアノテーション；SAM2 推論スクリプト + クリック誘導で効率 ≥2×。",
            },
          ],
        },
        {
          id: "membrane",
          meta: {
            zh: "2024.06 – 2024.12 · 实习期间完成",
            en: "2024.06 – 2024.12 · Internship",
            ja: "2024.06 – 2024.12 · インターン期間に完了",
          },
          title: {
            zh: "可变眼膜项目（MCU + LCD）",
            en: "Variable eye membrane (MCU + LCD)",
            ja: "可変眼膜プロジェクト（MCU + LCD）",
          },
          bullets: [
            {
              zh: "旋钮调节密封眼膜内气压；LCD 显示缸内气压传感器眼压值。",
              en: "Knob sets sealed membrane pressure; LCD shows IOP from cylinder sensor.",
              ja: "ノブで密閉眼膜内の気圧を調整；LCD にシリンダ気圧センサ由来の眼圧値を表示。",
            },
          ],
        },
      ],
    },
    {
      id: "projects",
      heading: { zh: "项目经历", en: "Projects", ja: "プロジェクト" },
      counter: { zh: "独立 / 兼职", en: "Indie / Side", ja: "個人／副業" },
      cards: [
        {
          id: "tensorview",
          meta: {
            zh: "独立建立 · 2025 – 至今 · 产品已上线",
            en: "Indie · 2025 – Present · Live product",
            ja: "個人開発 · 2025 – 現在 · プロダクト公開済み",
          },
          title: {
            zh: "TensorView AI Agent — AI 写网页平台（ai.tensorview.cc）",
            en: "TensorView AI Agent — AI website builder (ai.tensorview.cc)",
            ja: "TensorView AI Agent — AI Web サイト構築（ai.tensorview.cc）",
          },
          lead: {
            zh: "从零搭建并上线 TensorView——面向非技术用户的 AI 网站生成 SaaS：自然语言描述需求，Agent 生成可部署 Web 应用，支持对话迭代与一键发布。",
            en: "Built TensorView from scratch: prompt-to-website SaaS for non-developers, conversational iteration, one-click deploy.",
            ja: "ゼロから TensorView を構築・公開——非技術者向け AI サイト生成 SaaS。自然言語で要件を述べると Agent がデプロイ可能な Web アプリを生成。対話での反復とワンクリック公開に対応。",
          },
          bullets: [
            {
              zh: "<strong>生成引擎：</strong>Vercel AI SDK streamText；Groq/Anthropic/OpenAI/Google/DashScope 多模型路由；Firecrawl 参考 URL；生成完整 React + Tailwind 前端。",
              en: "<strong>Engine:</strong> Vercel AI SDK streamText; multi-model routing; Firecrawl URL context; full React + Tailwind output.",
              ja: "<strong>生成エンジン：</strong>Vercel AI SDK streamText；Groq/Anthropic/OpenAI/Google/DashScope のマルチモデルルーティング；Firecrawl で参考 URL；完全な React + Tailwind フロントを生成。",
            },
            {
              zh: "<strong>预览与部署：</strong>E2B / Vercel Sandbox + Sandpack 降级；Edge 一键发布、自定义域名与 HTTPS。",
              en: "<strong>Preview & deploy:</strong> E2B / Vercel Sandbox + Sandpack fallback; Edge publish with custom domain / HTTPS.",
              ja: "<strong>プレビューとデプロイ：</strong>E2B / Vercel Sandbox + Sandpack フォールバック；Edge でワンクリック公開、カスタムドメインと HTTPS。",
            },
            {
              zh: "<strong>SaaS：</strong>Next.js App Router + TypeScript + Tailwind；Supabase Auth + RLS；Free/Pro/Team 配额与 Token 计费；Stripe。",
              en: "<strong>SaaS:</strong> Next.js App Router + TS + Tailwind; Supabase Auth + RLS; Free/Pro/Team quotas; Stripe.",
              ja: "<strong>SaaS：</strong>Next.js App Router + TypeScript + Tailwind；Supabase Auth + RLS；Free/Pro/Team の枠と Token 課金；Stripe。",
            },
            {
              zh: "<strong>技术栈：</strong>Next.js · React · TypeScript · Tailwind · Vercel AI SDK · Firecrawl · E2B/Sandbox · Sandpack · Supabase · Stripe",
              en: "<strong>Stack:</strong> Next.js · React · TypeScript · Tailwind · Vercel AI SDK · Firecrawl · E2B/Sandbox · Sandpack · Supabase · Stripe",
              ja: "<strong>技術スタック：</strong>Next.js · React · TypeScript · Tailwind · Vercel AI SDK · Firecrawl · E2B/Sandbox · Sandpack · Supabase · Stripe",
            },
          ],
        },
        {
          id: "wechat-ai",
          title: {
            zh: "五大平台 AI 助手 微信小程序",
            en: "Multi-platform AI assistant WeChat mini program",
            ja: "マルチプラットフォーム AI アシスタント WeChat ミニプログラム",
          },
          bullets: [
            {
              zh: "首页 / Coze 对话页 / WebView；H5 加载扣子对话，PAT 鉴权与会话隔离（open_user_id）；组件化工具卡片 + Markdown/代码高亮 agent-ui。",
              en: "Home / Coze chat / WebView; H5 Coze with PAT + open_user_id isolation; tool cards + Markdown/code agent-ui.",
              ja: "ホーム／Coze チャット／WebView；H5 で Coze 会話を読み込み、PAT 認証とセッション分離（open_user_id）；コンポーネント化したツールカード + Markdown／コードハイライトの agent-ui。",
            },
          ],
        },
        {
          id: "wordpress",
          title: {
            zh: "WordPress 项目开发与优化",
            en: "WordPress development & optimization",
            ja: "WordPress プロジェクト開発と最適化",
          },
          bullets: [
            {
              zh: "<strong>Jin Best Tutoring：</strong>Eikra + LearnPress 二次开发；WP Mail SMTP + Gmail API；WPForms 校验与 UI/UX 定制。",
              en: "<strong>Jin Best Tutoring:</strong> Eikra + LearnPress; WP Mail SMTP + Gmail API; WPForms validation and UI/UX.",
              ja: "<strong>Jin Best Tutoring：</strong>Eikra + LearnPress の二次開発；WP Mail SMTP + Gmail API；WPForms の検証と UI/UX カスタム。",
            },
            {
              zh: "<strong>RobotsFriends：</strong>Elementor Pro 响应式；多语言 + SEO；Partner Portal 开发与集成。",
              en: "<strong>RobotsFriends:</strong> Elementor Pro responsive; i18n + SEO; Partner Portal build & integration.",
              ja: "<strong>RobotsFriends：</strong>Elementor Pro レスポンシブ；多言語 + SEO；Partner Portal の開発と統合。",
            },
          ],
        },
        {
          id: "warelax",
          title: {
            zh: "Warelax 静态资源安全下载系统",
            en: "Warelax secure static download system",
            ja: "Warelax 静的リソース安全ダウンロードシステム",
          },
          bullets: [
            {
              zh: "Flask + 七牛云私有空间；签名时效链接；IP 识别、频率限制、Nginx 反向代理 + HTTPS + systemd。",
              en: "Flask + Qiniu private bucket; signed expiring URLs; IP/rate limits; Nginx + HTTPS + systemd.",
              ja: "Flask + 七牛クラウドのプライベートバケット；署名付き期限付き URL；IP 識別、レート制限、Nginx リバースプロキシ + HTTPS + systemd。",
            },
          ],
        },
        {
          id: "video",
          title: {
            zh: "GPU 视频处理 API 服务（FastAPI + NVENC）",
            en: "GPU video API service (FastAPI + NVENC)",
            ja: "GPU 動画処理 API サービス（FastAPI + NVENC）",
          },
          bullets: [
            {
              zh: "FFmpeg 切片/合并/TTS/BGM 混音；CUDA 解码 + h264_nvenc；MySQL + SQLAlchemy 项目/分镜/场景模型；七牛云并行上传。",
              en: "FFmpeg slice/merge/TTS/BGM; CUDA decode + h264_nvenc; MySQL/SQLAlchemy project–shot–scene; parallel Qiniu upload.",
              ja: "FFmpeg で分割／結合／TTS／BGM ミックス；CUDA デコード + h264_nvenc；MySQL + SQLAlchemy のプロジェクト／分鏡／シーンモデル；七牛への並列アップロード。",
            },
          ],
        },
      ],
    },
    {
      id: "education",
      heading: { zh: "教育背景", en: "Education", ja: "学歴" },
      counter: { zh: "2020–2024", en: "2020–2024", ja: "2020–2024" },
      cards: [
        {
          title: {
            zh: "浙大宁波理工学院（本科） · 计算机科学与技术",
            en: "Zhejiang University Ningbo Institute of Technology · B.S. Computer Science",
            ja: "浙江大学寧波理工学院（学士） · コンピュータ科学と技術",
          },
          meta: {
            zh: "2020.09 – 2024.06",
            en: "2020.09 – 2024.06",
            ja: "2020.09 – 2024.06",
          },
          bullets: [
            {
              zh: "<strong>编程：</strong>C、C++、Python、Shell；嵌入式 Linux 应用与调试、Qt、交叉编译、多线程/消息队列/信号量。",
              en: "<strong>Programming:</strong> C, C++, Python, Shell; embedded Linux apps/debug, Qt, cross-compile, threads/queues/semaphores.",
              ja: "<strong>プログラミング：</strong>C、C++、Python、Shell；組み込み Linux アプリとデバッグ、Qt、クロスコンパイル、マルチスレッド／メッセージキュー／セマフォ。",
            },
            {
              zh: "<strong>系统与移植：</strong>嵌入式 Linux 常用指令、移植与驱动定制；串口数据交换与远程控制。",
              en: "<strong>Systems:</strong> embedded Linux ops, porting, custom drivers; UART exchange and remote control.",
              ja: "<strong>システムと移植：</strong>組み込み Linux の常用コマンド、移植とドライバ定制；UART データ交換と遠隔制御。",
            },
            {
              zh: "<strong>深度学习：</strong>PyTorch/TensorFlow；常用 YOLO；ncnn、onnxruntime、paddle 嵌入式部署。",
              en: "<strong>DL:</strong> PyTorch/TensorFlow; YOLO; on-device ncnn / ONNX Runtime / Paddle.",
              ja: "<strong>深層学習：</strong>PyTorch/TensorFlow；YOLO；ncnn、onnxruntime、paddle の組み込み展開。",
            },
            {
              zh: "<strong>单片机与硬件：</strong>STM32、Arduino（UART、I²C、ADC）；会看原理图、示波器调试；FFmpeg 音视频切割与合成。",
              en: "<strong>MCU & HW:</strong> STM32, Arduino (UART, I²C, ADC); schematics & scope; FFmpeg cut/compose.",
              ja: "<strong>マイコンとハードウェア：</strong>STM32、Arduino（UART、I²C、ADC）；回路図読解とオシロデバッグ；FFmpeg による音動画の切断・合成。",
            },
          ],
        },
      ],
    },
    {
      id: "campus",
      heading: { zh: "校园经历", en: "Campus Experience", ja: "キャンパス経験" },
      counter: { zh: "可略过", en: "Optional", ja: "任意" },
      cards: [
        {
          id: "mqtt",
          meta: { zh: "2022.06 – 2023.06", en: "2022.06 – 2023.06", ja: "2022.06 – 2023.06" },
          title: {
            zh: "mosquitto 广域物联网网关（MQTT + Linux 驱动）",
            en: "Mosquitto wide-area IoT gateway (MQTT + Linux drivers)",
            ja: "mosquitto 広域 IoT ゲートウェイ（MQTT + Linux ドライバ）",
          },
          bullets: [
            {
              zh: "ARM 开发板 + IO + 手机广域物联网模型；MQTT Client-Server；Qt 界面与 IO 驱动；U-Boot 与 OS 烧录部署。",
              en: "ARM board + IO + phone WAN IoT model; MQTT client–server; Qt UI + IO drivers; U-Boot/OS flashing.",
              ja: "ARM 開発板 + IO + スマホの広域 IoT モデル；MQTT Client-Server；Qt UI と IO ドライバ；U-Boot と OS の書き込み展開。",
            },
          ],
        },
        {
          id: "robot",
          meta: {
            zh: "2022.06 – 2023.06 · 二等奖",
            en: "2022.06 – 2023.06 · Second prize",
            ja: "2022.06 – 2023.06 · 二等賞",
          },
          title: {
            zh: "浙江省机器人竞赛",
            en: "Zhejiang Robotics Contest",
            ja: "浙江省ロボットコンテスト",
          },
          bullets: [
            {
              zh: "树莓派 + STM32 自动寻路抓取；YOLOv8 训练优化，Paddle 嵌入式部署。",
              en: "Pi + STM32 pathing/grasp; YOLOv8 tune; Paddle on-device deploy.",
              ja: "Raspberry Pi + STM32 による自動経路探索と把持；YOLOv8 の学習最適化、Paddle で組み込み展開。",
            },
          ],
        },
        {
          id: "eng",
          meta: {
            zh: "2021.06 – 2021.12 · 三等奖",
            en: "2021.06 – 2021.12 · Third prize",
            ja: "2021.06 – 2021.12 · 三等賞",
          },
          title: {
            zh: "浙江省工程训练竞赛项目",
            en: "Zhejiang Engineering Training Contest",
            ja: "浙江省エンジニアリング訓練コンテストプロジェクト",
          },
          bullets: [
            {
              zh: "YOLOv5 物块识别 + 机械臂抓取，树莓派部署优化。",
              en: "YOLOv5 block detect + arm grasp; Raspberry Pi deploy/tune.",
              ja: "YOLOv5 によるブロック認識 + アーム把持、Raspberry Pi での展開最適化。",
            },
          ],
        },
      ],
    },
    {
      id: "awards",
      heading: { zh: "荣誉", en: "Honors", ja: "受賞" },
      counter: { zh: "奖学金", en: "Awards", ja: "奨学金" },
      cards: [
        {
          bullets: [
            {
              zh: "浙江省政府奖学金",
              en: "Zhejiang Provincial Government Scholarship",
              ja: "浙江省政府奨学金",
            },
            {
              zh: "宁波理工学院学业二等奖学金",
              en: "NIT Academic Second-Class Scholarship",
              ja: "寧波理工学院 学業二等奨学金",
            },
            {
              zh: "宁波理工学院创新专项奖学金",
              en: "NIT Innovation Special Scholarship",
              ja: "寧波理工学院 イノベーション特別奨学金",
            },
          ],
        },
      ],
    },
  ],
};
