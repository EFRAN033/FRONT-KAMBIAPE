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

    <main class="w-full overflow-hidden bg-[radial-gradient(120%_80%_at_25%_0%,#fff0f7_0%,#ffffff_55%,#fbfbfe_100%)]">
      <div class="h-[2px] w-full bg-gradient-to-r from-[#d7037b] via-[#b90266] to-[#9e0154] opacity-60"></div>

      <header class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div class="flex items-center justify-between">
          <router-link to="/" class="group inline-flex items-center gap-2" aria-label="Inicio">
            <span class="text-xl sm:text-2xl font-black tracking-tight text-gray-900 font-lobster">
              Kambia<span class="text-transparent bg-clip-text bg-[conic-gradient(from_180deg_at_50%_50%,#d7037b_0deg,#9e0154_150deg,#d7037b_360deg)]">Pe</span>
            </span>
            <span class="ml-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9e0154] bg-[#d7037b]/10 ring-1 ring-[#d7037b]/20">
              beta
            </span>
          </router-link>
        </div>
      </header>
      
      <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-18">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 lg:items-center">

          <div class="lg:col-span-7 order-first lg:order-last">
            <div class="mb-6">
              <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                Inicia <span class="text-[#d7037b]">sesión</span>
              </h2>
              <p class="mt-2 text-sm text-gray-600">
                Accede a tu cuenta y continúa tu experiencia
              </p>
            </div>

            <div class="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span class="font-medium text-gray-700">¿No tienes una cuenta?</span>
              <router-link
                to="/register"
                class="inline-flex items-center font-semibold text-[#d7037b] hover:text-[#9e0154] underline underline-offset-4 decoration-[#d7037b]/40 hover:decoration-[#9e0154]/60"
              >
                Regístrate aquí
              </router-link>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-12">
              <section>
                <label for="email" class="mb-3 block text-[11px] font-semibold tracking-[0.22em] text-gray-600 uppercase">
                  Correo electrónico
                </label>
                <div class="relative">
                  <input
                    id="email"
                    type="email"
                    autocomplete="email"
                    required
                    v-model="email"
                    @input="validateEmail"
                    :class="{
                      'border-[#22c55e] ring-2 ring-[#22c55e]/20': emailValid,
                      'border-[#ef4444] ring-2 ring-[#ef4444]/20': emailError
                    }"
                    class="peer w-full bg-transparent border-b-2 border-gray-300/80 focus:border-transparent focus:outline-none transition-all px-0 py-2 placeholder-gray-400"
                    placeholder="tu@email.com"
                  />
                  <span class="pointer-events-none absolute left-0 -bottom-[2px] h-[2px] w-0 bg-gradient-to-r from-[#d7037b] via-[#b90266] to-[#9e0154] transition-[width] duration-500 ease-out peer-focus:w-full"></span>
                </div>
                <p v-if="emailError" class="mt-4 text-sm text-[#ef4444]">{{ emailError }}</p>
              </section>

              <div class="relative h-px">
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/80 to-transparent"></span>
              </div>

              <section>
                <div class="mb-3 flex items-center justify-between">
                  <label for="password" class="text-[11px] font-semibold tracking-[0.22em] text-gray-600 uppercase">Contraseña</label>
                  <router-link to="/forgot-password" class="text-xs font-semibold text-[#d7037b] hover:text-[#9e0154]">
                    ¿Olvidaste tu contraseña?
                  </router-link>
                </div>
                <div class="relative">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    autocomplete="current-password"
                    required
                    v-model="password"
                    @input="validatePassword"
                    :class="{
                      'border-[#22c55e] ring-2 ring-[#22c55e]/20': passwordValid,
                      'border-[#ef4444] ring-2 ring-[#ef4444]/20': passwordError
                    }"
                    class="peer w-full bg-transparent border-b-2 border-gray-300/80 focus:border-transparent focus:outline-none transition-all px-0 py-2 placeholder-gray-400"
                    placeholder="••••••••"
                  />
                  <span class="pointer-events-none absolute left-0 -bottom-[2px] h-[2px] w-0 bg-gradient-to-r from-[#d7037b] via-[#b90266] to-[#9e0154] transition-[width] duration-500 ease-out peer-focus:w-full"></span>
                  <div class="absolute inset-y-0 right-0 flex items-center">
                    <button type="button" @click="showPassword = !showPassword" class="ml-2 rounded-sm p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100/70 transition-colors focus:outline-none focus:ring-2 focus:ring-[#d7037b]/30">
                      <svg v-if="showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                    </button>
                  </div>
                </div>
                <p v-if="passwordError" class="mt-3 text-sm text-[#ef4444]">{{ passwordError }}</p>
              </section>

              <div class="flex items-center justify-between">
                <label for="remember-me" class="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    id="remember-me"
                    type="checkbox"
                    v-model="rememberMe"
                    class="h-4 w-4 border-gray-300 text-[#d7037b] focus:ring-[#d7037b] rounded-sm"
                  />
                  <span class="text-sm text-gray-700">Recordar mi sesión</span>
                </label>
              </div>

              <div v-if="errorMessage" class="text-sm text-[#b91c1c] pl-3 border-l-2 border-red-300">
                <h3 class="font-semibold">Error al iniciar sesión</h3>
                <p class="mt-1">{{ errorMessage }}</p>
              </div>

              <div class="pt-2">
                <button
                  type="submit"
                  :disabled="isLoading || !formValid"
                  :class="{
                    'opacity-75 cursor-not-allowed': isLoading || !formValid,
                    'hover:translate-y-[-1px]': formValid
                  }"
                  class="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 text-sm font-semibold text-white bg-[conic-gradient(from_180deg_at_50%_50%,#d7037b_0deg,#9e0154_160deg,#d7037b_360deg)] focus:outline-none focus:ring-4 focus:ring-[#d7037b]/30 active:scale-[0.98] transition-transform"
                >
                  <span v-if="!isLoading">Iniciar sesión</span>
                  <svg v-else class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
          
          <aside class="lg:col-span-5 relative hidden lg:block">
            <div class="absolute -inset-8 -z-10 opacity-15">
              <div class="h-full w-full bg-[linear-gradient(90deg,rgba(215,3,123,0.18)_1px,transparent_1px),linear-gradient(0deg,rgba(215,3,123,0.10)_1px,transparent_1px)] bg-[size:22px_22px]"></div>
            </div>
            <div class="flex flex-col justify-center h-full">
              <p class="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d7037b]">
                Acceso
                <span class="h-[2px] w-6 bg-[#d7037b]/70"></span>
              </p>
              <h1 class="mt-3 text-[2.5rem] sm:text-[3rem] leading-[1.05] font-black tracking-tight text-gray-900">
                Inicia sesión, <span class="bg-clip-text text-transparent bg-[conic-gradient(from_180deg_at_50%_50%,#d7037b_0deg,#9e0154_150deg,#d7037b_360deg)]">continúa</span> donde ibas
              </h1>
              <p class="mt-5 max-w-prose text-[15px] leading-relaxed text-gray-700">
                Tu acceso a KambiaPe: rápido, claro y seguro.
              </p>
              <ul class="mt-8 grid grid-cols-2 gap-4 text-sm">
                <li class="flex items-center gap-2 text-gray-700">
                  <span class="h-1 w-6 bg-[#d7037b] inline-block"></span> Diseño minimal
                </li>
                <li class="flex items-center gap-2 text-gray-700">
                  <span class="h-1 w-6 bg-[#9e0154] inline-block"></span> Feedback nítido
                </li>
              </ul>
            </div>
          </aside>

        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import Footer from '@/views/Footer.vue';

