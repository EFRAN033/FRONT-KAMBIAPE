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
   * Esta función es llamada por el WebSocket o al cargar la app.
   */
  async function fetchUnreadCount() {
    if (!userStore.isLoggedIn || isLoading.value) {
      return;
    }

    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();
    
    isLoading.value = true;
    
    try {
      const { data } = await axios.get('/proposals/me', {
        signal: abortController.signal,
      });
      
      const count = data.reduce((total, conversation) => {
        return total + (conversation.unread_count > 0 ? 1 : 0);
      }, 0);

      unreadCount.value = count;
      console.log(`[inbox.js] Encontrados ${count} conversaciones con mensajes no leídos.`);

    } catch (error) {
      if (error.name === 'CanceledError') {
        console.log("[inbox.js] Petición de conteo anterior cancelada.");
      } else {
        console.error("[inbox.js] Error al obtener el conteo de mensajes no leídos:", error);
        unreadCount.value = 0;
      }
    } finally {
        isLoading.value = false;
        abortController = null; 
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
    // Si ya existe una conexión o el usuario no está logueado, no hacemos nada.
    if (websocket || !userStore.isLoggedIn || !userStore.user?.id) {
      console.log("[inbox.js] WebSocket: Conexión omitida (ya conectado o sin usuario).");
      return;
    }

    // Usamos la misma lógica de URL que SÍ funciona en tu InboxView.vue
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = import.meta.env.VITE_WS_HOST || window.location.host;
    const wsUrl = `${protocol}//${host}/ws/${userStore.user.id}`;
    
    console.log(`[inbox.js] Conectando al WebSocket global en: ${wsUrl}`);
    websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
      console.log("[inbox.js] WebSocket global conectado exitosamente.");
    };

    /**
     * ¡Esta es la parte clave!
     * Cuando el backend envía un mensaje a través del WebSocket, lo recibimos aquí.
     */
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Si el evento indica que hay un nuevo mensaje...
      if (data.type === 'new_message') {
        console.log("[inbox.js] ¡Nuevo mensaje recibido por WebSocket! Actualizando contador.");
        
        // Llamamos a fetchUnreadCount() para obtener el número exacto y actualizado
        // de conversaciones no leídas. Es más fiable que simplemente hacer `unreadCount.value++`.
        fetchUnreadCount();
      }
      
      // Ignoramos 'user_typing' y otros eventos aquí,
      // ya que este WebSocket global solo se preocupa del *conteo* para el Header.
    };

    websocket.onclose = () => {
      console.log("[inbox.js] WebSocket global desconectado.");
      websocket = null; // Limpiamos la referencia para poder reconectar después.
    };

    websocket.onerror = (error) => {
      console.error("[inbox.js] Error en la conexión WebSocket global:", error);
      websocket = null;
    };
  }

  /**
   * Cierra la conexión del WebSocket de forma segura.
   * Se debe llamar cuando el usuario cierra sesión.
   */
  function disconnectWebSocket() {
    if (websocket) {
      console.log("[inbox.js] Desconectando WebSocket global.");
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
    // Exponemos las nuevas funciones para que puedan ser usadas
    connectWebSocket,
    disconnectWebSocket,
  };
});