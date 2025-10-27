<template>
    <div class="fixed inset-0 bg-black bg-opacity-60 z-40" @click="$emit('close')"></div>
  
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div class="flex justify-between items-center p-4 border-b sticky top-0 bg-white rounded-t-lg">
          <h2 class="text-lg font-semibold text-gray-800">
            Bloqueos de {{ user.full_name }} (ID: {{ user.id }})
          </h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
  
        <div class="p-6 overflow-y-auto">
          <div v-if="loading" class="text-center text-gray-500">Cargando información de bloqueos...</div>
          <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
  
            <div>
              <h3 class="text-md font-medium text-gray-700 mb-3 border-b pb-1">
                🚫 Usuarios bloqueados por {{ user.full_name }} ({{ blockedList.length }})
              </h3>
              <ul v-if="blockedList.length > 0" class="space-y-2 max-h-96 overflow-y-auto pr-2">
                <li v-for="blockedUser in blockedList" :key="blockedUser.id" class="text-sm text-gray-600 flex items-center">
                   <span class="font-medium text-gray-800 mr-2">ID {{ blockedUser.id }}:</span> {{ blockedUser.full_name }}
                   </li>
              </ul>
              <p v-else class="text-sm text-gray-500 italic">Este usuario no ha bloqueado a nadie.</p>
            </div>
  
            <div>
              <h3 class="text-md font-medium text-gray-700 mb-3 border-b pb-1">
                🔒 Bloqueado por ({{ blockedByList.length }})
              </h3>
               <ul v-if="blockedByList.length > 0" class="space-y-2 max-h-96 overflow-y-auto pr-2">
                <li v-for="blockerUser in blockedByList" :key="blockerUser.id" class="text-sm text-gray-600 flex items-center">
                   <span class="font-medium text-gray-800 mr-2">ID {{ blockerUser.id }}:</span> {{ blockerUser.full_name }}
                </li>
              </ul>
              <p v-else class="text-sm text-gray-500 italic">Nadie ha bloqueado a este usuario.</p>
            </div>
  
          </div>
        </div>
         <div class="p-3 border-t bg-gray-50 rounded-b-lg text-right">
             <button @click="$emit('close')" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm">Cerrar</button>
         </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from '@/axios';
  
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  });
  
  defineEmits(['close']);
  
  const blockedList = ref([]);
  const blockedByList = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  onMounted(async () => {
    await fetchBlockedInfo();
  });
  
  const fetchBlockedInfo = async () => {
    loading.value = true;
    error.value = null;
    try {
      // Hacemos dos llamadas en paralelo
      const [blockedRes, blockedByRes] = await Promise.all([
        axios.get(`/admin/users/${props.user.id}/blocked`), // Endpoint para obtener a quién ha bloqueado
        axios.get(`/admin/users/${props.user.id}/blocked-by`) // Endpoint para obtener quién lo ha bloqueado
      ]);
      blockedList.value = blockedRes.data;
      blockedByList.value = blockedByRes.data;
    } catch (err) {
      console.error("Error al cargar información de bloqueos:", err);
      error.value = "No se pudo cargar la información de bloqueos.";
      blockedList.value = [];
      blockedByList.value = [];
    } finally {
      loading.value = false;
    }
  };
  
  // --- Opcional: Función para desbloquear (requiere endpoint y lógica backend) ---
  // const unblockUser = async (userIdToUnblock) => {
  //   if (!confirm(`¿Desbloquear al usuario ID ${userIdToUnblock}?`)) return;
  //   try {
  //     // Asume un endpoint DELETE /admin/users/{blocker_id}/blocked/{blocked_id}
  //     await axios.delete(`/admin/users/${props.user.id}/blocked/${userIdToUnblock}`);
  //     // Volver a cargar la lista después de desbloquear
  //     await fetchBlockedInfo();
  //   } catch (err) {
  //     console.error("Error al desbloquear usuario:", err);
  //     alert("Error al desbloquear: " + (err.response?.data?.detail || err.message));
  //   }
  // };
  </script>
  
  <style scoped>
  /* Estilos para scrollbar si es necesario */
  ul::-webkit-scrollbar {
      width: 6px;
  }
  ul::-webkit-scrollbar-thumb {
      background-color: #cbd5e1; /* cool-gray-300 */
      border-radius: 3px;
  }
  ul::-webkit-scrollbar-track {
      background-color: #f1f5f9; /* cool-gray-100 */
  }
  </style>