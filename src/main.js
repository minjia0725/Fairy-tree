import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import dateFilter from '@/filters/date'
import currencyFilter from '@/filters/currency'
import VeeValidate from 'vee-validate'
import VueI18n from 'vue-i18n'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import AOS from 'aos'
import 'aos/dist/aos.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@/assets/js/bus'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
AOS.init()
Vue.use(VueAwesomeSwiper)
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW
  }
})
Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)

axios.defaults.withCredentials = true
// window.$ = jquery
/* eslint-disable no-new */

new Vue({
  i18n,
  router,
  components: { App },
  template: '<App/>',
  created () {
    AOS.init({
      offset: 120,
      once: true,
      duration: 1500
    })
  },
  render: h => h(App)
}).$mount('#app')
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/'
        })
      }
    })
  } else {
    next()
  }
})
