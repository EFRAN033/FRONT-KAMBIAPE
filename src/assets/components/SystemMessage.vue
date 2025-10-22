<template>
    <div class="flex items-center justify-center my-4">
      <div class="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
        <slot name="icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </slot>
        <span>{{ text }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    text: {
      type: String,
      required: true,
    },
  });
  </script>