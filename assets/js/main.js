/** main.js — menu mobile, renderer data, galeri, form WhatsApp. */
import { renderChrome } from './components.js';
import { SITE, STATS, BERITA, PENGUMUMAN, LOMBA, GALERI, KURIKULUM, SLIDER } from './data/content.js';
import { icon } from './icons.js';
import { art } from './chars.js';
import * as fx from './effects.js';

renderChrome();
const $ = (s, el = document) => el.querySelector(s);
const fmt = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
const imgTag = (f, alt) => `<img src="/assets/images/galeri/${f}" alt="${alt}" loading="lazy" data-opt onerror="this.remove()">`;
/* gambar opsional: jika berkas belum ada, hapus <img> agar placeholder di belakangnya yang tampil */
document.addEventListener('error', (e) => { if (e.target.tagName === 'IMG' && e.target.hasAttribute('data-opt')) e.target.remove(); }, true);

document.querySelectorAll('img[data-opt]').forEach((i) => { if (i.complete && !i.naturalWidth) i.remove(); });

/* Menu mobile + submenu */
const toggle = $('.nav-toggle'), menu = $('.nav-menu');
toggle.addEventListener('click', () => { const o = menu.classList.toggle('open'); toggle.classList.toggle('open', o); toggle.setAttribute('aria-expanded', o); });
document.querySelectorAll('.has-sub').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); a.parentElement.classList.toggle('sub-open'); }));

const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const parts = (d) => { const [y, m, dd] = d.split('-').map(Number); return { y, m: m - 1, d: dd, w: new Date(y, m - 1, dd).getDay() }; };
const tagCls = (t) => 'tg-' + String(t || 'umum').toLowerCase();
const noticeHTML = (p) => { const t = parts(p.date), now = todayStr();
  const st = p.date === now ? '<em class="st st-now">Hari ini</em>' : p.date > now ? '<em class="st st-soon">Akan datang</em>' : '';
  return `<div class="notice"><div class="notice-date"><b>${t.d}</b><small>${BULAN[t.m].slice(0, 3)}</small></div><div><div class="notice-meta"><span class="tag ${tagCls(p.tag)}">${p.tag || 'Umum'}</span><span class="date">${HARI[t.w]}, ${t.d} ${BULAN[t.m]} ${t.y}</span>${st}</div><h3>${p.title}</h3><p>${p.text}</p></div></div>`; };

/* Renderer: [data-render="..."] diisi dari content.js */
const card = (c) => `<article class="card"><div class="media card-media"><span class="ph">${icon(c.icon || 'image', 38)}</span>${c.img ? imgTag(c.img, c.title) : ''}</div>
  <div class="card-body"><div class="card-meta"><span class="tag">${c.tag}</span>${c.date ? `<span class="date">${fmt(c.date)}</span>` : ''}</div><h3>${c.title}</h3><p>${c.text}</p></div></article>`;
const renderers = {
  stats: () => STATS.map((s) => `<div class="stat">${typeof s.n === 'number' ? `<strong data-count="${s.n}" data-suffix="${s.s}">0</strong>` : `<strong>${s.n}</strong>`}<span>${s.l}</span></div>`).join(''),
  berita: () => BERITA.map(card).join(''),
  lomba: () => LOMBA.map(card).join(''),
  kurikulum: () => KURIKULUM.map((r) => `<tr><td>${r.m}</td><td>${r.k}</td></tr>`).join(''),
  strip: () => GALERI.slice(0, 5).map((g) => `<div class="media"><span class="ph">${icon('image', 34)}</span>${imgTag(g.img, g.title)}</div>`).join(''),
  pengumuman: (el) => { /* ringkasan beranda: yang akan datang dulu, lalu yang terbaru */
    const now = todayStr(), all = [...PENGUMUMAN];
    const up = all.filter((p) => p.date >= now).sort((x, y) => x.date.localeCompare(y.date));
    const past = all.filter((p) => p.date < now).sort((x, y) => y.date.localeCompare(x.date));
    const list = [...up, ...past].slice(0, Number(el.dataset.limit) || 99);
    if (!list.length) return '<p class="empty">Belum ada pengumuman.</p>';
    return list.map(noticeHTML).join('');
  },
};
document.querySelectorAll('[data-render]').forEach((el) => { const r = renderers[el.dataset.render]; if (r) el.innerHTML = r(el); });
document.querySelectorAll('[data-icon]').forEach((el) => { el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon, +el.dataset.size || 24)); });
document.querySelectorAll('[data-art]').forEach((el) => { el.innerHTML = art(el.dataset.art, +el.dataset.size || 64); });
document.querySelectorAll('[data-site]').forEach((el) => { el.textContent = SITE[el.dataset.site]; });

