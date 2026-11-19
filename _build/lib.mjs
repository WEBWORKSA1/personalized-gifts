// Page shell and shared pieces for the generator. No dependencies.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import config from './config.mjs';
import { esc, slugify, formatDate } from '../assets/js/core/util.js';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export { config, esc, slugify };

// The public address: a CNAME file (written by GitHub when a custom domain is set) wins.
const cnameFile = path.join(ROOT, 'CNAME');
const cname = fs.existsSync(cnameFile) ? fs.readFileSync(cnameFile, 'utf8').trim() : '';
export const SITE_URL = (cname ? `https://${cname}` : config.defaultUrl).replace(/\/$/, '');
export const ON_OWN_DOMAIN = Boolean(cname);

export const NOW = new Date();
export const TODAY = new Date(Date.UTC(NOW.getUTCFullYear(), NOW.getUTCMonth(), NOW.getUTCDate()));
export const TODAY_ISO = TODAY.toISOString().slice(0, 10);
export const YEAR = TODAY.getUTCFullYear();
export const longDate = (iso) => formatDate(new Date(`${iso}T00:00:00Z`));

const written = [];
export const pages = []; // { url, title, desc, kind, keywords, lastmod, index }

export function write(rel, content) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const prev = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  if (prev !== content) fs.writeFileSync(file, content);
  written.push(rel);
}
export const writtenFiles = () => written.slice();

const fileHash = (rel) => {
  try { return crypto.createHash('sha1').update(fs.readFileSync(path.join(ROOT, rel))).digest('hex').slice(0, 8); } catch { return '0'; }
};
const CSS_V = fileHash('assets/css/site.css');

/** "" for the home page, "../" one level down, and so on. */
export const rootFor = (url) => '../'.repeat(url.split('/').filter(Boolean).length);

export const contactLink = (text) => `<a href="${config.contactHref}" rel="noopener">${text}</a>`;

const TAG_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 3h16a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H12L2 16z" fill="#b4174e"/><circle cx="10.5" cy="16" r="2.6" fill="#fff"/><path d="M17 11h8M17 16h8M17 21h5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 2.4"/></svg>';
const SEARCH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';

export function crumbs(items, root) {
  if (!items || !items.length) return '';
  return `<nav aria-label="Breadcrumb"><ol class="crumbs"><li><a href="${root}">Home</a></li>${items.map((c, i) =>
    i === items.length - 1 ? `<li aria-current="page">${esc(c[0])}</li>` : `<li><a href="${root}${c[1]}">${esc(c[0])}</a></li>`).join('')}</ol></nav>`;
}

export function pageHead({ title, lead = '', crumb = [], root }) {
  return `<div class="page-head"><div class="wrap">${crumbs(crumb, root)}<h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div></div>`;
}

export function faqBlock(faq, heading = 'Questions people ask') {
  if (!faq || !faq.length) return '';
  return `<section class="band"><div class="wrap"><h2>${heading}</h2><div class="faq">${faq.map(([q, a]) =>
    `<details><summary>${esc(q)}</summary><div><p>${a}</p></div></details>`).join('')}</div></div></section>`;
}

export const faqLd = (faq) => ({
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
});

/** An advert position. Renders nothing until a slot ID is set in config. */
export function ad(position) {
  const slot = config.adsense.slots[position];
  if (!slot) return '';
  return `<div class="ad no-print"><span class="ad__label">Advertisement</span><ins class="adsbygoogle" style="display:block" data-ad-client="${config.adsense.client}" data-ad-slot="${esc(slot)}" data-ad-format="auto" data-full-width-responsive="true"></ins></div>`;
}

export function quoteBand(root) {
  return `<section class="band band--blush"><div class="wrap split"><div><h2>Buying ten or more?</h2><p class="lead">Team gifts, wedding parties, client lists. Tell us what you need once and we pass your brief to suppliers who personalize in bulk.</p></div><div><ul><li>No fee and no obligation</li><li>Names, logos or both</li><li>Typical minimums and timelines shown before you send</li></ul><div class="btn-row"><a class="btn" href="${root}get-quotes/">Request quotes</a><a class="btn btn--quiet" href="${root}guides/bulk-personalized-gifts/">Read the bulk order guide</a></div></div></div></section>`;
}

const FOOT = [
  ['Find', [['Gift finder', 'gift-finder/'], ['Ideas by person and occasion', 'ideas/'], ['Occasion calendar', 'tools/occasion-calendar/'], ['Guides', 'guides/'], ['Videos', 'videos/']]],
  ['Make', [['Monogram maker', 'tools/monogram-maker/'], ['Engraving ideas', 'tools/engraving-ideas/'], ['Gift tag maker', 'tools/gift-tag-maker/'], ['Certificate maker', 'tools/gift-certificate-maker/'], ['All studio tools', 'tools/']]],
  ['Take part', [['Request bulk quotes', 'get-quotes/'], ['For makers and suppliers', 'for-makers/'], ['Monthly contest', 'contests/'], ['Support the site', 'support/'], ['Work with us', 'work-with-us/'], ['Newsletter', 'newsletter/']]],
  ['About', [['About', 'about/'], ['Contact', 'contact/'], ['Editorial policy', 'editorial-policy/'], ['Privacy', 'privacy/'], ['Cookies', 'cookies/'], ['Terms', 'terms/'], ['Disclaimer and trademarks', 'disclaimer/'], ['Accessibility', 'accessibility/'], ['Site map', 'sitemap/']]],
];

