import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      // Prevent Vite from watching locked Windows system files (VS Code AppData, etc.)
      ignored: ["**/AppData/**", "**/node_modules/**", "**/.git/**"],
    },
  },
})
