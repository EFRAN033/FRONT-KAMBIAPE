<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans antialiased text-slate-900">
    <Header />

    <main class="py-8 sm:py-10">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <header class="mb-6 sm:mb-8">
          <div class="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 class="text-[28px] sm:text-[34px] font-black tracking-tight">Intercambios · Mensajería</h1>
              <p class="mt-1 text-[15px] text-slate-600">Conversa, coordina y concreta con seguridad.</p>
            </div>
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="inline-flex overflow-hidden border border-slate-300">
                <button
                  @click="filter='all'"
                  :class="['px-3 py-1.5 text-sm font-semibold', filter==='all' ? 'bg-white text-[#9e0154]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200']">
                  Todas
                </button>
                <button
                  @click="filter='unread'"
                  :class="['px-3 py-1.5 text-sm font-semibold border-l border-slate-300', filter==='unread' ? 'bg-white text-[#9e0154]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200']">
                  No leídas
                </button>
              </div>
              <div class="relative">
                <input
                  v-model="search"
                  type="search"
                  placeholder="Buscar…"
                  class="w-[160px] sm:w-[220px] px-3 py-2 text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#d7037b] focus:border-transparent placeholder:text-slate-400"
                />
                <svg class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
            </div>
          </div>
          <div class="mt-4 h-[2px] w-full bg-gradient-to-r from-[#d7037b]/50 via-[#d7037b]/20 to-transparent"></div>
        </header>

        <div v-if="loadingConversations" class="flex items-center justify-center h-[75vh] max-h-[850px] bg-white border border-slate-200">
          <svg class="animate-spin h-10 w-10 text-[#d7037b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.29A7.96 7.96 0 0 1 4 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"/>
          </svg>
          <p class="ml-3 text-sm font-medium text-[#9e0154]">Cargando tus conversaciones…</p>
        </div>

        <div v-else class="relative h-[75vh] max-h-[850px] border border-slate-200 overflow-hidden lg:flex lg:flex-row">
          
          <aside
            class="w-full lg:w-[34%] flex-shrink-0 border-r border-slate-200 overflow-y-auto custom-scrollbar-unique transition-transform duration-300 ease-in-out lg:translate-x-0"
            :class="{ '-translate-x-full': isChatViewVisible }"
          >
            <div class="sticky top-0 bg-white/90 backdrop-blur px-4 py-3 border-b border-slate-100 z-10 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <h2 class="text-[13px] tracking-wide font-semibold text-slate-700">Conversaciones</h2>
              </div>
              <div class="flex items-center gap-2">
                <span v-if="totalUnreadMessages>0" class="text-[11px] px-2 py-0.5 bg-red-50 text-red-700 border border-red-200">
                  {{ totalUnreadMessages }} sin leer
                </span>
                <div class="relative">
                  <button @click="isConversationMenuOpen = !isConversationMenuOpen" class="p-1.5 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800" title="Más opciones">
                    <EllipsisVerticalIcon class="h-5 w-5" />
                  </button>
                  <div v-if="isConversationMenuOpen" @click.away="isConversationMenuOpen = false" class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                    <div class="py-1">
                      <a @click.prevent="openBlockedUsersModal" href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                        <ShieldCheckIcon class="h-4 w-4 text-slate-500" />
                        Gestionar bloqueados
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul v-if="filteredConversations.length" class="divide-y divide-slate-100">
              <li
                v-for="c in filteredConversations"
                :key="c.exchange.id"
                class="relative"
                :class="selectedConversation && selectedConversation.exchange.id === c.exchange.id ? 'bg-slate-50' : ''"
              >
                <div @click="selectConversation(c)" class="pl-4 pr-12 py-3 cursor-pointer transition-colors hover:bg-slate-50">
                    <span class="absolute inset-y-0 left-0 w-1" :class="statusStripeClass(c.exchange.status)"></span>
                    <div class="ml-2 flex items-start gap-3">
                      <div class="relative shrink-0">
                        <img :src="getAvatarUrl(c.user.avatar)" :alt="c.user.full_name" class="h-11 w-11 object-cover rounded-full border border-slate-200"/>
                        <span v-if="c.unread_count > 0" class="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 inline-flex items-center justify-center text-[11px] font-semibold text-white bg-red-500 rounded-full">
                          {{ c.unread_count }}
                        </span>
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="flex items-baseline justify-between gap-2">
                          <p class="text-[15px] font-semibold text-slate-900 truncate" :title="c.user.full_name">{{ formatUserName(c.user.full_name) }}</p>
                          <span class="text-[11px] text-slate-500 whitespace-nowrap">{{ formatTime(c.last_message?.timestamp || c.exchange.created_at) }}</span>
                        </div>
                        <p class="text-[13px] text-slate-600 mt-0.5 truncate">
                          <span v-if="c.last_message?.sender_id === userStore.user?.id || (!c.last_message && c.exchange.proposer_user_id === userStore.user?.id)">Tú: </span>
                          {{ c.last_message?.text || c.exchange.initial_message || 'Propuesta iniciada...' }}
                        </p>
                        <div class="mt-1">
                          <span class="inline-flex items-center px-2 py-0.5 text-[11px] font-medium capitalize ring-1" :class="statusBadgeClass(c.exchange.status)">
                            {{ statusText(c.exchange.status) }}
                          </span>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="absolute top-1/2 -translate-y-1/2 right-2 z-10">
                  <button @click.stop="toggleActionMenu(c.exchange.id)" class="p-1.5 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-700">
                    <EllipsisVerticalIcon class="h-5 w-5" />
                  </button>
                  <div v-if="activeMenuId === c.exchange.id" class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                    <div class="py-1">
                      <a @click.prevent="openBlockModal(c)" href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                        <UserMinusIcon class="h-4 w-4 text-slate-500" />
                        Bloquear usuario
                      </a>
                      <a @click.prevent="openReportModal(c)" href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                        <ShieldExclamationIcon class="h-4 w-4 text-slate-500" />
                        Reportar y Bloquear
                      </a>
                      <div class="my-1 h-px bg-slate-200"></div>
                      <a @click.prevent="openDeleteModal(c)" href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                        <TrashIcon class="h-4 w-4" />
                        Eliminar chat
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div v-else class="p-10 text-center text-slate-500">
              <ChatBubbleOvalLeftIcon class="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p class="text-sm">No se encontraron conversaciones.</p>
            </div>
          </aside>

          <section
            class="absolute inset-0 w-full h-full bg-white flex flex-col overflow-hidden transition-transform duration-300 ease-in-out lg:static lg:flex-1 lg:translate-x-0"
            :class="{ 'translate-x-0': isChatViewVisible, 'translate-x-full': !isChatViewVisible }"
          >
            <template v-if="selectedConversation">
              <div class="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between transition-colors sticky top-0 z-10">
                <div class="flex items-center gap-3 min-w-0">
                  <button @click="returnToConversationList" class="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full lg:hidden">
                    <ArrowLeftIcon class="h-5 w-5" />
                  </button>

                  <img @click="openProfilePanel(selectedConversation.user)" :src="getAvatarUrl(selectedConversation.user.avatar)" :alt="selectedConversation.user.full_name" class="h-10 w-10 rounded-full object-cover border border-white shadow cursor-pointer lg:cursor-default" />
                  <div @click="openProfilePanel(selectedConversation.user)" class="min-w-0 cursor-pointer lg:cursor-default">
                    <h3 class="font-semibold text-[15px] text-slate-900 truncate" :title="selectedConversation.user.full_name">{{ formatUserName(selectedConversation.user.full_name) }}</h3>
                    <p class="text-[12px] text-slate-500" v-if="selectedConversation.user.ubicacion">{{ formatUbicacion(selectedConversation.user.ubicacion) }}</p>
                    <p v-if="isOtherUserTyping" class="text-[12px] text-green-600 h-4 animate-pulse">está escribiendo...</p>
                    <p v-else class="text-[12px] text-slate-600 flex items-center gap-1 flex-wrap h-4">
                      <span class="font-medium text-slate-800 truncate">{{ selectedConversation.exchange.offer.title }}</span>
                      <ArrowRightIcon class="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                      <span class="font-medium text-slate-800 truncate">{{ selectedConversation.exchange.request.title }}</span>
                    </p>
                  </div>
                </div>
                <div @click.stop class="flex gap-1.5 flex-shrink-0">
                  <button v-if="canAcceptOrReject" @click="updateProposalStatus('accepted')" class="p-2 text-green-700 bg-green-50 hover:bg-green-100" title="Aceptar"><CheckIcon class="h-5 w-5" /></button>
                  <button v-if="canAcceptOrReject" @click="updateProposalStatus('rejected')" class="p-2 text-red-700 bg-red-50 hover:bg-red-100" title="Rechazar"><XMarkIcon class="h-5 w-5" /></button>
                  <button v-if="canCancel" @click="openCancelModal" class="p-2 text-gray-600 bg-gray-100 hover:bg-gray-200" title="Cancelar Propuesta"><NoSymbolIcon class="h-5 w-5" /></button>
                  <button v-if="canComplete" @click="openRatingModal" class="p-2 text-blue-700 bg-blue-50 hover:bg-blue-100" title="Completar y Valorar"><StarIcon class="h-5 w-5" /></button>
                  <button @click="openDetailsModal" class="p-2 text-[#9e0154] bg-pink-50 hover:bg-pink-100" title="Detalles"><EyeIcon class="h-5 w-5" /></button>
                </div>
              </div>

               <div class="relative flex-1 overflow-hidden">
                <div v-if="loadingMessages" class="absolute inset-0 flex items-center justify-center bg-white/50 z-20">
                    <svg class="animate-spin h-8 w-8 text-[#d7037b]" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                </div>

                <div v-else-if="messages.length === 0" class="flex h-full items-center justify-center text-center text-slate-500">
                    <p>Aún no hay mensajes en esta conversación.<br>¡Envía el primero!</p>
                </div>

                <div v-else class="h-full overflow-y-auto custom-scrollbar-unique space-y-4 p-5" ref="messagesContainer">
                  <div v-for="(message, index) in messages" :key="message.id" class="flex animate-fade-in-message" :style="{ animationDelay: `${index * 0.05}s` }" :class="message.sender_id === userStore.user?.id ? 'justify-end' : 'justify-start'">
                    <img v-if="message.sender_id !== userStore.user?.id" :src="getAvatarUrl(selectedConversation.user.avatar)" class="h-7 w-7 rounded-full border border-white shadow mr-2 mt-1.5 hidden sm:block" />
                    <div class="max-w-[78%] px-4 py-3 rounded-[10px] shadow-[0_1px_0_rgba(0,0,0,0.04)]" :class="message.sender_id === userStore.user?.id ? 'bg-[#d7037b] text-white rounded-br-sm' : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-bl-sm'">
                      <p class="text-[15px] leading-relaxed break-words">{{ message.text }}</p>
                      <div class="mt-1.5 flex items-center gap-1 text-[11px]" :class="message.sender_id === userStore.user?.id ? 'justify-end text-white/80' : 'justify-start text-slate-500'">
                        <span>{{ formatTime(message.timestamp) }}</span>
                        <span v-if="message.sender_id === userStore.user?.id">
                          <ExclamationCircleIcon v-if="message.error" class="h-4 w-4 inline-block text-red-300" title="Error al enviar"/>
                          <ClockIcon v-else-if="message.sending" class="h-4 w-4 inline-block animate-spin" title="Enviando..."/>
                          <CheckCircleIcon v-else-if="message.is_read" class="h-4 w-4 inline-block text-blue-400" title="Visto" />
                          <CheckCircleIcon v-else class="h-4 w-4 inline-block" title="Entregado" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-4 border-t border-slate-200 bg-slate-50">
                <form @submit.prevent="sendMessage" class="flex items-center gap-3">
                  <input type="text" v-model="newMessageText" placeholder="Escribe tu mensaje…" class="flex-1 p-3 border border-slate-300 focus:ring-2 focus:ring-[#d7037b] focus:border-transparent outline-none" :disabled="!isChatActive" />

                  <button
                    type="button"
                    @click="isLocationModalVisible = true"
                    :disabled="!isChatActive"
                    class="p-3 text-sm font-semibold text-white transition-transform"
                    :class="!isChatActive ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#9e0154] hover:bg-[#d7037b] hover:scale-105 active:scale-95'"
                    title="Sugerir lugar de encuentro"
                  >
                    <MapPinIcon class="h-5 w-5" />
                  </button>

                  <button type="submit" :disabled="!newMessageText.trim() || !isChatActive" class="px-4 py-3 text-sm font-semibold text-white transition-transform" :class="(!newMessageText.trim() || !isChatActive) ? 'bg-[#d7037b] opacity-50 cursor-not-allowed' : 'bg-[#d7037b] hover:scale-105 active:scale-95'" title="Enviar mensaje">
                    <PaperAirplaneIcon class="h-5 w-5" />
                  </button>
                </form>
                 <p v-if="!isChatActive" class="text-[12px] text-red-500 mt-2 text-center">
                  No puedes enviar mensajes a propuestas que han sido {{ statusText(selectedConversation.exchange.status).toLowerCase() }}s.
                </p>
              </div>
            </template>
            <template v-else-if="!isChatViewVisible">
              <div class="hidden lg:flex flex-1 items-center justify-center p-8 text-center text-slate-500">
                <div class="flex flex-col items-center gap-3">
                  <ChatBubbleLeftRightIcon class="h-20 w-20 text-slate-300" />
                  <p class="text-[17px] font-semibold text-slate-700">Selecciona una conversación</p>
                  <p class="text-sm max-w-sm">Elige un chat a la izquierda para ver los mensajes y coordinar un intercambio.</p>
                </div>
              </div>
            </template>
          </section>

          <transition name="slide-fade">
            <aside
              v-if="selectedProfileUser"
              class="absolute inset-0 w-full h-full bg-white transition-transform duration-300 ease-in-out lg:static lg:w-[30%] lg:flex-shrink-0 lg:border-l lg:border-slate-200 lg:translate-x-0 overflow-y-auto custom-scrollbar-unique"
              :class="{ 'translate-x-0': selectedProfileUser, 'translate-x-full': !selectedProfileUser }"
            >
              <div class="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
                <h2 class="text-base font-semibold">Perfil del Usuario</h2>
                <button @click="closeProfilePanel" class="p-1.5 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800">
                  <XMarkIcon class="w-5 h-5" />
                </button>
              </div>
              <div class="flex flex-col p-6">
                <div class="flex flex-col items-center text-center">
                  <img :src="getAvatarUrl(selectedProfileUser.avatar)" alt="Foto de perfil" class="w-24 h-24 rounded-full object-cover mb-4 ring-2 ring-offset-2 ring-[#d7037b]/50">
                  <h3 class="text-xl font-bold">{{ formatUserName(selectedProfileUser.full_name) }}</h3>

                  <div v-if="selectedProfileUser.rating_count > 0" class="mt-2 flex items-center justify-center gap-1.5">
                    <div class="flex items-center text-yellow-400">
                      <StarIconSolid v-for="i in Math.floor(selectedProfileUser.rating_score)" :key="i" class="h-5 w-5"/>
                      <StarIcon v-for="i in 5 - Math.floor(selectedProfileUser.rating_score)" :key="i" class="h-5 w-5 text-slate-300"/>
                    </div>
                    <span class="text-sm font-semibold text-slate-700">{{ selectedProfileUser.rating_score.toFixed(1) }}</span>
                    <span class="text-xs text-slate-500">({{ selectedProfileUser.rating_count }} valoraciones)</span>
                  </div>
                  <p v-else class="mt-2 text-sm text-slate-500 italic">
                    Aún no tiene valoraciones.
                  </p>
                  </div>
                <div class="mt-6 w-full text-left pt-4 border-t border-slate-200">
                  <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Biografía</h4>
                  <p class="text-sm text-slate-600 mt-2 italic">
                    {{ selectedProfileUser.bio || 'Este usuario aún no ha añadido una biografía.' }}
                  </p>
                </div>
                <div class="mt-4 w-full text-left pt-4 border-t border-slate-200">
                  <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center">
                    <MapPinIcon class="h-4 w-4 mr-2 text-slate-400" />
                    Ubicación
                  </h4>
                  <p class="text-sm text-slate-600 mt-2">
                    {{ formatUbicacion(selectedProfileUser.ubicacion) }}
                  </p>
                </div>

                <div class="mt-4 w-full text-left pt-4 border-t border-slate-200">
                  <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Inventario del Usuario</h4>
                  <div v-if="loadingProfileInventory" class="mt-4 text-center">
                    <svg class="animate-spin h-6 w-6 text-[#d7037b] mx-auto" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  </div>
                  <div v-else-if="profileUserInventory.length === 0" class="mt-4 text-center text-sm text-slate-500 italic">
                    Este usuario no tiene productos en su inventario.
                  </div>
                  <div v-else class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <a v-for="product in profileUserInventory" :key="product.id" :href="`/product/${product.id}`" target="_blank" class="block group">
                      <div class="aspect-square bg-slate-100 rounded-md overflow-hidden relative">
                        <img :src="getAvatarUrl(product.thumbnail_image_url)" :alt="product.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                        <div class="absolute inset-0 bg-black/20"></div>
                        <p class="absolute bottom-1.5 left-0 right-0 text-white text-[11px] font-semibold p-1.5 truncate text-center">{{ product.title }}</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div class="mt-4 w-full text-left pt-4 border-t border-slate-200">
                  <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Intereses</h4>
                  <div v-if="selectedProfileUser.interests && selectedProfileUser.interests.length > 0" class="flex flex-wrap gap-1.5 mt-2">
                    <span v-for="interest in selectedProfileUser.interests" :key="interest.id" class="badge-sq">
                      {{ interest.name }}
                    </span>
                  </div>
                  <p v-else class="text-sm text-slate-500 mt-2 italic">
                    Este usuario no ha añadido intereses.
                  </p>
                </div>
              </div>
            </aside>
          </transition>
        </div>
      </div>
    </main>
    <Footer />

    <div v-if="showDetailsModal" @click.self="showDetailsModal = false" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button @click="showDetailsModal = false" class="absolute top-3 right-3 p-2 rounded-full hover:bg-slate-100">
          <XMarkIcon class="w-6 h-6 text-slate-600" />
        </button>
        <h3 class="text-xl font-bold text-slate-800 mb-4">Detalles del Intercambio</h3>
        <div v-if="selectedConversation" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">Producto Ofrecido</h4>
            <div class="border rounded-lg p-4">
              <img :src="getAvatarUrl(selectedConversation.exchange.offer.thumbnail_image_url)" class="w-full h-48 object-cover rounded-md mb-3"/>
              <p class="font-bold">{{selectedConversation.exchange.offer.title}}</p>
              <p class="text-sm text-slate-600">{{selectedConversation.exchange.offer.description}}</p>
            </div>
          </div>
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">Producto Solicitado</h4>
            <div class="border rounded-lg p-4">
              <img :src="getAvatarUrl(selectedConversation.exchange.request.thumbnail_image_url)" class="w-full h-48 object-cover rounded-md mb-3"/>
              <p class="font-bold">{{selectedConversation.exchange.request.title}}</p>
              <p class="text-sm text-slate-600">{{selectedConversation.exchange.request.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isRatingModalVisible" class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center backdrop-blur-sm">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-bold text-slate-900">¡Intercambio completado!</h3>
        <p class="mt-2 text-sm text-slate-600">
          Valora tu experiencia con <span class="font-semibold">{{ formatUserName(selectedConversation.user.full_name) }}</span> para ayudar a la comunidad.
        </p>
        <div class="my-5 flex justify-center">
          <div class="flex items-center gap-2">
            <button
              v-for="star in 5"
              :key="star"
              @click="ratingScore = star"
              class="text-3xl transition-transform duration-150 ease-in-out"
              :class="star <= ratingScore ? 'text-yellow-400 scale-110' : 'text-slate-300 hover:text-yellow-300'"
              :title="`${star} de 5 estrellas`"
            >
              <StarIcon class="w-8 h-8" :class="star <= ratingScore ? 'fill-current' : ''"/>
            </button>
          </div>
        </div>
        <textarea
          v-model="ratingComment"
          rows="3"
          placeholder="(Opcional) Deja un comentario sobre tu experiencia..."
          class="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-[#d7037b] focus:border-transparent">
        </textarea>
        <div class="mt-5 flex justify-end gap-3">
          <button @click="closeRatingModal" class="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md">Omitir</button>
          <button @click="submitRating" :disabled="ratingScore === 0" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed">
            Enviar Valoración
          </button>
        </div>
      </div>
    </div>
    <div v-if="isCancelModalVisible" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-slate-900">Confirmar Cancelación</h3>
        <p class="mt-2 text-sm text-slate-600">¿Estás seguro de que quieres cancelar esta propuesta de intercambio? Esta acción no se puede deshacer.</p>
        <div class="mt-5 flex justify-end gap-3">
          <button @click="closeCancelModal" class="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md">No, mantener</button>
          <button @click="confirmCancel" class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md">Sí, cancelar</button>
        </div>
      </div>
    </div>
    <div v-if="isDeleteModalVisible" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-slate-900">Eliminar conversación</h3>
        <p class="mt-2 text-sm text-slate-600">¿Seguro que quieres eliminar esta conversación? Esta acción es irreversible.</p>
        <div class="mt-5 flex justify-end gap-3">
          <button @click="closeDeleteModal" class="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md">Cancelar</button>
          <button @click="confirmDelete" class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md">Eliminar</button>
        </div>
      </div>
    </div>
    <div v-if="isBlockModalVisible" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-slate-900">Bloquear Usuario</h3>
        <p class="mt-2 text-sm text-slate-600">¿Seguro que quieres bloquear a <span class="font-bold">{{ formatUserName(conversationToActOn?.user.full_name) }}</span>? No podrán enviarte más mensajes ni propuestas.</p>
        <div class="mt-5 flex justify-end gap-3">
          <button @click="closeBlockModal" class="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md">Cancelar</button>
          <button @click="confirmBlock" class="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-md">Bloquear</button>
        </div>
      </div>
    </div>
    <div v-if="isReportModalVisible" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-slate-900">Reportar y Bloquear Usuario</h3>
        <p class="mt-2 text-sm text-slate-600">Estás a punto de reportar y bloquear a <span class="font-bold">{{ formatUserName(conversationToActOn?.user.full_name) }}</span>. Por favor, danos un motivo.</p>
        <textarea v-model="reportReason" rows="3" placeholder="Ej: Es un estafador, me está acosando, etc." class="mt-4 w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-[#d7037b] focus:border-transparent"></textarea>
        <div class="mt-5 flex justify-end gap-3">
          <button @click="closeReportModal" class="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md">Cancelar</button>
          <button @click="confirmBlockAndReport" :disabled="!reportReason.trim()" class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:bg-red-300 disabled:cursor-not-allowed">Reportar y Bloquear</button>
        </div>
      </div>
    </div>
    <div v-if="isBlockedUsersModalVisible" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl p-0 w-full max-w-md mx-4">
        <div class="flex items-center justify-between p-4 border-b border-slate-200">
            <h3 class="text-lg font-semibold text-slate-900">Usuarios Bloqueados</h3>
            <button @click="closeBlockedUsersModal" class="p-1.5 rounded-full text-slate-500 hover:bg-slate-200">
                <XMarkIcon class="w-5 h-5" />
            </button>
        </div>
        <div class="p-6 max-h-[60vh] overflow-y-auto">
            <div v-if="loadingBlockedUsers" class="text-center py-8">
                <svg class="animate-spin h-8 w-8 text-[#d7037b] mx-auto" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            </div>
            <div v-else-if="blockedUsers.length === 0" class="text-center py-8 text-slate-500">
                <NoSymbolIcon class="h-12 w-12 mx-auto text-slate-300 mb-2"/>
                <p>No tienes a nadie bloqueado.</p>
            </div>
            <ul v-else class="space-y-3">
                <li v-for="user in blockedUsers" :key="user.id" class="flex items-center justify-between p-2 rounded-md hover:bg-slate-50">
                    <div class="flex items-center gap-3">
                        <img :src="getAvatarUrl(user.avatar)" :alt="user.full_name" class="h-10 w-10 rounded-full object-cover"/>
                        <span class="font-medium text-sm">{{ formatUserName(user.full_name) }}</span>
                    </div>
                    <button @click="confirmUnblock(user)" class="px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md">
                        Desbloquear
                    </button>
                </li>
            </ul>
        </div>
      </div>
    </div>
    <div v-if="isLocationModalVisible" @click.self="isLocationModalVisible = false" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-0 relative">
        <div class="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white/95">
          <h3 class="text-lg font-bold text-slate-800">Sugerir un Lugar Seguro</h3>
          <button @click="isLocationModalVisible = false" class="p-2 rounded-full hover:bg-slate-100">
            <XMarkIcon class="w-6 h-6 text-slate-600" />
          </button>
        </div>
        <div class="p-5">
            <p class="text-sm text-slate-600 mb-4">Haz clic en un lugar para enviarlo como sugerencia en el chat. Recomendamos siempre lugares públicos y concurridos.</p>
            <ul v-if="suggestedPlaces.length > 0" class="space-y-3">
              <li
                v-for="place in suggestedPlaces"
                :key="place.id"
                @click="sendSuggestedLocation(place)"
                class="flex items-start p-3 rounded-lg border border-slate-200 hover:bg-pink-50 hover:border-pink-300 cursor-pointer transition-all duration-200"
              >
                <div class="p-2 bg-pink-100 rounded-full mr-4">
                    <MapPinIcon class="h-5 w-5 text-[#d7037b]" />
                </div>
                <div>
                  <p class="font-semibold text-[#9e0154]">{{ place.nombre }}</p>
                  <p class="text-xs text-slate-500">{{ place.tipo }}</p>
                </div>
              </li>
            </ul>
            <div v-else class="text-center py-8 text-slate-500">
              <NoSymbolIcon class="h-12 w-12 mx-auto text-slate-300 mb-2"/>
              <p>No hay lugares seguros sugeridos para tu ubicación actual.</p>
              <p class="text-xs mt-1">Asegúrate de haber configurado tu distrito en tu perfil.</p>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import api from '@/axios'; // <--- CAMBIO CLAVE: Importamos la instancia central de axios
import Header from './Header.vue';
import Footer from './Footer.vue';
import { useToast } from 'vue-toastification';
import {
  ChatBubbleLeftRightIcon, ChatBubbleOvalLeftIcon, ArrowRightIcon, CheckIcon, XMarkIcon,
  EyeIcon, PaperAirplaneIcon, CheckCircleIcon, NoSymbolIcon, EllipsisVerticalIcon, TrashIcon,
  UserMinusIcon, ShieldExclamationIcon, ShieldCheckIcon, StarIcon, ClockIcon, ExclamationCircleIcon,
  MapPinIcon, ArrowLeftIcon
} from '@heroicons/vue/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid';
import defaultAvatar from '@/assets/imagenes/defaul/7.svg';
import { useRouter } from 'vue-router';
import suggestedPlacesData from '@/data/lugares_seguros.json';

const isChatViewVisible = ref(false);

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();
const conversations = ref([]);
const selectedConversation = ref(null);
const messages = ref([]);
const newMessageText = ref('');
const filter = ref('all');
const search = ref('');
const loadingConversations = ref(true);
const loadingMessages = ref(false);
const showDetailsModal = ref(false);
const messagesContainer = ref(null);
const selectedProfileUser = ref(null);
const profileUserInventory = ref([]);
const loadingProfileInventory = ref(false);

const activeMenuId = ref(null);
const isDeleteModalVisible = ref(false);
const isBlockModalVisible = ref(false);
const isReportModalVisible = ref(false);
const conversationToActOn = ref(null);
const reportReason = ref('');
const isConversationMenuOpen = ref(false);

const isBlockedUsersModalVisible = ref(false);
const blockedUsers = ref([]);
const loadingBlockedUsers = ref(false);

const isCancelModalVisible = ref(false);

const isRatingModalVisible = ref(false);
const ratingScore = ref(0);
const ratingComment = ref('');

let ws = null;
const isOtherUserTyping = ref(false);

// --- CAMBIO CLAVE: Lógica de WebSocket URL ---
// Determina si estamos en un entorno seguro (https) para usar 'wss'
const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const WS_BASE_URL = `${wsProtocol}//${window.location.host}/ws`;


const isLocationModalVisible = ref(false);

const suggestedPlaces = computed(() => {
  if (!userStore.user || !userStore.user.districtId) {
    return [];
  }
  return suggestedPlacesData.filter(place => place.district_id == userStore.user.districtId);
});

const sendSuggestedLocation = (place) => {
  const locationMessage = `¡Hola! Para mayor seguridad, te sugiero que nos encontremos en un lugar público. ¿Qué te parece en "${place.nombre}"?`;
  newMessageText.value = locationMessage;
  sendMessage();
  isLocationModalVisible.value = false;
};

const formatUbicacion = (ubicacion) => {
  if (!ubicacion) {
    return 'Ubicación no especificada.';
  }
  const parts = ubicacion.split(',').map(part => part.trim());
  if (parts.length >= 3) {
    return parts.join(' - ');
  }
  return ubicacion;
};

const filteredConversations = computed(() => {
  let list = conversations.value;
  if (filter.value === 'unread') {
    list = list.filter(conv => conv.unread_count > 0);
  }
  const q = search.value.trim().toLowerCase();
  if (q) {
    list = list.filter(c => c.user.full_name?.toLowerCase().includes(q) || c.last_message?.text?.toLowerCase().includes(q));
  }
  return list.sort((a, b) => new Date(b.last_message?.timestamp || b.exchange.created_at) - new Date(a.last_message?.timestamp || a.exchange.created_at));
});

const totalUnreadMessages = computed(() => conversations.value.reduce((sum, c) => sum + (c.unread_count > 0 ? 1 : 0), 0));

const isChatActive = computed(() => {
    if (!selectedConversation.value) return false;
    const inactive_statuses = ['rejected', 'cancelled', 'completed'];
    return !inactive_statuses.includes(selectedConversation.value.exchange.status);
});

const canAcceptOrReject = computed(() => {
    if (!selectedConversation.value || !userStore.user) return false;
    const ex = selectedConversation.value.exchange;
    return ex.status === 'pending' && ex.proposer_user_id !== userStore.user.id;
});

const canCancel = computed(() => {
    if (!selectedConversation.value || !userStore.user) return false;
    const ex = selectedConversation.value.exchange;
    return ex.status === 'pending' && ex.proposer_user_id === userStore.user.id;
});

const canComplete = computed(() => {
    if (!selectedConversation.value || !userStore.user) return false;
    const ex = selectedConversation.value.exchange;
    return ex.status === 'accepted';
});

const openDetailsModal = () => {
  showDetailsModal.value = true;
};

const openCancelModal = () => {
  isCancelModalVisible.value = true;
};

const closeCancelModal = () => {
  isCancelModalVisible.value = false;
};

const confirmCancel = async () => {
  await updateProposalStatus('cancelled');
  closeCancelModal();
};

const openRatingModal = () => {
  ratingScore.value = 0;
  ratingComment.value = '';
  isRatingModalVisible.value = true;
};

const closeRatingModal = () => {
  isRatingModalVisible.value = false;
  updateProposalStatus('completed');
};

const submitRating = async () => {
  if (ratingScore.value === 0) {
    toast.error("Debes seleccionar al menos una estrella para valorar.");
    return;
  }
  if (!selectedConversation.value) return;

  const ratingData = {
    score: ratingScore.value,
    comment: ratingComment.value.trim(),
    rated_id: selectedConversation.value.user.id,
    proposal_id: selectedConversation.value.exchange.id,
  };

  try {
    await api.post('/ratings', ratingData);
    toast.success("¡Gracias por tu valoración!");
    await updateProposalStatus('completed');
    if (userStore.user?.id) {
      await userStore.fetchUserProfile(userStore.user.id);
    }
  } catch (error) {
    toast.error(error.response?.data?.detail || "No se pudo enviar la valoración.");
  } finally {
    isRatingModalVisible.value = false;
  }
};

const toggleActionMenu = (id) => {
  activeMenuId.value = activeMenuId.value === id ? null : id;
};

const openDeleteModal = (conversation) => {
  conversationToActOn.value = conversation;
  isDeleteModalVisible.value = true;
  activeMenuId.value = null;
};
const closeDeleteModal = () => isDeleteModalVisible.value = false;

const openBlockModal = (conversation) => {
  conversationToActOn.value = conversation;
  isBlockModalVisible.value = true;
  activeMenuId.value = null;
};
const closeBlockModal = () => isBlockModalVisible.value = false;

const openReportModal = (conversation) => {
  conversationToActOn.value = conversation;
  isReportModalVisible.value = true;
  reportReason.value = '';
  activeMenuId.value = null;
};
const closeReportModal = () => isReportModalVisible.value = false;

const confirmDelete = async () => {
  if (!conversationToActOn.value) return;
  const idToDelete = conversationToActOn.value.exchange.id;
  try {
    await api.delete(`/proposals/${idToDelete}`);
    conversations.value = conversations.value.filter(c => c.exchange.id !== idToDelete);
    if (selectedConversation.value?.exchange.id === idToDelete) {
      selectedConversation.value = null;
    }
    toast.success("Conversación eliminada.");
  } catch (error) {
    toast.error("No se pudo eliminar la conversación.");
  } finally {
    closeDeleteModal();
  }
};

const confirmBlock = async () => {
  if (!conversationToActOn.value) return;
  const userToBlock = conversationToActOn.value.user;
  try {
    await api.post(`/users/${userToBlock.id}/block`);
    toast.warning(`Has bloqueado a ${formatUserName(userToBlock.full_name)}.`);
    conversations.value = conversations.value.filter(c => c.user.id !== userToBlock.id);
    if (selectedConversation.value?.user.id === userToBlock.id) {
      selectedConversation.value = null;
    }
  } catch (error) {
    toast.error(error.response?.data?.detail || "No se pudo bloquear al usuario.");
  } finally {
    closeBlockModal();
  }
};

const confirmBlockAndReport = async () => {
  if (!conversationToActOn.value || !reportReason.value.trim()) return;
  const userToReport = conversationToActOn.value.user;
  try {
    await api.post(`/users/${userToReport.id}/report`, {
      reason: reportReason.value.trim()
    });
    toast.error(`Has reportado y bloqueado a ${formatUserName(userToReport.full_name)}.`);
    conversations.value = conversations.value.filter(c => c.user.id !== userToReport.id);
    if (selectedConversation.value?.user.id === userToReport.id) {
      selectedConversation.value = null;
    }
  } catch (error) {
    toast.error(error.response?.data?.detail || "No se pudo reportar al usuario.");
  } finally {
    closeReportModal();
  }
};

const openBlockedUsersModal = async () => {
  isConversationMenuOpen.value = false;
  isBlockedUsersModalVisible.value = true;
  await fetchBlockedUsers();
};

const closeBlockedUsersModal = () => {
  isBlockedUsersModalVisible.value = false;
};

const fetchBlockedUsers = async () => {
  loadingBlockedUsers.value = true;
  try {
    const { data } = await api.get('/users/me/blocked');
    blockedUsers.value = data;
  } catch (error) {
    toast.error("No se pudo cargar la lista de bloqueados.");
  } finally {
    loadingBlockedUsers.value = false;
  }
};

const confirmUnblock = async (userToUnblock) => {
  try {
    await api.delete(`/users/${userToUnblock.id}/block`);
    toast.success(`${formatUserName(userToUnblock.full_name)} ha sido desbloqueado.`);
    blockedUsers.value = blockedUsers.value.filter(u => u.id !== userToUnblock.id);
    await fetchConversations();
  } catch (error) {
    toast.error("No se pudo desbloquear al usuario.");
  }
};

const openProfilePanel = (user) => {
  selectedProfileUser.value = user;
  fetchProfileUserInventory(user.id);
};

const closeProfilePanel = () => {
  selectedProfileUser.value = null;
  profileUserInventory.value = [];
};

const fetchProfileUserInventory = async (userId) => {
  loadingProfileInventory.value = true;
  try {
    const { data } = await api.get(`/users/${userId}/products`);
    profileUserInventory.value = data;
  } catch (error) {
    console.error("Error al cargar el inventario del perfil:", error);
    toast.error("No se pudo cargar el inventario del usuario.");
    profileUserInventory.value = [];
  } finally {
    loadingProfileInventory.value = false;
  }
};

const formatUserName = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return '';
  const parts = fullName.trim().split(' ').filter(p => p);
  if (parts.length === 0) return '';
  const firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
  if (parts.length === 1) return firstName;
  const lastNameInitial = parts.length > 1 ? parts[1].charAt(0).toUpperCase() : '';
  return `${firstName} ${lastNameInitial}.`.trim();
};

const getAvatarUrl = (path) => {
  if (!path) return defaultAvatar;
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  return path; // <-- CAMBIO CLAVE: Ya no se añade la URL base
};

const formatTime = (s) => s ? new Date(s).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : '';

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

watch(messages, () => {
  scrollToBottom();
}, {
  deep: true
});

const connectWebSocket = () => {
  if (!userStore.user?.id || !userStore.token) return;
  if (ws) ws.close();
  const wsUrl = `${WS_BASE_URL}/${userStore.user.id}?token=${userStore.token}`;
  ws = new WebSocket(wsUrl);
  ws.onopen = () => console.log("WebSocket conectado.");
  ws.onclose = () => ws = null;
  ws.onerror = (error) => console.error("Error de WebSocket:", error);
  ws.onmessage = (event) => {
    const response = JSON.parse(event.data);
    if (response.type === 'new_message' && selectedConversation.value?.exchange.id === response.data.proposal_id) {
      messages.value.push(response.data);
      markMessagesAsRead([response.data]);
    }
  };
};

const fetchConversations = async () => {
  loadingConversations.value = true;
  try {
    const { data } = await api.get('/proposals/me');
    conversations.value = data;
  } catch (e) {
    toast.error('Error al cargar las conversaciones.');
  } finally {
    loadingConversations.value = false;
  }
};

const returnToConversationList = () => {
  isChatViewVisible.value = false;
};

const selectConversation = async (conversation) => {
  isChatViewVisible.value = true;

  if (selectedProfileUser.value) closeProfilePanel();
  if (selectedConversation.value?.exchange.id === conversation.exchange.id) return;

  selectedConversation.value = conversation;
  messages.value = [];
  loadingMessages.value = true;
  try {
    const { data } = await api.get(`/proposals/${conversation.exchange.id}/messages`);
    messages.value = data;

    if (data.length === 0 && conversation.exchange.proposer_user_id === userStore.user?.id) {
      const offerTitle = conversation.exchange.offer?.title || 'producto ofrecido';
      const requestTitle = conversation.exchange.request?.title || 'producto solicitado';

      const autoMessage = `¡Hacemos intercambio! Te propongo cambiar mi producto "${offerTitle}" por tu producto "${requestTitle}".`;

      newMessageText.value = autoMessage;
      await sendMessage();
    }

    const convInList = conversations.value.find(c => c.exchange.id === conversation.exchange.id);
    if (convInList) convInList.unread_count = 0;
    markMessagesAsRead(messages.value);
  } catch (e) {
    toast.error("No se pudieron cargar los mensajes.");
  } finally {
    loadingMessages.value = false;
  }
};

const sendMessage = async () => {
  if (!newMessageText.value.trim() || !isChatActive.value) return;

  const textToSend = newMessageText.value.trim();
  const tempId = `temp_${Date.now()}`;

  messages.value.push({
    id: tempId,
    text: textToSend,
    sender_id: userStore.user.id,
    timestamp: new Date().toISOString(),
    is_read: false,
    sending: true,
    error: false,
  });

  newMessageText.value = '';

  try {
    const { data: sentMessageData } = await api.post('/messages', {
      proposal_id: selectedConversation.value.exchange.id,
      text: textToSend,
    });

    const messageIndex = messages.value.findIndex(m => m.id === tempId);
    if (messageIndex !== -1) {
      messages.value[messageIndex] = { ...messages.value[messageIndex], ...sentMessageData, sending: false };
    }

    const convInList = conversations.value.find(c => c.exchange.id === selectedConversation.value.exchange.id);
    if (convInList) convInList.last_message = sentMessageData;

  } catch (e) {
    toast.error('Error al enviar el mensaje.');
    const messageIndex = messages.value.findIndex(m => m.id === tempId);
    if (messageIndex !== -1) {
      messages.value[messageIndex].sending = false;
      messages.value[messageIndex].error = true;
    }
  }
};

const markMessagesAsRead = async (messagesToRead) => {
    const unreadMessages = messagesToRead.filter(m => !m.is_read && m.sender_id !== userStore.user.id);
    if (unreadMessages.length === 0) return;
    unreadMessages.forEach(m => m.is_read = true);
    const messageIds = unreadMessages.map(m => m.id);
    try {
        await api.patch('/messages/read_status', { message_ids: messageIds, is_read: true });
    } catch (error) {
        console.error("Error al marcar mensajes como leídos:", error);
    }
};

const updateProposalStatus = async (status) => {
  if (!selectedConversation.value) return;
  const statusTextMap = { accepted: 'aceptada', rejected: 'rechazada', cancelled: 'cancelada', completed: 'completada' };

  if (status === 'completed' && !isRatingModalVisible.value) {
    openRatingModal();
    return;
  }

  try {
    await api.put(`/proposals/${selectedConversation.value.exchange.id}/status`, { status });
    selectedConversation.value.exchange.status = status;

    if (status !== 'completed') {
        toast.success(`Propuesta ${statusTextMap[status]}.`);
    }

    const convInList = conversations.value.find(c => c.exchange.id === selectedConversation.value.exchange.id);
    if (convInList) convInList.exchange.status = status;
  } catch (e) {
    toast.error(e.response?.data?.detail || `Error al actualizar la propuesta.`);
  }
};


onMounted(() => {
  if(userStore.isLoggedIn){
    fetchConversations();
    connectWebSocket();
  } else {
    router.push('/login');
  }
});
onBeforeUnmount(() => {
  if (ws) ws.close();
});

const statusStripeClass = (status) => ({
  'bg-sky-400': status === 'pending',
  'bg-green-500': status === 'accepted',
  'bg-red-500': status === 'rejected',
  'bg-slate-400': status === 'cancelled',
  'bg-[#d7037b]': status === 'completed',
});

const statusBadgeClass = (status) => ({
  'bg-white text-sky-700 border border-sky-300': status === 'pending',
  'bg-white text-green-700 border border-green-300': status === 'accepted',
  'bg-white text-red-700 border border-red-300': 'rejected',
  'bg-white text-slate-600 border border-slate-300': status === 'cancelled',
  'bg-[#9e0154] text-white ring-1 ring-[#d7037b]/50': status === 'completed',
});

const statusText = (status) => ({
  pending: 'Pendiente',
  accepted: 'Aceptada',
  rejected: 'Rechazada',
  cancelled: 'Cancelada',
  completed: 'Completada'
}[status] || 'Desconocido');

</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
@keyframes spin-slow{from{transform:rotate(0)}to{transform:rotate(360deg)}}
.animate-spin-slow{animation:spin-slow 8s linear infinite}
@keyframes fade-in-message{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
.animate-fade-in-message{animation:fade-in-message .28s ease-out both}
.custom-scrollbar-unique::-webkit-scrollbar{width:8px;height:8px}
.custom-scrollbar-unique::-webkit-scrollbar-track{background:rgba(226,232,240,.4)}
.custom-scrollbar-unique::-webkit-scrollbar-thumb{background:rgba(215,3,123,.4);border-radius:10px;border:1px solid rgba(215,3,123,.25)}
.custom-scrollbar-unique::-webkit-scrollbar-thumb:hover{background:rgba(215,3,123,.65)}
.badge-sq{
  display:inline-flex; align-items:center; gap:.35rem;
  padding:.28rem .5rem; font-size:.75rem; font-weight:700; line-height:1;
  border:1px solid #E2E8F0; color:#0f172a; background:#fff; border-radius:4px; box-shadow:0 1px 0 rgba(2,6,23,.05);
}
.dark .badge-sq{ border-color:#334155; color:#e2e8f0; background:#0b1220; box-shadow:0 1px 0 rgba(0,0,0,.3); }
</style>