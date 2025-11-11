<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans antialiased text-slate-900">
    <Header />

    <main class="py-8 sm:py-10">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <header class="mb-6 sm:mb-8" :class="{ 'hidden': isChatViewVisible, 'lg:block': isChatViewVisible }">
          <div class="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 class="text-[28px] sm:text-[34px] font-black tracking-tight">Intercambios · Mensajería</h1>
              <p class="mt-1 text-[15px] text-slate-600">Conversa, coordina y concreta con seguridad.</p>
            </div>
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="inline-flex overflow-hidden border border-slate-300">
                <button
                  @click="filter='all'"
                  :class="['px-2 sm:px-3 py-1.5 text-sm font-semibold', filter==='all' ? 'bg-white text-[#9e0154]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200']">
                  Todas
                </button>
                <button
                  @click="filter='unread'"
                  :class="['px-2 sm:px-3 py-1.5 text-sm font-semibold border-l border-slate-300', filter==='unread' ? 'bg-white text-[#9e0154]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200']">
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
                  <div v-if="activeMenuId === c.exchange.id" @click.away="activeMenuId = null" class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
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
              <div class="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between transition-colors sticky top-0 z-20">
                <div class="flex items-center gap-3 min-w-0">
                  <button @click="returnToConversationList" class="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full lg:hidden">
                    <ArrowLeftIcon class="h-5 w-5" />
                  </button>
                  <img @click="openProfilePanel(selectedConversation.user)" :src="getAvatarUrl(selectedConversation.user.avatar)" :alt="selectedConversation.user.full_name" class="h-10 w-10 rounded-full object-cover border border-white shadow cursor-pointer lg:cursor-default" />
                  <div @click="openProfilePanel(selectedConversation.user)" class="min-w-0 cursor-pointer lg:cursor-default">
                    <h3 class="font-semibold text-[15px] text-slate-900 truncate" :title="selectedConversation.user.full_name">{{ formatUserName(selectedConversation.user.full_name) }}</h3>
                    
                    <div class="h-4">
                      <p v-if="isOtherUserTyping" class="text-[12px] text-green-600 animate-pulse">
                        está escribiendo...
                      </p>
                      <p v-else-if="selectedConversation.user.ubicacion" class="text-[12px] text-slate-500">
                        {{ formatUbicacion(selectedConversation.user.ubicacion) }}
                      </p>
                    </div>

                  </div>
                </div>
                <div @click.stop class="flex-shrink-0 flex items-center gap-1.5">
                   <button @click="openDetailsModal" class="p-2 text-[#9e0154] bg-pink-50 hover:bg-pink-100 rounded-full" title="Detalles del Intercambio">
                    <EyeIcon class="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div v-if="canAcceptOrReject || canCancel || canComplete"
                   class="flex justify-center items-center p-2 text-center border-b animate-fade-in-down"
                   :class="{
                      'bg-blue-50 border-blue-200': selectedConversation.exchange.status === 'pending',
                      'bg-green-50 border-green-200': selectedConversation.exchange.status === 'accepted'
                   }">
                
                <div v-if="canAcceptOrReject" class="flex items-center justify-center gap-3">
                  <span class="hidden sm:inline text-sm font-semibold text-blue-800">¿Aceptas?</span>
                  <button @click="updateProposalStatus('accepted')" class="action-btn-accept">
                    <CheckIcon class="h-4 w-4" /> Aceptar
                  </button>
                  <button @click="updateProposalStatus('rejected')" class="action-btn-reject">
                    <XMarkIcon class="h-4 w-4" /> Rechazar
                  </button>
                </div>

                <div v-if="canCancel" class="flex items-center justify-center gap-3">
                  <span class="hidden sm:inline text-sm font-semibold text-slate-700">Esperando...</span>
                  <button @click="openCancelModal" class="action-btn-cancel">
                    <NoSymbolIcon class="h-4 w-4" /> Cancelar
                  </button>
                </div>

                <div v-if="canComplete" class="flex items-center justify-center gap-3">
                   <span class="text-sm font-medium text-green-800">
                     ¿Intercambio finalizado?
                   </span>
                  <button @click="openRatingModal" class="action-btn-complete">
                    <StarIcon class="h-4 w-4" /> Completar y Valorar
                  </button>
                </div>
              </div>

               <div class="relative flex-1 overflow-hidden bg-slate-100">
                <div v-if="loadingMessages" class="absolute inset-0 flex items-center justify-center bg-white/50 z-30">
                    <svg class="animate-spin h-8 w-8 text-[#d7037b]" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                </div>
                
                <div class="h-full overflow-y-auto custom-scrollbar-unique space-y-4 p-5" ref="messagesContainer">
                  <div v-if="messages.length === 0" class="flex h-full items-center justify-center text-center text-slate-500">
                    <div>
                      <p>Aún no hay mensajes en esta conversación.</p>
                      <p class="text-xs">¡Envía el primero!</p>
                    </div>
                  </div>
                  
                  <div v-else v-for="(message, index) in messages" :key="message.id || message.tempId">
                    <SystemMessage v-if="message.is_system_message" :text="message.text" />
                    <div v-else class="flex animate-fade-in-message" :style="{ animationDelay: `${index * 0.05}s` }" :class="message.sender_id === userStore.user?.id ? 'justify-end' : 'justify-start'">
                      <img v-if="message.sender_id !== userStore.user?.id" :src="getAvatarUrl(selectedConversation.user.avatar)" class="h-7 w-7 rounded-full border border-white shadow mr-2 mt-1.5 hidden sm:block" />
                      <div class="max-w-[78%] px-4 py-3 rounded-[10px] shadow-[0_1px_0_rgba(0,0,0,0.04)]" :class="message.sender_id === userStore.user?.id ? 'bg-[#d7037b] text-white rounded-br-sm' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'">
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
              </div>

              <div class="p-4 border-t border-slate-200 bg-slate-50">
                <form @submit.prevent="sendMessage" class="flex items-center gap-3">
                  <input 
                    type="text" 
                    v-model="newMessageText" 
                    @input="handleTypingInput"
                    placeholder="Escribe tu mensaje…" 
                    class="flex-1 min-w-0 p-3 border border-slate-300 focus:ring-2 focus:ring-[#d7037b] focus:border-transparent outline-none" 
                    :disabled="!isChatActive" 
                  />
                  
                  <button
                    type="button"
                    @click="isLocationModalVisible = true"
                    :disabled="!isChatActive"
                    class="flex-shrink-0 p-3 text-sm font-semibold text-white transition-transform"
                    :class="!isChatActive ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#9e0154] hover:bg-[#d7037b] hover:scale-105 active:scale-95'"
                    title="Sugerir lugar de encuentro"
                  >
                    <MapPinIcon class="h-5 w-5" />
                  </button>
                  
                  <button type="submit" :disabled="!newMessageText.trim() || !isChatActive" class="flex-shrink-0 px-4 py-3 text-sm font-semibold text-white transition-transform" :class="(!newMessageText.trim() || !isChatActive) ? 'bg-[#d7037b] opacity-50 cursor-not-allowed' : 'bg-[#d7037b] hover:scale-105 active:scale-95'" title="Enviar mensaje">
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
    
    <transition name="modal-fade">
      <div v-if="isBlockedUsersModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="closeBlockedUsersModal">
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-lg m-4 transform transition-all modal-container">
          <div class="relative text-center bg-gradient-to-br from-[#d7037b] to-[#9e0154] px-6 py-6 rounded-t-lg">
            <h3 class="text-xl font-bold text-white">Gestionar Usuarios Bloqueados</h3>
            <p class="text-sm text-white/80 mt-1">Aquí puedes ver y desbloquear a los usuarios.</p>
            <button @click="closeBlockedUsersModal" class="absolute top-3 right-3 p-1.5 text-white/60 hover:text-white hover:bg-white/20 rounded-full transition-colors">
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
          <div class="p-4 sm:p-6 max-h-[55vh] overflow-y-auto custom-scrollbar-unique">
            <div v-if="loadingBlockedUsers" class="flex items-center justify-center py-10">
              <svg class="animate-spin h-8 w-8 text-[#d7037b]" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            </div>
            <ul v-else-if="blockedUsers.length > 0" class="space-y-3">
              <li v-for="user in blockedUsers" :key="user.id" class="flex items-center justify-between gap-4 p-3 border border-slate-200 rounded-md">
                <div class="flex items-center gap-3 min-w-0">
                  <img :src="getAvatarUrl(user.avatar)" :alt="user.full_name" class="h-10 w-10 rounded-full object-cover border flex-shrink-0"/>
                  <div class="min-w-0">
                    <p class="font-semibold text-slate-800 leading-tight truncate">{{ formatUserName(user.full_name) }}</p>
                    <p class="text-xs text-slate-500 truncate">{{ user.email }}</p>
                  </div>
                </div>
                <button @click="confirmUnblock(user)" class="flex-shrink-0 px-3 py-1.5 text-xs font-bold text-white bg-[#9e0154] rounded-full shadow-sm hover:bg-[#d7037b] transition-transform hover:scale-105 active:scale-95">
                  Desbloquear
                </button>
              </li>
            </ul>
            <div v-else class="text-center text-slate-500 py-10 px-4">
              <div class="mx-auto flex items-center justify-center h-16 w-16 bg-slate-100 rounded-full border-2 border-slate-200">
                <ShieldCheckIcon class="h-8 w-8 text-slate-400" />
              </div>
              <p class="font-semibold text-slate-700 mt-4">No tienes a nadie bloqueado</p>
              <p class="text-sm mt-1">Tu lista de usuarios bloqueados está vacía.</p>
            </div>
          </div>
          <div class="px-6 py-4 bg-slate-50/70 border-t border-slate-200 text-right rounded-b-lg">
            <button @click="closeBlockedUsersModal" class="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-fade">
      <div v-if="isBlockModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="closeBlockModal">
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-md m-4 transform transition-all modal-container">
          <div class="p-6 text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <UserMinusIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <h3 class="mt-4 text-lg font-semibold text-slate-900">Bloquear Usuario</h3>
            <div class="mt-2 px-4 text-sm text-slate-500">
              <p v-if="conversationToActOn">¿Estás seguro de que quieres bloquear a <span class="font-bold">{{ formatUserName(conversationToActOn.user.full_name) }}</span>?</p>
              <p class="mt-2">No podrá enviarte mensajes ni ver tus productos, y tú tampoco podrás ver los suyos.</p>
            </div>
          </div>
          <div class="px-6 py-4 bg-slate-50 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 rounded-b-lg">
            <button @click="closeBlockModal" type="button" class="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50">
              Cancelar
            </button>
            <button @click="confirmBlock" type="button" class="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700">
              Confirmar Bloqueo
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-fade">
      <div v-if="isReportModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="closeReportModal">
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-md m-4 transform transition-all modal-container">
          <div class="p-6">
            <div class="flex items-start gap-4">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0">
                <ShieldExclamationIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div class="text-left">
                <h3 class="text-lg font-semibold text-slate-900">Reportar y Bloquear</h3>
                <div class="mt-2 text-sm text-slate-500">
                  <p v-if="conversationToActOn">Estás a punto de reportar a <span class="font-bold">{{ formatUserName(conversationToActOn.user.full_name) }}</span>. Por favor, danos una razón.</p>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <textarea v-model="reportReason" rows="3" class="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm" placeholder="Ej: Spam, comportamiento abusivo, intento de estafa..."></textarea>
            </div>
          </div>
          <div class="px-6 py-4 bg-slate-50 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 rounded-b-lg">
            <button @click="closeReportModal" type="button" class="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50">
              Cancelar
            </button>
            <button @click="confirmBlockAndReport" :disabled="!reportReason.trim()" type="button" class="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Reportar y Bloquear
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-fade">
      <div v-if="isDeleteModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="closeDeleteModal">
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-md m-4 transform transition-all modal-container">
          <div class="p-6 text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <TrashIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <h3 class="mt-4 text-lg font-semibold text-slate-900">Eliminar Conversación</h3>
            <div class="mt-2 px-4 text-sm text-slate-500">
              <p>¿Estás seguro de que quieres eliminar este chat? Esta acción es irreversible.</p>
            </div>
          </div>
          <div class="px-6 py-4 bg-slate-50 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 rounded-b-lg">
            <button @click="closeDeleteModal" type="button" class="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50">
              Cancelar
            </button>
            <button @click="confirmDelete" type="button" class="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700">
              Sí, Eliminar
            </button>
          </div>
        </div>
      </div>
    </transition>
    
    <transition name="modal-fade">
      <div v-if="isCancelModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="closeCancelModal">
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-md m-4 transform transition-all modal-container">
          <div class="p-6 text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <NoSymbolIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <h3 class="mt-4 text-lg font-semibold text-slate-900">Cancelar Propuesta</h3>
            <div class="mt-2 px-4 text-sm text-slate-500">
              <p>¿Estás seguro de que quieres cancelar esta propuesta de intercambio? Esta acción es irreversible.</p>
            </div>
          </div>
          <div class="px-6 py-4 bg-slate-50 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 rounded-b-lg">
            <button @click="closeCancelModal" type="button" class="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50">
              Volver
            </button>
            <button @click="confirmCancel" type="button" class="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700">
              Sí, Cancelar
            </button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="modal-fade">
      <div v-if="showDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="showDetailsModal = false">
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-2xl m-4 transform transition-all modal-container">
          <div class="relative text-center bg-gradient-to-br from-[#d7037b] to-[#9e0154] px-6 py-6 rounded-t-lg">
            <h3 class="text-xl font-bold text-white">Detalle del Intercambio</h3>
             <button @click="showDetailsModal = false" class="absolute top-3 right-3 p-1.5 text-white/60 hover:text-white hover:bg-white/20 rounded-full transition-colors">
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
          <div v-if="selectedConversation && myProduct && theirProduct" class="p-6 sm:p-8">
            <div class="grid grid-cols-2 gap-4 sm:gap-6 relative">
                <div class="flex flex-col items-center">
                    <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">TU OFERTA</span>
                    <div class="w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-sm p-3 transition-all hover:shadow-md">
                        <div class="aspect-square w-full rounded-md overflow-hidden bg-slate-100">
                            <img :src="getAvatarUrl(myProduct.thumbnail_image_url)" alt="" class="w-full h-full object-cover">
                        </div>
                        <div class="text-center mt-3 px-1">
                            <p class="text-sm font-semibold text-slate-800 truncate" :title="myProduct.title">{{ myProduct.title }}</p>
                            <div class="flex items-center justify-center gap-1.5 mt-2">
                                <img :src="getAvatarUrl(userStore.user?.profile_picture)" class="h-5 w-5 rounded-full object-cover border border-slate-200">
                                <span class="text-xs text-slate-600">Tú</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">SU PRODUCTO</span>
                    <div class="w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-sm p-3 transition-all hover:shadow-md">
                        <div classs="aspect-square w-full rounded-md overflow-hidden bg-slate-100">
                            <img :src="getAvatarUrl(theirProduct.thumbnail_image_url)" alt="" class="w-full h-full object-cover">
                        </div>
                        <div class="text-center mt-3 px-1">
                            <p class="text-sm font-semibold text-slate-800 truncate" :title="theirProduct.title">{{ theirProduct.title }}</p>
                            <div class="flex items-center justify-center gap-1.5 mt-2">
                                <img :src="getAvatarUrl(selectedConversation.user.avatar)" class="h-5 w-5 rounded-full object-cover border border-slate-200">
                                <span class="text-xs text-slate-600 truncate">{{ formatUserName(selectedConversation.user.full_name) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <div class="p-2.5 bg-white rounded-full shadow-xl border-2 border-[#d7037b]">
                        <ArrowPathIcon class="h-6 w-6 text-[#9e0154]" />
                    </div>
                </div>
            </div>
            <div class="mt-6 pt-5 border-t border-slate-200 text-center">
              <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado de la Propuesta</h4>
              <span class="mt-2 inline-flex items-center px-2.5 py-1 text-sm font-medium capitalize rounded-md" :class="statusBadgeClass(selectedConversation.exchange.status)">
                {{ statusText(selectedConversation.exchange.status) }}
              </span>
            </div>
          </div>
          <div class="px-6 py-4 bg-slate-50/70 border-t border-slate-200 text-center rounded-b-lg">
            <button @click="showDetailsModal = false" class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#d7037b] to-[#9e0154] hover:from-[#9e0154] hover:to-[#9e0154] rounded-md shadow-lg shadow-pink-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95">
              Entendido
            </button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="modal-fade">
      <div v-if="isLocationModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="isLocationModalVisible = false">
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-lg m-4 transform transition-all modal-container">
          <div class="relative text-center bg-gradient-to-br from-[#d7037b] to-[#9e0154] px-6 py-8 rounded-t-lg">
            <div class="mx-auto flex items-center justify-center h-16 w-16 bg-white/20 rounded-full">
              <MapPinIcon class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mt-4">Sugerir Lugar de Encuentro</h3>
            <p class="text-sm text-white/80 mt-1">Elige un lugar público y seguro para proponerlo en el chat.</p>
             <button @click="isLocationModalVisible = false" class="absolute top-3 right-3 p-1.5 text-white/60 hover:text-white hover:bg-white/20 rounded-full transition-colors">
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
          <div class="p-4 sm:p-6 max-h-[55vh] overflow-y-auto custom-scrollbar-unique">
            <ul v-if="suggestedPlaces.length > 0" class="space-y-3">
              <li 
                v-for="place in suggestedPlaces" 
                :key="place.id"
                class="flex items-center justify-between gap-4 p-4 border border-slate-200 rounded-md hover:border-[#d7037b] hover:bg-pink-50 transition-all duration-200 group"
              >
                <div class="flex items-start gap-4">
                  <div class="mt-1 flex-shrink-0 text-[#9e0154] opacity-50 group-hover:opacity-100 transition-opacity">
                    <MapPinIcon class="h-5 w-5" />
                  </div>
                  <div>
                    <p class="font-semibold text-slate-800 leading-tight">{{ place.nombre }}</p>
                    <p class="text-xs text-slate-500 mt-1">{{ place.direccion }}</p>
                  </div>
                </div>
                <button @click="sendSuggestedLocation(place)" class="flex-shrink-0 px-3 py-1.5 text-xs font-bold text-white bg-[#9e0154] rounded-full shadow-sm hover:bg-[#d7037b] transition-transform hover:scale-105 active:scale-95">
                  Sugerir
                </button>
              </li>
            </ul>
            <div v-else class="text-center text-slate-500 py-10 px-4">
              <div class="mx-auto flex items-center justify-center h-16 w-16 bg-slate-100 rounded-full border-2 border-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="font-semibold text-slate-700 mt-4">No se encontraron lugares</p>
              <p class="text-sm mt-1 max-w-xs mx-auto">Lo sentimos, parece que aún no hemos registrado puntos de encuentro seguros para tu distrito.</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <transition name="modal-fade">
      <div v-if="isRatingModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="closeRatingModal">
        <div class="bg-white rounded-lg shadow-2xl w-full max-w-md m-4 transform transition-all modal-container">
          <div class="relative text-center bg-gradient-to-br from-[#d7037b] to-[#9e0154] px-6 py-8 rounded-t-lg">
            <h3 class="text-xl font-bold text-white">Completar y Valorar</h3>
            <p v-if="selectedConversation" class="text-sm text-white/80 mt-1">Valora tu experiencia con {{ formatUserName(selectedConversation.user.full_name) }}.</p>
              <button @click="closeRatingModal" class="absolute top-3 right-3 p-1.5 text-white/60 hover:text-white hover:bg-white/20 rounded-full transition-colors">
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
          <form @submit.prevent="submitRating" class="p-6">
            <div class="flex flex-col items-center">
              <p class="text-sm font-medium text-slate-700 mb-3">¿Cómo calificarías el intercambio?</p>
              <div class="flex items-center space-x-1">
                <button 
                  v-for="star in 5" 
                  :key="star" 
                  type="button"
                  @click="ratingScore = star"
                  class="p-1 text-yellow-400 hover:text-yellow-500 transition-colors"
                >
                  <StarIconSolid v-if="star <= ratingScore" class="h-8 w-8" />
                  <StarIcon v-else class="h-8 w-8 text-slate-300" />
                </button>
              </div>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-200 flex justify-end gap-3">
              <button 
                type="button" 
                @click="closeRatingModal" 
                class="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                :disabled="ratingScore === 0"
                class="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#d7037b] to-[#9e0154] hover:from-[#9e0154] hover:to-[#9e0154] rounded-md shadow-lg shadow-pink-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
                :class="{ 'opacity-50 cursor-not-allowed': ratingScore === 0 }"
              >
                Enviar y Completar
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from '@/axios';
import Header from './Header.vue';
import Footer from './Footer.vue';
import SystemMessage from '@/assets/components/SystemMessage.vue';
import { useToast } from 'vue-toastification';
import {
  ChatBubbleLeftRightIcon, ChatBubbleOvalLeftIcon, ArrowRightIcon, CheckIcon, XMarkIcon,
  EyeIcon, PaperAirplaneIcon, CheckCircleIcon, NoSymbolIcon, EllipsisVerticalIcon, TrashIcon,
  UserMinusIcon, ShieldExclamationIcon, ShieldCheckIcon, StarIcon, ClockIcon, ExclamationCircleIcon,
  MapPinIcon, ArrowLeftIcon, 
  ArrowPathIcon, ArrowsRightLeftIcon
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
const API_BASE_URL = import.meta.env.VITE_APP_PUBLIC_URL || 'http://localhost:8000';
const isLocationModalVisible = ref(false);
let ws = null;

const isOtherUserTyping = ref(false);
let typingTimer = null;
const typingSignalSent = ref(false);

const iAmProposer = computed(() => {
  if (!selectedConversation.value || !userStore.user) return false;
  return selectedConversation.value.exchange.proposer_user_id === userStore.user.id;
});

const myProduct = computed(() => {
  if (!selectedConversation.value) return null;
  return iAmProposer.value ? selectedConversation.value.exchange.offer : selectedConversation.value.exchange.request;
});

const theirProduct = computed(() => {
  if (!selectedConversation.value) return null;
  return iAmProposer.value ? selectedConversation.value.exchange.request : selectedConversation.value.exchange.offer;
});

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
    await axios.post('/ratings', ratingData);
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
    await axios.delete(`/proposals/${idToDelete}`);
    conversations.value = conversations.value.filter(c => c.exchange.id !== idToDelete);
    if (selectedConversation.value?.exchange.id === idToDelete) {
      selectedConversation.value = null;
      isChatViewVisible.value = false;
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
    await axios.post(`/users/${userToBlock.id}/block`);
    toast.warning(`Has bloqueado a ${formatUserName(userToBlock.full_name)}.`);
    conversations.value = conversations.value.filter(c => c.user.id !== userToBlock.id);
    if (selectedConversation.value?.user.id === userToBlock.id) {
      selectedConversation.value = null;
      isChatViewVisible.value = false;
    }
  } catch (error) {
    toast.error(error.response?.data?.detail || "No se pudo bloquear al usuario.");
  } finally {
    closeBlockModal();
  }
};

const confirmBlockAndReport = async () => {
  if (!conversationToActOn.value || !reportReason.value.trim()) {
    toast.error("Por favor, indica un motivo para el reporte.");
    return;
  }
  const userToReport = conversationToActOn.value.user;
  try {
    await axios.post(`/users/${userToReport.id}/report`, {
      reason: reportReason.value.trim()
    });
    toast.error(`Has reportado y bloqueado a ${formatUserName(userToReport.full_name)}.`);
    conversations.value = conversations.value.filter(c => c.user.id !== userToReport.id);
    if (selectedConversation.value?.user.id === userToReport.id) {
      selectedConversation.value = null;
      isChatViewVisible.value = false;
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
    const { data } = await axios.get('/users/me/blocked');
    blockedUsers.value = data;
  } catch (error) {
    toast.error("No se pudo cargar la lista de bloqueados.");
  } finally {
    loadingBlockedUsers.value = false;
  }
};

const confirmUnblock = async (userToUnblock) => {
  try {
    await axios.delete(`/users/${userToUnblock.id}/block`);
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
    const { data } = await axios.get(`/users/${userId}/products`);
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
  return `${API_BASE_URL}${path}`;
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

const sendTypingEvent = (type) => {
  if (ws && ws.readyState === WebSocket.OPEN && selectedConversation.value) {
    ws.send(JSON.stringify({
      type: type,
      proposal_id: selectedConversation.value.exchange.id,
    }));
  }
};

const handleTypingInput = () => {
  if (!typingSignalSent.value) {
    sendTypingEvent('typing_start');
    typingSignalSent.value = true;
  }
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    sendTypingEvent('typing_stop');
    typingSignalSent.value = false;
  }, 2000);
};

const connectWebSocket = () => {
  if (!userStore.user?.id || !userStore.token) return;
  if (ws && ws.readyState === WebSocket.OPEN) return;

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = import.meta.env.VITE_WS_HOST || window.location.host;
  const wsUrl = `${protocol}//${host}/ws/${userStore.user.id}`;
  
  ws = new WebSocket(wsUrl);

  ws.onopen = () => console.log("WebSocket conectado exitosamente.");

  ws.onclose = () => {
    console.log("WebSocket desconectado.");
    ws = null;
  };

  ws.onerror = (error) => console.error("Error de WebSocket:", error);

  ws.onmessage = (event) => {
    const response = JSON.parse(event.data);
    
    if (response.type === 'new_message') {
      const newMessage = response.data;
      
      const conversationInList = conversations.value.find(c => c.exchange.id === newMessage.proposal_id);
      if (conversationInList) {
        conversationInList.last_message = {
          text: newMessage.text,
          timestamp: newMessage.timestamp,
          sender_id: newMessage.sender_id,
        };
        if (!selectedConversation.value || selectedConversation.value.exchange.id !== newMessage.proposal_id) {
           conversationInList.unread_count = (conversationInList.unread_count || 0) + 1;
        }
      }
      
      if (selectedConversation.value?.exchange.id === newMessage.proposal_id) {
        isOtherUserTyping.value = false;
        const existingMsgIndex = messages.value.findIndex(m => m.tempId && m.sender_id === newMessage.sender_id && m.text === newMessage.text);

        if (existingMsgIndex !== -1) {
            messages.value[existingMsgIndex] = { ...newMessage, sending: false, error: false };
        } else if (!messages.value.some(m => m.id === newMessage.id)) {
            messages.value.push(newMessage);
        }

        markMessagesAsRead([newMessage]);
      }
    } else if (response.type === 'user_typing') {
        if (selectedConversation.value?.exchange.id === response.data.proposal_id) {
            isOtherUserTyping.value = true;
        }
    } else if (response.type === 'user_stopped_typing') {
        if (selectedConversation.value?.exchange.id === response.data.proposal_id) {
            isOtherUserTyping.value = false;
        }
    }
  };
};

const sendMessage = async () => {
  if (!newMessageText.value.trim() || !isChatActive.value) return;

  const textToSend = newMessageText.value.trim();
  const urlRegex = /(https?:\/\/|www\.|[a-zA-Z0-9-]+\.(com|org|net|es|pe|io|dev|xyz|info))\b/i;
  
  if (urlRegex.test(textToSend)) {
    toast.error("No está permitido enviar enlaces o URLs en los mensajes.");
    return;
  }

  if (!ws || ws.readyState !== WebSocket.OPEN) {
    toast.error('No se pudo conectar al chat. Intenta recargar la página.');
    return;
  }
  
  clearTimeout(typingTimer);
  if (typingSignalSent.value) {
    sendTypingEvent('typing_stop');
    typingSignalSent.value = false;
  }

  const tempId = `temp_${Date.now()}`; 

  messages.value.push({
    id: null,
    tempId: tempId,
    text: textToSend,
    sender_id: userStore.user.id,
    timestamp: new Date().toISOString(),
    is_read: false,
    sending: true,
    error: false,
  });
  
  const messagePayload = {
    type: 'new_message',
    proposal_id: selectedConversation.value.exchange.id,
    text: textToSend,
  };

  ws.send(JSON.stringify(messagePayload));

  newMessageText.value = '';

  const convInList = conversations.value.find(c => c.exchange.id === selectedConversation.value.exchange.id);
  if (convInList) {
    convInList.last_message = {
      text: textToSend,
      timestamp: new Date().toISOString(),
      sender_id: userStore.user.id
    };
  }
};

const fetchConversations = async () => {
  loadingConversations.value = true;
  try {
    const { data } = await axios.get('/proposals/me');
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

  isOtherUserTyping.value = false;

  if (selectedProfileUser.value) closeProfilePanel();
  if (selectedConversation.value?.exchange.id === conversation.exchange.id) return;
  
  selectedConversation.value = conversation;
  messages.value = [];
  loadingMessages.value = true;
  try {
    const { data } = await axios.get(`/proposals/${conversation.exchange.id}/messages`);
    messages.value = data;

    const convInList = conversations.value.find(c => c.exchange.id === conversation.exchange.id);
    if (convInList) convInList.unread_count = 0;
    
    markMessagesAsRead(messages.value);

  } catch (e) {
    toast.error("No se pudieron cargar los mensajes.");
  } finally {
    loadingMessages.value = false;
  }
};

const markMessagesAsRead = async (messagesToRead) => {
    const unreadMessages = messagesToRead.filter(m => !m.is_read && m.sender_id !== userStore.user.id);
    if (unreadMessages.length === 0) return;
    
    unreadMessages.forEach(m => {
        const msgInState = messages.value.find(stateMsg => stateMsg.id === m.id);
        if(msgInState) msgInState.is_read = true;
    });

    const messageIds = unreadMessages.map(m => m.id).filter(id => id !== null);
    if (messageIds.length === 0) return;

    try {
        await axios.patch('/messages/read_status', { message_ids: messageIds, is_read: true });
    } catch (error) {
        console.error("Error al marcar mensajes como leídos:", error);
    }
};

const addSystemMessage = (text) => {
  messages.value.push({
    id: `sys_${Date.now()}`,
    text: text,
    is_system_message: true,
  });
};

const updateProposalStatus = async (status) => {
  if (!selectedConversation.value) return;
  const statusTextMap = { accepted: 'aceptada', rejected: 'rechazada', cancelled: 'cancelada', completed: 'completada' };
  
  if (status === 'completed' && !isRatingModalVisible.value) {
    openRatingModal();
    return;
  }

  try {
    await axios.put(`/proposals/${selectedConversation.value.exchange.id}/status`, { status });
    selectedConversation.value.exchange.status = status;
    
    if (status === 'accepted') addSystemMessage('La propuesta ha sido aceptada.');
    if (status === 'rejected') addSystemMessage('La propuesta fue rechazada.');
    if (status === 'cancelled') addSystemMessage('La propuesta ha sido cancelada.');
    if (status === 'completed') addSystemMessage('El intercambio ha sido completado.');
    
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
  clearTimeout(typingTimer);
  if (ws) {
    ws.close();
  }
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
  'bg-white text-green-700 border border-green-300': status ==='accepted',
  'bg-white text-red-700 border border-red-300': status === 'rejected',
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

@keyframes fade-in-down {from {opacity: 0; transform: translateY(-10px);} to {opacity: 1; transform: translateY(0);}}
.animate-fade-in-down { animation: fade-in-down 0.3s ease-out forwards; }


.custom-scrollbar-unique::-webkit-scrollbar{width:8px;height:8px}
.custom-scrollbar-unique::-webkit-scrollbar-track{background:rgba(226,232,240,.4)}
.custom-scrollbar-unique::-webkit-scrollbar-thumb{background:rgba(215,3,123,.4);border-radius:10px;border:1px solid rgba(215,3,1J.vue3,.25)}
.custom-scrollbar-unique::-webkit-scrollbar-thumb:hover{background:rgba(215,3,123,.65)}
.badge-sq{
  display:inline-flex; align-items:center; gap:.35rem;
  padding:.28rem .5rem; font-size:.75rem; font-weight:700; line-height:1;
  border:1px solid #E2E8F0; color:#0f172a; background:#fff; border-radius:4px; box-shadow:0 1px 0 rgba(2,6,23,.05);
}

.action-btn-accept {
  @apply inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-green-600 rounded-full shadow-sm transition-transform hover:scale-105;
}
.action-btn-reject {
  @apply inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-red-800 bg-red-200 rounded-full shadow-sm transition-transform hover:scale-105;
}
.action-btn-cancel {
  @apply inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-slate-800 bg-slate-200 rounded-full shadow-sm transition-transform hover:scale-105;
}
.action-btn-complete {
  @apply inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded-full shadow-sm transition-transform hover:scale-105;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
.modal-fade-enter-to .modal-container,
.modal-fade-leave-from .modal-container {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>