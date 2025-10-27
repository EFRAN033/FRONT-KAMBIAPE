<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Gestionar Usuarios</h1>

    <div class="bg-white rounded-lg shadow-md overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DNI</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Créditos</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Miembro desde</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="loading">
            <td colspan="7" class="px-6 py-4 text-center text-gray-500">Cargando...</td>
          </tr>
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm text-gray-500">{{ user.id }}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">
              <div class="flex items-center">
                <img v-if="user.profile_picture" :src="user.profile_picture" alt="Avatar" class="h-8 w-8 rounded-full mr-3 object-cover">
                <div v-else class="h-8 w-8 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-xs text-gray-500">?</div> <div>
                  <div>{{ user.full_name }}</div>
                  <div class="text-xs text-gray-500">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ user.dni || 'N/A' }}</td>
            <td class="px-6 py-4 text-sm font-bold text-indigo-600">{{ user.credits }} 🪙</td> <td class="px-6 py-4 text-sm">
              <span :class="user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ user.is_active ? 'Activo' : 'Inactivo/Baneado' }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ formatDateTime(user.created_at) }}</td>
            <td class="px-6 py-4 text-sm font-medium">
              <div class="relative inline-block text-left">
                <button @click="toggleActions(user.id)" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Acciones
                   <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-if="actionsOpenFor === user.id"
                     v-click-outside="() => closeActions(user.id)" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 focus:outline-none">
                  <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button @click="openDetails(user)" class="menu-item text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.013.04-.026.079-.04.118l-.01.03-.01.026c-.45 1.15-1.07 2.18-1.84 3.09-.018.022-.036.044-.054.066l-.01.011c-.755.755-1.61 1.396-2.52 1.913-.17.098-.34.19-.51.277-.01.005-.02.01-.03.014a13.34 13.34 0 01-1.41.523c-.2.06-.4.118-.6.17-.01.003-.02.006-.03.009a12.87 12.87 0 01-1.1.21c-.2.03-.4.058-.6.082-.01.002-.02.003-.03.005A13.84 13.84 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .013-.04.026-.079.04-.118l.01-.03.01-.026c.45-1.15 1.07-2.18 1.84-3.09.018-.022.036-.044.054-.066l.01-.011c.755-.755 1.61-1.396 2.52-1.913.17-.098.34-.19.51-.277.01-.005.02-.01.03-.014a13.34 13.34 0 011.41-.523c.2-.06.4-.118.6-.17.01-.003.02.006.03.009a12.87 12.87 0 011.1-.21c.2-.03.4-.058.6-.082.01-.002.02.003.03.005A13.84 13.84 0 0112 5z" /></svg>
                      Ver Detalles
                    </button>
                    <button @click="openCredits(user)" class="menu-item text-indigo-600">
                     🪙 Editar Créditos
                    </button>
                    <button @click="openHistory(user)" class="menu-item text-sky-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Ver Historial
                    </button>
                    <button @click="openBlockedUsers(user)" class="menu-item text-orange-600">
                      🚫 Ver Bloqueos
                    </button>
                    <button @click="toggleBan(user)" :class="user.is_active ? 'text-yellow-600' : 'text-green-600'" class="menu-item">
                      <svg v-if="user.is_active" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {{ user.is_active ? 'Suspender Usuario' : 'Activar Usuario' }}
                    </button>
                    <button @click="deleteUser(user.id)" class="menu-item text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Eliminar (Peligro)
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
           <tr v-if="!loading && users.length === 0">
               <td colspan="7" class="px-6 py-4 text-center text-gray-500 italic">No se encontraron usuarios.</td>
           </tr>
        </tbody>
      </table>
    </div>
  </div>

  <UserDetailsModal v-if="showDetailsModal" :user="selectedUser" @close="showDetailsModal = false" />
  <EditCreditsModal v-if="showCreditsModal" :user="selectedUser" @close="showCreditsModal = false" @credits-updated="handleCreditsUpdated" />
  <HistoryModal v-if="showHistoryModal" :user="selectedUser" @close="showHistoryModal = false" />
  <BlockedUsersModal v-if="showBlockedUsersModal" :user="selectedUser" @close="showBlockedUsersModal = false" />
  </template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios';

// Importar los componentes de los modales
import UserDetailsModal from '@/assets/components/admin/modals/UserDetailsModal.vue';
import EditCreditsModal from '@/assets/components/admin/modals/EditCreditsModal.vue';
import HistoryModal from '@/assets/components/admin/modals/HistoryModal.vue';
// ================= NUEVA IMPORTACIÓN =================
import BlockedUsersModal from '@/assets/components/admin/modals/BlockedUsersModal.vue';
// ==================================================

const users = ref([]);
const loading = ref(false);
const actionsOpenFor = ref(null);

