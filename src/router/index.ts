import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import SketchPlaygroundView from '@/views/SketchPlaygroundView.vue';
import SketchHomeView from '@/views/SketchHomeView.vue';
import SketchDocumentationView from '@/views/SketchDocumentationView.vue';

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
  },
  {
    path: '/doc',
    name: 'doc',
    component: SketchDocumentationView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "link-active" // active class for *exact* links.
})

// nav guards
router.beforeEach(() => {
  const lines = document.querySelectorAll('.leader-line');
  lines.forEach(line =>  line.remove());
})

export default router
