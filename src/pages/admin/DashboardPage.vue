<script setup>
import { computed, ref } from 'vue'
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
  X
} from '@lucide/vue'

const sidebarOpen = ref(false)
const search = ref('')
const orderFilter = ref('All orders')

const operationLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Restaurant Tables', icon: CookingPot },
  { label: 'Dining Sessions', icon: Armchair },
  { label: 'Orders', icon: ReceiptText },
  { label: 'Kitchen & Bar', icon: UtensilsCrossed },
  { label: 'Billing & Cashier', icon: WalletCards }
]

const managementLinks = [
  { label: 'Menu Management', icon: ChefHat },
  { label: 'Staff Management', icon: Users },
  { label: 'Roles & Permissions', icon: ShieldCheck },
  { label: 'Reports', icon: ChartNoAxesCombined },
  { label: 'Audit Logs', icon: FileText }
]

const diningZones = [
  { name: 'Main Dining Room', details: '12 / 14 tables', occupancy: 92, staff: '4 Captains', turnover: 'Turnover 52m', color: '#176247' },
  { name: 'Patio & Veranda', details: '4 / 6 tables', occupancy: 66, staff: '2 Captains', turnover: 'Turnover 41m', color: '#f16c50' },
  { name: 'Bar & High-Tops', details: '2 tables free', occupancy: 50, staff: '2 Mixologists', turnover: 'Turnover 32m', color: '#d89a2b' }
]

const orders = [
  { id: '#ORD-1094', table: 'T-02 Main', party: '4 guests', items: 'Pan-Seared Halibut x2, Ribeye Steak x1', elapsed: '18m', minutes: 18, status: 'Ready', total: '$142.00' },
  { id: '#ORD-1092', table: 'T-04 Main', party: '2 guests', items: 'Truffle Tagliatelle x2, Burrata Salad', elapsed: '12m', minutes: 12, status: 'In Kitchen', total: '$68.00' },
  { id: '#ORD-1095', table: 'P-01 Patio', party: '3 guests', items: 'Wagyu Burger x2, Sweet Potato Fries', elapsed: '3m', minutes: 3, status: 'Pending', total: '$84.50' },
  { id: '#ORD-1090', table: 'BAR-03 Lounge', party: '2 guests', items: 'Smoked Old Fashioned x2, Charcuterie', elapsed: '9m', minutes: 9, status: 'In Kitchen', total: '$54.00' },
  { id: '#ORD-1088', table: 'T-08 Main', party: '6 guests', items: 'Chef Tasting Course x6', elapsed: '54m', minutes: 54, status: 'Settled', total: '$590.00' }
]

const visibleOrders = computed(() => {
  const query = search.value.trim().toLowerCase()

  return orders.filter(order => {
    const matchesQuery = !query || [order.id, order.table, order.party, order.items, order.status]
      .some(value => value.toLowerCase().includes(query))
    const matchesFilter = orderFilter.value === 'All orders'
      || (orderFilter.value === 'Active' && order.status !== 'Settled')
      || (orderFilter.value === 'Delayed' && order.minutes >= 15 && order.status !== 'Settled')

    return matchesQuery && matchesFilter
  })
})

function statusClass(status) {
  return {
    Ready: 'status--ready',
    'In Kitchen': 'status--kitchen',
    Pending: 'status--pending',
    Settled: 'status--settled'
  }[status]
}

function statusDotClass(status) {
  return {
    Ready: 'status-dot--ready',
    'In Kitchen': 'status-dot--kitchen',
    Pending: 'status-dot--pending',
    Settled: 'status-dot--settled'
  }[status]
}
</script>

