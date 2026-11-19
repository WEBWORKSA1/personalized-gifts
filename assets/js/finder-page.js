// Gift finder: five questions, then a ranked list with what to put on each idea.
import { $, $$, getJSON, params, setParams, yourName, fillSelect, copyWithFeedback, shortlist, announce } from './lib.js';
import { RECIPIENTS, OCCASION_CHOICES, BUDGETS, INTERESTS, TIMING, rank, suggestLine } from './core/finder.js';
import { ideaCard } from './core/cards.js';
import { esc, cleanText, capitalise } from './core/util.js';
import { wireSaving } from './save.js';

const root = document.documentElement.dataset.root || '';
const quiz = $('#gf-quiz'), results = $('#gf-results'), stepBox = $('#gf-step'), stepsBar = $('#gf-steps');
const p = params();
const q = {
  recipient: p.get('for') || '', occasion: p.get('occ') || '', budget: Number(p.get('budget')) || 0,
  interests: (p.get('into') || '').split(',').filter(Boolean), days: Number(p.get('days')) || 0,
  type: p.get('type') || '', name: capitalise(cleanText(p.get('name') || yourName.get(), 18)),
};
let ideas = [];
let step = 0;

const STEPS = [
  { key: 'recipient', label: 'Who', title: () => 'Who is the gift for?', options: RECIPIENTS, extra: 'name' },
  { key: 'occasion', label: 'Occasion', title: () => `What is the occasion${q.name ? ` for ${q.name}` : ''}?`, options: OCCASION_CHOICES },
  { key: 'budget', label: 'Budget', title: () => 'What would you like to spend?', options: BUDGETS },
  { key: 'interests', label: 'Interests', title: () => `What ${q.name ? `is ${q.name}` : 'are they'} into? Pick up to three.`, options: INTERESTS, multi: 3 },
  { key: 'days', label: 'Timing', title: () => 'When do you need it?', options: TIMING },
];

function drawSteps() {
  stepsBar.innerHTML = STEPS.map((s, i) => `<li class="${i < step ? 'is-done' : i === step ? 'is-now' : ''}"${i === step ? ' aria-current="step"' : ''}>${s.label}</li>`).join('');
}

function drawStep() {
  const s = STEPS[step];
  drawSteps();
  const chips = s.options.map(([v, l]) => {
    const on = s.multi ? q.interests.includes(String(v)) : String(q[s.key]) === String(v);
    return `<label class="chip"><input type="${s.multi ? 'checkbox' : 'radio'}" name="gf" value="${v}"${on ? ' checked' : ''}><span>${l}</span></label>`;
  }).join('');
  stepBox.innerHTML = `<fieldset><legend><span class="small">Question ${step + 1} of ${STEPS.length}</span><br><span style="font:800 1.8rem/1.2 var(--serif)">${esc(s.title())}</span></legend><div class="chips" style="margin-top:.8rem">${chips}</div></fieldset>` +
    (s.extra === 'name' ? `<div class="field" style="max-width:22rem;margin-top:1rem"><label for="gf-name">Their first name</label><input type="text" id="gf-name" maxlength="18" autocomplete="off" value="${esc(q.name)}"><span class="hint">Optional. It makes the suggestions specific.</span></div>` : '') +
    (s.multi || s.extra ? `<div class="btn-row" style="margin-top:1rem"><button type="button" class="btn" id="gf-next">Continue</button></div>` : '');
  $('#gf-back').hidden = step === 0;
  const first = $('input[name=gf]', stepBox);
  if (step > 0 && first) first.focus();
}

function next() {
  if (step < STEPS.length - 1) { step += 1; drawStep(); } else show();
}

