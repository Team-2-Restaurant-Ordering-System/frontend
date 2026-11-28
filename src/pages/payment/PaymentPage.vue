<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuBilling, money } from '../../composables/useMenuBilling'

const route = useRoute()
const router = useRouter()
const { getBill, payBill } = useMenuBilling()

const bill = computed(() => getBill(route.params.id))
const method = ref('cash')
const tendered = ref('')

const METHODS = [
  { id: 'cash', label: 'Cash' },
  { id: 'card', label: 'Card' },
  { id: 'qr', label: 'QR / Mobile' },
]

const given = computed(() => Number(tendered.value) || 0)
const diff = computed(() => given.value - (bill.value?.total || 0))
const canPay = computed(() => method.value !== 'cash' || given.value >= (bill.value?.total || 0))

// Quick cash buttons: exact amount and the next round numbers above it
const quick = computed(() => {
  const t = bill.value?.total || 0
  return [t, ...[5, 10, 20, 50, 100].filter((n) => n > t)].slice(0, 4)
})

function confirm() {
  if (!canPay.value) return
  payBill(bill.value.id, { method: method.value, tendered: given.value })
  router.push(`/receipt/${bill.value.id}`)
}

const chip = 'px-3 py-1 rounded-full text-sm border transition'
</script>

<template>
  <div class="max-w-md mx-auto">
    <section v-if="!bill" class="p-6 bg-white rounded-xl shadow-md border border-slate-100 space-y-3">
      <p>Bill not found.</p>
      <router-link to="/billing" class="text-emerald-700 font-medium">Go to billing</router-link>
    </section>

    <section v-else-if="bill.status === 'paid'" class="p-6 bg-white rounded-xl shadow-md border border-slate-100 space-y-3">
      <p>Bill #{{ bill.billNo }} is already paid.</p>
      <router-link :to="`/receipt/${bill.id}`" class="text-emerald-700 font-medium">View receipt</router-link>
    </section>

    <section v-else class="p-6 bg-white rounded-xl shadow-md border border-slate-100 space-y-4">
      <div>
        <h2 class="text-xl font-bold text-slate-800">Payment - Bill #{{ bill.billNo }}</h2>
        <p class="text-sm text-slate-500">Table {{ bill.tableNo }}</p>
      </div>

      <div class="space-y-1 text-sm">
        <div class="flex justify-between"><span>Subtotal</span><span>{{ money(bill.subtotal) }}</span></div>
        <div class="flex justify-between"><span>Discount</span><span>-{{ money(bill.discount) }}</span></div>
        <div class="flex justify-between"><span>Tax</span><span>{{ money(bill.tax) }}</span></div>
        <div class="flex justify-between text-lg font-bold border-t border-dashed border-slate-300 pt-2 mt-2">
          <span>Amount due</span><span>{{ money(bill.total) }}</span>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Payment method</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="m in METHODS"
            :key="m.id"
            :class="[chip, method === m.id ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 hover:bg-slate-50']"
            @click="method = m.id"
          >
            {{ m.label }}
          </button>
        </div>
      </div>

      <div v-if="method === 'cash'" class="space-y-2">
        <label class="block text-sm font-medium text-slate-700">
          Cash received
          <input
            v-model="tendered"
            type="number"
            min="0"
            step="0.01"
            class="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="n in quick"
            :key="n"
            :class="[chip, 'border-slate-200 hover:bg-slate-50']"
            @click="tendered = String(Number(n.toFixed(2)))"
          >
            {{ money(n) }}
          </button>
        </div>
        <p class="text-sm" :class="tendered !== '' && diff < 0 ? 'text-red-600' : 'text-emerald-700'">
          <template v-if="tendered === ''">Enter the amount received.</template>
          <template v-else-if="diff >= 0">Change to return: {{ money(diff) }}</template>
          <template v-else>Still missing: {{ money(-diff) }}</template>
        </p>
      </div>
      <p v-else-if="method === 'card'" class="text-sm text-slate-500">Process the card on the terminal, then confirm.</p>
      <p v-else class="text-sm text-slate-500">Ask the customer to scan the QR code, check the payment, then confirm.</p>

      <div class="flex justify-end gap-2">
        <router-link to="/billing" class="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">Back</router-link>
        <button
          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!canPay"
          @click="confirm"
        >
          Confirm payment
        </button>
      </div>
    </section>
  </div>
</template>