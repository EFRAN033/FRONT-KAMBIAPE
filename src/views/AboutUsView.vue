<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans text-gray-900 antialiased">
    <Header />

    <!-- ===== Hero ===== -->
    <section class="relative min-h-[88vh] overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50 text-slate-900">
  <!-- acentos suaves -->
  <div class="pointer-events-none absolute inset-0" aria-hidden="true">
    <div class="absolute -top-24 left-[-8%] h-[32rem] w-[32rem] rounded-full bg-pink-200/40 blur-[100px]"></div>
    <div class="absolute bottom-[-15%] right-[-10%] h-[44rem] w-[44rem] rounded-full bg-fuchsia-200/40 blur-[120px]"></div>
  </div>

  <div class="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 py-10 sm:py-14">
    <!-- Encabezado minimal -->
    <header class="flex items-center justify-between gap-6">
      <div>
        <span class="inline-flex items-center gap-2 rounded-full border border-pink-300/50 bg-pink-100/60 px-3 py-1 text-[12px] font-medium text-pink-800">
          • Hecho en Perú • Comunidad abierta
        </span>
        <h1 class="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
          KambiaPe
        </h1>
      </div>
      <nav class="hidden sm:flex items-center gap-5 text-sm text-slate-700">
        <a href="#mision" class="hover:text-slate-900 underline underline-offset-4 decoration-pink-500/50">Misión</a>
        <a href="#proyectos" class="hover:text-slate-900 underline underline-offset-4 decoration-pink-500/50">Proyectos</a>
        <a href="#comunidad" class="hover:text-slate-900 underline underline-offset-4 decoration-pink-500/50">Comunidad</a>
      </nav>
    </header>

    <!-- CARRUSEL protagonista -->
    <div class="mt-10">
      <!-- rail -->
      <div
        class="relative overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-6 pr-4"
        role="region" aria-label="Carrusel KambiaPe">

        <!-- Slide 1 -->
        <article id="slide-1"
          class="snap-center relative h-[22rem] sm:h-[26rem] w-[88%] sm:w-[72%] lg:w-[64%] min-w-[88%] sm:min-w-[72%] lg:min-w-[64%]
                 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-tr from-pink-200/80 via-rose-100/80 to-white/80"></div>
          <div class="relative z-10 h-full p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <p class="text-[12px] tracking-[0.25em] uppercase text-pink-900/80">01 • Educación</p>
              <h2 class="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">Escuelas que inspiran</h2>
              <p class="mt-2 max-w-[60ch] text-slate-700">Talleres STEAM y mentorías para colegios públicos.</p>
            </div>
            <div class="flex items-center gap-4">
              <a href="#mision"
                 class="group inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-600/10 px-5 py-2.5 text-sm font-semibold text-pink-800 backdrop-blur hover:bg-pink-600/15 focus:outline-none focus:ring-2 focus:ring-pink-500">
                Conoce la historia
                <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#slide-2" aria-label="Siguiente" class="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 hover:bg-white">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 5l8 7-8 7"/></svg>
              </a>
            </div>
          </div>
        </article>

        <!-- Slide 2 -->
        <article id="slide-2"
          class="snap-center relative h-[22rem] sm:h-[26rem] w-[88%] sm:w-[72%] lg:w-[64%] min-w-[88%] sm:min-w-[72%] lg:min-w-[64%]
                 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-tr from-fuchsia-200/80 via-pink-100/80 to-white/80"></div>
          <div class="relative z-10 h-full p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <p class="text-[12px] tracking-[0.25em] uppercase text-pink-900/80">02 • Sostenibilidad</p>
              <h2 class="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">Rutas verdes</h2>
              <p class="mt-2 max-w-[60ch] text-slate-700">Reciclaje, compostaje y ferias barriales sostenibles.</p>
            </div>
            <div class="flex items-center gap-4">
              <a href="#proyectos"
                 class="group inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-600/10 px-5 py-2.5 text-sm font-semibold text-pink-800 backdrop-blur hover:bg-pink-600/15 focus:outline-none focus:ring-2 focus:ring-pink-500">
                Ver proyectos
                <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#slide-3" aria-label="Siguiente" class="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 hover:bg-white">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 5l8 7-8 7"/></svg>
              </a>
            </div>
          </div>
        </article>

        <!-- Slide 3 -->
        <article id="slide-3"
          class="snap-center relative h-[22rem] sm:h-[26rem] w-[88%] sm:w-[72%] lg:w-[64%] min-w-[88%] sm:min-w-[72%] lg:min-w-[64%]
                 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-tr from-rose-200/80 via-pink-100/80 to-white/80"></div>
          <div class="relative z-10 h-full p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <p class="text-[12px] tracking-[0.25em] uppercase text-pink-900/80">03 • Emprendimiento</p>
              <h2 class="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">Impulso emprendedor</h2>
              <p class="mt-2 max-w-[60ch] text-slate-700">Finanzas, UX y comercio digital para pymes.</p>
            </div>
            <div class="flex items-center gap-4">
              <a href="#comunidad"
                 class="group inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-600/10 px-5 py-2.5 text-sm font-semibold text-pink-800 backdrop-blur hover:bg-pink-600/15 focus:outline-none focus:ring-2 focus:ring-pink-500">
                Únete
                <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#slide-4" aria-label="Siguiente" class="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 hover:bg-white">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 5l8 7-8 7"/></svg>
              </a>
            </div>
          </div>
        </article>

        <!-- Slide 4 -->
        <article id="slide-4"
          class="snap-center relative h-[22rem] sm:h-[26rem] w-[88%] sm:w-[72%] lg:w-[64%] min-w-[88%] sm:min-w-[72%] lg:min-w-[64%]
                 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-tr from-pink-100/90 via-white/90 to-rose-100/90"></div>
          <div class="relative z-10 h-full p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <p class="text-[12px] tracking-[0.25em] uppercase text-pink-900/80">04 • Voluntariado</p>
              <h2 class="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">Red Kambia</h2>
              <p class="mt-2 max-w-[60ch] text-slate-700">Formación y coordinación para voluntariado local.</p>
            </div>
            <div class="flex items-center gap-4">
              <a href="#comunidad"
                 class="group inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-600/10 px-5 py-2.5 text-sm font-semibold text-pink-800 backdrop-blur hover:bg-pink-600/15 focus:outline-none focus:ring-2 focus:ring-pink-500">
                Súmate
                <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#slide-1" aria-label="Volver al inicio" class="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 hover:bg-white">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 5l-8 7 8 7"/></svg>
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Dots de navegación -->
      <div class="mt-6 flex items-center justify-center gap-2">
        <a href="#slide-1" class="h-2.5 w-2.5 rounded-full bg-pink-500/70 hover:bg-pink-500" aria-label="Ir al 1"></a>
        <a href="#slide-2" class="h-2.5 w-2.5 rounded-full bg-pink-400/70 hover:bg-pink-400" aria-label="Ir al 2"></a>
        <a href="#slide-3" class="h-2.5 w-2.5 rounded-full bg-pink-300/70 hover:bg-pink-300" aria-label="Ir al 3"></a>
        <a href="#slide-4" class="h-2.5 w-2.5 rounded-full bg-pink-200/70 hover:bg-pink-200" aria-label="Ir al 4"></a>
      </div>
    </div>

    <!-- Franja de métricas -->
    <div class="mt-10 border-t border-slate-200 pt-6 flex flex-wrap gap-x-10 gap-y-4 text-sm text-slate-700">
      <div class="flex items-baseline gap-2"><span class="text-3xl font-extrabold text-slate-900">+120</span> escuelas</div>
      <div class="flex items-baseline gap-2"><span class="text-3xl font-extrabold text-slate-900">+800</span> voluntarios</div>
      <div class="flex items-baseline gap-2"><span class="text-3xl font-extrabold text-slate-900">24</span> comunidades</div>
    </div>
  </div>
