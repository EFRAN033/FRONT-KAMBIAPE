<template>
  <div class="bg-slate-50 font-sans antialiased">
    <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      
      <div class="mb-8 p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filtrar por tipo</label>
            <div class="mt-2 flex flex-wrap items-center gap-2">
              <button
                @click="activeFilter = 'all'"
                :class="[
                  'px-3 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200',
                  activeFilter === 'all' ? 'bg-pink-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                ]"
              >
                Todos
              </button>
              <button
                v-for="(details, type) in commentTypeDetails"
                :key="type"
                @click="activeFilter = type"
                :class="[
                  'px-3 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200',
                  activeFilter === type ? 'bg-pink-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                ]"
              >
                {{ details.text }}
              </button>
            </div>
          </div>
          <div class="border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-4 w-full sm:w-auto">
            <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ordenar por</label>
            <div class="mt-2 flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
              <button
                @click="sortBy = 'newest'"
                :class="[
                  'px-3 py-1 text-xs font-semibold rounded-md w-full sm:w-auto transition-all',
                  sortBy === 'newest' ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-600 hover:bg-white/60'
                ]"
              >
                Más Recientes
              </button>
              <button
                @click="sortBy = 'oldest'"
                :class="[
                  'px-3 py-1 text-xs font-semibold rounded-md w-full sm:w-auto transition-all',
                  sortBy === 'oldest' ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-600 hover:bg-white/60'
                ]"
              >
                Más Antiguos
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <div v-if="loading" class="text-center py-16">
          <svg class="animate-spin mx-auto h-10 w-10 text-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="mt-3 text-sm font-medium text-slate-600">Cargando comentarios...</p>
        </div>

        <div v-else-if="error" class="text-center py-16 px-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 class="text-base font-semibold text-red-800">Oops! Algo salió mal.</h3>
          <p class="mt-1 text-sm text-red-700">{{ error }}</p>
        </div>
        
        <div v-else-if="comments.length === 0" class="text-center py-16 px-6 bg-white border border-dashed border-slate-300 rounded-lg">
          <svg class="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <h3 class="mt-2 text-sm font-semibold text-slate-900">Aún no hay comentarios</h3>
          <p class="mt-1 text-sm text-slate-500">¡Sé el primero en dejar tu opinión!</p>
        </div>
        
        <div v-else-if="filteredComments.length === 0" class="text-center py-16 px-6 bg-white border border-dashed border-slate-300 rounded-lg">
           <svg class="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
             <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
           </svg>
          <h3 class="mt-2 text-sm font-semibold text-slate-900">No se encontraron comentarios</h3>
          <p class="mt-1 text-sm text-slate-500">Prueba a seleccionar otro filtro.</p>
        </div>

        <TransitionGroup v-else name="list" tag="div" class="space-y-5">
          <div 
            v-for="comment in filteredComments" 
            :key="comment.id"
            
            :class="[
              'p-5 border rounded-xl shadow-sm transition-all duration-300 hover:shadow-md',
              isCommentNew(comment)
                ? 'bg-pink-50 border-pink-300' 
                : 'bg-white border-slate-200'  
            ]"
            >
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-3">
                <div v-if="comment.user" class="flex-shrink-0 h-11 w-11">
                  <img v-if="comment.user.profile_picture" :src="getAvatarUrl(comment.user.profile_picture)" :alt="comment.user.full_name" class="h-11 w-11 rounded-full object-cover ring-2 ring-white">
                  <span v-else class="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold text-lg">
                    {{ getInitials(comment.user.full_name) }}
                  </span>
                </div>
                <div v-else class="flex-shrink-0 h-11 w-11 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 font-bold">?</div>

                <div>
                  <div class="flex items-center gap-1.5">
                    <h3 class="text-sm font-semibold text-slate-900">
                      {{ comment.user ? comment.user.full_name : 'Usuario Anónimo' }}
                    </h3>
                    <button
                      v-if="comment.user"
                      @click="copyToClipboard(comment.user.full_name, comment.id)"
                      title="Copiar nombre"
                      class="p-0.5 rounded text-slate-400 hover:text-pink-600 hover:bg-pink-100 transition-colors duration-150"
                    >
                      <CheckIcon v-if="copiedNameId === comment.id" class="h-4 w-4 text-green-600" />
                      <DocumentDuplicateIcon v-else class="h-4 w-4" />
                    </button>
                  </div>

                  <p class="text-xs text-slate-500">
                    {{ formatRelativeTime(comment.created_at) }}
                  </p>
                </div>
              </div>

              <div class="flex-shrink-0 flex items-center gap-2">
                <span v-if="comment.type && commentTypeDetails[comment.type]" 
                      :class="[commentTypeDetails[comment.type].classes, 'flex-shrink-0 inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium']">
                  <component :is="commentTypeDetails[comment.type].icon" class="h-3.5 w-3.5" />
                  {{ commentTypeDetails[comment.type].text }}
                </span>
                
                <button 
                  v-if="userStore.isAdmin || (comment.user && userStore.user.id === comment.user.id)"
                  @click="handleDelete(comment.id)"
                  title="Eliminar comentario"
                  class="p-1 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-100 transition-colors duration-150"
                >
                  <TrashIcon class="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <blockquote class="mt-4 pl-4 border-l-4 border-slate-100">
              <p class="text-slate-800 text-[15px] leading-relaxed italic">
                {{ comment.message }}
              </p>
            </blockquote>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import axios from '@/axios';
