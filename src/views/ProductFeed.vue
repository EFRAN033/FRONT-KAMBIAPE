<template>
  <section class="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 antialiased">
    <Transition name="fade-overlay">
      <div
        v-if="selectedProduct"
        class="fixed inset-0 bg-black/60 flex items-start justify-center p-4 sm:p-6 z-[60] backdrop-blur-sm overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        @keydown.esc="closeProductModal"
        @click.self="closeProductModal"
      >
        <div class="max-w-5xl w-full animate-[pop-in] opacity-0 my-auto">
          <ProductCard
            :product="selectedProduct"
            @propose-trade="handleProposeTrade"
            @close="closeProductModal"
          />
          </div>
      </div>
    </Transition>
    
    <div class="bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-4 sticky top-3 z-40">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="w-full md:w-1/3 relative">
          <label for="search-filter" class="sr-only">Buscar productos</label>
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" /></svg>
          </div>
          <input
            type="search"
            id="search-filter"
            :value="searchQuery"
            @input="onSearchInput"
            placeholder="Buscar por nombre, marca..."
            class="block w-full rounded-full border-0 bg-gray-100 dark:bg-gray-700/50 py-2.5 pl-11 pr-5 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary transition sm:text-sm"
          />
        </div>

        <div class="flex items-center gap-3 flex-wrap">
          <div class="relative" @keydown.escape="isCategoryDropdownOpen=false">
            <button
              ref="catBtnRef"
              @click="toggleCategory"
              @keydown.arrow-down.prevent="openCategoryAndFocusFirst()"
              type="button"
              class="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-haspopup="listbox"
              :aria-expanded="isCategoryDropdownOpen"
            >
              <svg class="h-5 w-5 text-brand-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM2.5 6.25c0-.414.336-.75.75-.75h7.5c.414 0 .75.336.75.75v7.5c0 .414-.336-.75-.75-.75h-7.5a.75.75 0 01-.75-.75v-7.5z" /><path d="M15.25 5.5a.75.75 0 00-1.5 0v7a.75.75 0 001.5 0v-7zM17.5 5.5a.75.75 0 00-1.5 0v7a.75.75 0 001.5 0v-7z" /></svg>
              <span class="hidden md:inline text-gray-600 dark:text-gray-400">Categoría:</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ selectedCategory || 'Todas' }}</span>
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clip-rule="evenodd" /></svg>
            </button>
            <Transition name="dropdown">
              <ul
                v-if="isCategoryDropdownOpen"
                ref="catListRef"
                class="absolute top-full mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none z-10 py-1 max-h-72 overflow-auto"
                role="listbox"
                tabindex="-1"
                @keydown.arrow-down.prevent="focusNext('cat')"
                @keydown.arrow-up.prevent="focusPrev('cat')"
                @keydown.enter.prevent="selectFocused('cat')"
              >
                <li
                  ref="catOptionRefs"
                  :data-index="0"
                  class="text-gray-700 dark:text-gray-200 px-4 py-2 text-sm hover:bg-brand-light/60 dark:hover:bg-gray-700 cursor-pointer"
                  role="option"
                  aria-selected="true"
                  @click.prevent="selectCategory('')"
                >
                  Todas las categorías
                </li>
                <li
                  v-for="(category, idx) in categories"
                  :key="category"
                  ref="catOptionRefs"
                  :data-index="idx+1"
                  class="text-gray-700 dark:text-gray-200 px-4 py-2 text-sm hover:bg-brand-light/60 dark:hover:bg-gray-700 cursor-pointer"
                  role="option"
                  @click.prevent="selectCategory(category)"
                >
                  {{ category }}
                </li>
              </ul>
            </Transition>
          </div>

          <div class="relative" @keydown.escape="isSortDropdownOpen=false">
            <button
              ref="sortBtnRef"
              @click="toggleSort"
              @keydown.arrow-down.prevent="openSortAndFocusFirst()"
              type="button"
              class="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-haspopup="listbox"
              :aria-expanded="isSortDropdownOpen"
            >
              <svg class="h-5 w-5 text-brand-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2.24 6.5A.75.75 0 013 6h14a.75.75 0 010 1.5H3a.75.75 0 01-.76-.5zM3 10h14a.75.75 0 010 1.5H3a.75.75 0 010-1.5zM3.75 14a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clip-rule="evenodd" /></svg>
              <span class="hidden md:inline text-gray-600 dark:text-gray-400">Ordenar:</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ sortOptions.find(opt => opt.value === sortBy)?.label }}</span>
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clip-rule="evenodd" /></svg>
            </button>
            <Transition name="dropdown">
              <ul
                v-if="isSortDropdownOpen"
                ref="sortListRef"
                class="absolute top-full mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none z-10 py-1"
                role="listbox"
                tabindex="-1"
                @keydown.arrow-down.prevent="focusNext('sort')"
                @keydown.arrow-up.prevent="focusPrev('sort')"
                @keydown.enter.prevent="selectFocused('sort')"
              >
                <li
                  v-for="(option, idx) in sortOptions"
                  :key="option.value"
                  ref="sortOptionRefs"
                  :data-index="idx"
                  class="text-gray-700 dark:text-gray-200 px-4 py-2 text-sm hover:bg-brand-light/60 dark:hover:bg-gray-700 cursor-pointer"
                  role="option"
                  @click.prevent="selectSortBy(option.value)"
                >
                  {{ option.label }}
                </li>
              </ul>
            </Transition>
          </div>

          <div class="w-full md:w-auto">
            <button @click="resetFilters" class="w-full md:w-auto flex-shrink-0 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 font-medium py-2.5 px-4 md:px-6 rounded-full transition shadow-sm ring-1 ring-inset ring-transparent hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-brand-primary">
              Reiniciar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 py-10 md:py-12 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-inner">
      <div v-if="loading" class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4 sm:px-6 lg:px-8">
        <div v-for="n in 12" :key="n" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
          <div class="w-full h-48 sm:h-56 bg-gray-200 dark:bg-gray-700"></div>
          <div class="p-5">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
            <div class="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
              <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div class="h-10 bg-brand-primary/40 dark:bg-brand-primary/60 rounded-full w-24"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="visibleProducts.length === 0" class="text-center py-20 px-4">
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-3 font-semibold">No se encontraron productos</p>
        <p class="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">Prueba cambiando filtros o términos de búsqueda. También puedes mostrar todos los productos nuevamente.</p>
        <button @click="resetFilters" class="mt-6 px-6 py-3 bg-brand-primary text-white rounded-full hover:brightness-110 transition shadow-md focus:outline-none focus:ring-2 focus:ring-brand-primary/60">
          Mostrar todos los productos
        </button>
      </div>

      <TransitionGroup name="product-list" tag="div" class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4 sm:px-6 lg:px-8">
        <article
          v-for="product in visibleProducts"
          :key="product.id"
          class="relative isolate flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group border border-gray-100 dark:border-gray-700 focus-within:ring-2 focus-within:ring-brand-primary outline-none"
          tabindex="0"
        >
          <div class="relative overflow-hidden rounded-t-xl">
            <img
              :src="`${API_BASE_URL}${product.thumbnail_image_url}`"
              :alt="product.title"
              class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
          </div>

          <div class="absolute -top-3 right-3 z-10 bg-brand-primary text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg shadow-brand-primary/30">
            {{ product.category_name }}
          </div>

          <div class="flex flex-col flex-grow p-3 sm:p-5">
            
            <div class="flex items-center justify-between gap-2 mb-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 truncate min-w-0">
                {{ formatTitle(product.title) }}
              </h3>
              
              <span
                v-if="userStore.user && product.user_username === userStore.user.full_name"
                class="flex-shrink-0 rounded-full bg-white/70 dark:bg-gray-700/60 px-3 py-1 text-xs font-bold text-accentBlue dark:text-blue-300 ring-2 ring-inset ring-accentBlue/50 dark:ring-blue-400/60 backdrop-blur-sm"
              >
                Tuyo
              </span>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Publicado por <span class="font-semibold text-gray-700 dark:text-gray-200">{{ formatOwnerName(product.user_username) || 'Usuario' }}</span>
            </div>
            
            <p class="hidden sm:block text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 min-h-[40px]">{{ product.description }}</p>

            <div class="hidden sm:flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4 gap-3">
              <div class="inline-flex items-center">
                <svg class="w-4 h-4 mr-1 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                </svg>
                <span class="truncate">{{ product.condition }}</span>
              </div>
              <span aria-hidden="true">•</span>
              <span class="truncate">Hace {{ calculateAgeDays(product.created_at) }} días</span>
            </div>

            <div v-if="product.exchange_interests && product.exchange_interests.length > 0" class="hidden sm:block mt-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Busca a cambio:</h4>
                <div class="flex flex-wrap gap-1.5">
                    <span v-for="interest in product.exchange_interests" :key="interest" class="badge-sq">
                    {{ interest }}
                    </span>
                </div>
            </div>
            
            <div class="flex justify-between items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
              
              <div class="flex items-center gap-1.5">
                <button
                  @click.stop="toggleLike(product)"
                  class="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Dar me gusta"
                >
                  <img 
                    :src="product.isLiked ? likeOffIcon : likeOnIcon" 
                    alt="Me gusta" 
                    class="h-4 w-4 sm:h-5 sm:w-5 object-contain transition-transform duration-150 ease-in-out"
                    :class="{ 'scale-110': product.isLiked }"
                  />
                </button>
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {{ product.likes_count }}
                </span>
              </div>
              <button
                @click="openProductModal(product)"
                class="bg-brand-primary text-white px-2 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-medium rounded-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand-primary/60"
              >
                Intercambiar
              </button>
            </div>
            </div>
        </article>
      </TransitionGroup>

      <div v-if="hasMore" ref="sentinelRef" class="px-4 sm:px-6 lg:px-8 mt-8">
        <div class="w-full h-11 rounded-full bg-gray-200/80 dark:bg-gray-700/60 animate-pulse"></div>
      </div>
    </div>

    <section class="relative w-full overflow-hidden mt-10 rounded-2xl ring-1 ring-white/20" aria-label="Redes sociales Kambix">
      <div class="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-dark">
        <div class="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4)_1px,transparent_1.5px)] bg-[length:18px_18px]"></div>
        <div class="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.4)_1px,transparent_1.5px)] bg-[length:18px_18px]"></div>
      </div>
      
      <div class="relative mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
        <div class="flex w-full items-center justify-between gap-3">
          <p class="text-left font-extrabold tracking-wide text-white drop-shadow-[0_2px_0_rgba(166,4,93,0.6)] text-sm sm:text-[clamp(14px,2vw,20px)]">
            <span class="sm:hidden">¡<span class="uppercase">Kambix</span>! Síguenos</span>
            <span class="hidden sm:inline">¡<span class="uppercase">Kambix</span>! Síguenos y entérate de nuestras novedades</span>
          </p>
          <nav class="flex items-center justify-center gap-2 sm:gap-3" aria-label="Redes sociales">
            <a href="https://www.instagram.com/kambia_pe?igsh=MWg2aWR3YnhnNW1qdw==" target="_blank" rel="noopener noreferrer" class="group inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all hover:scale-[1.04] hover:bg-white" aria-label="Instagram de Kambix (@kambix_oficial)">
              <svg class="h-5 w-5 text-brand-dark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5a5.5 5.5 0 1 0 5.5 5.5A5.5 5.5 0 0 0 12 7.5ZM18 6.8a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 18 6.8Z"/></svg>
            </a>
            <a href="https://tiktok.com/@kambiape" target="_blank" rel="noopener noreferrer" class="group inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all hover:scale-[1.04] hover:bg-white" aria-label="TikTok de Kambix">
              <svg class="h-5 w-5 text-brand-dark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3h3.1A6.9 6.9 0 0 0 23 9.9V13A10 10 0 0 1 13 6.1V16a6 6 0 1 1-6-6c.34 0 .68.03 1.02.1V13a3 3 0 1 0 3 3V3Z"/></svg>
            </a>
            <a href="https://www.facebook.com/share/1A62pnpV8K/" target="_blank" rel="noopener noreferrer" class="group inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all hover:scale-[1.04] hover:bg-white" aria-label="Facebook de Kambix">
              <svg class="h-5 w-5 text-brand-dark" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951Z"/></svg>
            </a>
          </nav>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
