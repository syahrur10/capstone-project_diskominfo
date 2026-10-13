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
  wa: '6281234567890', // TODO: ganti nomor WhatsApp sekolah (format 62xxx tanpa +)
  kepsek: 'Nama Kepala Sekolah', // TODO: ganti dengan nama kepala sekolah
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
  { tag: 'Kegiatan', title: 'Upacara Bendera Hari Senin', date: '2026-09-28', icon: 'flag', img: 'contoh-1.jpg', text: 'Seluruh siswa mengikuti upacara bendera dengan tertib dan penuh semangat.' },
  { tag: 'Prestasi', title: 'Siswa Raih Juara Lomba Tingkat Kecamatan', date: '2026-09-20', icon: 'trophy', img: 'contoh-2.jpg', text: 'Selamat kepada para juara yang telah mengharumkan nama sekolah.' },
  { tag: 'Kegiatan', title: 'Jumat Bersih & Pembiasaan', date: '2026-09-18', icon: 'leaf', img: 'contoh-3.jpg', text: 'Menumbuhkan karakter peduli lingkungan melalui kerja bakti bersama.' },
];

/**
 * PENGUMUMAN — satu daftar untuk SEPANJANG TAHUN; halaman Pengumuman otomatis
 * membaginya per bulan (tahun & bulan dibaca dari "date": YYYY-MM-DD).
 * tag: 'Akademik' | 'Libur' | 'Kegiatan' | 'Administrasi'  (menentukan warna label)
 * Cukup tambah baris baru; urutan di array tidak penting.
 */
export const PENGUMUMAN = [ // CONTOH
  { date: '2025-11-10', tag: 'Kegiatan', title: 'Upacara Peringatan Hari Pahlawan', text: 'Seluruh siswa mengenakan seragam lengkap dan berkumpul di lapangan pukul 07.00 WIB.' },
  { date: '2025-12-20', tag: 'Akademik', title: 'Pembagian Rapor Semester Ganjil 2025/2026', text: 'Orang tua/wali mengambil rapor sesuai jadwal kelas masing-masing di ruang kelas.' },
  { date: '2025-12-22', tag: 'Libur', title: 'Libur Semester Ganjil dan Natal', text: 'Libur semester dimulai 22 Desember 2025 dan berakhir 3 Januari 2026.' },

  { date: '2026-01-05', tag: 'Akademik', title: 'Awal Masuk Semester Genap', text: 'Kegiatan belajar mengajar semester genap dimulai kembali. Siswa hadir pukul 07.00 WIB.' },
  { date: '2026-01-23', tag: 'Kegiatan', title: 'Jumat Sehat dan Senam Pagi Bersama', text: 'Senam bersama seluruh siswa dan guru. Siswa memakai pakaian olahraga.' },
  { date: '2026-02-09', tag: 'Administrasi', title: 'Pembaruan Data Peserta Didik (Dapodik)', text: 'Orang tua diminta memeriksa kembali data anak di buku penghubung dan melapor ke wali kelas bila ada perubahan.' },
  { date: '2026-02-17', tag: 'Libur', title: 'Libur Tahun Baru Imlek', text: 'Kegiatan belajar mengajar diliburkan dan dimulai kembali pada hari berikutnya.' },
  { date: '2026-03-02', tag: 'Akademik', title: 'Asesmen Sumatif Tengah Semester Genap', text: 'Asesmen berlangsung selama satu pekan. Siswa membawa alat tulis lengkap.' },
  { date: '2026-03-16', tag: 'Libur', title: 'Libur Hari Raya Nyepi dan Idulfitri', text: 'Libur sesuai kalender pendidikan Kota Semarang. Informasi masuk kembali akan disampaikan lewat grup kelas.' },
  { date: '2026-04-21', tag: 'Kegiatan', title: 'Peringatan Hari Kartini', text: 'Siswa berpakaian adat daerah. Ada lomba fashion show dan menggambar.' },
  { date: '2026-05-04', tag: 'Akademik', title: 'Pendaftaran Peserta Didik Baru (SPMB) 2026/2027', text: 'Pendaftaran dibuka secara daring dan luring. Persyaratan dapat dilihat di papan pengumuman sekolah.' },
  { date: '2026-05-20', tag: 'Kegiatan', title: 'Peringatan Hari Kebangkitan Nasional', text: 'Upacara bendera dan pentas seni singkat dari perwakilan tiap kelas.' },
  { date: '2026-06-08', tag: 'Akademik', title: 'Asesmen Sumatif Akhir Tahun Kelas 1–5', text: 'Pelaksanaan asesmen akhir tahun. Jadwal per kelas dibagikan melalui wali kelas.' },
  { date: '2026-06-27', tag: 'Akademik', title: 'Pembagian Rapor Kenaikan Kelas', text: 'Rapor diambil oleh orang tua/wali. Mohon hadir tepat waktu sesuai jadwal.' },
  { date: '2026-07-13', tag: 'Akademik', title: 'Hari Pertama Tahun Ajaran 2026/2027', text: 'Masa Pengenalan Lingkungan Sekolah (MPLS) untuk siswa baru kelas 1.' },
  { date: '2026-08-17', tag: 'Kegiatan', title: 'Upacara dan Lomba HUT Kemerdekaan RI', text: 'Upacara bendera dilanjutkan lomba tradisional antar kelas: balap karung, makan kerupuk, dan tarik tambang.' },
  { date: '2026-09-28', tag: 'Kegiatan', title: 'Kegiatan Jumat Bersih dan Pembiasaan', text: 'Kerja bakti membersihkan kelas dan halaman sekolah bersama-sama.' },
  { date: '2026-10-05', tag: 'Akademik', title: 'Jadwal Penilaian Tengah Semester Ganjil', text: 'Pelaksanaan PTS dimulai pekan depan. Siswa diharap membawa alat tulis lengkap.' },
  { date: '2026-10-17', tag: 'Administrasi', title: 'Pembagian Rapor Tengah Semester', text: 'Orang tua/wali diharapkan hadir sesuai jadwal kelas masing-masing.' },
  { date: '2026-10-28', tag: 'Libur', title: 'Libur Peringatan Hari Besar Nasional', text: 'Kegiatan belajar mengajar diliburkan dan dimulai kembali sesuai kalender pendidikan.' },
  { date: '2026-11-10', tag: 'Kegiatan', title: 'Upacara Peringatan Hari Pahlawan', text: 'Siswa mengenakan seragam lengkap. Ada pembacaan puisi perjuangan oleh perwakilan kelas.' },
  { date: '2026-11-25', tag: 'Kegiatan', title: 'Peringatan Hari Guru Nasional', text: 'Siswa menyiapkan penampilan dan kartu ucapan untuk bapak dan ibu guru.' },
  { date: '2026-12-14', tag: 'Akademik', title: 'Asesmen Sumatif Akhir Semester Ganjil', text: 'Asesmen berlangsung satu pekan. Jadwal lengkap dibagikan melalui wali kelas.' },
  { date: '2026-12-19', tag: 'Akademik', title: 'Pembagian Rapor Semester Ganjil', text: 'Orang tua/wali mengambil rapor di kelas masing-masing sesuai jadwal.' },
  { date: '2026-12-21', tag: 'Libur', title: 'Libur Semester dan Natal', text: 'Libur semester dimulai 21 Desember 2026. Masuk kembali sesuai kalender pendidikan.' },
];

