/** main.js — menu mobile, animasi scroll, renderer data, galeri, form WhatsApp. */
import { renderChrome } from './components.js';
import { SITE, STATS, BERITA, PENGUMUMAN, LOMBA, GALERI, KURIKULUM } from './data/content.js';

renderChrome();

const $ = (s, el = document) => el.querySelector(s);
const root = document.body.dataset.root || '';
const fmt = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
const img = (f, alt) => (f ? `<img src="${root}assets/images/galeri/${f}" alt="${alt}" loading="lazy">` : '');

/* 1. Menu mobile + submenu */
const toggle = $('.nav-toggle'), menu = $('.nav-menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.has-sub').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  a.parentElement.classList.toggle('sub-open');
}));

/* 2. Renderer: tiap elemen [data-render] diisi dari content.js */
const card = (c) => `<article class="card reveal"><div class="card-img">${img(c.img, c.title) || c.icon}</div>
  <div class="card-body"><span class="tag">${c.tag}</span>${c.date ? `<span class="date">${fmt(c.date)}</span>` : ''}
  <h3>${c.title}</h3><p>${c.text}</p></div></article>`;

const renderers = {
  stats: () => STATS.map((s) => `<div class="stat reveal"><strong>${s.n}</strong><span>${s.l}</span></div>`).join(''),
  berita: () => BERITA.map(card).join(''),
  lomba: () => LOMBA.map(card).join(''),
  kurikulum: () => KURIKULUM.map((r) => `<tr><td>${r.m}</td><td>${r.k}</td></tr>`).join(''),
  pengumuman: () => {
    const limit = Number(document.querySelector('[data-render="pengumuman"]').dataset.limit) || 99;
    const list = PENGUMUMAN.slice(0, limit);
    if (!list.length) return '<p class="empty">Belum ada pengumuman.</p>';
    return list.map((p) => { const d = new Date(p.date);
      return `<div class="notice reveal"><div class="notice-date"><b>${d.getDate()}</b><small>${d.toLocaleDateString('id-ID', { month: 'short' })}</small></div>
      <div><h3>${p.title}</h3><p>${p.text}</p></div></div>`; }).join('');
  },
};
document.querySelectorAll('[data-render]').forEach((el) => { const r = renderers[el.dataset.render]; if (r) el.innerHTML = r(); });

/* 3. Galeri: filter kategori + lightbox */
const gal = $('#gallery');
if (gal) {
  const draw = (cat) => {
    gal.innerHTML = GALERI.filter((g) => cat === 'Semua' || g.cat === cat).map((g) =>
      `<figure class="reveal" data-src="${g.img ? `${root}assets/images/galeri/${g.img}` : ''}" data-cap="${g.title}">
        ${g.img ? img(g.img, g.title) : `<div class="ph">${g.icon}</div>`}<figcaption>${g.title}</figcaption></figure>`).join('');
    observe();
  };
  const cats = ['Semua', ...new Set(GALERI.map((g) => g.cat))];
  $('#filters').innerHTML = cats.map((c, i) => `<button class="chip ${i ? '' : 'active'}">${c}</button>`).join('');
  $('#filters').addEventListener('click', (e) => {
    if (!e.target.classList.contains('chip')) return;
    document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    e.target.classList.add('active'); draw(e.target.textContent);
  });
  const lb = $('#lightbox');
  gal.addEventListener('click', (e) => {
    const f = e.target.closest('figure'); if (!f || !f.dataset.src) return;
    $('#lightbox img').src = f.dataset.src; $('#lightbox p').textContent = f.dataset.cap; lb.classList.add('open');
  });
  lb.addEventListener('click', () => lb.classList.remove('open'));
  draw('Semua');
}

/* 4. Form pengaduan / kontak -> WhatsApp */
const form = $('#wa-form');
if (form) form.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const text = `*${d.jenis}* — ${SITE.name}\nNama: ${d.nama}\nNo. HP: ${d.hp || '-'}\n\n${d.pesan}`;
  window.open(`https://wa.me/${SITE.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

/* 5. Reveal saat scroll */
let io;
function observe() {
  io = io || new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
}
observe();
