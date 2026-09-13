(() => {
  const cfg = window.ANALYTICS_CONFIG || {};
  const api = { track() {}, ready: false };
  window.SiteAnalytics = api;

  if (!cfg.enabled || !cfg.token) return;
  if (cfg.ignoreLocalhost !== false && isLocalhost()) return;
  if (cfg.respectDoNotTrack && navigator.doNotTrack === "1") return;

  function isLocalhost() {
    const h = location.hostname;
    return h === "localhost" || h === "127.0.0.1" || h === "[::1]";
  }

  function loadBeacon() {
    if (document.querySelector('script[src*="cloudflareinsights.com/beacon"]')) return;
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.dataset.cfBeacon = JSON.stringify({ token: cfg.token });
    script.onload = () => {
      api.ready = true;
    };
    document.head.appendChild(script);
  }

  loadBeacon();
})();
