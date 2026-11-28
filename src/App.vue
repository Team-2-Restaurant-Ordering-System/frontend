<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-800 font-sans">
    <!-- Navigation Bar -->
    <header v-if="route.path !== '/admin'" class="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🍔</span>
          <span class="font-bold text-lg text-slate-900 tracking-tight">Restaurant App</span>
        </div>
        <nav class="flex items-center gap-2">
          <router-link 
            to="/" 
            class="px-3 py-1.5 rounded-lg text-sm font-medium transition text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            active-class="bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200"
          >
            Home
          </router-link>
          <router-link 
            to="/admin" 
            class="px-3 py-1.5 rounded-lg text-sm font-medium transition text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            active-class="bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200"
          >
            Admin
          </router-link>
          <router-link 
            to="/preview" 
            class="px-3 py-1.5 rounded-lg text-sm font-medium transition text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            active-class="bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200"
          >
            Preview
          </router-link>
          
        </nav>
      </div>
    </header>

    <!-- Main Content Area -->
    <main :class="route.path === '/admin' ? 'w-full p-0' : 'max-w-4xl mx-auto px-6 py-8'">
      <router-view />
    </main>
  </div>
</template>
