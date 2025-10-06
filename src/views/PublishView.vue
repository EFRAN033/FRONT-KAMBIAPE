<template>
  <div class="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-10%,#fde4e9,transparent_60%),radial-gradient(900px_500px_at_110%_10%,#e0f2fe,transparent_55%),linear-gradient(180deg,#fff,65%,#fafafa)] text-slate-800 selection:bg-rose-200/60">
    <Header />

    <div class="sticky top-0 z-30 w-full h-1.5 bg-slate-200/70 overflow-hidden">
      <div class="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 transition-[width] duration-500" :style="{ width: currentStep===1 ? '50%' : '100%' }"></div>
    </div>

    <div class="flex">
      <Sidebar />

      <div class="relative flex-1">
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-rose-300/20 blur-3xl"></div>
          <div class="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl"></div>
        </div>

        <main class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <section class="mb-10">
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Publica tu Producto
            </h1>
            <p class="mt-2 max-w-2xl text-[15px] sm:text-base text-slate-600">Completa los detalles y ponlo en circulación para un trueque.</p>
            
          </section>

          <div class="grid lg:grid-cols-[minmax(0,1fr),380px] gap-12 items-start">
            <section class="space-y-10">
              <nav class="flex items-center gap-4 text-sm select-none" aria-label="Progreso">
                <button type="button" @click="currentStep=1" class="group flex items-center gap-2">
                  <span class="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-slate-700 font-semibold ring-1 ring-slate-200/80" :class="currentStep===1 ? 'outline outline-2 outline-rose-300/70' : ''">1</span>
                  <span :class="currentStep===1 ? 'text-slate-900 font-medium' : 'text-slate-600'">Detalles</span>
                </button>
                <span class="h-px flex-1 bg-slate-300/60"></span>
                <button type="button" @click="goToStepIfValid(2)" class="group flex items-center gap-2">
                  <span class="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-slate-700 font-semibold ring-1 ring-slate-200/80" :class="currentStep===2 ? 'outline outline-2 outline-rose-300/70' : ''">2</span>
                  <span :class="currentStep===2 ? 'text-slate-900 font-medium' : 'text-slate-600'">Fotos</span>
                </button>
              </nav>

              <transition name="slide-fade" mode="out-in">
                <div v-if="currentStep===1" key="s1" class="space-y-8">
                  <header class="flex items-center gap-3">
                    <span class="grid h-8 w-8 place-items-center rounded-md bg-slate-100 text-slate-700"><svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M4 5a2 2 0 012-2h8a2 2 0 012 2v1H4V5zm0 3h12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"/></svg></span>
                    <h2 class="text-lg font-semibold text-slate-900">Detalles del producto</h2>
                  </header>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div class="relative">
                      <label for="name" class="absolute -top-3 left-0 text-xs px-1 rounded bg-white/70 backdrop-blur text-slate-700">Nombre del Producto <span class="text-rose-600">*</span></label>
                      <input id="name" v-model="product.name" type="text" placeholder="Ej. Bicicleta…" class="mt-3 w-full bg-transparent border-0 border-b border-slate-300/80 focus:border-rose-500 focus:ring-0 px-0 py-2" :class="{'!border-rose-400': step1Errors.name}"/>
                      <p v-if="step1Errors.name" class="text-rose-600 text-xs mt-1">{{ step1Errors.name }}</p>
                    </div>

                    <div class="relative">
                      <label for="category" class="absolute -top-3 left-0 text-xs px-1 rounded bg-white/70 backdrop-blur text-slate-700">Categoría <span class="text-rose-600">*</span></label>
                      <select id="category" v-model="product.category" class="mt-3 w-full bg-transparent border-0 border-b border-slate-300/80 focus:border-rose-500 focus:ring-0 px-0 py-2 appearance-none pr-8" :class="{'!border-rose-400': step1Errors.category}">
                        <option value="" disabled>Selecciona una categoría</option>
                        <option>Electrónica</option><option>Mobiliario</option><option>Deportes</option><option>Libros</option><option>Ropa y Accesorios</option><option>Hogar</option><option>Juguetes</option><option>Herramientas</option><option>Música</option><option>Videojuegos</option><option>Coleccionables</option><option>Arte</option><option>Otros</option>
                      </select>
                      <div class="pointer-events-none absolute right-0 top-4 text-slate-500"><svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M6 8l4 4 4-4H6z"/></svg></div>
                      <p v-if="step1Errors.category" class="text-rose-600 text-xs mt-1">{{ step1Errors.category }}</p>
                    </div>

                    <div class="relative">
                      <label for="condition" class="absolute -top-3 left-0 text-xs px-1 rounded bg-white/70 backdrop-blur text-slate-700">Estado <span class="text-rose-600">*</span></label>
                      <select id="condition" v-model="product.condition" class="mt-3 w-full bg-transparent border-0 border-b border-slate-300/80 focus:border-rose-500 focus:ring-0 px-0 py-2 appearance-none pr-8" :class="{'!border-rose-400': step1Errors.condition}">
                        <option value="" disabled>Selecciona el estado</option>
                        <option>Nuevo</option><option>Como Nuevo</option><option>Usado - Buen Estado</option><option>Usado - Aceptable</option><option>Para Piezas/Reparar</option>
                      </select>
                      <div class="pointer-events-none absolute right-0 top-4 text-slate-500"><svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M6 8l4 4 4-4H6z"/></svg></div>
                      <p v-if="step1Errors.condition" class="text-rose-600 text-xs mt-1">{{ step1Errors.condition }}</p>
                    </div>

                    <div class="md:col-span-2">
                      <label for="description" class="block text-sm font-medium text-slate-700">Descripción <span class="text-rose-600">*</span></label>
                      <textarea id="description" v-model="product.description" rows="4" maxlength="500" placeholder="Incluye estado, características y detalles clave."
                        class="mt-1 w-full bg-transparent border border-slate-300/80 focus:border-rose-500 focus:ring-0 rounded-xl px-3.5 py-3 resize-y" :class="{'!border-rose-400': step1Errors.description}"></textarea>
                      <div class="mt-1 flex items-center justify-between">
                        <p v-if="step1Errors.description" class="text-rose-600 text-xs">{{ step1Errors.description }}</p>
                        <p class="text-[11px] text-slate-500 ml-auto">{{ product.description.length }} / 500</p>
                      </div>
                      <div class="mt-2 h-1.5 w-full rounded-full bg-slate-200/60 overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-[width] duration-500" :style="{ width: Math.min(100, Math.round((product.description.length/500)*100)) + '%' }"></div>
                      </div>
                    </div>
                    
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-slate-700">¿Qué buscas a cambio? (Intereses)</label>
                        <div class="mt-3 p-3 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-transparent">
                            <p v-if="exchangeInterests.size === 0" class="text-sm text-slate-500 dark:text-slate-400">
                                Selecciona las categorías que te interesan para el intercambio.
                            </p>
                            <div v-else class="flex flex-wrap gap-1.5">
                                <span v-for="interestName in exchangeInterests" :key="`selected-${interestName}`" class="badge-sq badge-sq--active">
                                    {{ interestName }}
                                    <button @click="toggleInterest(interestName)" type="button" class="badge-remove" :aria-label="`Quitar ${interestName}`">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                        </div>

                        <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <p class="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">Añadir Intereses:</p>
                            <div v-if="availableCategories.length > 0" class="tile-list">
                                <button v-for="category in availableCategories" :key="category.id" type="button" class="tile" :class="exchangeInterests.has(category.name) && 'is-selected'" :aria-pressed="exchangeInterests.has(category.name)" @click="toggleInterest(category.name)">
                                    <span class="tile-check" aria-hidden="true">
                                        <svg v-if="exchangeInterests.has(category.name)" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.707 14.707a1 1 0 01-1.414 0L3.293 10.707a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                        </svg>
                                    </span>
                                    <span class="tile-text">{{ category.name }}</span>
                                </button>
                            </div>
                            <p v-else-if="allCategories.length > 0" class="text-sm text-slate-500 dark:text-slate-400">
                                ¡Has seleccionado todos los intereses disponibles!
                            </p>
                            <p v-else class="text-sm text-slate-500 dark:text-slate-400">
                                Cargando categorías...
                            </p>
                        </div>
                    </div>

                  </div>

                  <div class="pt-4 flex justify-end border-t border-dashed border-slate-300/70">
                    <button type="button" @click="goToNextStep" class="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 text-white font-semibold hover:bg-rose-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300/60 transition-transform hover:-translate-y-0.5">Siguiente Paso</button>
                  </div>
                </div>
              </transition>

              <transition name="slide-fade" mode="out-in">
                <div v-if="currentStep===2" key="s2" class="space-y-8">
                  <header class="flex items-center gap-3">
                    <span class="grid h-8 w-8 place-items-center rounded-md bg-slate-100 text-slate-700"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 3l3 4 2-3 4 6H7l3-7z"/></svg></span>
                    <h2 class="text-lg font-semibold text-slate-900">Fotos del producto</h2>
                  </header>

                  <div class="group relative rounded-3xl border-2 border-dashed border-slate-300 px-6 py-10 text-center cursor-pointer hover:border-rose-400/80 hover:shadow-sm transition will-change-transform hover:scale-[1.01]"
                       :class="{'border-rose-500': step2Errors.photos}"
                       @click="triggerFileInput" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop">
                    <input type="file" ref="fileInput" @change="handleFileChange" multiple accept="image/*" class="hidden" />
                    <svg class="mx-auto h-10 w-10 text-slate-400 group-hover:scale-105 transition" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3-3a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4l5.172 5.172a4 4 0 005.656 0L40 32M28 8a4 4 0 100 8 4 4 0 000-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <p class="mt-2 text-sm text-slate-600">Arrastra y suelta imágenes aquí, o haz clic para seleccionar</p>
                    <p class="text-xs text-slate-500">(Máximo 4 imágenes, JPG/PNG)</p>
                  </div>

                  <p v-if="step2Errors.photos" class="text-rose-600 text-xs -mt-4">{{ step2Errors.photos }}</p>

                  <div v-if="imagePreviews.length > 0">
                    <p class="text-sm text-slate-600 mb-2">Arrastra las imágenes para reordenarlas. La primera será la portada.</p>
                    <transition-group tag="div" name="list" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div v-for="(image, i) in imagePreviews" :key="image" class="relative overflow-hidden rounded-xl ring-1 ring-slate-200/70 bg-white cursor-move group/item"
                        draggable="true" @dragstart="onDragStart(i)" @dragover.prevent="onDragOver($event, i)" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop(i)"
                        :class="{ 'opacity-50': dragging && draggedIndex === i }">
                        
                        <div class="absolute inset-0 z-10 transition-colors" :class="{ 'bg-rose-100/50': dragOverIndex === i }"></div>
                        
                        <img :src="image" :alt="`Preview ${i+1}`" class="w-full h-36 object-cover"/>
                        <button @click="removeImage(i)" class="absolute top-1 right-1 rounded-full bg-rose-600 text-white p-1 opacity-90 hover:opacity-100 transition" aria-label="Eliminar imagen">
                          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                        <div v-if="i === 0" class="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          Portada
                        </div>
                      </div>
                    </transition-group>
                  </div>

                  <div class="pt-4 flex items-center justify-between border-t border-dashed border-slate-300/70">
                    <button type="button" @click="goToPreviousStep" class="px-5 py-2.5 rounded-full font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/70 transition">Paso Anterior</button>
                    <button type="button" @click="handleSubmit" :disabled="isSubmitting" class="px-7 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300/60 disabled:opacity-50 disabled:cursor-not-allowed transition">
                      <span v-if="!isSubmitting">Publicar Producto</span>
                      <span v-else>Publicando...</span>
                    </button>
                  </div>

                  <transition name="fade">
                    <div v-if="errorMessage" class="mt-4 px-4 py-3 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-center animate-shake" role="alert">{{ errorMessage }}</div>
                  </transition>
                </div>
              </transition>
            </section>

            <aside class="sticky top-24 hidden lg:block">
              <p class="mb-2 text-sm font-semibold text-slate-600">Previsualización en vivo</p>
              <article class="relative isolate flex flex-col bg-white rounded-xl shadow-lg group border border-gray-100">
                <div class="relative overflow-hidden rounded-t-xl">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-[1]"></div>
                  
                  <div v-if="imagePreviews.length > 0" class="relative">
                    <div class="w-full h-48 overflow-hidden">
                      <div class="flex transition-transform duration-300 ease-in-out" :style="{ transform: `translateX(-${currentPreviewIndex * 100}%)` }">
                        <div v-for="(photo, index) in previewProduct.photos" :key="index" class="w-full flex-shrink-0">
                          <img
                            :src="photo.url"
                            :alt="previewProduct.title"
                            class="w-full h-48 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <button v-if="imagePreviews.length > 1" @click="prevPreview" class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button v-if="imagePreviews.length > 1" @click="nextPreview" class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div v-if="imagePreviews.length > 1" class="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                      <button
                        v-for="(photo, index) in previewProduct.photos"
                        :key="`dot-${index}`"
                        @click="goToPreview(index)"
                        class="h-2 w-2 rounded-full"
                        :class="index === currentPreviewIndex ? 'bg-white' : 'bg-white/50'"
                      ></button>
                    </div>
                    </div>
                  <div v-else class="w-full h-48 bg-slate-100 grid place-items-center">
                    <svg class="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                </div>

                <div v-if="previewProduct.category_name !== 'Categoría'" class="absolute -top-3 right-3 z-10 bg-rose-600 text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg shadow-rose-600/30">
                  {{ previewProduct.category_name }}
                </div>

                <div class="flex flex-col flex-grow p-5">
                  <h3 class="text-lg font-bold text-gray-900 mb-1 truncate h-7">{{ previewProduct.title }}</h3>
                  
                  <p class="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow min-h-[40px]">{{ previewProduct.description }}</p>

                  <div class="flex items-center text-gray-500 text-sm mb-4 gap-3">
                    <div class="inline-flex items-center" v-if="previewProduct.condition !== 'Estado'">
                      <svg class="w-4 h-4 mr-1 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                      </svg>
                      <span class="truncate">{{ previewProduct.condition }}</span>
                    </div>
                  </div>

                  <div v-if="previewProduct.interests.length > 0" class="mt-2 pt-3 border-t border-gray-100">
                    <h4 class="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Busca a cambio:</h4>
                    <div class="flex flex-wrap gap-1.5">
                      <span v-for="interest in previewProduct.interests" :key="`prev-${interest}`" class="badge-sq">
                        {{ interest }}
                      </span>
                    </div>
                  </div>
                  <div class="flex justify-end items-center gap-2 pt-4 border-t border-gray-100 mt-auto">
                    <button type="button" disabled class="bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium transition">
                      Intercambiar
                    </button>
                    <button type="button" disabled class="bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium transition">
                      Comprar
                    </button>
                  </div>
                </div>
              </article>
            </aside>
            </div>
        </main>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Sidebar from './Sidebar.vue'
