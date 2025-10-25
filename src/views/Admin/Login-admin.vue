<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
      <h2 class="text-2xl font-bold text-center">Login de Administrador</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            v-model="email"
            type="email" 
            id="email" 
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input 
            v-model="password"
            type="password" 
            id="password" 
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div v-if="error" class="text-sm text-red-600">
          {{ error }}
        </div>
        
        <button 
          type="submit" 
          :disabled="loading"
          class="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'; // <-- Importa tu store de Pinia
import axios from '@/axios'; // <-- Importa tu instancia de axios

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);

const handleLogin = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // 1. Llama a tu endpoint de login en el backend
    const response = await axios.post('/api/admin/login', {
      email: email.value,
      password: password.value,
    });
    
    // 2. Guarda el token en tu store de Pinia (o donde lo manejes)
    // --- ¡CORRECCIÓN APLICADA AQUÍ! ---
    userStore.setToken(response.data.access_token); // <-- Se usa access_token
    userStore.setUser(response.data.user); // Opcional
    
    // 3. Redirige al Dashboard
    router.push('/admin/dashboard');

  } catch (err) {
    console.error('Error de login:', err);
    // Asigna un mensaje de error más específico si el backend lo envía
    if (err.response && err.response.data && err.response.data.detail) {
      error.value = err.response.data.detail;
    } else {
      error.value = 'Email o contraseña incorrectos.';
    }
  } finally {
    loading.value = false;
  }
};
</script>