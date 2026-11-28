<script setup>
import { ref } from 'vue'

const props = defineProps({ initial: Object })
const emit = defineEmits(['save', 'cancel'])

const name = ref(props.initial?.name || '')
const error = ref('')

function submit() {
  if (!name.value.trim()) {
    error.value = 'Category name is required'
    return
  }
  emit('save', { name: name.value.trim() })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="submit">
    <label class="block text-sm font-medium text-slate-700">
      Category name
      <input
        v-model="name"
        class="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        autofocus
      />
    </label>
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    <div class="flex justify-end gap-2">
      <button type="button" class="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50" @click="emit('cancel')">
        Cancel
      </button>
      <button class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition">
        Save
      </button>
    </div>
  </form>
</template>