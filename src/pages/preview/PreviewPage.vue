<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Clock,
  CheckCircle2,
  Utensils,
  Receipt,
  BellRing,
  ArrowLeft,
  CreditCard,
  ChefHat,
  Sparkles,
  PhoneCall
} from '@lucide/vue'

const router = useRouter()

const waiterCalled = ref(false)
const orderPlaced = ref(true)

const orderDetails = ref({
  id: '#ORD-1092',
  table: 'T-04 Main Dining',
  timestamp: 'Today at 1:18 PM',
  status: 'In Kitchen',
  guestCount: 2,
  items: [
    {
      id: 1,
      name: 'Handmade Truffle Tagliatelle',
      notes: 'Extra parmigiano reggiano cheese',
      quantity: 2,
      price: 26.00,
      total: 52.00
    },
    {
      id: 2,
      name: 'Heirloom Burrata & Peach Salad',
      notes: 'Balsamic dressing on the side',
      quantity: 1,
      price: 18.50,
      total: 18.50
    },
    {
      id: 3,
      name: 'Sparkling San Pellegrino (750ml)',
      notes: 'Served with fresh lime slices',
      quantity: 1,
      price: 6.50,
      total: 6.50
    }
  ]
})

const steps = [
  { label: 'Order Sent', time: '1:18 PM', status: 'completed' },
  { label: 'In Kitchen', time: '1:21 PM', status: 'active' },
  { label: 'Plated & Ready', time: '~1:33 PM', status: 'pending' },
  { label: 'Served to Table', time: 'Pending', status: 'pending' }
]

const subtotal = 77.00
const tax = 6.16
const serviceCharge = 7.70
const grandTotal = 90.86

function callWaiter() {
  waiterCalled.value = true
  setTimeout(() => {
    waiterCalled.value = false
  }, 4000)
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
    <!-- Back to Menu Button -->
    <div class="mb-6 flex items-center justify-between">
      <router-link
        to="/"
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition"
      >
        <ArrowLeft :size="14" />
        <span>Back to Menu</span>
      </router-link>

      <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
        Live Kitchen Status
      </span>
    </div>

    <!-- Active Order Tracker Header Card -->
    <div class="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-8">
      <div class="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Order Reference</span>
            <span class="font-bold text-emerald-800">{{ orderDetails.id }}</span>
          </div>
          <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Table {{ orderDetails.table }}
          </h1>
          <p class="mt-1 text-xs text-slate-500">
            Placed {{ orderDetails.timestamp }} · Party of {{ orderDetails.guestCount }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button
            @click="callWaiter"
            type="button"
            class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
          >
            <PhoneCall :size="14" class="text-emerald-700" />
            <span>{{ waiterCalled ? 'Waiter Notified!' : 'Call Waiter' }}</span>
          </button>

          <router-link
            to="/"
            class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-800 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-900"
          >
            <Utensils :size="14" />
            <span>Add More Items</span>
          </router-link>
        </div>
      </div>

      <!-- Stepper Kitchen Progress -->
      <div class="py-8">
        <h2 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
          Preparation Progress
        </h2>

        <div class="relative grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div
            v-for="(step, idx) in steps"
            :key="step.label"
            class="flex flex-col items-start rounded-xl border p-4 transition"
            :class="
              step.status === 'completed'
                ? 'border-emerald-200 bg-emerald-50/50 text-slate-800'
                : step.status === 'active'
                ? 'border-emerald-600 bg-white shadow-xs ring-2 ring-emerald-600/10'
                : 'border-slate-100 bg-slate-50/60 text-slate-400'
            "
          >
            <div class="flex items-center gap-2">
              <span
                class="grid size-6 place-items-center rounded-full text-xs font-bold"
                :class="
                  step.status === 'completed'
                    ? 'bg-emerald-700 text-white'
                    : step.status === 'active'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-slate-200 text-slate-500'
                "
              >
                {{ idx + 1 }}
              </span>
              <span v-if="step.status === 'active'" class="flex size-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>

            <p class="mt-3 text-xs font-bold text-slate-900">{{ step.label }}</p>
            <span class="mt-0.5 text-[11px] text-slate-500">{{ step.time }}</span>
          </div>
        </div>
      </div>

      <!-- Itemized Receipt Breakdown -->
      <div class="border-t border-slate-100 pt-6">
        <div class="flex items-center gap-2 mb-4">
          <Receipt :size="17" class="text-emerald-800" />
          <h2 class="text-sm font-bold text-slate-900">Itemized Order Summary</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                <th class="py-2.5 px-3 rounded-l-lg">Dish Item</th>
                <th class="py-2.5 px-3 text-center">Qty</th>
                <th class="py-2.5 px-3 text-right">Price</th>
                <th class="py-2.5 px-3 text-right rounded-r-lg">Total</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="item in orderDetails.items" :key="item.id">
                <td class="py-3 px-3">
                  <p class="font-semibold text-slate-900">{{ item.name }}</p>
                  <p class="text-[11px] text-slate-400">{{ item.notes }}</p>
                </td>
                <td class="py-3 px-3 text-center font-bold text-slate-700">
                  {{ item.quantity }}x
                </td>
                <td class="py-3 px-3 text-right text-slate-600">
                  ${{ item.price.toFixed(2) }}
                </td>
                <td class="py-3 px-3 text-right font-bold text-slate-900">
                  ${{ item.total.toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Bill Totals Card -->
        <div class="mt-6 rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 text-xs">
          <div class="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span class="font-semibold text-slate-800">${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-slate-600">
            <span>Sales Tax (8%)</span>
            <span class="font-semibold text-slate-800">${{ tax.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-slate-600">
            <span>Gratuity / Service (10%)</span>
            <span class="font-semibold text-slate-800">${{ serviceCharge.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
            <span>Grand Total</span>
            <span class="text-emerald-800">${{ grandTotal.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Pay / Settle Button -->
        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50"
          >
            Split Bill
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-900"
          >
            <CreditCard :size="15" />
            <span>Request Bill & Pay ($90.86)</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
