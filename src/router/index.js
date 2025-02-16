import { createRouter, createWebHistory } from 'vue-router/auto'
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import { setupGuards } from './guards'


export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    MainRoutes,
    AuthRoutes
  ]
});

setupGuards(router)

