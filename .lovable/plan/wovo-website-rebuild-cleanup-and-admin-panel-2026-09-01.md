# WOVO website — rebuild, cleanup and admin panel

I downloaded your GitHub repo. All 20 files are flat in the root (server.js, server.ps1, index.html, app.js, state.js, translations.js, the 7 components, 4 pages, 3 images, .gitattributes). Nothing is missing — the structure you described is intact, just unfoldered.

## 1. Structure

This Lovable project runs React + TanStack Router (not a plain static folder), so I will bring your site in as a proper app instead of loose script files:

```text
src/
  routes/        index (home), services, about, contact, admin6789
  components/    Nav, Footer, Settings, Onboarding, HeroReveal,
                 BackgroundCanvas, Icons
  lib/           state (theme/lang/region), translations, admin content
  assets/        logo, hero-masked, hero-unmasked
```

Your logic, copy and 12-language translation table carry over 1:1; the vanilla DOM code becomes React components. `server.js` / `server.ps1` are local dev helpers and are no longer needed — Lovable hosts the site.

## 2. Content and copy fixes

- Remove every "AI-assisted / works with AI" mention sitewide, including the pill in your screenshot (it becomes a plain WOVO line, no AI wording).
- Contact: add TikTok and Instagram DM for `wovo.website.developing`, with real brand marks (TikTok, Instagram, Mail) instead of generic shapes.
- Contact form message payload now includes the visitor's selected region.
- About: "How WOVO works" becomes plain page text, not a box; the custom-architecture box moves into that same section.
- Services: drop the variant card grid. Two large panels — **SERVICES / VARIANTS** (variants as short text with a "Learn more" expander and a request button under each) and **SERVICES / ADDITIONAL CAPABILITIES** (each item listed with its own "Learn more" explanation).
- Home page previews are updated to match the new Services / About / Contact layouts.
- Footer (second screenshot) rebuilt: correct theme flip, correct palette, real icons.

## 3. Visual system

- One blue-based palette. No random yellow/green/red accents, no glowing text, buttons or icons.
- All icons redrawn at a higher level of detail; every icon tile uses the same blue container.
- Full light/dark audit: light = white background **and** white nav/task bar, off-white cards, black body text, blue titles. Dark = current inverse. Every surface flips, including footer, settings drawer, onboarding and nav.
- New sitewide interactive background: soft glow plus drifting white/dark dots that react to mouse hover and touch swipe, and recolor with the theme. Phone scrolling stays swipe/side-scroller only.

## 4. Language and region

- Sweep every string, including card/sub-item text inside sliders and boxes, into the translation table so nothing stays hardcoded English.
- Region picker in Settings becomes the same styled button-card UI as the theme and language pickers (no default `<select>`).

## 5. Admin panel (`/admin6789`)

- No link or button anywhere on the site — reachable only by typing the exact path.
- Password gate (starts as `1234`), checked on the server, session kept in an encrypted cookie so the password never ships to the browser.
- Once inside, the site renders in edit mode: a pin icon next to every editable text, image and colour token; edit inline, then **Commit changes** publishes them for all visitors.
- Admin can also change the admin password from the panel.
- Same visual design as the rest of the site.

### Backend

This needs Lovable Cloud (built-in database + server functions) to store the edited content, images and password securely, so edits persist for every visitor instead of only in one browser. I will enable it as part of the work.

## Notes

- Content edits are stored per key; anything not edited falls back to the built-in copy.
- Uploaded admin images go to Cloud storage.
