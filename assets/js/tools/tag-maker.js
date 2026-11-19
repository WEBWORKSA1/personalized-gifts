// Gift tag maker: one tag design, printed as a sheet of eight.
import { $, $$, params, download, withFonts, svgToPng, yourName, announce, debounce } from '../lib.js';
import { esc, cleanText, fitFont, initialsOf, slugify } from '../core/util.js';

const el = {
  to: $('#tg-to'), from: $('#tg-from'), msg: $('#tg-msg'), shape: $('#tg-shape'), font: $('#tg-font'), motif: $('#tg-motif'),
  border: $('#tg-border'), paper: $('#tg-paper'), ink: $('#tg-ink'), size: $('#tg-size'), canvas: $('#tg-canvas'), sheet: $('#tg-sheet'),
};
const p = params();
if (p.get('to')) el.to.value = p.get('to');
if (!el.to.value) el.to.value = yourName.get();
if (p.get('motif')) el.motif.value = p.get('motif');

const W = 360, H = 216;
const FONTS = {
  script: { name: "'Pinyon Script',cursive", label: "'Josefin Sans',sans-serif", families: ['Pinyon Script', 'Josefin Sans'], nameSize: 54, f: 0.42, caps: true },
  serif: { name: "'Alegreya',serif", label: "'Alegreya',serif", families: ['Alegreya'], nameSize: 44, f: 0.5, weight: 700 },
  type: { name: "'Special Elite',monospace", label: "'Special Elite',monospace", families: ['Special Elite'], nameSize: 34, f: 0.62 },
};

const SHAPES = {
  tag: { path: (i = 0) => `M${44 + i} ${6 + i}H${W - 6 - i}V${H - 6 - i}H${44 + i}L${6 + i} ${H - 44}V44Z`, hole: [28, H / 2], cx: 200, width: 270 },
  round: { path: (i = 0) => `M180 ${6 + i}a${102 - i} ${102 - i} 0 1 0 .01 0Z`, hole: [180, 26], cx: 180, width: 150, top: 22 },
  arch: { path: (i = 0) => `M${50 + i} ${H - 6 - i}V${110}A${130 - i} ${104 - i} 0 0 1 ${310 - i} 110V${H - 6 - i}Z`, hole: [180, 24], cx: 180, width: 220, top: 20 },
  square: { path: (i = 0) => `M${12 + i} ${6 + i}h${W - 24 - 2 * i}v${H - 12 - 2 * i}h-${W - 24 - 2 * i}Z`, hole: [34, 30], cx: 180, width: 290 },
};

const MOTIFS = {
  heart: (x, y, c) => `<path transform="translate(${x - 11} ${y - 10})" d="M11 20S0 13 0 6a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 7-11 14-11 14Z" fill="${c}"/>`,
  star: (x, y, c) => `<path transform="translate(${x - 12} ${y - 12})" d="m12 0 3.5 8.2 8.5.8-6.4 5.8 1.9 8.6L12 18.9 4.5 23.4l1.9-8.6L0 9l8.5-.8Z" fill="${c}"/>`,
  leaf: (x, y, c) => `<g transform="translate(${x - 14} ${y - 12})" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><path d="M14 24V4"/><path d="M14 10c-6 0-8-4-8-6 4 0 8 2 8 6ZM14 16c6 0 8-4 8-6-4 0-8 2-8 6ZM14 21c-5 0-7-3-7-5 3 0 7 2 7 5Z" fill="${c}" fill-opacity=".25"/></g>`,
  snow: (x, y, c) => `<g transform="translate(${x} ${y})" stroke="${c}" stroke-width="2" stroke-linecap="round">${[0, 60, 120].map((a) => `<path transform="rotate(${a})" d="M0-12V12M-4-8 0-4 4-8M-4 8 0 4 4 8"/>`).join('')}</g>`,
};