// Toda la lógica de las tarjetas animadas se ha movido a HeroSection.vue
// Aquí solo queda la lógica para el feed de productos.
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import ProductCard from './ProductCard.vue';

// Asumimos que @ apunta a tu carpeta /src
import likeOnIcon from '@/assets/imagenes/likeon.svg';
import likeOffIcon from '@/assets/imagenes/likeof.png';

const userStore = useUserStore();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const products = ref([]);
const loading = ref(true);
const selectedProduct = ref(null);
const selectedCategory = ref('');
const sortBy = ref('likes-desc'); // <-- MODIFICACIÓN 1
const searchQuery = ref('');
let searchTimer = null;
const isCategoryDropdownOpen = ref(false);
const isSortDropdownOpen = ref(false);
const catBtnRef = ref(null);
const sortBtnRef = ref(null);
const catListRef = ref(null);
const sortListRef = ref(null);
const catOptionRefs = ref([]);
const sortOptionRefs = ref([]);
const pageSize = 12;
const page = ref(1);
const sentinelRef = ref(null);
let io = null;

const categories = ref(['Electrónica', 'Mobiliario', 'Deportes', 'Libros', 'Ropa y Accesorios', 'Hogar', 'Juguetes', 'Herramientas', 'Música', 'Videojuegos', 'Coleccionables', 'Arte', 'Otros']);

