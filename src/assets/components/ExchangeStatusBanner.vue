<template>
    <div v-if="exchange" class="p-3 border-b border-slate-200 transition-colors" :class="bannerColors.bg">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center" :class="bannerColors.iconBg">
            <component :is="bannerIcon" class="h-5 w-5" :class="bannerColors.iconText" aria-hidden="true" />
          </div>
          <div>
            <p class="font-semibold text-sm" :class="bannerColors.text">{{ bannerTitle }}</p>
            <p class="text-xs" :class="bannerColors.subtext">{{ bannerMessage }}</p>
          </div>
        </div>
        
        <div v-if="showActions" class="flex-shrink-0 w-full sm:w-auto">
          <div class="flex items-center justify-end gap-2">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useUserStore } from '@/stores/user';
  import {
    ClockIcon, CheckCircleIcon, XCircleIcon, NoSymbolIcon, StarIcon
  } from '@heroicons/vue/24/solid';
  
  const props = defineProps({
    exchange: {
      type: Object,
      required: true,
    },
  });
  
  const userStore = useUserStore();
  const isCurrentUserProposer = computed(() => props.exchange.proposer_user_id === userStore.user?.id);
  
  const statusInfo = computed(() => {
    const status = props.exchange.status;
    switch (status) {
      case 'pending':
        return {
          icon: ClockIcon,
          colors: { bg: 'bg-sky-50', text: 'text-sky-900', subtext: 'text-sky-700', iconBg: 'bg-sky-100', iconText: 'text-sky-600' },
          title: isCurrentUserProposer.value ? 'Propuesta Enviada' : '¡Tienes una nueva propuesta!',
          message: isCurrentUserProposer.value ? 'Esperando respuesta del otro usuario.' : 'Revisa la propuesta y responde.',
        };
      case 'accepted':
        return {
          icon: CheckCircleIcon,
          colors: { bg: 'bg-green-50', text: 'text-green-900', subtext: 'text-green-700', iconBg: 'bg-green-100', iconText: 'text-green-600' },
          title: '¡Intercambio Aceptado!',
          message: 'Coordinen los detalles del encuentro por el chat.',
        };
      case 'rejected':
        return {
          icon: XCircleIcon,
          colors: { bg: 'bg-red-50', text: 'text-red-900', subtext: 'text-red-700', iconBg: 'bg-red-100', iconText: 'text-red-600' },
          title: 'Propuesta Rechazada',
          message: 'El otro usuario ha rechazado la propuesta.',
        };
      case 'cancelled':
        return {
          icon: NoSymbolIcon,
          colors: { bg: 'bg-slate-100', text: 'text-slate-900', subtext: 'text-slate-600', iconBg: 'bg-slate-200', iconText: 'text-slate-500' },
          title: 'Propuesta Cancelada',
          message: 'Este intercambio ya no está activo.',
        };
      case 'completed':
        return {
          icon: StarIcon,
          colors: { bg: 'bg-pink-50', text: 'text-pink-900', subtext: 'text-pink-700', iconBg: 'bg-pink-100', iconText: 'text-pink-600' },
          title: '¡Intercambio Completado!',
          message: 'Gracias por confiar en nuestra comunidad.',
        };
      default:
        return {
          icon: ClockIcon,
          colors: { bg: 'bg-slate-100', text: 'text-slate-900', subtext: 'text-slate-600', iconBg: 'bg-slate-200', iconText: 'text-slate-500' },
          title: 'Estado Desconocido',
          message: 'Contacta a soporte si el problema persiste.',
        };
    }
  });
  
  const bannerIcon = computed(() => statusInfo.value.icon);
  const bannerColors = computed(() => statusInfo.value.colors);
  const bannerTitle = computed(() => statusInfo.value.title);
  const bannerMessage = computed(() => statusInfo.value.message);
  
  const showActions = computed(() => ['pending', 'accepted'].includes(props.exchange.status));
  </script>