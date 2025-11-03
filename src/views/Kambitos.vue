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
                            <span class="text-lg text-slate-500 dark:text-slate-400">Tu Saldo</span>
                            <div class="flex items-center gap-2 justify-center lg:justify-start">
                                <img :src="MonedaSVG" alt="Moneda" class="inline-h-8 w-8 mr-1" />
                                <span class="text-4xl font-extrabold text-slate-800 dark:text-white">{{ userCredits }}</span>
                                <span class="font-lobster text-2xl text-[#d7037b]">Kambitos</span>
                            </div>
                        </div>
                        
                        <div class="w-full space-y-3 my-6">
                            <button v-for="plan in plans" 
                                  :key="plan.name"
                                  @click="selectPlan(plan)"
                                  class="plan-card"
                                  :class="{
                                      'active': selectedPlan.name === plan.name,
                                      'plan-pro': plan.name === 'Pro' 
                                  }">
                                
                                <div class="flex items-center gap-3">
                                    <img :src="MonedaSVG" alt="" class="h-8 w-8 opacity-70" />
                                    <div class="flex-grow text-left">
                                        <span class="plan-card-name">{{ plan.name }}</span>
                                        <span class="plan-card-amount">Obtienes {{ plan.amount }} Kambitos</span>
                                    </div>
                                </div>
                                <span class="plan-card-price">{{ plan.price }}</span>
                                
                                <div class="plan-card-indicator">
                                    <div class="plan-card-indicator-dot"></div>
                                </div>
                            </button>
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
                                            <linearGradient id="k-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stop-color="#FFFFFF" />
                                                <stop offset="100%" stop-color="#E0E0E0" />
                                            </linearGradient>
                                            <filter id="k-dropshadow" x="-20%" y="-20%" width="140%" height="140%">
                                                <feDropShadow dx="0.5" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.2" />
                                            </filter>
                                        </defs>
                                        <circle cx="50" cy="50" r="48" fill="transparent" stroke="#FFF" stroke-width="2.5" opacity="0.2"/>
                                        <circle cx="50" cy="50" r="44" fill="transparent" stroke="#FFF" stroke-width="1" opacity="0.1"/>
                                        <path 
                                            fill-rule="evenodd" 
                                            clip-rule="evenodd" 
                                            fill="url(#k-fill)"
                                            filter="url(#k-dropshadow)"
                                            d="M38 30 H44 V48.5 L59 30 L65 33 L49 50 L65 67 L59 70 L44 51.5 V70 H38 V30 Z" 
                                        />
                                        <circle cx="50" cy="50" r="48" fill="url(#shine-gradient)" />
                                        <rect width="150" height="150" fill="url(#gleam-gradient)" class="gleam-animation" transform="translate(-25, -25) rotate(-45)"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <button @click="startPurchase(selectedPlan)" class="purchase-button w-full mt-4">
                            Cargar {{ selectedPlan.amount }} Kambitos
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="showPaymentModal" class="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 transition-opacity duration-300" :class="showPaymentModal ? 'opacity-100' : 'opacity-0'">
                <div class="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8 relative transition-transform duration-300" :class="showPaymentModal ? 'scale-100' : 'scale-95'">
                    
                    <button @click="showPaymentModal = false" class="absolute top-3 right-3 text-slate-400 hover:text-slate-700 dark:hover:text-white text-2xl leading-none">&times;</button>
                    <div v-if="planToPurchase" class="text-center mb-6">
                        <h3 class="text-2xl font-bold text-slate-800 dark:text-white">Completa tu Compra</h3>
                        <p class="text-slate-500 dark:text-slate-400 mt-1">
                            Estás comprando {{ planToPurchase.amount }} Kambitos por 
                            <span class="font-semibold text-[#d7037b]">{{ planToPurchase.price }}</span>.
                        </p>
                    </div>
                    
                    <form id="paymentForm" class="space-y-4">
                        <div>
                            <label for="form-checkout__cardholderName" class="form-label">Nombre del Titular</label>
                            <input type="text" id="form-checkout__cardholderName" class="form-input" />
                        </div>
                        <div>
                            <label class="form-label">Número de Tarjeta</label>
                            <div id="form-checkout__cardNumber" class="form-input-mp"></div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="form-label">Vencimiento</label>
                                <div id="form-checkout__cardExpirationDate" class="form-input-mp"></div>
                            </div>
                            <div>
                                <label class="form-label">CVV</label>
                                <div id="form-checkout__securityCode" class="form-input-mp"></div>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="form-checkout__identificationType" class="form-label">Tipo Doc.</label>
                                <select id="form-checkout__identificationType" class="form-input"></select>
                            </div>
                            <div>
                                <label for="form-checkout__identificationNumber" class="form-label">Nro. Doc.</label>
                                <input type="text" id="form-checkout__identificationNumber" class="form-input"/>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="form-checkout__installments" class="form-label">Cuotas</label>
                                <select id="form-checkout__installments" class="form-input"></select>
                            </div>
                             <div>
                                <label for="form-checkout__issuer" class="form-label">Banco</label>
                                <select id="form-checkout__issuer" class="form-input"></select>
                            </div>
                        </div>
                        <div v-if="paymentError" class="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-500/30">
                            <p class="font-semibold">¡Hubo un error!</p>
                            <p>{{ paymentError }}</p>
                        </div>
                        <button type="submit" :disabled="isProcessing" class="w-full bg-[#d7037b] text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 hover:bg-pink-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center">
                             <svg v-if="isProcessing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {{ isProcessing ? 'Procesando...' : `Pagar S/ ${planToPurchase.priceValue.toFixed(2)}` }}
                        </button>
                    </form>
                    </div>
            </div>

        </main>
        
        <div class="relative z-10">
            <Footer />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useUserStore } from '@/stores/user';