// --- MODIFICACIÓN 2 ---
const sortOptions = ref([
  { value: 'likes-desc', label: 'Más populares' },
  { value: 'date-desc', label: 'Más recientes' },
  { value: 'date-asc', label: 'Más antiguos' },
  { value: 'name-asc', label: 'Nombre (A-Z)' },
  { value: 'name-desc', label: 'Nombre (Z-A)' },
  { value: 'likes-asc', label: 'Menos populares' },
]);
// --- FIN MODIFICACIÓN 2 ---

const openProductModal = (product) => {
  selectedProduct.value = product;
  document.body.style.overflow = 'hidden';
};

const closeProductModal = () => {
  selectedProduct.value = null;
  document.body.style.overflow = '';
};

const handleProposeTrade = (product) => {
  console.log('Proponer intercambio por:', product.title);
  closeProductModal();
};

const calculateAgeDays = (dateString) => {
  const today = new Date();
  const productDate = new Date(dateString);
  const diffTime = Math.abs(today.getTime() - productDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const formatOwnerName = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return 'Usuario';
  const parts = fullName.trim().split(/\s+/).filter(p => p);
  if (parts.length === 0) return 'Usuario';
  if (parts.length === 1) return parts[0].toUpperCase();
  const firstName = parts[0].toUpperCase();
  const initials = parts.slice(1).map(part => `${part.charAt(0).toUpperCase()}.`);
  return `${firstName}, ${initials.join(' ')}`;
};

const formatTitle = (title) => {
  if (!title || typeof title !== 'string') return '';
  return title.charAt(0).toUpperCase() + title.slice(1);
};

const onSearchInput = (e) => {
  const val = e.target.value;
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    searchQuery.value = val;
  }, 250);
};

