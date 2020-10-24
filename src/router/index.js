import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import home from '@/components/pages/home'
import dashboard from '@/components/dashboard'
import login from '@/components/pages/login'
import products from '@/components/pages/products'
import coupons from '@/components/pages/coupons'
import order from '@/components/pages/order'
import customerOrders from '@/components/pages/customerOrders'
import cart from '@/components/pages/cart'
import checkOut from '@/components/pages/Checkout'
import customerCheckOut from '@/components/pages/customerCheckout'
import aboutYou from '@/components/aboutYou'


Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '',
          name: 'Home',
          component: home
        },
        {
          path: 'aboutYou',
          name: 'AboutYou',
          component: aboutYou
        },
        {
          path: 'customerOrders',
          name: 'CustomerOrders',
          component: customerOrders,
        },
        {
          path: 'cart',
          name: 'Cart',
          component: cart,
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/admin',
      name: 'admin',
      component: dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: products,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: coupons,
          meta: { requiresAuth: true },
        },
        {
          path: 'order',
          name: 'Order',
          component: order,
          meta: { requiresAuth: true },
        },
      ]
    },
    {
      path: '/simulation',
      name: 'simulation',
      component: dashboard,
      children: [
        
        
        {
          path: 'checkOut',
          name: 'CheckOut',
          component: checkOut,
        },
        {
          path: 'customerCheckOut/:orderId',
          name: 'CustomerCheckOut',
          component: customerCheckOut,
        },
      ]
    },
  ]
})
