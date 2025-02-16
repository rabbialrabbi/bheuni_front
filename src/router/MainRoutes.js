const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard/default',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'LandingPage',
      path: '/',
      component: () => import('@/pages/home.vue'),
      meta: { subject: 'home' ,action: 'view'}
    },
    {
      name: 'Leads',
      path: '/leads',
      component: () => import('@/pages/lead/LeadList.vue'),
      meta: { subject: 'lead' ,action: 'view'}
    }
  ]
};

export default MainRoutes;
