// Site analytics (Cloudflare Web Analytics). See README 「访问统计」.
// token is a public beacon id (like GA measurement id), not your Cloudflare password.
window.ANALYTICS_CONFIG = {
  enabled: false,
  provider: "cloudflare",
  token: "",
  ignoreLocalhost: true,
  respectDoNotTrack: true,
};
