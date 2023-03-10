
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'projects',
        component: () => import('pages/Projects.vue')
      },
      {
        path: 'chat',
        component: () => import('pages/Chat.vue')
      },
      {
        path: 'products',
        component: () => import('pages/Products.vue')
      },
      {
        path: 'customers',
        component: () => import('pages/Customers.vue')
      },      
      {
        path: 'admin',
        component: () => import('pages/Projects.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
