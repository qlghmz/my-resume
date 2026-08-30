(() => {
  const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)");
  const FRAME_MS = 48;
  const FRAME_COUNT = 10;
  let busy = false;
  let overlay = null;
  let titleEl = null;
  let revealEl = null;
  let bladeEl = null;
  let flashEl = null;

  function ensureOverlay() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "cut";
    overlay.id = "cut";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
      <div class="cut-scene"></div>
      <div class="cut-reveal" id="cut-reveal"></div>
      <div class="cut-blade" id="cut-blade"></div>
      <div class="cut-flash" id="cut-flash"></div>
      <p class="cut-title" id="cut-title"></p>
    `;
    document.body.append(overlay);
    titleEl = overlay.querySelector("#cut-title");
    revealEl = overlay.querySelector("#cut-reveal");
    bladeEl = overlay.querySelector("#cut-blade");
    flashEl = overlay.querySelector("#cut-flash");
  }

  function shouldCut(anchor) {
    if (!anchor || busy) return false;
    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("#")) return false;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
    if (anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
    if (anchor.classList.contains("skip-link")) return false;
    if (/^https?:\/\//i.test(href) && !href.startsWith(window.location.origin)) {
      return false;
    }
    const url = new URL(href, window.location.href);
    if (url.pathname === window.location.pathname && url.hash) return false;
    return true;
  }

  function labelFromHref(href, fallback) {
    if (fallback) return fallback;
    try {
      const path = new URL(href, window.location.href).pathname.replace(/\/$/, "") || "/";
      const leaf = path.split("/").filter(Boolean).pop() || "MAIN";
      return leaf.toUpperCase();
    } catch {
      return "MAIN";
    }
  }

  function setFrame(i) {
    if (revealEl) revealEl.dataset.frame = String(i);
    if (bladeEl) bladeEl.dataset.frame = String(i);
    if (flashEl) flashEl.dataset.frame = String(i);
    if (titleEl) titleEl.dataset.frame = String(i);
  }

  function playDive(href, { label = "" } = {}) {
    if (!href || busy) return;
    if (REDUCE.matches) {
      window.location.href = href;
      return;
    }

    busy = true;
    ensureOverlay();
    try {
      sessionStorage.setItem("p3r-dive", "1");
    } catch {
      /* ignore */
    }

    const text = labelFromHref(href, label);
    if (titleEl) titleEl.textContent = text;

    document.body.classList.add("is-cutting");
    overlay.classList.add("is-on");
    setFrame(0);

    let frame = 0;
    const tick = () => {
      frame += 1;
      if (frame >= FRAME_COUNT) {
        window.location.href = href;
        return;
      }
      setFrame(frame);
      window.setTimeout(tick, FRAME_MS);
    };
    window.setTimeout(tick, FRAME_MS);
  }

  function playEnter() {
    let flag = null;
    try {
      flag = sessionStorage.getItem("p3r-dive");
      sessionStorage.removeItem("p3r-dive");
    } catch {
      return;
    }
    if (flag !== "1" || REDUCE.matches) return;
    document.body.classList.add("is-entering");
    window.setTimeout(() => {
      document.body.classList.remove("is-entering");
    }, 1100);
  }

  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest("a[href]");
      if (!shouldCut(a)) return;
      e.preventDefault();
      const label =
        a.dataset.en || a.querySelector(".cmd-word")?.textContent?.trim() || "";
      playDive(a.href, { label });
    },
    true,
  );

  window.playDive = playDive;
  ensureOverlay();
  playEnter();
})();
