<script setup>
import { ref } from 'vue'

const sampleMenuItems = ref([
  { id: 1, name: 'Classic Burger', price: '$8.99', status: 'Available' },
  { id: 2, name: 'Margherita Pizza', price: '$12.50', status: 'Available' },
  { id: 3, name: 'Iced Lemon Tea', price: '$3.50', status: 'Popular' }
])
</script>

<template>
  <div class="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4 border border-slate-100">
    <div class="flex items-center gap-3">
      <span class="text-3xl">👀</span>
      <div>
        <h2 class="text-xl font-bold text-slate-800">Preview Page</h2>
        <p class="text-slate-500 text-sm">Testing route transition & sample list</p>
      </div>
    </div>

    <div class="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
      <div 
        v-for="item in sampleMenuItems" 
        :key="item.id" 
        class="p-3 flex justify-between items-center hover:bg-slate-50 transition"
      >
        <div>
          <p class="font-semibold text-slate-800">{{ item.name }}</p>
          <span class="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
            {{ item.status }}
          </span>
        </div>
        <span class="font-bold text-slate-700">{{ item.price }}</span>
      </div>
    </div>
  </div>
</template>