import Header from './Header.vue';
import Footer from './Footer.vue';
import MonedaSVG from '@/assets/imagenes/Moneda.svg';
import avatarBasico from '@/assets/imagenes/gif/Animacion_Mesa de trabajo 1-01.png';
import avatarPopular from '@/assets/imagenes/gif/Animacion_Mesa de trabajo 1-02.png';
import avatarPro from '@/assets/imagenes/gif/Animacion_Mesa de trabajo 1-03.png';
import api from '@/axios';

// ===================================================================
// --- ¡¡¡LOG DE PRUEBA DE DESPLIEGUE!!! ---
// ===================================================================
// Si ves este mensaje en la consola de tu navegador, el deploy FUNCIONÓ.
console.log('%c¡¡¡NUEVA VERSIÓN DESPLEGADA (con fix cardForm.createToken)!!!', 'color: #fff; background: #008000; font-size: 16px; font-weight: bold; padding: 5px;');
// ===================================================================

// --- Lógica de la tienda y estado del usuario (sin cambios) ---
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

// --- Estado para el formulario de pago (sin cambios) ---
const showPaymentModal = ref(false);
const isProcessing = ref(false);
const paymentError = ref(null);
const planToPurchase = ref(null);
let mp;
let cardForm; // Variable para la instancia del formulario


onMounted(() => {
    loadMercadoPagoSDK();
});

function loadMercadoPagoSDK() {
    if (document.getElementById('mercadopago-sdk')) return;
    const script = document.createElement('script');
    script.id = 'mercadopago-sdk';
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => console.log('SDK de Mercado Pago cargado.');
    script.onerror = () => console.error('Error al cargar SDK de Mercado Pago.');
    document.body.appendChild(script);
}

async function startPurchase(plan) {
    planToPurchase.value = plan;
    showPaymentModal.value = true;
    paymentError.value = null;
    await nextTick();
    
    // --- ¡CORRECCIÓN 2! ---
    // Esperamos a que el formulario se inicialice ANTES
    // de que el usuario pueda interactuar.
    try {
        await initializeCardForm();
    } catch (error) {
        console.error('Error en startPurchase al esperar initializeCardForm:', error);
        paymentError.value = "Error crítico al cargar el formulario. Refresca la página."
    }
}

