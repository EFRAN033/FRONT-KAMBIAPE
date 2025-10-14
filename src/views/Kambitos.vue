<template>
    <div class="min-h-screen bg-gray-50 dark:bg-slate-900 font-sans antialiased">
      <Header />
  
      <main class="py-12 sm:py-16">
        <div class="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
  
          <div class="relative mb-12 sm:mb-16">
              <button @click="$router.go(-1)" class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors dark:text-slate-400 dark:hover:text-slate-200" aria-label="Volver">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 010 1.06L9.06 10l3.73 3.71a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z" clip-rule="evenodd" />
                  </svg>
                  Atrás
              </button>
              <h1 class="text-center text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Tienda de Kambitos
              </h1>
          </div>
  
          <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
  
              <div class="text-center lg:text-left">
                  <h2 class="text-2xl font-bold text-[#d7037b] sm:text-3xl">Un Kambito, una Publicación.</h2>
                  <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
                      Así de simple. Cada Kambito que adquieres te permite destacar un producto en la plataforma, asegurando que más personas lo vean.
                  </p>
  
                  <div class="mt-8 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Publicaciones que puedes realizar ahora:</p>
                      <div class="mt-2 flex items-center justify-center lg:justify-start gap-4">
                          <span class="text-6xl font-black text-slate-800 dark:text-white tracking-tight">{{ userCredits }}</span>
                          <span class="text-2xl font-lobster text-[#d7037b]">Kambitos</span>
                      </div>
                  </div>
              </div>
  
              <div>
                  <div class="space-y-4">
  
                      <button @click="purchaseCredits('Básico', 2)" class="w-full text-left group">
                        <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-5 transition-all duration-300 group-hover:border-[#d7037b] group-hover:shadow-lg group-hover:scale-[1.02]">
                            <div class="bg-pink-100 dark:bg-pink-900/50 text-[#d7037b] p-3 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3 class="font-bold text-slate-800 dark:text-white text-lg">Paquete Básico</h3>
                                <p class="text-slate-500 dark:text-slate-400 text-sm">Compra <span class="font-semibold text-[#d7037b]">2 Kambitos</span></p>
                            </div>
                            <div class="text-right">
                                <p class="font-extrabold text-slate-900 dark:text-white text-xl">S/ 1.00</p>
                            </div>
                        </div>
                      </button>
  
                      <button @click="purchaseCredits('Popular', 5)" class="w-full text-left group relative">
                         <div class="absolute -top-3 left-1/2 -translate-x-1/2">
                            <div class="bg-[#d7037b] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Popular</div>
                         </div>
                        <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border-2 border-[#d7037b] flex items-center gap-5 transition-all duration-300 shadow-pink-500/10 shadow-lg scale-[1.02] group-hover:scale-[1.04]">
                            <div class="bg-pink-100 dark:bg-pink-900/50 text-[#d7037b] p-3 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                             <div class="flex-1">
                                <h3 class="font-bold text-slate-800 dark:text-white text-lg">Paquete Popular</h3>
                                <p class="text-slate-500 dark:text-slate-400 text-sm">Compra <span class="font-semibold text-[#d7037b]">5 Kambitos</span></p>
                            </div>
                            <div class="text-right">
                                <p class="font-extrabold text-slate-900 dark:text-white text-xl">S/ 2.00</p>
                            </div>
                        </div>
                      </button>
  
                      <button @click="purchaseCredits('Pro', 15)" class="w-full text-left group">
                        <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-5 transition-all duration-300 group-hover:border-[#d7037b] group-hover:shadow-lg group-hover:scale-[1.02]">
                            <div class="bg-pink-100 dark:bg-pink-900/50 text-[#d7037b] p-3 rounded-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </div>
                             <div class="flex-1">
                                <h3 class="font-bold text-slate-800 dark:text-white text-lg">Paquete Pro</h3>
                                <p class="text-slate-500 dark:text-slate-400 text-sm">Compra <span class="font-semibold text-[#d7037b]">10 Kambitos</span></p>
                            </div>
                            <div class="text-right">
                                <p class="font-extrabold text-slate-900 dark:text-white text-xl">S/ 5.00</p>
                            </div>
                        </div>
                      </button>
  
                  </div>
              </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useUserStore } from '@/stores/user';
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  
  // Usar el store de usuario
  const userStore = useUserStore();
  
  // Propiedad computada para acceder a los créditos fácilmente
  // Se asegura de que si no hay créditos, se muestre 0.
  const userCredits = computed(() => userStore.userCredits || 0);
  
  // Lógica para manejar la compra de créditos
  function purchaseCredits(packageName, amount) {
    // Lógica de la pasarela de pago iría aquí.
    console.log(`Iniciando compra para: ${packageName} (${amount} Kambitos)`);
    alert(`Funcionalidad de compra para "${packageName}" aún no implementada.`);
  }
  </script>