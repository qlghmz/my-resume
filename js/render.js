function renderWorks() {
  const list = document.querySelector("#project-list");
  if (!list) return;
  const works = window.WORKS || [];
  const countEl = document.querySelector("#visible-count");
  const totalEl = document.querySelector("#total-count");
  if (totalEl) totalEl.textContent = String(works.length);

  if (!works.length) {
    list.innerHTML =
      '<p class="empty">还没有作品。打开 <code>data/works.js</code> 加一条即可出现在这里。</p>';
    if (countEl) countEl.textContent = "0";
    return;
  }

  list.innerHTML = works
    .map((work, i) => {
      const search = (work.search || `${work.title} ${work.type}`).toLowerCase();
      return `
        <article class="project-card reveal" data-search="${search}">
          <span class="project-number">${String(i + 1).padStart(2, "0")}</span>
          <span class="project-type">${work.type}</span>
          <h3>${work.title}</h3>
          <a class="project-link" href="${work.href}"${work.href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>
            <span>${work.cta || "查看详情"}</span><span aria-hidden="true">↗</span>
          </a>
        </article>`;
    })
    .join("");

  if (countEl) countEl.textContent = String(works.length);

  const search = document.querySelector("#project-search");
  if (!search) return;
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
      empty.textContent = "没有找到匹配的作品，换个关键词试试。";
      list.append(empty);
    }
    if (visible && empty) empty.remove();
  });
}

function renderPosts() {
  const list = document.querySelector("#post-list");
  if (!list) return;
  const posts = window.POSTS || [];
  const countEl = document.querySelector("#post-count");
  if (countEl) countEl.textContent = String(posts.length).padStart(2, "0");

  if (!posts.length) {
    list.innerHTML =
      '<p class="empty">还没有文章。打开 <code>data/posts.js</code> 加一条，并在 <code>blog/</code> 下放 HTML 即可。</p>';
    return;
  }

  list.innerHTML = posts
    .map(
      (post) => `
        <article class="post-card reveal">
          <span class="post-date">${post.date}</span>
          <h3>${post.title}</h3>
          <p>${post.summary || ""}</p>
          <a href="${post.href}"><span>阅读</span><span aria-hidden="true">↗</span></a>
        </article>`,
    )
    .join("");
}

renderWorks();
renderPosts();
if (window.observeReveal) window.observeReveal();