/**
 * Write one page. url is "" for home or "tools/monogram-maker/".
 * opts: title, desc, body, crumb, scripts[], ld[], type, noindex, noAds, lastmod, kind, keywords, file
 */
export function page(url, opts) {
  const root = rootFor(url);
  const canonical = `${SITE_URL}/${url}`;
  const fullTitle = url === '' ? `${config.name}: ${opts.title}` : `${opts.title} | ${config.name}`;
  const ld = [...(opts.ld || [])];
  if (opts.crumb && opts.crumb.length) {
    ld.push({
      '@type': 'BreadcrumbList',
      itemListElement: [['Home', ''], ...opts.crumb].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c[0], item: `${SITE_URL}/${c[1] ?? url}` })),
    });
  }
  const jsonLd = ld.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': ld }).replace(/</g, '\\u003c')}</script>` : '';
  const navHtml = config.nav.map((n) => `<li><a href="${root}${n.href}"${url.startsWith(n.href) ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('');
  const scripts = ['site', ...(opts.scripts || [])].map((s) => `<script type="module" src="${root}assets/js/${s}.js"></script>`).join('');
  const adsScript = opts.noAds ? '' : `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adsense.client}" crossorigin="anonymous"></script>`;
  const html = `<!doctype html>
<html lang="${config.locale}" data-root="${root}">
<head>
<meta charset="utf-8">
${opts.base ? `<base href="${SITE_URL}/">` : ''}<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(opts.desc)}">
${opts.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta name="google-adsense-account" content="${config.adsense.client}">
<meta property="og:site_name" content="${config.name}">
<meta property="og:type" content="${opts.type || 'website'}">
<meta property="og:title" content="${esc(opts.title)}">
<meta property="og:description" content="${esc(opts.desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE_URL}/assets/img/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${config.themeColor}">
<link rel="icon" href="${root}assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${root}assets/img/icon-180.png">
<link rel="manifest" href="${root}manifest.webmanifest">
<link rel="preload" href="${root}assets/fonts/alegreya-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${root}assets/fonts/alegreya-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${root}assets/css/site.css?v=${CSS_V}">
${adsScript}
${jsonLd}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="contact-bar"><a href="${config.contactHref}" rel="noopener">${esc(config.contactBarText)}</a></div>
<header class="site-header"><div class="wrap site-header__row">
<a class="wordmark" href="${root || './'}" aria-label="${config.name} home">${TAG_ICON}<span>${config.name}</span></a>
<button type="button" class="icon-btn menu-btn" aria-expanded="false" aria-controls="site-nav">Menu</button>
<nav id="site-nav" class="site-nav" aria-label="Main"><ul>${navHtml}<li class="nav-quotes"><a href="${root}get-quotes/">Get quotes for a group order</a></li></ul></nav>
<div class="header-tools"><button type="button" class="icon-btn" data-open-search aria-label="Search this site">${SEARCH_ICON}<span>Search</span></button><a class="btn btn--small" href="${root}get-quotes/">Get quotes</a></div>
</div></header>
<main id="main">
${opts.body}
</main>
<footer class="site-footer"><div class="wrap">
<div class="footer-grid">${FOOT.map(([h, links]) => `<div><h2>${h}</h2><ul>${links.map(([l, u]) => `<li><a href="${root}${u}">${l}</a></li>`).join('')}</ul></div>`).join('')}</div>
<div class="footer-legal">
<p>${config.name} is an independent site of free tools and guides. It sells nothing and is not affiliated with, sponsored by or endorsed by any retailer, marketplace or brand. "Personalized gifts" is used here as an ordinary description. All product names, logos and brands, including those in embedded videos and adverts, belong to their owners. See the <a href="${root}disclaimer/">trademark and copyright disclosure</a>.</p>
<p>Copyright <span data-year>${YEAR}</span> ${config.name}. ${contactLink('Advertising, sponsorship and partnership enquiries')}.</p>
</div></div></footer>
<dialog id="search-dialog" class="search-dialog" aria-label="Search this site"><form><label class="visually-hidden" for="search-input">Search</label><input type="search" id="search-input" placeholder="Search ideas, tools and guides" autocomplete="off"><button type="button" class="btn btn--quiet btn--small" data-close-search>Close</button></form><ul class="search-results" aria-live="polite"></ul></dialog>
<div id="cookie-notice" class="notice no-print" hidden><p>This site stores a few preferences on your device, and Google may use cookies to show adverts. <a href="${root}cookies/">How cookies are used</a></p><button type="button" class="btn btn--light btn--small">OK</button></div>
${scripts}
</body>
</html>
`;
  write(opts.file || `${url}index.html`, html);
  if (!opts.noindex) {
    pages.push({ url, title: opts.title, desc: opts.desc, kind: opts.kind || 'page', keywords: opts.keywords || '', lastmod: opts.lastmod || TODAY_ISO });
  }
}

/** Add ids to <h2> elements and return the contents list. */
export function withHeadingIds(html) {
  const toc = [];
  const out = html.replace(/<h2>(.*?)<\/h2>/g, (_, text) => {
    const id = slugify(text.replace(/<[^>]+>/g, ''));
    toc.push([id, text]);
    return `<h2 id="${id}">${text}</h2>`;
  });
  return { html: out, toc };
}
