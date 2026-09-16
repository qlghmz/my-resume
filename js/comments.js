(() => {
  const SCRIPT_SRC = "https://giscus.app/client.js";

  function host() {
    return document.querySelector("#giscus-root");
  }

  function giscusLang() {
    const loc = window.I18N?.locale;
    if (loc === "zh") return "zh-CN";
    if (loc === "ja") return "ja";
    return "en";
  }

  function clearHost(el) {
    el.querySelectorAll("script.giscus-script, iframe").forEach((n) => n.remove());
    el.innerHTML = "";
  }

  function discussionNumber() {
    const cfg = window.GISCUS;
    const id = window.ARTICLE?.id;
    if (!cfg?.discussions || !id) return null;
    const n = cfg.discussions[id];
    return n != null ? String(n) : null;
  }

  function mount() {
    const cfg = window.GISCUS;
    const el = host();
    if (!cfg || !el) return;

    const term = discussionNumber();
    if (!term) {
      el.innerHTML = `<p class="comments-note">Comments unavailable for this page.</p>`;
      return;
    }

    clearHost(el);

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.className = "giscus-script";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", cfg.repo);
    script.setAttribute("data-repo-id", cfg.repoId);
    script.setAttribute("data-category", cfg.category);
    script.setAttribute("data-category-id", cfg.categoryId);
    script.setAttribute("data-mapping", "number");
    script.setAttribute("data-term", term);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", cfg.reactionsEnabled || "1");
    script.setAttribute("data-emit-metadata", cfg.emitMetadata || "0");
    script.setAttribute("data-input-position", cfg.inputPosition || "top");
    script.setAttribute("data-theme", cfg.theme || "transparent_dark");
    script.setAttribute("data-lang", giscusLang());
    script.setAttribute("data-loading", "lazy");
    el.appendChild(script);
  }

  function boot() {
    if (!host()) return;
    // ARTICLE script runs before this file; still wait a tick for safety.
    mount();
    window.addEventListener("jh:locale", () => mount());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.Comments = { remount: mount };
})();
