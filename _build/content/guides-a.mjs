// Guides, part one. Body is plain HTML; the build adds heading ids and the contents list.

export const GUIDES_A = [
  {
    slug: 'what-to-engrave',
    title: 'What to engrave: choosing words that fit the space',
    desc: 'How many characters fit on rings, pens, watches and boards, and how to choose an inscription you will still like in twenty years.',
    updated: '2026-11-19',
    takeaways: [
      'Count characters before you fall in love with a sentence: most rings hold 15 to 30, a knife handle about 20, a mug about 30.',
      'A name and a date is a complete engraving. Everything after that is optional.',
      'Write it the way you speak. Stock phrases age; your own words do not.',
    ],
    tools: ['engraving-ideas', 'roman-numeral-date-converter'],
    body: `
<p>Engraving is the one kind of writing you cannot edit. That makes people freeze, then reach for a phrase they have seen on a hundred other gifts. There is a better way to decide, and it starts with a ruler, not a thesaurus.</p>
<h2>Start with the space</h2>
<p>Every object has a limit, and it is smaller than it looks. Makers publish their own numbers, and those always win, but the ranges below hold across most of what is sold.</p>
<table>
<thead><tr><th>Object</th><th>Typical limit</th><th>What fits</th></tr></thead>
<tbody>
<tr><td>Ring, inside the band</td><td>15 to 30 characters</td><td>A date and initials, or three or four words</td></tr>
<tr><td>Bar necklace</td><td>10 to 15 characters</td><td>A name, a date, or coordinates on the back</td></tr>
<tr><td>Bracelet or cuff</td><td>20 to 30 characters</td><td>A short sentence</td></tr>
<tr><td>Key ring</td><td>Two lines of about 14</td><td>A name and a date</td></tr>
<tr><td>Pen</td><td>About 30 characters</td><td>A full name</td></tr>
<tr><td>Pocket knife</td><td>Under 20 characters</td><td>A name and a year</td></tr>
<tr><td>Watch back</td><td>Three lines of about 20</td><td>A date, a line, your initial</td></tr>
<tr><td>Mug or glass</td><td>About 30 across</td><td>A name or a short line</td></tr>
<tr><td>Frame plate</td><td>Three lines of about 25</td><td>Names, date, place</td></tr>
<tr><td>Cutting board</td><td>Two lines of about 28</td><td>Family name and a year</td></tr>
</tbody>
</table>
<p>Spaces and punctuation count as characters. Narrow bands and hard metals reduce the limit further, and resizing a ring later can damage what is written inside it.</p>
<h2>The four things worth engraving</h2>
<p><strong>A name.</strong> The oldest reason to mark an object. Use the name they answer to. On anything used at work, the full name; on anything worn, the short one.</p>
<p><strong>A date.</strong> Dates need no explanation and never embarrass anyone. Roman numerals make a date look like decoration to everyone except the person who knows what it marks.</p>
<p><strong>A place.</strong> Coordinates do the same job as a date for a location: where you met, where they were born, the first front door.</p>
<p><strong>A line.</strong> The hardest, and the one people remember. Keep it under six words. If it would sound odd said aloud across a kitchen table, it will read oddly in metal.</p>
<h2>How to write a line that lasts</h2>
<ul>
<li>Use something one of you has actually said. A phrase from a message beats any quotation.</li>
<li>Describe the person, not the feeling. "First to laugh" will still be true in thirty years.</li>
<li>Leave out the age and the job. Both change.</li>
<li>Avoid published song lyrics and poems. They belong to someone else, and to everyone else who chose them.</li>
<li>For a pair of rings, split one sentence across the two.</li>
</ul>
<h2>Fonts, capitals and line breaks</h2>
<p>Small engraving reads best in plain capitals. Script needs height to stay legible, so save it for watch backs, frames and boards. Break lines where you would pause if reading aloud, and never leave a single short word on the last line.</p>
<h2>Before you approve the proof</h2>
<p>Read it aloud, then read it backwards word by word; that is how proofreaders catch spelling. Check every digit of the date against a calendar, including the year. Ask the maker which side it goes on and which way up. Then stop editing. A plain, correct engraving is better than a clever one you are unsure of.</p>`,
    faq: [
      ['Do spaces count towards the character limit?', 'Yes. Makers count every character, including spaces and punctuation. The engraving ideas tool counts the same way.'],
      ['Is it better to engrave a name or a message?', 'A name, if you can only have one. It makes the object theirs and it is never wrong.'],
      ['Can an engraving be removed or changed?', 'Rarely, and never invisibly. A jeweller can sometimes polish out a shallow engraving on a thick piece, but assume it is permanent.'],
    ],
    sources: ['Character limits compared across published maker guidance, including ring limits of 15 to 30 characters and handle limits under 20.'],
  },
  {
    slug: 'monogram-rules',
    title: 'Monogram rules: whose initial goes where',
    desc: 'The order of initials for one person, for couples, and for households, with the modern exceptions.',
    updated: '2026-11-19',
    takeaways: [
      'Centre letter larger: first, LAST, middle. All letters the same size: first, middle, last.',
      'For a couple who share a surname, the surname initial goes in the centre with a first initial each side.',
      'When in doubt, one letter is always correct.',
    ],
    tools: ['monogram-maker'],
    body: `
<p>A monogram is initials arranged as a design. The arrangement follows a convention that is easy to learn and, these days, easy to adapt. What matters is that the person recognises themselves in it.</p>
<h2>One person, three initials</h2>
<p>There are two layouts. In the classic layout the surname initial stands larger in the centre, with the first-name initial on its left and the middle-name initial on its right. Ava Marie Rossi becomes A, large R, M. In the block layout all three letters are the same size and appear in reading order: A, M, R.</p>
<p>The classic layout is the one most people picture when they hear the word monogram. Use it for script and decorative lettering. Use the block layout for plain capitals on leather goods, luggage and anything sporty.</p>
<h2>One person, two initials</h2>
<p>No middle name, or prefer not to use it? Two letters of equal size, first then last. Do not enlarge one of two letters; it looks like a mistake.</p>
<h2>A single initial</h2>
<p>Use the surname initial on things a household shares, such as towels, glasses and a doormat. Use the first-name initial on personal things: a necklace, a notebook, a wash bag. A single letter is also the safest gift when a surname may be about to change.</p>
<h2>Couples</h2>
<p>For a couple who share a surname, the shared initial sits larger in the centre with one partner's first initial on each side. Older etiquette put the bride's initial on the left. Today the order is the couple's choice, and many simply use the order in which they say their names.</p>
<p>For a couple with different surnames, use the two first initials joined by an ampersand or a small dot, or stack the two surnames' initials. Do not invent a joint surname for them.</p>
<p>One traditional point still worth observing: a joint monogram is used after the wedding. For gifts given before the day, use first names or a date.</p>
<h2>Changing names</h2>
<p>If someone takes a new surname, the old surname often moves to the middle position. Ask which they prefer. If you cannot ask, use the first initial alone.</p>
<h2>Letters that do not behave</h2>
<p>Names with prefixes such as Mc, O' or De are usually reduced to the first letter of the surname as the family writes it. Double-barrelled surnames can take both initials in the centre, though four letters crowd a small space. Some script capitals are hard to tell apart, I and J in particular, so check the proof with the font you have chosen.</p>
<h2>Where to put it</h2>
<table>
<thead><tr><th>Item</th><th>Usual placement</th></tr></thead>
<tbody>
<tr><td>Bath towel</td><td>Centred, about 10 cm above the hem</td></tr>
<tr><td>Shirt</td><td>Cuff, or left chest pocket</td></tr>
<tr><td>Tote or wash bag</td><td>Centred, or bottom right for a quieter look</td></tr>
<tr><td>Wallet or passport cover</td><td>Bottom right corner</td></tr>
<tr><td>Stationery</td><td>Top centre</td></tr>
</tbody>
</table>`,
    faq: [
      ['Is the middle initial on the left or the right?', 'On the right, when the surname is larger in the centre. In a block monogram it sits in the middle, in reading order.'],
      ['Are there different rules for men and women?', 'Convention once gave the centred style to women and the in-order style to men. Either is now used by anyone, so choose by the look of the lettering.'],
      ['What do we use if we have different surnames?', 'Two first initials with an ampersand. It is accurate, balanced, and needs no explanation.'],
    ],
    sources: ['Monogram order as described in retailers’ published monogram guides and standard etiquette references.'],
  },
  {
    slug: 'when-to-order',
    title: 'How early to order a personalized gift',
    desc: 'Realistic lead times for engraved, embroidered, printed and custom-art gifts, and how to count back from the day.',
    updated: '2026-11-19',
    takeaways: [
      'Rule of thumb: printed gifts 10 days, engraved or embroidered 14 days, custom art 28 days before you need it.',
      'Add a week in the month before Christmas, Mother’s Day and Valentine’s Day.',
      'If you are inside the window, print something today and give the made piece later.',
    ],
    tools: ['occasion-calendar', 'gift-list-planner'],
    body: `
<p>A personalized gift is made after you order it. That single fact explains every late parcel. The item does not exist yet, the maker has a queue, and nothing can be swapped from a shelf if it goes wrong.</p>
<h2>What the time is made of</h2>
<p>Three stages add up. <strong>Proofing</strong> is the back-and-forth to approve the design, from zero to three days and faster if you reply at once. <strong>Production</strong> runs from one day for printed items to several weeks for hand-drawn art. <strong>Delivery</strong> is the part you already understand, and the only part express shipping shortens.</p>
<table>
<thead><tr><th>How it is made</th><th>Typical production</th><th>Order before the day by</th></tr></thead>
<tbody>
<tr><td>Printable you make yourself</td><td>Minutes</td><td>The same day</td></tr>
<tr><td>Printed and photo gifts</td><td>2 to 5 working days</td><td>10 days</td></tr>
<tr><td>Engraved and embroidered</td><td>3 to 7 working days</td><td>14 days</td></tr>
<tr><td>Custom art and handmade</td><td>2 to 4 weeks</td><td>28 days</td></tr>
<tr><td>Bulk orders with names or logos</td><td>2 to 6 weeks</td><td>6 to 8 weeks</td></tr>
</tbody>
</table>
<p>These are planning figures, not promises. Individual makers on marketplaces often quote one to three working days for simple engraved pieces; studios producing branded gift boxes quote two to six weeks. Always read the estimate on the listing itself.</p>
<h2>Counting back</h2>
<ol>
<li>Start from the day you will hand it over, not the occasion. If you travel on the 22nd, that is your date.</li>
<li>Subtract two days for wrapping and the unexpected.</li>
<li>Subtract the lead time from the table.</li>
<li>If the date you land on has passed, change the plan, not the calendar.</li>
</ol>
<h2>The busy months</h2>
<p>From mid-November every maker is working at capacity, and published Christmas cut-offs fall anywhere from late November to mid-December. The weeks before Mother's Day and Valentine's Day are the next busiest. Add a week in those periods, and order custom art before the rush begins.</p>
<h2>Sending abroad</h2>
<p>International parcels add customs. Allow four to six weeks in total, and check whether the recipient will be charged duty; a gift that arrives with a bill is not the effect you want. A maker in the recipient's own country removes the problem.</p>
<h2>When you are already late</h2>
<p>Give a promise, properly presented. Print a certificate describing the gift that is on its way, put it in an envelope with their name on it, and hand over the real thing when it arrives. People enjoy the second moment as much as the first.</p>`,
    faq: [
      ['What is the latest I can order for Christmas?', 'It depends on the maker. As a plan, order custom art by mid-November, engraved and stitched gifts by the first week of December and printed gifts by about the 12th.'],
      ['Does paying for express delivery help?', 'It shortens delivery only. If production takes a week, express shipping does not change that.'],
      ['How long do bulk personalized orders take?', 'Allow six to eight weeks from first enquiry: time to agree the design, two to six weeks of production, then delivery.'],
    ],
    sources: ['Production windows as published by makers and gifting studios read in November 2026, including two to six weeks for branded corporate gifts and one to three working days for simple marketplace engraving.'],
  },
  {
    slug: 'proof-checklist',
    title: 'Check it before it is permanent: a twelve-point proof',
    desc: 'The checks to run on spelling, dates, sizes and photos before you approve a personalized order.',
    updated: '2026-11-19',
    takeaways: [
      'Most personalized items cannot be returned unless the maker made the error, so the proof is your only safety net.',
      'Read names letter by letter and dates digit by digit, against a written source.',
      'Save a copy of exactly what you approved.',
    ],
    tools: ['engraving-ideas', 'photo-print-size-calculator'],
    body: `
<p>When you approve a proof you take responsibility for everything on it. Makers reproduce what you send, spelling mistakes included, and personalized goods are generally exempt from the usual right to return something you have changed your mind about. Five minutes here saves the gift.</p>
<h2>Names</h2>
<ol>
<li><strong>Spell it from a written source.</strong> An email signature, a birth announcement, an invitation. Not memory.</li>
<li><strong>Check capitals and marks.</strong> McKenna, van der Berg, Zoë, Renée. Ask whether the font includes accented letters.</li>
<li><strong>Use the name they use.</strong> Katherine may be Kate to everyone, and prefer it.</li>
<li><strong>Confirm the order of initials.</strong> First, LAST, middle for a centred monogram; first, middle, last for a block one.</li>
</ol>
<h2>Dates and numbers</h2>
<ol start="5">
<li><strong>Check each digit against a calendar.</strong> The year is where mistakes hide.</li>
<li><strong>Agree the format.</strong> 03.04.2027 is March in one country and April in another. Roman numerals or a written month remove the doubt.</li>
<li><strong>Verify coordinates.</strong> Paste them into a map and make sure the pin lands where you expect.</li>
</ol>
<h2>The text itself</h2>
<ol start="8">
<li><strong>Read it aloud, then backwards.</strong> Reading word by word in reverse order stops your eye from skipping.</li>
<li><strong>Remove instructions from the text box.</strong> "No full stop please" has been engraved on more than one ring.</li>
<li><strong>Check apostrophes.</strong> The Rossis, plural, takes none. Rossi's kitchen takes one.</li>
</ol>
<h2>The object</h2>
<ol start="11">
<li><strong>Confirm size, colour and metal.</strong> Ring size, necklace length, shirt size, left- or right-handed mug.</li>
<li><strong>Check the photo.</strong> Is it sharp at the size you are printing, and will the crop cut anyone off?</li>
</ol>
<h2>After you approve</h2>
<p>Take a screenshot of the approved proof and keep the order confirmation. If the finished piece differs from what you approved, the maker should put it right, and those two documents are your evidence. If it matches what you approved, the mistake is yours to live with, which is the whole reason for the list above.</p>`,
    faq: [
      ['Can I return a personalized gift?', 'Usually only if it is faulty or differs from the proof you approved. Check the seller’s policy before you order.'],
      ['What if the maker does not send a proof?', 'Ask for one. If none is offered, read your own text again in the order confirmation the moment it arrives and reply at once if anything is wrong.'],
      ['How quickly can I change an order?', 'Often only within an hour or two, before production starts. Message the maker directly as soon as you spot a problem.'],
    ],
    sources: ['Returns and cancellation practice as published in marketplace shop policies read in November 2026.'],
  },
  {
    slug: 'engraving-embroidery-printing',
    title: 'Engraving, embroidery or print: which lasts, and which suits what',
    desc: 'A plain comparison of the ways gifts are personalized, what each costs, and how each one wears.',
    updated: '2026-11-19',
    takeaways: [
      'Engraving and embroidery become part of the object; print sits on top of it.',
      'Match the method to the material: metal and wood engrave, fabric stitches, ceramic and paper print.',
      'Ask which method a listing really uses. “Engraved” sometimes means a surface mark on a coating.',
    ],
    tools: ['engraving-ideas', 'monogram-maker'],
    body: `
<p>The word personalized covers at least six different processes. They look different, cost different amounts and survive differently, and listings do not always say which one you are buying.</p>
<h2>The methods compared</h2>
<table>
<thead><tr><th>Method</th><th>Best on</th><th>How it wears</th><th>Good for</th></tr></thead>
<tbody>
<tr><td>Engraving (cut or laser)</td><td>Metal, wood, glass, slate</td><td>Permanent</td><td>Names, dates, short lines</td></tr>
<tr><td>Stamping and embossing</td><td>Leather, soft metal, paper</td><td>Permanent; softens with age</td><td>Initials</td></tr>
<tr><td>Embroidery</td><td>Towels, robes, bags, knitwear</td><td>Outlasts the fabric</td><td>Names and monograms</td></tr>
<tr><td>Sublimation print</td><td>Coated mugs, polyester</td><td>Very good; cannot be felt</td><td>Photos, full colour</td></tr>
<tr><td>Direct print (UV or ink)</td><td>Phone cases, wood, cotton</td><td>Good; can scratch or fade</td><td>Colour artwork</td></tr>
<tr><td>Vinyl and transfers</td><td>Glass, tumblers, shirts</td><td>Fair; edges can lift</td><td>One-off craft projects</td></tr>
</tbody>
</table>
<h2>Engraving</h2>
<p>A cutter or laser removes material, so the mark is as durable as the object. On bare metal and wood it is permanent. On coated items, such as powder-coated bottles, the laser removes the coating to show the metal beneath; that is durable too, but it is a different look. Colour is limited to the material itself.</p>
<h2>Stamping and embossing</h2>
<p>A heated die presses letters into leather, with or without metallic foil. Blind stamping, without foil, darkens and softens as the leather ages. Foil is brighter on day one and can wear on corners that rub.</p>
<h2>Embroidery</h2>
<p>Thread is stitched through the fabric by machine. It gives height and texture, and it survives hot washes. It needs space: letters under about 6 mm tall close up, so long names go smaller and blur. Thread colour is the main design decision.</p>
<h2>Printing</h2>
<p>Sublimation turns ink to gas and fixes it into a polymer coating or polyester fibre, which is why a good photo mug survives a dishwasher. Direct printing lays ink on the surface and is the usual method for phone cases and wooden signs. Both handle photographs, which no cutting method can.</p>
<h2>Choosing</h2>
<ul>
<li>For an heirloom, choose a method that removes or adds material: engraving, stamping, embroidery.</li>
<li>For a photograph, choose print, and check the file size first.</li>
<li>For something washed weekly, choose embroidery or sublimation.</li>
<li>For a one-off made at home, vinyl is quick and forgiving.</li>
</ul>`,
    faq: [
      ['Is laser engraving as good as hand engraving?', 'For lettering on gifts, yes. Laser work is precise and consistent. Hand engraving has more character and costs more.'],
      ['Will a printed mug fade?', 'A sublimation-printed mug should last years of dishwashing. Cheap surface prints fade sooner, so ask how it is made.'],
      ['What is the cheapest way to personalize a gift?', 'Print something yourself, or add a hand-written tag. After that, simple engraving on a small item.'],
    ],
    sources: [],
  },
  {
    slug: 'bulk-personalized-gifts',
    title: 'Ordering ten or more: minimums, pricing and timelines for bulk personalized gifts',
    desc: 'How bulk and corporate personalized gift orders work: minimum quantities, what drives price, and a planning timeline.',
    updated: '2026-11-19',
    takeaways: [
      'Published minimums cluster around 10, 25 and 50 units; on-demand services start at one.',
      'Individual names cost more than one repeated logo, because every piece is a separate job.',
      'Start six to eight weeks ahead. Production alone is commonly quoted at two to six weeks.',
    ],
    tools: [],
    body: `
<p>Buying personalized gifts for a team, a wedding party or a client list is a different purchase from buying one. Suppliers quote instead of listing a price, the minimum order matters, and the calendar is longer. Knowing how they think gets you a better quote faster.</p>
<h2>What suppliers ask first</h2>
<p>Every gifting studio we read opens with the same four questions: what is the occasion, how many gifts, what budget per gift, and when do you need them. Have those answers ready and you skip a round of email.</p>
<h2>Minimum quantities</h2>
<p>Minimums exist because setting up a logo, a box or an engraving file costs the same for one piece as for a hundred. From supplier pages read in November 2026:</p>
<table>
<thead><tr><th>Type of order</th><th>Minimums we saw published</th></tr></thead>
<tbody>
<tr><td>Print-on-demand items</td><td>From 1 unit</td></tr>
<tr><td>Logo on a card, tag or band</td><td>From about 10 gifts</td></tr>
<tr><td>Custom kitted or fully branded boxes</td><td>From about 25 units</td></tr>
<tr><td>Imprinted drinkware and promotional items</td><td>Often 50 units</td></tr>
</tbody>
</table>
<h2>Names, logos or both</h2>
<p>A logo is one setup repeated. A name is a new setup for every piece, and a new chance of a spelling mistake. Expect individual names to add cost per unit and time for checking. The best-received corporate gifts carry the recipient's name on the object and the company's mark only on the card or box.</p>
<h2>What drives the price</h2>
<ul>
<li><strong>Quantity.</strong> Unit prices fall at volume breaks; ask where the next one is.</li>
<li><strong>Method.</strong> One-colour engraving is cheaper than full-colour print or embroidery.</li>
<li><strong>Setup and artwork.</strong> Often a one-off fee; some suppliers include design help.</li>
<li><strong>Packaging.</strong> Custom boxes, sleeves and inserts can cost as much as the gift.</li>
<li><strong>Delivery.</strong> One address is simple. Hundreds of home addresses add per-parcel fees and, for warehoused stock, storage charges.</li>
</ul>
<h2>A planning timeline</h2>
<table>
<thead><tr><th>Weeks before delivery</th><th>What happens</th></tr></thead>
<tbody>
<tr><td>8</td><td>Send the brief; collect quotes</td></tr>
<tr><td>7</td><td>Choose a supplier; supply logo files and the list of names</td></tr>
<tr><td>6</td><td>Approve proofs and a sample</td></tr>
<tr><td>5 to 2</td><td>Production</td></tr>
<tr><td>1</td><td>Delivery and distribution</td></tr>
</tbody>
</table>
<h2>The list of names</h2>
<p>Send names in a spreadsheet, one row per person, exactly as each should appear. Ask every recipient, or their manager, to confirm their own line. Include a column for delivery address only if gifts go to homes, and share addresses only with the supplier that needs them.</p>
<h2>Before you send anything to a client</h2>
<p>Check gift policies on both sides. Many organisations limit the value of gifts their staff may accept, and tax treatment of business gifts differs by country, so ask your accountant how they are handled where you are.</p>`,
    faq: [
      ['What is the minimum order for personalized corporate gifts?', 'It depends on how they are branded. Published minimums commonly sit at 10, 25 or 50 units, and print-on-demand services accept single items.'],
      ['Can each gift have a different name?', 'Yes. Suppliers call it individual personalization. It adds cost and time, and you must supply a checked list of names.'],
      ['How do I get quotes?', 'Use the quote request on this site. Tell us the occasion, quantity, budget and date, and we pass the brief to suitable suppliers.'],
    ],
    sources: ['Minimums, pricing models and production times as published on corporate gifting supplier pages read on 19 November 2026.'],
  },
];