export const LOMBA = [ // CONTOH
  { tag: 'Akademik', title: 'Olimpiade Sains Tingkat Kota', icon: 'flask', img: 'contoh-4.jpg', text: 'Ajang adu kemampuan IPA dan Matematika antar sekolah dasar se-Kota Semarang.' },
  { tag: 'Seni', title: 'Lomba Tari Daerah', icon: 'music', img: 'contoh-5.jpg', text: 'Mengenalkan dan melestarikan budaya lokal melalui seni tari.' },
  { tag: 'Olahraga', title: 'Turnamen Atletik & Futsal', icon: 'ball', img: 'contoh-6.jpg', text: 'Membina bakat olahraga siswa sejak dini.' },
  { tag: 'Literasi', title: 'Lomba Cerita & Mendongeng', icon: 'book', img: 'contoh-1.jpg', text: 'Menumbuhkan minat baca dan keberanian berbicara di depan umum.' },
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

/**
 * SLIDER — slide di bagian atas Beranda. Urutan array = urutan tampil.
 * - type 'default' : gambar latar + judul/teks sambutan (hanya pakai 1 slide ini).
 * - type 'flyer'   : tampilkan flyer/poster utuh (event: Hari Batik, Pramuka, dll).
 * Cara ganti: taruh gambar di /public/assets/images/slider/ (jpg/png/webp/svg),
 * lalu tambah/hapus/ubah baris di bawah. Slide dengan "aktif: false" disembunyikan.
 * Opsional: "href" (flyer bisa diklik), "mulai"/"selesai" (YYYY-MM-DD) agar tampil otomatis
 * hanya pada rentang tanggal tertentu.
 */
export const SLIDER = [ // CONTOH — semua gambar masih dummy
  { type: 'default', img: 'sekolah-dummy.svg', alt: 'Gedung SDN Bandarharjo 02 (gambar contoh)' },
  { type: 'flyer', img: 'flyer-hari-batik.svg', alt: 'Flyer Hari Batik Nasional', href: '/pages/pengumuman.html' },
  { type: 'flyer', img: 'flyer-pramuka.svg', alt: 'Flyer Hari Pramuka' },
  { type: 'flyer', img: 'flyer-kemerdekaan.svg', alt: 'Flyer HUT Kemerdekaan RI', aktif: false },
];

export const TAUTAN = [
  { label: 'Dinas Pendidikan Kota Semarang', href: 'https://dikdas.semarangkota.go.id' },
  { label: 'Sang Juara (Kejuaraan Siswa)', href: 'https://sangjuara.semarangkota.go.id/kejuaraan_siswa?tingkat=&sekolah=327&q=' },
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