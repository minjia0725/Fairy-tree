<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :loader="'dots'"
      :color="'black'"
      :width="100"
      :background-color="'rgba(148,148,148)'"
    >
    </loading>
    <div class="product-bgi bg-cover d-flex-center flex-column"
    style="
          background-image: url('https://ibighit.com/bts/images/bts/schedule/schedule-kv.jpg');
        "
    >
      <h2 class="product-bgi-text font-weight-bold mb-0 text-white">
        收藏商品
      </h2>
    </div>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-10 mb-4">
          <h3 class="mb-0">我的收藏<span v-if="favoritesIDLength > 0">({{favoritesIDLength}})</span></h3>
          <hr class="my-2 border-primary" />
          <div
            class="d-flex mb-2 px-3 py-3 bg-third rounded"
            data-aos="fade-left" data-aos-delay="200"
            v-for="item in favoritesdata"
            :key="item.id"
          >
            <img class="favorites-img" :src="item.imageUrl" alt="" />
            <div
              class="ml-2 d-flex flex-fill flex-column justify-content-between"
            >
              <div>
                <div class="d-flex justify-content-between">
                  <h4 class="h5 font-weight-bold">{{ item.title }}</h4>
                  <i class="far fa-times-circle favorites-del h4 mb-0" @click="delFavorite(item.id)"></i>
                </div>
                <span class="font-weight-bold"
                  >類別：<span class="badge badge-info align-text-bottom">{{
                    item.category
                  }}</span></span
                >
              </div>
              <div>
                <span class="text-dark favorites-price font-weight-bold">{{
                  item.price | currency
                }}</span>
                <del class="text-black-50 font-weight-bold">{{
                  item.origin_price | currency
                }}</del>
              </div>
              <div class="ml-auto">
                <button class="btn btn-outline-secondary rounded-0" @click="addtoCart(item.id)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  加入購物車
                  </button>
                <button class="px-4 btn btn-secondary rounded-0" @click="goToCart(item.id)">直接購買</button>
              </div>
            </div>
          </div>
          <div class="text-center" v-if="favoritesIDLength === 0">
            <h3>您的收藏列表目前是空的！</h3>
              <router-link to=/customerProducts class="text-decoration-none h4">
              <i class="fas fa-reply"></i>
              逛逛商品
              </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addtoCart from '@/assets/js/addtoCart.js'
import goToCart from '@/assets/js/goToCart.js'
import getCartProducts from '@/assets/js/getCartProducts.js'
export default {
  name: 'Favorites',
  data () {
    return {
      favoritesID: JSON.parse(localStorage.getItem('addFavoriteID')) || [],
      favoritesIDLength: '',
      productAll: {},
      favoritesdata: [],
      isLoading: false,
      status: {
        loadingItem: ''
      }
    }
  },
  mixins: [addtoCart, goToCart, getCartProducts],
  methods: {
    getFavorites () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        vm.productAll = res.data.products
        vm.favoritesIDLength = vm.favoritesID.length
        vm.favoritesdata = vm.productAll.filter((item) => {
          return vm.favoritesID.includes(item.id)
        })
        vm.isLoading = false
      })
    },
    delFavorite (id) {
      const vm = this
      const favoriteIndex = vm.favoritesID.indexOf(id)
      vm.favoritesID.splice(favoriteIndex, 1)
      vm.getFavorites()
      vm.$swal.fire({
        position: 'center',
        width: '20rem',
        icon: 'success',
        title: '已移除收藏',
        showConfirmButton: false,
        timer: 1000
      })
      localStorage.setItem('addFavoriteID', JSON.stringify(vm.favoritesID))
    }
  },
  created () {
    this.getFavorites()
  }
}
</script>
