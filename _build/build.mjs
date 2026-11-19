// Builds every page of the site from the content modules. Run: node _build/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import {
  ROOT, SITE_URL, ON_OWN_DOMAIN, TODAY, TODAY_ISO, YEAR, config, esc, page, pages, write, pageHead, faqBlock, faqLd,
  ad, quoteBand, withHeadingIds, longDate, contactLink,
} from './lib.mjs';
import { IDEAS } from './content/ideas.mjs';
import { HUBS, HUB_GROUPS } from './content/hubs.mjs';
import { INSCRIPTIONS } from './content/inscriptions.mjs';
import { GUIDES_A } from './content/guides-a.mjs';
import { GUIDES_B } from './content/guides-b.mjs';
import { TOOLS } from './content/tools.mjs';
import { buildBusinessPages } from './pages-biz.mjs';
import { upcoming, orderBy } from '../assets/js/core/occasions.js';
import { workbench } from '../assets/js/core/mockups.js';
import { ideaCard } from '../assets/js/core/cards.js';
import { BIRTH_MONTHS } from '../assets/js/core/birth.js';
import { ANNIVERSARIES } from '../assets/js/core/anniversary.js';
import { formatDateParts } from '../assets/js/core/roman.js';
import { arrange, monogramSvg } from '../assets/js/core/monogram.js';
import { currentRound } from '../assets/js/core/contest.js';
import { formatDate, hash, ordinal, plural, MONTHS } from '../assets/js/core/util.js';

const GUIDES = [...GUIDES_A, ...GUIDES_B];
const tool = (slug) => TOOLS.find((t) => t.slug === slug);
const guide = (slug) => GUIDES.find((g) => g.slug === slug);
const ideasFor = (hub) => IDEAS.filter((i) => (hub.group === 'recipient' ? i.recipients.includes(hub.key) || i.recipients.includes('anyone')
  : hub.group === 'occasion' ? i.occasions.includes(hub.key) || (i.occasions.includes('any') && ['birthday', 'christmas'].includes(hub.key))
    : i.types.includes(hub.key)));

