(() => {
  const STORAGE_KEY = "jh.locale";
  const LOCALES = ["zh", "en", "ja"];
  const DEFAULT_LOCALE = "zh";
  const FALLBACK = ["en", "zh", "ja"];

  function isLocale(code) {
    return LOCALES.includes(code);
  }

  function pathIsJa(pathname = location.pathname || "/") {
    return pathname === "/ja" || pathname.startsWith("/ja/");
  }

  function stripLocalePrefix(pathname = "/") {
    let path = pathname || "/";
    if (pathIsJa(path)) {
      path = path.slice(3) || "/";
      if (!path.startsWith("/")) path = `/${path}`;
    }
    return path === "/index.html" ? "/" : path;
  }

  function pathForLocale(pathname, code) {
    const base = stripLocalePrefix(pathname);
    if (code === "ja") {
      if (base === "/" || base === "") return "/ja/";
      return `/ja${base.startsWith("/") ? base : `/${base}`}`;
    }
    return base || "/";
  }

  function localizeHref(href) {
    if (!href || href === "#" || /^https?:\/\//i.test(href) || href.startsWith("mailto:")) {
      return href;
    }
    try {
      const url = new URL(href, location.origin);
      url.pathname = pathForLocale(url.pathname, locale);
      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return href;
    }
  }

  function queryLang() {
    try {
      const q = new URLSearchParams(location.search).get("lang");
      return q && isLocale(q) ? q : "";
    } catch {
      return "";
    }
  }

  function detectLocale() {
    if (typeof window !== "undefined" && isLocale(window.__JH_LOCALE_HINT)) {
      return window.__JH_LOCALE_HINT;
    }
    if (pathIsJa()) return "ja";
    const fromQuery = queryLang();
    if (fromQuery) return fromQuery;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && isLocale(saved)) return saved;
    } catch {
      /* ignore */
    }
    const langs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language || DEFAULT_LOCALE];
    for (const raw of langs) {
      const code = String(raw || "").toLowerCase();
      if (code.startsWith("ja")) return "ja";
      if (code.startsWith("zh")) return "zh";
      if (code.startsWith("en")) return "en";
    }
    return DEFAULT_LOCALE;
  }

  let locale = detectLocale();

  function L(value) {
    if (value == null) return "";
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
    if (typeof value !== "object") return "";
    if (Object.prototype.hasOwnProperty.call(value, locale) && value[locale] != null) {
      return String(value[locale]);
    }
    for (const code of FALLBACK) {
      if (code === locale) continue;
      if (Object.prototype.hasOwnProperty.call(value, code) && value[code] != null) {
        return String(value[code]);
      }
    }
    const first = Object.values(value).find((v) => v != null && v !== "");
    return first == null ? "" : String(first);
  }

  function pathGet(root, path) {
    if (!root || !path) return undefined;
    return String(path)
      .split(".")
      .reduce((acc, key) => (acc == null ? undefined : acc[key]), root);
  }

  function t(path) {
    return L(pathGet(window.UI, path));
  }

  function htmlLang(code) {
    if (code === "zh") return "zh-CN";
    if (code === "ja") return "ja";
    return code;
  }

  function applyDocumentLang() {
    document.documentElement.lang = htmlLang(locale);
    document.documentElement.dataset.locale = locale;
  }

  function applyTitle() {
    const page = document.body?.dataset.page || "home";
    const title = t(`meta.title.${page}`);
    if (title) document.title = title;
  }

  function applyNode(el) {
    const textKey = el.getAttribute("data-i18n");
    if (textKey) el.textContent = t(textKey);

    const htmlKey = el.getAttribute("data-i18n-html");
    if (htmlKey) el.innerHTML = t(htmlKey);

    const phKey = el.getAttribute("data-i18n-placeholder");
    if (phKey) el.setAttribute("placeholder", t(phKey));

    const ariaKey = el.getAttribute("data-i18n-aria");
    if (ariaKey) el.setAttribute("aria-label", t(ariaKey));

    const titleKey = el.getAttribute("data-i18n-title");
    if (titleKey) el.setAttribute("title", t(titleKey));
  }

  function apply() {
    applyDocumentLang();
    applyTitle();
    document
      .querySelectorAll(
        "[data-i18n], [data-i18n-html], [data-i18n-placeholder], [data-i18n-aria], [data-i18n-title]",
      )
      .forEach(applyNode);
    document.querySelectorAll("[data-i18n-show]").forEach((el) => {
      const only = el.getAttribute("data-i18n-show");
      el.hidden = only !== locale;
    });
    document.querySelectorAll("[data-i18n-href]").forEach((el) => {
      const raw = el.getAttribute("data-i18n-href");
      if (raw) el.setAttribute("href", localizeHref(raw));
    });
  }

  function pathsEqual(a, b) {
    const norm = (p) => {
      let x = String(p || "/");
      if (x.endsWith("/index.html")) x = x.slice(0, -10) || "/";
      if (x.length > 1 && x.endsWith("/") && !x.endsWith(".html/")) {
        /* keep directory slash */
      }
      return x;
    };
    return norm(a) === norm(b);
  }

  function setLocale(code, { persist = true, navigate = true } = {}) {
    if (!isLocale(code)) {
      apply();
      return locale;
    }
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch {
        /* ignore */
      }
    }
    if (navigate) {
      const target = pathForLocale(location.pathname, code);
      if (!pathsEqual(location.pathname, target)) {
        location.assign(`${target}${location.search}${location.hash}`);
        return code;
      }
    }
    if (code === locale) {
      apply();
      return locale;
    }
    locale = code;
    applyDocumentLang();
    if (typeof window.dispatchEvent === "function") {
      window.dispatchEvent(
        new CustomEvent("jh:locale", { detail: { locale } }),
      );
    }
    apply();
    return locale;
  }

  /** First visit: JP browser on non-/ja URL → send to /ja/ so search & UX match. */
  function maybeRedirectJapaneseEntry() {
    if (pathIsJa()) return;
    if (typeof window !== "undefined" && window.__JH_LOCALE_HINT) return;
    if (queryLang()) return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* ignore */
    }
    if (locale === "ja") {
      location.replace(`${pathForLocale(location.pathname, "ja")}${location.search}${location.hash}`);
    }
  }

  maybeRedirectJapaneseEntry();

  window.I18N = {
    LOCALES,
    DEFAULT_LOCALE,
    STORAGE_KEY,
    get locale() {
      return locale;
    },
    isLocale,
    detectLocale,
    pathIsJa,
    stripLocalePrefix,
    pathForLocale,
    localizeHref,
    L,
    t,
    apply,
    setLocale,
  };

  applyDocumentLang();
})();
