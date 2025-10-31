<template>
  <div class="flex h-screen bg-gray-100">
    <aside class="flex-shrink-0 w-64 bg-gray-800 text-white">
      <div class="p-4">
        <h2 class="text-2xl font-semibold">Kambiape Admin</h2>
      </div>
      <nav class="mt-6">
        <RouterLink 
          to="/admin/dashboard" 
          class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
          active-class="bg-gray-900 text-white"
        >
          <span class="ml-2">Dashboard</span>
        </RouterLink>
        
        <RouterLink 
          to="/admin/hero-section" 
          class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
          active-class="bg-gray-900 text-white"
        >
          <span class="ml-2">Editar Hero</span>
        </RouterLink>

        <RouterLink 
          to="/admin/edit-about" 
          class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
          active-class="bg-gray-900 text-white"
        >
          <span class="ml-2">Editar Nosotros</span>
        </RouterLink>

        <RouterLink 
          to="/admin/users" 
          class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
          active-class="bg-gray-900 text-white"
        >
          <span class="ml-2">Usuarios</span>
        </RouterLink>

        <RouterLink 
          to="/admin/mapping" 
          class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
          active-class="bg-gray-900 text-white"
        >
          <span class="ml-2">Mapeo</span>
        </RouterLink>

        <RouterLink 
          to="/admin/comments" 
          class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
          active-class="bg-gray-900 text-white"
        >
          <span class="ml-2">Comentarios</span>
        </RouterLink>
      </nav>
      
      <div class="absolute bottom-0 w-64 p-4">
        <button 
          @click="handleLogout"
          class="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-red-700 hover:text-white rounded"
        >
          <span class="ml-2">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
    
    <main class="flex-1 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

const handleLogout = () => {
  userStore.logout();
  router.push('/admin/login');
};
</script>

<style scoped>
/* Estilo personalizado para el enlace activo */
.router-link-exact-active {
  background-color: #1a202c; /* bg-gray-900 */
  color: white;
  border-left: 4px solid #4f46e5; /* border-indigo-600 */
  padding-left: calc(1rem - 4px); /* Ajusta el padding por el borde */
}
</style>