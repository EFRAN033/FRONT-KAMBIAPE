<template>
  <div class="min-h-screen font-sans antialiased bg-[linear-gradient(180deg,#fafafa,60%,#fff)] text-slate-800">
    <Header />

    <div class="flex">
      <Sidebar />

      <div class="flex-1 overflow-y-auto">
        <main class="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- HERO — editorial, sobrio; rosa solo como acento -->
          <section class="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-xl px-6 sm:px-10 py-10">
            <div class="pointer-events-none absolute -top-24 -left-10 h-56 w-56 rounded-full bg-rose-300/10 blur-3xl"></div>
            <h1 class="relative z-10 text-3xl sm:text-[2.3rem] leading-tight font-extrabold tracking-tight text-slate-900">
              Publica tu Producto
            </h1>
            <p class="relative z-10 mt-3 max-w-2xl text-[15px] sm:text-base text-slate-600">
              Completa los detalles de tu producto y ponlo en circulación para un nuevo trueque.
            </p>
          </section>

          <!-- PROGRESO — sticky, minimal (rosa solo en progreso) -->
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

          <!-- FORM — sin tarjetas, con secciones claras -->
          <form @submit.prevent="handleSubmit" class="mt-8">
            <transition name="slide-fade" mode="out-in">
              <!-- PASO 1 -->
              <div v-if="currentStep === 1" key="step1" class="space-y-10">
                <!-- Encabezado de sección -->
                <header class="flex items-center gap-3">
                  <span class="grid h-8 w-8 place-items-center rounded-md bg-slate-100 text-slate-700">
                    <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M4 5a2 2 0 012-2h8a2 2 0 012 2v1H4V5zm0 3h12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"/></svg>
                  </span>
                  <h2 class="text-lg font-semibold text-slate-900">Detalles del producto</h2>
                </header>

                <!-- Campos -->
                <section class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Nombre -->
                    <div>
                      <label for="name" class="block text-sm font-medium text-slate-700">Nombre del Producto <span class="text-rose-600">*</span></label>
                      <input
                        id="name"
                        type="text"
                        v-model="product.name"
                        placeholder="Ej. Consola, Bicicleta de montaña…"
                        class="mt-2 w-full px-3.5 py-2.5 rounded-lg border border-slate-300/80 bg-white focus:outline-none focus:ring-4 focus:ring-rose-200 focus:border-rose-400 text-slate-900 placeholder-slate-400 transition"
                        :class="{'border-rose-400': step1Errors.name}"
                        aria-required="true"
                        aria-describedby="name-error"
                      />
                      <p v-if="step1Errors.name" id="name-error" class="text-rose-600 text-xs mt-1">{{ step1Errors.name }}</p>
                    </div>

                    <!-- Categoría -->
                    <div>
                      <label for="category" class="block text-sm font-medium text-slate-700">Categoría <span class="text-rose-600">*</span></label>
                      <div class="relative mt-2">
                        <select
                          id="category"
                          v-model="product.category"
                          class="block w-full px-3.5 py-2.5 rounded-lg border border-slate-300/80 bg-white pr-10 focus:outline-none focus:ring-4 focus:ring-rose-200 focus:border-rose-400 text-slate-900 transition appearance-none"
                          :class="{'border-rose-400': step1Errors.category}"
                          aria-required="true"
                          aria-describedby="category-error"
                        >
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
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                          <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M6 8l4 4 4-4H6z"/></svg>
                        </div>
                      </div>
                      <p v-if="step1Errors.category" id="category-error" class="text-rose-600 text-xs mt-1">{{ step1Errors.category }}</p>
                    </div>

                    <!-- Estado -->
                    <div>
                      <label for="condition" class="block text-sm font-medium text-slate-700">Estado del Producto <span class="text-rose-600">*</span></label>
                      <div class="relative mt-2">
                        <select
                          id="condition"
                          v-model="product.condition"
                          class="block w-full px-3.5 py-2.5 rounded-lg border border-slate-300/80 bg-white pr-10 focus:outline-none focus:ring-4 focus:ring-rose-200 focus:border-rose-400 text-slate-900 transition appearance-none"
                          :class="{'border-rose-400': step1Errors.condition}"
                          aria-required="true"
                          aria-describedby="condition-error"
                        >
                          <option value="" disabled>Selecciona el estado</option>
                          <option>Nuevo</option>
                          <option>Como Nuevo</option>
                          <option>Usado - Buen Estado</option>
                          <option>Usado - Aceptable</option>
                          <option>Para Piezas/Reparar</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                          <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M6 8l4 4 4-4H6z"/></svg>
                        </div>
                      </div>
                      <p v-if="step1Errors.condition" id="condition-error" class="text-rose-600 text-xs mt-1">{{ step1Errors.condition }}</p>
                    </div>

                    <!-- Descripción -->
                    <div class="md:col-span-2">
                      <label for="description" class="block text-sm font-medium text-slate-700">Descripción <span class="text-rose-600">*</span></label>
                      <textarea
                        id="description"
                        v-model="product.description"
                        rows="4"
                        maxlength="500"
                        placeholder="Incluye estado, características y detalles clave (máx. 500)."
                        class="mt-2 w-full px-3.5 py-2.5 rounded-lg border border-slate-300/80 bg-white focus:outline-none focus:ring-4 focus:ring-rose-200 focus:border-rose-400 text-slate-900 placeholder-slate-400 transition resize-y"
                        :class="{'border-rose-400': step1Errors.description}"
                        aria-required="true"
                        aria-describedby="description-error"
                      ></textarea>
                      <p v-if="step1Errors.description" id="description-error" class="text-rose-600 text-xs mt-1">{{ step1Errors.description }}</p>
                      <p class="text-[11px] text-slate-500 text-right mt-1">{{ product.description.length }}/500</p>
                    </div>
                  </div>
                </section>

                <!-- CTA siguiente -->
                <div class="pt-4 flex justify-end border-t border-dashed border-slate-200/80">
                  <button
                    type="button"
                    @click="goToNextStep"
                    class="inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 text-white font-semibold
                           hover:bg-rose-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300/60 focus-visible:ring-offset-2
                           transition-transform hover:-translate-y-0.5"
                  >
                    Siguiente Paso
                  </button>
                </div>
              </div>

              <!-- PASO 2 -->
              <div v-else-if="currentStep === 2" key="step2" class="space-y-10">
                <header class="flex items-center gap-3">
                  <span class="grid h-8 w-8 place-items-center rounded-md bg-slate-100 text-slate-700">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 3l3 4 2-3 4 6H7l3-7z"/></svg>
                  </span>
                  <h2 class="text-lg font-semibold text-slate-900">Fotos del producto</h2>
                </header>

                <!-- Dropzone minimal -->
                <div
                  class="rounded-xl border-2 border-dashed border-slate-300 px-6 py-6 text-center cursor-pointer
                         hover:border-rose-400/80 transition"
                  :class="{'border-rose-500': step2Errors.photos}"
                  @click="triggerFileInput"
                  @dragover.prevent="handleDragOver"
                  @dragleave.prevent="handleDragLeave"
                  @drop.prevent="handleDrop"
                  role="button"
                  tabindex="0"
                  aria-describedby="photos-error"
                >
                  <input type="file" id="photos" ref="fileInput" @change="handleFileChange" multiple accept="image/*" class="hidden" aria-hidden="true" />
                  <svg class="mx-auto h-10 w-10 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4l5.172 5.172a4 4 0 005.656 0L40 32M28 8a4 4 0 100 8 4 4 0 000-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p class="mt-2 text-sm text-slate-600">Arrastra y suelta imágenes aquí, o haz clic para seleccionar</p>
                  <p class="text-xs text-slate-500">(Máximo 4 imágenes, JPG/PNG)</p>
                </div>
                <p v-if="step2Errors.photos" id="photos-error" class="text-rose-600 text-xs mt-1">{{ step2Errors.photos }}</p>

                <!-- Previews (sin tarjeta; anillo sutil) -->
                <div v-if="imagePreviews.length" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div v-for="(image, index) in imagePreviews" :key="index" class="relative group rounded-xl overflow-hidden ring-1 ring-slate-200/70 bg-white">
                    <img :src="image" :alt="`Preview ${index + 1}`" class="w-full h-32 object-cover" />
                    <button
                      @click="removeImage(index)"
                      class="absolute top-1 right-1 rounded-full bg-rose-600 text-white p-1 opacity-0 group-hover:opacity-100 transition"
                      aria-label="Eliminar imagen"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- CTAs -->
                <div class="pt-4 flex items-center justify-between border-t border-dashed border-slate-200/80">
                  <button
                    type="button"
                    @click="goToPreviousStep"
                    class="px-5 py-2.5 rounded-full font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200
                           focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/70 focus-visible:ring-offset-2 transition"
                  >
                    Paso Anterior
                  </button>

                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="px-7 py-2.5 rounded-full font-semibold text-white
                           bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600
                           focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300/60 focus-visible:ring-offset-2
                           disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <span v-if="!isSubmitting">Publicar Producto</span>
                    <span v-else>Publicando...</span>
                  </button>
                </div>

                <transition name="fade">
                  <div v-if="errorMessage" class="mt-6 px-4 py-3 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-center" role="alert">
                    {{ errorMessage }}
                  </div>
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
import axios from 'axios'; // <--- ¡IMPORTA AXIOS!
import { useUserStore } from '@/stores/user'; // <--- ¡IMPORTA TU STORE DE USUARIO!
import { useRouter } from 'vue-router'; // <--- IMPORTA EL ROUTER SI QUIERES REDIRIGIR