// --- INICIO DE LA MODIFICACIÓN (toggleLike) ---
const toggleLike = async (productToToggle) => {
  // 1. Verificar si el usuario está logueado
  if (!userStore.user || !userStore.token) {
    alert('Debes iniciar sesión para dar me gusta a un producto.');
    // Opcional: Redirigir al login
    // import { useRouter } from 'vue-router';
    // const router = useRouter();
    // router.push('/login');
    return;
  }

  // 2. Encontrar el producto en la lista
  const productInArray = products.value.find(p => p.id === productToToggle.id);
  if (!productInArray) return;

  // 3. Actualización optimista: Cambia el estado en la UI primero
  const originalStatus = productInArray.isLiked;
  const originalLikesCount = productInArray.likes_count; // <-- Guardamos el conteo original

  productInArray.isLiked = !productInArray.isLiked;
  
  // --- INICIO DE LA MODIFICACIÓN (Actualizar conteo local) ---
  if (productInArray.isLiked) {
    productInArray.likes_count += 1;
  } else {
    productInArray.likes_count -= 1;
  }
  // --- FIN DE LA MODIFICACIÓN ---

  // 4. Preparar la llamada a la API
  const method = productInArray.isLiked ? 'POST' : 'DELETE';
  const url = `/api/products/${productToToggle.id}/like`;
  
  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        // ¡Clave! Enviar el token para que el backend sepa quién eres
        'Authorization': `Bearer ${userStore.token}`,
        'Content-Type': 'application/json'
      }
    });

    // 5. Manejar error de la API
    if (!res.ok) {
      // Si la API falla, revertir el cambio en la UI
      productInArray.isLiked = originalStatus;
      productInArray.likes_count = originalLikesCount; // <-- Revertimos el conteo
      
      const errorText = await res.text();
      console.error(`Error al ${method} like:`, res.status, errorText);

      if (res.status === 401 || res.status === 403) {
        alert('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
        // Opcional: desloguear al usuario
        // userStore.logout();
      } else {
        alert('Ocurrió un error al guardar tu "Me gusta". Inténtalo de nuevo.');
      }
    }
    // 6. Si res.ok, no se hace nada. El cambio optimista se queda.
    
  } catch (err) {
    // 7. Manejar error de red
    console.error('Error de red al intentar dar like:', err);
    // Revertir el cambio si hay un error de red
    productInArray.isLiked = originalStatus;
    productInArray.likes_count = originalLikesCount; // <-- Revertimos el conteo
    alert('Error de red. No se pudo guardar tu "Me gusta".');
  }
};
// --- FIN DE LA MODIFICACIÓN (toggleLike) ---


