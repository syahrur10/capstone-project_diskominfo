/**
 * effects.js — semua animasi interaktif:
 * preloader, kursor + jejak bintang, progress bar, parallax, tilt 3D, tombol magnetik,
 * ripple, counter, typewriter, split text, reveal bertahap, dekorasi hero.
 */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(pointer: fine)").matches;
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const rnd = (a, b) => Math.random() * (b - a) + a;

/* 1. PRELOADER */
const pre = document.getElementById("preloader");
const hidePre = () => {
  pre && pre.classList.add("done");
  setTimeout(() => pre && pre.remove(), 1000);
};
if (document.readyState === "complete") setTimeout(hidePre, 900);
else addEventListener("load", () => setTimeout(hidePre, 900));

/* 2. DEKORASI HERO (awan, floaters, ombak) */
const wave = (o) =>
  `<svg viewBox="0 0 2400 120" preserveAspectRatio="none" style="opacity:${o}"><path fill="#fff9eb" d="M0 60 C200 110 400 10 600 60 C800 110 1000 10 1200 60 C1400 110 1600 10 1800 60 C2000 110 2200 10 2400 60 V120 H0Z"/></svg>`;
const FLOAT = [
  ["✏️", 3, 10, 0.05],
  ["📚", 88, 20, 0.08],
  ["⭐", 78, 62, 0.04],
  ["🚀", 12, 66, 0.07],
  ["🎨", 48, 12, 0.03],
  ["🔤", 92, 44, 0.06],
  ["🧮", 30, 78, 0.05],
];
$$("[data-hero-decor]").forEach((el) => {
  const full = el.dataset.heroDecor === "full";
  const list = full ? FLOAT : FLOAT.slice(0, 4);
  el.innerHTML = `<div class="clouds"><i class="cloud"></i><i class="cloud"></i><i class="cloud"></i></div>
    <div class="floaters">${list.map(([e, x, y, d], i) => `<div class="floater" data-depth="${d}" style="left:${x}%;top:${y}%;animation-delay:${-i * 0.8}s"><span>${e}</span></div>`).join("")}</div>
    <div class="waves">${wave(1)}${wave(0.6)}${wave(0.35)}</div>`;
});

/* 3. HEADER, PROGRESS, BACK TO TOP, PARALLAX SCROLL */
const header = document.getElementById("main-header");
const bar = Object.assign(document.createElement("div"), {
  id: "scroll-progress",
});
const top = Object.assign(document.createElement("button"), {
  id: "backtop",
  ariaLabel: "Kembali ke atas",
  textContent: "↑",
});
document.body.append(bar, top);
top.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
const heroBg = document.querySelector(".hero-bg");
function onScroll() {
  const y = scrollY,
    max = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (y / max) * 100 + "%";
  header && header.classList.toggle("scrolled", y > 40);
  top.classList.toggle("show", y > 500);
  if (heroBg && !reduce && y < innerHeight * 1.2)
    heroBg.style.translate = `0 ${y * 0.25}px`;
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* 4. KURSOR + JEJAK BINTANG (hanya mouse) */
if (false) {
  document.documentElement.classList.add("has-cursor");
  const dot = Object.assign(document.createElement("div"), {
    className: "cur-dot",
  });
  const ring = Object.assign(document.createElement("div"), {
    className: "cur-ring",
  });
  document.body.append(dot, ring);
  let mx = -100,
    my = -100,
    rx = -100,
    ry = -100,
    lx = 0,
    ly = 0;
  const EMO = ["✨", "⭐", "💫", "🌟", "🎈"];
  const spark = (x, y, burst) => {
    const s = document.createElement("span");
    s.className = "spark";
    s.textContent = EMO[Math.floor(rnd(0, EMO.length))];
    const a = burst ? rnd(0, 6.28) : rnd(0, 6.28),
      r = burst ? rnd(40, 90) : rnd(15, 35);
    s.style.cssText = `left:${x}px;top:${y}px;--dx:${Math.cos(a) * r}px;--dy:${Math.sin(a) * r + (burst ? 0 : 20)}px;--rot:${rnd(-90, 90)}deg;font-size:${rnd(11, 20)}px`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 850);
  };
  addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px)`;
    if (Math.hypot(mx - lx, my - ly) > 45) {
      spark(mx, my);
      lx = mx;
      ly = my;
    }
    ring.classList.toggle(
      "hover",
      !!e.target.closest(
        "a,button,.card,[data-tilt],.opt,input,select,textarea,figure,.chip,.avatar",
      ),
    );
  });
  addEventListener("mousedown", (e) => {
    ring.classList.add("down");
    for (let i = 0; i < 9; i++) spark(e.clientX, e.clientY, true);
  });
  addEventListener("mouseup", () => ring.classList.remove("down"));
  (function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(loop);
  })();
}

/* 5. PARALLAX MOUSE pada floaters hero */
const hero = document.querySelector(".hero, .page-hero");
if (hero && fine && !reduce)
  hero.addEventListener("mousemove", (e) => {
    const cx = e.clientX - innerWidth / 2,
      cy = e.clientY - innerHeight / 2;
    $$(".floater", hero).forEach((f) => {
      const d = +f.dataset.depth * 10;
      f.firstElementChild.style.transform = `translate(${(cx * d) / 10}px,${(cy * d) / 10}px)`;
    });
  });

/* 6. TILT 3D, TOMBOL MAGNETIK, RIPPLE */
export function bindInteractions(scope = document) {
  if (fine && !reduce) {
    $$("[data-tilt]:not([data-bound])", scope).forEach((el) => {
      el.dataset.bound = 1;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5,
          y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-6px) scale(1.02)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
    $$(".btn:not([data-mag])", scope).forEach((b) => {
      b.dataset.mag = 1;
      b.addEventListener("mousemove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.2}px ${(e.clientY - r.top - r.height / 2) * 0.3}px`;
      });
      b.addEventListener("mouseleave", () => {
        b.style.translate = "";
      });
    });
  }
  $$(".btn:not([data-rip])", scope).forEach((b) => {
    b.dataset.rip = 1;
    b.addEventListener("click", (e) => {
      const r = b.getBoundingClientRect(),
        d = Math.max(r.width, r.height);
      const s = document.createElement("span");
      s.className = "ripple";
      s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
      b.appendChild(s);
      setTimeout(() => s.remove(), 600);
    });
  });
}

