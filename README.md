# adefila.cv

A software portfolio for Adefila Abdulmuiz, built with Astro.

## Run locally

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Edit the site

- Home, About, Work, and Contact are in `src/pages/`.
- Project content and status live in `src/data/work.ts`. Each project has a detail page at `/work/[slug]`.
- Project screenshots live in `public/images/projects/`. They came from Adefila's local app screenshots and live sites.
- The Flamingo Admin screenshots contain figures accumulated during testing. Captions on the detail page identify them as testing data.
- The About portrait is an illustration placeholder in `src/pages/about.astro`. Replace it when a real photo is available.
- The engineering archive remains at `/engineering` for direct links. It is absent from navigation and the sitemap and has a noindex meta tag.
- The contact form sends through FormSubmit, which works with Pxxl's static hosting. On the first submission after deployment, FormSubmit emails `abdulmuiza@outlook.com` an activation link. Confirm that email before relying on the form for messages. After activation, send one test message and verify it arrives. The email link on the page works independently.
- Regenerate the social share image after visual changes with `node scripts/generate-og.mjs`.

The old terminal-era components and content files are retained in the repository for reference, but the public software pages use the files above.
