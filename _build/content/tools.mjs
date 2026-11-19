// The studio: every free tool, its page copy and its controls.
// Each tool's script lives in assets/js/tools/<script>.js and binds to the ids used here.

const field = (id, label, control, hint = '') =>
  `<div class="field"><label for="${id}">${label}</label>${control}${hint ? `<span class="hint">${hint}</span>` : ''}</div>`;
const text = (id, label, attrs = '', hint = '') => field(id, label, `<input type="text" id="${id}" ${attrs}>`, hint);
const date = (id, label, hint = '') => field(id, label, `<input type="date" id="${id}">`, hint);
const select = (id, label, options = [], hint = '') =>
  field(id, label, `<select id="${id}">${options.map(([v, l, sel]) => `<option value="${v}"${sel ? ' selected' : ''}>${l}</option>`).join('')}</select>`, hint);
const chips = (name, legend, options, type = 'radio') =>
  `<fieldset><legend>${legend}</legend><div class="chips">${options.map(([v, l, on]) =>
    `<label class="chip"><input type="${type}" name="${name}" value="${v}"${on ? ' checked' : ''}><span>${l}</span></label>`).join('')}</div></fieldset>`;
const ws = (controls, preview) =>
  `<div class="workspace"><div class="workspace__controls">${controls}</div><div class="workspace__preview">${preview}</div></div>`;

