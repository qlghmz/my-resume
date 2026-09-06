(() => {
  const SCRIPT_SRC = "https://giscus.app/client.js";

  function host() {
    return document.querySelector("#giscus-root");
  }

  function giscusLang() {
    return window.I18N?.locale === "zh" ? "zh-CN" : "en";
  }

  function clearHost(el) {
    el.querySelectorAll("script.giscus-script, iframe.giscus-frame, .giscus").forEach((n) => {
      if (n.id === "giscus-root") return;
      n.remove();
    });
    el.innerHTML = "";
  }

  function mount() {
    const cfg = window.GISCUS;
    const el = host();
    if (!cfg || !el) return;

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
    script.setAttribute("data-mapping", cfg.mapping || "pathname");
    script.setAttribute("data-strict", cfg.strict || "0");
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
