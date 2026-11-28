import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/home/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import('../pages/preview/PreviewPage.vue')
  },
  { path: '/menu', name: 'Menu', component: () => import('../pages/menu/MenuPage.vue') },
  { path: '/cashier', name: 'Cashier', component: () => import('../pages/cashier/CashierPage.vue') },
  { path: '/billing', name: 'Billing', component: () => import('../pages/billing/BillingPage.vue') },
  { path: '/payment/:id', name: 'Payment', component: () => import('../pages/payment/PaymentPage.vue') },
  { path: '/receipt/:id', name: 'Receipt', component: () => import('../pages/receipt/ReceiptPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
