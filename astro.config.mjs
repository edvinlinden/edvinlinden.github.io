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
    // resvg-js loads a native .node binary, which esbuild's dep optimizer
    // cannot bundle. Keep it external so the OG image route works in dev.
    optimizeDeps: { exclude: ["@resvg/resvg-js"] },
    ssr: { external: ["@resvg/resvg-js"] },
  },
});
