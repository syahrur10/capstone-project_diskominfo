/** quiz-ui.js — tampilan kuis ramah anak: maskot burung hantu, roket, konfeti, suara, hasil & grafik. */
import { Brain, TOPICS, FEATURE_NAMES, TARGET_P } from './quiz-engine.js';

const app = document.getElementById('quiz-app');
const brain = new Brain();
const ROUND = 10, TIME = 25;
const AVATARS = ['🦊', '🐼', '🐯', '🐸', '🦄', '🐙'];
let st = null, timerId = null, soundOn = true, locked = false;

/* ---------- SUARA & KONFETI ---------- */
let actx;
function beep(f, d = .15, type = 'sine', t0 = 0) {
  if (!soundOn) return;
  try { actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + t0;
    o.type = type; o.frequency.value = f; g.gain.setValueAtTime(.12, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
    o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + d); } catch {}
}
const sfx = { ok: () => { beep(660, .12); beep(880, .15, 'sine', .12); beep(1320, .22, 'sine', .26); }, no: () => { beep(260, .2, 'sawtooth'); beep(190, .3, 'sawtooth', .18); },
  win: () => [523, 659, 784, 1047, 1319].forEach((f, i) => beep(f, .25, 'triangle', i * .13)) };
function confetti(n = 90) {
  const c = document.getElementById('confetti') || Object.assign(document.body.appendChild(document.createElement('canvas')), { id: 'confetti' });
  c.width = innerWidth; c.height = innerHeight; const x = c.getContext('2d');
  const cols = ['#ff6b6b', '#ffd43b', '#51cf66', '#4dabf7', '#ff6fa5', '#f28500'];
  const ps = Array.from({ length: n }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .55, vx: (Math.random() - .5) * 16, vy: -Math.random() * 16 - 6, s: Math.random() * 9 + 5, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: cols[Math.floor(Math.random() * cols.length)] }));
  let f = 0; (function draw() { x.clearRect(0, 0, c.width, c.height);
    ps.forEach((p) => { p.vy += .35; p.x += p.vx; p.y += p.vy; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); x.restore(); });
    if (++f < 130) requestAnimationFrame(draw); else x.clearRect(0, 0, c.width, c.height); })();
}

const $ = (s) => app.querySelector(s);
const toTop = () => scrollTo({ top: app.getBoundingClientRect().top + scrollY - 100, behavior: 'smooth' });
const pct = (v) => Math.round(v * 100);

/* ---------- INTRO ---------- */
function intro() {
  clearInterval(timerId);
  const pr = brain.profile, known = brain.n > 0;
  app.innerHTML = `<div class="q-card q-center">
    <button class="sound-btn" id="snd" aria-label="Suara">${soundOn ? '🔊' : '🔇'}</button>
    <div class="mascot" style="justify-content:center"><div class="owl-face">🦉</div><div class="bubble">${known ? `Halo lagi, ${pr.name || 'teman'}! Otakku sudah belajar dari ${brain.n} jawabanmu 🎉` : 'Halo! Aku Pak Hoot 🦉. Ayo asah otakmu bersamaku!'}</div></div>
    <h2>Kuis Cerdas</h2>
    <p style="margin:.5rem auto 1rem;max-width:560px">Soalnya <b>menyesuaikan kemampuanmu</b>. Makin sering main, makin pintar Otak AI memilih soal yang pas buatmu!</p>
    <div class="avatars" id="avs">${AVATARS.map((a) => `<button class="avatar ${a === pr.avatar ? 'sel' : ''}" data-a="${a}">${a}</button>`).join('')}</div>
    <input class="q-input" id="nm" maxlength="14" placeholder="Nama panggilanmu" value="${pr.name || ''}" aria-label="Nama">
    <div class="topic-pills">${TOPICS.map((t) => `<span class="pill" style="background:${t.color}">${t.icon} ${t.name}</span>`).join('')}</div>
    <button class="btn btn-primary" id="go" style="font-size:1.3rem">🚀 Mulai Main!</button>
    ${known ? `<div class="brain" style="margin-top:1.6rem;text-align:left"><div class="ic">🤖</div><div><b>Otak AI-mu</b><small>Skor Pintar ${brain.skor()}/100 · ${brain.rank()}</small><div class="meter"><i style="width:${brain.skor()}%"></i></div></div><div class="lv">${brain.levelOtak()}<small>LEVEL</small></div></div>
    <button class="btn-soft" id="rst" style="margin-top:1rem">🗑️ Reset Otak AI</button>` : ''}
    ${brain.board.length ? `<div class="res-box" style="margin-top:1.4rem;text-align:left"><h4>🏆 Papan Juara (perangkat ini)</h4><ul class="board">${brain.board.map((b, i) => `<li><span>${i + 1}. ${b.avatar} ${b.name}</span><span>${b.score} poin</span></li>`).join('')}</ul></div>` : ''}
  </div>`;
  $('#avs').onclick = (e) => { const b = e.target.closest('.avatar'); if (!b) return; app.querySelectorAll('.avatar').forEach((x) => x.classList.remove('sel')); b.classList.add('sel'); brain.profile.avatar = b.dataset.a; beep(700, .08); };
  $('#snd').onclick = (e) => { soundOn = !soundOn; e.target.textContent = soundOn ? '🔊' : '🔇'; };
  $('#go').onclick = () => { brain.profile.name = $('#nm').value.trim() || 'Anak Hebat'; brain.save(); beep(520, .1); beep(780, .15, 'sine', .1); startRound(); };
  const r = $('#rst'); if (r) r.onclick = () => { if (confirm('Hapus semua yang sudah dipelajari Otak AI?')) { brain.reset(); intro(); } };
}

