// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap'
import App from './App';
import router from './router';
// import jquery from 'jquery';


Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

axios.defaults.withCredentials = true;
// window.$ = jquery;
/* eslint-disable no-new */

// Vue.filter("currency", (n) => {
//   //這邊的n是 item.icash 傳入的
//   return n.toFixed(2).replace(/./g, function (c, i, a) {
//     return i && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
//   });
// });
// Vue.filter("dollor", (n) => `$ ${n}`);


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
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
      }else {
        next({
          path:'/',
        })
      }
    });
  } else {
    next()
  }
})