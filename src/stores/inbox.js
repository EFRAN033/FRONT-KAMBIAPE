// src/stores/inbox.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from '@/axios'; // Usamos tu instancia de axios
import { useUserStore } from './user';

// --- INICIO DE LA MODIFICACIÓN ---
// Variable para controlar la petición en curso y poder cancelarla.
let abortController = null;
// --- FIN DE LA MODIFICACIÓN ---

export const useInboxStore = defineStore('inbox', () => {
  // --- STATE ---
  const unreadCount = ref(0);
  const isLoading = ref(false); // Añadimos un estado de carga
  const userStore = useUserStore();

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

    // --- INICIO DE LA MODIFICACIÓN ---
    // Si ya hay una petición en marcha, la cancelamos para evitar errores.
    if (abortController) {
      abortController.abort();
    }
    // Creamos un nuevo controlador para la petición actual.
    abortController = new AbortController();
    // --- FIN DE LA MODIFICACIÓN ---

    console.log('Buscando mensajes no leídos...');
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
      // --- INICIO DE LA MODIFICACIÓN ---
      // Si el error es porque nosotros mismos cancelamos la petición,
      // es un comportamiento normal y no debemos mostrar un error en consola.
      if (error.name === 'CanceledError') {
        console.log("Petición de conteo anterior cancelada (comportamiento normal).");
      } else {
        // Para cualquier otro error, sí lo mostramos.
        console.error("Error al obtener el conteo de mensajes no leídos:", error);
        unreadCount.value = 0;
      }
      // --- FIN DE LA MODIFICACIÓN ---
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

  return {
    unreadCount,
    isLoading, // Exponemos el estado de carga por si lo necesitas
    hasUnreadMessages,
    fetchUnreadCount,
    clearUnreadCount,
  };
});