<template>
  <div class="min-h-screen font-sans antialiased bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100">
    <div aria-hidden="true" class="aurora -z-10"></div>

    <header class="brand-header shadow-md sticky top-0 z-50 border-b border-white/10 backdrop-blur-sm">
      <div class="container mx-auto px-4 sm:px-6 py-3 sm:py-3.5">
        <div class="flex items-center justify-between relative">
          <button
            @click="$router.back()"
            class="icon-btn"
            aria-label="Volver atrás"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <h2 class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold text-white whitespace-nowrap">
            Perfil de Usuario
          </h2>

          <div class="w-9 h-9"></div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 sm:px-6 py-8">
      <div class="max-w-4xl mx-auto">
        <section class="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl animate-in-up grid grid-cols-1 md:grid-cols-3 gap-0 overflow-hidden">
          <div class="col-span-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-black/20 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
            <div
              class="avatar-shell group"
              :class="[isDragOver && 'dragging']"
              @dragover.prevent="onDragOver"
              @dragleave.prevent="onDragLeave"
              @drop.prevent="onDrop"
              role="img"
              :aria-label="`Foto de perfil de ${capitalizeFirstLetter(userProfile.fullName) || 'usuario'}`"
            >
              <div class="avatar-border" aria-hidden="true"></div>

              <div class="avatar-glow" aria-hidden="true"></div>

              <template v-if="displayPhotoUrl">
                <img
                  class="avatar-img"
                  :src="displayPhotoUrl"
                  alt="Foto de perfil"
                  draggable="false"
                />
              </template>
              <template v-else>
                <div class="avatar-fallback">
                  <span class="avatar-initials">{{ initials(userProfile.fullName) }}</span>
                  <svg class="avatar-pattern" viewBox="0 0 60 60" aria-hidden="true">
                    <defs>
                      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stop-color="currentColor" stop-opacity="0.16"/>
                        <stop offset="1" stop-color="currentColor" stop-opacity="0.0"/>
                      </linearGradient>
                    </defs>
                    <rect width="60" height="60" fill="url(#g)"/>
                    <g opacity=".18">
                      <circle cx="10" cy="10" r="1"></circle>
                      <circle cx="30" cy="20" r="1"></circle>
                      <circle cx="45" cy="35" r="1"></circle>
                      <circle cx="15" cy="40" r="1"></circle>
                      <circle cx="50" cy="12" r="1"></circle>
                    </g>
                  </svg>
                </div>
              </template>

              <span class="avatar-status" title="Activo" aria-label="Estado: activo"></span>

              <button
                type="button"
                class="avatar-action"
                aria-label="Cambiar foto de perfil"
                @click="changeProfilePicture"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 5a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1l-.447-.894A2 2 0 0012.764 3H7.236a2 2 0 00-1.789 1.106L5 5H4zm6 9a4 4 0 110-8 4 4 0 010 8z"/>
                </svg>
              </button>

              <div class="avatar-overlay" @click.stop="changeProfilePicture">
                <p class="avatar-overlay-text">
                  Suelta una imagen<br/>
                  <span class="opacity-80">o haz clic</span>
                </p>
                <p class="text-[11px] text-white/75 mt-1">JPEG o PNG · máx. {{ MAX_SIZE_MB }}MB</p>
                <input ref="fileInput" type="file" accept="image/jpeg,image/png" class="hidden" @change="onFileChange" />
              </div>
            </div>

            <p class="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">Máx. {{ MAX_SIZE_MB }}MB</p>
          </div>
          <div class="col-span-1 md:col-span-2 p-6 flex flex-col">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ capitalizeFirstLetter(userProfile.fullName) }}</h1>
            <p class="text-gray-500 dark:text-slate-400 -mt-1">{{ userProfile.email }}</p>
            <div class="mt-3 flex flex-wrap items-center gap-2">
              <span class="chip">Miembro</span>
              <span class="chip bg-brand-primary text-white">Activo</span>
            </div>

            <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <h4 class="label">Intereses</h4>
              <div v-if="userProfile.interests && userProfile.interests.length > 0" class="flex flex-wrap gap-2">
                <span v-for="interest in userProfile.interests" :key="interest" class="chip bg-brand-primary text-white">
                  {{ interest }}
                </span>
              </div>
              <p v-else class="text-sm text-gray-500 dark:text-slate-400">No has añadido intereses todavía.</p>
            </div>

            <div class="mt-auto pt-4 flex flex-wrap items-center gap-2">
              <template v-if="!editMode">
                <button @click="enterEditMode" class="btn-brand">Editar Perfil</button>
                <button @click="logout" class="btn-ghost">Salir</button>
              </template>
              <template v-else>
                <button @click="saveProfile" :disabled="userStore.loading" class="btn-brand disabled:opacity-70 disabled:cursor-not-allowed">
                  <svg v-if="userStore.loading" class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  <span v-else>Guardar Cambios</span>
                </button>
                <button @click="cancelEdit" class="btn-ghost">Cancelar</button>
              </template>
            </div>
          </div>
        </section>

        <nav class="mt-6 animate-in-up" v-reveal>
          <div class="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-1.5 sm:p-2 overflow-hidden relative">
            <div class="segmented" role="tablist" aria-label="Secciones de perfil">
              <span class="seg-indicator" :style="indicatorStyle" aria-hidden="true"></span>
              <button role="tab" :aria-selected="(activeTab==='perfil').toString()" class="seg-btn" :class="activeTab==='perfil' && 'is-active'" @click="setTab('perfil')">Perfil</button>
              <button role="tab" :aria-selected="(activeTab==='seguridad').toString()" class="seg-btn" :class="activeTab==='seguridad' && 'is-active'" @click="setTab('seguridad')">Seguridad</button>
            </div>
          </div>
        </nav>

        <main class="mt-6">
          <section v-show="activeTab==='perfil'" class="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl animate-in-up" v-reveal>
            <header class="p-5 border-b border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-bold">Información Personal</h3>
              <p class="text-sm text-gray-500 dark:text-slate-400">Mantén tus datos actualizados para una mejor experiencia.</p>
            </header>
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label class="label">Nombre Completo</label>
                <p v-if="!editMode" class="display-field">{{ capitalizeFirstLetter(userProfile.fullName) || '-' }}</p>
                <input v-else v-model="editableProfile.fullName" type="text" class="input" placeholder="Tu nombre y apellido" />
              </div>
              <div>
                <label class="label">DNI / Documento</label>
                <p v-if="!editMode" class="display-field">{{ userProfile.dni || '-' }}</p>
                <input v-else v-model="editableProfile.dni" type="text" maxlength="12" inputmode="numeric" class="input" placeholder="12345678" />
              </div>

              <div>
                <label class="label">Teléfono</label>
                <p v-if="!editMode" class="display-field">
                  {{ formatPhoneGroups(userProfile.phone) || '-' }}
                </p>
                <input
                  v-else
                  class="input"
                  type="tel"
                  inputmode="tel"
                  :value="editableProfile.phone"
                  @input="onPhoneInput"
                  @paste.prevent="onPhonePaste"
                  placeholder="+51 999 999 999"
                  maxlength="21"
                />
              </div>

              <div>
                <label class="label">Fecha de Nacimiento</label>
                <p v-if="!editMode" class="display-field">{{ userProfile.dateOfBirth || '-' }}</p>
                <input v-else v-model="editableProfile.dateOfBirth" type="date" class="input" />
              </div>

              <div class="md:col-span-2">
                <label class="label">Dirección de Casa</label>
                <p v-if="!editMode" class="display-field">{{ userProfile.address || '-' }}</p>
                <input v-else v-model="editableProfile.address" type="text" class="input" placeholder="Av. Principal 123, tu ciudad" />
              </div>

              <div class="md:col-span-2">
                <label class="label">Acerca de Mí</label>
                <p v-if="!editMode" class="display-field min-h-[6rem] text-sm">{{ userProfile.bio || 'Aún no has añadido una biografía.' }}</p>
                <textarea v-else v-model="editableProfile.bio" rows="3" class="input" placeholder="Cuéntale a la comunidad sobre tus intereses..."></textarea>
              </div>

              <div v-if="editMode" class="md:col-span-2">
                <label class="label">Intereses</label>
                <div>
                  <p class="input text-sm text-gray-500">La edición de intereses no está implementada aún.</p>
                </div>
              </div>
            </div>
          </section>

          <section v-show="activeTab==='seguridad'" class="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl animate-in-up" v-reveal>
            <header class="p-5 border-b border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-bold">Seguridad y Privacidad</h3>
              <p class="text-sm text-gray-500 dark:text-slate-400">Gestiona el acceso y la seguridad de tu cuenta.</p>
            </header>
            <div class="p-6 space-y-5">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Contraseña</h4>
                  <p class="text-sm text-gray-500 dark:text-slate-400">Se recomienda actualizar tu contraseña periódicamente.</p>
                </div>
                <button @click="openChangePasswordModal" class="btn-brand">Cambiar Contraseña</button>
              </div>

              <hr class="border-gray-200 dark:border-slate-700" />

              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Dispositivos y sesiones</h4>
                  <p class="text-sm text-gray-500 dark:text-slate-400">Revisa dónde tienes la sesión iniciada y gestiona el acceso.</p>
                </div>
                <button @click="openDevicesModal" class="btn-brand">
                  Ver dispositivos actuales
                </button>
              </div>

              <hr class="border-gray-200 dark:border-slate-700" />

              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h4 class="font-semibold text-red-600 dark:text-red-500">Cerrar Sesión</h4>
                  <p class="text-sm text-gray-500 dark:text-slate-400">Finaliza tu sesión actual en este dispositivo.</p>
                </div>
                <button @click="logout" class="btn-danger">Cerrar Sesión</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>

    <transition name="toast-slide">
      <div v-if="showDevices" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40" @click="showDevices=false"></div>
        <div class="relative w-full max-w-2xl rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl">
          <header class="p-5 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h4 class="text-lg font-bold">Dispositivos actuales</h4>
              <p class="text-sm text-gray-500 dark:text-slate-400">Sesiones activas asociadas a tu cuenta.</p>
            </div>
            <button class="icon-btn" aria-label="Cerrar" @click="showDevices=false">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586z" clip-rule="evenodd"/></svg>
            </button>
          </header>

          <div class="p-5">
            <div v-if="devices.length === 0" class="text-sm text-gray-600 dark:text-slate-300">
              No encontramos sesiones activas desde el servidor.
            </div>

            <ul v-else class="space-y-3">
              <li v-for="(d, idx) in devices" :key="idx" class="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-slate-700">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg grid place-items-center bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-slate-700">
                    <svg v-if="(d.type||'').includes('Mobile')" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 15a1 1 0 100-2 1 1 0 000 2z"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 5a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4zm-1 9a3 3 0 003 3h8a3 3 0 003-3H3z"/></svg>
                  </div>
                  <div>
                    <p class="font-semibold">{{ d.name || d.userAgent || 'Dispositivo' }}</p>
                    <p class="text-xs text-gray-500 dark:text-slate-400">
                      {{ d.location || 'Ubicación desconocida' }} · {{ d.lastActive ? formatDate(d.lastActive) : 'Actividad reciente no disponible' }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span v-if="d.current" class="chip">Actual</span>
                  <button v-if="d.canRevoke !== false" @click="revokeDevice(d)" class="btn-ghost btn-sm">Cerrar sesión</button>
                </div>
              </li>
            </ul>
          </div>

          <footer class="p-5 border-t border-gray-200 dark:border-slate-700 flex justify-end">
            <button class="btn-ghost" @click="showDevices=false">Cerrar</button>
          </footer>
        </div>
      </div>
    </transition>

    <transition name="toast-slide">
      <div v-if="showToast" :class="[
        'fixed right-4 bottom-4 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border-l-4 shadow-lg bg-white dark:bg-slate-800',
        toastType === 'success' ? 'border-green-500 text-green-700 dark:text-green-300' : '',
        toastType === 'error' ? 'border-red-500 text-red-700 dark:text-red-400' : '',
        toastType === 'info' ? 'border-brand-primary text-brand-primary' : ''
      ]" role="status" aria-live="polite">
        <svg v-if="toastType === 'success'" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
        <svg v-else-if="toastType === 'error'" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>
        <svg v-else class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>
        <span class="text-sm font-semibold">{{ toastMessage }}</span>
      </div>
    </transition>
      
    <transition name="toast-slide">
      <div v-if="showPasswordModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40" @click="showPasswordModal = false"></div>
        <div class="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl">
          <header class="p-5 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h4 class="text-lg font-bold">Cambiar Contraseña</h4>
              <p class="text-sm text-gray-500 dark:text-slate-400">Actualiza tu contraseña de acceso.</p>
            </div>
            <button class="icon-btn" aria-label="Cerrar" @click="showPasswordModal = false">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586z" clip-rule="evenodd"/></svg>
            </button>
          </header>

          <form @submit.prevent="handlePasswordChange">
            <div class="p-6 space-y-5">
              <div>
                <label class="label">Contraseña Actual</label>
                <input v-model="passwordFields.current_password" type="password" class="input" required />
              </div>
              <div>
                <label class="label">Nueva Contraseña</label>
                <input v-model="passwordFields.new_password" type="password" class="input" required />
              </div>
              <div>
                <label class="label">Confirmar Nueva Contraseña</label>
                <input v-model="passwordFields.confirm_new_password" type="password" class="input" required />
              </div>
            </div>

            <footer class="p-5 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-3">
              <button type="button" class="btn-ghost" @click="showPasswordModal = false">Cancelar</button>
              <button type="submit" :disabled="userStore.loading" class="btn-brand disabled:opacity-70 disabled:cursor-not-allowed">
                <svg v-if="userStore.loading" class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                <span v-else>Actualizar</span>
              </button>
            </footer>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { ref, reactive, onMounted, watch, computed } from 'vue';

