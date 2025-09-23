// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // ✨ CORRECCIÓN CLAVE: Esta línea elimina '/api' de la ruta antes de enviarla al backend
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // La configuración para las imágenes debe mantenerse igual
      '/uploads': { 
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  }
})