export default {
  name: 'PremiumLoginView',
  components: { Footer },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    return { userStore, router };
  },
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      isLoading: false,
      errorMessage: '',
      emailValid: false,
      emailError: '',
      passwordValid: false,
      passwordError: '',
      formValid: false,
    };
  },
  watch: {
    email() {
      this.validateEmail();
      this.checkFormValidity();
    },
    password() {
      this.validatePassword();
      this.checkFormValidity();
    }
  },
  mounted() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.email = rememberedEmail;
      this.rememberMe = true;
      this.validateEmail();
    }
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailValid = false;
        this.emailError = '';
      } else if (!emailRegex.test(this.email)) {
        this.emailValid = false;
        this.emailError = 'Por favor ingresa un correo electrónico válido';
      } else {
        this.emailValid = true;
        this.emailError = '';
      }
    },
    validatePassword() {
      if (!this.password) {
        this.passwordValid = false;
        this.passwordError = '';
      } else if (this.password.length < 6) {
        this.passwordValid = false;
        this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
      } else {
        this.passwordValid = true;
        this.passwordError = '';
      }
    },
    checkFormValidity() {
      this.formValid = this.emailValid && this.passwordValid;
    },
    async handleLogin() {
      this.errorMessage = '';
      this.isLoading = true;

      if (!this.formValid) {
        this.errorMessage = 'Por favor, corrige los errores en el formulario.';
        this.isLoading = false;
        return;
      }

      try {
        // ✅ CAMBIO CLAVE: Esperamos el resultado booleano de la acción de login.
        const loginSuccess = await this.userStore.login({
          email: this.email,
          password: this.password,
        });

        // La comprobación ahora es fiable porque espera a que todo el proceso termine.
        if (loginSuccess) {
          if (this.rememberMe) {
            localStorage.setItem('rememberedEmail', this.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          // Redirigimos al dashboard.
          this.router.push('/dashboard');
        } else {
          // Si devuelve false, el error ya está guardado en el store.
          this.errorMessage = this.userStore.error || 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.';
        }
      } catch (error) {
        // Este bloque es una salvaguarda. El error principal se maneja en el store.
        this.errorMessage = this.userStore.error || 'Ocurrió un error inesperado al intentar iniciar sesión.';
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style>
/* Los estilos se mantienen, ya que son globales y no interfieren con la responsividad */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

* {
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease, opacity 0.25s ease;
}

:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(215, 3, 123, 0.3);
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>