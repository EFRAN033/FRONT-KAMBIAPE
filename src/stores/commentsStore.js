import { defineStore } from 'pinia'

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [
      {
        id: 1,
        name: 'Ana Sofía',
        message: '¡Excelente plataforma! Me encanta la idea de poder intercambiar cosas que ya no uso. ¡Sigan así!',
        timestamp: new Date().toISOString(),
        type: 'compliment', // <-- Añadido el tipo
      },
      {
        id: 2,
        name: 'Carlos Mendoza',
        message: 'Sería genial poder filtrar los productos por distrito para encontrar cosas más cerca. ¡Gracias!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // hace 2 horas
        type: 'suggestion', // <-- Añadido el tipo
      }
    ]
  }),
  actions: {
    addComment(commentData) {
      const newComment = {
        id: Date.now(),
        name: commentData.name || 'Anónimo',
        message: commentData.message,
        timestamp: new Date().toISOString(),
        type: commentData.type || 'general', // <-- Guardamos el tipo, si no hay, 'general'
      };
      
      this.comments.unshift(newComment);
    }
  }
})