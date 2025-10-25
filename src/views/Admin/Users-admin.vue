<template>
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-6">Gestionar Usuarios</h1>
  
      <div class="bg-white rounded shadow-md overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="4" class="px-6 py-4 text-center text-gray-500">Cargando...</td>
            </tr>
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.first_name }} {{ user.last_name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from '@/axios';
  
  const users = ref([]);
  const loading = ref(false);
  
  const fetchUsers = async () => {
    loading.value = true;
    try {
      const response = await axios.get('/api/admin/users'); // Endpoint de tu backend
      users.value = response.data;
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      loading.value = false;
    }
  };
  
  const deleteUser = async (userId) => {
    if (confirm('¿Estás seguro de que quieres eliminar a este usuario?')) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        // Volver a cargar la lista después de eliminar
        fetchUsers();
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };
  
  // Cargar usuarios al montar el componente
  onMounted(() => {
    fetchUsers();
  });
  </script>