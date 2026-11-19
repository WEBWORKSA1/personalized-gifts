// Dates in Roman numerals, single numbers, and coordinates formatted for engraving.
import { $, copyWithFeedback, debounce } from '../lib.js';
import { toRoman, formatDateParts, parseCoords, formatCoords } from '../core/roman.js';
import { esc, parseISO, charCount, formatDate, isoDate, todayUTC } from '../core/util.js';

const el = { date: $('#rd-date'), order: $('#rd-order'), sep: $('#rd-sep'), short: $('#rd-short'), num: $('#rd-num'), coords: $('#rd-coords'), out: $('#rd-out') };
if (!el.date.value) el.date.value = isoDate(todayUTC());

const row = (label, value) => `<li class="result"><span class="result__text">${esc(value)}</span><span class="btn-row"><button type="button" class="link" data-copy="${esc(value)}">Copy</button></span><span class="result__meta">${label}, ${charCount(value)} characters</span></li>`;

function render() {
  let html = '';
  const d = parseISO(el.date.value);
  if (d) {
    const parts = { day: d.getUTCDate(), month: d.getUTCMonth() + 1, year: d.getUTCFullYear() };
    const o = { order: el.order.value, sep: el.sep.value, shortYear: el.short.checked };
    html += `<h3>${formatDate(d)}</h3><ul class="results">${row('Roman numerals', formatDateParts(parts, { ...o, style: 'roman' }))}${row('Digits', formatDateParts(parts, { ...o, style: 'digits' }))}${row('Year only', toRoman(parts.year))}</ul>`;
  }
  const n = Number(el.num.value);
  if (el.num.value !== '') {
    const r = toRoman(n);
    html += `<h3 style="margin-top:1.5rem">Number</h3>${r ? `<ul class="results">${row(String(n), r)}</ul>` : '<p class="error">Enter a whole number from 1 to 3999.</p>'}`;
  }
  const raw = el.coords.value.trim();
  if (raw) {
    const c = parseCoords(raw);
    html += `<h3 style="margin-top:1.5rem">Place</h3>${c
      ? `<ul class="results">${row('Degrees, minutes, seconds', formatCoords(c, 'dms'))}${row('Decimal degrees', formatCoords(c, 'decimal'))}${row('Compact', formatCoords(c, 'compact'))}</ul><p class="small"><a href="https://www.openstreetmap.org/?mlat=${c.lat}&mlon=${c.lng}#map=16/${c.lat}/${c.lng}" rel="noopener">Check this spot on a map</a></p>`
      : '<p class="error">Write latitude then longitude, such as 45.5019, -73.5674 or 45.5019 N 73.5674 W.</p>'}`;
  }
  el.out.innerHTML = html || '<p class="small">Choose a date, a number or a place.</p>';
}
const rerender = debounce(render, 80);
for (const c of [el.date, el.num, el.coords]) c.addEventListener('input', rerender);
for (const c of [el.order, el.sep, el.short]) c.addEventListener('change', render);
el.out.addEventListener('click', (e) => { const b = e.target.closest('[data-copy]'); if (b) copyWithFeedback(b, b.dataset.copy); });
render();
