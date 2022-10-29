import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // 配置你需要使用的框架
  integrations: [
    // Enable Preact to support Preact JSX components.
    preact(), // Enable React for the Algolia search component.
    react(),
    tailwind(),
  ],
  site: "https://yang-xianzhu.github.io", // base:'/src/pages/yzz'
  // site: `http://astro.build`,
});
