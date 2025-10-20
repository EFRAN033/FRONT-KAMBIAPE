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
        // La petición de login establece la cookie.
        await axios.post('/login', credentials);
        
        // Después del login, obtenemos el perfil del usuario.
        // ✅ CAMBIO CLAVE: Devolvemos el resultado de esta promesa.
        return await this.fetchCurrentUserProfile();
        
      } catch (err) {
        this.error = err.response?.data?.detail || 'Error en el inicio de sesión. Verifica tus credenciales.';
        this.clearUser(); // Limpiamos el estado en caso de error
        return false; // ✅ CAMBIO CLAVE: Aseguramos devolver false en caso de error.
      } finally {
        this.loading = false;
      }
    },
    
    // NUEVA ACCIÓN: Para obtener el perfil del usuario logueado.
    async fetchCurrentUserProfile() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('/profile/me');
        const userData = this._processUserData(response.data);
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
        return true; // ✅ CAMBIO CLAVE: Devuelve true si tiene éxito.
      } catch (err) {
        this.error = 'No se pudo cargar el perfil. Tu sesión puede haber expirado.';
        this.clearUser(); // Si falla, significa que no estamos logueados.
        return false; // ✅ CAMBIO CLAVE: Devuelve false si falla.
      } finally {
        this.loading = false;
      }
    },

    async fetchUserProfile(userId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`/profile/${userId}`);
        const userData = this._processUserData(response.data);
        return userData;
      } catch (err) {
        this.error = err.response?.data?.detail || 'Error al cargar el perfil.';
        return null;
      } finally {
        this.loading = false;
      }
    },

    // No se necesitan cambios en las siguientes acciones ya que
    // axios enviará la cookie automáticamente.
    async updateProfile(userId, updateData) {
      // ... (lógica interna sin cambios)
    },

    async changePassword(passwordData) {
      // ... (lógica interna sin cambios)
    },
    
    async uploadProfilePicture(formData) {
      // ... (lógica interna sin cambios)
    },

    async logout() {
        this.loading = true;
        try {
            // Debes tener un endpoint en tu backend para invalidar la cookie.
            // Si no lo tienes, el borrado local seguirá funcionando.
            await axios.post('/logout'); 
        } catch (error) {
            console.error("Error en el logout, se procederá a limpiar el estado local:", error);
        } finally {
            this.clearUser();
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
      localStorage.removeItem('user');
    },

    async initializeUser() {
      // La inicialización ya no depende de un token en localStorage.
      // Simplemente intentamos obtener el perfil del usuario. Si la cookie es válida, funcionará.
      const userFromStorage = localStorage.getItem('user');
      if (userFromStorage) {
          this.user = JSON.parse(userFromStorage);
      }
      // Siempre intentamos refrescar los datos del usuario al iniciar la app.
      // Si hay una cookie válida, esto actualizará los datos. Si no, limpiará el estado.
      await this.fetchCurrentUserProfile();
    }
  },
});