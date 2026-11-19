// Occasion calendar: computed dates with order-by guidance, plus the visitor's own dates.
import { $, store, download, announce } from '../lib.js';
import { buildICS } from '../ics.js';
import { upcoming, orderBy } from '../core/occasions.js';
import { esc, cleanText, parseISO, formatDate, daysBetween, todayUTC, plural, isoDate } from '../core/util.js';

const root = document.documentElement.dataset.root || '';
const list = $('#oc-list'), ownList = $('#oc-own'), ownEmpty = $('#oc-own-empty');
const today = todayUTC();
let own = store.get('dates', []);

const nextOf = (o) => {
  const d = parseISO(o.date);
  if (!d || !o.yearly || d >= today) return d;
  const n = new Date(Date.UTC(today.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  return n >= today ? n : new Date(Date.UTC(today.getUTCFullYear() + 1, d.getUTCMonth(), d.getUTCDate()));
};

function item(o, mine) {
  const by = orderBy(o.date, today).filter((l) => l.days > 0);
  return `<li class="date"><span class="date__when">${formatDate(o.date, 'short')}</span>` +
    `<span class="date__name">${o.hub ? `<a href="${root}ideas/${o.hub}/">${esc(o.name)}</a>` : esc(o.name)}</span>` +
    `<span class="date__count">${o.days === 0 ? 'today' : `in ${plural(o.days, 'day')}`}</span> <span class="small">${formatDate(o.date, 'weekday').split(',')[0]}${mine ? ', your date' : o.where ? `, ${esc(o.where)}` : ''}</span>` +
    (o.note ? `<br><span class="small">${esc(o.note)}</span>` : '') +
    `<ul class="date__by">${by.map((l) => `<li${l.passed ? ' class="is-passed"' : ''}><span>${l.label}</span><span>${l.passed ? 'too late' : `by ${formatDate(l.by, 'short')}`}</span></li>`).join('')}</ul></li>`;
}

function render() {
  const mine = own.map((o) => ({ ...o, d: nextOf(o) })).filter((o) => o.d && o.d >= today)
    .map((o) => ({ name: o.name, date: o.d, days: daysBetween(today, o.d), mine: true }));
  const all = [...upcoming(today, 30), ...mine].sort((a, b) => a.date - b.date);
  list.innerHTML = `<ul class="dates">${all.map((o) => item(o, o.mine)).join('')}</ul><p class="small" style="margin-top:1rem">Order-by dates are rules of thumb: 28 days for custom art, 14 for engraved and embroidered gifts, 10 for printed gifts. A maker’s own cut-off always wins.</p>`;
  ownList.innerHTML = own.map((o, i) => { const d = parseISO(o.date); return `<li>${esc(o.name)}, ${d ? formatDate(d, o.yearly ? 'short' : 'medium') : ''}${o.yearly ? ', every year' : ''} <button type="button" class="link" data-rm="${i}">Remove</button></li>`; }).join('');
  ownEmpty.hidden = own.length > 0;
}

$('#oc-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = cleanText($('#oc-name').value, 50), d = parseISO($('#oc-date').value);
  if (!name || !d) { announce('Add a name and a date.'); return; }
  own.push({ name, date: isoDate(d), yearly: $('#oc-yearly').checked });
  store.set('dates', own); render(); e.target.reset(); $('#oc-yearly').checked = true;
  announce(`${name} added.`);
});
ownList.addEventListener('click', (e) => { const b = e.target.closest('[data-rm]'); if (b) { own.splice(Number(b.dataset.rm), 1); store.set('dates', own); render(); } });
$('#oc-ics').addEventListener('click', () => {
  const events = [
    ...upcoming(today, 30).map((o) => ({ title: o.name, date: o.date, yearly: false, note: 'Order personalized gifts about two weeks ahead.' })),
    ...own.map((o) => ({ title: o.name, date: nextOf(o) || parseISO(o.date), yearly: o.yearly, note: 'From your gift calendar.' })).filter((x) => x.date),
  ];
  download('gift-calendar.ics', buildICS(events, 'Gift occasions'));
  announce('Calendar file downloaded.');
});
render();