// --- INICIO DE LA MODIFICACIÓN (fetchAllProducts) ---
const fetchAllProducts = async () => {
  try {
    loading.value = true;
    
    // 1. Preparamos los headers. Si el usuario está logueado, enviamos el token.
    const headers = {};
    if (userStore.token) {
      headers['Authorization'] = `Bearer ${userStore.token}`;
    }

    // 2. Hacemos la petición con los headers
    const res = await fetch(`/api/products_feed`, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    
    // 3. ¡Eliminamos el mapeo! Usamos los datos tal cual vienen del API.
    // El backend ya nos está enviando el campo 'isLiked' y 'likes_count'
    products.value = data.map(p => ({
      ...p,
      user_username: p.user_username // Asegurándonos que este campo exista
    }));

  } catch (err) {
    console.error('Error fetching products:', err);
  } finally {
    loading.value = false;
  }
};
// --- FIN DE LA MODIFICACIÓN (fetchAllProducts) ---

const filteredProducts = computed(() => {
  let out = [...products.value];
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    out = out.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  }
  if (selectedCategory.value) {
    out = out.filter(p => p.category_name === selectedCategory.value);
  }

  // --- MODIFICACIÓN 3 ---
  out.sort((a, b) => {
    const da = new Date(a.created_at).getTime();
    const db = new Date(b.created_at).getTime();
    
    switch (sortBy.value) {
      case 'likes-desc':
        return b.likes_count - a.likes_count;
      case 'likes-asc':
        return a.likes_count - b.likes_count;
      case 'date-desc': 
        return db - da;
      case 'date-asc': 
        return da - db;
      case 'name-asc': 
        return a.title.localeCompare(b.title);
      case 'name-desc': 
        return b.title.localeCompare(a.title);
      default: 
        return 0;
    }
  });
  // --- FIN MODIFICACIÓN 3 ---

  return out;
});

const visibleProducts = computed(() => filteredProducts.value.slice(0, page.value * pageSize));
const hasMore = computed(() => filteredProducts.value.length > visibleProducts.value.length);
const loadMore = () => { if (hasMore.value) page.value += 1; };

const toggleCategory = () => { isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value; };
const toggleSort = () => { isSortDropdownOpen.value = !isSortDropdownOpen.value; };

const selectCategory = (c) => {
  selectedCategory.value = c;
  isCategoryDropdownOpen.value = false;
  page.value = 1;
};
const selectSortBy = (v) => {
  sortBy.value = v;
  isSortDropdownOpen.value = false;
  page.value = 1;
};

// --- MODIFICACIÓN 4 ---
const resetFilters = () => {
  selectedCategory.value = '';
  sortBy.value = 'likes-desc';
  searchQuery.value = '';
  page.value = 1;
};
// --- FIN MODIFICACIÓN 4 ---

onMounted(() => {
  fetchAllProducts();

  io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) loadMore(); });
  }, { rootMargin: '300px' });
  
  // Pequeña corrección: Observar el elemento *después* de que se renderice
  watch(sentinelRef, (newVal) => {
    if (newVal) {
      io.observe(newVal);
    }
  });
});

onBeforeUnmount(() => {
  if (io && sentinelRef.value) {
    io.unobserve(sentinelRef.value);
  }
  io = null;
  document.body.style.overflow = '';
});

watch([selectedCategory, sortBy, searchQuery], () => { page.value = 1; });

// Corrección para el v-if de "Tuyo"
watch(
  () => userStore.user,
  (newUser) => {
    if (newUser) {
      // Forzar una actualización si es necesario, aunque la reactividad debería bastar
      console.log('User store updated:', newUser.full_name);
    }
  },
  { deep: true }
);

</script>

<style scoped>
.product-list-enter-active,
.product-list-leave-active { transition: all .35s ease }
.product-list-enter-from,
.product-list-leave-to { opacity: 0; transform: translateY(18px) }
.product-list-leave-active { position: absolute }

.truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis }

.badge-sq{
  display:inline-flex; align-items:center; gap:.35rem;
  padding:.28rem .5rem; font-size:.75rem; font-weight:700; line-height:1;
  border:1px solid #E2E8F0; color:#0f172a; background:#fff; border-radius:4px; box-shadow:0 1px 0 rgba(2,6,23,.05);
}
.dark .badge-sq{ border-color:#334155; color:#e2e8f0; background:#0b1220; box-shadow:0 1px 0 rgba(0,0,0,.3); }

.fade-overlay-enter-active,
.fade-overlay-leave-active { transition: opacity .3s ease; }
.fade-overlay-enter-from,
.fade-overlay-leave-to { opacity: 0; }

@keyframes pop-in {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-\[pop-in\] {
  animation: pop-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
</style>