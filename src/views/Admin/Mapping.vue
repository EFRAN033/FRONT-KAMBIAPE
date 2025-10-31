<template>
    <div class="my-5 mx-auto max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md text-center">
      
      <h3 class="text-2xl font-bold text-gray-800">
        Componente con Tailwind
      </h3>
      
      <p class="text-xl text-gray-600 my-4">
        El valor actual es: <span class="font-mono font-semibold">{{ contador }}</span>
      </p>
      
      <button 
        @click="incrementar"
        class="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      >
        Incrementar
      </button>
  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const contador = ref(0);
  
  const incrementar = () => {
    contador.value++;
  };
  </script>