<script setup>
import { ref, computed } from 'vue'
import { useMenuBilling, money } from '../../composables/useMenuBilling'
import BaseModal from '../../components/menu/BaseModal.vue'
import CategoryForm from '../../components/menu/CategoryForm.vue'
import ItemForm from '../../components/menu/ItemForm.vue'

const {
  state,
  addCategory, updateCategory, deleteCategory,
  addItem, updateItem, deleteItem,
} = useMenuBilling()

const modal = ref(null) // { type: 'category' | 'item', data?: object }
const filter = ref('all')

const shown = computed(() =>
  filter.value === 'all' ? state.items : state.items.filter((i) => i.categoryId === filter.value)
)
const catName = (id) => state.categories.find((c) => c.id === id)?.name || '-'
const countItems = (id) => state.items.filter((i) => i.categoryId === id).length

function saveCategory(v) {
  modal.value.data ? updateCategory(modal.value.data.id, v) : addCategory(v)
  modal.value = null
}
function saveItem(v) {
  modal.value.data ? updateItem(modal.value.data.id, v) : addItem(v)
  modal.value = null
}
function removeCategory(c) {
  const n = countItems(c.id)
  const msg = n ? `Delete "${c.name}" and its ${n} menu item(s)?` : `Delete category "${c.name}"?`
  if (window.confirm(msg)) {
    deleteCategory(c.id)
    if (filter.value === c.id) filter.value = 'all'
  }
}
function removeItem(i) {
  if (window.confirm(`Delete "${i.name}"?`)) deleteItem(i.id)
}

const card = 'p-6 bg-white rounded-xl shadow-md border border-slate-100'
const btn = 'px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition disabled:opacity-50'
const btnSm = 'px-3 py-1 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 transition'
const btnDel = 'px-3 py-1 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition'
const chip = 'px-3 py-1 rounded-full text-sm border transition'
</script>

<template>
  <div class="space-y-6">
    <!-- Categories -->
    <section :class="card">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-xl font-bold text-slate-800">Menu categories</h2>
        <button :class="btn" @click="modal = { type: 'category' }">+ Add category</button>
      </div>
      <p v-if="state.categories.length === 0" class="text-slate-500 text-sm">No categories yet.</p>
      <ul class="divide-y divide-slate-100">
        <li v-for="c in state.categories" :key="c.id" class="py-3 flex items-center justify-between">
          <span class="font-medium text-slate-800">
            {{ c.name }}
            <span class="text-xs text-slate-500 font-normal">({{ countItems(c.id) }} items)</span>
          </span>
          <span class="flex gap-2">
            <button :class="btnSm" @click="modal = { type: 'category', data: c }">Edit</button>
            <button :class="btnDel" @click="removeCategory(c)">Delete</button>
          </span>
        </li>
      </ul>
    </section>

    <!-- Items -->
    <section :class="card">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-xl font-bold text-slate-800">Menu items</h2>
        <button :class="btn" :disabled="state.categories.length === 0" @click="modal = { type: 'item' }">
          + Add item
        </button>
      </div>

      <div class="flex flex-wrap gap-2 mb-4">
        <button
          :class="[chip, filter === 'all' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 hover:bg-slate-50']"
          @click="filter = 'all'"
        >
          All
        </button>
        <button
          v-for="c in state.categories"
          :key="c.id"
          :class="[chip, filter === c.id ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 hover:bg-slate-50']"
          @click="filter = c.id"
        >
          {{ c.name }}
        </button>
      </div>

      <div class="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
        <p v-if="shown.length === 0" class="p-3 text-sm text-slate-500">No items.</p>
        <div v-for="i in shown" :key="i.id" class="p-3 flex justify-between items-center gap-3 hover:bg-slate-50 transition">
          <div class="min-w-0">
            <p class="font-semibold text-slate-800">{{ i.name }}</p>
            <p v-if="i.description" class="text-xs text-slate-500 truncate">{{ i.description }}</p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs text-slate-500">{{ catName(i.categoryId) }}</span>
              <span
                class="text-xs px-2 py-0.5 rounded-full font-medium"
                :class="i.available ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'"
              >
                {{ i.available ? 'Available' : 'Hidden' }}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <span class="font-bold text-slate-700">{{ money(i.price) }}</span>
            <button :class="btnSm" @click="modal = { type: 'item', data: i }">Edit</button>
            <button :class="btnDel" @click="removeItem(i)">Delete</button>
          </div>
        </div>
      </div>
    </section>

    <BaseModal
      v-if="modal?.type === 'category'"
      :title="modal.data ? 'Edit category' : 'Add category'"
      @close="modal = null"
    >
      <CategoryForm :initial="modal.data" @save="saveCategory" @cancel="modal = null" />
    </BaseModal>

    <BaseModal
      v-if="modal?.type === 'item'"
      :title="modal.data ? 'Edit menu item' : 'Add menu item'"
      @close="modal = null"
    >
      <ItemForm :initial="modal.data" :categories="state.categories" @save="saveItem" @cancel="modal = null" />
    </BaseModal>
  </div>
</template>