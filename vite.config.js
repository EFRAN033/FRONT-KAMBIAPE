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

    proxy: {
      '/api': { // Cuando una petición del frontend empiece con '/api'
        target: 'http://localhost:8000', // Reenvíala a tu backend de FastAPI
        changeOrigin: true, // Necesario para el proxy
        // ✨ ESTA LÍNEA ES LA SOLUCIÓN: Reescribe la ruta para que coincida con el backend ✨
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
      '/uploads': { // El proxy para las imágenes está bien
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
    // --- FIN: SECCIÓN CORREGIDA ---
  }
})