const currentStep = ref(1);
const isSubmitting = ref(false);
const errorMessage = ref('');

const product = reactive({
  name: '',
  category: '',
  condition: '',
  description: '',
  photos: [],
});

const imagePreviews = ref([]);

const step1Errors = reactive({
  name: '',
  category: '',
  condition: '',
  description: '',
});

const step2Errors = reactive({
  photos: '',
});

const fileInput = ref(null);
const userStore = useUserStore(); // <--- INICIALIZA EL STORE
const router = useRouter(); // <--- INICIALIZA EL ROUTER

const validateStep1 = () => {
  let isValid = true;
  Object.keys(step1Errors).forEach(key => step1Errors[key] = '');

  if (!product.name.trim()) {
    step1Errors.name = 'El nombre del producto es obligatorio.';
    isValid = false;
  }
  if (!product.category) {
    step1Errors.category = 'Selecciona una categoría.';
    isValid = false;
  }
  if (!product.condition) {
    step1Errors.condition = 'Selecciona el estado del producto.';
    isValid = false;
  }
  if (!product.description.trim()) {
    step1Errors.description = 'La descripción es obligatoria.';
    isValid = false;
  } else if (product.description.length > 500) {
    step1Errors.description = 'La descripción no debe exceder los 500 caracteres.';
    isValid = false;
  }
  return isValid;
};

