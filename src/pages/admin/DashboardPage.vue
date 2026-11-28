<script setup>
import { computed, ref } from "vue";
import {
  Armchair,
  BadgeDollarSign,
  Bell,
  CalendarDays,
  ChartNoAxesCombined,
  ChefHat,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CookingPot,
  Download,
  FileText,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  ReceiptText,
  Search,
  ShieldCheck,
  TriangleAlert,
  UtensilsCrossed,
  Users,
  WalletCards,
  X,
  ExternalLink
} from "@lucide/vue";

const sidebarOpen = ref(false);
const search = ref("");
const orderFilter = ref("All orders");

const operationLinks = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Restaurant Tables", icon: CookingPot },
  { label: "Dining Sessions", icon: Armchair },
  { label: "Orders", icon: ReceiptText },
  { label: "Kitchen & Bar", icon: UtensilsCrossed },
  { label: "Billing & Cashier", icon: WalletCards },
];

const managementLinks = [
  { label: "Menu Management", icon: ChefHat },
  { label: "Staff Management", icon: Users },
  { label: "Roles & Permissions", icon: ShieldCheck },
  { label: "Reports", icon: ChartNoAxesCombined },
  { label: "Audit Logs", icon: FileText },
];

const diningZones = [
  {
    name: "Main Dining Room",
    details: "12 / 14 tables",
    occupancy: 92,
    staff: "4 Captains",
    turnover: "Turnover 52m",
    color: "#166534",
  },
  {
    name: "Patio & Veranda",
    details: "4 / 6 tables",
    occupancy: 66,
    staff: "2 Captains",
    turnover: "Turnover 41m",
    color: "#ea580c",
  },
  {
    name: "Bar & High-Tops",
    details: "2 tables free",
    occupancy: 50,
    staff: "2 Mixologists",
    turnover: "Turnover 32m",
    color: "#ca8a04",
  },
];

const orders = [
  {
    id: "#ORD-1094",
    table: "T-02 Main",
    party: "4 guests",
    items: "Pan-Seared Halibut x2, Ribeye Steak x1",
    elapsed: "18m",
    minutes: 18,
    status: "Ready",
    total: "$142.00",
  },
  {
    id: "#ORD-1092",
    table: "T-04 Main",
    party: "2 guests",
    items: "Truffle Tagliatelle x2, Burrata Salad",
    elapsed: "12m",
    minutes: 12,
    status: "In Kitchen",
    total: "$68.00",
  },
  {
    id: "#ORD-1095",
    table: "P-01 Patio",
    party: "3 guests",
    items: "Wagyu Burger x2, Sweet Potato Fries",
    elapsed: "3m",
    minutes: 3,
    status: "Pending",
    total: "$84.50",
  },
  {
    id: "#ORD-1090",
    table: "BAR-03 Lounge",
    party: "2 guests",
    items: "Smoked Old Fashioned x2, Charcuterie",
    elapsed: "9m",
    minutes: 9,
    status: "In Kitchen",
    total: "$54.00",
  },
  {
    id: "#ORD-1088",
    table: "T-08 Main",
    party: "6 guests",
    items: "Chef Tasting Course x6",
    elapsed: "54m",
    minutes: 54,
    status: "Settled",
    total: "$590.00",
  },
];

const visibleOrders = computed(() => {
  const query = search.value.trim().toLowerCase();

  return orders.filter((order) => {
    const matchesQuery =
      !query ||
      [order.id, order.table, order.party, order.items, order.status].some(
        (value) => value.toLowerCase().includes(query),
      );
    const matchesFilter =
      orderFilter.value === "All orders" ||
      (orderFilter.value === "Active" && order.status !== "Settled") ||
      (orderFilter.value === "Delayed" &&
        order.minutes >= 15 &&
        order.status !== "Settled");

    return matchesQuery && matchesFilter;
  });
});

function statusClass(status) {
  return {
    Ready: "bg-rose-50 text-rose-700 border border-rose-200/60",
    "In Kitchen": "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    Pending: "bg-amber-50 text-amber-700 border border-amber-200/60",
    Settled: "bg-slate-100 text-slate-600 border border-slate-200/60",
  }[status];
}

