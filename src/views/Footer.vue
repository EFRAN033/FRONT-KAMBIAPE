<template>
  <footer class="bg-gray-950 text-white font-sans antialiased">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div class="md:hidden">
        <div>
          <h3 class="text-sm font-bold text-pink-400 font-lobster">KambiaPe</h3>
          <p class="mt-1 text-[13px] text-gray-400">Intercambia, dona y conecta con tu comunidad.</p>
          <div class="mt-3 flex items-center gap-2">
             <a
              v-for="s in socialLinks"
              :key="s.name"
              :href="s.href"
              target="_blank"
              rel="noopener"
              :aria-label="s.name"
              class="group relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5"
            >
              <span class="relative text-gray-300">
                <svg v-if="s.icon === 'tiktok'" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3h3.1A6.9 6.9 0 0 0 23 9.9V13A10 10 0 0 1 13 6.1V16a6 6 0 1 1-6-6c.34 0 .68.03 1.02.1V13a3 3 0 1 0 3 3V3Z"/></svg>
                <svg v-else-if="s.icon === 'instagram'" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3a5 5 0 110 10 5 5 0 010-10zm5.8-1.8a1 1 0 110 2 1 1 0 010-2z"/></svg>
                <svg v-else-if="s.icon === 'facebook'" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 22v-8h3l1-4h-4V7a1 1 0 011-1h3V2h-3a5 5 0 00-5 5v3H6v4h3v8h4z"/></svg>
              </span>
            </a>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h3 class="text-[14px] font-semibold text-pink-300 mb-2">Navegación</h3>
            <ul class="space-y-1.5 text-gray-300 text-[13px]">
              <li><router-link to="/" class="hover:text-pink-300">Inicio</router-link></li>
              <li><router-link to="/como-funciona" class="hover:text-pink-300">Cómo funciona</router-link></li>
              <li><router-link to="/faqs" class="hover:text-pink-300">FAQs</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-[14px] font-semibold text-pink-300 mb-2">Soporte</h3>
            <ul class="space-y-1.5 text-gray-300 text-[13px]">
              <li><router-link to="/almacenes" class="hover:text-pink-300">Almacenes</router-link></li>
              <li><button @click="openCommentModal" class="text-left hover:text-pink-300">Comentarios</button></li>
              <li><a href="mailto:kambiapex@gmail.com" class="hover:text-pink-300">Contacto</a></li>
            </ul>
          </div>
        </div>
        
        <button
          @click="navigateToRegister"
          class="mt-6 w-full rounded-md bg-gradient-to-r from-pink-600 to-rose-600 px-4 py-2 text-[13px] font-semibold shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-950"
        >
          Subir mis productos
        </button>
      </div>
      <div class="hidden md:grid grid-cols-12 gap-5">
        <div class="col-span-4">
          <h3 class="text-sm font-bold text-pink-400 font-lobster">KambiaPe</h3>
          <p class="mt-1 text-[13px] text-gray-400">
            Intercambia, dona y potencia el impacto social en tu comunidad.
          </p>

          <div class="mt-4 flex items-center gap-2">
            <a
              v-for="s in socialLinks"
              :key="s.name"
              :href="s.href"
              target="_blank"
              rel="noopener"
              :aria-label="s.name"
              :title="s.name"
              class="group relative inline-flex h-9 w-9 items-center justify-center rounded-full
                     border border-white/10 bg-white/5 backdrop-blur
                     ring-0 ring-pink-400/0 transition
                     hover:border-white/15 hover:bg-white/10 hover:shadow-[0_0_0_3px_rgba(236,72,153,0.15)]
                     hover:ring-4 hover:ring-pink-400/10
                     focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400/40"
            >
              <span class="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity
                           group-hover:opacity-30 bg-gradient-to-tr from-white/10 to-white/0"></span>

              <span class="relative text-gray-300 transition-transform duration-150 group-hover:scale-110 group-hover:text-white">
                <svg v-if="s.icon === 'tiktok'" class="h-4.5 w-4.5 md:h-5 md:w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3h3.1A6.9 6.9 0 0 0 23 9.9V13A10 10 0 0 1 13 6.1V16a6 6 0 1 1-6-6c.34 0 .68.03 1.02.1V13a3 3 0 1 0 3 3V3Z"/></svg>
                <svg v-else-if="s.icon === 'instagram'" class="h-4.5 w-4.5 md:h-5 md:w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3a5 5 0 110 10 5 5 0 010-10zm5.8-1.8a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
                <svg v-else-if="s.icon === 'facebook'" class="h-4.5 w-4.5 md:h-5 md:w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13 22v-8h3l1-4h-4V7a1 1 0 011-1h3V2h-3a5 5 0 00-5 5v3H6v4h3v8h4z"/>
                </svg>
              </span>

              <span
                class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2
                       whitespace-nowrap rounded-md bg-gray-800/95 px-2 py-1
                       text-[11px] font-medium text-gray-100 opacity-0 shadow
                       transition-opacity duration-150 group-hover:opacity-100"
              >
                {{ s.name }}
              </span>
            </a>
          </div>
        </div>

        <div class="col-span-3">
          <h3 class="text-sm font-bold text-pink-400 mb-2.5">Navegación</h3>
          <ul class="space-y-1.5 text-gray-300 text-[13px]">
            <li><router-link to="/" class="hover:text-pink-300">Inicio</router-link></li>
            <li><router-link to="/como-funciona" class="hover:text-pink-300">Cómo funciona</router-link></li>
            <li><router-link to="/faqs" class="hover:text-pink-300">FAQs</router-link></li>
          </ul>
        </div>

        <div class="col-span-3">
          <h3 class="text-sm font-bold text-pink-400 mb-2.5">Soporte</h3>
          <ul class="space-y-1.5 text-gray-300 text-[13px]">
            <li><a href="mailto:kambiapex@gmail.com" class="hover:text-pink-300">kambiapex@gmail.com</a></li>
            <li><button @click="openCommentModal" class="hover:text-pink-300">Dejar un comentario</button></li>
          </ul>
        </div>

        <div class="col-span-2">
          <h3 class="text-sm font-bold text-pink-400 mb-2.5">¿Quieres publicar?</h3>
          <p class="text-gray-300 text-[13px] mb-2.5">Sube tus productos y dales una segunda vida.</p>
          <button
              @click="navigateToRegister"
              class="w-full rounded-md bg-brand-primary px-4 py-2.5 text-[13px] font-semibold text-white shadow hover:brightness-110"
          >
              Comenzar ahora
          </button>
        </div>
      </div>

      <div class="mt-6 sm:mt-8 border-t border-white/10 pt-3.5 sm:pt-4 text-center text-[13px] text-gray-400">
        <div class="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
           <p class="text-[12px] sm:text-[13px]">
             © {{ year }} <span class="font-lobster">KambiaPe</span>. Todos los derechos reservados.
             <span class="mx-2 hidden sm:inline-block">|</span>
             <span class="block sm:inline-block mt-1 sm:mt-0">God is Good</span>
           </p>
          <div class="flex items-center gap-3 sm:gap-4">
            <router-link to="/terminos" class="text-[12px] sm:text-[13px] hover:text-white">Términos</router-link>
            <router-link to="/privacy" class="text-[12px] sm:text-[13px] hover:text-white">Privacidad</router-link>
          </div>
        </div>
      </div>
    </div>
    
    <TransitionRoot :show="isCommentModalVisible" as="template">
      <Dialog @close="closeCommentModal" class="relative z-50">
        <TransitionChild
          enter="transition ease-out duration-200"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition ease-in duration-150"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="transition ease-out duration-200"
              enter-from="opacity-0 translate-y-3 scale-95"
              enter-to="opacity-100 translate-y-0 scale-100"
              leave="transition ease-in duration-150"
              leave-from="opacity-1100 translate-y-0 scale-100"
              leave-to="opacity-0 translate-y-3 scale-95"
            >
              <DialogPanel class="relative w-full max-w-lg overflow-hidden rounded-2xl ring-1 ring-inset ring-white/10 bg-[#0b0b12]/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
  
              <button
                type="button"
                @click="closeCommentModal"
                class="absolute top-5 right-5 rounded-full p-1.5 text-gray-400 transition-all duration-200 ease-in-out hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-label="Cerrar panel"
              >
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div class="text-center">
                <DialogTitle class="text-xl font-semibold text-white tracking-tight">
                  Envíanos tus Comentarios
                </DialogTitle>
                <p class="mt-1 text-sm text-gray-400">
                  Tu opinión nos ayuda a mejorar la plataforma.
                </p>
              </div>

              <div class="my-6 h-px bg-white/10" />

              <form v-if="userStore.isLoggedIn" class="space-y-5" @submit.prevent="submitComment">
                
                <div>
                  <label for="commentType" class="mb-1.5 block text-sm font-medium text-gray-300">
                    Tipo de comentario
                  </label>
                  <div class="relative">
                    <select 
                      id="commentType" 
                      v-model="comment.type" 
                      class="w-full appearance-none rounded-md border border-white/10 bg-white/5 py-2.5 pl-3 pr-10 text-white transition-all duration-200 ease-in-out placeholder:text-gray-500 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                      <option value="suggestion">Sugerencia</option>
                      <option value="problem">Reportar un problema</option>
                      <option value="question">Pregunta</option>
                      <option value="compliment">Felicitación</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                      <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label for="commentMessage" class="mb-1.5 block text-sm font-medium text-gray-300">
                    Mensaje <span class="text-rose-400">*</span>
                  </label>
                  <textarea 
                    id="commentMessage" 
                    v-model="comment.message" 
                    rows="4" 
                    required 
                    class="w-full resize-none rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-white transition-all duration-200 ease-in-out placeholder:text-gray-500 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20" 
                    placeholder="Describe tu sugerencia o problema..."
                  ></textarea>
                </div>

                <div class="flex justify-end gap-3 pt-4">
                  <button 
                    type="button" 
                    @click="closeCommentModal" 
                    class="rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-400 transition-all duration-200 ease-in-out hover:bg-white/5 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    :disabled="isSubmitting" 
                    class="inline-flex min-w-[100px] items-center justify-center rounded-md bg-gradient-to-r from-pink-600 to-rose-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-pink-600/20 transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-600/40 active:scale-[0.98] disabled:from-gray-600 disabled:to-gray-700 disabled:shadow-none disabled:hover:scale-100"
                  >
                    <span v-if="!isSubmitting">Enviar</span>
                    <svg v-else class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0A12 12 0 000 12h4z"/>
                    </svg>
                  </button>
                </div>
              </form>

              <div v-else class="mt-8 flex flex-col items-center text-center">
                <svg class="h-12 w-12 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <p class="mt-4 text-gray-300">Debes iniciar sesión para poder dejar un comentario.</p>
                <button 
                  @click="navigateToLogin" 
                  class="mt-6 w-full max-w-xs rounded-md bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-pink-600/20 transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-600/40 active:scale-[0.98]"
                >
                  Iniciar Sesión
                </button>
              </div>

              <p v-if="feedbackMessage" class="mt-4 text-center text-sm font-medium" :class="isSuccess ? 'text-white' : 'text-rose-400'">
                {{ feedbackMessage }}
              </p>
            </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { useUserStore } from '@/stores/user';
