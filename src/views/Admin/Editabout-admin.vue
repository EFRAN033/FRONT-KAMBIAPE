<template>
  <div class="p-4 sm:p-8 bg-gray-100 min-h-screen">
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Editar Contenido de "Nosotros"</h1>

    <form @submit.prevent="handleSave" class="space-y-8 max-w-5xl mx-auto">

      <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-5 text-gray-700 border-b pb-2">Sección Hero (Cabecera)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label for="heroBadge" class="label-text">Badge Superior</label>
                  <input v-model="formData.hero.badge" type="text" id="heroBadge" class="input-field" placeholder="Ej: Perú • Comunidad • Innovación"/>
              </div>
              <div>
                  <label for="heroTitle" class="label-text">Título</label>
                  <input v-model="formData.hero.title" type="text" id="heroTitle" class="input-field" placeholder="Ej: Ideas en acción."/>
              </div>
              <div class="md:col-span-2">
                  <label for="heroParagraph" class="label-text">Párrafo Descriptivo</label>
                  <textarea v-model="formData.hero.paragraph" id="heroParagraph" rows="3" class="input-field" placeholder="Ej: KambiaPe conecta personas..."></textarea>
              </div>
              <div>
                  <label for="heroBtn1" class="label-text">Texto Botón Principal</label>
                  <input v-model="formData.hero.btn1" type="text" id="heroBtn1" class="input-field" placeholder="Ej: Conoce la historia"/>
              </div>
              <div>
                  <label for="heroBtn2" class="label-text">Texto Botón Secundario</label>
                  <input v-model="formData.hero.btn2" type="text" id="heroBtn2" class="input-field" placeholder="Ej: Conócenos!"/>
              </div>
          </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-5 text-gray-700 border-b pb-2">Imágenes Hero (3 Tarjetas)</h2>
          <div class="space-y-6">
              <div v-for="(card, index) in formData.heroCards" :key="index" class="border bg-gray-50 p-4 rounded-md space-y-4">
                  <h3 class="font-medium text-indigo-700">Tarjeta {{ index + 1 }} ({{ card.title }})</h3>
                  <div>
                      <label :for="'hcAlt'+index" class="label-text">Texto Alternativo (Alt)</label>
                      <input v-model="card.alt" type="text" :id="'hcAlt'+index" class="input-field bg-white" placeholder="Describe la imagen"/>
                  </div>
                  <div>
                      <label :for="'hcCaption'+index" class="label-text">Caption (Figcaption)</label>
                      <input v-model="card.caption" type="text" :id="'hcCaption'+index" class="input-field bg-white" placeholder="Ej: Educación"/>
                  </div>
                  <div>
                      <label :for="'hcTitle'+index" class="label-text">Título de Tarjeta</label>
                      <input v-model="card.title" type="text" :id="'hcTitle'+index" class="input-field bg-white" placeholder="Ej: Escuelas que inspiran"/>
                  </div>
                  <div>
                      <label :for="'hcImage'+index" class="label-text">Cambiar Imagen (Opcional)</label>
                      <input type="file" :id="'hcImage'+index" @change="event => handleFileChange(event, 'heroCards', index)" accept="image/*" class="input-file-field"/>
                       <p class="mt-1 text-xs text-gray-500">Sube una nueva imagen para reemplazar la actual.</p>
                  </div>
                  <div v-if="imagePreviews.heroCards[index]">
                      <label class="label-text">Previsualización</label>
                      <img :src="imagePreviews.heroCards[index]" alt="Imagen tarjeta" class="mt-1 max-h-32 rounded shadow object-contain border">
                  </div>
              </div>
          </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-5 text-gray-700 border-b pb-2">Sección "Acerca de"</h2>
          <div class="space-y-6">
              <div>
                  <label for="aboutTitle" class="label-text">Título</label>
                  <input v-model="formData.about.title" type="text" id="aboutTitle" class="input-field" placeholder="Ej: Trueque con propósito."/>
              </div>
              <div>
                  <label for="aboutParagraph" class="label-text">Párrafo</label>
                  <textarea v-model="formData.about.paragraph" id="aboutParagraph" rows="3" class="input-field" placeholder="Ej: Creamos puentes..."></textarea>
              </div>
              <div>
                  <label for="aboutQuote" class="label-text">Frase destacada (Caja Rosa)</label>
                  <input v-model="formData.about.quote" type="text" id="aboutQuote" class="input-field" placeholder="Ej: Intercambiar es confiar..."/>
              </div>
          </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-5 text-gray-700 border-b pb-2">Pestañas (Qué es, Misión, Visión)</h2>
          <div class="space-y-6">
              <div v-for="(tab, index) in formData.tabs" :key="index" class="border bg-gray-50 p-4 rounded-md space-y-4">
                  <h3 class="font-medium text-indigo-700">{{ tab.type }}</h3>
                  
                  <div>
                      <label :for="'tabP'+index" class="label-text">Párrafo Principal</label>
                      <textarea v-model="tab.paragraph" :id="'tabP'+index" rows="3" class="input-field bg-white"></textarea>
                  </div>
                  
                  <div v-if="tab.type === 'Qué es'">
                      <label :for="'tabQ'+index" class="label-text">Frase destacada (Caja Rosa)</label>
                      <input v-model="tab.quote" type="text" :id="'tabQ'+index" class="input-field bg-white"/>
                  </div>
                  <div v-if="tab.type === 'Misión'">
                      <label :for="'tabL'+index" class="label-text">Lista (Un ítem por línea)</label>
                      <textarea v-model="tab.list" :id="'tabL'+index" rows="4" class="input-field bg-white" placeholder="Ítem 1...&#10;Ítem 2..."></textarea>
                  </div>
                  <div v-if="tab.type === 'Visión'">
                      <label :for="'tabF'+index" class="label-text">Texto pie de párrafo</label>
                      <input v-model="tab.footer" type="text" :id="'tabF'+index" class="input-field bg-white"/>
                  </div>
                  
                  <div>
                      <label :for="'tabAlt'+index" class="label-text">Texto Alternativo (Alt) Imagen</label>
                      <input v-model="tab.alt" type="text" :id="'tabAlt'+index" class="input-field bg-white" placeholder="Describe la imagen de esta pestaña"/>
                  </div>
                  <div>
                      <label :for="'tabCap'+index" class="label-text">Caption Imagen</label>
                      <input v-model="tab.caption" type="text" :id="'tabCap'+index" class="input-field bg-white" placeholder="Ej: Colaboración"/>
                  </div>
                  <div>
                      <label :for="'tabImg'+index" class="label-text">Cambiar Imagen (Opcional)</label>
                      <input type="file" :id="'tabImg'+index" @change="event => handleFileChange(event, 'tabs', index)" accept="image/*" class="input-file-field"/>
                  </div>
                  <div v-if="imagePreviews.tabs[index]">
                      <label class="label-text">Previsualización</label>
                      <img :src="imagePreviews.tabs[index]" alt="Imagen pestaña" class="mt-1 max-h-32 rounded shadow object-contain border">
                  </div>
              </div>
          </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex justify-between items-center border-b pb-2 mb-5">
            <h2 class="text-xl font-semibold text-gray-700">Galería de Imágenes (Carrusel)</h2>
            <button @click.prevent="addGalleryItem" type="button" class="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-100">
              Añadir Imagen
            </button>
          </div>
          
          <div class="space-y-4">
              <p v-if="!formData.gallery || formData.gallery.length === 0" class="text-sm text-gray-500 text-center py-4">
                No hay imágenes en la galería. Haz clic en "Añadir Imagen" para empezar.
              </p>
              <div v-for="(item, index) in formData.gallery" :key="item.id || `new-${index}`" 
                   class="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border bg-gray-50 p-4 rounded-md">
                  
                  <div class="flex items-center gap-4">
                      <div class="flex-shrink-0 w-24 h-16 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                          <img v-if="imagePreviews.gallery[index]" :src="imagePreviews.gallery[index]" alt="Preview" class="w-full h-full object-cover">
                          <span v-else class="text-xs text-gray-500">Sin imagen</span>
                      </div>
                      <span class="font-medium text-gray-600">Ítem #{{ index + 1 }}</span>
                  </div>

                  <div class="space-y-4">
                      <div>
                          <label :for="'galAlt'+index" class="label-text">Texto Alternativo (Alt)</label>
                          <input v-model="item.alt" type="text" :id="'galAlt'+index" class="input-field bg-white" placeholder="Describe la imagen"/>
                      </div>
                      <div>
                          <label :for="'galImg'+index" class="label-text">
                              {{ imagePreviews.gallery[index] ? 'Cambiar Imagen' : 'Subir Imagen' }}
                          </label>
                          <input type="file" :id="'galImg'+index" @change="event => handleFileChange(event, 'gallery', index)" accept="image/*" class="input-file-field"/>
                      </div>
                  </div>

                  <div class="flex md:justify-end items-center h-full pt-4 md:pt-0">
                      <button @click.prevent="removeGalleryItem(index)" type="button" class="text-sm text-red-600 hover:text-red-800 font-medium transition-colors">
                          Eliminar
                      </button>
                  </div>
              </div>
          </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-5 text-gray-700 border-b pb-2">Sección Comunidad (WhatsApp)</h2>
          <div class="space-y-6">
              <div>
                  <label for="commTitle" class="label-text">Título</label>
                  <input v-model="formData.community.title" type="text" id="commTitle" class="input-field" placeholder="Ej: El corazón de KambiaPe..."/>
              </div>
              <div>
                  <label for="commP" class="label-text">Párrafo</label>
                  <textarea v-model="formData.community.paragraph" id="commP" rows="2" class="input-field" placeholder="Ej: Únete a nuestra comunidad..."></textarea>
              </div>
              <div>
                  <label for="commBtn" class="label-text">Texto Botón</label>
                  <input v-model="formData.community.btnText" type="text" id="commBtn" class="input-field" placeholder="Ej: Unirme a la Comunidad"/>
              </div>
              <div>
                  <label for="commLink" class="label-text">Enlace (URL) de WhatsApp</label>
                  <input v-model="formData.community.link" type="url" id="commLink" class="input-field" placeholder="https://chat.whatsapp.com/..."/>
              </div>
          </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-5 text-gray-700 border-b pb-2">Redes Sociales (Barra inferior)</h2>
           <div class="space-y-6">
              <div>
                  <label for="socInsta" class="label-text">Enlace (URL) Instagram</label>
                  <input v-model="formData.social.insta" type="url" id="socInsta" class="input-field" placeholder="https://www.instagram.com/..."/>
              </div>
               <div>
                  <label for="socTiktok" class="label-text">Enlace (URL) TikTok</label>
                  <input v-model="formData.social.tiktok" type="url" id="socTiktok" class="input-field" placeholder="https://tiktok.com/..."/>
              </div>
               <div>
                  <label for="socFb" class="label-text">Enlace (URL) Facebook</label>
                  <input v-model="formData.social.facebook" type="url" id="socFb" class="input-field" placeholder="https://www.facebook.com/..."/>
              </div>
          </div>
      </div>

      <div class="flex justify-end pt-4">
        <button type="submit" :disabled="loading" class="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-medium">
          <span v-if="loading">Guardando...</span>
          <span v-else>Guardar Cambios</span>
        </button>
      </div>
      <div class="h-6 mt-2 text-center"> 
          <p v-if="success" class="text-green-600 text-sm font-medium animate-pulse">{{ success }}</p>
          <p v-if="error" class="text-red-600 text-sm font-medium">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from '@/axios';

