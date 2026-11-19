// Lead generation, contest, support, hiring, contact and policy pages.
import { SITE_URL, TODAY, YEAR, config, esc, page, pages, pageHead, faqBlock, faqLd, ad, contactLink, longDate, withHeadingIds } from './lib.mjs';
import { PAGES } from './content/pages.mjs';
import { currentRound, ROUNDS } from '../assets/js/core/contest.js';
import { formatDate, MONTHS } from '../assets/js/core/util.js';

const chips = (name, options, type = 'radio', required = false) =>
  `<div class="chips">${options.map((o, i) => `<label class="chip"><input type="${type}" name="${name}" value="${esc(o)}"${required && i === 0 ? ' required' : ''}><span>${o}</span></label>`).join('')}</div>`;
const f = (label, control, hint = '') => `<div class="field"><label>${label}${control}</label>${hint ? `<span class="hint">${hint}</span>` : ''}</div>`;
const input = (name, label, attrs = '', hint = '') => f(label, `<input type="text" name="${name}" ${attrs}>`, hint);
const email = (hint = 'Used only to reply to you.') => f('Email', `<input type="email" name="email" data-label="Email" required autocomplete="email">`, hint);
const area = (name, label, attrs = '', hint = '') => f(label, `<textarea name="${name}" ${attrs}></textarea>`, hint);
const check = (name, text, required = false) => `<label class="check"><input type="checkbox" name="${name}" value="Yes"${required ? ' required' : ''}><span>${text}</span></label>`;
const HP = '<div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>';
const privacyNote = (root) => `<p class="hint">Your answers are sent to our inbox and used only for this purpose. See the <a href="${root}privacy/">privacy policy</a>.</p>`;
const noJs = '<noscript><p class="error">This form needs JavaScript. Please use the contact link at the top of the page instead.</p></noscript>';

