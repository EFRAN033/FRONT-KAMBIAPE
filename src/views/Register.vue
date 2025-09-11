<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <header class="bg-gradient-to-r from-[#d7037b] to-[#9e0154] shadow-md sticky top-0 z-50 border-b border-white/10 backdrop-blur-sm">
      <div class="container mx-auto px-4 sm:px-6 py-3 sm:py-3.5">
        <div class="flex items-center justify-between">
          <button 
            @click="$router.back()" 
            class="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/25 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 ease-in-out"
            aria-label="Volver atrás"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Navegación con router-link -->
          <nav class="hidden md:flex items-center space-x-7">
            <router-link to="/about" class="text-sm font-medium text-white/80 hover:text-white transition-colors">
              ¿Qué es KambiaPe?
            </router-link>
            <router-link to="/pricing" class="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Planes
            </router-link>
          </nav>

          <!-- Botones de acción con router-link -->
          <div class="flex items-center space-x-4">
            <router-link to="/login" class="text-sm font-medium text-white hover:text-gray-200 transition-colors">
              Iniciar sesión
            </router-link>
            <router-link
              to="/register"
              class="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-white/20 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all"
            >
              Regístrate gratis
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 flex flex-col items-center">
      <div class="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div class="p-8 sm:p-10">
          <div class="text-center mb-8">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-[#d7037b] to-[#9e0154] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Crea tu cuenta</h2>
            <p class="mt-2 text-sm text-gray-600">Comienza tu experiencia con KambiaPe</p>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <div class="relative">
                <input
                  type="text"
                  id="name"
                  v-model="name"
                  required
                  class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d7037b] focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                  autocomplete="name"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <div class="relative">
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  required
                  class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d7037b] focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                  autocomplete="email"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="password"
                  required
                  @input="validatePassword"
                  class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d7037b] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  autocomplete="new-password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <div v-if="passwordStrength.visible" class="mt-2">
                <div class="flex items-center space-x-2">
                  <div class="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      :class="passwordStrength.color"
                      class="h-full rounded-full transition-all duration-500"
                      :style="{width: passwordStrength.width}"
                    ></div>
                  </div>
                  <span class="text-xs font-medium" :class="passwordStrength.textColor">
                    {{ passwordStrength.text }}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
              <div class="relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  required
                  class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d7037b] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  autocomplete="new-password"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  v-model="termsAccepted"
                  required
                  class="h-4 w-4 text-[#d7037b] focus:ring-[#d7037b] border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-medium text-gray-700">
                  Acepto los <router-link to="/terms" class="text-[#d7037b] hover:text-[#9e0154]">Términos de servicio</router-link> y <router-link to="/privacy" class="text-[#d7037b] hover:text-[#9e0154]">Política de privacidad</router-link>
                </label>
              </div>
            </div>

            <div
              v-if="errorMessage"
              class="rounded-md bg-red-50 p-4 transition-all duration-300"
            >
              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm text-red-600">{{ errorMessage }}</span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-[#d7037b]/20 text-sm font-semibold text-white bg-[#d7037b] hover:brightness-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d7037b] transition-all duration-300"
              >
                <span v-if="!isLoading">Crear cuenta</span>
                <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>

          </form>

          <div class="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?
            <router-link to="/login" class="font-medium text-[#d7037b] hover:text-[#9e0154] transition-colors">
              Inicia sesión
            </router-link>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer agregado -->
    <Footer />
  </div>
</template>

<script>
import Footer from '@/views/Footer.vue';

export default {
  name: 'PremiumRegisterView',
  components: { Footer }, // registro mínimo del componente, no afecta tu lógica
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false,
      errorMessage: ''
    };
  },
  computed: {
    passwordStrength() {
      if (!this.password) return { visible: false, width: '0%', text: '', color: '', textColor: '' };

      const strength = {
        0: { width: '20%', text: 'Débil', color: 'bg-red-500', textColor: 'text-red-500' },
        1: { width: '40%', text: 'Regular', color: 'bg-yellow-500', textColor: 'text-yellow-500' },
        2: { width: '60%', text: 'Buena', color: 'bg-blue-500', textColor: 'text-blue-500' },
        3: { width: '80%', text: 'Fuerte', color: 'bg-green-400', textColor: 'text-green-500' },
        4: { width: '100%', text: 'Excelente', color: 'bg-green-500', textColor: 'text-green-600' }
      };

      // Calculador de fortaleza de contraseña
      let score = 0;
      if (this.password.length >= 8) score++;
      if (this.password.match(/[A-Z]/)) score++;
      if (this.password.match(/[0-9]/)) score++;
      if (this.password.match(/[^A-Za-z0-9]/)) score++;

      return {
        visible: true,
        ...strength[Math.min(score, 4)]
      };
    }
  },
  methods: {
    validatePassword() {
      if (this.password && this.confirmPassword && this.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
      } else {
        this.errorMessage = '';
      }
    },
    async handleRegister() {
      this.errorMessage = '';
      this.isLoading = true;

      // Validaciones básicas del lado del cliente
      if (!this.name || !this.email || !this.password || !this.confirmPassword) {
        this.errorMessage = 'Todos los campos son obligatorios.';
        this.isLoading = false;
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden.';
        this.isLoading = false;
        return;
      }

      if (!this.termsAccepted) {
        this.errorMessage = 'Debes aceptar los Términos de servicio y Política de privacidad.';
        this.isLoading = false;
        return;
      }

      try {
        const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
        if (!API_BASE_URL) {
          console.error("Error: VITE_APP_API_URL no está definida en las variables de entorno del frontend.");
          this.errorMessage = "Error de configuración: No se pudo conectar a la API.";
          this.isLoading = false;
          return;
        }

        const API_URL = `${API_BASE_URL}/register`;

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: this.name,
            email: this.email,
            password: this.password,
            confirm_password: this.confirmPassword,
            agreed_terms: this.termsAccepted
          }),
        });

        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          this.errorMessage = 'Error inesperado del servidor. Inténtalo de nuevo.';
          console.error('Error al parsear JSON de la respuesta:', jsonError);
          this.isLoading = false;
          return;
        }

        if (response.ok) {
          console.log('Registro exitoso:', data);
          this.$router.push('/dashboard');
        } else {
          this.errorMessage = data.detail || 'Error al registrar. Por favor, inténtalo de nuevo.';
          console.error('Error de registro desde el servidor:', data);
        }
      } catch (error) {
        this.errorMessage = 'No se pudo conectar al servidor. Asegúrate de que el backend esté funcionando e inténtalo más tarde.';
        console.error('Error de conexión o inesperado:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Animaciones */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin { animation: spin 1s linear infinite; }

/* Transiciones suaves */
* {
  transition: background-color 0.2s, border-color 0.2s, color 0.2s, transform 0.2s, opacity 0.2s;
}

/* Accesibilidad */
:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(215, 3, 123, 0.3);
}

/* Hover micro-interacción */
button:hover, .router-link:hover { transform: translateY(-1px); }
</style>