import axios from '@/axios'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const currentStep = ref(1)
const isSubmitting = ref(false)
const errorMessage = ref('')
const product = reactive({ name: '', category: '', condition: '', description: '', photos: [] })
const imagePreviews = ref([])
const step1Errors = reactive({ name: '', category: '', condition: '', description: '' })
const step2Errors = reactive({ photos: '' })
const fileInput = ref(null)
const userStore = useUserStore()
const router = useRouter()

const allCategories = ref([]);
const exchangeInterests = ref(new Set());

// Nuevas refs para el drag and drop
const draggedIndex = ref(null);
const dragOverIndex = ref(null);
const dragging = ref(false);

const availableCategories = computed(() => {
  return allCategories.value.filter(category => !exchangeInterests.value.has(category.name));
});

const fetchCategories = async () => {
    try {
        const response = await axios.get('/categories');
        allCategories.value = response.data;
    } catch (error) {
        console.error("Error al cargar las categorías:", error);
        errorMessage.value = 'No se pudieron cargar las categorías de intereses.';
    }
};

const toggleInterest = (interestName) => {
    if (exchangeInterests.value.has(interestName)) {
        exchangeInterests.value.delete(interestName);
    } else {
        exchangeInterests.value.add(interestName);
    }
};

const currentPreviewIndex = ref(0)

