// src/stores/inbox.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from '@/axios'; // Usamos tu instancia de axios
import { useUserStore } from './user';

export const useInboxStore = defineStore('inbox', () => {
  // --- STATE ---
  const unreadCount = ref(0);
  const userStore = useUserStore();

  // --- GETTERS ---
  const hasUnreadMessages = computed(() => unreadCount.value > 0);

  // --- ACTIONS ---

  /**
   * Obtiene el número de conversaciones no leídas desde el backend.
   */
  async function fetchUnreadCount() {
    // Solo intentamos buscar si el usuario ha iniciado sesión.
    if (!userStore.isLoggedIn) {
      console.log('Usuario no logueado, no se buscan mensajes.');
      return;
    }

    console.log('Buscando mensajes no leídos...');
    try {
      // Hacemos una llamada real a tu endpoint de propuestas/conversaciones.
      const { data } = await axios.get('/proposals/me');
      
      // Contamos cuántas conversaciones tienen un unread_count > 0.
      const count = data.reduce((total, conversation) => {
        return total + (conversation.unread_count > 0 ? 1 : 0);
      }, 0);

      unreadCount.value = count;
      console.log(`Encontrados ${count} conversaciones con mensajes no leídos.`);

    } catch (error) {
      console.error("Error al obtener el conteo de mensajes no leídos:", error);
      // Si hay un error (ej. token expirado), reseteamos el contador.
      unreadCount.value = 0;
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
    hasUnreadMessages,
    fetchUnreadCount,
    clearUnreadCount,
  };
});