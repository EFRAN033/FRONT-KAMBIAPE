<template>
  <div v-if="product" class="relative flex flex-col bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-2xl shadow-xl h-full max-w-5xl mx-auto">
    <button @click="$emit('close')" class="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm hover:scale-110 transition-transform" aria-label="Cerrar">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="relative">
        <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img :src="images[currentIndex]" :alt="product.title" class="w-full h-full object-cover">
        </div>
        <div v-if="images.length > 1" class="mt-2 grid grid-cols-5 gap-2">
          <button v-for="(img, index) in images" :key="index" @click="currentIndex = index" class="aspect-w-1 aspect-h-1 rounded-md overflow-hidden ring-2 transition" :class="currentIndex === index ? 'ring-brand-primary' : 'ring-transparent hover:ring-brand-primary/50'">
            <img :src="img" :alt="`${product.title} - imagen ${index + 1}`" class="w-full h-full object-cover">
          </button>
        </div>
      </div>
      <div>
        <div class="mb-4">
          <span class="inline-block bg-brand-light text-brand-dark text-xs font-semibold px-2 py-1 rounded-full mb-2">{{ product.category_name }}</span>
          <h1 id="product-modal-title" class="text-3xl font-bold text-gray-900 dark:text-white">{{ product.title }}</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">por {{ product.user_username }}</p>
        </div>
        <div class="prose prose-sm dark:prose-invert max-w-none mb-6">
          <p>{{ product.description }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4 text-sm mb-6">
          <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <dt class="font-medium text-gray-500 dark:text-gray-400">Condición</dt>
            <dd class="font-semibold text-gray-800 dark:text-gray-100 mt-1">{{ product.condition }}</dd>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <dt class="font-medium text-gray-500 dark:text-gray-400">Disponibilidad</dt>
            <dd class="font-semibold text-gray-800 dark:text-gray-100 mt-1">{{ product.status === 'available' ? 'Disponible' : 'No disponible' }}</dd>
          </div>
        </div>
        <div v-if="product.exchange_interests && product.exchange_interests.length > 0" class="mb-6">
          <h4 class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Busca a cambio:</h4>
          <div class="flex flex-wrap gap-2">
            <span v-for="interest in product.exchange_interests" :key="interest" class="badge-sq">
              {{ interest }}
            </span>
          </div>
        </div>
        <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Proponer Intercambio</h4>
          <div v-if="!userStore.isLoggedIn">
            <p class="text-sm text-center text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
              Debes <router-link to="/login" class="text-brand-primary font-semibold hover:underline">iniciar sesión</router-link> para proponer un intercambio.
            </p>
          </div>
          <div v-else-if="userStore.user.id === product.user_id">
            <p class="text-sm text-center text-gray-600 dark:text-gray-300 bg-yellow-50 dark:bg-yellow-800/20 p-4 rounded-lg">Este es tu propio producto. No puedes intercambiar contigo mismo.</p>
          </div>
          <div v-else>
            <label for="my-product-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selecciona un producto de tu inventario para ofrecer:</label>
            <div v-if="loadingUserProducts" class="text-center p-4">
              <p class="text-sm text-gray-500">Cargando tus productos...</p>
            </div>
            <div v-else-if="userProducts.length === 0" class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="text-sm text-gray-600 dark:text-gray-300">No tienes productos en tu inventario para intercambiar.</p>
              <router-link to="/publicar" class="mt-2 inline-block text-brand-primary font-semibold hover:underline text-sm">Publica tu primer producto</router-link>
            </div>
            <div v-else class="flex items-center gap-3">
              <select id="my-product-select" v-model="selectedUserProductId" class="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm">
                <option :value="null" disabled>Elige un producto...</option>
                <option v-for="userProduct in userProducts" :key="userProduct.id" :value="userProduct.id">
                  {{ userProduct.title }}
                </option>
              </select>
              <button
                @click="proposeTrade"
                :disabled="!selectedUserProductId || submitting"
                class="px-5 py-2 text-sm font-semibold text-white bg-brand-primary rounded-md shadow-sm hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
              >
                <svg v-if="submitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span v-if="!submitting">Proponer</span>
                <span v-else>Enviando...</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import api from '@/axios'; // <--- CAMBIO 1: Importamos la instancia central de axios
import placeholderImage from '@/assets/imagenes/defaul/7.svg';

const props = defineProps({
  product: Object,
  // --- CAMBIO 2: Eliminamos la prop 'apiBase' ---
});

const emit = defineEmits(['close', 'propose-trade']);

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();

const images = ref([]);
const currentIndex = ref(0);
const userProducts = ref([]);
const selectedUserProductId = ref(null);
const loadingUserProducts = ref(false);
const submitting = ref(false);

const fetchUserProducts = async () => {
  if (!userStore.isLoggedIn) return;
  loadingUserProducts.value = true;
  try {
    const { data } = await api.get(`/users/${userStore.user.id}/products`);
    userProducts.value = data.filter(p => p.status === 'available');
  } catch (error) {
    console.error("Error al cargar los productos del usuario:", error);
  } finally {
    loadingUserProducts.value = false;
  }
};

onMounted(() => {
  if (userStore.isLoggedIn) {
    fetchUserProducts();
  }
});

const proposeTrade = async () => {
  if (!selectedUserProductId.value || !props.product) return;
  submitting.value = true;
  try {
    const proposalData = {
      offered_product_id: selectedUserProductId.value,
      requested_product_id: props.product.id,
    };
    const { data: newProposal } = await api.post('/proposals', proposalData);

    const offeredProductTitle = userProducts.value.find(p => p.id === selectedUserProductId.value)?.title || 'tu producto';
    const initialMessage = `¡Hola! Te propongo un intercambio. Me gustaría cambiar mi producto "${offeredProductTitle}" por tu "${props.product.title}". ¿Qué te parece?`;
    
    await sendInitialMessage(newProposal.id, initialMessage);

    toast.success('¡Propuesta enviada con éxito!');
    emit('propose-trade', props.product);
    router.push('/buzon');
  } catch (error) {
    const errorMessage = error.response?.data?.detail || 'Ocurrió un error al crear la propuesta.';
    console.error("Error al crear la propuesta:", error.response || error);
    toast.error(errorMessage);
  } finally {
    submitting.value = false;
  }
};

const sendInitialMessage = async (proposalId, text) => {
  try {
    await api.post('/messages', {
      proposal_id: proposalId,
      text: text,
    });
  } catch (error) {
    console.error("Error al enviar el mensaje inicial:", error);
    toast.warning('La propuesta fue creada, pero el mensaje inicial no se pudo enviar.');
  }
};

watch(() => props.product, (p) => {
  images.value = [];
  currentIndex.value = 0;
  if (!p) return;
  if (Array.isArray(p.images) && p.images.length) {
    images.value = p.images.map(imgObject => normalizeImageUrl(imgObject.image_url));
  } else if (p.thumbnail_image_url) { // Corregido para usar thumbnail si no hay galería
    images.value = [normalizeImageUrl(p.thumbnail_image_url)];
  }
}, { immediate: true });

// --- CAMBIO 3: Simplificamos la normalización de la URL ---
function normalizeImageUrl(url) {
  if (!url) return placeholderImage;
  // Si la URL ya es completa o es una data URI, la devolvemos.
  if (/^(https?:|data:)/i.test(url)) return url;
  // Si es una ruta relativa, el navegador la manejará correctamente.
  return url;
}

onMounted(() => {
  // Precarga las imágenes para una mejor experiencia de usuario
  images.value.forEach((src) => { const i = new Image(); i.src = src; });
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
.badge-sq {
  display: inline-flex; align-items: center; gap: .35rem;
  padding: .28rem .5rem; font-size: .75rem; font-weight: 700; line-height: 1;
  border: 1px solid #E2E8F0; color: #0f172a; background: #fff; border-radius: 4px; box-shadow: 0 1px 0 rgba(2, 6, 23, .05);
}
.dark .badge-sq { border-color: #334155; color: #e2e8f0; background: #0b1220; box-shadow: 0 1px 0 rgba(0, 0, 0, .3); }
</style>