const items = [...document.querySelectorAll(".cmd-item")];
if (!items.length) {
  /* inner pages */
} else {
  const giant = document.querySelector("#giant");
  const desc = document.querySelector("#cmd-desc");
  const indexEl = document.querySelector("#cmd-index");
  const clockEl = document.querySelector("#pause-clock");
  const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let current = Math.max(
    0,
    items.findIndex((el) => el.classList.contains("is-on")),
  );
  let audioCtx = null;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tickClock() {
    if (!clockEl) return;
    const d = new Date();
    clockEl.dateTime = d.toISOString();
    clockEl.innerHTML = `<b>${pad(d.getMonth() + 1)} / ${pad(d.getDate())}</b><span>${DAYS[d.getDay()]}  ${pad(d.getHours())}:${pad(d.getMinutes())}</span>`;
  }

  function blip() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioCtx = audioCtx || new Ctx();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "square";
      osc.frequency.value = 920;
      gain.gain.value = 0.035;
      osc.connect(gain).connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      /* ignore */
    }
  }

  function paint(next, play) {
    const len = items.length;
    current = ((next % len) + len) % len;
    items.forEach((el, i) => el.classList.toggle("is-on", i === current));
    const on = items[current];
    if (giant) {
      giant.textContent = on.dataset.en || on.textContent.trim();
      giant.classList.remove("is-swap");
      void giant.offsetWidth;
      giant.classList.add("is-swap");
    }
    if (desc) desc.textContent = on.dataset.desc || "";
    if (indexEl) indexEl.textContent = pad(current + 1);
    on.focus({ preventScroll: true });
    if (play) blip();
  }

  items.forEach((el, i) => {
    el.addEventListener("mouseenter", () => paint(i, true));
    el.addEventListener("focus", () => {
      if (i !== current) paint(i, true);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
      e.preventDefault();
      paint(current + 1, true);
    } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
      e.preventDefault();
      paint(current - 1, true);
    } else if (e.key === "Enter") {
      e.preventDefault();
      items[current].click();
    }
  });

  tickClock();
  setInterval(tickClock, 1000);
  paint(current, false);
}
