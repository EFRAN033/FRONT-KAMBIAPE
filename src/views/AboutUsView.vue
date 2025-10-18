<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans text-gray-900 antialiased">
    <Header />

    <section class="relative min-h-[92vh] overflow-hidden bg-white text-slate-900">
      <div class="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(90deg,#000_1px,transparent_1px),linear-gradient(#000_1px,transparent_1px)] bg-[size:28px_28px] -z-10"></div>

      <div class="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 py-12 sm:py-16">
        <div class="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-12 items-start">

          <header v-animate-on-scroll class="col-span-12 lg:col-span-5 animated-component">
            <p class="text-xs tracking-[0.28em] uppercase text-pink-700/70 anim-fade-in-up" style="--delay: 100ms;">Perú • Comunidad • Innovación</p>

            <h1 class="mt-3 text-[13.5vw] sm:text-6xl lg:text-6xl font-black leading-[0.95] tracking-tight anim-fade-in-up" style="--delay: 200ms;">
              Ideas en acción.
            </h1>

            <p class="mt-5 max-w-[56ch] text-base sm:text-lg leading-relaxed text-slate-700 anim-fade-in-up" style="--delay: 300ms;">
              KambiaPe conecta personas para transformar barrios, escuelas y emprendimientos. Simple, local, real.
            </p>

            <div class="mt-7 flex flex-wrap items-center gap-4 anim-fade-in-up" style="--delay: 400ms;">
              <a href="#galeria"
                 class="inline-flex items-center gap-3 border border-slate-900 bg-pink-50 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
                Conoce la historia
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#galeria" class="text-sm font-medium text-slate-900 hover:text-slate-700">
                Conócenos!
              </a>
            </div>

            <div class="mt-8 border-y border-slate-200 py-3 anim-fade-in-up" style="--delay: 500ms;">
              <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold tracking-wide">
                <span class="inline-flex items-center gap-2"><span class="h-2 w-2 bg-pink-600"></span>#Comunidad</span>
                <span class="inline-flex items-center gap-2"><span class="h-2 w-2 bg-pink-600"></span>#Sostenibilidad</span>
                <span class="inline-flex items-center gap-2"><span class="h-2 w-2 bg-pink-600"></span>#Innovación</span>
                <span class="inline-flex items-center gap-2"><span class="h-2 w-2 bg-pink-600"></span>#Educación</span>
              </div>
            </div>
          </header>

          <aside v-animate-on-scroll class="col-span-12 lg:col-span-7 animated-component anim-slide-in-left" style="--delay: 300ms;">
            <div class="grid grid-cols-2 gap-4 sm:gap-5">
              <figure class="relative col-span-1 h-[20rem] sm:h-[28rem] md:h-[32rem] border border-slate-200 shadow-[0_8px_24px_rgba(2,6,23,0.08)] overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]">
                <img class="absolute inset-0 h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1600&auto=format&fit=crop" alt="Mentoría STEAM en colegio público">
                <figcaption class="absolute left-0 top-0 bg-black/75 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-white">Educación</figcaption>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent px-5 py-4"><h3 class="text-lg sm:text-xl font-extrabold text-white">Escuelas que inspiran</h3></div>
              </figure>
              <div class="col-span-1 grid grid-rows-2 gap-4 sm:gap-5">
                <figure class="relative h-[9rem] sm:h-[13rem] md:h-[15rem] border border-slate-200 shadow-[0_6px_18px_rgba(2,6,23,0.08)] overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]">
                  <img class="absolute inset-0 h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1600&auto=format&fit=crop" alt="Reciclaje y compostaje comunitario">
                  <figcaption class="absolute left-0 top-0 bg-black/75 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-white">Sostenibilidad</figcaption>
                  <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent px-4 py-3"><h3 class="text-sm sm:text-base font-extrabold text-white">Rutas verdes</h3></div>
                </figure>
                <figure class="relative h-[9rem] sm:h-[13rem] md:h-[15rem] border border-slate-200 shadow-[0_6px_18px_rgba(2,6,23,0.08)] overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_94%,0%_100%)]">
                  <img class="absolute inset-0 h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop" alt="Emprendimiento local y comercio digital">
                  <figcaption class="absolute left-0 top-0 bg-black/75 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-white">Emprendimiento</figcaption>
                  <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent px-4 py-3"><h3 class="text-sm sm:text-base font-extrabold text-white">Impulso emprendedor</h3></div>
                </figure>
              </div>
            </div>
          </aside>

          <div class="col-span-12">
            <div id="galeria" class="group relative overflow-hidden border-t border-b border-slate-200 bg-white scroll-mt-28 sm:scroll-mt-32">
              <div class="px-3">
                <div class="strip-track flex animate-strip will-change-transform group-hover:[animation-play-state:paused]">
                  <div class="strip-segment flex items-stretch gap-4">
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1460602594182-8568137446ce?q=80&w=1600&auto=format&fit=crop" alt="Voluntariado local"></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop" alt="Taller de programación"></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1523978591478-c753949ff840?q=80&w=1600&auto=format&fit=crop" alt="Huertos urbanos"></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop" alt="Robótica escolar"></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1600&auto=format&fit=crop" alt="Reciclaje creativo"></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop" alt="Conectividad digital"></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop" alt="Playas limpias"></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1523246191808-8b3f0062cc48?q=80&w=1600&auto=format&fit=crop" alt="Negocio digital"></div>
                  </div>
                  <div class="strip-segment flex items-stretch gap-4" aria-hidden="true">
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1460602594182-8568137446ce?q=80&w=1600&auto=format&fit=crop" alt=""></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop" alt=""></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1523978591478-c753949ff840?q=80&w=1600&auto=format&fit=crop" alt=""></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop" alt=""></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1600&auto=format&fit=crop" alt=""></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop" alt=""></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_92%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop" alt=""></div>
                    <div class="h-28 w-48 border border-slate-200 overflow-hidden [clip-path:polygon(0%_6%,100%_0%,100%_100%,0%_100%)]"><img class="h-full w-full object-cover object-center" src="https://images.unsplash.com/photo-1523246191808-8b3f0062cc48?q=80&w=1600&auto=format&fit=crop" alt=""></div>
                  </div>
                </div>
              </div>
              <div class="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/95 to-transparent"></div>
              <div class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/95 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="about-kambia" class="relative bg-white text-slate-900">
      <div class="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12">
        <aside class="col-span-1 lg:col-span-4">
          <div class="lg:sticky lg:top-24">
            <div aria-hidden="true" class="font-lobster text-[12vw] lg:text-[5vw] font-black tracking-[-0.03em] text-slate-900/5 leading-none -ml-1">KAMBIA•PE</div>
            <header><div class="text-[11px] tracking-[0.28em] uppercase text-[#9e0154]">Acerca de</div><h1 class="mt-1 text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight">Trueque con propósito.</h1></header>
            <p class="mt-5 text-base sm:text-lg leading-relaxed text-slate-800 max-w-prose">Creamos puentes entre personas y barrios para que el intercambio vuelva a ser cotidiano, justo y medible.</p>
            <div class="mt-6 border border-[#f3c0d6] bg-[linear-gradient(90deg,#fdf2f8,#fce7f3)] px-5 py-4"><p class="text-lg sm:text-xl font-semibold text-[#9e0154]">Intercambiar es <span class="text-[#d7037b] font-extrabold">confiar</span> y <span class="text-[#d7037b] font-extrabold">co-crear</span>.</p></div>
            <nav class="mt-8 border-t border-b border-slate-200 divide-y divide-slate-200" aria-label="Secciones">
              <a href="#pliego-que-es" class="block px-3 py-3 text-sm font-semibold tracking-wide transition-colors" :class="activePanel==='que-es' ? 'text-slate-900 border-l-2 border-slate-900' : 'text-slate-500 hover:text-slate-800'">01 · Qué es KambiaPe</a>
              <a href="#pliego-mision" class="block px-3 py-3 text-sm font-semibold tracking-wide transition-colors" :class="activePanel==='mision' ? 'text-slate-900 border-l-2 border-slate-900' : 'text-slate-500 hover:text-slate-800'">02 · Misión</a>
              <a href="#pliego-vision" class="block px-3 py-3 text-sm font-semibold tracking-wide transition-colors" :class="activePanel==='vision' ? 'text-slate-900 border-l-2 border-slate-900' : 'text-slate-500 hover:text-slate-800'">03 · Visión</a>
            </nav>
          </div>
        </aside>

        <div class="col-span-1 lg:col-span-8 space-y-14">
          <article v-animate-on-scroll id="pliego-que-es" class="grid grid-cols-12 gap-6 items-start scroll-mt-24 animated-component anim-fade-in-up">
            <header class="col-span-12"><div class="flex items-baseline justify-between"><div><div class="text-[11px] tracking-[0.24em] uppercase text-[#9e0154]">01</div><h2 class="mt-1 text-3xl sm:text-4xl font-extrabold">Qué es KambiaPe</h2></div><div class="hidden sm:flex items-center gap-2 w-[40%]"><span class="h-[3px] w-full bg-slate-200"><span class="block h-full bg-slate-900" :style="{ width: activePanel==='que-es' ? '100%' : '0%' }"></span></span></div></div></header>
            <div class="col-span-12 lg:col-span-6"><p class="text-slate-700 leading-relaxed">Una red donde productos, servicios y conocimientos se intercambian con reglas claras, reputación visible y mediación. Tecnología al servicio de la confianza local.</p><div class="mt-6 border border-[#f3c0d6] bg-[linear-gradient(90deg,#fdf2f8,#fce7f3)] px-4 py-3 text-sm font-semibold text-[#9e0154]">Lo digital acerca, la comunidad decide.</div></div>
            <figure class="col-span-12 lg:col-span-6 relative h-64 sm:h-80 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_85%,0%_100%)]"><img class="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop" alt="Personas colaborando en un taller" /><figcaption class="absolute left-0 top-0 bg-black/70 text-white text-[11px] tracking-[0.22em] px-3 py-2 uppercase">Colaboración</figcaption></figure>
          </article>
          <article v-animate-on-scroll id="pliego-mision" class="grid grid-cols-12 gap-6 items-start scroll-mt-24 animated-component anim-fade-in-up">
            <header class="col-span-12"><div class="flex items-baseline justify-between"><div><div class="text-[11px] tracking-[0.24em] uppercase text-[#d7037b]">02</div><h2 class="mt-1 text-3xl sm:text-4xl font-extrabold">Misión</h2></div><div class="hidden sm:flex items-center gap-2 w-[40%]"><span class="h-[3px] w-full bg-slate-200"><span class="block h-full bg-slate-900" :style="{ width: activePanel==='mision' ? '100%' : '0%' }"></span></span></div></div></header>
            <div class="col-span-12 lg:col-span-6 lg:order-2"><p class="text-slate-700 leading-relaxed">Facilitar el intercambio justo entre personas mediante una plataforma confiable, segura y usable, con foco en impacto local.</p><ul class="mt-6 space-y-3 text-slate-800"><li class="flex gap-3"><span class="mt-2 h-2 w-2 bg-[#d7037b] shrink-0"></span>Reglas claras y reputación pública.</li><li class="flex gap-3"><span class="mt-2 h-2 w-2 bg-[#d7037b] shrink-0"></span>Inclusión económica en barrios y escuelas.</li><li class="flex gap-3"><span class="mt-2 h-2 w-2 bg-[#d7037b] shrink-0"></span>Menos desperdicio a través de la reutilización.</li></ul></div>
            <figure class="col-span-12 lg:col-span-6 lg:order-1 relative h-64 sm:h-80 border border-slate-200 overflow-hidden [clip-path:polygon(0%_10%,100%_0%,100%_100%,0%_90%)]"><img class="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1523978591478-c753949ff840?q=80&w=1600&auto=format&fit=crop" alt="Huertos urbanos y reutilización" /><figcaption class="absolute left-0 top-0 bg-black/70 text-white text-[11px] tracking-[0.22em] px-3 py-2 uppercase">Reutilización</figcaption></figure>
          </article>
          <article v-animate-on-scroll id="pliego-vision" class="grid grid-cols-12 gap-6 items-start scroll-mt-24 animated-component anim-fade-in-up">
            <header class="col-span-12"><div class="flex items-baseline justify-between"><div><div class="text-[11px] tracking-[0.24em] uppercase text-[#7a0142]">03</div><h2 class="mt-1 text-3xl sm:text-4xl font-extrabold">Visión</h2></div><div class="hidden sm:flex items-center gap-2 w-[40%]"><span class="h-[3px] w-full bg-slate-200"><span class="block h-full bg-slate-900" :style="{ width: activePanel==='vision' ? '100%' : '0%' }"></span></span></div></div></header>
            <div class="col-span-12 lg:col-span-6"><p class="text-slate-700 leading-relaxed">Liderar el intercambio solidario en Perú con una economía colaborativa y sostenible, conectando comunidades a nivel nacional a través de alianzas locales y tecnología centrada en las personas.</p><div class="mt-6 border-t border-slate-200 pt-3 text-sm text-slate-700">Alianzas con municipios y escuelas, embajadores locales y un motor de matching que prioriza cercanía, impacto y confianza.</div></div>
            <figure class="col-span-12 lg:col-span-6 relative h-64 sm:h-80 border border-slate-200 overflow-hidden [clip-path:polygon(0%_0%,100%_8%,100%_100%,0%_92%)]"><img class="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop" alt="Robótica y formación tecnológica" /><figcaption class="absolute left-0 top-0 bg-black/70 text-white text-[11px] tracking-[0.22em] px-3 py-2 uppercase">Formación</figcaption></figure>
          </article>
        </div>
      </div>
    </section>
    
    <section class="bg-white py-16 sm:py-20 lg:py-24">
        <div v-animate-on-scroll class="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 animated-component anim-scale-in">
            <div class="relative bg-slate-900 overflow-hidden">
                <div aria-hidden="true" class="aurora-background absolute inset-0"><div class="aurora-shape aurora-shape-1"></div><div class="aurora-shape aurora-shape-2"></div><div class="aurora-shape aurora-shape-3"></div></div>
                <div class="relative grid grid-cols-1 lg:grid-cols-2 items-center">
                    <div class="relative p-8 h-48 sm:h-64 lg:h-full flex items-center justify-center">
                        <svg class="w-full h-full max-w-xs sm:max-w-sm text-white/80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M72.5 76C72.5 68.23 78.73 62 86.5 62C94.27 62 100.5 68.23 100.5 76C100.5 83.77 94.27 90 86.5 90C78.73 90 72.5 83.77 72.5 76Z" stroke="currentColor" stroke-width="3"/><path d="M125.5 106C125.5 99.37 130.87 94 137.5 94C144.13 94 149.5 99.37 149.5 106C149.5 112.63 144.13 118 137.5 118C130.87 118 125.5 112.63 125.5 106Z" stroke="currentColor" stroke-width="3"/><path d="M50.5 130C50.5 123.37 55.87 118 62.5 118C69.13 118 74.5 123.37 74.5 130C74.5 136.63 69.13 142 62.5 142C55.87 142 50.5 136.63 50.5 130Z" stroke="currentColor" stroke-width="3"/><path d="M99 82L127 100" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M74 121L84 88" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M101.52 147.51C111.41 156.41 125.52 163.4 140.5 163.5C168.5 163.5 186.5 142.5 186.5 116.5C186.5 95.5 174.5 78.5 157.5 71.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M98.48 52.49C88.59 43.59 74.48 36.6 59.5 36.5C31.5 36.5 13.5 57.5 13.5 83.5C13.5 104.5 25.5 121.5 42.5 128.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
                    </div>
                    <div class="relative px-8 pb-12 lg:p-12 text-center lg:text-left">
                        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white drop-shadow-lg">El corazón de KambiaPe es su gente.</h2>
                        <p class="mt-4 text-base lg:text-lg text-pink-100 max-w-xl mx-auto lg:mx-0">Únete a nuestra comunidad en WhatsApp para conectar, compartir ideas y ser el primero en enterarte de las novedades.</p>
                        <div class="mt-8">
                            <a href="https://chat.whatsapp.com/Kekd3xJZtet8J6TLhTGFDQ?mode=ems_wa_t" target="_blank" rel="noopener noreferrer" class="shine-button inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-[#9e0154] font-bold text-base px-6 py-3 sm:px-8 sm:py-4 shadow-xl transition-transform hover:scale-105">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.35 3.45 16.86L2.06 22L7.31 20.58C8.75 21.36 10.36 21.8 12.04 21.8C17.5 21.8 21.95 17.35 21.95 11.89C21.95 6.43 17.5 2 12.04 2ZM17.15 14.65C16.95 15.25 15.98 15.82 15.41 15.92C14.84 16.02 14.17 16.05 13.6 15.85C13.03 15.65 12.16 15.34 11.13 14.39C9.83 13.2 9.06 11.73 8.86 11.43C8.66 11.13 8.1 10.43 8.1 9.8C8.1 9.17 8.54 8.76 8.74 8.56C8.94 8.36 9.24 8.31 9.51 8.31C9.64 8.31 9.77 8.31 9.88 8.32C10.13 8.34 10.27 8.36 10.47 8.81C10.67 9.26 11.12 10.43 11.19 10.55C11.26 10.68 11.29 10.83 11.21 10.98C11.13 11.13 11.08 11.18 10.93 11.33C10.78 11.48 10.67 11.58 10.53 11.73C10.41 11.86 10.28 11.98 10.41 12.18C10.54 12.38 11.12 13.11 11.89 13.78C12.89 14.64 13.66 14.95 14 15.08C14.34 15.21 14.54 15.18 14.69 15.03C14.84 14.88 15.18 14.47 15.38 14.17C15.58 13.87 15.78 13.84 16.03 13.94C16.28 14.04 17.3 14.55 17.55 14.65Z" /></svg>
                                Unirme a la Comunidad
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
      <section class="relative w-full overflow-hidden my-10 rounded-2xl ring-1 ring-white/20" aria-label="Redes sociales Kambix">
        <div class="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-dark">
          <div class="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4)_1px,transparent_1.5px)] bg-[length:18px_18px]"></div>
          <div class="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.4)_1px,transparent_1.5px)] bg-[length:18px_18px]"></div>
        </div>
        
        <div class="relative mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
          <div class="flex w-full items-center justify-between gap-3">
            <p class="text-left font-extrabold tracking-wide text-white drop-shadow-[0_2px_0_rgba(166,4,93,0.6)] text-sm sm:text-[clamp(14px,2vw,20px)]">
              <span class="sm:hidden">¡<span class="uppercase">Kambix</span>! Síguenos</span>
              <span class="hidden sm:inline">¡<span class="uppercase">Kambix</span>! Síguenos y entérate de nuestras novedades</span>
            </p>
            <nav class="flex items-center justify-center gap-2 sm:gap-3" aria-label="Redes sociales">
              <a href="https://www.instagram.com/kambia_pe?igsh=MWg2aWR3YnhnNW1qdw==" target="_blank" rel="noopener noreferrer" class="group inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all hover:scale-[1.04] hover:bg-white" aria-label="Instagram de Kambix (@kambix_oficial)">
                <svg class="h-5 w-5 text-brand-dark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5a5.5 5.5 0 1 0 5.5 5.5A5.5 5.5 0 0 0 12 7.5ZM18 6.8a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 18 6.8Z"/></svg>
              </a>
              <a href="https://tiktok.com/@kambiape" target="_blank" rel="noopener noreferrer" class="group inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all hover:scale-[1.04] hover:bg-white" aria-label="TikTok de Kambix">
                <svg class="h-5 w-5 text-brand-dark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3h3.1A6.9 6.9 0 0 0 23 9.9V13A10 10 0 0 1 13 6.1V16a6 6 0 1 1-6-6c.34 0 .68.03 1.02.1V13a3 3 0 1 0 3 3V3Z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1A62pnpV8K/" target="_blank" rel="noopener noreferrer" class="group inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/90 ring-2 ring-white/30 backdrop-blur transition-all hover:scale-[1.04] hover:bg-white" aria-label="Facebook de Kambix">
                <svg class="h-5 w-5 text-brand-dark" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951Z"/></svg>
              </a>
            </nav>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './Header.vue'
