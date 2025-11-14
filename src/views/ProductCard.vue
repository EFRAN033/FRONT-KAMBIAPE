<template>
  <div v-if="product" class="relative flex flex-col bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-2xl shadow-xl h-full max-w-5xl mx-auto">
    <button @click="$emit('close')" class="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm hover:scale-110 transition-transform" aria-label="Cerrar">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      
      <div class="md:col-span-1 relative"> 
        <div class="relative rounded-lg overflow-hidden shadow-lg aspect-square bg-white sm:bg-gray-100 dark:bg-gray-800 sm:dark:bg-gray-700">
          
          <div 
            ref="imageContainer"
            class="w-full h-full relative cursor-pointer md:cursor-crosshair"
            @mousemove="handleMouseMove"
            @mouseenter="showZoom"
            @mouseleave="hideZoom"
            @click="handleImageClick"
          >
            <transition name="fade-img" mode="out-in">
              <img 
                :key="currentImage" 
                :src="currentImage" 
                :alt="product.title" 
                class="w-full h-full object-cover" 
                loading="lazy" 
              />
            </transition>

            <div 
              v-show="isZoomVisible" 
              class="absolute hidden md:block pointer-events-none"
              :style="lensStyle"
            ></div>
          </div>
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

          <template v-if="images.length > 1">
            <button @click.stop="prevImage" class="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all focus:outline-none" aria-label="Imagen anterior">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button @click.stop="nextImage" class="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all focus:outline-none" aria-label="Siguiente imagen">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </template>
          
          <div v-if="images.length > 1" class="absolute bottom-4 left-0 right-0 z-10 flex justify-center items-center gap-2">
            <button
              v-for="(img, idx) in images"
              :key="`dot-${idx}`"
              @click.stop="goTo(idx)"
              class="w-2.5 h-2.5 rounded-full transition-all duration-300 shadow"
              :class="idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'"
              :aria-label="`Ir a la imagen ${idx + 1}`"
            ></button>
          </div>

        </div>

        <div
          v-show="isZoomVisible"
          class="absolute hidden md:block top-0 left-[103%] w-full h-full rounded-lg shadow-xl overflow-hidden bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
          style="z-index: 50;"
        >
          <img
            :src="currentImage"
            :alt="`${product.title} zoom`"
            :style="zoomImageStyle"
          />
        </div>

        <div v-if="!hasImages" class="flex items-center justify-center h-full rounded-lg bg-gray-100 dark:bg-gray-700 aspect-square">
          <div class="text-center text-gray-500 dark:text-gray-400">
             <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 3H8a2 2 0 00-2 2v0a2 2 0 002 2h8a2 2 0 002-2v0a2 2 0 00-2-2z"/></svg>
            <p class="font-medium">Sin imágenes</p>
          </div>
        </div>
      </div>

      <aside class="md:col-span-1 flex flex-col">
        <header>
          <span class="text-sm font-semibold uppercase tracking-wider text-brand-primary">{{ product.category_name }}</span>
          <h1 id="product-title" class="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-1 leading-tight">
            {{ formattedTitle }}
          </h1>
          <p class="mt-2 sm:mt-3 text-sm text-gray-500 dark:text-gray-400">Publicado hace {{ daysAgo }} días</p>
        </header>

        <div class="mt-4 sm:mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{{ formattedDescription }}</p>
        </div>

        <div class="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-sm">
            <div class="flex items-center gap-3">
              <img :src="avatarSrc" alt="avatar" class="h-10 w-10 rounded-full object-cover" />
              <div>
                <p class="font-semibold text-gray-800 dark:text-gray-100">{{ formattedUsername }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ product.location || 'Ubicación no especificada' }}</p>
              </div>
            </div>
             <div class="flex justify-between">
                <span class="text-gray-500">Condición:</span>
                <span class="font-semibold text-gray-800 dark:text-gray-100">{{ product.condition || '—' }}</span>
             </div>
             <div class="flex justify-between">
                <span class="text-gray-500">Publicado:</span>
                <span class="font-semibold text-gray-800 dark:text-gray-100">{{ formattedDate }}</span>
             </div>
        </div>

        <div v-if="product.exchange_interests && product.exchange_interests.length" class="mt-4 sm:mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Busca a cambio de:</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="interest in product.exchange_interests" :key="interest" class="inline-flex items-center whitespace-nowrap rounded border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50">
              {{ interest }}
            </span>
          </div>
        </div>

        <div class="mt-auto pt-6 sm:pt-8">
           <button 
             v-if="!userStore.user || userStore.user.id !== product.user_id"
             @click="openProposeModal" 
             class="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-brand-primary text-white font-bold shadow-lg hover:scale-[1.03] transition-transform focus:outline-none focus:ring-4 focus:ring-brand-primary/40"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v6a6 6 0 11-12 0V5H4a2 2 0 01-2-2z"/></svg>
            Proponer Intercambio
          </button>
          
          <button 
             v-else
             disabled
             class="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-bold shadow cursor-not-allowed"
            >
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
             Tu Producto
           </button>
        </div>
      </aside>
    </div>

    <transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="closeProposeModal" aria-hidden="true"></div>
        <div class="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl z-10">
          <div class="flex items-start justify-between">
            <h3 class="text-lg font-semibold">Proponer intercambio</h3>
            <button @click="closeProposeModal" class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none" aria-label="Cerrar diálogo">
              ✕
            </button>
          </div>
          <form @submit.prevent="submitProposal" class="mt-4 space-y-6">
            
            <div>
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Selecciona tu producto a ofrecer:</label>
              
              <div v-if="isLoadingInventory" class="mt-2 text-center p-4 text-gray-500">Cargando tu inventario...</div>

              <div v-else-if="userInventory.length > 0" class="mt-2 h-48 overflow-y-auto rounded-lg border border-gray-200 p-2 space-y-2">
                  <div v-for="item in userInventory" :key="item.id">
                      <label 
                        class="flex items-center gap-4 p-2 rounded-md transition-all duration-200 ease-in-out" 
                        :class="{ 
                            'bg-blue-50 ring-2 ring-blue-400 shadow-sm': selectedProductId === item.id, 
                            'hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer': item.id !== product.id,
                            'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800': item.id === product.id 
                        }"
                      >
                          <input 
                            type="radio" 
                            :value="item.id" 
                            v-model="selectedProductId" 
                            name="product-offer" 
                            class="sr-only"
                            :disabled="item.id === product.id"
                          >
                          <img :src="normalizeImageUrl(item.images.length > 0 ? item.images[0].image_url : null)" :alt="item.title" class="w-12 h-12 object-cover rounded-md flex-shrink-0">
                          <div class="flex-grow">
                            <p class="font-semibold text-sm">{{ item.title }}</p>
                            <p class="text-xs text-gray-500">{{ item.condition }}</p>
                          </div>
                          <span v-if="item.id === product.id" class="text-xs font-semibold text-gray-500 mr-2 flex-shrink-0">
                              (Actual)
                          </span>
                      </label>
                  </div>
              </div>
              <div v-else class="mt-2 text-center p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                  <p>No tienes productos en tu inventario para proponer un intercambio.</p>
              </div>
            </div>

            <div>
              <label for="initial_message" class="text-sm font-medium text-gray-700 dark:text-gray-300">Añadir un mensaje (opcional):</label>
              <textarea 
                id="initial_message"
                v-model="initialMessage"
                rows="3"
                :placeholder="placeholderMessage"
                class="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring focus:ring-brand-primary focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              ></textarea>
              <div class="mt-2 flex flex-wrap gap-2">
                <button v-for="suggestion in suggestedMessages" :key="suggestion" @click.prevent="initialMessage = suggestion" type="button" class="px-3 py-1 text-xs rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200">
                  {{ suggestion }}
                </button>
              </div>
            </div>
            
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button type="button" @click="closeProposeModal" class="px-4 py-2 rounded-md text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Cancelar</button>
              <button :disabled="submitting || !selectedProductId" type="submit" class="px-5 py-2.5 rounded-md bg-brand-primary text-white font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                {{ submitting ? 'Enviando...' : 'Enviar propuesta' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div 
        v-if="isLightboxOpen" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="closeLightbox"
      >
        <button @click="closeLightbox" class="absolute top-4 right-4 z-[52] p-2 bg-white/80 rounded-full shadow-lg" aria-label="Cerrar zoom">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <template v-if="images.length > 1">
          <button @click.stop="prevImage" class="absolute left-4 top-1/2 -translate-y-1/2 z-[52] p-2 bg-white/80 rounded-full shadow-lg" aria-label="Imagen anterior">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button @click.stop="nextImage" class="absolute right-4 top-1/2 -translate-y-1/2 z-[52] p-2 bg-white/80 rounded-full shadow-lg" aria-label="Siguiente imagen">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </template>
        
        <div class="relative w-full h-full flex items-center justify-center z-[51]">
          <img :src="currentImage" :alt="product.title" class="block max-w-full max-h-full object-contain" />
        </div>
      </div>
    </transition>
  </div>

  <div v-else class="animate-pulse p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
    <div class="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from '@/axios';
