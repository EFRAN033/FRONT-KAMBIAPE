<template>
  <div class="min-h-screen font-sans antialiased bg-app text-ink">
    <div aria-hidden="true" class="aurora -z-10"></div>

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

    <div class="container mx-auto px-4 sm:px-6 py-8">
      <div class="max-w-4xl mx-auto">

        <section class="card animate-in-up grid grid-cols-1 md:grid-cols-3 gap-0 overflow-hidden">
          <div class="col-span-1 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-neutral-800/30 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10">
            <div
              class="avatar-shell group"
              :class="[{ 'is-editing': editMode }, isDragOver && 'dragging']"
              @dragover.prevent="onDragOver"
              @dragleave.prevent="onDragLeave"
              @drop.prevent="onDrop"
            >
              <div class="avatar-ring" aria-hidden="true"></div>
              <img v-if="displayPhotoUrl || userProfile.profilePicture" class="avatar-img" :src="displayPhotoUrl || userProfile.profilePicture" alt="Foto de perfil" />
              <div v-else class="avatar-placeholder"><span class="avatar-initials">{{ initials(userProfile.fullName) }}</span></div>

              <div v-if="editMode" class="avatar-overlay">
                <button type="button" class="btn-soft !px-3 !py-1.5" @click="changeProfilePicture">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586A1 1 0 0116 6v1a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 01.414-.805L4 5zm10-2a2 2 0 10-4 0h4z" /></svg>
                  <span>Subir</span>
                </button>
                <p class="avatar-hint">o arrastra una imagen</p>
                <input ref="fileInput" type="file" accept="image/jpeg,image/png" class="hidden" @change="onFileChange" />
              </div>
            </div>
            <p class="text-xs text-slate-500 dark:text-neutral-400 mt-3 text-center">Máx. {{ MAX_SIZE_MB }}MB</p>
          </div>

          <div class="col-span-1 md:col-span-2 p-6 flex flex-col">
            <h1 class="title">{{ capitalizeFirstLetter(userProfile.fullName) }}</h1>
            <p class="muted -mt-1">{{ userProfile.email }}</p>
            <div class="mt-3 flex flex-wrap items-center gap-2">
              <span class="chip chip-dark">Miembro</span>
              <span class="chip" :class="editMode ? 'chip-purple' : 'chip-pink'">{{ editMode ? 'Editando' : 'Activo' }}</span>
            </div>
            <div class="mt-auto pt-4 flex items-center gap-2">
              <template v-if="!editMode">
                <button @click="enterEditMode" class="btn-primary">Editar Perfil</button>
                <button @click="logout" class="btn-outline">Salir</button>
              </template>
              <template v-else>
                <button @click="saveProfile" :disabled="userStore.loading" class="btn-primary disabled:opacity-70 disabled:cursor-not-allowed">
                  <svg v-if="userStore.loading" class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  <span v-else>Guardar Cambios</span>
                </button>
                <button @click="cancelEdit" class="btn-outline">Cancelar</button>
              </template>
            </div>
          </div>
        </section>

        <nav class="mt-6 animate-in-up" v-reveal>
            <div class="card p-1.5 sm:p-2 overflow-hidden relative">
              <div class="segmented" role="tablist" aria-label="Secciones de perfil">
                <span class="seg-indicator" :style="indicatorStyle" aria-hidden="true"></span>
                <button role="tab" :aria-selected="(activeTab==='perfil').toString()" class="seg-btn" :class="activeTab==='perfil' && 'is-active'" @click="setTab('perfil')">Perfil</button>
                <button role="tab" :aria-selected="(activeTab==='seguridad').toString()" class="seg-btn" :class="activeTab==='seguridad' && 'is-active'" @click="setTab('seguridad')">Seguridad</button>
              </div>
            </div>
        </nav>

        <main class="mt-6">
          <section v-show="activeTab==='perfil'" class="card animate-in-up" v-reveal>
            <header class="section-hd">
              <h3 class="section-tt">Información Personal</h3>
              <p class="section-ds">Mantén tus datos actualizados para una mejor experiencia.</p>
            </header>
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label class="label">Nombre Completo</label>
                <p v-if="!editMode" class="field-ro">{{ capitalizeFirstLetter(userProfile.fullName) || '-' }}</p>
                <input v-else v-model="editableProfile.fullName" type="text" class="inp" placeholder="Tu nombre y apellido" />
              </div>
              <div>
                <label class="label">DNI / Documento</label>
                <p v-if="!editMode" class="field-ro">{{ userProfile.dni || '-' }}</p>
                <input v-else v-model="editableProfile.dni" type="text" class="inp" placeholder="12345678" maxlength="8" />
              </div>
              <div>
                <label class="label">Teléfono</label>
                <p v-if="!editMode" class="field-ro">{{ userProfile.phone || '-' }}</p>
                <input v-else v-model="editableProfile.phone" type="tel" class="inp" placeholder="+51 987 654 321" />
              </div>
              <div>
                <label class="label">Fecha de Nacimiento</label>
                <p v-if="!editMode" class="field-ro">{{ userProfile.dateOfBirth || '-' }}</p>
                <input v-else v-model="editableProfile.dateOfBirth" type="date" class="inp" />
              </div>
              <div class="md:col-span-2">
                <label class="label">Acerca de Mí</label>
                <p v-if="!editMode" class="field-ro min-h-[6rem] text-sm">{{ userProfile.bio || 'Aún no has añadido una biografía.' }}</p>
                <textarea v-else v-model="editableProfile.bio" rows="3" class="inp" placeholder="Cuéntale a la comunidad sobre tus intereses..."></textarea>
              </div>
            </div>
          </section>

          <section v-show="activeTab==='seguridad'" class="card animate-in-up" v-reveal>
            <header class="section-hd">
              <h3 class="section-tt">Seguridad y Privacidad</h3>
              <p class="section-ds">Gestiona el acceso y la seguridad de tu cuenta.</p>
            </header>
            <div class="p-6 space-y-5">
              <div class="row">
                <div>
                  <h4 class="subtt">Contraseña</h4>
                  <p class="muted text-sm">Se recomienda actualizar tu contraseña periódicamente.</p>
                </div>
                <button @click="changePassword" class="btn-primary btn-sm shrink-0">Cambiar Contraseña</button>
              </div>
              <hr class="sep" />
              <div class="row">
                <div>
                  <h4 class="subtt">Cerrar Sesión</h4>
                  <p class="muted text-sm">Finaliza tu sesión actual en este dispositivo.</p>
                </div>
                <button @click="logout" class="btn-danger btn-sm shrink-0">Cerrar Sesión</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>

    <transition name="toast-slide">
      <div v-if="showToast" :class="['toast', toastClasses]" role="status" aria-live="polite">
        <svg v-if="toastType === 'success'" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
        <svg v-else-if="toastType === 'error'" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>
        <svg v-else class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>
        <span class="text-sm font-semibold">{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { ref, onMounted, watch, computed } from 'vue';

export default {
  name: 'MyProfile',
  directives: {
    reveal: { // Animación de entrada al hacer scroll
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

    // --- ESTADO LOCAL DEL COMPONENTE ---
    const editMode = ref(false);
    const editableProfile = ref({});
    const activeTab = ref('perfil');
    const darkMode = ref(false);

    // --- ESTADO PARA NOTIFICACIONES (TOAST) ---
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastType = ref('info'); // 'success', 'error', 'info'

    // --- ESTADO PARA LA FOTO DE PERFIL ---
    const fileInput = ref(null);
    const selectedPhotoFile = ref(null);
    const selectedPhotoUrl = ref(null);
    const isDragOver = ref(false);
    const MAX_SIZE_MB = 2;

    // --- PROPIEDADES COMPUTADAS ---
    const userProfile = computed(() => userStore.getUserProfile);
    const displayPhotoUrl = computed(() => selectedPhotoUrl.value || '');
    const toastClasses = computed(() => ({
      'toast-success': toastType.value === 'success',
      'toast-error': toastType.value === 'error',
      'toast-info': toastType.value === 'info',
    }));
    const indicatorStyle = computed(() => {
        const index = activeTab.value === 'perfil' ? 0 : 1;
        return { transform: `translateX(calc(${index} * 100%))` };
    });

    // --- MÉTODOS ---
    const showNotification = (message, type = 'info', duration = 3000) => {
      toastMessage.value = message;
      toastType.value = type;
      showToast.value = true;
      setTimeout(() => showToast.value = false, duration);
    };

    const capitalizeFirstLetter = (str) => !str ? '' : str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    const initials = (name) => !name ? 'KP' : name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

    const goBack = () => router.back();
    const setTab = (tab) => activeTab.value = tab;

    const enterEditMode = () => {
      editableProfile.value = { ...userProfile.value };
      editMode.value = true;
      showNotification('Modo de edición activado.', 'info');
    };

    const cancelEdit = () => {
      editMode.value = false;
      resetTempPhoto();
      showNotification('Edición cancelada.', 'info');
    };

    const saveProfile = async () => {
      if (!userStore.user?.id) return showNotification('Error: ID de usuario no encontrado.', 'error');
      
      showNotification('Guardando cambios...', 'info');

      // Aquí iría la lógica para subir la imagen si se seleccionó una nueva
      // if (selectedPhotoFile.value) { ... }

      const success = await userStore.updateProfile(userStore.user.id, editableProfile.value);
      if (success) {
        editMode.value = false;
        resetTempPhoto();
        showNotification('Perfil actualizado con éxito.', 'success');
      } else {
        showNotification(userStore.error || 'No se pudo actualizar el perfil.', 'error');
      }
    };

    const logout = async () => {
      showNotification('Cerrando sesión...', 'info');
      await new Promise(r => setTimeout(r, 1000));
      userStore.clearUser();
      router.push('/login');
    };

    const changePassword = () => showNotification('Función no implementada aún.', 'info');
    
    // --- MANEJO DE IMAGEN DE PERFIL ---
    const changeProfilePicture = () => fileInput.value?.click();
    const resetTempPhoto = () => {
      if (selectedPhotoUrl.value) URL.revokeObjectURL(selectedPhotoUrl.value);
      selectedPhotoFile.value = null;
      selectedPhotoUrl.value = null;
    };
    const handleFile = (file) => {
      if (!file) return;
      if (!file.type.startsWith('image/')) return showNotification('Solo se permiten archivos de imagen.', 'error');
      if (file.size > MAX_SIZE_MB * 1024 * 1024) return showNotification(`La imagen no debe superar ${MAX_SIZE_MB}MB.`, 'error');
      
      resetTempPhoto();
      selectedPhotoFile.value = file;
      selectedPhotoUrl.value = URL.createObjectURL(file);
      if (!editMode.value) enterEditMode();
    };
    const onFileChange = (e) => handleFile(e.target.files?.[0]);
    const onDragOver = (e) => { if (editMode.value) isDragOver.value = true; };
    const onDragLeave = () => isDragOver.value = false;
    const onDrop = (e) => {
      isDragOver.value = false;
      if (editMode.value) handleFile(e.dataTransfer?.files?.[0]);
    };

    // --- DARK MODE ---
    const toggleTheme = () => {
      darkMode.value = !darkMode.value;
      document.documentElement.classList.toggle('dark', darkMode.value);
      localStorage.setItem('theme', darkMode.value ? 'dark' : 'light');
    };

    // --- HOOKS DEL CICLO DE VIDA ---
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
      // Estado
      userProfile, editMode, editableProfile, activeTab, darkMode, showToast, toastMessage, toastType, userStore,
      // Computadas
      toastClasses, indicatorStyle, displayPhotoUrl,
      // Métodos
      goBack, enterEditMode, cancelEdit, saveProfile, logout, changePassword, showNotification, setTab, toggleTheme,
      // Utils
      capitalizeFirstLetter, initials,
      // Lógica de archivos
      fileInput, MAX_SIZE_MB, isDragOver,
      changeProfilePicture, onFileChange, onDragOver, onDragLeave, onDrop,
    };
  },
};
</script>

<style scoped>
/* ======= TEMA Y COLORES BASE ======= */
:root {
  --app-bg: #f9fafb; --ink: #111827; --muted: #6b7280; --card-bg: #ffffff; --border-color: #e5e7eb;
  --brand-pink: #ec4899; --brand-purple: #a855f7; --brand-blue: #3b82f6;
  --success: #16a34a; --danger: #dc2626; --info: #2563eb;
}
:root.dark {
  --app-bg: #0f172a; --ink: #f1f5f9; --muted: #94a3b8; --card-bg: #1e293b; --border-color: #334155;
}
.bg-app { background-color: var(--app-bg); }
.text-ink { color: var(--ink); }
.muted { color: var(--muted); }

/* ======= COMPONENTES REUTILIZABLES ======= */
.container { max-width: 1280px; }
.card { background-color: var(--card-bg); border: 1px solid var(--border-color); border-radius: 1.25rem; }
.btn-ghost { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border-radius: 0.75rem; transition: background-color 0.2s; }
.btn-ghost:hover { background-color: rgba(127,127,127,0.1); }
.btn-primary { display: inline-flex; align-items: center; justify-content: center; padding: 0.625rem 1.25rem; border-radius: 0.75rem; font-weight: 600; color: white; background: var(--brand-pink); transition: transform 0.1s, filter 0.2s; }
.btn-primary:hover { filter: brightness(1.1); }
.btn-primary:active { transform: scale(0.97); }
.btn-outline { display: inline-flex; align-items: center; justify-content: center; padding: 0.625rem 1.25rem; border-radius: 0.75rem; font-weight: 600; color: var(--ink); border: 1px solid var(--border-color); background-color: transparent; transition: background-color 0.2s; }
.btn-outline:hover { background-color: rgba(127,127,127,0.05); }
.btn-danger { background: var(--danger); }
.btn-soft { background-color: rgba(236, 72, 153, 0.1); color: #be185d; }
.dark .btn-soft { background-color: rgba(236, 72, 153, 0.15); color: #f9a8d4; }

.label { display: block; font-size: 0.75rem; font-weight: 600; color: var(--muted); margin-bottom: 0.375rem; text-transform: uppercase; letter-spacing: 0.05em; }
.inp, .field-ro { width: 100%; border-radius: 0.75rem; padding: 0.75rem 1rem; border: 1px solid var(--border-color); font-size: 0.95rem; }
.inp { background-color: transparent; color: var(--ink); transition: box-shadow 0.2s, border-color 0.2s; }
.inp:focus { outline: none; border-color: var(--brand-pink); box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.2); }
.field-ro { background-color: rgba(148, 163, 184, 0.08); font-weight: 500; }
.dark .field-ro { background-color: rgba(148, 163, 184, 0.1); }

.chip { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 99px; font-size: 0.75rem; font-weight: 600; }
.chip-dark { background-color: #334155; color: #f1f5f9; }
.dark .chip-dark { background-color: #475569; color: #f1f5f9; }
.chip-pink { background-color: #fce7f3; color: #be185d; }
.dark .chip-pink { background-color: #581c87; color: #f0abfc; }
.chip-purple { background-color: #f5f3ff; color: #7c3aed; }
.dark .chip-purple { background-color: #3b0764; color: #d8b4fe; }

/* ======= LAYOUT Y SECCIONES ======= */
.aurora { position: fixed; inset: 0; filter: blur(60px); background: radial-gradient(circle at 10% 20%, rgba(236, 72, 153, 0.15), transparent 40%), radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.15), transparent 40%); animation: aurora-float 12s ease-in-out infinite; }
@keyframes aurora-float { 50% { transform: translateY(-20px); } }
.brand { font-size: 1.25rem; font-weight: 800; }
.brand-core { color: var(--ink); }
.brand-emph { color: var(--brand-pink); }
.section-hd { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-color); }
.section-tt { font-weight: 700; font-size: 1.125rem; }
.section-ds { font-size: 0.875rem; color: var(--muted); }
.subtt { font-weight: 600; }
.title { font-size: 1.5rem; font-weight: 700; }
.row { display: flex; flex-direction: column; gap: 0.75rem; }
@media (min-width: 768px) { .row { flex-direction: row; align-items: center; justify-content: space-between; } }
.sep { border-color: var(--border-color); }

/* ======= AVATAR ======= */
.avatar-shell { position: relative; width: 160px; height: 160px; }
.avatar-ring { position: absolute; inset: 0; border-radius: 999px; padding: 5px; background: conic-gradient(from 180deg, var(--brand-pink), var(--brand-purple), var(--brand-blue), var(--brand-pink)); animation: spin 8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.avatar-img, .avatar-placeholder { width: 100%; height: 100%; border-radius: 999px; object-fit: cover; background-color: #e5e7eb; border: 3px solid var(--card-bg); display: grid; place-items: center; }
.avatar-initials { font-size: 3rem; font-weight: 700; color: var(--muted); }
.avatar-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 999px; background-color: rgba(0,0,0,0.5); border: 2px dashed rgba(255,255,255,0.7); opacity: 0; transition: opacity 0.2s; }
.avatar-shell.is-editing .avatar-overlay { opacity: 1; }
.avatar-shell.dragging .avatar-overlay { background-color: rgba(236, 72, 153, 0.5); }
.avatar-hint { font-size: 0.7rem; color: white; text-align: center; }

/* ======= TABS ======= */
.segmented{ position: relative; display: grid; grid-template-columns: repeat(2, 1fr); background: rgba(148,163,184,.12); border: 1px solid rgba(148,163,184,.25); border-radius: 12px; padding: 5px; }
.dark .segmented { background-color: rgba(148,163,184, .1); border-color: rgba(148,163,184, .2); }
.seg-btn{ position: relative; z-index: 2; padding: .6rem .7rem; border-radius: 9px; font-weight: 600; color: var(--muted); transition: color .25s ease; }
.seg-btn.is-active{ color: var(--ink); }
.seg-indicator{ position: absolute; z-index: 1; width: calc(50% - 10px); height: calc(100% - 10px); left: 5px; top: 5px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 9px; box-shadow: 0 3px 8px -1px rgba(0,0,0,0.07); transition: transform .3s cubic-bezier(.25, .8, .5, 1); }
.dark .seg-indicator { box-shadow: 0 3px 8px -1px rgba(0,0,0,0.2); }

/* ======= TOAST ======= */
.toast { position: fixed; right: 1rem; bottom: 1rem; z-index: 50; display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem; border-radius: 0.75rem; border: 1px solid var(--border-color); background-color: var(--card-bg); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
.toast-success { border-left: 4px solid var(--success); color: var(--success); }
.toast-error { border-left: 4px solid var(--danger); color: var(--danger); }
.toast-info { border-left: 4px solid var(--info); color: var(--info); }
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55); }
.toast-slide-enter-from, .toast-slide-leave-to { transform: translateX(120%); opacity: 0; }

/* ======= ANIMACIONES DE ENTRADA ======= */
.animate-in-up { animation: animate-in-up 0.5s ease-out both; }
.reveal-initial { opacity: 0; transform: translateY(10px); }
.reveal-active { animation: animate-in-up 0.5s ease-out forwards; }
@keyframes animate-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>