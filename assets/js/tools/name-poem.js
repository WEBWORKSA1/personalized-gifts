// Name poem: an acrostic drafted from a bank of original lines, then edited by hand.
import { $, $$, download, withFonts, svgToPng, yourName, announce, debounce, copyWithFeedback } from '../lib.js';
import { esc, cleanText, fitFont, slugify, shuffle, rng, hash } from '../core/util.js';

// tone: w warm, p playful, r proud
const BANK = {
  A: 'w:Always the first to laugh;w:A heart with room for everyone;r:Able to fix nearly anything;p:Adventure follows wherever you go;r:Asks the questions that matter;p:Arrives with snacks, every time;w:At home in every room',
  B: 'r:Brave when it counts;w:Brings the calm with them;p:Better at puzzles than they admit;p:Believes in second helpings;w:Bright in every sense;r:Builds things that last;w:Beside you before you ask',
  C: 'w:Curious about everything;r:Calm in every storm;p:Champion of the long nap;w:Cares out loud;p:Can find the good in a Monday;r:Counts on nobody and helps everybody;w:Comfort in a crowded room',
  D: 'r:Dependable as sunrise;p:Dances while the kettle boils;r:Does the hard thing first;w:Dreams with sleeves rolled up;p:Dangerous near a dessert menu;w:Deeply, quietly kind;r:Determined from the very start',
  E: 'w:Easy to be around;w:Everyone’s first phone call;p:Endlessly patient, mostly;r:Eyes that notice everything;p:Eats the last biscuit, then confesses;w:Energy for one more story;r:Earns every bit of it',
  F: 'r:Fierce and gentle in equal measure;p:Finds the funny side;p:First on the dance floor;w:Faithful to the people they love;w:Full of good ideas;r:Finishes what they start;w:Forgives quickly',
  G: 'w:Generous with time;r:Good in a crisis;p:Gets the joke before the punchline;w:Grows things, people included;p:Gives the best directions, eventually;r:Graceful under pressure;w:Glad to see you, always',
  H: 'r:Honest when it is hard;w:Home to everyone who knows them;p:Hums without noticing;p:Has a story for every occasion;w:Heart on their sleeve;r:Holds the door and the room;w:Hopeful by habit',
  I: 'w:Interested in everyone they meet;p:Impossible to beat at cards;r:Imagines better, then builds it;w:In your corner, every round;p:Insists on dessert;r:Independent from day one;p:Inventive with leftovers',
  J: 'w:Joy in an ordinary Tuesday;w:Just the person you hoped would come;p:Jokes that land eventually;r:Jumps in with both feet;w:Judges nobody;r:Juggles more than anyone knows;p:Jam on the toast, always',
  K: 'w:Kind without keeping score;r:Keeps every promise;p:Knows all the words, sings anyway;p:Keeps the good chocolate hidden;r:Keen to learn;w:Knows when to listen',
  L: 'r:Loyal to the end;w:Laughs with their whole face;r:Leaves things better than they found them;w:Loves loudly;p:Late, but worth the wait;p:Lights up the back row;w:Listens first',
  M: 'w:Makes a house a home;p:Mischief in a good coat;r:Moves mountains quietly;p:Master of the perfect cup of tea;w:Means every word;p:More patient than they look;w:Makes time',
  N: 'w:Never too busy for you;r:Notices what others miss;p:Naps like a professional;p:Nobody tells a story better;w:Navigates by kindness;r:Not afraid to start again',
  O: 'w:Open heart, open door;r:One of a kind;p:Often right, rarely smug;r:Optimist with a plan;p:Owns too many books, happily;w:Offers the bigger half',
  P: 'w:Patient as a gardener;w:Proud of you, and says so;p:Perfectly stubborn;p:Plans the best days out;r:Persists when others stop;w:Puts people at ease;r:Problem-solver in chief',
  Q: 'w:Quick to laugh, slow to judge;r:Quietly remarkable;p:Quiz night would be lost without them;r:Questions everything, kindly;w:Quite simply the best company',
  R: 'r:Ready for anything;w:Remembers every birthday;p:Runs on tea and optimism;w:Real in a world of pretend;r:Refuses to give up;p:Rarely on time, always welcome;w:Reads the room and warms it',
  S: 'r:Strong where it matters;p:Sings in the car;w:Sees the best in people;w:Soft heart, steady hands;p:Sense of direction optional;r:Shows up, every time;w:Shares the umbrella',
  T: 'w:Thoughtful to a fault;r:Tells the truth gently;p:Tea first, questions later;w:There when it counts;r:Tries the hard way and gets there;p:Talks to every dog in the park;r:Trusted by everyone',
  U: 'r:Unshakeable when it matters;w:Understands without being told;p:Up for anything;w:Unfailingly kind;p:Usually right about the weather;r:Unique in the best way',
  V: 'r:Very much themselves;w:Voice you want to hear;p:Victorious at charades;w:Values people over things;r:Ventures where others hesitate;p:Vanishes when the washing-up starts',
  W: 'w:Warm as a kitchen in winter;r:Wise beyond the birthdays;p:Wins at hide and seek;w:Welcomes everyone in;r:Works hard, laughs harder;p:Will always share the chips;w:Wonders out loud',
  X: 'p:X marks the spot where the fun is;w:Xtra helping of kindness, always;p:X-ray vision for a fib;r:Xcels without showing off',
  Y: 'w:Young at heart;w:Your biggest supporter;p:Yes to adventure;p:Yawns contagiously;r:Years ahead in wisdom;w:You, exactly as you are',
  Z: 'w:Zest for every day;r:Zero patience for nonsense;p:Zigzags, and still arrives first;r:Zooms through a to-do list;p:Zzz champion on a Sunday',
};
const TONE = { warm: 'w', playful: 'p', proud: 'r' };

