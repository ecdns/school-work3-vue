import { useResource } from "src/composables/resources";
import { useAuthStore } from "src/stores/auth";
import { Screen } from "quasar";

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

const redirectIfNoProject = () => {
  const projects = useResource('project')
  projects.list().then((res) => {
    if (res.data.length <= 0) next("/projects")
  })
}

const routes = [
  {
    path: "/login",
    component: () => import(`../pages/Login.vue`),
    beforeEnter: redirectIfAuthenticated
  },
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: '',
        component: () => import('../pages/IndexPage.vue')
      },
      {
        path: 'projects',
        component: () => import('pages/Projects.vue'),
        beforeEnter: ifAuthenticated,
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
            component: () => import('pages/projects/_id/index.vue'),
            beforeEnter: redirectIfNoProject
          }
        ]
      },
      {
        path: 'chat',
        component: () => import('pages/Chat.vue'),
        beforeEnter: ifAuthenticated,
        children: [
          {
            path: '',
            component: () => import('pages/chat/index.vue')
          },
          {
            path: ':id',
            component: () => import('pages/chat/_id/index.vue')
          }
        ]
      },
      {
        path: 'products',
        component: () => import('pages/Products.vue'),
        beforeEnter: ifAuthenticated,
        children: [
          {
            path: '',
            component: () => import('pages/products/index.vue')
          },
          {
            path: ':id',
            component: () => import('pages/products/_id/index.vue')
          }
        ]
      },
      {
        path: 'customers',
        component: () => import('src/pages/Customers.vue'),
        beforeEnter: ifAuthenticated,
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
        beforeEnter: ifAuthenticated,
        children: [
          {
            path: '',
            component: () => import('pages/admin/index.vue')
          },
          {
            path: 'users/:id',
            component: () => import('pages/admin/_id/index.vue')
          }
        ]
      },
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
      },
    ]
  },
]

export default routes
