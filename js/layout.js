(() => {
  const { t, L, locale, LOCALES, setLocale } = window.I18N;

  const PAGE = document.body.dataset.page || "";
  const NAV_PAGE = PAGE === "article" ? "blog" : PAGE;
  const PATH = {
    home: { href: "/", key: "nav.main", mark: "MAIN" },
    works: { href: "/works/", key: "nav.works", mark: "WORKS" },
    resume: { href: "/resume/", key: "nav.resume", mark: "RESUME" },
    blog: { href: "/blog/", key: "nav.blog", mark: "BLOG" },
    article: { href: "/blog/", key: "nav.blog", mark: "BLOG" },
    contact: { href: "/contact/", key: "nav.contact", mark: "CONTACT" },
  };
  const LINKS = [
    { id: "works", ...PATH.works },
    { id: "resume", ...PATH.resume },
    { id: "blog", ...PATH.blog },
    { id: "contact", ...PATH.contact },
  ];

  function langSwitcherHtml() {
    return `
      <div class="lang-switch" role="group" aria-label="${t("a11y.lang")}">
        ${LOCALES.map((code) => {
          const on = code === locale ? ' aria-pressed="true"' : ' aria-pressed="false"';
          return `<button type="button" class="lang-btn" data-locale="${code}"${on}>${code.toUpperCase()}</button>`;
        }).join('<span class="lang-sep" aria-hidden="true">|</span>')}
      </div>`;
  }

  function bindLangSwitcher(root) {
    root?.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const code = btn.getAttribute("data-locale");
        if (code) setLocale(code);
      });
    });
  }

  function mountHeader() {
    const slot = document.querySelector("#site-header");
    if (!slot) return;
    if (PAGE === "home") {
      slot.innerHTML = `
        <a class="skip-link" href="#main">${t("a11y.skip")}</a>
        <div class="home-lang">${langSwitcherHtml()}</div>
      `;
      bindLangSwitcher(slot);
      return;
    }
    const here = PATH[PAGE] || PATH[NAV_PAGE] || { key: "", mark: PAGE };
    slot.innerHTML = `
      <a class="skip-link" href="#main">${t("a11y.skip")}</a>
      <header class="hud">
        <a class="logo" href="/"><span>JH.</span> DONG</a>
        <div class="hud-path">${t("nav.main")} <b>/ ${t(here.key) || here.mark}</b></div>
        <nav class="hud-links" aria-label="${t("a11y.site")}">
          ${LINKS.map((item) => {
            const on = item.id === NAV_PAGE ? ' aria-current="page"' : "";
            return `<a href="${item.href}"${on}>${t(item.key)}</a>`;
          }).join("")}
        </nav>
        ${langSwitcherHtml()}
      </header>
    `;
    bindLangSwitcher(slot);
  }

  function mountFooter() {
    const slot = document.querySelector("#site-footer");
    if (!slot) return;
    if (PAGE === "home") {
      slot.innerHTML = "";
      return;
    }
    const year = String(new Date().getFullYear());
    const copy = t("footer.copy").replace("{year}", year);
    slot.innerHTML = `
      <div class="hud-foot">
        <span>${copy}</span>
        <span>${t("footer.esc")}</span>
      </div>
    `;
  }

  function mountWatermark() {
    if (PAGE === "home") return;
    const main = document.querySelector("main");
    if (!main) return;
    let mark = main.querySelector(".page-giant");
    if (!mark) {
      mark = document.createElement("p");
      mark.className = "page-giant";
      mark.setAttribute("aria-hidden", "true");
      main.prepend(mark);
    }
    mark.textContent = (PATH[PAGE]?.mark || PAGE).toUpperCase();
  }

  function observeReveal() {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    nodes.forEach((el) => observer.observe(el));
  }

  function mountChrome() {
    mountHeader();
    mountFooter();
    mountWatermark();
    window.I18N.apply();
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && PAGE !== "home") {
      window.location.href = "/";
    }
  });

  window.observeReveal = observeReveal;
  window.mountChrome = mountChrome;
  window.L = L;

  mountChrome();
  window.addEventListener("jh:locale", () => {
    mountChrome();
  });
})();
