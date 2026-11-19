// Gift certificate and coupon maker.
import { $, $$, download, withFonts, svgToPng, yourName, announce, debounce } from '../lib.js';
import { esc, cleanText, fitFont, slugify } from '../core/util.js';

const el = {
  title: $('#gc-title'), to: $('#gc-to'), from: $('#gc-from'), gift: $('#gc-gift'), coupons: $('#gc-coupons'),
  until: $('#gc-until'), style: $('#gc-style'), color: $('#gc-color'), sheet: $('#gc-sheet'),
};
if (!el.to.value) el.to.value = yourName.get();
const W = 1000, H = 700, INK = '#1b2a41';
const kind = () => ($('input[name="gc-kind"]:checked') || {}).value || 'certificate';

/** Break text into lines of at most `max` characters, on word boundaries. */
function wrap(text, max, maxLines = 4) {
  const words = text.split(/\s+/).filter(Boolean), lines = [];
  let line = '';
  for (const w of words) {
    if (line && (line.length + 1 + w.length) > max) { lines.push(line); line = w; } else line = line ? `${line} ${w}` : w;
  }
  if (line) lines.push(line);
  return lines.slice(0, maxLines);
}
const t = (x, y, size, content, attrs = '') => `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle" ${attrs}>${esc(content)}</text>`;

function frame(style, c, x, y, w, h) {
  if (style === 'modern') return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/><rect x="${x}" y="${y}" width="${w}" height="${Math.round(h * 0.2)}" fill="${c}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${c}" stroke-width="4"/>`;
  if (style === 'playful') return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(36, h / 6)}" fill="#fff" stroke="${c}" stroke-width="6" stroke-dasharray="2 14" stroke-linecap="round"/>`;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" stroke="${c}" stroke-width="5"/><rect x="${x + 14}" y="${y + 14}" width="${w - 28}" height="${h - 28}" fill="none" stroke="${c}" stroke-width="1.5" stroke-dasharray="8 6"/>`;
}

function certificate() {
  const c = el.color.value, style = el.style.value;
  const title = cleanText(el.title.value, 34) || 'Gift certificate';
  const to = cleanText(el.to.value, 28), from = cleanText(el.from.value, 28), until = cleanText(el.until.value, 24);
  const lines = wrap(cleanText(el.gift.value, 150), 44);
  const titleFill = style === 'modern' ? '#fff' : c;
  const startY = 420 - (lines.length - 1) * 22;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(title)} for ${esc(to || 'someone')}">` +
    `<rect width="${W}" height="${H}" fill="#fff"/>${frame(style, c, 30, 30, W - 60, H - 60)}` +
    t(500, style === 'modern' ? 118 : 140, fitFont(title, 760, 64, 0.6), style === 'playful' ? title : title.toUpperCase(), `font-family="${style === 'playful' ? "'Sacramento',cursive" : "'Cinzel',serif"}" font-weight="600" letter-spacing="${style === 'playful' ? 0 : 4}" fill="${titleFill}"`) +
    t(500, 235, 24, 'This certificate entitles', `font-family="'Alegreya',serif" font-style="italic" fill="${INK}"`) +
    t(500, 318, fitFont(to || 'Their name', 720, 78, 0.42), to || 'Their name', `font-family="'Pinyon Script',cursive" fill="${INK}"`) +
    `<path d="M240 340H760" stroke="${c}" stroke-width="2" stroke-dasharray="7 5"/>` +
    t(500, 378, 22, 'to', `font-family="'Alegreya',serif" font-style="italic" fill="${INK}"`) +
    lines.map((l, i) => t(500, startY + 20 + i * 44, 34, l, `font-family="'Alegreya',serif" font-weight="700" fill="${INK}"`)).join('') +
    `<path d="M120 610H400M600 610H880" stroke="${INK}" stroke-width="1.5"/>` +
    t(260, 590, fitFont(from, 260, 30, 0.45), from, `font-family="'Sacramento',cursive" fill="${INK}"`) +
    t(260, 640, 18, 'With love from', `font-family="'Alegreya',serif" font-style="italic" fill="${INK}"`) +
    t(740, 596, fitFont(until, 260, 24, 0.5), until, `font-family="'Alegreya',serif" font-weight="700" fill="${INK}"`) +
    t(740, 640, 18, 'Valid until', `font-family="'Alegreya',serif" font-style="italic" fill="${INK}"`) + `</svg>`;
}