const nextPreview = () => {
  if (imagePreviews.value.length > 1) {
    currentPreviewIndex.value = (currentPreviewIndex.value + 1) % imagePreviews.value.length
  }
}

const prevPreview = () => {
  if (imagePreviews.value.length > 1) {
    currentPreviewIndex.value = (currentPreviewIndex.value - 1 + imagePreviews.value.length) % imagePreviews.value.length
  }
}

const goToPreview = (index) => {
  currentPreviewIndex.value = index;
};

watch(imagePreviews, () => {
  currentPreviewIndex.value = 0;
});

const previewProduct = computed(() => ({
  title: product.name.trim() || 'Nombre del producto',
  description: product.description.trim() || 'La descripción de tu producto aparecerá aquí. Intenta ser claro y conciso.',
  photos: imagePreviews.value.map(img => ({ url: img })),
  category_name: product.category || 'Categoría',
  condition: product.condition || 'Estado',
  interests: Array.from(exchangeInterests.value)
}))

const validateStep1 = () => {
  let ok = true
  Object.keys(step1Errors).forEach(k => (step1Errors[k] = ''))
  if (!product.name.trim()) { step1Errors.name = 'El nombre es obligatorio.'; ok = false }
  if (!product.category) { step1Errors.category = 'Selecciona una categoría.'; ok = false }
  if (!product.condition) { step1Errors.condition = 'Selecciona el estado.'; ok = false }
  if (!product.description.trim()) { step1Errors.description = 'La descripción es obligatoria.'; ok = false }
  return ok
}

