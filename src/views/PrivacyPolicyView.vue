<template>
  <div class="min-h-screen bg-white font-sans antialiased text-slate-800">
    <a href="#contenido" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow ring-2 ring-pink-600">Saltar al contenido</a>

    <Header />

    <header class="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-4">
          <nav aria-label="breadcrumb" class="text-sm text-slate-600">
            <ol class="flex flex-wrap items-center gap-1">
              <li><a href="/" class="hover:text-slate-900">Inicio</a></li>
              <li aria-hidden="true" class="px-1">/</li>
              <li class="text-slate-900 font-medium">Política de Privacidad</li>
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

        <article class="col-span-12 lg:col-span-9">
          <header class="mb-8">
            <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">Política de Privacidad de KambiaPe</h1>
            <p class="mt-2 text-slate-600 max-w-prose">En KambiaPe, la confianza se construye. Proteger tus datos es parte esencial de nuestro compromiso con una comunidad transparente, solidaria y segura.</p>
          </header>

          <hr class="my-8 border-slate-200"/>

          <section id="filosofia" class="scroll-mt-28 max-w-prose">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900">1. Nuestra filosofía</h2>
            <p class="mt-4 leading-8">KambiaPe nace para impulsar una nueva forma de economía colaborativa. Entendemos que cada dato personal que compartes representa un acto de confianza, y por eso lo tratamos con el máximo cuidado.</p>
          </section>

          <hr class="my-8 border-slate-200"/>

          <section id="recopilacion" class="scroll-mt-28 max-w-prose">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900">2. Información que recopilamos</h2>
            <p class="mt-4 leading-8">Cuando te unes a KambiaPe, recopilamos solo la información necesaria para brindarte una experiencia segura y personalizada. Esto incluye:</p>
            <ul class="mt-4 space-y-2 leading-8 list-disc pl-5 marker:text-pink-600">
              <li>Tu nombre completo.</li>
              <li>Número de DNI, para garantizar la seguridad en la comunidad.</li>
              <li>Correo electrónico y número de contacto.</li>
              <li>Ubicación general (ciudad o distrito, sin precisar dirección exacta).</li>
              <li>Descripción de los productos o servicios que ofreces o solicitas.</li>
            </ul>
          </section>

          <hr class="my-8 border-slate-200"/>

          <section id="finalidad" class="scroll-mt-28 max-w-prose">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900">3. Finalidad del uso de tus datos</h2>
            <p class="mt-4 leading-8">Usamos tu información con propósitos claros, éticos y limitados. Tu información nunca será utilizada con fines comerciales ajenos a KambiaPe ni se compartirá para publicidad externa.</p>
             <ul class="mt-2 space-y-2 leading-8 list-disc pl-5 marker:text-pink-600">
                <li>Facilitar los intercambios entre usuarios.</li>
                <li>Mantener la comunicación contigo sobre actualizaciones o mejoras.</li>
                <li>Garantizar la seguridad y el correcto funcionamiento de KambiaPe.</li>
                <li>Elaborar reportes internos para optimizar la experiencia.</li>
                <li>Enviarte información relevante, solo si lo autorizas.</li>
              </ul>
          </section>

          <hr class="my-8 border-slate-200"/>

          <section id="proteccion" class="scroll-mt-28 max-w-prose">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900">4. Protección de tu información</h2>
            <p class="mt-4 leading-8">KambiaPe implementa medidas técnicas y administrativas para proteger tus datos frente a accesos no autorizados, pérdida o alteración. Nuestro equipo actúa bajo principios de confidencialidad, ética y respeto digital, siguiendo las normas de la <strong>Ley N.º 29733, Ley de Protección de Datos Personales del Perú</strong>.</p>
          </section>

          <hr class="my-8 border-slate-200"/>

          <section id="derechos" class="scroll-mt-28 max-w-prose">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900">5. Tus derechos como usuario</h2>
            <p class="mt-4 leading-8">Tienes el control total sobre tu información. En cualquier momento puedes:</p>
            <ul class="mt-2 space-y-2 leading-8 list-disc pl-5 marker:text-pink-600">
              <li>Acceder a tus datos personales.</li>
              <li>Solicitar su corrección o actualización.</li>
              <li>Pedir la eliminación definitiva de tu cuenta y datos.</li>
              <li>Retirar tu consentimiento para recibir comunicaciones.</li>
            </ul>
            <p class="mt-4 leading-8">Solo escríbenos a <a href="mailto:kambiapex@gmail.com" class="font-medium text-pink-600 hover:text-pink-700">kambiapex@gmail.com</a> y atenderemos tu solicitud.</p>
          </section>

          <hr class="my-8 border-slate-200"/>

          <section id="comparticion" class="scroll-mt-28 max-w-prose">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900">6. Compartición de datos</h2>
            <p class="mt-4 leading-8">KambiaPe no comparte, vende ni alquila tus datos personales. Solo podríamos compartir información en casos de requerimiento por una autoridad legal o judicial, o si es necesario para resolver conflictos y garantizar la seguridad de los usuarios.</p>
          </section>

          <hr class="my-8 border-slate-200"/>

          <section id="cookies" class="scroll-mt-28 max-w-prose">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900">7. Uso de cookies</h2>
            <p class="mt-4 leading-8">KambiaPe utiliza cookies para recordar tus preferencias y mejorar tu experiencia, sin rastrearte. Puedes desactivarlas en cualquier momento desde la configuración de tu navegador.</p>
          </section>

           <hr class="my-8 border-slate-200"/>

            <section id="actualizacion" class="scroll-mt-28 max-w-prose">
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">8. Actualización de esta política</h2>
              <p class="mt-4 leading-8">Podemos actualizar esta Política de Privacidad cuando sea necesario. Te avisaremos siempre de manera visible dentro de la plataforma antes de que las modificaciones entren en vigor.</p>
            </section>

          <hr class="my-10 border-slate-200"/>

          <div class="max-w-prose">
            <p class="text-sm text-slate-600">Gracias por confiar en KambiaPe, donde la tecnología se encuentra con la solidaridad y la privacidad es parte del respeto mutuo.</p>
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
import Header from './Header.vue' // Asegúrate de que la ruta sea correcta
import Footer from './Footer.vue' // Asegúrate de que la ruta sea correcta

