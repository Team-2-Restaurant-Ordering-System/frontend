<script setup>
const links = [
  { to: '/', label: 'Home' },
  { to: '/preview', label: 'Preview' },
  { to: '/menu', label: 'Menu' },
  { to: '/cashier', label: 'Cashier' },
  { to: '/billing', label: 'Billing' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-800 font-sans">
    <!-- Navigation Bar -->
    <header class="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10 print:hidden">
      <div class="max-w-4xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🍔</span>
          <span class="font-bold text-lg text-slate-900 tracking-tight">Restaurant App</span>
        </div>
        <nav class="flex flex-wrap items-center gap-2">
          <router-link
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            class="px-3 py-1.5 rounded-lg text-sm font-medium transition text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            active-class="bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200"
          >
            {{ l.label }}
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="max-w-4xl mx-auto px-6 py-8">
      <router-view />
    </main>
  </div>
</template>