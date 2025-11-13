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

        <main class="flex-grow flex justify-center py-8 lg:py-20">
            <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    <div class="lg:col-span-5 flex flex-col gap-6 lg:gap-10 order-1 z-10">
                        
                        <div class="branding-text text-center lg:text-left pb-6 lg:pb-0 border-b border-slate-200 dark:border-slate-700 lg:border-b-0">
                           <transition name="details-fade" mode="out-in">
                               <div :key="selectedPlan.name" class="min-h-[70px] lg:min-h-0">
                                   <h1 class="main-headline text-2xl lg:text-3xl">
                                        {{ selectedPlan.headline }}
                                    </h1>
                                   <p class="sub-headline text-sm lg:text-base mt-1 max-w-xs lg:max-w-md mx-auto lg:mx-0">
                                        {{ selectedPlan.subHeadline }}
                                    </p>
                               </div>
                           </transition>
                        </div>

                        <div class="balance-display">
                            <div v-if="userCredits === 0" class="no-kambitos-warning">
                                Es el momento perfecto para empezar a construir.
                            </div>
                            <span class="text-base text-slate-500 dark:text-slate-400">Tu Saldo</span>
                            <div class="flex items-center gap-2 justify-center lg:justify-start">
                                <img :src="MonedaSVG" alt="Moneda" class="inline-h-7 w-7 mr-1" />
                                <span class="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">{{ userCredits }}</span>
                                <span class="font-lobster text-lg sm:text-xl text-[#d7037b]">Kambitos</span>
                            </div>
                        </div>
                        
                        <div class="flex flex-col gap-4">
                            <h3 class="step-headline">1. Selecciona tu plan</h3>
                            
                            <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                <button v-for="plan in plans" 
                                      :key="plan.name"
                                      type="button" 
                                      class="plan-card"
                                      :class="{
                                          'plan-pro': plan.name === 'Pro',
                                          'plan-selected': selectedPlan.name === plan.name
                                      }"
                                      @click="selectPlan(plan.name)">
                                    
                                    <span v-if="plan.name === 'Popular'" class="plan-badge">Popular</span>

                                    <img :src="plan.avatar" :alt="plan.name" class="plan-card-avatar" />
                                    
                                    <div class="plan-card-info">
                                        <span class="plan-card-name">{{ plan.name }}</span>
                                        <span class="plan-card-amount">{{ plan.amount }} K.</span>
                                    </div>
                                    
                                    <span class="plan-card-price">{{ plan.price }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="hidden lg:flex lg:col-span-2 justify-center pt-12 order-2">
                        <transition name="avatar-swap" mode="out-in">
                            <img :src="currentAvatar" :key="currentAvatar" alt="Kambito Avatar" 
                                 class="avatar-image w-52 h-auto"/>
                        </transition>
                    </div>
                    
                    <div class="lg:col-span-5 flex flex-col gap-5 order-3 z-10">
                        <h3 class="step-headline">2. Confirma tu compra</h3>
                        
                        <div class="payment-qr-section w-full space-y-5">
                            <p class="text-sm text-slate-600 dark:text-slate-400 text-center">
                                Ingresa el nombre del titular de la cuenta Yape/Plin desde la que pagarás.
                            </p>
                            
                            <form @submit.prevent="handlePurchase" class="w-full space-y-4">
                                <div class="p-6 bg-slate-100 dark:bg-slate-700/50 rounded-xl border dark:border-slate-700">
                                    <div class="flex justify-between items-center mb-4">
                                        <h2 class="text-lg font-bold text-slate-900 dark:text-white">Resumen de tu Compra</h2>
                                        <div class="px-3 py-1 rounded-full text-xs font-bold"
                                            :class="selectedPlan.name === 'Pro' ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300' : 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300'">
                                            Plan {{ selectedPlan.name }}
                                        </div>
                                    </div>
                                    
                                    <div class="space-y-3">
                                        <div class="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                                            <span class="text-slate-600 dark:text-slate-400">Paquete</span>
                                            <span class="font-bold text-slate-800 dark:text-slate-100">{{ selectedPlan.amount }} Kambitos</span>
                                        </div>
                                        <div class="flex justify-between items-center text-xl font-bold">
                                            <span class="text-slate-800 dark:text-slate-200">Total a Pagar</span>
                                            <span :class="selectedPlan.name === 'Pro' ? 'text-violet-600' : 'text-pink-600'">
                                                {{ selectedPlan.price }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <label for="paymentName" class="form-label">Nombre del titular de Yape/Plin</label>
                                    <input type="text" id="paymentName" v-model="paymentName" class="form-input" placeholder="Ej: Juan perez" required />
                                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-1">Debe coincidir *exactamente* con el nombre en Yape.</p>
                                </div>
                                
                                <div v-if="paymentConfirmationError" class="payment-error-box !py-2 !px-3">
                                    <p>{{ paymentConfirmationError }}</p>
                                </div>

                                <button 
                                    type="submit" 
                                    :disabled="isProcessing" 
                                    class="confirm-button w-full text-base"
                                >
                                     <svg v-if="isProcessing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {{ isProcessing ? 'Creando orden...' : `Confirmar y Pagar ${selectedPlan.price}` }}
                                </button>
                            </form>
                            
                            <p class="text-xs text-slate-500 dark:text-slate-400 text-center">
                                Serás guiado al siguiente paso para realizar el pago con Yape.
                                El sistema lo detectará automáticamente.
                            </p>
                        </div>
                    </div>
                    </div>
            </div>
        </main>
        
        <div class="relative z-10">
            <Footer />
        </div>

        <transition name="details-fade">
            <div v-if="showPaymentModal" class="fixed inset-0 z-50 flex justify-center items-start sm:items-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
                
                <div class="relative w-full max-w-md p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-2xl dark:bg-slate-800 border dark:border-slate-700">
                    
                    <button @click="closeModal" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div class="flex flex-col items-center text-center">
                        <div class="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 mb-4 border-4 border-white dark:border-slate-800 shadow-inner">
                            <img :src="yapeLogo" alt="Yape" class="h-8 w-auto" />
                        </div>
                        
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">¡Orden Creada!</h3>
                        
                        <p class="text-slate-600 dark:text-slate-400 mb-4">
                            Por favor, realiza tu pago por Yape para completar la compra.
                        </p>

                        <div class="qr-placeholder mb-4">
                            <img :src="qrCodeImage" alt="Código QR de pago" class="qr-image" />
                        </div>

                        <div class="w-full p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border dark:border-slate-700 mb-4">
                            <div class="flex justify-between items-center">
                                <span class="text-sm font-medium text-slate-500 dark:text-slate-400">Pagarás (Monto Exacto):</span>
                                <span class="text-lg font-bold text-slate-900 dark:text-white">S/ {{ parseFloat(paymentDetails?.amount_to_pay).toFixed(2) }}</span>
                            </div>
                        </div>
                        
                        <div class="w-full p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg mb-4">
                            <p class="text-xs text-blue-800 dark:text-blue-200">
                                <strong>Importante:</strong> El pago debe ser hecho desde la cuenta Yape a nombre de
                                (<strong>{{ paymentDetails?.user_name_to_match }}</strong>)
                                para que el pago sea detectado.
                            </p>
                        </div>

                        <div class="w-full flex flex-col items-center">
                             <div class="flex items-center space-x-2 text-green-600 dark:text-green-400 mb-4">
                                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span class="font-medium">Esperando confirmación de pago...</span>
                            </div>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                El sistema detectará tu pago automáticamente.
                                Esta ventana se puede cerrar.
                            </p>
                            <button 
                                type="button" 
                                @click="closeModal" 
                                class="confirm-button w-full text-base !bg-slate-600 hover:!bg-slate-700"
                            >
                                Entendido, cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '@/stores/user';
import Header from './Header.vue';
import Footer from './Footer.vue';
import MonedaSVG from '@/assets/imagenes/Moneda.svg';
import avatarBasico from '@/assets/imagenes/gif/1sol.svg';
import avatarPopular from '@/assets/imagenes/gif/2sol.svg';
import avatarPro from '@/assets/imagenes/gif/5sol.svg';
import api from '@/axios';

import yapeLogo from '@/assets/imagenes/yape.png';
import plinLogo from '@/assets/imagenes/plin.png';
import qrCodeImage from '@/assets/imagenes/QR.png'; 

// --- Importar 'useToast' de vue-toastification ---
import { useToast } from 'vue-toastification';

// --- Inicializar el hook ---
const toast = useToast();

// ===================================================================
console.log('%c¡Kambitos.vue cargado con flujo de pago Yape v2!', 'color: #fff; background: #5a27c9; font-size: 16px; font-weight: bold; padding: 5px;');
// ===================================================================

// --- Lógica de la tienda y estado del usuario ---
const userStore = useUserStore();
const userCredits = computed(() => userStore.userCredits || 0);

const plans = [
    { name: 'Básico', amount: 2, price: 'S/ 1.00', priceValue: 1.00, avatar: avatarBasico, tagline: 'Para empezar a destacar.', headline: 'Toma la Delantera.', subHeadline: 'Un pequeño paso para ti, un gran salto para tu cuenta. Empieza a diferenciarte.' },
    { name: 'Popular', amount: 5, price: 'S/ 2.00', priceValue: 2.00, avatar: avatarPopular, tagline: 'La elección inteligente.', headline: 'Conviértete en el Favorito.', subHeadline: 'Atrae más miradas y genera más confianza. Consigue los mejores intercambios.' },
    { name: 'Pro', amount: 10, price: 'S/ 5.00', priceValue: 5.00, avatar: avatarPro, tagline: 'Juega en otro nivel.', headline: 'Sé el Número Uno.', subHeadline: 'Llega a la cima y conviértete en un referente. Es para los que quieren ganar en grande.' }
];

const chosenPlanName = ref(plans[1].name); 

const selectedPlan = computed(() => {
    return plans.find(p => p.name === chosenPlanName.value) || plans[1];
});

const currentAvatar = computed(() => selectedPlan.value.avatar);

function selectPlan(planName) {
    chosenPlanName.value = planName;
}


// --- ESTADO PARA PAGO AUTOMÁTICO ---
const isProcessing = ref(false); 
const paymentConfirmationError = ref(null);
const showPaymentModal = ref(false);
const paymentDetails = ref(null); 

// --- CAMPO DE NOMBRE AÑADIDO ---
const paymentName = ref(''); 

// ===================================================================
// --- FUNCIÓN DE PAGO ACTUALIZADA ---
// ===================================================================
async function handlePurchase() {
    if (isProcessing.value) return;

    if (!paymentName.value.trim()) {
        toast.error("Por favor, ingresa el nombre del titular de Yape.");
        return;
    }
    
    isProcessing.value = true;
    paymentConfirmationError.value = null;

    try {
        const payload = {
            amount: selectedPlan.value.priceValue,
            credits_to_buy: selectedPlan.value.amount,
            yape_name: paymentName.value, 
            yape_phone: "000000000"
        };
        
        console.log("Creando orden de pago:", payload);
        const response = await api.post('/api/v1/create-yape-order', payload);
        
        if (response.data) {
            paymentDetails.value = response.data; 
            showPaymentModal.value = true;
            console.log("Orden creada:", response.data);
            
            // LÍNEA ELIMINADA: Ya no sobrescribimos user_name_to_match, 
            // usamos el valor normalizado que viene del backend.
            // paymentDetails.value.user_name_to_match = paymentName.value;

        } else {
            throw new Error("El backend no devolvió datos.");
        }

    } catch (err) {
        console.error("Error al crear la orden:", err);
        let errorMsg = "No se pudo crear la orden. Inténtalo de nuevo.";
        if (err.response && err.response.data && err.response.data.detail) {
            errorMsg = err.response.data.detail;
        } else if (err.message) {
            errorMsg = err.message;
        }
        paymentConfirmationError.value = errorMsg;

        toast.error(errorMsg); 

    } finally {
        isProcessing.value = false;
    }
}

// ===================================================================
// --- LÓGICA DE WEB SOCKET (SOLUCIÓN AL PROBLEMA DE SINCRONIZACIÓN) ---
// ===================================================================

let ws = null;

function handleWebSocketMessage(event) {
    try {
        const message = JSON.parse(event.data);
        console.log('WS Message Received:', message);

        if (message.type === 'credits_updated') {
            const newCredits = message.data.new_credits;
            const creditsAdded = message.data.credits_added;
            
            // 1. **CRUCIAL**: Actualiza el estado de Pinia, lo que dispara la reactividad
            userStore.updateCredits(newCredits);

            // 2. Notificación al usuario
            toast.success(`¡Pago Aprobado! Se han añadido ${creditsAdded} Kambitos a tu cuenta.`, {
                timeout: 7000,
                position: 'top-right'
            });

            // 3. Opcional: Cerrar el modal automáticamente si está abierto
            if (showPaymentModal.value) {
                // Usamos un pequeño delay para que el usuario vea la notificación
                setTimeout(() => {
                    closeModal(); 
                }, 1000);
            }
        }
        
    } catch (e) {
        console.error("Error parsing WS message:", e);
    }
}

function connectWebSocket() {
    if (!userStore.isLoggedIn || !userStore.user.id) return;
    
    // 1. Determinar el protocolo (wss para HTTPS, ws para HTTP)
    const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    
    // 2. Determinar el host (dominio:puerto).
    let backendHost = window.location.host;

    // 3. Ajuste para desarrollo (Vite:5173 -> FastAPI:8000)
    // ESTE ES EL CAMBIO CLAVE PARA EVITAR EL ERROR DE URL RELATIVA
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Asumimos que FastAPI está en el puerto 8000 en desarrollo
        backendHost = `${window.location.hostname}:8000`; 
    } 

    // 4. Construir la URL completa
    const wsUrl = `${wsProtocol}://${backendHost}/ws/${userStore.user.id}`;
    
    console.log(`Attempting to connect to: ${wsUrl}`);
    
    ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
        console.log(`WebSocket Connected for user ${userStore.user.id}`);
    };

    ws.onmessage = handleWebSocketMessage;

    ws.onclose = () => {
        console.log("WebSocket Disconnected. Reconnecting in 5s...");
        setTimeout(connectWebSocket, 5000); 
    };

    ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
        ws.close();
    };
}

