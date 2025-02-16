const AuthRoutes = {
  path: '/auth',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'Login',
      path: '/auth/login',
      component: () => import('@/pages/auth/LoginPage.vue'),
      meta: { public: true },
    },
    {
      name: 'Error 404',
      path: '/pages/error',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue'),
      meta: { public: true },
    }
  ]
};

export default AuthRoutes;
