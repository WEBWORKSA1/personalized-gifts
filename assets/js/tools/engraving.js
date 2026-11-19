// Engraving ideas: filter a library of short lines, fill in the name and date,
// and check each one against the space available.
import { $, $$, getJSON, fillSelect, copyWithFeedback, debounce, yourName } from '../lib.js';
import { MOCKS } from '../core/mockups.js';
import { esc, cleanText, charCount, parseISO, shuffle, capitalise, initialsOf, rng } from '../core/util.js';
import { formatDateParts } from '../core/roman.js';

const SPACES = [
  ['ring', 'Ring, inside the band', 20, 1, 'barNecklace'], ['necklace', 'Bar necklace', 12, 1, 'barNecklace'],
  ['bracelet', 'Bracelet or cuff', 25, 1, 'barNecklace'], ['keyring', 'Key ring', 14, 2, 'keyring'],
  ['pen', 'Pen', 30, 1, 'pen'], ['knife', 'Pocket knife handle', 20, 1, 'pen'], ['watch', 'Watch back', 20, 3, 'keyring'],
  ['mug', 'Mug or glass', 30, 2, 'mug'], ['frame', 'Frame plate', 25, 3, 'frame'], ['board', 'Cutting board', 28, 2, 'board'],
  ['custom', 'Something else', 40, 3, 'frame'],
];
const OCC = [['any', 'Any occasion'], ['birthday', 'Birthday'], ['wedding', 'Wedding'], ['anniversary', 'Anniversary'], ['valentines', "Valentine's Day"],
  ['mothers', "Mother's Day"], ['fathers', "Father's Day"], ['graduation', 'Graduation'], ['baby', 'New baby'], ['retirement', 'Retirement'],
  ['memorial', 'In memory'], ['thanks', 'Thank you'], ['christmas', 'Christmas'], ['friendship', 'Friendship'], ['housewarming', 'Housewarming']];
const WHO = [['anyone', 'Anyone'], ['partner', 'Partner'], ['mom', 'Mother'], ['dad', 'Father'], ['friend', 'Friend'], ['child', 'Child'],
  ['grandparent', 'Grandparent'], ['colleague', 'Colleague'], ['teacher', 'Teacher'], ['pet', 'Pet']];

const el = {
  occ: $('#eg-occasion'), who: $('#eg-who'), name: $('#eg-name'), name2: $('#eg-name2'), date: $('#eg-date'),
  space: $('#eg-space'), max: $('#eg-max'), lines: $('#eg-lines'), own: $('#eg-own'), fit: $('#eg-fit'),
  mock: $('#eg-mock'), results: $('#eg-results'), more: $('#eg-more'),
};
let library = [];
let seed = 1;
let previewText = '';

fillSelect(el.occ, OCC);
fillSelect(el.who, WHO);
fillSelect(el.space, SPACES.map((s) => [s[0], `${s[1]} (${s[2]} characters${s[3] > 1 ? `, ${s[3]} lines` : ''})`]));

const space = () => SPACES.find((s) => s[0] === el.space.value) || SPACES[0];
const limits = () => ({ max: Math.max(4, Number(el.max.value) || 20), lines: Math.max(1, Number(el.lines.value) || 1) });

function fill(template) {
  const name = capitalise(cleanText(el.name.value, 30));
  const name2 = capitalise(cleanText(el.name2.value, 30));
  const d = parseISO(el.date.value);
  const needs = (k) => template.includes(`{${k}}`);
  if ((needs('name') || needs('initials')) && !name) return null;
  if (needs('name2') && !name2) return null;
  if ((needs('date') || needs('roman')) && !d) return null;
  const parts = d ? { day: d.getUTCDate(), month: d.getUTCMonth() + 1, year: d.getUTCFullYear() } : null;
  const year = d ? d.getUTCFullYear() : new Date().getFullYear();
  return template
    .replaceAll('{name2}', name2).replaceAll('{name}', name)
    .replaceAll('{initials}', [...initialsOf(name), ...initialsOf(name2).slice(0, 1)].join(''))
    .replaceAll('{date}', parts ? formatDateParts(parts, { style: 'digits' }) : '')
    .replaceAll('{roman}', parts ? formatDateParts(parts, { style: 'roman' }) : '')
    .replaceAll('{year}', String(year));
}