<template>
  <div class="admin-dashboard">
    <header class="admin-header">
      <div class="header-brand">
        <button
          class="menu-toggle"
          type="button"
          :aria-label="sidebarOpen ? 'Close navigation' : 'Open navigation'"
          @click="sidebarOpen = !sidebarOpen"
        >
          <X v-if="sidebarOpen" :size="19" />
          <Menu v-else :size="19" />
        </button>
        <div class="brand-mark">R</div>
        <div class="brand-copy">
          <strong>RestaurantOS</strong>
          <span>Admin</span>
        </div>
        <span class="version-tag">V2.4</span>
      </div>

      <div class="header-content">
        <div class="breadcrumb">
          <span>Operations</span>
          <span class="breadcrumb-divider">›</span>
          <strong>Overview</strong>
        </div>
        <div class="header-actions">
          <span class="service-indicator"><i></i> Lunch Service Active</span>
          <button class="icon-button notification-button" type="button" aria-label="Notifications">
            <Bell :size="17" />
            <i></i>
          </button>
          <div class="user-avatar">MV</div>
          <button class="profile-button" type="button">Marcus V. <ChevronDown :size="14" /></button>
        </div>
      </div>
    </header>

    <button
      v-if="sidebarOpen"
      type="button"
      class="sidebar-backdrop"
      aria-label="Close navigation"
      @click="sidebarOpen = false"
    ></button>

    <aside class="admin-sidebar" :class="{ 'sidebar--open': sidebarOpen }">
      <nav aria-label="Admin navigation">
        <div class="nav-group">
          <p class="nav-heading">Operations</p>
          <button
            v-for="item in operationLinks"
            :key="item.label"
            class="nav-item"
            :class="{ 'nav-item--active': item.active }"
            type="button"
          >
            <component :is="item.icon" :size="16" :stroke-width="1.8" />
            <span>{{ item.label }}</span>
          </button>
        </div>

        <div class="nav-group">
          <p class="nav-heading">Management</p>
          <button v-for="item in managementLinks" :key="item.label" class="nav-item" type="button">
            <component :is="item.icon" :size="16" :stroke-width="1.8" />
            <span>{{ item.label }}</span>
            <ChevronDown v-if="item.label === 'Menu Management'" class="nav-chevron" :size="13" />
          </button>
        </div>

        <div class="nav-group nav-account">
          <p class="nav-heading">Account</p>
          <button class="nav-item" type="button">
            <Bell :size="16" :stroke-width="1.8" />
            <span>Notifications</span>
            <span class="notification-count">3</span>
          </button>
          <button class="nav-item" type="button">
            <WalletCards :size="16" :stroke-width="1.8" />
            <span>Pass Terminals (8/8)</span>
            <span class="online-dot"></span>
          </button>
        </div>
      </nav>
    </aside>

    <div class="admin-main">
      <div class="dashboard-content">
        <section class="page-heading">
          <div>
            <p class="eyebrow">Shift 2 <span>·</span> Lunch</p>
            <h1>Operations Overview</h1>
          </div>
          <div class="page-actions">
            <button type="button" class="button button--secondary"><CalendarDays :size="14" />Today, Oct 24</button>
            <button type="button" class="button button--secondary"><Download :size="14" />Export</button>
            <button type="button" class="button button--primary"><Plus :size="15" />New Order</button>
          </div>
        </section>

        <section class="stats-grid" aria-label="Shift statistics">
          <article class="stat-card">
            <div class="stat-top"><span>Total Orders</span><ReceiptText :size="17" /></div>
            <div class="stat-value">148</div>
            <div class="stat-foot"><span class="positive">+12%</span> vs yesterday <span class="stat-secondary">4.2m avg pace</span></div>
          </article>
          <article class="stat-card">
            <div class="stat-top"><span>Active Tables</span><Armchair :size="17" /></div>
            <div class="stat-value">18<small>/24</small></div>
            <div class="stat-foot">85% Occupancy <span class="stat-secondary">64 Covers</span></div>
          </article>
          <article class="stat-card">
            <div class="stat-top"><span>Available Tables</span><UtensilsCrossed :size="17" /></div>
            <div class="stat-value">6</div>
            <div class="stat-foot">Open bays <span class="stat-secondary">2 Reserved</span></div>
          </article>
          <article class="stat-card">
            <div class="stat-top"><span>Shift Revenue</span><BadgeDollarSign :size="17" /></div>
            <div class="stat-value">$4,820</div>
            <div class="stat-foot">Avg Ticket $32.50 <span class="positive stat-secondary">+8.4% target</span></div>
          </article>
        </section>

        <section class="overview-grid">
          <article class="panel dining-panel">
            <div class="panel-heading">
              <h2>Dining Zones</h2>
              <span>Avg Service Duration: <strong>48m</strong></span>
            </div>
            <div class="zones-list">
              <div v-for="zone in diningZones" :key="zone.name" class="zone-row">
                <div class="zone-topline">
                  <div class="zone-name">{{ zone.name }} <span>{{ zone.details }}</span></div>
                  <span class="zone-percent">{{ zone.occupancy }}%</span>
                </div>
                <div class="zone-track">
                  <span :style="{ width: `${zone.occupancy}%`, backgroundColor: zone.color }"></span>
                </div>
                <div class="zone-meta"><span>{{ zone.staff }}</span><span>{{ zone.turnover }}</span></div>
              </div>
            </div>
            <div class="zone-footer">
              <span><i></i>Normal flow pace</span>
              <button type="button">Graphic Floor View <span>→</span></button>
            </div>
          </article>

          <article class="panel pipeline-panel">
            <div class="panel-heading">
              <h2>Order Pipeline</h2>
              <span class="active-count">15 Active</span>
            </div>
            <div class="pipeline-grid">
              <div class="pipeline-stat">
                <span>Pending POS</span><strong>03</strong><small>Awaiting accept</small>
              </div>
              <div class="pipeline-stat">
                <span>In Kitchen</span><strong>08</strong><small>Hot line / grill</small>
              </div>
              <div class="pipeline-stat">
                <span>Ready to Pass</span><strong class="pipeline-ready">04</strong><small>Runner alert</small>
              </div>
              <div class="pipeline-stat">
                <span>Completed</span><strong>133</strong><small>Served today</small>
              </div>
            </div>
            <div class="late-alert">
              <TriangleAlert :size="14" />
              <span>Order <strong>#ORD-1089</strong> running late on Garde Manger (+4m)</span>
            </div>
          </article>
        </section>

        <section class="panel orders-panel">
          <div class="orders-heading">
            <div>
              <h2>Active Floor Orders</h2>
              <p>Real-time dining session stream</p>
            </div>
            <div class="orders-controls">
              <label class="search-box">
                <Search :size="14" />
                <input v-model="search" type="search" placeholder="Search orders or tables..." />
              </label>
              <div class="filter-tabs" role="group" aria-label="Filter orders">
                <button
                  v-for="filter in ['All orders', 'Active', 'Delayed']"
                  :key="filter"
                  type="button"
                  :class="{ 'filter-tab--active': orderFilter === filter }"
                  @click="orderFilter = filter"
                >{{ filter }}</button>
              </div>
            </div>
          </div>

          <div class="table-scroll">
            <table class="orders-table">
              <thead>
                <tr>
                  <th>Order</th><th>Table</th><th>Party</th><th>Items</th>
                  <th>Elapsed</th><th>Status</th><th class="total-column">Total</th><th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in visibleOrders" :key="order.id">
                  <td class="order-id">{{ order.id }}</td>
                  <td>{{ order.table }}</td>
                  <td class="muted-cell">{{ order.party }}</td>
                  <td class="items-cell">{{ order.items }}</td>
                  <td :class="{ 'elapsed-late': order.minutes >= 15 }">
                    <span class="elapsed-value"><Clock3 v-if="order.minutes >= 15" :size="12" />{{ order.elapsed }}</span>
                  </td>
                  <td>
                    <span class="status-pill" :class="statusClass(order.status)">
                      <i :class="statusDotClass(order.status)"></i>{{ order.status }}
                    </span>
                  </td>
                  <td class="total-column">{{ order.total }}</td>
                  <td class="more-cell"><button type="button" :aria-label="`More options for ${order.id}`"><MoreHorizontal :size="16" /></button></td>
                </tr>
                <tr v-if="visibleOrders.length === 0">
                  <td colspan="8" class="empty-state">No orders match your search.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="table-footer">
            <span>Showing {{ visibleOrders.length ? 1 : 0 }}–{{ visibleOrders.length }} of {{ orderFilter === 'All orders' && !search ? 148 : visibleOrders.length }} orders</span>
            <div class="pagination" aria-label="Order pages">
              <button type="button" aria-label="Previous page"><ChevronLeft :size="14" /></button>
              <button type="button" class="page-current">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <span>…</span>
              <button type="button">30</button>
              <button type="button" aria-label="Next page"><ChevronRight :size="14" /></button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style>