const validateStep2 = () => {
  let isValid = true;
  Object.keys(step2Errors).forEach(key => step2Errors[key] = '');

  if (product.photos.length === 0) {
    step2Errors.photos = 'Sube al menos una foto de tu producto.';
    isValid = false;
  }
  return isValid;
};

const goToNextStep = () => {
  if (validateStep1()) {
    currentStep.value = 2;
    errorMessage.value = '';
  } else {
    errorMessage.value = 'Por favor, corrige los errores en los detalles básicos.';
  }
};

const goToPreviousStep = () => {
  currentStep.value = 1;
  errorMessage.value = '';
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const files = event.target.files;
  processFiles(files);
};

const handleDragOver = (event) => {
  event.target.classList.add('border-rose-500', 'bg-rose-50');
};

const handleDragLeave = (event) => {
  event.target.classList.remove('border-rose-500', 'bg-rose-50');
};

const handleDrop = (event) => {
  event.target.classList.remove('border-rose-500', 'bg-rose-50');
  const files = event.dataTransfer.files;
  processFiles(files);
};

const processFiles = (files) => {
  errorMessage.value = '';
  if (product.photos.length + files.length > 4) {
    errorMessage.value = 'Solo puedes subir un máximo de 4 imágenes.';
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type.startsWith('image/') && product.photos.length < 4) {
      product.photos.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    } else if (!file.type.startsWith('image/')) {
        errorMessage.value = 'Solo se permiten archivos de imagen.';
    }
  }
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const removeImage = (index) => {
  product.photos.splice(index, 1);
  imagePreviews.value.splice(index, 1);
  if (product.photos.length === 0 && step2Errors.photos) {
    step2Errors.photos = 'Sube al menos una foto de tu producto.';
  }
};

