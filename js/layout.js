const PAGE = document.body.dataset.page || "";
const PATH = {
  home: { href: "/", label: "Main" },
  works: { href: "/works/", label: "Works" },
  resume: { href: "/resume/", label: "Resume" },
  blog: { href: "/blog/", label: "Blog" },
  contact: { href: "/contact/", label: "Contact" },
};
const LINKS = [
  { id: "works", ...PATH.works },
  { id: "resume", ...PATH.resume },
  { id: "blog", ...PATH.blog },
  { id: "contact", ...PATH.contact },
];

function mountHeader() {
  const slot = document.querySelector("#site-header");
  if (!slot) return;
  if (PAGE === "home") {
    slot.innerHTML = `<a class="skip-link" href="#main">跳至主要内容</a>`;
    return;
  }
  const here = PATH[PAGE] || { label: PAGE };
  slot.innerHTML = `
    <a class="skip-link" href="#main">跳至主要内容</a>
    <header class="hud">
      <a class="logo" href="/"><span>JH.</span> DONG</a>
      <div class="hud-path">Main <b>/ ${here.label}</b></div>
      <nav class="hud-links" aria-label="站点">
        ${LINKS.map((item) => {
          const on = item.id === PAGE ? ' aria-current="page"' : "";
          return `<a href="${item.href}"${on}>${item.label}</a>`;
        }).join("")}
      </nav>
    </header>
  `;
}

function mountFooter() {
  const slot = document.querySelector("#site-footer");
  if (!slot) return;
  if (PAGE === "home") {
    slot.innerHTML = "";
    return;
  }
  slot.innerHTML = `
    <div class="hud-foot">
      <span>© ${new Date().getFullYear()} 董家辉</span>
      <span>Esc 返回主菜单</span>
    </div>
  `;
}

function mountWatermark() {
  if (PAGE === "home") return;
  const main = document.querySelector("main");
  if (!main || main.querySelector(".page-giant")) return;
  const mark = document.createElement("p");
  mark.className = "page-giant";
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = (PATH[PAGE]?.label || PAGE).toUpperCase();
  main.prepend(mark);
}

function observeReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  nodes.forEach((el) => observer.observe(el));
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && PAGE !== "home") {
    window.location.href = "/";
  }
});

window.observeReveal = observeReveal;
mountHeader();
mountFooter();
mountWatermark();
