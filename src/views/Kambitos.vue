<template>
    <div class="relative min-h-screen bg-slate-100 dark:bg-slate-900 font-sans antialiased overflow-hidden" @mousemove="handleMouseMove">
        
        <div class="background-grid"></div>
        <div ref="shape1" class="background-arc"></div>
        <div ref="shape2" class="background-shape shape-2"></div>
        <div ref="shape3" class="background-shape shape-3"></div>
        <div ref="shape4" class="background-shape shape-4"></div>

        <Header />

        <main class="relative z-10 flex items-center justify-center min-h-screen py-12 sm:py-20">
            <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                <div class="store-layout">
                    
                    <div class="avatar-stage">
                        <transition name="avatar-swap" mode="out-in">
                            <img :src="currentAvatar" :key="currentAvatar" alt="Kambito Avatar" class="avatar-image"/>
                        </transition>
                        <div class="avatar-platform"></div>
                    </div>

                    <div class="selection-stage">
                        <div class="balance-display">
                            <span class="text-slate-500 dark:text-slate-400">Tu Saldo</span>
                            <div class="flex items-center gap-2 justify-center lg:justify-start">
                                <img :src="MonedaSVG" alt="Moneda" class="inline-h-6 w-6 mr-1" />
                                <span class="text-2xl font-black text-slate-800 dark:text-white">{{ userCredits }}</span>
                                <span class="font-lobster text-xl text-[#d7037b]">Kambitos</span>
                            </div>
                        </div>

                        <div class="plan-selector">
                            <h2 
                                v-for="plan in plans" 
                                :key="plan.name"
                                @click="selectPlan(plan)"
                                :class="['plan-name', {'active': selectedPlan.name === plan.name}]">
                                {{ plan.name }}
                            </h2>
                        </div>

                        <transition name="details-fade" mode="out-in">
                           <div class="details-flow" :key="selectedPlan.name">
                                <p class="price-display">{{ selectedPlan.price }}</p>
                                <div class="flex items-center justify-center text-slate-600 dark:text-slate-400 text-base mb-6">
                                    Recibe 
                                    <img :src="MonedaSVG" alt="Moneda" class="inline-h-8 w-8 mx-2" />
                                    <span class="font-bold text-lg text-[#d7037b]">{{ selectedPlan.amount }} Kambitos</span>
                                </div>
                                <button @click="purchaseCredits(selectedPlan.name, selectedPlan.amount)" class="purchase-button">
                                    Comprar Paquete
                                </button>
                           </div>
                        </transition>

                        <div class="benefits-grid">
                            <div class="benefit-item">
                                <svg class="benefit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                <span class="benefit-text">Compra Segura</span>
                            </div>
                            <div class="benefit-item">
                                <svg class="benefit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                <span class="benefit-text">Entrega Rápida</span>
                            </div>
                             <div class="benefit-item">
                                <svg class="benefit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span class="benefit-text">Soporte 24/7</span>
                            </div>
                        </div>

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
import Footer from './Footer.vue'; // Importación del Footer

import MonedaSVG from '@/assets/imagenes/Moneda.svg';

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

// --- Lógica para el efecto Parallax ---
const shape1 = ref(null);
const shape2 = ref(null);
const shape3 = ref(null);
const shape4 = ref(null);

function handleMouseMove(event) {
    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth - 0.5);
    const y = (clientY / window.innerHeight - 0.5);

    if (shape1.value) shape1.value.style.transform = `translateX(${x * -40}px) translateY(${y * -40}px) rotate(-15deg) scale(1.2)`;
    if (shape2.value) shape2.value.style.transform = `translateX(${x * 60}px) translateY(${y * 60}px) rotate(20deg)`;
    if (shape3.value) shape3.value.style.transform = `translateX(${x * -25}px) translateY(${y * -25}px) rotate(-5deg)`;
    if (shape4.value) shape4.value.style.transform = `translateX(${x * 35}px) translateY(${y * -35}px) rotate(10deg)`;
}
</script>

