<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuBilling, money, RESTAURANT_NAME, TAX_RATE } from '../../composables/useMenuBilling'

const route = useRoute()
const { getBill } = useMenuBilling()
const bill = computed(() => getBill(route.params.id))

const METHOD_LABEL = { cash: 'Cash', card: 'Card', qr: 'QR / Mobile' }
const printReceipt = () => window.print()
</script>

<template>
  <div class="max-w-md mx-auto space-y-4">
    <section v-if="!bill" class="p-6 bg-white rounded-xl shadow-md border border-slate-100 space-y-3">
      <p>Receipt not found.</p>
      <router-link to="/billing" class="text-emerald-700 font-medium">Go to billing</router-link>
    </section>

    <template v-else>
      <section class="p-6 bg-white rounded-xl shadow-md border border-slate-100 font-mono text-sm print:shadow-none print:border-0">
        <h2 class="text-center text-lg font-bold">{{ RESTAURANT_NAME }}</h2>
        <p class="text-center text-slate-500">Receipt #{{ bill.billNo }}</p>
        <p class="mt-3 text-xs">
          Table: {{ bill.tableNo }}<br />
          Date: {{ new Date(bill.paidAt || bill.createdAt).toLocaleString() }}
        </p>

        <table class="w-full mt-3">
          <thead>
            <tr class="border-b border-slate-300">
              <th class="text-left py-1">Item</th>
              <th class="text-right py-1">Qty</th>
              <th class="text-right py-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in bill.lines" :key="l.itemId">
              <td class="py-1">{{ l.name }}</td>
              <td class="text-right py-1">{{ l.qty }}</td>
              <td class="text-right py-1">{{ money(l.price * l.qty) }}</td>
            </tr>
          </tbody>
        </table>

        <div class="mt-3 space-y-1 border-t border-dashed border-slate-300 pt-2">
          <div class="flex justify-between"><span>Subtotal</span><span>{{ money(bill.subtotal) }}</span></div>
          <div v-if="bill.discount > 0" class="flex justify-between">
            <span>Discount ({{ bill.discountPercent }}%)</span><span>-{{ money(bill.discount) }}</span>
          </div>
          <div class="flex justify-between"><span>Tax ({{ Math.round(TAX_RATE * 100) }}%)</span><span>{{ money(bill.tax) }}</span></div>
          <div class="flex justify-between text-base font-bold border-t border-dashed border-slate-300 pt-2">
            <span>Total</span><span>{{ money(bill.total) }}</span>
          </div>
          <template v-if="bill.status === 'paid'">
            <div class="flex justify-between"><span>Paid by</span><span>{{ METHOD_LABEL[bill.method] }}</span></div>
            <template v-if="bill.method === 'cash'">
              <div class="flex justify-between"><span>Cash received</span><span>{{ money(bill.tendered) }}</span></div>
              <div class="flex justify-between"><span>Change</span><span>{{ money(bill.change) }}</span></div>
            </template>
          </template>
        </div>

        <p class="text-center mt-4">{{ bill.status === 'paid' ? 'Thank you! See you again.' : 'UNPAID' }}</p>
      </section>

      <div class="flex justify-end gap-2 print:hidden">
        <router-link to="/billing" class="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">Back to billing</router-link>
        <button class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition" @click="printReceipt">
          Print receipt
        </button>
        <router-link to="/cashier" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition">
          New order
        </router-link>
      </div>
    </template>
  </div>
</template>