/** Lay text out on the allowed lines. Returns { lines, fits, longest }. */
function layout(text) {
  const { max, lines } = limits();
  let parts = text.split(' / ').map((s) => s.trim()).filter(Boolean);
  if (parts.length > lines) parts = [parts.join(' ')];
  const longest = Math.max(...parts.map(charCount), 0);
  return { lines: parts, fits: longest <= max && parts.length <= lines, longest };
}

function drawMock(text) {
  const parts = text ? text.split(' / ') : [];
  const kind = space()[4];
  const fn = MOCKS[kind];
  el.mock.innerHTML = kind === 'keyring' || kind === 'frame' || kind === 'board' ? fn(parts[0] || '', parts.slice(1).join(' ')) : fn(parts.join(' '));
}

function status(text) {
  if (!text) { el.fit.textContent = ''; return; }
  const l = layout(text), { max, lines } = limits();
  el.fit.innerHTML = l.fits
    ? `<span class="badge">Fits</span> Longest line ${l.longest} of ${max} characters, on ${l.lines.length} of ${lines} line${lines > 1 ? 's' : ''}.`
    : `<span class="badge badge--no">Too long</span> Longest line is ${l.longest} characters; the limit is ${max}${l.lines.length > lines ? ` on ${lines} line${lines > 1 ? 's' : ''}` : ''}.`;
}

function render() {
  const occ = el.occ.value, who = el.who.value;
  const tone = ($('input[name="eg-tone"]:checked') || {}).value || 'any';
  const pool = library.filter((x) => (occ === 'any' || x.o.includes(occ) || x.o.includes('any')) &&
    (who === 'anyone' || x.w.includes(who) || x.w.includes('anyone')) && (tone === 'any' || x.n === tone));
  const seen = new Set();
  const made = [];
  for (const item of shuffle(pool, rng(seed))) {
    const text = fill(item.t);
    if (!text || seen.has(text)) continue;
    seen.add(text);
    const exact = (occ !== 'any' && item.o.includes(occ) ? 2 : 0) + (who !== 'anyone' && item.w.includes(who) ? 1 : 0);
    made.push({ text, exact, ...layout(text) });
  }
  made.sort((a, b) => Number(b.fits) - Number(a.fits) || b.exact - a.exact);
  const top = made.slice(0, 12);
  el.results.innerHTML = top.length ? top.map((r) =>
    `<li class="result"><span class="result__text stitched" style="background-size:9px ${r.fits ? 2 : 0}px">${r.lines.map(esc).join('<br>')}</span>` +
    `<span class="btn-row"><button type="button" class="link" data-preview="${esc(r.text)}">Preview</button><button type="button" class="link" data-copy="${esc(r.lines.join('\n'))}">Copy</button></span>` +
    `<span class="result__meta">${r.longest} characters ${r.fits ? '<span class="badge">Fits</span>' : '<span class="badge badge--no">Too long for this space</span>'}</span></li>`).join('')
    : '<li class="small">No lines match yet. Add a name, or set the occasion to Any.</li>';
  const current = el.own.value.trim() || previewText || (top[0] ? top[0].text : '');
  drawMock(current);
  status(el.own.value.trim() || previewText);
}

const rerender = debounce(render, 80);
for (const c of [el.occ, el.who, el.name, el.name2, el.date, el.max, el.lines]) c.addEventListener('input', rerender);
for (const c of $$('input[name="eg-tone"]')) c.addEventListener('change', rerender);
el.name.addEventListener('change', () => yourName.set(capitalise(cleanText(el.name.value, 18))));
el.space.addEventListener('change', () => { const s = space(); el.max.value = s[2]; el.lines.value = s[3]; render(); });
el.own.addEventListener('input', () => { previewText = ''; rerender(); });
el.more.addEventListener('click', () => { seed += 1; render(); });
el.results.addEventListener('click', (e) => {
  const p = e.target.closest('[data-preview]'), c = e.target.closest('[data-copy]');
  if (p) { previewText = p.dataset.preview; el.own.value = ''; drawMock(previewText); status(previewText); el.mock.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
  if (c) copyWithFeedback(c, c.dataset.copy);
});

(async () => {
  const s = space(); el.max.value = s[2]; el.lines.value = s[3];
  try { library = await getJSON('data/inscriptions.json'); } catch { library = []; }
  seed = Math.floor(Date.now() / 864e5);
  render();
})();
