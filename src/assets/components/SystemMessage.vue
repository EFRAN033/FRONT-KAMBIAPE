<template>
  <div class="py-3 text-center">
    <div class="inline-block bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-inner-sm border border-slate-200/50">
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: String,
});
</script>

<style scoped>
/* Sombra interior para dar un efecto de profundidad sutil */
.shadow-inner-sm {
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.06);
}
</style>