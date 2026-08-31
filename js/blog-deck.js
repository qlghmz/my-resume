(() => {
  const BACKS = ["arcana-star", "arcana-moon", "arcana-cross", "arcana-orbit", "arcana-veil"];
  const HALF_MS = 160;

  let index = 0;
  let pending = null;
  let busy = false;
  let backSeed = 0;
  let angle = 0;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function posts() {
    return window.POSTS || [];
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
        <p class="blog-toc-kicker" data-i18n="blog.deck.toc">目录</p>
        <ol class="blog-toc-list" id="blog-toc-list"></ol>
      </aside>
      <div class="blog-stage">
        <div class="tarot" id="tarot-card">
          <div class="tarot-inner" id="tarot-inner">
            <div class="tarot-face tarot-back" id="tarot-back" aria-hidden="true">
              <span class="tarot-sigil"></span>
              <span class="tarot-back-label">ARCANA</span>
            </div>
            <div class="tarot-face tarot-front" id="tarot-front"></div>
          </div>
        </div>
        <p class="blog-deck-hint" data-i18n="blog.deck.hint">悬停翻牌；点击打开文章。</p>
      </div>
    `;
  }

  function fillFront(post) {
    const { t, L } = window.I18N;
    const front = document.querySelector("#tarot-front");
    if (!front || !post) return;
    const draft = !!post.draft;
    const href = post.href && post.href !== "#" ? post.href : "";
    const cta = draft ? t("blog.deck.soon") : t("blog.read");
    const link = href
      ? `<a class="tarot-cta" href="${escapeHtml(href)}"><span>${escapeHtml(cta)}</span><span aria-hidden="true">↗</span></a>`
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

  function setBack(name) {
    const back = document.querySelector("#tarot-back");
    if (!back) return;
    back.className = `tarot-face tarot-back ${name}`;
  }

  function fillToc(list) {
    const { L } = window.I18N;
    const ol = document.querySelector("#blog-toc-list");
    if (!ol) return;
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
        if (reducedMotion() || !inner) {
          index = pending;
          setBack(pickBack(true));
          fillFront(list[index]);
          syncTocActive();
          break;
        }

        // One flip → latest hovered target (skip in-between cards)
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

  function postHref(post) {
    if (!post || post.draft) return "";
    const href = post.href;
    return href && href !== "#" ? href : "";
  }

  function bind(root) {
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

    root.addEventListener("click", (ev) => {
      const btn = ev.target.closest?.(".blog-toc-item");
      if (!btn || !root.contains(btn)) return;
      const i = Number(btn.dataset.index);
      const post = posts()[i];
      const href = postHref(post);
      if (!href) {
        selectIndex(i);
        return;
      }
      window.location.assign(href);
    });

    root.addEventListener("keydown", (ev) => {
      const btn = ev.target.closest?.(".blog-toc-item");
      if (!btn) return;
      const list = posts();
      if (ev.key === "Enter" || ev.key === " ") {
        const href = postHref(list[Number(btn.dataset.index)]);
        if (href) {
          ev.preventDefault();
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
    const list = posts();
    const countEl = document.querySelector("#post-count");
    if (countEl) countEl.textContent = String(list.length).padStart(2, "0");

    if (!list.length) {
      root.innerHTML = `<p class="empty">${escapeHtml(t("blog.empty"))}</p>`;
      return true;
    }

    const keep = Math.min(index, list.length - 1);
    renderShell(root);
    index = keep;
    pending = null;
    busy = false;
    angle = 0;
    fillToc(list);
    setBack(pickBack(false));
    fillFront(list[index]);
    syncTocActive();
    setAngle(0, false);
    if (root.dataset.deckBound !== "1") {
      root.dataset.deckBound = "1";
      bind(root);
    }
    window.I18N.apply();
    return true;
  }

  window.BlogDeck = { render, selectIndex };
})();
