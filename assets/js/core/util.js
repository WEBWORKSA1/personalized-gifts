// Small pure helpers shared by the browser tools and the site generator.

const ENT = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ENT[c]);

export const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

export const slugify = (s) =>
  String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** Trim, collapse spaces, strip control characters, cap the length. */
export function cleanText(s, max = 60) {
  return [...String(s ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim()]
    .slice(0, max).join('');
}

/** First letters of each word: "Ava Marie Rossi" -> ["A","M","R"]. */
export function initialsOf(name) {
  return cleanText(name, 80).split(/[\s-]+/).filter(Boolean)
    .map((w) => [...w][0].toLocaleUpperCase());
}

export const capitalise = (s) => {
  const t = cleanText(s, 80);
  return t ? [...t][0].toLocaleUpperCase() + [...t].slice(1).join('') : '';
};

/** Count what an engraver counts: every character including spaces. */
export const charCount = (s) => [...String(s ?? '')].length;

/**
 * Font size that lets `text` fit inside `maxWidth`, assuming an average glyph
 * width of `factor` em. Good enough for previews; the browser does the real layout.
 */
export function fitFont(text, maxWidth, base, factor = 0.56, min = 7) {
  const len = Math.max(1, charCount(text));
  const size = Math.min(base, maxWidth / (len * factor));
  return Math.max(min, Math.round(size * 10) / 10);
}

/** Stable small hash, used to rotate "idea of the day" without storing anything. */
export function hash(str) {
  let h = 2166136261;
  for (const ch of String(str)) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Seeded PRNG (mulberry32) for repeatable shuffles. */
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle(list, random = Math.random) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'];
export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const isoDate = (d) => d.toISOString().slice(0, 10);

/** Parse "YYYY-MM-DD" as a UTC date; returns null when it is not a real date. */
export function parseISO(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s ?? ''));
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3] ? d : null;
}

export const todayUTC = (now = new Date()) =>
  new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

export const addDays = (d, n) => new Date(d.getTime() + n * 864e5);
export const daysBetween = (a, b) => Math.round((b.getTime() - a.getTime()) / 864e5);

export function formatDate(d, style = 'long') {
  const day = d.getUTCDate(), mon = MONTHS[d.getUTCMonth()], yr = d.getUTCFullYear();
  if (style === 'short') return `${mon.slice(0, 3)} ${day}`;
  if (style === 'medium') return `${mon.slice(0, 3)} ${day}, ${yr}`;
  if (style === 'weekday') return `${WEEKDAYS[d.getUTCDay()]}, ${mon} ${day}, ${yr}`;
  return `${mon} ${day}, ${yr}`;
}

export const ordinal = (n) => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  return `${n}${['th', 'st', 'nd', 'rd'][n % 10] || 'th'}`;
};

export const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
