<template>
  <div class="min-h-screen font-sans antialiased bg-[linear-gradient(180deg,#fafafa,60%,#fff)] text-slate-800">
    <Header />

    <div class="flex">
      <Sidebar />

      <div class="flex-1 overflow-y-auto">
        <main class="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <section class="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-xl px-6 sm:px-10 py-10">
            <div class="pointer-events-none absolute -top-24 -left-10 h-56 w-56 rounded-full bg-rose-300/10 blur-3xl"></div>
            <h1 class="relative z-10 text-3xl sm:text-[2.3rem] leading-tight font-extrabold tracking-tight text-slate-900">
              Publica tu Producto
            </h1>
            <p class="relative z-10 mt-3 max-w-2xl text-[15px] sm:text-base text-slate-600">
              Completa los detalles de tu producto y ponlo en circulación para un nuevo trueque.
            </p>
          </section>

          <section class="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 mt-6 border-y border-slate-200/70 bg-white/70 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3">
            <div class="max-w-5xl mx-auto">
              <div class="flex items-center gap-4 text-sm">
                <div class="flex items-center gap-2">
                  <span
                    class="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 font-semibold"
                    :class="currentStep === 1 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'"
                  >1</span>
                  <span :class="currentStep === 1 ? 'text-slate-900 font-medium' : 'text-slate-500'">Detalles</span>
                </div>
                <div class="h-px flex-1 bg-slate-200/80"></div>
                <div class="flex items-center gap-2">
                  <span
                    class="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 font-semibold"
                    :class="currentStep === 2 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'"
                  >2</span>
                  <span :class="currentStep === 2 ? 'text-slate-900 font-medium' : 'text-slate-500'">Fotos</span>
                </div>
              </div>
              <div class="mt-3 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-rose-500 to-rose-400 transition-all duration-500 ease-out"
                  :style="{ width: currentStep === 1 ? '50%' : '100%' }"
                ></div>
              </div>
            </div>
          </section>

          <form @submit.prevent="handleSubmit" class="mt-8">
            <transition name="slide-fade" mode="out-in">
              <div v-if="currentStep === 1" key="step1" class="space-y-10">
                <header class="flex items-center gap-3">
                  <span class="grid h-8 w-8 place-items-center rounded-md bg-slate-100 text-slate-700">
                    <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M4 5a2 2 0 012-2h8a2 2 0 012 2v1H4V5zm0 3h12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"/></svg>
                  </span>
                  <h2 class="text-lg font-semibold text-slate-900">Detalles del producto</h2>
                </header>
                <section class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="name" class="block text-sm font-medium text-slate-700">Nombre del Producto <span class="text-rose-600">*</span></label>
                      <input id="name" type="text" v-model="product.name" placeholder="Ej. Consola, Bicicleta de montaña…" class="mt-2 w-full px-3.5 py-2.5 rounded-lg border border-slate-300/80 bg-white focus:outline-none focus:ring-4 focus:ring-rose-200 focus:border-rose-400" :class="{'border-rose-400': step1Errors.name}" />
                      <p v-if="step1Errors.name" class="text-rose-600 text-xs mt-1">{{ step1Errors.name }}</p>
                    </div>
                    <div>
                      <label for="category" class="block text-sm font-medium text-slate-700">Categoría <span class="text-rose-600">*</span></label>
                      <div class="relative mt-2">
                        <select id="category" v-model="product.category" class="block w-full px-3.5 py-2.5 rounded-lg border border-slate-300/80 bg-white pr-10 focus:outline-none focus:ring-4 focus:ring-rose-200 focus:border-rose-400 appearance-none" :class="{'border-rose-400': step1Errors.category}">
                          <option value="" disabled>Selecciona una categoría</option>
                          <option>Electrónica</option>
                          <option>Mobiliario</option>
                          <option>Deportes</option>
                          <option>Libros</option>
                          <option>Ropa y Accesorios</option>
                          <option>Hogar</option>
                          <option>Juguetes</option>
                          <option>Herramientas</option>
                          <option>Música</option>
                          <option>Videojuegos</option>
                          <option>Coleccionables</option>
                          <option>Arte</option>
                          <option>Otros</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500"><svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M6 8l4 4 4-4H6z"/></svg></div>
                      </div>
                      <p v-if="step1Errors.category" class="text-rose-600 text-xs mt-1">{{ step1Errors.category }}</p>
                    </div>
                    <div>
                      <label for="condition" class="block text-sm font-medium text-slate-700">Estado del Producto <span class="text-rose-600">*</span></label>
                      <div class="relative mt-2">
                        <select id="condition" v-model="product.condition" class="block w-full px-3.5 py-2.5 rounded-lg border border-slate-300/80 bg-white pr-10 focus:outline-none focus:ring-4 focus:ring-rose-200 focus:border-rose-400 appearance-none" :class="{'border-rose-400': step1Errors.condition}">
                          <option value="" disabled>Selecciona el estado</option>
                          <option>Nuevo</option>
                          <option>Como Nuevo</option>
                          <option>Usado - Buen Estado</option>
                          <option>Usado - Aceptable</option>
                          <option>Para Piezas/Reparar</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500"><svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M6 8l4 4 4-4H6z"/></svg></div>
                      </div>
                      <p v-if="step1Errors.condition" class="text-rose-600 text-xs mt-1">{{ step1Errors.condition }}</p>
                    </div>
                    <div class="md:col-span-2">
                      <label for="description" class="block text-sm font-medium text-slate-700">Descripción <span class="text-rose-600">*</span></label>
                      <textarea id="description" v-model="product.description" rows="4" maxlength="500" placeholder="Incluye estado, características y detalles clave (máx. 500)." class="mt-2 w-full px-3.5 py-2.5 rounded-lg border border-slate-300/80 bg-white focus:outline-none focus:ring-4 focus:ring-rose-200 focus:border-rose-400 resize-y" :class="{'border-rose-400': step1Errors.description}"></textarea>
                      <p v-if="step1Errors.description" class="text-rose-600 text-xs mt-1">{{ step1Errors.description }}</p>
                      <p class="text-[11px] text-slate-500 text-right mt-1">{{ product.description.length }}/500</p>
                    </div>
                  </div>
                </section>
                <div class="pt-4 flex justify-end border-t border-dashed border-slate-200/80">
                  <button type="button" @click="goToNextStep" class="inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 text-white font-semibold hover:bg-rose-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300/60 transition-transform hover:-translate-y-0.5">Siguiente Paso</button>
                </div>
              </div>

              <div v-else-if="currentStep === 2" key="step2" class="space-y-10">
                <header class="flex items-center gap-3">
                  <span class="grid h-8 w-8 place-items-center rounded-md bg-slate-100 text-slate-700"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 3l3 4 2-3 4 6H7l3-7z"/></svg></span>
                  <h2 class="text-lg font-semibold text-slate-900">Fotos del producto</h2>
                </header>
                <div class="rounded-xl border-2 border-dashed border-slate-300 px-6 py-6 text-center cursor-pointer hover:border-rose-400/80 transition" :class="{'border-rose-500': step2Errors.photos}" @click="triggerFileInput" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop">
                  <input type="file" ref="fileInput" @change="handleFileChange" multiple accept="image/*" class="hidden" />
                  <svg class="mx-auto h-10 w-10 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4l5.172 5.172a4 4 0 005.656 0L40 32M28 8a4 4 0 100 8 4 4 0 000-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <p class="mt-2 text-sm text-slate-600">Arrastra y suelta imágenes aquí, o haz clic para seleccionar</p>
                  <p class="text-xs text-slate-500">(Máximo 4 imágenes, JPG/PNG)</p>
                </div>
                <p v-if="step2Errors.photos" class="text-rose-600 text-xs mt-1">{{ step2Errors.photos }}</p>
                <div v-if="imagePreviews.length" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div v-for="(image, index) in imagePreviews" :key="index" class="relative group rounded-xl overflow-hidden ring-1 ring-slate-200/70 bg-white">
                    <img :src="image" :alt="`Preview ${index + 1}`" class="w-full h-32 object-cover" />
                    <button @click="removeImage(index)" class="absolute top-1 right-1 rounded-full bg-rose-600 text-white p-1 opacity-0 group-hover:opacity-100 transition"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </div>
                </div>
                <div class="pt-4 flex items-center justify-between border-t border-dashed border-slate-200/80">
                  <button type="button" @click="goToPreviousStep" class="px-5 py-2.5 rounded-full font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/70 transition">Paso Anterior</button>
                  <button type="submit" :disabled="isSubmitting" class="px-7 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300/60 disabled:opacity-50 disabled:cursor-not-allowed transition">
                    <span v-if="!isSubmitting">Publicar Producto</span>
                    <span v-else>Publicando...</span>
                  </button>
                </div>
                <transition name="fade">
                  <div v-if="errorMessage" class="mt-6 px-4 py-3 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-center" role="alert">{{ errorMessage }}</div>
                </transition>
              </div>
            </transition>
          </form>
        </main>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import Sidebar from './Sidebar.vue';
