<template>
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 bg-white rounded shadow-md">
          <h3 class="text-lg font-medium text-gray-500">Usuarios Totales</h3>
          <p class="text-4xl font-bold text-indigo-600">{{ stats.users }}</p>
        </div>
        
        <div class="p-6 bg-white rounded shadow-md">
          <h3 class="text-lg font-medium text-gray-500">Productos Publicados</h3>
          <p class="text-4xl font-bold text-indigo-600">{{ stats.products }}</p>
        </div>
        
        <div class="p-6 bg-white rounded shadow-md">
          <h3 class="text-lg font-medium text-gray-500">Secciones Editables</h3>
          <p class="text-4xl font-bold text-indigo-600">2</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from '@/axios';
  
  const stats = ref({
    users: 0,
    products: 0,
  });
  
  onMounted(async () => {
    // Aquí llamarías a tu backend para obtener estadísticas reales
    // Por ahora, usamos datos de ejemplo
    try {
      // const response = await axios.get('/api/admin/stats');
      // stats.value = response.data;
      
      // Datos de ejemplo:
      stats.value = {
        users: 120,
        products: 450,
      };
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    }
  });
  </script>