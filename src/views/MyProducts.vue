<template>
  <div class="brand-scope min-h-screen flex flex-col bg-gray-50 text-gray-900">
    <Header />
    <div class="flex flex-1">
      <Sidebar />

      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pl-[120px]">
        <div class="max-w-7xl mx-auto">
          <header class="mb-6">
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Mis Productos Publicados</h1>
            <p class="text-slate-600 mt-1">Administra y organiza tus publicaciones de trueque.</p>
          </header>

          <section class="mb-4">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div class="inline-flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm overflow-hidden w-max">
                <button class="tool-tab" :class="statusFilter==='all' && 'is-active'" @click="statusFilter='all'">
                  Todos <span class="count">{{ products.length }}</span>
                </button>
                <button class="tool-tab" :class="statusFilter==='available' && 'is-active'" @click="statusFilter='available'">
                  Disponible <span class="count">{{ stats.available }}</span>
                </button>
                <button class="tool-tab" :class="statusFilter==='pending_exchange' && 'is-active'" @click="statusFilter='pending_exchange'">
                  En intercambio <span class="count">{{ stats.pending }}</span>
                </button>
                <button class="tool-tab" :class="statusFilter==='exchanged' && 'is-active'" @click="statusFilter='exchanged'">
                  Intercambiado <span class="count">{{ stats.exchanged }}</span>
                </button>
              </div>

              <div class="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end w-full sm:w-auto">
                <div class="relative flex-1 min-w-[240px]">
                  <svg
                    class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fill-rule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clip-rule="evenodd"/>
                  </svg>

                  <input
                    v-model.trim="query"
                    type="text"
                    class="input text-sm input-leading-icon"
                    placeholder="Buscar por título"
                    aria-label="Buscar productos"
                  />
                </div>
                <div>
                  <select v-model="sortBy" class="input text-sm pr-9" aria-label="Ordenar por">
                    <option value="recent">Más recientes</option>
                    <option value="title_asc">Título A–Z</option>
                    <option value="title_desc">Título Z–A</option>
                    <option value="category_asc">Categoría A–Z</option>
                  </select>
                </div>
                <router-link to="/publicar" class="btn-brand whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Publicar
                </router-link>
              </div>
            </div>
          </section>

          <div v-if="loading" class="py-8" aria-live="polite">
            <div class="flex items-center gap-3 mb-4">
              <div class="spinner h-6 w-6 border-2 border-[#d7037b] border-r-transparent rounded-full"></div>
              <p class="text-slate-600">Cargando tus productos...</p>
            </div>
            <div class="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <div class="grid grid-cols-[96px,1fr,160px,140px,120px] sm:grid-cols-[120px,1fr,200px,160px,140px] px-4 py-3 border-b border-slate-200 text-sm font-semibold text-slate-600">
                <div>Imagen</div><div>Título</div><div>Categoría</div><div>Estado</div><div>Publicado</div>
              </div>
              <div v-for="n in 6" :key="n" class="row-skeleton"></div>
            </div>
          </div>

          <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-800 px-6 py-5 rounded-lg" role="alert">
            <div class="flex items-start gap-3">
              <svg class="h-6 w-6 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h.01"/></svg>
              <div>
                <strong class="font-bold text-lg">No se pudo cargar</strong>
                <p class="mt-1">{{ error }}</p>
              </div>
            </div>
          </div>

          <div v-else-if="products.length === 0" class="text-center py-14 bg-white rounded-lg border border-dashed border-slate-300">
            <svg class="mx-auto h-14 w-14 text-slate-300 mb-3" viewBox="0 0 24 24" fill="currentColor"><path d="M4 7a2 2 0 012-2h2l1-1h6l1 1h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z"/></svg>
            <p class="text-xl mb-1 font-semibold text-slate-800">¡Aún no tienes productos!</p>
            <p class="text-slate-600 mb-5">Tu inventario espera su primer artículo.</p>
            <router-link to="/publicar" class="btn-brand inline-flex">Publica tu primer producto</router-link>
          </div>

          <div v-else-if="filteredProducts.length === 0" class="bg-white border border-slate-200 rounded-lg p-8 text-center">
            <p class="text-lg font-semibold text-slate-800 mb-1">No hay resultados</p>
            <p class="text-slate-600">Prueba cambiar los filtros o limpiar la búsqueda.</p>
            <div class="mt-4">
              <button class="btn-ghost" @click="resetFilters">Limpiar filtros</button>
            </div>
          </div>

          <div v-else class="overflow-auto rounded-lg border border-slate-200 bg-white">
            <table class="data-table">
              <thead>
                <tr>
                  <th scope="col">Imagen</th>
                  <th scope="col">Título</th>
                  <th scope="col" class="min-w-[180px]">Categoría</th>
                  <th scope="col" class="min-w-[160px]">Estado</th>
                  <th scope="col" class="min-w-[140px]">Publicado</th>
                  <th scope="col" class="min-w-[120px]" aria-label="Acciones"></th>
                </tr>
              </thead>

              <transition-group name="fade" tag="tbody">
                <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-slate-50">
                  <td data-label="Imagen">
                    <div class="thumb">
                      <img
                        :src="imageUrl(product.thumbnail_image_url)"
                        :alt="product.title"
                        loading="lazy"
                        @error="onImgError"
                      />
                    </div>
                  </td>

                  <td data-label="Título">
                    <div class="flex flex-col">
                      <span class="font-semibold text-slate-900 line-clamp-1">{{ product.title }}</span>
                      <span class="text-[11px] text-slate-500 line-clamp-1">{{ product.id ? `ID: ${product.id}` : '' }}</span>
                    </div>
                  </td>

                  <td data-label="Categoría">
                    <span class="text-sm text-slate-700">{{ product.category_name }}</span>
                  </td>

                  <td data-label="Estado">
                    <span :class="['status-pill', ...getStatusClass(product.status).split(' ')]">
                      {{ getStatusText(product.status) }}
                    </span>
                  </td>

                  <td data-label="Publicado">
                    <span class="text-sm text-slate-600">{{ product.created_at ? formatDate(product.created_at) : '—' }}</span>
                  </td>

                  <td class="text-right" data-label="Acciones">
                    <div class="inline-flex items-center gap-1.5">
                      <button class="icon-btn" @click="openEditModal(product)" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M5 15.5V19h3.5l10-10-3.5-3.5-10 10zM20.7 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.29 1.29 3.75 3.75 1.29-1.29z"/>
                        </svg>
                      </button>
                      <button class="icon-btn danger" @click="openDeleteModal(product)" title="Eliminar">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </transition-group>
            </table>
          </div>
        </div>
      </main>
    </div>

    <div
      v-if="isEditModalOpen"
      class="edit-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Editar producto"
      @keydown.esc="closeEdit"
    >
      <div class="edit-card">
        <div class="edit-header">
          <div class="header-bg" aria-hidden="true"></div>
          <div class="flex items-center justify-between relative z-10">
            <div class="flex items-center gap-3">
              <div class="mini-thumb">
                <img
                  :src="imageUrl(editingProduct?.thumbnail_image_url)"
                  alt=""
                  @error="onImgError"
                />
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-extrabold leading-tight">
                  Editar: <span class="opacity-90">{{ editingProduct.title || 'Producto' }}</span>
                </h3>
                <p class="text-[12px] text-white/80">
                  ID: {{ editingProduct.id || '—' }}
                </p>
              </div>
            </div>

            <button
              type="button"
              class="icon-btn close-btn border-white/30 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              @click="closeEdit"
              aria-label="Cerrar"
              title="Cerrar"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 6L18 18M6 18L18 6"/>
              </svg>
            </button>
            </div>
        </div>

        <form class="edit-body" @submit.prevent="handleUpdateProduct">
          <div class="space-y-4">
            <div>
              <label class="label">Título <span class="muted">(máx. {{ TITLE_MAX }} caracteres)</span></label>
              <div :class="['field', titleError && 'field-error']">
                <input
                  v-model.trim="editingProduct.title"
                  :maxlength="TITLE_MAX"
                  type="text"
                  class="input !bg-white"
                  placeholder="Nombre claro y atractivo"
                  @input="validateTitle"
                  required
                />
                <div class="aux">
                  <span :class="['counter', titleCount > TITLE_MAX*0.85 && 'warn']">
                    {{ titleCount }}/{{ TITLE_MAX }}
                  </span>
                </div>
              </div>
              <p v-if="titleError" class="error-text">{{ titleError }}</p>
            </div>

            <div>
              <label class="label">Descripción <span class="muted">(máx. {{ DESC_MAX }} caracteres)</span></label>
              <div class="field">
                <textarea
                  v-model.trim="editingProduct.description"
                  :maxlength="DESC_MAX"
                  rows="4"
                  class="input !bg-white min-h-[120px]"
                  placeholder="Cuenta detalles relevantes: estado, accesorios, uso, etc."
                ></textarea>
                <div class="aux">
                  <span :class="['counter', descCount > DESC_MAX*0.85 && 'warn']">
                    {{ descCount }}/{{ DESC_MAX }}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label class="label">Estado del producto</label>
              <div class="seg" role="tablist" aria-label="Estado">
                <button
                  type="button"
                  role="tab"
                  :aria-selected="(editingProduct.status==='available').toString()"
                  :class="['seg-btn', editingProduct.status==='available' && 'active']"
                  @click="editingProduct.status='available'"
                >
                  <span class="dot bg-emerald-500"></span> Disponible
                </button>
                <button
                  type="button"
                  role="tab"
                  :aria-selected="(editingProduct.status==='pending_exchange').toString()"
                  :class="['seg-btn', editingProduct.status==='pending_exchange' && 'active']"
                  @click="editingProduct.status='pending_exchange'"
                >
                  <span class="dot bg-amber-500"></span> En intercambio
                </button>
                <button
                  type="button"
                  role="tab"
                  :aria-selected="(editingProduct.status==='exchanged').toString()"
                  :class="['seg-btn', editingProduct.status==='exchanged' && 'active']"
                  @click="editingProduct.status='exchanged'"
                >
                  <span class="dot bg-slate-500"></span> Intercambiado
                </button>
              </div>
            </div>
          </div>

          <aside class="preview">
            <div class="preview-frame">
              <div class="preview-img">
                <img
                  :src="imageUrl(editingProduct?.thumbnail_image_url)"
                  alt="Vista previa"
                  @error="onImgError"
                />
                <span :class="['preview-badge', ...getStatusClass(editingProduct.status).split(' ')]">
                  {{ getStatusText(editingProduct.status) }}
                </span>
              </div>
              <div class="preview-meta">
                <h4 class="title line-clamp-2">{{ editingProduct.title || 'Sin título' }}</h4>
                <p class="desc line-clamp-3">{{ editingProduct.description || 'Añade una descripción para mejorar el interés.' }}</p>
                <p class="tiny text-slate-500 mt-2">
                  Categoría: <b>{{ editingProduct.category_name || '—' }}</b>
                </p>
              </div>
            </div>
          </aside>

          <div class="edit-footer">
            <div class="left tiny text-slate-500">
              <span v-if="!isDirty">Sin cambios</span>
              <span v-else>Hay cambios sin guardar</span>
              <span class="mx-2">•</span>
              <kbd>Esc</kbd> para cerrar &nbsp; <span class="mx-2">•</span> <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>S</kbd> para guardar
            </div>
            <div class="right">
              <button type="button" class="btn-ghost btn-modal btn-eq" @click="closeEdit">Cancelar</button>
              <button
                type="submit"
                class="btn-brand btn-modal btn-eq btn-save"
                :disabled="!isValid || !isDirty || isSaving"
              >
                <svg
                  v-if="isSaving"
                  class="h-4 w-4 mr-2 animate-spin ink-pulse"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/>
                </svg>
                <span>{{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div v-if="isDeleteModalOpen" class="modal-backdrop" role="dialog" aria-modal="true" aria-label="Eliminar producto">
      <div class="modal-card w-full max-w-md">
        <div class="text-center">
          <div class="mx-auto mb-3 h-12 w-12 rounded-full bg-red-100 text-red-600 grid place-items-center">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
          </div>
          <h3 class="text-lg font-bold">¿Eliminar producto?</h3>
          <p class="text-slate-600 mt-1">Esta acción eliminará <span class="font-semibold">"{{ deletingProduct?.title }}"</span> de forma permanente.</p>
        </div>
        <div class="mt-6 flex justify-center gap-2">
          <button @click="isDeleteModalOpen = false" class="btn-ghost">Cancelar</button>
          <button @click="handleDeleteProduct" class="btn-danger">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import { useUserStore } from '@/stores/user';
import axios from '@/axios';

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();
const userStore = useUserStore();

const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const editingProduct = ref(null);
const deletingProduct = ref(null);

const originalSnapshot = ref(null);
const isSaving = ref(false);

const query = ref('');
const statusFilter = ref('all'); // all | available | pending_exchange | exchanged
const sortBy = ref('recent');    // recent | title_asc | title_desc | category_asc

const TITLE_MAX = 80;
const DESC_MAX = 500;

// ✨ CORRECCIÓN CLAVE: Usar la variable correcta para la URL pública
const API_BASE_URL = import.meta.env.VITE_APP_PUBLIC_URL || 'http://localhost:8000';
const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#f1f5f9"/><text x="50%" y="50%" font-family="Arial" font-size="16" text-anchor="middle" fill="#94a3b8">Sin imagen</text></svg>`);

const imageUrl = (path) => {
  if (!path) return FALLBACK_IMG;
  if (String(path).startsWith('http') || String(path).startsWith('data:')) return path;
  // Ahora construye la URL correcta: http://localhost:8000/uploaded_images/...
  return `${API_BASE_URL}${path}`;
};
const onImgError = (e) => { e.target.src = FALLBACK_IMG; };

const fetchUserProducts = async () => {
  try {
    loading.value = true;
    error.value = null;
    const authenticatedUserId = userStore.user?.id;
    if (!authenticatedUserId) {
      error.value = 'No se ha encontrado un usuario autenticado.';
      loading.value = false;
      router.push('/login');
      return;
    }
    const response = await axios.get(`/users/${authenticatedUserId}/products`);
    products.value = response.data || [];
  } catch (err) {
    console.error('Error al cargar los productos del usuario:', err);
    error.value = err.response?.data?.detail || err.message || 'Ocurrió un error inesperado.';
  } finally {
    loading.value = false;
  }
};

const openEditModal = (product) => {
  editingProduct.value = { ...product };
  originalSnapshot.value = pickSnapshot(editingProduct.value);
  validateTitle();
  isEditModalOpen.value = true;
};

const closeEdit = () => { isEditModalOpen.value = false; };

const openDeleteModal = (product) => {
  deletingProduct.value = product;
  isDeleteModalOpen.value = true;
};

const pickSnapshot = (p) => ({
  id: p.id,
  title: p.title || '',
  description: p.description || '',
  status: p.status || 'available'
});

const handleUpdateProduct = async () => {
  if (!editingProduct.value) return;
  if (!isValid.value || !isDirty.value) return;
  try {
    isSaving.value = true;
    const { id, title, description, status } = editingProduct.value;
    await axios.put(`/products/${id}`, { title, description, status });
    isEditModalOpen.value = false;
    await fetchUserProducts();
    alert('¡Producto actualizado con éxito!');
  } catch (err) {
    console.error('Error al actualizar el producto:', err);
    alert(`Error: ${err.response?.data?.detail || 'No se pudo actualizar el producto.'}`);
  } finally {
    isSaving.value = false;
  }
};

const handleDeleteProduct = async () => {
  if (!deletingProduct.value) return;
  try {
    await axios.delete(`/products/${deletingProduct.value.id}`);
    isDeleteModalOpen.value = false;
    await fetchUserProducts();
    alert('¡Producto eliminado con éxito!');
  } catch (err) {
    console.error('Error al eliminar el producto:', err);
    alert(`Error: ${err.response?.data?.detail || 'No se pudo eliminar el producto.'}`);
  }
};

const getStatusClass = (status) => {
  const classes = {
    available: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
    pending_exchange: 'bg-amber-100 text-amber-900 ring-amber-200',
    exchanged: 'bg-slate-100 text-slate-800 ring-slate-200',
  };
  return classes[status] || 'bg-slate-100 text-slate-800 ring-slate-200';
};

const getStatusText = (status) => {
  const texts = {
    available: 'Disponible',
    pending_exchange: 'En Intercambio',
    exchanged: 'Intercambiado',
  };
  return texts[status] || 'Desconocido';
};

const stats = computed(() => {
  const a = products.value.filter(p => p.status === 'available').length;
  const b = products.value.filter(p => p.status === 'pending_exchange').length;
  const c = products.value.filter(p => p.status === 'exchanged').length;
  return { available: a, pending: b, exchanged: c };
});

const filteredProducts = computed(() => {
  let list = [...products.value];

  if (statusFilter.value !== 'all') {
    list = list.filter(p => p.status === statusFilter.value);
  }
  if (query.value) {
    const q = query.value.toLowerCase();
    list = list.filter(p =>
      (p.title || '').toLowerCase().includes(q) ||
      (p.category_name || '').toLowerCase().includes(q)
    );
  }
  switch (sortBy.value) {
    case 'title_asc':
      list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      break;
    case 'title_desc':
      list.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
      break;
    case 'category_asc':
      list.sort((a, b) => (a.category_name || '').localeCompare(b.category_name || ''));
      break;
    default: {
      const getTime = (p) => p.created_at ? new Date(p.created_at).getTime() : Number(p.id) || 0;
      list.sort((a, b) => getTime(b) - getTime(a));
    }
  }
  return list;
});

const resetFilters = () => {
  query.value = '';
  statusFilter.value = 'all';
  sortBy.value = 'recent';
};

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return '—'; }
};