// Estado para los modales
const selectedUser = ref(null);
const showDetailsModal = ref(false);
const showCreditsModal = ref(false);
const showHistoryModal = ref(false);
// ================= NUEVO ESTADO =================
const showBlockedUsersModal = ref(false);
// ==============================================

// Directiva simple para detectar clics fuera de un elemento
const vClickOutside = {
  mounted(el, binding) {
    el.__ClickOutsideHandler__ = event => {
      // Verificar si el clic fue fuera del elemento Y fuera del botón que lo abre
      // (Asumiendo que el botón tiene una clase o ID específico, o buscando el padre relativo)
      const dropdownButton = el.previousElementSibling; // Asume que el botón está justo antes
      if (!(el === event.target || el.contains(event.target) || dropdownButton?.contains(event.target))) {
        binding.value(event);
      }
    };
    // Usar 'mousedown' puede ser más fiable que 'click' para cerrar antes de que se propague
    document.addEventListener('mousedown', el.__ClickOutsideHandler__);
  },
  unmounted(el) {
    document.removeEventListener('mousedown', el.__ClickOutsideHandler__);
  },
};


const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return 'N/A';
  try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      // Usar UTC para evitar problemas de zona horaria al mostrar solo la fecha
      return new Date(dateTimeString).toLocaleDateString('es-ES', { ...options, timeZone: 'UTC' });
  } catch (e) {
      console.error("Error formatting date:", dateTimeString, e);
      return "Fecha inválida";
  }
};

// Cargar la lista de usuarios
const fetchUsers = async () => {
  loading.value = true;
  try {
    const response = await axios.get('/api/admin/users');
    users.value = response.data;
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    // Podrías añadir un mensaje de error para el usuario aquí
    alert("Error al cargar la lista de usuarios. Revisa la consola.");
  } finally {
    loading.value = false;
  }
};

// --- Lógica de Acciones ---

const toggleActions = (userId) => {
  actionsOpenFor.value = actionsOpenFor.value === userId ? null : userId;
};

// Función para cerrar dropdown (usada por v-click-outside)
const closeActions = (/* userId */) => {
    // Cerramos cualquier dropdown abierto
    actionsOpenFor.value = null;
}


// Abrir Modales
const openDetails = (user) => {
  selectedUser.value = user;
  showDetailsModal.value = true;
  actionsOpenFor.value = null; // Cerrar dropdown
};
const openCredits = (user) => {
  selectedUser.value = user;
  showCreditsModal.value = true;
  actionsOpenFor.value = null;
};
const openHistory = (user) => {
  selectedUser.value = user;
  showHistoryModal.value = true;
  actionsOpenFor.value = null;
};
// ================= NUEVA FUNCIÓN =================
const openBlockedUsers = (user) => {
  selectedUser.value = user;
  showBlockedUsersModal.value = true;
  actionsOpenFor.value = null; // Cerrar dropdown
};
// ==============================================

// Banear / Desbanear
const toggleBan = async (user) => {
  const newStatus = !user.is_active;
  const actionText = newStatus ? 'activar' : 'suspender';
  if (window.confirm(`¿Estás seguro de que quieres ${actionText} a ${user.full_name}?`)) {
    try {
      // Asegúrate que tu endpoint devuelva el UserResponse completo
      const response = await axios.put(`/admin/users/${user.id}/status`, { is_active: newStatus });
      const index = users.value.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users.value[index] = response.data; // Reemplazar con la respuesta completa
      }
    } catch (error) {
      console.error(`Error al ${actionText} usuario:`, error);
      alert(`Error: ${error.response?.data?.detail || 'No se pudo completar la acción'}`);
    }
  }
  actionsOpenFor.value = null; // Cerrar dropdown
};

// Eliminar Usuario
const deleteUser = async (userId) => {
  if (window.confirm('¿ELIMINAR USUARIO? Esta acción es PERMANENTE.')) {
    try {
      await axios.delete(`/admin/users/${userId}`);
      users.value = users.value.filter(u => u.id !== userId);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert(`Error: ${error.response?.data?.detail || 'No se pudo eliminar al usuario'}`);
    }
  }
  actionsOpenFor.value = null; // Cerrar dropdown
};

// Callback para actualizar créditos
const handleCreditsUpdated = (updatedUser) => {
  const index = users.value.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
     // Reemplazar todo el objeto para asegurar reactividad si otros campos cambiaron
     users.value[index] = updatedUser;
     // O si solo cambian los créditos y quieres ser más específico:
     // users.value[index].credits = updatedUser.credits;
  }
  showCreditsModal.value = false;
};

// Cargar usuarios al montar
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
/* Estilo reutilizable para los items del menú dropdown */
.menu-item {
    @apply flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50;
}
</style>