#app:has(.admin-dashboard) > div > header {
  display: none !important;
}

#app:has(.admin-dashboard) > div > main {
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.admin-dashboard,
.admin-dashboard * {
  box-sizing: border-box;
}

.admin-dashboard {
  --green-900: #102f23;
  --green-800: #174b36;
  --green-700: #176247;
  --text-main: #192a22;
  --text-muted: #68756e;
  --line: #e5eae7;
  min-height: 100vh;
  background: #f4f7f5;
  color: var(--text-main);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.admin-header {
  position: fixed;
  z-index: 40;
  inset: 0 0 auto;
  display: flex;
  height: 66px;
  background: #fff;
  border-bottom: 1px solid var(--line);
}

.header-brand {
  display: flex;
  align-items: center;
  flex: 0 0 236px;
  gap: 10px;
  padding: 0 22px;
  border-right: 1px solid #edf0ee;
}

.brand-mark {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  background: var(--green-900);
  color: #fff;
  font-size: 15px;
  font-weight: 750;
}

.brand-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
  white-space: nowrap;
}

.brand-copy strong {
  font-size: 12px;
  letter-spacing: -0.02em;
}

.brand-copy span {
  color: var(--text-muted);
  font-size: 9px;
}

.version-tag {
  padding: 3px 5px;
  border-radius: 4px;
  background: #e8f4ec;
  color: var(--green-800);
  font-size: 8px;
  font-weight: 750;
}

