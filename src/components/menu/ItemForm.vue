<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({ initial: Object, categories: Array })
const emit = defineEmits(['save', 'cancel'])

const form = reactive({
  name: props.initial?.name || '',
  categoryId: props.initial?.categoryId || props.categories[0]?.id || '',
  price: props.initial?.price ?? '',
  description: props.initial?.description || '',
  imageUrl: props.initial?.imageUrl || '',
  available: props.initial?.available ?? true,
})
const error = ref('')

function submit() {
  if (!form.name.trim()) return (error.value = 'Item name is required')
  if (!form.categoryId) return (error.value = 'Please create a category first')
  const price = Number(form.price)
  if (form.price === '' || Number.isNaN(price) || price < 0) return (error.value = 'Enter a valid price')
  emit('save', { ...form, name: form.name.trim(), price })
}

const input =
  'mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
</script>

<template>
  <form class="space-y-4" @submit.prevent="submit">
    <label class="block text-sm font-medium text-slate-700">
      Name
      <input v-model="form.name" :class="input" autofocus />
    </label>
    <label class="block text-sm font-medium text-slate-700">
      Category
      <select v-model="form.categoryId" :class="input">
        <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
    </label>
    <label class="block text-sm font-medium text-slate-700">
      Price
      <input v-model="form.price" type="number" step="0.01" min="0" :class="input" />
    </label>
    <label class="block text-sm font-medium text-slate-700">
      Description (optional)
      <textarea v-model="form.description" rows="2" :class="input" />
    </label>
    <label class="block text-sm font-medium text-slate-700">
      Image URL (optional)
      <input v-model="form.imageUrl" placeholder="https://..." :class="input" />
    </label>
    <label class="flex items-center gap-2 text-sm text-slate-700">
      <input v-model="form.available" type="checkbox" class="accent-emerald-600" />
      Available for ordering
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