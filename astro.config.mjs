import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://edvinlinden.se",
  integrations: [sitemap()],
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
    // resvg-js loads a native .node binary, which esbuild's dep optimizer
    // cannot bundle. Keep it external so the OG image route works in dev.
    optimizeDeps: { exclude: ["@resvg/resvg-js"] },
    ssr: { external: ["@resvg/resvg-js"] },
  },
});