<style scoped>
/* --- Fondo y Elementos Decorativos --- */
.background-grid {
    position: absolute; inset: 0; width: 100%; height: 100%;
    background-image:
        linear-gradient(to right, #e5e7eb 1px, transparent 1px),
        linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
    background-size: 40px 40px; opacity: 0.5;
}
.dark .background-grid {
    background-image:
        linear-gradient(to right, #374151 1px, transparent 1px),
        linear-gradient(to bottom, #374151 1px, transparent 1px);
}

.background-arc {
    position: absolute; top: -25vh; left: -20vw; width: 140vw; height: 150vh;
    background: radial-gradient(circle at top left, #fce7f3, #fbcfe8, #f9a8d4);
    border-radius: 50%; z-index: 0; opacity: 0.5;
    transform: rotate(-15deg) scale(1.2);
    transition: transform 0.2s linear;
}
.dark .background-arc {
    background: radial-gradient(circle at top left, #2e101e, #3d1429, #5c1e3d);
}

.background-shape {
    position: absolute; border-radius: 50%; z-index: 0; opacity: 0.2;
    transition: transform 0.2s linear;
}
.shape-2 { width: 200px; height: 200px; bottom: 5vh; right: 5vw; background: #a5b4fc; }
.shape-3 { width: 100px; height: 100px; top: 15vh; right: 15vw; background: #fca5a5; }
.shape-4 { width: 120px; height: 120px; top: 60vh; left: 5vw; background: #67e8f9; }

.dark .shape-2 { background: #312e81; }
.dark .shape-3 { background: #7f1d1d; }
.dark .shape-4 { background: #0e7490; }

/* --- Layout Principal --- */
.store-layout {
    @apply grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center;
}

/* --- Escenario del Avatar (Izquierda) --- */
.avatar-stage {
    @apply relative flex items-center justify-center h-[70vh] z-10;
}
.avatar-image {
    @apply max-w-full h-auto max-h-[80%] object-contain relative z-10; /* Reducido para dar espacio a la plataforma */
    filter: drop-shadow(0 30px 40px rgba(0,0,0,0.2));
}

/* Plataforma del avatar */
.avatar-platform {
    @apply absolute bottom-0 w-[60%] h-24 rounded-[50%] z-0;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5), transparent 70%);
    filter: blur(15px);
    transform: perspective(300px) rotateX(75deg);
}
.dark .avatar-platform {
     background: radial-gradient(ellipse at center, rgba(215, 3, 123, 0.3), transparent 70%);
}


/* --- Selección y Detalles (Derecha) --- */
.selection-stage {
    @apply flex flex-col items-center lg:items-start h-full p-6 rounded-2xl text-center lg:text-left;
    @apply bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/30 dark:border-slate-700;
}

.balance-display {
    @apply text-base font-medium mb-6 w-full pb-4 border-b border-slate-200 dark:border-slate-700;
    @apply flex flex-col items-center lg:items-start;
}

.plan-selector {
    @apply w-full flex flex-col items-center lg:items-start gap-3;
}

.plan-name {
    @apply text-5xl md:text-6xl font-extrabold text-transparent cursor-pointer transition-all duration-300 relative;
    -webkit-text-stroke: 2px #d1d5db;
}
.dark .plan-name { -webkit-text-stroke: 2px #4b5563; }
.plan-name:hover { -webkit-text-stroke: 2px #be185d; }
.plan-name.active {
    @apply text-[#d7037b];
    -webkit-text-stroke: 2px transparent;
}

.details-flow {
    @apply mt-auto pt-6 w-full flex flex-col items-center lg:items-start;
}

.price-display {
    @apply text-6xl md:text-7xl font-black text-slate-800 dark:text-white mb-2;
}

@keyframes pulse-glow {
    0%, 100% { box-shadow: 0 8px 25px -8px rgba(215, 3, 123, 0.7); }
    50% { box-shadow: 0 10px 40px -8px rgba(215, 3, 123, 1); }
}

.purchase-button {
    @apply w-full bg-[#d7037b] text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300;
    animation: pulse-glow 3s infinite ease-in-out;
}
.purchase-button:hover {
    @apply bg-pink-700;
    transform: scale(1.03) translateY(-1px);
    animation-play-state: paused;
}

/* --- Sección de Beneficios --- */
.benefits-grid {
    @apply w-full grid grid-cols-3 gap-4 mt-auto pt-6 border-t border-slate-200 dark:border-slate-700;
}
.benefit-item {
    @apply flex flex-col items-center gap-2 text-center;
}
.benefit-icon {
    @apply w-8 h-8 text-[#d7037b] opacity-80;
}
.benefit-text {
    @apply text-xs text-slate-600 dark:text-slate-300 font-medium;
}


/* --- Transiciones --- */
.details-fade-enter-active, .details-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.details-fade-enter-from, .details-fade-leave-to {
    opacity: 0; transform: translateY(15px);
}
.avatar-swap-enter-active {
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease;
}
.avatar-swap-leave-active {
     transition: transform 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.2s ease;
}
.avatar-swap-enter-from {
    transform: scale(0.6) translateY(80px); opacity: 0;
}
.avatar-swap-leave-to {
    transform: scale(0.9); opacity: 0;
}
</style>