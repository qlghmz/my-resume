(() => {
  const SITE = "https://resume.tensorview.cc";
  const DEFAULT_OG = `${SITE}/img/blog/rk3588-cover.jpg`;
  const HREFLANG = [
    { code: "zh-CN", locale: "zh" },
    { code: "en", locale: "en" },
    { code: "ja", locale: "ja" },
    { code: "x-default", locale: "zh" },
  ];

  function ensureMeta(attr, key, content) {
    if (content == null || content === "") return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", String(content));
  }

  function ensureLink(rel, href, attrs = {}) {
    if (!href) return;
    let el;
    if (attrs.hreflang) {
      el = document.head.querySelector(
        `link[rel="${rel}"][hreflang="${attrs.hreflang}"]`,
      );
    } else if (attrs.type) {
      el = document.head.querySelector(
        `link[rel="${rel}"][type="${attrs.type}"]`,
      );
    } else {
      el = document.head.querySelector(
        `link[rel="${rel}"]:not([hreflang]):not([type])`,
      );
    }
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  }

  function absoluteUrl(path) {
    if (!path) return SITE + "/";
    if (/^https?:\/\//i.test(path)) return path;
    return SITE + (path.startsWith("/") ? path : `/${path}`);
  }

  function pagePath() {
    const path = location.pathname || "/";
    if (path === "/index.html" || path === "/ja/index.html") {
      return path.startsWith("/ja") ? "/ja/" : "/";
    }
    return path.endsWith("/") || path.endsWith(".html") ? path : `${path}/`;
  }

  function logicalPath() {
    return window.I18N?.stripLocalePrefix?.(pagePath()) || pagePath();
  }

  function localePath(locale) {
    return window.I18N?.pathForLocale?.(logicalPath(), locale) || logicalPath();
  }

  function ogLocale(code) {
    if (code === "ja") return "ja_JP";
    if (code === "zh") return "zh_CN";
    return "en_US";
  }

  function applyHreflang() {
    document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((el) => el.remove());
    HREFLANG.forEach(({ code, locale }) => {
      ensureLink("alternate", absoluteUrl(localePath(locale)), {
        hreflang: code,
      });
    });
  }

  function applyShell() {
    const { t, locale } = window.I18N;
    const page = document.body?.dataset.page || "home";
    const title = t(`meta.title.${page}`) || document.title;
    const description = t(`meta.description.${page}`);
    const url = absoluteUrl(pagePath());
    const ogImage = absoluteUrl(t(`meta.ogImage.${page}`) || DEFAULT_OG);

    if (title) document.title = title;
    ensureMeta("name", "description", description);
    ensureMeta("property", "og:type", page === "article" ? "article" : "website");
    ensureMeta("property", "og:site_name", "Dong Jiahui");
    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", description);
    ensureMeta("property", "og:url", url);
    ensureMeta("property", "og:image", ogImage);
    ensureMeta("property", "og:locale", ogLocale(locale));
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", title);
    ensureMeta("name", "twitter:description", description);
    ensureMeta("name", "twitter:image", ogImage);
    ensureLink("canonical", url);
    applyHreflang();
  }

  function applyArticle(article) {
    if (!article) return;
    const { L, locale } = window.I18N;
    const title = `${L(article.title)} · Dong Jiahui`;
    const description = L(article.lede) || L(article.title);
    const url = absoluteUrl(pagePath());
    const cover =
      window.POSTS?.find((p) => p.id === article.id)?.cover ||
      article.ogImage ||
      DEFAULT_OG;
    const ogImage = absoluteUrl(cover);

    document.title = title;
    ensureMeta("name", "description", description);
    ensureMeta("property", "og:type", "article");
    ensureMeta("property", "og:site_name", "Dong Jiahui");
    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", description);
    ensureMeta("property", "og:url", url);
    ensureMeta("property", "og:image", ogImage);
    ensureMeta("property", "og:locale", ogLocale(locale));
    if (article.date) {
      ensureMeta(
        "property",
        "article:published_time",
        article.date.replace(/\./g, "-"),
      );
    }
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", title);
    ensureMeta("name", "twitter:description", description);
    ensureMeta("name", "twitter:image", ogImage);
    ensureLink("canonical", url);
    applyHreflang();
  }

  function applyJsonLdPerson() {
    const id = "jh-jsonld-person";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Dong Jiahui",
      alternateName: ["董家辉", "ドン・ジアフイ"],
      url: SITE,
      jobTitle: "Embedded Linux Engineer",
      email: "mailto:jdong@tensorview.cc",
      sameAs: ["https://github.com/qlghmz", "https://ai.tensorview.cc"],
    });
  }

  function apply() {
    const page = document.body?.dataset.page || "home";
    if (page === "article" && window.ARTICLE) {
      applyArticle(window.ARTICLE);
    } else {
      applyShell();
    }
    if (page === "home" || page === "resume" || page === "contact") {
      applyJsonLdPerson();
    }
  }

  window.SEO = { apply, SITE, absoluteUrl };
})();
