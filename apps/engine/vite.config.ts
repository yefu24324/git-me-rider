import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/",
  clearScreen: false,
  plugins: [solid(), tailwindcss(), tsconfigPaths()],
  publicDir: "static",
});