/* 7. REVEAL BERTAHAP + COUNTER */
let io;
export function observe() {
  io =
    io ||
    new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          io.unobserve(el);
          if (el.classList.contains("reveal")) el.classList.add("in");
          if (el.dataset.count) count(el);
        }),
      { threshold: 0.15 },
    );
  const seen = new Map();
  $$(".reveal:not(.in):not([data-o])").forEach((el) => {
    el.dataset.o = 1;
    const p = el.parentElement,
      i = seen.get(p) || 0;
    seen.set(p, i + 1);
    el.style.setProperty("--d", Math.min(i * 0.12, 0.6) + "s");
    io.observe(el);
  });
  $$("[data-count]:not([data-o])").forEach((el) => {
    el.dataset.o = 1;
    io.observe(el);
  });
}
function count(el) {
  const to = +el.dataset.count,
    suf = el.dataset.suffix || "",
    t0 = performance.now(),
    dur = 1600;
  (function tick(t) {
    const p = Math.min((t - t0) / dur, 1),
      v = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(to * v) + suf;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

/* 8. SPLIT TEXT + TYPEWRITER */
$$("[data-split]").forEach((el) => {
  let i = 0;
  [...el.childNodes].forEach((n) => {
    if (n.nodeType !== 3) return;
    const f = document.createDocumentFragment();
    n.textContent.split(/(\s+)/).forEach((w) => {
      if (!w.trim()) {
        f.append(w);
        return;
      }
      const s = document.createElement("span");
      s.className = "split-word";
      s.innerHTML = `<span style="--i:${i++}">${w}</span>`;
      f.append(s);
    });
    n.replaceWith(f);
  });
});
$$("[data-typed]").forEach((el) => {
  const words = el.dataset.typed.split("|");
  let w = 0,
    c = 0,
    del = false;
  el.classList.add("typed");
  (function type() {
    const word = words[w];
    el.textContent = word.slice(0, c);
    c += del ? -1 : 1;
    let delay = del ? 55 : 110;
    if (!del && c > word.length) {
      del = true;
      delay = 1600;
    } else if (del && c < 0) {
      del = false;
      c = 0;
      w = (w + 1) % words.length;
      delay = 300;
    }
    setTimeout(type, delay);
  })();
});

bindInteractions();
observe();
