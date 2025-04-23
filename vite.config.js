// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // 👈 importante para build no Vercel/Netlify
  build: {
    rollupOptions: {
      external: ["xlsx", "file-saver"], // 👈 impede o erro
    },
  },
});