.header-content {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #647169;
  font-size: 11px;
}

.breadcrumb strong {
  color: var(--text-main);
  font-weight: 650;
}

.breadcrumb-divider {
  color: #a3ada7;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.service-indicator {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #415249;
  font-size: 10px;
  font-weight: 550;
  white-space: nowrap;
}

.service-indicator i,
.notification-button i,
.online-dot,
.zone-footer i {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2d7753;
}

.icon-button,
.profile-button,
.menu-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: #526158;
  cursor: pointer;
}

.icon-button {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 7px;
}

.icon-button:hover,
.menu-toggle:hover {
  background: #f2f5f3;
}

.notification-button i {
  position: absolute;
  top: 5px;
  right: 6px;
  width: 6px;
  height: 6px;
  background: #d34b3c;
}

.user-avatar {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 2px solid #fff;
  border-radius: 50%;
  background: linear-gradient(145deg, #f3d9a8, #bb8852);
  color: #3e3022;
  font-size: 8px;
  font-weight: 750;
  box-shadow: 0 0 0 1px #e6e9e7;
}

.profile-button {
  gap: 5px;
  padding: 5px 0;
  color: #34443b;
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
}

.menu-toggle {
  display: none;
  width: 34px;
  height: 34px;
  border-radius: 7px;
}

.admin-sidebar {
  position: fixed;
  z-index: 30;
  top: 66px;
  bottom: 0;
  left: 0;
  width: 236px;
  overflow-y: auto;
  padding: 19px 12px;
  border-right: 1px solid var(--line);
  background: #fff;
}

.nav-group + .nav-group {
  margin-top: 21px;
}

.nav-heading {
  margin: 0 9px 8px;
  color: #79847e;
  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.075em;
  text-transform: uppercase;
}

.nav-item {
  display: flex;
  width: 100%;
  min-height: 35px;
  align-items: center;
  gap: 10px;
  margin: 2px 0;
  padding: 0 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #536159;
  cursor: pointer;
  font: inherit;
  font-size: 11px;
  text-align: left;
  transition: background-color 120ms ease, color 120ms ease;
}

.nav-item:hover {
  background: #f3f6f4;
  color: var(--green-900);
}

.nav-item--active,
.nav-item--active:hover {
  background: var(--green-900);
  color: #fff;
  font-weight: 600;
}

.nav-item > span:first-of-type {
  flex: 1;
}

.nav-chevron {
  margin-left: auto;
}

.notification-count {
  display: grid;
  min-width: 17px;
  height: 17px;
  place-items: center;
  border-radius: 50%;
  background: #fae3de;
  color: #b94535;
  font-size: 9px;
  font-weight: 700;
}

.online-dot {
  width: 7px;
  height: 7px;
  margin-left: auto;
}

.admin-main {
  min-height: 100vh;
  margin-left: 236px;
  padding-top: 66px;
}

.dashboard-content {
  width: min(100%, 1540px);
  margin: 0 auto;
  padding: 27px 30px 32px;
}

.page-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 21px;
}