/* ===== Validación y UX del modal ===== */
const titleError = ref('');
const titleCount = computed(() => (editingProduct.value?.title || '').length);
const descCount  = computed(() => (editingProduct.value?.description || '').length);
const isValid    = computed(() => !titleError.value && titleCount.value >= 3);

const isDirty = computed(() => {
  if (!editingProduct.value || !originalSnapshot.value) return false;
  const curr = pickSnapshot(editingProduct.value);
  const orig = originalSnapshot.value;
  return curr.title !== orig.title ||
         curr.description !== orig.description ||
         curr.status !== orig.status;
});

function validateTitle() {
  const len = titleCount.value;
  if (len === 0) titleError.value = 'El título es obligatorio.';
  else if (len < 3) titleError.value = 'Usa al menos 3 caracteres.';
  else if (len > TITLE_MAX) titleError.value = `Máximo ${TITLE_MAX} caracteres.`;
  else titleError.value = '';
}

/* Atajos de teclado dentro del modal */
function handleKeydown(e) {
  if (!isEditModalOpen.value) return;
  const isCmdOrCtrl = e.metaKey || e.ctrlKey;
  if (isCmdOrCtrl && e.key.toLowerCase() === 's') {
    e.preventDefault();
    if (isValid.value && isDirty.value && !isSaving.value) {
      handleUpdateProduct();
    }
  }
}
onMounted(() => {
  fetchUserProducts();
  window.addEventListener('keydown', handleKeydown);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
/* ===========================
   PALETA — ALCANCE LOCAL
   =========================== */
.brand-scope{
  --brand-from: #d7037b; /* rosa/magenta principal */
  --brand-to:   #9e0154; /* acento más oscuro */
}

/* ---------- Inputs / botones ---------- */
.input{
  width:100%; border-radius:.75rem; border:1px solid #e5e7eb; background:#fff; color:#0f172a; padding:.6rem .85rem;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.input:focus{ outline:none; border-color:var(--brand-from); box-shadow:0 0 0 3px rgba(215,3,123,.15); }

/* FIX: icono a la izquierda — da espacio al SVG (left-3 + w-5 + ~0.5rem de margen) */
.input-leading-icon{ padding-left: 2.5rem; } /* equivalente a Tailwind pl-10 */
/* (opcional) si algún día usas icono a la derecha */
.input-trailing-icon{ padding-right: 2.5rem; }

/* ===> Botón de marca general */
.btn-brand{
  display:inline-flex; align-items:center; gap:.5rem; padding:.55rem .95rem; border-radius:.9rem; font-weight:800;
  color:#fff; background:var(--brand-from); border:1px solid rgba(215,3,123,.25);
  box-shadow:0 10px 20px -12px rgba(215,3,123,.5);
  transition:transform .08s ease, filter .2s ease, box-shadow .2s ease;
}
.btn-brand:disabled{ opacity:.6; cursor:not-allowed; }
.btn-brand:hover{ filter:brightness(1.03); box-shadow:0 14px 26px -14px rgba(215,3,123,.55); }
.btn-brand:active{ transform:translateY(1px) scale(.99); }

/* Ghost */
.btn-ghost{
  display:inline-flex; align-items:center; gap:.35rem; padding:.5rem .9rem; border-radius:.8rem; font-weight:700;
  border:1px solid #e5e7eb; color:#0f172a; background:white;
}
.btn-ghost:hover{ background:#f8fafc; }

/* Danger */
.btn-danger{
  display:inline-flex; align-items:center; padding:.5rem 1rem; border-radius:.8rem; font-weight:800;
  color:white; background:#ef4444; border:1px solid #dc2626; box-shadow:0 6px 18px -10px rgba(239,68,68,.5);
}
.btn-danger:hover{ background:#dc2626; }

/* ---------- Tabs de filtro ---------- */
.tool-tab{
  position:relative; padding:.45rem .75rem; border-radius:.6rem; font-weight:800; color:#334155;
}
.tool-tab:hover{ background:#f8fafc; }
/* Activa: sólido #d7037b + texto blanco */
.tool-tab.is-active{
  color:#fff;
  background:#d7037b;
  box-shadow: 0 6px 18px -10px rgba(215,3,123,.45);
}
.tool-tab .count{
  display:inline-flex; align-items:center; justify-content:center; min-width:1.4rem; height:1.2rem;
  padding:0 .35rem; margin-left:.35rem; font-size:.75rem; border-radius:.5rem; background:rgba(255,255,255,.22);
}

/* ---------- Tabla ---------- */
.data-table{ width:100%; border-collapse:separate; border-spacing:0; }
.data-table thead th{
  position:sticky; top:0; z-index:1; background:#fff;
  text-align:left; font-weight:800; color:#475569; font-size:.8rem;
  padding:.9rem 1rem; border-bottom:1px solid #e5e7eb;
}
.data-table tbody td{
  padding:.9rem 1rem; border-bottom:1px solid #eef2f6; vertical-align:middle; font-size:.95rem; color:#0f172a;
}
.data-table tbody tr:last-child td{ border-bottom:0; }

/* Miniatura celda */
.thumb{ width:84px; height:64px; background:#f1f5f9; border:1px solid #e5e7eb; border-radius:.5rem; overflow:hidden; }
.thumb img{ width:100%; height:100%; object-fit:cover; }

/* Estado */
.status-pill{
  display:inline-flex; align-items:center; gap:.35rem; padding:.22rem .5rem; font-size:.78rem; font-weight:800;
  border-radius:.5rem; border-width:1px; border-style:solid; box-shadow:0 1px 0 rgba(2,6,23,.04);
}

/* Botones de icono */
.icon-btn{
  display:inline-grid; place-items:center; width:36px; height:36px; border-radius:.7rem; border:1px solid #e5e7eb; background:#fff;
  transition: background .2s ease, transform .06s ease, border-color .2s ease, box-shadow .2s ease;
}
.icon-btn:hover{ background:#f8fafc; border-color:#d1d5db; transform: translateY(-1px); }
.icon-btn.danger:hover{ background:#fff1f2; border-color:#fecdd3; }

/* Botón cerrar en header del modal (mayor contraste y foco) */
.close-btn{
  background: rgba(255,255,255,.12);
  border-color: rgba(255,255,255,.35);
  box-shadow: 0 2px 10px -4px rgba(0,0,0,.35);
}
.close-btn:hover{ background: rgba(255,255,255,.22); }
.close-btn:active{ transform: translateY(1px); }

/* ---------- Modal eliminar ---------- */
.modal-backdrop{
  position:fixed; inset:0; background:rgba(0,0,0,.55); display:flex; align-items:center; justify-content:center; padding:1rem; z-index:50;
  backdrop-filter: blur(2px);
}
.modal-card{
  background:white; border-radius:16px; border:1px solid #e5e7eb; padding:1rem 1rem 1.1rem;
  box-shadow:0 30px 70px -22px rgba(0,0,0,.35); animation:pop .16s ease-out both;
}
@keyframes pop{ from{ transform: translateY(8px) scale(.98); opacity:0 } to{ transform: none; opacity:1 } }

/* ---------- Skeleton ---------- */
.spinner{ animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.row-skeleton{
  display:grid;
  grid-template-columns: 96px 1fr 160px 140px 120px;
  padding:.9rem 1rem;
  border-bottom:1px solid #eef2f6;
}
@media (min-width:640px){
  .row-skeleton{ grid-template-columns: 120px 1fr 200px 160px 140px; }
}
.row-skeleton::before,
.row-skeleton::after{ content:""; }
.row-skeleton > *{ display:none; }
.row-skeleton{
  --c:#f1f5f9;
  background:
    linear-gradient(0deg,var(--c),var(--c)) left/.9rem 3.8rem no-repeat,
    linear-gradient(0deg,var(--c),var(--c)) 8.5rem/40% .9rem no-repeat,
    linear-gradient(0deg,var(--c),var(--c)) calc(8.5rem + 42%) /.6rem .8rem no-repeat,
    linear-gradient(0deg,var(--c),var(--c)) right/25% .8rem no-repeat;
  position:relative; overflow:hidden;
}
.row-skeleton:after{
  content:""; position:absolute; inset:0; transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.6), transparent);
  animation: shimmer 1.2s infinite;
}
@keyframes shimmer{ 100% { transform: translateX(100%); } }

/* ---------- Transiciones ---------- */
.fade-enter-active, .fade-leave-active{ transition: opacity .18s ease, transform .18s ease; }
.fade-enter-from, .fade-leave-to{ opacity:0; transform: translateY(4px); }

/* ---------- Responsive tabla ---------- */
@media (max-width: 640px){
  .data-table thead{ display:none; }
  .data-table tbody tr{
    display:grid; grid-template-columns: 100px 1fr; align-items:center;
    border-bottom:1px solid #eef2f6;
  }
  .data-table tbody td{
    display:flex; align-items:center; gap:.5rem; padding:.6rem .9rem;
  }
  .data-table tbody td[data-label]::before{
    content: attr(data-label) ": ";
    min-width:95px; font-size:.78rem; font-weight:800; color:#475569;
  }
  .data-table tbody td:first-child{ grid-column: 1 / 2; }
  .data-table tbody td:nth-child(2){ grid-column: 2 / 3; }
}

/* =======================
   MODAL EDITAR — NUEVO
   ======================= */
.edit-backdrop{
  position:fixed; inset:0; background:rgba(2,6,23,.66); display:flex; align-items:flex-start; justify-content:center; padding:1.25rem; z-index:60;
  overflow:auto;
}
.edit-card{
  width:100%; max-width:1000px; background:linear-gradient(180deg,#fff,#fbfbfb); border:1px solid #e5e7eb; border-radius:20px;
  box-shadow:0 50px 120px -35px rgba(0,0,0,.5);
  animation:pop .16s ease-out both; overflow:hidden;
}

/* Header del modal con el degradado de marca */
.edit-header{
  position:relative; padding:1rem 1.25rem; color:white;
}
.header-bg{
  position:absolute; inset:0;
  background: linear-gradient(90deg, var(--brand-from), var(--brand-to));
  opacity:.98;
}

/* Body en grid  */
.edit-body{
  display:grid; grid-template-columns: 1fr 380px; gap:1rem; padding:1rem 1.25rem 0 1.25rem;
}
@media (max-width: 1024px){
  .edit-body{ grid-template-columns: 1fr; }
}

/* Campos */
.label{ display:block; font-size:.78rem; letter-spacing:.05em; text-transform:uppercase; font-weight:800; color:#475569; margin-bottom:.35rem; }
.muted{ color:#94a3b8; font-weight:600; }
.field{ position:relative; }
.field-error .input{ border-color:#ef4444; box-shadow:0 0 0 3px rgba(239,68,68,.12); }
.aux{
  position:absolute; right:.5rem; bottom:.5rem; display:flex; gap:.5rem; align-items:center;
}
.counter{ font-size:.72rem; color:#64748b; font-weight:700; background:#f1f5f9; padding:.15rem .4rem; border-radius:.45rem; }
.counter.warn{ background:#fff7ed; color:#b45309; }

/* Segmented estado */
.seg{ display:grid; grid-template-columns: repeat(3,1fr); gap:.4rem; background:#f8fafc; border:1px solid #e5e7eb; border-radius:12px; padding:.35rem; }
.seg-btn{
  display:flex; align-items:center; justify-content:center; gap:.4rem; padding:.55rem .6rem; border-radius:.7rem;
  font-weight:800; color:#334155; transition:all .15s ease;
}
.seg-btn .dot{ width:8px; height:8px; border-radius:3px; display:inline-block; }
.seg-btn:hover{ background:white; }
.seg-btn.active{
  color:white;
  background:#d7037b; /* coherente con tu marca cuando está activo */
  box-shadow: 0 10px 20px -12px rgba(215,3,123,.35);
}

/* Preview */
.preview{ padding-bottom:1rem; }
.preview-frame{
  background:white; border:1px solid #e5e7eb; border-radius:14px; overflow:hidden;
  box-shadow:0 16px 36px -22px rgba(2,6,23,.25);
}
.preview-img{ position:relative; aspect-ratio: 4 / 3; background:#f1f5f9; }
.preview-img img{ width:100%; height:100%; object-fit:cover; }
.preview-badge{
  position:absolute; top:.6rem; left:.6rem; display:inline-flex; align-items:center; gap:.35rem; padding:.22rem .5rem;
  font-size:.78rem; font-weight:800; border-radius:.5rem; border-width:1px; border-style:solid; backdrop-filter: blur(4px);
}
.preview-meta{ padding:.9rem 1rem 1.1rem; }
.preview-meta .title{ font-weight:900; font-size:1rem; color:#0f172a; }
.preview-meta .desc{ font-size:.9rem; color:#475569; margin-top:.25rem; }

/* Footer */
.edit-footer{
  display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:1rem 1.25rem 1.2rem;
  border-top:1px solid #eef2f6; background:linear-gradient(180deg,#fff, #fafafa);
}
/* Grilla 2 columnas para igualar tamaños */
.edit-footer .right{
  display:grid;
  grid-template-columns: 1fr 1fr; /* dos columnas iguales */
  gap:.9rem;
}

/* Tamaño reducido SOLO en botones del modal (guardar/cancelar) */
.btn-modal{
  padding:.42rem .8rem;         /* compacto */
  font-size:.9rem;              /* texto más pequeño */
  border-radius:.7rem;
  line-height:1.2;
}
.btn-modal svg{ width:1rem; height:1rem; }

/* Que ambos botones ocupen el 100% y se centren */
.btn-eq{
  width:100%;
  justify-content:center;
  text-align:center;
}

/* ========= OVERRIDES ESPECÍFICOS PARA GUARDAR ========= */
.btn-save{
  background:#d7037b !important;      /* fija el fondo */
  color:#fff !important;
  box-shadow:none !important;          /* sin sombra rosada */
  filter:none !important;              /* sin brillo rosado */
  transition:transform .08s ease;      /* solo animación de click */
}
.btn-save:hover,
.btn-save:focus,
.btn-save:active{
  background:#d7037b !important;       /* mantén el mismo rosa (sin aclarar) */
  color:#fff !important;
  box-shadow:none !important;
  filter:none !important;
}

/* Spinner: tinta (currentColor) blanco → negro mientras guarda */
.ink-pulse{
  animation: colorPulse 1s ease-in-out infinite alternate;
}
@keyframes colorPulse{
  from{ color:#ffffff; }
  to{   color:#000000; }
}

/* Indicadores y atajos */
.tiny{ font-size:.78rem; }
kbd{
  background:#0f172a; color:white; padding:.08rem .35rem; border-radius:.3rem; font-size:.72rem; border:1px solid rgba(255,255,255,.12);
}

/* Mini thumb en header */
.mini-thumb{
  width:42px; height:32px; border-radius:.4rem; overflow:hidden; border:1px solid rgba(255,255,255,.35);
  background:rgba(255,255,255,.15);
}
.mini-thumb img{ width:100%; height:100%; object-fit:cover; }

/* Pequeño helper para errores de validación */
.error-text{ color:#b91c1c; font-size:.85rem; margin-top:.25rem; }
</style>