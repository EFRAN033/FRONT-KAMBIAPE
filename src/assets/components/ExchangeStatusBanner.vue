<template>
  <div v-if="banner" :class="banner.bg" class="relative overflow-hidden p-3 text-center text-sm font-medium text-white shadow-lg animate-fade-in-down border-b"
       :style="{'--pattern-url': `url('${banner.pattern}')`}">
    <div class="absolute inset-0 bg-cover bg-center opacity-10" :style="{ backgroundImage: `var(--pattern-url)` }"></div>
    <div class="relative z-10">
      
      <div class="flex items-center justify-center gap-3 mb-2">
        <component :is="banner.icon" class="h-6 w-6" />
        <p class="text-base font-bold tracking-wide">{{ banner.title }}</p>
      </div>
      
      <div v-if="status === 'pending' && (canAcceptOrReject || canCancel)" class="flex justify-center gap-3 mb-3">
        <button v-if="canAcceptOrReject" @click="$emit('accept')" class="btn-primary-accept">
          <CheckIcon class="h-5 w-5" /> Aceptar Propuesta
        </button>
        <button v-if="canAcceptOrReject" @click="$emit('reject')" class="btn-secondary-reject">
          <XMarkIcon class="h-5 w-5" /> Rechazar
        </button>
        <button v-if="canCancel" @click="$emit('cancel')" class="btn-secondary-cancel">
          <NoSymbolIcon class="h-5 w-5" /> Cancelar Propuesta
        </button>
      </div>

      <div v-if="status === 'accepted' && canComplete" class="flex justify-center mb-3">
        <button @click="$emit('complete')" class="btn-primary-complete">
          <StarIcon class="h-5 w-5" /> Marcar como Completado y Valorar
        </button>
      </div>

      <div class="w-full bg-black/20 rounded-full h-1.5 max-w-xs mx-auto">
        <div class="h-1.5 rounded-full transition-all duration-500" :class="progress.barClass" :style="{ width: progress.width }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { CheckIcon, XMarkIcon, NoSymbolIcon, StarIcon, ClockIcon, PaperAirplaneIcon, HandThumbUpIcon } from '@heroicons/vue/24/solid';
import meshPattern from '@/assets/imagenes/patterns/mesh.svg';
import topoPattern from '@/assets/imagenes/patterns/topography.svg';

const props = defineProps({
  status: String,
  canAcceptOrReject: Boolean,
  canCancel: Boolean,
  canComplete: Boolean
});

defineEmits(['accept', 'reject', 'cancel', 'complete']);

const bannerConfig = {
  pending_received: {
    bg: 'from-blue-600 to-blue-800',
    icon: PaperAirplaneIcon,
    title: '¡Propuesta Recibida!',
    pattern: topoPattern
  },
  pending_sent: {
    bg: 'from-slate-600 to-slate-800',
    icon: ClockIcon,
    title: 'Propuesta Enviada',
    pattern: meshPattern
  },
  accepted: {
    bg: 'from-green-600 to-green-800',
    icon: HandThumbUpIcon,
    title: '¡Intercambio Aceptado!',
    pattern: topoPattern
  }
};

const banner = computed(() => {
  if (props.status === 'pending') {
    return props.canAcceptOrReject ? bannerConfig.pending_received : bannerConfig.pending_sent;
  }
  if (props.status === 'accepted') {
    return bannerConfig.accepted;
  }
  return null;
});

const progress = computed(() => {
    switch (props.status) {
        case 'pending': return { width: '33%', barClass: 'bg-blue-400' };
        case 'accepted': return { width: '66%', barClass: 'bg-green-400' };
        case 'completed': return { width: '100%', barClass: 'bg-pink-400' };
        default: return { width: '0%', barClass: 'bg-transparent' };
    }
});
</script>

<style scoped>
/* Estilos para los botones del banner, más únicos y con transiciones */
.btn-primary-accept {
  @apply inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-500 border border-green-400 rounded-md shadow-lg transform transition-all duration-200 hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white;
}
.btn-secondary-reject {
  @apply inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600/80 border border-red-500/50 rounded-md shadow-md backdrop-blur-sm transform transition-all duration-200 hover:bg-red-600 hover:scale-105;
}
.btn-secondary-cancel {
  @apply inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gray-600/80 border border-gray-500/50 rounded-md shadow-md backdrop-blur-sm transform transition-all duration-200 hover:bg-gray-600 hover:scale-105;
}
.btn-primary-complete {
  @apply inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold tracking-wider text-white bg-blue-500 border border-blue-400 rounded-md shadow-lg transform transition-all duration-200 hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white;
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fade-in-down 0.5s ease-out forwards;
}
</style>