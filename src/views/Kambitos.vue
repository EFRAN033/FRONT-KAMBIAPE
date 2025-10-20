<template>
    <div class="relative min-h-screen bg-slate-100 dark:bg-slate-900 font-sans antialiased overflow-hidden flex flex-col" @mousemove="handleMouseMove">
        
        <div class="background-grid"></div>
        <div ref="shape1" class="background-arc"></div>
        <div ref="shape2" class="background-shape shape-2"></div>
        <div ref="shape3" class="background-shape shape-3"></div>
        <div ref="shape4" class="background-shape shape-4"></div>

        <Header />

        <main class="relative z-10 flex-grow flex items-center justify-center py-6 sm:py-12">
            <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                <div class="store-layout">
                    
                    <div class="branding-stage">
                        
                        <div class="hide-on-mobile">
                            <div class="avatar-container">
                                <transition name="avatar-swap" mode="out-in">
                                    <img :src="currentAvatar" :key="currentAvatar" alt="Kambito Avatar" class="avatar-image"/>
                                </transition>
                                <div class="avatar-platform"></div>
                            </div>
                        </div>

                        <div class="branding-text-desktop">
                           <transition name="details-fade" mode="out-in">
                               <div :key="selectedPlan.name" class="min-h-[100px]">
                                   <h1 class="main-headline">
                                        {{ selectedPlan.headline }}
                                    </h1>
                                   <p class="sub-headline">
                                        {{ selectedPlan.subHeadline }}
                                    </p>
                               </div>
                           </transition>
                        </div>
                    </div>

                    <div class="selection-stage">
                        <div class="branding-text-mobile">
                           <transition name="details-fade" mode="out-in">
                               <div :key="selectedPlan.name">
                                   <h1 class="main-headline-mobile">
                                        {{ selectedPlan.headline }}
                                    </h1>
                                   <p class="sub-headline-mobile">
                                        {{ selectedPlan.subHeadline }}
                                    </p>
                               </div>
                           </transition>
                        </div>
                        
                        <div class="balance-display">
                            <div v-if="userCredits === 0" class="no-kambitos-warning">
                                Es el momento perfecto para empezar a construir.
                            </div>
                            <span class="text-slate-500 dark:text-slate-400">Tu Saldo</span>
                            <div class="flex items-center gap-2 justify-center lg:justify-start">
                                <img :src="MonedaSVG" alt="Moneda" class="inline-h-6 w-6 mr-1" />
                                <span class="text-2xl font-black text-slate-800 dark:text-white">{{ userCredits }}</span>
                                <span class="font-lobster text-xl text-[#d7037b]">Kambitos</span>
                            </div>
                        </div>

                        <div class="kambito-charger">
                            <div class="coin-vessel" :class="{ 'plan-selected-animation': playAnimation }">
                                <div class="liquid" :style="liquidStyle"></div>
                                <div class="coin-overlay">
                                    <svg class="coin-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <radialGradient id="shine-gradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                                                <stop offset="0%" style="stop-color:rgba(255,255,255,0.4); stop-opacity:1" />
                                                <stop offset="100%" style="stop-color:rgba(255,255,255,0); stop-opacity:0" />
                                            </radialGradient>
                                             <linearGradient id="gleam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stop-color="rgba(255,255,255,0)" />
                                                <stop offset="40%" stop-color="rgba(255,255,255,0)" />
                                                <stop offset="50%" stop-color="rgba(255,255,255,0.5)" />
                                                <stop offset="60%" stop-color="rgba(255,255,255,0)" />
                                                <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                                            </linearGradient>
                                        </defs>
                                        <circle cx="50" cy="50" r="48" fill="transparent" stroke="#FFF" stroke-width="2.5" opacity="0.2"/>
                                        <circle cx="50" cy="50" r="44" fill="transparent" stroke="#FFF" stroke-width="1" opacity="0.1"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" fill="white" d="M38 30 H44 V48.5 L59 30 L65 33 L49 50 L65 67 L59 70 L44 51.5 V70 H38 V30 Z" />
                                        <circle cx="50" cy="50" r="48" fill="url(#shine-gradient)" />
                                        <rect width="150" height="150" fill="url(#gleam-gradient)" class="gleam-animation" transform="translate(-25, -25) rotate(-45)"/>
                                    </svg>
                                </div>
                            </div>
                             <div class="labels">
                                <button v-for="plan in plans" 
                                      :key="plan.name"
                                      @click="selectPlan(plan)"
                                      class="label-button"
                                      :class="{'active': selectedPlan.name === plan.name}">
                                    <span>{{ plan.name }}</span>
                                    <div class="active-indicator"></div>
                                </button>
                            </div>
                        </div>

                        <transition name="details-fade" mode="out-in">
                           <div class="details-flow" :key="selectedPlan.name">
                                <p class="price-display">{{ selectedPlan.price }}</p>
                                <p class="plan-tagline">{{ selectedPlan.tagline }}</p>
                                <div class="flex items-center justify-center lg:justify-start text-slate-600 dark:text-slate-400 text-base mb-6">
                                    Obtienes
                                    <img :src="MonedaSVG" alt="Moneda" class="inline-h-8 w-8 mx-2" />
                                    <span class="font-bold text-lg text-[#d7037b]">{{ selectedPlan.amount }} Kambitos</span>
                                </div>
                                <button @click="purchaseCredits(selectedPlan.name)" class="purchase-button">
                                    Cargar Kambitos
                                </button>
                           </div>
                        </transition>
                    </div>
                </div>
            </div>
        </main>
        
        <div class="relative z-10">
            <Footer />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import Header from './Header.vue';
