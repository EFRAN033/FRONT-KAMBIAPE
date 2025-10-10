<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans antialiased text-slate-900">
    <Header />

    <main class="py-8 sm:py-10">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <!-- ===== Encabezado & Barra de control (separador suavizado) ===== -->
        <header class="mb-6 sm:mb-8">
          <div class="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 class="text-[28px] sm:text-[34px] font-black tracking-tight">Intercambios · Mensajería</h1>
              <p class="mt-1 text-[15px] text-slate-600">Conversa, coordina y concreta con seguridad.</p>
            </div>

            <!-- Controles: filtro + búsqueda -->
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

          <!-- Separador más delgado y con menor intensidad -->
          <div class="mt-4 h-[2px] w-full bg-gradient-to-r from-[#d7037b]/50 via-[#d7037b]/20 to-transparent"></div>
        </header>

        <!-- ===== Estado de carga ===== -->
        <div v-if="loading" class="flex items-center justify-center h-[75vh] max-h-[850px] bg-white border border-slate-200">
          <svg class="animate-spin h-10 w-10 text-[#d7037b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.29A7.96 7.96 0 0 1 4 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"/>
          </svg>
          <p class="ml-3 text-sm font-medium text-[#9e0154]">Cargando tus conversaciones…</p>
        </div>

        <!-- ===== Workspace (lista + chat) ===== -->
        <div v-else class="flex flex-col lg:flex-row h-[75vh] max-h-[850px] border border-slate-200">

          <!-- ===== Lista de conversaciones ===== -->
          <aside class="w-full lg:w-[34%] flex-shrink-0 border-r border-slate-200 overflow-y-auto custom-scrollbar-unique">
            <div class="sticky top-0 bg-white/90 backdrop-blur px-4 py-3 border-b border-slate-100 z-10 flex items-center justify-between">
              <h2 class="text-[13px] tracking-wide font-semibold text-slate-700">Conversaciones</h2>
              <span v-if="totalUnreadMessages>0" class="text-[11px] px-2 py-0.5 bg-red-50 text-red-700 border border-red-200">
                {{ totalUnreadMessages }} sin leer
              </span>
            </div>

            <ul v-if="filteredConversations.length" class="divide-y divide-slate-100">
              <li
                v-for="c in filteredConversations"
                :key="c.exchange.id"
                @click="selectConversation(c)"
                class="relative px-4 py-3 cursor-pointer transition-colors group hover:bg-slate-50"
                :class="selectedConversation && selectedConversation.exchange.id===c.exchange.id ? 'bg-slate-50' : ''"
              >
                <!-- tira de estado (izquierda) -->
                <span
                  class="absolute inset-y-0 left-0 w-1"
                  :class="{
                    'bg-yellow-400': c.exchange.status==='pending',
                    'bg-green-500' : c.exchange.status==='accepted',
                    'bg-red-500'   : c.exchange.status==='rejected',
                    'bg-slate-300' : c.exchange.status==='completed'
                  }"
                ></span>

                <div class="ml-2 flex items-start gap-3">
                  <div class="relative shrink-0">
                    <img :src="c.user.avatar" :alt="c.user.full_name" class="h-11 w-11 object-cover rounded-full border border-slate-200"/>
                    <span v-if="c.unread_count>0" class="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 inline-flex items-center justify-center text-[11px] font-semibold text-white bg-red-500 rounded-full">
                      {{ c.unread_count }}
                    </span>
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="flex items-baseline justify-between gap-2">
                      <p class="text-[15px] font-semibold text-slate-900 truncate">{{ c.user.full_name }}</p>
                      <span class="text-[11px] text-slate-500 whitespace-nowrap">{{ formatTime(c.last_message?.timestamp || c.exchange.created_at) }}</span>
                    </div>

                    <p class="text-[13px] text-slate-600 mt-0.5 truncate">
                      {{ c.last_message?.sender_id === userStore.user.id ? 'Tú: ' : '' }}{{ c.last_message?.text || '—' }}
                    </p>

                    <div class="mt-1">
                      <span
                        class="inline-flex items-center px-2 py-0.5 text-[11px] font-medium capitalize ring-1"
                        :class="{
                          'bg-yellow-50 text-yellow-800 ring-yellow-200': c.exchange.status==='pending',
                          'bg-green-50 text-green-800 ring-green-200' : c.exchange.status==='accepted',
                          'bg-red-50 text-red-800 ring-red-200'      : c.exchange.status==='rejected',
                          'bg-slate-50 text-slate-800 ring-slate-200': c.exchange.status==='completed',
                        }"
                      >
                        {{ c.exchange.status==='pending' ? 'pendiente' : c.exchange.status }}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <div v-else class="p-10 text-center text-slate-500">
              <ChatBubbleOvalLeftIcon class="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p class="text-sm">No hay conversaciones {{ filter==='unread' ? 'no leídas' : 'activas' }}.</p>
            </div>
          </aside>

          <!-- ===== Panel de chat ===== -->
          <section class="w-full lg:w-[66%] flex flex-col">
            <template v-if="selectedConversation">
              <!-- Header del chat -->
              <div class="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img :src="selectedConversation.user.avatar" :alt="selectedConversation.user.full_name"
                       class="h-10 w-10 rounded-full object-cover border border-white shadow" />
                  <div>
                    <h3 class="font-semibold text-[15px] text-slate-900">{{ selectedConversation.user.full_name }}</h3>
                    <p class="text-[12px] text-slate-600 flex items-center gap-1 flex-wrap">
                      <span class="font-medium text-slate-800">{{ selectedConversation.exchange.offer.title }}</span>
                      <ArrowRightIcon class="h-3.5 w-3.5 text-slate-400" />
                      <span class="font-medium text-slate-800">{{ selectedConversation.exchange.request.title }}</span>
                    </p>
                  </div>
                </div>

                <div class="flex gap-1.5">
                  <button
                    v-if="selectedConversation.exchange.status === 'pending' && selectedConversation.exchange.request.user_id === userStore.user.id"
                    @click="updateProposalStatus('accepted')"
                    class="p-2 text-green-700 bg-green-50 hover:bg-green-100"
                    title="Aceptar">
                    <CheckIcon class="h-5 w-5" />
                  </button>
                  <button
                    v-if="selectedConversation.exchange.status === 'pending' && selectedConversation.exchange.request.user_id === userStore.user.id"
                    @click="updateProposalStatus('rejected')"
                    class="p-2 text-red-700 bg-red-50 hover:bg-red-100"
                    title="Rechazar">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                  <button
                    @click="showDetailsModal = true"
                    class="p-2 text-[#9e0154] bg-pink-50 hover:bg-pink-100"
                    title="Detalles">
                    <EyeIcon class="h-5 w-5" />
                  </button>
                </div>
              </div>

              <!-- Rail + mensajes -->
              <div class="relative flex-1 bg-white">
                <!-- rail vertical -->
                <div class="pointer-events-none absolute left-8 top-0 bottom-0 w-px bg-slate-200/80"></div>

                <div class="relative z-10 p-5 pl-10 overflow-y-auto custom-scrollbar-unique space-y-4" ref="messagesContainer">
                  <div
                    v-for="(message, index) in selectedConversation.messages"
                    :key="message.id"
                    :class="[
                      'flex',
                      message.sender_id === userStore.user.id ? 'justify-end' : 'justify-start'
                    ]"
                  >
                    <!-- Avatar del otro lado -->
                    <img
                      v-if="message.sender_id !== userStore.user.id"
                      :src="selectedConversation.user.avatar"
                      :alt="selectedConversation.user.full_name"
                      class="h-7 w-7 rounded-full border border-white shadow mr-2 mt-1.5 hidden sm:block" />

                    <div
                      :class="[
                        'max-w-[78%] px-4 py-3 rounded-[10px] shadow-[0_1px_0_rgba(0,0,0,0.04)]',
                        message.sender_id === userStore.user.id
                          ? 'bg-[#d7037b] text-white rounded-br-sm'
                          : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-bl-sm'
                      ]"
                      :style="{ animationDelay: `${index * 0.05}s` }"
                      class="animate-fade-in-message"
                    >
                      <p class="text-[15px] leading-relaxed break-words">
                        {{ message.text }}
                      </p>

                      <!-- Meta -->
                      <div
                        :class="[
                          'mt-1.5 flex items-center gap-1 text-[11px]',
                          message.sender_id === userStore.user.id ? 'justify-end text-white/80' : 'justify-start text-slate-500'
                        ]"
                      >
                        <span>{{ formatTime(message.timestamp) }}</span>
                        <span v-if="message.sender_id === userStore.user.id">
                          <CheckCircleIcon v-if="message.is_read" class="h-3.5 w-3.5 inline-block" />
                          <ClockIcon v-else class="h-3.5 w-3.5 inline-block" />
                        </span>
                      </div>

                      <!-- colitas -->
                      <div v-if="message.sender_id === userStore.user.id" class="message-tail-right"></div>
                      <div v-else class="message-tail-left"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Composer -->
              <div class="p-4 border-t border-slate-200 bg-slate-50">
                <form @submit.prevent="sendMessage" class="flex items-center gap-3">
                  <input
                    type="text"
                    v-model="newMessageText"
                    placeholder="Escribe tu mensaje…"
                    class="flex-1 p-3 border border-slate-300 focus:ring-2 focus:ring-[#d7037b] focus:border-transparent outline-none"
                    :disabled="sendingMessage || !isChatActive"
                  />
                  <button
                    type="submit"
                    :disabled="!newMessageText.trim() || sendingMessage || !isChatActive"
                    :class="[
                      'px-4 py-3 text-sm font-semibold text-white transition-transform',
                      (!newMessageText.trim() || sendingMessage || !isChatActive)
                        ? 'bg-[#d7037b] opacity-50 cursor-not-allowed'
                        : 'bg-[#d7037b] hover:scale-105 active:scale-95'
                    ]"
                    title="Enviar mensaje"
                  >
                    <PaperAirplaneIcon v-if="!sendingMessage" class="h-5 w-5" />
                    <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.29A7.96 7.96 0 0 1 4 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"/>
                    </svg>
                  </button>
                </form>
                <p v-if="!isChatActive" class="text-[12px] text-red-500 mt-2 text-center">
                  No puedes enviar mensajes a propuestas que no estén pendientes.
                </p>
              </div>
            </template>

            <!-- Estado sin selección -->
            <template v-else>
              <div class="flex-1 flex items-center justify-center p-8 text-center text-slate-500">
                <div class="flex flex-col items-center gap-3">
                  <ChatBubbleLeftRightIcon class="h-20 w-20 text-slate-300" />
                  <p class="text-[17px] font-semibold text-slate-700">Selecciona una conversación</p>
                  <p class="text-sm max-w-sm">Elige un chat a la izquierda para coordinar un intercambio o crea uno nuevo enviando una propuesta.</p>
                </div>
              </div>
            </template>
          </section>
        </div>
      </div>
    </main>

    <!-- ===== Modal Detalles ===== -->
    <TransitionRoot as="template" :show="showDetailsModal">
      <Dialog as="div" class="relative z-50" @close="showDetailsModal = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                         leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-slate-900/70 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template"
                             enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                             enter-to="opacity-100 translate-y-0 sm:scale-100"
                             leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100"
                             leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-slate-100">
                <div class="bg-white px-6 pt-6 pb-5 sm:p-8 sm:pb-6">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-pink-50 sm:mx-0">
                      <ArrowsRightLeftIcon class="h-6 w-6 text-[#d7037b] animate-spin-slow" />
                    </div>
                    <div class="mt-3 sm:mt-0 sm:ml-4 w-full">
                      <DialogTitle as="h3" class="text-lg font-bold text-slate-900">
                        Detalles del Intercambio
                      </DialogTitle>

                      <div class="mt-5" v-if="selectedConversation">
                        <div class="space-y-6">
                          <div class="flex items-center gap-4 bg-slate-50 p-4 border border-slate-100">
                            <img :src="selectedConversation.user.avatar" :alt="selectedConversation.user.full_name"
                                 class="h-14 w-14 rounded-full object-cover border border-white shadow" />
                            <div>
                              <p class="font-semibold text-slate-900">{{ selectedConversation.user.full_name }}</p>
                              <p class="text-sm text-slate-600">Miembro desde {{ formatDate(selectedConversation.user.join_date) }}</p>
                            </div>
                          </div>

                          <div class="bg-blue-50 p-5 border border-blue-100">
                            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                              <div class="text-center sm:text-left">
                                <p class="text-sm font-medium text-blue-700">Ofrece</p>
                                <p class="text-lg font-bold text-slate-900 mt-1">{{ selectedConversation.exchange.offer.title }}</p>
                              </div>
                              <ArrowRightIcon class="h-8 w-8 text-blue-400" />
                              <div class="text-center sm:text-left">
                                <p class="text-sm font-medium text-blue-700">Solicita</p>
                                <p class="text-lg font-bold text-slate-900 mt-1">{{ selectedConversation.exchange.request.title }}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 class="text-sm font-semibold text-slate-900 mb-2">Mensaje original</h4>
                            <p class="text-sm text-slate-700 bg-slate-50 p-4 border border-slate-100 leading-relaxed">
                              {{ selectedConversation.exchange.message }}
                            </p>
                          </div>

                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="flex items-center gap-2">
                              <span class="text-sm font-medium text-slate-900">Estado:</span>
                              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ring-1"
                                    :class="{
                                      'bg-yellow-50 text-yellow-800 ring-yellow-200': selectedConversation.exchange.status==='pending',
                                      'bg-green-50 text-green-800 ring-green-200' : selectedConversation.exchange.status==='accepted',
                                      'bg-red-50 text-red-800 ring-red-200'      : selectedConversation.exchange.status==='rejected',
                                      'bg-slate-50 text-slate-800 ring-slate-200': selectedConversation.exchange.status==='completed'
                                    }">
                                {{ selectedConversation.exchange.status==='pending' ? 'pendiente' : selectedConversation.exchange.status }}
                              </span>
                            </div>
                            <div class="flex items-center gap-2">
                              <span class="text-sm font-medium text-slate-900">Fecha de la Propuesta:</span>
                              <span class="text-sm text-slate-600">{{ formatDate(selectedConversation.exchange.created_at) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div class="bg-slate-50 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8 gap-3 border-t border-slate-100">
                  <button
                    v-if="selectedConversation?.exchange.status === 'pending' && selectedConversation.exchange.request.user_id === userStore.user.id"
                    type="button"
                    class="inline-flex w-full justify-center rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
                    @click="updateProposalStatus('accepted')">
                    Aceptar
                  </button>
                  <button
                    v-if="selectedConversation?.exchange.status === 'pending' && selectedConversation.exchange.request.user_id === userStore.user.id"
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#d7037b] focus:ring-offset-2 sm:mt-0 sm:w-auto"
                    @click="updateProposalStatus('rejected')">
                    Rechazar
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#d7037b] focus:ring-offset-2 sm:mt-0 sm:w-auto"
                    @click="showDetailsModal = false">
                    Cerrar
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <!-- ===== STRIP REDES KAMBIX ===== -->
    <section class="relative w-full overflow-hidden" aria-label="Redes sociales Kambix">
      <div class="absolute inset-0 bg-gradient-to-r from-[#d7037b] to-[#9e0154]">
        <div class="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4)_1px,transparent_1.5px)] bg-[length:18px_18px]"></div>
        <div class="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.4)_1px,transparent_1.5px)] bg-[length:18px_18px]"></div>
      </div>

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-5">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-center sm:text-left font-extrabold tracking-wide text-white drop-shadow-[0_2px_0_rgba(158,1,84,0.6)] text-[clamp(14px,2vw,20px)]">
            ¡<span class="uppercase">Kambix</span>! Síguenos y entérate de todas las novedades que tenemos para ti
          </p>

          <nav class="flex items-center justify-center gap-2 sm:gap-3" aria-label="Redes sociales">
            <a href="https://www.instagram.com/kambia_pe?igsh=MWg2aWR3YnhnNW1qdw==" target="_blank" rel="noopener noreferrer" class="group inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all duration-200 hover:scale-[1.04] hover:bg-white" aria-label="Instagram de Kambix (@kambix_oficial)">
              <svg class="h-5 w-5 text-[#9e0154]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5a5.5 5.5 0 1 0 5.5 5.5A5.5 5.5 0 0 0 12 7.5ZM18 6.8a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 18 6.8Z"/></svg>
            </a>
            <a href="https://tiktok.com/@kambiape" target="_blank" rel="noopener noreferrer" class="group inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all duration-200 hover:scale-[1.04] hover:bg-white" aria-label="TikTok de Kambix">
              <svg class="h-5 w-5 text-[#9e0154]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3h3.1A6.9 6.9 0 0 0 23 9.9V13A10 10 0 0 1 13 6.1V16a6 6 0 1 1-6-6c.34 0 .68.03 1.02.1V13a3 3 0 1 0 3 3V3Z"/></svg>
            </a>
            <a href="https://www.facebook.com/share/1A62pnpV8K/ " target="_blank" rel="noopener noreferrer" class="group inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all duration-200 hover:scale-[1.04] hover:bg-white" aria-label="Facebook de Kambix">
              <svg class="h-5 w-5 text-[#9e0154]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951Z"/></svg>
            </a>
          </nav>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
/* === Lógica original + búsqueda local === */
import { ref, computed, nextTick, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import axios from '@/axios'
import Header from './Header.vue'
import Footer from './Footer.vue'
import { useToast } from 'vue-toastification';
import {
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  PaperAirplaneIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const userStore = useUserStore()
const showDetailsModal = ref(false)
const filter = ref('all')
const search = ref('') // búsqueda local
const selectedConversation = ref(null)
const newMessageText = ref('')
const toast = useToast()
const loading = ref(true)
const sendingMessage = ref(false)
const messagesContainer = ref(null)
const conversations = ref([])

const filteredConversations = computed(() => {
  let list = conversations.value
  if (filter.value === 'unread') list = list.filter(conv => conv.unread_count > 0)

  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter(c => {
      const n = c.user.full_name?.toLowerCase() || ''
      const t = c.last_message?.text?.toLowerCase() || ''
      return n.includes(q) || t.includes(q)
    })
  }

  list.sort((a, b) => {
    const da = a.last_message ? new Date(a.last_message.timestamp) : new Date(a.exchange.created_at)
    const db = b.last_message ? new Date(b.last_message.timestamp) : new Date(b.exchange.created_at)
    return db - da
  })
  return list
})

const totalUnreadMessages = computed(() => conversations.value.reduce((s, c) => s + c.unread_count, 0))
const isChatActive = computed(() => selectedConversation.value && selectedConversation.value.exchange.status === 'pending')

const formatDate = (s) => {
  if (!s) return ''
  const opts = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(s).toLocaleDateString('es-ES', opts)
}
const formatTime = (s) => {
  if (!s) return ''
  const d = new Date(s)
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

const fetchConversations = async () => {
  loading.value = true
  try {
    const { data } = await axios.get('/proposals/me')
    conversations.value = data
    if (selectedConversation.value) {
      const re = conversations.value.find(c => c.exchange.id === selectedConversation.value.exchange.id)
      selectedConversation.value = re || null
      if (re) await nextTick(() => { if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight })
    }
  } catch (e) {
    console.error('Error al cargar conversaciones:', e)
  } finally {
    loading.value = false
  }
}

const selectConversation = async (conversation) => {
  selectedConversation.value = conversation
  const unreadIds = conversation.messages
    .filter(m => m.sender_id !== userStore.user.id && !m.is_read)
    .map(m => m.id)

  if (unreadIds.length) {
    try {
      await axios.patch('/messages/read_status', { message_ids: unreadIds, is_read: true })
      conversation.messages.forEach(m => { if (unreadIds.includes(m.id)) m.is_read = true })
      conversation.unread_count = 0
    } catch (e) {
      console.error('Error al marcar mensajes como leídos:', e)
    }
  }

  await nextTick(() => {
    if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  })
}

const sendMessage = async () => {
  if (!newMessageText.value.trim() || !selectedConversation.value || sendingMessage.value || !isChatActive.value) return
  sendingMessage.value = true
  try {
    const { data } = await axios.post('/messages', {
      proposal_id: selectedConversation.value.exchange.id,
      text: newMessageText.value.trim()
    })
    selectedConversation.value.messages.push(data)
    selectedConversation.value.last_message = data
    newMessageText.value = ''
    conversations.value.sort((a, b) => {
      const ta = a.last_message ? new Date(a.last_message.timestamp) : new Date(a.exchange.created_at)
      const tb = b.last_message ? new Date(b.last_message.timestamp) : new Date(b.exchange.created_at)
      return tb - ta
    })
    await nextTick(() => {
      if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    })
  } catch (e) {
    console.error('Error al enviar mensaje:', e)
  } finally {
    sendingMessage.value = false
  }
}

const updateProposalStatus = async (status) => {
  if (!selectedConversation.value) return
  try {
    await axios.put(`/proposals/${selectedConversation.value.exchange.id}/status`, { status })
    selectedConversation.value.exchange.status = status
    const systemMessage = {
      id: selectedConversation.value.messages.length + 1,
      text: status === 'accepted'
        ? '¡Has aceptado este intercambio! Ahora pueden coordinar los detalles finales.'
        : 'Has rechazado este intercambio. La conversación se ha cerrado.',
      sender_id: 0, timestamp: new Date().toISOString(), is_read: true
    }
    selectedConversation.value.messages.push(systemMessage)
    selectedConversation.value.last_message = systemMessage
    alert(`Propuesta ${selectedConversation.value.exchange.id} ${status === 'accepted' ? 'aceptada' : 'rechazada'}.`)
    await fetchConversations();
  } catch (e) {
    console.error('Error al actualizar la propuesta:', e);
    const msg = e.response?.data?.detail || 'Error al actualizar la propuesta.';
    toast.error(`Error: ${msg}`); // REEMPLAZO
  } finally {
    showDetailsModal.value = false;
  }
}
watch(() => selectedConversation.value?.messages, async () => {
  await nextTick(() => {
    if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  })
}, { deep: true })

onMounted(() => { fetchConversations() })
</script>

<style>
/* ===== Animaciones clave ===== */
@keyframes spin-slow{from{transform:rotate(0)}to{transform:rotate(360deg)}}
.animate-spin-slow{animation:spin-slow 8s linear infinite}
@keyframes fade-in-message{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
.animate-fade-in-message{animation:fade-in-message .28s ease-out both}

/* ===== Scrollbar ===== */
.custom-scrollbar-unique::-webkit-scrollbar{width:8px;height:8px}
.custom-scrollbar-unique::-webkit-scrollbar-track{background:rgba(226,232,240,.4)}
.custom-scrollbar-unique::-webkit-scrollbar-thumb{background:rgba(215,3,123,.4);border-radius:10px;border:1px solid rgba(215,3,123,.25)}
.custom-scrollbar-unique::-webkit-scrollbar-thumb:hover{background:rgba(215,3,123,.65)}

/* ===== Colitas de globos ===== */
.message-tail-right,.message-tail-left{position:relative}
.message-tail-right::after,.message-tail-left::after{content:"";position:absolute;bottom:-1px;width:0;height:0;border-style:solid}
.message-tail-right::after{right:-8px;border-width:10px 0 0 10px;border-color:transparent transparent transparent #d7037b}
.message-tail-left::after{left:-8px;border-width:10px 10px 0 0;border-color:transparent #e5e7eb transparent transparent} /* gris-200 */
</style>