/* Slider beranda: slide default + flyer event dari SLIDER (content.js) */
const hero = $('#hero-slides');
if (hero) {
  const today = new Date().toISOString().slice(0, 10);
  const flyers = SLIDER.filter((x) => x.type === 'flyer' && x.aktif !== false && (!x.mulai || today >= x.mulai) && (!x.selesai || today <= x.selesai));
  const def = SLIDER.find((x) => x.type === 'default');
  if (def && def.img) hero.querySelector('.slide-default .hero-bg').style.backgroundImage = `url('/assets/images/slider/${def.img}')`;
  flyers.forEach((f) => {
    const src = `/assets/images/slider/${f.img}`;
    const pic = `<img class="flyer-img" src="${src}" alt="${f.alt || 'Flyer kegiatan sekolah'}">`;
    hero.insertAdjacentHTML('beforeend', `<div class="slide slide-flyer" style="--bg:url('${src}')"><div class="flyer-blur"></div>${f.href ? `<a href="${f.href}">${pic}</a>` : pic}</div>`);
  });
  const slides = [...hero.querySelectorAll('.slide')];
  const sec = $('#hero'), dots = $('.hs-dots'), prev = $('.hs-prev'), next = $('.hs-next');
  let cur = 0, timer;
  const show = (i) => { cur = (i + slides.length) % slides.length;
    slides.forEach((s, n) => { s.classList.toggle('active', n === cur); s.setAttribute('aria-hidden', n !== cur); });
    dots.querySelectorAll('button').forEach((d, n) => d.setAttribute('aria-selected', n === cur)); };
  const play = () => { clearInterval(timer); if (slides.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => show(cur + 1), 6000); };
  if (slides.length > 1) {
    dots.innerHTML = slides.map((_, n) => `<button type="button" role="tab" aria-label="Slide ${n + 1}"></button>`).join('');
    [dots, prev, next].forEach((el) => (el.hidden = false));
    dots.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { show([...dots.children].indexOf(b)); play(); } });
    prev.addEventListener('click', () => { show(cur - 1); play(); });
    next.addEventListener('click', () => { show(cur + 1); play(); });
    sec.addEventListener('mouseenter', () => clearInterval(timer)); sec.addEventListener('mouseleave', play);
    let x0 = null;
    sec.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    sec.addEventListener('touchend', (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50) { show(cur + (dx < 0 ? 1 : -1)); play(); } });
    document.addEventListener('visibilitychange', () => (document.hidden ? clearInterval(timer) : play()));
  }
  show(0); play();
}