onMounted(() => {
    // Si el usuario ya está cargado, nos conectamos.
    if(userStore.isLoggedIn) {
        connectWebSocket();
    }
});

onUnmounted(() => {
    if (ws) {
        ws.onclose = null; // Evitar reconexión al salir
        ws.close();
    }
});
// ===================================================================
// --- FIN DE LA LÓGICA DE WEB SOCKET ---
// ===================================================================


// --- Función para cerrar el modal (Corregida) ---
function closeModal() {
    showPaymentModal.value = false;
    paymentDetails.value = null;
    
    // Ya no es necesario llamar a fetchUser() porque el WS ya actualizó el estado.
}

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
/* --- Clases de utilidad para los inputs del formulario --- */
.form-label {
    @apply block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1;
}
.form-input {
    @apply mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white;
    @apply py-3 px-4;
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
.payment-qr-section {
    @apply bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/30 dark:border-slate-700;
    @apply rounded-xl p-6 lg:p-8;
    @apply h-full;
}

.qr-placeholder {
    @apply w-full h-auto bg-white dark:bg-white rounded-lg flex flex-col items-center justify-center space-y-2 border border-slate-300 dark:border-slate-600;
    @apply p-5;
}
.qr-image {
    @apply w-36 h-36 sm:w-48 sm:h-48 rounded-lg bg-white p-1;
    @apply object-contain;
}
.payment-methods {
    @apply text-sm font-medium text-slate-600 dark:text-slate-300;
}
.payment-logo-shadow {
    /* @apply shadow-lg; */
}


/* --- Botón de Confirmar --- */
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
.background-grid { position: absolute; inset: 0; width: 100%; height: 100%; background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px); background-size: 40px 40px; opacity: 0.5; }
.dark .background-grid { background-image: linear-gradient(to right, #374151 1px, transparent 1px), linear-gradient(to bottom, #374151 1px, transparent 1px); }
.background-arc { position: absolute; top: -25vh; left: -20vw; width: 140vw; height: 150vh; background: radial-gradient(circle at top left, #fce7f3, #fbcfe8, #f9a8d4); border-radius: 50%; z-index: 0; opacity: 0.5; transform: rotate(-15deg) scale(1.2); transition: transform 0.2s linear; }
.dark .background-arc { background: radial-gradient(circle at top left, #2e101e, #3d1429, #5c1e3d); }
.background-shape { position: absolute; border-radius: 50%; z-index: 0; opacity: 0.2; transition: transform 0.2s linear; }
.shape-2 { width: 200px; height: 200px; bottom: 5vh; right: 5vw; background: #a5b4fc; } .shape-3 { width: 100px; height: 100px; top: 15vh; right: 15vw; background: #fca5a5; } .shape-4 { width: 120px; height: 120px; top: 60vh; left: 5vw; background: #67e8f9; }
.dark .shape-2 { background: #312e81; } .dark .shape-3 { background: #7f1d1d; } .dark .shape-4 { background: #0e7490; }


/* --- Branding y Avatar --- */
.avatar-image {
    @apply h-auto object-contain relative z-10;
    /* filter: drop-shadow(0 25px 30px rgba(0,0,0,0.2)); */ 
}

.branding-text { @apply lg:mt-0; }
.main-headline { @apply font-black text-slate-800 dark:text-white; text-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.sub-headline { @apply text-slate-600 dark:text-slate-300; }

/* --- Saldo --- */
.balance-display { 
    @apply text-base font-medium w-full border-b border-slate-200 dark:border-slate-700;
    @apply flex flex-col items-center lg:items-start;
    @apply pb-6;
    @apply px-0; 
}
.no-kambitos-warning { @apply w-full text-center lg:text-left mb-1 text-sm font-semibold text-sky-600 dark:text-sky-400; }

/* --- Titular de paso --- */
.step-headline {
    @apply text-base font-bold text-slate-800 dark:text-white text-center lg:text-left;
    @apply lg:text-lg;
}


/* --- Estilos para "Plan Cards" --- */
.plan-card {
    @apply relative w-full flex flex-col items-center text-center p-5 rounded-xl border-2;
    @apply transition-all duration-300;
    @apply cursor-pointer;
    @apply bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700;
}
.plan-card:hover {
    @apply border-slate-300 dark:border-slate-600;
    transform: translateY(-2px);
}
.plan-card.plan-pro {
    @apply border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/20;
}
.plan-selected {
    @apply border-pink-500 dark:border-pink-500 bg-pink-50/50 dark:bg-pink-900/20;
    @apply ring-2 ring-pink-500 ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-900;
}
.plan-selected.plan-pro {
    @apply border-violet-500 dark:border-violet-500 bg-violet-50/50 dark:bg-violet-900/20;
    @apply ring-violet-500;
}
.plan-badge {
    @apply absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2;
    @apply bg-pink-600 text-white text-xs font-bold px-3 py-0.5 rounded-full;
}
.plan-pro .plan-badge {
    @apply bg-violet-600;
}

/* --- Estilos internos de la tarjeta --- */
.plan-card-avatar {
    @apply w-10 h-10 rounded-lg object-cover mb-2;
}
.plan-card-info {
    @apply flex-1 flex flex-col;
}
.plan-card-name {
    @apply block text-xs font-bold text-slate-900 dark:text-white leading-tight;
}
.plan-card-amount {
    @apply block text-xs font-medium text-slate-500 dark:text-slate-400 leading-tight;
}
.plan-card-price {
    @apply text-sm font-black text-slate-800 dark:text-white leading-tight mt-1;
}


/* --- ANIMACIONES Y TRANSICIONES (SIN CAMBIOS) --- */
.details-fade-enter-active, .details-fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.details-fade-enter-from { opacity: 0; transform: translateY(10px); }
.details-fade-leave-to { opacity: 0; transform: translateY(-10px); }
.avatar-swap-enter-active { transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease; }
.avatar-swap-leave-active { transition: transform 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.2s ease; }
.avatar-swap-enter-from { transform: scale(0.6) translateY(80px); opacity: 0; }
.avatar-swap-leave-to { transform: scale(0.9); opacity: 0; }
</style>