const validateStep2 = () => { if (product.photos.length === 0) { step2Errors.photos = 'Sube al menos una foto.'; return false } step2Errors.photos=''; return true }

const goToStepIfValid = (to) => { if (to===2 && validateStep1()) currentStep.value = 2 }
const goToNextStep = () => { if (validateStep1()) currentStep.value = 2 }
const goToPreviousStep = () => { currentStep.value = 1 }
const triggerFileInput = () => { fileInput.value?.click() }
const handleFileChange = (e) => { processFiles(e.target.files) }
const handleDragOver = (e) => { e.currentTarget.classList.add('border-rose-500','bg-rose-50') }
const handleDragLeave = (e) => { e.currentTarget.classList.remove('border-rose-500','bg-rose-50') }
const handleDrop = (e) => { e.currentTarget.classList.remove('border-rose-500','bg-rose-50'); processFiles(e.dataTransfer.files) }

const processFiles = (files) => {
  errorMessage.value = ''
  if (product.photos.length + files.length > 4) { errorMessage.value = 'Máximo 4 imágenes.'; return }
  for (const file of files) {
    if (file.type.startsWith('image/') && product.photos.length < 4) {
      product.photos.push(file)
      const reader = new FileReader()
      reader.onload = (ev) => imagePreviews.value.push(ev.target.result)
      reader.readAsDataURL(file)
    }
  }
}

