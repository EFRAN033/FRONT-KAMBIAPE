// Archivo: src/axios.js (COMPLETO Y CORREGIDO)

import axios from 'axios';
import { useUserStore } from '@/stores/user'; 

const apiClient = axios.create({
  baseURL: '/api', // Usa '/api' para que el proxy de Vite lo intercepte
  // Se elimina la cabecera 'Content-Type' para que Axios la ajuste automáticamente.
});

// Interceptor para añadir el token de autenticación a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const userStore = useUserStore(); 
    const token = userStore.token; 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas, especialmente errores de autenticación
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 (No autorizado) y no es un reintento, limpia la sesión y redirige
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      
      const userStore = useUserStore();
      userStore.clearUser(); // Limpia los datos del usuario y el token
      
      // Redirige a la página de login para que el usuario pueda volver a ingresar
      window.location.href = '/login'; 
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;