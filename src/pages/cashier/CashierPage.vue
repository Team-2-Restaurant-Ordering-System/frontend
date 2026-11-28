<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuBilling, calcTotals, money, TAX_RATE } from '../../composables/useMenuBilling'

const router = useRouter()
const { state, createBill } = useMenuBilling()

const cat = ref('all')
const search = ref('')
const qtyById = ref({}) // { itemId: qty }
const tableNo = ref('')
const discount = ref(0)
const error = ref('')

const menu = computed(() =>
  state.items.filter(
    (i) =>
      i.available &&
      (cat.value === 'all' || i.categoryId === cat.value) &&
      i.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const lines = computed(() =>
  Object.entries(qtyById.value)
    .map(([id, qty]) => {
      const item = state.items.find((i) => i.id === id)
      return item ? { itemId: id, name: item.name, price: item.price, qty } : null
    })
    .filter(Boolean)
)

const totals = computed(() => calcTotals(lines.value, discount.value))

function change(id, delta) {
  const next = (qtyById.value[id] || 0) + delta
  const copy = { ...qtyById.value }
  if (next <= 0) delete copy[id]
  else copy[id] = next
  qtyById.value = copy
}

function submit() {
  if (lines.value.length === 0) return (error.value = 'Add at least one item')
  if (!tableNo.value.trim()) return (error.value = "Enter a table number (or 'Takeaway')")
  const id = createBill({
    tableNo: tableNo.value.trim(),
    lines: lines.value,
    discountPercent: Number(discount.value) || 0,
  })
  router.push(`/payment/${id}`)
}

const card = 'p-6 bg-white rounded-xl shadow-md border border-slate-100'
const chip = 'px-3 py-1 rounded-full text-sm border transition'
const field = 'w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500'
</script>

<template>
  <div class="grid gap-6 md:grid-cols-5 items-start">
    <!-- Menu picker -->
    <section :class="[card, 'md:col-span-3']">
      <h2 class="text-xl font-bold text-slate-800 mb-3">Cashier</h2>
      <input v-model="search" placeholder="Search menu..." :class="[field, 'mb-3']" />

      <div class="flex flex-wrap gap-2 mb-4">
        <button
          :class="[chip, cat === 'all' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 hover:bg-slate-50']"
          @click="cat = 'all'"
        >
          All
        </button>
        <button
          v-for="c in state.categories"
          :key="c.id"
          :class="[chip, cat === c.id ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 hover:bg-slate-50']"
          @click="cat = c.id"
        >
          {{ c.name }}
        </button>
      </div>

      <p v-if="menu.length === 0" class="text-sm text-slate-500">No items found.</p>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <button
          v-for="i in menu"
          :key="i.id"
          class="relative text-left p-3 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-slate-50 transition"
          @click="change(i.id, 1)"
        >
          <img v-if="i.imageUrl" :src="i.imageUrl" alt="" class="w-full h-20 object-cover rounded mb-2" />
          <p class="font-semibold text-slate-800 text-sm">{{ i.name }}</p>
          <p class="text-emerald-700 font-bold text-sm">{{ money(i.price) }}</p>
          <span
            v-if="qtyById[i.id]"
            class="absolute top-2 right-2 bg-emerald-600 text-white text-xs min-w-[22px] h-[22px] px-1 rounded-full grid place-items-center"
          >
            {{ qtyById[i.id] }}
          </span>
        </button>
      </div>
    </section>

    <!-- Current order -->
    <section :class="[card, 'md:col-span-2']">
      <h2 class="text-xl font-bold text-slate-800 mb-3">Current order</h2>

      <label class="block text-sm font-medium text-slate-700 mb-3">
        Table
        <input v-model="tableNo" placeholder="e.g. 5 or Takeaway" :class="[field, 'mt-1']" />
      </label>

      <p v-if="lines.length === 0" class="text-sm text-slate-500 py-2">Tap a menu item to add it.</p>
      <ul class="divide-y divide-slate-100">
        <li v-for="l in lines" :key="l.itemId" class="py-2 flex items-center justify-between gap-2">
          <div>
            <p class="text-sm font-medium text-slate-800">{{ l.name }}</p>
            <p class="text-xs text-slate-500">{{ money(l.price) }} each</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="w-7 h-7 rounded border border-slate-200 hover:bg-slate-50" @click="change(l.itemId, -1)">-</button>
            <b class="w-5 text-center text-sm">{{ l.qty }}</b>
            <button class="w-7 h-7 rounded border border-slate-200 hover:bg-slate-50" @click="change(l.itemId, 1)">+</button>
            <span class="w-16 text-right text-sm font-semibold">{{ money(l.price * l.qty) }}</span>
          </div>
        </li>
      </ul>

      <label class="block text-sm font-medium text-slate-700 mt-3">
        Discount %
        <input v-model="discount" type="number" min="0" max="100" :class="[field, 'mt-1']" />
      </label>

      <div class="mt-4 space-y-1 text-sm">
        <div class="flex justify-between"><span>Subtotal</span><span>{{ money(totals.subtotal) }}</span></div>
        <div class="flex justify-between"><span>Discount</span><span>-{{ money(totals.discount) }}</span></div>
        <div class="flex justify-between"><span>Tax ({{ Math.round(TAX_RATE * 100) }}%)</span><span>{{ money(totals.tax) }}</span></div>
        <div class="flex justify-between text-lg font-bold border-t border-dashed border-slate-300 pt-2 mt-2">
          <span>Total</span><span>{{ money(totals.total) }}</span>
        </div>
      </div>

      <p v-if="error" class="text-sm text-red-600 mt-2">{{ error }}</p>
      <button
        class="w-full mt-4 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition"
        @click="submit"
      >
        Create bill &amp; pay
      </button>
    </section>
  </div>
</template>