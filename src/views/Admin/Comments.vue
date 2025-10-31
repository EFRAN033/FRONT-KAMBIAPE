<template>
    <div class="bg-gray-50 py-12 sm:py-16">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div class="text-center">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comentarios de la Comunidad
          </h1>
          <p class="mt-4 text-lg leading-8 text-gray-600">
            Esto es lo que otros usuarios piensan de KambiaPe.
          </p>
        </div>
        
        <div class="mt-10">
          <div v-if="commentsStore.comments.length === 0" class="text-center py-12 px-6 bg-white border border-dashed border-gray-300 rounded-lg">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 class="mt-2 text-sm font-semibold text-gray-900">Aún no hay comentarios</h3>
            <p class="mt-1 text-sm text-gray-500">¡Sé el primero en dejar tu opinión!</p>
          </div>
  
          <div v-else class="space-y-6">
            <div 
              v-for="comment in commentsStore.comments" 
              :key="comment.id"
              class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div class="flex items-start justify-between">
                <div class="flex items-start">
                  <div class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold">
                    {{ getInitials(comment.name) }}
                  </div>
                  <div class="ml-4">
                    <h3 class="text-base font-semibold text-gray-900">
                      {{ comment.name }}
                    </h3>
                    <p class="text-sm text-gray-500">
                      {{ formatRelativeTime(comment.timestamp) }}
                    </p>
                  </div>
                </div>
  
                <span v-if="comment.type && commentTypeDetails[comment.type]" 
                      :class="[commentTypeDetails[comment.type].classes, 'inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium']">
                  <component :is="commentTypeDetails[comment.type].icon" class="h-3.5 w-3.5" />
                  {{ commentTypeDetails[comment.type].text }}
                </span>
                </div>
              
              <p class="mt-4 text-gray-700 text-base leading-relaxed">
                "{{ comment.message }}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script setup>
  import { useCommentsStore } from '@/stores/commentsStore';
  import { LightBulbIcon, ExclamationTriangleIcon, QuestionMarkCircleIcon, HeartIcon, ChatBubbleLeftIcon } from '@heroicons/vue/20/solid';
  
  const commentsStore = useCommentsStore();
  
  // --- NUEVO: Objeto para mapear tipos a estilos y textos ---
  const commentTypeDetails = {
    suggestion: { text: 'Sugerencia', icon: LightBulbIcon, classes: 'bg-blue-100 text-blue-800' },
    problem: { text: 'Problema', icon: ExclamationTriangleIcon, classes: 'bg-red-100 text-red-800' },
    question: { text: 'Pregunta', icon: QuestionMarkCircleIcon, classes: 'bg-yellow-100 text-yellow-800' },
    compliment: { text: 'Felicitación', icon: HeartIcon, classes: 'bg-green-100 text-green-800' },
    general: { text: 'General', icon: ChatBubbleLeftIcon, classes: 'bg-gray-100 text-gray-800' }
  };
  
  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '?';
    const parts = name.trim().split(' ');
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