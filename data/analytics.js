// Site analytics (Cloudflare Web Analytics). See README 「访问统计」.
// token is a public beacon id (like GA measurement id), not your Cloudflare password.
window.ANALYTICS_CONFIG = {
  enabled: true,
  provider: "cloudflare",
  token: "83dea4d6857f4d3a9b67abbe34dc032c",
  ignoreLocalhost: true,
  respectDoNotTrack: true,
};