</section>


    <!-- ===== Historia ===== -->
    <section
      class="py-20 bg-white transition-all duration-1000 ease-out"
      v-intersect="{
        handler: onHistoryIntersect,
        options: { threshold: 0.1 }
      }"
      :class="{ 'opacity-100 translate-y-0': historyVisible, 'opacity-0 translate-y-10': !historyVisible }"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <p class="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-8 transition-all duration-1000 delay-150 tracking-wide">
          KambiaPe nace de la visión de un grupo de jóvenes peruanos, comprometidos con la innovación social y la economía circular. Buscamos revivir el ancestral arte del trueque, adaptándolo a la era digital para construir una comunidad más unida y consciente.
        </p>
        <div class="inline-block px-6 py-4 bg-gradient-to-r from-[#fdf2f8] to-[#fce7f3] rounded-full shadow-2xl mt-8 transition-all duration-1000 delay-300 transform hover:scale-105 hover:shadow-lg">
          <p class="text-xl sm:text-2xl font-semibold text-[#9e0154]">
            No solo intercambiamos cosas; intercambiamos <strong class="text-[#d7037b]">confianza</strong>, <strong class="text-[#d7037b]">historias</strong> y <strong class="text-[#d7037b]">oportunidades</strong>.
          </p>
        </div>
      </div>
    </section>

    <!-- ===== Misión / Visión (flip) ===== -->
    <section class="py-16 sm:py-24 bg-gray-50 border-y border-gray-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <!-- Misión -->
        <div class="[perspective:1200px] h-full group" @mouseenter="flipCard('mission')" @mouseleave="unflipCard('mission')">
          <div class="h-full transition-all duration-700 ease-in-out [transform-style:preserve-3d]" :class="{ '[transform:rotateY(180deg)]': missionFlipped }" role="group" aria-roledescription="card" aria-live="polite">
            <div class="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 h-full flex flex-col [backface-visibility:hidden]">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-[#fdf2f8] flex items-center justify-center mr-4 shadow-md">
                  <RocketLaunchIcon class="h-8 w-8 text-[#d7037b] animate-bounce-slow" aria-hidden="true" />
                </div>
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-800">Nuestra <span class="text-[#d7037b]">Misión</span></h2>
              </div>
              <p class="text-lg text-gray-700 leading-relaxed flex-grow">
                Facilitar el intercambio justo de productos, servicios y conocimientos entre personas, a través de una plataforma digital confiable, segura y fácil de usar.
              </p>
              <div class="mt-6 text-sm text-[#d7037b] font-medium flex items-center group cursor-pointer">
                <span>Pasa el cursor para más detalles</span>
                <ArrowRightIcon class="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </div>

            <div class="bg-gradient-to-br from-[#d7037b] to-[#9e0154] rounded-3xl shadow-2xl p-8 text-white h-full flex flex-col justify-center absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <h3 class="text-2xl font-bold mb-4 border-b border-white/30 pb-2">Impacto que buscamos</h3>
              <ul class="space-y-3 text-gray-100">
                <li class="flex items-start"><CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" /><span>Generar un ecosistema de <strong class="font-semibold">economía colaborativa</strong></span></li>
                <li class="flex items-start"><CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" /><span>Promover <strong class="font-semibold">inclusión económica</strong> y desarrollo local</span></li>
                <li class="flex items-start"><CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" /><span>Reducir el desperdicio mediante la <strong class="font-semibold">reutilización</strong></span></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Visión -->
        <div class="[perspective:1200px] h-full group" @mouseenter="flipCard('vision')" @mouseleave="unflipCard('vision')">
          <div class="h-full transition-all duration-700 ease-in-out [transform-style:preserve-3d]" :class="{ '[transform:rotateY(180deg)]': visionFlipped }" role="group" aria-roledescription="card" aria-live="polite">
            <div class="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 h-full flex flex-col [backface-visibility:hidden]">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-[#fdf2f8] flex items-center justify-center mr-4 shadow-md">
                  <EyeIcon class="h-8 w-8 text-[#9e0154] animate-pulse-slow" aria-hidden="true" />
                </div>
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-800">Nuestra <span class="text-[#9e0154]">Visión</span></h2>
              </div>
              <p class="text-lg text-gray-700 leading-relaxed flex-grow">
                Convertirnos en la plataforma líder de intercambio solidario en Perú, impulsando una nueva economía basada en la colaboración y sostenibilidad.
              </p>
              <div class="mt-6 text-sm text-[#9e0154] font-medium flex items-center group cursor-pointer">
                <span>Pasa el cursor para más detalles</span>
                <ArrowRightIcon class="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </div>

            <div class="bg-gradient-to-br from-[#9e0154] to-[#7a0142] rounded-3xl shadow-2xl p-8 text-white h-full flex flex-col justify-center absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <h3 class="text-2xl font-bold mb-4 border-b border-white/30 pb-2">Metas a 2025</h3>
              <ul class="space-y-3 text-gray-100">
                <li class="flex items-start"><CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" /><span><strong class="font-semibold">+50,000</strong> usuarios activos en la plataforma</span></li>
                <li class="flex items-start"><CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" /><span>Presencia en <strong class="font-semibold">15 regiones</strong> del Perú</span></li>
                <li class="flex items-start"><CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" /><span>Reducir <strong class="font-semibold">+10 toneladas</strong> de desperdicio anual</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Valores ===== -->
    <section class="py-16 sm:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-16 relative inline-block">
          <span class="relative z-10 flex items-center justify-center pb-2">
            <HandRaisedIcon class="h-9 w-9 text-[#d7037b] mr-4 animate-wave" />
            Valores que nos Impulsan
          </span>
          <span class="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d7037b] to-[#9e0154] rounded-full origin-center"></span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div
            v-for="(value, index) in values"
            :key="index"
            class="group [perspective:1000px] flex justify-center"
            @mouseenter="activeRadial = index"
            @mouseleave="activeRadial = null"
          >
            <div class="relative h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(5deg)_scale(1.03)] rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl">
              <div class="bg-white p-8 border border-gray-100 h-full flex flex-col items-center transition-all duration-300">
                <div class="relative w-40 h-40 mb-6">
                  <svg class="w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" stroke-width="8" />
                    <circle
                      cx="50" cy="50" r="45" fill="none"
                      :stroke="value.color"
                      stroke-width="8"
                      stroke-linecap="round"
                      stroke-dasharray="283"
                      :stroke-dashoffset="283 - (283 * (activeRadial === index ? 0.9 : 0.7))"
                      transform="rotate(-90 50 50)"
                      class="transition-all duration-700 ease-out"
                    />
                    <foreignObject x="25" y="25" width="50" height="50">
                      <div class="w-full h-full flex items-center justify-center">
                        <component
                          :is="value.icon"
                          class="h-12 w-12 transition-all duration-300"
                          :class="[value.textColor, activeRadial === index ? 'scale-110 drop-shadow-lg' : '']"
                        />
                      </div>
                    </foreignObject>
                  </svg>
                </div>

                <h3 class="text-2xl font-bold text-gray-900 mb-3 transition-all duration-300" :class="activeRadial === index ? 'text-[1.8rem] text-[#d7037b]' : ''">
                  {{ value.title }}
                </h3>
                <p class="text-gray-600 transition-all duration-300" :class="activeRadial === index ? 'text-gray-700 font-medium' : ''">
                  {{ value.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Beneficios ===== -->
    <section class="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="mb-16 text-center">
          <h2 class="text-4xl sm:text-5xl font-extralight text-gray-800 tracking-wide relative inline-block">
            <span class="inline-flex items-center">
              <svg viewBox="0 0 24 24" fill="currentColor" class="h-10 w-10 text-[#d7037b] mr-4 animate-pulse-slow" aria-hidden="true">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20Zm0 16a6 6 0 100-12 6 6 0 000 12Z" />
                <path d="M13.25 10a.75.75 0 00-1.5 0v3.25a.75.75 0 001.5 0V10z" />
                <path d="M12 7a.75.75 0 00-.75.75V11a.75.75 0 001.5 0V7.75A.75.75 0 0012 7z" />
              </svg>
              <span class="border-b-2 border-[#d7037b] pb-2">Por Qué Elegir KambiaPe</span>
            </span>
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Lista -->
          <div class="space-y-6">
            <div
              v-for="(benefit, index) in benefits"
              :key="index"
              class="flex items-start rounded-xl p-6 transition-all duration-700 ease-in-out cursor-pointer group relative overflow-hidden [perspective:1000px] transform-gpu"
              :class="[ activeBenefit === index ? 'bg-white shadow-2xl scale-[1.02]' : 'bg-gray-100 hover:scale-[1.01]' ]"
              @mouseenter="activeBenefit = index"
              :style="{ 'transition-delay': `${index * 100}ms` }"
            >
              <span class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d7037b] to-transparent transform -translate-x-full transition-all duration-700 ease-in-out group-hover:translate-x-0"></span>

              <div class="flex-shrink-0 mr-6">
                <div class="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500" :class="activeBenefit === index ? 'bg-[#d7037b] shadow-inner' : 'bg-gray-200'">
                  <component :is="benefit.icon" class="h-8 w-8 transition-colors duration-500" :class="activeBenefit === index ? 'text-white animate-spin-slow' : 'text-gray-500'" />
                </div>
              </div>
              <div class="relative z-10">
                <h3 class="text-xl font-bold text-gray-900 mb-2 transition-colors duration-500" :class="activeBenefit === index ? 'text-[#d7037b]' : ''">
                  {{ benefit.title }}
                </h3>
                <p class="text-gray-600 leading-relaxed text-base">
                  {{ benefit.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Visual dinámico -->
          <div class="relative h-[520px] lg:h-[580px] rounded-3xl overflow-hidden shadow-2xl">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100">
              <div class="absolute inset-0 opacity-20" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgxMDIsMTI2LDIzNCwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')"></div>

              <transition
                enter-active-class="transition-all duration-700 ease-in-out transform-gpu"
                enter-from-class="opacity-0 translate-y-10"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-500 ease-in-out absolute w-full transform-gpu"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0 -translate-y-10"
                mode="out-in"
              >
                <div :key="activeBenefit" class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full shadow-lg" :class="benefits[activeBenefit].bgColor">
                    <component :is="benefits[activeBenefit].icon" class="h-12 w-12 text-white transition-transform duration-500" />
                  </div>
                  <h3 class="text-3xl font-bold text-gray-800 mb-3 tracking-wide">
                    {{ benefits[activeBenefit].visualTitle }}
                  </h3>
                  <p class="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
                    {{ benefits[activeBenefit].visualDescription }}
                  </p>
                  <div class="mt-8 flex justify-center space-x-2">
                    <div v-for="i in benefits.length" :key="i" class="w-2 h-2 rounded-full transition-all duration-300" :class="i-1 === activeBenefit ? 'bg-[#d7037b] w-5' : 'bg-gray-300'"></div>
                  </div>
                </div>
              </transition>
            </div>

            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent flex items-end p-6">
              <p class="text-white text-lg font-bold">
                "{{ benefits[activeBenefit].tagline }}"
              </p>
            </div>
          </div>
        </div>
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
import { ref } from 'vue'
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

/* Estado */
const historyVisible = ref(false)
const missionFlipped = ref(false)
const visionFlipped = ref(false)
const activeRadial = ref(null)
const activeBenefit = ref(0)

/* Data: Valores */
const values = ref([
  { title: 'Innovación', description: 'Construimos el futuro del trueque con soluciones creativas y adaptables, siempre buscando ir más allá.', icon: LightBulbIcon, color: '#d7037b', textColor: 'text-[#d7037b]' },
  { title: 'Comunidad', description: 'Fomentamos la conexión, confianza y colaboración entre nuestros usuarios, creando lazos duraderos.', icon: UsersIcon, color: '#9e0154', textColor: 'text-[#9e0154]' },
  { title: 'Sostenibilidad', description: 'Promovemos un consumo consciente, la reutilización y el respeto por nuestro planeta en cada intercambio.', icon: CubeTransparentIcon, color: '#d7037b', textColor: 'text-[#d7037b]' },
])

/* Data: Beneficios */
const benefits = ref([
  { title: 'Simplicidad & Rapidez', description: 'Publica en minutos, encuentra lo que necesitas al instante. Un trueque sin complicaciones ni barreras.', icon: CheckCircleIcon, bgColor: 'bg-green-500', visualTitle: 'Intercambios en 3 Pasos', visualDescription: 'Publica tu artículo, encuentra el intercambio perfecto y acuerda con facilidad. ¡Así de simple!', tagline: 'La simplicidad es la máxima sofisticación en KambiaPe.' },
  { title: 'Confianza & Seguridad', description: 'Nuestra plataforma cuenta con herramientas de verificación avanzadas y una comunidad basada en el respeto.', icon: ShieldCheckIcon, bgColor: 'bg-blue-500', visualTitle: 'Plataforma Segura', visualDescription: 'Perfiles verificados y un sistema de reputación robusto para que cada trueque sea totalmente confiable.', tagline: 'Tu seguridad y tranquilidad son nuestra prioridad número uno.' },
  { title: 'Impacto Positivo', description: 'Cada intercambio en KambiaPe contribuye a una economía más justa y reduce significativamente el desperdicio.', icon: HeartIcon, bgColor: 'bg-pink-500', visualTitle: 'Contribuye al Planeta', visualDescription: 'Forma parte de la solución, reduce tu huella de carbono y fomenta la economía circular con cada trueque.', tagline: 'Pequeñas acciones, grandes cambios para un futuro sostenible.' },
  { title: 'Conexión Comunitaria', description: 'Únete a una vibrante red de vecinos y emprendedores que valoran la colaboración y el apoyo local.', icon: ChatBubbleLeftRightIcon, bgColor: 'bg-purple-500', visualTitle: 'Crea Nuevas Conexiones', visualDescription: 'Conecta con personas afines, comparte intereses y descubre oportunidades únicas en tu comunidad.', tagline: 'Juntos, creamos una comunidad más fuerte y unida.' },
])

/* Intersección historia */
const onHistoryIntersect = (entry) => {
  if (entry.isIntersecting) historyVisible.value = true
}

/* Flip cards */
const flipCard = (t) => { if (t === 'mission') missionFlipped.value = true; if (t === 'vision') visionFlipped.value = true }
const unflipCard = (t) => { if (t === 'mission') missionFlipped.value = false; if (t === 'vision') visionFlipped.value = false }

/* v-intersect (directiva) */
const vIntersect = {
  mounted(el, binding) {
    const options = binding.value?.options || {}
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => binding.value?.handler && binding.value.handler(entry))
    }, options)
    observer.observe(el)
    el._io = observer
  },
  unmounted(el) { el._io?.disconnect(); delete el._io }
}
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
