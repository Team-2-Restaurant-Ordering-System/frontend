<script setup>
import { ref, computed } from 'vue'
import { useMenuBilling, money } from '../../composables/useMenuBilling'

const { state, deleteBill } = useMenuBilling()
const filter = ref('all') // all | unpaid | paid

const shown = computed(() =>
  state.bills.filter((b) => filter.value === 'all' || b.status === filter.value)
)
const paidTotal = computed(() =>
  state.bills.filter((b) => b.status === 'paid').reduce((s, b) => s + b.total, 0)
)
const unpaidCount = computed(() => state.bills.filter((b) => b.status === 'unpaid').length)

function remove(b) {
  if (window.confirm(`Delete bill #${b.billNo}?`)) deleteBill(b.id)
}

const chip = 'px-3 py-1 rounded-full text-sm border transition capitalize'
</script>

<template>
  <section class="p-6 bg-white rounded-xl shadow-md border border-slate-100 space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-slate-800">Billing</h2>
      <router-link
        to="/cashier"
        class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition"
      >
        + New order
      </router-link>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <div class="bg-slate-50 border border-slate-200 rounded-lg p-3">
        <p class="text-xs text-slate-500">Total bills</p>
        <p class="text-xl font-bold">{{ state.bills.length }}</p>
      </div>
      <div class="bg-slate-50 border border-slate-200 rounded-lg p-3">
        <p class="text-xs text-slate-500">Unpaid</p>
        <p class="text-xl font-bold">{{ unpaidCount }}</p>
      </div>
      <div class="bg-slate-50 border border-slate-200 rounded-lg p-3">
        <p class="text-xs text-slate-500">Paid revenue</p>
        <p class="text-xl font-bold">{{ money(paidTotal) }}</p>
      </div>
    </div>

    <div class="flex gap-2">
      <button
        v-for="f in ['all', 'unpaid', 'paid']"
        :key="f"
        :class="[chip, filter === f ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 hover:bg-slate-50']"
        @click="filter = f"
      >
        {{ f }}
      </button>
    </div>

    <div class="overflow-x-auto border border-slate-200 rounded-lg">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-slate-600">
          <tr>
            <th class="text-left p-3">Bill</th>
            <th class="text-left p-3">Table</th>
            <th class="text-left p-3">Time</th>
            <th class="text-left p-3">Total</th>
            <th class="text-left p-3">Status</th>
            <th class="p-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="shown.length === 0">
            <td colspan="6" class="p-3 text-slate-500">No bills.</td>
          </tr>
          <tr v-for="b in shown" :key="b.id" class="hover:bg-slate-50">
            <td class="p-3">#{{ b.billNo }}</td>
            <td class="p-3">{{ b.tableNo }}</td>
            <td class="p-3">{{ new Date(b.createdAt).toLocaleString() }}</td>
            <td class="p-3 font-semibold">{{ money(b.total) }}</td>
            <td class="p-3">
              <span
                class="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                :class="b.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'"
              >
                {{ b.status }}
              </span>
            </td>
            <td class="p-3 text-right whitespace-nowrap">
              <router-link
                v-if="b.status === 'unpaid'"
                :to="`/payment/${b.id}`"
                class="px-3 py-1 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
              >
                Pay
              </router-link>
              <router-link
                v-else
                :to="`/receipt/${b.id}`"
                class="px-3 py-1 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 transition"
              >
                Receipt
              </router-link>
              <button
                v-if="b.status === 'unpaid'"
                class="ml-2 px-3 py-1 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                @click="remove(b)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>