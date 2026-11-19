// Idea hub pages: filter the list by budget or by what is ready today.
import { $, $$ } from './lib.js';
import { wireSaving } from './save.js';

const list = $('#hub-list');
const empty = $('#hub-empty');
function apply(value) {
  let shown = 0;
  for (const li of $$('.tag', list)) {
    const b = Number(li.dataset.budget);
    const ok = value === 'all' || (value === 'b1' && b === 1) || (value === 'b2' && b === 2) || (value === 'b3' && b >= 3) || (value === 'instant' && li.dataset.lead === 'instant');
    li.hidden = !ok;
    if (ok) shown += 1;
  }
  empty.hidden = shown > 0;
}
if (list) {
  $('#hub-filter').addEventListener('change', (e) => apply(e.target.value));
  wireSaving();
}
