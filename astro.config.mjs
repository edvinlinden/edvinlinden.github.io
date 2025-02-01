import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://edvinlinden.se",
  integrations: [mdx(), sitemap(), prefetch()],
  vite: {
    plugins: [tailwindcss()],
  },
});
