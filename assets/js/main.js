/** main.js — menu mobile, renderer data, galeri, form email. */
import { renderChrome } from "./components.js";
import {
  SITE,
  STATS,
  BERITA,
  PENGUMUMAN,
  LOMBA,
  GALERI,
  KURIKULUM,
  MARQUEE,
  QUICK,
  INFO_SEKOLAH,
  PROGRAM,
  FASILITAS,
  AGENDA,
  PRINCIPAL,
} from "./data/content.js";
import { initSlider } from "./slider.js";

renderChrome();
const $ = (s, el = document) => el.querySelector(s);
const fmt = (d) =>
  new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const gimg = (f, alt) =>
  `<img src="/assets/images/galeri/${f}" alt="${alt}" loading="lazy">`;

/* Menu mobile + submenu */
const toggle = $(".nav-toggle"),
  menu = $(".nav-menu");
toggle.addEventListener("click", () => {
  const o = menu.classList.toggle("open");
  toggle.classList.toggle("open", o);
  toggle.setAttribute("aria-expanded", o);
});
document.querySelectorAll(".has-sub").forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    a.parentElement.classList.toggle("sub-open");
  }),
);

/* Renderer: [data-render="..."] diisi dari content.js */
const card = (
  c,
) => `<article class="card reveal"><div class="card-img">${c.img ? gimg(c.img, c.title) : c.icon}</div>
  <div class="card-body"><span class="tag">${c.tag}</span>${c.date ? `<span class="date">${fmt(c.date)}</span>` : ""}<h3>${c.title}</h3><p>${c.text}</p></div></article>`;
const renderers = {
  quick: () =>
    QUICK.map(
      (q) => `<a href="${q.href}"><b>${q.t}</b><span>${q.d}</span></a>`,
    ).join(""),
  info: () =>
    INFO_SEKOLAH.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join(
      "",
    ),
  program: () =>
    PROGRAM.map(
      (p) =>
        `<div class="prog reveal"><b>${p.n}</b><h3>${p.t}</h3><p>${p.d}</p></div>`,
    ).join(""),
  fasilitas: () =>
    FASILITAS.map(
      (f) =>
        `<figure class="fas reveal">${gimg(f.img, f.t)}<span>${f.t}</span></figure>`,
    ).join(""),
  agenda: () =>
    AGENDA.map((a) => {
      const d = new Date(a.date);
      return `<li><time><b>${d.getDate()}</b><small>${d.toLocaleDateString("id-ID", { month: "short" })}</small></time><div><strong>${a.t}</strong><small>${a.w}</small></div></li>`;
    }).join(""),
  beritaList: () =>
    BERITA.map(
      (c) =>
        `<article class="news-item reveal">${gimg(c.img, c.title)}<div><span class="tag">${c.tag}</span> <span class="date">${fmt(c.date)}</span><h3>${c.title}</h3><p>${c.text}</p></div></article>`,
    ).join(""),
  galgrid: () =>
    GALERI.slice(0, 6)
      .map((g) => gimg(g.img, g.title))
      .join(""),
  principal: () =>
    `<strong>${PRINCIPAL.name}</strong><small>Kepala ${SITE.name}<br>${PRINCIPAL.nip}</small>`,
  stats: () =>
    STATS.map(
      (s) =>
        `<div class="stat reveal">${typeof s.n === "number" ? `<strong data-count="${s.n}" data-suffix="${s.s}">0</strong>` : `<strong>${s.n}</strong>`}<span>${s.l}</span></div>`,
    ).join(""),
  berita: () => BERITA.map(card).join(""),
  lomba: () => LOMBA.map(card).join(""),
  kurikulum: () =>
    KURIKULUM.map((r) => `<tr><td>${r.m}</td><td>${r.k}</td></tr>`).join(""),
  marquee: () => {
    const t = MARQUEE.map((w) => `<span>${w} ✦</span>`).join("");
    return `<div class="marquee-track">${t}${t}${t}${t}</div>`;
  },
  strip: () => {
    const t = GALERI.map((g) => gimg(g.img, g.title)).join("");
    return `<div class="photo-track">${t}${t}</div>`;
  },
  pengumuman: (el) => {
    const list = PENGUMUMAN.slice(0, Number(el.dataset.limit) || 99);
    if (!list.length) return '<p class="empty">Belum ada pengumuman.</p>';
    return list
      .map((p) => {
        const d = new Date(p.date);
        return `<div class="notice reveal"><div class="notice-date"><b>${d.getDate()}</b><small>${d.toLocaleDateString("id-ID", { month: "short" })}</small></div><div><h3>${p.title}</h3><p>${p.text}</p></div></div>`;
      })
      .join("");
  },
};
document.querySelectorAll("[data-render]").forEach((el) => {
  const r = renderers[el.dataset.render];
  if (r) el.innerHTML = r(el);
});

