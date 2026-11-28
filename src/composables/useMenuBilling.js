import { reactive, watch } from 'vue'

/* ---------- Settings (change these) ---------- */
export const RESTAURANT_NAME = 'Team 2 Restaurant'
export const TAX_RATE = 0.1 // 10% VAT. Set to 0 for no tax.

export const money = (n) => `$${Number(n || 0).toFixed(2)}`

export function calcTotals(lines, discountPercent = 0) {
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0)
  const pct = Math.min(Math.max(Number(discountPercent) || 0, 0), 100)
  const discount = subtotal * (pct / 100)
  const tax = (subtotal - discount) * TAX_RATE
  const total = subtotal - discount + tax
  return { subtotal, discount, tax, total }
}

/* ---------- Storage ----------
   Data is saved in the browser (localStorage) so the pages work right away.
   When the backend API is ready, replace the actions below with API calls
   (fetch/axios) and keep the same function names. */
const KEY = 'menu-billing-v1'

const seed = {
  categories: [
    { id: 'c1', name: 'Main Dishes' },
    { id: 'c2', name: 'Drinks' },
    { id: 'c3', name: 'Desserts' },
  ],
  items: [
    { id: 'i1', categoryId: 'c1', name: 'Classic Burger', price: 8.99, description: '', imageUrl: '', available: true },
    { id: 'i2', categoryId: 'c1', name: 'Margherita Pizza', price: 12.5, description: '', imageUrl: '', available: true },
    { id: 'i3', categoryId: 'c2', name: 'Iced Lemon Tea', price: 3.5, description: '', imageUrl: '', available: true },
    { id: 'i4', categoryId: 'c2', name: 'Fresh Orange Juice', price: 4, description: '', imageUrl: '', available: true },
    { id: 'i5', categoryId: 'c3', name: 'Chocolate Cake', price: 5, description: '', imageUrl: '', available: true },
  ],
  bills: [],
  nextBillNo: 1,
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : structuredClone(seed)
  } catch {
    return structuredClone(seed)
  }
}

// One shared state for every page (module-level singleton)
const state = reactive(load())

watch(
  state,
  () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage full or blocked: ignore */
    }
  },
  { deep: true }
)

const uid = (p) => p + Math.random().toString(36).slice(2, 9)

/* Categories */
function addCategory({ name }) {
  state.categories.push({ id: uid('c'), name })
}
function updateCategory(id, { name }) {
  const c = state.categories.find((c) => c.id === id)
  if (c) c.name = name
}
function deleteCategory(id) {
  state.categories = state.categories.filter((c) => c.id !== id)
  state.items = state.items.filter((i) => i.categoryId !== id) // its items are removed too
}

/* Menu items */
function addItem(item) {
  state.items.push({ ...item, id: uid('i') })
}
function updateItem(id, item) {
  const i = state.items.find((i) => i.id === id)
  if (i) Object.assign(i, item)
}
function deleteItem(id) {
  state.items = state.items.filter((i) => i.id !== id)
}

/* Bills */
function createBill({ tableNo, lines, discountPercent }) {
  const bill = {
    id: uid('b'),
    billNo: state.nextBillNo++,
    tableNo,
    lines,
    discountPercent,
    ...calcTotals(lines, discountPercent),
    status: 'unpaid',
    createdAt: new Date().toISOString(),
  }
  state.bills.unshift(bill)
  return bill.id
}
function getBill(id) {
  return state.bills.find((b) => b.id === id)
}
function payBill(id, { method, tendered }) {
  const b = getBill(id)
  if (!b) return
  b.status = 'paid'
  b.method = method
  b.tendered = method === 'cash' ? tendered : b.total
  b.change = method === 'cash' ? Math.max(tendered - b.total, 0) : 0
  b.paidAt = new Date().toISOString()
}
function deleteBill(id) {
  state.bills = state.bills.filter((b) => b.id !== id)
}

export function useMenuBilling() {
  return {
    state,
    addCategory, updateCategory, deleteCategory,
    addItem, updateItem, deleteItem,
    createBill, getBill, payBill, deleteBill,
  }
}