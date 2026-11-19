// Quote request: three short steps, a running estimate, and a draft that survives a closed tab.
import { $, $$, store } from './lib.js';
import { wireForm } from './forms.js';
import { todayUTC, parseISO, daysBetween, addDays, formatDate, plural } from './core/util.js';

const form = $('#quote-form');
const sets = $$('fieldset[data-step]', form);
const bar = $$('#quote-steps li');
const back = $('#quote-back'), next = $('#quote-next'), send = $('#quote-send');
const panel = $('#quote-estimate');
let step = 0;

const BANDS = { 'Under $15': [8, 15], '$15 to $30': [15, 30], '$30 to $60': [30, 60], '$60 to $100': [60, 100], 'Over $100': [100, 160] };
const money = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const val = (name) => {
  const els = $$(`[name="${name}"]`, form);
  if (!els.length) return '';
  if (els[0].type === 'radio' || els[0].type === 'checkbox') return els.filter((e) => e.checked).map((e) => e.value).join(', ');
  return els[0].value.trim();
};

function show(n) {
  step = n;
  sets.forEach((s, i) => { s.hidden = i !== n; });
  bar.forEach((li, i) => { li.className = i < n ? 'is-done' : i === n ? 'is-now' : ''; });
  back.hidden = n === 0;
  next.hidden = n === sets.length - 1;
  send.hidden = n !== sets.length - 1;
}

function stepValid() {
  for (const el of $$('input,select,textarea', sets[step])) {
    if (!el.checkValidity()) { el.reportValidity(); return false; }
  }
  return true;
}

function estimate() {
  const qty = Number(val('Quantity')) || 0;
  const band = BANDS[val('Budget per gift')];
  const what = val('Personalization');
  const delivery = val('Delivery');
  const need = parseISO(val('Needed by'));
  const rows = [];
  if (val('Occasion')) rows.push(['For', val('Occasion')]);
  if (val('Gift types')) rows.push(['Gifts', val('Gift types')]);
  if (what) rows.push(['On each one', what]);
  if (qty) rows.push(['Quantity', qty.toLocaleString('en-US')]);
  if (qty && band) rows.push(['Gift budget', `${money(qty * band[0])} to ${money(qty * band[1])}`]);
  let weeks = 4;
  if (/name|Both/.test(what)) weeks += 1;
  if (qty > 250) weeks += 1;
  if (delivery === 'More than one country') weeks += 1;
  if (qty) rows.push(['Allow about', `${weeks} to ${weeks + 2} weeks from brief to delivery`]);
  const notes = [];
  if (qty && qty < 10) notes.push('Suppliers quote from about ten pieces. For fewer, the gift finder will serve you better.');
  if (qty && band) notes.push('Setup, artwork, packaging and delivery are quoted separately and vary by supplier.');
  if (need) {
    const days = daysBetween(todayUTC(), need);
    if (days < 0) notes.push('That date has passed. Leave it empty if you are flexible.');
    else if (days < weeks * 7) notes.push(`That is ${plural(days, 'day')} away, which is tight. Say in the notes whether the date can move; ready-made items with a printed card are the fastest route.`);
    else notes.push(`Aim to approve proofs by ${formatDate(addDays(need, -(weeks - 1) * 7))}.`);
  }
  panel.innerHTML = `<h2>Your brief so far</h2>${rows.length
    ? `<dl class="kv">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v.replace(/</g, '&lt;')}</dd>`).join('')}</dl>`
    : '<p class="small">Answer the questions and a rough budget and timeline appear here.</p>'}` +
    notes.map((n) => `<p class="small" style="margin:.7rem 0 0">${n}</p>`).join('') +
    (rows.length ? '<p class="hint" style="margin-top:.7rem">Estimates only, from ranges suppliers publish.</p>' : '');
}

// Draft: everything except the consent boxes.
function saveDraft() {
  const d = {};
  for (const el of form.elements) {
    if (!el.name || el.name === 'website' || el.type === 'submit' || el.name.startsWith('Consent')) continue;
    if (el.type === 'radio' || el.type === 'checkbox') { if (el.checked) (d[el.name] = d[el.name] || []).push(el.value); } else if (el.value) d[el.name] = el.value;
  }
  store.set('quote', d);
  $('#quote-saved').hidden = false;
}
function loadDraft() {
  const d = store.get('quote', null);
  if (!d) return;
  for (const el of form.elements) {
    if (!(el.name in d)) continue;
    if (el.type === 'radio' || el.type === 'checkbox') el.checked = d[el.name].includes(el.value);
    else el.value = d[el.name];
  }
}

next.addEventListener('click', () => { if (stepValid()) { show(step + 1); const f = $('input,select,textarea', sets[step]); if (f) f.focus(); } });
back.addEventListener('click', () => show(step - 1));
form.addEventListener('input', () => { estimate(); saveDraft(); });
form.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && step < sets.length - 1) { e.preventDefault(); next.click(); } });

loadDraft();
show(0);
estimate();
wireForm(form, {
  name: 'Quote request',
  subject: (f) => `Quote request: ${f.Quantity || '?'} x ${f.Occasion || 'gifts'}`,
  after: () => { store.del('quote'); panel.innerHTML = '<h2>Sent</h2><p>Thank you. While you wait, the <a href="../guides/bulk-personalized-gifts/">bulk order guide</a> explains what suppliers will ask.</p>'; },
});
