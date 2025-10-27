<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="$emit('close')"></div>
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold text-gray-800">Historial de Intercambios de {{ user.full_name }}</h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        
        <div class="p-6 overflow-y-auto">
          <div v-if="loading" class="text-center">Cargando historial...</div>
          <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
          <div v-else-if="proposals.length === 0" class="text-center text-gray-500">
            Este usuario no tiene historial de intercambios.
          </div>
          
          <ul v-else class="divide-y divide-gray-200">
            <li v-for="proposal in proposals" :key="proposal.id" class="py-4">
              <div class="flex space-x-4">
                <div class="flex-1">
                  <div class="flex justify-between items-center">
                    <h3 class="text-sm font-medium text-indigo-600">
                      Propuesta #{{ proposal.id }} - <span :class="statusColor(proposal.status)" class="font-bold capitalize">{{ formatStatus(proposal.status) }}</span>
                    </h3>
                    <p class="text-sm text-gray-500">{{ formatDateTime(proposal.updated_at) }}</p>
                  </div>
                  <div class="mt-2 grid grid-cols-2 gap-4 items-start">
                    <!-- Columna: Ofrece -->
                    <div>
                      <p class="text-xs font-medium text-gray-500">
                        <span :class="{ 'font-bold': proposal.proposer.id === user.id }">{{ proposal.proposer.full_name }}</span> ofrece:
                      </p>
                      <p class="text-sm font-medium text-gray-800">{{ proposal.offered_product.title }}</p>
                    </div>
                    <!-- Columna: Pide -->
                    <div>
                      <p class="text-xs font-medium text-gray-500">
                        A <span :class="{ 'font-bold': proposal.owner_of_requested_product.id === user.id }">{{ proposal.owner_of_requested_product.full_name }}</span> por:
                      </p>
                      <p class="text-sm font-medium text-gray-800">{{ proposal.requested_product.title }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from '@/axios';
  
  const props = defineProps({
    user: { type: Object, required: true }
  });
  defineEmits(['close']);
  
  const proposals = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  const fetchHistory = async () => {
    try {
      const response = await axios.get(`/admin/users/${props.user.id}/proposals`);
      proposals.value = response.data;
    } catch (err) {
      console.error("Error al cargar historial:", err);
      error.value = "No se pudo cargar el historial.";
    } finally {
      loading.value = false;
    }
  };
  
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleDateString('es-ES', options);
  };
  
  const formatStatus = (status) => {
    const map = {
      'pending': 'Pendiente',
      'accepted': 'Aceptada',
      'rejected': 'Rechazada',
      'completed': 'Completada',
      'cancelled': 'Cancelada'
    };
    return map[status] || status;
  };
  
  const statusColor = (status) => {
    const map = {
      'pending': 'text-yellow-600',
      'accepted': 'text-blue-600',
      'rejected': 'text-red-600',
      'completed': 'text-green-600',
      'cancelled': 'text-gray-500'
    };
    return map[status] || 'text-gray-700';
  };
  
  onMounted(() => {
    fetchHistory();
  });
  </script>
  