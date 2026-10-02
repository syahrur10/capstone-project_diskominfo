/**
 * content.js — SATU-SATUNYA file yang perlu diedit untuk mengganti isi website.
 * Data bertanda "CONTOH" hanya placeholder: ganti dengan data asli sekolah.
 */
export const SITE = {
  name: 'SDN Bandarharjo 02',
  city: 'Semarang',
  address: 'Jl. Lodan Raya No. 1, Kel. Bandarharjo, Kec. Semarang Utara, Kota Semarang 50175',
  email: 'sdnbandarharjo02semarang@gmail.com',
  phone: '0243563228',
  wa: '6281234567890', // TODO: ganti dengan nomor WhatsApp sekolah (format 62xxx, tanpa +)
  oldSite: 'https://sdnbandarharjo02.dikdas.semarangkota.go.id',
  social: { facebook: '#', twitter: '#', youtube: '#', instagram: '#' }, // TODO isi link asli
  mapEmbed: 'https://www.google.com/maps?q=SDN+Bandarharjo+02+Semarang&output=embed',
};

export const STATS = [ // CONTOH
  { n: '350+', l: 'Peserta Didik' },
  { n: '15', l: 'Guru & Tenaga Kependidikan' },
  { n: '6', l: 'Rombongan Belajar' },
  { n: 'A', l: 'Akreditasi' },
];

export const BERITA = [ // CONTOH — urut terbaru di atas
  { id: 1, tag: 'Kegiatan', title: 'Upacara Bendera Hari Senin', date: '2026-09-28', icon: '🇮🇩', text: 'Seluruh siswa mengikuti upacara bendera dengan tertib dan penuh semangat.' },
  { id: 2, tag: 'Prestasi', title: 'Siswa Raih Juara Lomba Tingkat Kecamatan', date: '2026-09-20', icon: '🏆', text: 'Selamat kepada para juara yang telah mengharumkan nama sekolah.' },
  { id: 3, tag: 'Kegiatan', title: 'Jumat Bersih & Kegiatan Pembiasaan', date: '2026-09-18', icon: '🧹', text: 'Menumbuhkan karakter peduli lingkungan melalui kerja bakti bersama.' },
];

export const PENGUMUMAN = [ // CONTOH
  { title: 'Jadwal Penilaian Tengah Semester Ganjil', date: '2026-10-05', text: 'Pelaksanaan PTS dimulai pekan depan. Siswa diharap membawa alat tulis lengkap.' },
  { title: 'Pembagian Rapor Tengah Semester', date: '2026-10-17', text: 'Orang tua/wali diharapkan hadir sesuai jadwal kelas masing-masing.' },
  { title: 'Libur Peringatan Hari Besar Nasional', date: '2026-10-28', text: 'Kegiatan belajar mengajar diliburkan dan dimulai kembali sesuai kalender pendidikan.' },
];

export const LOMBA = [ // CONTOH
  { tag: 'Akademik', title: 'Olimpiade Sains Tingkat Kota', icon: '🔬', text: 'Ajang adu kemampuan IPA dan Matematika antar sekolah dasar se-Kota Semarang.' },
  { tag: 'Seni', title: 'Lomba Tari Daerah', icon: '💃', text: 'Mengenalkan dan melestarikan budaya lokal melalui seni tari.' },
  { tag: 'Olahraga', title: 'Turnamen Atletik & Futsal', icon: '⚽', text: 'Membina bakat olahraga siswa sejak dini.' },
  { tag: 'Literasi', title: 'Lomba Cerita & Mendongeng', icon: '📖', text: 'Menumbuhkan minat baca dan keberanian berbicara di depan umum.' },
];

// file foto: taruh di /public/assets/images/galeri/ lalu isi nama file di "img"
export const GALERI = [ // CONTOH
  { cat: 'Kegiatan', title: 'Upacara Bendera', icon: '🇮🇩', img: '' },
  { cat: 'Prestasi', title: 'Penyerahan Piala', icon: '🏆', img: '' },
  { cat: 'Kegiatan', title: 'Kerja Bakti', icon: '🧹', img: '' },
  { cat: 'Pembelajaran', title: 'Belajar di Kelas', icon: '✏️', img: '' },
  { cat: 'Pembelajaran', title: 'Praktik Sains', icon: '🔬', img: '' },
  { cat: 'Prestasi', title: 'Juara Lomba Seni', icon: '🎨', img: '' },
];

export const TAUTAN = [
  { label: 'Dinas Pendidikan Kota Semarang', href: 'https://dikdas.semarangkota.go.id' },
  { label: 'Kemendikdasmen', href: 'https://www.kemdikbud.go.id' },
  { label: 'Rapor Pendidikan', href: 'https://raporpendidikan.kemdikbud.go.id' },
  { label: 'Website Lama Sekolah', href: SITE.oldSite },
];

export const KURIKULUM = [ // CONTOH jadwal/mapel
  { m: 'Pendidikan Agama & Budi Pekerti', k: 'Kelas 1–6' },
  { m: 'Pendidikan Pancasila', k: 'Kelas 1–6' },
  { m: 'Bahasa Indonesia', k: 'Kelas 1–6' },
  { m: 'Matematika', k: 'Kelas 1–6' },
  { m: 'IPAS (Ilmu Pengetahuan Alam & Sosial)', k: 'Kelas 3–6' },
  { m: 'Pendidikan Jasmani, Olahraga & Kesehatan', k: 'Kelas 1–6' },
  { m: 'Seni & Budaya', k: 'Kelas 1–6' },
  { m: 'Bahasa Inggris / Muatan Lokal', k: 'Kelas 3–6' },
];
