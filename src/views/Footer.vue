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
          <h3 class="text-sm font-bold text-pink-400">KambiaPe</h3>
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
          <h3 class="text-sm font-bold text-pink-400 mb-2.5">Navegación</h3>
          <ul class="space-y-1.5 text-gray-300 text-[13px]">
            <li><router-link to="/" class="hover:text-pink-300">Inicio</router-link></li>
            <li><router-link to="/como-funciona" class="hover:text-pink-300">Cómo funciona</router-link></li>
            <li><router-link to="/faqs" class="hover:text-pink-300">FAQs</router-link></li>
          </ul>
        </div>

        <div class="col-span-3">
          <h3 class="text-sm font-bold text-pink-400 mb-2.5">Soporte</h3>
          <ul class="space-y-1.5 text-gray-300 text-[13px]">
            <li><a href="mailto:kambiapex@gmail.com" class="hover:text-pink-300">kambiapex@gmail.com</a></li>
            <li><button @click="openCommentModal" class="hover:text-pink-300">Dejar un comentario</button></li>
          </ul>
        </div>

        <div class="col-span-2">
          <h3 class="text-sm font-bold text-pink-400 mb-2.5">¿Quieres publicar?</h3>
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
        <TransitionChild
          enter="transition ease-out duration-200"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition ease-in duration-150"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="transition ease-out duration-200"
              enter-from="opacity-0 translate-y-3 scale-95"
              enter-to="opacity-100 translate-y-0 scale-100"
              leave="transition ease-in duration-150"
              leave-from="opacity-100 translate-y-0 scale-100"
              leave-to="opacity-0 translate-y-3 scale-95"
            >
              <DialogPanel class="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0b0b12]/90 p-6 sm:p-7 shadow-[0_10px_40px_-10px_rgba(215,3,123,0.35)] backdrop-blur-xl">
                <DialogTitle class="text-center text-lg font-bold text-pink-300">Envíanos tus Comentarios</DialogTitle>

                <form class="mt-4 space-y-3" @submit.prevent="submitComment">
                  <div>
                    <label for="commentType" class="mb-1 block text-[13px] text-gray-300">Tipo (opcional)</label>
                    <select
                      id="commentType"
                      v-model="comment.type"
                      class="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">Selecciona</option>
                      <option value="suggestion">Sugerencia</option>
                      <option value="problem">Reportar un problema</option>
                      <option value="question">Pregunta</option>
                      <option value="compliment">Felicitación</option>
                    </select>
                  </div>

                  <div>
                    <label for="commentMessage" class="mb-1 block text-[13px] text-gray-300">
                      Mensaje <span class="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="commentMessage"
                      v-model="comment.message"
                      rows="4"
                      required
                      class="w-full resize-y rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Escribe tu comentario..."
                    ></textarea>
                  </div>

                  <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label for="commentName" class="mb-1 block text-[13px] text-gray-300">Tu nombre (opcional)</label>
                      <input
                        id="commentName"
                        v-model="comment.name"
                        type="text"
                        class="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div>
                      <label for="commentEmail" class="mb-1 block text-[13px] text-gray-300">Correo (opcional)</label>
                      <input
                        id="commentEmail"
                        v-model="comment.email"
                        type="email"
                        class="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                      <p v-if="emailError" class="mt-1 text-[12px] text-rose-400">{{ emailError }}</p>
                    </div>
                  </div>

                  <div class="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      @click="closeCommentModal"
                      class="rounded-md border border-gray-600 px-4 py-2 text-[13px] text-gray-300 hover:bg-gray-800"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      class="inline-flex items-center rounded-md bg-gradient-to-r from-pink-600 to-rose-600 px-4 py-2 text-[13px] font-medium text-white shadow hover:brightness-110 disabled:opacity-50"
                    >
                      <span v-if="!isSubmitting">Enviar</span>
                      <svg v-else class="ml-1 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0A12 12 0 000 12h4z"/>
                      </svg>
                    </button>
                  </div>
                </form>

                <p
                  v-if="feedbackMessage"
                  class="mt-3 text-center text-[13px]"
                  :class="isSuccess ? 'text-gray-300' : 'text-rose-400'"
                >
                  {{ feedbackMessage }}
                </p>
                </DialogPanel>
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
const socialLinks = [
  { name: 'Facebook',  href: 'https://www.facebook.com/share/1A62pnpV8K/', icon: 'facebook' },
  { name: 'Instagram', href: 'https://www.instagram.com/kambia_pe?igsh=MWg2aWR3YnhnNW1qdw==', icon: 'instagram' },
  { name: 'TikTok',    href: 'https://tiktok.com/@kambiape', icon: 'tiktok' },
]
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
const router = useRouter()
const handleAction = (link) => {
  if (link.action === 'comment') openCommentModal()
  else if (link.to?.startsWith('/')) router.push(link.to)
}
const navigateToRegister = () => router.push('/Register')
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
const year = computed(() => new Date().getFullYear())
const lang = ref('es')
</script>