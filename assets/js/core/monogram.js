// Monogram rules and drawing. One layout function feeds the live preview and
// the SVG and PNG downloads, so what you see is what you save.
import { esc, cleanText } from './util.js';

export const MONO_FONTS = [
  { id: 'script', label: 'Copperplate script', family: 'Pinyon Script', weight: 400, w: 0.98, upper: true },
  { id: 'roman', label: 'Engraved capitals', family: 'Cinzel', weight: 600, w: 0.84, upper: true },
  { id: 'didone', label: 'Fashion serif', family: 'Bodoni Moda', weight: 600, w: 0.74, upper: true },
  { id: 'deco', label: 'Deco sans', family: 'Josefin Sans', weight: 500, w: 0.7, upper: true },
  { id: 'book', label: 'Book serif', family: 'Alegreya', weight: 700, w: 0.72, upper: true },
  { id: 'type', label: 'Typewriter', family: 'Special Elite', weight: 400, w: 0.64, upper: true },
  { id: 'hand', label: 'Handwritten', family: 'Sacramento', weight: 400, w: 0.72, upper: true },
];

export const MONO_STYLES = [
  { id: 'classic', label: 'Classic', needs: ['first', 'last'], hint: 'First initial, surname, middle initial. The surname sits larger in the centre.' },
  { id: 'block', label: 'In order', needs: ['first', 'last'], hint: 'First, middle, last in reading order, all one size. The usual choice for block letters.' },
  { id: 'couple', label: 'Couple', needs: ['first', 'last', 'partner'], hint: 'One first initial on each side of the surname you share.' },
  { id: 'duo', label: 'Two names', needs: ['first', 'partner'], hint: 'Two first initials with a joiner between them. Works when you keep different surnames.' },
  { id: 'single', label: 'Single letter', needs: [], hint: 'One letter. Use the surname for things the household shares, the first name for one person.' },
];

export const MONO_FRAMES = [
  { id: 'none', label: 'No frame' },
  { id: 'circle', label: 'Circle' },
  { id: 'rings', label: 'Double ring' },
  { id: 'stitch', label: 'Stitched ring' },
  { id: 'diamond', label: 'Diamond' },
  { id: 'square', label: 'Square' },
  { id: 'wreath', label: 'Wreath' },
];

const ini = (s) => {
  const t = cleanText(s, 40);
  return t ? [...t][0].toLocaleUpperCase() : '';
};

/**
 * Decide which letters appear, in what order and size.
 * Returns { letters: [{ ch, big, joiner }], missing: [field names], rule }.
 */
export function arrange({ style = 'classic', first = '', middle = '', last = '', partner = '', joiner = '&', swap = false }) {
  const f = ini(first), m = ini(middle), l = ini(last), p = ini(partner);
  const def = MONO_STYLES.find((s) => s.id === style) || MONO_STYLES[0];
  const have = { first: f, last: l, partner: p };
  const missing = def.needs.filter((k) => !have[k]);
  let letters = [];
  let rule = def.hint;
  if (def.id === 'classic') {
    if (f && l && m) letters = [{ ch: f }, { ch: l, big: true }, { ch: m }];
    else if (f && l) { letters = [{ ch: f }, { ch: l }]; rule = 'With no middle name, two initials the same size read best.'; }
  } else if (def.id === 'block') {
    letters = [f, m, l].filter(Boolean).map((ch) => ({ ch }));
  } else if (def.id === 'couple') {
    const a = swap ? p : f, b = swap ? f : p;
    if (a && b && l) letters = [{ ch: a }, { ch: l, big: true }, { ch: b }];
  } else if (def.id === 'duo') {
    const a = swap ? p : f, b = swap ? f : p;
    if (a && b) letters = [{ ch: a }, { ch: joiner, joiner: true }, { ch: b }];
  } else {
    const ch = l || f;
    if (ch) letters = [{ ch, big: true }];
  }
  if (def.id === 'single' && !letters.length) missing.push('first');
  return { letters, missing, rule, style: def.id };
}

