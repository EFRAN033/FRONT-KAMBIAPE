<template>
  <transition name="modal-fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" @click.self="$emit('close')">
      <div class="bg-slate-50 rounded-xl shadow-2xl w-full max-w-3xl transform transition-all duration-300 ease-out" @click.stop>
        
        <header class="p-6 border-b border-slate-200">
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-4">
              <img v-if="user.profile_picture" :src="user.profile_picture" alt="Avatar" class="h-16 w-16 rounded-full object-cover ring-4 ring-white shadow-md">
              <div v-else class="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-2xl font-semibold ring-4 ring-white shadow-md">
                {{ user.full_name ? user.full_name.charAt(0).toUpperCase() : '?' }}
              </div>
              <div>
                <h2 class="text-2xl font-bold text-slate-900">{{ user.full_name }}</h2>
                <p class="text-sm text-slate-500">{{ user.email }}</p>
                <span :class="user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                      class="mt-2 px-2 py-0.5 inline-flex text-xs font-semibold rounded-full">
                  {{ user.is_active ? 'Activo' : 'Suspendido' }}
                </span>
              </div>
            </div>
            <button @click="$emit('close')" class="p-2 rounded-full text-slate-400 hover:bg-slate-200 transition-colors">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </header>

        <div class="px-6 border-b border-slate-200">
          <nav class="-mb-px flex space-x-6">
            <button @click="activeTab = 'general'" :class="tabClass('general')">Información General</button>
            <button @click="activeTab = 'activity'" :class="tabClass('activity')">Actividad Reciente</button>
            <button @click="activeTab = 'products'" :class="tabClass('products')">Productos</button>
          </nav>
        </div>

        <main class="p-6 bg-white max-h-[60vh] overflow-y-auto">
          <div v-if="activeTab === 'general'">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-slate-50 p-4 rounded-lg">
                <h3 class="font-semibold text-slate-800 mb-3">Detalles de Contacto</h3>
                <ul class="space-y-2 text-sm">
                  <li class="flex items-center"><svg class="h-5 w-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> <span class="text-slate-600">{{ user.email }}</span></li>
                  <li class="flex items-center"><svg class="h-5 w-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> <span class="text-slate-600">{{ user.phone || 'No especificado' }}</span></li>
                  <li class="flex items-center"><svg class="h-5 w-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg><span class="text-slate-600">{{ user.location || 'No especificada' }}</span></li>
                </ul>
              </div>
              <div class="bg-slate-50 p-4 rounded-lg">
                <h3 class="font-semibold text-slate-800 mb-3">Estadísticas</h3>
                 <ul class="space-y-2 text-sm">
                  <li class="flex items-center"><svg class="h-5 w-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg> <span class="text-slate-600"><strong>{{ user.products_count || 0 }}</strong> Productos Publicados</span></li>
                  <li class="flex items-center"><svg class="h-5 w-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg> <span class="text-slate-600"><strong>{{ user.exchanges_count || 0 }}</strong> Intercambios</span></li>
                  <li class="flex items-center"><svg class="h-5 w-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.52 4.674c.3.921-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.52-4.674a1 1 0 00-.363-1.118L2.98 9.82c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.95-.69L11.049 2.927z" /></svg> <span class="text-slate-600"><strong>{{ user.reputation || 'N/A' }}</strong> de Reputación</span></li>
                </ul>
              </div>
              <div class="bg-slate-50 p-4 rounded-lg md:col-span-2">
                <h3 class="font-semibold text-slate-800 mb-3">Información de la Cuenta</h3>
                 <ul class="space-y-2 text-sm">
                  <li class="flex items-center"><svg class="h-5 w-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> <span class="text-slate-600">Miembro desde: {{ formatDateTime(user.created_at) }}</span></li>
                  <li class="flex items-center"><svg class="h-5 w-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> <span class="text-slate-600">Última conexión: {{ formatDateTime(user.last_login) }}</span></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div v-if="activeTab === 'activity'">
            <p class="text-center text-slate-500 py-10">La sección de actividad reciente estará disponible próximamente.</p>
          </div>

          <div v-if="activeTab === 'products'">
             <p class="text-center text-slate-500 py-10">La galería de productos estará disponible próximamente.</p>
          </div>
        </main>

        <footer class="p-4 bg-slate-50 border-t border-slate-200 rounded-b-xl flex justify-end">
          <button @click="$emit('close')" class="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 transition-colors">Cerrar</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  }
});

const activeTab = ref('general');

const tabClass = (tabName) => {
  return [
    'py-3 px-1 border-b-2 font-semibold text-sm transition-colors',
    activeTab.value === tabName
      ? 'border-indigo-500 text-indigo-600'
      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
  ];
};

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return 'N/A';
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleDateString('es-ES', { ...options, timeZone: 'UTC' });
  } catch (e) {
    return "Fecha inválida";
  }
};
</script>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .transform,
.modal-fade-leave-active .transform {
    transition: transform 0.3s ease;
}
.modal-fade-enter-from .transform,
.modal-fade-leave-to .transform {
    transform: scale(0.95);
}
</style>