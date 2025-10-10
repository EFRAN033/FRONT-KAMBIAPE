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

        <div v-else class="flex flex-col lg:flex-row h-[75vh] max-h-[850px] border border-slate-200">

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
                <span class="absolute inset-y-0 left-0 w-1" :class="statusStripeClass(c.exchange.status)"></span>
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
                      <span v-if="c.last_message?.sender_id === userStore.user?.id">Tú: </span>{{ c.last_message?.text || 'Propuesta iniciada...' }}
                    </p>
                    <div class="mt-1">
                      <span class="inline-flex items-center px-2 py-0.5 text-[11px] font-medium capitalize ring-1" :class="statusBadgeClass(c.exchange.status)">
                        {{ statusText(c.exchange.status) }}
                      </span>
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

          <section class="w-full lg:w-[66%] flex flex-col bg-white">
            <template v-if="selectedConversation">
              <div class="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
                <div class="flex items-center gap-3 min-w-0">
                  <img :src="selectedConversation.user.avatar" :alt="selectedConversation.user.full_name" class="h-10 w-10 rounded-full object-cover border border-white shadow" />
                  <div class="min-w-0">
                    <h3 class="font-semibold text-[15px] text-slate-900 truncate">{{ selectedConversation.user.full_name }}</h3>
                    <p class="text-[12px] text-slate-600 flex items-center gap-1 flex-wrap">
                      <span class="font-medium text-slate-800 truncate">{{ selectedConversation.exchange.offer.title }}</span>
                      <ArrowRightIcon class="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                      <span class="font-medium text-slate-800 truncate">{{ selectedConversation.exchange.request.title }}</span>
                    </p>
                  </div>
                </div>
                <div class="flex gap-1.5 flex-shrink-0">
                  <button v-if="canAcceptOrReject" @click="updateProposalStatus('accepted')" class="p-2 text-green-700 bg-green-50 hover:bg-green-100" title="Aceptar"><CheckIcon class="h-5 w-5" /></button>
                  <button v-if="canAcceptOrReject" @click="updateProposalStatus('rejected')" class="p-2 text-red-700 bg-red-50 hover:bg-red-100" title="Rechazar"><XMarkIcon class="h-5 w-5" /></button>
                  <button @click="showDetailsModal = true" class="p-2 text-[#9e0154] bg-pink-50 hover:bg-pink-100" title="Detalles"><EyeIcon class="h-5 w-5" /></button>
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
                    <img v-if="message.sender_id !== userStore.user?.id" :src="selectedConversation.user.avatar" class="h-7 w-7 rounded-full border border-white shadow mr-2 mt-1.5 hidden sm:block" />
                    <div class="max-w-[78%] px-4 py-3 rounded-[10px] shadow-[0_1px_0_rgba(0,0,0,0.04)]" :class="message.sender_id === userStore.user?.id ? 'bg-[#d7037b] text-white rounded-br-sm' : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-bl-sm'">
                      <p class="text-[15px] leading-relaxed break-words">{{ message.text }}</p>
                      <div class="mt-1.5 flex items-center gap-1 text-[11px]" :class="message.sender_id === userStore.user?.id ? 'justify-end text-white/80' : 'justify-start text-slate-500'">
                        <span>{{ formatTime(message.timestamp) }}</span>
                        <span v-if="message.sender_id === userStore.user?.id">
                          <CheckCircleIcon v-if="message.is_read" class="h-3.5 w-3.5 inline-block" />
                          <ClockIcon v-else class="h-3.5 w-3.5 inline-block" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-4 border-t border-slate-200 bg-slate-50">
                <form @submit.prevent="sendMessage" class="flex items-center gap-3">
                  <input type="text" v-model="newMessageText" placeholder="Escribe tu mensaje…" class="flex-1 p-3 border border-slate-300 focus:ring-2 focus:ring-[#d7037b] focus:border-transparent outline-none" :disabled="sendingMessage || !isChatActive" />
                  <button type="submit" :disabled="!newMessageText.trim() || sendingMessage || !isChatActive" class="px-4 py-3 text-sm font-semibold text-white transition-transform" :class="(!newMessageText.trim() || sendingMessage || !isChatActive) ? 'bg-[#d7037b] opacity-50 cursor-not-allowed' : 'bg-[#d7037b] hover:scale-105 active:scale-95'" title="Enviar mensaje">
                    <PaperAirplaneIcon v-if="!sendingMessage" class="h-5 w-5" />
                    <svg v-else class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  </button>
                </form>
                <p v-if="!isChatActive" class="text-[12px] text-red-500 mt-2 text-center">No puedes enviar mensajes a propuestas que no estén pendientes o aceptadas.</p>
              </div>
            </template>

            <template v-else>
              <div class="flex-1 flex items-center justify-center p-8 text-center text-slate-500">
                <div class="flex flex-col items-center gap-3">
                  <ChatBubbleLeftRightIcon class="h-20 w-20 text-slate-300" />
                  <p class="text-[17px] font-semibold text-slate-700">Selecciona una conversación</p>
                  <p class="text-sm max-w-sm">Elige un chat a la izquierda para ver los mensajes y coordinar un intercambio.</p>
                </div>
              </div>
            </template>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from '@/axios';