import { 
  LightBulbIcon, 
  ExclamationTriangleIcon, 
  QuestionMarkCircleIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  CheckIcon
} from '@heroicons/vue/20/solid';
import { useUserStore } from '@/stores/user'; 
  
const userStore = useUserStore();

const comments = ref([]);
const loading = ref(true);
const error = ref(null);

const activeFilter = ref('all');
const sortBy = ref('newest');
const copiedNameId = ref(null);

const lastVisitTimestamp = ref(null);

const API_BASE_URL = import.meta.env.VITE_APP_PUBLIC_URL || 'http://localhost:8000';
  
const commentTypeDetails = {
  suggestion: { text: 'Sugerencia', icon: LightBulbIcon, classes: 'bg-blue-100 text-blue-800' },
  problem: { text: 'Problema', icon: ExclamationTriangleIcon, classes: 'bg-red-100 text-red-800' },
  question: { text: 'Pregunta', icon: QuestionMarkCircleIcon, classes: 'bg-yellow-100 text-yellow-800' },
  compliment: { text: 'Felicitación', icon: HeartIcon, classes: 'bg-green-100 text-green-800' },
  general: { text: 'General', icon: ChatBubbleLeftIcon, classes: 'bg-gray-100 text-gray-800' }
};

const isCommentNew = (comment) => {
  if (!lastVisitTimestamp.value) return false;
  return new Date(comment.created_at) > new Date(lastVisitTimestamp.value);
};

const filteredComments = computed(() => {
  let commentsToProcess = [...comments.value];

  if (activeFilter.value !== 'all') {
    commentsToProcess = commentsToProcess.filter(comment => comment.type === activeFilter.value);
  }

  commentsToProcess.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    if (sortBy.value === 'newest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  return commentsToProcess;
});
  
const fetchComments = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get('/api/comments');
    comments.value = response.data;
  } catch (err) {
    error.value = 'No se pudieron cargar los comentarios. Intenta de nuevo más tarde.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};
  
onMounted(() => {
  lastVisitTimestamp.value = localStorage.getItem('lastCommentsVisit') || new Date(0).toISOString();
  
  fetchComments();
  
  if (!userStore.isLoggedIn) {
    userStore.initializeUser();
  }
});

onUnmounted(() => {
  localStorage.setItem('lastCommentsVisit', new Date().toISOString());
});

const handleDelete = async (commentId) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
    return;
  }
  
  try {
    await axios.delete(`/api/comments/${commentId}`);
    comments.value = comments.value.filter(comment => comment.id !== commentId);
  } catch (err) {
    console.error('Error al eliminar el comentario:', err);
    alert('Error: No se pudo eliminar el comentario.');
  }
};

const copyToClipboard = async (text, commentId) => {
  if (!navigator.clipboard) {
    alert('Tu navegador no soporta esta función de copiado.');
    return;
  }
  
  try {
    await navigator.clipboard.writeText(text);
    copiedNameId.value = commentId;
    
    setTimeout(() => {
      if (copiedNameId.value === commentId) {
        copiedNameId.value = null;
      }
    }, 2000); 
    
  } catch (err) {
    console.error('Error al copiar:', err);
    alert('No se pudo copiar el nombre.');
  }
};
  
const getAvatarUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}${path}`;
}
  
const getInitials = (name) => {
  if (!name || typeof name !== 'string') return '?';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};
  
const formatRelativeTime = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const seconds = Math.floor((now - past) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return `hace ${Math.floor(interval)} años`;
  
  interval = seconds / 2592000;
  if (interval > 1) return `hace ${Math.floor(interval)} meses`;
  
  interval = seconds / 86400;
  if (interval > 1) return `hace ${Math.floor(interval)} días`;
  
  interval = seconds / 3600;
  if (interval > 1) return `hace ${Math.floor(interval)} horas`;
  
  interval = seconds / 60;
  if (interval > 1) return `hace ${Math.floor(interval)} minutos`;
  
  return "justo ahora";
};
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-active {
  position: absolute;
}
</style>