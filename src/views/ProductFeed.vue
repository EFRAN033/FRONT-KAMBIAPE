<!-- src/components/Productos.vue -->
<template>
  <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 antialiased">
    <!-- ===== Modal Propuesta ===== -->
    <Transition name="fade-overlay">
      <div
        v-if="activeProposal"
        class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 sm:p-6 z-[60] backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposal-title"
        aria-describedby="proposal-description"
        @keydown.esc="cancelProposal"
        @click.self="cancelProposal"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl max-w-3xl w-full text-center md:text-left animate-[pop-in] opacity-0"
          ref="proposalRef"
          tabindex="-1"
          @keydown.tab.prevent="handleModalTab($event)"
        >
          <button
            ref="closeBtnRef"
            @click="cancelProposal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Cerrar modal"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h3 id="proposal-title" class="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 text-center leading-tight">
            Propón un <span class="text-brand-primary animate-pulse">Intercambio</span> por:
          </h3>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 p-3 mb-6 bg-brand-light/60 dark:bg-gray-800 rounded-xl shadow-inner border border-brand-medium/60">
            <div class="flex-shrink-0">
              <img :src="`${API_BASE_URL}${activeProposal.thumbnail_image_url}`" :alt="activeProposal.title" class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl shadow-md border-2 border-brand-medium/60" />
            </div>
            <div class="text-center sm:text-left">
              <p class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ activeProposal.title }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ activeProposal.category_name }}</p>
            </div>
          </div>

          <p id="proposal-description" class="text-gray-700 dark:text-gray-300 mb-6 text-center md:text-left">
            Selecciona el producto de tu lista que te gustaría ofrecer:
          </p>

          <!-- Lista de productos del usuario -->
          <div class="max-h-64 overflow-y-auto p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <button
              v-for="product in userProducts"
              :key="product.id"
              @click="selectProductForProposal(product)"
              :class="[
                'w-full flex items-center p-3 mb-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm transition last:mb-0 border-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
                isSelected(product) ? 'border-brand-primary ring-2 ring-brand-primary/40' : 'border-gray-200 dark:border-gray-700 hover:bg-brand-light/40'
              ]"
              :aria-pressed="isSelected(product)"
            >
              <img :src="`${API_BASE_URL}${product.thumbnail_image_url}`" :alt="product.title" class="w-16 h-16 object-cover rounded-md mr-4 border border-gray-200 dark:border-gray-600" />
              <div class="flex-1">
                <p class="font-semibold text-gray-800 dark:text-gray-100 truncate">{{ product.title }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ product.category_name }}</p>
              </div>
              <div v-if="isSelected(product)" class="text-brand-primary ml-3 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </button>

            <div v-if="!userStore.isLoggedIn" class="text-center text-gray-500 dark:text-gray-400 py-6">
              <p class="mb-3">Inicia sesión para elegir uno de tus productos.</p>
              <router-link to="/login" class="inline-flex items-center px-4 py-2.5 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold shadow hover:opacity-95 transition">
                Ir a Login
              </router-link>
            </div>

            <div v-else-if="userProducts.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-6">
              <p class="mb-4">Aún no tienes productos publicados.</p>
              <router-link to="/publish" class="inline-flex items-center px-5 py-2.5 rounded-full bg-brand-primary text-white font-semibold shadow-md hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-brand-primary/50">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"></path></svg>
                Publicar un producto
              </router-link>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              @click="cancelProposal"
              class="px-5 py-2.5 rounded-full text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              @click="sendProposal"
              :disabled="!selectedProductForProposal"
              class="px-6 py-2.5 rounded-full bg-brand-primary text-white font-semibold shadow-md hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-primary/60 focus:ring-offset-2"
            >
              Enviar propuesta
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toast -->
    <transition name="slide-in-right">
      <div v-if="showNotification" class="fixed top-20 right-4 bg-success text-white px-4 py-3 rounded-xl shadow-xl z-[70] flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>¡Propuesta enviada!</span>
      </div>
    </transition>

    <!-- ===== HERO ===== -->
    <section class="relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/2 -top-28 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-primary/15 to-brand-dark/15 blur-3xl"></div>
        <div class="absolute inset-0 opacity-10 dark:opacity-20 mix-blend-multiply"
             style="background-image: radial-gradient(circle at 1px 1px, #a6045d 1px, transparent 1.5px);
                    background-size: 22px 22px;"></div>
      </div>

      <div class="relative mx-auto max-w-7xl px-6 lg:px-8 py-10 sm:py-12">
        <div class="grid items-center grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <header class="lg:col-span-7">
            <div class="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-white/5 ring-1 ring-gray-200/70 dark:ring-white/10 px-3 py-1">
              <span class="h-1.5 w-1.5 rounded-full bg-brand-primary"></span>
              <span class="text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-dark">Bienvenido a KambiaPe</span>
            </div>

            <h1 class="mt-3 text-[28px] sm:text-[34px] font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white font-lobster">
              Intercambia fácil, seguro y sin comisiones.
            </h1>

            <p class="mt-3 max-w-[60ch] text-[15px] sm:text-[16px] leading-relaxed text-gray-700 dark:text-gray-300">
              Publica lo que ya no usas y encuentra lo que necesitas en tu comunidad.
              Perfiles verificados, chat directo y reglas claras.
            </p>

            <div class="mt-2 h-[2px] w-56 bg-gradient-to-r from-brand-primary/30 to-brand-dark/30"></div>

            <div class="mt-6 flex flex-wrap items-stretch gap-3">
              <router-link
                to="/publicar"
                class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-primary text-white font-semibold shadow-lg shadow-brand-primary/30 hover:brightness-110 active:scale-95 transition rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/70"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"/>
                </svg>
                Publicar objeto
              </router-link>

              <router-link
                to="/explore"
                class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/90 dark:bg-white/5 ring-1 ring-gray-200/70 dark:ring-white/10 text-brand-dark font-medium hover:bg-white transition rounded-full"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M11 5a7 7 0 1 0 4.9 12l3.6 3.6 1.4-1.4-3.6-3.6A7 7 0 0 0 11 5Z"/>
                </svg>
                Explorar intercambios
              </router-link>

              <router-link
                to="/buzon"
                class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/90 dark:bg-white/5 ring-1 ring-gray-200/70 dark:ring-white/10 text-gray-700 dark:text-gray-200 font-medium hover:bg-white transition rounded-full"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5a2 2 0 0 0-2 2v12a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V5a2 2 0 0 0-2-2Zm0 10h-3.38a2 2 0 0 0-1.79 1.11l-.66 1.33a1 1 0 0 1-.9.56h-1.54a1 1 0 0 1-.9-.56l-.66-1.33A2 2 0 0 0 8.38 13H5V5h14v8Z"/>
                </svg>
                Mis mensajes
              </router-link>
            </div>

            <ul class="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-gray-600 dark:text-gray-400">
              <li class="inline-flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-success"></span> Perfiles verificados</li>
              <li class="inline-flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-accentBlue"></span> Mediación segura</li>
              <li class="inline-flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-brand-primary"></span> 0% comisiones</li>
            </ul>
          </header>

          <aside class="lg:col-span-5">
            <div class="relative mx-auto w-full max-w-md group select-none">
              <svg class="absolute -z-10 left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 opacity-55" viewBox="0 0 200 200" fill="none">
                <defs>
                  <radialGradient id="ringGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(100)">
                    <stop offset="0" stop-color="#d7037b" stop-opacity="0.6"/>
                    <stop offset="1" stop-color="#a6045d" stop-opacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="92" stroke="url(#ringGrad)" stroke-width="1.6"/>
              </svg>

              <div class="relative h-[23rem]">
                <div
                  v-for="(card, i) in orderedCards"
                  :key="card.id"
                  :class="[
                    'absolute left-1/2 top-1/2 h-[19rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden transition-all duration-500 ease-out',
                    'bg-white/40 backdrop-blur-md dark:bg-white/5 shadow-lg',
                    positionClass(i)
                  ]"
                  :style="transformStyle(i)"
                  @click="shuffle()"
                >
                  <img :src="card.img" :alt="card.alt" class="h-full w-full object-cover" />
                  <div class="pointer-events-none absolute inset-0 overflow-hidden">
                    <div class="absolute -left-1/3 top-0 h-full w-1/2 bg-gradient-to-r from-white/35 to-transparent opacity-0 group-hover:opacity-40 transition duration-700 translate-x-[-120%] group-hover:translate-x-[180%]"></div>
                  </div>
                  <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span class="text-white text-xs font-medium drop-shadow">{{ card.alt }}</span>
                    <span class="px-2 py-0.5 text-[10px] rounded-full bg-gradient-to-r from-brand-primary to-brand-dark text-white shadow">
                      {{ card.badge }}
                    </span>
                  </div>
                  <div class="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/10 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
                    Activo
                    <span v-if="i === frontIndex" class="ml-1 h-1.5 w-1.5 rounded-full bg-success"></span>
                  </div>
                </div>
              </div>

              <div class="mt-3 grid grid-cols-3 gap-2 text-[11px] font-medium text-gray-500 dark:text-gray-400">
                <div class="flex items-center gap-2"><span class="h-1.5 w-6 rounded-full bg-brand-primary/70"></span> Publica</div>
                <div class="flex items-center gap-2"><span class="h-1.5 w-6 rounded-full bg-brand-dark/70"></span> Propuestas</div>
                <div class="flex items-center gap-2"><span class="h-1.5 w-6 rounded-full bg-success/70"></span> Intercambia</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ===== Filtros sticky ===== -->
    <div class="bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow-md my-8 p-4 sticky top-3 z-40">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Buscador con debounce -->
        <div class="w-full md:w-1/3 relative">
          <label for="search-filter" class="sr-only">Buscar productos</label>
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" /></svg>
          </div>
          <input
            type="search"
            id="search-filter"
            :value="searchQuery"
            @input="onSearchInput"
            placeholder="Buscar por nombre, marca..."
            class="block w-full rounded-full border-0 bg-gray-100 dark:bg-gray-700/50 py-2.5 pl-11 pr-5 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary transition sm:text-sm"
          />
        </div>

        <!-- Controles -->
        <div class="flex items-center gap-3 flex-wrap">
          <!-- Categoría -->
          <div class="relative" @keydown.escape="isCategoryDropdownOpen=false">
            <button
              ref="catBtnRef"
              @click="toggleCategory"
              @keydown.arrow-down.prevent="openCategoryAndFocusFirst()"
              type="button"
              class="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-haspopup="listbox"
              :aria-expanded="isCategoryDropdownOpen"
            >
              <svg class="h-5 w-5 text-brand-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM2.5 6.25c0-.414.336-.75.75-.75h7.5c.414 0 .75.336.75.75v7.5c0 .414-.336-.75-.75-.75h-7.5a.75.75 0 01-.75-.75v-7.5z" /><path d="M15.25 5.5a.75.75 0 00-1.5 0v7a.75.75 0 001.5 0v-7zM17.5 5.5a.75.75 0 00-1.5 0v7a.75.75 0 001.5 0v-7z" /></svg>
              <span class="text-gray-600 dark:text-gray-400">Categoría:</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ selectedCategory || 'Todas' }}</span>
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clip-rule="evenodd" /></svg>
            </button>
            <Transition name="dropdown">
              <ul
                v-if="isCategoryDropdownOpen"
                ref="catListRef"
                class="absolute top-full mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none z-10 py-1 max-h-72 overflow-auto"
                role="listbox"
                tabindex="-1"
                @keydown.arrow-down.prevent="focusNext('cat')"
                @keydown.arrow-up.prevent="focusPrev('cat')"
                @keydown.enter.prevent="selectFocused('cat')"
              >
                <li
                  ref="catOptionRefs"
                  :data-index="0"
                  class="text-gray-700 dark:text-gray-200 px-4 py-2 text-sm hover:bg-brand-light/60 dark:hover:bg-gray-700 cursor-pointer"
                  role="option"
                  aria-selected="true"
                  @click.prevent="selectCategory('')"
                >
                  Todas las categorías
                </li>
                <li
                  v-for="(category, idx) in categories"
                  :key="category"
                  ref="catOptionRefs"
                  :data-index="idx+1"
                  class="text-gray-700 dark:text-gray-200 px-4 py-2 text-sm hover:bg-brand-light/60 dark:hover:bg-gray-700 cursor-pointer"
                  role="option"
                  @click.prevent="selectCategory(category)"
                >
                  {{ category }}
                </li>
              </ul>
            </Transition>
          </div>

          <!-- Orden -->
          <div class="relative" @keydown.escape="isSortDropdownOpen=false">
            <button
              ref="sortBtnRef"
              @click="toggleSort"
              @keydown.arrow-down.prevent="openSortAndFocusFirst()"
              type="button"
              class="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-haspopup="listbox"
              :aria-expanded="isSortDropdownOpen"
            >
              <svg class="h-5 w-5 text-brand-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2.24 6.5A.75.75 0 013 6h14a.75.75 0 010 1.5H3a.75.75 0 01-.76-.5zM3 10h14a.75.75 0 010 1.5H3a.75.75 0 010-1.5zM3.75 14a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clip-rule="evenodd" /></svg>
              <span class="text-gray-600 dark:text-gray-400">Ordenar:</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ sortOptions.find(opt => opt.value === sortBy)?.label }}</span>
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clip-rule="evenodd" /></svg>
            </button>
            <Transition name="dropdown">
              <ul
                v-if="isSortDropdownOpen"
                ref="sortListRef"
                class="absolute top-full mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none z-10 py-1"
                role="listbox"
                tabindex="-1"
                @keydown.arrow-down.prevent="focusNext('sort')"
                @keydown.arrow-up.prevent="focusPrev('sort')"
                @keydown.enter.prevent="selectFocused('sort')"
              >
                <li
                  v-for="(option, idx) in sortOptions"
                  :key="option.value"
                  ref="sortOptionRefs"
                  :data-index="idx"
                  class="text-gray-700 dark:text-gray-200 px-4 py-2 text-sm hover:bg-brand-light/60 dark:hover:bg-gray-700 cursor-pointer"
                  role="option"
                  @click.prevent="selectSortBy(option.value)"
                >
                  {{ option.label }}
                </li>
              </ul>
            </Transition>
          </div>

          <!-- Reiniciar -->
          <div class="w-full md:w-auto">
            <button @click="resetFilters" class="w-full md:w-auto flex-shrink-0 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 font-medium py-2.5 px-6 rounded-full transition shadow-sm ring-1 ring-inset ring-transparent hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-brand-primary">
              Reiniciar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== Grid Productos ===== -->
    <div class="py-10 md:py-12 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-inner">
      <!-- Skeleton -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
        <div v-for="n in 12" :key="n" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
          <div class="w-full h-48 sm:h-56 bg-gray-200 dark:bg-gray-700"></div>
          <div class="p-5">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
            <div class="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
              <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div class="h-10 bg-brand-primary/40 dark:bg-brand-primary/60 rounded-full w-24"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty -->
      <div v-else-if="visibleProducts.length === 0" class="text-center py-20 px-4">
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-3 font-semibold">No se encontraron productos</p>
        <p class="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">Prueba cambiando filtros o términos de búsqueda. También puedes mostrar todos los productos nuevamente.</p>
        <button @click="resetFilters" class="mt-6 px-6 py-3 bg-brand-primary text-white rounded-full hover:brightness-110 transition shadow-md focus:outline-none focus:ring-2 focus:ring-brand-primary/60">
          Mostrar todos los productos
        </button>
      </div>

      <!-- Lista -->
      <TransitionGroup name="product-list" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
        <article
          v-for="product in visibleProducts"
          :key="product.id"
          class="relative isolate bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group border border-gray-100 dark:border-gray-700 focus-within:ring-2 focus-within:ring-brand-primary outline-none"
          tabindex="0"
          @keydown.enter.prevent="openProposalModal(product)"
        >
          <div class="relative overflow-hidden rounded-t-xl">
            <img
              :src="`${API_BASE_URL}${product.thumbnail_image_url}`"
              :alt="product.title"
              class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <!-- Quick actions -->
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
            <div class="absolute top-2 right-2 flex gap-2">
              <button @click.stop="toggleWish(product)" :aria-pressed="isWished(product)" class="rounded-full bg-white/90 p-2 shadow hover:bg-white transition">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path :class="isWished(product) ? 'fill-brand-primary' : 'fill-gray-400'" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4 8.04 4 9.54 4.81 10.35 6.09 11.16 4.81 12.66 4 14.2 4 16.7 4 18.7 6 18.7 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
              <router-link
                :to="`/product/${product.id}`"
                class="rounded-full bg-white/90 p-2 shadow hover:bg-white transition"
                aria-label="Ver detalle"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Zm0 12a5 5 0 1 1 5-5 5 5 0 0 1-5 5Z"/></svg>
              </router-link>
            </div>
          </div>

          <div class="absolute -top-3 right-3 z-10 bg-brand-primary text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg shadow-brand-primary/30">
            {{ product.category_name }}
          </div>

          <div class="p-5">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 truncate">{{ product.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{{ product.description }}</p>

            <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4 gap-3">
              <div class="inline-flex items-center">
                <svg class="w-4 h-4 mr-1 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                </svg>
                <span class="truncate">{{ product.condition }}</span>
              </div>
              <span aria-hidden="true">•</span>
              <span class="truncate">Hace {{ calculateAgeDays(product.created_at) }} días</span>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
              <span class="text-[13px] px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                #{{ product.id }}
              </span>
              <button
                @click="openProposalModal(product)"
                class="bg-brand-primary text-white px-4 py-2 rounded-full text-sm font-medium transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand-primary/60"
              >
                Intercambiar
              </button>
            </div>
          </div>
        </article>
      </TransitionGroup>

      <!-- Infinite scroll sentinel -->
      <div v-if="hasMore" ref="sentinelRef" class="px-4 sm:px-6 lg:px-8 mt-8">
        <div class="w-full h-11 rounded-full bg-gray-200/80 dark:bg-gray-700/60 animate-pulse"></div>
      </div>
    </div>

    <!-- ===== CTA Redes ===== -->
    <section class="relative w-full overflow-hidden mt-10 rounded-2xl ring-1 ring-white/20" aria-label="Redes sociales Kambix">
      <div class="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-dark">
        <div class="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4)_1px,transparent_1.5px)] bg-[length:18px_18px]"></div>
        <div class="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.4)_1px,transparent_1.5px)] bg-[length:18px_18px]"></div>
      </div>

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-7">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-center sm:text-left font-extrabold tracking-wide text-white drop-shadow-[0_2px_0_rgba(166,4,93,0.6)] text-[clamp(14px,2vw,20px)]">
            ¡<span class="uppercase">Kambix</span>! Síguenos y entérate de nuestras novedades
          </p>

          <nav class="flex items-center justify-center gap-2 sm:gap-3" aria-label="Redes sociales">
            <a href="https://www.instagram.com/kambia_pe?igsh=MWg2aWR3YnhnNW1qdw==" target="_blank" rel="noopener noreferrer" class="group inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all hover:scale-[1.04] hover:bg-white" aria-label="Instagram de Kambix (@kambix_oficial)">
              <svg class="h-5 w-5 text-brand-dark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5a5.5 5.5 0 1 0 5.5 5.5A5.5 5.5 0 0 0 12 7.5ZM18 6.8a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 18 6.8Z"/></svg>
            </a>
            <a href="https://tiktok.com/@kambiape" target="_blank" rel="noopener noreferrer" class="group inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all hover:scale-[1.04] hover:bg-white" aria-label="TikTok de Kambix">
              <svg class="h-5 w-5 text-brand-dark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3h3.1A6.9 6.9 0 0 0 23 9.9V13A10 10 0 0 1 13 6.1V16a6 6 0 1 1-6-6c.34 0 .68.03 1.02.1V13a3 3 0 1 0 3 3V3Z"/></svg>
            </a>
            <a href="https://www.facebook.com/share/1A62pnpV8K/" target="_blank" rel="noopener noreferrer" class="group inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all hover:scale-[1.04] hover:bg-white" aria-label="Facebook de Kambix">
              <svg class="h-5 w-5 text-brand-dark" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951Z"/></svg>
            </a>
          </nav>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import router from '@/router';

