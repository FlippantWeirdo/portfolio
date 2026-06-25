# Roadmap — v2

Things to add or improve after the v1 launch. Grouped by what's blocked on
assets only **you** can supply vs. what can be built anytime.

---

## 1. Content & assets (blocked on you)

These are mostly placeholders left empty in v1 because the material wasn't ready.

- [ ] **Software project screenshots** — Decentralyne, Nokslock, Flamingo, QSTC.
      Cards are built to show them; they just need the images.
      (Downtown dashboard is internal/non-shareable — public site shots only.)
- [ ] **Engineering artifacts** — anonymized SLDs / AutoCAD Plant 3D model shots,
      *if* client permission allows. Even one or two would make the engineering
      lane far more concrete.
- [ ] **Real SIWES dates** — the data-center placement timeframe is currently a
      guess (`2026 — present`). Drop in the actual start month.
      → `src/content/projects/data-center.md`
- [ ] **A custom portrait variant** (optional) — the current one is great; a
      second pose/expression could be used elsewhere (e.g. contact page).

## 2. Status updates to watch (flip when they go live)

- [ ] **Nokslock → production.** The Play Store link is live in the card but will
      404 for visitors until the app clears closed testing. Update the `status`
      field from "Google Play closed testing" → "Live on Google Play" when ready.
      → `src/content/projects/nokslock.md`
- [ ] **Flamingo mobile app.** Currently "app in progress" — update when it ships.
      → `src/content/projects/flamingo.md`

## 3. New features

- [ ] **Project detail pages.** Right now projects are cards on the lane pages.
      v2 could give each its own route (`/software/nokslock`, etc.) with a
      screenshot gallery, longer write-up, and the full stack. The content
      collection already supports this — just add `[...slug].astro` routes.
- [ ] **CV / résumé PDF download.** The domain is literally `.cv` — lean into it.
      A "download CV" button (homepage + about) serving a clean PDF. Could even
      generate it from the same project data.
- [ ] **Writing / notes section.** The "100 Days of Growth" bit is a joke in v1,
      but a real `/notes` or `/log` with a few short posts (build logs, what you
      learned at NNPC / the data center) would add depth and SEO surface.
- [ ] **Real contact form.** Contact is `mailto:` links today. A form (Formspree /
      a serverless function) lowers the friction for recruiters who won't open a
      mail client.
- [ ] **Privacy-friendly analytics.** Plausible / Umami / Vercel Analytics to see
      which lane (`/software` vs `/engineering`) actually pulls traffic.

## 4. Polish & cleanup

- [ ] **Remove unused component.** `src/components/PixelAvatar.astro` is no longer
      referenced (the about page uses the full-color portrait; favicon + OG draw
      their own pixels). Safe to delete.
- [ ] **Slim the portrait.** `public/about-portrait.png` is 338 KB at 726×726.
      Downscaling to ~480px (nearest-neighbour, to keep it crisp) drops it to
      ~80 KB with no visible difference at display size.
      → re-run `node scripts/process-portrait.mjs` after adding a resize step.
- [ ] **`apple-touch-icon`.** Add a 180×180 PNG for iOS home-screen saves
      (the favicon is SVG-only right now).
- [ ] **Deploy config.** Add `vercel.json` / `netlify.toml` so headers, caching,
      and redirects are explicit rather than host defaults.
- [ ] **Weave the origin into the bio.** The "short version" paragraph jumps
      straight to "final-year student / two careers." Could thread in the
      lockdown → NIIT → Flutter arc that's already in the timeline.
      → `src/pages/about.astro`

## 5. Nice-to-haves / maybe

- [ ] More signature motion (the brief budgeted ~4 moments; there's room for one
      more tasteful one — e.g. a subtle hover on the lane cards).
- [ ] Testimonials / references block, if any clients are willing.
- [ ] OG image per-page (currently one shared card) — only worth it if detail
      pages land.

---

### Notes / decisions already made (don't re-litigate)

- Dark-only by design — no light mode.
- CGPA and graduation date stay **off** the public site.
- OG share card + favicon stay **monochrome**; the full-color portrait is an
  About-page-only reveal.
- Tagline is locked: **"A human being who ships software."**
- Contact email is `abdulmuiza@outlook.com` (confirm if you'd rather show Gmail).
