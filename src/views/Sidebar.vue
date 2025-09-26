<template>
  <aside
    class="fixed left-4 top-1/2 -translate-y-1/2 z-40
           h-auto w-[92px] min-w-[92px]
           flex flex-col items-center py-5 gap-5
           bg-white/60 dark:bg-slate-900/50 backdrop-blur-2xl
           border border-slate-200/50 dark:border-white/5
           shadow-[0_12px_36px_rgba(2,6,23,.1)]
           rounded-[26px] select-none"
    aria-label="Barra lateral"
  >
    <!-- Publicar -->
    <router-link to="/publicar" class="flex flex-col items-center gap-1" title="Publicar">
      <div
        class="h-14 w-14 grid place-items-center rounded-2xl
               bg-gradient-to-br from-[#d7037b] to-[#b80268] text-white
               shadow-[0_14px_34px_rgba(215,3,123,.25)]
               ring-1 ring-white/40 dark:ring-white/10
               transition-transform hover:-translate-y-0.5"
      >
        <svg class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z" clip-rule="evenodd"/>
        </svg>
      </div>
      <span class="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-none">Publicar</span>
    </router-link>

    <!-- Inventario -->
    <router-link to="/my-products" class="flex flex-col items-center gap-1" title="Inventario">
      <div
        class="h-14 w-14 grid place-items-center rounded-2xl
               bg-white/70 dark:bg-white/10
               ring-1 ring-slate-200/70 dark:ring-white/10
               shadow-sm transition-all
               hover:-translate-y-0.5 hover:shadow-md"
      >
        <svg viewBox="0 0 24 24" class="h-7 w-7 text-slate-700 dark:text-slate-200" fill="currentColor">
          <path d="M3 7l9-4 9 4v10l-9 4-9-4V7zm9 2L6 9.5v7l6 2.5 6-2.5v-7L12 9z"/>
        </svg>
      </div>
      <span class="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-none">Inventario</span>
    </router-link>

    <div class="flex-1"></div>

    <!-- Perfil -->
    <router-link to="/profile" class="flex flex-col items-center gap-1" title="Perfil">
      <div
        class="h-14 w-14 grid place-items-center rounded-2xl
               bg-white/70 dark:bg-white/10
               ring-1 ring-slate-200/70 dark:ring-white/10
               shadow-sm transition-all
               hover:-translate-y-0.5 hover:shadow-md overflow-hidden"
      >
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="Avatar"
          class="h-10 w-10 rounded-xl object-cover ring-1 ring-white/50 dark:ring-white/10"
        />
        <svg v-else class="h-7 w-7 text-slate-700 dark:text-slate-200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/>
        </svg>
      </div>
      <span class="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-none">Perfil</span>
    </router-link>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const avatarUrl = computed(() => {
  if (userStore.user && userStore.user.profilePicture) {
    if (userStore.user.profilePicture.startsWith('http') || userStore.user.profilePicture.startsWith('data:') || userStore.user.profilePicture.startsWith('blob:')) {
      return userStore.user.profilePicture
    }
    return `${import.meta.env.VITE_APP_PUBLIC_URL || 'http://localhost:8000'}${userStore.user.profilePicture}`
  }
  const name = encodeURIComponent(userStore.user?.fullName || 'User')
  return `https://ui-avatars.com/api/?name=${name}&background=d7037b&color=fff&rounded=true`
})
</script>

<style scoped>
/* Estado activo */
.router-link-exact-active > div {
  color: #d7037b !important; /* ícono rosa en activo */
  background:
    linear-gradient(#fff, #fff) padding-box,
    linear-gradient(125deg, #d7037b, #b80268) border-box !important;
  border: 2px solid transparent !important;
  box-shadow: 0 16px 36px rgba(215,3,123,.22) !important;
}
:global(.dark) .router-link-exact-active > div {
  color: #d7037b !important; /* ícono rosa también en dark mode */
  border-color: transparent !important;
  box-shadow: 0 18px 40px rgba(215,3,123,.28) !important;
}
/* Texto activo */
.router-link-exact-active span {
  color: #d7037b !important;
}
</style>
