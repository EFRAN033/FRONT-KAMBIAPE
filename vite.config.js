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
      // Proxy para la API (peticiones HTTP)
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // ✨ Proxy para los WebSockets ✨ (¡ESTA PARTE FALTABA!)
      '/ws': {
        target: 'ws://localhost:8000', // Apunta a tu backend de FastAPI
        ws: true, // Habilita el proxy para WebSockets
        changeOrigin: true,
      },
      // Proxy para las imágenes (el nombre correcto es 'uploaded_images' según tu main.py)
      '/uploaded_images': { 
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  }
})