<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans text-gray-900 antialiased">
    <Header />

    <!-- ===== Hero ===== -->
    <section class="relative min-h-[92vh] overflow-hidden bg-white text-slate-900">
  <!-- textura editorial muy sutil -->
  <div class="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(90deg,#000_1px,transparent_1px),linear-gradient(#000_1px,transparent_1px)] bg-[size:28px_28px] -z-10"></div>

  <div class="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 py-12 sm:py-16">
    <div class="grid grid-cols-12 gap-x-10 gap-y-12 items-start">

      <!-- IZQUIERDA: bloque editorial -->
      <header class="col-span-12 lg:col-span-5">
        <p class="text-xs tracking-[0.28em] uppercase text-pink-700/70">Perú • Comunidad • Innovación</p>

        <h1 class="mt-3 text-[10.5vw] sm:text-6xl lg:text-6xl font-black leading-[0.95] tracking-tight">
          Ideas en acción.
        </h1>

        <p class="mt-5 max-w-[56ch] text-base sm:text-lg leading-relaxed text-slate-700">
          KambiaPe conecta personas para transformar barrios, escuelas y emprendimientos. Simple, local, real.
        </p>

        <!-- CTAs: 1 botón (ancla) + 1 texto simple -->
        <div class="mt-7 flex flex-wrap items-center gap-4">
          <!-- lleva al filmstrip de abajo -->
          <a href="#galeria"
             class="inline-flex items-center gap-3 border border-slate-900 bg-pink-50 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
            Conoce la historia
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>

          <!-- Texto simple (no botón) → también baja a la galería -->
          <a href="#galeria" class="text-sm font-medium text-slate-900 hover:text-slate-700">
            Conócenos!
          </a>
        </div>

        <!-- TEMAS con marcadores cuadrados -->
        <div class="mt-8 border-y border-slate-200 py-3">
          <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold tracking-wide">
            <span class="inline-flex items-center gap-2"><span class="h-2 w-2 bg-pink-600"></span>#Comunidad</span>
            <span class="inline-flex items-center gap-2"><span class="h-2 w-2 bg-pink-600"></span>#Sostenibilidad</span>
            <span class="inline-flex items-center gap-2"><span class="h-2 w-2 bg-pink-600"></span>#Innovación</span>
            <span class="inline-flex items-center gap-2"><span class="h-2 w-2 bg-pink-600"></span>#Educación</span>
          </div>
        </div>
      </header>

      <!-- DERECHA: collage con cortes en ángulo (sin rounded, sin “cards”) -->
      <aside class="col-span-12 lg:col-span-7">
        <div class="grid grid-cols-2 gap-5">
          <!-- panel alto con corte inferior oblicuo -->
          <figure class="relative col-span-1 h-[28rem] sm:h-[32rem] border border-slate-200 shadow-[0_8px_24px_rgba(2,6,23,0.08)] overflow-hidden
                         [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]">
            <img class="absolute inset-0 h-full w-full object-cover object-center"
                 src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1600&auto=format&fit=crop"
                 alt="Mentoría STEAM en colegio público">
            <figcaption class="absolute left-0 top-0 bg-black/75 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-white">Educación</figcaption>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent px-5 py-4">
              <h3 class="text-xl font-extrabold text-white">Escuelas que inspiran</h3>
            </div>
          </figure>

          <!-- dos paneles apilados con cortes alternados -->
          <div class="col-span-1 grid grid-rows-2 gap-5">
            <!-- corte superior oblicuo -->
            <figure class="relative h-[13rem] sm:h-[15rem] border border-slate-200 shadow-[0_6px_18px_rgba(2,6,23,0.08)] overflow-hidden
                           [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]">
              <img class="absolute inset-0 h-full w-full object-cover object-center"
                   src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1600&auto=format&fit=crop"
                   alt="Reciclaje y compostaje comunitario">
              <figcaption class="absolute left-0 top-0 bg-black/75 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-white">Sostenibilidad</figcaption>
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent px-4 py-3">
                <h3 class="text-base font-extrabold text-white">Rutas verdes</h3>
              </div>
            </figure>

            <!-- corte inferior oblicuo inverso -->
            <figure class="relative h-[13rem] sm:h-[15rem] border border-slate-200 shadow-[0_6px_18px_rgba(2,6,23,0.08)] overflow-hidden
                           [clip-path:polygon(0%_0%,100%_0%,100%_94%,0%_100%)]">
              <img class="absolute inset-0 h-full w-full object-cover object-center"
                   src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop"
                   alt="Emprendimiento local y comercio digital">
              <figcaption class="absolute left-0 top-0 bg-black/75 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-white">Emprendimiento</figcaption>
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent px-4 py-3">
                <h3 class="text-base font-extrabold text-white">Impulso emprendedor</h3>
              </div>
            </figure>
          </div>
        </div>
      </aside>

      <!-- ABAJO: filmstrip infinita (A + A) -->
      <div class="col-span-12">
        <div id="galeria" class="group relative overflow-hidden border-t border-b border-slate-200 bg-white scroll-mt-28 sm:scroll-mt-32">
          <!-- padding fuera de la pista para no romper el loop -->
          <div class="px-3">
            <!-- PISTA: dos segmentos idénticos -->
            <div class="strip-track flex animate-strip will-change-transform group-hover:[animation-play-state:paused]">
              <!-- SEGMENTO A -->
              <div class="strip-segment flex items-stretch gap-4">
                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center"
                       src="https://images.unsplash.com/photo-1460602594182-8568137446ce?q=80&w=1600&auto=format&fit=crop" alt="Voluntariado local">
                </div>
                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center"
                       src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop" alt="Taller de programación">
                </div>
                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center"
                       src="https://images.unsplash.com/photo-1523978591478-c753949ff840?q=80&w=1600&auto=format&fit=crop" alt="Huertos urbanos">
                </div>
                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center"
                       src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop" alt="Robótica escolar">
                </div>
                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center"
                       src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1600&auto=format&fit=crop" alt="Reciclaje creativo">
                </div>

                <!-- reemplazos estables -->
                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center"
                       src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
                       alt="Conectividad digital">
                </div>
                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center"
                       src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
                       alt="Playas limpias">
                </div>

                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center"
                       src="https://images.unsplash.com/photo-1523246191808-8b3f0062cc48?q=80&w=1600&auto=format&fit=crop" alt="Negocio digital">
                </div>
              </div>

              <!-- SEGMENTO A (duplicado) -->
              <div class="strip-segment flex items-stretch gap-4" aria-hidden="true">
                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1460602594182-8568137446ce?q=80&w=1600&auto=format&fit=crop" alt="">
                </div>
                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop" alt="">
                </div>
                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1523978591478-c753949ff840?q=80&w=1600&auto=format&fit=crop" alt="">
                </div>
                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop" alt="">
                </div>
                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1600&auto=format&fit=crop" alt="">
                </div>

                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop" alt="">
                </div>
                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop" alt="">
                </div>

                <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]">
                  <img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1523246191808-8b3f0062cc48?q=80&w=1600&auto=format&fit=crop" alt="">
                </div>
              </div>
            </div>
          </div>

          <!-- fades laterales -->
          <div class="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/95 to-transparent"></div>
          <div class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/95 to-transparent"></div>
        </div>
      </div>

    </div>
  </div>