import axios from '@/axios'; // ✨ ¡CORRECCIÓN #1: USA LA INSTANCIA DE AXIOS CONFIGURADA!
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const currentStep = ref(1);
const isSubmitting = ref(false);
const errorMessage = ref('');
const product = reactive({ name: '', category: '', condition: '', description: '', photos: [] });
const imagePreviews = ref([]);
const step1Errors = reactive({ name: '', category: '', condition: '', description: '' });
const step2Errors = reactive({ photos: '' });
const fileInput = ref(null);
const userStore = useUserStore();
const router = useRouter();

const validateStep1 = () => {
  let isValid = true;
  Object.keys(step1Errors).forEach(key => step1Errors[key] = '');
  if (!product.name.trim()) { step1Errors.name = 'El nombre es obligatorio.'; isValid = false; }
  if (!product.category) { step1Errors.category = 'Selecciona una categoría.'; isValid = false; }
  if (!product.condition) { step1Errors.condition = 'Selecciona el estado.'; isValid = false; }
  if (!product.description.trim()) { step1Errors.description = 'La descripción es obligatoria.'; isValid = false; }
  return isValid;
};

const validateStep2 = () => {
  if (product.photos.length === 0) {
    step2Errors.photos = 'Sube al menos una foto.';
    return false;
  }
  step2Errors.photos = '';
  return true;
};