const removeImage = (i) => { product.photos.splice(i,1); imagePreviews.value.splice(i,1) }

// Funciones para el Drag and Drop
const onDragStart = (index) => {
  draggedIndex.value = index;
  dragging.value = true;
};

const onDragOver = (event, index) => {
  dragOverIndex.value = index;
};

const onDragLeave = () => {
  dragOverIndex.value = null;
};

const onDrop = (toIndex) => {
  if (draggedIndex.value === null || draggedIndex.value === toIndex) {
    // No hacer nada si se suelta en el mismo lugar
  } else {
    const fromIndex = draggedIndex.value;
    
    // Reordenar el array de previsualizaciones
    const previewItem = imagePreviews.value.splice(fromIndex, 1)[0];
    imagePreviews.value.splice(toIndex, 0, previewItem);
    
    // Reordenar el array de archivos
    const photoItem = product.photos.splice(fromIndex, 1)[0];
    product.photos.splice(toIndex, 0, photoItem);
  }

  // Limpiar estado
  dragging.value = false;
  draggedIndex.value = null;
  dragOverIndex.value = null;
};

const submitNow = async () => {
  errorMessage.value = ''
  if (!validateStep2()) { errorMessage.value = 'Por favor, sube al menos una imagen.'; return }
  if (!userStore.isLoggedIn) { errorMessage.value = 'Debes iniciar sesión para publicar.'; router.push('/login'); return }
  isSubmitting.value = true
  try {
    const formData = new FormData()
    formData.append('title', product.name)
    formData.append('category_name', product.category)
    formData.append('condition', product.condition)
    formData.append('description', product.description)
    
    const selectedInterestIds = Array.from(exchangeInterests.value)
      .map(interestName => {
        const category = allCategories.value.find(cat => cat.name === interestName);
        return category ? category.id : null;
      })
      .filter(id => id !== null);

    if (selectedInterestIds.length > 0) {
      formData.append('exchange_interest_ids', selectedInterestIds.join(','));
    }

    product.photos.forEach(p => formData.append('photos', p))
    const response = await axios.post('/products', formData)
    if (response.status === 201) { alert('¡Producto publicado con éxito!'); router.push('/my-products') }
    else { errorMessage.value = response.data.detail || 'Error al publicar.' }
  } catch (error) {
    if (error.response) { console.error('Error del servidor:', error.response.data); errorMessage.value = error.response.data.detail || 'Error al publicar.'; if (error.response.status === 401) router.push('/login') }
    else if (error.request) { console.error('No se recibió respuesta:', error.request); errorMessage.value = 'No se pudo conectar al servidor. Inténtalo más tarde.' }
    else { console.error('Error:', error.message); errorMessage.value = `Error inesperado: ${error.message}.` }
  } finally { isSubmitting.value = false }
}

