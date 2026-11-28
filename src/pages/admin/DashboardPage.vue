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
    color: "#176247",
  },
  {
    name: "Patio & Veranda",
    details: "4 / 6 tables",
    occupancy: 66,
    staff: "2 Captains",
    turnover: "Turnover 41m",
    color: "#f16c50",
  },
  {
    name: "Bar & High-Tops",
    details: "2 tables free",
    occupancy: 50,
    staff: "2 Mixologists",
    turnover: "Turnover 32m",
    color: "#d89a2b",
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
    Ready: "bg-[#fff0ed] text-[#a74437]",
    "In Kitchen": "bg-[#eaf5ee] text-[#276344]",
    Pending: "bg-[#fff3df] text-[#986016]",
    Settled: "bg-[#f0f2f1] text-[#68746d]",
  }[status];
}

function statusDotClass(status) {
  return {
    Ready: "bg-[#d95545]",
    "In Kitchen": "bg-[#38865b]",
    Pending: "bg-[#df9b32]",
    Settled: "bg-[#8b9690]",
  }[status];
}
</script>

<template>
  <div class="min-h-screen bg-[#f4f7f5] font-sans text-[#192a22]">
    <header
      class="fixed inset-x-0 top-0 z-40 flex h-[80px] border-b border-[#e5eae7] bg-white"
    >
      <div
        class="flex basis-[236px] shrink-0 items-center gap-[10px] border-r border-[#edf0ee] px-[22px] max-[1180px]:basis-[220px] max-[860px]:basis-[158px] max-[860px]:gap-[7px] max-[860px]:px-[10px] max-[680px]:basis-auto max-[680px]:border-r-0 max-[680px]:px-3 max-[560px]:gap-[7px]"
      >
        <button
          class="hidden size-[34px] items-center justify-center rounded-[7px] border-0 bg-transparent text-[#526158] hover:bg-[#f2f5f3] max-[680px]:inline-flex"
          type="button"
          :aria-label="sidebarOpen ? 'Close navigation' : 'Open navigation'"
          @click="sidebarOpen = !sidebarOpen"
        >
          <X v-if="sidebarOpen" :size="19" />
          <Menu v-else :size="19" />
        </button>
        <div
          class="grid size-[60px] shrink-0 place-items-center rounded-full bg-[#102f23] text-[15px] font-bold text-white max-[860px]:size-[30px]"
        >
        </div>
        <div class="flex flex-col gap-0.5 whitespace-nowrap max-[560px]:hidden">
          <strong class="text-2xl tracking-[-0.02em] max-[860px]:text-[10px]"
            >RestaurantOS</strong
          >
          <span class="text-[20px] text-[#68756e]">Admin</span>
        </div>
        <span
          class="rounded bg-[#e8f4ec] px-[6px] py-1 text-[15px] font-bold text-[#174b36] max-[860px]:hidden"
          >V2.4</span
        >
      </div>

      <div
        class="flex min-w-0 flex-1 items-center justify-between px-7 max-[680px]:px-[14px]"
      >
        <div
          class="flex items-center gap-[10px] text-[23px] text-[#647169] max-[680px]:hidden"
        >
          <span>Operations</span>
          <span class="text-[#a3ada7]">›</span>
          <strong class="font-semibold text-[#192a22]">Overview</strong>
        </div>
        <div
          class="flex items-center gap-[15px] max-[860px]:gap-2 max-[680px]:ml-auto max-[680px]:gap-[9px]"
        >
          <span
            class="flex items-center gap-[7px] whitespace-nowrap text-lg font-medium text-[#415249] max-[860px]:hidden"
            ><i class="inline-block size-[7px] rounded-full bg-[#2d7753]"></i>
            Lunch Service Active</span
          >
          <button
            class="relative inline-flex size-[40px] items-center justify-center rounded-[7px] border-0 bg-transparent text-[#526158] hover:bg-[#f2f5f3]"
            type="button"
            aria-label="Notifications"
          >
            <Bell :size="25" />
            <i
              class="absolute right-[6px] top-[5px] size-[6px] rounded-full bg-[#d34b3c]"
            ></i>
          </button>
          <div
            class="grid size-[34px] place-items-center rounded-full border-2 border-white bg-[linear-gradient(145deg,#f3d9a8,#bb8852)] text-[10px] font-bold text-[#3e3022] shadow-[0_0_0_1px_#e6e9e7]"
          >
            MV
          </div>
          <button
            class="inline-flex items-center gap-[5px] whitespace-nowrap border-0 bg-transparent py-[5px] text-lg font-semibold text-[#34443b] max-[560px]:hidden"
            type="button"
          >
            Marcus V. <ChevronDown :size="14" />
          </button>
        </div>
      </div>
    </header>

    <button
      v-if="sidebarOpen"
      type="button"
      class="fixed inset-x-0 bottom-0 top-[72px] z-[45] block border-0 bg-[rgb(16_35_25_/_28%)] min-[681px]:hidden"
      aria-label="Close navigation"
      @click="sidebarOpen = false"
    ></button>

    <aside
      class="fixed bottom-0 left-0 top-[72px] z-[30] w-[260px] overflow-y-auto border-r border-[#e5eae7] bg-white px-3 py-[19px] max-[1180px]:w-[220px] max-[860px]:w-[158px] max-[860px]:px-2 max-[680px]:z-[50] max-[680px]:w-[252px] max-[680px]:-translate-x-full max-[680px]:transition-transform max-[680px]:duration-[180ms] max-[680px]:shadow-[12px_0_30px_rgb(15_35_25_/_10%)]"
      :class="{ 'max-[680px]:translate-x-0': sidebarOpen }"
    >
      <nav aria-label="Admin navigation" class="max-[680px]:relative">
        <div>
          <p
            class="mx-[9px] mb-2 text-[20px] font-bold uppercase tracking-[0.075em] text-[#79847e]"
          >
            Operations
          </p>
          <button
            v-for="item in operationLinks"
            :key="item.label"
            class="my-0.5 flex min-h-[40px] w-full items-center gap-[10px] rounded-md border-0 bg-transparent px-[10px] text-left text-[20px] text-[#536159] transition-[background-color,color] duration-[120ms] hover:bg-[#f3f6f4] hover:text-[#102f23] max-[860px]:gap-[7px] max-[860px]:px-[7px] max-[860px]:text-[11px]"
            :class="
              item.active
                ? 'bg-[#102f23] font-semibold hover:bg-[#102f23] '
                : ''
            "
            type="button"
          >
            <component :is="item.icon" :size="25" :stroke-width="1.8" />
            <span class="flex-1">{{ item.label }}</span>
          </button>
        </div>

        <div class="mt-[21px]">
          <p
            class="mx-[9px] mb-2 text-[20px] font-bold uppercase tracking-[0.075em] text-[#79847e]"
          >
            Management
          </p>
          <button
            v-for="item in managementLinks"
            :key="item.label"
            class="my-0.5 flex min-h-[40px] w-full items-center gap-[10px] rounded-md border-0 bg-transparent px-[10px] text-left text-[20px] text-[#536159] transition-[background-color,color] duration-[120ms] hover:bg-[#f3f6f4] hover:text-[#102f23] max-[860px]:gap-[7px] max-[860px]:px-[7px] max-[860px]:text-[11px]"
            type="button"
          >
            <component :is="item.icon" :size="25" :stroke-width="2" />
            <span class="flex-1">{{ item.label }}</span>
            <ChevronDown
              v-if="item.label === 'Menu Management'"
              class="ml-auto"
              :size="13"
            />
          </button>
        </div>

        <div class="mt-[21px]">
          <p
            class="mx-[9px] mb-2 text-[20px] font-bold uppercase tracking-[0.075em] text-[#79847e]"
          >
            Account
          </p>
          <button
            class="my-0.5 flex min-h-[40px] w-full items-center gap-[10px] rounded-md border-0 bg-transparent px-[10px] text-left text-[20px] text-[#536159] transition-[background-color,color] duration-[120ms] hover:bg-[#f3f6f4] hover:text-[#102f23] max-[860px]:gap-[7px] max-[860px]:px-[7px] max-[860px]:text-[11px]"
            type="button"
          >
            <Bell :size="20" :stroke-width="1.8" />
            <span class="flex-1">Notifications</span>
            <span
              class="grid size-5 min-w-5 place-items-center rounded-full bg-[#fae3de] text-[10px] font-bold text-[#b94535]"
              >3</span
            >
          </button>
          <button
            class="my-0.5 flex min-h-[40px] w-full items-center gap-[10px] rounded-md border-0 bg-transparent px-[10px] text-left text-[20px] text-[#536159] transition-[background-color,color] duration-[120ms] hover:bg-[#f3f6f4] hover:text-[#102f23] max-[860px]:gap-[7px] max-[860px]:px-[7px] max-[860px]:text-[11px]"
            type="button"
          >
            <WalletCards :size="20" :stroke-width="1.8" />
            <span class="flex-1">Pass Terminals (8/8)</span>
            <span
              class="ml-auto inline-block size-[7px] rounded-full bg-[#2d7753]"
            ></span>
          </button>
        </div>
      </nav>
    </aside>

    <div
      class="ml-[236px] min-h-screen pt-[72px] max-[1180px]:ml-[220px] max-[860px]:ml-[158px] max-[680px]:ml-0"
    >
      <div
        class="mx-auto w-full max-w-[1540px] px-[30px] pb-8 pt-[27px] max-[1180px]:px-[22px] max-[860px]:px-4 max-[560px]:px-[14px] max-[560px]:pb-7 max-[560px]:pt-[22px]"
      >
        <section
          class="mb-[21px] flex items-end justify-between gap-[18px] max-[560px]:mb-4 max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-[14px]"
        >
          <div>
            <p
              class="mb-[7px] text-ms font-bold uppercase tracking-[0.09em] text-[#69766e]"
            >
              Shift 2 <span class="px-0.5">·</span> Lunch
            </p>
            <h1
              class="m-0 text-[clamp(30px,2.5vw,38px)] font-bold leading-[1.15] tracking-[-0.045em] text-[#122a1e]"
            >
              Operations Overview
            </h1>
          </div>
          <div class="flex flex-wrap gap-2 max-[560px]:w-full">
            <button
              type="button"
              class="inline-flex min-h-[40px] items-center justify-center gap-[8px] rounded-md border border-[#dfe5e1] bg-white px-3 text-ms font-semibold text-[#3d4b43] transition-[background-color,border-color] duration-[120ms] hover:border-[#bbc9c0] hover:bg-[#fbfcfb] max-[560px]:flex-1 max-[560px]:px-2 max-[560px]:text-[11px]"
            >
              <CalendarDays :size="14" />Today, Oct 24
            </button>
            <button
              type="button"
              class="inline-flex min-h-[40px] items-center justify-center gap-[8px] rounded-md border border-[#dfe5e1] bg-white px-3 text-ms font-semibold text-[#3d4b43] transition-[background-color,border-color] duration-[120ms] hover:border-[#bbc9c0] hover:bg-[#fbfcfb] max-[560px]:flex-1 max-[560px]:px-2 max-[560px]:text-[11px]"
            >
              <Download :size="14" />Export
            </button>
            <button
              type="button"
              class="inline-flex min-h-[40px] items-center justify-center gap-[8px] rounded-md border border-transparent bg-[#102f23] px-3 text-ms font-semibold text-white transition-colors duration-[120ms] hover:bg-[#1b513a] max-[560px]:flex-1 max-[560px]:px-2 max-[560px]:text-[11px]"
            >
              <Plus :size="15" />New Order
            </button>
          </div>
        </section>

        <section
          class="grid grid-cols-4 gap-3 max-[860px]:gap-2 max-[680px]:grid-cols-2"
          aria-label="Shift statistics"
        >
          <article
            class="min-h-[128px] rounded-[10px] border border-[#e3e9e5] bg-white p-[18px] shadow-[0_2px_5px_rgb(23_43_32_/_3%)] max-[860px]:min-h-[120px] max-[860px]:p-[15px] max-[560px]:p-4"
          >
            <div
              class="flex items-center justify-between text-ms font-bold uppercase tracking-[0.055em] text-[#66736b]"
            >
              <span>Total Orders</span
              ><ReceiptText class="text-[#68766e]" :size="17" />
            </div>
            <div
              class="mt-3 flex items-baseline gap-1 text-[32px] font-bold leading-none tracking-[-0.045em] text-[#102d20] max-[860px]:text-[28px]"
            >
              148
            </div>
            <div
              class="mt-3 flex items-center gap-[5px] text-[15px] text-[#758078] max-[860px]:text-[15px] max-[560px]:text-[15px]"
            >
              <span class="font-bold text-[#1d7a4e]">+12%</span> vs yesterday
              <span class="ml-auto">4.2m avg pace</span>
            </div>
          </article>
          <article
            class="min-h-[128px] rounded-[10px] border border-[#e3e9e5] bg-white p-[18px] shadow-[0_2px_5px_rgb(23_43_32_/_3%)] max-[860px]:min-h-[120px] max-[860px]:p-[15px] max-[560px]:p-4"
          >
            <div
              class="flex items-center justify-between text-ms font-bold uppercase tracking-[0.055em] text-[#66736b]"
            >
              <span>Active Tables</span
              ><Armchair class="text-[#68766e]" :size="17" />
            </div>
            <div
              class="mt-3 flex items-baseline gap-1 text-[32px] font-bold leading-none tracking-[-0.045em] text-[#102d20] max-[860px]:text-[28px]"
            >
              18<small
                class="text-sm font-medium tracking-normal text-[#79867e]"
                >/24</small
              >
            </div>
            <div
              class="mt-3 flex items-center gap-[5px] text-[15px] text-[#758078] max-[860px]:text-[15px] max-[560px]:text-[15px]"
            >
              85% Occupancy <span class="ml-auto">64 Covers</span>
            </div>
          </article>
          <article
            class="min-h-[128px] rounded-[10px] border border-[#e3e9e5] bg-white p-[18px] shadow-[0_2px_5px_rgb(23_43_32_/_3%)] max-[860px]:min-h-[120px] max-[860px]:p-[15px] max-[560px]:p-4"
          >
            <div
              class="flex items-center justify-between text-ms font-bold uppercase tracking-[0.055em] text-[#66736b]"
            >
              <span>Available Tables</span
              ><UtensilsCrossed class="text-[#68766e]" :size="17" />
            </div>
            <div
              class="mt-3 flex items-baseline gap-1 text-[32px] font-bold leading-none tracking-[-0.045em] text-[#102d20] max-[860px]:text-[28px]"
            >
              6
            </div>
            <div
              class="mt-3 flex items-center gap-[5px] text-[15px] text-[#758078] max-[860px]:text-[15px] max-[560px]:text-[15px]"
            >
              Open bays <span class="ml-auto">2 Reserved</span>
            </div>
          </article>
          <article
            class="min-h-[128px] rounded-[10px] border border-[#e3e9e5] bg-white p-[18px] shadow-[0_2px_5px_rgb(23_43_32_/_3%)] max-[860px]:min-h-[120px] max-[860px]:p-[15px] max-[560px]:p-4"
          >
            <div
              class="flex items-center justify-between text-ms font-bold uppercase tracking-[0.055em] text-[#66736b]"
            >
              <span>Shift Revenue</span
              ><BadgeDollarSign class="text-[#68766e]" :size="17" />
            </div>
            <div
              class="mt-3 flex items-baseline gap-1 text-[32px] font-bold leading-none tracking-[-0.045em] text-[#102d20] max-[860px]:text-[28px]"
            >
              $4,820
            </div>
            <div
              class="mt-3 flex items-center gap-[5px] text-[15px] text-[#758078] max-[860px]:text-[15px] max-[560px]:text-[15px]"
            >
              Avg Ticket $32.50
              <span class="ml-auto font-bold text-[#1d7a4e]">+8.4% target</span>
            </div>
          </article>
        </section>

        <section
          class="mt-[13px] grid grid-cols-[minmax(0,1.42fr)_minmax(0,1fr)] gap-[13px] max-[680px]:grid-cols-1"
        >
          <article
            class="rounded-[10px] border border-[#e3e9e5] bg-white p-[18px] shadow-[0_2px_5px_rgb(23_43_32_/_3%)] max-[560px]:p-4"
          >
            <div class="mb-[15px] flex items-center justify-between gap-3">
              <h2
                class="m-0 text-base font-bold tracking-[-0.01em] text-[#20352a]"
              >
                Dining Zones
              </h2>
              <span class="whitespace-nowrap text-[15px] text-[#758078]"
                >Avg Service Duration:
                <strong class="font-bold text-[#34473c]">48m</strong></span
              >
            </div>
            <div class="grid gap-3">
              <div v-for="zone in diningZones" :key="zone.name">
                <div
                  class="mb-[7px] flex items-center justify-between gap-3 text-ms"
                >
                  <div
                    class="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-[#35463c]"
                  >
                    {{ zone.name }}
                    <span class="ml-2 font-normal text-[#7b867f]">{{
                      zone.details
                    }}</span>
                  </div>
                  <span class="shrink-0 text-[15px] text-[#67746c]"
                    >{{ zone.occupancy }}%</span
                  >
                </div>
                <div
                  class="h-[7px] overflow-hidden rounded-[10px] bg-[#edf1ee]"
                >
                  <span
                    class="block h-full rounded-[inherit]"
                    :style="{
                      width: `${zone.occupancy}%`,
                      backgroundColor: zone.color,
                    }"
                  ></span>
                </div>
                <div
                  class="mt-[6px] flex items-center justify-between gap-3 text-[10px] text-[#78837c]"
                >
                  <span>{{ zone.staff }}</span
                  ><span>{{ zone.turnover }}</span>
                </div>
              </div>
            </div>
            <div
              class="mt-4 flex items-center justify-between border-t border-[#edf0ee] pt-3 text-[11px] text-[#647169]"
            >
              <span class="flex items-center gap-[6px]"
                ><i
                  class="inline-block size-[6px] rounded-full bg-[#2d7753]"
                ></i
                >Normal flow pace</span
              >
              <button
                class="border-0 bg-transparent p-0 font-semibold text-[#174b36]"
                type="button"
              >
                Graphic Floor View <span class="ml-1">→</span>
              </button>
            </div>
          </article>

          <article
            class="rounded-[10px] border border-[#e3e9e5] bg-white p-[18px] shadow-[0_2px_5px_rgb(23_43_32_/_3%)] max-[560px]:p-4"
          >
            <div class="mb-[15px] flex items-center justify-between gap-3">
              <h2
                class="m-0 text-base font-bold tracking-[-0.01em] text-[#20352a]"
              >
                Order Pipeline
              </h2>
              <span
                class="rounded-[20px] bg-[#edf5ef] px-[9px] py-[5px] text-[10px] font-bold text-[#326447]"
                >15 Active</span
              >
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div
                class="flex min-h-[88px] flex-col items-start rounded-lg border border-[#edf0ee] bg-[#f7f9f8] px-[14px] py-3"
              >
                <span class="text-[11px] text-[#68756d]">Pending POS</span
                ><strong
                  class="mt-1 text-2xl font-bold leading-none text-[#20372a]"
                  >03</strong
                ><small class="mt-1 text-[10px] text-[#7a857e]"
                  >Awaiting accept</small
                >
              </div>
              <div
                class="flex min-h-[88px] flex-col items-start rounded-lg border border-[#edf0ee] bg-[#f7f9f8] px-[14px] py-3"
              >
                <span class="text-[11px] text-[#68756d]">In Kitchen</span
                ><strong
                  class="mt-1 text-2xl font-bold leading-none text-[#20372a]"
                  >08</strong
                ><small class="mt-1 text-[10px] text-[#7a857e]"
                  >Hot line / grill</small
                >
              </div>
              <div
                class="flex min-h-[88px] flex-col items-start rounded-lg border border-[#edf0ee] bg-[#f7f9f8] px-[14px] py-3"
              >
                <span class="text-[11px] text-[#68756d]">Ready to Pass</span
                ><strong
                  class="mt-1 text-2xl font-bold leading-none text-[#cf4e3d]"
                  >04</strong
                ><small class="mt-1 text-[10px] text-[#7a857e]"
                  >Runner alert</small
                >
              </div>
              <div
                class="flex min-h-[88px] flex-col items-start rounded-lg border border-[#edf0ee] bg-[#f7f9f8] px-[14px] py-3"
              >
                <span class="text-[11px] text-[#68756d]">Completed</span
                ><strong
                  class="mt-1 text-2xl font-bold leading-none text-[#20372a]"
                  >133</strong
                ><small class="mt-1 text-[10px] text-[#7a857e]"
                  >Served today</small
                >
              </div>
            </div>
            <div
              class="mt-3 flex items-center gap-[9px] rounded-md border border-[#f1e7dc] bg-[#fcf8f3] px-3 py-3 text-[11px] leading-[1.5] text-[#5a5146]"
            >
              <TriangleAlert class="shrink-0 text-[#c64a39]" :size="14" />
              <span
                >Order <strong class="text-[#b84334]">#ORD-1089</strong> running
                late on Garde Manger (+4m)</span
              >
            </div>
          </article>
        </section>

        <section
          class="mt-[13px] overflow-hidden rounded-[9px] border border-[#e3e9e5] bg-white p-0 shadow-[0_2px_5px_rgb(23_43_32_/_3%)]"
        >
          <div
            class="flex items-center justify-between gap-4 px-5 pb-4 pt-[18px] max-[680px]:items-start max-[680px]:flex-col"
          >
            <div>
              <h2
                class="m-0 text-base font-bold tracking-[-0.01em] text-[#20352a]"
              >
                Active Floor Orders
              </h2>
              <p class="mb-0 mt-1 text-xs text-[#78837c]">
                Real-time dining session stream
              </p>
            </div>
            <div
              class="flex items-center gap-2 max-[680px]:w-full max-[680px]:flex-wrap max-[560px]:items-stretch"
            >
              <label
                class="flex h-[38px] w-[240px] items-center gap-2 rounded-md border border-[#e2e8e4] px-3 text-[#7d8981] focus-within:border-[#8eae9a] focus-within:shadow-[0_0_0_2px_rgb(33_105_69_/_9%)] max-[680px]:flex-[1_1_200px]"
              >
                <Search :size="14" />
                <input
                  class="w-full min-w-0 border-0 bg-transparent text-xs text-[#27382e] outline-none placeholder:text-[#929c95]"
                  v-model="search"
                  type="search"
                  placeholder="Search orders or tables..."
                />
              </label>
              <div
                class="flex gap-[3px] rounded-[7px] bg-[#f2f5f3] p-[3px] max-[560px]:w-full max-[560px]:justify-between"
                role="group"
                aria-label="Filter orders"
              >
                <button
                  v-for="filter in ['All orders', 'Active', 'Delayed']"
                  :key="filter"
                  type="button"
                  class="min-h-[32px] rounded-[5px] border-0 bg-transparent px-3 text-[11px] text-[#69766e] hover:text-[#254c36] max-[560px]:flex-1"
                  :class="
                    orderFilter === filter
                      ? 'bg-white font-bold text-[#214f36] shadow-[0_1px_3px_rgb(18_40_27_/_12%)]'
                      : ''
                  "
                  @click="orderFilter = filter"
                >
                  {{ filter }}
                </button>
              </div>
            </div>
          </div>

          <div class="w-full overflow-x-auto border-t border-[#edf0ee]">
            <table class="w-full min-w-[900px] border-collapse text-left">
              <thead class="bg-[#f8faf9]">
                <tr>
                  <th
                    class="h-10 whitespace-nowrap px-3 text-[10px] font-bold uppercase tracking-[0.055em] text-[#6e7a72] pl-4"
                  >
                    Order
                  </th>
                  <th
                    class="h-10 whitespace-nowrap px-3 text-[10px] font-bold uppercase tracking-[0.055em] text-[#6e7a72]"
                  >
                    Table
                  </th>
                  <th
                    class="h-10 whitespace-nowrap px-3 text-[10px] font-bold uppercase tracking-[0.055em] text-[#6e7a72]"
                  >
                    Party
                  </th>
                  <th
                    class="h-10 whitespace-nowrap px-3 text-[10px] font-bold uppercase tracking-[0.055em] text-[#6e7a72]"
                  >
                    Items
                  </th>
                  <th
                    class="h-10 whitespace-nowrap px-3 text-[10px] font-bold uppercase tracking-[0.055em] text-[#6e7a72]"
                  >
                    Elapsed
                  </th>
                  <th
                    class="h-10 whitespace-nowrap px-3 text-[10px] font-bold uppercase tracking-[0.055em] text-[#6e7a72]"
                  >
                    Status
                  </th>
                  <th
                    class="h-10 whitespace-nowrap px-3 text-right text-[10px] font-bold uppercase tracking-[0.055em] text-[#6e7a72]"
                  >
                    Total
                  </th>
                  <th
                    class="h-10 whitespace-nowrap px-3 text-[10px] font-bold uppercase tracking-[0.055em] text-[#6e7a72]"
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="order in visibleOrders"
                  :key="order.id"
                  class="hover:bg-[#fbfcfb]"
                >
                  <td
                    class="h-[52px] whitespace-nowrap border-t border-[#f0f2f1] pl-4 pr-3 text-xs font-bold text-[#1a5036]"
                  >
                    {{ order.id }}
                  </td>
                  <td
                    class="h-[52px] whitespace-nowrap border-t border-[#f0f2f1] px-3 text-xs text-[#3e4c43]"
                  >
                    {{ order.table }}
                  </td>
                  <td
                    class="h-[52px] whitespace-nowrap border-t border-[#f0f2f1] px-3 text-xs text-[#78837c]"
                  >
                    {{ order.party }}
                  </td>
                  <td
                    class="h-[52px] max-w-[360px] overflow-hidden text-ellipsis whitespace-nowrap border-t border-[#f0f2f1] px-3 text-xs text-[#3e4c43]"
                  >
                    {{ order.items }}
                  </td>
                  <td
                    class="h-[52px] whitespace-nowrap border-t border-[#f0f2f1] px-3 text-xs text-[#3e4c43]"
                    :class="order.minutes >= 15 ? 'text-[#c74a3b]' : ''"
                  >
                    <span class="inline-flex items-center gap-1"
                      ><Clock3 v-if="order.minutes >= 15" :size="12" />{{
                        order.elapsed
                      }}</span
                    >
                  </td>
                  <td
                    class="h-[52px] whitespace-nowrap border-t border-[#f0f2f1] px-3 text-xs text-[#3e4c43]"
                  >
                    <span
                      class="inline-flex items-center gap-[6px] rounded-[20px] px-[10px] py-[6px] text-[10px] font-semibold"
                      :class="statusClass(order.status)"
                    >
                      <i
                        class="size-[6px] rounded-full"
                        :class="statusDotClass(order.status)"
                      ></i
                      >{{ order.status }}
                    </span>
                  </td>
                  <td
                    class="h-[52px] whitespace-nowrap border-t border-[#f0f2f1] px-3 text-right text-xs font-semibold text-[#3e4c43]"
                  >
                    {{ order.total }}
                  </td>
                  <td
                    class="h-[52px] w-10 whitespace-nowrap border-t border-[#f0f2f1] px-3 pr-[10px] text-xs text-[#7b8780]"
                  >
                    <button
                      class="inline-grid size-6 place-items-center rounded-[5px] text-[#7b8780] hover:bg-[#edf2ef]"
                      type="button"
                      :aria-label="`More options for ${order.id}`"
                    >
                      <MoreHorizontal :size="16" />
                    </button>
                  </td>
                </tr>
                <tr v-if="visibleOrders.length === 0">
                  <td
                    colspan="8"
                    class="h-[100px] border-t border-[#f0f2f1] text-center text-xs text-[#7a857e]"
                  >
                    No orders match your search.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            class="flex min-h-[52px] items-center justify-between gap-3 border-t border-[#edf0ee] px-4 text-[11px] text-[#77827b]"
          >
            <span
              >Showing {{ visibleOrders.length ? 1 : 0 }}–{{
                visibleOrders.length
              }}
              of
              {{
                orderFilter === "All orders" && !search
                  ? 148
                  : visibleOrders.length
              }}
              orders</span
            >
            <div class="flex items-center gap-[3px]" aria-label="Order pages">
              <button
                class="inline-grid size-[30px] place-items-center rounded-[5px] px-[6px] hover:bg-[#edf2ef]"
                type="button"
                aria-label="Previous page"
              >
                <ChevronLeft :size="14" />
              </button>
              <button
                type="button"
                class="inline-grid h-[30px] min-w-[30px] place-items-center rounded-[5px] bg-[#102f23] px-[6px] text-white"
              >
                1
              </button>
              <button
                class="inline-grid size-[30px] min-w-[30px] place-items-center rounded-[5px] px-[6px] hover:bg-[#edf2ef]"
                type="button"
              >
                2
              </button>
              <button
                class="inline-grid size-[30px] min-w-[30px] place-items-center rounded-[5px] px-[6px] hover:bg-[#edf2ef]"
                type="button"
              >
                3
              </button>
              <span>…</span>
              <button
                class="inline-grid size-[30px] min-w-[30px] place-items-center rounded-[5px] px-[6px] hover:bg-[#edf2ef]"
                type="button"
              >
                30
              </button>
              <button
                class="inline-grid size-[30px] place-items-center rounded-[5px] px-[6px] hover:bg-[#edf2ef]"
                type="button"
                aria-label="Next page"
              >
                <ChevronRight :size="14" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
