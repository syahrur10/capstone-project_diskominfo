/** main.js — menu mobile, renderer data, galeri, form WhatsApp. */
import { renderChrome } from './components.js';
import { SITE, STATS, BERITA, PENGUMUMAN, LOMBA, GALERI, KURIKULUM, MARQUEE } from './data/content.js';

renderChrome();
const $ = (s, el = document) => el.querySelector(s);
const fmt = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
const gimg = (f, alt) => `<img src="/assets/images/galeri/${f}" alt="${alt}" loading="lazy">`;

/* Menu mobile + submenu */
const toggle = $('.nav-toggle'), menu = $('.nav-menu');
toggle.addEventListener('click', () => { const o = menu.classList.toggle('open'); toggle.classList.toggle('open', o); toggle.setAttribute('aria-expanded', o); });
document.querySelectorAll('.has-sub').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); a.parentElement.classList.toggle('sub-open'); }));

/* Renderer: [data-render="..."] diisi dari content.js */
const card = (c) => `<article class="card reveal" data-tilt><div class="card-img">${c.img ? gimg(c.img, c.title) : c.icon}</div>
  <div class="card-body"><span class="tag">${c.tag}</span>${c.date ? `<span class="date">${fmt(c.date)}</span>` : ''}<h3>${c.title}</h3><p>${c.text}</p></div></article>`;
const renderers = {
  stats: () => STATS.map((s) => `<div class="stat reveal">${typeof s.n === 'number' ? `<strong data-count="${s.n}" data-suffix="${s.s}">0</strong>` : `<strong>${s.n}</strong>`}<span>${s.l}</span></div>`).join(''),
  berita: () => BERITA.map(card).join(''),
  lomba: () => LOMBA.map(card).join(''),
  kurikulum: () => KURIKULUM.map((r) => `<tr><td>${r.m}</td><td>${r.k}</td></tr>`).join(''),
  marquee: () => { const t = MARQUEE.map((w) => `<span>${w} ✦</span>`).join(''); return `<div class="marquee-track">${t}${t}${t}${t}</div>`; },
  strip: () => { const t = GALERI.map((g) => gimg(g.img, g.title)).join(''); return `<div class="photo-track">${t}${t}</div>`; },
  pengumuman: (el) => {
    const list = PENGUMUMAN.slice(0, Number(el.dataset.limit) || 99);
    if (!list.length) return '<p class="empty">Belum ada pengumuman.</p>';
    return list.map((p) => { const d = new Date(p.date);
      return `<div class="notice reveal"><div class="notice-date"><b>${d.getDate()}</b><small>${d.toLocaleDateString('id-ID', { month: 'short' })}</small></div><div><h3>${p.title}</h3><p>${p.text}</p></div></div>`; }).join('');
  },
};
document.querySelectorAll('[data-render]').forEach((el) => { const r = renderers[el.dataset.render]; if (r) el.innerHTML = r(el); });

/* Galeri: filter + lightbox */
const gal = $('#gallery');
if (gal) {
  const draw = (cat) => { gal.innerHTML = GALERI.filter((g) => cat === 'Semua' || g.cat === cat).map((g) =>
      `<figure class="reveal" data-src="/assets/images/galeri/${g.img}" data-cap="${g.title}">${gimg(g.img, g.title)}<figcaption>${g.title}</figcaption></figure>`).join(''); fx.observe(); };
  const cats = ['Semua', ...new Set(GALERI.map((g) => g.cat))];
  $('#filters').innerHTML = cats.map((c, i) => `<button class="chip ${i ? '' : 'active'}">${c}</button>`).join('');
  $('#filters').addEventListener('click', (e) => { if (!e.target.classList.contains('chip')) return;
    document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active')); e.target.classList.add('active'); draw(e.target.textContent); });
  const lb = $('#lightbox');
  gal.addEventListener('click', (e) => { const f = e.target.closest('figure'); if (!f) return;
    $('#lightbox img').src = f.dataset.src; $('#lightbox p').textContent = f.dataset.cap; lb.classList.add('open'); });
  lb.addEventListener('click', () => lb.classList.remove('open'));
  draw('Semua');
}

/* Form kontak/pengaduan -> WhatsApp */
const form = $('#wa-form');
if (form) form.addEventListener('submit', (e) => { e.preventDefault(); const d = Object.fromEntries(new FormData(form));
  window.open(`https://wa.me/${SITE.wa}?text=${encodeURIComponent(`*${d.jenis}* — ${SITE.name}\nNama: ${d.nama}\nNo. HP: ${d.hp || '-'}\n\n${d.pesan}`)}`, '_blank', 'noopener'); });

/* Efek animasi (harus terakhir, setelah konten dirender) */
import * as fx from './effects.js';
fx.observe(); fx.bindInteractions();