stepBox.addEventListener('change', (e) => {
  const s = STEPS[step];
  if (e.target.id === 'gf-name') { q.name = capitalise(cleanText(e.target.value, 18)); yourName.set(q.name); return; }
  if (e.target.name !== 'gf') return;
  if (s.multi) {
    const picked = $$('input[name=gf]:checked', stepBox).map((x) => x.value);
    if (picked.length > s.multi) { e.target.checked = false; announce(`Up to ${s.multi}.`); return; }
    q.interests = picked;
  } else {
    q[s.key] = s.key === 'budget' || s.key === 'days' ? Number(e.target.value) : e.target.value;
    if (!s.extra) next();
  }
});
stepBox.addEventListener('click', (e) => {
  if (e.target.id !== 'gf-next') return;
  const n = $('#gf-name');
  if (n) { q.name = capitalise(cleanText(n.value, 18)); yourName.set(q.name); }
  next();
});
$('#gf-back').addEventListener('click', () => { if (step > 0) { step -= 1; drawStep(); } });
$('#gf-skip').addEventListener('click', show);

function syncUrl() {
  setParams({ for: q.recipient, occ: q.occasion, budget: q.budget || '', into: q.interests.join(','), days: q.days || '', type: q.type, name: q.name });
}

function render() {
  const day = Math.floor(Date.now() / 864e5);
  const anyAnswer = q.recipient || q.occasion || q.budget || q.interests.length || q.days || q.type;
  const ranked = anyAnswer ? rank(ideas, q, { limit: 15, seed: String(day) })
    : ideas.slice().sort((a, b) => a.budget - b.budget).slice(0, 15).map((idea) => ({ idea, why: [] }));
  const list = $('#gf-list');
  list.innerHTML = ranked.length
    ? ranked.map((r) => ideaCard(r.idea, { root, why: r.why, line: suggestLine(r.idea, { name: q.name }), saved: shortlist.has(r.idea.id) })).join('')
    : '<li><p>Nothing fits all of that. Loosen the budget or the timing above.</p></li>';
  $('#gf-heading').textContent = `${ranked.length} ideas${q.name ? ` for ${q.name}` : ''}`;
  syncUrl();
  drawSaved();
}

function show() {
  quiz.hidden = true;
  results.hidden = false;
  fillSelect($('#gf-r'), [['', 'Anyone'], ...RECIPIENTS], q.recipient);
  fillSelect($('#gf-o'), [['', 'Any occasion'], ...OCCASION_CHOICES], q.occasion);
  fillSelect($('#gf-b'), [['0', 'Any budget'], ...BUDGETS], q.budget || '0');
  fillSelect($('#gf-d'), [['0', 'Any time'], ...TIMING], q.days || '0');
  render();
  $('#gf-heading').focus();
}

$('#gf-refine').addEventListener('change', () => {
  q.recipient = $('#gf-r').value; q.occasion = $('#gf-o').value;
  q.budget = Number($('#gf-b').value); q.days = Number($('#gf-d').value);
  render();
});
$('#gf-restart').addEventListener('click', () => {
  Object.assign(q, { recipient: '', occasion: '', budget: 0, interests: [], days: 0, type: '' });
  setParams({});
  step = 0; results.hidden = true; quiz.hidden = false; drawStep();
});
$('#gf-share').addEventListener('click', (e) => copyWithFeedback(e.currentTarget, location.href));

function drawSaved() {
  const saved = shortlist.all().map((id) => ideas.find((i) => i.id === id)).filter(Boolean);
  $('#gf-saved').hidden = saved.length === 0;
  $('#gf-saved-list').innerHTML = saved.map((i) => ideaCard(i, { root, saved: true })).join('');
}
$('#gf-copy-saved').addEventListener('click', (e) => {
  const saved = shortlist.all().map((id) => ideas.find((i) => i.id === id)).filter(Boolean);
  copyWithFeedback(e.currentTarget, saved.map((i) => `${i.name}: ${i.personalize}`).join('\n'));
});

(async () => {
  try { ideas = await getJSON('data/ideas.json'); } catch { ideas = []; }
  wireSaving(drawSaved);
  const hasQuery = ['for', 'occ', 'budget', 'into', 'days', 'type'].some((k) => p.get(k));
  if (hasQuery) show();
  else { quiz.hidden = false; drawStep(); drawSaved(); }
})();