</section>



    <!-- ===== Historia ===== -->
    <!-- ================== ABOUT · SCROLLYTELLLING EDITORIAL ================== -->
<section id="about-kambia" class="relative bg-white text-slate-900">
  <div class="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 py-14 lg:py-20 grid grid-cols-12 gap-x-10 gap-y-12">

    <!-- IZQUIERDA · Sticky + Índice -->
    <aside class="col-span-12 lg:col-span-4">
      <div class="lg:sticky lg:top-24">
        <!-- Wordmark tenue -->
        <div aria-hidden="true" class="text-[12vw] lg:text-[5vw] font-black tracking-[-0.03em] text-slate-900/5 leading-none -ml-1">
          KAMBIA•PE
        </div>

        <header class="mt-3">
          <div class="text-[11px] tracking-[0.28em] uppercase text-[#9e0154]">Acerca de</div>
          <h1 class="mt-1 text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight">Trueque con propósito.</h1>
        </header>

        <p class="mt-5 text-base sm:text-lg leading-relaxed text-slate-800 max-w-prose">
          Creamos puentes entre personas y barrios para que el intercambio vuelva a ser cotidiano, justo y medible.
        </p>

        <!-- Claim duro (sin rounded) -->
        <div class="mt-6 border border-[#f3c0d6] bg-[linear-gradient(90deg,#fdf2f8,#fce7f3)] px-5 py-4">
          <p class="text-lg sm:text-xl font-semibold text-[#9e0154]">
            Intercambiar es <span class="text-[#d7037b] font-extrabold">confiar</span> y <span class="text-[#d7037b] font-extrabold">co-crear</span>.
          </p>
        </div>

        <!-- Índice de secciones (resalta activo) -->
        <nav class="mt-8 border-t border-b border-slate-200 divide-y divide-slate-200" aria-label="Secciones">
          <a href="#pliego-que-es"
             class="block px-3 py-3 text-sm font-semibold tracking-wide transition-colors"
             :class="activePanel==='que-es' ? 'text-slate-900 border-l-2 border-slate-900' : 'text-slate-500 hover:text-slate-800'">
            01 · Qué es KambiaPe
          </a>
          <a href="#pliego-mision"
             class="block px-3 py-3 text-sm font-semibold tracking-wide transition-colors"
             :class="activePanel==='mision' ? 'text-slate-900 border-l-2 border-slate-900' : 'text-slate-500 hover:text-slate-800'">
            02 · Misión
          </a>
          <a href="#pliego-vision"
             class="block px-3 py-3 text-sm font-semibold tracking-wide transition-colors"
             :class="activePanel==='vision' ? 'text-slate-900 border-l-2 border-slate-900' : 'text-slate-500 hover:text-slate-800'">
            03 · Visión
          </a>
        </nav>
      </div>
    </aside>

    <!-- DERECHA · Pliegos verticales (sin “cards”, sin rounded) -->
    <div class="col-span-12 lg:col-span-8 space-y-14">

      <!-- Pliego 01 -->
      <article
        id="pliego-que-es"
        class="grid grid-cols-12 gap-6 items-start scroll-mt-24"
        v-intersect="{ handler: (v)=>onPanelIntersect('que-es', v), options: { threshold: 0.5 } }"
      >
        <header class="col-span-12">
          <div class="flex items-baseline justify-between">
            <div>
              <div class="text-[11px] tracking-[0.24em] uppercase text-[#9e0154]">01</div>
              <h2 class="mt-1 text-3xl sm:text-4xl font-extrabold">Qué es KambiaPe</h2>
            </div>
            <div class="hidden sm:flex items-center gap-2 w-[40%]">
              <span class="h-[3px] w-full bg-slate-200">
                <span class="block h-full bg-slate-900" :style="{ width: activePanel==='que-es' ? '100%' : '0%' }"></span>
              </span>
            </div>
          </div>
        </header>

        <div class="col-span-12 lg:col-span-6">
          <p class="text-slate-700 leading-relaxed">
            Una red donde productos, servicios y conocimientos se intercambian con reglas claras, reputación visible y mediación.
            Tecnología al servicio de la confianza local.
          </p>
          <div class="mt-6 border border-[#f3c0d6] bg-[linear-gradient(90deg,#fdf2f8,#fce7f3)] px-4 py-3 text-sm font-semibold text-[#9e0154]">
            Lo digital acerca, la comunidad decide.
          </div>
        </div>

        <figure class="col-span-12 lg:col-span-6 relative h-64 sm:h-80 border border-slate-200 overflow-hidden
                       [clip-path:polygon(0%_0%,100%_0%,100%_85%,0%_100%)]">
          <img
            class="absolute inset-0 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop"
            alt="Personas colaborando en un taller"
          />
          <figcaption class="absolute left-0 top-0 bg-black/70 text-white text-[11px] tracking-[0.22em] px-3 py-2 uppercase">
            Colaboración
          </figcaption>
        </figure>
      </article>

      <!-- Pliego 02 -->
      <article
        id="pliego-mision"
        class="grid grid-cols-12 gap-6 items-start scroll-mt-24"
        v-intersect="{ handler: (v)=>onPanelIntersect('mision', v), options: { threshold: 0.5 } }"
      >
        <header class="col-span-12">
          <div class="flex items-baseline justify-between">
            <div>
              <div class="text-[11px] tracking-[0.24em] uppercase text-[#d7037b]">02</div>
              <h2 class="mt-1 text-3xl sm:text-4xl font-extrabold">Misión</h2>
            </div>
            <div class="hidden sm:flex items-center gap-2 w-[40%]">
              <span class="h-[3px] w-full bg-slate-200">
                <span class="block h-full bg-slate-900" :style="{ width: activePanel==='mision' ? '100%' : '0%' }"></span>
              </span>
            </div>
          </div>
        </header>

        <figure class="col-span-12 lg:col-span-6 relative h-64 sm:h-80 border border-slate-200 overflow-hidden
                       [clip-path:polygon(0%_10%,100%_0%,100%_100%,0%_90%)]">
          <img
            class="absolute inset-0 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1523978591478-c753949ff840?q=80&w=1600&auto=format&fit=crop"
            alt="Huertos urbanos y reutilización"
          />
          <figcaption class="absolute left-0 top-0 bg-black/70 text-white text-[11px] tracking-[0.22em] px-3 py-2 uppercase">
            Reutilización
          </figcaption>
        </figure>

        <div class="col-span-12 lg:col-span-6">
          <p class="text-slate-700 leading-relaxed">
            Facilitar el intercambio justo entre personas mediante una plataforma confiable, segura y usable, con foco en impacto local.
          </p>
          <ul class="mt-6 space-y-3 text-slate-800">
            <li class="flex gap-3"><span class="mt-2 h-2 w-2 bg-[#d7037b] shrink-0"></span>Reglas claras y reputación pública.</li>
            <li class="flex gap-3"><span class="mt-2 h-2 w-2 bg-[#d7037b] shrink-0"></span>Inclusión económica en barrios y escuelas.</li>
            <li class="flex gap-3"><span class="mt-2 h-2 w-2 bg-[#d7037b] shrink-0"></span>Menos desperdicio a través de la reutilización.</li>
          </ul>
        </div>
      </article>

      <!-- Pliego 03 -->
      <article
        id="pliego-vision"
        class="grid grid-cols-12 gap-6 items-start scroll-mt-24"
        v-intersect="{ handler: (v)=>onPanelIntersect('vision', v), options: { threshold: 0.5 } }"
      >
        <header class="col-span-12">
          <div class="flex items-baseline justify-between">
            <div>
              <div class="text-[11px] tracking-[0.24em] uppercase text-[#7a0142]">03</div>
              <h2 class="mt-1 text-3xl sm:text-4xl font-extrabold">Visión</h2>
            </div>
            <div class="hidden sm:flex items-center gap-2 w-[40%]">
              <span class="h-[3px] w-full bg-slate-200">
                <span class="block h-full bg-slate-900" :style="{ width: activePanel==='vision' ? '100%' : '0%' }"></span>
              </span>
            </div>
          </div>
        </header>

        <!-- Contenido VISIÓN SIN MÉTRICAS -->
        <div class="col-span-12 lg:col-span-6">
          <p class="text-slate-700 leading-relaxed">
            Liderar el intercambio solidario en Perú con una economía colaborativa y sostenible, conectando comunidades a nivel nacional
            a través de alianzas locales y tecnología centrada en las personas.
          </p>
          <div class="mt-6 border-t border-slate-200 pt-3 text-sm text-slate-700">
            Alianzas con municipios y escuelas, embajadores locales y un motor de matching que prioriza cercanía, impacto y confianza.
          </div>
        </div>

        <figure class="col-span-12 lg:col-span-6 relative h-64 sm:h-80 border border-slate-200 overflow-hidden
                       [clip-path:polygon(0%_0%,100%_8%,100%_100%,0%_92%)]">
          <img
            class="absolute inset-0 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop"
            alt="Robótica y formación tecnológica"
          />
          <figcaption class="absolute left-0 top-0 bg-black/70 text-white text-[11px] tracking-[0.22em] px-3 py-2 uppercase">
            Formación
          </figcaption>
        </figure>
      </article>

    </div>
  </div>
