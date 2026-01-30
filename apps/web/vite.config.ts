import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  // @ts-expect-error - Vite version mismatch between root and app causing type issues
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // "@repo/ui/*": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
});
