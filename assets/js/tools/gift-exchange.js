// Gift exchange: draw names in the browser and hand each person a private link.
// Nothing is uploaded. Each link carries only that person's own match.
import { $, $$, params, copyWithFeedback, fillSelect, announce, store } from '../lib.js';
import { esc, cleanText, shuffle, parseISO, formatDate } from '../core/util.js';

const KEY = [71, 105, 102, 116, 33, 9, 58];
const enc = (obj) => {
  const bytes = new TextEncoder().encode(JSON.stringify(obj)).map((b, i) => b ^ KEY[i % KEY.length]);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const dec = (str) => {
  try {
    const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
    const bytes = Uint8Array.from(bin, (c, i) => c.charCodeAt(0) ^ KEY[i % KEY.length]);
    const o = JSON.parse(new TextDecoder().decode(bytes));
    return o && typeof o.g === 'string' && typeof o.t === 'string' ? o : null;
  } catch { return null; }
};

const reveal = $('#gx-reveal'), setup = $('#gx-setup');
const token = params().get('r');

if (token) {
  const o = dec(token);
  setup.hidden = true;
  reveal.hidden = false;
  if (!o) {
    reveal.innerHTML = '<div class="panel"><h2>This link is incomplete</h2><p>Ask the organiser to send it again, and copy the whole address.</p><p><a href="./">Start a new gift exchange</a></p></div>';
  } else {
    const d = o.d ? parseISO(o.d) : null;
    reveal.innerHTML = `<div class="panel" style="max-width:38rem"><p class="small">${esc(o.e || 'Gift exchange')}</p><h2>Hello, ${esc(o.g)}.</h2><p>This link is for you alone. Make sure nobody is looking over your shoulder.</p>` +
      `<button type="button" class="btn" id="gx-show">Show who I am buying for</button><div id="gx-secret" hidden><p class="output" style="margin-top:1rem">You are buying for <span class="stitched">${esc(o.t)}</span>.</p>` +
      `<dl class="kv">${o.b ? `<dt>Budget</dt><dd>${esc(o.b)}</dd>` : ''}${d ? `<dt>Exchange</dt><dd>${formatDate(d, 'weekday')}</dd>` : ''}</dl>` +
      `<p style="margin-top:1rem"><a class="btn btn--quiet btn--small" href="../../gift-finder/?name=${encodeURIComponent(o.t)}">Find a gift for ${esc(o.t)}</a></p></div></div>`;
    $('#gx-show').addEventListener('click', (e) => { $('#gx-secret').hidden = false; e.currentTarget.hidden = true; });
  }
} else {
  const namesEl = $('#gx-names'), a = $('#gx-a'), b = $('#gx-b'), exList = $('#gx-ex'), err = $('#gx-error'), result = $('#gx-result');
  let rules = [];
  const saved = store.get('exchange', null);
  if (saved) { namesEl.value = saved.names || ''; $('#gx-event').value = saved.event || ''; $('#gx-budget').value = saved.budget || ''; rules = saved.rules || []; }

  const names = () => {
    const seen = new Set(), out = [];
    for (const raw of namesEl.value.split('\n')) {
      const n = cleanText(raw, 30);
      if (n && !seen.has(n.toLowerCase())) { seen.add(n.toLowerCase()); out.push(n); }
    }
    return out;
  };
  const persist = () => store.set('exchange', { names: namesEl.value, event: $('#gx-event').value, budget: $('#gx-budget').value, rules });
  function drawRules() {
    const list = names();
    rules = rules.filter(([x, y]) => list.includes(x) && list.includes(y));
    const opts = [['', 'Choose'], ...list.map((n) => [n, esc(n)])];
    fillSelect(a, opts); fillSelect(b, opts);
    exList.innerHTML = rules.map(([x, y], i) => `<li>${esc(x)} cannot draw ${esc(y)} <button type="button" class="link" data-rm="${i}">Remove</button></li>`).join('');
  }
  namesEl.addEventListener('change', () => { drawRules(); persist(); });
  $('#gx-add-ex').addEventListener('click', () => {
    if (a.value && b.value && a.value !== b.value && !rules.some(([x, y]) => x === a.value && y === b.value)) { rules.push([a.value, b.value]); drawRules(); persist(); }
  });
  exList.addEventListener('click', (e) => { const r = e.target.closest('[data-rm]'); if (r) { rules.splice(Number(r.dataset.rm), 1); drawRules(); persist(); } });

  $('#gx-draw').addEventListener('click', () => {
    const list = names();
    err.textContent = '';
    if (list.length < 3) { err.textContent = 'Add at least three different names, one per line.'; return; }
    const banned = new Set(rules.map(([x, y]) => `${x}>${y}`));
    let match = null;
    for (let tries = 0; tries < 4000 && !match; tries++) {
      const to = shuffle(list);
      if (list.every((g, i) => g !== to[i] && !banned.has(`${g}>${to[i]}`))) match = to;
    }
    if (!match) { err.textContent = 'Those rules leave no possible draw. Remove a rule and try again.'; return; }
    persist();
    const event = cleanText($('#gx-event').value, 40), budget = cleanText($('#gx-budget').value, 20), date = $('#gx-date').value;
    const base = location.href.split('?')[0].split('#')[0];
    const links = list.map((g, i) => ({ name: g, url: `${base}?r=${enc({ e: event, b: budget, d: date, g, t: match[i] })}` }));
    result.innerHTML = `<p>Names drawn for ${list.length} people. Send each person their own link. Opening a link shows that person’s match, so do not open the others.</p>` +
      `<ul class="results">${links.map((l) => `<li class="result"><span class="result__text">${esc(l.name)}</span><span class="btn-row"><button type="button" class="link" data-copy="${esc(l.url)}">Copy link</button></span></li>`).join('')}</ul>` +
      `<div class="btn-row" style="margin-top:1rem"><button type="button" class="btn btn--quiet btn--small" id="gx-all">Copy all names and links</button></div><p class="hint">Keep this list until the exchange is over. Links are not stored anywhere, and drawing again makes new matches.</p>`;
    $('#gx-all').addEventListener('click', (e) => copyWithFeedback(e.currentTarget, links.map((l) => `${l.name}: ${l.url}`).join('\n')));
    announce('Names drawn. Private links are ready.');
  });
  result.addEventListener('click', (e) => { const c = e.target.closest('[data-copy]'); if (c) copyWithFeedback(c, c.dataset.copy); });
  drawRules();
}
