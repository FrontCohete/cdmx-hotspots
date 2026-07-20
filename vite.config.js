import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ─────────────────────────────────────────────────────────────
// IMPORTANTE (GitHub Pages):
// Cambia "base" por el nombre EXACTO de tu repositorio.
// Ej. si tu repo es github.com/usuario/cdmx-hotspots → base: '/cdmx-hotspots/'
// Si usas un dominio propio o usuario.github.io → base: '/'
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  base: '/cdmx-hotspots/',
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2018',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
