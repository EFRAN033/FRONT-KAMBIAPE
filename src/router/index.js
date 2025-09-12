import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

// Core layout and main page components
import MainPage from '../views/MainPage.vue';
import Footer from '../views/Footer.vue';
import Header from '../views/Header.vue';
import HeroSection from '../views/HeroSection.vue';
import ProductFeed from '../views/ProductFeed.vue';

// Your custom navigation view components
import AboutUsView from '../views/AboutUsView.vue';
import PublishView from '../views/PublishView.vue';
import InboxView from '../views/InboxView.vue';

// --- Nuevas importaciones para Login, Register, MyProfile y Configuration ---
import LoginView from '../views/Login.vue';
import RegisterView from '../views/Register.vue';
import MyProfile from '../views/MyProfile.vue';
import ConfigurationView from '../views/Configuration.vue';

// --- NUEVA IMPORTACIÓN PARA MyProducts.vue ---
import MyProducts from '../views/MyProducts.vue';

// --- ✨ NUEVA IMPORTACIÓN PARA FAQsView.vue ---
import FAQsView from '../views/FAQsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
    meta: {
      title: 'Inicio | KambiaPe'
    }
  },
  // Existing structural routes
  {
    path: '/header',
    name: 'header',
    component: Header,
    meta: {
      title: 'Header | KambiaPe'
    }
  },
  {
    path: '/footer',
    name: 'footer',
    component: Footer,
    meta: {
      title: 'Footer | KambiaPe'
    }
  },
  {
    path: '/hero-section',
    name: 'hero-section',
    component: HeroSection,
    meta: {
      title: 'Hero Section | KambiaPe'
    }
  },
  {
    path: '/productos',
    name: 'products',
    component: ProductFeed,
    meta: {
      title: 'Productos | KambiaPe'
    }
  },
  // New routes for your navigation items
  {
    path: '/nosotros',
    name: 'about',
    component: AboutUsView,
    meta: {
      title: 'Nosotros | KambiaPe'
    }
  },
  {
    path: '/publicar',
    name: 'publish',
    component: PublishView,
    meta: {
      title: 'Publicar | KambiaPe'
    }
  },
  {
    path: '/buzon',
    name: 'inbox',
    component: InboxView,
    meta: {
      title: 'Buzón | KambiaPe'
    }
  },
  // --- Rutas para autenticación y perfil de usuario ---
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      title: 'Iniciar Sesión | KambiaPe'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: {
      title: 'Registrarse | KambiaPe'
    }
  },
  {
    path: '/profile',
    name: 'MyProfile',
    component: MyProfile,
    meta: {
      title: 'Mi Perfil | KambiaPe',
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: ConfigurationView,
    meta: {
      title: 'Configuración | KambiaPe',
      requiresAuth: true
    }
  },
  // --- NUEVA RUTA PARA "MIS PRODUCTOS" (INVENTARIO) ---
  {
    path: '/my-products',
    name: 'MyProducts',
    component: MyProducts,
    meta: {
      title: 'Mis Productos | KambiaPe',
      requiresAuth: true
    }
  },
  // --- ✨ NUEVA RUTA PARA FAQs ---
  {
    path: '/faqs',
    name: 'FAQs',
    component: FAQsView,
    meta: {
      title: 'Preguntas Frecuentes | KambiaPe'
    }
  },
  // Catch-all route for unmatched paths
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 100
      };
    } else if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'KambiaPe';
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;