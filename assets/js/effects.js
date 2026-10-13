/**
 * effects.js — efek yang dipertahankan secukupnya:
 * preloader (hanya kunjungan pertama), bayangan header saat scroll, progress bar, tombol ke atas, hitung naik statistik.
 */
import { icon } from './icons.js';

/* 1. PRELOADER — dihapus dari DOM; tampilannya sudah disembunyikan lewat html.no-pl pada kunjungan berikutnya */
const pre = document.getElementById('preloader');
if (pre) {
  if (document.documentElement.classList.contains('no-pl')) pre.remove();
  else {
    const hide = () => { pre.classList.add('done'); setTimeout(() => pre.remove(), 600); };
    if (document.readyState === 'complete') setTimeout(hide, 700); else addEventListener('load', () => setTimeout(hide, 700));
  }
}

/* 2. HEADER, PROGRESS, KE ATAS */
const header = document.getElementById('main-header');
const bar = Object.assign(document.createElement('div'), { id: 'scroll-progress' });
const top = Object.assign(document.createElement('button'), { id: 'backtop', ariaLabel: 'Kembali ke atas', innerHTML: icon('up', 20) });
document.body.append(bar, top);
top.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
function onScroll() {
  const y = scrollY, max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  bar.style.width = (y / max) * 100 + '%';
  if (header) header.classList.toggle('scrolled', y > 8);
  top.classList.toggle('show', y > 600);
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* 3. ANGKA STATISTIK BERHITUNG NAIK saat terlihat */
export function observe() {
  const els = [...document.querySelectorAll('[data-count]:not([data-o])')];
  if (!els.length) return;
  const run = (el) => {
    const to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), dur = 1400;
    (function tick(t) { const p = Math.min((t - t0) / dur, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(tick); })(t0);
  };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { els.forEach((el) => (el.textContent = el.dataset.count + (el.dataset.suffix || ''))); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); run(e.target); } }), { threshold: 0.4 });
  els.forEach((el) => { el.dataset.o = 1; io.observe(el); });
}
export function bindInteractions() {}
