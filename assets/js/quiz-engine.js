/**
 * quiz-engine.js — "Otak AI" kuis adaptif (machine learning ringan, jalan di browser).
 *
 * 1) Regresi logistik ONLINE (SGD): memprediksi peluang anak menjawab BENAR sebuah soal.
 *    Fitur x = [bias, tingkat soal, one-hot topik(4), akurasi topik, akurasi 5 soal terakhir, kecepatan].
 *    Setelah tiap jawaban, bobot w di-update:  w += lr * (y - p) * x  (dengan regularisasi L2).
 * 2) Estimasi kemampuan per topik ala Item Response Theory 1PL (mirip rating Elo).
 * 3) Pemilihan soal: pilih soal yang peluang benarnya paling dekat 70% (zona belajar optimal),
 *    dengan sedikit bonus untuk topik terlemah.
 * Seluruh data tersimpan di localStorage perangkat anak (tanpa server).
 */
export const TOPICS = [
  { id: 'hitung', name: 'Hitung Cepat', icon: 'calc', color: '#ff6b6b' },
  { id: 'polaAngka', name: 'Pola Angka', icon: 'digits', color: '#4dabf7' },
  { id: 'polaGambar', name: 'Pola Gambar', icon: 'palette', color: '#51cf66' },
  { id: 'logika', name: 'Logika', icon: 'puzzle', color: '#f59f00' },
];
const R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (a) => a[R(0, a.length - 1)];
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = R(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const sig = (z) => 1 / (1 + Math.exp(-z));

/* ---------- GENERATOR SOAL ---------- */
function numOptions(ans, spread = 5) {
  const s = new Set([ans]);
  shuffle([ans + 1, ans - 1, ans + 2, ans - 2, ans + 10, ans - 10, ans + spread, ans - spread]).forEach((c) => { if (s.size < 4 && c >= 0 && !s.has(c)) s.add(c); });
  let k = 3; while (s.size < 4) s.add(ans + k++);
  return shuffle([...s]);
}
const mk = (topic, level, html, ans, opts, hint, ex) => ({ topic, level, html, options: opts.map(String), answer: opts.indexOf(ans), hint, explain: ex });

function genHitung(l) {
  let q, ans, hint, ex;
  if (l <= 2) { const m = 4 + 3 * l, a = R(1, m), b = R(1, m); q = `${a} + ${b} = ?`; ans = a + b; hint = 'Hitung pakai jari atau garis bilangan 😉'; ex = `${a} + ${b} = ${ans}`; }
  else if (l === 3) { const a = R(10, 30), b = R(5, 19); q = `${a} + ${b} = ?`; ans = a + b; hint = 'Jumlahkan satuan dulu, lalu puluhan.'; ex = `${a} + ${b} = ${ans}`; }
  else if (l === 4) { const a = R(20, 60), b = R(5, 19); q = `${a} − ${b} = ?`; ans = a - b; hint = 'Kurangi puluhan dulu, lalu satuan.'; ex = `${a} − ${b} = ${ans}`; }
  else if (l === 5) { const a = R(2, 5), b = R(2, 9); q = `${a} × ${b} = ?`; ans = a * b; hint = `Tambahkan ${b} sebanyak ${a} kali.`; ex = `${a} × ${b} = ${ans}`; }
  else if (l === 6) { const a = R(3, 9), b = R(3, 9); q = `${a} × ${b} = ?`; ans = a * b; hint = 'Ingat tabel perkalian ya!'; ex = `${a} × ${b} = ${ans}`; }
  else if (l === 7) { const a = R(2, 9), b = R(2, 9), c = R(3, 20); q = `${a} × ${b} + ${c} = ?`; ans = a * b + c; hint = 'Kerjakan kali dulu, baru tambah.'; ex = `${a}×${b}=${a * b}, lalu + ${c} = ${ans}`; }
  else if (l === 8) { const a = R(4, 9), b = R(4, 9), c = R(2, Math.min(25, a * b - 1)); q = `${a} × ${b} − ${c} = ?`; ans = a * b - c; hint = 'Kerjakan kali dulu, baru kurang.'; ex = `${a}×${b}=${a * b}, lalu − ${c} = ${ans}`; }
  else if (l === 9) { const b = R(3, 9); ans = R(4, 12); q = `${b * ans} ÷ ${b} = ?`; hint = `Berapa kali ${b} muat di ${b * ans}?`; ex = `${b} × ${ans} = ${b * ans}, jadi ${b * ans} ÷ ${b} = ${ans}`; }
  else { const a = R(3, 12), b = R(3, 12), c = R(2, 6); q = `(${a} + ${b}) × ${c} = ?`; ans = (a + b) * c; hint = 'Kerjakan yang di dalam kurung dulu.'; ex = `(${a}+${b})=${a + b}, lalu × ${c} = ${ans}`; }
  return mk('hitung', l, q, ans, numOptions(ans, l > 4 ? 6 : 3), hint, ex);
}

function genPolaAngka(l) {
  let seq = [], rule, hint;
  const len = l >= 7 ? 5 : 4;
  if (l <= 2) { const d = R(1, l + 2), s = R(1, 10); for (let i = 0; i <= len; i++) seq.push(s + d * i); rule = `ditambah ${d} setiap langkah`; hint = 'Lihat selisih dua angka yang bersebelahan.'; }
  else if (l <= 4) { const down = Math.random() < .5, d = down ? R(2, 6) : R(5, 12), s = down ? R(40, 70) : R(1, 20); for (let i = 0; i <= len; i++) seq.push(down ? s - d * i : s + d * i); rule = down ? `dikurangi ${d} setiap langkah` : `ditambah ${d} setiap langkah`; hint = 'Apakah angkanya naik atau turun? Berapa selisihnya?'; }
  else if (l <= 6) { const m = l === 5 ? 2 : 3, s = R(1, l === 5 ? 4 : 3); for (let i = 0; i <= len; i++) seq.push(s * Math.pow(m, i)); rule = `dikali ${m} setiap langkah`; hint = 'Coba bagi angka berikutnya dengan angka sebelumnya.'; }
  else if (l <= 8) { const a = R(1, 5), b = R(2, 8), s = R(1, 10); seq = [s]; for (let i = 0; i < len; i++) seq.push(seq[i] + (i % 2 === 0 ? a : b)); rule = `bergantian ditambah ${a} lalu ditambah ${b}`; hint = 'Selisihnya berganti-ganti. Perhatikan dua langkah sekaligus.'; }
  else if (l === 9) { const n = R(1, 4); for (let i = 0; i <= len; i++) seq.push((n + i) * (n + i)); rule = 'bilangan kuadrat (angka dikali dirinya sendiri)'; hint = '1×1, 2×2, 3×3 …'; }
  else { let a = R(1, 4), b = R(1, 5); seq = [a, b]; for (let i = 2; i <= len; i++) seq.push(seq[i - 1] + seq[i - 2]); rule = 'jumlah dua angka sebelumnya'; hint = 'Coba jumlahkan dua angka berturut-turut.'; }
  const ans = seq[seq.length - 1], shown = seq.slice(0, -1);
  return mk('polaAngka', l, `<span class="seq">${shown.join(', ')}, <span class="qm">?</span></span>`, ans, numOptions(ans, Math.max(2, Math.round(ans / 6))), hint, `Pola: ${rule}. Jadi angka berikutnya ${ans}.`);
}

const EMOJI = ['🍎', '🍌', '🍇', '🍓', '🐶', '🐱', '🐸', '⭐', '🌙', '☀️', '🚗', '🚀', '⚽', '🎈', '🦋', '🐟'];
const PATTERNS = { 1: [[0, 1]], 2: [[0, 1]], 3: [[0, 0, 1]], 4: [[0, 1, 2]], 5: [[0, 1, 1]], 6: [[0, 0, 1, 1]], 7: [[0, 1, 0, 2]], 8: [[0, 1, 2, 1]], 9: [[0, 1, 2, 3]], 10: [[0, 1, 1, 2, 2, 2], [0, 1, 2, 2, 1, 0]] };
function genPolaGambar(l) {
  const p = pick(PATTERNS[l]), P = p.length, k = Math.max(...p) + 1;
  const sym = shuffle(EMOJI).slice(0, 4 + 0);
  const total = P === 2 ? 5 : P + R(Math.max(2, Math.ceil(P * .6)), P - 1);
  const seq = Array.from({ length: total + 1 }, (_, i) => sym[p[i % P]]);
  const ans = seq.pop();
  const used = sym.slice(0, k), extra = sym.slice(k);
  const opts = shuffle([...used, ...extra].slice(0, 4));
  if (!opts.includes(ans)) opts[0] = ans;
  return mk('polaGambar', l, `<span class="seq">${seq.join(' ')} <span class="qm">❓</span></span>`, ans, shuffle(opts), 'Cari kelompok gambar yang berulang-ulang.', `Polanya berulang: ${p.slice(0, P).map((i) => sym[i]).join(' ')} … jadi berikutnya ${ans}.`);
}

/* bank soal logika: o = pilihan (jawaban benar selalu o[0], diacak saat dipakai) */
const LOGIKA = [
  { l: 1, q: 'Mana yang BERBEDA?<br>🐱 🐶 🐰 🚗', o: ['🚗', '🐱', '🐶', '🐰'], h: 'Tiga lainnya adalah hewan.', e: 'Mobil bukan hewan.' },
  { l: 1, q: 'Mana yang BERBEDA?<br>🍎 🍌 🍇 🪑', o: ['🪑', '🍎', '🍌', '🍇'], h: 'Tiga lainnya bisa dimakan.', e: 'Kursi tidak bisa dimakan.' },
  { l: 2, q: 'Mana yang BERBEDA?<br>Meja – Kursi – Lemari – Kucing', o: ['Kucing', 'Meja', 'Kursi', 'Lemari'], h: 'Tiga lainnya adalah perabot.', e: 'Kucing adalah hewan, bukan perabot.' },
  { l: 2, q: 'Siang : Terang = Malam : ?', o: ['Gelap', 'Panas', 'Ramai', 'Hujan'], h: 'Lawan kata dari terang.', e: 'Siang terang, malam gelap.' },
  { l: 2, q: 'Senin, Selasa, Rabu, … ?', o: ['Kamis', 'Jumat', 'Minggu', 'Sabtu'], h: 'Hari setelah Rabu.', e: 'Setelah Rabu adalah Kamis.' },
  { l: 3, q: 'Mana yang BERBEDA?<br>Kereta – Pesawat – Kapal – Sepatu', o: ['Sepatu', 'Kereta', 'Pesawat', 'Kapal'], h: 'Tiga lainnya adalah kendaraan.', e: 'Sepatu bukan kendaraan.' },
  { l: 3, q: 'Kucing : Mengeong = Anjing : ?', o: ['Menggonggong', 'Berkokok', 'Mengembik', 'Berkicau'], h: 'Suara anjing.', e: 'Kucing mengeong, anjing menggonggong.' },
  { l: 3, q: 'Mata : Melihat = Telinga : ?', o: ['Mendengar', 'Mencium', 'Berbicara', 'Berjalan'], h: 'Fungsi telinga.', e: 'Telinga untuk mendengar.' },
  { l: 3, q: 'Panas : Dingin = Tinggi : ?', o: ['Rendah', 'Besar', 'Jauh', 'Lebar'], h: 'Lawan kata.', e: 'Lawan dari tinggi adalah rendah.' },
  { l: 4, q: 'Ayam : Telur = Sapi : ?', o: ['Susu', 'Rumput', 'Kandang', 'Tanduk'], h: 'Apa yang dihasilkan sapi?', e: 'Ayam menghasilkan telur, sapi menghasilkan susu.' },
  { l: 4, q: 'Dokter : Rumah Sakit = Guru : ?', o: ['Sekolah', 'Pasar', 'Kantor', 'Taman'], h: 'Tempat guru bekerja.', e: 'Guru mengajar di sekolah.' },
  { l: 4, q: 'Pensil : Menulis = Pisau : ?', o: ['Memotong', 'Menggambar', 'Membaca', 'Menyapu'], h: 'Untuk apa pisau?', e: 'Pisau digunakan untuk memotong.' },
  { l: 5, q: 'Jika hari ini Rabu, 2 hari lagi hari apa?', o: ['Jumat', 'Kamis', 'Sabtu', 'Selasa'], h: 'Hitung: Kamis (1), … (2).', e: 'Rabu → Kamis → Jumat.' },
  { l: 5, q: 'Ada 3 kucing. Tiap kucing punya 4 kaki. Berapa seluruh kakinya?', o: ['12', '7', '10', '16'], h: '4 + 4 + 4', e: '3 × 4 = 12 kaki.' },
  { l: 6, q: 'Ani lebih tinggi dari Budi. Budi lebih tinggi dari Cici. Siapa yang PALING PENDEK?', o: ['Cici', 'Ani', 'Budi', 'Sama semua'], h: 'Urutkan dari yang tertinggi.', e: 'Ani > Budi > Cici, jadi Cici paling pendek.' },
  { l: 6, q: 'Semua burung punya sayap. Merpati adalah burung. Jadi merpati …', o: ['punya sayap', 'tidak punya sayap', 'ikan', 'hewan air'], h: 'Merpati termasuk burung.', e: 'Karena merpati burung, ia punya sayap.' },
  { l: 7, q: 'Rina punya 5 permen. Ia beri 2 ke Sari, lalu diberi 4 oleh Ibu. Permen Rina sekarang?', o: ['7', '9', '11', '3'], h: '5 − 2, lalu + 4.', e: '5 − 2 = 3, lalu 3 + 4 = 7.' },
  { l: 7, q: 'Mana yang BERBEDA?<br>2 – 4 – 7 – 8', o: ['7', '2', '4', '8'], h: 'Tiga angka lainnya genap.', e: '7 adalah bilangan ganjil.' },
  { l: 8, q: 'Mana yang BERBEDA?<br>9 – 18 – 27 – 31', o: ['31', '9', '18', '27'], h: 'Tabel perkalian 9.', e: '31 bukan kelipatan 9.' },
  { l: 8, q: 'Budi berdiri di antara Ani dan Cici. Cici di sebelah KANAN Budi. Ani ada di …', o: ['kiri Budi', 'kanan Budi', 'depan Cici', 'belakang Budi'], h: 'Gambar mereka berbaris.', e: 'Urutan: Ani – Budi – Cici.' },
  { l: 9, q: 'Kakak berumur 12 tahun. Adik separuh umur kakak. 3 tahun lagi umur adik?', o: ['9', '6', '8', '15'], h: 'Umur adik sekarang 12 ÷ 2.', e: 'Adik 6 tahun, 3 tahun lagi 9 tahun.' },
  { l: 9, q: '12 apel dibagi rata ke 4 anak. Lalu tiap anak makan 1 apel. Sisa apel seluruhnya?', o: ['8', '9', '3', '11'], h: 'Berapa apel yang dimakan semuanya?', e: '4 anak makan 4 apel, sisa 12 − 4 = 8.' },
  { l: 10, q: 'Jika ♦ + ♦ = 10 dan ♦ + ● = 8, maka ● = ?', o: ['3', '2', '5', '4'], h: 'Cari nilai ♦ dulu.', e: '♦ = 5, jadi ● = 8 − 5 = 3.' },
  { l: 10, q: '5 anak saling berjabat tangan, masing-masing sekali dengan semua anak lain. Berapa jabat tangan?', o: ['10', '5', '15', '20'], h: '4 + 3 + 2 + 1', e: '4 + 3 + 2 + 1 = 10 jabat tangan.' },
];
function genLogika(l, used) {
  const pool = LOGIKA.map((x, i) => ({ ...x, i })).filter((x) => !used.has('L' + x.i));
  const src = pool.length ? pool : LOGIKA.map((x, i) => ({ ...x, i }));
  src.sort((a, b) => Math.abs(a.l - l) - Math.abs(b.l - l) || Math.random() - .5);
  const it = src[0]; used.add('L' + it.i);
  const opts = shuffle(it.o);
  return { ...mk('logika', it.l, it.q, it.o[0], opts, it.h, it.e) };
}
const GEN = { hitung: genHitung, polaAngka: genPolaAngka, polaGambar: genPolaGambar, logika: genLogika };

/* ---------- OTAK AI ---------- */
const KEY = 'sdn02-brain-v1';
const W0 = [0.8, -3.2, 0, 0, 0, 0, 1.6, 1.0, -0.6]; // prior: bias, level, topik×4, akurasi topik, akurasi terakhir, kecepatan
export const FEATURE_NAMES = ['bias', 'tingkat soal', ...TOPICS.map((t) => 'topik:' + t.id), 'akurasi topik', 'akurasi terakhir', 'kecepatan'];
export const TARGET_P = 0.7;

export class Brain {
  constructor() { this.reset(false); try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.w && s.w.length === W0.length) Object.assign(this, s); } catch {} }
  reset(save = true) {
    Object.assign(this, { w: [...W0], theta: Object.fromEntries(TOPICS.map((t) => [t.id, 3])), topicAcc: Object.fromEntries(TOPICS.map((t) => [t.id, .5])),
      recent: [], speed: .5, n: 0, rounds: 0, profile: this.profile || { name: '', avatar: 'fox' }, board: this.board || [] });
    if (save) this.save();
  }
  save() { try { localStorage.setItem(KEY, JSON.stringify({ w: this.w, theta: this.theta, topicAcc: this.topicAcc, recent: this.recent, speed: this.speed, n: this.n, rounds: this.rounds, profile: this.profile, board: this.board })); } catch {} }
  recentAcc() { return this.recent.length ? this.recent.reduce((a, b) => a + b, 0) / this.recent.length : .5; }
  features(topic, level) { return [1, level / 10, ...TOPICS.map((t) => (t.id === topic ? 1 : 0)), this.topicAcc[topic], this.recentAcc(), this.speed]; }
  predict(x) { return sig(x.reduce((s, v, i) => s + v * this.w[i], 0)); }
  /** pilih soal berikutnya yang peluang benarnya mendekati TARGET_P */
  choose(prevTopic, used) {
    const cands = [];
    TOPICS.forEach((t) => {
      if (t.id === prevTopic) return;
      const base = Math.round(this.theta[t.id]);
      [-2, -1, 0, 1, 2].forEach((d) => { const lvl = clamp(base + d, 1, 10), p = this.predict(this.features(t.id, lvl));
        cands.push({ t, lvl, p, score: Math.abs(p - TARGET_P) - 0.06 * (1 - this.topicAcc[t.id]) + Math.random() * 0.04 }); });
    });
    cands.sort((a, b) => a.score - b.score);
    const c = cands[0], q = GEN[c.t.id](c.lvl, used);
    return { ...q, p: this.predict(this.features(q.topic, q.level)), x: this.features(q.topic, q.level) };
  }
  /** belajar dari 1 jawaban: y = 1 benar, 0 salah */
  learn(q, y, tNorm) {
    const lr = 0.2, p = this.predict(q.x), err = y - p;
    this.w = this.w.map((wi, i) => wi + lr * err * q.x[i] - lr * 0.001 * wi);
    const pi = sig((this.theta[q.topic] - q.level) / 1.6);
    this.theta[q.topic] = clamp(this.theta[q.topic] + 0.9 * (y - pi), 1, 10);
    this.topicAcc[q.topic] = 0.7 * this.topicAcc[q.topic] + 0.3 * y;
    this.recent = [...this.recent, y].slice(-5);
    this.speed = 0.8 * this.speed + 0.2 * clamp(tNorm, 0, 1);
    this.n++; this.save(); return p;
  }
  meanTheta() { const v = Object.values(this.theta); return v.reduce((a, b) => a + b, 0) / v.length; }
  skor() { return Math.round(((this.meanTheta() - 1) / 9) * 100); }
  levelOtak() { return Math.round(this.meanTheta()); }
  weakest() { return TOPICS.reduce((a, b) => (this.theta[a.id] <= this.theta[b.id] ? a : b)); }
  rank() { const m = this.meanTheta(); return m < 3 ? 'Calon Pintar' : m < 5 ? 'Bintang Kecil' : m < 7 ? 'Pendekar Angka' : m < 8.5 ? 'Profesor Cilik' : 'Jenius Cilik'; }
  addScore(score) { this.rounds++; this.board = [...this.board, { name: this.profile.name || 'Anak Hebat', avatar: this.profile.avatar, score, date: Date.now() }].sort((a, b) => b.score - a.score).slice(0, 5); this.save(); }
}