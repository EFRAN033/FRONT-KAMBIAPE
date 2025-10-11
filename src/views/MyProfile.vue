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

              <template v-if="displayPhotoUrl && !imageHasError">
                <img 
                  class="avatar-img" 
                  :src="displayPhotoUrl" 
                  alt="Foto de perfil" 
                  draggable="false"
                  @error="handleImageError" 
                />
              </template>
              <template v-else>
                <div class="avatar-fallback">
                  <span class="avatar-initials">{{ userStore.userInitials }}</span>
                  <svg class="avatar-pattern" viewBox="0 0 60 60" aria-hidden="true"></svg>
                </div>
              </template>

              <span class="avatar-status" title="Activo" aria-label="Estado: activo"></span>

              <button type="button" class="avatar-action" aria-label="Cambiar foto de perfil" @click="changeProfilePicture">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 5a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1l-.447-.894A2 2 0 0012.764 3H7.236a2 2 0 00-1.789 1.106L5 5H4zm6 9a4 4 0 110-8 4 4 0 010 8z"/>
                </svg>
              </button>

              <div class="avatar-overlay" @click.stop="changeProfilePicture">
                <p class="avatar-overlay-text">Suelta una imagen<br/><span class="opacity-80">o haz clic</span></p>
                <p class="text-[11px] text-white/75 mt-1">JPEG o PNG · máx. {{ MAX_SIZE_MB }}MB</p>
                <input ref="fileInput" type="file" accept="image/jpeg,image/png" class="hidden" @change="onFileChange" />
              </div>
            </div>

            <p class="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">Máx. {{ MAX_SIZE_MB }}MB</p>
          </div>

          <div class="col-span-1 md:col-span-2 p-6 flex flex-col">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ capitalizeFirstLetter(userProfile.fullName) }}</h1>
            <p class="text-gray-500 dark:text-slate-400 -mt-1">{{ userProfile.email }}</p>

            <div class="status-line mt-4" role="status" aria-label="Estado de cuenta">
              <span class="flag-role" title="Rol"> 
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 -mt-[1px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"/>
                </svg>
                <span class="flag-text">Miembro</span>
              </span>
              <span class="line-sep" aria-hidden="true"></span>
              <span class="state-chip" title="Estado">
                <span class="led" aria-hidden="true"></span>
                <span class="sr-only">Estado:</span>
                <span class="state-text">Activo</span>
              </span>
            </div>

            <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <h4 class="label">Intereses</h4>
              <div v-if="userProfile.interests && userProfile.interests.length > 0" class="flex flex-wrap gap-1.5">
                <span v-for="interest in userProfile.interests" :key="interest" class="badge-sq">
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

        <nav class="mt-6 animate-in-up">
          <div class="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-1.5 sm:p-2 overflow-hidden relative">
            <div class="segmented" role="tablist" aria-label="Secciones de perfil">
              <span class="seg-indicator" :style="indicatorStyle" aria-hidden="true"></span>
              <button role="tab" :aria-selected="(activeTab==='perfil').toString()" class="seg-btn" :class="activeTab==='perfil' && 'is-active'" @click="setTab('perfil')">Perfil</button>
              <button role="tab" :aria-selected="(activeTab==='seguridad').toString()" class="seg-btn" :class="activeTab==='seguridad' && 'is-active'" @click="setTab('seguridad')">Seguridad</button>
            </div>
          </div>
        </nav>

        <main class="mt-6">
          <section v-show="activeTab==='perfil'" class="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl animate-in-up">
            <header class="p-5 border-b border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-bold">Información Personal</h3>
              <p class="text-sm text-gray-500 dark:text-slate-400">Mantén tus datos actualizados para una mejor experiencia.</p>
            </header>

            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label class="label">Nombre Completo</label>
                <p class="display-field">{{ capitalizeFirstLetter(userProfile.fullName) || '-' }}</p>
              </div>
              <div>
                <label class="label">DNI / Documento</label>
                <p class="display-field">{{ userProfile.dni || '-' }}</p>
              </div>

              <div>
                <label class="label">Teléfono</label>
                <p v-if="!editMode" class="display-field">{{ formatPhoneGroups(userProfile.phone) || '-' }}</p>
                <input v-else class="input" type="tel" inputmode="tel" :value="editableProfile.phone" @input="onPhoneInput" @paste.prevent="onPhonePaste" placeholder="+51 999 999 999" maxlength="21" />
              </div>

              <div>
                <label class="label">Fecha de Nacimiento</label>
                <p class="display-field">{{ formatDateForDisplay(userProfile.dateOfBirth) || '-' }}</p>
              </div>

              <div class="md:col-span-2">
                <label class="label">Ubicación</label>
                <p v-if="!editMode" class="display-field">{{ formatUbicacionForDisplay(userProfile.ubicacion) || '-' }}</p>
                <div v-else class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label for="departamento" class="label text-xs">Departamento</label>
                    <select id="departamento" v-model="selectedDepartamentoId" @change="onDepartamentoChange" class="input">
                      <option disabled value="">Seleccione</option>
                      <option v-for="depto in departamentos" :key="depto.id_ubigeo" :value="depto.id_ubigeo">{{ depto.nombre_ubigeo }}</option>
                    </select>
                  </div>
                  <div>
                    <label for="provincia" class="label text-xs">Provincia</label>
                    <select id="provincia" v-model="selectedProvinciaId" @change="onProvinciaChange" class="input" :disabled="!selectedDepartamentoId">
                      <option disabled value="">Seleccione</option>
                      <option v-for="prov in provincias" :key="prov.id_ubigeo" :value="prov.id_ubigeo">{{ prov.nombre_ubigeo }}</option>
                    </select>
                  </div>
                  <div>
                    <label for="distrito" class="label text-xs">Distrito</label>
                    <select id="distrito" v-model="editableProfile.ubicacion" class="input" :disabled="!selectedProvinciaId">
                      <option disabled value="">Seleccione</option>
                      <option v-for="dist in distritos" :key="dist.id_ubigeo" :value="dist.nombre_ubigeo">{{ dist.nombre_ubigeo }}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="md:col-span-2">
                <label class="label">Acerca de Mí</label>
                <p v-if="!editMode" class="display-field min-h-[6rem] text-sm">{{ userProfile.bio || 'Aún no has añadido una biografía.' }}</p>
                <textarea v-else v-model="editableProfile.bio" rows="3" class="input" placeholder="Cuéntale a la comunidad sobre tus intereses..."></textarea>
              </div>

              <div class="md:col-span-2">
                <label class="label">Intereses</label>
                 <div v-if="!editMode">
                  <p v-if="!userProfile.interests || userProfile.interests.length === 0" class="text-sm text-gray-500 dark:text-slate-400 mt-2">
                    Aún no has seleccionado intereses.
                  </p>
                  <div v-else class="flex flex-wrap gap-1.5">
                    <span v-for="interest in userProfile.interests" :key="interest" class="badge-sq">
                      {{ interest }}
                    </span>
                  </div>
                </div>
                <div v-else>
                  <div class="p-3 border border-dashed border-slate-300 dark:border-slate-600 rounded-[6px] bg-transparent">
                    <p v-if="editableInterests.size === 0" class="text-sm text-slate-500 dark:text-slate-400">
                      Selecciona tus intereses de la lista de abajo.
                    </p>
                    <div v-else class="flex flex-wrap gap-1.5">
                      <span v-for="interestName in editableInterests" :key="`selected-${interestName}`" class="badge-sq badge-sq--active">
                        {{ interestName }}
                        <button @click="toggleInterest(interestName)" type="button" class="badge-remove" :aria-label="`Quitar ${interestName}`">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    </div>
                  </div>
                  <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p class="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">Añadir Intereses:</p>
                    <div v-if="availableCategories.length > 0" class="tile-list">
                      <button v-for="category in availableCategories" :key="category.id" type="button" class="tile" :class="editableInterests.has(category.name) && 'is-selected'" :aria-pressed="editableInterests.has(category.name)" @click="toggleInterest(category.name)">
                        <span class="tile-check" aria-hidden="true">
                          <svg v-if="editableInterests.has(category.name)" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.707 14.707a1 1 0 01-1.414 0L3.293 10.707a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </span>
                        <span class="tile-text">{{ category.name }}</span>
                      </button>
                    </div>
                    <p v-else-if="allCategories.length > 0" class="text-sm text-slate-500 dark:text-slate-400">
                      ¡Has seleccionado todos los intereses disponibles!
                    </p>
                    <p v-else class="text-sm text-slate-500 dark:text-slate-400">
                      Cargando categorías...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section v-show="activeTab==='seguridad'" class="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl animate-in-up">
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
                <button @click="openDevicesModal" class="btn-brand">Ver dispositivos actuales</button>
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
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { ref, reactive, onMounted, watch, computed } from 'vue';
import axios from '@/axios';

// --- IMPORTAMOS LOS NUEVOS ARCHIVOS JSON ---
import departamentosData from '@/data/departamentos.json';
import provinciasData from '@/data/provincias.json';
import distritosData from '@/data/distritos.json';

const userStore = useUserStore();
const router = useRouter();

// --- Estados para la UI ---
const editMode = ref(false);
const activeTab = ref('perfil');
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('info');
const fileInput = ref(null);
const isDragOver = ref(false);
const MAX_SIZE_MB = 2;
const imageHasError = ref(false);

// --- Estados para modales y datos ---
const showDevices = ref(false);
const devices = ref([]);
const showPasswordModal = ref(false);
const passwordFields = reactive({ current_password: '', new_password: '', confirm_new_password: '' });

// --- Estados para el formulario de perfil ---
const editableProfile = ref({});
const allCategories = ref([]);
const editableInterests = ref(new Set());

// --- ESTADOS PARA UBIGEO ---
const departamentos = ref(departamentosData);
const provincias = ref([]);
const distritos = ref([]);
const selectedDepartamentoId = ref('');
const selectedProvinciaId = ref('');

// --- Propiedades Computadas ---
const userProfile = computed(() => userStore.getUserProfile);
const indicatorStyle = computed(() => ({ transform: `translateX(calc(${activeTab.value === 'perfil' ? 0 : 1} * 100%))` }));

const displayPhotoUrl = computed(() => {
  imageHasError.value = false;
  return userStore.user?.profilePicture;
});

const availableCategories = computed(() => {
  return allCategories.value.filter(category => !editableInterests.value.has(category.name));
});

// --- LÓGICA DE UBIGEO ---
const onDepartamentoChange = () => {
  provincias.value = provinciasData[selectedDepartamentoId.value] || [];
  selectedProvinciaId.value = '';
  distritos.value = [];
  editableProfile.value.ubicacion = '';
};

const onProvinciaChange = () => {
  distritos.value = distritosData[selectedProvinciaId.value] || [];
  editableProfile.value.ubicacion = '';
};

const findUbigeoInfo = (distritoName) => {
  for (const provId in distritosData) {
    const distrito = distritosData[provId].find(d => d.nombre_ubigeo === distritoName);
    if (distrito) {
      for (const depId in provinciasData) {
        const provincia = provinciasData[depId].find(p => p.id_ubigeo === distrito.id_padre_ubigeo);
        if (provincia) {
          const departamento = departamentosData.find(d => d.id_ubigeo === provincia.id_padre_ubigeo);
          return {
            departamento: departamento,
            provincia: provincia,
            distrito: distrito
          };
        }
      }
    }
  }
  return null;
};

const setupUbigeoFromProfile = (ubicacionName) => {
  if (!ubicacionName) return;
  const info = findUbigeoInfo(ubicacionName);
  if (info) {
    selectedDepartamentoId.value = info.departamento.id_ubigeo;
    provincias.value = provinciasData[info.departamento.id_ubigeo] || [];
    selectedProvinciaId.value = info.provincia.id_ubigeo;
    distritos.value = distritosData[info.provincia.id_ubigeo] || [];
    editableProfile.value.ubicacion = info.distrito.nombre_ubigeo;
  }
};

const formatUbicacionForDisplay = (distritoName) => {
  if (!distritoName) return null;
  const info = findUbigeoInfo(distritoName);
  if (info) {
    return `${info.distrito.nombre_ubigeo}, ${info.provincia.nombre_ubigeo}, ${info.departamento.nombre_ubigeo}`;
  }
  return distritoName;
};

// --- Funciones de Utilidad ---
const handleImageError = () => { imageHasError.value = true; };
const formatDateForDisplay = (localeDate) => {
  if (!localeDate) return null;
  const parts = localeDate.split('/');
  if (parts.length !== 3) return localeDate;
  return `${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[2]}`;
};
const formatDateForInput = (localeDate) => {
  if (!localeDate) return '';
  const parts = localeDate.split('/');
  if (parts.length !== 3) return '';
  return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
};
const showNotification = (message, type = 'info', duration = 3000) => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => { showToast.value = false; }, duration);
};
const capitalizeFirstLetter = (str) => !str ? '' : str.split(' ').filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
const setTab = (tab) => activeTab.value = tab;

