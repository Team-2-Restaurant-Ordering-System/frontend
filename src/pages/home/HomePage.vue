<script setup>
import { ref } from 'vue'

const message = ref('Welcome to Restaurant Ordering System!')
const count = ref(0)
</script>

<template>
  <div class="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4 border border-slate-100">
    <div class="flex items-center gap-3">
      <span class="text-3xl">🍽️</span>
      <div>
        <h2 class="text-xl font-bold text-slate-800">Home Page</h2>
        <p class="text-slate-500 text-sm">Testing simple page & route</p>
      </div>
    </div>

    <p class="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
      {{ message }}
    </p>

    <div class="flex items-center gap-3">
      <button
        @click="count++"
        class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition"
      >
        Click count: {{ count }}
      </button>
      <span class="text-sm text-slate-500">Interactive reactive state test</span>
    </div>
  </div>
</template>
