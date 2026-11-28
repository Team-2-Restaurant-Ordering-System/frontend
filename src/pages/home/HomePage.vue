<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Search,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  Clock,
  Flame,
  Check,
  ChevronRight,
  Trash2,
  Utensils
} from '@lucide/vue'

const router = useRouter()

const selectedCategory = ref('All')
const searchQuery = ref('')
const toastMessage = ref('')

const categories = [
  'All',
  'Chef Specials',
  'Main Course',
  'Artisan Pasta',
  'Appetizers',
  'Beverages'
]

const menuItems = ref([
  {
    id: 1,
    name: 'Pan-Seared Chilean Sea Bass',
    category: 'Chef Specials',
    description: 'Crisp skin sea bass served with saffron cauliflower puree, blistered tomatoes & herb oil.',
    price: 34.50,
    calories: '480 kcal',
    prepTime: '20 min',
    tag: 'Chef Choice',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    popular: true,
    image: '🐟'
  },
  {
    id: 2,
    name: 'Prime Ribeye Steak (10oz)',
    category: 'Main Course',
    description: 'Dry-aged USDA Prime Angus, garlic thyme butter, charred broccolini & red wine jus.',
    price: 38.00,
    calories: '720 kcal',
    prepTime: '22 min',
    tag: 'Best Seller',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
    popular: true,
    image: '🥩'
  },
  {
    id: 3,
    name: 'Handmade Truffle Tagliatelle',
    category: 'Artisan Pasta',
    description: 'Egg pasta tossed in wild porcini mushroom broth, parmigiano reggiano & shaved black truffle.',
    price: 26.00,
    calories: '540 kcal',
    prepTime: '15 min',
    tag: 'Vegetarian',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    popular: false,
    image: '🍝'
  },
  {
    id: 4,
    name: 'Heirloom Burrata & Peach Salad',
    category: 'Appetizers',
    description: 'Creamy artisanal burrata, grilled peaches, wild arugula, pine nuts & aged balsamic glaze.',
    price: 18.50,
    calories: '390 kcal',
    prepTime: '10 min',
    tag: 'Fresh',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    popular: false,
    image: '🥗'
  },
  {
    id: 5,
    name: 'Wood-Fired Margherita Pizza',
    category: 'Main Course',
    description: 'San Marzano tomato coulis, fresh buffalo mozzarella, fragrant sweet basil & cold-pressed EVOO.',
    price: 21.00,
    calories: '610 kcal',
    prepTime: '12 min',
    tag: 'Classic',
    tagColor: 'bg-slate-100 text-slate-700 border-slate-200',
    popular: true,
    image: '🍕'
  },
  {
    id: 6,
    name: 'Smoked Rosemary Old Fashioned',
    category: 'Beverages',
    description: 'Bourbon infused with charred rosemary, bitters, orange peel & crystal clear ice ball.',
    price: 14.00,
    calories: '160 kcal',
    prepTime: '5 min',
    tag: 'Craft Cocktail',
    tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
    popular: false,
    image: '🍸'
  }
])

// Cart State
const cart = ref([
  {
    id: 3,
    name: 'Handmade Truffle Tagliatelle',
    price: 26.00,
    quantity: 2,
    image: '🍝'
  },
  {
    id: 4,
    name: 'Heirloom Burrata & Peach Salad',
    price: 18.50,
    quantity: 1,
    image: '🥗'
  }
])

const filteredDishes = computed(() => {
  return menuItems.value.filter(dish => {
    const matchesCat = selectedCategory.value === 'All' || dish.category === selectedCategory.value
    const matchesQuery = dish.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         dish.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCat && matchesQuery
  })
})

function addToCart(dish) {
  const existing = cart.value.find(item => item.id === dish.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: 1,
      image: dish.image
    })
  }
  showToast(`Added "${dish.name}" to order`)
}

function updateQuantity(item, delta) {
  item.quantity += delta
  if (item.quantity <= 0) {
    cart.value = cart.value.filter(i => i.id !== item.id)
  }
}

function getItemCartQuantity(dishId) {
  const item = cart.value.find(i => i.id === dishId)
  return item ? item.quantity : 0
}

const subtotal = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
})

const tax = computed(() => subtotal.value * 0.08)
const total = computed(() => subtotal.value + tax.value)

function showToast(msg) {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 2400)
}

