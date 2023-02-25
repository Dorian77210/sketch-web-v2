import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import SketchView from '@/views/SketchView.vue';
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
    component: SketchView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
