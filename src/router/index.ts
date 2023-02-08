import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import SketchView from '@/views/SketchView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: SketchView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
