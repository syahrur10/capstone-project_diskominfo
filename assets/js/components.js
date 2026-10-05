/** components.js — topbar, header, footer dipakai ulang di semua halaman. */
import { SITE, TAUTAN } from './data/content.js';

const NAV = [
  { key: 'home', label: 'Beranda', href: '/' },
  { key: 'profil', label: 'Profil', href: '/pages/profil.html' },
  { key: 'akademik', label: 'Akademik', href: '/pages/akademik.html' },
  { key: 'lomba', label: 'Lomba', href: '/pages/lomba.html' },
  { key: 'galeri', label: 'Galeri', href: '/pages/galeri.html' },
  { key: 'kuis', label: '🧠 Kuis Cerdas', href: '/pages/kuis.html' },
  { key: 'pengumuman', label: 'Pengumuman', href: '/pages/pengumuman.html' },
  { key: 'tautan', label: 'Tautan', sub: TAUTAN },
  { key: 'kontak', label: 'Kontak', href: '/pages/kontak.html' },
];
const rt = (t) => `<span class="rt"><span>${t}</span><span>${t}</span></span>`;

export function renderChrome() {
  const page = document.body.dataset.page;
  const links = NAV.map((n) => n.sub
    ? `<li class="nav-item"><a href="#" class="nav-link has-sub" aria-haspopup="true">${rt(n.label)}</a>
        <div class="dropdown">${n.sub.map((s) => `<a href="${s.href}" target="_blank" rel="noopener">${s.label}</a>`).join('')}</div></li>`
    : `<li class="nav-item"><a href="${n.href}" class="nav-link ${n.key === page ? 'active' : ''}">${rt(n.label)}</a></li>`
  ).join('');

  document.getElementById('site-header').innerHTML = `
    <div class="topbar"><div class="container">
      <div class="topbar-info"><a href="mailto:${SITE.email}">✉ ${SITE.email}</a><a href="tel:${SITE.phone}">☎ ${SITE.phone}</a></div>
      <a href="/pages/kontak.html#pengaduan">Umpan Balik: <u>mengeluh</u></a>
    </div></div>
    <header id="main-header"><nav class="container nav-container" aria-label="Navigasi utama">
      <a href="/" class="logo" aria-label="Beranda ${SITE.name}">
        <img src="/assets/images/logo-sdn-bandarharjo-02.png" alt="Logo ${SITE.name}">
        <span class="logo-text">${SITE.name}<small>KOTA SEMARANG</small></span>
      </a>
      <button class="nav-toggle" aria-label="Buka menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <ul class="nav-menu">${links}</ul>
    </nav></header>`;

  const s = SITE.social;
  document.getElementById('site-footer').innerHTML = `
    <svg class="wave-top" viewBox="0 0 1200 70" preserveAspectRatio="none"><path d="M0 35 C200 70 400 0 600 35 C800 70 1000 0 1200 35 V70 H0Z" fill="#fff9eb"/></svg>
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="/assets/images/logo-sdn-bandarharjo-02.png" alt="Logo ${SITE.name}">
        <h4>${SITE.name}</h4><p>${SITE.address}</p>
        <div class="socials">
          <a href="${s.facebook}" aria-label="Facebook">f</a><a href="${s.twitter}" aria-label="X">X</a>
          <a href="${s.youtube}" aria-label="YouTube">▶</a><a href="${s.instagram}" aria-label="Instagram">ig</a>
        </div>
      </div>
      <div><h4>Menu</h4><ul class="footer-links">
        ${NAV.filter((n) => n.href).map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
      </ul></div>
      <div><h4>Hubungi Kami</h4><ul class="footer-links">
        <li>✉ <a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li>☎ <a href="tel:${SITE.phone}">${SITE.phone}</a></li>
        <li><a href="/pages/kontak.html#pengaduan">Kotak Pengaduan →</a></li>
      </ul></div>
    </div>
    <div class="copyright">© ${new Date().getFullYear()} ${SITE.name}, ${SITE.city}. Seluruh hak cipta dilindungi.</div>`;
}