// ===================================================================
// --- ¡INICIO DEL SCRIPT CORREGIDO! ---
// ===================================================================
async function initializeCardForm() {
    // 1. Desmontar campos anteriores si existen
    if (cardForm) {
        try {
            cardForm.unmount();
        } catch (e) {
            console.warn("Error (ignorable) al desmontar cardForm:", e);
        }
    }

    const publicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
    if (!window.MercadoPago) {
        paymentError.value = "El SDK de Mercado Pago no se ha cargado. Revisa tu conexión.";
        return;
    }
    
    mp = new window.MercadoPago(publicKey);

    // 2. Usamos mp.cardForm()
    try {
        cardForm = await mp.cardForm({
            amount: String(planToPurchase.value.priceValue),
            iframe: true,
            form: {
                id: 'paymentForm',
                cardholderName: { id: 'form-checkout__cardholderName' },
                identificationType: { id: 'form-checkout__identificationType' },
                identificationNumber: { id: 'form-checkout__identificationNumber' },
                installments: { id: 'form-checkout__installments' },
                issuer: { id: 'form-checkout__issuer' },

                cardNumber: { id: 'form-checkout__cardNumber', placeholder: "0000 0000 0000 0000" },
                cardExpirationDate: { id: 'form-checkout__cardExpirationDate', placeholder: "MM/YY" },
                securityCode: { id: 'form-checkout__securityCode', placeholder: "123" },
            },
            callbacks: {
                onFormMounted: error => { if (error) console.warn('Form Mounted error:', error) },
                // El SDK se encarga del 'submit'
                onSubmit: event => {
                    event.preventDefault();
                    processPayment(); // Llamamos a nuestra función
                },
                onError: (errors) => {
                    const errorMessages = errors.map(e => e.message).join('. ');
                    paymentError.value = errorMessages;
                }
            }
        });

    } catch (error) {
        console.error("Error al montar 'mp.cardForm()':", error);
        paymentError.value = "No se pudieron cargar los campos de pago. Refresca la página.";
        throw error; // Lanzamos el error para que startPurchase lo lo sepa
    }
}

async function processPayment() {
    isProcessing.value = true;
    paymentError.value = null;

    // Log de depuración final para verificar los objetos
    console.log("LOG 3: Verificando objetos ANTES de crear token...");
    console.log("Obj 'mp':", mp);
    console.log("Obj 'cardForm':", cardForm);
    
    if (!mp || !cardForm) { // <-- Verificación añadida
        paymentError.value = "Error de inicialización (mp o cardForm nulo). Refresca la página.";
        isProcessing.value = false;
        console.error("Error: 'mp' o 'cardForm' es nulo.", { mp, cardForm });
        return;
    }

    try {
        // --- ¡¡¡ESTA ES LA LÍNEA CORRECTA!!! ---
        const cardTokenData = await cardForm.createToken();

        const token = cardTokenData.id;
        if (!token) {
            throw new Error("No se pudo generar el token (ID nulo). Revisa los datos de la tarjeta.");
        }

        // 2. Construir el payload
        const paymentPayload = {
            token: token,
            issuer_id: cardTokenData.issuer_id, 
            payment_method_id: cardTokenData.payment_method_id,
            transaction_amount: planToPurchase.value.priceValue,
            installments: Number(cardTokenData.installments),
            description: `Compra de ${planToPurchase.value.amount} Kambitos`,
            quantity: planToPurchase.value.amount, 
            payer: {
                email: userStore.user.email,
                identification: {
                    type: cardTokenData.cardholder.identification.type,
                    number: cardTokenData.cardholder.identification.number
                }
            }
        };

        // 3. Envía el payload al backend
        const { data: responseData } = await api.post('/payment/process_payment', paymentPayload);

        if (responseData.status === 'approved') {
            alert('¡Compra exitosa! Tus Kambitos han sido acreditados.');
            if (userStore.user && userStore.user.id) {
                await userStore.fetchUserProfile(userStore.user.id);
            }
            showPaymentModal.value = false;
        } else {
            paymentError.value = `Estado del pago: ${responseData.status}. ${responseData.detail}`;
        }

    } catch (error) {
        console.error('Error en el try/catch de processPayment:', error);
        
        let errorMessage = 'Ocurrió un error inesperado al procesar el pago.';
        
        if (Array.isArray(error) && error.length > 0) {
            errorMessage = error.map(e => e.message).join('. ');
        } 
        else if (error.response?.data?.detail) {
            errorMessage = error.response.data.detail;
        } 
        else if (error.message) {
            errorMessage = error.message;
        }
        
        paymentError.value = errorMessage;
    } finally {
        isProcessing.value = false;
    }
}
// ===================================================================
// --- ¡FIN DEL SCRIPT CORREGIDO! ---
// ===================================================================


// --- Animación de mouse (sin cambios) ---
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

<style>
/* Estilos globales para los iframes de Mercado Pago (sin cambios) */
.form-input-mp iframe {
    width: 100%;
    height: 42px; /* Altura consistente con los inputs normales */
    border: none;
    border-radius: 0.375rem;
}
</style>

<style scoped>
/* Clases de utilidad para los inputs del formulario (sin cambios) */
.form-label {
    @apply block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1;
}
.form-input {
    @apply mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white;
}
/* Este estilo es para los <div>s de los campos seguros */
.form-input-mp {
    @apply mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 shadow-sm focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500 transition;
    min-height: 42px; /* Altura mínima para el contenedor */
    background-color: white; /* Asegura fondo blanco para los iframes */
}
.dark .form-input-mp {
    background-color: #334155; /* Color de fondo oscuro (slate-700) */
}


