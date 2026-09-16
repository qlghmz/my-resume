(() => {
  const BACKS = [
    "/img/tarot-backs/joker.png",
    "/img/tarot-backs/jolly.png",
    "/img/tarot-backs/zany.png",
    "/img/tarot-backs/mad.png",
    "/img/tarot-backs/crazy.png",
    "/img/tarot-backs/droll.png",
    "/img/tarot-backs/chaos.png",
    "/img/tarot-backs/abstract.png",
    "/img/tarot-backs/mime.png",
    "/img/tarot-backs/triboulet.png",
    "/img/tarot-backs/perkeo.png",
    "/img/tarot-backs/chicot.png",
  ];
  const HALF_MS = 160;
  const CAT_KEY = "jh.blogCategory";
  const DEFAULT_CAT = "tech";

  let category = readStoredCategory();
  let index = 0;
  let pending = null;
  let busy = false;
  let backSeed = 0;
  let angle = 0;

  BACKS.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function categories() {
    return window.BLOG_CATEGORIES || [];
  }

  function allPosts() {
    return window.POSTS || [];
  }

  function posts() {
    return allPosts().filter((p) => (p.category || DEFAULT_CAT) === category);
  }

  function readStoredCategory() {
    try {
      const v = localStorage.getItem(CAT_KEY);
      if (v && (window.BLOG_CATEGORIES || []).some((c) => c.id === v)) return v;
    } catch {
      /* ignore */
    }
    return DEFAULT_CAT;
  }

  function storeCategory(id) {
    try {
      localStorage.setItem(CAT_KEY, id);
    } catch {
      /* ignore */
    }
  }

  function currentCategory() {
    return categories().find((c) => c.id === category) || categories()[0];
  }

  function countIn(catId) {
    return allPosts().filter((p) => (p.category || DEFAULT_CAT) === catId).length;
  }

  function pickBack(preferDifferent) {
    let next = Math.floor(Math.random() * BACKS.length);
    if (preferDifferent && BACKS.length > 1) {
      let guard = 0;
      while (next === backSeed && guard < 8) {
        next = Math.floor(Math.random() * BACKS.length);
        guard += 1;
      }
    }
    backSeed = next;
    return BACKS[backSeed];
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function reducedMotion() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  }

  function renderShell(root) {
    root.innerHTML = `
      <aside class="blog-toc" aria-label="posts">
        <p class="blog-toc-kicker" data-i18n="blog.deck.shelves">分栏</p>
        <div class="blog-cat-rail" id="blog-cat-rail" role="tablist"></div>
        <div class="blog-toc-divider" aria-hidden="true"></div>
        <p class="blog-toc-kicker blog-toc-kicker-sub">
          <span data-i18n="blog.deck.toc">目录</span>
          <span class="blog-toc-cat-name" id="blog-toc-cat-name"></span>
        </p>
        <ol class="blog-toc-list" id="blog-toc-list"></ol>
      </aside>
      <div class="blog-stage">
        <div class="tarot" id="tarot-card">
          <div class="tarot-inner" id="tarot-inner">
            <div class="tarot-face tarot-back" id="tarot-back" aria-hidden="true">
              <img class="tarot-back-art" id="tarot-back-art" src="/img/tarot-backs/joker.png" alt="" draggable="false" />
            </div>
            <div class="tarot-face tarot-front" id="tarot-front"></div>
          </div>
        </div>
        <p class="blog-deck-hint" data-i18n="blog.deck.hint">先选分栏 · 悬停翻牌 · 点击打开。</p>
      </div>
    `;
  }

  function fillCategories() {
    const { L } = window.I18N;
    const rail = document.querySelector("#blog-cat-rail");
    if (!rail) return;
    rail.innerHTML = categories()
      .map((cat) => {
        const on = cat.id === category ? " is-on" : "";
        const n = String(countIn(cat.id)).padStart(2, "0");
        return `
          <button type="button" class="blog-cat${on}" role="tab"
            aria-selected="${cat.id === category ? "true" : "false"}"
            data-category="${escapeHtml(cat.id)}">
            <span class="blog-cat-label">${escapeHtml(L(cat.label))}</span>
            <span class="blog-cat-count">${n}</span>
          </button>`;
      })
      .join("");
  }

  function syncCategoryActive() {
    const { L } = window.I18N;
    document.querySelectorAll(".blog-cat").forEach((btn) => {
      const on = btn.dataset.category === category;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    const nameEl = document.querySelector("#blog-toc-cat-name");
    const cat = currentCategory();
    if (nameEl && cat) nameEl.textContent = `· ${L(cat.label)}`;
  }

  function fillFront(post) {
    const { t, L } = window.I18N;
    const front = document.querySelector("#tarot-front");
    if (!front) return;

    if (!post) {
      front.innerHTML = `
        <div class="tarot-copy tarot-copy-empty">
          <span class="tarot-date">${escapeHtml(L(currentCategory()?.label || {}))}</span>
          <h3 class="tarot-title">${escapeHtml(t("blog.emptyCategory"))}</h3>
          <p class="tarot-summary">${escapeHtml(t("blog.deck.soon"))}</p>
        </div>`;
      return;
    }

    const draft = !!post.draft;
    const rawHref = post.href && post.href !== "#" ? post.href : "";
    const href = rawHref
      ? window.I18N?.localizeHref?.(rawHref) || rawHref
      : "";
    const cta = draft ? t("blog.deck.soon") : t("blog.read");
    const slug = postSlug(post);
    const link = href
      ? `<a class="tarot-cta" href="${escapeHtml(href)}" data-analytics="blog_open" data-analytics-post="${escapeHtml(slug)}"><span>${escapeHtml(cta)}</span><span aria-hidden="true">↗</span></a>`
      : `<span class="tarot-cta is-soon"><span>${escapeHtml(cta)}</span></span>`;
    const cover = post.cover
      ? `<div class="tarot-cover"><img src="${escapeHtml(post.cover)}" alt="" loading="lazy" /></div>`
      : "";

    front.innerHTML = `
      ${cover}
      <div class="tarot-copy">
        <span class="tarot-date">${escapeHtml(post.date || "")}${draft ? ` · ${escapeHtml(t("blog.deck.draft"))}` : ""}</span>
        <h3 class="tarot-title">${escapeHtml(L(post.title))}</h3>
        <p class="tarot-summary">${escapeHtml(L(post.summary))}</p>
        ${link}
      </div>
    `;
  }

  function setBack(src) {
    const art = document.querySelector("#tarot-back-art");
    if (!art || !src) return;
    if (art.getAttribute("src") !== src) art.setAttribute("src", src);
  }

  function fillToc(list) {
    const { t, L } = window.I18N;
    const ol = document.querySelector("#blog-toc-list");
    if (!ol) return;
    if (!list.length) {
      ol.innerHTML = `<li class="blog-toc-empty">${escapeHtml(t("blog.emptyCategory"))}</li>`;
      return;
    }
    const onIdx = pending !== null ? pending : index;
    ol.innerHTML = list
      .map((post, i) => {
        const on = i === onIdx ? " is-on" : "";
        const draft = post.draft ? ' data-draft="1"' : "";
        return `
          <li>
            <button type="button" class="blog-toc-item${on}" data-index="${i}"${draft}>
              <span class="blog-toc-num">${String(i + 1).padStart(2, "0")}</span>
              <span class="blog-toc-text">
                <span class="blog-toc-date">${escapeHtml(post.date || "")}</span>
                <span class="blog-toc-title">${escapeHtml(L(post.title))}</span>
              </span>
            </button>
          </li>`;
      })
      .join("");
  }

  function syncTocActive() {
    const onIdx = pending !== null ? pending : index;
    document.querySelectorAll(".blog-toc-item").forEach((btn) => {
      const i = Number(btn.dataset.index);
      btn.classList.toggle("is-on", i === onIdx);
    });
  }

  function syncCount() {
    const countEl = document.querySelector("#post-count");
    if (countEl) countEl.textContent = String(posts().length).padStart(2, "0");
  }

  function setAngle(deg, animate) {
    const inner = document.querySelector("#tarot-inner");
    if (!inner) return;
    if (animate) {
      inner.style.transition = `transform ${HALF_MS}ms cubic-bezier(.2,0,.2,1)`;
    } else {
      inner.style.transition = "none";
    }
    angle = deg;
    inner.style.transform = `rotateY(${deg}deg)`;
  }

  async function drainFlip() {
    if (busy) return;
    busy = true;
    const list = posts();
    const inner = document.querySelector("#tarot-inner");

    try {
      while (pending !== null && pending !== index) {
        if (reducedMotion() || !inner || !list.length) {
          index = pending;
          setBack(pickBack(true));
          fillFront(list[index]);
          syncTocActive();
          break;
        }

        setBack(pickBack(true));
        setAngle(angle + 180, true);
        await wait(HALF_MS);

        const reveal = pending !== null ? pending : index;
        if (reveal !== index) {
          index = reveal;
          fillFront(list[index]);
        }
        syncTocActive();

        setAngle(angle + 180, true);
        await wait(HALF_MS);

        if (angle >= 360) {
          setAngle(angle % 360, false);
          void inner.offsetWidth;
        }
      }
    } finally {
      busy = false;
      if (pending === index) pending = null;
      syncTocActive();
      if (pending !== null && pending !== index) {
        drainFlip();
      }
    }
  }

  function selectIndex(next) {
    const list = posts();
    if (!list.length) return;
    if (next < 0 || next >= list.length) return;

    pending = next;
    syncTocActive();

    if (next === index && !busy) {
      pending = null;
      return;
    }
    drainFlip();
  }

  async function selectCategory(nextId) {
    if (!categories().some((c) => c.id === nextId)) return;
    if (nextId === category && !busy) return;

    category = nextId;
    storeCategory(category);
    index = 0;
    pending = null;
    busy = false;
    syncCategoryActive();
    syncCount();

    const list = posts();
    fillToc(list);
    syncTocActive();

    const inner = document.querySelector("#tarot-inner");
    if (!list.length) {
      setBack(pickBack(true));
      fillFront(null);
      setAngle(0, false);
      return;
    }

    if (reducedMotion() || !inner) {
      setBack(pickBack(true));
      fillFront(list[0]);
      setAngle(0, false);
      return;
    }

    // One flip into the new shelf's first card
    busy = true;
    try {
      setBack(pickBack(true));
      setAngle(angle + 180, true);
      await wait(HALF_MS);
      fillFront(list[0]);
      index = 0;
      setAngle(angle + 180, true);
      await wait(HALF_MS);
      if (angle >= 360) {
        setAngle(angle % 360, false);
        void inner.offsetWidth;
      }
    } finally {
      busy = false;
    }
  }

  function postHref(post) {
    if (!post || post.draft) return "";
    const href = post.href;
    if (!href || href === "#") return "";
    return window.I18N?.localizeHref?.(href) || href;
  }

  function postSlug(post) {
    const href = postHref(post);
    if (!href) return "";
    const match = href.match(/\/blog\/([^/?#]+)/);
    return match ? match[1].replace(/\.html$/i, "") : "";
  }

  function trackBlog(event, data) {
    window.SiteAnalytics?.track?.(event, data);
  }

  function bind(root) {
    root.addEventListener("click", (ev) => {
      const catBtn = ev.target.closest?.(".blog-cat");
      if (catBtn && root.contains(catBtn)) {
        trackBlog("blog_category", { category: catBtn.dataset.category });
        selectCategory(catBtn.dataset.category);
        return;
      }

      const btn = ev.target.closest?.(".blog-toc-item");
      if (!btn || !root.contains(btn)) return;
      const i = Number(btn.dataset.index);
      const post = posts()[i];
      const href = postHref(post);
      if (!href) {
        selectIndex(i);
        return;
      }
      trackBlog("blog_open", { post: postSlug(post), source: "toc" });
      window.location.assign(href);
    });

    root.addEventListener("pointerover", (ev) => {
      const btn = ev.target.closest?.(".blog-toc-item");
      if (!btn || !root.contains(btn)) return;
      selectIndex(Number(btn.dataset.index));
    });

    root.addEventListener("focusin", (ev) => {
      const btn = ev.target.closest?.(".blog-toc-item");
      if (!btn || !root.contains(btn)) return;
      selectIndex(Number(btn.dataset.index));
    });

    root.addEventListener("keydown", (ev) => {
      const catBtn = ev.target.closest?.(".blog-cat");
      if (catBtn) {
        const cats = categories();
        const i = cats.findIndex((c) => c.id === category);
        if (ev.key === "ArrowDown" || ev.key === "ArrowRight") {
          ev.preventDefault();
          const n = Math.min(cats.length - 1, i + 1);
          selectCategory(cats[n].id).then(() => {
            document.querySelector(`.blog-cat[data-category="${cats[n].id}"]`)?.focus();
          });
        }
        if (ev.key === "ArrowUp" || ev.key === "ArrowLeft") {
          ev.preventDefault();
          const n = Math.max(0, i - 1);
          selectCategory(cats[n].id).then(() => {
            document.querySelector(`.blog-cat[data-category="${cats[n].id}"]`)?.focus();
          });
        }
        return;
      }

      const btn = ev.target.closest?.(".blog-toc-item");
      if (!btn) return;
      const list = posts();
      if (ev.key === "Enter" || ev.key === " ") {
        const post = list[Number(btn.dataset.index)];
        const href = postHref(post);
        if (href) {
          ev.preventDefault();
          trackBlog("blog_open", { post: postSlug(post), source: "toc_keyboard" });
          window.location.assign(href);
        }
        return;
      }
      if (ev.key === "ArrowDown" || ev.key === "ArrowRight") {
        ev.preventDefault();
        const cur = pending !== null ? pending : index;
        const n = Math.min(list.length - 1, cur + 1);
        selectIndex(n);
        document.querySelector(`.blog-toc-item[data-index="${n}"]`)?.focus();
      }
      if (ev.key === "ArrowUp" || ev.key === "ArrowLeft") {
        ev.preventDefault();
        const cur = pending !== null ? pending : index;
        const n = Math.max(0, cur - 1);
        selectIndex(n);
        document.querySelector(`.blog-toc-item[data-index="${n}"]`)?.focus();
      }
    });
  }

  function render() {
    const root = document.querySelector("#blog-deck");
    if (!root) return false;
    const { t } = window.I18N;

    if (!categories().length) {
      root.innerHTML = `<p class="empty">${escapeHtml(t("blog.empty"))}</p>`;
      return true;
    }

    if (!categories().some((c) => c.id === category)) {
      category = DEFAULT_CAT;
    }

    renderShell(root);
    const list = posts();
    index = list.length ? Math.min(index, list.length - 1) : 0;
    pending = null;
    busy = false;
    angle = 0;
    fillCategories();
    syncCategoryActive();
    syncCount();
    fillToc(list);
    setBack(pickBack(false));
    fillFront(list[index] || null);
    syncTocActive();
    setAngle(0, false);
    if (root.dataset.deckBound !== "1") {
      root.dataset.deckBound = "1";
      bind(root);
    }
    window.I18N.apply();
    syncCategoryActive();
    return true;
  }

  window.BlogDeck = { render, selectIndex, selectCategory };
})();
