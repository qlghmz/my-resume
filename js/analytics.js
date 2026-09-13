(() => {
  const cfg = window.ANALYTICS_CONFIG || {};
  const api = { track() {}, ready: false };
  window.SiteAnalytics = api;

  if (!cfg.enabled) return;
  if (cfg.ignoreLocalhost !== false && isLocalhost()) return;
  if (cfg.respectDoNotTrack && navigator.doNotTrack === "1") return;

  const cf = cfg.cloudflare || {};
  const umamiCfg = cfg.umami || {};
  const useUmami = umamiCfg.enabled && umamiCfg.websiteId;
  let queue = [];

  function isLocalhost() {
    const h = location.hostname;
    return h === "localhost" || h === "127.0.0.1" || h === "[::1]";
  }

  function send(event, data) {
    if (!useUmami) return;
    if (typeof window.umami?.track === "function") {
      window.umami.track(event, data);
      return;
    }
    queue.push([event, data]);
  }

  api.track = (event, data) => {
    if (!event) return;
    send(event, data);
  };

  function flushQueue() {
    if (typeof window.umami?.track !== "function") return;
    queue.forEach(([event, data]) => window.umami.track(event, data));
    queue = [];
  }

  function loadCloudflare() {
    if (!cf.enabled || !cf.token) return;
    if (document.querySelector('script[src*="cloudflareinsights.com/beacon"]')) return;
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.dataset.cfBeacon = JSON.stringify({ token: cf.token });
    document.head.appendChild(script);
  }

  function loadUmami() {
    if (!useUmami) return;
    const host = String(umamiCfg.scriptHost || "https://cloud.umami.is").replace(/\/$/, "");
    if (document.querySelector('script[data-website-id="' + umamiCfg.websiteId + '"]')) return;
    const script = document.createElement("script");
    script.defer = true;
    script.src = `${host}/script.js`;
    script.dataset.websiteId = umamiCfg.websiteId;
    if (umamiCfg.domains) script.dataset.domains = umamiCfg.domains;
    script.onload = () => {
      api.ready = true;
      flushQueue();
      trackPageGoals();
    };
    document.head.appendChild(script);
  }

  function pageType() {
    return document.body?.dataset?.page || "";
  }

  function articleSlug() {
    const match = location.pathname.match(/\/blog\/([^/]+)/);
    if (!match) return "";
    return match[1].replace(/\.html$/i, "");
  }

  function trackPageGoals() {
    if (!useUmami) return;
    const page = pageType();
    const goals = {
      home: "goal_home",
      works: "goal_works",
      resume: "goal_resume",
      blog: "goal_blog",
      contact: "goal_contact",
      article: "goal_article",
    };
    const event = goals[page];
    if (!event) return;
    if (page === "article") {
      api.track(event, { slug: articleSlug() });
      bindArticleScroll();
      return;
    }
    api.track(event);
  }

  function payloadFrom(el) {
    const data = {};
    if (el.dataset.analyticsWork) data.work = el.dataset.analyticsWork;
    if (el.dataset.analyticsPost) data.post = el.dataset.analyticsPost;
    if (el.dataset.analyticsTarget) data.target = el.dataset.analyticsTarget;
    if (el.dataset.analyticsCategory) data.category = el.dataset.analyticsCategory;
    return Object.keys(data).length ? data : undefined;
  }

  function bindClicks() {
    if (!useUmami) return;
    document.addEventListener("click", (ev) => {
      const el = ev.target.closest?.("[data-analytics]");
      if (!el) return;
      const name = el.dataset.analytics;
      if (!name) return;
      api.track(name, payloadFrom(el));
    });
  }

  function bindArticleScroll() {
    if (!useUmami || pageType() !== "article") return;
    const slug = articleSlug();
    if (!slug) return;
    const sent = new Set();
    const thresholds = [25, 50, 75, 90];

    function onScroll() {
      const doc = document.documentElement;
      const height = doc.scrollHeight - doc.clientHeight;
      if (height <= 0) return;
      const pct = Math.round(((doc.scrollTop || document.body.scrollTop) / height) * 100);
      thresholds.forEach((depth) => {
        if (pct >= depth && !sent.has(depth)) {
          sent.add(depth);
          api.track("article_scroll", { slug, depth });
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  window.addEventListener("jh:locale", (ev) => {
    api.track("lang_switch", { locale: ev.detail?.locale || "" });
  });

  loadCloudflare();
  bindClicks();
  loadUmami();
})();
