<template>
    <div class="min-h-screen bg-slate-100 dark:bg-slate-900 font-sans antialiased">
        <Header />

        <main class="py-16 sm:py-24">
            <div class="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">

                <div class="text-center mb-10">
                    <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Tienda de Kambitos
                    </h1>
                    <p class="mt-4 text-lg max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
                        Elige un paquete, potencia tus publicaciones y llega a más personas.
                    </p>
                </div>

                <div class="purchase-container">
                    <div class="selection-panel">
                        <div class="balance-display">
                            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Tu Saldo</p>
                            <div class="flex items-baseline gap-2">
                                <span class="text-3xl font-black text-slate-800 dark:text-white">{{userCredits}}</span>
                                <span class="text-xl font-lobster text-[#d7037b]">Kambitos</span>
                            </div>
                        </div>
                        <div class="plans-list">
                            <button 
                                v-for="plan in plans" 
                                :key="plan.name" 
                                @click="selectPlan(plan)"
                                :class="['plan-item', { 'active': selectedPlan.name === plan.name }]">
                                <div class="flex-1 text-left">
                                    <h4 class="font-bold text-slate-800 dark:text-white text-base">{{ plan.name }}</h4>
                                    <p class="text-sm text-slate-500 dark:text-slate-400">{{ plan.amount }} Kambitos</p>
                                </div>
                                <span class="text-lg font-bold text-[#d7037b]">{{ plan.price }}</span>
                            </button>
                        </div>
                    </div>

                    <div class="display-panel">
                        <div class="avatar-stage">
                            <transition name="avatar-fade" mode="out-in">
                                <img :src="currentAvatar" :key="currentAvatar" alt="Kambito Avatar" class="avatar-image"/>
                            </transition>
                        </div>
                         <transition name="fade" mode="out-in">
                            <div :key="selectedPlan.name" class="w-full text-center">
                                <h3 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Paquete {{ selectedPlan.name }}</h3>
                                <p class="text-slate-500 dark:text-slate-400">Recibirás <span class="font-bold text-[#d7037b]">{{ selectedPlan.amount }} Kambitos</span> para destacar lo que quieras.</p>
                                <button @click="purchaseCredits(selectedPlan.name, selectedPlan.amount)" class="purchase-button">
                                    Comprar por {{ selectedPlan.price }}
                                </button>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import Header from './Header.vue';
import Footer from './Footer.vue';

import avatarBasico from '@/assets/imagenes/gif/Animacion_Mesa de trabajo 1-01.png';
import avatarPopular from '@/assets/imagenes/gif/Animacion_Mesa de trabajo 1-02.png';
import avatarPro from '@/assets/imagenes/gif/Animacion_Mesa de trabajo 1-03.png';

const userStore = useUserStore();
const userCredits = computed(() => userStore.userCredits || 0);

const plans = [
    { name: 'Básico', amount: 2, price: 'S/ 1.00', avatar: avatarBasico },
    { name: 'Popular', amount: 5, price: 'S/ 2.00', avatar: avatarPopular },
    { name: 'Pro', amount: 10, price: 'S/ 5.00', avatar: avatarPro }
];

const selectedPlan = ref(plans[1]);

function selectPlan(plan) {
    selectedPlan.value = plan;
}

const currentAvatar = computed(() => selectedPlan.value.avatar);

function purchaseCredits(packageName, amount) {
    console.log(`Iniciando compra para: ${packageName} (${amount} Kambitos)`);
    alert(`Funcionalidad de compra para "${packageName}" aún no implementada.`);
}
</script>

<style scoped>
.purchase-container {
    @apply grid grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700;
}

/* Panel Izquierdo */
.selection-panel {
    @apply p-6 flex flex-col;
}
.balance-display {
    @apply p-4 bg-slate-100 dark:bg-slate-900/50 rounded-xl mb-4 text-center;
}
.plans-list {
    @apply space-y-3;
}
.plan-item {
    @apply w-full flex items-center gap-4 p-4 rounded-xl border-2 border-transparent transition-all duration-300;
    @apply bg-slate-50 dark:bg-slate-700/50;
}
.plan-item:hover {
    @apply bg-slate-100 dark:bg-slate-700;
}
.plan-item.active {
    @apply border-[#d7037b] ring-2 ring-pink-200 dark:ring-pink-800/50;
}

/* Panel Derecho */
.display-panel {
    @apply bg-slate-50 dark:bg-slate-800/50 p-8 flex flex-col items-center justify-center gap-6 rounded-r-3xl;
}
.avatar-stage {
    @apply w-full h-64 flex items-center justify-center mb-4;
}
.avatar-image {
    @apply max-w-full h-auto max-h-60 object-contain;
}
.purchase-button {
    @apply w-full mt-6 bg-[#d7037b] text-white font-bold py-3.5 px-6 rounded-xl text-base transition-all duration-300;
    @apply hover:bg-pink-700 transform hover:scale-105 shadow-lg shadow-pink-500/20;
}

/* Transiciones */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
.avatar-fade-enter-active,
.avatar-fade-leave-active {
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
}
.avatar-fade-enter-from {
    transform: scale(0.7);
    opacity: 0;
}
.avatar-fade-leave-to {
    opacity: 0;
}
</style>