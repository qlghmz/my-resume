window.ARTICLE = {
  id: "saas-creem-payments",
  date: "2026.09.20",
  title: {
    zh: "SaaS 海外收款：Stripe 过不了大陆主体，我改用 Creem",
    en: "Overseas SaaS Billing: Stripe Rejects a Mainland Entity, So I Used Creem",
    ja: "SaaS の海外課金：Stripe は中国大陸主体では通らず、Creem を使った",
  },
  lede: {
    zh: "给海外用户做订阅时，Stripe 不收大陆主体。要走 Stripe，至少得有一个它支持地区的公司（常见是香港）再加上当地账户。我没有先去注册香港公司，最后用 Creem 把收款跑通。下面是决策、费率对照，以及过审流程。",
    en: "Stripe will not onboard a mainland China entity. Using Stripe means a company in a supported place — often Hong Kong — plus a local account. I skipped that and shipped billing with Creem. This is the decision, the fee math, and the review flow.",
    ja: "海外ユーザー向けのサブスクで、Stripe は中国大陸の主体を受け付けない。使うなら対応地域の会社（よくあるのは香港）と現地口座が要る。香港会社は作らず、Creem で課金を通した。判断、手数料の比較、審査の流れを書く。",
  },
  tags: ["SaaS", "Stripe", "Creem", "Payments"],
  tagLabel: { zh: "技术", en: "Tech", ja: "技術" },
  related: [
    {
      href: "/blog/ai-video-creation-engine.html",
      label: {
        zh: "TensorView 相关：AI 视频引擎",
        en: "Related build: the AI video engine",
        ja: "関連：AI 動画エンジン",
      },
    },
  ],
  sections: [
    {
      paragraphs: [
        {
          zh: "这篇是接海外 SaaS 订阅时的实操笔记，不是支付公司的广告。数字以 2026 年 9 月两边官网为准：Stripe 香港定价页，以及 Creem 的 Pricing / Payouts 文档。费率会变，上线前再对一次原页。",
          en: "This is an implementation note, not an ad. Figures are from Stripe Hong Kong pricing and Creem’s Pricing / Payouts docs as of September 2026. Recheck the source pages before you launch.",
          ja: "実装メモであり、広告ではない。数字は 2026 年 9 月時点の Stripe 香港料金と Creem の Pricing／Payouts。本番前にもう一度原典を見る。",
        },
      ],
    },
    {
      heading: {
        zh: "一、先定问题：你要收的是谁的钱",
        en: "1. Decide whose money you are collecting",
        ja: "一、誰から受け取るのかを先に決める",
      },
      paragraphs: [
        {
          zh: "如果客户主要在国内、用支付宝或微信支付，这套流程不适用。下面只覆盖：产品在海外、用户刷国际信用卡、按月或按年订阅。大陆主体想直接开 Stripe，这一步就会停住。",
          en: "If your customers are in mainland China and pay with Alipay or WeChat Pay, stop here — this flow is not for that. It covers an overseas product, international cards, and monthly or yearly subscriptions. A mainland entity cannot open Stripe directly.",
          ja: "顧客が中国本土で Alipay／WeChat Pay を使うなら、この手順は対象外。海外プロダクト、国際カード、月額または年額サブスクだけを扱う。中国大陸の主体では Stripe を直接開けない。",
        },
      ],
    },
    {
      heading: {
        zh: "二、为什么 Stripe 走不通",
        en: "2. Why Stripe stops you",
        ja: "二、なぜ Stripe が止まるか",
      },
      paragraphs: [
        {
          zh: "Stripe 按「商户注册地」开户，中国大陆不在支持名单里。身份、公司和银行都在大陆时，不能合规地注册 Stripe。网上那些「改地区绕过」的教程，账号后面被关、余额被冻，不值得试。",
          en: "Stripe onboards by merchant country. Mainland China is not on the supported list. If your identity, company, and bank are all mainland, you cannot register compliantly. Region-spoofing tutorials are how accounts get closed and balances frozen.",
          ja: "Stripe は加盟店の登録地で口座を開く。中国大陸は対象外だ。本人確認・会社・銀行がすべて大陸なら、正規には登録できない。地域を偽る手順は、後で凍結される類なので試さない。",
        },
        {
          zh: "要继续用 Stripe，至少得有一个它支持地区的主体。对我来说，门槛相对能评估的一条是香港公司：用香港公司注册 Stripe，结算进香港银行账户，而不是大陆银行卡。美国公司（包括 Stripe Atlas）是另一条路，更重。注册公司、开户、KYC，不是周末能做完的事。我没有为了先收款去办香港主体，所以 Stripe 在这一阶段被排除。",
          en: "To use Stripe you need an entity in a supported place. The path I actually weighed was a Hong Kong company: register Stripe on that company and settle to a Hong Kong bank, not a mainland card. A US company (including Stripe Atlas) is the heavier alternative. Incorporation, a bank account, and KYC are not a weekend task. I did not open a Hong Kong company just to start charging, so Stripe was out at this stage.",
          ja: "Stripe を使うなら、対応地域の主体が最低限必要だ。自分が比較したのは香港会社：その会社で Stripe を開き、香港の銀行口座へ精算する。大陸の銀行カードではない。米国会社（Stripe Atlas を含む）はもっと重い。設立・口座・KYC は週末では終わらない。先に課金するためだけに香港主体は作らなかったので、この段階で Stripe は外した。",
        },
      ],
      bullets: [
        {
          zh: "Stripe 香港标价（官网）：本地卡 <strong>3.4% + HK$2.35</strong>；以美元结算时 <strong>3.4% + US$0.30</strong>。需要货币转换的国际卡再 <strong>+0.5%</strong>。标准价没有月费。",
          en: "Stripe Hong Kong list price: domestic cards <strong>3.4% + HK$2.35</strong>; USD settlement <strong>3.4% + US$0.30</strong>. International cards add <strong>0.5%</strong> when currency conversion is required. No monthly fee on standard pricing.",
          ja: "Stripe 香港の公示料金：国内カード <strong>3.4% + HK$2.35</strong>。米ドル精算は <strong>3.4% + US$0.30</strong>。通貨換算が必要な国際カードはさらに <strong>+0.5%</strong>。標準料金に月額はない。",
        },
        {
          zh: "Stripe 只是支付通道。税（VAT / GST / sales tax）仍然是你的事。Creem 这类 Merchant of Record 则把「法律上的卖方」和报税揽过去，费率不能和 Stripe 按同一个口径比。",
          en: "Stripe is a processor. VAT, GST, and sales tax stay your problem. A merchant of record such as Creem becomes the legal seller and files those taxes. Do not compare the two percentages as if they buy the same thing.",
          ja: "Stripe は決済代行にすぎない。VAT／GST／sales tax は自分の仕事のまま。Creem のような Merchant of Record は法的な販売者になり、税金の申告まで持つ。同じもの同士の料率比較ではない。",
        },
      ],
    },
    {
      heading: {
        zh: "三、费率：同一笔订阅实际扣多少",
        en: "3. Fees: what one subscription actually costs",
        ja: "三、手数料：同じサブスクでいくら引かれるか",
      },
      paragraphs: [
        {
          zh: "Creem 官网页的主费率是每笔成功交易 <strong>3.9% + $0.40</strong>，没有月费、没有开通费。它对外说这已包含收单、多国报税、争议处理。下面按「标价里不含税、以美元结算」估算。Creem 文档写明平台费按订单总额（含税）算，欧洲客户把 VAT 加进订单后，费基会变大。",
          en: "Creem’s headline rate is <strong>3.9% + $0.40</strong> per successful transaction, with no monthly or setup fee. They say that covers processing, tax filing in many countries, and disputes. The examples below assume USD and no tax inside the sticker price. Creem’s docs charge the platform fee on the full order total, including tax, so a VAT-inclusive European order has a larger base.",
          ja: "Creem の看板料金は成功取引ごとに <strong>3.9% + $0.40</strong>。月額も開設費もない。収単、多くの国の税務、チャージバックを含むと彼らは書いている。下の例は米ドルで、表示価格に税を含めない。Creem はプラットフォーム手数料を税込みの注文合計にかけるので、欧州で VAT が乗ると母数が増える。",
        },
      ],
      bullets: [
        {
          zh: "<strong>$20 / 月：</strong>Stripe 香港美元结算约 20×3.4%+$0.30 = <strong>$0.98</strong>（约 4.9%）。Creem 约 20×3.9%+$0.40 = <strong>$1.18</strong>（约 5.9%）。",
          en: "<strong>$20 / month:</strong> Stripe HK in USD ≈ 20×3.4%+$0.30 = <strong>$0.98</strong> (~4.9%). Creem ≈ 20×3.9%+$0.40 = <strong>$1.18</strong> (~5.9%).",
          ja: "<strong>$20／月：</strong>Stripe 香港の米ドル精算は約 20×3.4%+$0.30 = <strong>$0.98</strong>（約 4.9%）。Creem は約 20×3.9%+$0.40 = <strong>$1.18</strong>（約 5.9%）。",
        },
        {
          zh: "<strong>$49 / 月：</strong>Stripe 约 49×3.4%+$0.30 = <strong>$1.97</strong>（约 4.0%）。Creem 约 49×3.9%+$0.40 = <strong>$2.31</strong>（约 4.7%）。",
          en: "<strong>$49 / month:</strong> Stripe ≈ 49×3.4%+$0.30 = <strong>$1.97</strong> (~4.0%). Creem ≈ 49×3.9%+$0.40 = <strong>$2.31</strong> (~4.7%).",
          ja: "<strong>$49／月：</strong>Stripe は約 49×3.4%+$0.30 = <strong>$1.97</strong>（約 4.0%）。Creem は約 49×3.9%+$0.40 = <strong>$2.31</strong>（約 4.7%）。",
        },
        {
          zh: "结论：单笔通道费 Stripe 更低，尤其是小额，因为 Creem 的 $0.40 固定费更重。但没有香港（或其他支持地）主体，Stripe 这个更低的费率你用不上。",
          en: "Stripe is cheaper per charge, especially on small tickets, because Creem’s $0.40 fixed fee hurts more. Without a Hong Kong (or other supported) entity, that cheaper rate is unavailable.",
          ja: "単体の決済手数料は Stripe の方が安い。少額ほど Creem の $0.40 固定費が響く。ただし香港（または他の対応地）の主体がなければ、その安い料率は使えない。",
        },
        {
          zh: "Creem 提现另算。银行打款取 <strong>$7 或金额的 1%，取较高者</strong>。打到 Polygon 上的 USDC 则是提现金额的 <strong>2%</strong>。所以不要每收一笔就提一次。",
          en: "Creem payouts are extra. A bank transfer costs <strong>$7 or 1%, whichever is higher</strong>. USDC on Polygon costs <strong>2%</strong> of the payout. Do not withdraw after every single sale.",
          ja: "Creem の出金は別料金。銀行送金は <strong>$7 か金額の 1% の高い方</strong>。Polygon の USDC は出金額の <strong>2%</strong>。売上のたびに引き出さない。",
        },
        {
          zh: "再用联盟（affiliate）加 <strong>2%</strong>，收入分成（revenue split）加 <strong>2%</strong>，弃购挽回加 <strong>5%</strong>。不用这些功能，就不要把它们算进基础费率。",
          en: "Affiliates add <strong>2%</strong>, revenue splits add <strong>2%</strong>, and abandoned-cart recovery adds <strong>5%</strong>. Leave them out of the base rate if you do not turn them on.",
          ja: "アフィリエイトは <strong>+2%</strong>、レベニューシェアは <strong>+2%</strong>、カゴ落ち回復は <strong>+5%</strong>。使わない機能は基本料率に足さない。",
        },
      ],
    },
    {
      heading: {
        zh: "四、过审前必须先解决的两件事",
        en: "4. Two blockers to clear before review",
        ja: "四、審査の前に潰す二つの問題",
      },
      paragraphs: [
        {
          zh: "Creem 在开通真实收款前要做账户审核。我被卡过的，以及文档里写明最常见的退回原因，就集中在「网站是不是公开的」和「邮箱、隐私页是不是对得上」。产品还在做，先用 Test Mode，不要拿一个打不开的站去送审。",
          en: "Creem reviews the account before live payments. What blocked me, and what their docs list as the usual rejections, comes down to whether the site is public and whether the email and legal pages match. If the product is not live yet, stay in Test Mode. Do not submit a site the reviewer cannot open.",
          ja: "Creem は本番課金の前にアカウント審査をする。自分が止まった点と、文書に多い差戻し理由は、「サイトが公開されているか」と「メールと法務ページが一致しているか」に集約される。製品が未完成なら Test Mode のままにする。審査員が開けないサイトは出さない。",
        },
      ],
      bullets: [
        {
          zh: "<strong>不要把站做成 private。</strong>整站密码保护、仅登录可见、预览链接过期，审核时打开失败就会被打回。定价和产品说明必须在公开页面上看得懂。",
          en: "<strong>Do not leave the site private.</strong> A password wall, login-only pages, or a dead preview link fails review. Pricing and what you sell must be understandable on a public page.",
          ja: "<strong>サイトを private のままにしない。</strong>パスワード壁、ログイン必須、切れたプレビュー URL は審査で落ちる。価格と何を売るかは公開ページで分かること。",
        },
        {
          zh: "<strong>Privacy Policy 和 Terms of Service 都要有。</strong>页脚能点到，而且不是 404。只有隐私政策、没有用户条款，同样不完整。不要写假评价、假用户数。",
          en: "<strong>You need both a Privacy Policy and Terms of Service.</strong> Link them in the footer; neither can 404. A privacy page alone is incomplete. No fake reviews or inflated user counts.",
          ja: "<strong>Privacy Policy と Terms of Service の両方が要る。</strong>フッターから開け、404 は不可。プライバシーだけでも不足。偽のレビューや誇張したユーザー数は書かない。",
        },
        {
          zh: "<strong>邮箱必须是同一把钥匙。</strong>用产品域名上的客服邮箱（例如 support@你的域名），不要用一个和网站毫无关系的 Gmail。这个地址要出现在网站上（页脚、联系页或法律页），并且和 Creem 后台 Settings → Business Details 里填的完全一致。对不上是最常见的退回原因。",
          en: "<strong>The email is one key used in two places.</strong> Use a mailbox on the product domain (support@yourdomain), not an unrelated Gmail. Show that exact address on the site (footer, contact, or legal pages) and put the same string in Creem under Settings → Business Details. A mismatch is the most common rejection.",
          ja: "<strong>メールは二箇所で同じ鍵。</strong>製品ドメインのサポートアドレス（support@あなたのドメイン）を使う。関係のない Gmail は不可。サイト上（フッター、問い合わせ、法務ページ）に出し、Creem の Settings → Business Details と一字一句同じにする。不一致が最も多い差戻しだ。",
        },
        {
          zh: "邮箱要真能收信。审核结果、补材料通知、顾客收据都会打到这里。域名邮箱如果只做了转发、转发目标进垃圾箱，你会以为「审核没回」，其实信在垃圾箱里。",
          en: "The mailbox must actually receive mail. Review results, change requests, and customer receipts go there. If domain mail only forwards and lands in spam, it looks like the review never answered.",
          ja: "そのメールは実際に届くこと。審査結果、修正依頼、顧客の領収書が来る。ドメインメールが転送だけで迷惑メールに入ると、「審査が返ってこない」ように見える。",
        },
      ],
    },
    {
      heading: {
        zh: "五、按这个顺序做",
        en: "5. Do it in this order",
        ja: "五、この順でやる",
      },
      bullets: [
        {
          zh: "<strong>1. 公开产品页。</strong>一句话说清卖什么，价格写在页面上，不是藏在登录后。",
          en: "<strong>1. Publish the product page.</strong> One sentence on what you sell, with the price on the page, not behind login.",
          ja: "<strong>1. 製品ページを公開する。</strong>何を売るか一文で書き、価格はログインの向こうではなくページ上に出す。",
        },
        {
          zh: "<strong>2. 挂上隐私政策和使用条款。</strong>用你自己的产品名、联系邮箱、收集哪些数据（账号、支付由 Creem 处理）。抄一段无关行业的模板、邮箱还是别人的，审核对不上。",
          en: "<strong>2. Add the privacy policy and terms.</strong> Use your product name, contact email, and what you collect (account data; payments handled by Creem). A template from another industry, with someone else’s email, will not match review.",
          ja: "<strong>2. プライバシーと利用規約を出す。</strong>自分の製品名、連絡メール、集めるデータ（アカウント。支払いは Creem）を書く。他業種の雛形で他人のメールのままだと審査と一致しない。",
        },
        {
          zh: "<strong>3. 把域名邮箱做通。</strong>先给自己发一封，确认收得到，再把同一地址写进网站和 Creem 后台。",
          en: "<strong>3. Make the domain mailbox work.</strong> Send yourself a message first. Then put that same address on the site and in the Creem dashboard.",
          ja: "<strong>3. ドメインのメールを通す。</strong>まず自分宛に一通送り、届くことを確認してから、同じアドレスをサイトと Creem に書く。",
        },
        {
          zh: "<strong>4. 建 Creem 商店和价格。</strong>一个月付、一个年付即可。网站和商店一一对应，不要一个商店挂多个互不相关的站。",
          en: "<strong>4. Create the Creem store and prices.</strong> One monthly and one yearly plan is enough. One store per website. Do not attach unrelated sites to the same store.",
          ja: "<strong>4. Creem のストアと価格を作る。</strong>月額一つ、年額一つで足りる。サイトとストアは一対一。無関係なサイトを同じストアに載せない。",
        },
        {
          zh: "<strong>5. 先走 Test Mode。</strong>用测试结账确认成功、取消、webhook 能打到你的服务器。产品还不能给真人用，就不要申请开通正式收款。",
          en: "<strong>5. Use Test Mode first.</strong> Confirm a test checkout, a cancellation, and a webhook hitting your server. If real users cannot use the product yet, do not request live payments.",
          ja: "<strong>5. まず Test Mode。</strong>テスト決済、解約、webhook が自分のサーバに届くことを確認する。まだ本番利用者に出せないなら、ライブ課金は申請しない。",
        },
        {
          zh: "<strong>6. 提交审核，然后等。</strong>我这边每一轮大约 <strong>2–4 小时</strong>会有结果。通过就开通；缺隐私页、站打不开、邮箱不一致，就按退回说明改完再提，下一轮还是这个量级的等待。官方 FAQ 写的常见窗口是 24–48 小时、忙时到 72 小时。以你后台状态和邮箱为准，不要每十分钟改一次资料把队列弄乱。",
          en: "<strong>6. Submit and wait.</strong> Each round came back for me in about <strong>2–4 hours</strong>. Approval enables live mode; a missing privacy page, an unreachable site, or an email mismatch means you fix that note and submit again, then wait another round of the same length. Creem’s FAQ lists a typical window of 24–48 hours, up to 72 when busy. Trust the dashboard and the mailbox. Do not edit the application every ten minutes.",
          ja: "<strong>6. 出して待つ。</strong>自分の場合、各ラウンドはおよそ <strong>2〜4 時間</strong>で結果が来た。通れば本番。プライバシー欠落、サイトに到達できない、メール不一致なら指摘どおり直して再提出し、また同程度待つ。公式 FAQ の目安は 24〜48 時間、混雑時は 72 時間。ダッシュボードとメールを見る。十分ごとに資料をいじらない。",
        },
        {
          zh: "<strong>7. 通过后再切正式密钥。</strong>把 live API key 放在服务器环境变量里，不要写进前端。Webhook 校验签名。然后再做一笔小额真实订阅，确认扣款、账单邮件、后台能看到订单。",
          en: "<strong>7. Switch to live keys only after approval.</strong> Keep the live API key in server environment variables, not in the frontend. Verify webhook signatures. Then run one small real subscription and confirm the charge, the receipt email, and the order in the dashboard.",
          ja: "<strong>7. 通過してから本番鍵に切り替える。</strong>live API key はサーバの環境変数に置き、フロントに書かない。Webhook は署名を検証する。その後、少額の本番サブスクを一つ通し、課金・領収メール・ダッシュボードの注文を確認する。",
        },
        {
          zh: "<strong>8. 单独做收款账户。</strong>Balance → Payout Account：身份或公司材料、银行账户或 USDC 钱包。这一步也要等审核，和商店审核不是同一个按钮。",
          en: "<strong>8. Set up the payout account separately.</strong> Balance → Payout Account: identity or company documents, plus a bank account or USDC wallet. That review is not the same button as the store review.",
          ja: "<strong>8. 入金口座は別に用意する。</strong>Balance → Payout Account で本人または会社資料と、銀行口座か USDC ウォレット。ストア審査とは別のボタンだ。",
        },
      ],
    },
    {
      heading: {
        zh: "六、过了之后还要守住的",
        en: "6. What still matters after approval",
        ja: "六、通過後も守ること",
      },
      bullets: [
        {
          zh: "改网站联系邮箱时，同时改 Creem 后台。只改一边，下次复审又会因为 mismatch 停掉。",
          en: "When you change the contact email on the site, change it in Creem too. Updating only one side fails the next review on a mismatch.",
          ja: "サイトの連絡メールを変えたら Creem も変える。片方だけだと、次の再審査で mismatch になる。",
        },
        {
          zh: "隐私政策里写清：付款信息由 Creem 处理，你的服务器不要去存完整卡号。",
          en: "Say in the privacy policy that payment details are handled by Creem. Do not store full card numbers on your server.",
          ja: "プライバシーに、支払い情報は Creem が扱うと書く。自分のサーバに完全なカード番号を置かない。",
        },
        {
          zh: "提现按月或按结算周期一次，不要为了几美元去付那笔 $7 的银行手续费。",
          en: "Withdraw on the payout cycle, not after a few dollars — the $7 bank fee will eat the payout.",
          ja: "出金は精算周期に合わせる。数ドルのために $7 の銀行手数料を払わない。",
        },
      ],
    },
    {
      paragraphs: [
        {
          zh: "短结论：大陆主体用不成 Stripe；要 Stripe 就先备一个香港（或其他支持地）主体。不想为收款先办公司，就用 Creem 这种 Merchant of Record，接受略高的单笔费，换掉报税和主体问题。送审前把站公开、隐私条款挂上、域名邮箱对齐。我遇到的每一轮审核，大约 2–4 小时会出结果。",
          en: "Short version: a mainland entity cannot use Stripe. Stripe means a Hong Kong or other supported company first. If you will not incorporate just to get paid, use a merchant of record like Creem, accept a slightly higher per-charge fee, and skip being the tax-filing seller. Before review, make the site public, publish privacy and terms, and match the domain email. Each review round came back for me in about 2–4 hours.",
          ja: "短い結論：中国大陸の主体では Stripe は使えない。Stripe なら先に香港など対応地の会社が要る。課金のためだけに会社を作らないなら、Creem のような Merchant of Record を使い、やや高い単体手数料と引き換えに税務と主体の問題を外す。審査前にサイトを公開し、プライバシーと規約を載せ、ドメインメールを一致させる。自分の各審査はおよそ 2〜4 時間で結果が来た。",
        },
      ],
    },
  ],
};
