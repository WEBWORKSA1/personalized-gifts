// Runs on every page: menu, search, video players, countdowns, forms, notice.
import { $, $$, root, store, getJSON, yourName, debounce } from './lib.js';
import { wireAll } from './forms.js';
import { esc, todayUTC, parseISO, daysBetween, plural } from './core/util.js';

// Menu on small screens
const menuBtn = $('.menu-btn');
const nav = $('#site-nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
}

// Search
const dialog = $('#search-dialog');
if (dialog) {
  const input = $('input', dialog);
  const list = $('.search-results', dialog);
  let index = null;
  const render = (items, q) => {
    if (!q) { list.innerHTML = '<li><p>Try a person, an occasion or a tool: mom, wedding, monogram.</p></li>'; return; }
    list.innerHTML = items.length
      ? items.map((i) => `<li><a href="${root}${esc(i.u)}">${esc(i.t)}</a><p>${esc(i.d)}</p></li>`).join('')
      : `<li><p>Nothing matches “${esc(q)}”. Try a shorter word, or open the gift finder.</p></li>`;
  };
  const search = debounce(async () => {
    const q = input.value.trim().toLowerCase();
    if (!index) {
      try { index = await getJSON('data/search-index.json'); } catch { index = []; }
    }
    const words = q.split(/\s+/).filter(Boolean);
    const scored = [];
    for (const item of index) {
      const t = item.t.toLowerCase(), k = (item.k || '').toLowerCase(), d = item.d.toLowerCase();
      let s = 0;
      for (const w of words) {
        if (t.includes(w)) s += t.startsWith(w) ? 5 : 3;
        else if (k.includes(w)) s += 2;
        else if (d.includes(w)) s += 1;
        else { s = -99; break; }
      }
      if (s > 0) scored.push([s, item]);
    }
    scored.sort((a, b) => b[0] - a[0]);
    render(scored.slice(0, 12).map((x) => x[1]), q);
  }, 120);
  const openSearch = () => { if (!dialog.open) { dialog.showModal(); input.value = ''; render([], ''); input.focus(); } };
  for (const b of $$('[data-open-search]')) b.addEventListener('click', openSearch);
  input.addEventListener('input', search);
  $('form', dialog).addEventListener('submit', (e) => e.preventDefault());
  $('[data-close-search]', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '') || document.activeElement?.isContentEditable;
    if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) { e.preventDefault(); openSearch(); }
  });
}

// Video players load only when asked for
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.video__play');
  if (!btn) return;
  const frame = btn.closest('[data-yt]');
  const id = frame.dataset.yt;
  if (!/^[\w-]{6,20}$/.test(id)) return;
  const title = btn.getAttribute('aria-label') || 'Video';
  frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${esc(title.replace(/^Play: /, ''))}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
});

// Countdowns: <span data-countdown="2026-12-25">
const today = todayUTC();
for (const el of $$('[data-countdown]')) {
  const d = parseISO(el.dataset.countdown);
  if (!d) continue;
  const n = daysBetween(today, d);
  el.textContent = n > 1 ? `in ${plural(n, 'day')}` : n === 1 ? 'tomorrow' : n === 0 ? 'today' : 'passed';
}

// The visitor's own name, wherever a page offers to use it
const name = yourName.get();
for (const el of $$('[data-your-name]')) el.textContent = name || el.dataset.default || '';
for (const el of $$('input[data-name-input]')) if (!el.value && name) el.value = name;

// Year in the footer
for (const el of $$('[data-year]')) el.textContent = String(new Date().getFullYear());

// Forms
wireAll();

// Advertisement units, if any are configured
for (const ins of $$('ins.adsbygoogle')) {
  try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch { /* blocked or not loaded */ }
}

// Cookie notice
const notice = $('#cookie-notice');
if (notice && !store.get('notice', false)) {
  notice.hidden = false;
  $('button', notice).addEventListener('click', () => { store.set('notice', true); notice.hidden = true; });
}
