<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-slate-100 min-h-screen font-sans">
    
    <header class="mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-slate-900">Gestión de Usuarios</h1>
          <p class="mt-1 text-sm text-slate-600">Busca, filtra y administra los usuarios de la plataforma.</p>
        </div>
        <div class="mt-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <div class="relative w-full sm:w-64">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar por nombre, email, DNI..."
              class="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          <button class="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Añadir Usuario
          </button>
        </div>
      </div>
      <div class="mt-4">
          <div class="flex space-x-2 p-1 bg-slate-200 rounded-lg max-w-min">
            <button @click="statusFilter = 'all'" :class="{'bg-white shadow': statusFilter === 'all', 'text-slate-600 hover:bg-slate-300/50': statusFilter !== 'all'}" class="px-3 py-1 text-sm font-semibold rounded-md transition-all">Todos</button>
            <button @click="statusFilter = 'active'" :class="{'bg-white shadow': statusFilter === 'active', 'text-slate-600 hover:bg-slate-300/50': statusFilter !== 'active'}" class="px-3 py-1 text-sm font-semibold rounded-md transition-all">Activos</button>
            <button @click="statusFilter = 'inactive'" :class="{'bg-white shadow': statusFilter === 'inactive', 'text-slate-600 hover:bg-slate-300/50': statusFilter !== 'inactive'}" class="px-3 py-1 text-sm font-semibold rounded-md transition-all">Suspendidos</button>
          </div>
      </div>
    </header>

    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Usuario</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">DNI</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Créditos</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Miembro Desde</th>
              <th scope="col" class="relative px-6 py-3"><span class="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-slate-200">
            <tr v-if="loading">
              <td colspan="6" class="px-6 py-24 text-center text-sm text-slate-500">
                <div class="flex justify-center items-center">
                  <svg class="animate-spin h-6 w-6 text-indigo-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Cargando usuarios...
                </div>
              </td>
            </tr>
            <tr v-else-if="!loading && filteredUsers.length === 0">
              <td colspan="6" class="px-6 py-24 text-center text-sm text-slate-500">
                <div class="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                  <p class="font-semibold text-slate-700">No se encontraron resultados</p>
                  <p class="mt-1">Intenta ajustar tu búsqueda o filtros.</p>
                </div>
              </td>
            </tr>
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-slate-50 transition-colors duration-200 group">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img v-if="user.profile_picture" :src="user.profile_picture" alt="Avatar" class="h-10 w-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-indigo-300 transition-all">
                    <div v-else class="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-semibold ring-2 ring-transparent group-hover:ring-indigo-300 transition-all">
                      {{ user.full_name ? user.full_name.charAt(0).toUpperCase() : '?' }}
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-slate-900">{{ user.full_name }}</div>
                    <div class="text-sm text-slate-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ user.dni || 'No especificado' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600 flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clip-rule="evenodd" /></svg>
                 {{ user.credits }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span :class="user.is_active ? 'bg-green-100 text-green-800 ring-green-200' : 'bg-red-100 text-red-800 ring-red-200'"
                      class="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ring-inset">
                  {{ user.is_active ? 'Activo' : 'Suspendido' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ formatDateTime(user.created_at) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-1">
                  <button @click="openDetails(user)" title="Ver Detalles" class="action-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                  <button @click="openCredits(user)" title="Editar Créditos" class="action-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" /></svg></button>
                  <div class="relative inline-block text-left">
                    <button @click="toggleActions(user.id)" title="Más opciones" class="action-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                      <div v-if="actionsOpenFor === user.id" v-click-outside="closeActions" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 focus:outline-none">
                         <div class="py-1" role="menu">
                          <button @click="openHistory(user)" class="menu-item text-slate-700">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Ver Historial
                          </button>
                          <button @click="openBlockedUsers(user)" class="menu-item text-slate-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                            Ver Bloqueos
                          </button>
                          <button @click="toggleBan(user)" :class="user.is_active ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'" class="menu-item">
                            <svg v-if="user.is_active" class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.91-1.09l11,11c.62.62.62,1.64,0,2.26l-2.26,2.26c-.62.62-1.64.62-2.26,0l-11-11c-.62-.62-.62-1.64,0-2.26l2.26-2.26c.62-.62,1.64-.62,2.26,0Z M5.88,14.12L3.62,11.86c-.62-.62-.62-1.64,0-2.26l11-11c.62-.62,1.64-.62,2.26,0l2.26,2.26c.62.62.62,1.64,0,2.26l-11,11c-.62.62-1.64.62-2.26,0Z" /></svg>
                            <svg v-else class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {{ user.is_active ? 'Suspender' : 'Activar' }}
                          </button>
                          <div class="border-t border-slate-100 my-1"></div>
                          <button @click="deleteUser(user.id)" class="menu-item text-red-600 hover:bg-red-50">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            Eliminar Usuario
                          </button>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <UserDetailsModal v-if="showDetailsModal" :user="selectedUser" @close="showDetailsModal = false" />
  <EditCreditsModal v-if="showCreditsModal" :user="selectedUser" @close="showCreditsModal = false" @credits-updated="handleCreditsUpdated" />
  <HistoryModal v-if="showHistoryModal" :user="selectedUser" @close="showHistoryModal = false" />
  <BlockedUsersModal v-if="showBlockedUsersModal" :user="selectedUser" @close="showBlockedUsersModal = false" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from '@/axios';
import UserDetailsModal from '@/assets/components/admin/modals/UserDetailsModal.vue';
import EditCreditsModal from '@/assets/components/admin/modals/EditCreditsModal.vue';
import HistoryModal from '@/assets/components/admin/modals/HistoryModal.vue';
import BlockedUsersModal from '@/assets/components/admin/modals/BlockedUsersModal.vue';

const users = ref([]);
const loading = ref(true);
const actionsOpenFor = ref(null);
const searchQuery = ref('');
const statusFilter = ref('all'); // 'all', 'active', 'inactive'

const selectedUser = ref(null);
const showDetailsModal = ref(false);
const showCreditsModal = ref(false);
const showHistoryModal = ref(false);
const showBlockedUsersModal = ref(false);

// ================== LÓGICA DE FILTRADO ==================
const filteredUsers = computed(() => {
  let filtered = users.value;

  // Filtrar por estado
  if (statusFilter.value !== 'all') {
    const isActive = statusFilter.value === 'active';
    filtered = filtered.filter(user => user.is_active === isActive);
  }

  // Filtrar por búsqueda
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(user =>
      user.full_name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      (user.dni && user.dni.toLowerCase().includes(query))
    );
  }

  return filtered;
});


const vClickOutside = {
  mounted(el, binding) {
    el.__ClickOutsideHandler__ = event => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('mousedown', el.__ClickOutsideHandler__);
  },
  unmounted(el) {
    document.removeEventListener('mousedown', el.__ClickOutsideHandler__);
  },
};

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return 'N/A';
  try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      // Corregido: toLocaleDateString (con "Date" una sola vez)
      return new Date(dateTimeString).toLocaleDateString('es-ES', { ...options, timeZone: 'UTC' }); 
  } catch (e) {
      console.error("Error formatting date:", dateTimeString, e);
      return "Fecha inválida";
  }
};

