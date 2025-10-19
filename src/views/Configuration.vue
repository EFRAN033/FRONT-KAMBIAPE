<template>
  <div class="min-h-screen font-sans antialiased bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100">
    <div aria-hidden="true" class="aurora -z-10"></div>

    <header class="brand-header shadow-md sticky top-0 z-50 border-b border-white/10 backdrop-blur-sm">
      <div class="container mx-auto px-4 sm:px-6 py-3 sm:py-3.5">
        <div class="flex items-center justify-between relative">
          <button @click="goBack" class="icon-btn" aria-label="Volver atrás">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          <h2 class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold text-white whitespace-nowrap">
            Configuración
          </h2>
          <div class="w-9 h-9"></div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 sm:px-6 py-8">
      <div class="max-w-4xl mx-auto">
        <main>
          <section class="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl animate-in-up shadow-sm">
            <header class="p-5 border-b border-gray-200 dark:border-slate-700">
              <h3 class="text-xl font-bold">Preferencias Generales</h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-slate-400">Administra las notificaciones y el tema de tu cuenta.</p>
            </header>
            <div class="p-6 space-y-5">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Recibir notificaciones por correo</h4>
                  <p class="text-sm text-gray-500 dark:text-slate-400">Activa para recibir actualizaciones importantes.</p>
                </div>
                <label class="switch self-start sm:self-center">
                  <input type="checkbox" v-model="settings.notificationsEnabled" @change="saveSetting('notificationsEnabled')">
                  <span class="slider round"></span>
                </label>
              </div>

              <hr class="border-gray-200 dark:border-slate-700" />

              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Habilitar modo oscuro</h4>
                  <p class="text-sm text-gray-500 dark:text-slate-400">Ideal para condiciones de poca luz.</p>
                </div>
                <label class="switch self-start sm:self-center">
                  <input type="checkbox" v-model="settings.darkModeEnabled" @change="saveSetting('darkModeEnabled')">
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </section>

          <section class="mt-8 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl animate-in-up shadow-sm">
            <header class="p-5 border-b border-gray-200 dark:border-slate-700">
              <h3 class="text-xl font-bold">Facturación y Suscripción</h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-slate-400">Gestiona tus métodos de pago, facturas y plan actual.</p>
            </header>
            <div class="p-6 space-y-5">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Gestionar método de pago</h4>
                  <p class="text-sm text-gray-500 dark:text-slate-400">Actualiza tu tarjeta de crédito o débito.</p>
                </div>
                <button @click="managePaymentMethod" class="btn-primary w-full sm:w-auto">Actualizar</button>
              </div>

              <hr class="border-gray-200 dark:border-slate-700" />

              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Historial de facturas</h4>
                  <p class="text-sm text-gray-500 dark:text-slate-400">Revisa y descarga tus facturas anteriores.</p>
                </div>
                <button @click="viewInvoiceHistory" class="btn-primary w-full sm:w-auto">Ver historial</button>
              </div>

              <hr class="border-gray-200 dark:border-slate-700" />

              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Administrar suscripción</h4>
                  <p class="text-sm text-gray-500 dark:text-slate-400">Cambia de plan o cancela tu suscripción.</p>
                </div>
                <button @click="manageSubscription" class="btn-primary w-full sm:w-auto">Gestionar Plan</button>
              </div>
            </div>
          </section>

          <section class="mt-8 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl animate-in-up shadow-sm">
            <header class="p-5 border-b border-gray-200 dark:border-slate-700">
              <h3 class="text-xl font-bold">Seguridad y Privacidad</h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-slate-400">Gestiona el acceso y la seguridad de tu cuenta.</p>
            </header>
            <div class="p-6 space-y-5">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Autenticación de dos factores</h4>
                  <p class="text-sm text-gray-500 dark:text-slate-400">Añade una capa extra de seguridad a tu cuenta.</p>
                </div>
                <button @click="manageTwoFactor" class="btn-primary w-full sm:w-auto">Gestionar</button>
              </div>

              <hr class="border-gray-200 dark:border-slate-700" />

              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Historial de sesiones</h4>
                  <p class="text-sm text-gray-500 dark:text-slate-400">Revisa los dispositivos con sesión iniciada.</p>
                </div>
                <button @click="viewSessionHistory" class="btn-primary w-full sm:w-auto">Ver historial</button>
              </div>

              <hr class="border-gray-200 dark:border-slate-700" />

              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 class="font-semibold text-red-600 dark:text-red-500">Eliminar mi cuenta</h4>
                  <p class="text-sm text-gray-500 dark:text-slate-400">Esta acción es permanente y no se puede deshacer.</p>
                </div>
                <button @click="deleteAccount" class="btn-danger w-full sm:w-auto">Eliminar Cuenta</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>

    <transition name="toast-slide">
       <div v-if="showToast" :class="[
        'fixed right-4 bottom-4 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border-l-4 shadow-lg bg-white dark:bg-slate-800',
        toastType === 'success' ? 'border-green-500 text-green-700 dark:text-green-300' : '',
        toastType === 'error' ? 'border-red-500 text-red-700 dark:text-red-400' : '',
        toastType === 'info' ? 'border-blue-500 text-blue-700 dark:text-blue-300' : ''
      ]" role="status" aria-live="polite">
        <svg v-if="toastType === 'success'" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
        <svg v-else-if="toastType === 'error'" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>
        <svg v-else class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>
        <span class="text-sm font-semibold">{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

export default {
  name: 'ConfigurationView',
  setup() {
    const router = useRouter();
    const settings = ref({ notificationsEnabled: true, darkModeEnabled: false });
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastType = ref('info');

    const showNotification = (message, type = 'info', duration = 3000) => {
      toastMessage.value = message;
      toastType.value = type;
      showToast.value = true;
      setTimeout(() => { showToast.value = false; }, duration);
    };

    const goBack = () => router.back();

    onMounted(() => {
      const savedDarkMode = localStorage.getItem('theme') === 'dark';
      settings.value.darkModeEnabled = savedDarkMode;
      if (savedDarkMode) document.documentElement.classList.add('dark');
    });

    const saveSetting = (settingName) => {
      const value = settings.value[settingName];
      if (settingName === 'darkModeEnabled') {
        localStorage.setItem('theme', value ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', value);
      }
      showNotification(`Ajuste actualizado.`, 'success');
    };

    const manageTwoFactor = () => showNotification('Esta función aún no está implementada.', 'info');
    const viewSessionHistory = () => showNotification('Esta función aún no está implementada.', 'info');
    const deleteAccount = () => {
      if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible.')) {
        showNotification('Procesando eliminación de cuenta...', 'error');
      }
    };

    const managePaymentMethod = () => showNotification('Redirigiendo a la gestión de pagos...', 'info');
    const viewInvoiceHistory = () => showNotification('Cargando historial de facturas...', 'info');
    const manageSubscription = () => showNotification('Abriendo portal de suscripción...', 'info');

    return {
      settings,
      goBack,
      saveSetting,
      manageTwoFactor,
      viewSessionHistory,
      deleteAccount,
      showToast,
      toastMessage,
      toastType,
      managePaymentMethod,
      viewInvoiceHistory,
      manageSubscription
    };
  },
};
</script>

<style scoped>
/* Clases de botón reutilizables para consistencia y transiciones */
.btn-primary, .btn-danger {
  border-radius: .5rem; /* 8px */
  padding: .625rem 1rem; /* 10px 16px */
  font-size: 0.875rem; /* 14px */
  font-weight: 600; /* semibold */
  color: white;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  transition: all 0.2s ease-in-out;
  flex-shrink: 0; /* Evita que el botón se encoja */
}

.btn-primary:hover, .btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 0.1);
}

