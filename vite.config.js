import { defineConfig } from 'vite';
import { resolve } from 'path';

// Multi-page: setiap halaman HTML didaftarkan sebagai entry build.
export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        profil: resolve(__dirname, 'pages/profil.html'),
        akademik: resolve(__dirname, 'pages/akademik.html'),
        lomba: resolve(__dirname, 'pages/lomba.html'),
        galeri: resolve(__dirname, 'pages/galeri.html'),
        pengumuman: resolve(__dirname, 'pages/pengumuman.html'),
        kontak: resolve(__dirname, 'pages/kontak.html'),
        kuis: resolve(__dirname, 'pages/kuis.html'),
      },
    },
  },
});