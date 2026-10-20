/** slider.js — hero slider: autoplay, panah, titik, swipe, jeda saat hover. */
import { SLIDES } from "./data/content.js";

export function initSlider(root) {
  if (!root) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.innerHTML = `
    <div class="sl-track">${SLIDES.map(
      (s, i) => `
      <article class="sl-slide${i ? "" : " active"}" style="background-image:url('/assets/images/slider/${s.img}')" aria-hidden="${i ? "true" : "false"}">
        <div class="container sl-copy"><span class="sl-kicker">${s.kicker}</span><h1>${s.title}</h1><p>${s.text}</p>
          <a class="btn-formal" href="${s.cta[1]}">${s.cta[0]}</a></div>
      </article>`,
    ).join("")}</div>
    <button class="sl-nav prev" aria-label="Slide sebelumnya">&#8249;</button><button class="sl-nav next" aria-label="Slide berikutnya">&#8250;</button>
    <div class="sl-dots">${SLIDES.map((_, i) => `<button aria-label="Slide ${i + 1}" class="${i ? "" : "on"}"></button>`).join("")}</div>
    <div class="sl-progress"><i></i></div>`;
  const slides = [...root.querySelectorAll(".sl-slide")],
    dots = [...root.querySelectorAll(".sl-dots button")],
    bar = root.querySelector(".sl-progress i");
  const DELAY = 6500;
  let i = 0,
    timer;
  const go = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => {
      s.classList.toggle("active", k === i);
      s.setAttribute("aria-hidden", k !== i);
    });
    dots.forEach((d, k) => d.classList.toggle("on", k === i));
    bar.style.animation = "none";
    void bar.offsetWidth;
    bar.style.animation = "";
  };
  const play = () => {
    if (reduce) return;
    clearInterval(timer);
    timer = setInterval(() => go(i + 1), DELAY);
    root.classList.remove("paused");
  };
  const stop = () => {
    clearInterval(timer);
    root.classList.add("paused");
  };
  root.querySelector(".prev").onclick = () => {
    go(i - 1);
    play();
  };
  root.querySelector(".next").onclick = () => {
    go(i + 1);
    play();
  };
  dots.forEach(
    (d, k) =>
      (d.onclick = () => {
        go(k);
        play();
      }),
  );
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", play);
  let x0 = null;
  root.addEventListener(
    "touchstart",
    (e) => {
      x0 = e.touches[0].clientX;
    },
    { passive: true },
  );
  root.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) {
      go(i + (dx < 0 ? 1 : -1));
      play();
    }
    x0 = null;
  });
  addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") go(i + 1);
    if (e.key === "ArrowLeft") go(i - 1);
  });
  play();
}
