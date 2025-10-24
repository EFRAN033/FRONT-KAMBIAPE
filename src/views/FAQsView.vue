<template>
    <div class="min-h-screen bg-[radial-gradient(120%_80%_at_25%_0%,#fff0f7_0%,#ffffff_55%,#fbfbfe_100%)] font-sans antialiased">
      <Header />
  
      <!-- Línea viva superior -->
      <div class="h-[2px] w-full bg-gradient-to-r from-[#d7037b] via-[#b90266] to-[#9e0154] opacity-70"></div>
  
      <main class="py-12 sm:py-16">
        <div class="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
  
          <!-- Hero editorial -->
          <header class="text-center mb-12 sm:mb-16">
            <p class="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d7037b]">
              Centro de ayuda
              <span class="h-[2px] w-6 bg-[#d7037b]/70"></span>
            </p>
  
            <h1 class="mt-2 text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
              Preguntas <span class="bg-clip-text text-transparent bg-[conic-gradient(from_180deg_at_50%_50%,#d7037b_0deg,#9e0154_160deg,#d7037b_360deg)]">Frecuentes</span>
            </h1>
  
            <p class="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600">
              Encuentra respuestas a las dudas más comunes sobre intercambios, publicaciones y el funcionamiento de KambiaPe.
            </p>
          </header>
  
          <!-- Buscador (UX, no intrusivo) -->
          <div class="mb-10 max-w-2xl mx-auto">
            <div class="relative group">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg class="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-[#d7037b]" viewBox="0 0 24 24" fill="none">
                  <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/>
                </svg>
              </div>

              <input
                type="search"
                v-model="query"
                placeholder="Encuentra respuestas al instante..."
                class="w-full rounded-full border-2 border-slate-200 bg-white py-3 pl-12 pr-5 text-slate-900 placeholder-slate-400 shadow-sm
                      outline-none transition-all duration-300 ease-in-out
                      focus:border-[#d7037b] focus:ring-4 focus:ring-[#d7037b]/20"
                aria-label="Buscar preguntas frecuentes"
              />
            </div>

            <p v-if="query" class="mt-3 text-center text-sm text-slate-600 transition-opacity duration-300">
              <span class="font-bold text-[#9e0154]">{{ filteredFaqs.length }}</span>
              resultado{{ filteredFaqs.length === 1 ? '' : 's' }} para
              <span class="font-semibold text-slate-800">“{{ query }}”</span>.
            </p>
          </div>
  
          <!-- Lista editorial de FAQs (sin tarjetas) -->
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" class="sr-only">Listado de preguntas</h2>
  
            <ol class="divide-y divide-slate-200">
              <li v-for="(faq, index) in filteredFaqs" :key="index" class="py-5 sm:py-6">
                <details class="group open:animate-[accordionDown_220ms_ease-out]">
                  <summary
                    class="flex cursor-pointer list-none items-start justify-between gap-4 text-slate-900 hover:text-slate-950 transition-colors"
                  >
                    <div class="flex items-start gap-3">
                      <span class="mt-1 text-xs font-bold text-[#d7037b] tabular-nums w-7 text-right">
                        {{ (index + 1).toString().padStart(2, '0') }}
                      </span>
                      <span class="text-base sm:text-lg font-semibold leading-snug">
                        {{ faq.question }}
                      </span>
                    </div>
  
                    <!-- Ícono con micro-interacción -->
                    <div
                      class="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all
                             group-open:bg-[#d7037b] group-open:text-white"
                      aria-hidden="true"
                    >
                      <svg class="h-4 w-4 transform transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
  
                  <!-- Subrayado vivo al abrir -->
                  <div class="mt-3 h-[2px] w-full bg-gradient-to-r from-[#d7037b] via-[#b90266] to-[#9e0154] opacity-0 group-open:opacity-100 transition-opacity"></div>
  
                  <!-- Respuesta -->
                  <div class="mt-4 text-slate-700 leading-relaxed text-sm sm:text-base prose max-w-none" v-html="faq.answer"></div>
                </details>
              </li>
            </ol>
          </section>
  
          <!-- CTA de soporte (sin tarjeta) -->
          <section class="mt-16 text-center">
            <h3 class="text-xl sm:text-2xl font-bold text-slate-900">
              ¿No encontraste lo que buscabas?
            </h3>
            <p class="mt-2 text-slate-600">
              Nuestro equipo de soporte está listo para ayudarte.
            </p>
            <a
              href="mailto:kambiapex@gmail.com"
              class="mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white
                     bg-[conic-gradient(from_180deg_at_50%_50%,#d7037b_0deg,#9e0154_160deg,#d7037b_360deg)]
                     shadow-[0_10px_30px_-10px_rgba(215,3,123,0.45)]
                     transition-transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#d7037b]/30"
            >
              Contactar a Soporte
              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 10.382l7.997-4.498A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4.5-8-4.5V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>
          </section>
  
        </div>
      </main>
  
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  
  const faqs = ref([
    {
      question: '¿Cómo funciona KambiaPe?',
      answer:
        '<p>KambiaPe es una plataforma de trueque. Publicas un artículo que ya no necesitas, exploras lo que otros ofrecen y, si encuentras algo de tu interés, propones un intercambio. Si la otra persona acepta, se abre un chat privado para que coordinen los detalles de la entrega de forma segura.</p>',
    },
    {
      question: '¿Publicar un producto tiene algún costo?',
      answer:
        '<p>¡No! Publicar tus productos en KambiaPe es <strong>completamente gratis</strong>. Creemos en una economía circular accesible para todos, por lo que no cobramos comisiones por publicar ni por intercambiar.</p>',
    },
    {
      question: '¿Cómo se determina el valor de un producto?',
      answer:
        '<p>El "valor" en KambiaPe es referencial y subjetivo. No es dinero, sino una guía para que los intercambios sean justos. Un producto "valorado" en 50 podría intercambiarse por otro de 50, o por dos de 25. Al final, <strong>el acuerdo final depende de los usuarios involucrados</strong> en el chat.</p>',
    },
    {
      question: '¿Qué hago si no llegamos a un acuerdo en el chat?',
      answer:
        '<p>Si no logran un acuerdo, cualquiera de los dos puede rechazar la propuesta. La conversación se cerrará y ambos productos volverán a estar disponibles para otros intercambios. ¡Todo sin compromiso!</p>',
    },
    {
      question: '¿Es seguro intercambiar productos en la plataforma?',
      answer:
        '<ul><li><strong>Perfiles Verificados:</strong> Fomentamos la verificación de perfiles para aumentar la confianza.</li><li><strong>Chat Privado:</strong> Solo puedes chatear una vez que una propuesta es aceptada.</li><li><strong>Recomendación:</strong> Siempre recomendamos encontrarse en lugares públicos y concurridos para realizar el intercambio final.</li></ul>',
    },
    {
      question: '¿Puedo cancelar una propuesta de intercambio?',
      answer:
        '<p>Sí. Mientras la propuesta tenga el estado de "pendiente", puedes cancelarla en cualquier momento. Si ya fue aceptada, lo ideal es comunicarte con la otra persona a través del chat para cancelar el intercambio de mutuo acuerdo.</p>',
    },
  ]);
  
  /** Buscador simple (front) — no toca la BD */
  const query = ref('');
  const normalized = (s) =>
    (s || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  
  const filteredFaqs = computed(() => {
    if (!query.value.trim()) return faqs.value;
    const q = normalized(query.value);
    return faqs.value.filter((f) => {
      const question = normalized(f.question);
      const answerText = normalized(f.answer.replace(/<[^>]*>/g, ' '));
      return question.includes(q) || answerText.includes(q);
    });
  });
  </script>
  
  <style scoped>
  /* Oculta el marcador por defecto del <summary> */
  summary::-webkit-details-marker {
    display: none;
  }
  
  /* Animación de apertura suave */
  @keyframes accordionDown {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  
  /* Estilos de contenido enriquecido dentro de la respuesta */
  .prose ul {
    padding-left: 1.5rem;
    list-style-type: disc;
  }
  .prose li {
    margin-top: 0.5rem;
  }
  
  /* Soporte de alto contraste para dark mode si lo activas globalmente */
  /* :root.dark .prose { color: #e5e7eb; } */
  </style>
  