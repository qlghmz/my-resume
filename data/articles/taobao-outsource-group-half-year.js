window.ARTICLE = {
  id: "taobao-outsource-group-half-year",
  date: "2026.09.06",
  title: {
    zh: "淘宝外包群接单半年：流程怎么走，坑在哪里",
    en: "Six Months in Taobao Outsource Groups: The Flow and the Traps",
    ja: "淘宝外注グループで半年受注：流れと落とし穴",
  },
  lede: {
    zh: "只讲我亲身走过的链路和踩过的坑。只是个人分享，不是埋怨或诋毁谁，也不是在骂行业——顶多算体验过后的感叹。我并不是靠这条路吃饭。具体项目细节后面再补。",
    en: "Only what I lived through. Personal sharing — not a rant against anyone or the industry, just a sigh after walking through it. I don’t live off this path. Project details later.",
    ja: "自分が通った流れと踏んだ落とし穴だけを書く。個人の共有であり、誰かや業界への非難ではない——体験したあとのため息程度だ。この道で食べているわけではない。具体的な案件の詳細は後で補う。",
  },
  tags: ["Side Hustle", "Outsourcing", "Freelance", "Growth"],
  tagLabel: { zh: "个人发展", en: "Growth", ja: "キャリア" },
  sections: [
    {
      paragraphs: [
        {
          zh: "先把话说在前面：这是个人经历分享，不是「包赚教程」，也不是点名批评某家公司或整个外包圈。下面只把我走过的淘宝外包网店 → 微信接单群这条链路拆开，方便别人看懂；再单独记下程序员侧、客户侧我碰到过的别扭之处，以及和其他渠道的一点对比。",
          en: "Up front: this is a personal note, not a get-rich guide, and not a hit piece on any firm or the whole outsource scene. I’ll unpack the Taobao shop → WeChat order-group path I walked, then the awkward bits I hit as a developer and what I saw on the client side, plus a short contrast with other channels.",
          ja: "先に断っておく：これは個人経験の共有であり、「必ず儲かる教程」でも、特定企業や外注業界全体への名指し批判でもない。以下では、自分が通った淘宝外注ネット店 → WeChat 受注グループの流れを分解し、開発者側・顧客側で感じた違和感、他チャネルとの短い対比を記す。",
        },
      ],
    },
    {
      heading: {
        zh: "一、接单流程长什么样",
        en: "1. What the flow looks like",
        ja: "一、受注の流れ",
      },
      paragraphs: [
        {
          zh: "整条链路，在我这边大致是五步。",
          en: "On my side, the pipeline was roughly five steps.",
          ja: "自分側から見ると、流れはおおよそ 5 段階だった。",
        },
      ],
      bullets: [
        {
          zh: "<strong>进群：</strong>去淘宝找外包网店，直接问客服要不要程序员。一般都会要，然后把你拉进微信群，之后就在群里接单。",
          en: "<strong>Join the group:</strong> Message Taobao outsource shops and ask if they need developers. Usually yes — they pull you into a WeChat group where orders are posted.",
          ja: "<strong>グループ参加：</strong>淘宝で外注ネット店を探し、カスタマーにプログラマーが必要か聞く。多くの場合は必要と言い、WeChat グループに入れられ、そこで受注する。",
        },
        {
          zh: "<strong>发单：</strong>发单的人，我接触下来多是某家公司（例如苏州某公司）的客服。听他们说一单完成有提成 500，具体怎么分我并不清楚。",
          en: "<strong>Orders get posted:</strong> Posters I met were mostly company customer-service staff (e.g. from a Suzhou firm). They mentioned ¥500 commission per finished order; I never saw the exact split.",
          ja: "<strong>発注：</strong>発注者は、接した限りでは多くがある会社（例：蘇州のある会社）のカスタマーだった。完了 1 件で 500 元の歩合があると聞いたが、正確な配分はわからない。",
        },
        {
          zh: "<strong>对接需求：</strong>客服通常已经和客户在一个群里（群里还可能有别的客户）。客服先谈需求，再把需求文件转到程序员接单群。觉得合适的程序员，私聊客服报价。",
          en: "<strong>Requirements:</strong> CS usually already sits with the client in a group (sometimes with other clients too). They talk requirements, forward the brief to the developer group, and interested developers DM CS with a quote.",
          ja: "<strong>要件の橋渡し：</strong>カスタマーは通常すでに顧客と同じグループにいる（他顧客もいることがある）。先に要件を話し、要件ファイルをプログラマー受注グループへ転送。合うと思った開発者はカスタマーに DM で見積もりする。",
        },
        {
          zh: "<strong>开工协作：</strong>接了单的程序员、客户、客服会再进一个小群。之后客服基本不再插手，主要是程序员和客户一边沟通一边做。",
          en: "<strong>Build:</strong> Developer, client, and CS move into a smaller group. After that CS mostly steps back; the developer talks with the client and builds in parallel.",
          ja: "<strong>着手と協働：</strong>受注したプログラマー、顧客、カスタマーが小さなグループに入る。その後カスタマーはほぼ手を引き、主に開発者と顧客が会話しながら進める。",
        },
        {
          zh: "<strong>验收与结算：</strong>客户验收完后，程序员往往要等月底，和当月其他项目一起结算。但客户下单时，钱常常已经全款给到中介了——这一点对中介公司来说优势很大。",
          en: "<strong>Acceptance & pay:</strong> After acceptance, developers often wait until month-end for a batch payout. Clients frequently paid the middleman in full at order time — a big structural advantage for the agency.",
          ja: "<strong>検収と精算：</strong>顧客の検収後、開発者は月末まで待ち、当月の他案件とまとめて精算されることが多い。一方、顧客が発注した時点で代金は仲介に全額入っていることが多い——仲介側には大きな構造的優位だ。",
        },
      ],
    },
    {
      heading: {
        zh: "二、程序员侧容易别扭的地方",
        en: "2. Where it gets awkward for developers",
        ja: "二、開発者側で感じやすい違和感",
      },
      paragraphs: [
        {
          zh: "站在接单程序员的位置，我感触最深的是下面几条。",
          en: "From the developer seat, these stuck with me the most.",
          ja: "受注プログラマーの立場で、いちばん残ったのは次の点だ。",
        },
      ],
    },
    {
      heading: {
        zh: "1. 项目真正做完之前，通常一分钱拿不到",
        en: "1. Usually no pay until the work is truly done",
        ja: "1. 本当に終わるまで、通常は一銭も入らない",
      },
      paragraphs: [
        {
          zh: "真正完成、验收之前，你往往拿不到任何款项。后面客户如果加需求、改口径，你也常常只能接着做——不然钱就一直压着。",
          en: "Before real completion and acceptance, you often see no money at all. If the client later adds scope or changes their mind, you frequently have to keep going — or the payout stays held.",
          ja: "本当の完了・検収の前は、しばしば一切の入金がない。後から顧客が要件を足したり口径を変えたりしても、続けるしかないことが多い——そうでないと代金は押さえられたままになる。",
        },
        {
          zh: "中间出现分歧时，客服会两边问：对客户说「这里当初好像没说清，要不要加钱，要不先不做」；对程序员说「你再改改、再做做」，有时也会提可以稍微加点钱。可相对中介已经拿走的部分，那点「加点」往往对不上。",
          en: "When conflict shows up, CS talks to both sides: tells the client “this may not have been clear — add budget or pause”; tells the developer “please tweak a bit more,” sometimes mentioning a little extra pay. That “extra” rarely matches what the middleman already took.",
          ja: "途中で食い違いが出ると、カスタマーは双方に話す：顧客には「当初はっきりしていなかったかも、追加予算か一旦止めか」；開発者には「もう少し直して、もう少しやって」——時には少し加算とも言う。だが仲介がすでに取った分に対し、その「加算」は釣り合わないことが多い。",
        },
        {
          zh: "你还没收到钱，就很难谈条件。中介这边风险很小：你做不下去，他们可以用这笔钱再找别人；你这边等于白干了一段。",
          en: "With no cash in hand, you have little leverage. The middleman carries little risk: if you can’t finish, they can rehire with the same money. You ate the sunk time.",
          ja: "まだ入金がないと、条件交渉は難しい。仲介側のリスクは小さい：あなたが続けられなければ、同じ金で別の人を雇える。こちらは途中までタダ働きに近い。",
        },
        {
          zh: "需求为什么难一次定死？我碰到的情况大概有几类：客户本身不太懂，后面突然想加；当时没想到，程序员也不可能样样行业都熟；再糟一点，就是沟通变得很拧，改起来特别耗人。",
          en: "Why isn’t scope locked in one shot? What I saw: clients don’t know the domain and invent asks later; nobody foresaw every edge case, and developers can’t know every industry; or communication turns sour and every change drains you.",
          ja: "なぜ要件を一度で固めにくいのか。私が見たのはおおよそ次の類だ：顧客自身がよくわからず、後から急に足す；当時は想定できず、開発者もあらゆる業界に詳しいわけではない；さらに悪いと、コミュニケーションがねじれ、改訂が特に消耗する。",
        },
      ],
    },
    {
      heading: {
        zh: "2. 程序员到手单价很低，中间抽成很厚",
        en: "2. Developer take-home is low; the middle cut is thick",
        ja: "2. 開発者の手元単価は低く、中間マージンは厚い",
      },
      paragraphs: [
        {
          zh: "群里常常有多家公司一起发单，程序员之间竞争很激烈，到手单价真的很低。我接触过的两家，抽成差距都很大：一家大概按程序员报价的一倍报给客户；另一家甚至能报到报价的 7～8 倍。",
          en: "Multiple agencies often post in the same groups, so developers compete hard and take-home rates stay low. Two firms I ran into marked up a lot: one roughly 2× the developer quote to the client; another as high as 7–8×.",
          ja: "グループには複数社が同時に発注することも多く、開発者同士の競争は激しく、手元単価は本当に低い。接した 2 社はいずれもマージン差が大きい：1 社は開発者見積のおよそ 2 倍を顧客に提示；もう 1 社は見積の 7〜8 倍にもなり得た。",
        },
        {
          zh: "他们并不总是在意你做得有多精。只要客户那边能过关，做差一点有时也无所谓——因为他们清楚程序员到手本来就少。",
          en: "They don’t always care how polished the work is. If the client can accept it, rough edges may be fine — they know the developer take-home is already small.",
          ja: "彼らは常に仕上がりの精緻さを気にするわけではない。顧客が通れば、多少荒くても構わないことがある——開発者の手元がもともと少ないと分かっているからだ。",
        },
        {
          zh: "举个我自己的例子：中转站那一单，我报价大约 300；客户实际支付的代码费用却是 5000 多。网站前后端、服务器部署都要做完。有人觉得 300 还能接受，但后面还有来回改需求、改 UI、改各种奇怪功能——哪怕底层是开源架子，也要被拧来拧去。",
          en: "One of mine: a “transfer station” job. I quoted ~¥300; the client paid 5000+ for the code work. Full web stack plus server deploy. ¥300 can look okay until endless UI and feature churn — even on an open-source base — wears you down.",
          ja: "自分の例：中継サイト案件で、見積はおよそ 300 元；顧客が実際に払ったコード費用は 5000 元超。サイトの前後端とサーバ展開まで完了が必要。300 元でも「まあ」と思う人もいるが、その後に要件・UI・奇妙な機能の往復改訂が続く——土台がオープンソースでも、ねじ回しに消耗する。",
        },
        {
          zh: "我当时同时做 2～3 单，又有 AI 帮忙，所以当副业看，收入还能过得去：大概 1～2 周里交付两三单。但很耗精力，技术提升有限，也几乎攒不出长期被动收入，回头单也不多。",
          en: "I ran 2–3 jobs in parallel with AI help, so as a side income it looked okay: a couple of deliveries every 1–2 weeks. Cost: high energy, limited skill growth, almost no lasting passive income, and few repeats.",
          ja: "当時は 2〜3 件を並行し、AI も使ったので、副業としては収入はまだ許容範囲：おおむね 1〜2 週間で 2〜3 件納品。だが精力を使い、技術的な伸びは限られ、長期のパッシブ収入もほぼ積み上がらず、リピートも少なかった。",
        },
      ],
    },
    {
      heading: {
        zh: "3. 加了好友，也难等到回头客",
        en: "3. Even after friending clients, repeats were rare",
        ja: "3. 友だち追加しても、リピートは稀",
      },
      paragraphs: [
        {
          zh: "我几乎每个客户都加了好友，额外改动也多做了不少，但这条淘宝群链路里，几乎没人再来找我。反过来，BOSS、朋友介绍的一些单，回头客反而更多。我觉得也可能和中间客服的沟通方式有关：客户体验一般，就不太想再走同一条路。",
          en: "I added almost every client and did plenty of extra fixes, yet almost none returned via this Taobao-group path. Boss Zhipin and friend referrals brought more repeats. The CS-mediated experience may be part of it — if it feels mediocre, people don’t come back the same way.",
          ja: "ほぼすべての顧客を友だち追加し、追加改修も多くしたが、この淘宝グループ経路ではほとんど再依頼がなかった。逆に、BOSS 直聘や友人紹介の案件の方がリピートは多かった。中間カスタマーのコミュニケーションも一因かもしれない：顧客体験が平凡だと、同じ道は選びにくい。",
        },
      ],
    },
    {
      heading: {
        zh: "三、客户那边也可能吃亏",
        en: "3. Clients can lose out too",
        ja: "三、顧客側も損することがある",
      },
      paragraphs: [
        {
          zh: "还是中转站这个例子：群里竞争紧，我只能报大约 300，但中介报给客户大约 5000，中间大部分是抽成。",
          en: "Same transfer-station case: competition kept my quote around ¥300, while the agency charged the client about ¥5000 — most of it middleman margin.",
          ja: "再び中継サイトの例：グループ内の競争がきつく、見積はおよそ 300 元にしかできなかったが、仲介は顧客に約 5000 元を提示し、大半は中間マージンだった。",
        },
        {
          zh: "更让我意外的是，这位客户直接租了这家公司的服务器来跑项目，账号也不在自己手里，项目几乎全交出去。服务器我记得大约 3000 一年，还是很多人、很多项目挤在同一台机器上，跑起来很卡。这个价完全可以自己弄一台，却稀里糊涂付了钱。",
          en: "What surprised me more: the client rented that company’s server, didn’t keep the account, and fully handed the project off. ~¥3000/year on a crowded shared box that felt sluggish — enough money to self-host — yet they paid without digging in.",
          ja: "さらに意外だったのは、この顧客がその会社のサーバを直接借りてプロジェクトを回し、アカウントも手元になく、ほぼ丸投げしていたこと。サーバは記憶では年約 3000 元で、多くの人・案件が同じマシンに押し込まれ、動作は非常に遅かった。この金額なら自分で 1 台用意できるのに、よく調べず払ってしまった。",
        },
        {
          zh: "所以我看到的局面有点拧：程序员价格被压得很低，钱大多留在中间环节。淘宝上挂着的「程序员」，很多其实是临时找来的外包，保障也谈不上多硬。",
          en: "So the picture I saw is twisted: developer prices get crushed while most money stays in the middle. Many “developers” listed on Taobao are ad-hoc outsourcers — not much of a hard guarantee.",
          ja: "だから目にした構図はねじれている：開発者の単価は強く抑えられ、金の大半は中間に残る。淘宝に並ぶ「プログラマー」の多くは、実際には臨時の外注であり、保障も硬いとは言えない。",
        },
      ],
    },
    {
      heading: {
        zh: "四、先写到这里",
        en: "4. Stopping here for now",
        ja: "四、いったんここまで",
      },
      paragraphs: [
        {
          zh: "对比下来，我觉得还是其他平台更舒服：不管是 V2EX、电鸭这类论坛自己去接，还是 BOSS 直聘这类渠道，总之尽量别接专门中介公司转手的单，会好很多。另外一定要收定金，谈好分期交付——这样项目更容易做稳，开发过程里也有谈判空间；分期交付务必事先协商清楚。",
          en: "By comparison, other channels felt better: forums like V2EX or EleDuck where you take jobs yourself, or Boss Zhipin — basically anything except specialized middleman agencies. And always take a deposit and agree on staged delivery up front: projects run steadier, and you keep negotiating room while building. Lock the payment milestones before you start.",
          ja: "比べると、他のプラットフォームの方が楽だと感じる：V2EX や電鴨のようなフォーラムで自分で受けるか、BOSS 直聘のようなチャネルでもよい——要するに、専門仲介の転売案件はできるだけ避けるとだいぶマシだ。また、必ず着手金を取り、分割納品を合意する——そうすると案件は安定しやすく、開発中の交渉余地も残る。分割納品は着手前に必ず明確に決める。",
        },
        {
          zh: "以上只是个人经历和感叹，不是结论性评判。具体做过哪些项目、怎么排期，后面有空再写。若你也路过类似的外包群，我自己事后最想提前想清的三件事是：钱什么时候到手、中间抽成大概多少、需求怎么锁住少返工。",
          en: "Personal experience and a sigh — not a verdict on the industry. What projects I shipped and how I scheduled them — later. If you pass through similar groups, the three questions I wish I’d clarified earlier: when money arrives, how big the cut is, and how scope gets locked to cut rework.",
          ja: "以上は個人経験とため息であり、結論的な評価ではない。具体的にどんな案件を手がけ、どう日程を組んだかは、あとで暇があれば書く。似た外注グループを通るなら、自分が事後にいちばん先に明確にしたかった 3 点は：金はいつ手元に来るか、中間マージンはおおよそどれほどか、要件をどうロックして手戻りを減らすか、である。",
        },
      ],
    },
  ],
};
