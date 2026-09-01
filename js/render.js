(() => {
  const { t, L } = window.I18N;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderWorks() {
    const list = document.querySelector("#project-list");
    if (!list) return;
    const works = window.WORKS || [];
    const countEl = document.querySelector("#visible-count");
    const totalEl = document.querySelector("#total-count");
    if (totalEl) totalEl.textContent = String(works.length);

    if (!works.length) {
      list.innerHTML = `<p class="empty">${escapeHtml(t("works.empty"))}</p>`;
      if (countEl) countEl.textContent = "0";
      return;
    }

    list.innerHTML = works
      .map((work, i) => {
        const title = L(work.title);
        const cta = L(work.cta) || t("works.ctaDefault");
        const search = L(work.search) || `${title} ${work.type}`;
        const href = work.href || "#";
        const external = href.startsWith("http");
        return `
        <article class="project-card reveal" data-search="${escapeHtml(search.toLowerCase())}">
          <span class="project-number">${String(i + 1).padStart(2, "0")}</span>
          <span class="project-type">${escapeHtml(work.type || "")}</span>
          <h3>${escapeHtml(title)}</h3>
          <a class="project-link" href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener"' : ""}>
            <span>${escapeHtml(cta)}</span><span aria-hidden="true">↗</span>
          </a>
        </article>`;
      })
      .join("");

    if (countEl) countEl.textContent = String(works.length);

    const search = document.querySelector("#project-search");
    if (!search || search.dataset.bound === "1") return;
    search.dataset.bound = "1";
    search.addEventListener("input", () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      list.querySelectorAll(".project-card").forEach((card) => {
        const match = !query || card.dataset.search.includes(query);
        card.hidden = !match;
        if (match) visible += 1;
      });
      if (countEl) countEl.textContent = String(visible);
      let empty = list.querySelector(".empty");
      if (!visible && !empty) {
        empty = document.createElement("p");
        empty.className = "empty";
        empty.textContent = t("works.noMatch");
        list.append(empty);
      }
      if (visible && empty) empty.remove();
    });
  }

  function renderPosts() {
    if (window.BlogDeck?.render?.()) return;
    const list = document.querySelector("#post-list");
    if (!list) return;
    const posts = window.POSTS || [];
    const countEl = document.querySelector("#post-count");
    if (countEl) countEl.textContent = String(posts.length).padStart(2, "0");

    if (!posts.length) {
      list.innerHTML = `<p class="empty">${escapeHtml(t("blog.empty"))}</p>`;
      return;
    }

    list.innerHTML = posts
      .map(
        (post) => `
        <article class="post-card reveal">
          <span class="post-date">${escapeHtml(post.date || "")}</span>
          <h3>${escapeHtml(L(post.title))}</h3>
          <p>${escapeHtml(L(post.summary))}</p>
          <a href="${escapeHtml(post.href || "#")}"><span>${escapeHtml(t("blog.read"))}</span><span aria-hidden="true">↗</span></a>
        </article>`,
      )
      .join("");
  }

  function renderResume() {
    const root = document.querySelector("#resume-root");
    if (!root || !window.RESUME) return;
    const data = window.RESUME;
    const sections = data.sections || [];
    let sideIndex = 0;
    let fadeIndex = 1; // 0 reserved for page-hero

    const body = sections
      .map((section) => {
        const orgText = section.org || (section.showOrg ? data.org : null);
        const sectionId = section.id ? ` id="${escapeHtml(section.id)}"` : "";
        const markerI = fadeIndex++;
        const marker = `
          <div class="cv-tl-marker cv-fade" style="--cv-i:${markerI}"${sectionId}>
            <span class="cv-tl-dot" aria-hidden="true"></span>
            <div class="cv-tl-marker-card">
              <div class="section-head">
                <h2>${escapeHtml(L(section.heading))}</h2>
                <span class="counter">${escapeHtml(L(section.counter))}</span>
              </div>
              ${orgText ? `<p class="cv-org">${escapeHtml(L(orgText))}</p>` : ""}
            </div>
          </div>`;

        const cards = (section.cards || [])
          .map((card) => {
            const side = sideIndex % 2 === 0 ? "is-left" : "is-right";
            sideIndex += 1;
            const itemI = fadeIndex++;
            const idAttr = card.id ? ` id="${escapeHtml(card.id)}"` : "";
            const meta = card.meta
              ? `<p class="cv-meta">${escapeHtml(L(card.meta))}</p>`
              : "";
            const title = card.title
              ? `<h3>${escapeHtml(L(card.title))}</h3>`
              : "";
            const lead = card.lead
              ? `<p>${escapeHtml(L(card.lead))}</p>`
              : "";
            const bullets = (card.bullets || [])
              .map((b) => `<li>${L(b)}</li>`)
              .join("");
            const list = bullets ? `<ul>${bullets}</ul>` : "";
            return `
              <article class="cv-tl-item cv-fade ${side}" style="--cv-i:${itemI}"${idAttr}>
                <span class="cv-tl-node" aria-hidden="true"></span>
                <div class="cv-card">
                  ${meta}
                  ${title}
                  ${lead}
                  ${list}
                </div>
              </article>`;
          })
          .join("");

        return `${marker}${cards}`;
      })
      .join("");

    root.innerHTML = `
      <div class="cv-timeline">
        <div class="cv-timeline-line" aria-hidden="true"></div>
        ${body}
      </div>`;

    const hero = document.querySelector(".resume-page .page-hero");
    if (hero) {
      hero.classList.add("cv-fade");
      hero.style.setProperty("--cv-i", "0");
    }
  }

  function renderArticle() {
    const root = document.querySelector("#article-root");
    if (!root || !window.ARTICLE) return;
    const article = window.ARTICLE;
    const title = L(article.title);
    document.title = `${title} · Dong Jiahui`;

    const sections = (article.sections || [])
      .map((sec) => {
        const heading = sec.heading
          ? `<h2>${escapeHtml(L(sec.heading))}</h2>`
          : "";
        const paragraphs = (sec.paragraphs || [])
          .map((p) => `<p>${escapeHtml(L(p))}</p>`)
          .join("");
        const bullets = (sec.bullets || [])
          .map((b) => `<li>${L(b)}</li>`)
          .join("");
        const list = bullets ? `<ul>${bullets}</ul>` : "";
        const figures = (sec.figures || [])
          .map((fig) => {
            const caption = fig.caption
              ? `<figcaption>${escapeHtml(L(fig.caption))}</figcaption>`
              : "";
            return `
              <figure class="article-figure">
                <img src="${escapeHtml(fig.src)}" alt="" loading="lazy" />
                ${caption}
              </figure>`;
          })
          .join("");
        return `${heading}${paragraphs}${list}${figures}`;
      })
      .join("");

    const tags = (article.tags || [])
      .map((tag, i) => {
        const label =
          i === 0 && article.tagLabel ? L(article.tagLabel) : tag;
        return `<span class="tag">${escapeHtml(label)}</span>`;
      })
      .join("");

    root.innerHTML = `
      <header>
        <span class="cv-meta">${escapeHtml(article.date || "")}</span>
        <h1>${escapeHtml(title)}</h1>
        <p class="lede">${escapeHtml(L(article.lede))}</p>
      </header>
      <div class="body">
        ${sections}
        <div class="tag-row tags">${tags}</div>
      </div>
    `;
  }

  function renderAll() {
    renderWorks();
    renderPosts();
    renderResume();
    renderArticle();
    window.I18N.apply();
    window.SEO?.apply?.();
    if (window.observeReveal) window.observeReveal();
  }

  window.renderAll = renderAll;
  renderAll();
  window.addEventListener("jh:locale", () => {
    const search = document.querySelector("#project-search");
    const q = search?.value || "";
    renderAll();
    if (search && q) {
      search.value = q;
      search.dispatchEvent(new Event("input"));
    }
  });
})();
