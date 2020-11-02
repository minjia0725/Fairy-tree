import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import backstage from '@/components/admin/Backstage'
import login from '@/components/admin/login'
import products from '@/components/admin/products'
import coupons from '@/components/admin/coupons'
import order from '@/components/admin/order'
//客戶端
import home from '@/components/Client/home'
import customerProducts from '@/components/Client/customerProducts'
import customerProduct from '@/components/Client/customerProduct'
import cart from '@/components/Client/cart'
import checkOut from '@/components/Client/Checkout'
import customerCheckOut from '@/components/Client/customerCheckout'
import favorites from '@/components/Client/favorites'





Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  linkActiveClass:"active",
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: '',
      component: index,
      children: [
        {
          path: '',
          name: 'Home',
          component: home
        },
        {
          path: 'customerProducts',
          name: 'CustomerProducts',
          component: customerProducts,
        },
        {
          path: 'customerProduct/:productId',
          name: 'CustomerProduct',
          component: customerProduct,
        },
        {
          path: 'favorites',
          name: 'Favorites',
          component: favorites,
        },
        {
          path: 'cart',
          name: 'Cart',
          component: cart,
        },
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
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/admin',
      name: 'admin',
      component: backstage,
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
      component: backstage,
      children: [
        
        
      ]
    },
  ]
})
