import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { POSITION } from 'vue-toastification'; // Importa POSITION para configurar la ubicación
import 'vue-toastification/dist/index.css'; // Importa los estilos base

import App from './App.vue';
import router from './router';
import './assets/css/main.css';

const app = createApp(App);

// Opciones personalizadas para las notificaciones
const toastOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 5000, // 5 segundos
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    // Aquí es donde asignamos nuestra clase CSS personalizada
    toastClassName: {
        success: "toast-success-brand"
    }
};

app.use(createPinia());
app.use(router);
app.use(Toast, toastOptions); // Pasamos las opciones al registrar el plugin

app.mount('#app');