// Estructura de datos para todo el formulario
const formData = ref({
  hero: { badge: '', title: '', paragraph: '', btn1: '', btn2: '' },
  heroCards: [
    { id: 1, alt: '', caption: '', title: '', imageUrl: null },
    { id: 2, alt: '', caption: '', title: '', imageUrl: null },
    { id: 3, alt: '', caption: '', title: '', imageUrl: null }
  ],
  about: { title: '', paragraph: '', quote: '' },
  tabs: [
    { id: 1, type: 'Qué es', paragraph: '', quote: '', alt: '', caption: '', imageUrl: null },
    { id: 2, type: 'Misión', paragraph: '', list: '', alt: '', caption: '', imageUrl: null },
    { id: 3, type: 'Visión', paragraph: '', footer: '', alt: '', caption: '', imageUrl: null }
  ],
  gallery: [],
  community: { title: '', paragraph: '', btnText: '', link: '' },
  social: { insta: '', tiktok: '', facebook: '' }
});

// Almacenamiento temporal de archivos e imágenes de previsualización
const imageFiles = reactive({
    heroCards: [null, null, null],
    tabs: [null, null, null],
    gallery: []
});
const imagePreviews = reactive({
    heroCards: [null, null, null],
    tabs: [null, null, null],
    gallery: []
});

