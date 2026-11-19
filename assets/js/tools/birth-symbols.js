// Birthstone, birth flower, sign and weekday for one birthday.
import { $, yourName, debounce } from '../lib.js';
import { birthProfile } from '../core/birth.js';
import { esc, cleanText, parseISO, capitalise, formatDate } from '../core/util.js';
import { formatDateParts } from '../core/roman.js';

const dateEl = $('#bs-date'), nameEl = $('#bs-name'), out = $('#bs-out');
if (!nameEl.value) nameEl.value = yourName.get();

function render() {
  const d = parseISO(dateEl.value);
  if (!d) { out.innerHTML = '<p class="small">Choose a date to see the stone, flower and sign.</p>'; return; }
  const p = birthProfile(d);
  const name = capitalise(cleanText(nameEl.value, 30));
  const who = name || 'They';
  const roman = formatDateParts({ day: d.getUTCDate(), month: d.getUTCMonth() + 1, year: d.getUTCFullYear() });
  const stone = p.stones[0].toLowerCase(), flower = p.flowers[0].toLowerCase();
  out.innerHTML = `<p class="output"><span class="stitched">${esc(who)}</span> ${name ? 'was' : 'were'} born on a ${p.weekday}, ${formatDate(d)}.</p>
<dl class="kv" style="margin:1rem 0">
<dt>Birthstone</dt><dd><span class="swatch" style="background:${p.hex}"></span>${p.stones.join(', ')}${p.alt.length ? ` <span class="small">(traditional: ${p.alt.join(', ')})</span>` : ''}, ${p.color}</dd>
<dt>Birth flower</dt><dd>${p.flowers.join(' and ')}</dd>
<dt>Said to stand for</dt><dd>${p.meaning}</dd>
<dt>Sun sign</dt><dd>${p.zodiac.sign}, a ${p.zodiac.element} sign</dd>
<dt>Lunar year</dt><dd>Year of the ${p.animal}${p.previousAnimal ? ` <span class="small">(or the ${p.previousAnimal} if born before that year’s Lunar New Year, which falls between 21 January and 20 February)</span>` : ''}</dd>
</dl>
<h3>Ways to use it</h3>
<ul>
<li>A ${stone} set beside ${name ? `${esc(name)}’s` : 'their'} initial on a pendant or ring.</li>
<li>A ${flower} drawn above ${name ? `the name ${esc(name)}` : 'their name'} on a print for the wall.</li>
<li>The date engraved as <strong>${roman}</strong> on the back of something they wear.</li>
<li>${p.weekday}’s child: add the weekday to a birth details print.</li>
</ul>
<p><a href="../engraving-ideas/">Find words to go with it</a></p>`;
}
dateEl.addEventListener('input', render);
nameEl.addEventListener('input', debounce(render, 100));
render();
