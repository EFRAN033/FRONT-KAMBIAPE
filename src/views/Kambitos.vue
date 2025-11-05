<template>
    <div class="relative min-h-screen bg-slate-100 dark:bg-slate-900 font-sans antialiased flex flex-col" @mousemove="handleMouseMove">
        
        <div class="absolute inset-0 z-0 overflow-hidden">
            <div class="background-grid"></div>
            <div ref="shape1" class="background-arc"></div>
            <div ref="shape2" class="background-shape shape-2"></div>
            <div ref="shape3" class="background-shape shape-3"></div>
            <div ref="shape4" class="background-shape shape-4"></div>
        </div>

        <div class="relative z-10">
            <Header />
        </div>

        <main class="relative z-10 flex-grow flex justify-center py-8 lg:py-12">
            <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

                <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
                    
                    <div class="branding-stage lg:col-span-2">
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

                    <div class="selection-stage lg:col-span-3">
                        
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
                            <span class="text-lg text-slate-500 dark:text-slate-400">Tu Saldo</span>
                            <div class="flex items-center gap-2 justify-center lg:justify-start">
                                <img :src="MonedaSVG" alt="Moneda" class="inline-h-8 w-8 mr-1" />
                                <span class="text-4xl font-extrabold text-slate-800 dark:text-white">{{ userCredits }}</span>
                                <span class="font-lobster text-2xl text-[#d7037b]">Kambitos</span>
                            </div>
                        </div>
                        
                        <div class="w-full grid grid-cols-3 gap-2 my-6">
                            <button v-for="plan in plans" 
                                  :key="plan.name"
                                  type="button" 
                                  class="plan-card"
                                  :class="{
                                      'plan-pro': plan.name === 'Pro'
                                  }"
                                  @click="selectPlan(plan.name)">
                                
                                <span class="plan-card-name">{{ plan.name }}</span>
                                <span class="plan-card-amount">{{ plan.amount }} K.</span>
                                <span class="plan-card-price">{{ plan.price }}</span>
                            </button>
                        </div>

                        <div class="w-full grid grid-cols-1 gap-6 lg:gap-8 items-start justify-items-center">
                            
                            <div class="payment-qr-section w-full max-w-md space-y-4">

                                <p class="text-sm text-slate-600 dark:text-slate-400 text-center">
                                    Por favor escribe los nombres y número del celular donde se realiza el yapeo.
                                </p>
                                <form @submit.prevent="confirmQR_Payment" class="space-y-4">
                                    
                                    <div class="text-center">
                                        <p class="text-base font-semibold text-slate-800 dark:text-white">
                                            1. Paga <span class="font-bold text-[#d7037b]">{{ selectedPlan.price }}</span> con Yape/Plin
                                        </p>
                                    </div>
                                    
                                    <div class="qr-placeholder">
                                        <svg class="w-12 h-12 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.5a.75.75 0 0 0-.75.75v13.5a.75.75 0 0 0 .75.75h13.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75H3.75ZM9 9.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75V9.75ZM15 5.25v.001M15 18.75v.001M18.75 15v.001M18.75 5.25v.001M5.25 15v.001M5.25 18.75v.001M9 5.25v.001M18.75 9v.001" />
                                        </svg>
                                        <span class="text-slate-500 dark:text-slate-400 font-medium text-sm">2. Escanea el QR</span>
                                    </div>

                                    <div class="grid grid-cols-2 gap-2">
                                        <div>
                                            <label for="paymentName" class="form-label !mb-0">3. Nombre</label>
                                            <input type="text" id="paymentName" v-model="paymentName" class="form-input" placeholder="Tu nombre" required />
                                        </div>
                                        <div>
                                            <label for="paymentPhone" class="form-label !mb-0">4. Teléfono</label>
                                            <input type="tel" id="paymentPhone" v-model="paymentPhone" class="form-input" placeholder="987654321" required />
                                        </div>
                                    </div>
                                    
                                    <div v-if="paymentConfirmationError" class="payment-error-box !py-2 !px-3">
                                        <p>{{ paymentConfirmationError }}</p>
                                    </div>

                                    <button type="submit" :disabled="isProcessing" class="confirm-button w-full !py-2.5 text-base">
                                         <svg v-if="isProcessing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {{ isProcessing ? 'Confirmando...' : 'Confirmar Pago' }}
                                    </button>
                                </form>
                            </div>
                        </div>
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
import api from '@/axios';

// ===================================================================
console.log('%c¡¡¡NUEVA VERSIÓN DESPLEGADA (Compacta sin scroll - CORREGIDA)!!!', 'color: #fff; background: #008000; font-size: 16px; font-weight: bold; padding: 5px;');
// ===================================================================

// --- Lógica de la tienda y estado del usuario ---
const userStore = useUserStore();
const userCredits = computed(() => userStore.userCredits || 0);

