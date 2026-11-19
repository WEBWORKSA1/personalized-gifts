// Browser helpers shared by every page script.

export const root = document.documentElement.dataset.root || '';
export const $ = (sel, el = document) => el.querySelector(sel);
export const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

/** localStorage that never throws (private mode, blocked storage, full quota). */
export const store = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(`pg.${key}`);
      return v == null ? fallback : JSON.parse(v);
    } catch { return fallback; }
  },
  set(key, value) { try { localStorage.setItem(`pg.${key}`, JSON.stringify(value)); } catch { /* ignore */ } },
  del(key) { try { localStorage.removeItem(`pg.${key}`); } catch { /* ignore */ } },
};

/** The name typed on the home page follows the visitor to every tool. */
export const yourName = {
  get: () => String(store.get('name', '') || ''),
  set: (v) => store.set('name', String(v || '').slice(0, 60)),
};

export async function getJSON(path) {
  const res = await fetch(root + path, { credentials: 'omit' });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return res.json();
}

export const params = () => new URLSearchParams(location.search);

/** Keep the address bar in step with the tool so a result can be shared. */
export function setParams(obj) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(obj)) if (v !== '' && v != null && v !== false) p.set(k, v === true ? '1' : v);
  const q = p.toString();
  history.replaceState(null, '', q ? `?${q}` : location.pathname);
}

export function debounce(fn, ms = 150) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

export function download(filename, blob) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0;left:-999px';
    document.body.append(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

/** Copy, then say so on the button that was pressed. */
export async function copyWithFeedback(button, text) {
  const ok = await copyText(text);
  const was = button.dataset.label || button.textContent;
  button.dataset.label = was;
  button.textContent = ok ? 'Copied' : 'Copy failed';
  setTimeout(() => { button.textContent = was; }, 1600);
  return ok;
}

let live;
/** Announce a change to screen readers without moving focus. */
export function announce(message) {
  if (!live) {
    live = document.createElement('div');
    live.className = 'visually-hidden';
    live.setAttribute('aria-live', 'polite');
    document.body.append(live);
  }
  live.textContent = '';
  setTimeout(() => { live.textContent = message; }, 30);
}

// Self-hosted fonts, so downloads can carry the letterforms with them.
export const FONT_FILES = {
  'Alegreya': { file: 'alegreya-latin-wght-normal.woff2', weight: '400 900' },
  'Alegreya Sans': { file: 'alegreya-sans-latin-500-normal.woff2', weight: '500' },
  'Pinyon Script': { file: 'pinyon-script-latin-400-normal.woff2', weight: '400' },
  'Cinzel': { file: 'cinzel-latin-wght-normal.woff2', weight: '400 900' },
  'Bodoni Moda': { file: 'bodoni-moda-latin-wght-normal.woff2', weight: '400 900' },
  'Josefin Sans': { file: 'josefin-sans-latin-wght-normal.woff2', weight: '100 700' },
  'Special Elite': { file: 'special-elite-latin-400-normal.woff2', weight: '400' },
  'Sacramento': { file: 'sacramento-latin-400-normal.woff2', weight: '400' },
};

const fontData = new Map();
/** @font-face rules with the font files inlined, for standalone SVG and PNG files. */
export async function fontCss(families) {
  let css = '';
  for (const family of new Set(families)) {
    const def = FONT_FILES[family];
    if (!def) continue;
    if (!fontData.has(family)) {
      const buf = new Uint8Array(await (await fetch(`${root}assets/fonts/${def.file}`)).arrayBuffer());
      let bin = '';
      for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
      fontData.set(family, btoa(bin));
    }
    css += `@font-face{font-family:'${family}';font-weight:${def.weight};src:url(data:font/woff2;base64,${fontData.get(family)}) format('woff2')}`;
  }
  return css;
}

/** Put a <style> block with embedded fonts into an SVG string. */
export async function withFonts(svg, families) {
  const css = await fontCss(families);
  return css ? svg.replace(/(<svg[^>]*>)/, `$1<style>${css}</style>`) : svg;
}

/** Render an SVG string to a PNG blob. The SVG needs width and height attributes. */
export async function svgToPng(svg, { width, height, scale = 2, background = '' }) {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
  try {
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error('The picture could not be drawn.'));
      img.src = url;
    });
    // Give embedded fonts a moment to be applied inside the image.
    await new Promise((r) => setTimeout(r, 60));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const ctx = canvas.getContext('2d');
    if (background) { ctx.fillStyle = background; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return await new Promise((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('The picture could not be saved.'))), 'image/png'));
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Fill a <select> from [[value, label], ...]. */
export function fillSelect(select, options, selected = '') {
  select.innerHTML = options.map(([v, l]) => `<option value="${String(v).replace(/"/g, '&quot;')}">${l}</option>`).join('');
  if (selected !== '') select.value = String(selected);
}

/** The saved shortlist of gift ideas (ids only). */
export const shortlist = {
  all: () => store.get('shortlist', []),
  has: (id) => store.get('shortlist', []).includes(id),
  toggle(id) {
    const list = store.get('shortlist', []);
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    store.set('shortlist', next);
    return next.includes(id);
  },
};
