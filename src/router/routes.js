import { createRouterLayout } from "vue-router-layout";
import { useAuthStore } from "src/stores/auth";

const RouterLayout = createRouterLayout((layout) => {
  return import(`../layouts/${layout}.vue`);
});

const ifAuthenticated = (to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) {
    authStore.loadUserData().then(() => {
      next();
    })
    return;
  }
  next("/login");
};

const redirectIfAuthenticated = (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    next("/map");
    return;
  }
  next();
};


const routes = [
  {
    path: "/login",
    component: () => import(`../pages/Login.vue`),
  },
  {
    path: "/register",
    component: () => import(`../pages/Register.vue`),
  },
  /*{
    path: "/send-reset-password",
    component: () => import(`../pages/send-reset-password.vue`),
  },
  {
    path: "/reset-password/:token",
    component: () => import(`../pages/reset-password/_token.vue`),
  },*/
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
            path: '',
            component: () => import('pages/projects/index.vue')
          },
          {
            path: 'create',
            component: () => import('pages/projects/create.vue')
          },
          {
            path: ':id',
            component: () => import('pages/projects/_id/index.vue')
          }
        ]
      },
      {
        path: 'chat',
        component: () => import('pages/Chat.vue'),
        children: [
          {
            path: ':id',
            component: () => import('components/Conversation.vue')
          }
        ]
      },
      {
        path: 'products',
        component: () => import('src/pages/Products.vue'),

        children: [
          {
            path:'',
            component: () => import('src/pages/products/index.vue'),
          },
          {
            path:':id',
            component: () => import('pages/products/_id/index.vue'),
            props: route => ({
              id: route.params.id,
              name: route.params.name,
              reference: route.params.reference,
              supplier: route.params.supplier
            })
          }
        ]
      },
      {
        path: 'customers',
        component: () => import('src/pages/Customers.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/customers/index.vue')
          },
          {
            path: ':id',
            component: () => import('pages/customers/_id/index.vue')
          }
        ]
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
