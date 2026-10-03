import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('gsap')) return 'gsap';
          if (id.includes('lucide-react')) return 'lucide';
        }
      }
    }
  }
})