export function buildBusinessPages({ TOOLS, GUIDES, HUBS, IDEAS }) {
  const r = '../';

  // ---------- Request quotes (lead generation) ----------
  const qFaq = [
    ['What does it cost?', 'Nothing. Sending a brief is free and you are under no obligation to buy. Suppliers may pay us a referral fee.'],
    ['Who sees my request?', 'We read it first. If it suits suppliers we know, we share it with them, with the consent you give on the form, and they contact you directly.'],
    ['How quickly will I hear back?', 'We aim to reply within two working days. Quotes for larger or more complex orders take longer.'],
    ['Is there a minimum order?', 'For supplier quotes, ten pieces. Published supplier minimums commonly sit at 10, 25 or 50 depending on how the gifts are branded. For fewer than ten, the gift finder is the better route.'],
    ['Can every gift carry a different name?', 'Yes. Say so on the form. Individual names add cost and checking time, so allow an extra week.'],
    ['How far ahead should I ask?', 'Six to eight weeks before you need delivery. Production alone is commonly quoted at two to six weeks.'],
  ];
  page('get-quotes/', {
    title: 'Request quotes for bulk personalized gifts',
    desc: 'Buying ten or more personalized gifts for a team, clients or a wedding? Send one brief and get quotes from suppliers. Free, no obligation.',
    crumb: [['Request quotes']], scripts: ['quotes'], kind: 'page', keywords: 'bulk corporate wholesale quote team client gifts',
    ld: [faqLd(qFaq)],
    body: `${pageHead({ title: 'Ten or more gifts? Get quotes with one brief.', lead: 'Team gifts, client gifts, wedding parties, clubs and events. Tell us what you need in about two minutes and we pass it to suppliers who personalize in bulk.', crumb: [['Request quotes']], root: r })}
<section class="band"><div class="wrap split">
<form id="quote-form" class="panel" data-success="Your request is in. We read every brief and aim to reply within two working days. Keep an eye on your inbox, including the spam folder.">
<ol class="steps" id="quote-steps"><li>What you need</li><li>Size and timing</li><li>Your details</li></ol>
<fieldset data-step="1"><legend>What is it for?</legend>${chips('Occasion', ['Employee gifts', 'Client gifts', 'Wedding party or favours', 'Event or conference', 'School, club or team', 'Something else'], 'radio', true)}
<p class="legend" style="margin-top:1.1rem">What kind of gift? Choose any.</p>${chips('Gift types', ['Drinkware', 'Bags and apparel', 'Desk and stationery', 'Tech', 'Gift boxes', 'Food and treats', 'Awards', 'Not sure yet'], 'checkbox')}
<p class="legend" style="margin-top:1.1rem">What goes on each one?</p>${chips('Personalization', ['Each person’s name', 'Our logo or artwork', 'Both', 'Not sure yet'], 'radio', true)}</fieldset>
<fieldset data-step="2" hidden><legend>Size and timing</legend>
<div class="row">${f('How many gifts?', '<input type="number" name="Quantity" min="1" max="100000" required inputmode="numeric">')}${f('Budget per gift', '<select name="Budget per gift" required><option value="">Choose</option><option>Under $15</option><option>$15 to $30</option><option>$30 to $60</option><option>$60 to $100</option><option>Over $100</option></select>')}</div>
<div class="row">${f('Needed by', '<input type="date" name="Needed by">', 'Leave empty if flexible.')}${f('Delivery', '<select name="Delivery"><option>One address</option><option>Individual addresses</option><option>More than one country</option></select>')}</div>
${input('Country', 'Country', 'required autocomplete="country-name" maxlength="60"')}</fieldset>
<fieldset data-step="3" hidden><legend>Where should quotes go?</legend>
<div class="row">${input('Name', 'Your name', 'required autocomplete="name" maxlength="80"')}${email('Suppliers reply to this address.')}</div>
<div class="row">${input('Organisation', 'Organisation', 'autocomplete="organization" maxlength="80"', 'Optional')}${f('Phone', '<input type="tel" name="Phone" autocomplete="tel" maxlength="30">', 'Optional')}</div>
${area('Notes', 'Anything else?', 'rows="3" maxlength="1000"', 'Colours, an item you have in mind, how names should appear.')}
${check('Consent to share with suppliers', `I agree that ${config.name} may share this request with gift suppliers so that they can contact me with quotes.`, true)}
${check('Newsletter', 'Also send me the occasional email about gift dates and new tools.')}
${HP}${privacyNote(r)}</fieldset>
<div class="btn-row" style="margin-top:1rem"><button type="button" class="btn btn--quiet" id="quote-back" hidden>Back</button><button type="button" class="btn" id="quote-next">Continue</button><button type="submit" class="btn" id="quote-send" hidden>Send my request</button></div>
<p class="hint" id="quote-saved" hidden>Your answers are saved on this device until you send.</p>
${noJs}
</form>
<aside>
<div class="panel panel--flat" id="quote-estimate" aria-live="polite"><h2>Your brief so far</h2><p class="small">Answer the questions and a rough budget and timeline appear here.</p></div>
<h2 style="margin-top:2rem">What happens next</h2>
<ol class="numbered"><li><h3>We read your brief</h3><p>A person checks it is complete and realistic for the date.</p></li><li><h3>Suppliers quote</h3><p>Suitable suppliers contact you directly with prices and proofs.</p></li><li><h3>You choose</h3><p>Compare, ask questions and order from whoever you prefer, or nobody.</p></li></ol>
<ul style="margin-top:1.5rem"><li>No fee and no obligation</li><li>Your details go only to suppliers matched to the brief</li><li>Names, logos or both</li></ul>
</aside>
</div></section>
<section class="band band--mist"><div class="wrap"><h2>What bulk orders usually involve</h2><div class="table-scroll"><table class="data-table"><thead><tr><th>Type of order</th><th>Published minimums</th><th>Typical production</th></tr></thead><tbody>
<tr><td>Logo on a card, tag or band</td><td>From about 10 gifts</td><td>2 to 3 weeks</td></tr>
<tr><td>Individually named gifts</td><td>From about 10 gifts</td><td>2 to 4 weeks</td></tr>
<tr><td>Fully branded or custom kitted boxes</td><td>From about 25 units</td><td>3 to 6 weeks</td></tr>
<tr><td>Imprinted drinkware and promotional items</td><td>Often 50 units</td><td>2 to 4 weeks</td></tr></tbody></table></div>
<p class="small" style="margin-top:1rem">Ranges gathered from supplier pages read in November 2026. Your quotes will state exact figures. <a href="${r}guides/bulk-personalized-gifts/">Read the full bulk order guide</a>.</p></div></section>
${faqBlock(qFaq)}
<section class="band band--tight"><div class="wrap"><p>Do you make or supply personalized gifts? <a href="${r}for-makers/">Apply to receive requests</a>.</p></div></section>`,
  });

  // ---------- Makers and suppliers ----------
  page('for-makers/', {
    title: 'For makers and suppliers of personalized gifts',
    desc: 'Engravers, embroiderers, printers and gifting studios: apply to receive bulk quote requests from Personalized.Gifts.',
    crumb: [['For makers']], kind: 'page', keywords: 'suppliers makers engravers apply leads',
    body: `${pageHead({ title: 'Receive bulk gift requests', lead: 'If you engrave, embroider, print or assemble personalized gifts in quantity, tell us what you do. We pass on briefs that match.', crumb: [['For makers']], root: r })}
<section class="band"><div class="wrap split">
<div class="prose"><h2>How it works</h2><p>Buyers planning ten or more gifts send us one brief: occasion, quantity, budget, date and what should go on each piece. We match it to suppliers by what they make, where they ship and their minimum order.</p><p>You receive the brief and contact the buyer directly. The sale, the proofs and the customer are yours.</p>
<h2>What we look for</h2><ul><li>You personalize in-house or control the process</li><li>You can state a minimum order and a normal production time</li><li>You send proofs before production</li><li>You reply to enquiries within two working days</li></ul>
<h2>Cost</h2><p>Applying is free. Referral terms, where they apply, are agreed with you before any request is sent. We never charge buyers.</p>
<p>For advertising or sponsoring a section of the site, ${contactLink('use the business contact page')}.</p></div>
<form class="panel" data-relay="Supplier application" data-success="Thank you. Your application is with us and we will reply by email.">
<h2>Apply</h2>
<div class="row">${input('Business name', 'Business name', 'required maxlength="100" autocomplete="organization"')}${f('Website', '<input type="url" name="Website" placeholder="https://" maxlength="200">')}</div>
<div class="row">${input('Country', 'Country', 'required maxlength="60"')}${input('Ships to', 'Where you ship', 'maxlength="100"', 'Countries or regions')}</div>
<fieldset><legend>How you personalize</legend>${chips('Methods', ['Engraving', 'Embroidery', 'Printing', 'Leather stamping', 'Custom art', 'Gift boxes and kitting', 'Food and treats'], 'checkbox')}</fieldset>
<div class="row">${input('Minimum order', 'Minimum order', 'maxlength="40"', 'For example 25 units')}${input('Production time', 'Normal production time', 'maxlength="40"', 'For example 10 working days')}</div>
<div class="row">${input('Name', 'Your name', 'required maxlength="80" autocomplete="name"')}${email()}</div>
${area('Notes', 'Anything else?', 'rows="3" maxlength="1000"')}
${check('Confirmation', 'I am authorised to apply for this business and agree to be contacted about it.', true)}
${HP}${privacyNote(r)}<button type="submit" class="btn">Send application</button>${noJs}</form>
</div></section>`,
  });

  // ---------- Contest ----------
  const round = currentRound(TODAY);
  const prize = config.contest.prize || 'The winning line is published on this page and on the home page for a month, credited as the winner chooses. When a round has a sponsored prize, it is announced here before the round opens.';
  const cFaq = [
    ['Who can enter?', 'Anyone aged 18 or over, anywhere it is lawful to do so. One entry per person per round.'],
    ['Does it cost anything?', 'No. There is nothing to buy and no payment of any kind.'],
    ['How is the winner chosen?', 'The editors judge on originality, fit to the brief and whether it would work on a real gift. Entries are judged without names attached.'],
    ['Who owns my entry?', 'You do. Entering gives us permission to publish it on this site with the credit you choose.'],
  ];
  page('contests/', {
    title: `Monthly contest: ${round.title}`,
    desc: 'A free monthly writing contest for the best short line on a personalized gift. One brief a month, judged by the editors.',
    crumb: [['Contest']], kind: 'page', keywords: 'contest competition prize win', ld: [faqLd(cFaq)],
    body: `${pageHead({ title: 'The monthly contest', lead: 'One brief each month. Write the best short line for a personalized gift.', crumb: [['Contest']], root: r })}
<section class="band"><div class="wrap split">
<div><h2>${esc(round.label)}: ${esc(round.title)}</h2><p class="lead">${esc(round.brief)}</p>
<dl class="kv"><dt>Length</dt><dd>Up to ${round.limit} characters</dd><dt>Closes</dt><dd>${formatDate(round.closes, 'weekday')}, end of day UTC, <span data-countdown="${round.closes.toISOString().slice(0, 10)}"></span></dd><dt>Result</dt><dd>Published here by ${formatDate(round.results)}</dd><dt>Prize</dt><dd>${esc(prize)}</dd></dl>
<h3 style="margin-top:2rem">Next month</h3><p>${esc(round.next.title)}. ${esc(round.next.brief)}</p>
<h3>Winners</h3><p class="small">No rounds have been judged yet. The first winner will appear here.</p>
<p>Would your business like to fund a prize? ${contactLink('Sponsor a round')}.</p></div>
<form class="panel" data-relay="Contest entry" data-success="Your entry is in. Results are published on this page after the round closes. Good luck.">
<h2>Enter this round</h2>
<input type="hidden" name="Round" value="${round.id} ${esc(round.title)}">
${f('Your line', `<input type="text" name="Entry" required maxlength="${round.limit}" autocomplete="off">`, `Up to ${round.limit} characters. Your own words only.`)}
<div class="row">${input('First name', 'First name', 'required maxlength="40" autocomplete="given-name"')}${input('Town', 'Town or city', 'maxlength="60"', 'Shown with a winning entry')}</div>
${email('Used only to tell you if you win.')}
${f('Credit me as', '<select name="Credit"><option>First name and town</option><option>First name only</option><option>Anonymous</option></select>')}
${check('Age', 'I am 18 or over.', true)}
${check('Own work and rules', 'This is my own original work and I accept the contest rules on this page.', true)}
${check('Newsletter', 'Email me when results are published.')}
${HP}${privacyNote(r)}<button type="submit" class="btn">Submit my entry</button>${noJs}</form>
</div></section>
<section class="band band--mist"><div class="wrap prose"><h2>Contest rules</h2>
<ol><li><strong>Organiser.</strong> The contest is run by ${config.name}.</li>
<li><strong>Eligibility.</strong> Open to individuals aged 18 or over. Void where prohibited or restricted by law. People involved in running the site may not enter.</li>
<li><strong>No purchase.</strong> Entry is free. No purchase, payment or donation is needed, and none improves your chance of winning.</li>
<li><strong>How to enter.</strong> Submit one original line through the form on this page during the round. One entry per person per round. Late, duplicate or automated entries are not counted.</li>
<li><strong>Entries.</strong> Your entry must be your own work, must not copy published lyrics, poems or slogans, and must not be offensive or name a private person without consent.</li>
<li><strong>Judging.</strong> This is a contest of skill. The editors choose one winner per round on originality, fit to the brief and usefulness on a real gift. The decision is final.</li>
<li><strong>Prize.</strong> The prize for each round is the one stated on this page while the round is open. Prizes are not transferable and have no cash alternative unless stated. Any taxes are the winner’s responsibility.</li>
<li><strong>Notification.</strong> The winner is contacted at the email address given. If there is no reply within 14 days, another entry may be chosen.</li>
<li><strong>Publication.</strong> By entering you allow us to publish your entry on this site with the credit you chose. You keep ownership.</li>
<li><strong>Personal information.</strong> Details are used only to run the contest, as described in the <a href="${r}privacy/">privacy policy</a>.</li>
<li><strong>Changes.</strong> We may amend, pause or cancel a round if circumstances require, and will say so on this page.</li>
<li><strong>No association.</strong> The contest is not sponsored, endorsed or administered by Google, YouTube or any advertiser shown on the site. It has no connection with adverts on the site, and nothing here asks you to view or click on them.</li></ol>
<h2>The year’s briefs</h2><ul>${ROUNDS.map((x, i) => `<li><strong>${MONTHS[i]}:</strong> ${esc(x.title)}</li>`).join('')}</ul></div></section>
${faqBlock(cFaq)}`,
  });

  // ---------- Support ----------
  const give = config.donationLinks.length
    ? `<div class="btn-row" style="margin:1rem 0 1.5rem">${config.donationLinks.map((d) => `<a class="btn" href="${esc(d.url)}" rel="noopener">${esc(d.label)}</a>`).join('')}</div>`
    : '';
  const sFaq = [
    ['Is my contribution a charitable donation?', 'No. The site is not a registered charity, and contributions are not tax-deductible. They are voluntary support for an independent website.'],
    ['Do supporters get anything in return?', 'Our thanks, and a site that stays free. Support never buys coverage, results or contest outcomes.'],
    ['Can a business support the site?', 'Yes, through sponsorship of a contest prize or a section. Use the business contact page.'],
  ];
  page('support/', {
    title: 'Support Personalized.Gifts',
    desc: 'Help keep the tools free. Contributions pay for running costs, new tools, promotion, contributors and contest prizes.',
    crumb: [['Support']], kind: 'page', keywords: 'donate donation support contribute sponsor', ld: [faqLd(sFaq)],
    body: `${pageHead({ title: 'Keep the studio free', lead: 'Every tool here is free and stays free. If one of them saved you an evening, you can help pay for the next one.', crumb: [['Support']], root: r })}
<section class="band"><div class="wrap split">
<div><h2>Where contributions go</h2>
<table class="data-table"><thead><tr><th>Purpose</th><th>What it pays for</th></tr></thead><tbody>
<tr><th scope="row">Running the site</th><td>The domain, tooling and day-to-day operation</td></tr>
<tr><th scope="row">New tools and guides</th><td>Design and build of the next studio tools</td></tr>
<tr><th scope="row">Hiring talent</th><td>Paid commissions for writers, illustrators and developers</td></tr>
<tr><th scope="row">Contests and prizes</th><td>Prizes for the monthly contest and the cost of running it</td></tr>
<tr><th scope="row">Promotion and marketing</th><td>Reaching people who would find the tools useful</td></tr></tbody></table>
<h2 style="margin-top:2rem">Other ways to help</h2><ul><li>Share a tool with someone who is stuck on a gift</li><li><a href="${r}contests/">Enter the contest</a>, or ${contactLink('sponsor a prize')}</li><li><a href="${r}contact/">Tell us</a> what is wrong or missing</li><li><a href="${r}work-with-us/">Contribute your skills</a></li></ul>
<p class="small">We never ask anyone to view or click adverts as a way of supporting the site. Please do not.</p></div>
<div>${give}<form class="panel" data-relay="Support pledge" data-success="Thank you. We will reply by email with how to complete your contribution.">
<h2>${config.donationLinks.length ? 'Or pledge by message' : 'Pledge your support'}</h2><p class="small">Tell us what you would like to give and we reply with a secure way to pay. Nothing is charged from this form.</p>
<div class="row">${input('Amount', 'Amount and currency', 'required maxlength="30" placeholder="25 USD"')}${f('How often', '<select name="How often"><option>Once</option><option>Monthly</option><option>Yearly</option></select>')}</div>
<fieldset><legend>Put it towards</legend>${chips('Towards', ['Wherever it is needed', 'New tools', 'Contest prizes', 'Hiring contributors', 'Promotion'], 'radio')}</fieldset>
<div class="row">${input('Name', 'Your name', 'required maxlength="80" autocomplete="name"')}${email('We reply here with payment details.')}</div>
${area('Message', 'Message', 'rows="3" maxlength="600"', 'Optional')}
${HP}${privacyNote(r)}<button type="submit" class="btn">Send my pledge</button>${noJs}</form>
<p style="margin-top:1.25rem">Supporting as a business? ${contactLink('Talk to us about sponsorship')}.</p></div>
</div></section>${faqBlock(sFaq)}`,
  });

  // ---------- Work with us ----------
  page('work-with-us/', {
    title: 'Work with us',
    desc: 'Writers, illustrators, developers and video makers: tell us what you do. We commission freelance work as budget allows.',
    crumb: [['Work with us']], kind: 'page', keywords: 'jobs hiring freelance careers contributors',
    body: `${pageHead({ title: 'Work with us', lead: 'We commission freelance work as budget allows, funded by supporters and sponsors. Tell us what you do and we keep you in mind for the next brief.', crumb: [['Work with us']], root: r })}
<section class="band"><div class="wrap split">
<div class="prose"><h2>Who we look for</h2>
<ul><li><strong>Writers</strong> who can explain a practical thing in plain words and check their facts.</li><li><strong>Illustrators</strong> for original gift drawings, motifs and printable designs.</li><li><strong>Front-end developers</strong> to build small, fast, accessible browser tools.</li><li><strong>Video makers</strong> who can show a craft method clearly in a few minutes.</li><li><strong>Translators</strong> to bring the tools to other languages.</li></ul>
<h2>How it works</h2><p>Work is commissioned per project with a written brief, an agreed fee and a deadline. There are no unpaid trials. If nothing suitable is open, we keep your details on file and contact you when something is.</p>
<p>Applicants must be 18 or over. Details are used only to consider you for work.</p></div>
<form class="panel" data-relay="Contributor application" data-success="Thank you. Your details are on file and we will be in touch when a suitable brief comes up.">
<h2>Tell us what you do</h2>
<div class="row">${input('Name', 'Your name', 'required maxlength="80" autocomplete="name"')}${email()}</div>
<fieldset><legend>What you do</legend>${chips('Skills', ['Writing', 'Illustration', 'Development', 'Video', 'Translation', 'Something else'], 'checkbox')}</fieldset>
${f('Link to your work', '<input type="url" name="Portfolio" placeholder="https://" maxlength="200" required>')}
<div class="row">${input('Location', 'Where you are based', 'maxlength="60"')}${input('Rate', 'Usual rate', 'maxlength="60"', 'Optional')}</div>
${area('Note', 'Anything we should know?', 'rows="3" maxlength="800"')}
${check('Age', 'I am 18 or over.', true)}
${HP}${privacyNote(r)}<button type="submit" class="btn">Send my details</button>${noJs}</form>
</div></section>`,
  });

  // ---------- Newsletter ----------
  page('newsletter/', {
    title: 'Newsletter',
    desc: 'An occasional email before the big gift dates, with new tools, printables and contest results.',
    crumb: [['Newsletter']], kind: 'page', keywords: 'newsletter email subscribe reminders',
    body: `${pageHead({ title: 'Get the dates by email', lead: 'An occasional note before the big gift days, with order-by dates, new tools and contest results. No more than twice a month.', crumb: [['Newsletter']], root: r })}
<section class="band"><div class="wrap split">
<form class="panel" data-relay="Newsletter sign-up" data-success="You are on the list. You can leave at any time by replying to any email.">
<div class="row">${email('We send the newsletter here and nothing else.')}${input('First name', 'First name', 'maxlength="40" autocomplete="given-name"', 'Optional')}</div>
<fieldset><legend>Most interested in</legend>${chips('Interests', ['Order-by reminders', 'New tools', 'Printables', 'Contest results', 'Bulk and corporate gifts'], 'checkbox')}</fieldset>
${check('Consent', `Yes, send me the ${config.name} newsletter by email. I can unsubscribe at any time.`, true)}
${HP}${privacyNote(r)}<button type="submit" class="btn">Join the list</button>${noJs}</form>
<div class="prose"><h2>Prefer your own calendar?</h2><p>The <a href="${r}tools/occasion-calendar/">occasion calendar</a> exports every gift date, with a reminder two weeks ahead, straight into your phone or computer. No email needed.</p></div>
</div></section>`,
  });

  // ---------- Contact ----------
  page('contact/', {
    title: 'Contact',
    desc: 'Send a question, correction or suggestion to Personalized.Gifts.',
    crumb: [['Contact']], kind: 'page', keywords: 'contact email message',
    body: `${pageHead({ title: 'Contact', lead: 'Questions, corrections and suggestions are all welcome.', crumb: [['Contact']], root: r })}
<section class="band"><div class="wrap split">
<form class="panel" data-relay="Contact message" data-success="Message sent. Thank you. We reply by email, usually within a few working days.">
<div class="row">${input('Name', 'Your name', 'required maxlength="80" autocomplete="name"')}${email()}</div>
${f('What is it about?', '<select name="Topic"><option>A question</option><option>A correction</option><option>A suggestion for a tool or guide</option><option>A copyright or trademark concern</option><option>Privacy or my information</option><option>Something else</option></select>')}
${area('Message', 'Message', 'rows="6" required maxlength="3000"')}
${HP}${privacyNote(r)}<button type="submit" class="btn">Send message</button>${noJs}</form>
<div class="prose"><h2>Business enquiries</h2><p>Interested in this website, the domain name, sponsorship, advertising or a partnership? ${contactLink('Use the business contact page')}.</p>
<h2>Other routes</h2><ul><li><a href="${r}get-quotes/">Request quotes</a> for ten or more gifts</li><li><a href="${r}for-makers/">Apply as a maker or supplier</a></li><li><a href="${r}work-with-us/">Offer your skills</a></li></ul></div>
</div></section>`,
  });

  // ---------- About and policies ----------
  const ctx = { name: config.name, root: r, updated: longDate('2026-11-19'), year: YEAR, contact: contactLink };
  for (const p of PAGES) {
    const { html } = withHeadingIds(p.body(ctx));
    page(`${p.slug}/`, {
      title: p.title, desc: p.desc, crumb: [[p.nav]], kind: 'page', lastmod: '2026-11-19',
      body: `${pageHead({ title: esc(p.title), lead: esc(p.lead), crumb: [[p.nav]], root: r })}<section class="band"><div class="wrap"><div class="prose">${html}</div></div></section>`,
    });
  }

  // ---------- Site map ----------
  const group = (kind) => pages.filter((p) => p.kind === kind && p.url !== '');
  const li = (p) => `<li><a href="${r}${p.url}">${esc(p.title)}</a></li>`;
  page('sitemap/', {
    title: 'Site map', desc: 'Every page on Personalized.Gifts in one list.', crumb: [['Site map']], kind: 'page',
    body: `${pageHead({ title: 'Site map', lead: 'Every page, grouped by what it does.', crumb: [['Site map']], root: r })}
<section class="band"><div class="wrap cols"><div><h2>Tools</h2><ul class="plain-list">${group('tool').map(li).join('')}</ul></div><div><h2>Ideas</h2><ul class="plain-list">${group('hub').map(li).join('')}</ul></div><div><h2>Guides</h2><ul class="plain-list">${group('guide').map(li).join('')}</ul><h2 style="margin-top:2rem">Everything else</h2><ul class="plain-list">${group('page').map(li).join('')}</ul></div></div></section>`,
  });

  // ---------- Not found ----------
  page('', {
    file: '404.html', noindex: true, noAds: true, base: true, title: 'Page not found', desc: 'That page does not exist.',
    body: `<section class="band"><div class="wrap"><h1>That page is not here.</h1><p class="lead">The address may have changed, or the link was mistyped. These will get you back on track.</p><ul class="pill-links" style="margin-top:1.5rem"><li><a href="${SITE_URL}/">Home</a></li><li><a href="${SITE_URL}/gift-finder/">Gift finder</a></li><li><a href="${SITE_URL}/tools/">Studio tools</a></li><li><a href="${SITE_URL}/ideas/">Ideas</a></li><li><a href="${SITE_URL}/guides/">Guides</a></li></ul></div></section>`,
  });
}
