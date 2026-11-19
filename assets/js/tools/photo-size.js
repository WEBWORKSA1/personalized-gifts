// Photo print size calculator. The photo never leaves the device.
import { $, $$ } from '../lib.js';

const SIZES = [['Wallet or locket', 2, 3], ['4 x 6', 4, 6], ['5 x 7', 5, 7], ['Mug wrap', 3.5, 8.5], ['8 x 10', 8, 10], ['11 x 14', 11, 14], ['12 x 18', 12, 18],
  ['16 x 20', 16, 20], ['20 x 30', 20, 30], ['24 x 36', 24, 36], ['Throw blanket', 50, 60]];
const wEl = $('#ps-w'), hEl = $('#ps-h'), out = $('#ps-out'), file = $('#ps-file');
const unit = () => ($('input[name="ps-unit"]:checked') || {}).value || 'in';
const grade = (ppi) => (ppi >= 300 ? ['Sharp', 'ok'] : ppi >= 200 ? ['Good', 'ok'] : ppi >= 150 ? ['Fine from a step back', 'mid'] : ['Soft', 'no']);

function render() {
  const w = Number(wEl.value), h = Number(hEl.value);
  if (!(w > 0 && h > 0)) { out.innerHTML = '<p class="small">Choose a photo or enter its pixel size.</p>'; return; }
  const long = Math.max(w, h), short = Math.min(w, h), u = unit();
  const fmt = (a, b) => (u === 'cm' ? `${Math.round(a * 2.54)} x ${Math.round(b * 2.54)} cm` : `${a} x ${b} in`);
  const maxSharp = [short / 300, long / 300], maxOk = [short / 150, long / 150];
  const r1 = (n) => Math.round(n * 10) / 10;
  const rows = SIZES.map(([name, a, b]) => {
    const ppi = Math.floor(Math.min(short / a, long / b));
    const [label, k] = grade(ppi);
    return `<tr><th scope="row">${/x/.test(name) ? fmt(a, b) : `${name} <span class="small">(${fmt(a, b)})</span>`}</th><td>${ppi}</td><td><span class="badge${k === 'no' ? ' badge--no' : ''}"${k === 'mid' ? ' style="background:#fdf1d7;color:#8a5300"' : ''}>${label}</span></td></tr>`;
  }).join('');
  out.innerHTML = `<p class="output">${w.toLocaleString()} x ${h.toLocaleString()} pixels <span class="small">(${r1((w * h) / 1e6)} megapixels)</span></p>` +
    `<dl class="kv" style="margin:1rem 0"><dt>Sharp up to</dt><dd>${fmt(r1(maxSharp[0]), r1(maxSharp[1]))}</dd><dt>Fine on a wall up to</dt><dd>${fmt(r1(maxOk[0]), r1(maxOk[1]))}</dd></dl>` +
    `<div class="table-scroll"><table class="data-table"><thead><tr><th>Print size</th><th>Pixels per inch</th><th>Result</th></tr></thead><tbody>${rows}</tbody></table></div>` +
    `<p class="small" style="margin-top:.8rem">Sharp is 300 pixels per inch or more, good 200, fine from a step back 150. Canvas and fabric are forgiving; photo books and mugs are not.</p>`;
}
file.addEventListener('change', () => {
  const f = file.files && file.files[0];
  if (!f) return;
  const url = URL.createObjectURL(f);
  const img = new Image();
  img.onload = () => { wEl.value = img.naturalWidth; hEl.value = img.naturalHeight; URL.revokeObjectURL(url); render(); };
  img.onerror = () => { URL.revokeObjectURL(url); out.innerHTML = '<p class="error">That file could not be read as a picture. Type the pixel size instead.</p>'; };
  img.src = url;
});
for (const c of [wEl, hEl]) c.addEventListener('input', render);
for (const c of $$('input[name="ps-unit"]')) c.addEventListener('change', render);
render();
