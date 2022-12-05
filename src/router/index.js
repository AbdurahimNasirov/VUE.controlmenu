import Vue from 'vue'
import VueRouter from 'vue-router'
import { getAuth } from "firebase/auth";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: { layout: 'Main', auth: true },
    name: 'Main',
    redirect: () => {
      return { name: 'Categories'}
    },
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: '',
        name: 'Categories',
        component: () => import('@/views/categories/index.vue')
      },
      {
        path: '/category/:category_name',
        name: 'Products',
        component: () => import('@/views/products/index.vue')
      }
    ]
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'Main', auth: true },
    component: () => import('@/views/history/index.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'Main', auth: true },
    component: () => import('@/views/profile/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'Auth' },
    component: () => import('@/views/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'Auth' },
    component: () => import('@/views/register.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !currentUser) {
    next('/login')
    Vue.$toast.open({
      message: `Login please`,
      type: "error",
      position: "top",
    });
  } else {
    next()
  }
})

export default router
