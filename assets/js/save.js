// "Save" buttons on idea cards, kept in step with the shortlist in this browser.
import { $$, shortlist, announce } from './lib.js';

export function paintSaved(scope = document) {
  for (const b of $$('[data-save]', scope)) {
    const on = shortlist.has(b.dataset.save);
    b.setAttribute('aria-pressed', String(on));
    b.textContent = on ? 'Saved' : 'Save';
  }
}

export function wireSaving(onChange) {
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-save]');
    if (!b) return;
    const on = shortlist.toggle(b.dataset.save);
    paintSaved();
    announce(on ? 'Saved to your list on the gift finder page.' : 'Removed from your saved list.');
    if (onChange) onChange();
  });
  paintSaved();
}
