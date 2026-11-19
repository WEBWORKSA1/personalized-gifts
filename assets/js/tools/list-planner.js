// Gift list planner: saved in this browser, exportable as CSV and calendar file.
import { $, store, download, announce } from '../lib.js';
import { buildICS } from '../ics.js';
import { esc, cleanText, parseISO, formatDate, daysBetween, todayUTC, plural } from '../core/util.js';

const STATUS = ['Idea', 'Ordered', 'Arrived', 'Wrapped', 'Given'];
const form = $('#lp-form'), body = $('#lp-table tbody'), summary = $('#lp-summary'), empty = $('#lp-empty'), clearBtn = $('#lp-clear');
let rows = store.get('giftlist', []);
const save = () => store.set('giftlist', rows);
const money = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });

function render() {
  const today = todayUTC();
  rows.sort((x, y) => (x.date || '9999').localeCompare(y.date || '9999'));
  body.innerHTML = rows.map((r, i) => {
    const d = parseISO(r.date);
    const left = d ? daysBetween(today, d) : null;
    return `<tr><th scope="row">${esc(r.name)}</th><td>${esc(r.occasion)}</td><td>${d ? `${formatDate(d, 'medium')}<br><span class="small">${left > 0 ? `in ${plural(left, 'day')}` : left === 0 ? 'today' : 'passed'}</span>` : ''}</td><td>${esc(r.idea)}</td><td>${r.budget ? money(r.budget) : ''}</td>` +
      `<td><label class="visually-hidden" for="lp-s${i}">Status for ${esc(r.name)}</label><select id="lp-s${i}" data-i="${i}">${STATUS.map((s) => `<option${s === r.status ? ' selected' : ''}>${s}</option>`).join('')}</select></td>` +
      `<td><button type="button" class="link no-print" data-rm="${i}" aria-label="Remove ${esc(r.name)}">Remove</button></td></tr>`;
  }).join('');
  empty.hidden = rows.length > 0;
  const total = rows.reduce((s, r) => s + (r.budget || 0), 0);
  const done = rows.filter((r) => r.status !== 'Idea').length;
  const next = rows.map((r) => ({ r, d: parseISO(r.date) })).filter((x) => x.d && x.d >= today && x.r.status === 'Idea')[0];
  summary.innerHTML = rows.length ? `<div><span class="stat">${rows.length}</span><br>${rows.length === 1 ? 'person' : 'people'} on the list</div><div><span class="stat">${money(total)}</span><br>total budget</div>` +
    `<div><span class="stat">${done} of ${rows.length}</span><br>ordered or further<div class="meter" style="margin-top:.4rem"><span style="width:${Math.round((done / rows.length) * 100)}%"></span></div></div>` +
    `<div>${next ? `<span class="stat">${plural(daysBetween(today, next.d), 'day')}</span><br>until ${esc(next.r.name)}’s ${esc((next.r.occasion || 'date').toLowerCase())}, still to order` : '<span class="stat">Up to date</span><br>nothing dated is waiting'}</div>` : '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = cleanText($('#lp-name').value, 40);
  if (!name) { $('#lp-name').focus(); return; }
  rows.push({ name, occasion: cleanText($('#lp-occasion').value, 40), date: parseISO($('#lp-date').value) ? $('#lp-date').value : '', idea: cleanText($('#lp-idea').value, 80), budget: Math.max(0, Number($('#lp-budget').value) || 0), status: 'Idea' });
  save(); render(); form.reset(); $('#lp-name').focus();
  announce(`${name} added.`);
});
body.addEventListener('change', (e) => { const i = e.target.dataset.i; if (i != null) { rows[i].status = e.target.value; save(); render(); } });
body.addEventListener('click', (e) => { const b = e.target.closest('[data-rm]'); if (b) { rows.splice(Number(b.dataset.rm), 1); save(); render(); } });

const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
$('#lp-csv').addEventListener('click', () => {
  if (!rows.length) { announce('The list is empty.'); return; }
  const lines = [['Who', 'Occasion', 'Date', 'Idea', 'Budget', 'Status'], ...rows.map((r) => [r.name, r.occasion, r.date, r.idea, r.budget || '', r.status])];
  download('gift-list.csv', new Blob(['﻿' + lines.map((l) => l.map(csvCell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' }));
});
$('#lp-ics').addEventListener('click', () => {
  const events = rows.map((r) => ({ r, d: parseISO(r.date) })).filter((x) => x.d)
    .map(({ r, d }) => ({ title: `${r.name}: ${r.occasion || 'gift'}`, date: d, yearly: /birthday|anniversary|christmas/i.test(r.occasion), note: r.idea ? `Gift idea: ${r.idea}` : '' }));
  if (!events.length) { announce('Add a date to at least one person first.'); return; }
  download('gift-dates.ics', buildICS(events, 'Gift list'));
});
$('#lp-print').addEventListener('click', () => window.print());
let armed = false;
clearBtn.addEventListener('click', () => {
  if (!armed) { armed = true; clearBtn.textContent = 'Press again to clear everything'; setTimeout(() => { armed = false; clearBtn.textContent = 'Clear the list'; }, 4000); return; }
  rows = []; save(); render(); armed = false; clearBtn.textContent = 'Clear the list';
});
render();