import Footer from './Footer.vue';
import MonedaSVG from '@/assets/imagenes/Moneda.svg';
import avatarBasico from '@/assets/imagenes/gif/Animacion_Mesa de trabajo 1-01.png';
import avatarPopular from '@/assets/imagenes/gif/Animacion_Mesa de trabajo 1-02.png';
import avatarPro from '@/assets/imagenes/gif/Animacion_Mesa de trabajo 1-03.png';

const userStore = useUserStore();
const userCredits = computed(() => userStore.userCredits || 0);

const plans = [
    { name: 'Básico', amount: 2, price: 'S/ 1.00', priceValue: 1.00, avatar: avatarBasico, tagline: 'Para empezar a destacar.', headline: 'Toma la Delantera.', subHeadline: 'Un pequeño paso para ti, un gran salto para tu cuenta. Empieza a diferenciarte.', fillLevel: '33%', liquidColor: 'hsl(190, 80%, 60%)' },
    { name: 'Popular', amount: 5, price: 'S/ 2.00', priceValue: 2.00, avatar: avatarPopular, tagline: 'La elección inteligente.', headline: 'Conviértete en el Favorito.', subHeadline: 'Atrae más miradas y genera más confianza. Consigue los mejores intercambios.', fillLevel: '66%', liquidColor: 'hsl(250, 80%, 70%)' },
    { name: 'Pro', amount: 10, price: 'S/ 5.00', priceValue: 5.00, avatar: avatarPro, tagline: 'Juega en otro nivel.', headline: 'Sé el Número Uno.', subHeadline: 'Llega a la cima y conviértete en un referente. Es para los que quieren ganar en grande.', fillLevel: '100%', liquidColor: 'hsl(320, 80%, 65%)' }
];

const selectedPlan = ref(plans[1]);
const playAnimation = ref(false);

function selectPlan(plan) {
    if (selectedPlan.value.name === plan.name) return;
    selectedPlan.value = plan;
    playAnimation.value = true;
    setTimeout(() => { playAnimation.value = false; }, 700);
}

const currentAvatar = computed(() => selectedPlan.value.avatar);

const liquidStyle = computed(() => ({
    '--liquid-height': selectedPlan.value.fillLevel,
    '--liquid-color': selectedPlan.value.liquidColor,
    '--liquid-shadow-color': selectedPlan.value.liquidColor,
}));

async function purchaseCredits(planName) {
    // 1. Encuentra el plan completo para obtener todos sus datos
    const plan = plans.find(p => p.name === planName);
    if (!plan) {
        console.error('Plan no encontrado');
        alert('Ha ocurrido un error al seleccionar el plan. Por favor, intenta de nuevo.');
        return;
    }

    // 2. Obtiene el token de autenticación del usuario desde el store de Pinia
    const token = userStore.token;
    if (!token) {
        alert('Debes iniciar sesión para poder comprar créditos.');
        // Opcional: Redirigir al login
        // router.push('/login');
        return;
    }
    
    console.log(`Iniciando compra para: ${plan.name} (${plan.amount} Kambitos por S/${plan.priceValue})`);

    try {
        // 3. Llama a tu backend para crear la preferencia de pago
        const response = await fetch('http://localhost:8000/payment/create_preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // ¡Muy importante para la autenticación!
            },
            body: JSON.stringify({
                quantity: plan.amount,
                unit_price: plan.priceValue, // Usamos el valor numérico
                title: `Compra de ${plan.amount} Kambitos`
            })
        });

        const responseData = await response.json();

        // 4. Si la respuesta no es exitosa, muestra un error
        if (!response.ok) {
            // Intenta mostrar el error específico del backend si está disponible
            const errorDetail = responseData.detail || 'No se pudo iniciar el proceso de pago.';
            throw new Error(errorDetail);
        }

        // 5. Si todo sale bien, redirige al usuario a la pasarela de Mercado Pago
        window.location.href = responseData.init_point;

    } catch (error) {
        console.error('Hubo un problema con la compra:', error);
        alert(`Error al procesar la compra: ${error.message}`);
    }
}

