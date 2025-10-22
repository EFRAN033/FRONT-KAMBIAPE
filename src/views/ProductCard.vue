<template>
  <div v-if="product" class="relative flex flex-col bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl max-w-5xl mx-auto">
    <button @click="$emit('close')" class="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm hover:scale-110 transition-transform" aria-label="Cerrar">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      
      <div class="md:col-span-1">
        <div class="relative rounded-lg overflow-hidden shadow-lg aspect-square bg-white sm:bg-gray-100 dark:bg-gray-800 sm:dark:bg-gray-700">
          <transition name="fade-img" mode="out-in">
            <img :key="currentImage" :src="currentImage" :alt="product.title" class="w-full h-full object-contain" loading="lazy" />
          </transition>
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

          <template v-if="images.length > 1">
            <button @click="prevImage" class="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all focus:outline-none" aria-label="Imagen anterior">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button @click="nextImage" class="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all focus:outline-none" aria-label="Siguiente imagen">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </template>
          
          <div v-if="images.length > 1" class="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
            <button
              v-for="(img, idx) in images"
              :key="`dot-${idx}`"
              @click="goTo(idx)"
              class="w-2.5 h-2.5 rounded-full transition-all duration-300 shadow"
              :class="idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'"
              :aria-label="`Ir a la imagen ${idx + 1}`"
            ></button>
          </div>

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
            @click="openProposeModal" 
            :disabled="isOwner"
            class="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-brand-primary text-white font-bold shadow-lg transition-transform focus:outline-none focus:ring-4 focus:ring-brand-primary/40"
            :class="{ 
              'hover:scale-[1.03]': !isOwner, 
              'opacity-50 cursor-not-allowed': isOwner 
            }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v6a6 6 0 11-12 0V5H4a2 2 0 01-2-2z"/></svg>
            {{ isOwner ? 'Este es tu producto' : 'Proponer Intercambio' }}
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
                            'hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer': true
                        }"
                      >
                          <input 
                            type="radio" 
                            :value="item.id" 
                            v-model="selectedProductId" 
                            name="product-offer" 
                            class="sr-only"
                          >
                          <img :src="normalizeImageUrl(item.images.length > 0 ? item.images[0].image_url : null)" :alt="item.title" class="w-12 h-12 object-cover rounded-md flex-shrink-0">
                          <div class="flex-grow">
                            <p class="font-semibold text-sm">{{ item.title }}</p>
                            <p class="text-xs text-gray-500">{{ item.condition }}</p>
                          </div>
                      </label>
                  </div>
              </div>
              <div v-else class="mt-2 text-center p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                  <p>No tienes productos en tu inventario para proponer un intercambio.</p>
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
  apiBase: { type: String, default: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000' }
});
const emit = defineEmits(['close']);

const isModalOpen = ref(false);
const submitting = ref(false);
const userInventory = ref([]);
const selectedProductId = ref(null);
const isLoadingInventory = ref(false);
const images = ref([]);
const currentIndex = ref(0);
const hasImages = computed(() => images.value.length > 0 && images.value[0] !== placeholderImage);
const currentImage = computed(() => (images.value.length > 0 ? images.value[currentIndex.value] : placeholderImage));

const isOwner = computed(() => {
  if (!userStore.user || !props.product) return false;
  return Number(userStore.user.id) === Number(props.product.user_id);
});

const selectedProduct = computed(() => {
    if (!selectedProductId.value) return null;
    return userInventory.value.find(item => item.id === selectedProductId.value);
});

const placeholderImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>';

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
  return normalizeImageUrl(url, defaultAvatar);
});

const prevImage = () => { currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length; };
const nextImage = () => { currentIndex.value = (currentIndex.value + 1) % images.value.length; };
const goTo = (i) => { currentIndex.value = i; };

const openProposeModal = () => { 
  if (!userStore.isLoggedIn) {
      toast.info('Debes iniciar sesión para proponer un intercambio.');
      router.push('/login');
      return;
  }
  isModalOpen.value = true;
  fetchUserInventory();
};
const closeProposeModal = () => {
  isModalOpen.value = false;
  userInventory.value = [];
  selectedProductId.value = null;
};

const submitProposal = async () => {
  if (!selectedProductId.value || !selectedProduct.value) {
    toast.error('Por favor, selecciona un producto para intercambiar.');
    return;
  }

  submitting.value = true;
  try {
    const proposalPayload = {
      offered_product_id: selectedProductId.value,
      requested_product_id: props.product.id,
    };
    const response = await axios.post('/proposals', proposalPayload);
    const newProposal = response.data;

    if (newProposal && newProposal.id) {
      const messageText = `¡Hola! Te propongo un cambio. Me interesa tu "${props.product.title}" y te ofrezco mi "${selectedProduct.value.title}". ¿Qué te parece?`;
      await sendInitialMessage(newProposal.id, messageText);
    }
    
    toast.success('¡Propuesta enviada con éxito!');
    closeProposeModal();
    router.push({ name: 'Inbox' });

  } catch (error) {
    const errorMessage = error.response?.data?.detail || 'Hubo un error al enviar la propuesta.';
    console.error("Error al crear la propuesta:", error.response || error);
    toast.error(errorMessage);
  } finally {
    submitting.value = false;
  }
};

const sendInitialMessage = async (proposalId, text) => {
  try {
    const receiverId = props.product?.user_id;

    if (!receiverId) {
      console.error("Error: props.product.user_id no está disponible.");
      toast.error("No se pudo identificar al destinatario del mensaje.");
      return;
    }
    
    await axios.post('/messages', {
      proposal_id: proposalId,
      text: text,
      receiver_id: receiverId,
    });
  } catch (error) {
    console.error("Error al enviar el mensaje inicial:", error);
    if (error.response) {
      // Es crucial que expandas este objeto en la consola si el error persiste
      console.error("Detalles del error del servidor:", error.response.data);
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
  } else if (p.thumbnail_image_url) {
    images.value = [normalizeImageUrl(p.thumbnail_image_url)];
  } else {
    images.value = [placeholderImage];
  }
}, { immediate: true });

function normalizeImageUrl(url, defaultImg = placeholderImage) {
  if (!url) return defaultImg;
  if (/^(https?:|data:)/i.test(url)) {
    return url;
  }
  return `${props.apiBase}${url}`;
}

onMounted(() => {
  images.value.forEach((src) => { 
    if (src !== placeholderImage) {
      const i = new Image(); 
      i.src = src; 
    }
  });
});
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
</style>