const loading = ref(false);
const success = ref(null);
const error = ref(null);

// Cargar datos iniciales
onMounted(async () => {
  loading.value = true;
  error.value = null;
  try {
    // ✅ CORRECCIÓN: Usar el endpoint público para OBTENER los datos
    const response = await axios.get('/api/aboutus');
    const data = response.data;
    
    // Cargar todos los datos de la API en formData
    if (data.hero) formData.value.hero = data.hero;
    if (data.about) formData.value.about = data.about;
    if (data.community) formData.value.community = data.community;
    if (data.social) formData.value.social = data.social;

    if (data.heroCards && data.heroCards.length === 3) {
      formData.value.heroCards = data.heroCards;
      imagePreviews.heroCards[0] = data.heroCards[0]?.imageUrl;
      imagePreviews.heroCards[1] = data.heroCards[1]?.imageUrl;
      imagePreviews.heroCards[2] = data.heroCards[2]?.imageUrl;
    }
    
    if (data.tabs && data.tabs.length === 3) {
      formData.value.tabs = data.tabs;
      imagePreviews.tabs[0] = data.tabs[0]?.imageUrl;
      imagePreviews.tabs[1] = data.tabs[1]?.imageUrl;
      imagePreviews.tabs[2] = data.tabs[2]?.imageUrl;
    }

    if (data.gallery && Array.isArray(data.gallery)) {
      formData.value.gallery = data.gallery;
      imagePreviews.gallery = data.gallery.map(item => item.imageUrl || null);
      imageFiles.gallery = Array(data.gallery.length).fill(null);
    } else {
      formData.value.gallery = [];
      imagePreviews.gallery = [];
      imageFiles.gallery = [];
    }

  } catch (err) {
    console.error("Error al cargar datos de 'Nosotros':", err);
    error.value = "No se pudieron cargar los datos. Intenta recargar.";
  } finally {
    loading.value = false;
  }
});

