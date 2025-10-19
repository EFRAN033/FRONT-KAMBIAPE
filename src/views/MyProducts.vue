<template>
  <div class="brand-scope min-h-screen flex flex-col bg-gray-50 text-gray-900">
    <Header />
    <div class="flex flex-1">
      <Sidebar />

      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto lg:pl-[120px]">
        <div class="max-w-7xl mx-auto">
          <header class="mb-6">
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Mis Productos Publicados</h1>
            <p class="text-slate-600 mt-1">Administra y organiza tus publicaciones de trueque.</p>
          </header>

          <section class="mb-4">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="inline-flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm overflow-x-auto w-full sm:w-max">
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
                <div class="relative flex-1 min-w-[200px]">
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
                <div class="grid grid-cols-2 sm:flex sm:flex-row gap-2">
                  <select v-model="sortBy" class="input text-sm pr-9" aria-label="Ordenar por">
                    <option value="recent">Más recientes</option>
                    <option value="title_asc">Título A–Z</option>
                    <option value="title_desc">Título Z–A</option>
                    <option value="category_asc">Categoría A–Z</option>
                  </select>
                  <router-link to="/publicar" class="btn-brand whitespace-nowrap justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Publicar
                  </router-link>
                </div>
              </div>
            </div>
          </section>

          <div v-if="loading" class="py-8" aria-live="polite">
            <div class="flex items-center gap-3 mb-4">
              <div class="spinner h-6 w-6 border-2 border-[#d7037b] border-r-transparent rounded-full"></div>
              <p class="text-slate-600">Cargando tus productos...</p>
            </div>
            <div class="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <div class="hidden sm:grid grid-cols-[96px,1fr,160px,140px,120px] sm:grid-cols-[120px,1fr,200px,160px,140px] px-4 py-3 border-b border-slate-200 text-sm font-semibold text-slate-600">
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

          <div v-else class="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <table class="data-table">
              <thead class="hidden sm:table-header-group">
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
                  <td class="td-image">
                    <div class="thumb">
                      <img
                        :src="imageUrl(product.thumbnail_image_url)"
                        :alt="product.title"
                        loading="lazy"
                        @error="onImgError"
                      />
                    </div>
                  </td>

                  <td class="td-content">
                    <div class="w-full">
                      <div class="flex justify-between items-start gap-2">
                        <h3 class="font-bold text-slate-900 leading-tight mb-1 pr-2 line-clamp-2">{{ product.title }}</h3>
                        <div class="inline-flex items-center gap-1.5 flex-shrink-0 sm:hidden">
                          <button class="icon-btn" @click="openEditModal(product)" title="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M5 15.5V19h3.5l10-10-3.5-3.5-10 10zM20.7 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.29 1.29 3.75 3.75 1.29-1.29z"/></svg>
                          </button>
                          <button class="icon-btn danger" @click="openDeleteModal(product)" title="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z"/></svg>
                          </button>
                        </div>
                      </div>
                      
                      <p class="text-sm text-slate-700 mb-2">{{ product.category_name }}</p>

                      <div class="flex items-center gap-2 mb-2">
                        <span class="h-2.5 w-2.5 rounded-full flex-shrink-0" :class="getStatusDotClass(product.status)"></span>
                        <span class="text-sm font-medium" :class="getStatusTextClass(product.status)">
                          {{ getStatusText(product.status) }}
                        </span>
                      </div>
                      <p class="text-xs text-slate-500">
                        Publicado: {{ product.created_at ? formatDate(product.created_at) : '—' }}
                      </p>
                    </div>
                  </td>

                  <td class="hidden sm:table-cell" data-label="Título">
                    <div class="flex flex-col">
                      <span class="font-semibold text-slate-900 line-clamp-2">{{ product.title }}</span>
                      <span class="text-[11px] text-slate-500 line-clamp-1">{{ product.id ? `ID: ${product.id}` : '' }}</span>
                    </div>
                  </td>
                  <td class="hidden sm:table-cell" data-label="Categoría"><span class="text-sm text-slate-700">{{ product.category_name }}</span></td>
                  <td class="hidden sm:table-cell" data-label="Estado">
                    <div class="flex items-center gap-2">
                      <span class="h-2.5 w-2.5 rounded-full flex-shrink-0" :class="getStatusDotClass(product.status)"></span>
                      <span class="text-sm font-medium" :class="getStatusTextClass(product.status)">{{ getStatusText(product.status) }}</span>
                    </div>
                  </td>
                  <td class="hidden sm:table-cell" data-label="Publicado"><span class="text-sm text-slate-600">{{ product.created_at ? formatDate(product.created_at) : '—' }}</span></td>
                  <td class="hidden sm:table-cell text-right" data-label="Acciones">
                    <div class="inline-flex items-center gap-1.5">
                      <button class="icon-btn" @click="openEditModal(product)" title="Editar"><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M5 15.5V19h3.5l10-10-3.5-3.5-10 10zM20.7 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.29 1.29 3.75 3.75 1.29-1.29z"/></svg></button>
                      <button class="icon-btn danger" @click="openDeleteModal(product)" title="Eliminar"><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z"/></svg></button>
                    </div>
                  </td>
                </tr>
              </transition-group>
            </table>
          </div>
        </div>
      </main>
    </div>

    <div v-if="isEditModalOpen" class="edit-backdrop" role="dialog" aria-modal="true" aria-label="Editar producto" @keydown.esc="closeEdit">
      <div class="edit-card">
        <div class="edit-header">
          <div class="header-bg" aria-hidden="true"></div>
          <div class="flex items-center justify-between relative z-10">
            <div class="flex items-center gap-3">
              <div class="mini-thumb"><img :src="livePreviewData.photos.length > 0 ? livePreviewData.photos[0].url : FALLBACK_IMG" alt="" @error="onImgError"/></div>
              <div>
                <h3 class="text-lg sm:text-xl font-extrabold leading-tight">Editar: <span class="opacity-90">{{ livePreviewData.title }}</span></h3>
                <p class="text-[12px] text-white/80">ID: {{ editingProduct.id || '—' }}</p>
              </div>
            </div>
            <button type="button" class="icon-btn close-btn border-white/30 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70" @click="closeEdit" aria-label="Cerrar" title="Cerrar"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6L18 18M6 18L18 6"/></svg></button>
          </div>
        </div>
        <form v-if="editingProduct" class="edit-body" @submit.prevent="handleUpdateProduct">
          <div class="space-y-6">
            <div>
              <label class="label">Título <span class="muted">(máx. {{ TITLE_MAX }} caracteres)</span></label>
              <div :class="['field', titleError && 'field-error']">
                <input v-model.trim="editingProduct.title" :maxlength="TITLE_MAX" type="text" class="input !bg-white" placeholder="Nombre claro y atractivo" @input="validateTitle" required/>
                <div class="aux"><span :class="['counter', titleCount > TITLE_MAX*0.85 && 'warn']">{{ titleCount }}/{{ TITLE_MAX }}</span></div>
              </div>
              <p v-if="titleError" class="error-text">{{ titleError }}</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="condition" class="label">Estado</label>
                <select id="condition" v-model="editingProduct.condition" class="input !bg-white"><option>Nuevo</option><option>Como Nuevo</option><option>Usado - Buen Estado</option><option>Usado - Aceptable</option><option>Para Piezas/Reparar</option></select>
              </div>
              <div>
                <label for="category" class="label">Categoría</label>
                <select id="category" v-model="editingProduct.category_name" class="input !bg-white"><option v-for="category in allCategories" :key="category.id" :value="category.name">{{ category.name }}</option></select>
              </div>
            </div>
            <div>
              <label class="label">Descripción <span class="muted">(máx. {{ DESC_MAX }} caracteres)</span></label>
              <div class="field">
                <textarea v-model.trim="editingProduct.description" :maxlength="DESC_MAX" rows="4" class="input !bg-white min-h-[120px]" placeholder="Cuenta detalles relevantes: estado, accesorios, uso, etc."></textarea>
                <div class="aux"><span :class="['counter', descCount > DESC_MAX*0.85 && 'warn']">{{ descCount }}/{{ DESC_MAX }}</span></div>
              </div>
            </div>
            <div>
              <label class="label">¿Qué buscas a cambio?</label>
              <div class="p-3 border border-dashed border-slate-300 rounded-lg bg-transparent">
                <p v-if="editableInterests.size === 0" class="text-sm text-slate-500">Selecciona las categorías que te interesan.</p>
                <div v-else class="flex flex-wrap gap-1.5">
                  <span v-for="interestName in editableInterests" :key="`selected-${interestName}`" class="badge-sq badge-sq--active">{{ interestName }}<button @click="toggleInterest(interestName)" type="button" class="badge-remove" :aria-label="`Quitar ${interestName}`"><svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button></span>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-slate-200">
                <p class="text-sm font-medium text-slate-600 mb-3">Añadir Intereses:</p>
                <div v-if="availableCategories.length > 0" class="tile-list">
                  <button v-for="category in availableCategories" :key="category.id" type="button" class="tile" :class="editableInterests.has(category.name) && 'is-selected'" @click="toggleInterest(category.name)">
                    <span class="tile-check" aria-hidden="true"><svg v-if="editableInterests.has(category.name)" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.707 14.707a1 1 0 01-1.414 0L3.293 10.707a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg></span>
                    <span class="tile-text">{{ category.name }}</span>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label class="label">Imágenes ({{ imagesForEditing.length }} / 4)</label>
              <div class="group relative rounded-xl border-2 border-dashed border-slate-300 px-4 py-6 text-center hover:border-rose-400/80" :class="{'cursor-pointer': imagesForEditing.length < 4, 'cursor-not-allowed opacity-60': imagesForEditing.length >= 4}" @click="imagesForEditing.length < 4 && triggerFileInput()" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop">
                <input type="file" ref="fileInput" @change="handleFileChange" multiple accept="image/*" class="hidden" />
                <svg class="mx-auto h-8 w-8 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3-3a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4l5.172 5.172a4 4 0 005.656 0L40 32M28 8a4 4 0 100 8 4 4 0 000-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <p class="mt-1 text-sm text-slate-600">Añadir más imágenes</p>
              </div>
              <div v-if="imagesForEditing.length > 0" class="mt-4">
                <p class="text-sm text-slate-600 mb-2">Arrastra para reordenar. La primera es la portada.</p>
                <transition-group tag="div" name="list" class="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  <div v-for="(image, i) in imagesForEditing" :key="image.uniqueKey" class="relative overflow-hidden rounded-lg ring-1 ring-slate-200/70 bg-white cursor-move group/item" draggable="true" @dragstart="draggedIndex = i" @dragover.prevent="dragOverIndex = i" @dragleave.prevent="dragOverIndex = null" @drop.prevent="onDrop(i)">
                    <div class="absolute inset-0 z-10 transition-colors" :class="{ 'bg-rose-100/50': dragOverIndex === i }"></div>
                    <img :src="image.url" :alt="`Preview ${i+1}`" class="w-full h-24 object-cover"/>
                    <button @click="removeImage(i)" type="button" class="absolute top-1 right-1 rounded-full bg-rose-600 text-white p-1 z-20" aria-label="Eliminar imagen"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
                    <div v-if="i === 0" class="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">Portada</div>
                  </div>
                </transition-group>
              </div>
            </div>
          </div>
          <aside class="preview sticky top-4">
            <p class="mb-2 text-sm font-semibold text-slate-600">Previsualización</p>
            <article class="relative isolate flex flex-col bg-white rounded-xl shadow-lg group border border-gray-100">
              <div class="relative overflow-hidden rounded-t-xl">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-[1]"></div>
                <div v-if="livePreviewData.photos.length > 0" class="relative">
                  <div class="w-full h-48 overflow-hidden">
                    <div class="flex transition-transform duration-300 ease-in-out" :style="{ transform: `translateX(-${currentPreviewIndex * 100}%)` }">
                      <div v-for="(photo) in livePreviewData.photos" :key="photo.uniqueKey" class="w-full flex-shrink-0"><img :src="photo.url" :alt="livePreviewData.title" class="w-full h-48 object-cover"/></div>
                    </div>
                  </div>
                  <button v-if="livePreviewData.photos.length > 1" @click="prevPreview" type="button" class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 z-10"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg></button>
                  <button v-if="livePreviewData.photos.length > 1" @click="nextPreview" type="button" class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 z-10"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></button>
                  <div v-if="livePreviewData.photos.length > 1" class="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    <button v-for="(_, index) in livePreviewData.photos" :key="`dot-${index}`" @click="goToPreview(index)" type="button" class="h-2 w-2 rounded-full" :class="index === currentPreviewIndex ? 'bg-white' : 'bg-white/50'"></button>
                  </div>
                </div>
                <div v-else class="w-full h-48 bg-slate-100 grid place-items-center"><svg class="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
              </div>
              <div v-if="livePreviewData.category_name" class="absolute -top-3 right-3 z-10 bg-rose-600 text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg shadow-rose-600/30">{{ livePreviewData.category_name }}</div>
              <div class="flex flex-col flex-grow p-5">
                <h3 class="text-lg font-bold text-gray-900 mb-1 truncate h-7">{{ livePreviewData.title }}</h3>
                <p class="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow min-h-[40px]">{{ livePreviewData.description }}</p>
                <div class="flex items-center text-gray-500 text-sm mb-4 gap-3">
                  <div class="inline-flex items-center" v-if="livePreviewData.condition"><svg class="w-4 h-4 mr-1 text-rose-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg><span class="truncate">{{ livePreviewData.condition }}</span></div>
                </div>
                <div v-if="livePreviewData.interests.length > 0" class="mt-2 pt-3 border-t border-gray-100">
                  <h4 class="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Busca a cambio:</h4>
                  <div class="flex flex-wrap gap-1.5"><span v-for="interest in livePreviewData.interests" :key="`prev-${interest}`" class="badge-sq">{{ interest }}</span></div>
                </div>
                <div class="flex justify-end items-center pt-4 border-t border-gray-100 mt-auto"><button type="button" disabled class="bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium transition">Intercambiar</button></div>
              </div>
            </article>
          </aside>
          <div class="edit-footer">
            <button type="button" class="btn-ghost btn-modal" @click="closeEdit">Cancelar</button>
            <button type="submit" class="btn-brand btn-modal btn-save" :disabled="!isValid || isSaving">
              <svg v-if="isSaving" class="h-4 w-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/></svg>
              <span>{{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="isDeleteModalOpen" class="modal-backdrop" role="dialog" aria-modal="true" aria-label="Eliminar producto">
      <div class="modal-card w-full max-w-md">
        <div class="text-center">
          <div class="mx-auto mb-3 h-12 w-12 rounded-full bg-red-100 text-red-600 grid place-items-center"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg></div>
          <h3 class="text-lg font-bold">¿Eliminar producto?</h3>
          <p class="text-slate-600 mt-1">Esta acción eliminará <span class="font-semibold">"{{ deletingProduct?.title }}"</span> de forma permanente.</p>
        </div>
        <div class="mt-6 flex justify-center gap-2"><button @click="isDeleteModalOpen = false" class="btn-ghost">Cancelar</button><button @click="handleDeleteProduct" class="btn-danger">Eliminar</button></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import { useUserStore } from '@/stores/user';
import axios from '@/axios';
import { useToast } from "vue-toastification";

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();
const userStore = useUserStore();
const toast = useToast();

const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const editingProduct = ref(null);
const deletingProduct = ref(null);

const isSaving = ref(false);

const query = ref('');
const statusFilter = ref('all');
const sortBy = ref('recent');

const TITLE_MAX = 80;
const DESC_MAX = 500;

// Refs para el modal de edición
const allCategories = ref([]);
const editableInterests = ref(new Set());
const imagesForEditing = ref([]);
const imagesToDelete = ref(new Set());
const fileInput = ref(null);
const currentPreviewIndex = ref(0);
const draggedIndex = ref(null);
const dragOverIndex = ref(null);

const API_BASE_URL = import.meta.env.VITE_APP_PUBLIC_URL || 'http://localhost:8000';
const FALLBACK_IMG = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#f1f5f9"/><text x="50%" y="50%" font-family="Arial" font-size="16" text-anchor="middle" fill="#94a3b8">Sin imagen</text></svg>`)}`;

const imageUrl = (path) => {
  if (!path) return FALLBACK_IMG;
  if (String(path).startsWith('http') || String(path).startsWith('data:')) return path;
  return `${API_BASE_URL}${path}`;
};
const onImgError = (e) => { e.target.src = FALLBACK_IMG; };

const fetchUserProducts = async () => {
  try {
    loading.value = true;
    error.value = null;
    const authenticatedUserId = userStore.user?.id;
    if (!authenticatedUserId) {
      router.push('/login');
      return;
    }
    const response = await axios.get(`/users/${authenticatedUserId}/products`);
    products.value = response.data || [];
  } catch (err) {
    error.value = err.response?.data?.detail || 'Ocurrió un error inesperado.';
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  if (allCategories.value.length > 0) return;
  try {
      const response = await axios.get('/categories');
      allCategories.value = response.data;
  } catch (error) {
      console.error("Error al cargar las categorías:", error);
      toast.error("No se pudieron cargar las categorías.");
  }
};

const openEditModal = async (product) => {
  await fetchCategories();
  
  editingProduct.value = { ...JSON.parse(JSON.stringify(product)) };
  
  imagesForEditing.value = (product.images || []).map(p => ({
    id: p.id,
    url: imageUrl(p.image_url),
    uniqueKey: `existing-${p.id}`,
    isNew: false,
    file: null
  }));

  editableInterests.value = new Set(editingProduct.value.exchange_interests || []);
  imagesToDelete.value.clear();
  currentPreviewIndex.value = 0;
  
  validateTitle();
  isEditModalOpen.value = true;
};

const revokeObjectURLs = () => {
    imagesForEditing.value.forEach(image => {
        if (image.isNew && image.url.startsWith('blob:')) {
            URL.revokeObjectURL(image.url);
        }
    });
};

const closeEdit = () => { 
    revokeObjectURLs();
    isEditModalOpen.value = false; 
    editingProduct.value = null; 
};

const openDeleteModal = (product) => { deletingProduct.value = product; isDeleteModalOpen.value = true; };

const handleUpdateProduct = async () => {
  if (!editingProduct.value || !isValid.value) return;
  
  isSaving.value = true;
  try {
    const formData = new FormData();
    formData.append('title', editingProduct.value.title);
    formData.append('description', editingProduct.value.description);
    formData.append('condition', editingProduct.value.condition);
    formData.append('category_name', editingProduct.value.category_name);
    
    const orderedPhotoIds = imagesForEditing.value
      .filter(img => !img.isNew)
      .map(img => img.id);
    formData.append('photo_order_ids', orderedPhotoIds.join(','));

    imagesForEditing.value.forEach(img => {
      if (img.isNew && img.file) {
        formData.append('new_photos', img.file);
      }
    });
    
    if (imagesToDelete.value.size > 0) {
      formData.append('deleted_photo_ids', Array.from(imagesToDelete.value).join(','));
    }

    const selectedInterestIds = Array.from(editableInterests.value)
      .map(name => allCategories.value.find(cat => cat.name === name)?.id)
      .filter(id => id);
    formData.append('exchange_interest_ids', selectedInterestIds.join(','));

    await axios.put(`/products/${editingProduct.value.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    closeEdit();
    await fetchUserProducts();
    toast.success('¡Producto actualizado con éxito!');
  } catch (err) {
    toast.error(`Error: ${err.response?.data?.detail || 'No se pudo actualizar.'}`);
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
    toast.success('¡Producto eliminado con éxito!');
  } catch (err) {
    toast.error(`Error: ${err.response?.data?.detail || 'No se pudo eliminar.'}`);
  }
};

const getStatusDotClass = (status) => {
  const classes = { available: "bg-emerald-500", pending_exchange: "bg-amber-500", exchanged: "bg-slate-400" };
  return classes[status] || "bg-slate-400";
};

const getStatusTextClass = (status) => {
  const classes = { available: "text-slate-700", pending_exchange: "text-slate-700", exchanged: "text-slate-500" };
  return classes[status] || "text-slate-500";
};
const getStatusText=(s)=>{const t={available:"Disponible",pending_exchange:"En Intercambio",exchanged:"Intercambiado"};return t[s]||"Desconocido"};
const stats=computed(()=>{const a=products.value.filter(p=>p.status==="available").length;const b=products.value.filter(p=>p.status==="pending_exchange").length;const c=products.value.filter(p=>p.status==="exchanged").length;return{available:a,pending:b,exchanged:c}});
const filteredProducts=computed(()=>{let l=[...products.value];if(statusFilter.value!=="all"){l=l.filter(p=>p.status===statusFilter.value)}if(query.value){const q=query.value.toLowerCase();l=l.filter(p=>(p.title||"").toLowerCase().includes(q)||(p.category_name||"").toLowerCase().includes(q))}switch(sortBy.value){case"title_asc":l.sort((a,b)=>(a.title||"").localeCompare(b.title||""));break;case"title_desc":l.sort((a,b)=>(b.title||"").localeCompare(a.title||""));break;case"category_asc":l.sort((a,b)=>(a.category_name||"").localeCompare(b.category_name||""));break;default:{const g=(p)=>p.created_at?new Date(p.created_at).getTime():Number(p.id)||0;l.sort((a,b)=>g(b)-g(a))}}return l});
const resetFilters=()=>{query.value="";statusFilter.value="all";sortBy.value="recent"};
const formatDate=(i)=>{try{const d=new Date(i);return d.toLocaleDateString("es-ES",{day:"2-digit",month:"short",year:"numeric"})}catch{return"—"}};
const titleError=ref("");
const titleCount=computed(()=>(editingProduct.value?.title||"").length);
const descCount=computed(()=>(editingProduct.value?.description||"").length);
const isValid=computed(()=>!titleError.value&&titleCount.value>=3);
function validateTitle(){const l=titleCount.value;if(l===0)titleError.value="El título es obligatorio.";else if(l<3)titleError.value="Usa al menos 3 caracteres.";else if(l>TITLE_MAX)titleError.value=`Máximo ${TITLE_MAX} caracteres.`;else titleError.value=""}

const availableCategories = computed(() => allCategories.value.filter(c => !editableInterests.value.has(c.name)));
const toggleInterest = (name) => { editableInterests.value.has(name) ? editableInterests.value.delete(name) : editableInterests.value.add(name); };

const livePreviewData = computed(() => {
  if (!editingProduct.value) {
    return { title: '', description: '', category_name: '', condition: '', photos: [], interests: [] };
  }
  return {
    title: editingProduct.value.title || 'Nombre del producto',
    description: editingProduct.value.description || 'La descripción de tu producto aparecerá aquí.',
    category_name: editingProduct.value.category_name || 'Categoría',
    condition: editingProduct.value.condition || 'Estado',
    photos: imagesForEditing.value,
    interests: Array.from(editableInterests.value),
  };
});

watch(imagesForEditing, () => { if(currentPreviewIndex.value >= imagesForEditing.value.length) { currentPreviewIndex.value = Math.max(0, imagesForEditing.value.length - 1) } });
const nextPreview=()=>{if(imagesForEditing.value.length>1){currentPreviewIndex.value=(currentPreviewIndex.value+1)%imagesForEditing.value.length}};
const prevPreview=()=>{if(imagesForEditing.value.length>1){currentPreviewIndex.value=(currentPreviewIndex.value-1+imagesForEditing.value.length)%imagesForEditing.value.length}};
const goToPreview=(i)=>{currentPreviewIndex.value=i};

const triggerFileInput=()=>{fileInput.value?.click()};
const handleDragOver=(e)=>{e.currentTarget.classList.add("border-rose-500","bg-rose-50")};
const handleDragLeave=(e)=>{e.currentTarget.classList.remove("border-rose-500","bg-rose-50")};
const handleDrop=(e)=>{e.currentTarget.classList.remove("border-rose-500","bg-rose-50");processFiles(e.dataTransfer.files)};
const handleFileChange=(e)=>{processFiles(e.target.files)};

const processFiles=(files)=>{
  const limit=4;
  if(imagesForEditing.value.length + files.length > limit) {
    toast.warning(`No puedes subir más de ${limit} imágenes.`);
    return;
  }
  for(const file of files) {
    if(file.type.startsWith("image/")) {
      imagesForEditing.value.push({
        id: null,
        url: URL.createObjectURL(file),
        uniqueKey: `new-${Date.now()}-${Math.random()}`,
        isNew: true,
        file: file
      });
    }
  }
};

const removeImage = (index) => {
  const image = imagesForEditing.value[index];
  if (image.isNew && image.url.startsWith('blob:')) {
    URL.revokeObjectURL(image.url);
  }
  if (!image.isNew && image.id) {
    imagesToDelete.value.add(image.id);
  }
  imagesForEditing.value.splice(index, 1);
};


const onDrop = (toIndex) => {
  const fromIndex = draggedIndex.value;
  if (fromIndex === null || fromIndex === toIndex) {
    draggedIndex.value = null;
    dragOverIndex.value = null;
    return;
  }
  const item = imagesForEditing.value.splice(fromIndex, 1)[0];
  imagesForEditing.value.splice(toIndex, 0, item);
  
  draggedIndex.value = null;
  dragOverIndex.value = null;
};

onMounted(()=>{
  fetchUserProducts();
});

onUnmounted(() => {
    revokeObjectURLs();
});
</script>

<style scoped>
/* Estilos generales (sin cambios) */
.brand-scope{--brand-from:#d7037b;--brand-to:#9e0154;}
.input{width:100%;border-radius:.75rem;border:1px solid #e5e7eb;background:#fff;color:#0f172a;padding:.6rem .85rem;transition:border-color .2s ease,box-shadow .2s ease;}
.input:focus{outline:none;border-color:var(--brand-from);box-shadow:0 0 0 3px rgba(215,3,123,.15);}
.input-leading-icon{padding-left:2.5rem;}
.btn-brand{display:inline-flex;align-items:center;gap:.5rem;padding:.55rem .95rem;border-radius:.9rem;font-weight:800;color:#fff;background:var(--brand-from);border:1px solid rgba(215,3,123,.25);box-shadow:0 10px 20px -12px rgba(215,3,123,.5);transition:transform .08s ease,filter .2s ease,box-shadow .2s ease;}
.btn-brand:disabled{opacity:.6;cursor:not-allowed;}
.btn-brand:hover{filter:brightness(1.03);box-shadow:0 14px 26px -14px rgba(215,3,123,.55);}
.btn-brand:active{transform:translateY(1px) scale(.99);}
.btn-ghost{display:inline-flex;align-items:center;gap:.35rem;padding:.5rem .9rem;border-radius:.8rem;font-weight:700;border:1px solid #e5e7eb;color:#0f172a;background:white;}
.btn-ghost:hover{background:#f8fafc;}
.btn-danger{display:inline-flex;align-items:center;padding:.5rem 1rem;border-radius:.8rem;font-weight:800;color:white;background:#ef4444;border:1px solid #dc2626;box-shadow:0 6px 18px -10px rgba(239,68,68,.5);}
.btn-danger:hover{background:#dc2626;}
.tool-tab{position:relative;padding:.45rem .9rem;border-radius:.6rem;font-weight:800;color:#334155; white-space: nowrap;}
.tool-tab:hover{background:#f8fafc;}
.tool-tab.is-active{color:#fff;background:#d7037b;box-shadow:0 6px 18px -10px rgba(215,3,123,.45);}
.tool-tab .count{display:inline-flex;align-items:center;justify-content:center;min-width:1.4rem;height:1.2rem;padding:0 .35rem;margin-left:.35rem;font-size:.75rem;border-radius:.5rem;background:rgba(255,255,255,.22);}
.data-table{width:100%;border-collapse:separate;border-spacing:0;}
.data-table thead th{position:sticky;top:0;z-index:1;background:#f8fafc;text-align:left;font-weight:800;color:#475569;font-size:.8rem;padding:.9rem 1rem;border-bottom:2px solid #e5e7eb;}
.data-table tbody td{padding:.9rem 1rem;border-bottom:1px solid #eef2f6;vertical-align:middle;font-size:.95rem;color:#0f172a;}
.data-table tbody tr:last-child td{border-bottom:0;}
.thumb{width:100px;height:75px;background:#f1f5f9;border:1px solid #e5e7eb;border-radius:.5rem;overflow:hidden;}
.thumb img{width:100%;height:100%;object-fit:cover;}
.icon-btn{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:.7rem;border:1px solid #e5e7eb;background:#fff;transition:all .2s ease;}
.icon-btn:hover{background:#f8fafc;border-color:#d1d5db;transform:translateY(-1px);}
.icon-btn.danger:hover{background:#fff1f2;border-color:#fecdd3;}
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:1rem;z-index:50;backdrop-filter:blur(2px);}
.modal-card{background:white;border-radius:16px;border:1px solid #e5e7eb;padding:1rem 1rem 1.1rem;box-shadow:0 30px 70px -22px rgba(0,0,0,.35);animation:pop .16s ease-out both;}
@keyframes pop{from{transform:translateY(8px) scale(.98);opacity:0}to{transform:none;opacity:1}}
.spinner{animation:spin 1s linear infinite;}
@keyframes spin{to{transform:rotate(360deg)}}
.row-skeleton{display:none;}
.fade-enter-active,.fade-leave-active{transition:opacity .18s ease,transform .18s ease;}
.fade-enter-from,.fade-leave-to{opacity:0;transform:translateY(4px);}
.edit-backdrop{position:fixed;inset:0;background:rgba(2,6,23,.66);display:flex;align-items:flex-start;justify-content:center;padding:1.25rem;z-index:60;overflow-y:auto;}
.edit-card{width:100%;max-width:1000px;background:linear-gradient(180deg,#fff,#fbfbfb);border:1px solid #e5e7eb;border-radius:20px;box-shadow:0 50px 120px -35px rgba(0,0,0,.5);animation:pop .16s ease-out both;overflow:hidden;margin:auto 0;}
.edit-header{position:relative;padding:1rem 1.25rem;color:white;}
.header-bg{position:absolute;inset:0;background:linear-gradient(90deg,var(--brand-from),var(--brand-to));opacity:.98;}
.edit-body{display:grid;grid-template-columns:1fr 380px;gap:1.5rem;padding:1.25rem;}
.label{display:block;font-size:.78rem;letter-spacing:.05em;text-transform:uppercase;font-weight:800;color:#475569;margin-bottom:.35rem;}
.muted{color:#94a3b8;font-weight:600;}
.field{position:relative;}
.field-error .input{border-color:#ef4444;box-shadow:0 0 0 3px rgba(239,68,68,.12);}
.aux{position:absolute;right:.5rem;bottom:.5rem;display:flex;gap:.5rem;align-items:center;}
.counter{font-size:.72rem;color:#64748b;font-weight:700;background:#f1f5f9;padding:.15rem .4rem;border-radius:.45rem;}
.counter.warn{background:#fff7ed;color:#b45309;}
.edit-footer{grid-column:1 / -1;display:flex;align-items:center;justify-content:flex-end;gap:.75rem;padding:1rem 1.25rem;border-top:1px solid #eef2f6;background:rgba(255,255,255,.8);}
.btn-modal{padding:.5rem 1rem;font-size:.9rem;border-radius:.7rem;}
.btn-save{background:#d7037b !important;color:#fff !important;box-shadow:none !important;filter:none !important;}
.mini-thumb{width:42px;height:32px;border-radius:.4rem;overflow:hidden;border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.15);}
.mini-thumb img{width:100%;height:100%;object-fit:cover;}
.error-text{color:#b91c1c;font-size:.85rem;margin-top:.25rem;}
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.list-move { transition: transform 0.3s ease; }
.badge-sq{display:inline-flex;align-items:center;gap:.35rem;padding:.28rem .5rem;font-size:.75rem;font-weight:700;line-height:1;border:1px solid #E2E8F0;color:#0f172a;background:#fff;border-radius:4px;box-shadow:0 1px 0 rgba(2,6,23,.05);}
.badge-sq--active{background:#0f172a;color:#fff;border-color:#0f172a;}
.badge-remove{display:inline-grid;place-items:center;width:18px;height:18px;border-radius:3px;background:rgba(255,255,255,.14);border:1px solid rgba(148,163,184,.35);}
.tile-list{display:grid;grid-template-columns:repeat(auto-fill, minmax(140px, 1fr));gap:.55rem;}
.tile{display:flex;align-items:center;gap:.6rem;padding:.65rem .7rem;border:1px solid #E2E8F0;background:#fff;color:#0f172a;border-radius:6px;text-align:left;transition:all .18s ease;}
.tile:hover{border-color:#94A3B8;box-shadow:0 4px 16px -10px rgba(2,6,23,.25);transform:translateY(-1px);}
.tile.is-selected{border-color:#0f172a;box-shadow:inset 0 0 0 1px #0f172a, 0 2px 10px -6px rgba(2,6,23,.25);}
.tile-check{width:18px;height:18px;border-radius:3px;display:inline-grid;place-items:center;border:1px solid #CBD5E1;background:#F8FAFC;}
select.input { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e"); background-position: right 0.5rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; -webkit-appearance: none; appearance: none; padding-right: 2.5rem; }
.close-btn{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.35);box-shadow:0 2px 10px -4px rgba(0,0,0,.35);}
.close-btn:hover{background:rgba(255,255,255,.22);}
.close-btn:active{transform:translateY(1px);}

/* --- INICIO DE CAMBIOS PARA RESPONSIVIDAD --- */
@media(max-width: 1023px) {
  .edit-body {
    grid-template-columns: 1fr;
  }
  .preview {
    display: none;
  }
}

/* En pantallas pequeñas (móviles) */
@media (max-width: 639px) {
  .data-table tbody {
    /* Eliminamos el borde de la tabla para dar paso a las tarjetas */
    border-top: 1px solid #e5e7eb; 
  }

  .data-table tr {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid #eef2f6;
  }

  /* La primera celda (td-image) contendrá la imagen */
  .td-image {
    width: 100px;
    flex-shrink: 0;
    padding: 0 !important;
  }
  .td-image .thumb {
    width: 100px;
    height: 100px;
  }

  /* La segunda celda (td-content) contendrá toda la información */
  .td-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 0 !important;
  }
}
/* --- FIN DE CAMBIOS PARA RESPONSIVIDAD --- */
</style>