// MODIFICADO: Se quitaron 'fillLevel' y 'liquidColor'
const plans = [
    { name: 'Básico', amount: 2, price: 'S/ 1.00', priceValue: 1.00, avatar: avatarBasico, tagline: 'Para empezar a destacar.', headline: 'Toma la Delantera.', subHeadline: 'Un pequeño paso para ti, un gran salto para tu cuenta. Empieza a diferenciarte.' },
    { name: 'Popular', amount: 5, price: 'S/ 2.00', priceValue: 2.00, avatar: avatarPopular, tagline: 'La elección inteligente.', headline: 'Conviértete en el Favorito.', subHeadline: 'Atrae más miradas y genera más confianza. Consigue los mejores intercambios.' },
    { name: 'Pro', amount: 10, price: 'S/ 5.00', priceValue: 5.00, avatar: avatarPro, tagline: 'Juega en otro nivel.', headline: 'Sé el Número Uno.', subHeadline: 'Llega a la cima y conviértete en un referente. Es para los que quieren ganar en grande.' }
];

// --- ESTADO UNIFICADO ---
const chosenPlanName = ref(plans[1].name); 

const selectedPlan = computed(() => {
    return plans.find(p => p.name === chosenPlanName.value) || plans[1];
});

const currentAvatar = computed(() => selectedPlan.value.avatar);

// ELIMINADO: const liquidStyle

function selectPlan(planName) {
    chosenPlanName.value = planName;
}
// --- FIN DEL ESTADO UNIFICADO ---


// --- ESTADO PARA PAGO QR ---
const isProcessing = ref(false);
const paymentName = ref('');
const paymentPhone = ref('');
const paymentConfirmationError = ref(null);


// ===================================================================
// --- FUNCIÓN PARA CONFIRMAR PAGO QR ---
// ===================================================================
async function confirmQR_Payment() {
    if (isProcessing.value) {
        return; 
    }
    isProcessing.value = true;
    paymentConfirmationError.value = null;

    if (!paymentName.value || !paymentPhone.value) {
        paymentConfirmationError.value = "Completa tu nombre y teléfono.";
        isProcessing.value = false;
        return;
    }

    try {
        const payload = {
            planName: selectedPlan.value.name,
            amount: selectedPlan.value.priceValue,
            customerName: paymentName.value,
            customerPhone: paymentPhone.value, 
            paymentMethod: 'QR_TRANSFER'
        };

        console.log("Enviando confirmación QR al backend:", payload);
        const response = await api.post('/payment/confirm_qr', payload);
        
        console.log('Respuesta del backend:', response.data);
        alert("¡Gracias! Tu pago está siendo verificado. Verás tus Kambitos acreditados pronto.");

        paymentName.value = '';
        paymentPhone.value = '';
        chosenPlanName.value = plans[1].name;
        
    } catch (err) {
        console.error("Error confirmando el pago QR:", err);
        if (err.response && err.response.data && err.response.data.message) {
            paymentConfirmationError.value = err.response.data.message;
        } else {
            paymentConfirmationError.value = "No se pudo registrar la confirmación.";
        }
    } finally {
        isProcessing.value = false;
    }
}
// ===================================================================
// --- ¡FIN DE LA LÓGICA DE PAGO QR! ---
// ===================================================================


// --- Animación de mouse ---
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
/* Clases de utilidad para los inputs del formulario */
.form-label {
    @apply block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1;
}
.form-input {
    @apply mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white;
    @apply py-3 px-3;
}
select.form-input {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    @apply bg-no-repeat bg-right;
    appearance: none;
    -webkit-appearance: none;
    background-position: right 0.5rem center;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
}
.dark select.form-input {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
}


/* --- Estilos para QR Y FORMULARIO --- */
.qr-placeholder {
    /* MODIFICADO: Se cambió h-44 por h-56 para hacerlo más alto */
    @apply w-full h-56 bg-slate-200 dark:bg-slate-700 rounded-lg flex flex-col items-center justify-center space-y-2 border border-slate-300 dark:border-slate-600;
}

