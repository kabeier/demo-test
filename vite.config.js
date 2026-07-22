import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   base: mode === "production" ? "/demo-test/" : "/",
  plugins: [react(), tailwindcss()],
    server: {
    allowedHosts: [
    ],
  },
})
