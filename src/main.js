// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap'
import App from './App';
import router from './router';
import './bus';
import dateFilter from "./components/filters/date"
import currencyFilter from "./components/filters/currency"
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
import zhTW from 'vee-validate/dist/locale/zh_TW'
import AOS from 'aos';
import 'aos/dist/aos.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// import jquery from 'jquery';


Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueI18n);
Vue.use(VueSweetalert2);
AOS.init();
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', //這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})
Vue.component('Loading' ,Loading)
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)


axios.defaults.withCredentials = true;
// window.$ = jquery;
/* eslint-disable no-new */


new Vue({
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created() {
    AOS.init({
      offset: 120,
      once: true,
      duration: 1500,
    })
  },
});
router.beforeEach((to, from, next) => {
  ///to 即將進入的路由，from 要離開的路由，
  // console.log('to', to, 'form', from, 'next', next);
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}api/user/check`;
    axios.post(api).then((response) => {
      // console.log(response.data);
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/',
        })
      }
    });
  } else {
    next()
  }
})