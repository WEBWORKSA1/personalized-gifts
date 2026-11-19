// Guides, part two.

export const GUIDES_B = [
  {
    slug: 'photo-resolution',
    title: 'Will my photo print well? Pixels by print size',
    desc: 'How many pixels a photo needs for mugs, prints, canvases and blankets, and how to check a file before you order.',
    updated: '2026-11-19',
    takeaways: [
      'Aim for 300 pixels per inch on anything held in the hand, and 150 on anything hung on a wall.',
      'Divide the photo’s pixel width by the print width in inches to get its pixels per inch.',
      'Photos saved from social media or messaging apps are usually too small. Get the original.',
    ],
    tools: ['photo-print-size-calculator'],
    body: `
<p>A photo is a grid of pixels. Print it small and the pixels are packed tightly and the picture looks sharp. Stretch the same grid across a blanket and each pixel becomes a visible square. The only question is how far your file can stretch.</p>
<h2>The one sum</h2>
<p>Pixels per inch equals the photo's width in pixels divided by the print's width in inches. A 4,000-pixel-wide photo printed 10 inches wide gives 400 pixels per inch, which is excellent. Printed 40 inches wide, it gives 100, which is soft.</p>
<h2>How many is enough</h2>
<table>
<thead><tr><th>Pixels per inch</th><th>Result</th><th>Use it for</th></tr></thead>
<tbody>
<tr><td>300 or more</td><td>Sharp at reading distance</td><td>Photo books, cards, mugs, small prints</td></tr>
<tr><td>200 to 299</td><td>Good</td><td>Framed prints, calendars</td></tr>
<tr><td>150 to 199</td><td>Fine from a step back</td><td>Canvas, posters, blankets</td></tr>
<tr><td>Under 150</td><td>Visibly soft</td><td>Choose a smaller size</td></tr>
</tbody>
</table>
<p>Viewing distance is why the bar drops for large pieces. Nobody reads a canvas from 30 centimetres away, and woven or fleece fabric cannot hold fine detail anyway.</p>
<h2>Pixels needed at common sizes</h2>
<table>
<thead><tr><th>Print size</th><th>At 300 per inch</th><th>At 150 per inch</th></tr></thead>
<tbody>
<tr><td>4 x 6 in (10 x 15 cm)</td><td>1200 x 1800</td><td>600 x 900</td></tr>
<tr><td>5 x 7 in (13 x 18 cm)</td><td>1500 x 2100</td><td>750 x 1050</td></tr>
<tr><td>8 x 10 in (20 x 25 cm)</td><td>2400 x 3000</td><td>1200 x 1500</td></tr>
<tr><td>12 x 18 in (30 x 45 cm)</td><td>3600 x 5400</td><td>1800 x 2700</td></tr>
<tr><td>16 x 20 in (40 x 50 cm)</td><td>4800 x 6000</td><td>2400 x 3000</td></tr>
<tr><td>24 x 36 in (60 x 90 cm)</td><td>7200 x 10800</td><td>3600 x 5400</td></tr>
</tbody>
</table>
<h2>Finding your photo's size</h2>
<p>On a phone, open the photo and look at its details or info panel; the dimensions are listed in pixels. On a computer, right-click the file and choose properties or get info. Or drop the file into our photo size calculator, which reads the dimensions on your own device without uploading anything.</p>
<h2>Why a good-looking photo can still fail</h2>
<ul>
<li><strong>It was sent through a messaging app.</strong> Most shrink photos to save data. Ask for the original by email or a shared album.</li>
<li><strong>It was saved from a social feed.</strong> Those copies are small and heavily compressed.</li>
<li><strong>It was cropped.</strong> Cropping throws pixels away. A face cut from a group shot may be only a few hundred pixels wide.</li>
<li><strong>It is a screenshot.</strong> A screenshot has the pixels of your screen, not of the photo.</li>
</ul>
<h2>Other things printers reject</h2>
<p>Dark, noisy pictures taken indoors at night look worse in print than on a bright screen. Leave a margin around faces, because products trim or wrap the edges. And check the shape: a square photo on a tall phone case loses its sides.</p>`,
    faq: [
      ['How many megapixels do I need?', 'Twelve megapixels, the size most phones have produced for years, is enough for a sharp print up to about 9 x 13 inches and a good canvas up to about 20 x 27.'],
      ['Can I enlarge a small photo with software?', 'Upscaling tools can help a little, but they invent detail. For faces, a smaller sharp print is better than a large guessed one.'],
      ['Is the calculator private?', 'Yes. The photo is read by your browser to get its width and height and is never sent anywhere.'],
    ],
    sources: [],
  },
  {
    slug: 'dates-and-coordinates',
    title: 'Roman numerals, coordinates and other quiet ways to mark a day',
    desc: 'How to write a date in Roman numerals, format coordinates for engraving, and avoid the common mistakes.',
    updated: '2026-11-19',
    takeaways: [
      'Roman numerals turn a date into pattern: 14 February 2026 becomes XIV.II.MMXXVI.',
      'Coordinates need both a latitude and a longitude, each with its N/S or E/W letter.',
      'Decide the day-month order before you convert; numerals hide the difference.',
    ],
    tools: ['roman-numeral-date-converter'],
    body: `
<p>Not every gift should announce what it celebrates. A date in Roman numerals or a pair of coordinates looks like decoration to a stranger and means everything to the wearer.</p>
<h2>Roman numerals in one minute</h2>
<p>Seven letters do all the work: I is 1, V is 5, X is 10, L is 50, C is 100, D is 500 and M is 1000. Write the largest values first and add them up. A smaller letter placed before a larger one is subtracted, which is how 4 becomes IV and 9 becomes IX.</p>
<table>
<thead><tr><th>Number</th><th>Numeral</th><th>Number</th><th>Numeral</th></tr></thead>
<tbody>
<tr><td>1</td><td>I</td><td>12</td><td>XII</td></tr>
<tr><td>4</td><td>IV</td><td>19</td><td>XIX</td></tr>
<tr><td>9</td><td>IX</td><td>25</td><td>XXV</td></tr>
<tr><td>10</td><td>X</td><td>31</td><td>XXXI</td></tr>
<tr><td>2000</td><td>MM</td><td>2027</td><td>MMXXVII</td></tr>
</tbody>
</table>
<h2>Writing a full date</h2>
<p>Convert the day, the month and the year separately, then join them with dots, small centred dots or dashes. The fourteenth of February 2026 is XIV.II.MMXXVI. Years take the most room: 2026 is seven letters, 1988 is eleven. If space is tight, use the last two digits of the year or drop the year.</p>
<p>Decide the order first. Day-month-year is usual in most of the world; month-day-year in the United States. With numerals, II.III could be the second of March or the third of February, and no one can tell afterwards.</p>
<h2>Coordinates</h2>
<p>A location is two numbers: latitude, north or south of the equator, and longitude, east or west of Greenwich. They are written in one of two ways.</p>
<ul>
<li><strong>Decimal degrees:</strong> 45.5019° N, 73.5674° W. Compact and easy to check.</li>
<li><strong>Degrees, minutes and seconds:</strong> 45°30′07″N 73°34′03″W. The classic engraved look.</li>
</ul>
<p>To find them, press and hold on the spot in a maps app; the coordinates appear in the search bar or the place details. Four decimal places are accurate to about ten metres, enough to mark a doorway.</p>
<h2>Mistakes to avoid</h2>
<ul>
<li>Dropping the minus sign or the letter. 45.5, 73.5 without W lands in Kazakhstan, not Canada.</li>
<li>Swapping latitude and longitude. Latitude comes first and never exceeds 90.</li>
<li>Rounding too far. Two decimal places is a neighbourhood; four is a front door.</li>
</ul>
<h2>Other quiet marks</h2>
<p>A birth flower in place of a name. The time on a watch-face print set to the moment a child was born. A postcode. Initials in the order only family would recognise. Each says the thing without saying it aloud.</p>`,
    faq: [
      ['How do I write the year 2000 in Roman numerals?', 'MM. The year 2026 is MMXXVI and 1999 is MCMXCIX.'],
      ['Is there a zero in Roman numerals?', 'No. If you shorten a year ending in 00, write the full year.'],
      ['Which coordinate format should I engrave?', 'Degrees, minutes and seconds look traditional; decimals are shorter. Both point to the same place.'],
    ],
    sources: [],
  },
  {
    slug: 'last-minute-personalized-gifts',
    title: 'Last-minute personalized gifts you can finish today',
    desc: 'Six personalized gifts to make and print in under an hour, and how to present them so they do not look last-minute.',
    updated: '2026-11-19',
    takeaways: [
      'A specific promise on good card is a real gift. A vague one is an apology.',
      'Everything here needs a printer, card stock and ten minutes.',
      'Presentation does the rest: a frame, an envelope, a ribbon, your signature.',
    ],
    tools: ['gift-certificate-maker', 'gift-tag-maker', 'name-poem-generator', 'monogram-maker'],
    body: `
<p>Made-to-order gifts need a week or more. When the day is tomorrow, the answer is not a faster courier; it is a gift you can finish at your own table. Done with care, these are often the ones that get kept.</p>
<h2>1. A certificate for time together</h2>
<p>Name the experience, the date range and who is paying. "One Saturday in March, the museum of your choice, lunch included" is a plan. Print it on card, sign it, and put it in an envelope with their name on the front.</p>
<h2>2. A coupon book</h2>
<p>Six small promises they can redeem: breakfast in bed, a full tank, an afternoon alone with a book. Include one that is slightly ridiculous. Cut, stack and staple at the short edge.</p>
<h2>3. A name poem</h2>
<p>An acrostic spells their name down the page, one line per letter. Start from the generator, then replace two lines with details only you know. Frame it. Grandparents and teachers keep these for years.</p>
<h2>4. A framed monogram</h2>
<p>Build their initials in the monogram maker, download the picture, print it on cream card and put it in any frame you have. For a new baby or a newly married couple, it is ready before the proper gift arrives.</p>
<h2>5. Tags that turn a bought gift into theirs</h2>
<p>A printed tag with their name, and a line about why you chose it, changes a bottle or a book from generic to personal. Print a sheet and tie one to each present.</p>
<h2>6. A date or a place, written beautifully</h2>
<p>Convert a date to Roman numerals or look up the coordinates of a place that matters, set it large in the centre of a page, and frame it. It takes five minutes and looks like you commissioned it.</p>
<h2>Making it look intended</h2>
<ul>
<li>Use 200 to 300 gsm card. Thin paper is what gives the game away.</li>
<li>Print at actual size and trim with a ruler and a sharp blade.</li>
<li>Sign and date it in ink.</li>
<li>Present it in something: an envelope, a frame, a box with tissue.</li>
<li>If a made gift is on its way, say so on the certificate. Anticipation is part of the present.</li>
</ul>`,
    faq: [
      ['Is a printed gift really enough?', 'Yes, when it is specific and well presented. It shows thought and effort, which is what personalized gifts are for.'],
      ['I do not have a printer. What now?', 'Download the picture to your phone and take it to a print shop, a library or a pharmacy photo counter.'],
      ['Can I email it instead?', 'You can, but print it if you possibly can. Something to hold is what makes it a gift.'],
    ],
    sources: [],
  },
  {
    slug: 'memorial-wording',
    title: 'What to write on a memorial gift',
    desc: 'Gentle, practical guidance on names, dates and wording for remembrance gifts, with examples.',
    updated: '2026-11-19',
    takeaways: [
      'Name and dates are complete on their own.',
      'Describe the person in plain words. Avoid explaining the loss.',
      'There is no deadline. Later is often kinder.',
    ],
    tools: ['engraving-ideas'],
    body: `
<p>People put off memorial gifts because they are afraid of saying the wrong thing. The fear is reasonable, and the solution is simple: say less. The family will read these words many times. Plain ones hold up.</p>
<h2>Start with the facts</h2>
<p>Take the full name and both dates from the funeral notice or order of service. Do not rely on memory for a middle name or a year of birth. If the family used a familiar name, such as Nan, Papa or Bill, use that for anything given to the family, and the formal name for anything public such as a bench.</p>
<h2>If you add a line</h2>
<p>Describe who they were or what they loved. Short, concrete and in the present tense where you can.</p>
<ul>
<li>"Loved this garden."</li>
<li>"First to arrive, last to leave."</li>
<li>"Sit a while."</li>
<li>"Always had time."</li>
<li>"The best of dogs."</li>
</ul>
<p>Lines to avoid: anything that explains or softens the death, anything that tells the family how to feel, and religious wording unless you know it matches their belief.</p>
<h2>Their own handwriting</h2>
<p>A signature from a birthday card or a line from a recipe can be copied onto jewellery, a board or a print. Ask before using something private. Photograph it flat, in daylight, without shadow, and send the maker the largest file you have.</p>
<h2>Choosing the object</h2>
<p>If you are close family, something worn or kept near: a pendant, a key ring, a frame. If you are a friend or colleague, something that asks nothing of them: a marker for the garden, a candle, a tree planted in their name with a card. Avoid anything large that the family must find room for.</p>
<h2>For a pet</h2>
<p>Grief for an animal is real grief. A frame with a photograph and the collar tag, with the name and years, is enough. A line about what they did best, such as "Chief of the sofa", lets the owner smile.</p>
<h2>Timing</h2>
<p>There is no need to hurry. The first weeks bring a flood of flowers and cards. A small, considered gift that arrives a month or two later, or on the first birthday or anniversary without them, tells the family that the person is still remembered when everyone else has gone quiet.</p>
<h2>When a letter is better</h2>
<p>If you are not sure a personalized gift is welcome, write a letter instead. Share one specific memory. It costs nothing, it cannot be the wrong size, and it is very often the thing people keep.</p>`,
    faq: [
      ['Should I include the dates of birth and death?', 'On anything formal or outdoor, yes. On jewellery or a private keepsake, the name or a single date is often enough.'],
      ['Is it appropriate to give a memorial gift to a colleague?', 'A small one, yes: a card signed by the team and a plant or a donation in the person’s name.'],
      ['How do I word a gift after a miscarriage or the loss of a baby?', 'Follow the parents’ lead. If they named the baby, use the name. Keep it very simple, and consider a letter first.'],
    ],
    sources: [],
  },
  {
    slug: 'personalizing-for-children',
    title: 'Personalizing for children: names, spelling and safety',
    desc: 'How to personalize gifts for babies and children safely, with spelling checks and age-by-age ideas.',
    updated: '2026-11-19',
    takeaways: [
      'Get the spelling from a parent in writing, capitals and all.',
      'Keep full names off anything worn or carried in public; use initials outside and a label inside.',
      'For under-threes, avoid small detachable parts and keep stitching away from where they chew.',
    ],
    tools: ['name-poem-generator', 'birthstone-birth-flower-finder'],
    body: `
<p>Children love seeing their own name, and parents love anything that stops belongings going missing. A few checks make sure the gift is right and safe.</p>
<h2>Spelling</h2>
<p>Modern names have many spellings. Aiden, Aidan, Ayden and Aaden are four different children. Ask a parent to type the name, and copy it exactly, including any capital in the middle and any accent. For twins and siblings, check each one; they notice.</p>
<h2>Names in public</h2>
<p>Child-safety advice commonly warns against a visible full name on coats, bags and bottles, because a stranger who can read a name can use it. The practical answer:</p>
<ul>
<li>Outside: initials, a first initial and symbol, or nothing.</li>
<li>Inside: first name, surname initial and a parent's phone number on a sewn or stuck label.</li>
<li>At home: anything goes. Bedroom doors, stools and books are for full names.</li>
</ul>
<h2>Safety by age</h2>
<table>
<thead><tr><th>Age</th><th>Good choices</th><th>Avoid</th></tr></thead>
<tbody>
<tr><td>Under 1</td><td>Blankets, soft toys with stitched names, keepsake prints</td><td>Beads, buttons, ribbons, anything that detaches</td></tr>
<tr><td>1 to 3</td><td>Name puzzles, step stools, board books with their name</td><td>Small puzzle letters for children who still mouth things</td></tr>
<tr><td>4 to 7</td><td>Name labels, lunch bags, stories starring them</td><td>Full name on outdoor items</td></tr>
<tr><td>8 to 12</td><td>Sports bags, notebooks, room signs, initial jewellery</td><td>Babyish fonts; let them choose</td></tr>
<tr><td>Teens</td><td>Initials, dates, in-jokes; subtle beats loud</td><td>Photos they have not approved</td></tr>
</tbody>
</table>
<p>Look for the safety mark that applies in your country on toys, and check the age guidance on the listing. Jewellery is for supervised wear only on small children, and never for sleeping.</p>
<h2>Lowercase helps new readers</h2>
<p>Children learn to read and write their name with a capital first letter and lowercase after it. A stool or bedroom sign in that form helps; a name in all capitals is harder for a four-year-old to recognise.</p>
<h2>Gifts that record the beginning</h2>
<p>For a newborn, collect the facts from the parents: full name, date, time, weight, length and place. Add the birth flower and birthstone for the month. These go on a print, a blanket or the lid of a box, and they are the details the child will ask about at ten.</p>
<h2>Gifts the child helps to make</h2>
<p>Children like giving, too. A printed certificate they decorate, a coupon book they fill in, or tags they sign for grandparents all count as personalized, and are treasured by the people who receive them.</p>`,
    faq: [
      ['Is it safe to put my child’s name on their school bag?', 'Use initials on the outside and a full label inside. That keeps belongings returnable without displaying the name.'],
      ['What should I engrave on a christening or naming gift?', 'The child’s full name and the date. Add the place if there is room.'],
      ['When can a child wear a name necklace?', 'Follow the maker’s age guidance. For young children, short supervised wear only, and never in bed.'],
    ],
    sources: [],
  },
  {
    slug: 'make-it-yourself',
    title: 'Make it yourself: five ways to personalize a gift at home',
    desc: 'Vinyl cutting, hand stamping, embroidery, photo transfer and printables compared by cost, difficulty and time.',
    updated: '2026-11-19',
    takeaways: [
      'Printables need only a printer. Every other method needs a tool, and practice on a spare.',
      'Cut vinyl is the quickest way to put a name on glass, tumblers and shirts.',
      'Make two. The first is where you learn.',
    ],
    tools: ['monogram-maker', 'gift-tag-maker'],
    body: `
<p>Making the gift yourself is the most personal version of all, and the tools have never been easier to use. Each method below can produce something good on a first weekend. Our video page collects current tutorials for all of them.</p>
<h2>The five methods</h2>
<table>
<thead><tr><th>Method</th><th>You need</th><th>Difficulty</th><th>Best first project</th></tr></thead>
<tbody>
<tr><td>Printables</td><td>Printer, card</td><td>Easy</td><td>Tags, certificate, framed monogram</td></tr>
<tr><td>Cut vinyl</td><td>Cutting machine or craft knife, vinyl, transfer tape</td><td>Easy to moderate</td><td>Name on a tumbler or glass</td></tr>
<tr><td>Hand stamping</td><td>Metal letter stamps, hammer, steel block, blanks</td><td>Moderate</td><td>Key ring with a name</td></tr>
<tr><td>Hand embroidery</td><td>Hoop, needle, thread, water-soluble pen</td><td>Moderate</td><td>Initial on a napkin or tote</td></tr>
<tr><td>Laser engraving</td><td>Desktop laser, ventilation, eye protection</td><td>Advanced</td><td>Name on a wooden board</td></tr>
</tbody>
</table>
<h2>Printables</h2>
<p>Start here. Design on this site, print on card, trim, and present. There is no skill to learn and the result is immediate.</p>
<h2>Cut vinyl</h2>
<p>A cutting machine cuts your lettering from adhesive vinyl; you peel away the waste, lift the letters with transfer tape and press them onto the object. Use permanent vinyl for glass and tumblers and iron-on vinyl for fabric. Clean the surface with alcohol first, and remember to mirror the design for iron-on.</p>
<h2>Hand stamping</h2>
<p>Each letter is struck into a metal blank with one firm hammer blow. Letters will sit slightly unevenly, and that is the charm. Tape a guideline across the blank, practise on a spare, and darken the letters afterwards with enamel or a marker wiped back.</p>
<h2>Hand embroidery</h2>
<p>Draw the name on the fabric with a wash-out pen, stretch it in a hoop, and follow the line in backstitch or stem stitch. Script letters flow well. Wash the pen marks out when you finish and press from the back.</p>
<h2>Laser engraving</h2>
<p>Desktop lasers engrave wood, slate, leather and coated metal with shop-quality results. They also need ventilation, eye protection and a test on scrap for every new material. Never engrave unknown plastics or anything containing chlorine, such as vinyl, which gives off harmful fumes.</p>
<h2>Getting your design onto the object</h2>
<p>Build a monogram or lettering in our tools, download the picture, and import it into your cutting or engraving software. Use the SVG download where you can; it scales to any size without blurring.</p>
<h2>Giving handmade</h2>
<p>Say that you made it. Add a tag with the date. A slightly crooked letter that someone hammered themselves is worth more to most people than a perfect one from a factory.</p>`,
    faq: [
      ['What is the easiest personalized gift to make?', 'A printed and framed monogram or name poem. After that, a name in vinyl on a tumbler.'],
      ['Do I need an expensive machine?', 'No. Printables, hand stamping and hand embroidery all cost very little to start.'],
      ['Can I sell what I make with your designs?', 'Designs you create with our tools are yours to use, including on things you sell. The fonts carry open licences, listed on our disclaimer page.'],
    ],
    sources: [],
  },
];