export const TOOLS = [
  {
    slug: 'engraving-ideas', script: 'engraving', name: 'Engraving ideas',
    title: 'Engraving ideas that fit the space',
    desc: 'Free engraving idea generator: short inscriptions by occasion and tone, checked against the character limit of rings, pens, watches and more.',
    short: 'Words for rings, pens, boards and frames, counted against the space you have.',
    ui: ws(
      `<div class="row">${select('eg-occasion', 'Occasion')}${select('eg-who', 'Who it is for')}</div>` +
      chips('eg-tone', 'Tone', [['any', 'Any', 1], ['heartfelt', 'Heartfelt'], ['classic', 'Classic'], ['playful', 'Playful'], ['minimal', 'Minimal']]) +
      `<div class="row">${text('eg-name', 'Their name', 'data-name-input autocomplete="off" maxlength="30"')}${text('eg-name2', 'Second name or yours', 'autocomplete="off" maxlength="30"', 'Optional')}</div>` +
      date('eg-date', 'A date to include', 'Optional') +
      select('eg-space', 'Where it will go') +
      `<div class="row">${field('eg-max', 'Characters per line', '<input type="number" id="eg-max" min="4" max="80" value="20">')}${field('eg-lines', 'Lines', '<input type="number" id="eg-lines" min="1" max="4" value="1">')}</div>` +
      `<p class="hint">Typical limits. Your maker’s own limit always wins, so change these numbers to match the listing.</p>`,
      `<h2>Preview</h2><div id="eg-mock" class="canvas"></div>` +
      field('eg-own', 'Try your own words', '<input type="text" id="eg-own" maxlength="120" autocomplete="off">') +
      `<p id="eg-fit" class="small" role="status"></p>` +
      `<h2>Lines that fit</h2><ul id="eg-results" class="results"></ul>` +
      `<div class="btn-row" style="margin-top:1rem"><button type="button" class="btn btn--quiet btn--small" id="eg-more">Show different lines</button></div>`),
    how: [
      ['Say who and why', 'Pick the occasion, the person and a tone. Add their name and a date if you want them worked in.'],
      ['Choose where it goes', 'Each object has a typical character limit. Change the numbers if your maker gives different ones.'],
      ['Pick a line or write your own', 'Every suggestion shows its character count. Press Preview to see it on the object, then Copy.'],
    ],
    faq: [
      ['How are characters counted?', 'The way engravers count: every letter, number, space and punctuation mark on a line.'],
      ['Are these inscriptions free to use?', 'Yes. Every line was written for this site and is yours to engrave, stitch or print on anything.'],
      ['Why does a line say it does not fit?', 'It is longer than the characters or lines you set. Shorten it, choose a larger object, or raise the limit if your maker allows more.'],
    ],
    related: ['roman-numeral-date-converter', 'monogram-maker', 'gift-tag-maker'],
    guide: 'what-to-engrave',
  },
  {
    slug: 'monogram-maker', script: 'monogram', name: 'Monogram maker',
    title: 'Free monogram maker',
    desc: 'Make a monogram with the initials in the right order. Seven lettering styles, seven frames, free PNG and SVG download, no sign-up.',
    short: 'Initials in the right order, in seven lettering styles. Download as PNG or SVG.',
    ui: ws(
      chips('mm-style', 'Layout', [['classic', 'Classic', 1], ['block', 'In order'], ['couple', 'Couple'], ['duo', 'Two names'], ['single', 'Single letter']]) +
      `<p id="mm-hint" class="hint"></p>` +
      `<div class="row"><div data-f="first">${text('mm-first', 'First name', 'data-name-input autocomplete="off" maxlength="30"')}</div><div data-f="middle">${text('mm-middle', 'Middle name', 'autocomplete="off" maxlength="30"', 'Optional')}</div></div>` +
      `<div class="row"><div data-f="last">${text('mm-last', 'Surname', 'autocomplete="off" maxlength="30"')}</div><div data-f="partner">${text('mm-partner', 'Partner’s first name', 'autocomplete="off" maxlength="30"')}</div></div>` +
      `<div class="row"><div data-f="joiner">${select('mm-joiner', 'Joined by', [['&', 'Ampersand (&)'], ['+', 'Plus (+)'], ['·', 'Dot (·)']])}</div><div data-f="swap" class="field"><span class="legend">Order</span><button type="button" class="btn btn--quiet btn--small" id="mm-swap">Swap sides</button></div></div>` +
      `<div class="row">${select('mm-font', 'Lettering')}${select('mm-frame', 'Frame')}</div>` +
      `<div class="row">${field('mm-color', 'Colour', '<input type="color" id="mm-color" value="#1b2a41">')}${field('mm-accent', 'Second colour', '<input type="color" id="mm-accent" value="#b4174e">', '<label><input type="checkbox" id="mm-accent-on"> Use it for the frame and centre letter</label>')}${select('mm-bg', 'Background', [['', 'Transparent'], ['#ffffff', 'White'], ['#f8f0dc', 'Cream'], ['#1b2a41', 'Navy']])}</div>`,
      `<h2>Your monogram</h2><div id="mm-canvas" class="canvas"></div>` +
      `<p id="mm-rule" class="small" role="status"></p>` +
      `<div class="btn-row"><button type="button" class="btn" id="mm-png">Download PNG</button><button type="button" class="btn btn--quiet" id="mm-svg">Download SVG</button></div>` +
      `<p class="hint">Free to use on anything, including things you sell. No sign-up. PNG is 2000 pixels square with the background you chose.</p>` +
      `<p><a id="mm-to-tag" href="../gift-tag-maker/">Put this initial on a gift tag</a></p>`),
    how: [
      ['Choose a layout', 'Classic puts the surname larger in the centre. In order keeps letters one size. Couple and Two names are for pairs.'],
      ['Type the names', 'Full names are fine. The maker takes the first letter of each and arranges them by the rule for that layout.'],
      ['Style and download', 'Pick lettering, a frame and colours, then save a PNG for printing or an SVG for cutting and engraving software.'],
    ],
    faq: [
      ['What order do the initials go in?', 'With a larger centre letter: first, surname, middle. With equal letters: first, middle, surname. The maker does this for you.'],
      ['Can I use the monogram commercially?', 'Yes. The design is yours. The typefaces are open-licensed fonts that allow commercial use.'],
      ['Which file should I download?', 'PNG for printing and documents. SVG for cutting machines, lasers and embroidery digitising, because it scales without blurring.'],
    ],
    related: ['gift-tag-maker', 'engraving-ideas', 'gift-certificate-maker'],
    guide: 'monogram-rules',
  },
  {
    slug: 'gift-tag-maker', script: 'tag-maker', name: 'Gift tag maker',
    title: 'Printable gift tag maker',
    desc: 'Design a gift tag with a name and message, then print a sheet of eight on card. Free, no sign-up.',
    short: 'A sheet of eight tags with their name on, ready to print on card.',
    ui: ws(
      `<div class="row">${text('tg-to', 'To', 'data-name-input autocomplete="off" maxlength="24" placeholder="Ava"')}${text('tg-from', 'From', 'autocomplete="off" maxlength="24"')}</div>` +
      text('tg-msg', 'A short line', 'autocomplete="off" maxlength="42"', 'Optional. Up to 42 characters.') +
      `<div class="row">${select('tg-shape', 'Shape', [['tag', 'Classic tag'], ['round', 'Round'], ['arch', 'Arch'], ['square', 'Square']])}${select('tg-font', 'Lettering', [['script', 'Script and capitals'], ['serif', 'Book serif'], ['type', 'Typewriter']])}</div>` +
      `<div class="row">${select('tg-motif', 'Motif', [['none', 'None'], ['heart', 'Heart'], ['star', 'Star'], ['leaf', 'Sprig'], ['snow', 'Snowflake'], ['initial', 'Their initial']])}${select('tg-border', 'Border', [['stitch', 'Stitched'], ['double', 'Double line'], ['none', 'None']])}</div>` +
      `<div class="row">${field('tg-paper', 'Tag colour', '<input type="color" id="tg-paper" value="#f8f0dc">')}${field('tg-ink', 'Ink colour', '<input type="color" id="tg-ink" value="#1b2a41">')}${select('tg-size', 'Paper', [['letter', 'US Letter'], ['a4', 'A4']])}</div>`,
      `<h2>Your tag</h2><div id="tg-canvas" class="canvas"></div>` +
      `<div class="btn-row" style="margin-top:1rem"><button type="button" class="btn" id="tg-print">Print a sheet of 8</button><button type="button" class="btn btn--quiet" id="tg-png">Download one as PNG</button></div>` +
      `<p class="hint">Print at 100% (actual size) on 200 gsm card or heavier. Cut on the dotted lines and punch the marked hole.</p>` +
      `<div id="tg-sheet" class="sheet print-only"></div>`),
    how: [
      ['Fill in the tag', 'Add who it is to and from, and a short line if you like.'],
      ['Choose the look', 'Shape, lettering, motif, border and colours all update as you change them.'],
      ['Print and cut', 'Print a sheet of eight on card at actual size, cut along the guides and thread with ribbon or string.'],
    ],
    faq: [
      ['What paper works best?', 'Card of 200 to 300 gsm. Most home printers feed it through the rear or manual tray.'],
      ['Can each tag have a different name?', 'Make one, print, change the name and print again. To save card, use the PNG download and arrange several in a document.'],
      ['Why is the print blank or cut off?', 'Set scale to 100% or actual size in the print dialog and turn on background graphics.'],
    ],
    related: ['gift-certificate-maker', 'monogram-maker', 'name-poem-generator'],
    guide: 'last-minute-personalized-gifts',
  },
  {
    slug: 'gift-certificate-maker', script: 'certificate', name: 'Gift certificate maker',
    title: 'Gift certificate and coupon maker',
    desc: 'Make a printable gift certificate or a set of personal coupons with their name on. Free, no sign-up.',
    short: 'A certificate or six coupons for time, favours and days out. Ready today.',
    ui: ws(
      chips('gc-kind', 'What to make', [['certificate', 'One certificate', 1], ['coupons', 'Six coupons']]) +
      text('gc-title', 'Heading', 'maxlength="34" value="Gift certificate"') +
      `<div class="row">${text('gc-to', 'For', 'data-name-input autocomplete="off" maxlength="28" placeholder="Ava"')}${text('gc-from', 'From', 'autocomplete="off" maxlength="28"')}</div>` +
      `<div data-kind="certificate">${field('gc-gift', 'What they get', '<textarea id="gc-gift" maxlength="150" rows="3">One Saturday of your choice: breakfast out, any museum, and I carry the bags.</textarea>', 'Be specific. Up to 150 characters.')}</div>` +
      `<div data-kind="coupons" hidden>${field('gc-coupons', 'Six promises, one per line', '<textarea id="gc-coupons" rows="7">Breakfast in bed\nOne full tank of fuel\nAn afternoon alone with a book\nYour choice of film, no complaints\nDinner cooked and washed up\nOne get-out-of-chores card</textarea>', 'Up to 44 characters each.')}</div>` +
      `<div class="row">${text('gc-until', 'Valid until', 'maxlength="24"', 'Optional. A deadline makes it happen.')}${select('gc-style', 'Style', [['classic', 'Classic border'], ['modern', 'Modern block'], ['playful', 'Playful']])}${field('gc-color', 'Colour', '<input type="color" id="gc-color" value="#b4174e">')}</div>`,
      `<h2>Preview</h2><div id="gc-sheet" class="sheet"></div>` +
      `<div class="btn-row" style="margin-top:1rem"><button type="button" class="btn" id="gc-print">Print</button><button type="button" class="btn btn--quiet" id="gc-png">Download PNG</button></div>` +
      `<p class="hint">Print landscape at actual size on card. Sign it in ink.</p>`),
    how: [
      ['Choose certificate or coupons', 'One certificate for a single promise, or six coupons to cut out and staple into a book.'],
      ['Write the promise', 'Name exactly what they get and add a date it is valid until.'],
      ['Print and sign', 'Print on card, trim, and sign by hand. Put it in an envelope with their name on the front.'],
    ],
    faq: [
      ['Is this a real voucher for a shop?', 'No. It is a personal promise from you. Nothing here can be redeemed with a business.'],
      ['What should I promise?', 'Time and effort they would not ask for: a planned day out, a chore taken over for a month, a meal cooked.'],
      ['Can children make one?', 'Yes. Print the coupons and let them fill in or decorate each one.'],
    ],
    related: ['gift-tag-maker', 'name-poem-generator', 'occasion-calendar'],
    guide: 'last-minute-personalized-gifts',
  },
  {
    slug: 'name-poem-generator', script: 'name-poem', name: 'Name poem generator',
    title: 'Name poem generator',
    desc: 'Turn any name into an acrostic poem, one line per letter. Edit every line, then print or download it. Free.',
    short: 'An acrostic from their name. Edit each line, then print and frame.',
    ui: ws(
      text('np-name', 'Their name', 'data-name-input autocomplete="off" maxlength="14" placeholder="Ava"', 'Up to 14 letters.') +
      chips('np-tone', 'Tone', [['warm', 'Warm', 1], ['playful', 'Playful'], ['proud', 'Proud']]) +
      `<div class="btn-row" style="margin-bottom:1rem"><button type="button" class="btn btn--quiet btn--small" id="np-shuffle">Shuffle the lines</button></div>` +
      `<fieldset><legend>Edit any line</legend><div id="np-lines"></div><p class="hint">Swap in things only you know. That is what makes it theirs.</p></fieldset>` +
      text('np-sign', 'Signed', 'maxlength="30" autocomplete="off"', 'Optional, such as "Love, Sam".'),
      `<h2>Preview</h2><div id="np-sheet" class="sheet"></div>` +
      `<div class="btn-row" style="margin-top:1rem"><button type="button" class="btn" id="np-print">Print</button><button type="button" class="btn btn--quiet" id="np-png">Download PNG</button><button type="button" class="btn btn--quiet" id="np-copy">Copy text</button></div>`),
    how: [
      ['Type the name', 'Each letter becomes the start of a line.'],
      ['Shuffle and edit', 'Shuffle for a new draft, then rewrite any line in your own words.'],
      ['Print or save', 'Print it portrait on card for a frame, or download a picture to send.'],
    ],
    faq: [
      ['What is an acrostic?', 'A poem where the first letters of the lines spell a word, here a name.'],
      ['Does it work for names with accents or unusual letters?', 'Accented letters use the lines for their base letter. Other characters get a blank line for you to fill in.'],
      ['Are the lines original?', 'Yes. They were written for this tool and are free to use.'],
    ],
    related: ['gift-certificate-maker', 'gift-tag-maker', 'engraving-ideas'],
    guide: 'last-minute-personalized-gifts',
  },
  {
    slug: 'birthstone-birth-flower-finder', script: 'birth-symbols', name: 'Birthstone and birth flower finder',
    title: 'Birthstone and birth flower finder',
    desc: 'Enter a birthday to see the birthstone, birth flower, zodiac sign and the day of the week they were born, with ideas for using them on a gift.',
    short: 'The stone, flower and sign for any birthday, and how to use them on a gift.',
    ui: ws(
      date('bs-date', 'Their birthday', 'The year is used for the weekday and the lunar-year animal.') +
      text('bs-name', 'Their name', 'data-name-input autocomplete="off" maxlength="30"', 'Optional. Used in the gift suggestions.'),
      `<h2>Their birth symbols</h2><div id="bs-out"><p class="small">Choose a date to see the stone, flower and sign.</p></div>`),
    how: [
      ['Enter the birthday', 'Day, month and year. The year only affects the weekday and the lunar-year animal.'],
      ['Read the symbols', 'The modern birthstone with any traditional alternative, both birth flowers and the sun sign.'],
      ['Use one on the gift', 'Each result comes with a way to work it into jewellery, a print or an engraving.'],
    ],
    faq: [
      ['Why do some months have more than one birthstone?', 'The jewellers’ list has been extended over time. June, August, October, November and December each have alternatives.'],
      ['Which list of birthstones is this?', 'The modern list first standardised by jewellers in 1912 and revised since, with the older traditional stone shown where it differs.'],
      ['Are zodiac dates exact?', 'They are the usual dates. A birthday on the first or last day of a sign can fall either side in some years.'],
    ],
    related: ['anniversary-gifts-by-year', 'engraving-ideas', 'roman-numeral-date-converter'],
    guide: 'personalizing-for-children',
    staticTable: 'birth',
  },
  {
    slug: 'anniversary-gifts-by-year', script: 'anniversary', name: 'Anniversary gifts by year',
    title: 'Anniversary gifts by year',
    desc: 'Enter a wedding date to see which anniversary is next, its traditional and modern themes, a personalized idea and when to order.',
    short: 'Which anniversary is next, its theme, and when to order.',
    ui: ws(
      date('an-date', 'Wedding date') +
      select('an-year', 'Or pick a year', [], 'Shows the themes without a countdown.'),
      `<h2>Your next anniversary</h2><div id="an-out"><p class="small">Enter a wedding date or pick a year.</p></div>`),
    how: [
      ['Enter the wedding date', 'The tool works out which anniversary comes next and how many days away it is.'],
      ['See both themes', 'Each year has a traditional material and a modern alternative.'],
      ['Check the order-by dates', 'The countdown includes when to order by, depending on how the gift is made.'],
    ],
    faq: [
      ['What is the difference between traditional and modern themes?', 'The traditional list is older and names materials such as paper and wood. The modern list was added in the twentieth century with practical alternatives such as clocks and appliances.'],
      ['Do the themes differ by country?', 'Slightly. For example the fourth year is fruit or flowers in the United States and linen or silk in the United Kingdom.'],
      ['Is there a theme for every year?', 'For years 1 to 25, then every fifth year to 60, and the 70th.'],
    ],
    related: ['roman-numeral-date-converter', 'engraving-ideas', 'occasion-calendar'],
    guide: 'dates-and-coordinates',
    staticTable: 'anniversary',
  },
  {
    slug: 'roman-numeral-date-converter', script: 'roman-date', name: 'Roman numeral date converter',
    title: 'Roman numeral date and coordinates converter',
    desc: 'Convert any date to Roman numerals for engraving or a tattoo, and format map coordinates in degrees, minutes and seconds. Free.',
    short: 'A date in Roman numerals, or a place as coordinates, ready to engrave.',
    ui: ws(
      `<h2>A date</h2>` + date('rd-date', 'Date') +
      `<div class="row">${select('rd-order', 'Order', [['dmy', 'Day, month, year'], ['mdy', 'Month, day, year'], ['ymd', 'Year, month, day']])}${select('rd-sep', 'Separator', [['dot', 'Dot'], ['middot', 'Centred dot'], ['dash', 'Dash'], ['slash', 'Slash'], ['space', 'Space']])}</div>` +
      `<label class="check"><input type="checkbox" id="rd-short"><span>Short year (26 instead of 2026)</span></label>` +
      `<h2>A number</h2>` + field('rd-num', 'Number from 1 to 3999', '<input type="number" id="rd-num" min="1" max="3999" inputmode="numeric">') +
      `<h2>A place</h2>` + text('rd-coords', 'Coordinates', 'autocomplete="off" placeholder="45.5019, -73.5674"', 'Press and hold a spot in a maps app to copy its coordinates, then paste them here.'),
      `<h2>Ready to engrave</h2><div id="rd-out"><p class="small">Choose a date, a number or a place.</p></div>`),
    how: [
      ['Pick the date', 'Choose the order your country uses and the separator you like.'],
      ['Copy the result', 'Each version shows its character count so you can check it against the space.'],
      ['Add a place', 'Paste coordinates to format them in the classic degrees, minutes and seconds style.'],
    ],
    faq: [
      ['How is 2026 written in Roman numerals?', 'MMXXVI: two thousands, two tens, a five and a one.'],
      ['Which date order should I use?', 'The one the recipient reads. Day first in most countries, month first in the United States.'],
      ['How accurate are coordinates with four decimals?', 'To about ten metres, enough to mark a doorway.'],
    ],
    related: ['engraving-ideas', 'anniversary-gifts-by-year', 'monogram-maker'],
    guide: 'dates-and-coordinates',
  },
  {
    slug: 'gift-exchange-generator', script: 'gift-exchange', name: 'Gift exchange generator',
    title: 'Gift exchange name generator',
    desc: 'Draw names for a gift exchange in your browser. Set exclusions, then send each person a private link. No sign-up, no emails collected.',
    short: 'Draw names, set who cannot draw whom, and send private links. No sign-up.',
    ui:
      `<div id="gx-reveal" hidden></div>` +
      `<div id="gx-setup">` + ws(
        `<div class="row">${text('gx-event', 'Name of the exchange', 'maxlength="40" placeholder="Rossi family, December"')}${text('gx-budget', 'Budget per gift', 'maxlength="20" placeholder="$25"')}</div>` +
        date('gx-date', 'Exchange date', 'Optional') +
        field('gx-names', 'Who is taking part', '<textarea id="gx-names" rows="7" placeholder="One name per line"></textarea>', 'One name per line, at least three people.') +
        `<fieldset><legend>Who should not draw whom</legend><div class="row">${select('gx-a', 'This person')}${select('gx-b', 'Cannot draw')}</div><button type="button" class="btn btn--quiet btn--small" id="gx-add-ex">Add this rule</button><ul id="gx-ex" class="plain-list"></ul><p class="hint">Useful for couples or people who share a home. Each rule works one way; add it twice for both directions.</p></fieldset>` +
        `<div class="btn-row"><button type="button" class="btn" id="gx-draw">Draw names</button></div><p id="gx-error" class="error" role="alert"></p>`,
        `<h2>Private links</h2><div id="gx-result"><p class="small">After the draw, each person gets their own link. Only that link shows who they are buying for.</p></div>`) +
      `</div>`,
    how: [
      ['List everyone', 'Type one name per line and add any rules about who cannot draw whom.'],
      ['Draw names', 'The draw happens in your browser. Nothing is uploaded or stored on a server.'],
      ['Send the links', 'Copy each person’s private link and send it by message or email. The link reveals only their own match.'],
    ],
    faq: [
      ['Can the organiser see who has whom?', 'Not unless they open someone else’s link. The results list shows names and links, not matches.'],
      ['Do participants need an account or email?', 'No. Each person only needs their link.'],
      ['What if someone loses their link?', 'Links are not stored anywhere. Keep the list of links until the exchange is over, or run the draw again.'],
    ],
    related: ['gift-list-planner', 'occasion-calendar', 'gift-tag-maker'],
    guide: 'when-to-order',
  },
  {
    slug: 'gift-list-planner', script: 'list-planner', name: 'Gift list planner',
    title: 'Gift list and budget planner',
    desc: 'Plan gifts for everyone on your list: ideas, budgets, dates and status, saved in your browser with CSV and calendar export.',
    short: 'Everyone you buy for, with budgets, dates and what stage each gift is at.',
    ui:
      `<form id="lp-form" class="panel panel--flat no-print"><div class="row">${text('lp-name', 'Who', 'required maxlength="40" autocomplete="off"')}${text('lp-occasion', 'Occasion', 'maxlength="40" autocomplete="off" list="lp-occasions"')}${date('lp-date', 'Date')}</div>` +
      `<datalist id="lp-occasions"><option value="Birthday"><option value="Christmas"><option value="Anniversary"><option value="Wedding"><option value="Thank you"></datalist>` +
      `<div class="row">${text('lp-idea', 'Gift idea', 'maxlength="80" autocomplete="off"')}${field('lp-budget', 'Budget', '<input type="number" id="lp-budget" min="0" step="1" inputmode="decimal">')}</div>` +
      `<button type="submit" class="btn">Add to the list</button></form>` +
      `<div id="lp-summary" class="cols" style="margin:1.5rem 0" role="status"></div>` +
      `<div class="table-scroll"><table class="data-table" id="lp-table"><thead><tr><th>Who</th><th>Occasion</th><th>Date</th><th>Idea</th><th>Budget</th><th>Status</th><th><span class="visually-hidden">Remove</span></th></tr></thead><tbody></tbody></table></div>` +
      `<p id="lp-empty" class="small">Nobody on the list yet. Add the first person above.</p>` +
      `<div class="btn-row no-print" style="margin-top:1.25rem"><button type="button" class="btn btn--quiet btn--small" id="lp-csv">Download CSV</button><button type="button" class="btn btn--quiet btn--small" id="lp-ics">Add dates to my calendar</button><button type="button" class="btn btn--quiet btn--small" id="lp-print">Print</button><button type="button" class="btn btn--quiet btn--small" id="lp-clear">Clear the list</button></div>`,
    how: [
      ['Add each person', 'Name, occasion, date, an idea and a budget.'],
      ['Move gifts along', 'Change the status as you go: idea, ordered, arrived, wrapped, given.'],
      ['Export when you like', 'Download a spreadsheet, or add the dates to your calendar with a reminder two weeks before.'],
    ],
    faq: [
      ['Where is my list stored?', 'Only in this browser on this device. Nothing is sent to us, and clearing your browser data removes it.'],
      ['Can I use it on my phone and laptop?', 'Each device keeps its own list. Use the CSV download to move it.'],
      ['Does it remind me?', 'The calendar export adds each date to your own calendar with a reminder 14 days before.'],
    ],
    related: ['occasion-calendar', 'gift-exchange-generator', 'engraving-ideas'],
    guide: 'when-to-order',
  },
  {
    slug: 'occasion-calendar', script: 'occasion-calendar', name: 'Occasion calendar',
    title: 'Gift occasion calendar with order-by dates',
    desc: 'Upcoming gift-giving dates worldwide with countdowns and order-by dates for personalized gifts. Add your own dates and export to your calendar.',
    short: 'What is coming up, how many days away, and when to order by.',
    ui:
      `<div id="oc-list"></div>` +
      `<div class="split" style="margin-top:2.5rem"><form id="oc-form" class="panel panel--flat"><h2>Add your own dates</h2><div class="row">${text('oc-name', 'What', 'required maxlength="50" autocomplete="off" placeholder="Mum’s birthday"')}${date('oc-date', 'When')}</div><label class="check"><input type="checkbox" id="oc-yearly" checked><span>Repeats every year</span></label><button type="submit" class="btn">Add date</button></form>` +
      `<div><h2>Your dates</h2><ul id="oc-own" class="plain-list"></ul><p id="oc-own-empty" class="small">None yet. Dates you add are saved in this browser only.</p><div class="btn-row" style="margin-top:1rem"><button type="button" class="btn btn--quiet" id="oc-ics">Add everything to my calendar</button></div><p class="hint">Downloads a calendar file with each date and a reminder 14 days before.</p></div></div>`,
    how: [
      ['Scan what is coming', 'The next gift-giving dates, soonest first, with the countries that observe them.'],
      ['Check the order-by dates', 'Each date shows when to order by for custom art, engraved or stitched gifts, and printed gifts.'],
      ['Add your own', 'Birthdays and anniversaries are saved in your browser and can be exported to your calendar.'],
    ],
    faq: [
      ['How are the order-by dates worked out?', 'They are rules of thumb: 28 days ahead for custom art, 14 for engraved and embroidered gifts, 10 for printed gifts. A maker’s own cut-off always wins.'],
      ['Why do some festival dates say expected?', 'Festivals that follow lunar calendars can move by a day depending on location or moon sighting.'],
      ['Does this page update itself?', 'Yes. Dates are calculated each time the page loads, and the site rebuilds itself daily.'],
    ],
    related: ['gift-list-planner', 'anniversary-gifts-by-year', 'gift-certificate-maker'],
    guide: 'when-to-order',
  },
  {
    slug: 'photo-print-size-calculator', script: 'photo-size', name: 'Photo print size calculator',
    title: 'Photo print size calculator',
    desc: 'Check whether a photo has enough pixels for a mug, print, canvas or blanket. Works in your browser; the photo is never uploaded.',
    short: 'How large a photo can print before it turns soft. Nothing is uploaded.',
    ui: ws(
      field('ps-file', 'Choose a photo', '<input type="file" id="ps-file" accept="image/*">', 'Read on your device only. It is never uploaded.') +
      `<p class="small">Or type its size in pixels:</p><div class="row">${field('ps-w', 'Width in pixels', '<input type="number" id="ps-w" min="1" inputmode="numeric" placeholder="4032">')}${field('ps-h', 'Height in pixels', '<input type="number" id="ps-h" min="1" inputmode="numeric" placeholder="3024">')}</div>` +
      chips('ps-unit', 'Sizes in', [['in', 'Inches', 1], ['cm', 'Centimetres']]),
      `<h2>How large it can print</h2><div id="ps-out"><p class="small">Choose a photo or enter its pixel size.</p></div>`),
    how: [
      ['Choose the photo', 'Your browser reads its width and height. The file stays on your device.'],
      ['Read the table', 'Every common print size is rated from sharp to soft for your photo.'],
      ['Pick a size that suits', 'Hand-held items need a sharp rating. Canvas and blankets are fine one step down.'],
    ],
    faq: [
      ['What do the ratings mean?', 'Sharp is 300 pixels per inch or more, good is 200 or more, fine from a distance is 150 or more, and soft is below that.'],
      ['Is my photo uploaded?', 'No. It is opened by your own browser only to read its dimensions.'],
      ['My photo is rated soft at the size I want. What can I do?', 'Find the original file, choose a smaller size, or choose canvas or fabric, which hide softness better.'],
    ],
    related: ['engraving-ideas', 'gift-tag-maker', 'gift-list-planner'],
    guide: 'photo-resolution',
  },
];