const handleSubmit = submitNow

const keydown = (e) => { if ((e.ctrlKey||e.metaKey) && e.key==='Enter' && currentStep.value===2) submitNow(); if (e.key==='Escape' && currentStep.value===2) goToPreviousStep() }

onMounted(()=> {
  window.addEventListener('keydown',keydown);
  fetchCategories();
})
onBeforeUnmount(()=>window.removeEventListener('keydown',keydown))
</script>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.3s ease-out }
.slide-fade-enter-from, .slide-fade-leave-to { transform: translateX(20px); opacity: 0 }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }

/* Animación para la lista de imágenes */
.list-move {
  transition: transform 0.3s ease;
}

@keyframes shake { 10%, 90% { transform: translateX(-1px) } 20%, 80% { transform: translateX(2px) } 30%, 50%, 70% { transform: translateX(-4px) } 40%, 60% { transform: translateX(4px) } }
.animate-shake { animation: shake 0.4s ease }

select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.25rem center;
  background-repeat: no-repeat;
  background-size: 0.8em 0.8em;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.badge-sq{
  display:inline-flex; align-items:center; gap:.35rem;
  padding:.28rem .5rem; font-size:.75rem; font-weight:700; line-height:1;
  border:1px solid #E2E8F0; color:#0f172a; background:#fff; border-radius:4px; box-shadow:0 1px 0 rgba(2,6,23,.05);
}
.dark .badge-sq{ border-color:#334155; color:#e2e8f0; background:#0b1220; box-shadow:0 1px 0 rgba(0,0,0,.3); }
.badge-sq--active{ background:#0f172a; color:#fff; border-color:#0f172a; }
.dark .badge-sq--active{ background:#e2e8f0; color:#0f172a; border-color:#e2e8f0; }
.badge-remove{ display:inline-grid; place-items:center; width:18px; height:18px; border-radius:3px; background:rgba(255,255,255,.14); border:1px solid rgba(148,163,184,.35); }
.dark .badge-remove{ background:rgba(15,23,42,.4); border-color:#475569; }

.tile-list{ display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:.55rem; }
.tile{
  display:flex; align-items:center; gap:.6rem; padding:.65rem .7rem; border:1px solid #E2E8F0; background:#fff; color:#0f172a;
  border-radius:6px; text-align:left; transition: border-color .18s ease, box-shadow .18s ease, transform .06s ease;
}
.tile:hover{ border-color:#94A3B8; box-shadow:0 4px 16px -10px rgba(2,6,23,.25); transform:translateY(-1px); }
.dark .tile{ border-color:#334155; background:#0b1220; color:#e2e8f0; }
.dark .tile:hover{ border-color:#475569; box-shadow:0 6px 20px -12px rgba(0,0,0,.5); }
.tile.is-selected{ border-color:#0f172a; box-shadow: inset 0 0 0 1px #0f172a, 0 2px 10px -6px rgba(2,6,23,.25); }
.dark .tile.is-selected{ border-color:#e2e8f0; box-shadow: inset 0 0 0 1px #e2e8f0, 0 2px 10px -6px rgba(0,0,0,.6); }
.tile-check{ width:18px; height:18px; border-radius:3px; display:inline-grid; place-items:center; border:1px solid #CBD5E1; background:#F8FAFC; }
.dark .tile-check{ border-color:#475569; background:#0f172a; }

@media (prefers-reduced-motion: reduce) {
  .slide-fade-enter-active, .slide-fade-leave-active, .fade-enter-active, .fade-leave-active { transition: none }
  .animate-shake { animation: none }
}
</style>