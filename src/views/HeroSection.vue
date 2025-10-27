<template>
  <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 antialiased">
    <section class="relative bg-gradient-to-br from-gray-50 via-white to-pink-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-pink-950/10 rounded-3xl ring-1 ring-gray-200/50 dark:ring-gray-700/50 overflow-hidden shadow-xl">
      
      <div aria-hidden="true" class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/2 -top-28 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-primary/20 to-brand-dark/20 blur-3xl animate-pulse-slow"></div>
        <div class="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-400/10 blur-3xl"></div>
        <div class="absolute inset-0 opacity-[0.08] dark:opacity-[0.15]"
             style="background-image: radial-gradient(circle at 1px 1px, #a6045d 1px, transparent 1px);
                    background-size: 28px 28px;"></div>
      </div>

      <div class="relative mx-auto max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-12 md:gap-8 lg:gap-14 md:items-center">
          
          <aside class="md:col-span-5 lg:col-span-5 h-80 md:h-auto -mt-4 md:mt-0 pointer-events-none md:pointer-events-auto">
            <div class="relative w-full h-full flex items-center justify-center group select-none pointer-events-auto"
                 @mouseenter="hovering = true"
                 @mouseleave="hovering = false"
                 @mousemove="handleMouseMove">
              
              <svg class="absolute -z-10 left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 opacity-40" viewBox="0 0 200 200" fill="none">
                <defs>
                  <radialGradient id="ringGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(100)">
                    <stop offset="0" stop-color="#d7037b" stop-opacity="0.7"/>
                    <stop offset="1" stop-color="#a6045d" stop-opacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="92" stroke="url(#ringGrad)" stroke-width="1.6" class="animate-spin-very-slow"/>
              </svg>

              <div class="relative h-[23rem] w-full scale-[0.7] md:scale-90 lg:scale-100 perspective-1000">
                <div
                  v-for="(card, i) in orderedCards"
                  :key="card.id"
                  :class="[
                    'absolute left-1/2 top-1/2 h-[18rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden transition-all duration-700 ease-out cursor-pointer',
                    'bg-white/50 backdrop-blur-md dark:bg-white/10 shadow-2xl ring-1',
                    positionClass(i)
                  ]"
                  :style="transformStyle(i)"
                  @click="shuffle()"
                >
                  <img :src="card.img" :alt="card.alt" class="h-full w-full object-cover" />
                  
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  <div class="pointer-events-none absolute inset-0 overflow-hidden">
                    <div class="absolute -left-1/3 top-0 h-full w-1/2 bg-gradient-to-r from-white/40 to-transparent opacity-0 group-hover:opacity-60 transition-all duration-700 translate-x-[-120%] group-hover:translate-x-[200%]"></div>
                  </div>
                  
                  <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                    <span class="text-white text-sm font-bold drop-shadow-lg">{{ card.alt }}</span>
                    <span class="px-2.5 py-1 text-[10px] font-bold rounded-full bg-gradient-to-r from-brand-primary to-brand-dark text-white shadow-lg">
                      {{ card.badge }}
                    </span>
                  </div>
                  
                  <div class="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/20 backdrop-blur-xl px-3 py-1.5 text-[10px] font-bold text-white border border-white/20">
                    <span class="relative flex h-2 w-2">
                      <span v-if="i === 0" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Disponible
                  </div>


                </div>
              </div>
            </div>
          </aside>

          <header class="md:col-span-7 lg:col-span-7 text-center md:text-left flex flex-col items-center md:items-start px-6 pb-6 md:py-12 md:pl-6 md:pr-0 lg:pl-8 relative z-10 -mt-24 md:mt-0 md:bg-transparent dark:md:bg-transparent rounded-2xl md:rounded-none mx-4 md:mx-0">
            
            <div class="relative group/badge cursor-default">
              <div class="absolute inset-0 bg-brand-primary/20 rounded-full blur-md opacity-0 group-hover/badge:opacity-100 transition-opacity"></div>
              <div class="relative inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-white/10 ring-1 ring-gray-200/70 dark:ring-white/20 px-4 py-2 shadow-lg">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                </span>
                <span class="text-[11px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-brand-primary to-brand-dark bg-clip-text text-transparent">
                  Bienvenido a KambiaPe
                </span>
              </div>
            </div>

            <h1 class="mt-4 text-[28px] sm:text-[36px] font-black leading-[1.05] tracking-tight">
              <span class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                Intercambia fácil, seguro
              </span>
              <br />
              <span class="bg-gradient-to-r from-brand-primary via-pink-600 to-brand-dark bg-clip-text text-transparent animate-gradient">
                y sin comisiones
              </span>
            </h1>

            <p class="mt-4 max-w-[60ch] mx-auto md:mx-0 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
              Publica lo que ya no usas y encuentra lo que necesitas en tu comunidad.
              <span class="font-semibold text-gray-900 dark:text-white">Perfiles verificados, chat directo y reglas claras.</span>
            </p>

            <div class="hidden md:block mt-3 h-[3px] w-48 bg-gradient-to-r from-brand-primary/40 via-pink-500/40 to-transparent rounded-full"></div>

            <div class="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3 w-full sm:w-auto">
              <router-link
                to="/publicar"
                class="group/btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-primary to-brand-dark text-white font-bold shadow-xl shadow-brand-primary/30 hover:shadow-2xl hover:shadow-brand-primary/40 active:scale-95 transition-all rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/70 relative overflow-hidden"
              >
                <span class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
                <svg class="h-5 w-5 relative z-10 group-hover/btn:rotate-90 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"/>
                </svg>
                <span class="relative z-10">Publicar objeto</span>
              </router-link>

              <router-link
                to="/buzon"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/90 dark:bg-white/5 ring-1 ring-gray-200/70 dark:ring-white/10 text-gray-900 dark:text-white font-semibold hover:bg-white dark:hover:bg-white/10 hover:ring-gray-300 dark:hover:ring-white/20 transition-all rounded-full backdrop-blur-sm"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Buzón
              </router-link>
            </div>


          </header>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const cards = ref([
  { id: 1, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80', alt: 'Cámara', badge: 'Destacado' },
  { id: 2, img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80', alt: 'Mochila', badge: 'Outdoor' },
  { id: 3, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80', alt: 'Teclado', badge: 'Gaming' },
]);

const frontIndex = ref(0);
const autoShuffle = ref(true);
const hovering = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);
let shuffleTimer = null;

const orderedCards = computed(() => {
  const arr = [...cards.value];
  return arr.slice(frontIndex.value).concat(arr.slice(0, frontIndex.value));
});

const shuffle = () => {
  frontIndex.value = (frontIndex.value + 1) % cards.value.length;
};

const positionClass = (pos) => {
  if (pos === 0) return 'z-30';
  if (pos === 1) return 'z-20 opacity-90';
  return 'z-10 opacity-75';
};

const transformStyle = (pos) => {
  const parallaxX = hovering.value ? (mouseX.value - 0.5) * 8 : 0;
  const parallaxY = hovering.value ? (mouseY.value - 0.5) * 8 : 0;
  
  if (pos === 0) {
    return {
      transform: `translate(-50%, -50%) rotateY(${parallaxX * 0.3}deg) rotateX(${-parallaxY * 0.3}deg) scale(1)`
    };
  }
  if (pos === 1) {
    return {
      transform: `translate(calc(-50% + 18px), calc(-50% + 10px)) rotateY(${parallaxX * 0.2}deg) rotateX(${-parallaxY * 0.2}deg) rotate(6deg) scale(0.96)`
    };
  }
  return {
    transform: `translate(calc(-50% - 18px), calc(-50% + 18px)) rotateY(${parallaxX * 0.1}deg) rotateX(${-parallaxY * 0.1}deg) rotate(-8deg) scale(0.92)`
  };
};

const handleMouseMove = (e) => {
  if (!hovering.value) return;
  const rect = e.currentTarget.getBoundingClientRect();
  mouseX.value = (e.clientX - rect.left) / rect.width;
  mouseY.value = (e.clientY - rect.top) / rect.height;
};

const startShuffleTimer = () => {
  stopShuffleTimer();
  shuffleTimer = setInterval(() => {
    if (autoShuffle.value) shuffle();
  }, hovering.value ? 2000 : 3500);
};

const stopShuffleTimer = () => {
  if (shuffleTimer) {
    clearInterval(shuffleTimer);
    shuffleTimer = null;
  }
};

onMounted(() => {
  startShuffleTimer();
});

onBeforeUnmount(() => {
  stopShuffleTimer();
});

watch([autoShuffle, hovering], () => {
  startShuffleTimer();
});
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

@keyframes spin-very-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-very-slow {
  animation: spin-very-slow 30s linear infinite;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.3; }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 3s ease-in-out 1s infinite;
}

.animate-float-slow {
  animation: float 4s ease-in-out 2s infinite;
}
</style>