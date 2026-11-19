// Flat drawings of gifts that carry the visitor's own words. They are original
// artwork drawn in SVG, used by the home page, the finder and the engraving tool.
import { esc, cleanText, fitFont, initialsOf } from './util.js';

const INK = 'var(--ink,#1b2a41)';
const BG = 'var(--mk-bg,#e6f2f2)';
const BERRY = 'var(--berry,#b4174e)';
const BRASS = '#a8782a';
const BRASS_LIGHT = '#ead29c';
const BRASS_DARK = '#6a4a14';

const open = (label, extra = '') =>
  `<svg class="mock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 190" role="img" aria-label="${esc(label)}"${extra}>`;
const text = (x, y, size, content, attrs = '') =>
  `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle" dominant-baseline="central" ${attrs}>${esc(content)}</text>`;

export function mug(name) {
  const t = cleanText(name, 18) || 'Ava';
  return open(`Mug printed with ${t}`) +
    `<path d="M170 72h12a26 30 0 0 1 0 60h-12" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>` +
    `<rect x="52" y="46" width="122" height="116" rx="12" fill="#fff" stroke="${INK}" stroke-width="3"/>` +
    `<ellipse cx="113" cy="47" rx="61" ry="9" fill="#f1f5f8" stroke="${INK}" stroke-width="3"/>` +
    text(113, 108, fitFont(t, 104, 44, 0.42), t, `font-family="'Sacramento',cursive" fill="${BERRY}"`) +
    `</svg>`;
}

export function barNecklace(value) {
  const t = (cleanText(value, 16) || 'AVA').toLocaleUpperCase();
  return open(`Bar necklace engraved ${t}`) +
    `<path d="M14 12C58 66 68 90 73 103M226 12c-44 54-54 78-59 91" fill="none" stroke="${BRASS}" stroke-width="2.2" stroke-dasharray="1.5 3.5" stroke-linecap="round"/>` +
    `<rect x="68" y="98" width="104" height="26" rx="5" fill="${BRASS_LIGHT}" stroke="${BRASS}" stroke-width="2"/>` +
    `<circle cx="75" cy="111" r="2" fill="${BRASS}"/><circle cx="165" cy="111" r="2" fill="${BRASS}"/>` +
    text(120, 111.5, fitFont(t, 78, 15, 0.8), t, `font-family="'Cinzel',serif" font-weight="600" letter-spacing=".6" fill="${BRASS_DARK}"`) +
    `</svg>`;
}

export function board(name, line2 = '') {
  const t = cleanText(name, 22) || 'Ava';
  const sub = cleanText(line2, 24);
  return open(`Cutting board engraved ${t}`) +
    `<rect x="190" y="82" width="36" height="34" rx="13" fill="#e2c391" stroke="#9a7440" stroke-width="3"/>` +
    `<circle cx="210" cy="99" r="6" fill="${BG}" stroke="#9a7440" stroke-width="2"/>` +
    `<rect x="18" y="44" width="178" height="110" rx="16" fill="#e2c391" stroke="#9a7440" stroke-width="3"/>` +
    `<path d="M34 66c40-8 96 6 146-4M32 134c52 8 104-8 150 0" fill="none" stroke="#cfae78" stroke-width="2" stroke-linecap="round"/>` +
    text(107, sub ? 92 : 100, fitFont(t, 150, 30, 0.5), t, `font-family="'Alegreya',serif" font-style="italic" font-weight="700" fill="#6b4a1e"`) +
    (sub ? text(107, 121, fitFont(sub, 150, 12, 0.62), sub, `font-family="'Josefin Sans',sans-serif" font-weight="500" letter-spacing="1.5" fill="#6b4a1e"`) : '') +
    `</svg>`;
}

export function tote(value) {
  const letters = initialsOf(value);
  const t = (letters[0] || 'A');
  return open(`Tote bag embroidered with the letter ${t}`) +
    `<path d="M88 64c0-36 64-36 64 0" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M57 62h126l9 104a8 8 0 0 1-8 9H56a8 8 0 0 1-8-9z" fill="#f7f0e1" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>` +
    `<circle cx="120" cy="120" r="31" fill="none" stroke="${BERRY}" stroke-width="2.2" stroke-dasharray="5 4" stroke-linecap="round"/>` +
    text(120, 121, 38, t, `font-family="'Bodoni Moda',serif" font-weight="700" fill="${BERRY}"`) +
    `</svg>`;
}

