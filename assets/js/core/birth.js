// Birth month symbols. The birthstone list is the modern jewellers' list
// (first standardised in 1912, revised in 1952, 2002 and 2016) with the older
// traditional stone noted where it differs.
import { WEEKDAYS } from './util.js';

export const BIRTH_MONTHS = [
  { month: 'January', stones: ['Garnet'], alt: [], color: 'deep red', hex: '#8e1b2c', flowers: ['Carnation', 'Snowdrop'], meaning: 'loyalty and safe travels' },
  { month: 'February', stones: ['Amethyst'], alt: [], color: 'violet', hex: '#7d4bb3', flowers: ['Violet', 'Primrose'], meaning: 'calm and clear thinking' },
  { month: 'March', stones: ['Aquamarine'], alt: ['Bloodstone'], color: 'pale sea blue', hex: '#7fc8d6', flowers: ['Daffodil', 'Jonquil'], meaning: 'courage and fresh starts' },
  { month: 'April', stones: ['Diamond'], alt: [], color: 'clear white', hex: '#dfe8ee', flowers: ['Daisy', 'Sweet pea'], meaning: 'strength and lasting love' },
  { month: 'May', stones: ['Emerald'], alt: [], color: 'rich green', hex: '#1f8a5b', flowers: ['Lily of the valley', 'Hawthorn'], meaning: 'growth and good fortune' },
  { month: 'June', stones: ['Pearl', 'Alexandrite', 'Moonstone'], alt: [], color: 'soft white', hex: '#efe9df', flowers: ['Rose', 'Honeysuckle'], meaning: 'sincerity and new beginnings' },
  { month: 'July', stones: ['Ruby'], alt: [], color: 'bright red', hex: '#c1123a', flowers: ['Larkspur', 'Water lily'], meaning: 'passion and protection' },
  { month: 'August', stones: ['Peridot', 'Spinel'], alt: ['Sardonyx'], color: 'lime green', hex: '#a3c43a', flowers: ['Gladiolus', 'Poppy'], meaning: 'warmth and friendship' },
  { month: 'September', stones: ['Sapphire'], alt: [], color: 'deep blue', hex: '#1f4ea8', flowers: ['Aster', 'Morning glory'], meaning: 'wisdom and trust' },
  { month: 'October', stones: ['Opal', 'Tourmaline'], alt: [], color: 'shifting pastels', hex: '#e2a6c4', flowers: ['Marigold', 'Cosmos'], meaning: 'creativity and hope' },
  { month: 'November', stones: ['Topaz', 'Citrine'], alt: [], color: 'golden amber', hex: '#e2a22b', flowers: ['Chrysanthemum'], meaning: 'joy and generosity' },
  { month: 'December', stones: ['Turquoise', 'Tanzanite', 'Zircon'], alt: ['Lapis lazuli'], color: 'sky blue', hex: '#2aa7c9', flowers: ['Narcissus', 'Holly'], meaning: 'luck and calm' },
];

// Sun signs with the usual start dates. The exact day can shift by one between years.
const SIGNS = [
  ['Capricorn', 1, 1, 'earth'], ['Aquarius', 1, 20, 'air'], ['Pisces', 2, 19, 'water'], ['Aries', 3, 21, 'fire'],
  ['Taurus', 4, 20, 'earth'], ['Gemini', 5, 21, 'air'], ['Cancer', 6, 21, 'water'], ['Leo', 7, 23, 'fire'],
  ['Virgo', 8, 23, 'earth'], ['Libra', 9, 23, 'air'], ['Scorpio', 10, 23, 'water'], ['Sagittarius', 11, 22, 'fire'],
  ['Capricorn', 12, 22, 'earth'],
];

export function zodiac(month, day) {
  let found = SIGNS[0];
  for (const s of SIGNS) if (month > s[1] || (month === s[1] && day >= s[2])) found = s;
  return { sign: found[0], element: found[3] };
}

const ANIMALS = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

/** Animal for the lunar year that begins in `year`. 2020 was a Rat year. */
export const lunarAnimal = (year) => ANIMALS[(((year - 2020) % 12) + 12) % 12];

/** Everything the finder shows for one birth date (UTC date). */
export function birthProfile(date) {
  const m = date.getUTCMonth(), d = date.getUTCDate(), y = date.getUTCFullYear();
  const info = BIRTH_MONTHS[m];
  const early = m === 0 || (m === 1 && d <= 20);
  return {
    ...info,
    zodiac: zodiac(m + 1, d),
    weekday: WEEKDAYS[date.getUTCDay()],
    animal: lunarAnimal(y),
    previousAnimal: early ? lunarAnimal(y - 1) : null,
  };
}