function tagSvg({ standalone = false } = {}) {
  const to = cleanText(el.to.value, 24), from = cleanText(el.from.value, 24), msg = cleanText(el.msg.value, 42);
  const shape = SHAPES[el.shape.value] || SHAPES.tag;
  const font = FONTS[el.font.value] || FONTS.script;
  const ink = el.ink.value, paper = el.paper.value;
  const cx = shape.cx, top = shape.top || 0;
  const label = (x, y, t) => `<text x="${x}" y="${y}" font-family="${font.label}" font-size="11" letter-spacing="${font.caps ? 2 : 0.5}" fill="${ink}" opacity=".75" text-anchor="middle">${esc(font.caps ? t.toUpperCase() : t)}</text>`;
  const big = (x, y, t, base) => `<text x="${x}" y="${y}" font-family="${font.name}" font-weight="${font.weight || 400}" font-size="${fitFont(t, shape.width, base, font.f)}" fill="${ink}" text-anchor="middle">${esc(t)}</text>`;
  const border = el.border.value === 'stitch' ? `<path d="${shape.path(11)}" fill="none" stroke="${ink}" stroke-width="1.6" stroke-dasharray="6 4.5" stroke-linecap="round" opacity=".8"/>`
    : el.border.value === 'double' ? `<path d="${shape.path(9)}" fill="none" stroke="${ink}" stroke-width="2"/><path d="${shape.path(14)}" fill="none" stroke="${ink}" stroke-width=".8"/>` : '';
  const m = el.motif.value;
  const my = 46 + top;
  const motif = m === 'initial' ? `<circle cx="${cx}" cy="${my}" r="15" fill="none" stroke="${ink}" stroke-width="1.5"/><text x="${cx}" y="${my + 1}" font-family="'Bodoni Moda',serif" font-weight="700" font-size="19" fill="${ink}" text-anchor="middle" dominant-baseline="central">${esc(initialsOf(to)[0] || 'A')}</text>`
    : MOTIFS[m] ? MOTIFS[m](cx, my, ink) : '';
  const yTo = m === 'none' ? 62 + top : 84 + top;
  const body = `<path d="${shape.path(0)}" fill="${paper}" stroke="#9aa3ae" stroke-width="1" stroke-dasharray="3 3"/>` +
    `<circle cx="${shape.hole[0]}" cy="${shape.hole[1]}" r="7" fill="#fff" stroke="#9aa3ae" stroke-width="1"/>` + border + motif +
    label(cx, yTo, 'To') + big(cx, yTo + (font === FONTS.script ? 46 : 40), to || 'Their name', font.nameSize) +
    (msg ? `<text x="${cx}" y="${yTo + 70}" font-family="'Alegreya',serif" font-style="italic" font-size="${fitFont(msg, shape.width, 15, 0.45)}" fill="${ink}" text-anchor="middle">${esc(msg)}</text>` : '') +
    (from ? label(cx - 28, H - 28, 'From') + `<text x="${cx - 4}" y="${H - 27}" font-family="${font === FONTS.script ? "'Alegreya',serif" : font.name}" font-style="${font === FONTS.script ? 'italic' : 'normal'}" font-size="${fitFont(from, 130, 17, 0.5)}" fill="${ink}">${esc(from)}</text>` : '');
  return standalone
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Gift tag for ${esc(to || 'their name')}">${body}</svg>`
    : body;
}

function sheetSvg() {
  const [pw, ph] = el.size.value === 'a4' ? [210, 297] : [215.9, 279.4];
  const tw = 90, th = 54, gx = 10, gy = 9;
  const x0 = (pw - 2 * tw - gx) / 2, y0 = (ph - 4 * th - 3 * gy) / 2;
  let tags = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) {
    tags += `<svg x="${(x0 + c * (tw + gx)).toFixed(2)}" y="${(y0 + r * (th + gy)).toFixed(2)}" width="${tw}" height="${th}" viewBox="0 0 ${W} ${H}">${tagSvg()}</svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${pw} ${ph}" role="img" aria-label="Sheet of eight gift tags">${tags}</svg>`;
}

function render() {
  el.canvas.innerHTML = tagSvg({ standalone: true });
  el.sheet.innerHTML = sheetSvg();
}

$('#tg-print').addEventListener('click', () => { render(); window.print(); });
$('#tg-png').addEventListener('click', async (e) => {
  const btn = e.currentTarget;
  btn.disabled = true;
  try {
    const font = FONTS[el.font.value] || FONTS.script;
    const svg = await withFonts(tagSvg({ standalone: true }), [...font.families, 'Alegreya', 'Bodoni Moda']);
    download(`gift-tag-${slugify(el.to.value) || 'name'}.png`, await svgToPng(svg, { width: W, height: H, scale: 4 }));
    announce('PNG downloaded.');
  } catch { announce('The picture could not be saved. Use Print instead.'); }
  btn.disabled = false;
});

const rerender = debounce(render, 60);
for (const c of [el.to, el.from, el.msg, el.paper, el.ink]) c.addEventListener('input', rerender);
for (const c of [el.shape, el.font, el.motif, el.border, el.size]) c.addEventListener('change', render);
el.to.addEventListener('change', () => yourName.set(cleanText(el.to.value, 18)));
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(render);
render();
