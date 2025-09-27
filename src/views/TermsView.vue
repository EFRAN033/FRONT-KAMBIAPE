<template>
    <!-- Diseño editorial, sin tarjetas: tipografía aireada, separadores sutiles y riel de navegación -->
    <div class="min-h-screen bg-white font-sans antialiased text-slate-800">
      <a href="#contenido" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow ring-2 ring-pink-600">Saltar al contenido</a>
  
      <Header />
  
      <!-- Encabezado pegajoso -->
      <header class="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between py-4">
            <nav aria-label="breadcrumb" class="text-sm text-slate-600">
              <ol class="flex flex-wrap items-center gap-1">
                <li><a href="/" class="hover:text-slate-900">Inicio</a></li>
                <li aria-hidden="true" class="px-1">/</li>
                <li class="text-slate-900 font-medium">Términos y Condiciones</li>
              </ol>
            </nav>
            <div class="flex items-center gap-3">
              <span class="inline-flex items-center gap-2 text-xs text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2Z"/></svg>
                Actualizado: {{ lastUpdatedFmt }}
              </span>
              <button type="button" @click="imprimir" class="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M4 3a2 2 0 0 0-2 2v4h2V5h12v4h2V5a2 2 0 0 0-2-2H4Z"/><path d="M16 9H4a2 2 0 0 0-2 2v3h4v3h8v-3h4v-3a2 2 0 0 0-2-2Zm-4 6H8v-3h4v3Z"/></svg>
                Imprimir
              </button>
            </div>
          </div>
        </div>
      </header>
  
      <main id="contenido" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div class="grid grid-cols-12 gap-8">
          <!-- Riel de navegación (sin tarjeta) -->
          <aside class="hidden lg:block col-span-3">
            <div class="sticky top-28">
              <p class="text-xs tracking-wide text-slate-500 uppercase mb-3">Índice</p>
              <div class="relative">
                <div class="absolute left-1 top-0 bottom-0 w-px bg-slate-200"></div>
                <nav class="pl-4 space-y-1" aria-label="Índice de secciones">
                  <a v-for="item in toc" :key="item.id" :href="`#${item.id}`"
                     class="group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition"
                     :class="activeId === item.id ? 'text-slate-900 font-medium' : 'text-slate-600 hover:text-slate-900'">
                    <span class="h-1.5 w-1.5 rounded-full" :class="activeId === item.id ? 'bg-pink-600' : 'bg-slate-300'"/>
                    <span>{{ item.label }}</span>
                  </a>
                </nav>
              </div>
            </div>
          </aside>
  
          <!-- Cuerpo editorial -->
          <article class="col-span-12 lg:col-span-9">
            <header class="mb-8">
              <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">Términos y Condiciones de Uso de KambiaPe</h1>
              <p class="mt-2 text-slate-600 max-w-prose">Este documento establece las reglas de uso, responsabilidades y límites de la plataforma. Léelo con atención: el uso de KambiaPe implica su aceptación.</p>
            </header>
  
            <hr class="my-8 border-slate-200"/>
  
            <section id="objeto" class="scroll-mt-28 max-w-prose">
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">1. Objeto de la plataforma</h2>
              <p class="mt-4 leading-8">KambiaPe es un espacio digital que permite a sus usuarios publicar productos o servicios que desean intercambiar. La plataforma actúa únicamente como intermediario tecnológico, facilitando la conexión entre oferentes y demandantes, sin intervenir en la negociación, veracidad de la información ni en la ejecución final del intercambio.</p>
            </section>
  
            <hr class="my-8 border-slate-200"/>
  
            <section id="registro" class="scroll-mt-28 max-w-prose">
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">2. Registro de usuarios</h2>
              <ul class="mt-4 space-y-2 leading-8 list-disc pl-5 marker:text-pink-600">
                <li>El registro es personal e intransferible. Cada usuario se compromete a brindar información veraz, actualizada y comprobable.</li>
                <li>Está prohibido crear múltiples cuentas con el fin de evadir controles o beneficios.</li>
                <li>El usuario es el único responsable de la confidencialidad de sus credenciales de acceso y de las actividades realizadas desde su cuenta.</li>
              </ul>
            </section>
  
            <hr class="my-8 border-slate-200"/>
  
            <section id="publicacion" class="scroll-mt-28 max-w-prose">
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">3. Publicación de productos y servicios</h2>
              <ul class="mt-4 space-y-2 leading-8 list-disc pl-5 marker:text-pink-600">
                <li>Solo se podrán publicar productos y servicios legales, seguros, de procedencia lícita y en condiciones aptas de uso.</li>
                <li>Queda estrictamente prohibido publicar artículos que infrinjan derechos de autor, marcas registradas, normas sanitarias o cualquier otra disposición legal vigente en el Perú.</li>
                <li>El usuario será único responsable por la veracidad de la descripción de sus publicaciones.</li>
              </ul>
            </section>
  
            <hr class="my-8 border-slate-200"/>
  
            <section id="intercambios" class="scroll-mt-28 max-w-prose">
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">4. Intercambios dentro de la plataforma</h2>
              <ul class="mt-4 space-y-2 leading-8 list-disc pl-5 marker:text-pink-600">
                <li>Para concretar un intercambio, los usuarios deberán realizarlo únicamente a través de las herramientas de comunicación habilitadas por KambiaPe (por ejemplo, chat interno).</li>
                <li>Algunos servicios de la plataforma, como la activación del chat para concretar intercambios, podrán estar sujetos al pago de una comisión o créditos virtuales.</li>
                <li>KambiaPe no garantiza la calidad, seguridad ni cumplimiento de los intercambios. La responsabilidad recae exclusivamente en los usuarios involucrados.</li>
              </ul>
            </section>
  
            <hr class="my-8 border-slate-200"/>
  
            <section id="resp-usuario" class="scroll-mt-28 max-w-prose">
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">5. Responsabilidad del usuario</h2>
              <p class="mt-4 leading-8">El usuario se compromete a:</p>
              <ul class="mt-2 space-y-2 leading-8 list-disc pl-5 marker:text-pink-600">
                <li>Usar la plataforma de forma correcta, respetuosa y conforme a la ley.</li>
                <li>No utilizar KambiaPe para fraudes, estafas, publicidad engañosa o actividades ilícitas.</li>
                <li>Mantener un trato adecuado y cordial con otros usuarios.</li>
              </ul>
              <p class="mt-2 leading-8">El incumplimiento de estas obligaciones podrá dar lugar a la suspensión o eliminación inmediata de la cuenta.</p>
            </section>
  
            <hr class="my-8 border-slate-200"/>
  
            <section id="resp-plataforma" class="scroll-mt-28 max-w-prose">
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">6. Responsabilidad de KambiaPe</h2>
              <ul class="mt-4 space-y-2 leading-8 list-disc pl-5 marker:text-pink-600">
                <li>KambiaPe no se hace responsable por la calidad, estado, veracidad o cumplimiento de los productos, servicios o intercambios publicados por los usuarios.</li>
                <li>La plataforma tampoco será responsable de daños directos o indirectos que pudieran surgir como consecuencia del uso de la misma.</li>
                <li>KambiaPe se compromete únicamente a mantener un espacio digital funcional, seguro y en constante mejora.</li>
              </ul>
            </section>
  
            <hr class="my-8 border-slate-200"/>
  
            <section id="privacidad" class="scroll-mt-28 max-w-prose">
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">7. Privacidad y protección de datos</h2>
              <p class="mt-4 leading-8">KambiaPe cumple con la Ley de Protección de Datos Personales vigente en el Perú.</p>
              <ul class="mt-2 space-y-2 leading-8 list-disc pl-5 marker:text-pink-600">
                <li>Los datos proporcionados por los usuarios se utilizan únicamente para el funcionamiento de la plataforma.</li>
                <li>No se compartirán con terceros sin consentimiento expreso, salvo obligación legal.</li>
                <li>Cada usuario podrá solicitar la eliminación o modificación de sus datos en cualquier momento.</li>
              </ul>
            </section>
  
            <hr class="my-8 border-slate-200"/>
  
            <section id="modificaciones" class="scroll-mt-28 max-w-prose">
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">8. Modificación de los Términos y Condiciones</h2>
              <p class="mt-4 leading-8">KambiaPe podrá modificar estos Términos y Condiciones en cualquier momento. Los cambios se comunicarán a través de la plataforma y serán efectivos desde su publicación.</p>
            </section>
  
            <hr class="my-10 border-slate-200"/>
  
            <!-- Confirmación -->
            <div class="max-w-prose">
              <p class="text-sm text-slate-600">Al continuar usando KambiaPe, confirmas que has leído y aceptas estos términos.</p>
              <div class="mt-4 flex flex-wrap gap-3">
                <button @click="scrollToTop" type="button" class="inline-flex items-center gap-2 rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3l6 6H4l6-6Z"/></svg>
                  Volver arriba
                </button>
              </div>
            </div>
          </article>
        </div>
      </main>
  
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, computed } from 'vue'
  import Header from './Header.vue'
  import Footer from './Footer.vue'
  
  // Ajusta la fecha real de última actualización aquí (YYYY-MM-DD)
  const lastUpdated = '2025-09-20'
  const lastUpdatedFmt = computed(() => new Date(lastUpdated + 'T00:00:00').toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }))
  
  const toc = [
    { id: 'objeto', label: '1. Objeto' },
    { id: 'registro', label: '2. Registro' },
    { id: 'publicacion', label: '3. Publicación' },
    { id: 'intercambios', label: '4. Intercambios' },
    { id: 'resp-usuario', label: '5. Resp. usuario' },
    { id: 'resp-plataforma', label: '6. Resp. KambiaPe' },
    { id: 'privacidad', label: '7. Privacidad' },
    { id: 'modificaciones', label: '8. Modificaciones' }
  ]
  
  const activeId = ref(toc[0].id)
  
  function imprimir() {
    window.print()
  }
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activeId.value = entry.target.id
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] }
    )
  
    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el))
  })
  </script>
  
  <style scoped>
  /* Ritmo tipográfico y lectura larga */
  :root { --medida: 70ch; }
  
  /* Encabezados con énfasis sutil y sin tarjetas */
  section > h2 { position: relative; padding-top: .2rem; }
  section > h2::after {
    content: "";
    display: block;
    height: 2px;
    width: 3rem;
    margin-top: .6rem;
    background: theme('colors.pink.600');
  }
  
  /* Listas elegantes */
  ul { list-style: disc; }
  li::marker { color: theme('colors.pink.600'); }
  
  /* Ajustes de anclaje */
  [id] { scroll-margin-top: 7rem; }
  
  /* Estado activo del riel (mejor contraste sin tarjetas) */
  @media (min-width: 1024px) {
    aside a[aria-current="true"] { font-weight: 600; }
  }
  
  /* Modo impresión: diseño editorial limpio */
  @media print {
    header, aside, .sr-only { display: none !important; }
    main { padding: 0 !important; }
  }
  </style>
  