function frameSvg(id, color, sw) {
  const c = `fill="none" stroke="${color}" stroke-width="${sw}"`;
  switch (id) {
    case 'circle': return `<circle cx="200" cy="200" r="172" ${c}/>`;
    case 'rings': return `<circle cx="200" cy="200" r="176" ${c}/><circle cx="200" cy="200" r="160" fill="none" stroke="${color}" stroke-width="${sw / 2.5}"/>`;
    case 'stitch': return `<circle cx="200" cy="200" r="170" ${c} stroke-dasharray="14 9" stroke-linecap="round"/>`;
    case 'diamond': return `<path d="M200 18 382 200 200 382 18 200Z" ${c} stroke-linejoin="round"/><path d="M200 42 358 200 200 358 42 200Z" fill="none" stroke="${color}" stroke-width="${sw / 2.5}"/>`;
    case 'square': return `<rect x="32" y="32" width="336" height="336" rx="6" ${c}/><rect x="46" y="46" width="308" height="308" rx="2" fill="none" stroke="${color}" stroke-width="${sw / 2.5}"/>`;
    case 'wreath': {
      // Two arcs of small leaves, open at the top.
      let leaves = '';
      for (let i = 0; i < 13; i++) {
        for (const side of [-1, 1]) {
          const a = (Math.PI / 180) * (90 + side * (18 + i * 11.5));
          const x = 200 + Math.cos(a) * 168, y = 200 + Math.sin(a) * 168;
          const rot = (a * 180) / Math.PI + (side > 0 ? 55 : 125);
          leaves += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="15" ry="6" transform="rotate(${rot.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${color}"/>`;
        }
      }
      return leaves;
    }
    default: return '';
  }
}

/**
 * Build the SVG for a monogram. `fontCss` may carry an embedded @font-face block
 * so that a downloaded file renders the same everywhere.
 */
export function monogramSvg({ letters, font = 'roman', frame = 'circle', color = '#1b2a41', accent = '', background = '', fontCss = '', title = 'Monogram' }) {
  const f = MONO_FONTS.find((x) => x.id === font) || MONO_FONTS[1];
  const n = letters.length;
  const hasBig = letters.some((l) => l.big) && n > 1;
  const sizeFor = (l) => {
    if (n === 1) return 230;
    if (l.joiner) return 70;
    if (hasBig) return l.big ? 190 : 118;
    return n === 2 ? 170 : 132;
  };
  const widths = letters.map((l) => sizeFor(l) * f.w * (l.joiner ? 0.9 : 1));
  const gap = f.id === 'script' || f.id === 'hand' ? -6 : 8;
  const total = widths.reduce((a, b) => a + b, 0) + gap * (n - 1);
  const swash = font === 'script' || font === 'hand';
  const maxWidth = (frame === 'none' ? 360 : frame === 'diamond' ? 230 : frame === 'wreath' ? 250 : 280) * (swash && frame !== 'none' ? 0.86 : 1);
  const k = Math.min(1, maxWidth / Math.max(total, 1));
  let x = 200 - (total * k) / 2;
  const texts = letters.map((l, i) => {
    const w = widths[i] * k, size = sizeFor(l) * k;
    const cx = x + w / 2;
    x += w + gap * k;
    const fill = l.big && accent ? accent : l.joiner && accent ? accent : color;
    const dy = f.id === 'script' ? size * 0.06 : f.id === 'deco' ? size * 0.06 : 0;
    return `<text x="${cx.toFixed(1)}" y="${(202 + dy).toFixed(1)}" font-size="${size.toFixed(1)}" fill="${fill}" text-anchor="middle" dominant-baseline="central">${esc(l.ch)}</text>`;
  }).join('');
  const bg = background ? `<rect width="400" height="400" fill="${background}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-label="${esc(title)}">` +
    `<title>${esc(title)}</title>${fontCss ? `<style>${fontCss}</style>` : ''}${bg}` +
    `${frameSvg(frame, accent || color, 5)}` +
    `<g font-family="'${f.family}', Georgia, serif" font-weight="${f.weight}">${texts}</g></svg>`;
}

/** Plain-language reading of a monogram, for the caption and for screen readers. */
export function describe({ letters }) {
  if (!letters.length) return '';
  return letters.map((l) => (l.joiner ? (l.ch === '&' ? 'and' : l.ch === '+' ? 'plus' : 'dot') : l.ch)).join(' ');
}
