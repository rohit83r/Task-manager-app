import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    host: true, // or '0.0.0.0'
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173, // Required for HMR to work in Docker
      clientPort: 5173 // Important for WebSocket connection
    },
    watch: {
      usePolling: true // Required for file watching in Docker
    }
  },
  preview: {
    host: true,
    port: 5173,
    strictPort: true
  }
});