/* Pengumuman setahun penuh, dibagi per bulan */
const ann = $('#ann');
if (ann) {
  const years = [...new Set(PENGUMUMAN.map((p) => parts(p.date).y))].sort((a, b) => a - b);
  const now = todayStr(), nowY = +now.slice(0, 4), nowM = +now.slice(5, 7) - 1;
  const h = (location.hash.match(/^#(\d{4})(?:-(\d{1,2}))?$/) || []);
  let yr = years.includes(+h[1]) ? +h[1] : years.includes(nowY) ? nowY : years[years.length - 1];
  let mo = h[2] ? +h[2] - 1 : -1; /* -1 = seluruh tahun */
  const draw = () => {
    const ofYear = PENGUMUMAN.filter((p) => parts(p.date).y === yr);
    const cnt = Array.from({ length: 12 }, (_, m) => ofYear.filter((p) => parts(p.date).m === m).length);
    const yi = years.indexOf(yr);
    const months = BULAN.map((n, m) => `<button type="button" class="mo ${m === mo ? 'active' : ''} ${yr === nowY && m === nowM ? 'now' : ''} ${cnt[m] ? '' : 'zero'}" data-m="${m}" aria-pressed="${m === mo}"><span>${n.slice(0, 3)}</span><i>${cnt[m]}</i></button>`).join('');
    const shown = (mo < 0 ? [...Array(12).keys()] : [mo]);
    const groups = shown.map((m) => {
      const items = ofYear.filter((p) => parts(p.date).m === m).sort((a, b) => a.date.localeCompare(b.date));
      if (!items.length && mo < 0) return '';
      return `<section class="ann-month" id="m-${m}"><header><h2>${BULAN[m]} <small>${yr}</small></h2><span>${items.length ? items.length + ' pengumuman' : ''}</span></header>${items.length ? items.map(noticeHTML).join('') : `<p class="empty">Belum ada pengumuman pada ${BULAN[m]} ${yr}.</p>`}</section>`;
    }).join('') || '<p class="empty">Belum ada pengumuman pada tahun ini.</p>';
    ann.innerHTML = `<div class="ann-bar"><div class="yr"><button type="button" class="yr-b" data-y="-1" aria-label="Tahun sebelumnya" ${yi <= 0 ? 'disabled' : ''}>&#8249;</button><b>${yr}</b><button type="button" class="yr-b" data-y="1" aria-label="Tahun berikutnya" ${yi >= years.length - 1 ? 'disabled' : ''}>&#8250;</button></div>
      <p class="ann-sum"><b>${ofYear.length}</b> pengumuman sepanjang tahun ${yr}</p></div>
      <div class="months" role="group" aria-label="Pilih bulan"><button type="button" class="mo all ${mo < 0 ? 'active' : ''}" data-m="-1" aria-pressed="${mo < 0}"><span>Setahun</span><i>${ofYear.length}</i></button>${months}</div>
      <div class="ann-list">${groups}</div>`;
  };
  ann.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.y) yr = years[years.indexOf(yr) + +b.dataset.y]; else if (b.dataset.m) mo = +b.dataset.m; else return;
    history.replaceState(null, '', mo < 0 ? `#${yr}` : `#${yr}-${mo + 1}`); draw();
    const act = $('.mo.active'); if (act) act.scrollIntoView({ inline: 'center', block: 'nearest' });
    if (b.dataset.m) $('.ann-list').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  draw();
}

/* Galeri: filter + lightbox */
const gal = $('#gallery');
if (gal) {
  const draw = (cat) => { gal.innerHTML = GALERI.filter((g) => cat === 'Semua' || g.cat === cat).map((g) =>
      `<figure class="media" data-src="/assets/images/galeri/${g.img}" data-cap="${g.title}"><span class="ph">${icon('image', 38)}</span>${imgTag(g.img, g.title)}<figcaption>${g.title}</figcaption></figure>`).join(''); };
  const cats = ['Semua', ...new Set(GALERI.map((g) => g.cat))];
  $('#filters').innerHTML = cats.map((c, i) => `<button class="chip ${i ? '' : 'active'}">${c}</button>`).join('');
  $('#filters').addEventListener('click', (e) => { if (!e.target.classList.contains('chip')) return;
    document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active')); e.target.classList.add('active'); draw(e.target.textContent); });
  const lb = $('#lightbox');
  gal.addEventListener('click', (e) => { const f = e.target.closest('figure'); if (!f || !f.querySelector('img')) return;
    $('#lightbox img').src = f.dataset.src; $('#lightbox p').textContent = f.dataset.cap; lb.classList.add('open'); });
  lb.addEventListener('click', () => lb.classList.remove('open'));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
  draw('Semua');
}

/* Form kontak/pengaduan -> WhatsApp */
const form = $('#wa-form');
if (form) form.addEventListener('submit', (e) => { e.preventDefault(); const d = Object.fromEntries(new FormData(form));
  window.open(`https://wa.me/${SITE.wa}?text=${encodeURIComponent(`*${d.jenis}* — ${SITE.name}\nNama: ${d.nama}\nNo. HP: ${d.hp || '-'}\n\n${d.pesan}`)}`, '_blank', 'noopener'); });

fx.observe();
