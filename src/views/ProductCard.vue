<template>
  <div v-if="product" class="relative flex flex-col bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl h-full max-w-5xl mx-auto">
    <button @click="$emit('close')" class="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm hover:scale-110 transition-transform" aria-label="Cerrar">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <div class="md:col-span-1">
        <div class="relative rounded-lg overflow-hidden shadow-lg aspect-square">
          <transition name="fade-img" mode="out-in">
            <img :key="currentImage" :src="currentImage" :alt="product.title" class="w-full h-full object-cover" loading="lazy" />
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
          <h1 id="product-title" class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-1 leading-tight">
            {{ formattedTitle }}
          </h1>
          <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">Publicado hace {{ daysAgo }} días</p>
        </header>

        <div class="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ product.description || 'No hay descripción disponible.' }}</p>
        </div>

        <div class="mt-6 space-y-4 text-sm">
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

        <div v-if="product.exchange_interests && product.exchange_interests.length" class="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Busca a cambio de:</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="interest in product.exchange_interests" :key="interest" class="inline-flex items-center whitespace-nowrap rounded border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50">
              {{ interest }}
            </span>
          </div>
        </div>

        <div class="mt-auto pt-8 flex flex-col sm:flex-row gap-3">
           <button @click="openProposeModal" class="flex-1 inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-brand-primary text-white font-bold shadow-lg hover:scale-[1.03] transition-transform focus:outline-none focus:ring-4 focus:ring-brand-primary/40">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v6a6 6 0 11-12 0V5H4a2 2 0 01-2-2z"/></svg>
            Proponer Intercambio
          </button>
          <button @click="$emit('favorite', product)" class="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18l-6.828-6.828a4 4 0 010-5.656z"/></svg>
          </button>
        </div>
      </aside>
    </div>

    <transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="closeProposeModal" aria-hidden="true"></div>
        <div class="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl z-10">
          <div class="flex items-start justify-between">
            <h3 class="text-lg font-semibold">Proponer intercambio</h3>
            <button @click="closeProposeModal" class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none" aria-label="Cerrar diálogo">
              ✕
            </button>
          </div>
          <form @submit.prevent="submitProposal" class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="sm:col-span-2">
              <label class="text-xs font-medium text-gray-600">Qué ofreces</label>
              <input v-model="proposal.item" type="text" placeholder="Ej: 2 cajas de tornillos" class="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/30" required />
            </div>

            <div>
              <label class="text-xs font-medium text-gray-600">Tu nombre</label>
              <div class="mt-2 flex items-center gap-3">
                <img v-if="userStore.isLoggedIn" :src="userStore.user.profilePicture" alt="Tu avatar" class="h-10 w-10 rounded-full object-cover">
                <input v-model="proposal.name" type="text" placeholder="Tu nombre" class="w-full rounded-lg border border-gray-200 dark:border-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/30" required />
              </div>
            </div>

            <div>
              <label class="text-xs font-medium text-gray-600">Contacto</label>
              <input v-model="proposal.contact" type="text" placeholder="Teléfono o chat" class="mt-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/30" required />
            </div>
            
            <div class="sm:col-span-2 flex items-center justify-end gap-2">
              <button type="button" @click="closeProposeModal" class="px-4 py-2 rounded-md">Cancelar</button>
              <button :disabled="submitting" type="submit" class="px-5 py-3 rounded-md bg-brand-primary text-white font-semibold disabled:opacity-60">Enviar propuesta</button>
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

const userStore = useUserStore();

const props = defineProps({
  product: { type: Object, required: true },
  apiBase: { type: String, default: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000' }
});
const emit = defineEmits(['propose-trade', 'close', 'favorite']);

const isModalOpen = ref(false);
const submitting = ref(false);
const proposal = ref({ item: '', name: '', contact: '' });

const images = ref([]);
const currentIndex = ref(0);
const hasImages = computed(() => images.value.length > 0);
const currentImage = computed(() => hasImages.value ? images.value[currentIndex.value] : placeholderImage);

function formatUserName(name) {
  if (!name) return null;
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  const firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
  if (parts.length === 1) return firstName;
  const initials = parts.slice(1).map(part => `${part.charAt(0).toUpperCase()}.`).join(' ');
  return `${firstName} ${initials}`;
}

const formattedTitle = computed(() => {
  if (!props.product || !props.product.title) return '';
  return props.product.title.charAt(0).toUpperCase() + props.product.title.slice(1);
});

const formattedUsername = computed(() => formatUserName(props.product?.user_username) || 'Usuario Anónimo');

const daysAgo = computed(() => {
  if (!props.product?.created_at) return '?';
  const today = new Date();
  const date = new Date(props.product.created_at);
  const diff = Math.ceil(Math.abs(today - date) / (1000 * 60 * 60 * 24));
  return diff;
});

const formattedDate = computed(() => {
  if (!props.product?.created_at) return '—';
  const date = new Date(props.product.created_at);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
});

const avatarSrc = computed(() => {
  const url = props.product?.user_avatar_url;
  // MODIFICACIÓN: Añadimos un console.log para depurar
  console.log('Avatar URL recibida:', url);
  if (!url) {
    return defaultAvatar;
  }
  if (/^https?:\/\//i.test(url) || url.startsWith('data:image')) {
    return url;
  }
  return `${props.apiBase}${url}`;
});

const contactLabel = computed(() => formatUserName(props.product?.contact_name) || 'Contactar vendedor');

const placeholderImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>';
const defaultAvatar = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="%23888" stroke-width="1.5"/><path d="M4 20c1.2-4 6.8-6 8-6s6.8 2 8 6" stroke="%23888" stroke-width="1.5" stroke-linecap="round"/></svg>';

const currentIndexSafe = (idx) => {
  if (images.value.length === 0) return 0;
  if (idx < 0) return images.value.length - 1;
  if (idx >= images.value.length) return 0;
  return idx;
};
const prevImage = () => { currentIndex.value = currentIndexSafe(currentIndex.value - 1); };
const nextImage = () => { currentIndex.value = currentIndexSafe(currentIndex.value + 1); };
const goTo = (i) => { currentIndex.value = i; };

const openProposeModal = () => { 
  isModalOpen.value = true;
  if (userStore.isLoggedIn) {
    proposal.value.name = userStore.user.fullName;
  }
};
const closeProposeModal = () => { isModalOpen.value = false; };

const submitProposal = async () => {
  if (!proposal.value.item || !proposal.value.name || !proposal.value.contact) return;
  submitting.value = true;
  try {
    emit('propose-trade', { product: props.product, proposal: proposal.value });
    proposal.value = { item: '', name: '', contact: '' };
    closeProposeModal();
  } catch (err) {
    console.error(err);
  } finally {
    submitting.value = false;
  }
};

watch(() => props.product, (p) => {
  images.value = [];
  currentIndex.value = 0;
  if (!p) return;

  if (Array.isArray(p.images) && p.images.length) {
    images.value = p.images.map(imgObject => normalizeImageUrl(imgObject.image_url));
  } 
  else if (typeof p.images === 'string' && p.images.length) {
    images.value = p.images.split(',').map(i => normalizeImageUrl(i.trim()));
  } 
  else if (p.image_url) {
    images.value = [normalizeImageUrl(p.image_url)];
  }
}, { immediate: true });


function normalizeImageUrl(url) {
  if (!url) return placeholderImage;
  if (/^https?:/i.test(url)) return url;
  return `${props.apiBase}${url}`;
}

onMounted(() => {
  images.value.forEach((src) => { const i = new Image(); i.src = src; });
});
</script>

<style scoped>
/* Transición para el modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transición para la imagen del carrusel */
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