let videoData = { updated: '', videos: [] };
try { videoData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/videos.json'), 'utf8')); } catch { /* first build */ }
const videoCard = (v) => `<li class="video"><div class="video__frame" data-yt="${esc(v.id)}"><img src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" loading="lazy" width="480" height="360"><button type="button" class="video__play" aria-label="Play: ${esc(v.title)}"><span></span></button></div><h3>${esc(v.title)}</h3><p>${esc(v.channel)}${v.published ? `, ${formatDate(new Date(v.published), 'medium')}` : ''}</p></li>`;

const dateItem = (o) => `<li class="date"><span class="date__when">${formatDate(o.date, 'short')}</span><span class="date__name">${o.hub ? `<a href="{root}ideas/${o.hub}/">${esc(o.name)}</a>` : esc(o.name)}</span><span class="date__count" data-countdown="${o.date.toISOString().slice(0, 10)}">in ${plural(o.days, 'day')}</span>` +
  `<ul class="date__by">${orderBy(o.date, TODAY).filter((l) => l.days > 0).map((l) => `<li${l.passed ? ' class="is-passed"' : ''}><span>${l.label}</span><span>${l.passed ? 'too late' : `by ${formatDate(l.by, 'short')}`}</span></li>`).join('')}</ul></li>`;

// ---------- Home ----------
function home() {
  const root = '';
  const next = upcoming(TODAY, 4);
  const bench = workbench('Ava');
  const monthInfo = BIRTH_MONTHS[TODAY.getUTCMonth()];
  const todayRoman = formatDateParts({ day: TODAY.getUTCDate(), month: TODAY.getUTCMonth() + 1, year: YEAR });
  const mono = monogramSvg({ letters: arrange({ style: 'single', first: 'Ava' }).letters, font: 'didone', frame: 'rings', color: '#77551a' });
  const samples = {
    'engraving-ideas': '<span class="stitched">Ava, always</span>',
    'monogram-maker': mono,
    'gift-tag-maker': 'To <span class="stitched">Ava</span>, with love',
    'gift-certificate-maker': 'For <span class="stitched">Ava</span>: one Saturday, your choice',
    'name-poem-generator': 'One line for each letter of <span class="stitched">Ava</span>',
    'birthstone-birth-flower-finder': `${monthInfo.month}: ${monthInfo.stones[0].toLowerCase()} and ${monthInfo.flowers[0].toLowerCase()}`,
    'anniversary-gifts-by-year': 'First paper, fifth wood, twenty-fifth silver',
    'roman-numeral-date-converter': `Today is ${todayRoman}`,
    'gift-exchange-generator': 'Only <span class="stitched">Ava</span> sees who Ava drew',
    'gift-list-planner': '<span class="stitched">Ava</span>, birthday, ordered',
    'occasion-calendar': `${esc(next[0].name)} is in ${plural(next[0].days, 'day')}`,
    'photo-print-size-calculator': '4032 x 3024 pixels prints sharp up to 13 x 10 in',
  };
  const day = Math.floor(TODAY.getTime() / 864e5);
  const picks = IDEAS.slice().sort((a, b) => hash(a.id + day) - hash(b.id + day)).slice(0, 3);
  const round = currentRound(TODAY);
  const body = `
<section class="band band--mist"><div class="wrap hero">
<div>
<h1>Make it theirs.</h1>
<p class="lead">Type a name and watch it land on a gift. Then find the right idea, the right words and the right order for the initials.</p>
<div class="name-field"><label for="hero-name">Whose gift is it?</label><input type="text" id="hero-name" maxlength="18" autocomplete="off" autocapitalize="words" spellcheck="false" placeholder="Ava"></div>
<div class="btn-row"><a class="btn" id="hero-find" href="gift-finder/">Find a gift for <span data-your-name data-default="Ava">Ava</span></a><a class="btn btn--quiet" href="tools/monogram-maker/">Make a monogram</a></div>
<p class="small" style="margin-top:1rem">Free to use. No account. What you type stays on your device.</p>
</div>
<ul class="bench" id="bench" aria-label="The name shown on five gifts">${bench.map((b) => `<li data-mock="${b.id}"><figure>${b.svg}<figcaption>${b.label}</figcaption></figure></li>`).join('')}</ul>
</div></section>
${ad('top')}
<section class="band"><div class="wrap">
<div class="band__head"><h2>Coming up</h2><p>Personalized gifts are made to order. These are the dates to order by, depending on how the gift is made.</p></div>
<ul class="dates" id="home-dates">${next.map(dateItem).join('').replaceAll('{root}', root)}</ul>
<p style="margin-top:1.25rem"><a href="tools/occasion-calendar/">See the full calendar and add your own dates</a></p>
</div></section>
<section class="band band--mist"><div class="wrap">
<div class="band__head"><h2>The studio</h2><p>Twelve free tools for the decisions shops leave to you. Each one opens with the name you typed above.</p></div>
<ul class="tool-list">${TOOLS.map((t) => `<li class="tool-row"><div><h3><a href="tools/${t.slug}/">${t.name}</a></h3><p>${t.short}</p></div><div class="tool-row__sample" data-sample="${t.slug}">${samples[t.slug] || ''}</div></li>`).join('')}</ul>
</div></section>
${ad('inContent')}
<section class="band"><div class="wrap">
<div class="band__head"><h2>Ideas by person, occasion and craft</h2><p>${IDEAS.length} ideas, each with a note on what to put on it.</p></div>
<div class="cols">${HUB_GROUPS.map((g) => `<div><h3>${g.title}</h3><ul class="pill-links">${HUBS.filter((h) => h.group === g.id).map((h) => `<li><a href="ideas/${h.slug}/">${h.label}</a></li>`).join('')}</ul></div>`).join('')}</div>
<h3 style="margin-top:2.5rem">Three for today</h3>
<ul class="tags" id="home-picks">${picks.map((i) => ideaCard(i, { root })).join('')}</ul>
</div></section>
${quoteBand(root)}
<section class="band"><div class="wrap split">
<div><h2>Guides</h2><ul class="guide-list">${GUIDES.slice(0, 5).map((g) => `<li><h3><a href="guides/${g.slug}/">${esc(g.title)}</a></h3><p>${esc(g.desc)}</p></li>`).join('')}</ul><p style="margin-top:1rem"><a href="guides/">All ${GUIDES.length} guides</a></p></div>
<div><h2>Watch and make</h2>${videoData.videos.length ? `<ul class="videos">${videoData.videos.slice(0, 2).map(videoCard).join('')}</ul>` : '<p>Step-by-step videos for cutting, stamping, stitching and engraving at home, refreshed automatically.</p>'}<p style="margin-top:1rem"><a href="videos/">More how-to videos</a></p></div>
</div></section>
<section class="band band--ink"><div class="wrap cols">
<div><h2>This month’s contest</h2><p class="lead">${esc(round.title)}</p><p>${esc(round.brief)} Entries close ${formatDate(round.closes)}.</p><a class="btn btn--light" href="contests/">Enter the contest</a></div>
<div><h2>Get the dates by email</h2><p>An occasional note before the big gift days, with new tools and contest results.</p><a class="btn btn--light" href="newsletter/">Join the list</a></div>
<div><h2>Keep it free</h2><p>Supporters pay for hosting, new tools, contest prizes and the people who make them.</p><a class="btn btn--light" href="support/">Support the site</a></div>
</div></section>
${faqBlock(HOME_FAQ)}
${ad('beforeFooter')}`;
  page('', {
    title: 'Free tools and ideas for personalized gifts',
    desc: config.description,
    body,
    scripts: ['home'],
    kind: 'home',
    ld: [
      { '@type': 'WebSite', name: config.name, url: `${SITE_URL}/`, description: config.description },
      { '@type': 'Organization', name: config.name, url: `${SITE_URL}/`, logo: `${SITE_URL}/assets/img/icon-512.png` },
      faqLd(HOME_FAQ),
    ],
  });
}

const HOME_FAQ = [
  ['What counts as a personalized gift?', 'Any gift that carries something particular to the person: a name, initials, a date, a place, a photograph or their own handwriting. It can be engraved, stitched, printed or made by hand.'],
  ['Does Personalized.Gifts sell gifts?', 'No. It is a free set of tools and guides. You decide what to give and what it should say here, then buy from any maker or shop you choose, or make it yourself.'],
  ['How early should I order a personalized gift?', 'As a rule, 10 days ahead for printed gifts, 14 for engraved or embroidered gifts and 28 for custom art. The <a href="tools/occasion-calendar/">occasion calendar</a> works out the dates for you.'],
  ['What should I engrave?', 'A name and a date is always enough. For a line, keep it under six words and in your own voice. The <a href="tools/engraving-ideas/">engraving ideas tool</a> suggests lines that fit the space.'],
  ['In what order do monogram initials go?', 'With a larger centre letter: first name, surname, middle name. With letters all one size: first, middle, surname. The <a href="tools/monogram-maker/">monogram maker</a> arranges them for you.'],
  ['Is it really free?', 'Yes. The site is paid for by advertising, supplier referrals, sponsorship and supporters. There is no account and no charge for any tool or download.'],
];

// ---------- Gift finder ----------
function finder() {
  const url = 'gift-finder/', root = '../';
  const faq = [
    ['How does the gift finder choose?', `It scores ${IDEAS.length} ideas against the five things you tell it: who the gift is for, the occasion, your budget, their interests and how soon you need it.`],
    ['Does it recommend shops or products?', 'No. It suggests kinds of gift and what to put on each one. You choose where to buy or whether to make it.'],
    ['Are my answers stored?', 'Only in the page address, so that you can share or bookmark your results, and saved ideas stay in your browser.'],
  ];
  const body = `${pageHead({ title: 'Gift finder', lead: 'Five questions about them, not about products. You get ideas matched to the person, each with what to put on it.', crumb: [['Gift finder']], root })}
<section class="band"><div class="wrap">
<div id="gf-quiz" class="panel" hidden><ol class="steps" id="gf-steps"></ol><div id="gf-step"></div><div class="btn-row" style="margin-top:1.25rem"><button type="button" class="btn btn--quiet btn--small" id="gf-back">Back</button><button type="button" class="link" id="gf-skip">Skip to the ideas</button></div></div>
<div id="gf-results" hidden>
<div class="band__head"><h2 id="gf-heading" tabindex="-1">Ideas</h2><div class="btn-row"><button type="button" class="btn btn--quiet btn--small" id="gf-restart">Start again</button><button type="button" class="btn btn--quiet btn--small" id="gf-share">Copy a link to these results</button></div></div>
<form id="gf-refine" class="row no-print" aria-label="Change your answers"><div class="field"><label for="gf-r">For</label><select id="gf-r"></select></div><div class="field"><label for="gf-o">Occasion</label><select id="gf-o"></select></div><div class="field"><label for="gf-b">Budget</label><select id="gf-b"></select></div><div class="field"><label for="gf-d">Needed</label><select id="gf-d"></select></div></form>
<ul id="gf-list" class="tags"></ul>
</div>
<noscript><p>The gift finder needs JavaScript. You can still <a href="../ideas/">browse every idea by person, occasion and craft</a>.</p></noscript>
<div id="gf-saved" hidden style="margin-top:3rem"><div class="band__head"><h2>Saved ideas</h2><button type="button" class="btn btn--quiet btn--small" id="gf-copy-saved">Copy the list</button></div><ul class="tags" id="gf-saved-list"></ul></div>
</div></section>
${ad('inContent')}
${quoteBand(root)}
${faqBlock(faq)}`;
  page(url, { title: 'Gift finder: personalized gift ideas matched to the person', desc: 'Answer five questions about the person and get personalized gift ideas with what to engrave, stitch or print on each.', body, crumb: [['Gift finder']], scripts: ['finder-page'], kind: 'tool', keywords: 'quiz gift ideas finder', ld: [faqLd(faq)] });
}

// ---------- Ideas ----------
function ideas() {
  const root = '../';
  const body = `${pageHead({ title: 'Personalized gift ideas', lead: `${IDEAS.length} ideas sorted three ways. Every one comes with a note on what to put on it.`, crumb: [['Ideas']], root })}
<section class="band"><div class="wrap">
${HUB_GROUPS.map((g) => `<h2>${g.title}</h2><ul class="guide-list" style="margin-bottom:2.5rem">${HUBS.filter((h) => h.group === g.id).map((h) => `<li><h3><a href="${h.slug}/">${esc(h.title)}</a></h3><p>${esc(h.desc)}</p><span class="small">${plural(ideasFor(h).length, 'idea')}</span></li>`).join('')}</ul>`).join('')}
<p><a class="btn" href="../gift-finder/">Or answer five questions in the gift finder</a></p>
</div></section>${quoteBand(root)}`;
  page('ideas/', { title: 'Personalized gift ideas by person, occasion and craft', desc: `Browse ${IDEAS.length} personalized gift ideas by who they are for, the occasion and how they are made.`, body, crumb: [['Ideas']], kind: 'hub' });

  for (const h of HUBS) {
    const r = '../../';
    const list = ideasFor(h);
    const t = h.tool ? tool(h.tool) : null;
    const related = HUBS.filter((x) => x.group === h.group && x.slug !== h.slug).slice(0, 8);
    const bulk = ['coworkers', 'teachers', 'wedding', 'thank-you', 'retirement', 'diwali'].includes(h.key);
    const hubBody = `${pageHead({ title: esc(h.title), lead: esc(h.desc), crumb: [['Ideas', 'ideas/'], [h.label]], root: r })}
<section class="band"><div class="wrap article">
<div class="prose">${h.intro.map((p) => `<p>${p}</p>`).join('')}
<h2>What to put on it</h2><ul>${h.tips.map((x) => `<li>${x}</li>`).join('')}</ul></div>
<aside>${t ? `<div class="callout"><h2>${t.name}</h2><p>${t.short}</p><a class="btn btn--small" href="${r}tools/${t.slug}/">Open the tool</a></div>` : ''}<div class="callout"><h2>Not sure yet?</h2><p>Answer five questions about them and get a matched shortlist.</p><a class="btn btn--quiet btn--small" href="${r}gift-finder/?${h.group === 'recipient' ? `for=${h.key}` : h.group === 'occasion' ? `occ=${h.key}` : `type=${h.key}`}">Open the gift finder</a></div></aside>
</div></section>
${ad('inContent')}
<section class="band band--mist"><div class="wrap">
<div class="band__head"><h2>${plural(list.length, 'idea')}</h2><fieldset class="no-print" style="margin:0"><legend class="visually-hidden">Filter the ideas</legend><div class="chips" id="hub-filter"><label class="chip"><input type="radio" name="hf" value="all" checked><span>All</span></label><label class="chip"><input type="radio" name="hf" value="b1"><span>Under $25</span></label><label class="chip"><input type="radio" name="hf" value="b2"><span>$25 to $50</span></label><label class="chip"><input type="radio" name="hf" value="b3"><span>Over $50</span></label><label class="chip"><input type="radio" name="hf" value="instant"><span>Ready today</span></label></div></fieldset></div>
<ul class="tags" id="hub-list">${list.map((i) => ideaCard(i, { root: r })).join('')}</ul>
<p id="hub-empty" class="small" hidden>Nothing in this group. Choose another filter.</p>
</div></section>
${bulk ? quoteBand(r) : ''}
${faqBlock(h.faq)}
<section class="band band--tight"><div class="wrap"><h2>More ideas</h2><ul class="pill-links">${related.map((x) => `<li><a href="../${x.slug}/">${x.label}</a></li>`).join('')}<li><a href="../">All ideas</a></li></ul></div></section>`;
    page(`ideas/${h.slug}/`, {
      title: h.title, desc: h.desc, body: hubBody, crumb: [['Ideas', 'ideas/'], [h.label]], scripts: ['hub'], kind: 'hub', keywords: `${h.label} ${h.key}`,
      ld: [faqLd(h.faq), { '@type': 'ItemList', name: h.title, numberOfItems: list.length, itemListElement: list.slice(0, 30).map((i, n) => ({ '@type': 'ListItem', position: n + 1, name: i.name })) }],
    });
  }
}

// ---------- Studio tools ----------
const STATIC_TABLES = {
  birth: () => `<section class="band band--mist"><div class="wrap"><h2>Birthstones and birth flowers by month</h2><div class="table-scroll"><table class="data-table"><thead><tr><th>Month</th><th>Birthstone</th><th>Traditional alternative</th><th>Birth flowers</th><th>Said to stand for</th></tr></thead><tbody>${BIRTH_MONTHS.map((m) => `<tr><th scope="row">${m.month}</th><td><span class="swatch" style="background:${m.hex}"></span>${m.stones.join(', ')}</td><td>${m.alt.join(', ') || 'Same'}</td><td>${m.flowers.join(', ')}</td><td>${m.meaning}</td></tr>`).join('')}</tbody></table></div><p class="small" style="margin-top:1rem">Birthstones follow the modern jewellers’ list, first standardised in 1912 and extended since. Meanings are folklore, offered for fun.</p></div></section>`,
  anniversary: () => `<section class="band band--mist"><div class="wrap"><h2>Every anniversary year</h2><div class="table-scroll"><table class="data-table"><thead><tr><th>Year</th><th>Traditional</th><th>Modern</th><th>A personalized idea</th></tr></thead><tbody>${ANNIVERSARIES.map((a) => `<tr><th scope="row">${ordinal(a.year)}</th><td>${esc(a.traditional)}</td><td>${esc(a.modern)}</td><td>${esc(a.idea)}</td></tr>`).join('')}</tbody></table></div><p class="small" style="margin-top:1rem">Themes checked against two published year-by-year lists in November 2026. Lists differ slightly between countries.</p></div></section>`,
};

function tools() {
  const root = '../';
  const body = `${pageHead({ title: 'The studio', lead: 'Free tools for choosing the words, arranging the initials and making the finishing touches. No account, nothing to install.', crumb: [['Studio']], root })}
<section class="band"><div class="wrap"><ul class="tool-list">${TOOLS.map((t) => `<li class="tool-row"><div><h3><a href="${t.slug}/">${t.name}</a></h3></div><p>${t.short}</p></li>`).join('')}<li class="tool-row"><div><h3><a href="../gift-finder/">Gift finder</a></h3></div><p>Five questions about the person, and a matched list of ideas.</p></li></ul></div></section>${ad('inContent')}${quoteBand(root)}`;
  page('tools/', { title: 'Free personalization tools', desc: 'Free online tools for personalized gifts: monogram maker, engraving ideas, gift tags, certificates, name poems, date converter and planners.', body, crumb: [['Studio']], kind: 'tool' });

  for (const t of TOOLS) {
    const r = '../../';
    const g = t.guide ? guide(t.guide) : null;
    const toolBody = `${pageHead({ title: esc(t.title), lead: esc(t.short), crumb: [['Studio', 'tools/'], [t.name]], root: r })}
<section class="band print-band"><div class="wrap">${t.ui}<noscript><p class="error">This tool needs JavaScript switched on in your browser.</p></noscript></div></section>
${ad('inContent')}
<section class="band band--mist no-print"><div class="wrap split"><div><h2>How to use it</h2><ol class="numbered">${t.how.map(([h, p]) => `<li><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol></div>
<div>${g ? `<div class="callout"><h2>${esc(g.title)}</h2><p>${esc(g.desc)}</p><a href="${r}guides/${g.slug}/">Read the guide</a></div>` : ''}<h2 style="margin-top:1.5rem;font-size:1.4rem">More from the studio</h2><ul class="plain-list">${t.related.map((s) => `<li><a href="../${s}/">${tool(s).name}</a></li>`).join('')}<li><a href="../">All tools</a></li></ul></div></div></section>
${t.staticTable ? STATIC_TABLES[t.staticTable]() : ''}
${faqBlock(t.faq)}`;
    page(`tools/${t.slug}/`, {
      title: t.title, desc: t.desc, body: toolBody, crumb: [['Studio', 'tools/'], [t.name]], scripts: [`tools/${t.script}`], kind: 'tool', keywords: t.name,
      ld: [faqLd(t.faq), { '@type': 'WebApplication', name: t.name, url: `${SITE_URL}/tools/${t.slug}/`, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: t.desc }],
    });
  }
}

// ---------- Guides ----------
function guides() {
  const root = '../';
  const body = `${pageHead({ title: 'Guides', lead: 'Plain answers to the questions that come up between choosing a gift and approving the proof.', crumb: [['Guides']], root })}
<section class="band"><div class="wrap"><ul class="guide-list">${GUIDES.map((g) => `<li><h3><a href="${g.slug}/">${esc(g.title)}</a></h3><p>${esc(g.desc)}</p><time datetime="${g.updated}">Updated ${longDate(g.updated)}</time></li>`).join('')}</ul></div></section>${ad('inContent')}${quoteBand(root)}`;
  page('guides/', { title: 'Guides to personalized gifts', desc: 'Guides to engraving, monograms, order-by dates, proofs, photo quality, bulk orders and making personalized gifts yourself.', body, crumb: [['Guides']], kind: 'guide' });

  for (const g of GUIDES) {
    const r = '../../';
    const { html, toc } = withHeadingIds(g.body);
    const others = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 4);
    const gBody = `${pageHead({ title: esc(g.title), lead: esc(g.desc), crumb: [['Guides', 'guides/'], [g.title]], root: r })}
<section class="band"><div class="wrap article">
<article class="prose">
<p class="byline">By the ${config.name} editors. Updated <time datetime="${g.updated}">${longDate(g.updated)}</time>. <a href="${r}editorial-policy/">How we research</a></p>
<div class="takeaways"><h2>In short</h2><ul>${g.takeaways.map((x) => `<li>${x}</li>`).join('')}</ul></div>
${html}
${g.sources && g.sources.length ? `<h2 id="sources">Sources</h2><ul>${g.sources.map((s) => `<li>${s}</li>`).join('')}</ul>` : ''}
</article>
<aside><h2 style="font-size:1.2rem">On this page</h2><ul class="toc">${toc.map(([id, text]) => `<li><a href="#${id}">${text}</a></li>`).join('')}</ul>
${g.tools.length ? `<div class="callout"><h2>Tools for this</h2><ul class="plain-list">${g.tools.map((s) => `<li><a href="${r}tools/${s}/">${tool(s).name}</a></li>`).join('')}</ul></div>` : `<div class="callout"><h2>Ordering in bulk?</h2><p>Send one brief and get quotes from suppliers.</p><a class="btn btn--small" href="${r}get-quotes/">Request quotes</a></div>`}</aside>
</div></section>
${ad('inContent')}
${faqBlock(g.faq)}
<section class="band band--mist"><div class="wrap"><h2>Read next</h2><ul class="guide-list">${others.map((x) => `<li><h3><a href="../${x.slug}/">${esc(x.title)}</a></h3><p>${esc(x.desc)}</p></li>`).join('')}</ul></div></section>`;
    page(`guides/${g.slug}/`, {
      title: g.title, desc: g.desc, body: gBody, crumb: [['Guides', 'guides/'], [g.title]], type: 'article', kind: 'guide', lastmod: g.updated,
      ld: [faqLd(g.faq), { '@type': 'Article', headline: g.title, description: g.desc, dateModified: g.updated, datePublished: g.updated, author: { '@type': 'Organization', name: config.name }, publisher: { '@type': 'Organization', name: config.name }, mainEntityOfPage: `${SITE_URL}/guides/${g.slug}/` }],
    });
  }
}

// ---------- Videos ----------
const VIDEO_TOPICS = [
  ['Name on a tumbler with cut vinyl', 'permanent vinyl name on tumbler tutorial'],
  ['Hand-stamped metal key ring', 'hand stamped metal keychain tutorial for beginners'],
  ['Embroider an initial by hand', 'hand embroidery monogram letter tutorial'],
  ['Engrave a wooden cutting board', 'laser engrave cutting board tutorial'],
  ['Iron-on name for a tote or shirt', 'iron on vinyl name tote bag tutorial'],
  ['Layered paper shadow box with a name', 'personalized shadow box paper craft tutorial'],
  ['Personalized ornaments', 'personalized christmas ornament diy tutorial'],
  ['Etch a glass with a name', 'glass etching cream name tutorial'],
];
function videos() {
  const root = '../';
  const vids = videoData.videos || [];
  const body = `${pageHead({ title: 'How-to videos', lead: 'Tutorials for making personalized gifts at home, gathered from craft channels and refreshed automatically.', crumb: [['Videos']], root })}
<section class="band"><div class="wrap">
${vids.length ? `<p class="small">Videos play from YouTube when you press play. Updated ${videoData.updated ? longDate(videoData.updated.slice(0, 10)) : 'recently'}.</p><ul class="videos">${vids.map(videoCard).join('')}</ul>` : '<p>The video shelf fills itself from craft channels on the next refresh. Until then, the searches below go straight to current tutorials.</p>'}
</div></section>
${ad('inContent')}
<section class="band band--mist"><div class="wrap"><h2>Find a tutorial by project</h2><p class="measure">Each link opens a YouTube search for that project, so the results are always current.</p><ul class="guide-list">${VIDEO_TOPICS.map(([t, q]) => `<li><h3><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(q)}" rel="noopener">${t}</a></h3></li>`).join('')}</ul>
<div class="callout" style="max-width:40rem"><h2>New to making?</h2><p>Our guide compares five ways to personalize a gift at home by cost, difficulty and time.</p><a href="../guides/make-it-yourself/">Read: make it yourself</a></div></div></section>
<section class="band band--tight"><div class="wrap"><p class="small measure">Videos belong to their creators and are shown through YouTube’s standard player. Brand and product names in titles belong to their owners; no endorsement is implied. To suggest or report a video, use the <a href="../contact/">contact form</a>.</p></div></section>`;
  page('videos/', { title: 'How-to videos for making personalized gifts', desc: 'Watch tutorials for vinyl names, hand stamping, embroidery, engraving and other ways to personalize a gift at home.', body, crumb: [['Videos']], kind: 'page', keywords: 'videos tutorials youtube diy' });
}

// ---------- Data files and housekeeping ----------
function data() {
  write('data/ideas.json', JSON.stringify(IDEAS));
  write('data/inscriptions.json', JSON.stringify(INSCRIPTIONS));
  const client = {
    name: config.name,
    forms: { provider: config.forms.provider, alias: config.forms.alias, web3formsKey: config.forms.web3formsKey },
  };
  write('assets/js/config.js', `// Generated by _build/build.mjs from _build/config.mjs. Do not edit.\nexport default ${JSON.stringify(client)};\n`);
  if (!fs.existsSync(path.join(ROOT, 'data/videos.json'))) write('data/videos.json', JSON.stringify({ updated: '', videos: [] }));
}

function finish() {
  const index = [
    ...pages.filter((p) => p.url !== '').map((p) => ({ t: p.title, u: p.url, d: p.desc, k: `${p.kind} ${p.keywords}` })),
    ...IDEAS.map((i) => ({ t: i.name, u: `ideas/${i.types[0]}/`, d: i.blurb, k: `idea ${i.interests.join(' ')} ${i.recipients.join(' ')}` })),
  ];
  write('data/search-index.json', JSON.stringify(index));
  const prio = (p) => (p.url === '' ? '1.0' : p.kind === 'tool' || p.kind === 'hub' ? '0.8' : p.kind === 'guide' ? '0.7' : '0.5');
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `<url><loc>${SITE_URL}/${p.url}</loc><lastmod>${p.lastmod}</lastmod><priority>${prio(p)}</priority></url>`).join('\n')}\n</urlset>\n`);
  write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /_build/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  write('ads.txt', `google.com, ${config.adsense.client.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);
  write('manifest.webmanifest', JSON.stringify({
    name: config.name, short_name: 'Gifts', description: config.description, start_url: './', scope: './', display: 'standalone',
    background_color: '#ffffff', theme_color: config.themeColor,
    icons: [{ src: 'assets/img/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }],
  }, null, 1));
  write('.nojekyll', '');
}

data();
home();
finder();
ideas();
tools();
guides();
videos();
buildBusinessPages({ TOOLS, GUIDES, HUBS, IDEAS });
finish();
console.log(`Built ${pages.length} pages for ${SITE_URL} (${ON_OWN_DOMAIN ? 'custom domain' : 'default address'}) on ${TODAY_ISO}.`);
