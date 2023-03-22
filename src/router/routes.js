
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
        component: () => import('pages/Projects.vue'),
        children: [
          {
            path: ':id',
            component: () => import('pages/projects/_id.vue')
          }
        ]
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
        component: () => import('pages/Admin.vue')
      },
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
      },
    ]
  },
]

export default routes
