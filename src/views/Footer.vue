<template>
  <footer class="bg-gray-950 text-white font-sans antialiased">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div class="md:hidden space-y-2.5">
        <Disclosure
          v-for="(section, idx) in mobileSections"
          :key="idx"
          as="div"
          class="rounded-lg border border-white/10 bg-white/5 backdrop-blur"
        >
          <DisclosureButton class="flex w-full items-center justify-between px-3 py-2 text-left">
            <span class="text-[13px] font-semibold text-pink-300">{{ section.title }}</span>
            <svg class="h-4 w-4 text-pink-300 ui-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </DisclosureButton>

          <DisclosurePanel class="px-3 pb-3 text-gray-300">
            <div v-if="section.type === 'newsletter'" class="space-y-2">
              <p class="text-[12px] leading-4 text-gray-400">Recibe novedades y oportunidades solidarias.</p>

              <form @submit.prevent="submitNewsletter" class="flex gap-1.5">
                <input
                  v-model="newsletterEmail"
                  type="email"
                  required
                  autocomplete="email"
                  placeholder="Kambix@email.com"
                  class="flex-1 rounded-md border border-white/10 bg-white/10 px-2.5 py-2 text-[13px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  :disabled="newsletterSubmitting"
                  class="rounded-md bg-gradient-to-r from-pink-600 to-rose-600 px-3 py-2 text-[13px] font-semibold text-white shadow disabled:opacity-50"
                >
                  {{ newsletterSubmitting ? 'Enviando…' : 'Suscribirme' }}
                </button>
              </form>

              <p v-if="newsletterMsg" class="text-[12px]" :class="newsletterOk ? 'text-emerald-400' : 'text-rose-400'">
                {{ newsletterMsg }}
              </p>

              <div class="flex items-center gap-2 pt-1">
                <a
                  v-for="s in socialLinks"
                  :key="s.name"
                  :href="s.href"
                  target="_blank"
                  rel="noopener"
                  :aria-label="s.name"
                  :title="s.name"
                  class="group relative inline-flex h-8 w-8 items-center justify-center rounded-full
                         border border-white/10 bg-white/5 backdrop-blur
                         ring-0 ring-pink-400/0 transition
                         hover:border-white/15 hover:bg-white/10 hover:shadow-[0_0_0_3px_rgba(236,72,153,0.15)]
                         hover:ring-4 hover:ring-pink-400/10
                         focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400/40"
                >
                  <span class="absolute inset-0 rounded-full opacity-0 blur-[6px] transition-opacity
                               group-hover:opacity-30 bg-gradient-to-tr from-white/10 to-white/0"></span>

                  <span class="relative text-gray-300 transition-transform duration-150 group-hover:scale-110 group-hover:text-white">
                    <svg v-if="s.icon === 'tiktok'" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3h3.1A6.9 6.9 0 0 0 23 9.9V13A10 10 0 0 1 13 6.1V16a6 6 0 1 1-6-6c.34 0 .68.03 1.02.1V13a3 3 0 1 0 3 3V3Z"/></svg>
                    <svg v-else-if="s.icon === 'instagram'" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3a5 5 0 110 10 5 5 0 010-10zm5.8-1.8a1 1 0 110 2 1 1 0 010-2z"/>
                    </svg>
                    <svg v-else-if="s.icon === 'facebook'" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M13 22v-8h3l1-4h-4V7a1 1 0 011-1h3V2h-3a5 5 0 00-5 5v3H6v4h3v8h4z"/>
                    </svg>
                  </span>

                  <span
                    class="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2
                           whitespace-nowrap rounded-md bg-gray-800/95 px-1.5 py-0.5
                           text-[10.5px] font-medium leading-4 text-gray-100 opacity-0 shadow
                           transition-opacity duration-150 group-hover:opacity-100"
                  >
                    {{ s.name }}
                  </span>
                </a>
              </div>
            </div>

            <ul v-else class="space-y-1">
              <li v-for="(link, i) in section.links" :key="i">
                <router-link
                  v-if="link.to && link.to.startsWith('/')"
                  :to="link.to"
                  class="block rounded-md px-2 py-1 text-[13px] hover:text-pink-300"
                  @click="link.action === 'comment' && openCommentModal()"
                >{{ link.label }}</router-link>

                <a
                  v-else-if="link.to"
                  :href="link.to"
                  class="block rounded-md px-2 py-1 text-[13px] hover:text-pink-300"
                  target="_blank" rel="noopener"
                >{{ link.label }}</a>

                <button
                  v-else
                  class="block w-full rounded-md px-2 py-1 text-left text-[13px] hover:text-pink-300"
                  @click="handleAction(link)"
                >{{ link.label }}</button>
              </li>
            </ul>
          </DisclosurePanel>
        </Disclosure>

        <button
          @click="navigateToRegister"
          class="mt-1.5 w-full rounded-md bg-gradient-to-r from-pink-600 to-rose-600 px-4 py-2 text-[13px] font-semibold shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-950"
        >
          Subir mis productos
        </button>
      </div>

      <div class="hidden md:grid grid-cols-12 gap-5">
        <div class="col-span-4">
          <h3 class="text-sm font-bold text-[#d7037b]">KambiaPe</h3>
          <p class="mt-1 text-[13px] text-gray-400">
            Intercambia, dona y potencia el impacto social en tu comunidad.
          </p>

          <form @submit.prevent="submitNewsletter" class="mt-2.5 flex gap-2">
            <input
              v-model="newsletterEmail"
              type="email"
              required
              autocomplete="email"
              placeholder="Kambix@email.com"
              class="w-full rounded-md border border-white/10 bg-white/10 px-3 py-2 text-[13px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              :disabled="newsletterSubmitting"
              class="rounded-md bg-[#d7037b] px-3.5 py-2 text-[13px] font-semibold text-white shadow-lg shadow-[#d7037b]/20 hover:brightness-110 active:scale-95 transition disabled:opacity-50"
            >
              {{ newsletterSubmitting ? 'Enviando…' : 'Suscribirme' }}
            </button>
          </form>

          <p v-if="newsletterMsg" class="mt-1 text-[12px]" :class="newsletterOk ? 'text-emerald-400' : 'text-rose-400'">
            {{ newsletterMsg }}
          </p>

          <div class="mt-3 flex items-center gap-2">
            <a
              v-for="s in socialLinks"
              :key="s.name"
              :href="s.href"
              target="_blank"
              rel="noopener"
              :aria-label="s.name"
              :title="s.name"
              class="group relative inline-flex h-9 w-9 items-center justify-center rounded-full
                     border border-white/10 bg-white/5 backdrop-blur
                     ring-0 ring-pink-400/0 transition
                     hover:border-white/15 hover:bg-white/10 hover:shadow-[0_0_0_3px_rgba(236,72,153,0.15)]
                     hover:ring-4 hover:ring-pink-400/10
                     focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400/40"
            >
              <span class="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity
                           group-hover:opacity-30 bg-gradient-to-tr from-white/10 to-white/0"></span>

              <span class="relative text-gray-300 transition-transform duration-150 group-hover:scale-110 group-hover:text-white">
                <svg v-if="s.icon === 'tiktok'" class="h-4.5 w-4.5 md:h-5 md:w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3h3.1A6.9 6.9 0 0 0 23 9.9V13A10 10 0 0 1 13 6.1V16a6 6 0 1 1-6-6c.34 0 .68.03 1.02.1V13a3 3 0 1 0 3 3V3Z"/></svg>
                <svg v-else-if="s.icon === 'instagram'" class="h-4.5 w-4.5 md:h-5 md:w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3a5 5 0 110 10 5 5 0 010-10zm5.8-1.8a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
                <svg v-else-if="s.icon === 'facebook'" class="h-4.5 w-4.5 md:h-5 md:w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13 22v-8h3l1-4h-4V7a1 1 0 011-1h3V2h-3a5 5 0 00-5 5v3H6v4h3v8h4z"/>
                </svg>
              </span>

              <span
                class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2
                       whitespace-nowrap rounded-md bg-gray-800/95 px-2 py-1
                       text-[11px] font-medium text-gray-100 opacity-0 shadow
                       transition-opacity duration-150 group-hover:opacity-100"
              >
                {{ s.name }}
              </span>
            </a>
          </div>
        </div>

        <div class="col-span-3">
          <h3 class="text-sm font-bold text-[#d7037b] mb-2.5">Navegación</h3>
          <ul class="space-y-1.5 text-gray-300 text-[13px]">
            <li><router-link to="/" class="hover:text-pink-300">Inicio</router-link></li>
            <li><router-link to="/como-funciona" class="hover:text-pink-300">Cómo funciona</router-link></li>
            <li><router-link to="/faqs" class="hover:text-pink-300">FAQs</router-link></li>
          </ul>
        </div>

        <div class="col-span-3">
          <h3 class="text-sm font-bold text-[#d7037b] mb-2.5">Soporte</h3>
          <ul class="space-y-1.5 text-gray-300 text-[13px]">
            <li><a href="mailto:kambiapex@gmail.com" class="hover:text-pink-300">kambiapex@gmail.com</a></li>
            <li><button @click="openCommentModal" class="hover:text-pink-300">Dejar un comentario</button></li>
          </ul>
        </div>

        <div class="col-span-2">
          <h3 class="text-sm font-bold text-[#d7037b] mb-2.5">¿Quieres publicar?</h3>
          <p class="text-gray-300 text-[13px] mb-2.5">Sube tus productos y dales una segunda vida.</p>
          <button
              @click="navigateToRegister"
              class="w-full rounded-md bg-brand-primary px-4 py-2.5 text-[13px] font-semibold text-white shadow hover:brightness-110"
          >
              Comenzar ahora
          </button>
        </div>
      </div>

      <div class="mt-6 sm:mt-8 border-t border-white/10 pt-3.5 sm:pt-4 text-center text-[13px] text-gray-400">
        <div class="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p class="text-[12px] sm:text-[13px]">© {{ year }} KambiaPe. Todos los derechos reservados.</p>
          <div class="flex items-center gap-3 sm:gap-4">
            <router-link to="/terminos" class="text-[12px] sm:text-[13px] hover:text-white">Términos</router-link>
            <router-link to="/privacidad" class="text-[12px] sm:text-[13px] hover:text-white">Privacidad</router-link>
            <select
              v-model="lang"
              class="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[12px] text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Idioma"
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <TransitionRoot :show="isCommentModalVisible" as="template">
  <Dialog @close="closeCommentModal" class="relative z-50">
    <!-- Overlay con blur y leve grano -->
    <TransitionChild
      as="template"
      enter="transition ease-out duration-200"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition ease-in duration-150"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div class="fixed inset-0 bg-black/70 backdrop-blur-sm"></div>
    </TransitionChild>

    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <!-- Panel -->
        <TransitionChild
          as="template"
          enter="transition ease-out duration-200"
          enter-from="opacity-0 translate-y-3 scale-95"
          enter-to="opacity-100 translate-y-0 scale-100"
          leave="transition ease-in duration-150"
          leave-from="opacity-100 translate-y-0 scale-100"
          leave-to="opacity-0 translate-y-3 scale-95"
        >
          <!-- Wrap con borde “aura” -->
          <div class="relative w-full max-w-lg">
            <div class="pointer-events-none absolute -inset-px rounded-2xl bg-[conic-gradient(from_180deg_at_50%_50%,#d7037b33_0deg,#9e015433_120deg,transparent_200deg,#d7037b33_360deg)]"></div>

            <DialogPanel
              class="relative rounded-2xl border border-white/10 bg-[#0b0b12]/90 p-6 sm:p-7 shadow-[0_10px_40px_-10px_rgba(215,3,123,0.35)] backdrop-blur-xl"
            >
              <!-- Header de marca -->
              <div class="mb-5 flex items-start gap-3">
                <div class="mt-0.5 grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#d7037b] to-[#9e0154] text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3a9 9 0 00-9 9 9.01 9.01 0 006.75 8.718.75.75 0 01.558.555l.223.895a1 1 0 001.938 0l.222-.895a.75.75 0 01.559-.555A9.01 9.01 0 0021 12a9 9 0 00-9-9zM8 11.25a1 1 0 112 0 1 1 0 01-2 0zm3 0a1 1 0 112 0 1 1 0 01-2 0zm3 0a1 1 0 112 0 1 1 0 01-2 0z"/>
                  </svg>
                </div>

                <div class="flex-1">
                  <DialogTitle class="text-base sm:text-lg font-extrabold tracking-tight text-white">
                    Envíanos tus comentarios
                  </DialogTitle>
                  <p class="mt-1 text-xs sm:text-sm text-white/60">
                    Tu feedback impulsa el producto. Sé específico y breve para una mejor respuesta.
                  </p>
                </div>
              </div>

              <!-- Barra superior viva -->
              <div class="h-[2px] w-full bg-gradient-to-r from-[#d7037b] via-[#b90266] to-[#9e0154] rounded-full opacity-70"></div>

              <!-- Form -->
              <form class="mt-6 space-y-5" @submit.prevent="submitComment">
                <!-- Tipo -->
                <div>
                  <label for="commentType" class="mb-2 block text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70">
                    Tipo (opcional)
                  </label>
                  <div class="relative">
                    <select
                      id="commentType"
                      v-model="comment.type"
                      class="w-full appearance-none rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 pr-10 text-sm text-white placeholder-white/40 outline-none transition
                             focus:ring-2 focus:ring-[#d7037b]/40 focus:border-[#d7037b]/40 hover:bg-white/[0.08]"
                    >
                      <option value="" class="bg-gray-900">Selecciona una opción</option>
                      <option value="sugerencia" class="bg-gray-900">Sugerencia</option>
                      <option value="error" class="bg-gray-900">Error</option>
                      <option value="pregunta" class="bg-gray-900">Pregunta</option>
                      <option value="otro" class="bg-gray-900">Otro</option>
                    </select>
                    <!-- caret -->
                    <svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 011.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>

                <!-- Mensaje -->
                <div>
                  <label for="commentMessage" class="mb-2 block text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70">
                    Mensaje <span class="text-rose-400">*</span>
                  </label>

                  <div class="relative group">
                    <textarea
                      id="commentMessage"
                      v-model="comment.message"
                      rows="5"
                      required
                      class="w-full resize-y rounded-xl border border-white/15 bg-white/5 px-3.5 py-3 text-sm text-white placeholder-white/40 outline-none transition
                             focus:ring-2 focus:ring-[#d7037b]/40 focus:border-[#d7037b]/40 hover:bg-white/[0.08] leading-relaxed"
                      placeholder="Cuéntanos qué mejorar, qué no funcionó o qué te gustaría ver…"
                    ></textarea>

                    <!-- subrayado animado -->
                    <span
                      class="pointer-events-none absolute left-3 right-3 bottom-2 h-[2px] bg-gradient-to-r from-[#d7037b] via-[#b90266] to-[#9e0154]
                             scale-x-0 origin-left transition-transform duration-500 group-focus-within:scale-x-100"
                    ></span>

                    <!-- contador -->
                    <div class="absolute -bottom-6 right-0 text-[11px] text-white/50">
                      {{ (comment && comment.message ? comment.message.length : 0) }} caracteres
                    </div>
                  </div>
                </div>

                <!-- Acciones -->
                <div class="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    @click="closeCommentModal"
                    class="inline-flex items-center justify-center rounded-lg px-3.5 py-2 text-sm font-medium text-white/85
                           hover:text-white hover:bg-white/10 border border-white/15 transition focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white
                           bg-[conic-gradient(from_180deg_at_50%_50%,#d7037b_0deg,#9e0154_160deg,#d7037b_360deg)]
                           shadow-[0_8px_30px_-8px_rgba(215,3,123,0.45)]
                           transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed
                           focus:outline-none focus:ring-4 focus:ring-[#d7037b]/30"
                  >
                    <svg v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"></path>
                    </svg>
                    <span>{{ isSubmitting ? 'Enviando…' : 'Enviar' }}</span>
                  </button>
                </div>
              </form>
            </DialogPanel>

            <!-- acentos suaves alrededor -->
            <div class="pointer-events-none absolute -top-6 -left-8 h-24 w-24 rounded-full blur-3xl bg-[#d7037b]/15"></div>
            <div class="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full blur-3xl bg-[#9e0154]/15"></div>
          </div>
        </TransitionChild>
      </div>
    </div>
  </Dialog>
</TransitionRoot>

  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

/* ------- Newsletter ------- */
const newsletterEmail = ref('')
const newsletterSubmitting = ref(false)
const newsletterMsg = ref('')
const newsletterOk = ref(false)

const submitNewsletter = async () => {
  newsletterMsg.value = ''
  newsletterOk.value = false
  if (!newsletterEmail.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.value)) {
    newsletterMsg.value = 'Ingresa un correo válido.'
    return
  }
  newsletterSubmitting.value = true
  await new Promise(r => setTimeout(r, 900))
  newsletterSubmitting.value = false
  newsletterOk.value = true
  newsletterMsg.value = '¡Gracias por suscribirte!'
  newsletterEmail.value = ''
}

/* ------- ✨ Social links ACTUALIZADOS ✨ ------- */
const socialLinks = [
  { name: 'Facebook',  href: 'https://www.facebook.com/share/1A62pnpV8K/', icon: 'facebook' },
  { name: 'Instagram', href: 'https://www.instagram.com/kambia_pe?igsh=MWg2aWR3YnhnNW1qdw==', icon: 'instagram' },
  { name: 'TikTok',    href: 'https://tiktok.com/@kambiape', icon: 'tiktok' },
]

/* ------- Mobile sections ------- */
const mobileSections = [
  { title: 'KambiaPe', type: 'newsletter' },
  {
    title: 'Enlaces rápidos',
    links: [
      { label: 'Inicio', to: '/' },
      { label: 'Cómo funciona', to: '/como-funciona' },
      { label: 'FAQs', to: '/faqs' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'kambiapex@gmail.com', to: 'mailto:kambiapex@gmail.com' },
      { label: 'Dejar un comentario', action: 'comment' },
    ],
  },
  {
    title: 'Almacenes',
    links: [
      { label: 'Chincha – Av. Mariscal Sucre #1032', to: 'https://maps.google.com/?q=Av.+Mariscal+Sucre+1032+Chincha' },
      { label: 'Ver todos', to: '/almacenes' },
    ],
  },
]

/* ------- Enrutado y acciones ------- */
const router = useRouter()
const handleAction = (link) => {
  if (link.action === 'comment') openCommentModal()
  else if (link.to?.startsWith('/')) router.push(link.to)
}

/* ------- CTA navegación ------- */
const navigateToRegister = () => router.push('/Register')

/* ------- Modal Comentarios (compacta) ------- */
const isCommentModalVisible = ref(false)
const comment = ref({ type: '', message: '', name: '', email: '' })
const isSubmitting = ref(false)
const feedbackMessage = ref('')
const isSuccess = ref(false)
const emailError = ref('')

const openCommentModal = () => {
  isCommentModalVisible.value = true
  comment.value = { type: '', message: '', name: '', email: '' }
  feedbackMessage.value = ''
  isSuccess.value = false
  emailError.value = ''
  isSubmitting.value = false
}
const closeCommentModal = () => (isCommentModalVisible.value = false)

const validateEmail = (email) => !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase())

const submitComment = async () => {
  emailError.value = ''
  if (!validateEmail(comment.value.email)) {
    emailError.value = 'Correo inválido.'
    return
  }
  if (!comment.value.message.trim()) {
    feedbackMessage.value = 'El mensaje no puede estar vacío.'
    isSuccess.value = false
    return
  }
  isSubmitting.value = true
  feedbackMessage.value = ''
  try {
    await new Promise((r) => setTimeout(r, 900))
    isSuccess.value = true
    feedbackMessage.value = '¡Gracias! Recibimos tu comentario.'
    setTimeout(() => closeCommentModal(), 1500)
  } catch {
    isSuccess.value = false
    feedbackMessage.value = 'Ocurrió un error. Intenta nuevamente.'
  } finally {
    isSubmitting.value = false
  }
}

/* ------- Barra inferior ------- */
const year = computed(() => new Date().getFullYear())
const lang = ref('es')
</script>