const handleSubmit = async () => {
    errorMessage.value = '';
    if (!validateStep2()) {
        errorMessage.value = 'Por favor, sube al menos una imagen.';
        return;
    }

    // Opcional: Si el usuario no está logueado, redirigirlo o mostrar un error
    if (!userStore.isLoggedIn) {
        errorMessage.value = 'Debes iniciar sesión para publicar un producto.';
        router.push('/login'); // Redirige al login si no está autenticado
        return;
    }

    isSubmitting.value = true;
    
    try {
        const formData = new FormData();

        formData.append('title', product.name); 
        formData.append('category_name', product.category); 
        formData.append('condition', product.condition);
        formData.append('description', product.description);

        product.photos.forEach((photo) => {
            formData.append(`photos`, photo);
        });

        const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';
        const API_URL = `${API_BASE_URL}/products`;

        // --- CAMBIO CLAVE AQUÍ: USAR AXIOS EN LUGAR DE fetch ---
        const response = await axios.post(API_URL, formData, {
            headers: {
                // Axios configurado en user.js ya añade 'Authorization',
                // pero Content-Type para FormData no es necesario establecerlo manualmente,
                // Axios lo hace automáticamente con 'multipart/form-data'.
            },
        });
        // --- FIN CAMBIO CLAVE ---

        if (response.status === 200 || response.status === 201) { // Axios devuelve la respuesta directamente, no el Response object
            console.log('Producto publicado con éxito:', response.data);
            alert('¡Producto publicado con éxito!');

            // Limpia el formulario
            Object.assign(product, {
                name: '',
                category: '',
                condition: '',
                description: '',
                photos: [],
            });
            imagePreviews.value = [];
            Object.keys(step1Errors).forEach(key => step1Errors[key] = '');
            Object.keys(step2Errors).forEach(key => step2Errors[key] = '');
            currentStep.value = 1;
            router.push('/my-products'); // Opcional: Redirige a la página de tus productos

        } else {
            // Axios maneja los errores con el catch, pero si llegamos aquí, el status es 2xx pero inesperado
            errorMessage.value = response.data.detail || 'Error desconocido al publicar el producto.';
            console.error('Error al publicar producto (status inesperado):', response.data);
        }

    } catch (error) {
        // Axios lanza un error para respuestas 4xx/5xx
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error('Error de respuesta del servidor:', error.response.data);
            errorMessage.value = error.response.data.detail || 'Error al publicar el producto. Por favor, verifica tu información.';
            if (error.response.status === 401) {
                errorMessage.value = 'Tu sesión ha expirado o no has iniciado sesión. Por favor, vuelve a iniciar sesión.';
                userStore.clearUser(); // Limpia el estado de usuario
                router.push('/login'); // Redirige al login
            }
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta (ej. red caída)
            console.error('No se recibió respuesta del servidor:', error.request);
            errorMessage.value = 'No se pudo conectar al servidor. Por favor, revisa tu conexión a internet o el estado del servidor.';
        } else {
            // Algo más causó el error
            console.error('Error inesperado al configurar la solicitud:', error.message);
            errorMessage.value = `Error inesperado: ${error.message}.`;
        }
    } finally {
        isSubmitting.value = false; 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
</script>

<style scoped>
/* Transiciones Vue - se mantienen porque son específicas de Vue */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilo personalizado para el select - mantenido para el icono SVG */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 0.8em 0.8em;
  padding-right: 2.5rem;
}

/* Animaciones de keyframes */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
  animation-delay: 0.3s;
}
</style>