.eyebrow {
  margin: 0 0 5px;
  color: #69766e;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.eyebrow span {
  padding: 0 2px;
}

.page-heading h1 {
  margin: 0;
  color: #122a1e;
  font-size: clamp(25px, 2.2vw, 32px);
  font-weight: 760;
  letter-spacing: -0.045em;
  line-height: 1.15;
}

.page-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.button {
  display: inline-flex;
  min-height: 34px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 0 11px;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font: inherit;
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
  transition: background-color 120ms ease, border-color 120ms ease;
}

.button--secondary {
  border-color: #dfe5e1;
  background: #fff;
  color: #3d4b43;
}

.button--secondary:hover {
  border-color: #bbc9c0;
  background: #fbfcfb;
}

.button--primary {
  background: var(--green-900);
  color: #fff;
}

.button--primary:hover {
  background: #1b513a;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.stat-card,
.panel {
  border: 1px solid #e3e9e5;
  border-radius: 9px;
  background: #fff;
  box-shadow: 0 2px 5px rgb(23 43 32 / 3%);
}

.stat-card {
  min-height: 112px;
  padding: 15px 16px 13px;
}

.stat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #66736b;
  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.055em;
  text-transform: uppercase;
}

.stat-top svg {
  color: #68766e;
}

.stat-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-top: 11px;
  color: #102d20;
  font-size: 27px;
  font-weight: 760;
  letter-spacing: -0.045em;
  line-height: 1;
}

.stat-value small {
  color: #79867e;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0;
}

.stat-foot {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 9px;
  color: #758078;
  font-size: 9px;
}

.stat-secondary {
  margin-left: auto;
}

.positive {
  color: #1d7a4e;
  font-weight: 700;
}

.overview-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.42fr) minmax(0, 1fr);
  gap: 13px;
  margin-top: 13px;
}

.panel {
  padding: 16px;
}

.panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 15px;
}

.panel-heading h2,
.orders-heading h2 {
  margin: 0;
  color: #20352a;
  font-size: 12px;
  font-weight: 730;
  letter-spacing: -0.01em;
}

.panel-heading > span {
  color: #758078;
  font-size: 9px;
  white-space: nowrap;
}

.panel-heading > span strong {
  color: #34473c;
  font-weight: 700;
}

.zones-list {
  display: grid;
  gap: 12px;
}

.zone-topline,
.zone-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.zone-topline {
  margin-bottom: 6px;
  font-size: 10px;
}

.zone-name {
  overflow: hidden;
  color: #35463c;
  font-weight: 620;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.zone-name span {
  margin-left: 8px;
  color: #7b867f;
  font-weight: 450;
}

.zone-percent {
  flex: 0 0 auto;
  color: #67746c;
  font-size: 9px;
}

.zone-track {
  height: 5px;
  overflow: hidden;
  border-radius: 10px;
  background: #edf1ee;
}

.zone-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
}

.zone-meta {
  margin-top: 5px;
  color: #78837c;
  font-size: 8px;
}

.zone-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #edf0ee;
  color: #647169;
  font-size: 9px;
}

.zone-footer > span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.zone-footer i {
  width: 6px;
  height: 6px;
}

.zone-footer button {
  padding: 0;
  border: 0;
  background: none;
  color: var(--green-800);
  cursor: pointer;
  font: inherit;
  font-weight: 650;
}

.zone-footer button span {
  margin-left: 4px;
}

.active-count {
  padding: 4px 7px;
  border-radius: 20px;
  background: #edf5ef;
  color: #326447 !important;
  font-size: 8px !important;
  font-weight: 700;
}

.pipeline-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.pipeline-stat {
  display: flex;
  min-height: 72px;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 11px;
  border: 1px solid #edf0ee;
  border-radius: 7px;
  background: #f7f9f8;
}

