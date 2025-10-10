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

          <nav class="hidden md:flex items-center space-x-7">
            <router-link to="/nosotros" class="text-sm font-medium text-white/80 hover:text-white transition-colors">
              ¿Qué es KambiaPe?
            </router-link>
            <router-link to="/pricing" class="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Planes
            </router-link>
          </nav>

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

    <main class="min-h-screen w-full overflow-hidden bg-[radial-gradient(120%_80%_at_25%_0%,#fff0f7_0%,#ffffff_55%,#fbfbfe_100%)] dark:bg-[radial-gradient(120%_80%_at_25%_0%,#0b0b12_0%,#0b0b10_55%,#0a0a0f_100%)]">
      <div class="h-[2px] w-full bg-gradient-to-r from-[#d7037b] via-[#b90266] to-[#9e0154] opacity-60"></div>

      <header class="mx-auto max-w-7xl px-6 lg:px-8 pt-6 sm:pt-8">
        <div class="flex items-center justify-between">
          <router-link to="/" class="group inline-flex items-center gap-2" aria-label="Inicio">
            <span class="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white font-lobster">
              Kambia<span class="text-transparent bg-clip-text bg-[conic-gradient(from_180deg_at_50%_50%,#d7037b_0deg,#9e0154_150deg,#d7037b_360deg)]">Pe</span>
            </span>
            </router-link>
          <div class="hidden sm:flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
            <span class="inline-flex items-center gap-2">
              <span class="h-1 w-5 bg-[#d7037b] inline-block"></span> Registro seguro
            </span>
          </div>
        </div>
      </header>

      <section class="mx-auto max-w-7xl px-6 lg:px-8 py-10 sm:py-14 lg:py-18">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start lg:items-center lg:min-h-[78vh]">
          <aside class="lg:col-span-5 relative">
            <div class="absolute -inset-8 -z-10 opacity-15 dark:opacity-10">
              <div class="h-full w-full bg-[linear-gradient(90deg,rgba(215,3,123,0.18)_1px,transparent_1px),linear-gradient(0deg,rgba(215,3,123,0.10)_1px,transparent_1px)] bg-[size:22px_22px]"></div>
            </div>
            <div class="flex flex-col justify-start lg:justify-center h-full">
              <p class="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d7037b]">
                Registro
                <span class="h-[2px] w-6 bg-[#d7037b]/70"></span>
              </p>
              <h1 class="mt-3 text-[2.5rem] sm:text-[3rem] leading-[1.05] font-black tracking-tight text-gray-900 dark:text-white">
                Crea tu cuenta en <span class="bg-clip-text text-transparent bg-[conic-gradient(from_180deg_at_50%_50%,#d7037b_0deg,#9e0154_150deg,#d7037b_360deg)]">KambiaPe</span>
              </h1>
              <p class="mt-5 max-w-prose text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                Tu acceso a KambiaPe: rápido, claro y seguro.
              </p>
              <div class="mt-8 flex items-start gap-4 pl-3 border-l-2 border-[#d7037b]/50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#d7037b] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  <strong class="font-semibold text-gray-800 dark:text-gray-200">Por favor, usa tus datos reales.</strong>
                  <p class="mt-1">Tu nombre y DNI serán verificados para garantizar la seguridad en la comunidad. Tus datos son privados y jamás se compartirán.</p>
                </div>
              </div>
            </div>
          </aside>

          <div class="lg:col-span-7">
            <div class="mb-6">
              <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Crea tu <span class="text-[#d7037b]">cuenta</span>
              </h2>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Comienza tu experiencia con KambiaPe
              </p>
            </div>

            <div class="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span class="font-medium text-gray-700 dark:text-gray-300">¿Ya tienes una cuenta?</span>
              <router-link
                to="/login"
                class="inline-flex items-center font-semibold text-[#d7037b] hover:text-[#9e0154] underline underline-offset-4 decoration-[#d7037b]/40 hover:decoration-[#9e0154]/60"
              >
                Inicia sesión
              </router-link>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-10">
              <section>
                <label for="name" class="mb-3 block text-[11px] font-semibold tracking-[0.22em] text-gray-600 dark:text-gray-400 uppercase">Nombre completo</label>
                <div class="relative">
                  <input
                    type="text" id="name" v-model="name" required
                    class="peer w-full bg-transparent border-b-2 border-gray-300/80 dark:border-white/20 focus:outline-none focus:border-transparent transition-all px-0 py-2 placeholder-gray-400 dark:text-white"
                    placeholder="Tu nombre y apellidos" autocomplete="name" />
                  <span class="pointer-events-none absolute left-0 -bottom-[2px] h-[2px] w-0 bg-gradient-to-r from-[#d7037b] via-[#b90266] to-[#9e0154] transition-[width] duration-500 ease-out peer-focus:w-full"></span>
                  <div class="absolute -bottom-6 right-0 text-gray-400 dark:text-gray-500">
                    <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z"/></svg>
                  </div>
                </div>
              </section>

              <section>
                <label for="dni" class="mb-3 block text-[11px] font-semibold tracking-[0.22em] text-gray-600 dark:text-gray-400 uppercase">DNI</label>
                <div class="relative">
                  <input
                    type="text" id="dni" v-model="dni" required maxlength="8" @input="formatDNI"
                    class="peer w-full bg-transparent border-b-2 border-gray-300/80 dark:border-white/20 focus:outline-none focus:border-transparent transition-all px-0 py-2 placeholder-gray-400 dark:text-white"
                    placeholder="Tu número de DNI" autocomplete="off" />
                  <span class="pointer-events-none absolute left-0 -bottom-[2px] h-[2px] w-0 bg-gradient-to-r from-[#d7037b] via-[#b90266] to-[#9e0154] transition-[width] duration-500 ease-out peer-focus:w-full"></span>
                  <div class="absolute -bottom-6 right-0 text-gray-400 dark:text-gray-500">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm14.293 3.293a1 1 0 00-1.414 0L13 9.586V7a1 1 0 10-2 0v6a1 1 0 102 0v-2.586l2.879-2.879a1 1 0 000-1.414zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm-3 4a1 1 0 100 2h3a1 1 0 100-2H5z" clip-rule="evenodd" />
                      </svg>
                  </div>
                </div>
              </section>

              <section>
                <label for="email" class="mb-3 block text-[11px] font-semibold tracking-[0.22em] text-gray-600 dark:text-gray-400 uppercase">Correo electrónico</label>
                <div class="relative">
                  <input
                    type="email" id="email" v-model="email" required
                    class="peer w-full bg-transparent border-b-2 border-gray-300/80 dark:border-white/20 focus:outline-none focus:border-transparent transition-all px-0 py-2 placeholder-gray-400 dark:text-white"
                    placeholder="tu@email.com" autocomplete="email" />
                  <span class="pointer-events-none absolute left-0 -bottom-[2px] h-[2px] w-0 bg-gradient-to-r from-[#d7037b] via-[#b90266] to-[#9e0154] transition-[width] duration-500 ease-out peer-focus:w-full"></span>
                  <div class="absolute -bottom-6 right-0 text-gray-400 dark:text-gray-500">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 8l9 6 9-6v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/><path d="M21 6H3l9 6 9-6z"/></svg>
                  </div>
                </div>
              </section>

              <section>
                <div class="mb-3 flex items-center justify-between">
                  <label for="password" class="text-[11px] font-semibold tracking-[0.22em] text-gray-600 dark:text-gray-400 uppercase">Contraseña</label>
                </div>
                <div class="relative">
                  <input
                    :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required @input="validatePassword"
                    class="peer w-full bg-transparent border-b-2 border-gray-300/80 dark:border-white/20 focus:outline-none focus:border-transparent transition-all px-0 py-2 placeholder-gray-400 dark:text-white"
                    placeholder="••••••••" autocomplete="new-password" />
                  <span class="pointer-events-none absolute left-0 -bottom-[2px] h-[2px] w-0 bg-gradient-to-r from-[#d7037b] via-[#b90266] to-[#9e0154] transition-[width] duration-500 ease-out peer-focus:w-full"></span>
                  <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 ml-2 rounded-sm p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100/70 dark:hover:bg-white/10 dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#d7037b]/30">
                    <svg v-if="showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                  </button>
                </div>
                <div v-if="passwordStrength.visible" class="mt-4">
                  <div class="flex items-center gap-3">
                    <div class="flex-1 h-1.5 bg-gray-200/80 dark:bg-white/10 rounded-full overflow-hidden">
                      <div :class="passwordStrength.color" class="h-full rounded-full transition-[width] duration-500" :style="{width: passwordStrength.width}"></div>
                    </div>
                    <span class="text-xs font-semibold dark:text-gray-200" :class="passwordStrength.textColor">{{ passwordStrength.text }}</span>
                  </div>
                </div>
              </section>

              <section>
                <label for="confirmPassword" class="mb-3 block text-[11px] font-semibold tracking-[0.22em] text-gray-600 dark:text-gray-400 uppercase">Confirmar contraseña</label>
                <div class="relative">
                  <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword" required class="peer w-full bg-transparent border-b-2 border-gray-300/80 dark:border-white/20 focus:outline-none focus:border-transparent transition-all px-0 py-2 placeholder-gray-400 dark:text-white" placeholder="••••••••" autocomplete="new-password"/>
                  <span class="pointer-events-none absolute left-0 -bottom-[2px] h-[2px] w-0 bg-gradient-to-r from-[#d7037b] via-[#b90266] to-[#9e0154] transition-[width] duration-500 ease-out peer-focus:w-full"></span>
                  <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute inset-y-0 right-0 ml-2 rounded-sm p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100/70 dark:hover:bg-white/10 dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#d7037b]/30">
                    <svg v-if="showConfirmPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                  </button>
                </div>
              </section>

              <section class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="terms" type="checkbox" v-model="termsAccepted" required class="h-4 w-4 text-[#d7037b] focus:ring-[#d7037b] border-gray-300 dark:border-white/20 rounded-sm"/>
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="font-medium text-gray-700 dark:text-gray-300">
                    Acepto los <router-link to="/terms" class="text-[#d7037b] hover:text-[#9e0154]">Términos de servicio</router-link> y <router-link to="/privacy" class="text-[#d7037b] hover:text-[#9e0154]">Política de privacidad</router-link>
                  </label>
                </div>
              </section>

              <div v-if="errorMessage" class="text-sm text-[#b91c1c] dark:text-red-400 pl-3 border-l-2 border-red-300 dark:border-red-500/40">
                <div class="flex items-start gap-2">
                  <svg class="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>
                  <div>
                    <h3 class="font-semibold">No se pudo crear la cuenta</h3>
                    <p class="mt-1">{{ errorMessage }}</p>
                  </div>
                </div>
              </div>

              <div class="pt-2">
                <button
                  type="submit"
                  :disabled="isLoading"
                  :class="{ 'opacity-75 cursor-not-allowed': isLoading, 'hover:-translate-y-px': !isLoading }"
                  class="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 text-sm font-semibold text-white bg-[conic-gradient(from_180deg_at_50%_50%,#d7037b_0deg,#9e0154_160deg,#d7037b_360deg)] focus:outline-none focus:ring-4 focus:ring-[#d7037b]/30 active:scale-[0.98] transition-transform"
                >
                  <span v-if="!isLoading">Crear cuenta</span>
                  <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </button>
              </div>
            </form>

            <div class="mt-6 text-sm text-gray-600 dark:text-gray-400">
              Si ya tienes cuenta, <router-link to="/login" class="font-semibold text-[#d7037b] hover:text-[#9e0154] underline underline-offset-4 decoration-[#d7037b]/40 hover:decoration-[#9e0154]/60">inicia sesión</router-link>.
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/views/Footer.vue';
import axios from '@/axios';
import { useToast } from 'vue-toastification';

