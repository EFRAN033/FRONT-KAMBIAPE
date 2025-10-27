<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="$emit('close')"></div>
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold text-gray-800">Editar Créditos de {{ user.full_name }}</h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        
        <div class="p-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Créditos Actuales</label>
            <p class="text-2xl font-bold text-indigo-600">{{ user.credits }}</p>
          </div>
  
          <form @submit.prevent="updateCredits">
            <label for="credits" class="block text-sm font-medium text-gray-700">
              Establecer Nuevo Total de Créditos
            </label>
            <input 
              v-model.number="newCreditTotal" 
              type="number" 
              id="credits"
              min="0"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ej: 50"
            />
            <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  
            <div class="mt-6 flex justify-end space-x-3">
              <button type="button" @click="$emit('close')" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancelar
              </button>
              <button type="submit" :disabled="loading" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300">
                {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from '@/axios';
  
  const props = defineProps({
    user: { type: Object, required: true }
  });
  const emit = defineEmits(['close', 'credits-updated']);
  
  const newCreditTotal = ref(props.user.credits);
  const loading = ref(false);
  const error = ref(null);
  
  const updateCredits = async () => {
    if (newCreditTotal.value === null || newCreditTotal.value < 0) {
      error.value = "El valor no puede ser negativo.";
      return;
    }
    
    loading.value = true;
    error.value = null;
    
    try {
      const response = await axios.put(`/admin/users/${props.user.id}/credits`, {
        credits: newCreditTotal.value
      });
      // Emitir el usuario actualizado para que el padre actualice la lista
      emit('credits-updated', response.data);
    } catch (err) {
      console.error("Error al actualizar créditos:", err);
      error.value = err.response?.data?.detail || "No se pudo actualizar.";
    } finally {
      loading.value = false;
    }
  };
  </script>
  