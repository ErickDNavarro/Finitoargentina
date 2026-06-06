// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://finitoargentina.com.ar';

export default defineConfig({
  site: SITE,
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),
  integrations: [sitemap()],
  vite: {
    // any por mismatch transitivo de tipos entre @tailwindcss/vite y la Vite que trae Astro.
    plugins: [/** @type {any} */ (tailwindcss())],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
  server: {
    port: 4321,
  },
});