// --- Lógica de Negocio (API calls, etc.) ---
const fetchCategories = async () => {
  try {
    const response = await axios.get('/categories');
    allCategories.value = response.data;
  } catch (error) {
    console.error("Error al cargar las categorías:", error);
    showNotification('No se pudieron cargar las categorías de intereses.', 'error');
  }
};

const enterEditMode = async () => {
  const profileCopy = JSON.parse(JSON.stringify(userProfile.value));
  profileCopy.dateOfBirth = formatDateForInput(profileCopy.dateOfBirth);
  editableProfile.value = profileCopy;
  
  // Inicializamos los selectores de ubicación
  setupUbigeoFromProfile(userProfile.value.ubicacion);
  
  editableInterests.value = new Set(userProfile.value.interests || []);
  if (editableProfile.value?.phone) {
    editableProfile.value.phone = formatPhoneGroups(onlyDigits(editableProfile.value.phone));
  }
  editMode.value = true;
  showNotification('Modo de edición activado.', 'info');
  if (allCategories.value.length === 0) {
    await fetchCategories();
  }
};

const cancelEdit = () => {
  editMode.value = false;
  showNotification('Edición cancelada.', 'info');
};

const saveProfile = async () => {
  if (!userStore.user?.id) return showNotification('Error: ID de usuario no encontrado.', 'error');
  showNotification('Guardando cambios...', 'info');
  const selectedInterestIds = Array.from(editableInterests.value)
    .map(name => allCategories.value.find(cat => cat.name === name)?.id)
    .filter(id => id !== null);
  const payload = { ...editableProfile.value, interest_ids: selectedInterestIds };
  delete payload.interests;
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
  Object.assign(passwordFields, { current_password: '', new_password: '', confirm_new_password: '' });
  showPasswordModal.value = true;
};