const goToNextStep = () => { if (validateStep1()) currentStep.value = 2; };
const goToPreviousStep = () => { currentStep.value = 1; };
const triggerFileInput = () => { fileInput.value.click(); };
const handleFileChange = (event) => { processFiles(event.target.files); };
const handleDragOver = (event) => { event.target.classList.add('border-rose-500', 'bg-rose-50'); };
const handleDragLeave = (event) => { event.target.classList.remove('border-rose-500', 'bg-rose-50'); };
const handleDrop = (event) => {
  event.target.classList.remove('border-rose-500', 'bg-rose-50');
  processFiles(event.dataTransfer.files);
};

const processFiles = (files) => {
  errorMessage.value = '';
  if (product.photos.length + files.length > 4) {
    errorMessage.value = 'Máximo 4 imágenes.';
    return;
  }
  for (const file of files) {
    if (file.type.startsWith('image/') && product.photos.length < 4) {
      product.photos.push(file);
      const reader = new FileReader();
      reader.onload = (e) => imagePreviews.value.push(e.target.result);
      reader.readAsDataURL(file);
    }
  }
};

const removeImage = (index) => {
  product.photos.splice(index, 1);
  imagePreviews.value.splice(index, 1);
};

const handleSubmit = async () => {
    errorMessage.value = '';
    if (!validateStep2()) {
        errorMessage.value = 'Por favor, sube al menos una imagen.';
        return;
    }

    if (!userStore.isLoggedIn) {
        errorMessage.value = 'Debes iniciar sesión para publicar.';
        router.push('/login');
        return;
    }

    isSubmitting.value = true;
    
    try {
        const formData = new FormData();
        formData.append('title', product.name);
        formData.append('category_name', product.category);
        formData.append('condition', product.condition);
        formData.append('description', product.description);
        product.photos.forEach(photo => formData.append('photos', photo));

        // ✨ ¡CORRECCIÓN #2: USA LA RUTA RELATIVA PARA QUE EL PROXY FUNCIONE!
        const response = await axios.post('/products', formData);

        if (response.status === 201) {
            alert('¡Producto publicado con éxito!');
            router.push('/my-products');
        } else {
            errorMessage.value = response.data.detail || 'Error al publicar.';
        }

    } catch (error) {
        if (error.response) {
            console.error('Error del servidor:', error.response.data);
            errorMessage.value = error.response.data.detail || 'Error al publicar.';
            if (error.response.status === 401) {
                router.push('/login');
            }
        } else if (error.request) {
            console.error('No se recibió respuesta:', error.request);
            errorMessage.value = 'No se pudo conectar al servidor. Inténtalo más tarde.';
        } else {
            console.error('Error:', error.message);
            errorMessage.value = `Error inesperado: ${error.message}.`;
        }
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.3s ease-out; }
.slide-fade-enter-from, .slide-fade-leave-to { transform: translateX(20px); opacity: 0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 0.8em 0.8em;
}
</style>