export default {
  name: 'MyProfile',
  directives: {
    reveal: {
      mounted(el) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        el.classList.add('reveal-initial');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              el.classList.add('reveal-active');
              observer.unobserve(el);
            }
          });
        }, { threshold: 0.1 });
        observer.observe(el);
      }
    }
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const editMode = ref(false);
    const editableProfile = ref({});
    const activeTab = ref('perfil');
    const darkMode = ref(false);
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastType = ref('info');
    const fileInput = ref(null);
    const isDragOver = ref(false);
    const MAX_SIZE_MB = 2;

    const showDevices = ref(false);
    const devices = ref([]);
    
    const showPasswordModal = ref(false);
    const passwordFields = reactive({
      current_password: '',
      new_password: '',
      confirm_new_password: ''
    });

    const userProfile = computed(() => userStore.getUserProfile);
    
    const displayPhotoUrl = computed(() => {
        if (userProfile.value && userProfile.value.profilePicture) {
            const url = userProfile.value.profilePicture;
            if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('blob:')) {
                return url;
            }
            return `${import.meta.env.VITE_APP_API_URL || 'http://localhost:8000'}${url}`;
        }
        return null;
    });

    const indicatorStyle = computed(() => ({
      transform: `translateX(calc(${activeTab.value === 'perfil' ? 0 : 1} * 100%))`
    }));

    const showNotification = (message, type = 'info', duration = 3000) => {
      toastMessage.value = message;
      toastType.value = type;
      showToast.value = true;
      setTimeout(() => { showToast.value = false }, duration);
    };

    const capitalizeFirstLetter = (str) => !str ? '' : str.split(' ').filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

    const initials = (name) => !name ? 'KP' : name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();

    const setTab = (tab) => activeTab.value = tab;

    const enterEditMode = () => {
      editableProfile.value = { ...userProfile.value };
      if (editableProfile.value?.phone) {
        editableProfile.value.phone = formatPhoneGroups(onlyDigits(editableProfile.value.phone));
      }
      editMode.value = true;
      showNotification('Modo de edición activado.', 'info');
    };

    const cancelEdit = () => {
      editMode.value = false;
      showNotification('Edición cancelada.', 'info');
    };

    const saveProfile = async () => {
      if (!userStore.user?.id) return showNotification('Error: ID de usuario no encontrado.', 'error');
      showNotification('Guardando cambios...', 'info');

      const payload = { ...editableProfile.value };
      if (typeof payload.phone === 'string') payload.phone = onlyDigits(payload.phone);

      const success = await userStore.updateProfile(userStore.user.id, payload);
      if (success) {
        editMode.value = false;
        showNotification('Perfil actualizado con éxito.', 'success');
      } else {
        showNotification(userStore.error || 'No se pudo actualizar el perfil.', 'error');
      }
    };

    const logout = async () => {
      showNotification('Cerrando sesión...', 'info');
      await new Promise(r => setTimeout(r, 600));
      userStore.clearUser();
      router.push('/login');
    };

    const openChangePasswordModal = () => {
      passwordFields.current_password = '';
      passwordFields.new_password = '';
      passwordFields.confirm_new_password = '';
      showPasswordModal.value = true;
    };

    const handlePasswordChange = async () => {
      if (passwordFields.new_password !== passwordFields.confirm_new_password) {
        return showNotification('Las nuevas contraseñas no coinciden.', 'error');
      }
      if (passwordFields.new_password.length < 6) {
        return showNotification('La nueva contraseña debe tener al menos 6 caracteres.', 'error');
      }

      const result = await userStore.changePassword(passwordFields);
      
      if (result.success) {
        showPasswordModal.value = false;
        showNotification(result.message, 'success');
      } else {
        showNotification(result.message, 'error');
      }
    };

    const changeProfilePicture = () => fileInput.value?.click();

    const handleFile = async (file) => {
      if (!file) return;
      if (!file.type.startsWith('image/')) return showNotification('Solo se permiten archivos de imagen.', 'error');
      if (file.size > MAX_SIZE_MB * 1024 * 1024) return showNotification(`La imagen no debe superar ${MAX_SIZE_MB}MB.`, 'error');

      const formData = new FormData();
      formData.append('file', file);

      showNotification('Subiendo imagen...', 'info');
      const result = await userStore.uploadProfilePicture(formData);

      if (result.success) {
        showNotification('Foto de perfil actualizada.', 'success');
      } else {
        showNotification(result.error || 'No se pudo subir la imagen.', 'error');
      }
    };
    
    const onFileChange = (e) => handleFile(e.target.files?.[0]);
    const onDragOver = (e) => {
      e.preventDefault();
      isDragOver.value = true;
    };
    const onDragLeave = () => { isDragOver.value = false; };
    const onDrop = (e) => {
      e.preventDefault();
      isDragOver.value = false;
      handleFile(e.dataTransfer?.files?.[0]);
    };

    const onlyDigits = (s) => (s || '').replace(/\D+/g, '');
    const formatPhoneGroups = (value) => {
      const digits = onlyDigits(value);
      return digits.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
    };
    const onPhoneInput = (e) => {
      const raw = e.target.value;
      e.target.value = formatPhoneGroups(raw);
      editableProfile.value.phone = e.target.value;
    };
    const onPhonePaste = (e) => {
      const text = (e.clipboardData || window.clipboardData).getData('text');
      const formatted = formatPhoneGroups(text);
      const target = e.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const before = target.value.slice(0, start);
      const after = target.value.slice(end);
      const merged = before + formatted + after;
      target.value = formatPhoneGroups(merged);
      editableProfile.value.phone = target.value;
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = target.value.length;
      });
    };

    const openDevicesModal = () => {
      devices.value = [
        { name: 'Chrome en Windows', location: 'Lima, Perú', lastActive: new Date().toISOString(), current: true, type: 'Desktop' },
        { name: 'App KambiaPe en Android', location: 'Ica, Perú', lastActive: new Date(Date.now() - 86400000).toISOString(), current: false, type: 'Mobile' },
      ];
      showDevices.value = true;
    };
    const revokeDevice = (d) => showNotification(`Sesión cerrada en ${d.name}.`, 'info');
    const formatDate = (iso) => new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

    onMounted(async () => {
      if (localStorage.getItem('theme') === 'dark') {
        darkMode.value = true;
        document.documentElement.classList.add('dark');
      }
      if (userStore.isLoggedIn && userStore.user?.id) {
        await userStore.fetchUserProfile(userStore.user.id);
      } else {
        router.push('/login');
      }
    });

    watch(userProfile, (newProfile) => {
      if (!editMode.value) {
        editableProfile.value = { ...newProfile };
      }
    }, { immediate: true, deep: true });

    return {
      userProfile, editMode, editableProfile, activeTab, darkMode, showToast, toastMessage, toastType, userStore,
      indicatorStyle, displayPhotoUrl,
      enterEditMode, cancelEdit, saveProfile, logout, showNotification, setTab,
      capitalizeFirstLetter, initials,
      fileInput, MAX_SIZE_MB, isDragOver,
      changeProfilePicture, onFileChange, onDragOver, onDragLeave, onDrop,
      onPhoneInput, onPhonePaste, formatPhoneGroups,
      showDevices, devices, openDevicesModal, revokeDevice, formatDate,
      showPasswordModal, passwordFields, openChangePasswordModal, handlePasswordChange
    };
  },
};
</script>

