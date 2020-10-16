import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home'
import dashboard from '@/components/dashboard'
import login from '@/components/pages/login'
import products from '@/components/products'

Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: home,
    //   meta: { requiresAuth: true }
    // },
    {
      path: '/',
      name: 'Login',
      component: login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: dashboard,
      children: [
        {
          path: '',
          name: 'Products',
          component: products,
          meta: { requiresAuth: true },
        },
      ]
    },
  ]
})
