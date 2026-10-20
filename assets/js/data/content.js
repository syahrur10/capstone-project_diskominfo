/**
 * content.js — satu-satunya file yang perlu diedit untuk mengganti isi website.
 * Data bertanda "CONTOH" hanya placeholder: ganti dengan data asli sekolah.
 */
export const SITE = {
  name: 'SDN Bandarharjo 02',
  city: 'Semarang',
  address: 'Jl. Lodan Raya No. 1, Kel. Bandarharjo, Kec. Semarang Utara, Kota Semarang 50175',
  email: 'sdnbandarharjo02semarang@gmail.com',
  phone: '0243563228',
  oldSite: 'https://sdnbandarharjo02.dikdas.semarangkota.go.id',
  social: { facebook: '#', twitter: '#', youtube: '#', instagram: '#' }, // TODO isi link asli
};

export const STATS = [ // CONTOH — n angka = animasi hitung naik; n teks = tampil apa adanya
  { n: 350, s: '+', l: 'Peserta Didik' },
  { n: 15, s: '', l: 'Guru & Tenaga Kependidikan' },
  { n: 6, s: '', l: 'Rombongan Belajar' },
  { n: 'A', s: '', l: 'Akreditasi' },
];

export const MARQUEE = ['Berprestasi', 'Berkarakter', 'Ceria', 'Cinta Lingkungan', 'Kreatif', 'Santun', 'Cerdas'];

export const BERITA = [ // CONTOH
  { tag: 'Kegiatan', title: 'Upacara Bendera Hari Senin', date: '2026-09-28', icon: '🇮🇩', img: 'contoh-1.jpg', text: 'Seluruh siswa mengikuti upacara bendera dengan tertib dan penuh semangat.' },
  { tag: 'Prestasi', title: 'Siswa Raih Juara Lomba Tingkat Kecamatan', date: '2026-09-20', icon: '🏆', img: 'contoh-2.jpg', text: 'Selamat kepada para juara yang telah mengharumkan nama sekolah.' },
  { tag: 'Kegiatan', title: 'Jumat Bersih & Pembiasaan', date: '2026-09-18', icon: '🧹', img: 'contoh-3.jpg', text: 'Menumbuhkan karakter peduli lingkungan melalui kerja bakti bersama.' },
];

export const PENGUMUMAN = [ // CONTOH
  { title: 'Jadwal Penilaian Tengah Semester Ganjil', date: '2026-10-05', text: 'Pelaksanaan PTS dimulai pekan depan. Siswa diharap membawa alat tulis lengkap.' },
  { title: 'Pembagian Rapor Tengah Semester', date: '2026-10-17', text: 'Orang tua/wali diharapkan hadir sesuai jadwal kelas masing-masing.' },
  { title: 'Libur Peringatan Hari Besar Nasional', date: '2026-10-28', text: 'Kegiatan belajar mengajar diliburkan dan dimulai kembali sesuai kalender pendidikan.' },
];

export const LOMBA = [ // CONTOH
  { tag: 'Akademik', title: 'Olimpiade Sains Tingkat Kota', icon: '🔬', img: 'contoh-4.jpg', text: 'Ajang adu kemampuan IPA dan Matematika antar sekolah dasar se-Kota Semarang.' },
  { tag: 'Seni', title: 'Lomba Tari Daerah', icon: '💃', img: 'contoh-5.jpg', text: 'Mengenalkan dan melestarikan budaya lokal melalui seni tari.' },
  { tag: 'Olahraga', title: 'Turnamen Atletik & Futsal', icon: '⚽', img: 'contoh-6.jpg', text: 'Membina bakat olahraga siswa sejak dini.' },
  { tag: 'Literasi', title: 'Lomba Cerita & Mendongeng', icon: '📖', img: 'contoh-1.jpg', text: 'Menumbuhkan minat baca dan keberanian berbicara di depan umum.' },
];

// foto: taruh di /public/assets/images/galeri/ lalu tulis nama file-nya di "img"
export const GALERI = [ // CONTOH
  { cat: 'Kegiatan', title: 'Upacara Bendera', img: 'contoh-1.jpg' },
  { cat: 'Prestasi', title: 'Penyerahan Piala', img: 'contoh-2.jpg' },
  { cat: 'Kegiatan', title: 'Kerja Bakti', img: 'contoh-3.jpg' },
  { cat: 'Pembelajaran', title: 'Belajar di Kelas', img: 'contoh-4.jpg' },
  { cat: 'Pembelajaran', title: 'Praktik Sains', img: 'contoh-5.jpg' },
  { cat: 'Prestasi', title: 'Juara Lomba Seni', img: 'contoh-6.jpg' },
];

export const TAUTAN = [
  { label: 'Dinas Pendidikan Kota Semarang', href: 'https://dikdas.semarangkota.go.id' },
  { label: 'Kemendikdasmen', href: 'https://www.kemdikbud.go.id' },
  { label: 'Rapor Pendidikan', href: 'https://raporpendidikan.kemdikbud.go.id' },
  { label: 'Website Lama Sekolah', href: SITE.oldSite },
];

export const KURIKULUM = [ // CONTOH
  { m: 'Pendidikan Agama & Budi Pekerti', k: 'Kelas 1–6' },
  { m: 'Pendidikan Pancasila', k: 'Kelas 1–6' },
  { m: 'Bahasa Indonesia', k: 'Kelas 1–6' },
  { m: 'Matematika', k: 'Kelas 1–6' },
  { m: 'IPAS (Ilmu Pengetahuan Alam & Sosial)', k: 'Kelas 3–6' },
  { m: 'Pendidikan Jasmani, Olahraga & Kesehatan', k: 'Kelas 1–6' },
  { m: 'Seni & Budaya', k: 'Kelas 1–6' },
  { m: 'Bahasa Inggris / Muatan Lokal', k: 'Kelas 3–6' },
];