import axios from '@/axios';

const socialLinks = [
  { name: 'Facebook',  href: 'https://www.facebook.com/share/1A62pnpV8K/', icon: 'facebook' },
  { name: 'Instagram', href: 'https://www.instagram.com/kambia_pe?igsh=MWg2aWR3YnhnNW1qdw==', icon: 'instagram' },
  { name: 'TikTok',    href: 'https://tiktok.com/@kambiape', icon: 'tiktok' },
];

const router = useRouter();
const userStore = useUserStore();

const navigateToRegister = () => router.push('/Register');
const navigateToLogin = () => {
  closeCommentModal();
  router.push('/login');
};

const isCommentModalVisible = ref(false);
const comment = ref({ type: '', message: '' });
const isSubmitting = ref(false);
const feedbackMessage = ref('');
const isSuccess = ref(false);

const openCommentModal = () => {
  isCommentModalVisible.value = true;
  comment.value = { type: 'suggestion', message: '' };
  feedbackMessage.value = '';
  isSuccess.value = false;
  isSubmitting.value = false;
};

const closeCommentModal = () => (isCommentModalVisible.value = false);

const submitComment = async () => {
  if (!comment.value.message.trim()) {
    feedbackMessage.value = 'El mensaje no puede estar vacío.';
    isSuccess.value = false;
    return;
  }
  
  if (comment.value.message.trim().length < 10) {
    feedbackMessage.value = 'El mensaje debe tener al menos 10 caracteres.';
    isSuccess.value = false;
    return;
  }

  isSubmitting.value = true;
  feedbackMessage.value = '';

  try {
    await axios.post('/api/comments', {
      type: comment.value.type,
      message: comment.value.message,
    });

    isSuccess.value = true;
    feedbackMessage.value = '¡Gracias! Tu comentario ha sido guardado.';
    setTimeout(() => closeCommentModal(), 2000);

  } catch (error) {
    isSuccess.value = false;
    
    if (error.response && error.response.data) {
      const data = error.response.data;
      
      if (Array.isArray(data) && data[0] && data[0].msg) {
        feedbackMessage.value = data[0].msg; 
      } 
      else if (data.detail) {
        feedbackMessage.value = data.detail;
      }
      else {
        feedbackMessage.value = 'Ocurrió un error al enviar tu comentario.';
      }
    } else {
      feedbackMessage.value = 'Error de red. Inténtalo de nuevo.';
    }
    
  } finally {
    isSubmitting.value = false;
  }
};

const year = computed(() => new Date().getFullYear());
</script>