export function luggageTag(value) {
  const letters = initialsOf(value).slice(0, 3);
  const t = letters.length ? letters.join('·') : 'A·M·R';
  return open(`Leather luggage tag stamped ${letters.join(' ') || 'A M R'}`) +
    `<g transform="rotate(-7 120 100)">` +
    `<path d="M62 104C30 96 18 62 34 38" fill="none" stroke="#5e2f17" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M76 58h102a10 10 0 0 1 10 10v72a10 10 0 0 1-10 10H76l-30-46z" fill="#8a4b2a" stroke="#5e2f17" stroke-width="3" stroke-linejoin="round"/>` +
    `<circle cx="66" cy="104" r="7" fill="${BG}" stroke="#5e2f17" stroke-width="2"/>` +
    `<rect x="92" y="74" width="82" height="60" rx="5" fill="none" stroke="#d9b76c" stroke-width="1.6" stroke-dasharray="5 3.5"/>` +
    text(133, 105, fitFont(t, 70, 24, 0.62), t, `font-family="'Josefin Sans',sans-serif" font-weight="600" letter-spacing="1" fill="#f6e3ba"`) +
    `</g></svg>`;
}

export function keyring(line1, line2 = '') {
  const a = cleanText(line1, 14) || 'AVA';
  const b = cleanText(line2, 14);
  return open(`Key ring engraved ${a}${b ? ` and ${b}` : ''}`) +
    `<circle cx="120" cy="40" r="19" fill="none" stroke="#8d99a8" stroke-width="5"/>` +
    `<circle cx="120" cy="116" r="56" fill="#e3e8ee" stroke="#8d99a8" stroke-width="3"/>` +
    `<circle cx="120" cy="74" r="6" fill="${BG}" stroke="#8d99a8" stroke-width="2"/>` +
    text(120, b ? 110 : 120, fitFont(a, 84, 22, 0.7), a, `font-family="'Cinzel',serif" font-weight="600" fill="#3b4656"`) +
    (b ? text(120, 136, fitFont(b, 78, 14, 0.66), b, `font-family="'Cinzel',serif" font-weight="500" fill="#3b4656"`) : '') +
    `</svg>`;
}

export function pen(value) {
  const t = cleanText(value, 30) || 'Ava Rossi';
  return open(`Pen engraved ${t}`) +
    `<g transform="rotate(-10 120 95)">` +
    `<rect x="16" y="80" width="58" height="5" rx="2.5" fill="#d9b76c"/>` +
    `<rect x="20" y="85" width="156" height="20" rx="10" fill="#1b2a41"/>` +
    `<rect x="176" y="87" width="26" height="16" fill="#d9b76c"/>` +
    `<path d="M202 87l24 8-24 8z" fill="#8d99a8"/>` +
    text(104, 95.5, fitFont(t, 126, 10.5, 0.66), t, `font-family="'Cinzel',serif" font-weight="500" letter-spacing=".4" fill="#ead29c"`) +
    `</g></svg>`;
}

export function frame(line1, line2 = '') {
  const a = cleanText(line1, 26) || 'Ava & Noah';
  const b = cleanText(line2, 26);
  return open(`Photo frame with a plate engraved ${a}${b ? `, ${b}` : ''}`) +
    `<rect x="42" y="16" width="156" height="160" fill="#fff" stroke="${INK}" stroke-width="9"/>` +
    `<rect x="60" y="34" width="120" height="84" fill="#dcebec"/>` +
    `<circle cx="104" cy="70" r="13" fill="#b7d3d6"/><circle cx="138" cy="74" r="11" fill="#b7d3d6"/>` +
    `<path d="M80 118c2-22 46-22 48 0zM118 118c2-18 38-18 40 0z" fill="#b7d3d6"/>` +
    `<rect x="66" y="128" width="108" height="34" rx="2" fill="${BRASS_LIGHT}" stroke="${BRASS}" stroke-width="1.5"/>` +
    text(120, b ? 139 : 145.5, fitFont(a, 98, 11, 0.62), a, `font-family="'Cinzel',serif" font-weight="600" fill="${BRASS_DARK}"`) +
    (b ? text(120, 152.5, fitFont(b, 98, 9, 0.6), b, `font-family="'Cinzel',serif" font-weight="500" fill="${BRASS_DARK}"`) : '') +
    `</svg>`;
}

/** The five objects on the home page workbench, all showing one name. */
export function workbench(name) {
  const n = cleanText(name, 18) || 'Ava';
  const year = new Date().getFullYear();
  return [
    { id: 'mug', label: 'Printed', svg: mug(n) },
    { id: 'necklace', label: 'Engraved', svg: barNecklace(n) },
    { id: 'board', label: 'Laser-etched', svg: board(`${n}’s kitchen`, `EST. ${year}`) },
    { id: 'tote', label: 'Embroidered', svg: tote(n) },
    { id: 'tag', label: 'Stamped', svg: luggageTag(n) },
  ];
}

export const MOCKS = { mug, barNecklace, board, tote, luggageTag, keyring, pen, frame };