/* --- (El resto de tus estilos <style scoped> se mantienen igual) --- */
/* --- ESTILOS GENERALES Y DE ESCRITORIO --- */

/* Fondos decorativos (sin cambios) */
.background-grid { position: absolute; inset: 0; width: 100%; height: 100%; background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px); background-size: 40px 40px; opacity: 0.5; }
.dark .background-grid { background-image: linear-gradient(to right, #374151 1px, transparent 1px), linear-gradient(to bottom, #374151 1px, transparent 1px); }
.background-arc { position: absolute; top: -25vh; left: -20vw; width: 140vw; height: 150vh; background: radial-gradient(circle at top left, #fce7f3, #fbcfe8, #f9a8d4); border-radius: 50%; z-index: 0; opacity: 0.5; transform: rotate(-15deg) scale(1.2); transition: transform 0.2s linear; }
.dark .background-arc { background: radial-gradient(circle at top left, #2e101e, #3d1429, #5c1e3d); }
.background-shape { position: absolute; border-radius: 50%; z-index: 0; opacity: 0.2; transition: transform 0.2s linear; }
.shape-2 { width: 200px; height: 200px; bottom: 5vh; right: 5vw; background: #a5b4fc; } .shape-3 { width: 100px; height: 100px; top: 15vh; right: 15vw; background: #fca5a5; } .shape-4 { width: 120px; height: 120px; top: 60vh; left: 5vw; background: #67e8f9; }
.dark .shape-2 { background: #312e81; } .dark .shape-3 { background: #7f1d1d; } .dark .shape-4 { background: #0e7490; }

/* Layout principal (sin cambios) */
.store-layout { @apply grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center; }
.branding-stage { @apply relative flex flex-col items-center justify-center h-full z-10; }
.selection-stage { @apply relative flex flex-col items-center lg:items-start h-full p-4 sm:p-6 rounded-2xl text-center lg:text-left bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 dark:border-slate-700; }

/* Componentes de la columna izquierda (Avatar y texto) (sin cambios) */
.avatar-container { @apply relative w-full h-[50vh] flex items-center justify-center; }
.avatar-platform { @apply absolute bottom-0 w-[50%] h-20 rounded-[50%]; background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5), transparent 70%); filter: blur(15px); transform: perspective(300px) rotateX(75deg); }
.dark .avatar-platform { background: radial-gradient(ellipse at center, rgba(215, 3, 123, 0.3), transparent 70%); }
.avatar-image { @apply max-w-full h-auto max-h-[85%] object-contain relative z-10; filter: drop-shadow(0 25px 30px rgba(0,0,0,0.2)); }
.branding-text-desktop { @apply text-center lg:text-left mt-8; }
.main-headline { @apply text-4xl font-black text-slate-800 dark:text-white; text-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.sub-headline { @apply text-base text-slate-600 dark:text-slate-300 mt-2 max-w-md; }

/* Componentes de la columna derecha (Panel de selección) */
.branding-text-mobile { display: none; }
.balance-display { @apply text-base font-medium w-full pb-6 border-b border-slate-200 dark:border-slate-700; @apply flex flex-col items-center lg:items-start; }
.no-kambitos-warning { @apply w-full text-center lg:text-left mb-2 text-sm font-semibold text-sky-600 dark:text-sky-400; }

/* CAMBIO UX/UI: Nuevos estilos para "Plan Cards" verticales */
.plan-card {
    @apply relative w-full flex items-center justify-between p-4 rounded-xl border-2;
    @apply bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700;
    @apply cursor-pointer transition-all duration-300 shadow-sm;
}
.plan-card:hover {
    @apply shadow-md border-slate-300 dark:border-slate-600 transform scale-[1.02];
}
.plan-card.active {
    @apply border-pink-500 dark:border-pink-500 bg-pink-50 dark:bg-pink-900/20 shadow-lg;
    @apply ring-2 ring-pink-500/30;
}

/* Estilo especial para el plan "Pro" para destacarlo */
.plan-card.plan-pro.active {
    @apply border-violet-500 dark:border-violet-500 bg-violet-50 dark:bg-violet-900/20;
    @apply ring-2 ring-violet-500/30;
}
.plan-card.plan-pro:not(.active):hover {
    @apply border-violet-300 dark:border-violet-600;
}

/* Textos dentro de la tarjeta */
.plan-card-name {
    @apply block text-base font-bold text-slate-800 dark:text-white;
}
.plan-card-amount {
    @apply block text-sm font-medium text-slate-500 dark:text-slate-400;
}
.plan-card-price {
    @apply text-lg font-black text-slate-800 dark:text-white;
}

/* Indicador de radio-button personalizado */
.plan-card-indicator {
    @apply w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center transition-all ml-4;
}
.plan-card-indicator-dot {
    @apply w-2.5 h-2.5 rounded-full bg-pink-500 scale-0 transform transition-transform;
}
.plan-card.active .plan-card-indicator {
    @apply border-pink-500;
}
.plan-card.plan-pro.active .plan-card-indicator {
    @apply border-violet-500;
}
.plan-card.plan-pro.active .plan-card-indicator-dot {
    @apply bg-violet-500;
}
.plan-card.active .plan-card-indicator-dot {
    @apply scale-100;
}


/* CAMBIO UX/UI: La moneda es más pequeña, es solo feedback */
.kambito-charger { @apply w-full flex flex-col items-center mt-2 mb-4; }
.coin-vessel {
    @apply relative w-28 h-28 rounded-full overflow-hidden; /* Más pequeño */
    background-color: rgba(226, 232, 240, 0.7); 
    border: 1px solid rgba(255,255,255,0.5); 
    box-shadow: inset 0 2px 8px rgba(0,0,0,0.1), 0 8px 15px rgba(0,0,0,0.1); 
    transform: rotateX(10deg) rotateY(-5deg); 
    transition: transform 0.3s ease;
}
.coin-vessel::before {
    content: '';
    @apply absolute inset-0 rounded-full;
    box-shadow: inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -2px 6px rgba(0,0,0,0.15);
    z-index: 2;
}
.dark .coin-vessel { background-color: rgba(15, 23, 42, 0.5); }
.coin-vessel:hover { transform: rotateX(0deg) rotateY(0deg) scale(1.05); }
.liquid { height: var(--liquid-height); background-color: var(--liquid-color); box-shadow: 0 0 30px var(--liquid-shadow-color); @apply absolute bottom-0 left-0 w-full transition-all duration-700 ease-out; filter: brightness(1.1); z-index: 0;}
.coin-overlay { @apply absolute inset-0 w-full h-full z-10; }
.coin-svg { @apply w-full h-full; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); }

/* CAMBIO UX/UI: Eliminamos .details-flow, .price-display, etc. */

.purchase-button { @apply w-full max-w-sm lg:max-w-full bg-[#d7037b] text-white font-bold py-3.5 px-6 rounded-lg text-lg transition-all duration-300; animation: pulse-glow 3s infinite ease-in-out; }
.purchase-button:hover { @apply bg-pink-700; transform: scale(1.03) translateY(-1px); animation-play-state: paused; }

/* Estilos solo para Desktop > 1024px (sin cambios) */
@screen lg {
    .selection-stage { min-height: 70vh; }
}


/* --- ✨ ESTILOS RESPONSIVOS PARA MÓVILES (Hasta 1023px) ✨ --- */
@media (max-width: 1023px) {
    .hide-on-mobile, .background-shape, .branding-text-desktop { display: none; }
    .branding-text-mobile {
        display: block;
        width: 100%;
        text-align: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #e2e8f0; /* slate-200 */
    }
    .dark .branding-text-mobile { border-bottom-color: #334155; /* slate-700 */ }
    .branding-stage { order: 2; }
    .selection-stage { order: 1; }
    .main-headline-mobile { @apply text-3xl font-black text-slate-800 dark:text-white; }
    .sub-headline-mobile { @apply text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xs mx-auto; }

    .balance-display { @apply mb-0 pb-4; }
    .kambito-charger { margin-top: 1rem; margin-bottom: 1.5rem; }
}


/* --- ANIMACIONES Y TRANSICIONES (sin cambios) --- */
@keyframes gleam { 0% { transform: translate(-150%, -150%) rotate(-45deg); } 100% { transform: translate(150%, 150%) rotate(-45deg); } }
.gleam-animation { animation: gleam 5s infinite linear; animation-delay: 2s; }
@keyframes select-wobble { 0% { transform: scale(1) rotate(0deg); } 25% { transform: scale(1.1) rotate(-5deg); } 50% { transform: scale(1.15) rotate(5deg); } 75% { transform: scale(1.1) rotate(-2deg); } 100% { scale: 1; rotate: 0deg; } }
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