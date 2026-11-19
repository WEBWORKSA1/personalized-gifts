// Gift-giving dates, computed rather than typed in, so the site never goes stale.
import { addDays, daysBetween, todayUTC } from './util.js';

const D = (y, m, d) => new Date(Date.UTC(y, m - 1, d));

/** Western Easter Sunday (anonymous Gregorian algorithm). */
export function easter(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return D(y, month, day);
}

/** nth given weekday of a month. weekday: 0 = Sunday. */
export function nthWeekday(y, m, weekday, n) {
  const shift = (weekday - D(y, m, 1).getUTCDay() + 7) % 7;
  return D(y, m, 1 + shift + (n - 1) * 7);
}

export function lastWeekday(y, m, weekday) {
  const last = new Date(Date.UTC(y, m, 0));
  return D(y, m, last.getUTCDate() - ((last.getUTCDay() - weekday + 7) % 7));
}

// Festivals that follow lunar calendars cannot be computed with simple rules.
// These are the published dates; years outside a table are simply left out.
const TABLES = {
  lunarNewYear: { 2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13], 2030: [2, 3], 2031: [1, 23], 2032: [2, 11], 2033: [1, 31], 2034: [2, 19], 2035: [2, 8] },
  eid: { 2027: [3, 10], 2028: [2, 27], 2029: [2, 15], 2030: [2, 5] },
  rakhi: { 2027: [8, 17], 2028: [8, 5], 2029: [8, 23], 2030: [8, 13] },
  diwali: { 2026: [11, 8], 2027: [10, 29], 2028: [10, 17], 2029: [11, 5], 2030: [10, 26] },
  hanukkah: { 2026: [12, 4], 2027: [12, 24], 2028: [12, 12], 2029: [12, 1], 2030: [12, 20] },
};
const fromTable = (name) => (y) => (TABLES[name][y] ? D(y, ...TABLES[name][y]) : null);
const fixed = (m, d) => (y) => D(y, m, d);

export const OCCASIONS = [
  { id: 'lunar-new-year', name: 'Lunar New Year', hub: 'lunar-new-year', where: 'East and Southeast Asia, worldwide', date: fromTable('lunarNewYear') },
  { id: 'valentines-day', name: "Valentine's Day", hub: 'valentines-day', where: 'Worldwide', date: fixed(2, 14) },
  { id: 'womens-day', name: "International Women's Day", hub: 'for-her', where: 'Worldwide', date: fixed(3, 8) },
  { id: 'eid', name: 'Eid al-Fitr', hub: 'eid', where: 'Worldwide', date: fromTable('eid'), note: 'Expected date; it depends on the sighting of the moon' },
  { id: 'mothers-day-uk', name: "Mother's Day in the UK and Ireland", hub: 'mothers-day', where: 'UK, Ireland', date: (y) => addDays(easter(y), -21) },
  { id: 'easter', name: 'Easter Sunday', hub: 'for-kids', where: 'Worldwide', date: easter },
  { id: 'admin-day', name: 'Administrative Professionals Day', hub: 'for-coworkers', where: 'United States, Canada', date: (y) => addDays(lastWeekday(y, 4, 6), -3) },
  { id: 'teacher-appreciation', name: 'Teacher Appreciation Day', hub: 'for-teachers', where: 'United States', date: (y) => addDays(nthWeekday(y, 5, 0, 1), 2) },
  { id: 'mothers-day', name: "Mother's Day", hub: 'mothers-day', where: 'US, Canada, Australia, India and many more', date: (y) => nthWeekday(y, 5, 0, 2) },
  { id: 'nurses-day', name: 'International Nurses Day', hub: 'thank-you', where: 'Worldwide', date: fixed(5, 12) },
  { id: 'fathers-day', name: "Father's Day", hub: 'fathers-day', where: 'US, UK, Canada, India and many more', date: (y) => nthWeekday(y, 6, 0, 3) },
  { id: 'friendship-day', name: 'International Day of Friendship', hub: 'for-friends', where: 'Worldwide', date: fixed(7, 30) },
  { id: 'raksha-bandhan', name: 'Raksha Bandhan', hub: null, where: 'India, worldwide', date: fromTable('rakhi'), note: 'Can fall a day apart by region' },
  { id: 'fathers-day-au', name: "Father's Day in Australia and New Zealand", hub: 'fathers-day', where: 'Australia, New Zealand', date: (y) => nthWeekday(y, 9, 0, 1) },
  { id: 'grandparents-day', name: 'Grandparents Day', hub: 'for-grandparents', where: 'United States', date: (y) => addDays(nthWeekday(y, 9, 1, 1), 6) },
  { id: 'world-teachers-day', name: "World Teachers' Day", hub: 'for-teachers', where: 'Worldwide', date: fixed(10, 5) },
  { id: 'bosss-day', name: "Boss's Day", hub: 'for-coworkers', where: 'United States', date: fixed(10, 16) },
  { id: 'diwali', name: 'Diwali', hub: 'diwali', where: 'India, worldwide', date: fromTable('diwali'), note: 'Can fall a day apart by region' },
  { id: 'thanksgiving', name: 'Thanksgiving', hub: 'thank-you', where: 'United States', date: (y) => nthWeekday(y, 11, 4, 4) },
  { id: 'hanukkah', name: 'Hanukkah begins', hub: 'hanukkah', where: 'Worldwide', date: fromTable('hanukkah'), note: 'Begins at sundown' },
  { id: 'christmas', name: 'Christmas Day', hub: 'christmas', where: 'Worldwide', date: fixed(12, 25) },
];

/**
 * How long before the day to start, by how the gift is made. Rules of thumb drawn
 * from the production times makers publish; a maker's own cut-off always wins.
 */
export const LEAD_TIMES = [
  { id: 'custom', label: 'Custom art and handmade', days: 28 },
  { id: 'stitched', label: 'Engraved and embroidered', days: 14 },
  { id: 'printed', label: 'Printed and photo gifts', days: 10 },
  { id: 'printable', label: 'Printables you make yourself', days: 0 },
];

/** Next occurrences on or after `from`, soonest first. */
export function upcoming(from = todayUTC(), limit = 8) {
  const y = from.getUTCFullYear();
  const out = [];
  for (const o of OCCASIONS) {
    for (const year of [y, y + 1]) {
      const date = o.date(year);
      if (date && date >= from) {
        out.push({ id: o.id, name: o.name, hub: o.hub, where: o.where, note: o.note || '', date, days: daysBetween(from, date) });
        break;
      }
    }
  }
  return out.sort((a, b) => a.date - b.date).slice(0, limit);
}

/** Order-by dates for one occasion date. */
export function orderBy(date, from = todayUTC()) {
  return LEAD_TIMES.map((l) => {
    const by = addDays(date, -l.days);
    return { ...l, by, passed: by < from };
  });
}
