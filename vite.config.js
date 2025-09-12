// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // Asegúrate de que 'path' esté importado

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    historyApiFallback: true,
    // --- INICIO: SECCIÓN CORREGIDA ---
    proxy: {
      '/api': { // Cuando una petición empiece con '/api'
        target: 'http://localhost:8000', // Reenvíala a tu backend de FastAPI
        changeOrigin: true, // Cambia el origen de la petición
        // ✨ La línea 'rewrite' que causaba el error 404 ha sido eliminada.
      },
      // Si sirves imágenes u otros archivos estáticos desde tu backend, añade un proxy para ellos también
      '/uploads': { // Por ejemplo, si tus imágenes subidas están en /uploads
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
    // --- FIN: SECCIÓN CORREGIDA ---
  }
})