/* ---------- RONDE ---------- */
function startRound() { toTop(); st = { i: 0, score: 0, correct: 0, trace: [], used: new Set(), prev: null, hints: 0, per: Object.fromEntries(TOPICS.map((t) => [t.id, { n: 0, ok: 0 }])) }; nextQ(); }

function nextQ() {
  if (st.i >= ROUND) return finish();
  locked = false; st.hinted = false;
  const q = brain.choose(st.prev, st.used); st.q = q; st.prev = q.topic; st.t0 = performance.now();
  const T = TOPICS.find((t) => t.id === q.topic), pr = brain.profile;
  app.innerHTML = `<div class="q-card">
    <button class="sound-btn" id="snd" aria-label="Suara">${soundOn ? '🔊' : '🔇'}</button>
    <div class="hud"><span class="chip-mini">${pr.avatar} ${pr.name}</span><span class="chip-mini">⭐ <b id="sc">${st.score}</b> poin</span><span class="chip-mini">Soal ${st.i + 1}/${ROUND}</span></div>
    <div class="track"><div class="track-fill" style="width:${(st.i / ROUND) * 100}%"></div><div class="rocket" style="left:${(st.i / ROUND) * 100}%">🚀</div></div>
    <div class="timer"><i id="tm"></i></div>
    <div class="mascot"><div class="owl-face" id="owl">🦉</div><div class="bubble" id="say">${['Kamu pasti bisa!', 'Baca pelan-pelan ya 👀', 'Ayo semangat! 💪', 'Teliti dulu sebelum menjawab!'][st.i % 4]}</div></div>
    <div class="q-meta"><span class="q-topic">${T.icon} ${T.name}</span><span class="q-level">Tingkat ${q.level}/10</span></div>
    <div class="q-text">${q.html}</div>
    <div class="q-hint" id="hint"></div>
    <div class="options">${q.options.map((o, i) => `<button class="opt" data-i="${i}"><kbd>${i + 1}</kbd>${o}</button>`).join('')}</div>
    <div class="feedback" id="fb"></div>
    <div class="q-actions"><button class="btn-soft" id="hb">💡 Petunjuk (−3 poin)</button><button class="btn btn-navy" id="nx" hidden>${st.i + 1 === ROUND ? 'Lihat Hasil 🏆' : 'Lanjut ➜'}</button></div>
    <div class="brain"><div class="ic">🤖</div><div><b>Otak AI menebak:</b> kamu bisa menjawab ini dengan peluang <b>${pct(q.p)}%</b><div class="meter"><i style="width:${pct(q.p)}%"></i></div></div><div class="lv">${brain.levelOtak()}<small>LEVEL OTAK</small></div></div>
  </div>`;
  $('#snd').onclick = (e) => { soundOn = !soundOn; e.target.textContent = soundOn ? '🔊' : '🔇'; };
  app.querySelectorAll('.opt').forEach((b) => (b.onclick = () => answer(+b.dataset.i)));
  $('#hb').onclick = () => { if (locked || st.hinted) return; st.hinted = true; st.hints++; $('#hint').textContent = '💡 ' + q.hint; $('#hb').disabled = true; beep(900, .1); };
  $('#nx').onclick = () => { st.i++; nextQ(); };
  // timer
  const tm = $('#tm'); tm.style.transition = `transform ${TIME}s linear`; requestAnimationFrame(() => requestAnimationFrame(() => (tm.style.transform = 'scaleX(0)')));
  clearTimeout(timerId); timerId = setTimeout(() => answer(-1), TIME * 1000);
}

