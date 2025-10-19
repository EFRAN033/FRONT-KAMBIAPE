<template>
  <aside
    class="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-40
           h-auto w-[92px] min-w-[92px]
           flex-col items-center py-5 gap-5
           bg-white/60 dark:bg-slate-900/50 backdrop-blur-2xl
           border border-slate-200/50 dark:border-white/5
           shadow-[0_12px_36px_rgba(2,6,23,.1)]
           rounded-[26px] select-none"
    aria-label="Barra lateral de escritorio"
  >
    <router-link to="/publicar" class="flex flex-col items-center gap-1" title="Publicar">
      <div class="h-14 w-14 grid place-items-center rounded-2xl bg-gradient-to-br from-[#d7037b] to-[#b80268] text-white shadow-[0_14px_34px_rgba(215,3,123,.25)] ring-1 ring-white/40 dark:ring-white/10 transition-transform hover:-translate-y-0.5">
        <svg class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z" clip-rule="evenodd"/></svg>
      </div>
      <span class="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-none">Publicar</span>
    </router-link>
    <router-link to="/my-products" class="flex flex-col items-center gap-1" title="Inventario">
      <div class="h-14 w-14 grid place-items-center rounded-2xl bg-white/70 dark:bg-white/10 ring-1 ring-slate-200/70 dark:ring-white/10 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
        <svg viewBox="0 0 24 24" class="h-7 w-7 text-slate-700 dark:text-slate-200" fill="currentColor"><path d="M3 7l9-4 9 4v10l-9 4-9-4V7zm9 2L6 9.5v7l6 2.5 6-2.5v-7L12 9z"/></svg>
      </div>
      <span class="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-none">Inventario</span>
    </router-link>
    <div class="flex-1"></div>
    <router-link to="/profile" class="flex flex-col items-center gap-1" title="Perfil">
      <div class="h-14 w-14 grid place-items-center rounded-2xl bg-white/70 dark:bg-white/10 ring-1 ring-slate-200/70 dark:ring-white/10 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md overflow-hidden">
        <img v-if="avatarUrl" :src="avatarUrl" alt="Avatar" class="h-10 w-10 rounded-xl object-cover ring-1 ring-white/50 dark:ring-white/10"/>
        <svg v-else class="h-7 w-7 text-slate-700 dark:text-slate-200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/></svg>
      </div>
      <span class="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-none">Perfil</span>
    </router-link>
  </aside>

  <aside
    class="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40
           w-auto h-auto
           flex flex-row items-center justify-center gap-x-2 p-2
           bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl
           border border-slate-200/50 dark:border-white/10
           rounded-full
           shadow-xl shadow-black/10"
    aria-label="Barra de navegación móvil"
  >
    <div class="indicator-bg" :style="indicatorStyle"></div>

    <router-link
      v-for="(item, index) in navItems"
      :ref="el => { if (el) itemRefs[index] = el }"
      :key="item.path"
      :to="item.path"
      class="nav-item"
      :title="item.label"
      @click="activeIndex = index"
    >
      <div class="icon-wrapper">
        <img
          v-if="item.label === 'Perfil' && avatarUrl"
          :src="avatarUrl"
          alt="Avatar"
          class="h-full w-full object-cover rounded-full"
        />
        <svg v-else :viewBox="item.viewBox" class="icon-svg" fill="currentColor">
          <path :d="item.iconPath" :fill-rule="item.fillRule" :clip-rule="item.clipRule"/>
        </svg>
      </div>
      <span class="nav-text">
        {{ item.label }}
      </span>
    </router-link>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const avatarUrl = computed(() => userStore.user?.profilePicture)
const route = useRoute()

const navItems = ref([
  { path: '/publicar', label: 'Publicar', iconPath: 'M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z', viewBox: '0 0 20 20', fillRule: 'evenodd', clipRule: 'evenodd' },
  { path: '/my-products', label: 'Inventario', iconPath: 'M3 7l9-4 9 4v10l-9 4-9-4V7zm9 2L6 9.5v7l6 2.5 6-2.5v-7L12 9z', viewBox: '0 0 24 24' },
  { path: '/profile', label: 'Perfil', iconPath: 'M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z', viewBox: '0 0 24 24' }
])

const activeIndex = ref(0)
const itemRefs = ref([])
const indicatorStyle = ref({})

const updateIndicator = () => {
  const activeItem = itemRefs.value[activeIndex.value];
  if (activeItem && activeItem.$el) {
    indicatorStyle.value = {
      width: `${activeItem.$el.offsetWidth}px`,
      transform: `translateX(${activeItem.$el.offsetLeft}px)`
    };
  }
}

watch(route, (newRoute) => {
  const index = navItems.value.findIndex(item => newRoute.path.startsWith(item.path));
  if (index !== -1) {
    activeIndex.value = index;
  }
}, { immediate: true });

watch(activeIndex, () => {
  nextTick(updateIndicator);
});

onMounted(() => {
  setTimeout(() => nextTick(updateIndicator), 100);
  window.addEventListener('resize', updateIndicator);
});
</script>

<style scoped>
/* ESTILOS ORIGINALES PARA ESCRITORIO */
@media (min-width: 1024px) {
  .router-link-exact-active > div {
    color: #d7037b !important;
    background:
      linear-gradient(#fff, #fff) padding-box,
      linear-gradient(125deg, #d7037b, #b80268) border-box !important;
    border: 2px solid transparent !important;
    box-shadow: 0 16px 36px rgba(215,3,123,.22) !important;
  }
  :global(.dark) .router-link-exact-active > div {
    color: #d7037b !important;
    border-color: transparent !important;
    box-shadow: 0 18px 40px rgba(215,3,123,.28) !important;
  }
  .router-link-exact-active span {
    color: #d7037b !important;
  }
}

/* --- ESTILOS OPTIMIZADOS PARA BARRA MÓVIL --- */
@media (max-width: 1023px) {
  .nav-item {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 9999px;
    cursor: pointer;
    color: #475569;
    will-change: color;
    transition: color 0.3s ease-in-out;
  }
  :global(.dark) .nav-item {
    color: #94a3b8;
  }
  
  .icon-wrapper {
    width: 24px;
    height: 24px;
    margin-right: 0;
    will-change: margin-right;
    /* Transición sincronizada con el efecto resorte del indicador */
    transition: margin-right 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .icon-svg {
    width: 100%;
    height: 100%;
  }

  .nav-text {
    font-size: 13px;
    font-weight: 500;
    line-height: 1;
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    white-space: nowrap;
    will-change: max-width, opacity;
    /* Transición escalonada: el ancho sigue el efecto resorte, la opacidad aparece después */
    transition: max-width 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55),
                opacity 0.3s ease-in-out 0.1s;
  }
  
  /* ESTADO ACTIVO */
  .router-link-exact-active {
    color: #fff !important;
  }
  .router-link-exact-active .icon-wrapper {
    margin-right: 8px;
  }
  .router-link-exact-active .nav-text {
    max-width: 100px;
    opacity: 1;
  }

  /* INDICADOR DE FONDO */
  .indicator-bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-image: linear-gradient(135deg, #d7037b, #b80268);
    border-radius: 9999px;
    box-shadow: 0 6px 16px rgba(215, 3, 123, .3);
    will-change: transform, width;
    /* Duración aumentada y curva 'spring' para un movimiento ultra fluido */
    transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55),
                width 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 5;
  }
}
</style>