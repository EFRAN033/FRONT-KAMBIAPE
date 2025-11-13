<template>
  <div class="min-h-screen font-sans antialiased bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100">
    <div aria-hidden="true" class="aurora -z-10"></div>

    <header class="brand-header shadow-md sticky top-0 z-50 border-b border-white/10 backdrop-blur-sm">
      <div class="container mx-auto px-4 sm:px-6 py-3 sm:py-3.5">
        <div class="flex items-center justify-between relative">
          <button @click="goBack" class="icon-btn" aria-label="Volver atrás">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          <h2 class="absolute left-1/2 -translate-x-1/2 text-base sm:text-lg font-bold text-white font-lobster">
            Kambia<span class="font-extrabold">Pe</span>
            <span class="font-sans font-semibold text-sm block text-center -mt-1 opacity-90">Configuración</span>
          </h2>
        </div>
      </div>
    </header>

    <main class="container mx-auto max-w-2xl px-4 sm:px-6 py-8">
      <div class="flex flex-col space-y-8">
        
        <section v-for="section in sections" :key="section.name" class="setting-section">
          <h3 class="section-title">{{ section.name }}</h3>
          <div class="section-items">
            <a v-for="item in section.items" :key="item.id" :href="item.href" class="item-link" @click="handleItemClick(item)">
              <div class="item-icon" :class="item.color">
                <component :is="item.icon" class="h-5 w-5" />
              </div>
              <span class="item-label">{{ item.label }}</span>
              
              <div v-if="item.isToggle" class="ml-auto" @click.prevent.stop="toggleTheme">
                <div class="switch">
                  <input type="checkbox" :checked="isDarkMode" class="sr-only" />
                  <span class="slider round"></span>
                </div>
              </div>
              <ChevronRightIcon v-else class="item-chevron" />
            </a>
          </div>
        </section>

      </div>

      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
        <h3 class="section-title text-red-600 dark:text-red-500">Zona de Peligro</h3>
        <div class="section-items mt-4">
          <button @click="confirmDeleteAccount" class="item-link w-full !text-red-600 dark:!text-red-500 hover:!bg-red-50 dark:hover:!bg-red-900/20">
            <div class="item-icon text-red-500">
              <TrashIcon class="h-5 w-5" />
            </div>
            <span class="item-label">Eliminar mi cuenta</span>
            <ChevronRightIcon class="item-chevron" />
          </button>
        </div>
        <p class="mt-3 text-xs text-gray-500 dark:text-slate-400 px-2">
          Esta acción es permanente y eliminará todos tus datos, publicaciones e intercambios.
        </p>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { 
  UserCircleIcon, ShieldCheckIcon, LockClosedIcon, 
  CreditCardIcon, BellIcon, SunIcon, MoonIcon, 
  QuestionMarkCircleIcon, TrashIcon, StarIcon, DocumentTextIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();

// --- Estado del Tema (Modo Oscuro) ---
// (Simulado, idealmente esto vendría de un store o localStorage)
const isDarkMode = ref(document.documentElement.classList.contains('dark'));

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

// --- Definición de Secciones ---
const sections = ref([
  {
    name: 'Cuenta',
    items: [
      { id: 'profile', label: 'Editar perfil', icon: UserCircleIcon, color: 'text-sky-500', href: '/profile' },
      { id: 'security', label: 'Seguridad y Contraseña', icon: ShieldCheckIcon, color: 'text-red-500', href: '#' },
      { id: 'privacy', label: 'Privacidad', icon: LockClosedIcon, color: 'text-gray-500', href: '#' },
    ]
  },
  // { <-- SECCIÓN DE FACTURACIÓN ELIMINADA -->
  //   name: 'Facturación',
  //   items: [
  //     { id: 'payment', label: 'Método de pago', icon: CreditCardIcon, color: 'text-indigo-500', href: '#' },
  //   ]
  // },
  {
    name: 'Aplicación',
    items: [
      { id: 'notifications', label: 'Notificaciones', icon: BellIcon, color: 'text-pink-500', href: '#' },
      { id: 'theme', label: 'Tema (Modo Oscuro)', icon: isDarkMode.value ? MoonIcon : SunIcon, color: 'text-blue-500', href: '#', isToggle: true },
      { id: 'help', label: 'Ayuda y Soporte', icon: QuestionMarkCircleIcon, color: 'text-gray-500', href: '#' },
    ]
  }
]);

// --- Navegación ---
const goBack = () => {
  router.back();
};

const handleItemClick = (item) => {
  if (item.isToggle) {
    toggleTheme();
    // Actualizar el ícono (opcional pero bueno para UX)
    const themeItem = sections.value.find(s => s.name === 'Aplicación').items.find(i => i.id === 'theme');
    if (themeItem) {
      themeItem.icon = isDarkMode.value ? MoonIcon : SunIcon;
    }
    return;
  }
  
  if (item.href && item.href !== '#') {
    router.push(item.href);
  } else if (item.href === '#') {
    // Lógica para items no implementados
    console.warn(`Navegación para "${item.label}" no implementada.`);
  }
};

// --- Acciones Peligrosas ---
const confirmDeleteAccount = () => {
  // Lógica de confirmación (ej. abrir un modal)
  alert('Acción de eliminar cuenta no implementada. (Se necesita un modal de confirmación)');
};

</script>

<style scoped>
/* Aurora Background */
.aurora {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100vh;
  background-image: radial-gradient(at 20% 20%, hsla(330, 70%, 50%, 0.2) 0px, transparent 50%),
                    radial-gradient(at 80% 10%, hsla(290, 60%, 50%, 0.2) 0px, transparent 50%),
                    radial-gradient(at 80% 80%, hsla(190, 70%, 50%, 0.1) 0px, transparent 50%);
}
.dark .aurora {
  background-image: radial-gradient(at 20% 20%, hsla(330, 70%, 50%, 0.25) 0px, transparent 50%),
                    radial-gradient(at 80% 10%, hsla(290, 60%, 50%, 0.25) 0px, transparent 50%),
                    radial-gradient(at 80% 80%, hsla(190, 70%, 50%, 0.2) 0px, transparent 50%);
}

/* Header */
.brand-header {
  background-color: hsla(326, 97%, 43%, 0.8); /* fallback */
  background-image: linear-gradient(to right, hsla(326, 97%, 43%, 0.8), hsla(328, 98%, 30%, 0.8));
}
.dark .brand-header {
  background-color: hsla(326, 97%, 43%, 0.8);
  background-image: linear-gradient(to right, hsla(326, 97%, 43%, 0.8), hsla(328, 98%, 30%, 0.8));
}
.icon-btn {
  @apply p-1.5 rounded-full text-white transition-colors duration-200;
  @apply hover:bg-white/10 active:bg-white/20;
  @apply focus:outline-none focus:ring-2 focus:ring-white/50;
}

/* Estilos de Sección */
.setting-section {
  @apply w-full;
}
.section-title {
  @apply px-2 text-sm font-semibold text-gray-500 dark:text-slate-400 mb-2;
}
.section-items {
  @apply bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200/50 dark:border-slate-700/50 overflow-hidden;
}

/* Estilos de Item */
.item-link {
  @apply flex items-center w-full px-4 py-3.5;
  @apply text-sm font-medium text-gray-800 dark:text-slate-200;
  @apply transition-colors duration-150;
  @apply border-b border-gray-100 dark:border-slate-700/50;
}
.item-link:last-child {
  @apply border-b-0;
}
.item-link:hover {
  @apply bg-gray-50/50 dark:bg-slate-700/50;
}
.item-icon {
  @apply flex items-center justify-center w-7 h-7 rounded-lg mr-4;
  /* El color de fondo y texto se aplica con clases de Tailwind (item.color) */
  @apply bg-opacity-10 dark:bg-opacity-20;
}
.item-label {
  @apply flex-1;
}
.item-chevron {
  @apply h-4 w-4 text-gray-400 dark:text-slate-500 ml-auto;
}

/* Input (genérico) */
.input {
  @apply block w-full px-3 py-2 rounded-md border border-gray-300;
  @apply bg-white/50 dark:bg-slate-800;
  @apply shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50;
  @apply transition-all duration-150 ease-in-out;
}
.dark .input { border-color: #334155; }
.input:focus {
  outline: none;
  border-color: #d7037b; /* Color de brand.primary */
  box-shadow: 0 0 0 3px rgba(215, 3, 123, 0.2);
}

/* Switch (toggle) con color de marca */
.switch {
  position: relative; display: inline-block;
  width: 44px; height: 24px; flex-shrink: 0;
}
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
  background-color: #e5e7eb; transition: .4s;
}
.dark .slider { background-color: #334155; }
.slider:before {
  position: absolute; content: "";
  height: 18px; width: 18px; left: 3px; bottom: 3px;
  background-color: white; transition: .4s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
input:checked + .slider {
  background-color: #d7037b; /* Color de brand.primary */
}
input:focus-visible + .slider {
  box-shadow: 0 0 0 3px rgba(215, 3, 123, 0.3);
}
input:checked + .slider:before {
  transform: translateX(20px);
}
.slider.round { border-radius: 34px; }
.slider.round:before { border-radius: 50%; }

</style>