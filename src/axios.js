import axios from 'axios';

// 💡 CAMBIO CLAVE:
// Le decimos a Axios que todas las peticiones deben empezar con '/api'.
// Esto activará el proxy que definiste en tu archivo vite.config.js,
// redirigiendo las peticiones a tu backend en http://localhost:8000.
const apiClient = axios.create({
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json'
  },
  // ¡Esto es correcto y fundamental para que las cookies funcionen!
  withCredentials: true, 
});


// Este interceptor es útil para redirigir automáticamente al usuario
// a la página de login si su sesión expira (error 401). Lo mantenemos.
apiClient.interceptors.response.use(
  // Si la respuesta es exitosa, simplemente la devuelve.
  (response) => response,
  
  // Si hay un error en la respuesta...
  (error) => {
    // Comprueba si el error es un 401 (No Autorizado).
    if (error.response && error.response.status === 401) {
      console.error("Sesión no autorizada o expirada. Redirigiendo a login.");
      
      // Evita bucles de redirección si ya estamos en la página de login.
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'; 
      }
    }
    
    // Devuelve el error para que pueda ser manejado por la llamada original (ej. en el .catch).
    return Promise.reject(error);
  }
);


export default apiClient;