const handlePasswordChange = async () => {
  if (passwordFields.new_password !== passwordFields.confirm_new_password) return showNotification('Las nuevas contraseñas no coinciden.', 'error');
  if (passwordFields.new_password.length < 6) return showNotification('La nueva contraseña debe tener al menos 6 caracteres.', 'error');
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
const onDragOver = (e) => { e.preventDefault(); isDragOver.value = true; };
const onDragLeave = () => { isDragOver.value = false; };
const onDrop = (e) => { e.preventDefault(); isDragOver.value = false; handleFile(e.dataTransfer?.files?.[0]); };

const onlyDigits = (s) => (s || '').replace(/\D+/g, '');
const formatPhoneGroups = (value) => { const digits = onlyDigits(value); return digits.replace(/(\d{3})(?=\d)/g, '$1 ').trim(); };
const onPhoneInput = (e) => { const raw = e.target.value; e.target.value = formatPhoneGroups(raw); editableProfile.value.phone = e.target.value; };
const onPhonePaste = (e) => {
  const text = (e.clipboardData || window.clipboardData).getData('text');
  const formatted = formatPhoneGroups(text);
  const target = e.target;
  const start = target.selectionStart, end = target.selectionEnd;
  const merged = target.value.slice(0, start) + formatted + target.value.slice(end);
  target.value = formatPhoneGroups(merged);
  editableProfile.value.phone = target.value;
  requestAnimationFrame(() => { target.selectionStart = target.selectionEnd = target.value.length; });
};

const openDevicesModal = () => {
  devices.value = [
    { name: 'Chrome en Windows', location: 'Lima, Perú', lastActive: new Date().toISOString(), current: true, type: 'Desktop' },
    { name: 'App KambiaPe en Android', location: 'Ica, Perú', lastActive: new Date(Date.now() - 86400000).toISOString(), current: false, type: 'Mobile' },
  ];
  showDevices.value = true;
};
const toggleInterest = (interestName) => {
  if (editableInterests.value.has(interestName)) {
    editableInterests.value.delete(interestName);
  } else {
    editableInterests.value.add(interestName);
  }
};

// --- Lifecycle Hooks ---
onMounted(async () => {
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
</script>


<style scoped>
/* (Tus estilos se mantienen exactamente iguales, no es necesario copiarlos aquí de nuevo) */
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

.icon-btn{ width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2);display:grid;place-items:center;transition:.25s; }
.icon-btn:hover{ background:rgba(255,255,255,.22); transform:scale(1.08); }
.icon-btn:focus-visible{ outline:2px solid rgba(255,255,255,.6); outline-offset:2px; }

.btn-brand{
  display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.625rem 1.1rem;border-radius:.9rem;
  font-weight:700;color:#fff;background-color:#d7037b;transition:transform .12s ease, filter .2s ease;
  box-shadow:0 6px 20px -8px rgba(215,3,123,.5);
}
.btn-brand:hover{ filter:brightness(1.03); }
.btn-brand:active{ transform:translateY(1px) scale(.99); }
.btn-brand:focus-visible{ outline:3px solid #fbc7cc; outline-offset:2px; }
.btn-ghost{
  display:inline-flex;align-items:center;justify-content:center;padding:.625rem 1.1rem;border-radius:.9rem;font-weight:700;
  color:#0f172a;background:transparent;border:1px solid #e5e7eb;transition:background .2s ease,color .2s ease,border-color .2s ease;
}
.dark .btn-ghost{ color:#f1f5f9;border-color:#334155; }
.btn-ghost:hover{ background:#f8fafc; }
.dark .btn-ghost:hover{ background:#1f2937; }
.btn-danger{ display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.625rem 1.1rem;border-radius:.9rem;font-weight:700;color:white;background:#ef4444;border:1px solid #dc2626;box-shadow:0 4px 14px -4px rgba(239,68,68,.4);transition:.2s; }
.btn-danger:hover{ background:#dc2626; transform: translateY(-2px); box-shadow:0 8px 20px -6px rgba(239,68,68,.5); }
.btn-danger:active{ transform: translateY(0) scale(.98); box-shadow:0 2px 8px -2px rgba(239,68,68,.4); }

.label{ display:block;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;font-weight:700;color:#64748b;margin-bottom:.35rem; }
.dark .label{ color:#94a3b8; }
.input{ width:100%;border-radius:.9rem;border:1px solid #e5e7eb;background:transparent;color:inherit;padding:.8rem 1rem; transition:border-color .2s ease, box-shadow .2s ease; }
.dark .input{ border-color:#334155; }
.input:focus{ outline:none;border-color:#d7037b;box-shadow:0 0 0 3px #fde9f2; }
.dark .input:focus { box-shadow:0 0 0 3px rgba(215, 3, 123, 0.2); }
.display-field{ width:100%;border-radius:.9rem;border:1px solid #e5e7eb;background:#f8fafc;padding:.8rem 1rem;font-weight:600; }
.dark .display-field{ border-color:#334155;background:#0f172a; }

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

.avatar-shell{ --size:168px; --ring:1px; --gap:6px; --blur:26px; position:relative;width:var(--size);height:var(--size);border-radius:999px;isolation:isolate;transition: transform .2s ease; }
.avatar-shell:hover{ transform: translateY(-2px); }
.avatar-shell.dragging{ transform: scale(1.02); }
.avatar-border{ position:absolute;inset:0;border-radius:999px;background: linear-gradient(90deg, #d7037b 0%, #9e0154 100%);filter: saturate(1.1);
  -webkit-mask: radial-gradient(circle at 50% 50%, transparent calc(50% - var(--gap) - var(--ring)), black calc(50% - var(--gap))) exclude,
                radial-gradient(circle at 50% 50%, black 60%, transparent 61%);
          mask: radial-gradient(circle at 50% 50%, transparent calc(50% - var(--gap) - var(--ring)), black calc(50% - var(--gap))) exclude,
                radial-gradient(circle at 50% 50%, black 60%, transparent 61%); }
.avatar-glow{ position:absolute;inset:-12px;border-radius:inherit;z-index:-1;background: radial-gradient(40% 40% at 60% 30%, rgba(215,3,123,.25), transparent 60%),
              radial-gradient(40% 40% at 30% 70%, rgba(59,130,246,.22), transparent 60%);filter: blur(var(--blur));opacity:.7; pointer-events:none; }
.avatar-img, .avatar-fallback{ position:absolute;inset:calc(var(--gap) + var(--ring));border-radius:999px;overflow:hidden;display:grid;place-items:center;background:linear-gradient(180deg, rgba(255,255,255,.75), rgba(255,255,255,.55)); }
.dark .avatar-img, .dark .avatar-fallback{ background: linear-gradient(180deg, rgba(2,6,23,.6), rgba(2,6,23,.4)); }
.avatar-img{ width:calc(100% - (var(--gap) + var(--ring))*2);height:calc(100% - (var(--gap) + var(--ring))*2);object-fit:cover; border:1px solid rgba(255,255,255,.5); }
.dark .avatar-img{ border-color: rgba(30,41,59,.6); }
.avatar-fallback{ color:#64748b; border:1px solid rgba(148,163,184,.3); }
.dark .avatar-fallback{ border-color: rgba(51,65,85,.6); }
.avatar-initials{ font-size:3rem; font-weight:800; letter-spacing:.02em; z-index:1; }
.avatar-pattern{ position:absolute; inset:0; width:100%; height:100%; color:#64748b; }
.avatar-status{ position:absolute; right:10px; bottom:10px; width:16px; height:16px; border-radius:999px;background: radial-gradient(circle at 30% 30%, #ffffff 10%, #22c55e 12% 100%);border:2px solid rgba(255,255,255,.9);box-shadow: 0 2px 6px rgba(34,197,94,.45); z-index:2; }
.dark .avatar-status{ border-color:#0f172a; }
.avatar-action{ position:absolute; left:50%; bottom:-6px; transform:translateX(-50%);display:inline-grid; place-items:center; width:34px; height:34px; border-radius:10px;background: rgba(15,23,42,.9); color:white; border:1px solid rgba(148,163,184,.35); box-shadow:0 8px 24px -8px rgba(0,0,0,.45); transition:.15s; z-index:3; }
.avatar-shell:hover .avatar-action{ transform: translateX(-50%) translateY(-2px); }
.avatar-action:hover{ filter: brightness(1.08); }
.avatar-overlay{ position:absolute; inset:calc(var(--gap) + var(--ring)); border-radius:inherit; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.5rem;background: rgba(0,0,0,.54); border:2px dashed rgba(255,255,255,.8); opacity:0; transition: opacity .2s ease; z-index:4; text-align:center; cursor: pointer; }
.avatar-shell:hover .avatar-overlay, .avatar-shell.dragging .avatar-overlay { opacity:1; }
.avatar-shell.dragging .avatar-overlay{ background: rgba(215,3,123,.45); }
.avatar-overlay-text{ color:white; font-weight:700; line-height:1.1; pointer-events: none; }

.status-line{
  display:flex; align-items:center; gap:.6rem;
  padding:.4rem .6rem; border:1px solid #E2E8F0; background:#fff; border-radius:6px;
  box-shadow:0 2px 10px -6px rgba(2,6,23,.18); width:max-content;
}
.dark .status-line{ background:#0b1220; border-color:#334155; box-shadow:0 2px 10px -6px rgba(0,0,0,.55); }

.flag-role{
  display:inline-flex; align-items:center; gap:.4rem;
  padding:.22rem .45rem; border:1px solid #E2E8F0; background:#F8FAFC; color:#0f172a;
  font-weight:800; font-size:.78rem; letter-spacing:.02em; border-radius:4px;
}
.dark .flag-role{ border-color:#475569; background:#0f172a; color:#e2e8f0; }
.flag-text{ text-transform:none; }
.line-sep{
  width:1px; height:16px; background:linear-gradient(to bottom, transparent, #CBD5E1, transparent);
}
.dark .line-sep{ background:linear-gradient(to bottom, transparent, #475569, transparent); }

.state-chip{
  display:inline-flex; align-items:center; gap:.4rem;
  padding:.22rem .45rem; border:1px solid #A7F3D0; background:#E6FBEF; color:#065F46;
  font-weight:800; font-size:.78rem; border-radius:4px;
}
.dark .state-chip{ border-color:#0f5a44; background:#052e22; color:#91f0cc; }
.led{
  width:8px; height:8px; border-radius:2px; background:#22c55e; box-shadow:0 0 0 2px rgba(34,197,94,.25);
  position:relative; display:inline-block;
}
.led::after{
  content:""; position:absolute; inset:-4px; border-radius:4px; border:1px solid rgba(34,197,94,.45);
  animation:pulse 1.4s ease-out infinite;
}
@keyframes pulse{ 0%{transform:scale(1); opacity:.8} 70%{transform:scale(1.7); opacity:0} 100%{opacity:0} }

.badge-sq{
  display:inline-flex; align-items:center; gap:.35rem;
  padding:.28rem .5rem; font-size:.75rem; font-weight:700; line-height:1;
  border:1px solid #E2E8F0; color:#0f172a; background:#fff; border-radius:4px; box-shadow:0 1px 0 rgba(2,6,23,.05);
}
.dark .badge-sq{ border-color:#334155; color:#e2e8f0; background:#0b1220; box-shadow:0 1px 0 rgba(0,0,0,.3); }
.badge-sq--active{ background:#0f172a; color:#fff; border-color:#0f172a; }
.dark .badge-sq--active{ background:#e2e8f0; color:#0f172a; border-color:#e2e8f0; }
.badge-remove{ display:inline-grid; place-items:center; width:18px; height:18px; border-radius:3px; background:rgba(255,255,255,.14); border:1px solid rgba(148,163,184,.35); }
.dark .badge-remove{ background:rgba(15,23,42,.4); border-color:#475569; }

.tile-list{ display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:.55rem; }
.tile{
  display:flex; align-items:center; gap:.6rem; padding:.65rem .7rem; border:1px solid #E2E8F0; background:#fff; color:#0f172a;
  border-radius:6px; text-align:left; transition: border-color .18s ease, box-shadow .18s ease, transform .06s ease;
}
.tile:hover{ border-color:#94A3B8; box-shadow:0 4px 16px -10px rgba(2,6,23,.25); transform:translateY(-1px); }
.dark .tile{ border-color:#334155; background:#0b1220; color:#e2e8f0; }
.dark .tile:hover{ border-color:#475569; box-shadow:0 6px 20px -12px rgba(0,0,0,.5); }
.tile.is-selected{ border-color:#0f172a; box-shadow: inset 0 0 0 1px #0f172a, 0 2px 10px -6px rgba(2,6,23,.25); }
.dark .tile.is-selected{ border-color:#e2e8f0; box-shadow: inset 0 0 0 1px #e2e8f0, 0 2px 10px -6px rgba(0,0,0,.6); }
.tile-check{ width:18px; height:18px; border-radius:3px; display:inline-grid; place-items:center; border:1px solid #CBD5E1; background:#F8FAFC; }
.dark .tile-check{ border-color:#475569; background:#0f172a; }

.chip{ display:inline-block;padding:.375rem .75rem;border-radius:999px;font-size:.75rem;font-weight:700;background:#334155;color:#fff; }
.dark .chip { background:#475569; }

.toast-slide-enter-active, .toast-slide-leave-active{ transition: all .4s cubic-bezier(.68,-.55,.27,1.55); }
.toast-slide-enter-from, .toast-slide-leave-to{ transform: translateX(120%); opacity:0; }
.animate-in-up{ animation: animate-in-up .5s ease-out both; }
.reveal-initial{ opacity:0; transform: translateY(10px); }
.reveal-active{ animation: animate-in-up .5s ease-out forwards; }
@keyframes animate-in-up{ from{ opacity:0; transform: translateY(10px); } to{ opacity:1; transform: translateY(0); } }
</style>