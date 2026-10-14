
document.addEventListener("DOMContentLoaded", function () {
  const judulBulan = document.getElementById("judul-bulan");
  const grid = document.getElementById("kalender-grid");
  const agenda = document.getElementById("daftar-agenda");
  const tampilanBulan = document.getElementById("tampilan-bulan");
  const tampilanDaftar = document.getElementById("tampilan-daftar");
  const tombolSebelumnya = document.getElementById("bulan-sebelumnya");
  const tombolBerikutnya = document.getElementById("bulan-berikutnya");

  // Pastikan elemen kalender tersedia di halaman.
  if (
    !judulBulan ||
    !grid ||
    !agenda ||
    !tampilanBulan ||
    !tampilanDaftar ||
    !tombolSebelumnya ||
    !tombolBerikutnya
  ) {
    return;
  }

  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  // DATA CONTOH.
  // Ganti dengan pengumuman resmi sekolah.
  // Format tanggal wajib YYYY-MM-DD.
  const events = [
    {
      tanggal: "2026-10-05",
      judul: "Penilaian Tengah Semester",
      deskripsi: "Pelaksanaan PTS sesuai jadwal sekolah.",
      kategori: "akademik"
    },
    {
      tanggal: "2026-10-08",
      judul: "Upacara Bendera",
      deskripsi: "Kegiatan upacara bendera di sekolah.",
      kategori: "kegiatan"
    },
    {
      tanggal: "2026-10-09",
      judul: "Kegiatan Sekolah",
      deskripsi: "Kegiatan sekolah sesuai agenda yang ditetapkan.",
      kategori: "kegiatan"
    },
    {
      tanggal: "2026-10-15",
      judul: "Pembelajaran Normal",
      deskripsi: "Kegiatan belajar mengajar sesuai jadwal kelas.",
      kategori: "akademik"
    },
    {
      tanggal: "2026-10-17",
      judul: "Pembagian Rapor",
      deskripsi: "Jadwal pembagian rapor sesuai informasi sekolah.",
      kategori: "akademik"
    },
    {
      tanggal: "2026-10-22",
      judul: "Kegiatan Pramuka",
      deskripsi: "Kegiatan kepramukaan di lingkungan sekolah.",
      kategori: "kegiatan"
    },
    {
      tanggal: "2026-10-28",
      judul: "Informasi Hari Libur",
      deskripsi: "Periksa pengumuman resmi untuk kepastian hari libur.",
      kategori: "libur"
    }
  ];

  // Mulai dari bulan berjalan sesuai waktu perangkat.
  const sekarang = new Date();
  let tahun = sekarang.getFullYear();
  let bulan = sekarang.getMonth();
  let mode = "bulan";

  const pad = angka => String(angka).padStart(2, "0");

  function formatTanggal(tahun, bulan, tanggal) {
    return `${tahun}-${pad(bulan + 1)}-${pad(tanggal)}`;
  }

  function buatElemen(tag, className, teks) {
    const elemen = document.createElement(tag);

    if (className) {
      elemen.className = className;
    }

    if (teks !== undefined) {
      elemen.textContent = teks;
    }

    return elemen;
  }

  function ambilAgendaBulanIni() {
    const awalan = `${tahun}-${pad(bulan + 1)}-`;

    return events
      .filter(event => event.tanggal.startsWith(awalan))
      .sort((a, b) => a.tanggal.localeCompare(b.tanggal));
  }

  function ambilAgendaTanggal(tanggal) {
    return events.filter(event => event.tanggal === tanggal);
  }

  function labelKategori(kategori) {
    const labels = {
      akademik: "Akademik",
      libur: "Libur",
      kegiatan: "Kegiatan Sekolah"
    };

    return labels[kategori] || "Pengumuman";
  }

  // Membuat label kegiatan di dalam kotak kalender.
  function buatChip(event) {
    const tombol = buatElemen(
      "button",
      `event-chip ${event.kategori}`,
      event.judul
    );

    tombol.type = "button";
    tombol.title = `${event.judul} — ${event.deskripsi}`;

    tombol.addEventListener("click", function () {
      alert(`${event.judul}\n\n${event.deskripsi}`);
    });

    return tombol;
  }

  // Membuat kartu agenda di sebelah kanan.
  function buatKartuAgenda(event) {
    const item = buatElemen("article", "agenda-item");
    const tanggalBox = buatElemen("div", "agenda-tanggal");

    if (event.kategori === "libur") {
      tanggalBox.classList.add("libur");
    }

    const bagianTanggal = event.tanggal.split("-").map(Number);
    const tanggal = bagianTanggal[2];
    const nomorBulan = bagianTanggal[1];

    tanggalBox.append(
      buatElemen("strong", "", String(tanggal)),
      buatElemen("span", "", namaBulan[nomorBulan - 1].slice(0, 3).toUpperCase())
    );

    const info = buatElemen("div", "agenda-info");
    const judul = buatElemen("h3", "", event.judul);
    const deskripsi = buatElemen("p", "", event.deskripsi);
    const kategori = buatElemen(
      "span",
      `agenda-kategori ${event.kategori}`,
      labelKategori(event.kategori)
    );

    info.append(judul, deskripsi, kategori);
    item.append(tanggalBox, info);

    return item;
  }

  // Membuat kalender bulanan.
  function renderKalender() {
    judulBulan.textContent = `${namaBulan[bulan]} ${tahun}`;
    grid.replaceChildren();

    const hariPertama = new Date(tahun, bulan, 1);
    const jumlahHari = new Date(tahun, bulan + 1, 0).getDate();
    const jumlahHariSebelumnya = new Date(tahun, bulan, 0).getDate();

    // Mengubah urutan agar Senin menjadi kolom pertama.
    const offset = (hariPertama.getDay() + 6) % 7;

    for (let i = 0; i < 42; i++) {
      let tanggal;
      let bulanCell = bulan;
      let tahunCell = tahun;
      let luarBulan = false;

      if (i < offset) {
        tanggal = jumlahHariSebelumnya - offset + i + 1;
        bulanCell--;

        if (bulanCell < 0) {
          bulanCell = 11;
          tahunCell--;
        }

        luarBulan = true;
      } else if (i >= offset + jumlahHari) {
        tanggal = i - offset - jumlahHari + 1;
        bulanCell++;

        if (bulanCell > 11) {
          bulanCell = 0;
          tahunCell++;
        }

        luarBulan = true;
      } else {
        tanggal = i - offset + 1;
      }

      const cell = buatElemen("div", "tanggal-cell");

      if (luarBulan) {
        cell.classList.add("tanggal-luar");
      }

      // Tandai hari Minggu.
      if (i % 7 === 6) {
        cell.classList.add("tanggal-minggu");
      }

      const nomor = buatElemen(
        "span",
        "nomor-tanggal",
        String(tanggal)
      );

      const tanggalLengkap = formatTanggal(
        tahunCell,
        bulanCell,
        tanggal
      );

      if (tanggalLengkap === formatTanggal(
        sekarang.getFullYear(),
        sekarang.getMonth(),
        sekarang.getDate()
      )) {
        nomor.classList.add("hari-ini");
      }

      cell.appendChild(nomor);

      // Tampilkan kegiatan yang jatuh pada tanggal tersebut.
      ambilAgendaTanggal(tanggalLengkap).forEach(event => {
        cell.appendChild(buatChip(event));
      });

      grid.appendChild(cell);
    }

    renderAgenda();
    renderDaftar();
  }

  // Menampilkan agenda untuk bulan yang dipilih.
  function renderAgenda() {
    agenda.replaceChildren();

    const daftar = ambilAgendaBulanIni();

    if (daftar.length === 0) {
      agenda.appendChild(
        buatElemen(
          "p",
          "kalender-kosong",
          "Belum ada agenda untuk bulan ini."
        )
      );

      return;
    }

    daftar.forEach(event => {
      agenda.appendChild(buatKartuAgenda(event));
    });
  }

  // Menampilkan agenda dalam bentuk daftar.
  function renderDaftar() {
    tampilanDaftar.replaceChildren();

    const daftar = ambilAgendaBulanIni();

    if (daftar.length === 0) {
      tampilanDaftar.appendChild(
        buatElemen(
          "p",
          "kalender-kosong",
          "Belum ada pengumuman untuk bulan ini."
        )
      );

      return;
    }

    daftar.forEach(event => {
      const item = buatElemen(
        "article",
        `daftar-event ${event.kategori}`
      );

      const [y, m, d] = event.tanggal.split("-").map(Number);

      const waktu = buatElemen(
        "time",
        "",
        `${d} ${namaBulan[m - 1]} ${y}`
      );

      waktu.dateTime = event.tanggal;

      const info = buatElemen("div");
      const judul = buatElemen("h3", "", event.judul);
      const deskripsi = buatElemen("p", "", event.deskripsi);

      info.append(judul, deskripsi);
      item.append(waktu, info);

      tampilanDaftar.appendChild(item);
    });
  }

  // Pindah ke bulan sebelumnya.
  tombolSebelumnya.addEventListener("click", function () {
    bulan--;

    if (bulan < 0) {
      bulan = 11;
      tahun--;
    }

    renderKalender();
  });

  // Pindah ke bulan berikutnya.
  tombolBerikutnya.addEventListener("click", function () {
    bulan++;

    if (bulan > 11) {
      bulan = 0;
      tahun++;
    }

    renderKalender();
  });

  // Ganti tampilan bulanan atau daftar.
  document.querySelectorAll(".mode-btn").forEach(tombol => {
    tombol.addEventListener("click", function () {
      mode = tombol.dataset.mode;

      document.querySelectorAll(".mode-btn").forEach(btn => {
        btn.classList.toggle("aktif", btn === tombol);
      });

      tampilanBulan.hidden = mode !== "bulan";
      tampilanDaftar.hidden = mode !== "daftar";
    });
  });

  // Render pertama kali.
  renderKalender();
});
