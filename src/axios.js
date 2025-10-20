import axios from 'axios';

// Obtiene la URL de la API desde las variables de entorno de Vite.
// En tu vite.config.js, ya tienes un proxy para '/api', por lo que esto es correcto.
const API_URL = import.meta.env.VITE_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_URL, // Esto usará 'http://localhost:8000' según tu config
  headers: {
    'Content-Type': 'application/json'
  },
  // ✅ ¡LA LÍNEA MÁS IMPORTANTE!
  // Esto le dice a Axios que envíe las cookies que el navegador tiene
  // almacenadas para el dominio del backend en cada petición.
  withCredentials: true, 
});


// ❌ INTERCEPTOR DE PETICIÓN ELIMINADO
// Ya no es necesario, porque el navegador gestiona la cookie de forma
// automática y segura. No debemos añadir la cabecera "Authorization" manualmente.


// 💡 INTERCEPTOR DE RESPUESTA (OPCIONAL PERO RECOMENDADO)
// Este interceptor puede ser útil para gestionar automáticamente los casos
// en que la sesión del usuario expira (error 401).
apiClient.interceptors.response.use(
  // Si la respuesta es exitosa, simplemente la devuelve.
  (response) => response,
  
  // Si hay un error en la respuesta...
  (error) => {
    // Comprueba si el error es un 401 (No Autorizado)
    if (error.response && error.response.status === 401) {
      // Si la sesión expiró o la cookie no es válida, podemos
      // redirigir al usuario a la página de login.
      // Es más limpio manejar el estado de la store (logout) en un router guard.
      console.error("Sesión no autorizada o expirada. Redirigiendo a login.");
      
      // Evita bucles de redirección si ya estamos en login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'; 
      }
    }
    
    // Devuelve el error para que pueda ser manejado por la llamada original (ej. en el .catch)
    return Promise.reject(error);
  }
);


export default apiClient;