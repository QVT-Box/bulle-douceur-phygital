// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    server: {
      host: "::",       // accessible en LAN/localhost
      port: 8080,       // tu gardes ton port
      strictPort: false
    },
    preview: {
      port: 8080
    },
    plugins: [
      react(),          // SWC: rapide + JSX/TSX
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      sourcemap: isDev,                 // pratiques en dev; inutile en prod
      chunkSizeWarningLimit: 1200,      // évite le warning “>500 kB” bruyant
      rollupOptions: {
        output: {
          // Découpe les plus gros libs en chunks séparés (meilleur TTI + cache long terme)
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            ui: ["lucide-react"],
            data: ["@tanstack/react-query"]
          }
        }
      }
    },
    // Optionnel: enlève console/debugger en prod (si tu veux)
    esbuild: {
      drop: isDev ? [] : ["console", "debugger"]
    }
  };
});
