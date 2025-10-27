<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Editar Hero Section</h1>

    <form @submit.prevent="handleSave" class="p-6 bg-white rounded shadow-md max-w-2xl">
      <div class="space-y-4">
        <!-- ================= INICIO CAMBIO 1: Dos Inputs para Título ================= -->
        <div>
          <label for="titleLine1" class="block text-sm font-medium text-gray-700">Título - Línea 1 (Gris)</label>
          <input
            v-model="titleLine1"
            type="text"
            id="titleLine1"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ej: Intercambia fácil, seguro"
          />
        </div>
        <div>
          <label for="titleLine2" class="block text-sm font-medium text-gray-700">Título - Línea 2 (Color)</label>
          <input
            v-model="titleLine2"
            type="text"
            id="titleLine2"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ej: y sin comisiones"
          />
        </div>
        <!-- ================= FIN CAMBIO 1 ================= -->

        <div>
          <label class="block text-sm font-medium text-gray-700">Imagen Principal (Opcional)</label>
          <input
            type="file"
            @change="handleFileChange"
            accept="image/*"
            class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          <p class="mt-1 text-xs text-gray-500">Si no seleccionas una nueva, se mantendrá la actual.</p>
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
      <p v-if="error" class="mt-2 text-red-600 text-sm">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios'; // Asegúrate que tu instancia de axios esté configurada

// ================= INICIO CAMBIO 2: Refs para las dos líneas =================
// const title = ref(''); // Ya no usamos esta
const titleLine1 = ref('');
const titleLine2 = ref('');
// ================= FIN CAMBIO 2 =================

const currentImageUrl = ref(null);
const imageFile = ref(null);
const loading = ref(false);
const success = ref(null);
const error = ref(null); // Añadido para mostrar errores

// 1. Cargar datos iniciales (Ahora carga las dos líneas)
onMounted(async () => {
  try {
    const response = await axios.get('/api/admin/hero');
    // ================= INICIO CAMBIO 3: Cargar las dos líneas =================
    // title.value = response.data.title; // Ya no usamos esta
    titleLine1.value = response.data.titleLine1 || ''; // Usar '' si no viene
    titleLine2.value = response.data.titleLine2 || ''; // Usar '' si no viene
    // ================= FIN CAMBIO 3 =================
    currentImageUrl.value = response.data.imageUrl;
  } catch (err) {
    console.error("Error al cargar datos del hero:", err);
    error.value = "No se pudieron cargar los datos actuales."; // Mostrar error
  }
});

// 2. Manejar la selección de un nuevo archivo (Sin cambios)
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    currentImageUrl.value = URL.createObjectURL(imageFile.value);
  }
};

// 3. Guardar los cambios (Ahora envía las dos líneas)
const handleSave = async () => {
  loading.value = true;
  success.value = null;
  error.value = null; // Limpiar errores previos

  const formData = new FormData();
  // ================= INICIO CAMBIO 4: Enviar las dos líneas =================
  // formData.append('title', title.value); // Ya no usamos esta
  formData.append('titleLine1', titleLine1.value);
  formData.append('titleLine2', titleLine2.value);
  // ================= FIN CAMBIO 4 =================

  if (imageFile.value) {
    formData.append('image', imageFile.value);
  }

  try {
    const response = await axios.put('/api/admin/hero', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Actualizar vista previa y estado
    currentImageUrl.value = response.data.imageUrl;
    titleLine1.value = response.data.titleLine1; // Asegurar que el estado local esté sincronizado
    titleLine2.value = response.data.titleLine2; // Asegurar que el estado local esté sincronizado
    success.value = "¡Guardado con éxito!";
    imageFile.value = null;

    setTimeout(() => { success.value = null; }, 3000);

  } catch (err) {
    console.error("Error al guardar el hero:", err);
    error.value = "Error al guardar: " + (err.response?.data?.detail || err.message); // Mostrar error
  } finally {
    loading.value = false;
  }
};
</script>
