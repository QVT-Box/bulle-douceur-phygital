import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  return {
    server: { host: "::", port: 8080, strictPort: false },
    preview: { port: 8080 },
    plugins: [react()],
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    build: {
      sourcemap: isDev,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            ui: ["lucide-react"],
            data: ["@tanstack/react-query"]
          }
        }
      }
    },
    esbuild: { drop: isDev ? [] : ["console", "debugger"] }
  };
});