function answer(i) {
  if (locked) return; locked = true; clearTimeout(timerId);
  const q = st.q, ok = i === q.answer, secs = (performance.now() - st.t0) / 1000;
  const p = brain.learn(q, ok ? 1 : 0, secs / TIME);
  st.trace.push({ level: q.level, p, y: ok ? 1 : 0 }); st.per[q.topic].n++; if (ok) { st.per[q.topic].ok++; st.correct++; }
  const gain = ok ? Math.max(1, 10 + q.level * 2 + Math.round(5 * (1 - secs / TIME)) - (st.hinted ? 3 : 0)) : 0; st.score += gain;
  app.querySelectorAll('.opt').forEach((b, k) => { b.disabled = true; if (k === q.answer) b.classList.add('right'); else if (k === i) b.classList.add('wrong'); });
  const tm = $('#tm'); tm.style.transition = 'none'; const fb = $('#fb'), owl = $('#owl'), say = $('#say');
  $('#sc').textContent = st.score;
  if (ok) { fb.className = 'feedback ok'; fb.innerHTML = `🎉 Benar! +${gain} poin<br><small>${q.explain}</small>`; owl.classList.add('cheer'); say.textContent = ['Hebat sekali! 🌟', 'Kamu pintar! 👏', 'Yeay, tepat! 🎈', 'Luar biasa! 🚀'][Math.floor(Math.random() * 4)]; sfx.ok(); confetti(50); }
  else { fb.className = 'feedback no'; fb.innerHTML = `${i < 0 ? '⏰ Waktu habis!' : '😅 Belum tepat.'}<br><small>${q.explain}</small>`; owl.classList.add('oops'); say.textContent = 'Tidak apa-apa, kita belajar bareng! 💪'; sfx.no(); }
  const nx = $('#nx'); nx.hidden = false; nx.focus({ preventScroll: true });
}

addEventListener('keydown', (e) => {
  if (!st || !app.querySelector('.options')) return;
  if (['1', '2', '3', '4'].includes(e.key) && !locked) answer(+e.key - 1);
  else if ((e.key === 'Enter' || e.key === ' ') && locked && $('#nx') && !$('#nx').hidden) { e.preventDefault(); $('#nx').click(); }
});

