<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />

    <div class="flex flex-1">
      <Sidebar />

      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pl-[120px]">
        <div class="max-w-full mx-auto">
          <h1 class="text-4xl font-extrabold text-gray-900 mb-8 text-center">Mis Productos Publicados</h1>

          <div v-if="loading" class="text-center py-16">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d7037b] mx-auto mb-4"></div>
            <p class="text-gray-600 text-lg">Cargando tus productos...</p>
          </div>
          <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-6 py-5 rounded-lg text-center" role="alert">
            <strong class="font-bold text-xl block mb-2">¡Error al cargar!</strong>
            <span class="block text-lg">{{ error }}</span>
          </div>

          <div v-else-if="products.length === 0" class="text-center py-16 bg-white rounded-lg shadow-inner border border-gray-200">
            <p class="text-2xl mb-4 font-semibold text-gray-700">¡Aún no tienes productos publicados!</p>
            <p class="text-lg text-gray-600 mb-6">Tu inventario de trueques está esperando su primer artículo.</p>
            <router-link to="/publicar" class="inline-flex items-center px-6 py-3 bg-[#d7037b] hover:bg-[#9e0154] text-white font-semibold text-lg rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
              Publica tu primer Producto
            </router-link>
          </div>

          <div velse class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="product in products" :key="product.id" class="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col">
              <div class="relative w-full h-48 bg-gray-100">
                <img :src="`${API_BASE_URL}${product.thumbnail_image_url}`" :alt="product.title" class="w-full h-full object-cover">
                <span :class="getStatusClass(product.status)" class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  {{ getStatusText(product.status) }}
                </span>
              </div>
              <div class="p-4 flex flex-col flex-grow">
                <h4 class="text-xl font-bold text-gray-900 truncate mb-1">{{ product.title }}</h4>
                <p class="text-sm text-gray-600 mb-3">{{ product.category_name }}</p>
                <div class="mt-auto pt-4 border-t border-gray-100 flex justify-end space-x-2">
                  <button @click="openEditModal(product)" class="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors" title="Editar Producto">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button @click="openDeleteModal(product)" class="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors" title="Eliminar Producto">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <h3 class="text-2xl font-bold mb-4">Editar Producto</h3>
            <form @submit.prevent="handleUpdateProduct">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Título</label>
                        <input type="text" v-model="editingProduct.title" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#d7037b] focus:border-[#d7037b]">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea v-model="editingProduct.description" rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#d7037b] focus:border-[#d7037b]"></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Estado del Producto</label>
                        <select v-model="editingProduct.status" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#d7037b] focus:border-[#d7037b]">
                            <option value="available">Disponible</option>
                            <option value="pending_exchange">En Intercambio</option>
                            <option value="exchanged">Intercambiado</option>
                        </select>
                    </div>
                </div>
                <div class="mt-6 flex justify-end space-x-3">
                    <button type="button" @click="isEditModalOpen = false" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
                    <button type="submit" class="px-4 py-2 bg-[#d7037b] text-white rounded-md hover:bg-[#9e0154]">Guardar Cambios</button>
                </div>
            </form>
        </div>
    </div>

    <div v-if="isDeleteModalOpen" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center">
            <h3 class="text-xl font-bold mb-4">¿Estás seguro?</h3>
            <p class="text-gray-600 mb-6">Esta acción es irreversible y eliminará permanentemente el producto "{{ deletingProduct.title }}".</p>
            <div class="flex justify-center space-x-4">
                <button @click="isDeleteModalOpen = false" class="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
                <button @click="handleDeleteProduct" class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Eliminar</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import { useUserStore } from '@/stores/user';
import axios from '@/axios';

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();
const userStore = useUserStore();

const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const editingProduct = ref(null);
const deletingProduct = ref(null);

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

const fetchUserProducts = async () => {
  try {
    loading.value = true;
    error.value = null;
    const authenticatedUserId = userStore.user?.id;
    if (!authenticatedUserId) {
      error.value = "No se ha encontrado un usuario autenticado.";
      loading.value = false;
      router.push('/login');
      return;
    }
    const response = await axios.get(`/users/${authenticatedUserId}/products`);
    products.value = response.data;
  } catch (err) {
    console.error("Error al cargar los productos del usuario:", err);
    error.value = err.response?.data?.detail || err.message || "Ocurrió un error inesperado.";
  } finally {
    loading.value = false;
  }
};

const openEditModal = (product) => {
  editingProduct.value = { ...product };
  isEditModalOpen.value = true;
};

const openDeleteModal = (product) => {
  deletingProduct.value = product;
  isDeleteModalOpen.value = true;
};

const handleUpdateProduct = async () => {
  if (!editingProduct.value) return;
  try {
    const { id, title, description, status } = editingProduct.value;
    await axios.put(`/products/${id}`, { title, description, status });
    isEditModalOpen.value = false;
    await fetchUserProducts();
    alert('¡Producto actualizado con éxito!');
  } catch (err) {
    console.error("Error al actualizar el producto:", err);
    alert(`Error: ${err.response?.data?.detail || 'No se pudo actualizar el producto.'}`);
  }
};

const handleDeleteProduct = async () => {
  if (!deletingProduct.value) return;
  try {
    await axios.delete(`/products/${deletingProduct.value.id}`);
    isDeleteModalOpen.value = false;
    await fetchUserProducts();
    alert('¡Producto eliminado con éxito!');
  } catch (err) {
    console.error("Error al eliminar el producto:", err);
    alert(`Error: ${err.response?.data?.detail || 'No se pudo eliminar el producto.'}`);
  }
};

const getStatusClass = (status) => {
  const classes = {
    available: 'bg-green-100 text-green-800',
    pending_exchange: 'bg-yellow-100 text-yellow-800',
    exchanged: 'bg-gray-100 text-gray-800',
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

const getStatusText = (status) => {
  const texts = {
    available: 'Disponible',
    pending_exchange: 'En Intercambio',
    exchanged: 'Intercambiado',
  };
  return texts[status] || 'Desconocido';
};

onMounted(fetchUserProducts);
</script>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>