<template>
  <aside class="w-72 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
    
    <div class="p-6 pt-8 text-left">
      <h2 class="text-xl font-bold text-gray-800">Mis Trueques</h2>
      <p class="text-sm text-gray-500">Gestiona tus publicaciones</p>
    </div>

    <nav class="flex flex-col px-4 mt-4 flex-grow">
      <router-link
        to="/publish-view"
        class="flex items-center px-4 py-3 bg-[#d7037b] text-white font-semibold rounded-lg shadow-lg shadow-[#d7037b]/30 hover:bg-[#b80268] transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#d7037b] focus:ring-offset-2 focus:ring-offset-gray-50"
        aria-label="Publicar un nuevo producto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
        Publicar Producto
      </router-link>

      <div class="mt-6 space-y-2">
        <router-link
          to="/my-products"
          class="nav-link"
          active-class="active"
          aria-label="Ver y gestionar mis productos publicados"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Mis Productos</span>
          <span class="ml-auto text-xs font-medium bg-gray-200 text-gray-700 rounded-full px-2 py-0.5">
            <span v-if="!loading">{{ products.length }}</span>
            <span v-else>...</span>
          </span>
        </router-link>

        </div>
    </nav>
    
    <div class="p-6 mt-auto">
      <div class="flex items-center space-x-3">
        <img class="h-10 w-10 rounded-full object-cover" src="https://ui-avatars.com/api/?name=User&background=d7037b&color=fff" alt="Avatar de usuario">
        <div>
          <p class="font-semibold text-gray-800 text-sm">{{ userStore.user?.username || 'Usuario' }}</p>
          <a href="#" class="text-xs text-[#d7037b] hover:underline">Ver Perfil</a>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const userStore = useUserStore();

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

const fetchUserProducts = async () => {
  try {
    loading.value = true;
    error.value = null;
    const authenticatedUserId = userStore.user?.id;
    
    if (!authenticatedUserId) {
      products.value = [];
      loading.value = false;
      return;
    }

    const response = await fetch(`${API_BASE_URL}/users/${authenticatedUserId}/products`);
    if (!response.ok) {
      throw new Error(`Error al cargar productos: ${response.statusText}`);
    }
    products.value = await response.json();
  } catch (err) {
    console.error("Error al cargar los productos del usuario:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUserProducts();
});
</script>

<style scoped>
/* Estilos base para los enlaces de navegación */
.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 16px; /* 12px vertical, 16px horizontal */
  font-size: 0.95rem; /* Ligeramente más grande que text-sm */
  font-weight: 500; /* Medium */
  color: #4b5563; /* text-gray-600 */
  border-radius: 0.5rem; /* rounded-lg */
  transition: all 0.2s ease-in-out;
  position: relative; /* Necesario para el pseudo-elemento */
  overflow: hidden; /* Oculta el pseudo-elemento fuera de los bordes */
}

/* Efecto hover: un sutil cambio de color de fondo */
.nav-link:hover {
  background-color: #f3f4f6; /* bg-gray-100 */
  color: #1f2937; /* text-gray-800 */
}

/* Estilos para el enlace ACTIVO */
.nav-link.active {
  background-color: #d7037b; /* Color principal */
  color: white;
  font-weight: 600; /* Semibold */
  box-shadow: 0 4px 14px 0 rgba(215, 3, 123, 0.25); /* Sombra sutil del color principal */
}

/* El contador de productos en el enlace activo debe ser visible */
.nav-link.active span:last-child {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
}
</style>