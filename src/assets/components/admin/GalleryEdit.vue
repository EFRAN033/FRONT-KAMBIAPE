<template>
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-gray-900">Editar Galería de Imágenes</h2>
  
      <div v-if="localGallery && localGallery.length > 0" class="space-y-4">
        <div v-for="(image, index) in localGallery" :key="index"
             class="flex flex-col sm:flex-row items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
          
          <div class="w-full sm:w-24 h-24 flex-shrink-0 relative overflow-hidden rounded-md">
            <img :src="image.imageUrl || 'https://via.placeholder.com/150'" :alt="image.alt || 'Imagen de galería'" class="object-cover w-full h-full">
            <button @click="showImageDialog(image.imageUrl)"
                    class="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </button>
          </div>
  
          <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div>
              <label :for="`gallery-image-url-${index}`" class="block text-sm font-medium text-gray-700">URL de la Imagen</label>
              <input type="text" :id="`gallery-image-url-${index}`" v-model="image.imageUrl" @input="updateImage(index, 'imageUrl', $event.target.value)"
                     class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-pink-500 focus:border-pink-500 sm:text-sm bg-gray-50">
            </div>
            <div>
              <label :for="`gallery-image-alt-${index}`" class="block text-sm font-medium text-gray-700">Texto Alternativo (Alt)</label>
              <input type="text" :id="`gallery-image-alt-${index}`" v-model="image.alt" @input="updateImage(index, 'alt', $event.target.value)"
                     class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-pink-500 focus:border-pink-500 sm:text-sm bg-gray-50">
            </div>
          </div>
  
          <button @click="removeImage(index)"
                  class="mt-4 sm:mt-0 p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                  title="Eliminar imagen">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
      <div v-else class="p-4 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
          No hay imágenes en la galería. ¡Añade una\!
      </div>
  
      <button @click="addImage"
              class="mt-6 w-full flex items-center justify-center gap-2 px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" /></svg>
        Añadir Imagen
      </button>
  
      <div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div class="bg-white p-4 rounded-lg shadow-xl max-w-lg w-full relative">
          <button @click="hideImageDialog" class="absolute top-2 right-2 text-gray-700 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <img :src="dialogImageUrl" alt="Vista previa de imagen" class="max-w-full h-auto rounded-md">
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    gallery: {
      type: Array,
      default: () => []
    }
  });
  
  const emit = defineEmits(['update:gallery']);
  
  // Copia local para evitar mutaciones directas del prop
  const localGallery = ref([]);
  
  // Diálogo de imagen
  const showDialog = ref(false);
  const dialogImageUrl = ref('');
  
  watch(() => props.gallery, (newVal) => {
    if (newVal) {
      localGallery.value = JSON.parse(JSON.stringify(newVal));
    }
  }, { immediate: true, deep: true });
  
  const addImage = () => {
    localGallery.value.push({ imageUrl: '', alt: '' });
    emit('update:gallery', localGallery.value);
  };
  
  const removeImage = (index) => {
    localGallery.value.splice(index, 1);
    emit('update:gallery', localGallery.value);
  };
  
  const updateImage = (index, field, value) => {
    if (localGallery.value[index]) {
      localGallery.value[index][field] = value;
      emit('update:gallery', localGallery.value);
    }
  };
  
  const showImageDialog = (url) => {
    dialogImageUrl.value = url;
    showDialog.value = true;
  };
  
  const hideImageDialog = () => {
    showDialog.value = false;
    dialogImageUrl.value = '';
  };
  
  </script>
  
  <style scoped>
  /* Puedes añadir estilos específicos si es necesario, pero Tailwind CSS ya maneja la mayoría. */
  </style>