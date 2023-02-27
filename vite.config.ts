import { fileURLToPath, URL } from "node:url"
import path, { resolve } from "path"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
const resolvePath = (str: string) => path.resolve(__dirname, str)
import dts from "vite-plugin-dts"
console.log("__dirname ==> ", __dirname)
// https://vitejs.dev/config/
export default defineConfig({
  /* root: "./example",
  publicDir: "public", */
  build: {
    assetsInlineLimit: 0,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueSeuils",
      fileName: `vue-seuils`,
    },
    rollupOptions: {
      external: ["vue", "lodash", "vue-demi"],
      input: resolve(__dirname, "src"),
      output: {
        globals: { lodash: "lodash", vue: "Vue", vueDemi: "vue-demi" },
        dir: resolve(__dirname, "dist"),
      },
    },
  },
  plugins: [
    vue(),
    /* dts({
      //insertTypesEntry: true,
      entryRoot: "./src",
      root: resolve(__dirname),
    }), */
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
})
