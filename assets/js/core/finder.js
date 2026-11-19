// Scores gift ideas against a short brief about the person receiving the gift.
import { hash } from './util.js';

export const RECIPIENTS = [
  ['mom', 'Mom'], ['dad', 'Dad'], ['her', 'Her'], ['him', 'Him'], ['kids', 'A child'], ['babies', 'A new baby'],
  ['grandparents', 'A grandparent'], ['couples', 'A couple'], ['friends', 'A friend'], ['coworkers', 'A coworker or client'],
  ['teachers', 'A teacher'], ['pet-lovers', 'A pet lover'],
];

export const OCCASION_CHOICES = [
  ['birthday', 'Birthday'], ['christmas', 'Christmas'], ['anniversary', 'Anniversary'], ['wedding', 'Wedding'],
  ['valentines-day', "Valentine's Day"], ['mothers-day', "Mother's Day"], ['fathers-day', "Father's Day"],
  ['new-baby', 'New baby'], ['graduation', 'Graduation'], ['housewarming', 'Housewarming'], ['retirement', 'Retirement'],
  ['thank-you', 'Thank you'], ['memorial', 'In memory'], ['diwali', 'Diwali'], ['eid', 'Eid'], ['hanukkah', 'Hanukkah'],
  ['lunar-new-year', 'Lunar New Year'],
];

export const BUDGETS = [
  [1, 'Under $25'], [2, '$25 to $50'], [3, '$50 to $100'], [4, 'Over $100'],
];

export const INTERESTS = [
  ['home', 'Home'], ['kitchen', 'Cooking'], ['travel', 'Travel'], ['style', 'Style'], ['jewelry', 'Jewellery'],
  ['pets', 'Pets'], ['office', 'Work and desk'], ['outdoors', 'Outdoors'], ['music', 'Music'], ['books', 'Books'],
  ['sports', 'Sport'], ['garden', 'Gardening'], ['tech', 'Tech'], ['drinks', 'Coffee, tea or a drink'],
  ['memories', 'Family memories'], ['crafts', 'Making things'], ['wellness', 'Rest and self-care'], ['kids', 'Play'],
];

export const TIMING = [
  [1, 'I need it today'], [10, 'Within about a week'], [21, 'In two to three weeks'], [60, 'A month or more'],
];

// Days a typical order takes door to door, by how the idea is made.
export const LEAD_DAYS = { instant: 0, days: 9, weeks: 21 };
export const LEAD_LABEL = { instant: 'Ready today', days: 'About one to two weeks', weeks: 'Allow three weeks or more' };
export const BUDGET_LABEL = { 1: 'Under $25', 2: '$25 to $50', 3: '$50 to $100', 4: 'Over $100' };

const label = (list, id) => (list.find((x) => String(x[0]) === String(id)) || [])[1] || '';

/** Score one idea. Higher is a better match; `why` lists the reasons to show. */
export function scoreIdea(idea, q) {
  let s = 0;
  const why = [];
  if (q.recipient) {
    if (idea.recipients.includes(q.recipient)) { s += 4; why.push(`For ${label(RECIPIENTS, q.recipient).toLowerCase()}`); }
    else if (idea.recipients.includes('anyone')) s += 2;
    else s -= 4;
  }
  if (q.occasion) {
    if (idea.occasions.includes(q.occasion)) { s += 3; why.push(label(OCCASION_CHOICES, q.occasion)); }
    else if (idea.occasions.includes('any')) s += 1.5;
    else s -= 2;
  }
  if (q.budget) {
    const d = Math.abs(idea.budget - q.budget);
    s += d === 0 ? 3 : d === 1 ? 0.5 : -3;
    if (d === 0) why.push(BUDGET_LABEL[idea.budget]);
  }
  const wanted = q.interests || [];
  let hits = 0;
  for (const i of wanted) if (idea.interests.includes(i)) { hits += 1; if (hits <= 2) why.push(label(INTERESTS, i)); }
  s += Math.min(hits, 3) * 2;
  if (q.days) {
    const need = LEAD_DAYS[idea.lead];
    if (need > q.days) s -= 8;
    else if (idea.lead === 'instant' && q.days <= 3) { s += 4; why.push('Ready today'); }
  }
  if (q.type && idea.types.includes(q.type)) s += 2;
  return { s, why };
}

/** Rank every idea; ties rotate by day so repeat visitors see variety. */
export function rank(ideas, q, { limit = 12, seed = '' } = {}) {
  return ideas
    .map((idea) => ({ idea, ...scoreIdea(idea, q), tie: hash(idea.id + seed) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s || a.tie - b.tie)
    .slice(0, limit);
}

/** A ready-to-use line for the gift, built from what the visitor told us. */
export function suggestLine(idea, { name = '', year = new Date().getFullYear() } = {}) {
  const n = name.trim();
  if (!n) return idea.personalize;
  const first = n.split(/\s+/)[0];
  const types = idea.types;
  if (types.includes('monogrammed')) return `Try ${first}’s initials: the monogram maker shows the right order.`;
  if (types.includes('engraved')) return `Try “${first}” with the year ${year}, or a date in Roman numerals.`;
  if (types.includes('embroidered')) return `Stitch “${first}” in a script that suits them.`;
  if (types.includes('photo')) return `Pick one photo ${first} has never seen printed.`;
  if (types.includes('printable')) return `Put “For ${first}” at the top and print it today.`;
  return idea.personalize;
}
