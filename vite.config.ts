import { defineConfig, loadEnv } from "vite";
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // carrega variáveis .env conforme o mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),


    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },


    base: mode === 'production' && env.VITE_BRANCH_MAIN !== 'true' ? env.VITE_BASE_PATH : '',
    server: {
      host: "::",
      port: 8080
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          up: resolve(__dirname, 'up/index.html'),
        },
      },
    },
  }
});