// Manejar cambio de archivo genérico
const handleFileChange = (event, section, index) => {
  const file = event.target.files[0];
  const currentImageUrl = formData.value[section][index]?.imageUrl;

  if (file) {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido.');
      event.target.value = '';
      return;
    }
    imageFiles[section][index] = file;
    imagePreviews[section][index] = URL.createObjectURL(file);
  } else {
    imageFiles[section][index] = null;
    imagePreviews[section][index] = currentImageUrl;
  }
};

// Añadir/Eliminar de Galería
const addGalleryItem = () => {
  formData.value.gallery.push({ id: null, alt: '', imageUrl: null });
  imageFiles.gallery.push(null);
  imagePreviews.gallery.push(null);
};

const removeGalleryItem = (index) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta imagen de la galería?')) {
    formData.value.gallery.splice(index, 1);
    imageFiles.gallery.splice(index, 1);
    imagePreviews.gallery.splice(index, 1);
  }
};


// Guardar cambios
const handleSave = async () => {
  loading.value = true;
  success.value = null;
  error.value = null;

  const dataToSubmit = new FormData();

  // 1. Adjuntar datos de "Hero"
  dataToSubmit.append('hero_badge', formData.value.hero.badge);
  dataToSubmit.append('hero_title', formData.value.hero.title);
  dataToSubmit.append('hero_paragraph', formData.value.hero.paragraph);
  dataToSubmit.append('hero_btn1', formData.value.hero.btn1);
  dataToSubmit.append('hero_btn2', formData.value.hero.btn2);

  // 2. Adjuntar datos y archivos de "Hero Cards"
  formData.value.heroCards.forEach((card, index) => {
      dataToSubmit.append(`heroCard_${index}_alt`, card.alt);
      dataToSubmit.append(`heroCard_${index}_caption`, card.caption);
      dataToSubmit.append(`heroCard_${index}_title`, card.title);
      // ✅ CORRECCIÓN: Enviar URL existente si no hay archivo nuevo
      if (imageFiles.heroCards[index]) {
          dataToSubmit.append(`heroCard_${index}_image`, imageFiles.heroCards[index]);
      } else if (card.imageUrl) {
          dataToSubmit.append(`heroCard_${index}_existing_url`, card.imageUrl);
      }
  });

  // 3. Adjuntar datos de "About"
  dataToSubmit.append('about_title', formData.value.about.title);
  dataToSubmit.append('about_paragraph', formData.value.about.paragraph);
  dataToSubmit.append('about_quote', formData.value.about.quote);

  // 4. Adjuntar datos y archivos de "Tabs"
   formData.value.tabs.forEach((tab, index) => {
      dataToSubmit.append(`tab_${index}_paragraph`, tab.paragraph);
      dataToSubmit.append(`tab_${index}_quote`, tab.quote || '');
      dataToSubmit.append(`tab_${index}_list`, tab.list || '');
      dataToSubmit.append(`tab_${index}_footer`, tab.footer || '');
      dataToSubmit.append(`tab_${index}_alt`, tab.alt);
      dataToSubmit.append(`tab_${index}_caption`, tab.caption);
      // ✅ CORRECCIÓN: Enviar URL existente si no hay archivo nuevo
      if (imageFiles.tabs[index]) {
          dataToSubmit.append(`tab_${index}_image`, imageFiles.tabs[index]);
      } else if (tab.imageUrl) {
          dataToSubmit.append(`tab_${index}_existing_url`, tab.imageUrl);
      }
  });

  // 5. Adjuntar datos de "Community"
  dataToSubmit.append('community_title', formData.value.community.title);
  dataToSubmit.append('community_paragraph', formData.value.community.paragraph);
  dataToSubmit.append('community_btnText', formData.value.community.btnText);
  dataToSubmit.append('community_link', formData.value.community.link);

  // 6. Adjuntar datos de "Social"
  dataToSubmit.append('social_insta', formData.value.social.insta);
  dataToSubmit.append('social_tiktok', formData.value.social.tiktok);
  dataToSubmit.append('social_facebook', formData.value.social.facebook);

  // 7. Adjuntar datos de "Galería"
  dataToSubmit.append('gallery_item_count', formData.value.gallery.length);
  formData.value.gallery.forEach((item, index) => {
      dataToSubmit.append(`gallery_${index}_alt`, item.alt);
      // ✅ CORRECCIÓN: Enviar URL existente si no hay archivo nuevo
      if (imageFiles.gallery[index]) {
          dataToSubmit.append(`gallery_${index}_image`, imageFiles.gallery[index]);
      } else if (item.imageUrl) {
          dataToSubmit.append(`gallery_${index}_existing_url`, item.imageUrl);
      }
  });

  try {
    const response = await axios.put('/api/admin/aboutus', dataToSubmit, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const updatedData = response.data;

    // Actualizar datos locales con la respuesta del servidor
    if (updatedData.hero) formData.value.hero = updatedData.hero;
    if (updatedData.about) formData.value.about = updatedData.about;
    if (updatedData.community) formData.value.community = updatedData.community;
    if (updatedData.social) formData.value.social = updatedData.social;
    
    if (updatedData.heroCards && updatedData.heroCards.length === 3) {
      formData.value.heroCards = updatedData.heroCards;
      imagePreviews.heroCards[0] = updatedData.heroCards[0]?.imageUrl;
      imagePreviews.heroCards[1] = updatedData.heroCards[1]?.imageUrl;
      imagePreviews.heroCards[2] = updatedData.heroCards[2]?.imageUrl;
    }
    if (updatedData.tabs && updatedData.tabs.length === 3) {
      formData.value.tabs = updatedData.tabs;
      imagePreviews.tabs[0] = updatedData.tabs[0]?.imageUrl;
      imagePreviews.tabs[1] = updatedData.tabs[1]?.imageUrl;
      imagePreviews.tabs[2] = updatedData.tabs[2]?.imageUrl;
    }

    if (updatedData.gallery && Array.isArray(updatedData.gallery)) {
      formData.value.gallery = updatedData.gallery;
      imagePreviews.gallery = updatedData.gallery.map(item => item.imageUrl || null);
      imageFiles.gallery = Array(updatedData.gallery.length).fill(null);
    } else {
      formData.value.gallery = [];
      imagePreviews.gallery = [];
      imageFiles.gallery = [];
    }

    success.value = "¡Página 'Nosotros' actualizada con éxito!";
    // Limpiar archivos seleccionados
    imageFiles.heroCards.fill(null);
    imageFiles.tabs.fill(null);
    imageFiles.gallery.fill(null);

    setTimeout(() => { success.value = null; }, 4000);

  } catch (err) {
    console.error("Error al guardar 'Nosotros':", err);
    error.value = "Error al guardar: " + (err.response?.data?.detail || err.message);
    setTimeout(() => { error.value = null; }, 6000);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
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