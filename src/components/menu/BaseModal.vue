<script setup>
defineProps({ title: String })
const emit = defineEmits(['close'])
</script>

<template>
  <div
    class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
    @click.self="emit('close')"
  >
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-auto p-6">
      <h3 class="text-lg font-bold text-slate-800 mb-4">{{ title }}</h3>
      <slot />
    </div>
  </div>
</template>