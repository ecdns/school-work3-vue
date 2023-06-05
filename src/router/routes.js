import { createRouterLayout } from "vue-router-layout";
import { useAuthStore } from "src/stores/auth";

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
    next("/");
    return;
  }
  next();
};

const routes = [
  {
    path: "/login",
    component: () => import(`../pages/Login.vue`),
    // beforeEnter: redirectIfAuthenticated
  },
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    // beforeEnter: ifAuthenticated,
    children: [
      {
        path: '',
        component: () => import('../pages/IndexPage.vue')
      },
      {
        path: 'projects',
        component: () => import('pages/Projects.vue'),
        // beforeEnter: ifAuthenticated,
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
        // beforeEnter: ifAuthenticated,
        children: [
          {
            path: ':id',
            component: () => import('components/Conversation.vue')
          }
        ]
      },
      {
        path: 'products',
        component: () => import('pages/Products.vue'),
        // beforeEnter: ifAuthenticated,
      },
      {
        path: 'customers',
        component: () => import('src/pages/Customers.vue'),
        // beforeEnter: ifAuthenticated,
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
        component: () => import('pages/Admin.vue'),
        // beforeEnter: ifAuthenticated
      },
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
      },
    ]
  },
]

export default routes
