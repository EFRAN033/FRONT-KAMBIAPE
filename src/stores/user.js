// src/stores/user.js
import { defineStore } from 'pinia';
import axios from '@/axios'; // Asegúrate de que tu instancia de axios esté configurada con withCredentials: true

// --- ✨ 1. IMPORTAMOS TU AVATAR POR DEFECTO ÚNICO ✨ ---
import defaultAvatar from '@/assets/imagenes/defaul/7.svg';

// Función auxiliar para normalizar las URLs de las imágenes.
const normalizeImageUrl = (url) => {
  if (!url) {
    return defaultAvatar;
  }
  if (/^(https?:\/\/|data:|blob:)/i.test(url)) {
    return url;
  }
  const baseUrl = import.meta.env.VITE_APP_PUBLIC_URL || 'http://localhost:8000';
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const useUserStore = defineStore('user', {
  // CAMBIO: Ya no guardamos el token en el estado.
  state: () => ({
    isDarkMode: localStorage.getItem('theme') === 'dark',
    user: JSON.parse(localStorage.getItem('user')) || { // Guardar el user en localStorage es opcional pero mejora la UX
      id: null,
      fullName: '',
      email: '',
      profilePicture: defaultAvatar,
      phone: null,
      ubicacion: null,
      districtId: null,
      dateOfBirth: null,
      gender: null,
      occupation: null,
      bio: null,
      dni: null,
      agreed_terms: false,
      created_at: null,
      interests: [],
      credits: 0,
      rating_score: 0,
      rating_count: 0,
    },
    loading: false,
    error: null,
  }),

  getters: {
    // CAMBIO: El estado de login ahora depende únicamente de si tenemos un ID de usuario.
    isLoggedIn: (state) => !!state.user && !!state.user.id,
    userFullName: (state) => state.user?.fullName || null,
    userFirstName: (state) => {
      if (!state.user?.fullName) return null;
      return state.user.fullName.split(' ')[0];
    },
    userInitials: (state) => {
      if (!state.user?.fullName) return '';
      const names = state.user.fullName.split(' ');
      if (names.length === 1) return names[0][0].toUpperCase();
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    },
    getUserProfile: (state) => state.user,
    userCredits: (state) => state.user?.credits || 0,
  },

  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    },

    _processUserData(data) {
        const processedData = {
            id: data.id || null,
            fullName: data.full_name || data.fullName || '',
            email: data.email || '',
            profilePicture: normalizeImageUrl(data.profile_picture || data.profilePicture),
            phone: data.phone || null,
            ubicacion: data.ubicacion || null,
            districtId: data.district_id || data.districtId || null,
            dateOfBirth: data.date_of_birth ? new Date(data.date_of_birth + 'T00:00:00').toLocaleDateString('es-ES') : null,
            gender: data.gender || null,
            occupation: data.occupation || null,
            bio: data.bio || null,
            dni: data.dni || null,
            agreed_terms: data.agreed_terms || false,
            created_at: data.created_at || null,
            interests: data.interests || [],
            credits: data.credits ?? 0,
            rating_score: data.rating_score ?? 0,
            rating_count: data.rating_count ?? 0,
        };
        return processedData;
    },

    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        // CAMBIO: La petición de login ahora establece la cookie. No necesitamos hacer nada con la respuesta.
        await axios.post('/login', credentials);
        
        // CAMBIO: Después del login exitoso, obtenemos el perfil del usuario para poblar el estado.
        // El backend necesita una ruta como /profile/me que devuelva el perfil del usuario actual.
        // Asumiré que la tienes, si no, puedes usar la de /profile/{userId} pero necesitas el ID.
        // Una mejor práctica es tener un endpoint /users/me
        await this.fetchCurrentUserProfile();
        
        return true;
      } catch (err) {
        this.error = err.response?.data?.detail || 'Error en el inicio de sesión. Verifica tus credenciales.';
        this.clearUser(); // Limpiamos el estado en caso de error
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    // NUEVA ACCIÓN: Para obtener el perfil del usuario logueado.
    async fetchCurrentUserProfile() {
      this.loading = true;
      this.error = null;
      try {
        // Asumimos que tienes un endpoint `/profile/me` que usa la cookie para identificar al usuario.
        // Si no lo tienes, puedes crear uno que internamente llame a tu lógica `get_user_profile`
        // con el `current_user` que obtienes de la dependencia.
        const response = await axios.get('/profile/me'); // <-- ¡Endpoint recomendado!
        const userData = this._processUserData(response.data);
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData)); // Opcional: persistir datos de usuario
      } catch (err) {
        this.error = 'No se pudo cargar el perfil. Tu sesión puede haber expirado.';
        this.clearUser(); // Si falla, significa que no estamos logueados.
      } finally {
        this.loading = false;
      }
    },

    // CAMBIO: El nombre es más genérico, ya no necesita el userId como argumento principal.
    async fetchUserProfile(userId) {
      this.loading = true;
      this.error = null;
      try {
        // Esta función sigue siendo útil para ver perfiles de OTROS usuarios.
        const response = await axios.get(`/profile/${userId}`);
        const userData = this._processUserData(response.data);
        // OJO: No actualizamos this.user aquí, para no sobreescribir el perfil del usuario logueado.
        // Devolvemos los datos para que el componente que la llamó los use.
        return userData;
      } catch (err) {
        this.error = err.response?.data?.detail || 'Error al cargar el perfil.';
        return null;
      } finally {
        this.loading = false;
      }
    },

    // No se necesitan cambios en updateProfile, changePassword, uploadProfilePicture, ya que
    // axios enviará la cookie automáticamente.

    async updateProfile(userId, updateData) {
      // ... (sin cambios en la lógica interna)
    },

    async changePassword(passwordData) {
      // ... (sin cambios en la lógica interna)
    },
    
    async uploadProfilePicture(formData) {
      // ... (sin cambios en la lógica interna)
    },

    async logout() {
        this.loading = true;
        try {
            // CAMBIO: Debes crear un endpoint en tu backend para invalidar la cookie.
            await axios.post('/logout'); 
        } catch (error) {
            console.error("Error en el logout, se procederá a limpiar el estado local:", error);
        } finally {
            this.clearUser(); // Limpiamos el estado local independientemente del resultado del backend.
            this.loading = false;
        }
    },
    
    clearUser() {
      this.user = {
        id: null,
        fullName: '',
        email: '',
        profilePicture: defaultAvatar,
        phone: null,
        ubicacion: null,
        districtId: null,
        dateOfBirth: null,
        gender: null,
        occupation: null,
        bio: null,
        dni: null,
        agreed_terms: false,
        created_at: null,
        interests: [],
        credits: 0,
        rating_score: 0,
        rating_count: 0,
      };
      // CAMBIO: Ya no se maneja el token aquí.
      localStorage.removeItem('user');
    },

    async initializeUser() {
      // CAMBIO: La inicialización ya no depende de un token en localStorage.
      // Simplemente intentamos obtener el perfil del usuario. Si la cookie es válida, funcionará.
      const userFromStorage = localStorage.getItem('user');
      if (userFromStorage) {
          this.user = JSON.parse(userFromStorage);
      }
      // Siempre intentamos refrescar los datos del usuario al iniciar la app
      await this.fetchCurrentUserProfile();
    }
  },
});