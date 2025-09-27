<template>
  <header class="bg-gradient-to-r from-[#d7037b] to-[#9e0154] shadow-lg sticky top-0 z-50 border-b border-white/10 backdrop-blur-sm">
    <div class="container mx-auto px-4 sm:px-6 py-3">
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="flex items-center group focus-visible:outline-none focus-visible:ring-0"
          aria-label="KambiaPe - Inicio"
        >
        <span class="text-2xl font-bold text-white font-lobster">
            Kambia<span class="font-extrabold">Pe</span>
          </span>
        </router-link>

        <nav class="hidden lg:flex items-center space-x-1">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 relative group"
            :class="{
              'text-white bg-white/10': $route.path === link.path,
              'text-white/90 hover:text-white hover:bg-white/10': $route.path !== link.path
            }"
          >
            <span class="flex items-center">
              <component :is="link.icon" class="h-4 w-4 mr-2 text-white/90" />
              {{ link.label }}
              <span
                v-if="link.badge"
                :class="link.badge.class"
                class="ml-1.5 px-1.5 py-0.5 text-xs font-bold rounded-full"
              >
                {{ link.badge.text }}
              </span>
            </span>
            <span
              class="absolute left-1/2 -bottom-1 h-0.5 bg-white transition-all duration-300"
              :class="{
                'w-4/5 left-[10%]': $route.path === link.path,
                'w-0 group-hover:w-4/5 group-hover:left-[10%]': $route.path !== link.path
              }"
            ></span>
          </router-link>
        </nav>

        <div class="hidden lg:flex items-center space-x-4">
          <div class="relative">
            <button
              @click="toggleSearch"
              class="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Buscar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <div
              v-show="searchOpen"
              class="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden"
              @click.stop
            >
              <div class="relative">
                <input
                  type="text"
                  placeholder="Buscar en KambiaPe..."
                  class="w-full pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                  v-model="searchQuery"
                  @keyup.enter="performSearch"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="relative">
            <template v-if="userStore.isLoggedIn">
              <button
                @click="toggleUserMenu"
                class="flex items-center space-x-2 focus:outline-none"
                aria-label="Menú de usuario"
              >
                <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                  <img 
                    v-if="userStore.user.profilePicture"
                    :src="userStore.user.profilePicture" 
                    alt="Foto de perfil" 
                    class="w-full h-full object-cover"
                  >
                  <span v-else class="text-sm font-medium text-white">{{ userStore.userInitials }}</span>
                </div>
                <span class="text-white text-sm font-medium hidden md:inline">{{ userStore.userFirstName }}</span>
              </button>

              <transition
                enter-active-class="transition duration-100 ease-out"
                leave-active-class="transition duration-75 ease-in"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div
                  v-show="userMenuOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  @click.stop
                >
                  <router-link
                    to="/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="userMenuOpen = false"
                  >
                    Mi perfil
                  </router-link>
                  <router-link
                    to="/settings"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="userMenuOpen = false"
                  >
                    Configuración
                  </router-link>
                  <button
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </transition>
            </template>
            <template v-else>
              <router-link
                to="/login"
                class="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                Iniciar sesión
              </router-link>
              <router-link
                to="/register"
                class="px-4 py-2 ml-4 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                Registrarse
              </router-link>
            </template>
          </div>
        </div>

        <div class="lg:hidden flex items-center space-x-4">
          <button
            @click="toggleSearch"
            class="text-white p-2 focus:outline-none"
            aria-label="Buscar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            @click="toggleMenu"
            class="text-white p-2 focus:outline-none transition-transform duration-200 active:scale-90"
            :aria-expanded="menuOpen"
            aria-label="Menú"
          >
            <div class="w-6 flex flex-col items-end space-y-1.5">
              <span class="block h-0.5 w-6 bg-white transition-all duration-300" :class="{'transform rotate-45 translate-y-2': menuOpen}"></span>
              <span class="block h-0.5 bg-white transition-all duration-300" :class="{'w-3': !menuOpen, 'w-6 opacity-0': menuOpen}"></span>
              <span class="block h-0.5 w-6 bg-white transition-all duration-300" :class="{'transform -rotate-45 -translate-y-2': menuOpen}"></span>
            </div>
          </button>
        </div>
      </div>

      <div v-show="searchOpen" class="lg:hidden mt-3">
        <div class="relative">
          <input
            type="text"
            placeholder="Buscar en KambiaPe..."
            class="w-full pl-10 pr-4 py-3 text-sm rounded-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
            v-model="searchQuery"
            @keyup.enter="performSearch"
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/60 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-150 ease-in"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-from-class="transform translate-y-0 opacity-0"
    >
      <div v-show="menuOpen" class="lg:hidden bg-white shadow-xl" @click.stop>
        <div class="container mx-auto px-4 py-4">
          <nav class="flex flex-col space-y-2">
            <router-link
              v-for="link in navLinks"
              :key="`mobile-${link.path}`"
              :to="link.path"
              @click="menuOpen = false"
              class="px-4 py-3 text-base font-medium text-gray-800 hover:bg-[#fce4ec] rounded-lg transition-colors duration-200 flex items-center"
              :class="{'bg-[#fce4ec] text-[#d7037b]': $route.path === link.path}"
            >
              <component :is="link.icon" class="h-5 w-5 mr-3 text-[#d7037b]" />
              {{ link.label }}
              <span
                v-if="link.badge"
                :class="link.badge.class"
                class="ml-auto px-2 py-0.5 text-xs font-bold rounded-full"
              >
                {{ link.badge.text }}
              </span>
            </router-link>
          </nav>

          <div class="mt-4 pt-4 border-t border-gray-200">
            <template v-if="userStore.isLoggedIn">
              <router-link
                to="/profile"
                class="block px-4 py-3 text-base font-medium text-gray-800 hover:bg-[#fce4ec] rounded-lg transition-colors flex items-center"
                @click="menuOpen = false"
              >
                <UserIcon class="h-5 w-5 mr-3 text-[#d7037b]" />
                Mi perfil
              </router-link>
              <router-link
                to="/settings"
                class="block px-4 py-3 text-base font-medium text-gray-800 hover:bg-[#fce4ec] rounded-lg transition-colors flex items-center"
                @click="menuOpen = false"
              >
                <Cog6ToothIcon class="h-5 w-5 mr-3 text-[#d7037b]" /> Configuración
              </router-link>
              <button
                @click="logout"
                class="block w-full text-left px-4 py-3 text-base font-medium text-gray-800 hover:bg-[#fce4ec] rounded-lg transition-colors flex items-center"
              >
                <PowerIcon class="h-5 w-5 mr-3 text-[#d7037b]" />
                Cerrar sesión
              </button>
            </template>
            <template v-else>
              <router-link
                to="/login"
                class="block text-center px-4 py-3 text-base font-medium text-[#d7037b] hover:bg-[#fce4ec] rounded-lg transition-colors mb-2"
                @click="menuOpen = false"
              >
                Iniciar sesión
              </router-link>
              <router-link
                to="/register"
                class="block text-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-[#d7037b] to-[#9e0154] rounded-lg shadow-sm hover:shadow transition-all"
                @click="menuOpen = false"
              >
                Registrarse
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