function statusDotClass(status) {
  return {
    Ready: "bg-rose-500",
    "In Kitchen": "bg-emerald-500",
    Pending: "bg-amber-500",
    Settled: "bg-slate-400",
  }[status];
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
    <!-- Top Header Bar -->
    <header class="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      <div class="flex items-center gap-3">
        <button
          class="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 lg:hidden"
          type="button"
          :aria-label="sidebarOpen ? 'Close navigation' : 'Open navigation'"
          @click="sidebarOpen = !sidebarOpen"
        >
          <X v-if="sidebarOpen" :size="18" />
          <Menu v-else :size="18" />
        </button>

        <div class="flex items-center gap-2.5">
          <div class="grid size-9 place-items-center rounded-xl bg-emerald-800 text-white shadow-sm">
            <UtensilsCrossed :size="18" />
          </div>
          <div class="leading-tight">
            <span class="block text-base font-bold tracking-tight text-slate-900">RestaurantOS</span>
            <span class="block text-[11px] font-medium uppercase tracking-wider text-slate-500">Admin Operations</span>
          </div>
        </div>

        <span class="ml-2 hidden rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 lg:inline-block">
          v2.4 Live
        </span>
      </div>

      <div class="flex items-center gap-3 lg:gap-5">
        <!-- Live Service Status Pill -->
        <div class="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/70 px-3 py-1 text-xs font-medium text-emerald-800 md:flex">
          <span class="relative flex size-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex size-2 rounded-full bg-emerald-600"></span>
          </span>
          Lunch Service Active
        </div>

        <!-- Back to Customer View Link -->
        <router-link
          to="/"
          class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <span>Customer View</span>
          <ExternalLink :size="13" />
        </router-link>

        <!-- Notifications -->
        <button
          class="relative grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
          type="button"
          aria-label="Notifications"
        >
          <Bell :size="18" />
          <span class="absolute right-2 top-2 size-2 rounded-full bg-rose-500"></span>
        </button>

        <div class="h-6 w-px bg-slate-200"></div>

        <!-- User Profile Pill -->
        <div class="flex items-center gap-2.5">
          <div class="grid size-8 place-items-center rounded-full bg-gradient-to-tr from-emerald-700 to-teal-500 text-xs font-bold text-white shadow-sm">
            MV
          </div>
          <div class="hidden text-left sm:block">
            <p class="text-xs font-bold text-slate-800">Marcus Vance</p>
            <p class="text-[11px] text-slate-500">Head Floor Manager</p>
          </div>
          <ChevronDown :size="14" class="hidden text-slate-400 sm:block" />
        </div>
      </div>
    </header>

    <!-- Mobile Backdrop -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar Navigation -->
    <aside
      class="fixed bottom-0 left-0 top-16 z-40 w-64 border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex h-full flex-col justify-between overflow-y-auto p-4">
        <nav class="space-y-6" aria-label="Admin Navigation">
          <!-- Operations Group -->
          <div>
            <p class="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Operations
            </p>
            <div class="space-y-1">
              <button
                v-for="item in operationLinks"
                :key="item.label"
                type="button"
                class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition"
                :class="
                  item.active
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                "
              >
                <component :is="item.icon" :size="18" />
                <span>{{ item.label }}</span>
              </button>
            </div>
          </div>

          <!-- Management Group -->
          <div>
            <p class="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Management
            </p>
            <div class="space-y-1">
              <button
                v-for="item in managementLinks"
                :key="item.label"
                type="button"
                class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <component :is="item.icon" :size="18" />
                <span class="flex-1 text-left">{{ item.label }}</span>
                <ChevronDown v-if="item.label === 'Menu Management'" :size="14" class="text-slate-400" />
              </button>
            </div>
          </div>
        </nav>

        <!-- Sidebar Footer Status -->
        <div class="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs">
          <div class="flex items-center justify-between text-slate-500">
            <span>POS Sync</span>
            <span class="inline-flex items-center gap-1 font-semibold text-emerald-700">
              <span class="size-1.5 rounded-full bg-emerald-500"></span> Connected
            </span>
          </div>
          <p class="mt-1 text-[11px] text-slate-400">8/8 Terminals Online</p>
        </div>
      </div>
    </aside>

    <!-- Main Content Body -->
    <main class="min-h-screen pt-16 lg:pl-64">
      <div class="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <!-- Page Title & Actions Header -->
        <section class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <span>Shift 2</span>
              <span>·</span>
              <span class="text-emerald-700 font-semibold">Lunch Service</span>
            </div>
            <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Operations Overview
            </h1>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <CalendarDays :size="14" class="text-slate-500" />
              Today, Oct 24
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <Download :size="14" class="text-slate-500" />
              Export
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-900"
            >
              <Plus :size="15" />
              New Order
            </button>
          </div>
        </section>

        <!-- KPI Statistic Cards -->
        <section class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Shift Statistics">
          <div class="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>Total Orders</span>
              <div class="grid size-8 place-items-center rounded-lg bg-slate-50 text-slate-600">
                <ReceiptText :size="16" />
              </div>
            </div>
            <div class="mt-2 text-3xl font-bold tracking-tight text-slate-900">148</div>
            <div class="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span class="font-semibold text-emerald-600">+12% vs yesterday</span>
              <span>4.2m avg pace</span>
            </div>
          </div>

          <div class="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>Active Tables</span>
              <div class="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                <Armchair :size="16" />
              </div>
            </div>
            <div class="mt-2 flex items-baseline gap-1 text-3xl font-bold tracking-tight text-slate-900">
              18<span class="text-base font-medium text-slate-400">/24</span>
            </div>
            <div class="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>85% Occupancy</span>
              <span class="font-semibold text-slate-700">64 Covers</span>
            </div>
          </div>

          <div class="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>Available Tables</span>
              <div class="grid size-8 place-items-center rounded-lg bg-amber-50 text-amber-700">
                <UtensilsCrossed :size="16" />
              </div>
            </div>
            <div class="mt-2 text-3xl font-bold tracking-tight text-slate-900">6</div>
            <div class="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Open bays</span>
              <span class="font-semibold text-amber-700">2 Reserved</span>
            </div>
          </div>

          <div class="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>Shift Revenue</span>
              <div class="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                <BadgeDollarSign :size="16" />
              </div>
            </div>
            <div class="mt-2 text-3xl font-bold tracking-tight text-slate-900">$4,820</div>
            <div class="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Avg ticket $32.50</span>
              <span class="font-semibold text-emerald-600">+8.4% target</span>
            </div>
          </div>
        </section>

        <!-- Floor Occupancy & Order Pipeline -->
        <section class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <!-- Dining Zones -->
          <div class="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm lg:col-span-7">
            <div class="mb-4 flex items-center justify-between">
              <div>
                <h2 class="text-base font-bold text-slate-900">Dining Zones Occupancy</h2>
                <p class="text-xs text-slate-500">Real-time floor seating distribution</p>
              </div>
              <span class="text-xs text-slate-500">
                Avg Service: <strong class="text-slate-800">48m</strong>
              </span>
            </div>

            <div class="space-y-4">
              <div v-for="zone in diningZones" :key="zone.name" class="space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <div class="font-semibold text-slate-800">
                    {{ zone.name }}
                    <span class="ml-2 font-normal text-slate-400">{{ zone.details }}</span>
                  </div>
                  <span class="font-bold text-slate-700">{{ zone.occupancy }}%</span>
                </div>
                <div class="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    class="h-full rounded-full transition-all duration-500"
                    :style="{
                      width: `${zone.occupancy}%`,
                      backgroundColor: zone.color,
                    }"
                  ></div>
                </div>
                <div class="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{{ zone.staff }}</span>
                  <span>{{ zone.turnover }}</span>
                </div>
              </div>
            </div>

            <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
              <span class="inline-flex items-center gap-1.5">
                <span class="size-2 rounded-full bg-emerald-500"></span>
                Floor flow is optimal
              </span>
              <button class="font-semibold text-emerald-700 hover:text-emerald-800" type="button">
                Open Graphic Table Layout &rarr;
              </button>
            </div>
          </div>

          <!-- Order Pipeline -->
          <div class="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm lg:col-span-5">
            <div class="mb-4 flex items-center justify-between">
              <div>
                <h2 class="text-base font-bold text-slate-900">Kitchen & Bar Pipeline</h2>
                <p class="text-xs text-slate-500">Station progress overview</p>
              </div>
              <span class="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                15 Active
              </span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                <span class="text-[11px] font-medium text-slate-500">Pending POS</span>
                <p class="mt-1 text-2xl font-bold text-slate-900">03</p>
                <span class="text-[10px] text-slate-400">Awaiting kitchen accept</span>
              </div>
              <div class="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                <span class="text-[11px] font-medium text-slate-500">In Kitchen</span>
                <p class="mt-1 text-2xl font-bold text-slate-900">08</p>
                <span class="text-[10px] text-slate-400">Line & grill stations</span>
              </div>
              <div class="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                <span class="text-[11px] font-medium text-slate-500">Ready to Pass</span>
                <p class="mt-1 text-2xl font-bold text-rose-600">04</p>
                <span class="text-[10px] text-slate-400">Runner alert active</span>
              </div>
              <div class="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                <span class="text-[11px] font-medium text-slate-500">Completed Today</span>
                <p class="mt-1 text-2xl font-bold text-slate-900">133</p>
                <span class="text-[10px] text-slate-400">Served & cleared</span>
              </div>
            </div>

            <div class="mt-4 flex items-center gap-2.5 rounded-lg border border-amber-200/80 bg-amber-50/60 p-3 text-xs text-amber-900">
              <TriangleAlert class="size-4 shrink-0 text-amber-600" />
              <span>
                Order <strong class="font-semibold text-amber-950">#ORD-1089</strong> running +4m on Garde Manger.
              </span>
            </div>
          </div>
        </section>

        <!-- Orders Table Card -->
        <section class="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <!-- Table Controls Header -->
          <div class="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <h2 class="text-base font-bold text-slate-900">Active Floor Orders</h2>
              <p class="text-xs text-slate-500">Real-time table orders and prep countdown</p>
            </div>

            <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div class="relative w-full sm:w-60">
                <Search :size="15" class="absolute left-3 top-2.5 text-slate-400" />
                <input
                  v-model="search"
                  type="search"
                  placeholder="Search orders, tables, items..."
                  class="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 transition focus:border-emerald-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div class="flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium text-slate-600">
                <button
                  v-for="filter in ['All orders', 'Active', 'Delayed']"
                  :key="filter"
                  type="button"
                  class="rounded-md px-3 py-1 transition"
                  :class="
                    orderFilter === filter
                      ? 'bg-white font-semibold text-slate-900 shadow-sm'
                      : 'hover:text-slate-900'
                  "
                  @click="orderFilter = filter"
                >
                  {{ filter }}
                </button>
              </div>
            </div>
          </div>

          <!-- Responsive Table -->
          <div class="w-full overflow-x-auto">
            <table class="w-full min-w-[760px] text-left text-xs">
              <thead class="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th class="py-3 pl-5 pr-3">Order ID</th>
                  <th class="px-3 py-3">Table</th>
                  <th class="px-3 py-3">Party</th>
                  <th class="px-3 py-3">Ordered Items</th>
                  <th class="px-3 py-3">Elapsed</th>
                  <th class="px-3 py-3">Status</th>
                  <th class="px-3 py-3 text-right">Total</th>
                  <th class="py-3 pl-3 pr-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr
                  v-for="order in visibleOrders"
                  :key="order.id"
                  class="transition hover:bg-slate-50/80"
                >
                  <td class="whitespace-nowrap py-3.5 pl-5 pr-3 font-semibold text-emerald-800">
                    {{ order.id }}
                  </td>
                  <td class="whitespace-nowrap px-3 font-medium text-slate-800">
                    {{ order.table }}
                  </td>
                  <td class="whitespace-nowrap px-3 text-slate-500">
                    {{ order.party }}
                  </td>
                  <td class="max-w-[280px] truncate px-3 text-slate-700" :title="order.items">
                    {{ order.items }}
                  </td>
                  <td class="whitespace-nowrap px-3 font-medium">
                    <span
                      class="inline-flex items-center gap-1"
                      :class="order.minutes >= 15 ? 'font-bold text-rose-600' : 'text-slate-600'"
                    >
                      <Clock3 v-if="order.minutes >= 15" :size="13" />
                      {{ order.elapsed }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3">
                    <span
                      class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                      :class="statusClass(order.status)"
                    >
                      <span class="size-1.5 rounded-full" :class="statusDotClass(order.status)"></span>
                      {{ order.status }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 text-right font-bold text-slate-900">
                    {{ order.total }}
                  </td>
                  <td class="whitespace-nowrap py-3.5 pl-3 pr-5 text-right">
                    <button
                      class="inline-grid size-7 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      type="button"
                      :aria-label="`More options for ${order.id}`"
                    >
                      <MoreHorizontal :size="16" />
                    </button>
                  </td>
                </tr>

                <tr v-if="visibleOrders.length === 0">
                  <td colspan="8" class="py-12 text-center text-slate-400">
                    <UtensilsCrossed :size="24" class="mx-auto mb-2 text-slate-300" />
                    No orders match your filter.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Table Footer Pagination -->
          <div class="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
            <span>Showing {{ visibleOrders.length }} orders</span>
            <div class="flex items-center gap-1">
              <button class="grid size-7 place-items-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50">
                <ChevronLeft :size="14" />
              </button>
              <button class="grid size-7 place-items-center rounded-md bg-emerald-800 font-bold text-white">
                1
              </button>
              <button class="grid size-7 place-items-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50">
                <ChevronRight :size="14" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