const fetchUsers = async () => {
  loading.value = true;
  try {
    const response = await axios.get('/api/admin/users');
    users.value = response.data;
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  } finally {
    loading.value = false;
  }
};

const toggleActions = (userId) => {
  actionsOpenFor.value = actionsOpenFor.value === userId ? null : userId;
};

const closeActions = () => {
  actionsOpenFor.value = null;
};

const openModal = (user, modalState) => {
  selectedUser.value = user;
  modalState.value = true;
  closeActions();
};

const openDetails = (user) => openModal(user, showDetailsModal);
const openCredits = (user) => openModal(user, showCreditsModal);
const openHistory = (user) => openModal(user, showHistoryModal);
const openBlockedUsers = (user) => openModal(user, showBlockedUsersModal);

const toggleBan = async (user) => {
  closeActions();
  const newStatus = !user.is_active;
  const actionText = newStatus ? 'activar' : 'suspender';
  if (window.confirm(`¿Seguro que quieres ${actionText} a ${user.full_name}?`)) {
    try {
      const response = await axios.put(`/admin/users/${user.id}/status`, { is_active: newStatus });
      const index = users.value.findIndex(u => u.id === user.id);
      if (index !== -1) users.value[index] = response.data;
    } catch (error) {
      console.error(`Error al ${actionText} usuario:`, error);
    }
  }
};

const deleteUser = async (userId) => {
  closeActions();
  if (window.confirm('¿ELIMINAR USUARIO? Esta acción es PERMANENTE.')) {
    try {
      await axios.delete(`/admin/users/${userId}`);
      users.value = users.value.filter(u => u.id !== userId);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  }
};

const handleCreditsUpdated = (updatedUser) => {
  const index = users.value.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) users.value[index] = updatedUser;
  showCreditsModal.value = false;
};

onMounted(fetchUsers);
</script>

<style scoped>
/* Estilo base para los iconos de acción de la tabla */
.action-icon {
    @apply p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-indigo-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
}
/* Estilo para los items del menú desplegable */
.menu-item {
    @apply flex items-center w-full text-left px-4 py-2 text-sm transition-colors duration-150 hover:bg-slate-100 disabled:opacity-50;
}
</style>