// One idea card, used by the generator for static pages and by the finder in the browser.
import { esc } from './util.js';
import { BUDGET_LABEL, LEAD_LABEL } from './finder.js';

const PRINT_TOOL = {
  'gift-tags': 'gift-tag-maker', 'gift-certificate': 'gift-certificate-maker', 'coupon-book': 'gift-certificate-maker',
  'name-poem': 'name-poem-generator', 'monogram-print': 'monogram-maker',
};

export function ideaLinks(idea, root = '') {
  const t = idea.types, links = [];
  if (t.includes('printable')) links.push(`<a href="${root}tools/${PRINT_TOOL[idea.id] || 'gift-tag-maker'}/">Make it now</a>`);
  if (t.includes('monogrammed')) links.push(`<a href="${root}tools/monogram-maker/">Make the monogram</a>`);
  if (t.includes('engraved') || t.includes('embroidered')) links.push(`<a href="${root}tools/engraving-ideas/">Find the words</a>`);
  if (t.includes('photo')) links.push(`<a href="${root}tools/photo-print-size-calculator/">Check the photo</a>`);
  return links.slice(0, 2).join('');
}

export function ideaCard(idea, { root = '', why = [], line = '', saved = false } = {}) {
  return `<li class="tag" data-id="${esc(idea.id)}" data-budget="${idea.budget}" data-lead="${idea.lead}">` +
    `<h3>${esc(idea.name)}</h3><p>${esc(idea.blurb)}</p>` +
    `<p class="tag__how">${esc(line || idea.personalize)}</p>` +
    (why.length ? `<p class="tag__why">${why.map(esc).join(', ')}</p>` : '') +
    `<p class="tag__meta"><span>${BUDGET_LABEL[idea.budget]}</span><span>${LEAD_LABEL[idea.lead]}</span></p>` +
    `<p class="tag__actions">${ideaLinks(idea, root)}<button type="button" class="link" data-save="${esc(idea.id)}" aria-pressed="${saved}">${saved ? 'Saved' : 'Save'}</button></p></li>`;
}
