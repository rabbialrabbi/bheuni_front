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
      component: () => import('@/pages/home.vue')
    },
    {
      name: 'Default',
      path: '/dashboard/default',
      component: () => import('@/pages/home.vue')
    },
    {
      name: 'Product List',
      path: '/product/list',
      component: () => import('@/pages/product/ProductList.vue')
    },
    {
      name: 'Supplier List',
      path: '/supplier/list',
      component: () => import('@/pages/supplier/SupplierList.vue')
    },
    {
      name: 'Purchase List',
      path: '/purchase/list',
      component: () => import('@/pages/purchase/PurchaseList.vue')
    },
    {
      name: 'Purchase Item',
      path: '/purchase/:id',
      component: () => import('@/pages/purchase/PurchaseItem.vue')
    },
    {
      name: 'Purchase Create',
      path: '/purchase/create',
      component: () => import('@/pages/purchase/PurchaseCreate.vue')
    },
    {
      name: 'Starter',
      path: '/starter',
      component: () => import('@/views/StarterPage.vue')
    },
  ]
};

export default MainRoutes;
