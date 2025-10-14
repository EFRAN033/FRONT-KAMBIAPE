<template>
    <div class="bg-gray-50 dark:bg-slate-900 min-h-screen py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
          <h1 class="text-4xl font-extrabold text-[#d7037b] tracking-tight sm:text-5xl font-lobster">
            Mis Kambitos
          </h1>
          <p class="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Gestiona tus créditos para destacar tus publicaciones y realizar más intercambios.
          </p>
        </div>
  
        <div class="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden mb-12 border border-slate-200 dark:border-slate-700">
          <div class="p-8">
            <div class="flex justify-between items-center">
              <p class="text-lg font-medium text-slate-500 dark:text-slate-400">Balance Actual</p>
              <svg class="h-8 w-8 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.433 7.418c.158-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-1.134 0V7.418zM11.567 7.151c.22.07.408.164.567.267v1.698a2.5 2.5 0 00-1.134 0V7.151z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.5 4.5 0 00-1.879 3.487c-.024.143-.024.287 0 .431.133.791.436 1.53.86 2.185.341.52.768.963 1.228 1.328V15a1 1 0 102 0v-2.083c.46-.365.887-.808 1.228-1.328.424-.655.727-1.394.86-2.185.024-.144.024-.288 0-.431A4.5 4.5 0 0011 5.092V5z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="mt-4 text-5xl font-bold text-slate-800 dark:text-white tracking-tight">
              {{ userCredits }}
            </div>
          </div>
        </div>
  
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-slate-800 dark:text-white">¿Necesitas más Kambitos?</h2>
          <p class="mt-2 text-slate-600 dark:text-slate-400">Elige uno de nuestros paquetes</p>
        </div>
  
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 text-center border border-slate-200 dark:border-slate-700 flex flex-col">
            <h3 class="text-xl font-semibold text-slate-800 dark:text-white">Paquete Básico</h3>
            <p class="text-4xl font-bold text-[#d7037b] my-4">100 <span class="text-lg font-medium">Kambitos</span></p>
            <p class="text-2xl font-semibold text-slate-600 dark:text-slate-300 mb-6">S/ 5.00</p>
            <button class="mt-auto w-full bg-pink-100 text-[#d7037b] font-semibold py-3 rounded-lg hover:bg-pink-200 transition-colors">
              Comprar ahora
            </button>
          </div>
  
          <div class="bg-gradient-to-br from-[#d7037b] to-[#b80268] rounded-2xl shadow-xl p-6 text-center text-white ring-4 ring-pink-300/50 flex flex-col">
            <h3 class="text-xl font-semibold">Paquete Popular</h3>
            <p class="text-4xl font-bold my-4">550 <span class="text-lg font-medium">Kambitos</span></p>
            <p class="text-2xl font-semibold mb-6">S/ 25.00</p>
            <button class="mt-auto w-full bg-white text-[#d7037b] font-semibold py-3 rounded-lg hover:bg-pink-50 transition-colors">
              Comprar ahora
            </button>
          </div>
  
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 text-center border border-slate-200 dark:border-slate-700 flex flex-col">
            <h3 class="text-xl font-semibold text-slate-800 dark:text-white">Paquete Pro</h3>
            <p class="text-4xl font-bold text-[#d7037b] my-4">1200 <span class="text-lg font-medium">Kambitos</span></p>
            <p class="text-2xl font-semibold text-slate-600 dark:text-slate-300 mb-6">S/ 50.00</p>
            <button class="mt-auto w-full bg-pink-100 text-[#d7037b] font-semibold py-3 rounded-lg hover:bg-pink-200 transition-colors">
              Comprar ahora
            </button>
          </div>
        </div>
        
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useUserStore } from '@/stores/user';
  
  // Usar el store de usuario
  const userStore = useUserStore();
  
  // Crear una propiedad computada para acceder a los créditos fácilmente
  const userCredits = computed(() => userStore.userCredits);
  
  // Aquí podrías agregar la lógica para manejar la compra de créditos
  // por ejemplo, una función que se conecte con una pasarela de pago.
  
  </script>
  
  <style scoped>
  /* Puedes agregar estilos adicionales aquí si es necesario */
  </style>