<style scoped>
/* ---------- Branding ---------- */
.brand-header { background: linear-gradient(90deg, #d7037b 0%, #9e0154 100%); }
.aurora {
  position: fixed; inset: 0; filter: blur(60px);
  background:
    radial-gradient(circle at 10% 20%, rgba(215, 3, 123, 0.10), transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.10), transparent 40%);
  animation: aurora-float 14s ease-in-out infinite;
}
@keyframes aurora-float { 50% { transform: translateY(-18px); } }

/* ---------- Botones y chips ---------- */
.icon-btn{
  width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,.1);
  border:1px solid rgba(255,255,255,.2);display:grid;place-items:center;transition:.25s ease;
}
.icon-btn:hover{ background:rgba(255,255,255,.22); transform:scale(1.08); }
.icon-btn:focus-visible{ outline:2px solid rgba(255,255,255,.6); outline-offset:2px; }

.chip{
  display:inline-block;padding:.375rem .75rem;border-radius:999px;font-size:.75rem;font-weight:700;
  background:#334155;color:#fff;
}
.dark .chip {
    background: #475569; /* slate-600 */
}
.btn-brand{
  display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.625rem 1.1rem;border-radius:.9rem;
  font-weight:700;color:#fff;background-color:#d7037b;transition:transform .12s ease, filter .2s ease;
  box-shadow:0 6px 20px -8px rgba(215,3,123,.5);
}
.btn-brand:hover{ filter:brightness(1.03); }
.btn-brand:active{ transform:translateY(1px) scale(.99); }
.btn-brand:focus-visible{ outline:3px solid #fbc7cc; outline-offset:2px; }
.btn-sm{ padding:.5rem .9rem;border-radius:.8rem;font-size:.9rem; }
.btn-ghost{
  display:inline-flex;align-items:center;justify-content:center;padding:.625rem 1.1rem;border-radius:.9rem;font-weight:700;
  color:#0f172a;background:transparent;border:1px solid #e5e7eb;transition:background .2s ease,color .2s ease,border-color .2s ease;
}
.dark .btn-ghost{ color:#f1f5f9;border-color:#334155; }
.btn-ghost:hover{ background:#f8fafc; }
.dark .btn-ghost:hover{ background:#1f2937; }
.btn-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.1rem;
  border-radius: 0.9rem;
  font-weight: 700;
  color: white;
  background-color: #ef4444; /* red-500 */
  border: 1px solid #dc2626;
  box-shadow: 0 4px 14px -4px rgba(239, 68, 68, 0.4);
  transition: all 0.2s ease-in-out;
}
.btn-danger:hover {
  background-color: #dc2626; /* red-600 */
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -6px rgba(239, 68, 68, 0.5);
}
.btn-danger:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 2px 8px -2px rgba(239, 68, 68, 0.4);
}

/* ---------- Labels, inputs ---------- */
.label{ display:block;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;font-weight:700;color:#64748b;margin-bottom:.35rem; }
.dark .label{ color:#94a3b8; }
.input{
  width:100%;border-radius:.9rem;border:1px solid #e5e7eb;background:transparent;color:inherit;padding:.8rem 1rem;
  transition:border-color .2s ease, box-shadow .2s ease;
}
.dark .input{ border-color:#334155; }
.input:focus{ outline:none;border-color:#d7037b;box-shadow:0 0 0 3px #fde9f2; }
.dark .input:focus { box-shadow:0 0 0 3px rgba(215, 3, 123, 0.2); }
.display-field{ width:100%;border-radius:.9rem;border:1px solid #e5e7eb;background:#f8fafc;padding:.8rem 1rem;font-weight:600; }
.dark .display-field{ border-color:#334155;background:#0f172a; }

/* ---------- Segmented control ---------- */
.segmented{ position:relative;display:grid;grid-template-columns:repeat(2,1fr);background:rgba(148,163,184,.08);border-radius:12px;padding:5px; }
.dark .segmented{ background-color:rgba(148,163,184,.1); }
.seg-btn{ position:relative;z-index:2;padding:.6rem .7rem;border-radius:9px;font-weight:700;color:#64748b;transition:color .25s ease; }
.dark .seg-btn{ color:#94a3b8; }
.seg-btn.is-active{ color:#0f172a; }
.dark .seg-btn.is-active{ color:#f1f5f9; }
.seg-indicator{
  position:absolute;z-index:1;width:calc(50% - 10px);height:calc(100% - 10px);left:5px;top:5px;
  background:linear-gradient(180deg,#ffffff,#f8fafc);border:1px solid #e5e7eb;border-radius:9px;box-shadow:0 3px 8px -1px rgba(0,0,0,.07);
  transition:transform .3s cubic-bezier(.25,.8,.5,1);
}
.dark .seg-indicator{ background:linear-gradient(180deg,#0b1220,#0f172a);border-color:#334155;box-shadow:0 3px 8px -1px rgba(0,0,0,.25); }

/* ---------- Avatar nuevo ---------- */
.avatar-shell{
  --size: 168px;
  --ring: 1px;
  --gap: 6px;
  --blur: 26px;

  position:relative;width:var(--size);height:var(--size);
  border-radius:999px;isolation:isolate;
  transition: transform .2s ease;
}
.avatar-shell:hover{ transform: translateY(-2px); }
.avatar-shell.dragging{ transform: scale(1.02); }

.avatar-border{
  position:absolute;inset:0;border-radius:999px;
  background: linear-gradient(90deg, #d7037b 0%, #9e0154 100%);
  filter: saturate(1.1);
  -webkit-mask:
    radial-gradient(circle at 50% 50%, transparent calc(50% - var(--gap) - var(--ring)), black calc(50% - var(--gap)))
    exclude,
    radial-gradient(circle at 50% 50%, black 60%, transparent 61%);
          mask:
    radial-gradient(circle at 50% 50%, transparent calc(50% - var(--gap) - var(--ring)), black calc(50% - var(--gap)))
    exclude,
    radial-gradient(circle at 50% 50%, black 60%, transparent 61%);
  z-index:0;
}
@keyframes spin-slow { to { transform: rotate(360deg); } }

.avatar-glow{
  position:absolute;inset:-12px;border-radius:inherit;z-index:-1;
  background: radial-gradient(40% 40% at 60% 30%, rgba(215,3,123,.25), transparent 60%),
              radial-gradient(40% 40% at 30% 70%, rgba(59,130,246,.22), transparent 60%);
  filter: blur(var(--blur));
  opacity:.7; pointer-events:none;
}

.avatar-img,
.avatar-fallback{
  position:absolute;inset:calc(var(--gap) + var(--ring));
  width:auto;height:auto;border-radius:999px;overflow:hidden;
  display:grid;place-items:center;background:
    linear-gradient(180deg, rgba(255,255,255,.75), rgba(255,255,255,.55));
}
.dark .avatar-img, .dark .avatar-fallback{
  background: linear-gradient(180deg, rgba(2,6,23,.6), rgba(2,6,23,.4));
}
.avatar-img{
  width:calc(100% - (var(--gap) + var(--ring))*2);
  height:calc(100% - (var(--gap) + var(--ring))*2);
  object-fit:cover; border:1px solid rgba(255,255,255,.5);
}
.dark .avatar-img{ border-color: rgba(30,41,59,.6); }

.avatar-fallback{
  color:#64748b; position:absolute;
  width:calc(100% - (var(--gap) + var(--ring))*2);
  height:calc(100% - (var(--gap) + var(--ring))*2);
  border:1px solid rgba(148,163,184,.3);
}
.dark .avatar-fallback{ border-color: rgba(51,65,85,.6); }

.avatar-initials{ font-size:3rem; font-weight:800; letter-spacing:.02em; z-index:1; }
.avatar-pattern{ position:absolute; inset:0; width:100%; height:100%; color:#64748b; }

.avatar-status{
  position:absolute; right:10px; bottom:10px; width:16px; height:16px; border-radius:999px;
  background: radial-gradient(circle at 30% 30%, #ffffff 10%, #22c55e 12% 100%);
  border:2px solid rgba(255,255,255,.9);
  box-shadow: 0 2px 6px rgba(34,197,94,.45);
  z-index:2;
}
.dark .avatar-status{ border-color:#0f172a; }

.avatar-action{
  position:absolute; left:50%; bottom:-6px; transform:translateX(-50%);
  display:inline-grid; place-items:center; width:34px; height:34px; border-radius:10px;
  background: rgba(15,23,42,.9); color:white; border:1px solid rgba(148,163,184,.35);
  box-shadow: 0 8px 24px -8px rgba(0,0,0,.45);
  transition: transform .15s ease, filter .2s ease, background .2s ease;
  z-index:3;
}
.avatar-shell:hover .avatar-action{ transform: translateX(-50%) translateY(-2px); }
.avatar-action:hover{ filter: brightness(1.08); }

.avatar-overlay{
  position:absolute; inset:calc(var(--gap) + var(--ring)); border-radius:inherit;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.5rem;
  background: rgba(0,0,0,.54); border:2px dashed rgba(255,255,255,.8);
  opacity:0; transition: opacity .2s ease; z-index:4; text-align:center;
  cursor: pointer;
}
.avatar-shell:hover .avatar-overlay, .avatar-shell.dragging .avatar-overlay { opacity:1; }
.avatar-shell.dragging .avatar-overlay{ background: rgba(215,3,123,.45); }
.avatar-overlay-text{ color:white; font-weight:700; line-height:1.1; pointer-events: none; }

/* ---------- Animaciones utilitarias ---------- */
.toast-slide-enter-active, .toast-slide-leave-active{ transition: all .4s cubic-bezier(.68,-.55,.27,1.55); }
.toast-slide-enter-from, .toast-slide-leave-to{ transform: translateX(120%); opacity:0; }
.animate-in-up{ animation: animate-in-up .5s ease-out both; }
.reveal-initial{ opacity:0; transform: translateY(10px); }
.reveal-active{ animation: animate-in-up .5s ease-out forwards; }
@keyframes animate-in-up{ from{ opacity:0; transform: translateY(10px); } to{ opacity:1; transform: translateY(0); } }
</style>