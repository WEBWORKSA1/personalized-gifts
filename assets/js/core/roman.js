// Dates and places written the way engravers set them.

const NUMERALS = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];

export function toRoman(n) {
  n = Math.floor(Number(n));
  if (!Number.isFinite(n) || n < 1 || n > 3999) return '';
  let out = '';
  for (const [v, s] of NUMERALS) while (n >= v) { out += s; n -= v; }
  return out;
}

export function fromRoman(s) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const str = String(s).toUpperCase().trim();
  if (!/^[IVXLCDM]+$/.test(str)) return null;
  let total = 0;
  for (let i = 0; i < str.length; i++) {
    const v = map[str[i]], next = map[str[i + 1]] || 0;
    total += v < next ? -v : v;
  }
  return toRoman(total) === str ? total : null;
}

export const SEPARATORS = { dot: '.', middot: ' · ', dash: '-', slash: '/', space: ' ' };

/**
 * A calendar date in Roman numerals or digits.
 * order: 'dmy' | 'mdy' | 'ymd'; style: 'roman' | 'digits'; shortYear drops the century.
 */
export function formatDateParts({ day, month, year }, { order = 'dmy', sep = 'dot', style = 'roman', shortYear = false, pad = true } = {}) {
  const yy = shortYear ? year % 100 : year;
  const conv = (n, isYear) => {
    if (style === 'roman') return toRoman(n) || (isYear ? 'N' : '');
    return !isYear && pad ? String(n).padStart(2, '0') : isYear && shortYear ? String(n).padStart(2, '0') : String(n);
  };
  const parts = { d: conv(day), m: conv(month), y: conv(yy, true) };
  return order.split('').map((k) => parts[k]).join(SEPARATORS[sep] ?? '.');
}

/** Decimal degrees to degrees, minutes and seconds. */
function dms(value, pos, neg) {
  const hemi = value < 0 ? neg : pos;
  let abs = Math.abs(value);
  let deg = Math.floor(abs);
  let min = Math.floor((abs - deg) * 60);
  let sec = Math.round(((abs - deg) * 60 - min) * 60);
  if (sec === 60) { sec = 0; min += 1; }
  if (min === 60) { min = 0; deg += 1; }
  return { deg, min, sec, hemi };
}

/** Parse "40.7128, -74.0060" or "40.7128 N 74.0060 W". Returns null if out of range. */
export function parseCoords(input) {
  const s = String(input ?? '').trim().toUpperCase().replace(/[°′″'"]/g, ' ');
  const m = /^(-?\d+(?:\.\d+)?)\s*([NS])?[\s,;]+(-?\d+(?:\.\d+)?)\s*([EW])?$/.exec(s);
  if (!m) return null;
  let lat = parseFloat(m[1]), lng = parseFloat(m[3]);
  if (m[2] === 'S') lat = -Math.abs(lat);
  if (m[4] === 'W') lng = -Math.abs(lng);
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return { lat, lng };
}

export function formatCoords({ lat, lng }, style = 'dms') {
  const a = dms(lat, 'N', 'S'), b = dms(lng, 'E', 'W');
  if (style === 'decimal') {
    return `${Math.abs(lat).toFixed(4)}° ${a.hemi}, ${Math.abs(lng).toFixed(4)}° ${b.hemi}`;
  }
  if (style === 'compact') {
    return `${Math.abs(lat).toFixed(3)}${a.hemi} ${Math.abs(lng).toFixed(3)}${b.hemi}`;
  }
  const one = (p) => `${p.deg}°${String(p.min).padStart(2, '0')}′${String(p.sec).padStart(2, '0')}″${p.hemi}`;
  return `${one(a)} ${one(b)}`;
}
