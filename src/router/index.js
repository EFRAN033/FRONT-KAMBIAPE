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
import KambitosView from '../views/Kambitos.vue';

// --- IMPORTACIONES PARA PÁGINAS INFORMATIVAS ---
import FAQsView from '../views/FAQsView.vue';
import CookiesView from '../views/Cookies.vue';
import TermsView from '../views/TermsView.vue';
// === ✨ Nueva importación para la Política de Privacidad ✨ ===
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue';

// --- ✨ IMPORTACIÓN AÑADIDA PARA LA VISTA DE DETALLE DEL PRODUCTO ✨ ---
import ProductCard from '../views/ProductCard.vue';

// --- ✨ NUEVAS IMPORTACIONES PARA EL PANEL DE ADMIN (CORREGIDAS) ✨ ---
// (La ruta ahora apunta a 'views/Admin/' con 'A' mayúscula)
import AdminLogin from '../views/Admin/Login-admin.vue';
import AdminSidebar from '../views/Admin/Sidebar-admin.vue'; 
import AdminDashboard from '../views/Admin/Dashboard-admin.vue';
import AdminHeroSection from '../views/Admin/HeroSection-admin.vue';
import AdminUsers from '../views/Admin/Users-admin.vue';
// --- ✨ NUEVA IMPORTACIÓN PARA EDITAR NOSOTROS ✨ ---
import EditAboutAdmin from '../views/Admin/Editabout-admin.vue';


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
  // === ✨ Nueva ruta para la Política de Privacidad ✨ ===
  {
    path: '/privacy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicyView,
    meta: {
      title: 'Política de Privacidad | KambiaPe'
    }
  },

  // === ✨ RUTA DE DETALLES CORREGIDA ✨ ===
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductCard,
    props: true,
    meta: {
      title: 'Detalle del Producto | KambiaPe'
    }
  },

  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLogin,
    meta: {
      title: 'Admin Login | KambiaPe'
    }
  },
  {
    path: '/admin',
    component: AdminSidebar, 
    meta: {
      requiresAdminAuth: true 
    },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: AdminDashboard,
        meta: {
          title: 'Admin Dashboard | KambiaPe'
        }
      },
      {
        path: 'hero-section',
        name: 'admin-hero',
        component: AdminHeroSection,
        meta: {
          title: 'Editar Hero | KambiaPe'
        }
      },
      // --- ✨ RUTA AÑADIDA PARA EDITAR "NOSOTROS" ✨ ---
      {
        path: 'edit-about',
        name: 'admin-edit-about',
        component: EditAboutAdmin,
        meta: {
          title: 'Editar Nosotros | KambiaPe'
        }
      },
      {
        path: 'users',
        name: 'admin-users',
        component: AdminUsers,
        meta: {
          title: 'Gestionar Usuarios | KambiaPe'
        }
      }
    ]
  },
  // --- ⬆️⬆️ FIN DE LAS RUTAS DE ADMINISTRACIÓN ⬆️⬆️ ---


  // Catch-all route for unmatched paths (DEBE SER LA ÚLTIMA)
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

// --- ⬇️⬇️ GUARDIÁN DE RUTAS ACTUALIZADO ⬇️⬇️ ---
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdminAuth = to.matched.some(record => record.meta.requiresAdminAuth);
  
  document.title = to.meta.title || 'KambiaPe';

  // 1. Si la ruta requiere ser ADMIN
  if (requiresAdminAuth) {
    // Asumimos que tu store tiene un getter o estado 'isAdmin'
    // (necesitarás añadir esto a tu 'src/stores/user.js')
    if (userStore.isAdmin) { 
      next(); // Es admin, permitir acceso
    } else {
      // Si es un usuario logueado pero no admin, lo sacamos al home
      if (userStore.isLoggedIn) {
        next('/');
      } else {
      // Si no es admin y no está logueado, redirigir a login de admin
        next('/admin/login'); 
      }
    }
  } 
  // 2. Si la ruta requiere ser USUARIO REGULAR (tu lógica original)
  else if (requiresAuth && !userStore.isLoggedIn) {
    next('/login'); // No está logueado, redirigir a login de usuario
  } 
  // 3. Rutas públicas
  else {
    next(); // Permitir acceso
  }
});

export default router;