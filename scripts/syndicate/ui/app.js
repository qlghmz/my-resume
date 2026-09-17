(() => {
  const $ = (sel) => document.querySelector(sel);
  const postSelect = $("#post-select");
  const platformChecks = $("#platform-checks");
  const btnRun = $("#btn-run");
  const btnPublish = $("#btn-publish");
  const optLive = $("#opt-live");
  const statusEl = $("#status");
  const jobsEl = $("#jobs");
  const previewTitle = $("#preview-title");
  const previewMeta = $("#preview-meta");
  const tabsEl = $("#tabs");
  const previewBody = $("#preview-body");

  let posts = [];
  let platforms = [];
  let manifest = { jobs: [] };
  let activeJobId = null;
  let activePlatform = null;
  let bodies = {};

  function setStatus(msg, isErr) {
    statusEl.textContent = msg || "";
    statusEl.classList.toggle("is-err", !!isErr);
  }

  async function api(path, opts) {
    const res = await fetch(path, {
      headers: { Accept: "application/json", ...(opts?.headers || {}) },
      ...opts,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || res.statusText || "request failed");
    return data;
  }

  function fillPosts() {
    postSelect.innerHTML = posts
      .map(
        (p) =>
          `<option value="${escapeAttr(p.id)}">${escapeHtml(p.titleZh)} · ${escapeHtml(p.date || "")}</option>`,
      )
      .join("");
  }

  function fillPlatformChecks() {
    platformChecks.innerHTML = platforms
      .map((p) => {
        const badge = p.autoPublish ? " · auto" : "";
        return `
        <label title="${escapeAttr(p.note || "")}">
          <input type="checkbox" name="platform" value="${escapeAttr(p.id)}" checked />
          ${escapeHtml(p.name)}${badge}
        </label>`;
      })
      .join("");
  }

  function selectedPlatforms() {
    return [...platformChecks.querySelectorAll("input:checked")].map((el) => el.value);
  }

  function renderJobs() {
    const jobs = manifest.jobs || [];
    if (!jobs.length) {
      jobsEl.innerHTML = `<h3>已生成</h3><p class="meta">还没有分发稿。选文章点「一键生成」。</p>`;
      return;
    }
    jobsEl.innerHTML =
      `<h3>已生成</h3>` +
      jobs
        .map((j) => {
          const on = j.id === activeJobId ? " is-on" : "";
          const n = (j.platforms || []).length;
          return `<button type="button" class="job${on}" data-id="${escapeAttr(j.id)}">
            <strong>${escapeHtml(j.title)}</strong>
            <small>${n} 个平台 · ${escapeHtml((j.writtenAt || "").replace("T", " ").slice(0, 19))}</small>
          </button>`;
        })
        .join("");
  }

  async function showJob(id, platformPrefer) {
    activeJobId = id;
    bodies = {};
    const job = (manifest.jobs || []).find((j) => j.id === id);
    if (!job) return;
    renderJobs();

    previewTitle.textContent = job.title;
    previewMeta.innerHTML = `原文：<a href="${escapeAttr(job.canonical)}" target="_blank" rel="noopener">${escapeHtml(job.canonical)}</a>`;

    const plats = job.platforms || [];
    activePlatform = platformPrefer || plats[0]?.platform || null;

    tabsEl.innerHTML = plats
      .map((p) => {
        const on = p.platform === activePlatform ? " is-on" : "";
        return `<button type="button" class="tab${on}" data-platform="${escapeAttr(p.platform)}">${escapeHtml(p.platformName)}</button>`;
      })
      .join("");

    await loadBody(id, activePlatform);
  }

  async function loadBody(id, platform) {
    if (!id || !platform) {
      previewBody.textContent = "";
      return;
    }
    activePlatform = platform;
    [...tabsEl.querySelectorAll(".tab")].forEach((el) => {
      el.classList.toggle("is-on", el.dataset.platform === platform);
    });
    if (!bodies[platform]) {
      previewBody.textContent = "加载中…";
      const data = await api(
        `/api/syndicate/body?id=${encodeURIComponent(id)}&platform=${encodeURIComponent(platform)}`,
      );
      bodies[platform] = data.body || "";
    }
    previewBody.textContent = bodies[platform];
  }

  function escapeHtml(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  btnRun.addEventListener("click", async () => {
    const id = postSelect.value;
    const platformsSel = selectedPlatforms();
    if (!id) return;
    if (!platformsSel.length) {
      setStatus("至少勾选一个平台", true);
      return;
    }
    btnRun.disabled = true;
    setStatus("生成中…");
    try {
      const data = await api("/api/syndicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, platforms: platformsSel, mode: "dry-run" }),
      });
      manifest = data.manifest || (await api("/api/syndicate/manifest"));
      setStatus(`已生成 ${data.summary?.platforms?.length || 0} 份稿 → syndicate-out/${id}/`);
      await showJob(id);
    } catch (err) {
      setStatus(err.message || String(err), true);
    } finally {
      btnRun.disabled = false;
    }
  });

  btnPublish.addEventListener("click", async () => {
    const id = postSelect.value;
    let platformsSel = selectedPlatforms().filter((p) =>
      platforms.find((x) => x.id === p && x.autoPublish),
    );
    if (!platformsSel.length) {
      platformsSel = platforms.filter((p) => p.autoPublish).map((p) => p.id);
    }
    if (!id) return;
    if (!platformsSel.length) {
      setStatus("没有可自动发布的平台（Dev.to / Qiita）", true);
      return;
    }
    const live = !!optLive?.checked;
    if (
      live &&
      !confirm("将把勾选的 Dev.to / Qiita 文章设为公开。确认继续？")
    ) {
      return;
    }
    btnPublish.disabled = true;
    btnRun.disabled = true;
    setStatus(live ? "正在公开发布…" : "正在发到草稿/限定公开…");
    try {
      const data = await api("/api/syndicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          platforms: platformsSel,
          mode: "publish",
          live,
        }),
      });
      manifest = data.manifest || (await api("/api/syndicate/manifest"));
      const lines = (data.summary?.platforms || []).map((p) => {
        if (p.publishError) return `${p.platformName}: ${p.publishError}`;
        if (p.remote?.url) return `${p.platformName}: ${p.status} → ${p.remote.url}`;
        return `${p.platformName}: ${p.status}`;
      });
      const err = (data.summary?.platforms || []).some((p) => p.status === "error");
      setStatus(lines.join(" · ") || "完成", err);
      await showJob(id);
    } catch (err) {
      setStatus(err.message || String(err), true);
    } finally {
      btnPublish.disabled = false;
      btnRun.disabled = false;
    }
  });

  jobsEl.addEventListener("click", (ev) => {
    const btn = ev.target.closest?.(".job");
    if (!btn) return;
    showJob(btn.dataset.id).catch((e) => setStatus(e.message, true));
  });

  tabsEl.addEventListener("click", (ev) => {
    const tab = ev.target.closest?.(".tab");
    if (!tab || !activeJobId) return;
    loadBody(activeJobId, tab.dataset.platform).catch((e) => setStatus(e.message, true));
  });

  async function boot() {
    try {
      const catalog = await api("/api/syndicate/catalog");
      posts = catalog.posts || [];
      platforms = catalog.platforms || [];
      fillPosts();
      fillPlatformChecks();
      manifest = (await api("/api/syndicate/manifest")) || { jobs: [] };
      renderJobs();
      if (manifest.jobs?.[0]) await showJob(manifest.jobs[0].id);
      else setStatus("本地工具已就绪。选文章后点「一键生成分发稿」。");
    } catch (err) {
      setStatus(
        `${err.message} — 请用 npm run dev 打开本页（API 只在本地开发服务器上）。`,
        true,
      );
    }
  }

  boot();
})();
