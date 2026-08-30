(() => {
  const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)");
  let diving = false;
  let overlay = null;
  let titleEl = null;

  function ensureOverlay() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "dive";
    overlay.id = "dive";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
      <div class="dive-wash"></div>
      <div class="dive-water">
        <div class="dive-surface"></div>
        <div class="dive-caustic"></div>
        <div class="dive-bubbles" aria-hidden="true">
          ${Array.from({ length: 18 }, (_, i) => `<span style="--i:${i}"></span>`).join("")}
        </div>
      </div>
      <p class="dive-title" id="dive-title"></p>
    `;
    document.body.append(overlay);
    titleEl = overlay.querySelector("#dive-title");
  }

  function shouldDive(anchor) {
    if (!anchor || diving) return false;
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

  function playDive(href, { label = "" } = {}) {
    if (!href || diving) return;
    if (REDUCE.matches) {
      window.location.href = href;
      return;
    }

    diving = true;
    ensureOverlay();
    try {
      sessionStorage.setItem("p3r-dive", "1");
    } catch {
      /* ignore */
    }

    const text =
      label ||
      (() => {
        try {
          const path = new URL(href, window.location.href).pathname.replace(/\/$/, "") || "/";
          const leaf = path.split("/").filter(Boolean).pop() || "MAIN";
          return leaf.toUpperCase();
        } catch {
          return "";
        }
      })();

    if (titleEl) titleEl.textContent = text;
    document.body.classList.add("is-diving");
    overlay.classList.remove("is-on");
    void overlay.offsetWidth;
    overlay.classList.add("is-on");

    const done = () => {
      window.location.href = href;
    };
    window.setTimeout(done, 1250);
  }

  function playSurface() {
    let flag = null;
    try {
      flag = sessionStorage.getItem("p3r-dive");
      sessionStorage.removeItem("p3r-dive");
    } catch {
      return;
    }
    if (flag !== "1" || REDUCE.matches) return;
    document.body.classList.add("is-surfacing");
    window.setTimeout(() => {
      document.body.classList.remove("is-surfacing");
    }, 900);
  }

  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest("a[href]");
      if (!shouldDive(a)) return;
      e.preventDefault();
      const label = a.dataset.en || a.querySelector(".cmd-word")?.textContent?.trim() || "";
      playDive(a.href, { label });
    },
    true,
  );

  window.playDive = playDive;
  ensureOverlay();
  playSurface();
})();