function coupons() {
  const c = el.color.value, style = el.style.value;
  const title = cleanText(el.title.value, 34) || 'Coupon';
  const to = cleanText(el.to.value, 28), from = cleanText(el.from.value, 28), until = cleanText(el.until.value, 24);
  const items = el.coupons.value.split('\n').map((s) => cleanText(s, 44)).filter(Boolean).slice(0, 6);
  while (items.length < 6) items.push('');
  const cw = 470, ch = 210;
  let out = '';
  items.forEach((text, i) => {
    const x = 20 + (i % 2) * (cw + 20), y = 15 + Math.floor(i / 2) * (ch + 15);
    const lines = wrap(text || 'Write a promise here', 26, 2);
    out += `<g>${frame(style, c, x, y, cw, ch)}` +
      t(x + cw / 2, y + (style === 'modern' ? 30 : 44), 17, (style === 'playful' ? title : title.toUpperCase()), `font-family="${style === 'playful' ? "'Sacramento',cursive" : "'Cinzel',serif"}" font-weight="600" letter-spacing="${style === 'playful' ? 0 : 2}" fill="${style === 'modern' ? '#fff' : c}"`) +
      t(x + cw / 2, y + 78, 17, to ? `For ${to}, good for` : 'Good for', `font-family="'Alegreya',serif" font-style="italic" fill="${INK}"`) +
      lines.map((l, k) => t(x + cw / 2, y + (lines.length > 1 ? 112 : 126) + k * 32, 27, l, `font-family="'Alegreya',serif" font-weight="700" fill="${text ? INK : '#9aa3ae'}"`)).join('') +
      t(x + cw / 2, y + ch - 20, 14, [from ? `From ${from}` : '', until ? `Valid until ${until}` : ''].filter(Boolean).join(', ').replace(', Valid', ', valid'), `font-family="'Alegreya',serif" font-style="italic" fill="${INK}"`) + `</g>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Six coupons for ${esc(to || 'someone')}"><rect width="${W}" height="${H}" fill="#fff"/>` +
    `<path d="M500 0V${H}M0 232.5H${W}M0 457.5H${W}" stroke="#9aa3ae" stroke-width="1" stroke-dasharray="4 5"/>${out}</svg>`;
}

const build = () => (kind() === 'coupons' ? coupons() : certificate());
function render() {
  const k = kind();
  for (const box of $$('[data-kind]')) box.hidden = box.dataset.kind !== k;
  el.sheet.innerHTML = build();
}

$('#gc-print').addEventListener('click', () => { render(); window.print(); });
$('#gc-png').addEventListener('click', async (e) => {
  const btn = e.currentTarget;
  btn.disabled = true;
  try {
    const svg = await withFonts(build(), ['Alegreya', 'Cinzel', 'Pinyon Script', 'Sacramento']);
    download(`${kind()}-${slugify(el.to.value) || 'gift'}.png`, await svgToPng(svg, { width: W, height: H, scale: 2, background: '#ffffff' }));
    announce('PNG downloaded.');
  } catch { announce('The picture could not be saved. Use Print instead.'); }
  btn.disabled = false;
});

let lastKind = kind();
for (const r of $$('input[name="gc-kind"]')) r.addEventListener('change', () => {
  const k = kind();
  if (k !== lastKind) {
    if (k === 'coupons' && (!el.title.value || el.title.value === 'Gift certificate')) el.title.value = 'Coupon';
    if (k === 'certificate' && (!el.title.value || el.title.value === 'Coupon')) el.title.value = 'Gift certificate';
    lastKind = k;
  }
  render();
});
const rerender = debounce(render, 80);
for (const c of [el.title, el.to, el.from, el.gift, el.coupons, el.until, el.color]) c.addEventListener('input', rerender);
el.style.addEventListener('change', render);
el.to.addEventListener('change', () => yourName.set(cleanText(el.to.value, 18)));
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(render);
render();
