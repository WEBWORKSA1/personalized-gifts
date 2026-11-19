// Monogram maker: arrange initials by the rule for the chosen layout, style them, download.
import { $, $$, fillSelect, params, setParams, download, withFonts, svgToPng, yourName, announce, debounce } from '../lib.js';
import { MONO_FONTS, MONO_FRAMES, MONO_STYLES, arrange, monogramSvg, describe } from '../core/monogram.js';
import { cleanText, slugify } from '../core/util.js';

const el = {
  first: $('#mm-first'), middle: $('#mm-middle'), last: $('#mm-last'), partner: $('#mm-partner'), joiner: $('#mm-joiner'),
  font: $('#mm-font'), frame: $('#mm-frame'), color: $('#mm-color'), accent: $('#mm-accent'), accentOn: $('#mm-accent-on'), bg: $('#mm-bg'),
  canvas: $('#mm-canvas'), rule: $('#mm-rule'), hint: $('#mm-hint'), toTag: $('#mm-to-tag'),
};
let swap = false;
const p = params();

fillSelect(el.font, MONO_FONTS.map((f) => [f.id, f.label]), p.get('font') || 'roman');
fillSelect(el.frame, MONO_FRAMES.map((f) => [f.id, f.label]), p.get('frame') || 'circle');
for (const k of ['first', 'middle', 'last', 'partner']) if (p.get(k)) el[k].value = p.get(k);
if (!el.first.value) el.first.value = yourName.get();
if (p.get('style')) { const r = $(`input[name="mm-style"][value="${CSS.escape(p.get('style'))}"]`); if (r) r.checked = true; }
if (/^#[0-9a-f]{6}$/i.test(p.get('color') || '')) el.color.value = p.get('color');

const style = () => ($('input[name="mm-style"]:checked') || {}).value || 'classic';
const SHOW = { classic: ['first', 'middle', 'last'], block: ['first', 'middle', 'last'], couple: ['first', 'last', 'partner', 'swap'], duo: ['first', 'partner', 'joiner', 'swap'], single: ['first', 'last'] };
const LABELS = { first: 'a first name', last: 'a surname', partner: 'your partner’s first name' };

function state() {
  return { style: style(), first: el.first.value, middle: el.middle.value, last: el.last.value, partner: el.partner.value, joiner: el.joiner.value, swap };
}
function options(letters) {
  const font = el.font.value;
  return {
    letters, font, frame: el.frame.value, color: el.color.value, accent: el.accentOn.checked ? el.accent.value : '',
    background: el.bg.value, title: `Monogram ${describe({ letters })}`,
  };
}

function render() {
  const s = state();
  for (const box of $$('[data-f]')) box.hidden = !SHOW[s.style].includes(box.dataset.f);
  el.hint.textContent = MONO_STYLES.find((x) => x.id === s.style).hint;
  const a = arrange(s);
  if (!a.letters.length) {
    el.canvas.innerHTML = '<p class="small">Type a name to see the monogram.</p>';
    el.rule.textContent = a.missing.length ? `Add ${a.missing.map((m) => LABELS[m] || m).join(' and ')}.` : '';
    return;
  }
  el.canvas.innerHTML = monogramSvg(options(a.letters));
  el.rule.textContent = `Reads ${describe(a)}. ${a.rule}`;
  const single = a.letters.find((l) => l.big) || a.letters[0];
  el.toTag.href = `../gift-tag-maker/?to=${encodeURIComponent(cleanText(s.first, 24))}&motif=initial`;
  setParams({ style: s.style, first: cleanText(s.first, 30), middle: cleanText(s.middle, 30), last: cleanText(s.last, 30), partner: cleanText(s.partner, 30), font: el.font.value, frame: el.frame.value, color: el.color.value });
  return single;
}

async function standalone() {
  const a = arrange(state());
  if (!a.letters.length) { announce('Type a name first.'); return null; }
  const font = MONO_FONTS.find((f) => f.id === el.font.value);
  const svg = await withFonts(monogramSvg(options(a.letters)), [font.family]);
  return { svg, name: `monogram-${slugify(describe(a)) || 'initials'}` };
}

$('#mm-png').addEventListener('click', async (e) => {
  const btn = e.currentTarget;
  const out = await standalone();
  if (!out) return;
  btn.disabled = true;
  try {
    download(`${out.name}.png`, await svgToPng(out.svg, { width: 400, height: 400, scale: 5, background: el.bg.value }));
    announce('PNG downloaded.');
  } catch { announce('The picture could not be saved. Try the SVG download.'); }
  btn.disabled = false;
});
$('#mm-svg').addEventListener('click', async () => {
  const out = await standalone();
  if (out) { download(`${out.name}.svg`, new Blob([out.svg], { type: 'image/svg+xml' })); announce('SVG downloaded.'); }
});
$('#mm-swap').addEventListener('click', () => { swap = !swap; render(); });

const rerender = debounce(render, 60);
for (const c of [el.first, el.middle, el.last, el.partner, el.color, el.accent]) c.addEventListener('input', rerender);
for (const c of [el.joiner, el.font, el.frame, el.bg, el.accentOn, ...$$('input[name="mm-style"]')]) c.addEventListener('change', render);
el.first.addEventListener('change', () => yourName.set(cleanText(el.first.value, 18)));

// Draw once fonts are ready so the first preview uses the real letterforms.
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(render);
render();