.btn-primary {
  background-color: #d7037b; /* Color de marca */
}
.btn-primary:hover {
  background-color: #b90267; /* Un tono más oscuro para el hover */
}
.btn-primary:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(215, 3, 123, 0.3);
}

.btn-danger {
  background-color: #dc2626; /* Rojo de error */
}
.btn-danger:hover {
  background-color: #b91c1c; /* Rojo más oscuro */
}
.btn-danger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
}


/* ========= ESTILOS ANTERIORES ========= */

.brand-header {
  background: linear-gradient(90deg, #d7037b 0%, #9e0154 100%);
}

.aurora {
  position: fixed; inset: 0; filter: blur(60px);
  background:
    radial-gradient(circle at 10% 20%, rgba(215, 3, 123, 0.10), transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.10), transparent 40%);
  animation: aurora-float 14s ease-in-out infinite;
}
@keyframes aurora-float { 50% { transform: translateY(-18px); } }

.icon-btn {
  width: 36px; height: 36px;
  border-radius: 999px;
  background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,255,255,.2);
  display: grid; place-items: center;
  transition: .25s ease;
}
.icon-btn:hover { background: rgba(255,255,255,.22); transform: scale(1.08); }


/* Input y Select con foco de marca */
.input {
  width: 100%; border-radius: .5rem; border: 1px solid #e5e7eb; /* 8px */
  background: transparent; color: inherit; padding: .625rem 1rem; /* 10px 16px */
  transition: border-color .2s ease, box-shadow .2s ease;
}
.dark .input { border-color: #334155; }
.input:focus {
  outline: none;
  border-color: #d7037b; /* Color de brand.primary */
  box-shadow: 0 0 0 3px rgba(215, 3, 123, 0.2);
}

/* Switch (toggle) con color de marca */
.switch {
  position: relative; display: inline-block;
  width: 44px; height: 24px; flex-shrink: 0;
}
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
  background-color: #e5e7eb; transition: .4s;
}
.dark .slider { background-color: #334155; }
.slider:before {
  position: absolute; content: "";
  height: 18px; width: 18px; left: 3px; bottom: 3px;
  background-color: white; transition: .4s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
input:checked + .slider {
  background-color: #d7037b; /* Color de brand.primary */
}
input:focus-visible + .slider {
  box-shadow: 0 0 0 3px rgba(215, 3, 123, 0.25);
}
input:checked + .slider:before { transform: translateX(20px); }
.slider.round { border-radius: 24px; }
.slider.round:before { border-radius: 50%; }

/* Toast y animaciones */
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55); }
.toast-slide-enter-from, .toast-slide-leave-to { transform: translateX(120%); opacity: 0; }
.animate-in-up { animation: animate-in-up .5s ease-out both; }
@keyframes animate-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>