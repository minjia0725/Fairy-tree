import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: '',
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/frontend/Home.vue')
      },
      {
        path: 'customerProducts',
        name: 'CustomerProducts',
        component: () => import('@/views/frontend/CustomerProducts.vue')
      },
      {
        path: 'customerProduct/:productId',
        name: 'CustomerProduct',
        component: () => import('@/views/frontend/CustomerProduct.vue')
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: () => import('@/views/frontend/Favorites.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/frontend/Cart.vue')
      },
      {
        path: 'checkOut',
        name: 'CheckOut',
        component: () => import('@/views/frontend/CheckOut.vue')
      },
      {
        path: 'customerCheckOut/:orderId',
        name: 'CustomerCheckOut',
        component: () => import('@/views/frontend/CustomerCheckOut.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/backend/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/backend/Backstage.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/backend/Products.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('@/views/backend/Coupons.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/backend/Order.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]
const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})
export default router
