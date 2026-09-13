// Site analytics — dual stack. See README 「访问统计」.
// Public tracker ids only; never put login passwords or API secrets here.
window.ANALYTICS_CONFIG = {
  enabled: true,
  ignoreLocalhost: true,
  respectDoNotTrack: true,
  // Performance + pageviews (Cloudflare Dashboard → Web Analytics)
  cloudflare: {
    enabled: true,
    token: "83dea4d6857f4d3a9b67abbe34dc032c",
  },
  // Behavior + countries + custom events (Umami Dashboard, Hobby free)
  umami: {
    enabled: false,
    scriptHost: "https://cloud.umami.is",
    websiteId: "",
    domains: "resume.tensorview.cc",
  },
};
