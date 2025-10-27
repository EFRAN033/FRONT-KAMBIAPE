<template>
  <!-- 
    Este es el contenedor principal que estaba en ProductFeed.vue.
    Le añadimos padding (py-12) para que tenga espacio, ya que ahora es un componente separado.
  -->
  <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 antialiased">
    <!-- 
      Este es el bloque de bienvenida que querías mover.
      Contiene el título "Bienvenido a KambiaPe" y las tarjetas animadas.
    -->
    <section class="relative bg-gray-100 dark:bg-gray-900 rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700 overflow-hidden">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/2 -top-28 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-primary/15 to-brand-dark/15 blur-3xl"></div>
        <div class="absolute inset-0 opacity-10 dark:opacity-20 mix-blend-multiply"
             style="background-image: radial-gradient(circle at 1px 1px, #a6045d 1px, transparent 1.5px);
                    background-size: 22px 22px;"></div>
      </div>

      <div class="relative mx-auto max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-12 md:gap-8 lg:gap-14 md:items-center">
          
          <aside class="md:col-span-5 lg:col-span-5 h-80 md:h-auto -mt-4 md:mt-0 pointer-events-none md:pointer-events-auto">
            <div class="relative w-full h-full flex items-center justify-center group select-none pointer-events-auto"
                 @mouseenter="hovering = true"
                 @mouseleave="hovering = false">
              <svg class="absolute -z-10 left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 opacity-55 scale-[0.8] md:scale-100" viewBox="0 0 200 200" fill="none">
                <defs>
                  <radialGradient id="ringGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(100)">
                    <stop offset="0" stop-color="#d7037b" stop-opacity="0.6"/>
                    <stop offset="1" stop-color="#a6045d" stop-opacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="92" stroke="url(#ringGrad)" stroke-width="1.6"/>
              </svg>

              <div class="relative h-[23rem] w-full scale-[0.7] md:scale-90 lg:scale-100">
                <div
                  v-for="(card, i) in orderedCards"
                  :key="card.id"
                  :class="[
                    'absolute left-1/2 top-1/2 h-[19rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden transition-all duration-500 ease-out',
                    'bg-white/40 backdrop-blur-md dark:bg-white/5 shadow-lg',
                    positionClass(i)
                  ]"
                  :style="transformStyle(i)"
                  @click="shuffle()"
                >
                  <img :src="card.img" :alt="card.alt" class="h-full w-full object-cover" />
                  <div class="pointer-events-none absolute inset-0 overflow-hidden">
                    <div class="absolute -left-1/3 top-0 h-full w-1/2 bg-gradient-to-r from-white/35 to-transparent opacity-0 group-hover:opacity-40 transition duration-700 translate-x-[-120%] group-hover:translate-x-[180%]"></div>
                  </div>
                  <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span class="text-white text-xs font-medium drop-shadow">{{ card.alt }}</span>
                    <span class="px-2 py-0.5 text-[10px] rounded-full bg-gradient-to-r from-brand-primary to-brand-dark text-white shadow">
                      {{ card.badge }}
                    </span>
                  </div>
                  <div class="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/10 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
                    Activo
                    <span v-if="i === frontIndex" class="ml-1 h-1.5 w-1.5 rounded-full bg-success"></span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <header class="md:col-span-7 lg:col-span-7 text-center md:text-left flex flex-col items-center md:items-start px-6 pb-6 md:py-12 md:pl-6 md:pr-0 lg:pl-8 relative z-10 -mt-24 md:mt-0 bg-gray-100/80 dark:bg-gray-900/80 md:bg-transparent dark:md:bg-transparent rounded-2xl md:rounded-none backdrop-blur-sm md:backdrop-blur-none mx-4 md:mx-0">
            <div class="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-white/5 ring-1 ring-gray-200/70 dark:ring-white/10 px-3 py-1">
              <span class="h-1.5 w-1.5 rounded-full bg-brand-primary"></span>
              <span class="text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-dark">Bienvenido a KambiaPe</span>
            </div>

            <h1 class="mt-3 text-[26px] sm:text-[32px] font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white font-lobster">
              Intercambia fácil, seguro y sin comisiones.
            </h1>

            <p class="mt-3 max-w-[60ch] mx-auto md:mx-0 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
              Publica lo que ya no usas y encuentra lo que necesitas en tu comunidad.
              Perfiles verificados, chat directo y reglas claras.
            </p>

            <div class="hidden md:block mt-2 h-[2px] w-56 bg-gradient-to-r from-brand-primary/30 to-brand-dark/30"></div>

            <div class="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3 w-full sm:w-auto">
              <router-link
                to="/publicar"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-primary text-white font-semibold shadow-lg shadow-brand-primary/30 hover:brightness-110 active:scale-95 transition rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/70"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"/>
                </svg>
                Publicar objeto
              </router-link>

              <router-link
                to="/buzon"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/90 dark:bg-white/5 ring-1 ring-gray-200/70 dark:ring-white/10 text-brand-dark font-medium hover:bg-white transition rounded-full"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Buzón
              </router-link>
            </div>

            <ul class="hidden sm:flex mt-5 flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-[12px] text-gray-600 dark:text-gray-400">
              <li class="inline-flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-success"></span> Perfiles verificados</li>
              <li class="inline-flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-accentBlue"></span> Mediación segura</li>
              <li class="inline-flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-brand-primary"></span> 0% comisiones</li>
            </ul>
          </header>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

// --- Lógica para las tarjetas animadas ---
const cards = ref([
  { id: 1, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit:crop&w=1000&q=80', alt: 'Cámara', badge: 'Preferido' },
  { id: 2, img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit:crop&w=1000&q=80', alt: 'Mochila', badge: 'Outdoor' },
  { id: 3, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit:crop&w=1000&q=80', alt: 'Teclado', badge: 'Tech' },
]);
const frontIndex = ref(0);
const autoShuffle = ref(true);
const hovering = ref(false);
let shuffleTimer = null;

const orderedCards = computed(() => {
  const arr = [...cards.value];
  return arr.slice(frontIndex.value).concat(arr.slice(0, frontIndex.value));
});

const shuffle = () => { frontIndex.value = (frontIndex.value + 1) % cards.value.length; };

const positionClass = (pos) => (pos === 0 ? 'z-30 ring-gray-200 shadow-2xl dark:ring-white/10' : pos === 1 ? 'z-20 ring-gray-200 shadow-xl opacity-95 dark:ring-white/10' : 'z-10 ring-gray-200 shadow opacity-85 dark:ring-white/10');

const transformStyle = (pos) => pos === 0 ? { transform: 'translate(-50%, -50%) rotate(0deg) scale(1)' } : pos === 1 ? { transform: 'translate(calc(-50% + 18px), calc(-50% + 10px)) rotate(6deg) scale(0.96)' } : { transform: 'translate(calc(-50% - 18px), calc(-50% + 18px)) rotate(-8deg) scale(0.92)' };

const startShuffleTimer = () => {
  stopShuffleTimer();
  shuffleTimer = setInterval(() => { if (autoShuffle.value) shuffle(); }, hovering.value ? 1800 : 2800);
};

const stopShuffleTimer = () => { if (shuffleTimer) { clearInterval(shuffleTimer); shuffleTimer = null; } };

onMounted(() => {
  startShuffleTimer();
});

onBeforeUnmount(() => {
  stopShuffleTimer();
});

watch([autoShuffle, hovering], () => { startShuffleTimer(); });
// --- Fin de la lógica para las tarjetas animadas ---
</script>

<style scoped>
/* Puedes añadir estilos específicos para HeroSection aquí si es necesario */
</style>