export default {
  name: 'PremiumRegisterView',
  components: { Footer },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      name: '',
      dni: '',
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
      if (!this.password) return { visible: false };
      let score = 0;
      if (this.password.length >= 8) score++;
      if (this.password.match(/[A-Z]/)) score++;
      if (this.password.match(/[0-9]/)) score++;
      if (this.password.match(/[^A-Za-z0-9]/)) score++;
      const strength = {
        0: { width: '20%', text: 'Débil', color: 'bg-red-500', textColor: 'text-red-500' },
        1: { width: '40%', text: 'Regular', color: 'bg-yellow-500', textColor: 'text-yellow-500' },
        2: { width: '60%', text: 'Buena', color: 'bg-blue-500', textColor: 'text-blue-500' },
        3: { width: '80%', text: 'Fuerte', color: 'bg-green-400', textColor: 'text-green-500' },
        4: { width: '100%', text: 'Excelente', color: 'bg-green-500', textColor: 'text-green-600' }
      };
      return { visible: true, ...strength[score] };
    }
  },
  methods: {
    formatDNI() {
      this.dni = this.dni.replace(/[^0-9]/g, '');
      if (this.dni.length > 8) {
        this.dni = this.dni.slice(0, 8);
      }
    },
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

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden.';
        this.toast.error(this.errorMessage);
        this.isLoading = false;
        return;
      }
      if (this.dni.length !== 8) {
          this.errorMessage = 'El DNI debe contener 8 dígitos.';
          this.toast.error(this.errorMessage);
          this.isLoading = false;
          return;
      }
      if (!this.termsAccepted) {
        this.errorMessage = 'Debes aceptar los Términos de servicio y la Política de privacidad.';
        this.toast.error(this.errorMessage);
        this.isLoading = false;
        return;
      }

      try {
        const response = await axios.post('/register', {
          full_name: this.name,
          dni: this.dni,
          email: this.email,
          password: this.password,
          confirm_password: this.confirmPassword,
          agreed_terms: this.termsAccepted,
        });

        console.log('Registro exitoso:', response.data);
        this.toast.success('¡Registro exitoso! Serás redirigido para iniciar sesión.');
        this.$router.push('/login');

      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.detail || 'Error en el registro. Verifica tus datos.';
          console.error('Error de registro desde el servidor:', error.response.data);
        } else if (error.request) {
            this.errorMessage = 'No se pudo conectar al servidor. Por favor, inténtalo más tarde.';
            console.error('No se recibió respuesta del servidor:', error.request);
        } else {
          this.errorMessage = 'Ocurrió un error inesperado al procesar tu solicitud.';
          console.error('Error inesperado:', error.message);
        }
        this.toast.error(this.errorMessage);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin { animation: spin 1s linear infinite; }
* { transition: background-color 0.2s, border-color 0.2s, color 0.2s, transform 0.2s, opacity 0.2s; }
:focus { outline: none; box-shadow: 0 0 0 3px rgba(215, 3, 123, 0.3); }
button:hover, .router-link:hover { transform: translateY(-1px); }
</style>