import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

/** 拆分依赖并将导入映射合并到主入口的vite插件 */
export function chunkImportMapPlugin(): Plugin {
  const importMap = {
    imports: {
      "solid-js": "importmaps-solid-js",
      "solid-js/web": "importmaps-solid-js-web",
    },
  };
  return {
    name: "vite-plugin-chunk-importmaps",
    transformIndexHtml(html, ctx) {
      console.log(ctx);
      const importMapJson = JSON.stringify(importMap);
      const scriptTag = `<script type="importmap">${importMapJson}</script>`;
      return html.replace("</head>", `${scriptTag}</head>`);
    },
  };
}

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      experimental: {
        chunkImportMap: {
          baseUrl: "/",
          fileName: "importmap.json",
        },
      },
      output: {
        advancedChunks: {
          groups: [
            { name: "importmaps-solid-js", test: /node_modules\/solid-js\/dist/ },
            { name: "importmaps-solid-js-web", test: /node_modules\/solid-js\/web\/dist/ },
            { name: "importmaps-vendors", test: /node_modules\// },
          ],
        },
        format: "esm",
        minify: false,
      },
    },
  },
  clearScreen: false,
  plugins: [
    solid(),
    tailwindcss(),
    tsconfigPaths(),
    nodePolyfills({
      exclude: [],
      globals: {},
      include: ["process"],
      protocolImports: true,
    }),
  ],
  publicDir: "static",
});
