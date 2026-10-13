/**
 * chars.js — karakter & ilustrasi SVG untuk Kuis Cerdas (menggantikan emoji).
 * Gaya: kartun datar dengan garis tebal, animasi ringan lewat CSS (lihat quiz.css).
 */
const INK = '#1b2437';
const W = (body) => `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${body}</g>`;
const eyes = (x1, x2, y, r = 4.5) => `<g class="eyes"><circle cx="${x1}" cy="${y}" r="${r}" fill="${INK}" stroke="none"/><circle cx="${x2}" cy="${y}" r="${r}" fill="${INK}" stroke="none"/><circle cx="${x1 + 1.5}" cy="${y - 1.6}" r="1.5" fill="#fff" stroke="none"/><circle cx="${x2 + 1.5}" cy="${y - 1.6}" r="1.5" fill="#fff" stroke="none"/></g>`;
const blush = (x1, x2, y, c = '#ff9db5') => `<ellipse cx="${x1}" cy="${y}" rx="5.5" ry="3.4" fill="${c}" stroke="none" opacity=".75"/><ellipse cx="${x2}" cy="${y}" rx="5.5" ry="3.4" fill="${c}" stroke="none" opacity=".75"/>`;

const ART = {
  /* ===== MASKOT: Pak Hoot ===== */
  owl: W(`
    <g class="ow-wing l"><ellipse cx="17" cy="62" rx="9" ry="20" fill="#3f57c9"/></g>
    <g class="ow-wing r"><ellipse cx="83" cy="62" rx="9" ry="20" fill="#3f57c9"/></g>
    <path d="M40 94v4M60 94v4M34 98h12M54 98h12" stroke="#ff9f1a" stroke-width="5"/>
    <ellipse cx="50" cy="62" rx="32" ry="33" fill="#5470f0"/>
    <ellipse cx="50" cy="75" rx="20" ry="19" fill="#fff1cf" stroke="none"/>
    <path d="M41 72q3 4 6 0M53 72q3 4 6 0M47 82q3 4 6 0" fill="none" stroke="#e2c487" stroke-width="2.5"/>
    <circle cx="37" cy="49" r="13.5" fill="#fff"/><circle cx="63" cy="49" r="13.5" fill="#fff"/>
    <g class="ow-pupils"><circle cx="38.5" cy="50" r="6.2" fill="${INK}" stroke="none"/><circle cx="61.5" cy="50" r="6.2" fill="${INK}" stroke="none"/><circle cx="40.5" cy="47.8" r="2.1" fill="#fff" stroke="none"/><circle cx="63.5" cy="47.8" r="2.1" fill="#fff" stroke="none"/></g>
    <ellipse class="ow-lid" cx="37" cy="49" rx="13" ry="13" fill="#5470f0" stroke="none"/><ellipse class="ow-lid" cx="63" cy="49" rx="13" ry="13" fill="#5470f0" stroke="none"/>
    <path d="M44 58 50 69 56 58z" fill="#ffb020"/>
    <path d="M17 27 50 12l33 15-33 15z" fill="#1f2a55"/><path d="M34 34v9q16 8 32 0v-9" fill="#2c3a72"/>
    <path d="M80 28v15" stroke="#ffb020" stroke-width="2.5"/><circle cx="80" cy="45" r="3.2" fill="#ffb020"/>
    <path class="ow-sweat" d="M84 38q-6 9 0 12q6-3 0-12z" fill="#8bd3ff"/>`),

  /* ===== AVATAR PEMAIN ===== */
  fox: W(`
    <path d="M12 54 10 16l26 18zM88 54 90 16 64 34z" fill="#f28a24"/><path d="M17 40 16 26l11 8zM83 40l1-14-11 8z" fill="#3a2a22" stroke="none"/>
    <path d="M50 90 12 56Q12 32 36 32Q50 28 64 32Q88 32 88 56z" fill="#f28a24"/>
    <path d="M50 90 24 64Q50 74 76 64z" fill="#fff"/><circle cx="50" cy="83" r="4.5" fill="${INK}"/>
    ${eyes(34, 66, 56)}${blush(24, 76, 68)}`),
  panda: W(`
    <circle cx="22" cy="26" r="12" fill="${INK}"/><circle cx="78" cy="26" r="12" fill="${INK}"/>
    <ellipse cx="50" cy="58" rx="35" ry="32" fill="#fff"/>
    <ellipse cx="33" cy="54" rx="9" ry="12" fill="${INK}" transform="rotate(20 33 54)"/><ellipse cx="67" cy="54" rx="9" ry="12" fill="${INK}" transform="rotate(-20 67 54)"/>
    <g class="eyes"><circle cx="34" cy="54" r="4" fill="#fff" stroke="none"/><circle cx="66" cy="54" r="4" fill="#fff" stroke="none"/><circle cx="35" cy="54.5" r="2" fill="${INK}" stroke="none"/><circle cx="65" cy="54.5" r="2" fill="${INK}" stroke="none"/></g>
    <ellipse cx="50" cy="68" rx="5.5" ry="4" fill="${INK}"/><path d="M42 76q8 7 16 0" fill="none"/>${blush(24, 76, 70)}`),
  tiger: W(`
    <circle cx="20" cy="28" r="11" fill="#f5a21a"/><circle cx="80" cy="28" r="11" fill="#f5a21a"/>
    <ellipse cx="50" cy="58" rx="36" ry="32" fill="#f5a21a"/>
    <path d="M50 28v12M40 30l3 9M60 30l-3 9M14 52l10 3M14 62l10-1M86 52 76 55M86 62l-10-1" fill="none" stroke-width="3.4"/>
    <ellipse cx="50" cy="72" rx="17" ry="12" fill="#fff4dc"/><path d="M45 66h10l-5 6z" fill="#ff7a8a"/><path d="M50 72v4M42 78q8 5 16 0" fill="none"/>
    ${eyes(34, 66, 54)}`),
  frog: W(`
    <ellipse cx="50" cy="62" rx="38" ry="28" fill="#5fd068"/>
    <circle cx="30" cy="34" r="15" fill="#5fd068"/><circle cx="70" cy="34" r="15" fill="#5fd068"/>
    <circle cx="30" cy="34" r="9" fill="#fff"/><circle cx="70" cy="34" r="9" fill="#fff"/>
    <g class="eyes"><circle cx="31" cy="35" r="4.5" fill="${INK}" stroke="none"/><circle cx="69" cy="35" r="4.5" fill="${INK}" stroke="none"/></g>
    <path d="M28 68q22 18 44 0" fill="none"/>${blush(22, 78, 62)}<circle cx="45" cy="55" r="1.4" fill="${INK}"/><circle cx="55" cy="55" r="1.4" fill="${INK}"/>`),
  bunny: W(`
    <ellipse cx="34" cy="26" rx="10" ry="22" fill="#fff"/><ellipse cx="66" cy="26" rx="10" ry="22" fill="#fff"/>
    <ellipse cx="34" cy="28" rx="4.5" ry="14" fill="#ffb3c6" stroke="none"/><ellipse cx="66" cy="28" rx="4.5" ry="14" fill="#ffb3c6" stroke="none"/>
    <ellipse cx="50" cy="66" rx="33" ry="27" fill="#fff"/>${eyes(36, 64, 62)}${blush(26, 74, 74)}
    <path d="M46 70h8l-4 4z" fill="#ff7a9a"/><path d="M50 74v3M44 79q6 4 12 0" fill="none"/>`),
  octo: W(`
    <path d="M14 70Q10 24 50 22Q90 24 86 70Q92 90 80 90Q78 80 72 86Q68 94 60 88Q54 96 46 88Q38 94 34 86Q26 80 20 90Q8 90 14 70z" fill="#a66bff"/>
    ${eyes(36, 64, 52, 5.5)}${blush(26, 74, 64)}<path d="M43 64q7 6 14 0" fill="none"/>
    <circle cx="30" cy="36" r="2.4" fill="#d9bcff" stroke="none"/><circle cx="68" cy="32" r="2" fill="#d9bcff" stroke="none"/>`),

  /* ===== BENDA UNTUK SOAL POLA & LOGIKA ===== */
  apple: W(`<path d="M50 30C30 18 12 34 16 58c4 22 20 32 34 26 14 6 30-4 34-26 4-24-14-40-34-28z" fill="#ff5a5f"/><path d="M50 30q2-12 8-16" fill="none"/><path d="M52 24q14-10 24 0-12 8-24 0z" fill="#4cc766"/><path d="M28 46q2-8 9-10" fill="none" stroke="#fff" stroke-width="3.5" opacity=".7"/>`),
  banana: W(`<path d="M20 22q4 44 40 58 18 6 22-8-26-4-40-30-4-14-22-20z" fill="#ffd93b"/><path d="M20 22q-4-6 2-10l6 6" fill="#8a6b2d"/><path d="M30 34q8 24 34 38" fill="none" stroke="#e5b800" stroke-width="2.5"/>`),
  grape: W(`<circle cx="36" cy="44" r="11" fill="#8f5de8"/><circle cx="58" cy="44" r="11" fill="#8f5de8"/><circle cx="26" cy="62" r="11" fill="#8f5de8"/><circle cx="47" cy="62" r="11" fill="#9d6cf0"/><circle cx="68" cy="62" r="11" fill="#8f5de8"/><circle cx="37" cy="80" r="11" fill="#8f5de8"/><circle cx="58" cy="80" r="11" fill="#8f5de8"/><path d="M47 33q2-12 6-18" fill="none"/><path d="M50 22q14-10 26 0-12 10-26 0z" fill="#4cc766"/>`),
  berry: W(`<path d="M50 90C24 76 14 54 18 38q32-10 64 0c4 16-6 38-32 52z" fill="#ff4f6d"/><path d="M30 30q20-8 40 0-4-12-20-14-16 2-20 14z" fill="#4cc766"/><g fill="#ffe08a" stroke="none"><ellipse cx="34" cy="52" rx="2" ry="3"/><ellipse cx="50" cy="48" rx="2" ry="3"/><ellipse cx="66" cy="52" rx="2" ry="3"/><ellipse cx="42" cy="66" rx="2" ry="3"/><ellipse cx="58" cy="66" rx="2" ry="3"/><ellipse cx="50" cy="78" rx="2" ry="3"/></g>`),
  dog: W(`
    <path d="M16 36q-10 4-8 28 14 4 20-14zM84 36q10 4 8 28-14 4-20-14z" fill="#8a5a3b"/>
    <ellipse cx="50" cy="56" rx="30" ry="30" fill="#e0a86e"/><ellipse cx="50" cy="68" rx="15" ry="12" fill="#fff1dc"/>
    <ellipse cx="50" cy="62" rx="6" ry="4.5" fill="${INK}"/><path d="M50 66v6M43 73q7 5 14 0" fill="none"/>${eyes(37, 63, 50)}<path d="M62 24q8 2 8 12-10 0-12-8z" fill="#8a5a3b" stroke="none"/>`),
  cat: W(`
    <path d="M14 48 14 12 38 26zM86 48 86 12 62 26z" fill="#ffa94d"/><path d="M19 36 19 22l10 6zM81 36l0-14-10 6z" fill="#ffb3c1" stroke="none"/>
    <ellipse cx="50" cy="58" rx="36" ry="30" fill="#ffa94d"/><path d="M44 30v8M50 28v10M56 30v8" fill="none"/>
    ${eyes(34, 66, 54)}<path d="M46 62h8l-4 5z" fill="#ff6b8b"/><path d="M50 67v3M44 72q6 4 6-2M56 72q-6 4-6-2M16 60l14 2M16 68l14-3M84 60 70 62M84 68l-14-3" fill="none" stroke-width="2.2"/>`),
  star: W(`<path d="M50 8l12 26 28 4-20 20 5 28-25-14-25 14 5-28L10 38l28-4z" fill="#ffd93b"/>${eyes(41, 59, 48, 3.6)}<path d="M44 58q6 6 12 0" fill="none" stroke-width="2.6"/>`),
  moon: W(`<path d="M62 10a40 40 0 1 0 28 62A34 34 0 0 1 62 10z" fill="#ffe27a"/><circle cx="40" cy="52" r="3.6" fill="${INK}" stroke="none"/><path d="M34 66q8 7 16 0" fill="none" stroke-width="2.8"/><circle cx="30" cy="62" r="4" fill="#ffb3a1" stroke="none" opacity=".7"/>`),
  sun: W(`<g stroke="#ff9f1a" stroke-width="5"><path d="M50 6v12M50 82v12M6 50h12M82 50h12M19 19l8 8M73 73l8 8M81 19l-8 8M27 73l-8 8"/></g><circle cx="50" cy="50" r="26" fill="#ffc933"/>${eyes(41, 59, 46, 3.8)}<path d="M42 57q8 8 16 0" fill="none" stroke-width="2.8"/>${blush(34, 66, 56, '#ff8f6b')}`),
  car: W(`<path d="M10 62q0-8 8-10l10-18q3-5 9-5h22q6 0 10 5l12 17q11 2 11 11v6q0 4-4 4H14q-4 0-4-4z" fill="#ff5a5f"/><path d="M33 38h14v13H27zM53 38h8q3 0 5 3l6 10H53z" fill="#cfeaff"/><circle cx="30" cy="74" r="10" fill="#33415c"/><circle cx="72" cy="74" r="10" fill="#33415c"/><circle cx="30" cy="74" r="3.5" fill="#cfd8ea" stroke="none"/><circle cx="72" cy="74" r="3.5" fill="#cfd8ea" stroke="none"/><circle cx="88" cy="62" r="3.2" fill="#ffe27a" stroke="none"/>`),
  rocket: W(`<g class="flame"><path d="M40 74q10 26 20 0z" fill="#ff9f1a"/><path d="M45 74q5 14 10 0z" fill="#ffe27a" stroke="none"/></g><path d="M50 6Q76 22 70 62H30Q24 22 50 6z" fill="#f4f6fb"/><path d="M30 50 16 68l4 8 12-6zM70 50l14 18-4 8-12-6z" fill="#ff5a5f"/><path d="M50 6Q58 10 63 20H37Q42 10 50 6z" fill="#ff5a5f"/><circle cx="50" cy="40" r="9" fill="#74c0fc"/><circle cx="47" cy="37" r="2.6" fill="#fff" stroke="none"/><path d="M38 62h24v7H38z" fill="#c9d2e6"/>`),
  ball: W(`<circle cx="50" cy="50" r="38" fill="#fff"/><path d="m50 34 15 11-6 17H41l-6-17z" fill="${INK}"/><path d="M50 34V14M65 45l22-5M59 62l12 18M41 62 29 80M35 45 13 40" fill="none" stroke-width="2.6"/>`),
  balloon: W(`<ellipse cx="50" cy="38" rx="26" ry="31" fill="#ff5a8a"/><path d="M45 69h10l-5 7z" fill="#ff3d78"/><path d="M50 76q-8 8 0 14t0 8" fill="none" stroke-width="2.4"/><path d="M36 22q4-8 12-9" fill="none" stroke="#fff" stroke-width="4" opacity=".7"/>`),
  butterfly: W(`<path d="M50 48Q24 6 12 30t38 22zM50 48Q76 6 88 30T50 52z" fill="#ff8fc1"/><path d="M50 52Q22 58 24 78t26-24zM50 52Q78 58 76 78T50 52z" fill="#7ab8ff"/><rect x="46" y="30" width="8" height="46" rx="4" fill="#3a2f4d"/><path d="M48 30q-4-12-10-14M52 30q4-12 10-14" fill="none"/><circle cx="26" cy="32" r="4" fill="#fff" stroke="none"/><circle cx="74" cy="32" r="4" fill="#fff" stroke="none"/>`),
  fish: W(`<path d="M76 50 94 30v40z" fill="#ff8a3d"/><ellipse cx="46" cy="50" rx="34" ry="24" fill="#ffa24d"/><path d="M40 28q8-12 20-6" fill="#ff8a3d"/><circle cx="30" cy="44" r="6" fill="#fff"/><circle cx="29" cy="44" r="3" fill="${INK}" stroke="none"/><path d="M50 36q6 14 0 28M60 38q5 12 0 24" fill="none" stroke-width="2.4"/><path d="M20 56q4 4 8 1" fill="none" stroke-width="2.4"/>`),
  rabbit: null, /* alias bunny */
  chair: W(`<path d="M30 14h40l-4 36H34z" fill="#c58a52"/><path d="M26 50h48v10H26z" fill="#d9a066"/><path d="M30 60l-6 30M70 60l6 30M38 60l-2 30M62 60l2 30" fill="none" stroke-width="5"/><path d="M40 24h20M39 34h22" fill="none" stroke="#a96e3d" stroke-width="2.5"/>`),
  qmark: W(`<rect x="14" y="14" width="72" height="72" rx="20" fill="#ffd43b"/><text x="50" y="68" text-anchor="middle" font-family="Fredoka,Nunito,sans-serif" font-weight="700" font-size="56" fill="${INK}" stroke="none">?</text>`),

  /* ===== IKON TOPIK & ANTARMUKA KUIS ===== */
  calc: W(`<rect x="18" y="8" width="64" height="84" rx="14" fill="#ff6b6b"/><rect x="28" y="18" width="44" height="20" rx="6" fill="#fff4d6"/><g fill="#fff" stroke="none"><circle cx="35" cy="54" r="5"/><circle cx="50" cy="54" r="5"/><circle cx="65" cy="54" r="5"/><circle cx="35" cy="70" r="5"/><circle cx="50" cy="70" r="5"/><circle cx="65" cy="70" r="5"/></g>`),
  digits: W(`<rect x="8" y="22" width="84" height="56" rx="14" fill="#4dabf7"/><text x="50" y="62" text-anchor="middle" font-family="Fredoka,Nunito,sans-serif" font-weight="700" font-size="34" fill="#fff" stroke="none" letter-spacing="2">1 2 3</text>`),
  palette: W(`<path d="M50 10C26 10 8 28 8 50s18 40 40 40c8 0 10-6 6-11s-2-11 6-11h14c12 0 18-6 18-16C92 28 74 10 50 10z" fill="#51cf66"/><circle cx="30" cy="42" r="6" fill="#ff6b6b"/><circle cx="48" cy="28" r="6" fill="#ffd43b"/><circle cx="68" cy="36" r="6" fill="#4dabf7"/><circle cx="26" cy="62" r="6" fill="#fff"/>`),
  puzzle: W(`<path d="M16 28h24a8 8 0 1 1 16 0h28v24a8 8 0 1 0 0 16v24H56a8 8 0 1 0-16 0H16V68a8 8 0 1 0 0-16z" fill="#f59f00"/>`),
  bot: W(`<path d="M50 8v12" fill="none"/><circle cx="50" cy="8" r="5" fill="#ff6b6b"/><rect x="14" y="20" width="72" height="62" rx="20" fill="#cfd8ff"/><rect x="24" y="34" width="52" height="30" rx="12" fill="#2b2d5e"/><g class="eyes"><circle cx="39" cy="49" r="6" fill="#7cf0c5" stroke="none"/><circle cx="61" cy="49" r="6" fill="#7cf0c5" stroke="none"/></g><path d="M8 48v14M92 48v14" stroke-width="6" fill="none"/>`),
  trophy: W(`<path d="M28 12h44v22q0 22-22 26-22-4-22-26z" fill="#ffc933"/><path d="M28 20H12q0 22 18 24M72 20h16q0 22-18 24" fill="none"/><path d="M50 60v16M34 90h32M38 76h24v14H38z" fill="#e0a800"/>`),
  bulb: W(`<path d="M50 8a28 28 0 0 0-16 51v9h32v-9A28 28 0 0 0 50 8z" fill="#ffe066"/><path d="M38 76h24M42 86h16" fill="none"/><path d="M44 40l6 8 6-8" fill="none" stroke-width="2.6"/>`),
  clock: W(`<circle cx="50" cy="54" r="34" fill="#fff"/><path d="M50 54V32M50 54l14 8" fill="none" stroke-width="4"/><path d="M38 10h24M50 10v10" fill="none"/>`),
  speaker: W(`<path d="M12 38h16l22-18v60L28 62H12z" fill="#4dabf7"/><path d="M62 36q10 14 0 28M72 26q18 24 0 48" fill="none"/>`),
  mute: W(`<path d="M12 38h16l22-18v60L28 62H12z" fill="#adb5bd"/><path d="M62 38l26 24M88 38 62 62" fill="none"/>`),
  trash: W(`<path d="M24 30h52l-4 56H28z" fill="#ff8787"/><path d="M16 30h68M38 30v-8h24v8M40 44v30M60 44v30" fill="none"/>`),
  home: W(`<path d="M10 48 50 14l40 34" fill="none"/><path d="M20 42v44h60V42L50 18z" fill="#ffd43b"/><rect x="42" y="58" width="16" height="28" rx="3" fill="#ff8a3d"/>`),
  replay: W(`<path d="M80 50a30 30 0 1 1-10-22" fill="none" stroke-width="8"/><path d="M80 12v22H58z" fill="${INK}"/>`),
  clap: W(`<path d="M24 56q-4-14 6-18l8 6 8-22q4-6 10-2l-4 20 18 4q10 6 4 20l-8 18Q50 98 34 84z" fill="#ffd9a8"/>`),
  thumb: W(`<path d="M12 46h18v42H12zM30 50l16-34q10 0 8 14l-3 12h26q10 2 8 14l-4 24q-2 8-10 8H30z" fill="#ffd9a8"/>`),
  timeup: W(`<circle cx="50" cy="56" r="32" fill="#ff8787"/><path d="M50 56V36M50 56l12 6" fill="none" stroke-width="4"/><path d="M36 14l-10 10M64 14l10 10" fill="none"/>`),
};
ART.rabbit = ART.bunny;

export const AVATARS = ['fox', 'panda', 'tiger', 'frog', 'bunny', 'octo'];
export const art = (name, size = 48, cls = '') =>
  `<svg class="art art-${name} ${cls}" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-hidden="true">${ART[name] || ART.qmark}</svg>`;

/* Emoji pada bank soal -> ilustrasi SVG */
const EMO = { '🍎': 'apple', '🍌': 'banana', '🍇': 'grape', '🍓': 'berry', '🐶': 'dog', '🐱': 'cat', '🐸': 'frog', '⭐': 'star', '🌙': 'moon', '☀️': 'sun', '☀': 'sun',
  '🚗': 'car', '🚀': 'rocket', '⚽': 'ball', '🎈': 'balloon', '🦋': 'butterfly', '🐟': 'fish', '🐰': 'rabbit', '🪑': 'chair', '❓': 'qmark' };
const RX = new RegExp(Object.keys(EMO).sort((a, b) => b.length - a.length).join('|'), 'g');
export const rich = (html, size = 56) => String(html).replace(RX, (m) => art(EMO[m], size, 'inline'));
