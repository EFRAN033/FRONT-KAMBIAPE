<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans text-gray-900 antialiased">
    <Header />

    <section class="relative overflow-hidden bg-gradient-to-br from-[#d7037b] to-[#9e0154] text-white py-24 sm:py-32 lg:py-40">
      <div class="absolute inset-0">
        <div class="absolute inset-0 opacity-20"
             style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4,jIvPjwvcGF0dGVybj48L2RlZnM,PjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybj,jIvPjwvc3ZnPg==')"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay blur-3xl animate-blob"></div>
        <div class="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#fbcfe8]/5 rounded-full mix-blend-overlay blur-3xl animate-blob animation-delay-2000"></div>
        <div class="absolute top-1/2 left-1/3 w-72 h-72 bg-[#fbcfe8]/5 rounded-full mix-blend-overlay blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p class="text-xl sm:text-2xl lg:text-3xl font-light mb-6 overflow-hidden whitespace-nowrap animate-typewriter leading-snug">
          Más que una plataforma, un movimiento.
        </p>

        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-8">
          <span class="block mb-3">Revolucionando el</span>
          <span class="bg-gradient-to-r from-white to-[#fbcfe8] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-shift">
            Trueque en Perú
          </span>
        </h1>

        <div class="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 opacity-90 leading-relaxed">
          <p class="opacity-0 animate-fade-in-up animation-delay-250">En KambiaPe, conectamos personas,</p>
          <p class="opacity-0 animate-fade-in-up animation-delay-300">valoramos lo que tienes</p>
          <p class="opacity-0 animate-fade-in-up animation-delay-350">y transformamos necesidades </p>
          <p class="opacity-0 animate-fade-in-up animation-delay-400"> en oportunidades.</p>
        </div>

        <div class="[perspective:1000px] animate-fade-in-up animation-delay-500">
          <router-link
            to="/publicar"
            class="inline-flex items-center justify-center px-12 py-5 border-2 border-white text-xl font-bold rounded-full shadow-2xl text-[#d7037b] bg-white hover:bg-gray-50 transition-all duration-300 [transform-style:preserve-3d] hover:[transform:rotateX(5deg)_translateY(-8px)_scale(1.02)] group relative overflow-hidden"
          >
            <SparklesIcon class="h-7 w-7 mr-3 animate-sparkle-pulse" />
            Publica tu Artículo Ahora
            <span class="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 [transform:translateZ(-10px)]"></span>
            <span class="absolute -bottom-2 -right-2 w-8 h-8 bg-[#fbcfe8] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-[10] transition-transform duration-500 ease-out-back blur-lg"></span>
          </router-link>
        </div>
      </div>

      <div class="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-[#fbcfe8] opacity-20 blur-[80px] animate-float-slow"></div>
    </section>

    <section
      class="py-20 bg-white transition-all duration-1000 ease-out-quad"
      v-intersect="{
        handler: onHistoryIntersect,
        options: { threshold: 0.1 }
      }"
      :class="{ 'opacity-100 translate-y-0 scale-100': historyVisible, 'opacity-0 translate-y-10 scale-98': !historyVisible }"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <p class="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-8 transition-all duration-1000 delay-150">
          KambiaPe nace de la visión de un grupo de jóvenes peruanos, comprometidos con la innovación social y la economía circular. Buscamos revivir el ancestral arte del trueque, adaptándolo a la era digital para construir una comunidad más unida y consciente.
        </p>
        <div class="inline-block px-6 py-3 bg-gradient-to-r from-[#fdf2f8] to-[#fce7f3] rounded-full shadow-inner mt-8 transition-all duration-1000 delay-300 transform hover:scale-105 hover:shadow-lg">
          <p class="text-xl sm:text-2xl font-semibold text-[#9e0154]">
            No solo intercambiamos cosas; intercambiamos <strong class="text-[#d7037b]">confianza</strong>, <strong class="text-[#d7037b]">historias</strong> y <strong class="text-[#d7037b]">oportunidades</strong>.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 sm:py-24 bg-gray-50 border-y border-gray-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div
          class="[perspective:1200px] h-full"
          @mouseenter="flipCard('mission')"
          @mouseleave="unflipCard('mission')"
        >
          <div
            class="h-full transition-all duration-700 ease-in-out-cubic [transform-style:preserve-3d]"
            :class="{ '[transform:rotateY(180deg)]': missionFlipped }"
          >
            <div class="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 h-full flex flex-col [backface-visibility:hidden]">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-[#fdf2f8] flex items-center justify-center mr-4 shadow-md">
                  <RocketLaunchIcon class="h-8 w-8 text-[#d7037b] animate-bounce-slow" />
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
                <li class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>Generar un ecosistema de <strong class="font-semibold">economía colaborativa</strong></span>
                </li>
                <li class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>Promover <strong class="font-semibold">inclusión económica</strong> y desarrollo local</span>
                </li>
                <li class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reducir el desperdicio mediante la <strong class="font-semibold">reutilización</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="[perspective:1200px] h-full"
          @mouseenter="flipCard('vision')"
          @mouseleave="unflipCard('vision')"
        >
          <div
            class="h-full transition-all duration-700 ease-in-out-cubic [transform-style:preserve-3d]"
            :class="{ '[transform:rotateY(180deg)]': visionFlipped }"
          >
            <div class="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 h-full flex flex-col [backface-visibility:hidden]">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-[#fdf2f8] flex items-center justify-center mr-4 shadow-md">
                  <EyeIcon class="h-8 w-8 text-[#9e0154] animate-pulse-slow" />
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
                <li class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong class="font-semibold">+50,000</strong> usuarios activos en la plataforma</span>
                </li>
                <li class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>Presencia en <strong class="font-semibold">15 regiones</strong> del Perú</span>
                </li>
                <li class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reducir <strong class="font-semibold">+10 toneladas</strong> de desperdicio anual</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 sm:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-16 relative inline-block">
          <span class="relative z-10 flex items-center justify-center pb-2">
            <HandRaisedIcon class="h-9 w-9 text-[#d7037b] mr-4 animate-wave" />
            Valores que nos Impulsan
          </span>
          <span class="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d7037b] to-[#9e0154] rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out-expo"></span>
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
                  <svg class="w-full h-full" viewBox="0 0 100 100">
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

                <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#d7037b] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 sm:py-24 bg-gray-50 border-y border-gray-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-16 text-center relative">
          <span class="inline-flex items-center justify-center px-6 py-3 bg-[#fdf2f8] rounded-full shadow-lg">
            <QuestionMarkCircleIcon class="h-8 w-8 text-[#9e0154] mr-3 animate-bounce-custom" />
            Por Qué Elegir KambiaPe
          </span>
          <span class="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-20 h-1 bg-[#d7037b] rounded-full"></span>
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <div
              v-for="(benefit, index) in benefits"
              :key="index"
              class="flex items-start bg-white rounded-xl p-6 shadow-lg border-l-8 transition-all duration-500 ease-out-back transform hover:scale-[1.02] hover:shadow-xl cursor-pointer"
              :class="[
                activeBenefit === index ? 'border-[#d7037b] shadow-2xl scale-[1.03]' : 'border-transparent',
              ]"
              @mouseenter="activeBenefit = index"
            >
              <div class="flex-shrink-0 mr-5">
                <div class="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300" :class="activeBenefit === index ? 'bg-[#fdf2f8] shadow-inner' : 'bg-gray-100'">
                  <component
                    :is="benefit.icon"
                    class="h-7 w-7 transition-colors duration-300"
                    :class="activeBenefit === index ? 'text-[#d7037b] animate-spin-slow' : 'text-gray-500'"
                  />
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2 transition-colors duration-300" :class="activeBenefit === index ? 'text-[#d7037b]' : ''">
                  {{ benefit.title }}
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  {{ benefit.description }}
                </p>
              </div>
            </div>
          </div>

          <div class="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white animate-fade-in-scale">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <div class="absolute inset-0 opacity-20" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy5wMy5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgxMDIsMTI2LDIzNCwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')"></div>

              <transition
                enter-active-class="transition-opacity duration-500 ease-out"
                enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-opacity duration-300 ease-in absolute w-full"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0 -translate-y-4"
                mode="out-in"
              >
                <div :key="activeBenefit" class="text-center px-8 relative z-10">
                  <div class="w-28 h-28 mx-auto mb-6 flex items-center justify-center rounded-full shadow-lg animate-pop-in" :class="benefits[activeBenefit].bgColor">
                    <component
                      :is="benefits[activeBenefit].icon"
                      class="h-14 w-14 text-white animate-pulse-slight"
                    />
                  </div>
                  <h3 class="text-2xl font-bold text-gray-800 mb-3 animate-fade-in-up-delay">
                    {{ benefits[activeBenefit].visualTitle }}
                  </h3>
                  <p class="text-gray-600 max-w-md mx-auto animate-fade-in-up-delay-more">
                    {{ benefits[activeBenefit].visualDescription }}
                  </p>
                  <div class="mt-8 flex justify-center space-x-3">
                    <div v-for="i in benefits.length" :key="i" class="w-3 h-3 rounded-full transition-all duration-300" :class="i-1 === activeBenefit ? 'bg-[#d7037b] w-6' : 'bg-gray-300'"></div>
                  </div>
                </div>
              </transition>
            </div>

            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent flex items-end p-6">
              <p class="text-white text-lg font-bold">
                "{{ benefits[activeBenefit].tagline }}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 sm:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          <span class="inline-flex items-center justify-center">
            <UsersIcon class="h-9 w-9 text-[#d7037b] mr-4 animate-jiggle" />
            Conoce a Nuestro Equipo
          </span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
          Un grupo de apasionados por la economía colaborativa y la tecnología, trabajando para que cada intercambio sea una experiencia excepcional.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          <div
            v-for="(member, index) in team"
            :key="index"
            class="[perspective:1000px] flex justify-center group"
            @mousemove="handleTeamHover($event, index)"
            @mouseenter="activeTeamMember = index"
            @mouseleave="activeTeamMember = null"
          >
            <div
              class="bg-white rounded-xl shadow-lg p-7 border border-gray-100 w-full max-w-xs h-full flex flex-col items-center transition-all duration-300 [transform-style:preserve-3d] transform-gpu hover:shadow-2xl"
              :style="activeTeamMember === index ? teamCardTransform[index] : ''"
            >
              <div class="relative mb-6 flex justify-center">
                <div class="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-4 transition-all duration-300 overflow-hidden"
                  :class="activeTeamMember === index ? 'border-[#d7037b] scale-110' : 'border-[#fce4ec]'">
                  <img v-if="member.image" :src="member.image" :alt="member.name" class="w-full h-full object-cover rounded-full p-0.5 transform transition-transform duration-300 group-hover:scale-105" />
                  <UserCircleIcon v-else class="h-20 w-20 transition-all duration-300"
                    :class="activeTeamMember === index ? 'text-gray-500 scale-105' : 'text-gray-400'" />
                </div>
                <span class="absolute bottom-0 right-1/2 translate-x-1/2 text-white rounded-full px-3 py-1 text-xs font-bold transform translate-y-1/2 shadow-md transition-all duration-300"
                  :class="[
                    activeTeamMember === index ? 'scale-110 opacity-100' : 'opacity-90',
                    member.badgeColor
                  ]">
                  {{ member.badgeText }}
                </span>
              </div>

              <h3 class="text-xl font-bold text-gray-900 mb-1 transition-colors duration-300"
                :class="activeTeamMember === index ? 'text-[#d7037b] text-2xl' : ''">
                {{ member.name }}
              </h3>

              <p class="text-sm font-medium mb-4 transition-all duration-300"
                :class="activeTeamMember === index ? 'text-[#9e0154] scale-105' : 'text-[#d7037b]'">
                {{ member.role }}
              </p>

              <p class="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                {{ member.bio }}
              </p>

              <div class="flex justify-center space-x-4 mt-auto">
                <a v-for="(social, i) in member.social" :key="i"
                  :href="social.url"
                  class="text-gray-400 hover:text-[#d7037b] transition-colors duration-300 transform hover:scale-125 hover:-translate-y-1"
                  target="_blank" rel="noopener noreferrer">
                  <span class="sr-only">{{ social.name }}</span>
                  <component :is="social.icon" class="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-24 sm:py-32 bg-gradient-to-r from-[#9e0154] to-[#d7037b] text-white text-center overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div v-for="i in 30" :key="i"
          class="absolute rounded-full bg-white opacity-[0.05] animate-float-particles"
          :style="{
            width: `${Math.random() * 15 + 5}px`,
            height: `${Math.random() * 15 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight animate-fade-in-up">
          <span class="block mb-3">Listo para unirte a la</span>
          <span class="bg-gradient-to-r from-white to-[#fbcfe8] bg-clip-text text-transparent drop-shadow-lg">
            revolución del trueque?
          </span>
        </h2>

        <p class="text-lg sm:text-xl max-w-2xl mx-auto mb-10 opacity-90 leading-relaxed animate-fade-in-up animation-delay-300">
          Regístrate ahora y comienza a intercambiar en minutos. Descubre una nueva forma de obtener lo que necesitas.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-600">
          <router-link
            to="/register"
            class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-full shadow-xl text-[#d7037b] bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
          >
            <UserPlusIcon class="h-6 w-6 mr-3 transition-transform duration-300 group-hover:-rotate-6" />
            Crear Cuenta Gratis
            <span class="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span class="absolute -top-1 -left-1 w-4 h-4 bg-[#fbcfe8] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-[15] transition-transform duration-500 ease-out-back blur-md"></span>
          </router-link>

          <router-link
            to="/login"
            class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-full shadow-xl text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <ArrowRightIcon class="h-6 w-6 mr-3 transition-transform duration-300 group-hover:translate-x-1" />
            Iniciar Sesión
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import Header from './Header.vue';

// Import your team member images
import user1Image from '@/assets/imagenes/user1.jpeg';
import user2Image from '@/assets/imagenes/user2.jpeg';
import user3Image from '@/assets/imagenes/user3.jpeg';
import user4Image from '@/assets/imagenes/user4.jpeg';
import user5Image from '@/assets/imagenes/user5.jpeg';

import {
  SparklesIcon,
  RocketLaunchIcon,
  EyeIcon,
  HandRaisedIcon,
  UserPlusIcon,
  UserCircleIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
  LightBulbIcon,
  UsersIcon,
  CubeTransparentIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  LinkIcon,
} from '@heroicons/vue/24/outline';

const historyVisible = ref(false);
const missionFlipped = ref(false);
const visionFlipped = ref(false);
const activeRadial = ref(null);
const activeBenefit = ref(0);
const activeTeamMember = ref(null);
const teamCardTransform = reactive(Array(5).fill({}));

// Updated Team Data with imported images
const team = ref([
  {
    name: 'Antony Quispe Goyoneche',
    role: 'Dirección General',
    bio: 'Visionario y estratega clave que lidera el rumbo y la misión de KambiaPe, asegurando su crecimiento y impacto.',
    badgeText: 'Dirección',
    badgeColor: 'bg-indigo-600',
    image: user1Image, // Use the imported image variable here
    social: [
      { name: 'LinkedIn', url: '#', icon: LinkIcon },
      { name: 'Twitter', url: '#', icon: LinkIcon }
    ]
  },
  {
    name: 'Mayerly Espino Loyola',
    role: 'Área de tecnología y desarrollo',
    bio: 'Encargada de la innovación y mejora continua de la plataforma, garantizando una experiencia técnica fluida y segura.',
    badgeText: 'Tecnología',
    badgeColor: 'bg-pink-600',
    image: user2Image, // Use the imported image variable here
    social: [
      { name: 'LinkedIn', url: '#', icon: LinkIcon },
      { name: 'Instagram', url: '#', icon: LinkIcon }
    ]
  },
  {
    name: 'Luis Llancari Flores',
    role: 'Área de alianzas y expansión',
    bio: 'Establece y cultiva relaciones estratégicas, buscando nuevas oportunidades para expandir el alcance de KambiaPe.',
    badgeText: 'Alianzas',
    badgeColor: 'bg-green-600',
    image: user3Image, // Use the imported image variable here
    social: [
      { name: 'GitHub', url: '#', icon: LinkIcon },
      { name: 'Twitter', url: '#', icon: LinkIcon }
    ]
  },
  {
    name: 'Fiorela Maurtua Avalos',
    role: 'Área administrativa y legal',
    bio: 'Asegura el correcto funcionamiento administrativo y el cumplimiento normativo, vital para la transparencia y confianza.',
    badgeText: 'Legal',
    badgeColor: 'bg-yellow-600',
    image: user4Image, // Use the imported image variable here
    social: [
      { name: 'LinkedIn', url: '#', icon: LinkIcon },
      { name: 'Instagram', url: '#', icon: LinkIcon }
    ]
  },
  {
    name: 'Arelis Belleza Castilla',
    role: 'Área de comunicación y comunidad',
    bio: 'Responsable de construir y mantener una comunidad activa y comprometida, gestionando la comunicación efectiva.',
    badgeText: 'Comunidad',
    badgeColor: 'bg-orange-600',
    image: user5Image, // Use the imported image variable here
    social: [
      { name: 'LinkedIn', url: '#', icon: LinkIcon },
      { name: 'Twitter', url: '#', icon: LinkIcon }
    ]
  }
]);

// ... rest of your script setup code remains unchanged ...

// Data de Valores (unchanged)
const values = ref([
  {
    title: 'Innovación',
    description: 'Construimos el futuro del trueque con soluciones creativas y adaptables, siempre buscando ir más allá.',
    icon: LightBulbIcon,
    color: '#d7037b',
    textColor: 'text-[#d7037b]'
  },
  {
    title: 'Comunidad',
    description: 'Fomentamos la conexión, confianza y colaboración entre nuestros usuarios, creando lazos duraderos.',
    icon: UsersIcon,
    color: '#9e0154',
    textColor: 'text-[#9e0154]'
  },
  {
    title: 'Sostenibilidad',
    description: 'Promovemos un consumo consciente, la reutilización y el respeto por nuestro planeta en cada intercambio.',
    icon: CubeTransparentIcon,
    color: '#d7037b',
    textColor: 'text-[#d7037b]'
  }
]);

// Datos de Beneficios (unchanged)
const benefits = ref([
  {
    title: 'Simplicidad & Rapidez',
    description: 'Publica en minutos, encuentra lo que necesitas al instante. Un trueque sin complicaciones ni barreras.',
    icon: CheckCircleIcon,
    borderColor: 'hover:border-green-500',
    bgColor: 'bg-green-500',
    visualTitle: 'Intercambios en 3 Pasos',
    visualDescription: 'Publica tu artículo, encuentra el intercambio perfecto y acuerda con facilidad. ¡Así de simple!',
    tagline: 'La simplicidad es la máxima sofisticación en KambiaPe.'
  },
  {
    title: 'Confianza & Seguridad',
    description: 'Nuestra plataforma cuenta con herramientas de verificación avanzadas y una comunidad basada en el respeto.',
    icon: ShieldCheckIcon,
    borderColor: 'hover:border-blue-500',
    bgColor: 'bg-blue-500',
    visualTitle: 'Plataforma Segura',
    visualDescription: 'Perfiles verificados y un sistema de reputación robusto para que cada trueque sea totalmente confiable.',
    tagline: 'Tu seguridad y tranquilidad son nuestra prioridad número uno.'
  },
  {
    title: 'Impacto Positivo',
    description: 'Cada intercambio en KambiaPe contribuye a una economía más justa y reduce significativamente el desperdicio.',
    icon: HeartIcon,
    borderColor: 'hover:border-pink-500',
    bgColor: 'bg-pink-500',
    visualTitle: 'Contribuye al Planeta',
    visualDescription: 'Forma parte de la solución, reduce tu huella de carbono y fomenta la economía circular con cada trueque.',
    tagline: 'Pequeñas acciones, grandes cambios para un futuro sostenible.'
  },
  {
    title: 'Conexión Comunitaria',
    description: 'Únete a una vibrante red de vecinos y emprendedores que valoran la colaboración y el apoyo local.',
    icon: ChatBubbleLeftRightIcon,
    borderColor: 'hover:border-purple-500',
    bgColor: 'bg-purple-500',
    visualTitle: 'Crea Nuevas Conexiones',
    visualDescription: 'Conecta con personas afines, comparte intereses y descubre oportunidades únicas en tu comunidad.',
    tagline: 'Juntos, creamos una comunidad más fuerte y unida.'
  }
]);

const onHistoryIntersect = (entry) => {
  if (entry.isIntersecting) {
    historyVisible.value = true;
  }
};

const flipCard = (cardType) => {
  if (cardType === 'mission') missionFlipped.value = true;
  if (cardType === 'vision') visionFlipped.value = true;
};

const unflipCard = (cardType) => {
  if (cardType === 'mission') missionFlipped.value = false;
  if (cardType === 'vision') visionFlipped.value = false;
};

const handleTeamHover = (event, index) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const maxRotation = 8;
  const rotationX = ((y - centerY) / centerY) * -maxRotation;
  const rotationY = ((x - centerX) / centerX) * maxRotation;

  teamCardTransform[index] = {
    transform: `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(1.03)`
  };
};

const vIntersect = {
  mounted(el, binding) {
    const options = binding.value.options || {};
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (binding.value.handler) {
          binding.value.handler(entry);
        }
      });
    }, options);
    observer.observe(el);
    el._intersectionObserver = observer;
  },
  unmounted(el) {
    if (el._intersectionObserver) {
      el._intersectionObserver.disconnect();
      delete el._intersectionObserver;
    }
  }
};

onMounted(() => {
  // No changes needed here.
});
</script>

<style scoped>
/* Custom Animations & Transitions for enhanced UX/UI */

/* General fades and slides */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
/* Usar `animation-delay` directamente en la clase HTML es una buena práctica */


/* Typewriter effect */
@keyframes typewriter {
  from { width: 0 }
  to { width: 100% }
}
.animate-typewriter { animation: typewriter 2s steps(40) 0.5s 1 normal both; }

/* Gradient shift for titles */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient-shift { animation: gradient-shift 8s ease infinite; }

/* Blob background animation */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 7s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045); }
/* animation-delay-XXXX clases se mantienen en HTML */

/* Floating elements */
@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
.animate-float-slow { animation: float-slow 6s ease-in-out infinite; }

@keyframes float-particles {
  0% { transform: translate(0, 0); opacity: 0.05; }
  50% { transform: translate(var(--tw-float-x, 0), var(--tw-float-y, -20px)); opacity: 0.1; }
  100% { transform: translate(0, 0); opacity: 0.05; }
}
.animate-float-particles {
  animation: float-particles linear infinite;
  /* Estas variables CSS deben establecerse dinámicamente si quieres variación real por partícula */
  /* Si no, simplemente son valores por defecto que se aplican a todas. */
  --tw-float-x: calc(var(--random-x, 0) * 100px);
  --tw-float-y: calc(var(--random-y, 0) * 20px);
}

/* Bouncing and pulsing icons */
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
.animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }

@keyframes sparkle-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}
.animate-sparkle-pulse { animation: sparkle-pulse 2s ease-in-out infinite; }

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow { animation: spin-slow 15s linear infinite; }

@keyframes pulse-slight {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
.animate-pulse-slight { animation: pulse-slight 2s ease-in-out infinite; }

@keyframes bounce-custom {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-5px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(-2px); }
}
.animate-bounce-custom { animation: bounce-custom 2s ease-in-out infinite; }

@keyframes jiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(3deg); }
}
.animate-jiggle { animation: jiggle 2s ease-in-out infinite; }


/* Custom Easing Functions (for smoother transitions) */
.ease-out-quad { transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); } /* easeOutQuad */
.ease-in-out-cubic { transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1); } /* easeInOutCubic */
.ease-out-back { transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275); } /* easeOutBack */
.ease-out-expo { transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1); } /* easeOutExpo */

/* Specific transitions */
.transition-all-200 { transition: all 0.2s ease-in-out; }
.transition-all-300 { transition: all 0.3s ease-in-out; }
.transition-all-500 { transition: all 0.5s ease-in-out; }
.transition-all-700 { transition: all 0.7s ease-in-out; }
.transition-all-1000 { transition: all 1s ease-in-out; }

/* Transform utilities */
.transform-gpu { transform: translate3d(0, 0, 0); } /* Ensures GPU acceleration for smoother animations */

/* Animations for new elements */
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
.animate-pop-in { animation: pop-in 0.5s ease-out-back forwards; }

@keyframes fade-in-scale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in-scale { animation: fade-in-scale 0.7s ease-out forwards; }
</style>