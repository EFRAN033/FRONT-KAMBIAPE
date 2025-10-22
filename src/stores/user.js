// src/stores/user.js
import { defineStore } from 'pinia';
import api from '@/axios'; // Importa la instancia centralizada de Axios

// --- ✨ IMPORTAMOS TU AVATAR POR DEFECTO ÚNICO ✨ ---
import defaultAvatar from '@/assets/imagenes/defaul/7.svg';

/**
 * Función auxiliar para normalizar las URLs de las imágenes.
 * Esta versión es más simple y robusta.
 * - Si la URL está vacía, devuelve el avatar por defecto.
 * - Si la URL ya es completa (http, https, data, blob), la devuelve tal cual.
 * - Si la URL es una ruta relativa (ej: /uploaded_images/...), el navegador la
 * resolverá correctamente basándose en el dominio actual (kambiape.com).
 * Esto elimina la necesidad de VITE_APP_PUBLIC_URL aquí.
 */
const normalizeImageUrl = (url) => {
  if (!url) {
    return defaultAvatar;
  }
  // Si ya es una URL completa, no hacemos nada.
  if (/^(https?:\/\/|data:|blob:)/i.test(url)) {
    return url;
  }
  // Si es una ruta relativa (como "/uploaded_images/..."), el navegador la manejará.
  // No necesitamos añadir el dominio manualmente.
  return url;
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('access_token') || null,
    isDarkMode: localStorage.getItem('theme') === 'dark',
    user: JSON.parse(localStorage.getItem('user')) || {
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
    isLoggedIn: (state) => !!state.token && !!state.user && !!state.user.id,
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
        // Usa la instancia 'api' que ya tiene la baseURL configurada
        const response = await api.post('/login', credentials);
        const accessToken = response.data.access_token;
        this.token = accessToken;
        localStorage.setItem('access_token', accessToken);

        const base64Url = accessToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        const userId = payload.user_id;

        if (!userId) {
            throw new Error("El ID de usuario no se encontró en el token JWT.");
        }

        await this.fetchUserProfile(userId);
        return true;
      } catch (err) {
        this.error = err.response?.data?.detail || 'Error en el inicio de sesión. Verifica tus credenciales.';
        this.clearUser();
        return false;
      } finally {
        this.loading = false;
      }
    },

    async fetchUserProfile(userId) {
      this.loading = true;
      this.error = null;
      try {
        // La URL es relativa a la baseURL configurada en axios.js. ¡Correcto!
        const response = await api.get(`/profile/${userId}`);
        const userData = this._processUserData(response.data);
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (err) {
        this.error = err.response?.data?.detail || 'Error al cargar el perfil. Puede que la sesión haya expirado.';
        if (err.response?.status === 401) {
          this.clearUser();
        }
      } finally {
        this.loading = false;
      }
    },

    async updateProfile(userId, updateData) {
      this.loading = true;
      this.error = null;
      try {
        const dataToFilter = { ...updateData };

        if (dataToFilter.fullName) {
          dataToFilter.full_name = dataToFilter.fullName;
          delete dataToFilter.fullName;
        }
        if (dataToFilter.dateOfBirth) {
          // dataToFilter.dateOfBirth ya está en el formato "YYYY-MM-DD"
          dataToFilter.date_of_birth = dataToFilter.dateOfBirth;
          delete dataToFilter.dateOfBirth;
        }
        
        if (dataToFilter.districtId) {
          dataToFilter.district_id = dataToFilter.districtId;
          delete dataToFilter.districtId;
        }
        
        const allowedKeys = ['full_name', 'phone', 'ubicacion', 'district_id', 'date_of_birth', 'gender', 'occupation', 'bio', 'interest_ids'];
        
        const finalPayload = {};
        for (const key of allowedKeys) {
            if (dataToFilter[key] !== undefined && dataToFilter[key] !== null) {
                finalPayload[key] = dataToFilter[key];
            }
        }

        const response = await api.put(`/profile/${userId}`, finalPayload);
        const updatedUserData = this._processUserData(response.data);
        this.user = updatedUserData;
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        return true;

      } catch (err) {
        this.error = err.response?.data?.detail || 'Error al actualizar el perfil.';
        if (err.response?.status === 401) {
          this.clearUser();
        }
        return false;
      } finally {
        this.loading = false;
      }
    },

    async changePassword(passwordData) {
      this.loading = true;
      this.error = null;
      try {
        await api.put('/users/change-password', passwordData);
        return { success: true, message: 'Contraseña actualizada con éxito.' };
      } catch (err) {
        const errorMessage = err.response?.data?.detail || 'No se pudo cambiar la contraseña. Verifica tus datos.';
        this.error = errorMessage;
        return { success: false, message: errorMessage };
      } finally {
        this.loading = false;
      }
    },

    async uploadProfilePicture(formData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post('/profile/picture', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const updatedUserData = this._processUserData(response.data);
        this.user = updatedUserData;
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        
        return { success: true, user: updatedUserData };
      } catch (err) {
        this.error = err.response?.data?.detail || 'No se pudo subir la imagen.';
        return { success: false, error: this.error };
      } finally {
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
      localStorage.removeItem('access_token');
      this.token = null;
    },

    async initializeUser() {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        this.token = storedToken;
        try {
            const base64Url = storedToken.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            if (payload.user_id) {
                await this.fetchUserProfile(payload.user_id);
            } else {
                this.clearUser();
            }
        } catch (e) {
            console.error("Error al inicializar el usuario desde el token:", e);
            this.clearUser();
        }
      } else {
        this.clearUser();
      }
    }
  },
});