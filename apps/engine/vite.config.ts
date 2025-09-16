import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/",
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
