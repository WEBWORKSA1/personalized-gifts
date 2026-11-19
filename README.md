# Personalized.Gifts

A free personalization studio and idea engine: a gift finder, 12 browser tools (monogram maker, engraving ideas, gift tags, certificates and more), 36 idea hubs, 12 guides, a how-to video shelf, a bulk-quote request form, a monthly contest and a support page.

Static HTML, no framework, no server. Hosted on GitHub Pages from the `main` branch, root folder.

## How it is built

| Path | What it is |
| --- | --- |
| `_build/config.mjs` | Every setting an owner needs: AdSense slots, form relay, support links, contest prize, video channels |
| `_build/build.mjs`, `_build/pages-biz.mjs`, `_build/lib.mjs` | The generator. Zero dependencies. Writes all pages into the repo root |
| `_build/content/` | Ideas, hubs, inscriptions, guides, tool copy and policy pages |
| `_build/refresh.mjs` | Refreshes `data/videos.json` from public channel feeds |
| `assets/` | Stylesheet, scripts, self-hosted fonts (with licences), icons |
| `.github/workflows/refresh.yml` | Runs the refresh and the build every day at 05:23 UTC, and on every push that touches the source |

Build locally with Node 20 or later:

```
node _build/build.mjs
```

Do not edit the generated `.html` files by hand. Change the source in `_build/` or `assets/`, push, and the workflow rebuilds and commits the pages.

## What updates by itself

- Occasion countdowns, order-by dates and the "coming up" strip are computed from today's date in the browser and again at each daily build.
- The contest round, its brief and its closing date rotate monthly.
- The video shelf is refreshed daily; videos that stop resolving are dropped.
- `sitemap.xml` dates follow each build.

## Owner settings (`_build/config.mjs`)

**Advertising.** The AdSense head script, the `google-adsense-account` meta tag and `ads.txt` are already in place. Auto ads need nothing more than switching them on in AdSense. For manual units, paste slot IDs into `adsense.slots`; an empty slot renders nothing.

**Forms.** All forms post to one inbox through a relay. The address is not written anywhere in this repository or on the site; it is assembled in the visitor's browser only at the moment of sending. The first message sent from the live site triggers a one-time activation email to that inbox: click the link in it once. The relay then offers a random alias; paste it into `forms.alias` and the encoded address stops being used altogether.

**Support buttons.** Add hosted payment links to `donationLinks` (label and URL). Until then the support page shows the pledge form only.

**Contest prize.** Set `contest.prize` to a sentence describing the prize. Left empty, the winner is published and credited.

**Video channels.** Edit `videos.handles` and `videos.keywords`.

**Top bar.** `contactBarText` is the visible wording and `contactHref` is where it points.

## Custom domain

1. Repository Settings, Pages, Custom domain: enter the domain and save. GitHub writes a `CNAME` file to `main`.
2. Point DNS at GitHub Pages (four `A` records for the apex, or a `CNAME` for `www`).
3. The push of `CNAME` triggers the workflow, and every canonical URL, the sitemap and `robots.txt` switch to the new address. No code change is needed because all internal links are relative.

## Publishing

Repository Settings, Pages, Build and deployment: Source "Deploy from a branch", Branch `main`, folder `/ (root)`. The `.nojekyll` file tells Pages to serve the files as they are.

## Trademarks and content

Personalized.Gifts is an independent site. It sells nothing and is not affiliated with, sponsored by or endorsed by any retailer, marketplace or brand. "Personalized gifts" is used as an ordinary description. Product names, logos and brands, including those in embedded videos, belong to their owners. All inscriptions, guides and illustrations here are original. Fonts are used under the SIL Open Font License; licence texts are in `assets/fonts/licenses/`.