/* =========================
   Config / Estado General
========================= */
const userStore = useUserStore();
const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:8000';

const products = ref([]);
const loading = ref(true);

// Propuesta
const activeProposal = ref(null);
const selectedProductForProposal = ref(null);
const userProducts = ref([]);
const showNotification = ref(false);

// Filtros
const selectedCategory = ref('');
const sortBy = ref('date-desc');
const searchQuery = ref('');
let searchTimer = null;

// Dropdowns y accesibilidad
const isCategoryDropdownOpen = ref(false);
const isSortDropdownOpen = ref(false);
const catBtnRef = ref(null);
const sortBtnRef = ref(null);
const catListRef = ref(null);
const sortListRef = ref(null);
const catOptionRefs = ref([]);
const sortOptionRefs = ref([]);
let focusedIndex = { cat: 0, sort: 0 };

// Modal focus trap
const proposalRef = ref(null);
const closeBtnRef = ref(null);

// Infinite scroll
const pageSize = 12;
const page = ref(1);
const sentinelRef = ref(null);
let io = null;

// Wishlist local (demo)
const wished = ref(new Set());

// UI Hero cards
const cards = ref([
  { id: 1, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80', alt: 'Cámara', badge: 'Preferido' },
  { id: 2, img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80', alt: 'Mochila', badge: 'Outdoor' },
  { id: 3, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80', alt: 'Teclado', badge: 'Tech' },
]);
const frontIndex = ref(0);
const autoShuffle = ref(true);
const hovering = ref(false);
let shuffleTimer = null;

/* =========================
   Catálogos / Opciones
========================= */
const categories = ref(['Electrónica', 'Mobiliario', 'Deportes', 'Libros', 'Ropa y Accesorios', 'Hogar', 'Juguetes', 'Herramientas', 'Música', 'Videojuegos', 'Coleccionables', 'Arte', 'Otros']);
const sortOptions = ref([
  { value: 'date-desc', label: 'Más recientes' },
  { value: 'date-asc', label: 'Más antiguos' },
  { value: 'name-asc', label: 'Nombre (A-Z)' },
  { value: 'name-desc', label: 'Nombre (Z-A)' },
]);

/* =========================
   Utilidades
========================= */
const calculateAgeDays = (dateString) => {
  const today = new Date();
  const productDate = new Date(dateString);
  const diffTime = Math.abs(today.getTime() - productDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Debounce búsqueda
const onSearchInput = (e) => {
  const val = e.target.value;
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    searchQuery.value = val;
  }, 250);
};

// Wishlist demo
const isWished = (p) => wished.value.has(p.id);
const toggleWish = (p) => {
  if (isWished(p)) wished.value.delete(p.id);
  else wished.value.add(p.id);
};

// Fetch productos (feed público)
const fetchAllProducts = async () => {
  try {
    loading.value = true;
    const res = await fetch(`${API_BASE_URL}/products_feed`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const loggedId = userStore.user?.id;
    products.value = loggedId ? data.filter(p => p.user_id !== loggedId) : data;
  } catch (err) {
    console.error('Error fetching:', err);
  } finally {
    loading.value = false;
  }
};

// Fetch productos del usuario
const fetchLoggedInUserProducts = async () => {
  const loggedId = userStore.user?.id;
  const token = userStore.token;
  if (!loggedId || !token) { userProducts.value = []; return; }
  try {
    const { data } = await axios.get(`${API_BASE_URL}/users/${loggedId}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    userProducts.value = data;
  } catch (error) {
    console.error("Error al obtener productos del usuario:", error);
    userProducts.value = [];
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        userStore.clearUser();
        router.push('/login');
        alert('Tu sesión ha expirado. Inicia sesión para ver tus productos.');
      } else {
        console.error("Detalle de error:", error.response.data);
      }
    } else {
      alert(`Error al cargar tus productos: ${error.message}`);
    }
  }
};

/* =========================
   Filtrado / Orden / Paginación
========================= */
const filteredProducts = computed(() => {
  let out = [...products.value];
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    out = out.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  }
  if (selectedCategory.value) {
    out = out.filter(p => p.category_name === selectedCategory.value);
  }
  out.sort((a, b) => {
    const da = new Date(a.created_at).getTime();
    const db = new Date(b.created_at).getTime();
    switch (sortBy.value) {
      case 'date-desc': return db - da;
      case 'date-asc': return da - db;
      case 'name-asc': return a.title.localeCompare(b.title);
      case 'name-desc': return b.title.localeCompare(a.title);
      default: return 0;
    }
  });
  return out;
});

const visibleProducts = computed(() => filteredProducts.value.slice(0, page.value * pageSize));
const hasMore = computed(() => filteredProducts.value.length > visibleProducts.value.length);
const loadMore = () => { if (hasMore.value) page.value += 1; };

/* =========================
   Dropdowns Accesibles
========================= */
const toggleCategory = () => { isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value; if (isCategoryDropdownOpen.value) nextTick(() => catListRef.value?.focus()); };
const toggleSort = () => { isSortDropdownOpen.value = !isSortDropdownOpen.value; if (isSortDropdownOpen.value) nextTick(() => sortListRef.value?.focus()); };
const openCategoryAndFocusFirst = () => { isCategoryDropdownOpen.value = true; nextTick(() => { catListRef.value?.focus(); focusedIndex.cat = 0; }); };
const openSortAndFocusFirst = () => { isSortDropdownOpen.value = true; nextTick(() => { sortListRef.value?.focus(); focusedIndex.sort = 0; }); };

const selectCategory = (c) => { selectedCategory.value = c; isCategoryDropdownOpen.value = false; catBtnRef.value?.focus(); page.value = 1; };
const selectSortBy = (v) => { sortBy.value = v; isSortDropdownOpen.value = false; sortBtnRef.value?.focus(); page.value = 1; };

const focusNext = (which) => {
  const refs = which === 'cat' ? catOptionRefs.value : sortOptionRefs.value;
  if (!refs?.length) return;
  focusedIndex[which] = (focusedIndex[which] + 1) % refs.length;
  refs[focusedIndex[which]]?.focus();
};
const focusPrev = (which) => {
  const refs = which === 'cat' ? catOptionRefs.value : sortOptionRefs.value;
  if (!refs?.length) return;
  focusedIndex[which] = (focusedIndex[which] - 1 + refs.length) % refs.length;
  refs[focusedIndex[which]]?.focus();
};
const selectFocused = (which) => {
  if (which === 'cat') {
    const idx = focusedIndex.cat;
    if (idx === 0) return selectCategory('');
    const val = categories.value[idx - 1];
    if (val) selectCategory(val);
  } else {
    const opt = sortOptions.value[focusedIndex.sort];
    if (opt) selectSortBy(opt.value);
  }
};

/* =========================
   Reset filtros
========================= */
const resetFilters = () => {
  selectedCategory.value = '';
  sortBy.value = 'date-desc';
  searchQuery.value = '';
  page.value = 1;
};

/* =========================
   Propuesta (modal)
========================= */
const openProposalModal = async (product) => {
  activeProposal.value = product;
  selectedProductForProposal.value = null;
  if (userProducts.value.length === 0 && userStore.isLoggedIn) {
    await fetchLoggedInUserProducts();
  }
  await nextTick();
  proposalRef.value?.focus();
};
const cancelProposal = () => {
  activeProposal.value = null;
  selectedProductForProposal.value = null;
};
const isSelected = (p) => selectedProductForProposal.value && selectedProductForProposal.value.id === p.id;
const selectProductForProposal = (p) => { selectedProductForProposal.value = p; };

const sendProposal = async () => {
  if (!selectedProductForProposal.value || !activeProposal.value) {
    alert('Selecciona un producto para la propuesta.');
    return;
  }
  try {
    const token = userStore.token;
    if (!token) throw new Error("Necesitas iniciar sesión.");
    await axios.post(`${API_BASE_URL}/proposals`, {
      offered_product_id: selectedProductForProposal.value.id,
      requested_product_id: activeProposal.value.id,
      proposer_user_id: userStore.user?.id,
      owner_of_requested_product_id: activeProposal.value.user_id,
    }, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    });
    showNotification.value = true;
    setTimeout(() => { showNotification.value = false; }, 2500);
    cancelProposal();
  } catch (error) {
    console.error('Error al enviar la propuesta:', error);
    if (axios.isAxiosError(error) && error.response) {
      alert(`No se pudo enviar: ${error.response.data.detail || error.message}`);
    } else {
      alert(`No se pudo enviar: ${error.message}`);
    }
  }
};

// Focus trap simple
const handleModalTab = (e) => {
  const focusables = proposalRef.value?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusables || !focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (!e.shiftKey && document.activeElement === last) { first.focus(); }
  if (e.shiftKey && document.activeElement === first) { last.focus(); }
};

/* =========================
   Hero shuffle
========================= */
const orderedCards = computed(() => {
  const arr = [...cards.value];
  return arr.slice(frontIndex.value).concat(arr.slice(0, frontIndex.value));
});
const shuffle = () => { frontIndex.value = (frontIndex.value + 1) % cards.value.length; };
const positionClass = (pos) => (pos === 0 ? 'z-30 ring-gray-200 shadow-2xl dark:ring-white/10' : pos === 1 ? 'z-20 ring-gray-200 shadow-xl opacity-95 dark:ring-white/10' : 'z-10 ring-gray-200 shadow opacity-85 dark:ring-white/10');
const transformStyle = (pos) => pos === 0 ? { transform: 'translate(-50%, -50%) rotate(0deg) scale(1)' } : pos === 1 ? { transform: 'translate(calc(-50% + 18px), calc(-50% + 10px)) rotate(6deg) scale(0.96)' } : { transform: 'translate(calc(-50% - 18px), calc(-50% + 18px)) rotate(-8deg) scale(0.92)' };
const startShuffleTimer = () => {
  stopShuffleTimer();
  shuffleTimer = setInterval(() => { if (autoShuffle.value) shuffle(); }, hovering.value ? 1800 : 2800);
};
const stopShuffleTimer = () => { if (shuffleTimer) { clearInterval(shuffleTimer); shuffleTimer = null; } };

/* =========================
   Lifecycle
========================= */
onMounted(() => {
  fetchAllProducts();
  startShuffleTimer();

  // Intersección para cargar más
  io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) loadMore(); });
  }, { rootMargin: '300px' });
  if (sentinelRef.value) io.observe(sentinelRef.value);
});
onBeforeUnmount(() => {
  stopShuffleTimer();
  if (io && sentinelRef.value) io.unobserve(sentinelRef.value);
  io = null;
});
watch([autoShuffle, hovering], () => { startShuffleTimer(); });

// Actualiza productos del usuario cuando inicie/cierre sesión
watch(() => userStore.isLoggedIn, (v) => { v ? fetchLoggedInUserProducts() : userProducts.value = []; }, { immediate: true });

// reinicia paginación cuando cambian filtros/búsqueda
watch([selectedCategory, sortBy, searchQuery], () => { page.value = 1; });
</script>

<style scoped>
/* Transiciones reutilizando tus keyframes/animaciones */
.fade-overlay-enter-active,
.fade-overlay-leave-active { transition: opacity .25s ease }
.fade-overlay-enter-from,
.fade-overlay-leave-to { opacity: 0 }

/* Lista productos (aparición) */
.product-list-enter-active,
.product-list-leave-active { transition: all .35s ease }
.product-list-enter-from,
.product-list-leave-to { opacity: 0; transform: translateY(18px) }
.product-list-leave-active { position: absolute }

/* Toast */
.slide-in-right-enter-active,
.slide-in-right-leave-active { transition: all .5s cubic-bezier(.68,-.55,.27,1.55) }
.slide-in-right-enter-from,
.slide-in-right-leave-to { transform: translateX(100%); opacity: 0 }

/* Clamp multi-línea */
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden }
.truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis }
</style>
