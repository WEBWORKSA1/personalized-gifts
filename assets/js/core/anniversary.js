// Wedding anniversary themes by year, traditional and modern, each with one
// way to personalise it. Checked against two published year-by-year lists.
import { daysBetween, todayUTC } from './util.js';

export const ANNIVERSARIES = [
  [1, 'Paper', 'Clocks', 'Your vows or first-dance title printed and framed, or a letter to open on year ten.'],
  [2, 'Cotton', 'China', 'Embroidered pillowcases or robes with both initials and the wedding date.'],
  [3, 'Leather', 'Crystal or glass', 'A leather luggage tag, wallet or journal stamped with initials.'],
  [4, 'Fruit or flowers (linen or silk in the UK)', 'Appliances', 'A fruit tree with an engraved plant marker, or a linen napkin set with a monogram.'],
  [5, 'Wood', 'Silverware', 'A cutting board or keepsake box carved with names and the year you married.'],
  [6, 'Iron (sugar in the UK)', 'Wood', 'A cast-iron pan with an engraved handle, or iced biscuits with your names.'],
  [7, 'Wool or copper', 'Desk sets', 'A copper mug or bracelet engraved with the coordinates of the venue.'],
  [8, 'Bronze or pottery', 'Linen or lace', 'A hand-thrown mug or bowl stamped with a date on the base.'],
  [9, 'Pottery or willow', 'Leather', 'A willow basket with a leather tag, or a planter painted with your family name.'],
  [10, 'Tin or aluminium', 'Diamond jewellery', 'A tin of ten handwritten notes, one for each year.'],
  [11, 'Steel', 'Fashion jewellery', 'A stainless-steel watch or flask engraved on the back.'],
  [12, 'Silk or linen', 'Pearls', 'A silk scarf or pocket square with an embroidered initial.'],
  [13, 'Lace', 'Textiles or faux fur', 'A throw blanket woven with names, or a framed piece of the wedding lace.'],
  [14, 'Ivory (today an ethical stand-in such as an elephant motif)', 'Gold jewellery', 'A small gold pendant engraved with one word that is yours.'],
  [15, 'Crystal', 'Watches', 'Engraved glasses for the two of you, or a watch with a message on the case back.'],
  [16, 'Wax', 'Silver holloware', 'A candle with a custom label naming the day and place.'],
  [17, 'Furniture', 'Furniture', 'A brass plaque for the chair, bench or table you buy together.'],
  [18, 'Porcelain', 'Porcelain', 'A porcelain ring dish painted with both initials.'],
  [19, 'Bronze', 'Bronze', 'A bronze-finish frame holding a photo from year one beside one from this year.'],
  [20, 'China', 'Platinum', 'A plate or platter painted with twenty years of names, places and dates.'],
  [21, 'Brass or nickel', 'Brass or nickel', 'A brass key ring or door knocker engraved with the house name.'],
  [22, 'Copper', 'Copper', 'A copper cuff with a line from your vows on the inside.'],
  [23, 'Silver plate', 'Silver plate', 'A silver-plated frame or tray with a short engraved dedication.'],
  [24, 'Musical instruments', 'Musical instruments', 'Engraved guitar picks, or a music box that plays your song.'],
  [25, 'Silver', 'Silver', 'A silver frame or bangle engraved with the date in Roman numerals.'],
  [30, 'Pearl', 'Diamond', 'A pearl pendant on a chain with an engraved clasp tag.'],
  [35, 'Coral', 'Jade', 'A coral-coloured print of the map where you married.'],
  [40, 'Ruby', 'Ruby', 'A ruby-red photo book of forty years, one page a year.'],
  [45, 'Sapphire', 'Sapphire', 'A star map of the night you married, printed in deep blue.'],
  [50, 'Gold', 'Gold', 'A gold-foil family tree with every child and grandchild named.'],
  [55, 'Emerald', 'Emerald', 'An emerald-green keepsake box filled with letters from the family.'],
  [60, 'Diamond', 'Diamond', 'A framed timeline of sixty years with a photo from each decade.'],
  [70, 'Platinum', 'Platinum', 'A recorded family message, with its sound wave printed and framed.'],
].map(([year, traditional, modern, idea]) => ({ year, traditional, modern, idea }));

export const themeFor = (year) => ANNIVERSARIES.find((a) => a.year === year) || null;

/** The next anniversary for a wedding date, relative to `from`. */
export function nextAnniversary(wedding, from = todayUTC()) {
  let years = from.getUTCFullYear() - wedding.getUTCFullYear();
  const at = (n) => new Date(Date.UTC(wedding.getUTCFullYear() + n, wedding.getUTCMonth(), wedding.getUTCDate()));
  if (at(years) < from) years += 1;
  if (years < 1) years = 1;
  const date = at(years);
  // Feb 29 weddings roll to Mar 1 in ordinary years, which Date.UTC does for us.
  const milestone = ANNIVERSARIES.find((a) => a.year >= years) || null;
  return { years, date, days: daysBetween(from, date), theme: themeFor(years), nextThemed: milestone };
}
