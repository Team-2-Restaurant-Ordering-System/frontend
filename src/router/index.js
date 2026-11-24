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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
