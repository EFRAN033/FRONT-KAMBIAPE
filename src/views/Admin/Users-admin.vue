<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Gestionar Usuarios</h1>

    <!-- Tabla Principal de Usuarios -->
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
                <div v-else class="h-8 w-8 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <div>{{ user.full_name }}</div>
                  <div class="text-xs text-gray-500">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ user.dni || 'N/A' }}</td>
            <td class="px-6 py-4 text-sm font-bold text-indigo-600">{{ user.credits }}</td>
            <td class="px-6 py-4 text-sm">
              <span :class="user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ user.is_active ? 'Activo' : 'Baneado' }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ formatDateTime(user.created_at) }}</td>
            <td class="px-6 py-4 text-sm font-medium">
              <!-- Menú desplegable de acciones -->
              <div class="relative inline-block text-left">
                <button @click="toggleActions(user.id)" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Acciones
                </button>
                <div v-if="actionsOpenFor === user.id" 
                     class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                  <div class="py-1">
                    <button @click="openDetails(user)" class="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Ver Detalles</button>
                    <button @click="openCredits(user)" class="text-indigo-600 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Editar Créditos</button>
                    <button @click="openHistory(user)" class="text-sky-600 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Ver Historial</button>
                    <button @click="toggleBan(user)" :class="user.is_active ? 'text-yellow-600' : 'text-green-600'" class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      {{ user.is_active ? 'Banear Usuario' : 'Activar Usuario' }}
                    </button>
                    <button @click="deleteUser(user.id)" class="text-red-600 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Eliminar (Peligro)</button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal 1: Ver Detalles del Usuario -->
  <UserDetailsModal v-if="showDetailsModal" :user="selectedUser" @close="showDetailsModal = false" />

  <!-- Modal 2: Editar Créditos -->
  <EditCreditsModal v-if="showCreditsModal" :user="selectedUser" @close="showCreditsModal = false" @credits-updated="handleCreditsUpdated" />

  <!-- Modal 3: Historial de Intercambios -->
  <HistoryModal v-if="showHistoryModal" :user="selectedUser" @close="showHistoryModal = false" />

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios';

// =================================================================
// INICIO DE LA CORRECCIÓN
// =================================================================
// Importar los componentes de los modales usando el alias @ (que apunta a src/)
// Asegúrate de que estos archivos existan en 'src/components/admin/modals/'
import UserDetailsModal from '@/components/admin/modals/UserDetailsModal.vue';
import EditCreditsModal from '@/components/admin/modals/EditCreditsModal.vue';
import HistoryModal from '@/components/admin/modals/HistoryModal.vue';
// =================================================================
// FIN DE LA CORRECCIÓN
// =================================================================

const users = ref([]);
const loading = ref(false);
const actionsOpenFor = ref(null); // ID del usuario cuyo menú de acciones está abierto

// Estado para los modales
const selectedUser = ref(null);
const showDetailsModal = ref(false);
const showCreditsModal = ref(false);
const showHistoryModal = ref(false);

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateTimeString).toLocaleDateString('es-ES', options);
};

// Cargar la lista de usuarios
const fetchUsers = async () => {
  loading.value = true;
  try {
    // La ruta en tu Users-admin.vue original era '/api/admin/users'
    // Asegúrate que esta sea la ruta correcta donde tu backend sirve la lista de usuarios.
    const response = await axios.get('/api/admin/users');
    users.value = response.data;
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  } finally {
    loading.value = false;
  }
};

// --- Lógica de Acciones ---

const toggleActions = (userId) => {
  if (actionsOpenFor.value === userId) {
    actionsOpenFor.value = null;
  } else {
    actionsOpenFor.value = userId;
  }
};

// 1. Abrir Modales
const openDetails = (user) => {
  selectedUser.value = user;
  showDetailsModal.value = true;
  actionsOpenFor.value = null;
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

// 2. Banear / Desbanear
const toggleBan = async (user) => {
  const newStatus = !user.is_active;
  const actionText = newStatus ? 'activar' : 'banear';
  // Usamos un modal de confirmación simple en lugar de alert/confirm
  if (!window.confirm(`¿Estás seguro de que quieres ${actionText} a ${user.full_name}?`)) {
    actionsOpenFor.value = null;
    return;
  }
  
  try {
    // Usamos la nueva ruta del backend
    const response = await axios.put(`/admin/users/${user.id}/status`, { is_active: newStatus });
    // Actualizar el usuario en la lista local
    const index = users.value.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users.value[index] = response.data;
    }
  } catch (error) {
    console.error(`Error al ${actionText} usuario:`, error);
    alert(`Error: ${error.response?.data?.detail || 'No se pudo completar la acción'}`);
  }
  actionsOpenFor.value = null;
};

// 3. Eliminar Usuario
const deleteUser = async (userId) => {
  // Usamos un modal de confirmación simple
  if (!window.confirm('¿Estás seguro? Esta acción es PERMANENTE y borrará al usuario y todos sus datos.')) {
    actionsOpenFor.value = null;
    return;
  }

  try {
    // Usamos la nueva ruta del backend
    await axios.delete(`/admin/users/${userId}`);
    // Quitar al usuario de la lista local
    users.value = users.value.filter(u => u.id !== userId);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    alert(`Error: ${error.response?.data?.detail || 'No se pudo eliminar al usuario'}`);
  }
  actionsOpenFor.value = null;
};

// 4. Callback para cuando los créditos se actualizan en el modal
const handleCreditsUpdated = (updatedUser) => {
  const index = users.value.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users.value[index].credits = updatedUser.credits;
  }
  showCreditsModal.value = false;
};

// Cargar usuarios al montar el componente
onMounted(() => {
  fetchUsers();
});
</script>