import Header from './Header.vue';
import Footer from './Footer.vue';
import { useToast } from 'vue-toastification';
import { ChatBubbleLeftRightIcon, ChatBubbleOvalLeftIcon, ArrowRightIcon, CheckIcon, XMarkIcon, EyeIcon, PaperAirplaneIcon, ClockIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';

// --- State ---
const userStore = useUserStore();
const toast = useToast();
const conversations = ref([]);
const selectedConversation = ref(null);
const messages = ref([]);
const newMessageText = ref('');
const filter = ref('all');
const search = ref('');
const loadingConversations = ref(true);
const loadingMessages = ref(false);
const sendingMessage = ref(false);
const showDetailsModal = ref(false);
const messagesContainer = ref(null);
let pollingInterval = null;

// --- Computed Properties ---
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
const isChatActive = computed(() => selectedConversation.value && ['pending', 'accepted'].includes(selectedConversation.value.exchange.status));
const canAcceptOrReject = computed(() => selectedConversation.value && selectedConversation.value.exchange.status === 'pending' && selectedConversation.value.exchange.request.user_id === userStore.user?.id);

// --- Methods ---
const formatDate = (s) => s ? new Date(s).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
const formatTime = (s) => s ? new Date(s).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : '';

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const fetchConversations = async () => {
  loadingConversations.value = true;
  try {
    const { data } = await axios.get('/proposals/me');
    conversations.value = data;
  } catch (e) {
    toast.error('Error al cargar las conversaciones.');
    console.error(e);
  } finally {
    loadingConversations.value = false;
  }
};

const selectConversation = async (conversation) => {
  if (selectedConversation.value?.exchange.id === conversation.exchange.id) return;
  
  selectedConversation.value = conversation;
  messages.value = [];
  stopPolling();
  
  loadingMessages.value = true;
  try {
    const { data } = await axios.get(`/proposals/${conversation.exchange.id}/messages`);
    messages.value = data;
    
    const convInList = conversations.value.find(c => c.exchange.id === conversation.exchange.id);
    if (convInList) convInList.unread_count = 0;
    
    scrollToBottom();
    startPolling();
  } catch (e) {
    toast.error("No se pudieron cargar los mensajes.");
    console.error(e);
  } finally {
    loadingMessages.value = false;
  }
};

const sendMessage = async () => {
  if (!newMessageText.value.trim() || !isChatActive.value) return;
  sendingMessage.value = true;
  try {
    const { data: newMessage } = await axios.post('/messages', {
      proposal_id: selectedConversation.value.exchange.id,
      text: newMessageText.value.trim(),
    });
    messages.value.push(newMessage);
    
    const convInList = conversations.value.find(c => c.exchange.id === selectedConversation.value.exchange.id);
    if (convInList) convInList.last_message = newMessage;
    
    newMessageText.value = '';
    scrollToBottom();
  } catch (e) {
    toast.error('Error al enviar el mensaje.');
    console.error(e);
  } finally {
    sendingMessage.value = false;
  }
};

const updateProposalStatus = async (status) => {
  if (!selectedConversation.value) return;
  try {
    await axios.put(`/proposals/${selectedConversation.value.exchange.id}/status`, { status });
    selectedConversation.value.exchange.status = status;
    toast.success(`Propuesta ${status === 'accepted' ? 'aceptada' : 'rechazada'}.`);
    showDetailsModal.value = false;
    await fetchConversations();
  } catch (e) {
    toast.error(e.response?.data?.detail || 'Error al actualizar la propuesta.');
    console.error(e);
  }
};

const pollForNewMessages = async () => {
    if (!selectedConversation.value || document.hidden) return;
    try {
        const lastMessageId = messages.value.length > 0 ? messages.value[messages.value.length - 1].id : 0;
        const { data: newMessages } = await axios.get(`/proposals/${selectedConversation.value.exchange.id}/messages?since=${lastMessageId}`);

        if (newMessages.length > 0) {
            const currentIds = new Set(messages.value.map(m => m.id));
            const trulyNew = newMessages.filter(m => !currentIds.has(m.id));
            if (trulyNew.length > 0) {
                messages.value.push(...trulyNew);
                scrollToBottom();
            }
        }
    } catch (error) {
        console.error("Error en polling:", error);
    }
};

const startPolling = () => {
  stopPolling();
  pollingInterval = setInterval(pollForNewMessages, 10000); // Cada 10 segundos
};

const stopPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
};

// --- Lifecycle Hooks ---
onMounted(() => {
  if(userStore.isLoggedIn){
    fetchConversations();
  } else {
    router.push('/login');
  }
});

onBeforeUnmount(() => {
  stopPolling();
});

// --- Dynamic Classes ---
const statusStripeClass = (status) => ({ 'bg-yellow-400': status === 'pending', 'bg-green-500': status === 'accepted', 'bg-red-500': status === 'rejected', 'bg-slate-300': status === 'completed' });
const statusBadgeClass = (status) => ({ 'bg-yellow-50 text-yellow-800 ring-yellow-200': status === 'pending', 'bg-green-50 text-green-800 ring-green-200': status === 'accepted', 'bg-red-50 text-red-800 ring-red-200': status === 'rejected', 'bg-slate-50 text-slate-800 ring-slate-200': status === 'completed' });
const statusText = (status) => ({ pending: 'Pendiente', accepted: 'Aceptada', rejected: 'Rechazada', completed: 'Completada' }[status] || 'Desconocido');
</script>

<style>
/* Animaciones y estilos de scrollbar (sin cambios) */
@keyframes spin-slow{from{transform:rotate(0)}to{transform:rotate(360deg)}}
.animate-spin-slow{animation:spin-slow 8s linear infinite}
@keyframes fade-in-message{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
.animate-fade-in-message{animation:fade-in-message .28s ease-out both}
.custom-scrollbar-unique::-webkit-scrollbar{width:8px;height:8px}
.custom-scrollbar-unique::-webkit-scrollbar-track{background:rgba(226,232,240,.4)}
.custom-scrollbar-unique::-webkit-scrollbar-thumb{background:rgba(215,3,123,.4);border-radius:10px;border:1px solid rgba(215,3,123,.25)}
.custom-scrollbar-unique::-webkit-scrollbar-thumb:hover{background:rgba(215,3,123,.65)}
</style>