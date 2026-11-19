// About, contact and the policy pages. `c` gives helpers: c.name, c.contact(text), c.updated.

export const PAGES = [
  {
    slug: 'about', title: 'About Personalized.Gifts', nav: 'About',
    desc: 'What Personalized.Gifts is, who it is for and how it is run.',
    lead: 'A free studio for the part of gift-giving that shops leave to you: deciding what it should say.',
    body: (c) => `
<h2>What this site does</h2>
<p>Shops will put almost anything on a gift. None of them help you decide what. ${c.name} exists for that decision. It helps you find an idea that suits the person, choose words that fit the space, get initials in the right order, and make the finishing touches yourself: a tag, a certificate, a monogram, a poem.</p>
<p>Everything here is free to use. There is no account to create and nothing to install. Tools run in your browser, and the things you type stay on your device unless you send us a form.</p>
<h2>What it does not do</h2>
<p>We do not sell gifts, hold stock or take payment for products. When you are ready to buy, you buy from a maker or shop of your choice. For orders of ten or more, you can <a href="${c.root}get-quotes/">send us a brief</a> and we pass it to suppliers who handle bulk personalization.</p>
<h2>How it stays current</h2>
<p>Dates, countdowns and order-by guidance are calculated, not typed, so they are right on the day you read them. The site rebuilds itself every day and refreshes its video collection from craft channels automatically.</p>
<h2>How it is funded</h2>
<p>Advertising, referral fees from suppliers, sponsorship and contributions from supporters. The <a href="${c.root}editorial-policy/">editorial policy</a> explains each one and what it cannot buy.</p>
<h2>Get in touch</h2>
<p>Use the <a href="${c.root}contact/">contact form</a> for questions and corrections. For advertising, sponsorship or partnership, ${c.contact('use the business contact page')}.</p>`,
  },
  {
    slug: 'privacy', title: 'Privacy policy', nav: 'Privacy',
    desc: 'What information Personalized.Gifts handles, what stays on your device, and how advertising cookies work.',
    lead: 'Short version: tools run on your device, forms go to our inbox only when you press send, and adverts are served by Google.',
    body: (c) => `
<p>This policy applies to ${c.name} ("we", "the site"). It was last updated on ${c.updated}.</p>
<h2>Information that stays on your device</h2>
<p>The tools save some things in your browser's local storage so that they work between pages and visits: the name you type on the home page, your saved ideas, your gift list, your own dates, your quote draft and whether you have dismissed the cookie notice. This information is not sent to us. You can remove it at any time by clearing site data in your browser.</p>
<p>The photo size calculator reads the width and height of a photo you choose. The photo itself is never uploaded.</p>
<p>The gift exchange generator runs entirely in your browser. Names are placed in the private links you send; they are not stored by us.</p>
<h2>Information you send us</h2>
<p>When you submit a form (contact, quote request, supplier application, contest entry, support pledge, contributor application or newsletter sign-up) the answers you typed are delivered to our inbox by a third-party form relay service, which processes the message on our behalf. We use what you send only for the purpose of that form:</p>
<ul>
<li><strong>Quote requests:</strong> to find suitable suppliers. With the consent you give on the form, we share the request with those suppliers so that they can contact you with quotes.</li>
<li><strong>Contest entries:</strong> to judge the round and, with your consent, to publish the winning entry with a first name and town.</li>
<li><strong>Newsletter:</strong> to send the occasional email you asked for. Every email explains how to stop.</li>
<li><strong>Everything else:</strong> to reply to you.</li>
</ul>
<p>We do not sell personal information. We keep messages for as long as needed to deal with them and to keep ordinary business records, then delete them.</p>
<h2>Advertising</h2>
<p>We use Google AdSense to show adverts. Third-party vendors, including Google, use cookies to serve ads based on your earlier visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on those visits.</p>
<ul>
<li>You can opt out of personalised advertising in <a href="https://www.google.com/settings/ads" rel="noopener">Google's Ads Settings</a>.</li>
<li>You can opt out of some other vendors' use of cookies for personalised advertising at <a href="https://www.aboutads.info/choices/" rel="noopener">aboutads.info</a>.</li>
<li>Google explains how it uses information from sites that use its services at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">policies.google.com/technologies/partner-sites</a>.</li>
</ul>
<p>Visitors in the European Economic Area, the United Kingdom and Switzerland are asked for consent by Google's consent message before personalised ads are shown.</p>
<h2>Videos</h2>
<p>Videos are embedded from YouTube in its privacy-enhanced mode and load only when you press play. Once you play a video, YouTube may set cookies and collect information under Google's privacy policy.</p>
<h2>Hosting</h2>
<p>The site is hosted on GitHub Pages. As with any web host, GitHub receives your IP address and basic request details when pages are loaded, under its own privacy statement.</p>
<h2>Children</h2>
<p>The site is for adults choosing and making gifts. It is not directed at children under 13, and we do not knowingly collect their information. Forms ask that entrants and applicants be 18 or over.</p>
<h2>Your choices</h2>
<p>You can ask what we hold about you, ask us to correct or delete it, or withdraw a consent you gave, by writing to us through the <a href="${c.root}contact/">contact form</a>. Depending on where you live you may also have the right to complain to your data protection authority.</p>
<h2>Changes</h2>
<p>If this policy changes, the new version will be posted here with a new date.</p>`,
  },
  {
    slug: 'cookies', title: 'Cookie policy', nav: 'Cookies',
    desc: 'Which cookies and local storage Personalized.Gifts uses and how to control them.',
    lead: 'We set no cookies of our own. Advertising and video partners may, and you control both.',
    body: (c) => `
<p>Last updated on ${c.updated}.</p>
<h2>What we store ourselves</h2>
<p>${c.name} does not set cookies. It uses your browser's local storage, which stays on your device, to remember:</p>
<table><thead><tr><th>Item</th><th>Purpose</th></tr></thead><tbody>
<tr><td>Name</td><td>Shows the name you typed on gift previews across the site</td></tr>
<tr><td>Saved ideas</td><td>Keeps your shortlist of gift ideas</td></tr>
<tr><td>Gift list and your dates</td><td>Stores the planner and calendar entries you add</td></tr>
<tr><td>Quote draft</td><td>Keeps your answers if you leave the quote form part-way</td></tr>
<tr><td>Notice</td><td>Remembers that you closed the cookie notice</td></tr>
</tbody></table>
<h2>Cookies set by others</h2>
<p><strong>Google AdSense</strong> and its advertising partners use cookies to show and measure adverts, including adverts based on your visits to this and other sites. Manage this in <a href="https://www.google.com/settings/ads" rel="noopener">Google's Ads Settings</a> or at <a href="https://www.aboutads.info/choices/" rel="noopener">aboutads.info</a>.</p>
<p><strong>YouTube</strong> may set cookies when you press play on an embedded video. Videos do not load until you do.</p>
<h2>Controlling cookies</h2>
<p>You can block or delete cookies and site data in your browser settings. The tools continue to work without cookies. If you clear local storage, saved lists and drafts are removed.</p>
<p>See also the <a href="${c.root}privacy/">privacy policy</a>.</p>`,
  },
  {
    slug: 'terms', title: 'Terms of use', nav: 'Terms',
    desc: 'The terms that apply when you use Personalized.Gifts and its tools.',
    lead: 'Use the tools freely, keep what you make, and check anything permanent with the maker before you order.',
    body: (c) => `
<p>These terms apply to your use of ${c.name}. By using the site you agree to them. Last updated on ${c.updated}.</p>
<h2>Using the site</h2>
<p>The site and its tools are provided free of charge for personal and business use. You may not use them to break the law, to harass anyone, to copy the site wholesale, or to interfere with its operation.</p>
<h2>What you make is yours</h2>
<p>Monograms, tags, certificates, poems and other designs you create with the tools belong to you. You may use them for any lawful purpose, including on items you sell. Suggested inscriptions and name-poem lines are offered for free use. The fonts used in downloads are open-licensed; see the <a href="${c.root}disclaimer/">disclaimer</a>.</p>
<h2>What you send us</h2>
<p>When you submit a contest entry you confirm that it is your own work and give us permission to publish it on the site with your first name and town, or anonymously if you ask. You keep ownership. For other forms, you agree that what you send is accurate and yours to share.</p>
<h2>Quote requests</h2>
<p>We pass suitable requests to third-party suppliers. We are not a party to any agreement you make with a supplier, do not guarantee that you will receive quotes, and are not responsible for a supplier's products, prices or conduct. We may receive a referral fee from suppliers.</p>
<h2>Information, not advice</h2>
<p>Guides, character limits, lead times, order-by dates, festival dates and print-quality ratings are general information and estimates. Makers set their own limits and deadlines, and those always take precedence. Check the details with the seller before you place an order that cannot be returned.</p>
<h2>No warranty</h2>
<p>The site is provided as it is, without warranties of any kind. To the extent the law allows, we are not liable for loss arising from your use of the site, from errors in its content, or from products and services you buy from others.</p>
<h2>Links and embedded content</h2>
<p>The site links to and embeds content from other websites, including videos and adverts. We do not control that content and are not responsible for it.</p>
<h2>Changes and contact</h2>
<p>We may update these terms; the current version is always on this page. Questions go through the <a href="${c.root}contact/">contact form</a>.</p>`,
  },
  {
    slug: 'disclaimer', title: 'Disclaimer, trademarks and copyright', nav: 'Disclaimer',
    desc: 'Trademark and copyright disclosure for Personalized.Gifts, with font licences and how to report a concern.',
    lead: 'An independent site. No shop, brand or platform is affiliated with it or endorses it.',
    body: (c) => `
<p>Last updated on ${c.updated}.</p>
<h2>Independence</h2>
<p>${c.name} is an independent information and tools website. It is not affiliated with, sponsored by, or endorsed by any retailer, marketplace, manufacturer, craft-tool maker or gifting company. It does not sell products.</p>
<h2>Trademark disclosure</h2>
<p>The words "personalized gifts" are used on this site in their ordinary descriptive sense, to describe gifts that carry a name, date or message. The site name is the address of the site. We claim no rights in those ordinary words and do not suggest any connection with businesses that use similar terms.</p>
<p>All product names, company names, logos and brands that may appear on the site, including in embedded videos and in advertisements, are the property of their respective owners. They are used only to identify the products or services concerned. Their appearance does not imply endorsement in either direction.</p>
<p>Google, AdSense and YouTube are trademarks of Google LLC. This site is not endorsed by or affiliated with Google.</p>
<h2>Copyright disclosure</h2>
<p>The text, tools, illustrations and layout of this site are original work, copyright ${c.year} ${c.name}, all rights reserved, except where noted below. The drawings of gifts are original artwork and do not depict any particular product.</p>
<p>Embedded videos remain the property of their creators and are shown through YouTube's standard player under YouTube's terms. Video titles, thumbnails and channel names belong to their owners.</p>
<p>We do not reproduce song lyrics, poems or passages from books. Suggested wording is written for this site.</p>
<h2>Fonts</h2>
<p>The typefaces used on the site and in downloads are open-source fonts distributed under the SIL Open Font License: Alegreya, Alegreya Sans, Pinyon Script, Cinzel, Bodoni Moda, Josefin Sans and Sacramento. Special Elite is distributed under the Apache License 2.0. Licence texts are kept with the font files.</p>
<h2>Accuracy</h2>
<p>We work to keep the information here correct, and dates are calculated automatically. Even so, character limits, lead times, order-by dates, festival dates and quality ratings are general guidance. Confirm the details with your maker before ordering. Nothing on the site is legal, tax or professional advice.</p>
<h2>Advertising and referrals</h2>
<p>The site shows adverts and may earn referral fees from suppliers when it passes on a quote request. See the <a href="${c.root}editorial-policy/">editorial policy</a>.</p>
<h2>Reporting a concern</h2>
<p>If you believe something on this site infringes your copyright or misuses your trademark, tell us through the <a href="${c.root}contact/">contact form</a> with the page address and what you own. We review every report and remove or correct material where appropriate.</p>`,
  },
  {
    slug: 'editorial-policy', title: 'Editorial policy and how we make money', nav: 'Editorial policy',
    desc: 'How Personalized.Gifts researches its content, how the site earns money, and what money cannot change.',
    lead: 'Advice first. Advertising, referrals and sponsorship pay for it and have no say in it.',
    body: (c) => `
<p>Last updated on ${c.updated}.</p>
<h2>How content is made</h2>
<p>Guides and tools start from a practical question people ask when personalizing a gift. Facts such as birthstone lists, anniversary themes, monogram conventions and date rules are checked against published references. Practical figures such as character limits and production times are drawn from what makers themselves publish, and are described as ranges because they vary.</p>
<p>Some content on this site is produced with the help of AI tools. Whatever the method, the standard is the same: accurate, specific and useful. Suggested inscriptions and poem lines are original to this site.</p>
<h2>How the site earns money</h2>
<ul>
<li><strong>Advertising.</strong> Adverts are served by Google AdSense and labelled as advertisements. We do not choose individual adverts.</li>
<li><strong>Referral fees.</strong> When we pass a bulk quote request to a supplier, the supplier may pay us a fee. You never pay us.</li>
<li><strong>Sponsorship.</strong> A sponsor may fund a contest prize or a section of the site. Sponsored material is labelled.</li>
<li><strong>Supporters.</strong> Readers can contribute to running costs on the <a href="${c.root}support/">support page</a>.</li>
</ul>
<h2>What money cannot do</h2>
<p>Advertisers, suppliers and sponsors do not review content before it is published and cannot buy a recommendation. Tools give the same results to everyone. We never ask visitors to click on adverts.</p>
<h2>Corrections</h2>
<p>If something is wrong, tell us through the <a href="${c.root}contact/">contact form</a>. We fix confirmed errors promptly and update the date on the page.</p>`,
  },
  {
    slug: 'accessibility', title: 'Accessibility', nav: 'Accessibility',
    desc: 'How Personalized.Gifts is built to be usable by everyone, and how to report a barrier.',
    lead: 'The site is built to work with a keyboard, a screen reader, large text and a small screen.',
    body: (c) => `
<h2>What we have done</h2>
<ul>
<li>Every page has one main heading, landmarks and a link to skip to the content.</li>
<li>All tools can be used with a keyboard, and the focused control is always visibly outlined.</li>
<li>Text and controls meet a contrast ratio of at least 4.5 to 1 against their background.</li>
<li>Form fields have visible labels, and errors are described in words.</li>
<li>Previews have text descriptions, and results are announced to screen readers when they change.</li>
<li>Layouts reflow down to a 320-pixel-wide screen without sideways scrolling of the page.</li>
<li>Motion is minimal and is switched off when your device asks for reduced motion.</li>
<li>Videos load only when asked for and use the standard player, with its captions and keyboard controls.</li>
</ul>
<h2>Known limits</h2>
<p>Downloaded pictures of monograms, tags and certificates are images. If you share one, add your own description. Adverts and embedded videos come from other providers and may not meet the same standard.</p>
<h2>Tell us</h2>
<p>If something does not work for you, describe the page and the problem through the <a href="${c.root}contact/">contact form</a>. We aim to reply within five working days.</p>`,
  },
];
