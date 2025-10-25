// src/stores/inbox.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from '@/axios'; // Usamos tu instancia de axios
import { useUserStore } from './user';

// Variable para controlar la petición en curso y poder cancelarla.
let abortController = null;

export const useInboxStore = defineStore('inbox', () => {
  // --- STATE ---
  const unreadCount = ref(0);
  const isLoading = ref(false);
  const userStore = useUserStore();
  // Variable para mantener la conexión WebSocket.
  let websocket = null;

  // --- GETTERS ---
  const hasUnreadMessages = computed(() => unreadCount.value > 0);

  // --- ACTIONS ---

  /**
   * Obtiene el número de conversaciones no leídas desde el backend.
   */
  async function fetchUnreadCount() {
    if (!userStore.isLoggedIn || isLoading.value) {
      return;
    }

    // Si ya hay una petición en marcha, la cancelamos para evitar errores.
    if (abortController) {
      abortController.abort();
    }
    // Creamos un nuevo controlador para la petición actual.
    abortController = new AbortController();
    
    isLoading.value = true;
    
    try {
      const { data } = await axios.get('/proposals/me', {
        // Asociamos el controlador a la petición de Axios.
        signal: abortController.signal,
      });
      
      const count = data.reduce((total, conversation) => {
        return total + (conversation.unread_count > 0 ? 1 : 0);
      }, 0);

      unreadCount.value = count;
      console.log(`Encontrados ${count} conversaciones con mensajes no leídos.`);

    } catch (error) {
      // Si el error es porque nosotros mismos cancelamos la petición,
      // es un comportamiento normal y no debemos mostrar un error en consola.
      if (error.name === 'CanceledError') {
        console.log("Petición de conteo anterior cancelada (comportamiento normal).");
      } else {
        // Para cualquier otro error, sí lo mostramos.
        console.error("Error al obtener el conteo de mensajes no leídos:", error);
        unreadCount.value = 0;
      }
    } finally {
        isLoading.value = false;
        abortController = null; // Reseteamos el controlador
    }
  }

  /**
   * Limpia el contador, útil para cuando el usuario cierra sesión.
   */
  function clearUnreadCount() {
    unreadCount.value = 0;
  }
  
  // --- INICIO DE ACCIONES PARA WEBSOCKET EN TIEMPO REAL ---

  /**
   * Se conecta al WebSocket para recibir notificaciones en tiempo real.
   */
  function connectWebSocket() {
    // Si ya existe una conexión o el usuario no tiene token, no hacemos nada.
    if (websocket || !userStore.token) return;

    // ⚠️ ¡IMPORTANTE! ⚠️
    // DEBES REEMPLAZAR ESTA URL con la URL de tu endpoint de WebSocket.
    // Usualmente empieza con wss:// (para producción) o ws:// (para desarrollo).
    // Aquí le pasamos el token para autenticar la conexión.
    const wsUrl = `wss://tu-backend.com/ws/notifications/?token=${userStore.token}`;

    console.log("Conectando al WebSocket...");
    websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
      console.log("WebSocket conectado exitosamente.");
    };

    /**
     * ¡Esta es la parte clave!
     * Cuando el backend envía un mensaje a través del WebSocket, lo recibimos aquí.
     */
    websocket.onmessage = (event) => {
      // Suponemos que el backend envía un JSON con un tipo de mensaje.
      const data = JSON.parse(event.data);

      // Si el evento indica que hay un nuevo mensaje...
      if (data.type === 'new_message') {
        console.log("¡Nuevo mensaje recibido por WebSocket! Actualizando contador.");
        
        // Llamamos a fetchUnreadCount() para obtener el número exacto y actualizado
        // de conversaciones no leídas. Es más fiable que simplemente hacer `unreadCount.value++`.
        fetchUnreadCount();
      }
    };

    websocket.onclose = () => {
      console.log("WebSocket desconectado.");
      websocket = null; // Limpiamos la referencia para poder reconectar después.
    };

    websocket.onerror = (error) => {
      console.error("Error en la conexión WebSocket:", error);
      websocket = null;
    };
  }

  /**
   * Cierra la conexión del WebSocket de forma segura.
   * Se debe llamar cuando el usuario cierra sesión.
   */
  function disconnectWebSocket() {
    if (websocket) {
      websocket.close();
    }
  }
  // --- FIN DE ACCIONES PARA WEBSOCKET ---

  return {
    unreadCount,
    isLoading,
    hasUnreadMessages,
    fetchUnreadCount,
    clearUnreadCount,
    // Exponemos las nuevas funciones para que puedan ser usadas desde otros archivos (como App.vue)
    connectWebSocket,
    disconnectWebSocket,
  };
});