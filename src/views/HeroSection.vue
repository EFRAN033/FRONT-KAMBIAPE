<template>
  <section class="container mx-auto px-6 py-12 md:py-20">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
      <div class="text-center sm:text-left">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Productos disponibles para intercambio
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Se encontraron <span class="font-bold">{{ filteredAndSortedProducts.length }}</span> productos.
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-4 w-full sm:w-auto">
        <div class="relative w-full md:w-auto">
          <select
            v-model="selectedCategory"
            class="block w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm appearance-none"
          >
            <option value="">Todas las categorías</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 dark:text-gray-300">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        <div class="relative w-full md:w-auto">
          <select
            v-model="sortBy"
            class="block w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm appearance-none"
          >
            <option value="date-desc">Fecha de Publicación (Más reciente)</option>
            <option value="date-asc">Fecha de Publicación (Más antigua)</option>
            <option value="value-desc">Valor (Mayor a Menor)</option>
            <option value="value-asc">Valor (Menor a Mayor)</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 dark:text-gray-300">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <transition-group
      name="product-list"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <div
        v-for="product in filteredAndSortedProducts"
        :key="product.id"
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group"
      >
        <div class="relative overflow-hidden w-full aspect-video">
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
          <span class="absolute top-4 right-4 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">  {{ product.category }}</span>
        </div>
        
        <div class="p-6">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white truncate">
              {{ product.name }}
            </h3>
            <span class="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
              ${{ product.value }}
            </span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {{ product.description }}
          </p>
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg class="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
            </svg>
            <span class="mr-3">{{ formatDate(product.publicationDate) }}</span>
            <svg class="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
            </svg>
            <span>{{ product.owner }}</span>
          </div>
        </div>
      </div>
    </transition-group>

    <div v-if="filteredAndSortedProducts.length === 0" class="text-center py-16">
      <p class="text-2xl font-semibold text-gray-500 dark:text-gray-400">
        ¡Vaya! No se encontraron productos con los filtros seleccionados.
      </p>
      <button @click="resetFilters" class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
        Restablecer Filtros
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const products = ref([
  { id: 1, name: 'Silla de Oficina Ergonómica', description: 'Silla con soporte lumbar y reposabrazos ajustables, ideal para largas jornadas de trabajo.', value: 150, category: 'Mobiliario', publicationDate: '2025-06-28', owner: 'Juan P.' },
  { id: 2, name: 'Laptop Dell XPS 13', description: 'Laptop ultraligera y potente, perfecta para diseño gráfico y programación.', value: 900, category: 'Electrónica', publicationDate: '2025-06-25', owner: 'Maria G.' },
  { id: 3, name: 'Cámara Fotográfica DSLR Canon', description: 'Cámara semi-profesional con lente 50mm, en excelente estado.', value: 450, category: 'Electrónica', publicationDate: '2025-06-29', owner: 'Carlos R.' },
  { id: 4, name: 'Bicicleta de Montaña', description: 'Bicicleta rodado 29, con frenos de disco y 21 velocidades.', value: 300, category: 'Deportes', publicationDate: '2025-06-20', owner: 'Ana L.' },
  { id: 5, name: 'Guitarra Acústica', description: 'Guitarra de madera de abeto, sonido cálido y resonante, incluye funda.', value: 200, category: 'Música', publicationDate: '2025-06-27', owner: 'Pedro S.' },
  { id: 6, name: 'Monitor 4K de 27 pulgadas', description: 'Monitor con colores vibrantes y alta resolución, ideal para edición de video.', value: 400, category: 'Electrónica', publicationDate: '2025-06-26', owner: 'Laura M.' },
  { id: 7, name: 'Libro "El principito"', description: 'Edición especial de colección con ilustraciones originales.', value: 25, category: 'Libros', publicationDate: '2025-06-15', owner: 'Elena C.' },
  { id: 8, name: 'Juego de sartenes de teflón', description: 'Set de 3 sartenes antiadherentes de diferentes tamaños.', value: 80, category: 'Hogar', publicationDate: '2025-06-21', owner: 'Roberto F.' },
  { id: 9, name: 'Drone con cámara HD', description: 'Drone plegable con cámara 1080p y control remoto.', value: 180, category: 'Electrónica', publicationDate: '2025-06-30', owner: 'Sofía D.' },
  { id: 10, name: 'Consola Nintendo Switch', description: 'Consola portátil con controles Joy-Con, poco uso.', value: 280, category: 'Videojuegos', publicationDate: '2025-06-24', owner: 'Daniel V.' },
].map(p => ({ ...p, imageUrl: `https://source.unsplash.com/400x300/?${p.category.toLowerCase()}-${p.name.replace(/\s/g, '-')}` })));

const selectedCategory = ref('');
const sortBy = ref('date-desc');

const categories = computed(() => {
  const uniqueCategories = new Set(products.value.map(product => product.category));
  return [...uniqueCategories].sort();
});

const filteredAndSortedProducts = computed(() => {
  let filtered = products.value;

  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value);
  }

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'value-asc':
        return a.value - b.value;
      case 'value-desc':
        return b.value - a.value;
      case 'date-asc':
        return new Date(a.publicationDate) - new Date(b.publicationDate);
      case 'date-desc':
        return new Date(b.publicationDate) - new Date(a.publicationDate);
      default:
        return 0;
    }
  });

  return sorted;
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const resetFilters = () => {
  selectedCategory.value = '';
  sortBy.value = 'date-desc';
};
</script>

<style scoped>
.product-list-move,
.product-list-enter-active,
.product-list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.product-list-enter-from,
.product-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.product-list-leave-active {
  position: absolute;
}
</style>