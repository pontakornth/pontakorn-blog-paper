import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      [
        remarkToc,
        {
          heading: "(table[ -]of[ -])?contents?|toc|สารบัญ",
        },
      ],
      [
        remarkCollapse,
        {
          test: /(table[ -]of[ -])?contents?|toc|สารบัญ/,
          summary: function (str: string) {
            if (/[ก-ฮ]+/.test(str)) {
              return `เปิด${str}`;
            }
            return `Open ${str}`;
          },
        },
      ],
    ],
    shikiConfig: {
      theme: "vitesse-dark",
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
