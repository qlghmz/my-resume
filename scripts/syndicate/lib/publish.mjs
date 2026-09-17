import { publishDevto } from "./publishers/devto.mjs";
import { publishQiita } from "./publishers/qiita.mjs";
import { PLATFORMS } from "./platforms.mjs";

const PUBLISHERS = {
  devto: publishDevto,
  qiita: publishQiita,
};

export function canAutoPublish(platformId) {
  return Boolean(PUBLISHERS[platformId]);
}

export function listAutoPublishPlatforms() {
  return PLATFORMS.filter((p) => canAutoPublish(p.id));
}

/**
 * Push one payload to its remote platform (if supported).
 * @returns {Promise<object|null>} remote result or null if platform is manual-only
 */
export async function publishPayload(payload, options = {}) {
  const fn = PUBLISHERS[payload.platform];
  if (!fn) {
    return {
      platform: payload.platform,
      skipped: true,
      reason: "manual-only",
    };
  }
  return fn(payload, options);
}
