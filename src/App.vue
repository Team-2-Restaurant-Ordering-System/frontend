<script setup>
import { useRoute } from 'vue-router'
import { UtensilsCrossed, ShieldCheck, ShoppingBag, Receipt, Sparkles } from '@lucide/vue'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-slate-50/70 font-sans text-slate-800 antialiased selection:bg-emerald-600 selection:text-white">
    <!-- Clean Public Navigation Header -->
    <header 
      v-if="!route.path.startsWith('/admin')" 
      class="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs"
    >
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <!-- Brand Logo -->
        <router-link to="/" class="flex items-center gap-2.5 transition hover:opacity-90">
          <div class="grid size-9 place-items-center rounded-xl bg-emerald-800 text-white shadow-xs">
            <UtensilsCrossed :size="19" />
          </div>
          <div>
            <span class="block text-base font-bold tracking-tight text-slate-900 leading-tight">SavoryTable</span>
            <span class="block text-[10px] font-semibold uppercase tracking-widest text-emerald-700">Digital Ordering</span>
          </div>
        </router-link>

        <!-- Current Seating Pill (Desktop) -->
        <div class="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-medium text-slate-700 sm:flex">
          <span class="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Table <strong class="text-slate-900">T-04</strong> · Dine-in</span>
        </div>

        <!-- Navigation Links -->
        <nav class="flex items-center gap-1.5 sm:gap-2">
          <router-link 
            to="/" 
            class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            active-class="!bg-emerald-50 !text-emerald-800 border border-emerald-200"
          >
            <ShoppingBag :size="14" />
            <span>Menu</span>
          </router-link>

          <router-link 
            to="/preview" 
            class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            active-class="!bg-emerald-50 !text-emerald-800 border border-emerald-200"
          >
            <Receipt :size="14" />
            <span>Order Tracker</span>
          </router-link>

          <div class="mx-1 h-5 w-px bg-slate-200"></div>

          <router-link 
            to="/admin" 
            class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800 shadow-xs"
          >
            <ShieldCheck :size="14" />
            <span class="hidden sm:inline">Staff Portal</span>
            <span class="sm:hidden">Staff</span>
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Main Container -->
    <main :class="route.path.startsWith('/admin') ? 'w-full p-0' : 'w-full'">
      <router-view />
    </main>
  </div>
</template>
