# KambiaPe - Intercambio de Productos

KambiaPe es una aplicación web diseñada para facilitar el intercambio y la visualización de productos entre usuarios. La plataforma permite a los usuarios registrarse, publicar sus propios artículos y explorar los productos que otros han puesto a disposición para intercambiar.

## ✨ Características Principales

* **Autenticación de Usuarios:** Sistema completo de registro e inicio de sesión.
* **Gestión de Perfil:** Cada usuario tiene su propio perfil donde puede ver y administrar su información.
* **Publicación de Productos:** Formulario intuitivo para subir nuevos productos, incluyendo imágenes y descripciones.
* **Catálogo de Productos:** Explora todos los artículos disponibles en la plataforma a través de un feed interactivo.
* **Gestión de Productos Propios:** Visualiza y administra los productos que has publicado.
* **Diseño Responsivo:** Interfaz adaptable a diferentes tamaños de pantalla gracias a Tailwind CSS.

## 🛠️ Tecnologías Utilizadas

Este proyecto fue construido utilizando un stack de tecnologías moderno para el desarrollo frontend:

* **Framework Principal:** [Vue.js](https://vuejs.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Enrutamiento:** [Vue Router](https://router.vuejs.org/)
* **Manejo de Estado:** [Pinia](https://pinia.vuejs.org/)
* **Estilos CSS:** [Tailwind CSS](https://tailwindcss.com/)
* **Cliente HTTP:** [Axios](https://axios-http.com/)

## 🚀 Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (se recomienda la versión LTS) y npm.

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/EFRAN033/FRONT-KAMBIAPE.git](https://github.com/EFRAN033/FRONT-KAMBIAPE.git)
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd front-kambiape
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

4.  **Configura las variables de entorno:**
    Crea un archivo llamado `.env` en la raíz del proyecto. Puedes duplicar el archivo `.env.example` (si lo tienes) o crearlo desde cero con el siguiente contenido:

    ```env
    # URL del backend al que se conectará la aplicación
    VITE_APP_API_URL=http://localhost:8000/api
    ```
    *Asegúrate de que la URL apunte a tu servidor backend.*

5.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

6.  **Abre tu navegador:**
    Visita `http://localhost:5173` (o el puerto que Vite te indique en la consola) para ver la aplicación en funcionamiento.