// Ajusta la fecha real de última actualización aquí (YYYY-MM-DD)
const lastUpdated = '2025-10-24'
const lastUpdatedFmt = computed(() => new Date(lastUpdated + 'T00:00:00').toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }))

// *** ¡IMPORTANTE! ***
// Este es el nuevo índice de contenidos para la Política de Privacidad.
const toc = [
  { id: 'filosofia', label: '1. Filosofía' },
  { id: 'recopilacion', label: '2. Recopilación' },
  { id: 'finalidad', label: '3. Finalidad' },
  { id: 'proteccion', label: '4. Protección' },
  { id: 'derechos', label: '5. Derechos' },
  { id: 'comparticion', label: '6. Compartición' },
  { id: 'cookies', label: '7. Cookies' },
  { id: 'actualizacion', label: '8. Actualización' }
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
    // Ajuste para que el ancla activa sea la que está más cerca de la parte superior
    { rootMargin: '-28% 0px -70% 0px', threshold: [0, 1] }
  )

  document.querySelectorAll('section[id]').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
/* Estos estilos son heredados de TermsView.vue para mantener la consistencia */

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

/* Ajustes de anclaje para la navegación pegajosa */
[id] { scroll-margin-top: 7rem; }

/* Estado activo del riel (mejor contraste sin tarjetas) */
@media (min-width: 1024px) {
  aside a[aria-current="true"] { font-weight: 600; }
}

/* Modo impresión: diseño editorial limpio */
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  header, aside, footer, button, nav { display: none !important; }
  main { padding: 0 !important; }
  article {
    max-width: 100% !important;
    padding: 0 !important;
  }
  h1, h2 {
    page-break-after: avoid;
  }
}
</style>