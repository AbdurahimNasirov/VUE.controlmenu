import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: { layout: 'Main' },
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
    path: '/login',
    name: 'Login',
    meta: { layout: 'Auth' },
    component: () => import('@/components/Auth/Login.vue')
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'Main' },
    component: () => import('@/views/history/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
