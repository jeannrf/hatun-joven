import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` = URL pública actual. Cambiar cuando el equipo tenga dominio propio (SRS, pregunta abierta 8).
export default defineConfig({
  site: 'https://hatun-joven.web.app',
  integrations: [sitemap()],
});