const el = { name: $('#np-name'), lines: $('#np-lines'), sign: $('#np-sign'), sheet: $('#np-sheet') };
if (!el.name.value) el.name.value = yourName.get();
let seed = Math.floor(Date.now() / 864e5);
let current = []; // [{ letter, text }]

const base = (ch) => ch.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
const letters = () => [...cleanText(el.name.value, 14)].filter((c) => /\p{L}/u.test(c));

function draft() {
  const tone = TONE[($('input[name="np-tone"]:checked') || {}).value] || 'w';
  const used = new Set();
  current = letters().map((ch, i) => {
    const all = (BANK[base(ch)] || '').split(';').filter(Boolean).map((s) => ({ tone: s[0], text: s.slice(2) }));
    const pick = shuffle(all, rng(hash(`${seed}-${i}-${ch}`)));
    const choice = pick.find((x) => x.tone === tone && !used.has(x.text)) || pick.find((x) => !used.has(x.text)) || pick[0];
    if (choice) used.add(choice.text);
    return { letter: ch.toUpperCase(), text: choice ? choice.text : '' };
  });
  el.lines.innerHTML = current.map((l, i) => `<div class="field" style="grid-template-columns:2rem 1fr;align-items:center;margin-bottom:.5rem"><label for="np-l${i}" style="font:800 1.5rem var(--serif);color:var(--berry)">${esc(l.letter)}<span class="visually-hidden"> line</span></label><input type="text" id="np-l${i}" data-i="${i}" maxlength="46" value="${esc(l.text)}"></div>`).join('') || '<p class="small">Type a name above.</p>';
  render();
}

function poemSvg() {
  const n = Math.max(current.length, 1);
  const W = 640, row = 66, top = 96, H = top + n * row + 120;
  const sign = cleanText(el.sign.value, 30);
  const rows = current.map((l, i) => {
    const y = top + i * row + 44;
    const rest = l.text && base(l.text[0]) === base(l.letter) ? l.text.slice(1) : l.text ? ` ${l.text}` : '';
    return `<text x="96" y="${y}" font-family="'Alegreya',serif" font-weight="800" font-size="54" fill="#b4174e" text-anchor="end">${esc(l.letter)}</text>` +
      `<text x="100" y="${y}" font-family="'Alegreya',serif" font-style="italic" font-weight="500" font-size="${fitFont(rest, 470, 28, 0.44)}" fill="#1b2a41">${esc(rest)}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Name poem for ${esc(cleanText(el.name.value, 14))}">` +
    `<rect width="${W}" height="${H}" fill="#fff"/><rect x="18" y="18" width="${W - 36}" height="${H - 36}" fill="none" stroke="#a8782a" stroke-width="2.5" stroke-dasharray="10 7" stroke-linecap="round"/>` +
    rows + (sign ? `<text x="${W - 60}" y="${H - 62}" font-family="'Sacramento',cursive" font-size="34" fill="#1b2a41" text-anchor="end">${esc(sign)}</text>` : '') + `</svg>`;
}

function render() { el.sheet.innerHTML = current.length ? poemSvg() : '<p class="small" style="padding:1rem">Type a name to draft the poem.</p>'; }
const asText = () => current.map((l) => (l.text && base(l.text[0]) === base(l.letter) ? l.text : `${l.letter}: ${l.text}`)).join('\n');

el.name.addEventListener('input', debounce(() => { yourName.set(cleanText(el.name.value, 18)); draft(); }, 150));
for (const r of $$('input[name="np-tone"]')) r.addEventListener('change', draft);
$('#np-shuffle').addEventListener('click', () => { seed += 1; draft(); announce('New lines drafted.'); });
el.lines.addEventListener('input', (e) => { const i = e.target.dataset.i; if (i != null) { current[i].text = cleanText(e.target.value, 46); render(); } });
el.sign.addEventListener('input', debounce(render, 80));
$('#np-print').addEventListener('click', () => window.print());
$('#np-copy').addEventListener('click', (e) => copyWithFeedback(e.currentTarget, asText()));
$('#np-png').addEventListener('click', async (e) => {
  if (!current.length) return;
  const btn = e.currentTarget;
  btn.disabled = true;
  try {
    const svg = await withFonts(poemSvg(), ['Alegreya', 'Sacramento']);
    const [, w, h] = /viewBox="0 0 (\d+) (\d+)"/.exec(svg);
    download(`name-poem-${slugify(el.name.value) || 'name'}.png`, await svgToPng(svg, { width: +w, height: +h, scale: 3, background: '#ffffff' }));
    announce('PNG downloaded.');
  } catch { announce('The picture could not be saved. Use Print instead.'); }
  btn.disabled = false;
});
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(render);
draft();
