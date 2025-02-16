import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
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

router.beforeEach((to, from) => {

  if (to.meta.requiresAuth){
    if (localStorage.getItem("authToken")) {
      return true
    } else {
      if (to.path !== '/login') {
        return '/auth/login'
      }else{
        return true
      }
    }

  }else{
    if (localStorage.getItem("authToken")) {
      return '/'
    } else {
      return true
    }
  }


})
export default router