.confirm-button {
     @apply w-full bg-[#d7037b] text-white font-bold py-3.5 px-6 rounded-lg text-base transition-all duration-300 hover:bg-pink-700;
     @apply disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed;
     @apply flex items-center justify-center;
}
.confirm-button:not(:disabled):hover {
    @apply bg-pink-700; transform: scale(1.02);
}

.payment-error-box {
    @apply text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-500/30 text-center;
}


/* --- ESTILOS GENERALES Y DE ESCRITORIO --- */

/* Fondos decorativos */
.background-grid { position: absolute; inset: 0; width: 100%; height: 100%; background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px); background-size: 40px 40px; opacity: 0.5; }
.dark .background-grid { background-image: linear-gradient(to right, #374151 1px, transparent 1px), linear-gradient(to bottom, #374151 1px, transparent 1px); }
.background-arc { position: absolute; top: -25vh; left: -20vw; width: 140vw; height: 150vh; background: radial-gradient(circle at top left, #fce7f3, #fbcfe8, #f9a8d4); border-radius: 50%; z-index: 0; opacity: 0.5; transform: rotate(-15deg) scale(1.2); transition: transform 0.2s linear; }
.dark .background-arc { background: radial-gradient(circle at top left, #2e101e, #3d1429, #5c1e3d); }
.background-shape { position: absolute; border-radius: 50%; z-index: 0; opacity: 0.2; transition: transform 0.2s linear; }
.shape-2 { width: 200px; height: 200px; bottom: 5vh; right: 5vw; background: #a5b4fc; } .shape-3 { width: 100px; height: 100px; top: 15vh; right: 15vw; background: #fca5a5; } .shape-4 { width: 120px; height: 120px; top: 60vh; left: 5vw; background: #67e8f9; }
.dark .shape-2 { background: #312e81; } .dark .shape-3 { background: #7f1d1d; } .dark .shape-4 { background: #0e7490; }

.branding-stage { @apply relative flex flex-col items-center justify-center h-full z-10; }
.selection-stage { 
    @apply relative flex flex-col items-center lg:items-start h-full p-4 rounded-2xl text-center lg:text-left;
    @apply bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 dark:border-slate-700;
    @apply sm:p-6 lg:p-8;
}

/* Componentes de la columna izquierda (Avatar y texto) */
.avatar-container { @apply relative w-full h-[50vh] flex items-center justify-center; }
.avatar-platform { @apply absolute bottom-0 w-[50%] h-20 rounded-[50%]; background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5), transparent 70%); filter: blur(15px); transform: perspective(300px) rotateX(75deg); }
.dark .avatar-platform { background: radial-gradient(ellipse at center, rgba(215, 3, 123, 0.3), transparent 70%); }
.avatar-image { @apply max-w-full h-auto max-h-[85%] object-contain relative z-10; filter: drop-shadow(0 25px 30px rgba(0,0,0,0.2)); }
.branding-text-desktop { @apply text-center lg:text-left mt-8; }
.main-headline { @apply text-4xl font-black text-slate-800 dark:text-white; text-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.sub-headline { @apply text-base text-slate-600 dark:text-slate-300 mt-2 max-w-md; }

/* Componentes de la columna derecha (Panel de selección) */
.branding-text-mobile { display: none; }
.balance-display { 
    @apply text-base font-medium w-full border-b border-slate-200 dark:border-slate-700;
    @apply flex flex-col items-center lg:items-start;
    @apply pb-4;
}
.no-kambitos-warning { @apply w-full text-center lg:text-left mb-1 text-sm font-semibold text-sky-600 dark:text-sky-400; }

/* --- Estilos para "Plan Cards" --- */
.plan-card {
    @apply relative w-full flex flex-col items-center text-center p-3 rounded-xl border-2;
    @apply transition-all duration-300 shadow-sm;
    @apply cursor-default;
    @apply bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700;
}
.plan-card:hover {
    @apply shadow-md border-slate-300 dark:border-slate-600;
}

.plan-card.plan-pro {
    @apply border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/20;
}

.plan-card-name {
    @apply block text-sm font-bold text-slate-800 dark:text-white leading-tight;
}
.plan-card-amount {
    @apply block text-xs font-medium text-slate-500 dark:text-slate-400 leading-tight;
}
.plan-card-price {
    @apply text-base font-black text-slate-800 dark:text-white leading-tight mt-0.5;
}


/* --- ESTILOS RESPONSIVOS PARA MÓVILES --- */
@media (max-width: 1023px) {
    .hide-on-mobile, .background-shape, .branding-text-desktop { display: none; }
    .branding-text-mobile {
        display: block;
        width: 100%;
        text-align: center;
        @apply mb-4 pb-4;
        border-bottom: 1px solid #e2e8f0; /* slate-200 */
    }
    .dark .branding-text-mobile { border-bottom-color: #334155; /* slate-700 */ }
    .branding-stage { order: 2; }
    .selection-stage { order: 1; }
    .main-headline-mobile { @apply text-2xl font-black text-slate-800 dark:text-white; }
    .sub-headline-mobile { @apply text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xs mx-auto; }

    .balance-display { @apply mb-0 pb-4; }
    
    .payment-qr-section { @apply space-y-4 mt-0; }
    
    .form-input { @apply text-sm; }
    .confirm-button { @apply text-base py-3; }
}


/* --- ANIMACIONES Y TRANSICIONES --- */
.details-fade-enter-active, .details-fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.details-fade-enter-from { opacity: 0; transform: translateY(10px); }
.details-fade-leave-to { opacity: 0; transform: translateY(-10px); }
.avatar-swap-enter-active { transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease; }
.avatar-swap-leave-active { transition: transform 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.2s ease; }
.avatar-swap-enter-from { transform: scale(0.6) translateY(80px); opacity: 0; }
.avatar-swap-leave-to { transform: scale(0.9); opacity: 0; }
</style>