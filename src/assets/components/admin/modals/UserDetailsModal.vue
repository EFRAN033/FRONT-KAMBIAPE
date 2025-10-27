<template>
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="$emit('close')"></div>
    
    <!-- Contenido del Modal -->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold text-gray-800">Detalles de {{ user.full_name }}</h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        
        <!-- Cuerpo -->
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="col-span-1 md:col-span-2 flex items-center mb-4">
              <img v-if="user.profile_picture" :src="user.profile_picture" class="h-20 w-20 rounded-full object-cover mr-4">
              <div v-else class="h-20 w-20 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <h3 class="text-lg font-medium">{{ user.full_name }} (ID: {{ user.id }})</h3>
                <p class="text-sm text-gray-600">{{ user.email }}</p>
                <p class="text-sm text-gray-600">Rol: <span class="font-medium capitalize">{{ user.role }}</span></p>
              </div>
            </div>
  
            <InfoItem label="DNI" :value="user.dni" />
            <InfoItem label="Teléfono" :value="user.phone" />
            <InfoItem label="Género" :value="user.gender" />
            <InfoItem label="Fecha de Nacimiento" :value="formatDate(user.date_of_birth)" />
            <InfoItem label="Ubicación" :value="user.ubicacion" />
            <InfoItem label="Ocupación" :value="user.occupation" />
            
            <InfoItem label="Rating" class="col-span-1">
              <span class="font-bold text-blue-600">{{ user.rating_score?.toFixed(1) || 'N/A' }}</span>
              <span class="text-sm text-gray-500"> ({{ user.rating_count }} reseñas)</span>
            </InfoItem>
            
            <InfoItem label="Intereses" class="col-span-1 md:col-span-2">
              <div v-if="user.interests?.length" class="flex flex-wrap gap-2">
                <span v-for="interest in user.interests" :key="interest" 
                      class="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                  {{ interest }}
                </span>
              </div>
              <p v-else class="text-gray-500 italic">Sin intereses</p>
            </InfoItem>
  
            <InfoItem label="Bio" class="col-span-1 md:col-span-2">
              <p class="text-gray-700 italic border-l-4 pl-4">{{ user.bio || 'Sin biografía' }}</p>
            </InfoItem>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Componente interno reutilizable
  const InfoItem = {
    props: ['label', 'value'],
    template: `
      <div class="py-2">
        <dt class="text-sm font-medium text-gray-500">{{ label }}</dt>
        <dd class="mt-1 text-sm text-gray-900">
          <slot>{{ value || 'No registrado' }}</slot>
        </dd>
      </div>
    `
  };
  
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  });
  
  defineEmits(['close']);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'No registrado';
    // Aseguramos que la fecha se interprete como UTC para evitar desfases de zona horaria
    return new Date(dateString).toLocaleDateString('es-ES', { timeZone: 'UTC' });
  };
  </script>
  