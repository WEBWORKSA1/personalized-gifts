// Anniversary by year: the next anniversary, its themes and when to order.
import { $, fillSelect } from '../lib.js';
import { ANNIVERSARIES, nextAnniversary, themeFor } from '../core/anniversary.js';
import { orderBy } from '../core/occasions.js';
import { esc, parseISO, formatDate, ordinal, plural, todayUTC } from '../core/util.js';

const dateEl = $('#an-date'), yearEl = $('#an-year'), out = $('#an-out');
fillSelect(yearEl, [['', 'Choose a year'], ...ANNIVERSARIES.map((a) => [a.year, `${ordinal(a.year)}: ${a.traditional.split(' (')[0]}`])]);

const themeHtml = (t) => `<dl class="kv" style="margin:1rem 0"><dt>Traditional</dt><dd>${esc(t.traditional)}</dd><dt>Modern</dt><dd>${esc(t.modern)}</dd><dt>Make it personal</dt><dd>${esc(t.idea)}</dd></dl>`;

function fromDate() {
  const d = parseISO(dateEl.value);
  if (!d) return false;
  yearEl.value = '';
  const today = todayUTC();
  const n = nextAnniversary(d, today);
  const when = n.days === 0 ? 'today' : `in ${plural(n.days, 'day')}`;
  let html = `<p class="output">Your <span class="stitched">${ordinal(n.years)} anniversary</span> is ${when}, on ${formatDate(n.date, 'weekday')}.</p>`;
  if (n.theme) html += themeHtml(n.theme);
  else if (n.nextThemed) html += `<p>There is no set theme for the ${ordinal(n.years)} year. The next themed year is the ${ordinal(n.nextThemed.year)}: ${esc(n.nextThemed.traditional.toLowerCase())}.</p><p>For this year, a date in Roman numerals or the coordinates of the venue works on anything.</p>`;
  if (n.days > 0) {
    html += `<h3>Order by</h3><ul class="date__by" style="max-width:26rem">${orderBy(n.date, today).filter((l) => l.days > 0).map((l) => `<li${l.passed ? ' class="is-passed"' : ''}><span>${l.label}</span><span>${l.passed ? 'too late, print something instead' : formatDate(l.by, 'medium')}</span></li>`).join('')}</ul>`;
  }
  html += `<p style="margin-top:1rem"><a href="../roman-numeral-date-converter/">Write the wedding date in Roman numerals</a></p>`;
  out.innerHTML = html;
  return true;
}
function fromYear() {
  const t = themeFor(Number(yearEl.value));
  if (!t) return;
  dateEl.value = '';
  out.innerHTML = `<p class="output">The <span class="stitched">${ordinal(t.year)} anniversary</span></p>${themeHtml(t)}`;
}
dateEl.addEventListener('input', fromDate);
yearEl.addEventListener('change', fromYear);
