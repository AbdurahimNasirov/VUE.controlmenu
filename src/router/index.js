import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: { layout: 'Main', auth: true },
    component: () => import('../views/Home.vue'),
    children: [{
      path: '',
      name: 'Categories',
      component: () => import('../components/Categories/CardsList.vue')
    },
    {
      path: '/category/:categoryName',
      name: 'Products',
      component: () => import('../components/Products/ProductsList.vue')
    }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'Auth' },
    component: () => import('../components/Auth/Login.vue')
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'Main', auth: true },
    component: () => import('../views/History.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