.pipeline-stat > span {
  color: #68756d;
  font-size: 9px;
}

.pipeline-stat strong {
  margin-top: 4px;
  color: #20372a;
  font-size: 20px;
  font-weight: 750;
  line-height: 1;
}

.pipeline-stat small {
  margin-top: 4px;
  color: #7a857e;
  font-size: 8px;
}

.pipeline-stat .pipeline-ready {
  color: #cf4e3d;
}

.late-alert {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 9px;
  padding: 9px 10px;
  border: 1px solid #f1e7dc;
  border-radius: 6px;
  background: #fcf8f3;
  color: #5a5146;
  font-size: 9px;
  line-height: 1.4;
}

.late-alert svg {
  flex: 0 0 auto;
  color: #c64a39;
}

.late-alert strong {
  color: #b84334;
}

.orders-panel {
  margin-top: 13px;
  padding: 0;
}

.orders-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 15px 16px 13px;
}

.orders-heading p {
  margin: 4px 0 0;
  color: #78837c;
  font-size: 9px;
}

.orders-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-box {
  display: flex;
  width: 205px;
  height: 31px;
  align-items: center;
  gap: 7px;
  padding: 0 9px;
  border: 1px solid #e2e8e4;
  border-radius: 6px;
  color: #7d8981;
}

.search-box:focus-within {
  border-color: #8eae9a;
  box-shadow: 0 0 0 2px rgb(33 105 69 / 9%);
}

.search-box input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #27382e;
  font: inherit;
  font-size: 9px;
}

.search-box input::placeholder {
  color: #929c95;
}

.filter-tabs {
  display: flex;
  gap: 3px;
  padding: 3px;
  border-radius: 7px;
  background: #f2f5f3;
}

.filter-tabs button {
  min-height: 25px;
  padding: 0 8px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: #69766e;
  cursor: pointer;
  font: inherit;
  font-size: 8px;
  white-space: nowrap;
}

.filter-tabs button:hover {
  color: #254c36;
}

.filter-tabs .filter-tab--active {
  background: #fff;
  color: #214f36;
  font-weight: 700;
  box-shadow: 0 1px 3px rgb(18 40 27 / 12%);
}

.table-scroll {
  width: 100%;
  overflow-x: auto;
  border-top: 1px solid #edf0ee;
}

.orders-table {
  width: 100%;
  min-width: 790px;
  border-collapse: collapse;
  text-align: left;
}

.orders-table thead {
  background: #f8faf9;
}

.orders-table th {
  height: 34px;
  padding: 0 12px;
  color: #6e7a72;
  font-size: 8px;
  font-weight: 750;
  letter-spacing: 0.055em;
  text-transform: uppercase;
  white-space: nowrap;
}

.orders-table th:first-child,
.orders-table td:first-child {
  padding-left: 16px;
}

.orders-table td {
  height: 45px;
  padding: 0 12px;
  border-top: 1px solid #f0f2f1;
  color: #3e4c43;
  font-size: 9px;
  white-space: nowrap;
}

.orders-table tbody tr:hover {
  background: #fbfcfb;
}

.orders-table .order-id {
  color: #1a5036;
  font-weight: 720;
}

.orders-table .muted-cell {
  color: #78837c;
}