// Importa los íconos necesarios de Heroicons
import {
  HomeIcon,
  UserGroupIcon as AboutIcon,
  PlusCircleIcon as PostIcon,
  InboxIcon as InboxIcon,
  UserIcon,
  PowerIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const menuOpen = ref(false);
const searchOpen = ref(false);
const userMenuOpen = ref(false);
const searchQuery = ref('');

// Definición de los enlaces de navegación
const navLinks = [
  {
    path: '/',
    label: 'Inicio',
    icon: HomeIcon
  },
  {
    path: '/nosotros',
    label: 'Nosotros',
    icon: AboutIcon
  },
  {
    path: '/publicar',
    label: 'Publicar',
    icon: PostIcon
  },
  {
    path: '/buzon',
    label: 'Buzón',
    icon: InboxIcon,
    badge: {
      text: '3',
      class: 'bg-white text-[#d7037b]'
    }
  }
];

// Propiedad computada para las iniciales del usuario (usa el getter del store)
const userInitials = computed(() => userStore.userInitials);
const userFirstName = computed(() => userStore.userFirstName);

// Métodos para alternar la visibilidad de los menús
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  if (menuOpen.value) {
    searchOpen.value = false;
    userMenuOpen.value = false;
  }
};

const toggleSearch = () => {
  searchOpen.value = !searchOpen.value;
  if (searchOpen.value) {
    menuOpen.value = false;
    userMenuOpen.value = false;
  }
};

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value;
  if (userMenuOpen.value) {
    menuOpen.value = false;
    searchOpen.value = false;
  }
};

const performSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Buscando:', searchQuery.value);
    searchOpen.value = false;
    searchQuery.value = '';
  }
};

const logout = () => {
  console.log('Cerrando sesión...');
  userStore.clearUser();
  menuOpen.value = false;
  userMenuOpen.value = false;
  router.push('/login');
};

// Lógica para cerrar menús al hacer clic fuera de la cabecera
const handleClickOutside = (event) => {
  const headerElement = document.querySelector('header');
  if (headerElement && !headerElement.contains(event.target)) {
    menuOpen.value = false;
    searchOpen.value = false;
    userMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Transiciones suaves para elementos interactivos */
button, a, .router-link {
  transition: all 0.2s ease;
}

/* Ajuste del contorno de foco general para accesibilidad */
:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

/* ANULACIÓN ESPECÍFICA PARA EL LOGO KAMBIAPE */
.router-link[aria-label="KambiaPe - Inicio"].router-link-active,
.router-link[aria-label="KambiaPe - Inicio"].router-link-exact-active {
    background-color: transparent !important;
    color: white !important;
}

.router-link[aria-label="KambiaPe - Inicio"] .text-white {
    color: white !important;
}

/* Estilos para los enlaces de navegación (NO el logo) cuando están activos */
.px-4.py-2.5.text-sm.font-medium.rounded-lg.router-link-active {
    @apply text-white bg-white/10;
}

/* Estilos para los enlaces del menú móvil (NO el logo) cuando están activos */
.px-4.py-3.text-base.font-medium.text-gray-800.router-link-active {
    @apply bg-[#fce4ec] text-[#d7037b];
}

/* Animación para el botón del menú móvil (hamburguesa) */
.hamburger-line {
  transition: all 0.3s ease;
}

/* Mejores efectos hover para la navegación de escritorio (aplicados a los NavLinks, no al logo) */
.router-link:hover {
  transform: translateY(-1px);
}

/* Sombra del menú desplegable de usuario */
.user-menu {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>