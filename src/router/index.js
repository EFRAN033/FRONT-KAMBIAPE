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

// +++ ✨ Nueva importación para la vista de Kambitos ✨ +++
// (Asegúrate de haber creado este archivo en la carpeta 'views')
import KambitosView from '../views/Kambitos.vue'; 

// --- IMPORTACIONES PARA PÁGINAS INFORMATIVAS ---
import FAQsView from '../views/FAQsView.vue';
import CookiesView from '../views/Cookies.vue';
// === ✨ Importación para la nueva página de Términos ✨ ===
import TermsView from '../views/TermsView.vue';

// --- ✨ IMPORTACIÓN AÑADIDA PARA LA VISTA DE DETALLE DEL PRODUCTO ✨ ---
import ProductCard from '../views/ProductCard.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
    meta: {
      title: 'Inicio | KambiaPe'
    }
  },
  {
    path: '/nosotros',
    name: 'AboutUs',
    component: AboutUsView,
    meta: {
      title: 'Nosotros | KambiaPe'
    }
  },
  {
    path: '/publicar',
    name: 'Publish',
    component: PublishView,
    meta: {
      requiresAuth: true,
      title: 'Publicar | KambiaPe'
    }
  },
  {
    path: '/buzon',
    name: 'Inbox',
    component: InboxView,
    meta: {
      requiresAuth: true,
      title: 'Buzón | KambiaPe'
    }
  },
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
      title: 'Registro | KambiaPe'
    }
  },
  {
    path: '/profile',
    name: 'MyProfile',
    component: MyProfile,
    meta: {
      requiresAuth: true,
      title: 'Mi Perfil | KambiaPe'
    }
  },
  {
    path: '/settings',
    name: 'Configuration',
    component: ConfigurationView,
    meta: {
      requiresAuth: true,
      title: 'Configuración | KambiaPe'
    }
  },
  // --- NUEVA RUTA PARA "MIS PRODUCTOS" ---
  {
    path: '/my-products',
    name: 'MyProducts',
    component: MyProducts,
    meta: {
      requiresAuth: true,
      title: 'Mis Productos | KambiaPe'
    }
  },
  // +++ ✨ Nueva ruta para la página de Kambitos ✨ +++
  {
    path: '/kambitos',
    name: 'Kambitos',
    component: KambitosView,
    meta: {
      requiresAuth: true, // Para que solo usuarios logueados puedan verla
      title: 'Mis Kambitos | KambiaPe'
    }
  },
  // --- RUTAS PARA PÁGINAS INFORMATIVAS ---
  {
    path: '/faqs',
    name: 'FAQs',
    component: FAQsView,
    meta: {
      title: 'Preguntas Frecuentes | KambiaPe'
    }
  },
  {
    path: '/terminos',
    name: 'Terms',
    component: TermsView,
    meta: {
      title: 'Términos y Condiciones | KambiaPe'
    }
  },
  {
    path: '/cookies',
    name: 'Cookies',
    component: CookiesView,
    meta: {
      title: 'Política de Cookies | KambiaPe'
    }
  },
  // === ✨ Nueva ruta para Términos y Condiciones ✨ ===
  {
    path: '/terminos',
    name: 'Terms',
    component: TermsView,
    meta: {
      title: 'Términos y Condiciones | KambiaPe'
    }
  },

  // === ✨ RUTA DE DETALLES CORREGIDA ✨ ===
  // Esta ruta ahora pasará el 'id' del producto como una propiedad al componente.
  {
    path: '/product/:id',
    name: 'ProductDetail', // Nombre de ruta corregido para mayor claridad
    component: ProductCard,
    props: true, // ¡Importante! Esto permite que el :id de la URL se pase como una prop al componente.
    meta: {
      title: 'Detalle del Producto | KambiaPe'
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
    } else {
      return {
        top: 0,
        behavior: 'smooth'
      };
    }
  }
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  document.title = to.meta.title || 'KambiaPe';

  if (requiresAuth && !userStore.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;