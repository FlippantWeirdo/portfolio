// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://adefila.cv',
  integrations: [sitemap({ filter: (page) => {
    const path = new URL(page).pathname;
    return !path.startsWith('/engineering') && !path.startsWith('/contact/sent');
  } })],
});