import defaultAvatar from '@/assets/imagenes/defaul/7.svg';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

const props = defineProps({
  product: { type: Object, required: true },
  apiBase: { type: String, default: import.meta.env.VITE_API_BASE_URL || '' }
});
const emit = defineEmits(['close']);

const isModalOpen = ref(false);
const submitting = ref(false);

const userInventory = ref([]);
const selectedProductId = ref(null);
const isLoadingInventory = ref(false);

const images = ref([]);
const currentIndex = ref(0);
const hasImages = computed(() => images.value.length > 0);
const currentImage = computed(() => hasImages.value ? images.value[currentIndex.value] : placeholderImage);

const initialMessage = ref('');
const suggestedMessages = ref([
  '¿Sigue disponible?',
  '¡Hola! Me interesa tu producto.',
  '¿Te interesa algo de mi perfil?'
]);

const selectedProduct = computed(() => {
    if (!selectedProductId.value) return null;
    return userInventory.value.find(item => item.id === selectedProductId.value);
});

const placeholderMessage = computed(() => {
    if (selectedProduct.value) {
        return `¡Hola! Me interesa tu "${props.product.title}". Te ofrezco mi "${selectedProduct.value.title}" a cambio. ¿Qué te parece?`;
    }
    return 'Selecciona un producto para ver un mensaje sugerido.';
});

