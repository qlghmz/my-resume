(() => {
  const $ = (sel) => document.querySelector(sel);
  const postSelect = $("#post-select");
  const platformChecks = $("#platform-checks");
  const btnRun = $("#btn-run");
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
      .map(
        (p) => `
        <label title="${escapeAttr(p.note || "")}">
          <input type="checkbox" name="platform" value="${escapeAttr(p.id)}" checked />
          ${escapeHtml(p.name)}
        </label>`,
      )
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