</section>


    <!-- ===== Valores ===== -->
<!-- ============== SECCIÓN COMPACTA · ESCANEABLE (MISMOS PADDING + SEPARADORES SENCILLOS) ============== -->
<section id="valores-beneficios" class="py-24 bg-white relative overflow-hidden">
  <!-- Separador superior sencillo -->
  <div aria-hidden="true" class="mb-10 flex items-center gap-3 px-8 sm:px-10 lg:px-12">
    <span class="h-px w-full bg-slate-200"></span>
    <span class="h-[3px] w-16 bg-gradient-to-r from-[#d7037b] to-[#9e0154]"></span>
    <span class="h-px w-full bg-slate-200"></span>
  </div>

  <div class="relative mx-auto max-w-7xl px-8 sm:px-10 lg:px-12">
    <!-- Encabezado breve -->
    <header class="mb-10">
      <div class="flex items-end justify-between gap-10">
        <div class="min-w-0">
          <div class="text-[10px] tracking-[0.28em] uppercase text-[#9e0154]">Brand & Propósito</div>
          <h2 class="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Por qué <span class="text-[#9e0154]">KambiaPe</span> · Valores en acción
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-700/90">
            Lo esencial primero. Detalles solo si los necesitas.
          </p>
        </div>
        <div class="hidden sm:block w-40">
          <div class="h-[2px] w-full bg-slate-200"></div>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-12 gap-12 items-start">
      <!-- ========== IZQUIERDA · POR QUÉ ELEGIR (compacto y accionable) ========== -->
      <section class="col-span-12 lg:col-span-7">
        <!-- Tabs discretas y cortas -->
        <nav role="tablist" aria-label="Razones para elegir KambiaPe"
             class="mb-4 overflow-x-auto whitespace-nowrap no-scrollbar border-b border-slate-200">
          <ul class="flex gap-2">
            <li v-for="(b,i) in benefits" :key="'why-tab-'+i">
              <button
                role="tab" type="button"
                :id="`why-tab-${i}`" :aria-controls="`why-panel-${i}`"
                :aria-selected="activeBenefit===i"
                @click="activeBenefit=i"
                class="px-3 py-2 text-[13px] font-semibold tracking-wide text-slate-700 hover:text-slate-900 transition-colors border-b-2"
                :class="activeBenefit===i ? 'border-[#9e0154] text-slate-900' : 'border-transparent'"
              >
                {{ b.title }}
              </button>
            </li>
          </ul>
        </nav>

        <!-- Panel súper conciso -->
        <div
          :id="`why-panel-${activeBenefit}`"
          role="tabpanel" :aria-labelledby="`why-tab-${activeBenefit}`"
          class="relative border border-slate-200"
        >
          <!-- capa decorativa sutil al fondo -->
          <div aria-hidden="true"
               class="pointer-events-none absolute inset-0 opacity-[0.05] -z-10
                      bg-[linear-gradient(90deg,#000_1px,transparent_1px),linear-gradient(#000_1px,transparent_1px)]
                      bg-[size:26px_26px]"></div>

          <div class="grid grid-cols-12 gap-8 p-8 items-start">
            <!-- sello/icono -->
            <div class="col-span-12 md:col-span-3">
              <div class="flex md:justify-start justify-center">
                <div class="relative h-16 w-16 border border-slate-300 overflow-hidden
                            [clip-path:polygon(0%_0%,100%_0%,100%_82%,0%_100%)]">
                  <component :is="benefits[activeBenefit].icon" class="absolute inset-0 m-auto h-9 w-9 text-slate-900" />
                </div>
              </div>
              <div class="mt-3 text-[11px] tracking-[0.22em] uppercase text-slate-500 text-center md:text-left">Razón</div>
            </div>

            <!-- copy ultra-compacto -->
            <div class="col-span-12 md:col-span-9 min-w-0">
              <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {{ benefits[activeBenefit].visualTitle }}
              </h3>

              <!-- bullets de 1 línea (scan en 5s) -->
              <ul class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[14px] text-slate-800">
                <li class="flex items-start gap-2">
                  <span class="mt-1 h-1.5 w-1.5 bg-slate-900 shrink-0"></span>
                  <span>Rápido y sin fricción</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-1 h-1.5 w-1.5 bg-slate-900 shrink-0"></span>
                  <span>Confianza verificada</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-1 h-1.5 w-1.5 bg-slate-900 shrink-0"></span>
                  <span>Impacto local real</span>
                </li>
              </ul>

              <!-- tagline como frase clave -->
              <div class="mt-5 inline-flex items-center gap-3">
                <span class="h-[3px] w-8" :class="benefits[activeBenefit].bgColor"></span>
                <span class="text-sm font-medium text-slate-800">“{{ benefits[activeBenefit].tagline }}”</span>
              </div>

              <!-- Ver más (progressive disclosure) -->
              <details class="mt-5">
                <summary class="cursor-pointer text-[12px] uppercase tracking-[0.18em] text-slate-500 hover:text-slate-900">
                  Ver más
                </summary>
                <p class="mt-3 text-[15px] leading-relaxed text-slate-700">
                  {{ benefits[activeBenefit].visualDescription }}
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <!-- ========== DERECHA · VALORES (resumen 1 línea + detalle opcional) ========== -->
      <aside class="col-span-12 lg:col-span-5">
        <div class="mb-3 flex items-baseline justify-between">
          <div class="text-[11px] tracking-[0.28em] uppercase text-[#9e0154]">Valores</div>
          <div class="h-[2px] w-24 bg-slate-200"></div>
        </div>

        <ol role="list" class="space-y-3">
          <li
            v-for="(value, idx) in values"
            :key="'val-rail-'+idx"
            class="group border border-slate-200"
          >
            <div class="grid grid-cols-[6px_minmax(0,1fr)_auto] items-start">
              <!-- riel de color -->
              <span :style="{ backgroundColor: value.color }" aria-hidden="true"></span>

              <!-- 1-liner + Ver más -->
              <div class="px-6 py-4 min-w-0">
                <div class="flex items-start justify-between gap-4">
                  <h3 class="text-[15px] font-semibold text-slate-900 min-w-0">
                    <span class="whitespace-normal break-words">{{ value.title }}</span>
                  </h3>
                  <div class="text-[11px] font-mono tabular-nums tracking-widest text-slate-400 shrink-0">
                    {{ (idx + 1).toString().padStart(2,'0') }}
                  </div>
                </div>
                <!-- microcopy de 1 línea -->
                <p class="mt-1 text-[13px] text-slate-600 whitespace-normal break-words">
                  {{ value.description }}
                </p>

                <!-- detalle opcional -->
                <details class="mt-2">
                  <summary class="cursor-pointer text-[11px] uppercase tracking-[0.18em] text-slate-500 hover:text-slate-900">
                    Ver más
                  </summary>
                  <p class="mt-2 text-[14px] text-slate-700 leading-relaxed">
                    Vivimos este valor en cada trueque: reglas claras, reputación visible y soluciones simples.
                  </p>
                </details>
              </div>

              <!-- vínculo con razones -->
              <div class="px-6 py-4">
                <button
                  type="button"
                  @click="activeBenefit = idx % benefits.length"
                  class="text-[11px] tracking-[0.22em] uppercase text-slate-500 hover:text-slate-900"
                >
                  Vincular
                </button>
              </div>
            </div>
          </li>
        </ol>
      </aside>
    </div>
  </div>

  <!-- Separador inferior sencillo -->
  <div aria-hidden="true" class="mt-12 flex items-center gap-3 px-8 sm:px-10 lg:px-12">
    <span class="h-px w-full bg-slate-200"></span>
    <span class="h-[3px] w-16 bg-gradient-to-r from-[#9e0154] to-[#d7037b]"></span>
    <span class="h-px w-full bg-slate-200"></span>
  </div>
</section>


    <!-- ===== STRIP REDES KAMBIX ===== -->
    <section class="relative w-full overflow-hidden" aria-label="Redes sociales Kambix">
      <div class="absolute inset-0 bg-gradient-to-r from-[#d7037b] to-[#9e0154]">
        <div class="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4)_1px,transparent_1.5px)] bg-[length:18px_18px]"></div>
        <div class="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.4)_1px,transparent_1.5px)] bg-[length:18px_18px]"></div>
      </div>

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-5">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-center sm:text-left font-extrabold tracking-wide text-white drop-shadow-[0_2px_0_rgba(158,1,84,0.6)] text-[clamp(14px,2vw,20px)]">
            ¡<span class="uppercase">Kambix</span>! Síguenos y entérate de todas las novedades que tenemos para ti
          </p>

          <nav class="flex items-center justify-center gap-2 sm:gap-3" aria-label="Redes sociales">
            <a href="https://www.instagram.com/kambia_pe?igsh=MWg2aWR3YnhnNW1qdw==" target="_blank" rel="noopener noreferrer" class="group inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all duration-200 hover:scale-[1.04] hover:bg-white" aria-label="Instagram de Kambix (@kambix_oficial)">
              <svg class="h-5 w-5 text-[#9e0154]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5a5.5 5.5 0 1 0 5.5 5.5A5.5 5.5 0 0 0 12 7.5ZM18 6.8a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 18 6.8Z"/></svg>
            </a>
            <a href="https://tiktok.com/@kambiape" target="_blank" rel="noopener noreferrer" class="group inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all duration-200 hover:scale-[1.04] hover:bg-white" aria-label="TikTok de Kambix">
              <svg class="h-5 w-5 text-[#9e0154]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3h3.1A6.9 6.9 0 0 0 23 9.9V13A10 10 0 0 1 13 6.1V16a6 6 0 1 1-6-6c.34 0 .68.03 1.02.1V13a3 3 0 1 0 3 3V3Z"/></svg>
            </a>
            <a href="https://www.facebook.com/share/1A62pnpV8K/ " target="_blank" rel="noopener noreferrer" class="group inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all duration-200 hover:scale-[1.04] hover:bg-white" aria-label="Facebook de Kambix">
              <svg class="h-5 w-5 text-[#9e0154]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951Z"/></svg>
            </a>
          </nav>
        </div>
      </div>
    </section>

    <!-- ===== Footer ===== -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue'
import Header from './Header.vue'
import Footer from './Footer.vue'

import {
  ArrowRightIcon,
  RocketLaunchIcon,
  EyeIcon,
  HandRaisedIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  CubeTransparentIcon,
  LightBulbIcon,
} from '@heroicons/vue/24/outline'

/* ========= Estado ========= */
const historyVisible = ref(false)
const activePanel = ref('que-es')     // 'que-es' | 'mision' | 'vision'
const activeValue = ref(null)

/* (Compat opcional) */
const missionFlipped = ref(false)
const visionFlipped = ref(false)
const activeRadial = ref(null)
const activeBenefit = ref(0)

/* ========= Data ========= */
const values = ref([
  { title: 'Innovación', description: 'Construimos el futuro del trueque con soluciones creativas y adaptables, siempre buscando ir más allá.', icon: LightBulbIcon, color: '#d7037b' },
  { title: 'Comunidad', description: 'Fomentamos la conexión, confianza y colaboración entre nuestros usuarios, creando lazos duraderos.', icon: UsersIcon, color: '#9e0154' },
  { title: 'Sostenibilidad', description: 'Promovemos un consumo consciente, la reutilización y el respeto por nuestro planeta en cada intercambio.', icon: CubeTransparentIcon, color: '#d7037b' },
])

/* >>>>>> FALTABA ESTO: Beneficios que usa el template <<<<<< */
const benefits = ref([
  {
    title: 'Simplicidad & Rapidez',
    description: 'Publica en minutos, encuentra lo que necesitas al instante. Un trueque sin complicaciones ni barreras.',
    icon: CheckCircleIcon,
    bgColor: 'bg-green-500',
    visualTitle: 'Intercambios en 3 Pasos',
    visualDescription: 'Publica tu artículo, encuentra el intercambio perfecto y acuerda con facilidad. ¡Así de simple!',
    tagline: 'La simplicidad es la máxima sofisticación en KambiaPe.',
  },
  {
    title: 'Confianza & Seguridad',
    description: 'Nuestra plataforma cuenta con herramientas de verificación avanzadas y una comunidad basada en el respeto.',
    icon: ShieldCheckIcon,
    bgColor: 'bg-blue-500',
    visualTitle: 'Plataforma Segura',
    visualDescription: 'Perfiles verificados y un sistema de reputación robusto para que cada trueque sea totalmente confiable.',
    tagline: 'Tu seguridad y tranquilidad son nuestra prioridad número uno.',
  },
  {
    title: 'Impacto Positivo',
    description: 'Cada intercambio en KambiaPe contribuye a una economía más justa y reduce significativamente el desperdicio.',
    icon: HeartIcon,
    bgColor: 'bg-pink-500',
    visualTitle: 'Contribuye al Planeta',
    visualDescription: 'Forma parte de la solución, reduce tu huella de carbono y fomenta la economía circular con cada trueque.',
    tagline: 'Pequeñas acciones, grandes cambios para un futuro sostenible.',
  },
  {
    title: 'Conexión Comunitaria',
    description: 'Únete a una vibrante red de vecinos y emprendedores que valoran la colaboración y el apoyo local.',
    icon: ChatBubbleLeftRightIcon,
    bgColor: 'bg-purple-500',
    visualTitle: 'Crea Nuevas Conexiones',
    visualDescription: 'Conecta con personas afines, comparte intereses y descubre oportunidades únicas en tu comunidad.',
    tagline: 'Juntos, creamos una comunidad más fuerte y unida.',
  },
])

/* (opcional) seguridad: si el índice se sale, vuelve a 0 */
if (!benefits.value.length) activeBenefit.value = 0
else activeBenefit.value = Math.min(activeBenefit.value, benefits.value.length - 1)

/* ========= Handlers de intersección ========= */
function onHistoryIntersect(entryOrBool) {
  const isVisible = typeof entryOrBool === 'boolean' ? entryOrBool : !!entryOrBool?.isIntersecting
  if (isVisible) historyVisible.value = true
}
function onPanelIntersect(key, entryOrBool) {
  const isVisible = typeof entryOrBool === 'boolean' ? entryOrBool : !!entryOrBool?.isIntersecting
  if (isVisible) activePanel.value = key
}

/* ========= Directiva local v-intersect ========= */
const vIntersect = {
  mounted(el, binding) {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return
    const isFn = typeof binding.value === 'function'
    const handler = isFn ? binding.value : binding.value?.handler
    const options = isFn ? {} : (binding.value?.options || {})
    if (typeof handler !== 'function') {
      console.warn('[v-intersect] handler no definido o no es función', binding.value)
      return
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) handler(entry)
    }, options)
    observer.observe(el)
    el._io = observer
  },
  unmounted(el) {
    el._io?.disconnect()
    delete el._io
  },
}

/* ========= Helpers de color ========= */
function hexToRgb(hex) {
  const h = hex.replace('#','')
  const full = h.length === 3 ? h.split('').map(c=>c+c).join('') : h
  const n = parseInt(full, 16)
  return [(n>>16)&255, (n>>8)&255, n&255]
}
function tint(hex, amount = 0.2) {
  const [r,g,b] = hexToRgb(hex)
  const nr = Math.round(r + (255 - r) * amount)
  const ng = Math.round(g + (255 - g) * amount)
  const nb = Math.round(b + (255 - b) * amount)
  return `rgb(${nr}, ${ng}, ${nb})`
}
function shade(hex, amount = -0.2) {
  const [r,g,b] = hexToRgb(hex)
  const nr = Math.max(0, Math.min(255, Math.round(r * (1 + amount))))
  const ng = Math.max(0, Math.min(255, Math.round(g * (1 + amount))))
  const nb = Math.max(0, Math.min(255, Math.round(b * (1 + amount))))
  return `rgb(${nr}, ${ng}, ${nb})`
}

/* ========= (Compat opcional) ========= */
function flipCard(t) { if (t==='mission') missionFlipped.value = true; if (t==='vision') visionFlipped.value = true }
function unflipCard(t){ if (t==='mission') missionFlipped.value = false; if (t==='vision') visionFlipped.value = false }

function focusNextValue() {
  const n = values.value.length
  if (!n) return
  activeValue.value = activeValue.value == null ? 0 : Math.min(activeValue.value + 1, n - 1)
  nextTick(()=>document.getElementById('valor-'+activeValue.value)?.focus())
}
function focusPrevValue() {
  const n = values.value.length
  if (!n) return
  activeValue.value = activeValue.value == null ? 0 : Math.max(activeValue.value - 1, 0)
  nextTick(()=>document.getElementById('valor-'+activeValue.value)?.focus())
}

onBeforeUnmount(() => { /* no-op */ })
</script>


<style scoped>
/* ==== Animaciones utilizadas (limpias) ==== */
@keyframes fade-in-up { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
.motion-safe\:animate-fade-in-up { animation: fade-in-up .8s ease-out both }

/* Reutilizadas en fondos */
@keyframes pulse-slow { 0%,100%{opacity:1} 50%{opacity:.7} }
@keyframes float-particles { 0%{transform:translate(0,0);opacity:.05} 50%{transform:translate(var(--tw-float-x,0), var(--tw-float-y,-20px));opacity:.1} 100%{transform:translate(0,0);opacity:.05} }
.animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite }
@keyframes bounce-slow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

/* Accesorios visuales extra */
.animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite }
.animate-spin-slow { animation: spin-slow 15s linear infinite }
@keyframes spin-slow { from{transform:rotate(0)} to{transform:rotate(360deg)} }

/* Olas / manos (placeholder de wave) */
@keyframes wave { 0%,60%,100%{ transform: rotate(0deg) } 30%{ transform: rotate(12deg) } }
.animate-wave { animation: wave 2.2s ease-in-out infinite }

/* Utilidades */
.transform-gpu { transform: translate3d(0,0,0) }
</style>
