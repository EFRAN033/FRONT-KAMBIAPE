// src/stores/user.js
import { defineStore } from 'pinia';
import axios from '@/axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

// ✨ CORRECCIÓN: La función ahora apunta a la carpeta `public`
const getRandomDefaultAvatar = () => {
  const avatarCount = 14; 
  const randomAvatarNumber = Math.floor(Math.random() * avatarCount) + 1;
  // Esta ruta es accesible públicamente por el navegador
  return `/imagenes/defaul/${randomAvatarNumber}.svg`; 
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('access_token') || null,
    isDarkMode: localStorage.getItem('theme') === 'dark',
    user: JSON.parse(localStorage.getItem('user')) || {
      id: null,
      fullName: '',
      email: '',
      profilePicture: getRandomDefaultAvatar(), // Asigna un avatar aleatorio al inicio
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
        // Si el usuario no tiene foto, asigna una aleatoria por defecto
        profilePicture: data.profile_picture || data.profilePicture || getRandomDefaultAvatar(),
        phone: data.phone || null,
        address: data.address || null,
        dateOfBirth: data.date_of_birth ? new Date(data.date_of_birth + 'T00:00:00').toLocaleDateString() : null,
        gender: data.gender || null,
        occupation: data.occupation || null,
        bio: data.bio || null,
        dni: data.dni || null,
        agreed_terms: data.agreed_terms || false,
        created_at: data.created_at || null,
        interests: data.interests || [],
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
      if (!userId) {
        if (this.token) {
          try {
            const base64Url = this.token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            userId = payload.user_id;
          } catch (e) {
            this.error = "Token inválido para obtener ID de usuario.";
            this.clearUser();
            return;
          }
        }
        if (!userId) {
            this.error = 'No se proporcionó un ID de usuario válido para cargar el perfil.';
            return;
        }
      }

      this.loading = true;
      this.error = null;
      try {
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

    clearUser() {
      this.user = {
        id: null,
        fullName: '',
        email: '',
        profilePicture: getRandomDefaultAvatar(), // Asigna un avatar aleatorio al cerrar sesión
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
      };
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      this.token = null;
    },

    async initializeUser() {
      const storedToken = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        this.token = storedToken;
        this.user = JSON.parse(storedUser);
        try {
            const base64Url = storedToken.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            const userId = payload.user_id;

            if (userId) {
                await this.fetchUserProfile(userId);
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