/* ---------- HASIL ---------- */
function finish() {
  clearTimeout(timerId); toTop();
  const stars = st.correct >= 9 ? 3 : st.correct >= 6 ? 2 : st.correct >= 3 ? 1 : 0;
  brain.addScore(st.score); sfx.win(); confetti(stars ? 160 : 40);
  const avgP = st.trace.reduce((s, t) => s + t.p, 0) / st.trace.length, real = st.correct / ROUND, weak = brain.weakest();
  app.innerHTML = `<div class="q-card q-center">
    <div class="mascot" style="justify-content:center"><div class="owl-face cheer">🦉</div><div class="bubble">${stars === 3 ? 'WOW! Kamu luar biasa!' : stars ? 'Bagus! Latihan lagi yuk!' : 'Jangan menyerah, ayo coba lagi!'}</div></div>
    <div class="stars">${[1, 2, 3].map((n) => `<span class="${n <= stars ? 'on' : 'off'}" style="animation-delay:${n * .25}s">⭐</span>`).join('')}</div>
    <div class="score-big">${st.score}</div><p><b>poin</b> · ${st.correct}/${ROUND} benar${st.hints ? ` · ${st.hints}× petunjuk` : ''}</p>
    <div class="rank">${brain.rank()} · Skor Pintar ${brain.skor()}/100</div>
    <div class="res-grid">
      <div class="res-box"><h4>📊 Hasil per topik</h4>${TOPICS.map((t) => { const r = st.per[t.id], v = r.n ? (r.ok / r.n) * 100 : 0;
        return `<div class="bar-row">${t.icon} ${t.name} <span style="float:right">${r.ok}/${r.n}</span><div class="bar"><i data-w="${v}" style="background:${t.color}"></i></div></div>`; }).join('')}</div>
      <div class="res-box"><h4>📈 Perjalanan soalmu</h4><canvas class="chart" id="chart" width="420" height="190"></canvas><small>Biru = tingkat soal · titik: ✅ benar / ❌ salah</small></div>
    </div>
    <div class="insight">🤖 <b>Kata Otak AI:</b> Tebakanku rata-rata ${pct(avgP)}% kamu bisa menjawab, dan hasil sebenarnya ${pct(real)}%. ${real >= avgP ? 'Kamu lebih hebat dari tebakanku, jadi soal berikutnya kubuat lebih menantang! 🚀' : 'Soal berikutnya kubuat lebih pas supaya kamu tetap percaya diri. 😊'} Topik yang perlu dilatih: <b>${weak.icon} ${weak.name}</b>.</div>
    <div class="q-actions" style="justify-content:center;margin-top:1.4rem"><button class="btn btn-primary" id="again">🔁 Main Lagi</button><button class="btn-soft" id="home">🏠 Menu Awal</button></div>
    <details class="tech"><summary>🔬 Cara kerja Otak AI (untuk guru &amp; dosen)</summary>
      <p>Model: <b>regresi logistik online (SGD)</b> memprediksi peluang benar <code>p = σ(w·x)</code>; setelah tiap jawaban <code>w ← w + η(y − p)x − ηλw</code> (η=0,2). Kemampuan per topik diestimasi dengan <b>IRT 1PL</b>. Soal dipilih agar p ≈ ${TARGET_P * 100}% (zona belajar optimal). Data hanya tersimpan di perangkat. <i>Ini bukan tes IQ klinis, hanya latihan asah otak.</i></p>
      <p>Bobot saat ini: ${FEATURE_NAMES.map((n, i) => `<code>${n}: ${brain.w[i].toFixed(2)}</code>`).join(' ')}</p></details>
    ${brain.board.length ? `<div class="res-box" style="margin-top:1.2rem;text-align:left"><h4>🏆 Papan Juara</h4><ul class="board">${brain.board.map((b, i) => `<li><span>${i + 1}. ${b.avatar} ${b.name}</span><span>${b.score} poin</span></li>`).join('')}</ul></div>` : ''}
  </div>`;
  requestAnimationFrame(() => app.querySelectorAll('.bar i').forEach((b) => (b.style.width = b.dataset.w + '%')));
  drawChart($('#chart'), st.trace);
  $('#again').onclick = startRound; $('#home').onclick = intro;
}

function drawChart(cv, tr) {
  const x = cv.getContext('2d'), W = cv.width, H = cv.height, pad = 28;
  x.clearRect(0, 0, W, H); x.font = '12px Nunito, sans-serif'; x.fillStyle = '#5b6579'; x.strokeStyle = '#e3e9f7';
  for (let l = 2; l <= 10; l += 2) { const y = H - pad - ((l - 1) / 9) * (H - pad * 1.6); x.beginPath(); x.moveTo(pad, y); x.lineTo(W - 10, y); x.stroke(); x.fillText(l, 8, y + 4); }
  const px = (i) => pad + 10 + (i / Math.max(1, tr.length - 1)) * (W - pad * 2 - 10), py = (l) => H - pad - ((l - 1) / 9) * (H - pad * 1.6);
  x.strokeStyle = '#4dabf7'; x.lineWidth = 4; x.lineJoin = 'round'; x.beginPath(); tr.forEach((t, i) => (i ? x.lineTo(px(i), py(t.level)) : x.moveTo(px(i), py(t.level)))); x.stroke();
  tr.forEach((t, i) => { x.beginPath(); x.arc(px(i), py(t.level), 7, 0, 7); x.fillStyle = t.y ? '#51cf66' : '#ff6b6b'; x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 2; x.stroke(); });
}

intro();