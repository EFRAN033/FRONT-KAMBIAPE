// src/stores/user.js
import { defineStore } from 'pinia';
import axios from '@/axios';

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
  state: () => ({
    token: localStorage.getItem('access_token') || null,
    isDarkMode: localStorage.getItem('theme') === 'dark',
    user: JSON.parse(localStorage.getItem('user')) || {
      id: null,
      fullName: '',
      email: '',
      profilePicture: defaultAvatar,
      phone: null,
      address: null,
      dateOfBirth: null,
      gender: null,
      occupation: null,
      bio: null,
      dni: null,
      agreed_terms: false,
      created_at: null,
      interests: [],
      credits: 0,
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
        address: data.address || null,
        dateOfBirth: data.date_of_birth ? new Date(data.date_of_birth + 'T00:00:00').toLocaleDateString('es-ES') : null,
        gender: data.gender || null,
        occupation: data.occupation || null,
        bio: data.bio || null,
        dni: data.dni || null,
        agreed_terms: data.agreed_terms || false,
        created_at: data.created_at || null,
        interests: data.interests || [],
        credits: data.credits ?? 0,
      };
      return processedData;
    },

    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post('/login', credentials);
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
        // --- ✅ RUTA CORREGIDA SEGÚN TU BACKEND ---
        const response = await axios.get(`/profile/${userId}`);
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
        const dataToSend = { ...updateData };
        if (dataToSend.fullName) {
          dataToSend.full_name = dataToSend.fullName;
          delete dataToSend.fullName;
        }
        if (dataToSend.dateOfBirth) {
            const d = new Date(dataToSend.dateOfBirth);
            dataToSend.date_of_birth = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
            delete dataToSend.dateOfBirth;
        }
        
        delete dataToSend.interests;

        // --- ✅ RUTA CORREGIDA SEGÚN TU BACKEND ---
        const response = await axios.put(`/profile/${userId}`, dataToSend);
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
        // Asumiendo que esta ruta es correcta, si no, también hay que verificarla en main.py
        await axios.put('/users/change-password', passwordData);
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
        // --- ✅ RUTA CORREGIDA SEGÚN TU BACKEND ---
        const response = await axios.post('/profile/picture', formData, {
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
        address: null,
        dateOfBirth: null,
        gender: null,
        occupation: null,
        bio: null,
        dni: null,
        agreed_terms: false,
        created_at: null,
        interests: [],
        credits: 0,
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
            this.clearUser();
        }
      } else {
        this.clearUser();
      }
    }
  },
});