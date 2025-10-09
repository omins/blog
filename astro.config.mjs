import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "node:url";

export default defineConfig({
  site: "https://example.com",
  trailingSlash: "never",
  integrations: [
    mdx({
      gfm: true,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