function proceedToCheckout() {
  router.push('/preview')
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
    <!-- Hero Greeting & Welcome Card -->
    <div class="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 p-6 sm:p-8 text-white shadow-md">
      <div class="relative z-10 max-w-2xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-800/40 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-xs">
          <Sparkles :size="13" class="text-emerald-300" />
          Table #04 · Dine-In Experience
        </div>
        <h1 class="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Artisanal Culinary Selection
        </h1>
        <p class="mt-2 text-sm sm:text-base text-emerald-100/80 leading-relaxed">
          Browse today’s seasonal dishes crafted with local ingredients. Add items to your table order directly from your device.
        </p>
      </div>

      <!-- Background decorative circle -->
      <div class="absolute -right-12 -top-12 size-64 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none"></div>
    </div>

    <!-- Main Content & Layout Grid -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <!-- Dishes Catalog (Left / Main) -->
      <div class="lg:col-span-8 space-y-6">
        <!-- Search & Filter Bar -->
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <!-- Category Pills -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="selectedCategory = cat"
              class="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition"
              :class="
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
              "
            >
              {{ cat }}
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative w-full sm:w-56 shrink-0">
            <Search :size="15" class="absolute left-3 top-2.5 text-slate-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search dishes..."
              class="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:outline-none shadow-xs"
            />
          </div>
        </div>

        <!-- Menu Dish Cards Grid -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            v-for="dish in filteredDishes"
            :key="dish.id"
            class="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-emerald-200 hover:shadow-md"
          >
            <div>
              <div class="flex items-start justify-between gap-3">
                <div class="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-50 text-2xl border border-slate-100">
                  {{ dish.image }}
                </div>
                <span
                  class="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold"
                  :class="dish.tagColor"
                >
                  {{ dish.tag }}
                </span>
              </div>

              <h3 class="mt-3 text-base font-bold text-slate-900 leading-snug">
                {{ dish.name }}
              </h3>
              <p class="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {{ dish.description }}
              </p>

              <div class="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
                <span class="inline-flex items-center gap-1">
                  <Clock :size="12" /> {{ dish.prepTime }}
                </span>
                <span>·</span>
                <span class="inline-flex items-center gap-1">
                  <Flame :size="12" /> {{ dish.calories }}
                </span>
              </div>
            </div>

            <!-- Price & Add Button -->
            <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
              <span class="text-base font-bold text-slate-900">
                ${{ dish.price.toFixed(2) }}
              </span>

              <!-- Quantity selector if already in cart -->
              <div v-if="getItemCartQuantity(dish.id) > 0" class="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-2 py-1">
                <button
                  @click="updateQuantity(cart.find(i => i.id === dish.id), -1)"
                  class="grid size-5 place-items-center rounded text-emerald-800 hover:bg-emerald-100"
                >
                  <Minus :size="12" />
                </button>
                <span class="text-xs font-bold text-emerald-900 px-1">
                  {{ getItemCartQuantity(dish.id) }}
                </span>
                <button
                  @click="addToCart(dish)"
                  class="grid size-5 place-items-center rounded text-emerald-800 hover:bg-emerald-100"
                >
                  <Plus :size="12" />
                </button>
              </div>

              <button
                v-else
                @click="addToCart(dish)"
                class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-800 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-900"
              >
                <Plus :size="13" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredDishes.length === 0" class="rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
          <Utensils :size="28" class="mx-auto mb-2 text-slate-300" />
          <p class="text-sm font-medium">No dishes match your criteria.</p>
          <button @click="searchQuery = ''; selectedCategory = 'All'" class="mt-2 text-xs font-semibold text-emerald-700 hover:underline">
            Reset filters
          </button>
        </div>
      </div>

      <!-- Live Order Cart Sidebar (Right) -->
      <div class="lg:col-span-4">
        <div class="sticky top-20 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div class="flex items-center gap-2">
              <ShoppingBag :size="18" class="text-emerald-800" />
              <h2 class="text-base font-bold text-slate-900">Current Table Order</h2>
            </div>
            <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
              {{ cart.reduce((acc, item) => acc + item.quantity, 0) }} items
            </span>
          </div>

          <!-- Cart Items List -->
          <div v-if="cart.length > 0" class="divide-y divide-slate-100 max-h-[320px] overflow-y-auto pr-1">
            <div
              v-for="item in cart"
              :key="item.id"
              class="flex items-center justify-between py-3.5"
            >
              <div class="flex items-center gap-2.5 min-w-0 pr-2">
                <span class="text-xl shrink-0">{{ item.image }}</span>
                <div class="min-w-0">
                  <p class="truncate text-xs font-semibold text-slate-800">{{ item.name }}</p>
                  <p class="text-[11px] text-slate-400">${{ item.price.toFixed(2) }} each</p>
                </div>
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <div class="flex items-center rounded-md border border-slate-200 bg-slate-50">
                  <button
                    @click="updateQuantity(item, -1)"
                    class="grid size-6 place-items-center text-slate-500 hover:text-slate-800"
                  >
                    <Minus :size="11" />
                  </button>
                  <span class="w-5 text-center text-xs font-bold text-slate-800">
                    {{ item.quantity }}
                  </span>
                  <button
                    @click="updateQuantity(item, 1)"
                    class="grid size-6 place-items-center text-slate-500 hover:text-slate-800"
                  >
                    <Plus :size="11" />
                  </button>
                </div>
                <span class="w-14 text-right text-xs font-bold text-slate-900">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </span>
              </div>
            </div>
          </div>

          <div v-else class="py-8 text-center text-slate-400">
            <ShoppingBag :size="24" class="mx-auto mb-2 text-slate-300" />
            <p class="text-xs">Your order is currently empty.</p>
            <p class="text-[11px] text-slate-400">Choose your favorite dishes to add.</p>
          </div>

          <!-- Pricing Calculations -->
          <div v-if="cart.length > 0" class="space-y-2 border-t border-slate-100 pt-4 text-xs">
            <div class="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span class="font-medium text-slate-800">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-slate-500">
              <span>Sales Tax (8%)</span>
              <span class="font-medium text-slate-800">${{ tax.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between border-t border-slate-100 pt-2 text-sm font-bold text-slate-900">
              <span>Total Amount</span>
              <span class="text-emerald-800">${{ total.toFixed(2) }}</span>
            </div>

            <!-- Submit Order Action -->
            <button
              @click="proceedToCheckout"
              class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-900"
            >
              <span>Review & Place Order</span>
              <ChevronRight :size="15" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification Popup -->
    <transition
      enter-active-class="transform transition ease-out duration-300"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-medium text-white shadow-lg"
      >
        <Check :size="15" class="text-emerald-400" />
        <span>{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>