import Footer from './Footer.vue'

// --- Lógica del Componente ---
const activePanel = ref('que-es');

// Directiva para animaciones al hacer scroll
const vAnimateOnScroll = {
  mounted: (el) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(el);
  }
}

function onPanelIntersect(key, entry) {
  if(entry.isIntersecting) {
    activePanel.value = key;
  }
}
</script>

<style scoped>
/* ===== ESTILOS PARA LAS ANIMACIONES ===== */
.animated-component{opacity:0;transition:opacity .6s ease-out,transform .6s ease-out}.animated-component.is-visible{opacity:1;transform:none}.animated-component.is-visible .anim-fade-in-up{opacity:1;transform:translateY(0);transition:opacity .6s ease-out,transform .6s ease-out;transition-delay:var(--delay,0ms)}.animated-component .anim-fade-in-up{opacity:0;transform:translateY(20px)}.anim-fade-in-up{transform:translateY(20px)}.anim-slide-in-left{transform:translateX(50px)}.anim-scale-in{transform:scale(.95)}

/* ===== ESTILOS PARA SECCIÓN DE COMUNIDAD ===== */
.aurora-background{position:absolute;inset:0;overflow:hidden;z-index:0}.aurora-shape{position:absolute;border-radius:9999px;filter:blur(80px);opacity:.4;animation:aurora-flow 12s infinite alternate}.aurora-shape-1{background-color:rgba(215,3,123,.5);width:300px;height:300px;top:-50px;left:-100px}.aurora-shape-2{background-color:rgba(158,1,84,.5);width:400px;height:400px;bottom:-150px;right:-100px;animation-delay:4s}.aurora-shape-3{background-color:rgba(253,186,116,.3);width:250px;height:250px;bottom:50%;right:50%;transform:translate(50%,50%);animation-delay:8s}@keyframes aurora-flow{0%{transform:scale(1) translate(0,0) rotate(0)}100%{transform:scale(1.4) translate(40px,-60px) rotate(60deg)}}.shine-button{position:relative;overflow:hidden}.shine-button::after{content:'';position:absolute;top:0;left:-150%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent);transition:left .6s ease;animation:shine 5s infinite}@keyframes shine{0%{left:-150%}50%{left:150%}100%{left:150%}}

/* ===== ESTILOS ANTERIORES ===== */
@keyframes strip { from { transform: translateX(0) } to { transform: translateX(-50%) } }
.animate-strip { animation: strip 40s linear infinite; }
.will-change-transform { will-change: transform; }
.no-scrollbar { scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }
</style>