// Site settings. Edit here, commit, and the "Refresh site" workflow rebuilds every page.
// Nothing in this file is shown to visitors as text unless noted.

export default {
  name: 'Personalized.Gifts',
  tagline: 'Make it theirs',
  description:
    'Free tools and guides for personalized gifts: find the right gift, choose the words, make a monogram, print a tag, and plan bulk orders.',
  // Used until a CNAME file exists in the repo root. When GitHub Pages is given a
  // custom domain it writes that file, and the next build switches every URL to it.
  defaultUrl: 'https://webworksa1.github.io/personalized-gifts',
  locale: 'en',
  themeColor: '#b4174e',

  // Bar shown at the top of every page. The address stays in the link only.
  contactBarText:
    'Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership',
  contactHref: 'https://web.works/contact',

  adsense: {
    client: 'ca-pub-6620975821265271',
    // Auto ads work from the head script alone once switched on in AdSense.
    // To place manual units, create them in AdSense and paste each slot ID here.
    // An empty value hides that position completely (no blank boxes).
    slots: { top: '', inContent: '', beforeFooter: '' },
  },

  forms: {
    // 'formsubmit' needs no account: the first message sent from the live site
    // triggers a one-time activation email to the inbox that receives the forms.
    provider: 'formsubmit',
    // Optional. After activation the relay emails a random alias. Paste it here
    // and the encoded address in assets/js/forms.js is no longer used at all.
    alias: '',
    // Optional alternative relay: paste a Web3Forms access key and set provider to 'web3forms'.
    web3formsKey: '',
  },

  // One-click support buttons. Leave empty to show the pledge form only.
  // Example: { label: 'Give with PayPal', url: 'https://www.paypal.com/donate/?hosted_button_id=XXXX' }
  donationLinks: [],

  contest: {
    // Shown on the contest page for the current round. Leave empty for the default wording.
    prize: '',
  },

  videos: {
    // Brand-safe craft channels. The refresh job resolves each handle, reads its public
    // upload feed, keeps videos whose titles match the keywords, and drops dead ones.
    handles: [
      'Cricut', 'JenniferMaker', 'MakersGonnaLearn', 'KarleyHall', 'AngieHolden',
      'xToolOfficial', 'Glowforge', 'CreativeFabrica', 'DesignBundles', 'Shutterfly',
      'thehappyevercrafter', 'SarahMaker', 'AbbiKirstenCollections', 'LaserEverything',
    ],
    keywords: [
      'gift', 'personaliz', 'personalis', 'custom', 'monogram', 'engrav', 'embroider', 'name',
      'ornament', 'tumbler', 'mug', 'tote', 'cutting board', 'keychain', 'tag', 'card', 'wedding',
      'christmas', 'valentine', "mother's day", "father's day", 'teacher', 'baby',
    ],
    block: ['giveaway', 'unboxing', 'haul', 'live', 'q&a', 'vlog', 'business', 'sell', 'profit', 'etsy'],
    perChannel: 4,
    max: 30,
  },

  nav: [
    { label: 'Gift finder', href: 'gift-finder/' },
    { label: 'Ideas', href: 'ideas/' },
    { label: 'Studio', href: 'tools/' },
    { label: 'Guides', href: 'guides/' },
    { label: 'Videos', href: 'videos/' },
  ],
};
