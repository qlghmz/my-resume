(() => {
  const STORAGE_KEY = "jh.locale";
  const LOCALES = ["zh", "en"];
  const DEFAULT_LOCALE = "zh";
  const FALLBACK = ["en", "zh"];

  function isLocale(code) {
    return LOCALES.includes(code);
  }

  function detectLocale() {
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
    return code === "zh" ? "zh-CN" : code;
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
  }

  function setLocale(code, { persist = true } = {}) {
    if (!isLocale(code) || code === locale) {
      apply();
      return locale;
    }
    locale = code;
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch {
        /* ignore */
      }
    }
    applyDocumentLang();
    if (typeof window.dispatchEvent === "function") {
      window.dispatchEvent(
        new CustomEvent("jh:locale", { detail: { locale } }),
      );
    }
    apply();
    return locale;
  }

  window.I18N = {
    LOCALES,
    DEFAULT_LOCALE,
    STORAGE_KEY,
    get locale() {
      return locale;
    },
    isLocale,
    detectLocale,
    L,
    t,
    apply,
    setLocale,
  };

  applyDocumentLang();
})();
