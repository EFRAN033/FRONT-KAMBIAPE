<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans antialiased">
      <Header />
  
      <main class="py-12 sm:py-16">
        <div class="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div class="prose lg:prose-lg max-w-none bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h1 class="text-4xl font-black tracking-tight text-slate-900">
              Política de Cookies
            </h1>
            <p class="text-slate-600">Última actualización: 12 de Septiembre de 2025</p>
            
            <h2>¿Qué son las cookies?</h2>
            <p>
              Una cookie es un pequeño fichero de texto que se almacena en su navegador cuando visita casi cualquier página web. Su utilidad es que la web sea capaz de recordar su visita cuando vuelva a navegar por esa página. Las cookies suelen almacenar información de carácter técnico, preferencias personales, personalización de contenidos, estadísticas de uso, enlaces a redes sociales, acceso a cuentas de usuario, etc.
            </p>
  
            <h2>Cookies utilizadas en este sitio web</h2>
            <p>
              Siguiendo las directrices de la Agencia Española de Protección de Datos procedemos a detallar el uso de cookies que hace esta web con el fin de informarle con la máxima exactitud posible.
            </p>
            <ul>
              <li><strong>Cookies técnicas:</strong> Son aquellas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan.</li>
              <li><strong>Cookies de análisis:</strong> Son aquellas que bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado.</li>
              <li><strong>Cookies de sesión:</strong> Utilizamos cookies de sesión para mantener tu sesión iniciada mientras navegas por el sitio después de hacer login. Estas son esenciales para el funcionamiento del área de usuario.</li>
            </ul>
  
            <h2>Desactivación o eliminación de cookies</h2>
            <p>
              En cualquier momento podrá ejercer su derecho de desactivación o eliminación de cookies de este sitio web. Estas acciones se realizan de forma diferente en función del navegador que esté usando. Le recomendamos consultar la ayuda de su navegador para gestionarlas.
            </p>
            
            <h2>Notas adicionales</h2>
            <p>
              Ni esta web ni sus representantes legales se hacen responsables ni del contenido ni de la veracidad de las políticas de privacidad que puedan tener los terceros mencionados en esta política de cookies.
            </p>
          </div>
        </div>
      </main>
  
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  </script>
  
  <style scoped>
  /* Estilos para el contenido del prose */
  .prose h1, .prose h2 {
    color: #1e293b; /* slate-800 */
  }
  .prose p, .prose li {
    color: #475569; /* slate-600 */
  }
  </style>