/* Galeri: filter + lightbox */
const gal = $("#gallery");
if (gal) {
  const draw = (cat) => {
    gal.innerHTML = GALERI.filter((g) => cat === "Semua" || g.cat === cat)
      .map(
        (g) =>
          `<figure class="reveal" data-src="/assets/images/galeri/${g.img}" data-cap="${g.title}">${gimg(g.img, g.title)}<figcaption>${g.title}</figcaption></figure>`,
      )
      .join("");
    fx.observe();
  };
  const cats = ["Semua", ...new Set(GALERI.map((g) => g.cat))];
  $("#filters").innerHTML = cats
    .map((c, i) => `<button class="chip ${i ? "" : "active"}">${c}</button>`)
    .join("");
  $("#filters").addEventListener("click", (e) => {
    if (!e.target.classList.contains("chip")) return;
    document
      .querySelectorAll(".chip")
      .forEach((c) => c.classList.remove("active"));
    e.target.classList.add("active");
    draw(e.target.textContent);
  });
  const lb = $("#lightbox");
  gal.addEventListener("click", (e) => {
    const f = e.target.closest("figure");
    if (!f) return;
    $("#lightbox img").src = f.dataset.src;
    $("#lightbox p").textContent = f.dataset.cap;
    lb.classList.add("open");
  });
  lb.addEventListener("click", () => lb.classList.remove("open"));
  draw("Semua");
}

/* Form kontak/pengaduan -> Email (FormSubmit, tanpa backend) */
const form = $("#email-form");
if (form) {
  const btn = form.querySelector("button[type=submit]");
  const status = $("#form-status");
  const setStatus = (msg, type) => {
    status.textContent = msg;
    status.className = "form-status " + type;
  };
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    if (d._honey) return; // honeypot anti-spam
    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Mengirim…";
    setStatus("", "");
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `[${d.jenis}] ${d.nama} — Website ${SITE.name}`,
            _template: "table",
            _captcha: "false",
            Jenis: d.jenis,
            Nama: d.nama,
            "No. HP": d.hp || "-",
            Pesan: d.pesan,
          }),
        },
      );
      const out = await res.json();
      if (!res.ok || out.success === "false" || out.success === false)
        throw new Error(out.message || "gagal");
      form.reset();
      setStatus("✅ Terima kasih! Pesan Anda sudah terkirim ke email sekolah.", "ok");
    } catch (err) {
      // Cadangan: buka aplikasi email bawaan perangkat
      const body = `Jenis: ${d.jenis}\nNama: ${d.nama}\nNo. HP: ${d.hp || "-"}\n\n${d.pesan}`;
      setStatus("Pengiriman otomatis gagal, membuka aplikasi email Anda…", "err");
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`[${d.jenis}] ${d.nama} — ${SITE.name}`)}&body=${encodeURIComponent(body)}`;
    } finally {
      btn.disabled = false;
      btn.textContent = label;
    }
  });
}

initSlider(document.querySelector(".slider"));

/* Efek animasi (harus terakhir, setelah konten dirender) */
import * as fx from "./effects.js";
fx.observe();
fx.bindInteractions();