const shape1 = ref(null);
const shape2 = ref(null);
const shape3 = ref(null);
const shape4 = ref(null);

function handleMouseMove(event) {
    if (window.innerWidth < 1024) return;
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
/* --- ESTILOS GENERALES Y DE ESCRITORIO --- */

/* Fondos decorativos */
.background-grid { position: absolute; inset: 0; width: 100%; height: 100%; background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px); background-size: 40px 40px; opacity: 0.5; }
.dark .background-grid { background-image: linear-gradient(to right, #374151 1px, transparent 1px), linear-gradient(to bottom, #374151 1px, transparent 1px); }
.background-arc { position: absolute; top: -25vh; left: -20vw; width: 140vw; height: 150vh; background: radial-gradient(circle at top left, #fce7f3, #fbcfe8, #f9a8d4); border-radius: 50%; z-index: 0; opacity: 0.5; transform: rotate(-15deg) scale(1.2); transition: transform 0.2s linear; }
.dark .background-arc { background: radial-gradient(circle at top left, #2e101e, #3d1429, #5c1e3d); }
.background-shape { position: absolute; border-radius: 50%; z-index: 0; opacity: 0.2; transition: transform 0.2s linear; }
.shape-2 { width: 200px; height: 200px; bottom: 5vh; right: 5vw; background: #a5b4fc; } .shape-3 { width: 100px; height: 100px; top: 15vh; right: 15vw; background: #fca5a5; } .shape-4 { width: 120px; height: 120px; top: 60vh; left: 5vw; background: #67e8f9; }
.dark .shape-2 { background: #312e81; } .dark .shape-3 { background: #7f1d1d; } .dark .shape-4 { background: #0e7490; }

/* Layout principal */
.store-layout { @apply grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center; }
.branding-stage { @apply relative flex flex-col items-center justify-center h-full z-10; }
.selection-stage { @apply relative flex flex-col items-center lg:items-start h-full p-4 sm:p-6 rounded-2xl text-center lg:text-left bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 dark:border-slate-700; }

/* Componentes de la columna izquierda (Avatar y texto) */
.avatar-container { @apply relative w-full h-[50vh] flex items-center justify-center; }
.avatar-platform { @apply absolute bottom-0 w-[50%] h-20 rounded-[50%]; background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5), transparent 70%); filter: blur(15px); transform: perspective(300px) rotateX(75deg); }
.dark .avatar-platform { background: radial-gradient(ellipse at center, rgba(215, 3, 123, 0.3), transparent 70%); }
.avatar-image { @apply max-w-full h-auto max-h-[85%] object-contain relative z-10; filter: drop-shadow(0 25px 30px rgba(0,0,0,0.2)); }
.branding-text-desktop { @apply text-center lg:text-left mt-8; }
.main-headline { @apply text-4xl font-black text-slate-800 dark:text-white; text-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.sub-headline { @apply text-base text-slate-600 dark:text-slate-300 mt-2 max-w-md; }

/* Componentes de la columna derecha (Panel de selección) */
.branding-text-mobile { display: none; } /* Oculto en desktop, se muestra en móvil */
.balance-display { @apply text-base font-medium w-full pb-4 border-b border-slate-200 dark:border-slate-700; @apply flex flex-col items-center lg:items-start; }
.no-kambitos-warning { @apply w-full text-center lg:text-left mb-2 text-sm font-semibold text-sky-600 dark:text-sky-400; }
.kambito-charger { @apply w-full flex flex-col items-center my-4; }
.coin-vessel { @apply relative w-36 h-36 rounded-full overflow-hidden; background-color: rgba(226, 232, 240, 0.7); border: 1px solid rgba(255,255,255,0.5); box-shadow: inset 0 2px 10px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.1); transform: rotateX(10deg) rotateY(-5deg); transition: transform 0.3s ease; }
.dark .coin-vessel { background-color: rgba(15, 23, 42, 0.5); }
.coin-vessel:hover { transform: rotateX(0deg) rotateY(0deg) scale(1.05); }
.liquid { height: var(--liquid-height); background-color: var(--liquid-color); box-shadow: 0 0 30px var(--liquid-shadow-color); @apply absolute bottom-0 left-0 w-full transition-all duration-700 ease-out; filter: brightness(1.1); }
.coin-overlay { @apply absolute inset-0 w-full h-full; }
.coin-svg { @apply w-full h-full; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); }
.labels { @apply flex justify-center w-full max-w-xs mt-6 gap-4; }
.label-button { @apply relative text-lg font-bold text-slate-500 dark:text-slate-400 cursor-pointer transition-colors duration-300; padding: 8px 12px; background: none; border: none; }
.label-button span { transition: transform 0.2s ease; }
.label-button:hover span { transform: translateY(-2px); color: #d7037b; }
.label-button.active { @apply text-[#d7037b]; }
.active-indicator { @apply absolute bottom-0 left-0 w-full h-1 rounded-full; background-color: #d7037b; transform: scaleX(0); transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1); }
.label-button.active .active-indicator { transform: scaleX(1); }
.details-flow { @apply w-full flex flex-col items-center lg:items-start; }
.price-display { @apply text-6xl md:text-7xl font-black text-slate-800 dark:text-white mb-1; }
.plan-tagline { @apply text-sm font-semibold text-[#d7037b] mb-4 h-5; }
.purchase-button { @apply w-full max-w-sm lg:max-w-full bg-[#d7037b] text-white font-bold py-3.5 px-6 rounded-lg text-lg transition-all duration-300; animation: pulse-glow 3s infinite ease-in-out; }
.purchase-button:hover { @apply bg-pink-700; transform: scale(1.03) translateY(-1px); animation-play-state: paused; }

/* Estilos solo para Desktop > 1024px */
@screen lg {
    .selection-stage { min-height: 70vh; }
}


/* --- ✨ ESTILOS RESPONSIVOS PARA MÓVILES (Hasta 1023px) ✨ --- */
@media (max-width: 1023px) {
    /* Ocultar la imagen del Kambito y su plataforma en móvil */
    .hide-on-mobile {
        display: none;
    }

    /* Ocultamos elementos decorativos y texto de la columna izquierda (ahora vacía) */
    .background-shape { display: none; }
    .branding-text-desktop { display: none; }

    /* Mostramos y estilizamos el texto del plan dentro del panel de selección */
    .branding-text-mobile {
        display: block;
        width: 100%;
        text-align: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #e2e8f0; /* slate-200 */
    }
    .dark .branding-text-mobile { border-bottom-color: #334155; /* slate-700 */ }

    /* Reordenamos las columnas: el panel de selección se convierte en el elemento principal */
    .branding-stage { order: 2; /* Aunque esté oculto, mantiene su orden para evitar saltos */ }
    .selection-stage { order: 1; }
    
    /* Ajustamos la tipografía y espaciado para mejor legibilidad */
    .main-headline-mobile {
        @apply text-3xl font-black text-slate-800 dark:text-white;
    }
    .sub-headline-mobile {
        @apply text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xs mx-auto;
    }
    .price-display {
        font-size: 3.75rem; /* 60px */
    }
    .balance-display { margin-bottom: 1.5rem; }
    .kambito-charger { margin-top: 0; margin-bottom: 1.5rem; }
}


/* --- ANIMACIONES Y TRANSICIONES --- */
@keyframes gleam { 0% { transform: translate(-150%, -150%) rotate(-45deg); } 100% { transform: translate(150%, 150%) rotate(-45deg); } }
.gleam-animation { animation: gleam 5s infinite linear; animation-delay: 2s; }
@keyframes select-wobble { 0% { transform: scale(1) rotate(0deg); } 25% { transform: scale(1.1) rotate(-5deg); } 50% { transform: scale(1.15) rotate(5deg); } 75% { transform: scale(1.1) rotate(-2deg); } 100% { transform: scale(1) rotate(0deg); } }
.plan-selected-animation .coin-overlay { animation: select-wobble 0.7s cubic-bezier(0.34, 1.56, 0.64, 1); }
.plan-selected-animation .liquid { --pulse-color: var(--liquid-shadow-color); animation: pulse-color 0.7s ease-in-out; }
@keyframes pulse-color { 0%, 100% { box-shadow: 0 0 30px var(--pulse-color); } 50% { box-shadow: 0 0 50px var(--pulse-color); } }
@keyframes pulse-glow { 0%, 100% { box-shadow: 0 8px 25px -8px rgba(215, 3, 123, 0.7); } 50% { box-shadow: 0 10px 40px -8px rgba(215, 3, 123, 1); } }
.details-fade-enter-active, .details-fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.details-fade-enter-from { opacity: 0; transform: translateY(10px); }
.details-fade-leave-to { opacity: 0; transform: translateY(-10px); }
.avatar-swap-enter-active { transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease; }
.avatar-swap-leave-active { transition: transform 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.2s ease; }
.avatar-swap-enter-from { transform: scale(0.6) translateY(80px); opacity: 0; }
.avatar-swap-leave-to { transform: scale(0.9); opacity: 0; }
</style>