const fetchUserInventory = async () => {
    if (!userStore.isLoggedIn) return;
    isLoadingInventory.value = true;
    try {
        const response = await axios.get(`/users/${userStore.user.id}/products`);
        userInventory.value = response.data;
    } catch (error) {
        console.error("Error al cargar el inventario del usuario:", error);
        toast.error("No se pudo cargar tu inventario.");
    } finally {
        isLoadingInventory.value = false;
    }
};

function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const formattedTitle = computed(() => capitalizeFirstLetter(props.product?.title));
const formattedDescription = computed(() => capitalizeFirstLetter(props.product?.description || 'No hay descripción disponible.'));

function formatUserName(name) {
  if (!name) return null;
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = capitalizeFirstLetter(parts[0].toLowerCase());
  if (parts.length === 1) return firstName;
  const initials = parts.slice(1).map(part => `${part.charAt(0).toUpperCase()}.`).join(' ');
  return `${firstName} ${initials}`;
}

const formattedUsername = computed(() => formatUserName(props.product?.user_username) || 'Usuario Anónimo');
const daysAgo = computed(() => {
  if (!props.product?.created_at) return '?';
  return Math.ceil(Math.abs(new Date() - new Date(props.product.created_at)) / (1000 * 60 * 60 * 24));
});
const formattedDate = computed(() => {
  if (!props.product?.created_at) return '—';
  const date = new Date(props.product.created_at);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
});
const avatarSrc = computed(() => {
  const url = props.product?.user_avatar_url;
  if (!url) return defaultAvatar;
  if (/^https?:\/\//i.test(url) || url.startsWith('data:image')) return url;
  return `${props.apiBase}${url}`;
});

const placeholderImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>';

const prevImage = () => { currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length; };
const nextImage = () => { currentIndex.value = (currentIndex.value + 1) % images.value.length; };
const goTo = (i) => { currentIndex.value = i; };

const openProposeModal = () => { 
  isModalOpen.value = true;
  if (userStore.isLoggedIn) {
    fetchUserInventory();
  }
};
const closeProposeModal = () => {
  isModalOpen.value = false;
  userInventory.value = [];
  selectedProductId.value = null;
  initialMessage.value = '';
};

// ... (submitProposal y sendInitialMessage sin cambios) ...
const submitProposal = async () => {
  console.log("--- INICIANDO DEPURACIÓN DE PROPUESTA ---");
  if (userStore.user.id === props.product.user_id) {
    toast.error('No puedes hacer una propuesta por tu propio producto.');
    console.error("Error de lógica: El usuario intentó hacer una propuesta a sí mismo.");
    return;
  }
  if (!selectedProductId.value) {
    toast.error('Por favor, selecciona un producto para intercambiar.');
    console.error("Error de validación: No se seleccionó ningún producto para ofrecer.");
    return;
  }
  const offeredId = selectedProductId.value;
  const requestedId = props.product.id;
  const receiverId = props.product.user_id;
  console.log("ID del Producto Ofrecido:", offeredId, `(tipo: ${typeof offeredId})`);
  console.log("ID del Producto Solicitado:", requestedId, `(tipo: ${typeof requestedId})`);
  console.log("ID del Usuario Receptor:", receiverId, `(tipo: ${typeof receiverId})`);
  console.log("Objeto 'product' completo recibido en props:", props.product);
  if (typeof offeredId !== 'number' || typeof requestedId !== 'number' || typeof receiverId !== 'number') {
      toast.error('Error en los datos del producto. No se puede enviar la propuesta.');
      console.error("Error Crítico de Tipos: Uno o más IDs no son de tipo 'number'. Abortando.");
      return;
  }
  submitting.value = true;
  try {
    const proposalPayload = {
      offered_product_id: offeredId,
      requested_product_id: requestedId,
    };
    console.log("Enviando Payload para CREAR PROPUESTA (/proposals):", proposalPayload);
    const response = await axios.post('/proposals', proposalPayload);
    const newProposal = response.data;
    if (newProposal && newProposal.id) {
      console.log("Propuesta creada con éxito. ID:", newProposal.id);
      const messageText = initialMessage.value.trim() || placeholderMessage.value;
      await sendInitialMessage(newProposal.id, messageText, receiverId);
    }
    toast.success('¡Propuesta enviada con éxito!');
    closeProposeModal();
    router.push({ name: 'Inbox' });
  } catch (error) {
    console.error("--- ERROR AL ENVIAR LA PROPUESTA ---");
    console.error("Mensaje de error general:", error.message);
    if (error.response) {
      console.error("Status de la respuesta:", error.response.status);
      console.error("Datos del error (IMPORTANTE, EXPANDIR ESTO):", error.response.data);
    }
    const errorMessage = error.response?.data?.detail[0]?.msg || error.response?.data?.detail || 'Hubo un error al enviar la propuesta.';
    toast.error(errorMessage);
  } finally {
    console.log("--- FIN DE DEPURACIÓN DE PROPUESTA ---");
    submitting.value = false;
  }
};
const sendInitialMessage = async (proposalId, text, receiverId) => {
  const messageText = text.trim();
  if (!messageText) {
    console.warn("Mensaje inicial vacío, no se enviará.");
    return; 
  }
  const formData = new FormData();
  formData.append('proposal_id', proposalId);
  formData.append('text', messageText);
  console.log("Enviando FormData para CREAR MENSAJE (/messages):", {
    proposal_id: proposalId,
    text: messageText,
  });
  try {
    await axios.post('/messages', formData);
    console.log("Mensaje inicial enviado con éxito.");
  } catch (error) {
    console.error("--- ERROR AL ENVIAR MENSAJE INICIAL ---");
    console.error("Mensaje de error general:", error.message);
    if (error.response) {
      console.error("Status de la respuesta:", error.response.status);
      console.error("Datos del error del servidor (IMPORTANTE, EXPANDIR ESTO):", error.response.data);
    }
    toast.warning('La propuesta fue creada, pero el mensaje inicial no se pudo enviar.');
  }
};

watch(() => props.product, (p) => {
  images.value = [];
  currentIndex.value = 0;
  if (!p) return;
  if (Array.isArray(p.images) && p.images.length) {
    images.value = p.images.map(imgObject => normalizeImageUrl(imgObject.image_url));
  } else if (p.image_url) {
    images.value = [normalizeImageUrl(p.image_url)];
  }
}, { immediate: true });

function normalizeImageUrl(url) {
  if (!url) return placeholderImage;
  if (/^https?:/i.test(url) || url.startsWith('data:image')) return url;
  return `${props.apiBase}${url}`;
}

onMounted(() => {
  images.value.forEach((src) => { const i = new Image(); i.src = src; });
});

// --- LÓGICA DE ZOOM (DESKTOP Y MÓVIL) ---

// --- 1. Lógica de Lightbox (Móvil) ---
const isLightboxOpen = ref(false);

const handleImageClick = () => {
  // Breakpoint 'md' de Tailwind es 768px
  if (window.innerWidth < 768) { 
    isLightboxOpen.value = true;
  }
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
};

// --- 2. Lógica de Panel de Zoom (Desktop) ---
const imageContainer = ref(null);
const isZoomVisible = ref(false);

const zoomFactor = 2;
const lensSize = 150;

const lensTop = ref(0);
const lensLeft = ref(0);
const zoomImgTop = ref(0);
const zoomImgLeft = ref(0);
const zoomImgWidth = ref(0);
const zoomImgHeight = ref(0);

const lensStyle = computed(() => ({
  display: isZoomVisible.value ? 'block' : 'none',
  width: `${lensSize}px`,
  height: `${lensSize}px`,
  top: `${lensTop.value}px`,
  left: `${lensLeft.value}px`,
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  border: '1px solid #fff',
  cursor: 'crosshair',
}));

const zoomImageStyle = computed(() => ({
  width: `${zoomImgWidth.value}px`,
  height: `${zoomImgHeight.value}px`,
  position: 'absolute',
  top: `${zoomImgTop.value}px`,
  left: `${zoomImgLeft.value}px`,
  maxWidth: 'none',
  maxHeight: 'none',
  objectFit: 'cover',
  willChange: 'transform',
}));

const showZoom = () => {
  // Solo mostrar en desktop (md: 768px y más)
  if (window.innerWidth < 768 || !hasImages.value) return; 
  isZoomVisible.value = true;
};

const hideZoom = () => {
  isZoomVisible.value = false;
};

const handleMouseMove = (e) => {
  if (!imageContainer.value || !isZoomVisible.value) return;

  const containerRect = imageContainer.value.getBoundingClientRect();
  
  let x = e.clientX - containerRect.left;
  let y = e.clientY - containerRect.top;

  if (x < 0 || x > containerRect.width || y < 0 || y > containerRect.height) {
    hideZoom();
    return;
  }

  // Posicionar selector
  let lensX = x - lensSize / 2;
  let lensY = y - lensSize / 2;
  lensX = Math.max(0, Math.min(lensX, containerRect.width - lensSize));
  lensY = Math.max(0, Math.min(lensY, containerRect.height - lensSize));
  lensLeft.value = lensX;
  lensTop.value = lensY;

  // Posicionar imagen ampliada
  const magnifiedWidth = containerRect.width * zoomFactor;
  const magnifiedHeight = containerRect.height * zoomFactor;
  zoomImgWidth.value = magnifiedWidth;
  zoomImgHeight.value = magnifiedHeight;

  const ratioX = (containerRect.width > lensSize) ? lensX / (containerRect.width - lensSize) : 0;
  const ratioY = (containerRect.height > lensSize) ? lensY / (containerRect.height - lensSize) : 0;

  const imgOffsetX = ratioX * (magnifiedWidth - containerRect.width);
  const imgOffsetY = ratioY * (magnifiedHeight - containerRect.height);

  zoomImgLeft.value = -imgOffsetX;
  zoomImgTop.value = -imgOffsetY;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-img-enter-active,
.fade-img-leave-active {
  transition: opacity .3s ease;
}
.fade-img-enter-from,
.fade-img-leave-to {
  opacity: 0;
}
:root {
  --brand-primary: #2563eb;
  --brand-accent-pink: #ec4899;
}
</style>