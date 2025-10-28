<template>
  <div class="p-4 sm:p-8 bg-gray-100 min-h-screen">
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Editar Contenido del Hero Section</h1>

    <form @submit.prevent="handleSave" class="space-y-8 max-w-5xl mx-auto">

      <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-5 text-gray-700 border-b pb-2">Textos Generales</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label for="badgeText" class="label-text">Badge Superior</label>
                  <input v-model="formData.badgeText" type="text" id="badgeText" class="input-field" placeholder="Ej: Bienvenido a KambiaPe"/>
              </div>
               <div></div> <div>
                  <label for="titleLine1" class="label-text">Título - Línea 1 (Gris)</label>
                  <input v-model="formData.titleLine1" type="text" id="titleLine1" class="input-field" placeholder="Ej: Intercambia fácil, seguro"/>
              </div>
              <div>
                  <label for="titleLine2" class="label-text">Título - Línea 2 (Color)</label>
                  <input v-model="formData.titleLine2" type="text" id="titleLine2" class="input-field" placeholder="Ej: y sin comisiones"/>
              </div>
               <div class="md:col-span-2">
                  <label for="paragraphText" class="label-text">Párrafo Descriptivo</label>
                  <textarea v-model="formData.paragraphText" id="paragraphText" rows="3" class="input-field" placeholder="Ej: Publica lo que ya no usas..."></textarea>
                  <p class="mt-1 text-xs text-gray-500">Nota: La frase final sobre perfiles verificados no es editable aquí.</p>
              </div>
              <div>
                  <label for="button1Text" class="label-text">Texto Botón Principal</label>
                  <input v-model="formData.button1Text" type="text" id="button1Text" class="input-field" placeholder="Ej: Publicar objeto"/>
              </div>
              <div>
                  <label for="button2Text" class="label-text">Texto Botón Secundario</label>
                  <input v-model="formData.button2Text" type="text" id="button2Text" class="input-field" placeholder="Ej: Buzón"/>
              </div>
          </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-5 text-gray-700 border-b pb-2">Tarjetas Rotativas (Carrusel)</h2>
          <div class="space-y-6">
              <div v-for="(card, index) in formData.cards" :key="index" class="border bg-gray-50 p-4 rounded-md space-y-4">
                  <h3 class="font-medium text-indigo-700">Tarjeta {{ index + 1 }}</h3>
                  <div>
                      <label :for="'cardAlt'+index" class="label-text">Texto Alternativo (Alt)</label>
                      <input v-model="card.alt" type="text" :id="'cardAlt'+index" class="input-field bg-white" placeholder="Describe brevemente la imagen"/>
                  </div>
                  <div>
                      <label :for="'cardBadge'+index" class="label-text">Texto del Badge</label>
                      <input v-model="card.badge" type="text" :id="'cardBadge'+index" class="input-field bg-white" placeholder="Ej: Destacado, Nuevo"/>
                  </div>
                  <div>
                      <label :for="'cardImage'+index" class="label-text">Cambiar Imagen (Opcional)</label>
                      <input
                          type="file"
                          :id="'cardImage'+index"
                          @change="event => handleCardFileChange(event, index)"
                          accept="image/*"
                          class="input-file-field"
                      />
                       <p class="mt-1 text-xs text-gray-500">Sube una nueva imagen para reemplazar la actual.</p>
                  </div>
                  <div v-if="cardImagePreviews[index]">
                      <label class="label-text">Imagen Actual / Previsualización</label>
                      <img :src="cardImagePreviews[index]" alt="Imagen tarjeta" class="mt-1 max-h-32 rounded shadow object-contain border">
                       
                  </div>
                  <div v-else class="text-sm text-gray-500 italic">
                      No hay imagen asignada para esta tarjeta.
                  </div>
              </div>
          </div>
      </div>

      <div class="flex justify-end pt-4">
        <button type="submit" :disabled="loading || !isFormValid" class="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-medium">
          <span v-if="loading">Guardando...</span>
          <span v-else>Guardar Cambios</span>
        </button>
      </div>
      <div class="h-6 mt-2 text-center"> <p v-if="success" class="text-green-600 text-sm font-medium animate-pulse">{{ success }}</p>
          <p v-if="error" class="text-red-600 text-sm font-medium">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import axios from '@/axios';

// Estructura de datos para el formulario
const formData = ref({
  titleLine1: '',
  titleLine2: '',
  badgeText: '',
  paragraphText: '',
  button1Text: '',
  button2Text: '',
  cards: [
    { id: 1, alt: '', badge: '', imageUrl: null },
    { id: 2, alt: '', badge: '', imageUrl: null },
    { id: 3, alt: '', badge: '', imageUrl: null },
  ]
});

const cardImageFiles = reactive([null, null, null]);
const cardImagePreviews = reactive([null, null, null]);
const loading = ref(false);
const success = ref(null);
const error = ref(null);

// Validación: asegura que todos los textos estén llenos
const isFormValid = computed(() => {
   return formData.value.titleLine1.trim() !== '' &&
         formData.value.titleLine2.trim() !== '' &&
         formData.value.badgeText.trim() !== '' &&
         formData.value.paragraphText.trim() !== '' &&
         formData.value.button1Text.trim() !== '' &&
         formData.value.button2Text.trim() !== '' &&
         formData.value.cards.every(card => card.alt.trim() !== '' && card.badge.trim() !== '');
});

