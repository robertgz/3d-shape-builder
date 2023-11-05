
import { defineConfig } from 'vite'
import { createVuePlugin as vue } from "vite-plugin-vue2";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // Vuetify
        VuetifyResolver(),
      ],
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      "@": path.resolve(path.dirname(''), "./src"),
    },
  },
})
