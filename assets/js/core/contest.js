// The monthly contest sets itself: one brief per calendar month, closing on the last day.
import { MONTHS } from './util.js';

export const ROUNDS = [
  ['A line for a fresh start', 'Write one line to engrave on a gift for someone beginning something new.', 30],
  ['Six words of love', 'Write an inscription for a partner in six words or fewer.', 36],
  ['Words for a mother', 'Write one line for a gift to a mother or the person who mothered you.', 36],
  ['Thank a teacher', 'Write one line for a tag on a teacher’s end-of-year gift.', 42],
  ['Send off a graduate', 'Write one line to engrave for someone leaving school or university.', 30],
  ['On dad’s tools', 'Write one line to burn into the handle of a father’s favourite tool.', 24],
  ['The coupon nobody refuses', 'Write one personal coupon: a promise someone would be delighted to cash in.', 44],
  ['Name the candle', 'Invent a name for a homemade candle or jar made for one particular person.', 30],
  ['For a grandparent’s frame', 'Write one line for the plate on a frame given to a grandparent.', 30],
  ['The funniest pet tag', 'Write the back of a collar tag. Funny, and still useful if the pet gets lost.', 28],
  ['For the hardest person to buy for', 'Write the gift tag line for the person who wants nothing.', 42],
  ['A first ornament', 'Write one line for an ornament that marks a first: first home, first baby, first year.', 30],
].map(([title, brief, limit]) => ({ title, brief, limit }));

/** The round running on `now`, with its closing and results dates (UTC). */
export function currentRound(now = new Date()) {
  const y = now.getUTCFullYear(), m = now.getUTCMonth();
  const closes = new Date(Date.UTC(y, m + 1, 0));
  const results = new Date(Date.UTC(y, m + 1, 10));
  return { id: `${y}-${String(m + 1).padStart(2, '0')}`, label: `${MONTHS[m]} ${y}`, ...ROUNDS[m], closes, results, next: ROUNDS[(m + 1) % 12] };
}