// Cargar datos iniciales
onMounted(async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get('/api/hero');
    const data = response.data;

    formData.value.titleLine1 = data.titleLine1 || '';
    formData.value.titleLine2 = data.titleLine2 || '';
    formData.value.badgeText = data.badgeText || '';
    formData.value.paragraphText = data.paragraphText || '';
    formData.value.button1Text = data.button1Text || '';
    formData.value.button2Text = data.button2Text || '';

    if (data.cards && data.cards.length === 3) {
      formData.value.cards = data.cards.map(card => ({
          id: card.id || 0,
          alt: card.alt || '',
          badge: card.badge || '',
          imageUrl: card.imageUrl
      }));
      cardImagePreviews[0] = data.cards[0]?.imageUrl;
      cardImagePreviews[1] = data.cards[1]?.imageUrl;
      cardImagePreviews[2] = data.cards[2]?.imageUrl;
    } else {
       console.warn("API no devolvió 3 tarjetas, inicializando vacías.");
       formData.value.cards = [
           { id: 1, alt: '', badge: '', imageUrl: null },
           { id: 2, alt: '', badge: '', imageUrl: null },
           { id: 3, alt: '', badge: '', imageUrl: null },
       ];
       cardImagePreviews.fill(null);
    }
  } catch (err) {
    console.error("Error al cargar datos del hero:", err);
    error.value = "No se pudieron cargar los datos. Intenta recargar.";
  } finally {
    loading.value = false;
  }
});

// Manejar cambio de archivo para una tarjeta
const handleCardFileChange = (event, index) => {
  const file = event.target.files[0];
  const currentImageUrl = formData.value.cards[index]?.imageUrl; // URL guardada

  if (file) {
    // Validar tipo de archivo (opcional pero recomendado)
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido.');
      event.target.value = ''; // Limpiar input
      return;
    }
    // Validar tamaño (opcional)
    // const maxSizeMB = 5;
    // if (file.size > maxSizeMB * 1024 * 1024) {
    //   alert(`La imagen no debe superar los ${maxSizeMB} MB.`);
    //   event.target.value = '';
    //   return;
    // }

    cardImageFiles[index] = file;
    cardImagePreviews[index] = URL.createObjectURL(file); // Mostrar preview local
  } else {
    // Si el usuario cancela, no hacer nada o resetear
    cardImageFiles[index] = null;
    cardImagePreviews[index] = currentImageUrl; // Volver a la imagen guardada (si existe)
  }
};


// Guardar cambios
const handleSave = async () => {
  if (!isFormValid.value) return;

  loading.value = true;
  success.value = null;
  error.value = null;

  const dataToSubmit = new FormData();

  dataToSubmit.append('titleLine1', formData.value.titleLine1);
  dataToSubmit.append('titleLine2', formData.value.titleLine2);
  dataToSubmit.append('badgeText', formData.value.badgeText);
  dataToSubmit.append('paragraphText', formData.value.paragraphText);
  dataToSubmit.append('button1Text', formData.value.button1Text);
  dataToSubmit.append('button2Text', formData.value.button2Text);

  formData.value.cards.forEach((card, index) => {
      dataToSubmit.append(`card_${index}_alt`, card.alt);
      dataToSubmit.append(`card_${index}_badge`, card.badge);
  });

  cardImageFiles.forEach((file, index) => {
      if (file) {
          dataToSubmit.append(`card_${index}_image`, file);
      }
  });

  try {
    const response = await axios.put('/api/admin/hero', dataToSubmit, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const updatedData = response.data;
    formData.value.titleLine1 = updatedData.titleLine1;
    formData.value.titleLine2 = updatedData.titleLine2;
    formData.value.badgeText = updatedData.badgeText;
    formData.value.paragraphText = updatedData.paragraphText;
    formData.value.button1Text = updatedData.button1Text;
    formData.value.button2Text = updatedData.button2Text;

     if (updatedData.cards && updatedData.cards.length === 3) {
      formData.value.cards = updatedData.cards.map(card => ({
           id: card.id, alt: card.alt, badge: card.badge, imageUrl: card.imageUrl
      }));
      cardImagePreviews[0] = updatedData.cards[0]?.imageUrl;
      cardImagePreviews[1] = updatedData.cards[1]?.imageUrl;
      cardImagePreviews[2] = updatedData.cards[2]?.imageUrl;
    }

    success.value = "¡Hero Section actualizado con éxito!";
    cardImageFiles.fill(null); // Limpiar archivos seleccionados

    // Limpiar mensaje después de un tiempo
    setTimeout(() => { success.value = null; }, 4000);

  } catch (err) {
    console.error("Error al guardar el hero:", err);
    error.value = "Error al guardar: " + (err.response?.data?.detail || err.message);
     // Limpiar mensaje de error después de un tiempo
    setTimeout(() => { error.value = null; }, 6000);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Clases de utilidad de Tailwind aplicadas directamente,
   pero puedes definir clases personalizadas aquí si prefieres */
.label-text {
  @apply block text-sm font-medium text-gray-700 mb-1;
}
.input-field {
  @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
}
 .input-file-field {
   @apply block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer;
 }
</style>