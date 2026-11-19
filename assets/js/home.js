// Home page: one name drives every example on the page.
import { $, $$, yourName, debounce } from './lib.js';
import { workbench } from './core/mockups.js';
import { arrange, monogramSvg } from './core/monogram.js';
import { cleanText, capitalise, esc } from './core/util.js';
import { wireSaving } from './save.js';

const input = $('#hero-name');
const bench = $('#bench');
const find = $('#hero-find');
const st = (s) => `<span class="stitched">${esc(s)}</span>`;

function paint(raw) {
  const name = capitalise(cleanText(raw, 18)) || 'Ava';
  for (const item of workbench(name)) {
    const li = $(`[data-mock="${item.id}"] figure`, bench);
    if (li) li.firstElementChild.outerHTML = item.svg;
  }
  for (const el of $$('[data-your-name]')) el.textContent = name;
  find.href = `gift-finder/?name=${encodeURIComponent(name)}`;
  const set = (slug, html) => { const el = $(`[data-sample="${slug}"]`); if (el) el.innerHTML = html; };
  set('engraving-ideas', `${st(`${name}, always`)}`);
  set('monogram-maker', monogramSvg({ letters: arrange({ style: 'single', first: name }).letters, font: 'didone', frame: 'rings', color: '#77551a' }));
  set('gift-tag-maker', `To ${st(name)}, with love`);
  set('gift-certificate-maker', `For ${st(name)}: one Saturday, your choice`);
  set('name-poem-generator', `One line for each letter of ${st(name)}`);
  set('gift-exchange-generator', `Only ${st(name)} sees who ${esc(name)} drew`);
  set('gift-list-planner', `${st(name)}, birthday, ordered`);
}

const stored = yourName.get();
if (stored) { input.value = stored; paint(stored); }

input.addEventListener('input', debounce(() => {
  yourName.set(capitalise(cleanText(input.value, 18)));
  paint(input.value);
}, 60));

// One small moment on first visit: the example name writes itself once.
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!stored && !calm) {
  const demo = 'Ava';
  let i = 0;
  const tick = () => {
    if (document.activeElement === input || input.value) return;
    i += 1;
    paint(demo.slice(0, i));
    input.placeholder = demo.slice(0, i);
    if (i < demo.length) setTimeout(tick, 260);
  };
  paint('A');
  setTimeout(tick, 500);
}

wireSaving();
