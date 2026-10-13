/** components.js — topbar, header, footer dipakai ulang di semua halaman. */
import { SITE, TAUTAN } from './data/content.js';
import { icon } from './icons.js';

const NAV = [
  { key: 'home', label: 'Beranda', href: '/' },
  { key: 'profil', label: 'Profil', href: '/pages/profil.html' },
  { key: 'akademik', label: 'Akademik', href: '/pages/akademik.html' },
  { key: 'lomba', label: 'Lomba', href: '/pages/lomba.html' },
  { key: 'galeri', label: 'Galeri', href: '/pages/galeri.html' },
  { key: 'pengumuman', label: 'Pengumuman', href: '/pages/pengumuman.html' },
  { key: 'tautan', label: 'Tautan', sub: TAUTAN },
  { key: 'kontak', label: 'Kontak', href: '/pages/kontak.html' },
  { key: 'kuis', label: 'Kuis Cerdas', href: '/pages/kuis.html', cta: true },
];

export function renderChrome() {
  const page = document.body.dataset.page;
  const links = NAV.map((n) => n.sub
    ? `<li class="nav-item"><a href="#" class="nav-link has-sub" aria-haspopup="true">${n.label}</a>
        <div class="dropdown">${n.sub.map((s) => `<a href="${s.href}" target="_blank" rel="noopener">${s.label}</a>`).join('')}</div></li>`
    : `<li class="nav-item"><a href="${n.href}" class="nav-link ${n.cta ? 'nav-cta' : ''} ${n.key === page ? 'active' : ''}">${n.label}</a></li>`
  ).join('');

  document.getElementById('site-header').innerHTML = `
    <div class="topbar"><div class="container">
      <div class="topbar-info"><a href="mailto:${SITE.email}">${icon('mail', 15)} ${SITE.email}</a><a href="tel:${SITE.phone}">${icon('phone', 15)} ${SITE.phone}</a></div>
      <a href="/pages/kontak.html#pengaduan">Kotak pengaduan &amp; umpan balik</a>
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
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="/assets/images/logo-sdn-bandarharjo-02.png" alt="Logo ${SITE.name}">
        <h4>${SITE.name}</h4><p>${SITE.address}</p>
        <div class="socials">
          <a href="${s.facebook}" aria-label="Facebook">${icon('facebook', 18)}</a><a href="${s.twitter}" aria-label="X">${icon('x', 16)}</a>
          <a href="${s.youtube}" aria-label="YouTube">${icon('youtube', 18)}</a><a href="${s.instagram}" aria-label="Instagram">${icon('instagram', 18)}</a>
        </div>
      </div>
      <div><h4>Menu</h4><ul class="footer-links">
        ${NAV.filter((n) => n.href).map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
      </ul></div>
      <div><h4>Hubungi kami</h4><ul class="footer-links">
        <li>${icon('mail', 16)}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li>${icon('phone', 16)}<a href="tel:${SITE.phone}">${SITE.phone}</a></li>
        <li>${icon('send', 16)}<a href="/pages/kontak.html#pengaduan">Kotak pengaduan</a></li>
      </ul></div>
    </div>
    <div class="copyright">© ${new Date().getFullYear()} ${SITE.name}, ${SITE.city}. Seluruh hak cipta dilindungi.</div>`;
}