.orders-table .items-cell {
  max-width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.orders-table .elapsed-late {
  color: #c74a3b;
}

.elapsed-value {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 8px;
  font-weight: 650;
}

.status-pill i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status--ready {
  background: #fff0ed;
  color: #a74437;
}

.status-dot--ready {
  background: #d95545;
}

.status--kitchen {
  background: #eaf5ee;
  color: #276344;
}

.status-dot--kitchen {
  background: #38865b;
}

.status--pending {
  background: #fff3df;
  color: #986016;
}

.status-dot--pending {
  background: #df9b32;
}

.status--settled {
  background: #f0f2f1;
  color: #68746d;
}

.status-dot--settled {
  background: #8b9690;
}

.orders-table .total-column {
  text-align: right;
  font-weight: 650;
}

.more-cell {
  width: 38px;
  padding-right: 10px !important;
  color: #7b8780 !important;
}

.more-cell button,
.pagination button {
  display: inline-grid;
  place-items: center;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.more-cell button {
  width: 24px;
  height: 24px;
}

.more-cell button:hover,
.pagination button:hover {
  background: #edf2ef;
}

.empty-state {
  height: 90px !important;
  color: #7a857e !important;
  text-align: center;
}

.table-footer {
  display: flex;
  min-height: 43px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 14px 0 16px;
  border-top: 1px solid #edf0ee;
  color: #77827b;
  font-size: 9px;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 3px;
}

.pagination button {
  min-width: 25px;
  height: 25px;
  padding: 0 5px;
  font: inherit;
}

.pagination .page-current,
.pagination .page-current:hover {
  background: var(--green-900);
  color: #fff;
}

.sidebar-backdrop {
  display: none;
}

@media (max-width: 1180px) {
  .header-brand {
    flex-basis: 220px;
  }

  .admin-sidebar {
    width: 220px;
  }

  .admin-main {
    margin-left: 220px;
  }

  .dashboard-content {
    padding-right: 22px;
    padding-left: 22px;
  }

  .overview-grid {
    grid-template-columns: minmax(0, 1.42fr) minmax(0, 1fr);
  }
}

@media (max-width: 860px) {
  .header-brand {
    flex-basis: 158px;
    gap: 7px;
    padding: 0 10px;
  }

  .brand-mark {
    width: 30px;
    height: 30px;
  }

  .brand-copy strong {
    font-size: 10px;
  }

  .version-tag {
    display: none;
  }

  .header-actions {
    gap: 8px;
  }

  .service-indicator {
    display: none;
  }

  .admin-sidebar {
    width: 158px;
    padding-right: 8px;
    padding-left: 8px;
  }

  .admin-main {
    margin-left: 158px;
  }

  .dashboard-content {
    padding-right: 16px;
    padding-left: 16px;
  }

  .stats-grid {
    gap: 8px;
  }

  .stat-card {
    min-height: 104px;
    padding: 12px 10px;
  }

  .stat-value {
    font-size: 23px;
  }

  .stat-foot {
    font-size: 8px;
  }

  .nav-item {
    gap: 7px;
    padding-right: 6px;
    padding-left: 7px;
    font-size: 9px;
  }
}

@media (max-width: 680px) {
  .menu-toggle {
    display: inline-flex;
  }

  .header-brand {
    flex-basis: auto;
    border-right: 0;
    padding: 0 12px;
  }

  .admin-sidebar {
    z-index: 50;
    width: 252px;
    transform: translateX(-100%);
    transition: transform 180ms ease;
    box-shadow: 12px 0 30px rgb(15 35 25 / 10%);
  }

  .admin-sidebar.sidebar--open {
    transform: translateX(0);
  }

  .sidebar-backdrop {
    position: fixed;
    z-index: 45;
    inset: 66px 0 0;
    display: block;
    border: 0;
    background: rgb(16 35 25 / 28%);
  }

  .admin-main {
    margin-left: 0;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .header-content {
    padding: 0 14px;
  }

  .breadcrumb {
    display: none;
  }

  .header-actions {
    margin-left: auto;
    gap: 9px;
  }

  .overview-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .orders-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .orders-controls {
    width: 100%;
    flex-wrap: wrap;
  }

  .search-box {
    flex: 1 1 180px;
  }
}

@media (max-width: 560px) {
  .brand-copy,
  .version-tag,
  .service-indicator,
  .profile-button {
    display: none;
  }

  .header-brand {
    gap: 7px;
  }

  .dashboard-content {
    padding: 22px 14px 28px;
  }

  .page-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 16px;
  }

  .page-actions {
    width: 100%;
  }

  .button {
    flex: 1;
    padding: 0 8px;
    font-size: 9px;
  }

  .stat-card {
    min-height: 104px;
    padding: 13px;
  }

  .stat-foot {
    font-size: 8px;
  }

  .panel {
    padding: 14px;
  }

  .orders-controls {
    align-items: stretch;
  }

  .filter-tabs {
    justify-content: space-between;
    width: 100%;
  }

  .filter-tabs button {
    flex: 1;
  }
}
</style>
