<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Editar Hero Section</h1>

    <form @submit.prevent="handleSave" class="p-6 bg-white rounded shadow-md max-w-2xl">
      <div class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Título Principal</label>
          <input
            v-model="title"
            type="text"
            id="title"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Imagen de Fondo</label>
          <input
            type="file"
            @change="handleFileChange"
            accept="image/*"
            class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <div v-if="currentImageUrl">
          <label class="block text-sm font-medium text-gray-700">Imagen Actual</label>
          <img :src="currentImageUrl" alt="Imagen actual" class="mt-2 max-h-48 rounded">
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button type="submit" :disabled="loading" class="px-4 py-2 bg-indigo-600 text-white rounded shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300">
          {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </div>
      <p v-if="success" class="mt-2 text-green-600 text-sm">{{ success }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios'; // Asegúrate que tu instancia de axios esté configurada

const title = ref('');
const currentImageUrl = ref(null); // URL de la imagen actual (o previsualización)
const imageFile = ref(null);       // El archivo de imagen nuevo seleccionado
const loading = ref(false);
const success = ref(null);

// 1. Cargar datos iniciales
onMounted(async () => {
  try {
    const response = await axios.get('/api/admin/hero'); // <-- RUTA CORREGIDA
    title.value = response.data.title;
    currentImageUrl.value = response.data.imageUrl;
  } catch (error) {
    console.error("Error al cargar datos del hero:", error);
    // Aquí podrías mostrar un mensaje de error al usuario
  }
});

// 2. Manejar la selección de un nuevo archivo
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    // Crear una vista previa local
    currentImageUrl.value = URL.createObjectURL(imageFile.value);
  }
};

// 3. Guardar los cambios
const handleSave = async () => {
  loading.value = true;
  success.value = null;

  const formData = new FormData();
  formData.append('title', title.value);

  if (imageFile.value) {
    formData.append('image', imageFile.value);
  }

  try {
    const response = await axios.put('/api/admin/hero', formData, { // <-- RUTA CORREGIDA
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Actualizar la vista previa con la nueva imagen guardada (si cambió)
    currentImageUrl.value = response.data.imageUrl;
    success.value = "¡Guardado con éxito!";
    imageFile.value = null; // Limpiar el input de archivo

    // Limpiar mensaje de éxito después de unos segundos
    setTimeout(() => { success.value = null; }, 3000);

  } catch (error) {
    console.error("Error al guardar el hero:", error);
    alert("Error al guardar: " + (error.response?.data?.detail || error.message));
  } finally {
    loading.value = false;
  }
};
</script>