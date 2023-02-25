import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import SketchPlaygroundView from '@/views/SketchPlaygroundView.vue';
import SketchHomeView from '@/views/SketchHomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: SketchHomeView
  },
  {
    path: '/playground',
    name: 'playground',
    component: SketchPlaygroundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "link-active" // active class for *exact* links.
})

export default router
