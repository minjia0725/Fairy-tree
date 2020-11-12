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
    <div>
      <div
        class="product-bgi bg-cover d-flex-center flex-column"
        style="
          background-image: url('https://ibighit.com/bts/images/bts/schedule/schedule-kv.jpg');
        "
      >
        <h2 class="product-bgi-text font-weight-bold mb-0 text-white">
          {{ filter || "所有商品" }}
        </h2>
      </div>
    </div>
    <div class="container mt-6">
      <div class="row">
        <div class="col-sm-4 col-lg-3 mb-4 mb-md-0 product">
          <div class="list-group rounded-0 sticky-top">
            <a
              href="#"
              class="list-group-item list-group-item-action border-primary py-2 h4 mb-0 text-decoration-none"
              :class="{ active: filter == '' }"
              @click.prevent="
                filter = '';
                getItem(filter);
              "
            >
              所有商品
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action border-primary py-2 h4 mb-0 text-decoration-none"
              v-for="item in column"
              :class="{ active: filter == item }"
              :key="item"
              @click.prevent="
                filter = item;
                getItem(filter);
              "
            >
              {{ item }} （{{ getCount[item] }}）
            </a>
          </div>
        </div>
        <div class="col-sm-8 col-lg-9">
          <div class="form-row">
            <div class="col-12">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <div>
                  <input
                    type="text"
                    class="form-control rounded-0"
                    placeholder="Search："
                    aria-describedby="basic-addon1"
                    v-model="filterText"
                  />
                </div>
                <ul class="product-group border border-primary mb-0 py-1 px-2">
                  <li class="product-bgi-text">
                    <a
                      class="h5 product-bgi-text-style"
                      href="#"
                      @click.prevent=""
                      id="moneyDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      >商品排序 <i class="fas fa-sort"></i
                    ></a>
                    <div
                      class="dropdown-menu rounded-0 py-0 border-bottom-0 border-primary"
                      aria-labelledby="moneyDropdown"
                    >
                      <a
                        href="#"
                        class="dropdown-item pl-1 product-dropdown-item border-bottom border-primary"
                        @click.prevent="sort = true"
                      >
                        <i class="fas fa-sort-numeric-down-alt"></i>

                        價格高到低</a
                      >
                      <a
                        href="#"
                        class="dropdown-item pl-1 product-dropdown-item border-bottom border-primary"
                        @click.prevent="sort = false"
                      >
                        <i class="fas fa-sort-numeric-up-alt"></i>
                        價格低到高</a
                      >
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="col-12 col-md-6 col-lg-4 mb-4"
              v-for="(item, key) in filterData"
              :key="key"
            >
              <div
                class="card rounded-0 border-0 bg-transparent h-100 product-item-style"
              >
                <div
                  class="bg-cover product-card-img"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                >
                  <div
                    class="product-card-favorite text-danger"
                    @click="addfavorite(item.id)"
                  >
                    <i
                      class="far fa-heart"
                      v-if="!favorites.includes(item.id)"
                    ></i>
                    <i class="fas fa-heart" v-else></i>
                  </div>
                  <router-link :to="`/customerProduct/${item.id}`" tag="div">
                    <div class="d-flex-center w-100 product-card-box">
                  </div>
                  </router-link>
                </div>
                <div
                  class="card-body bg-primary px-3 py-2 pb-3 d-flex flex-column justify-content-between"
                >
                  <div class="text-white">
                    <h6 class="product-title text-white font-weight-bold mb-3">
                      {{ item.title }}
                    </h6>
                  </div>
                  <div class="">
                    <div>
                      <div
                        class="d-flex justify-content-between align-items-end border-top"
                      >
                        <del
                          class="text-third product-origin_price font-weight-bold"
                          >{{ item.origin_price | currency }}</del
                        >
                        <span class="text-white h4 mb-0 font-weight-bold"
                          ><span class="h5 mb-0">SALE</span>
                          {{ item.price | currency }}</span
                        >
                      </div>
                    </div>
                    <div class="ml-auto mt-2">
                      <button
                        type="button"
                        class="btn btn-block product-goCart btn-sm rounded-0"
                        @click="addtoCart(item.id)"
                      >
                        <i
                          class="fas fa-spinner fa-spin"
                          v-if="status.loadingItem === item.id"
                        ></i>
                        加入購物車
                      </button>
                      <button
                        class="px-4 btn-block btn btn-danger btn-sm rounded-0"
                        @click="goToCart(item.id)"
                      >
                        直接購買
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
  name: 'CustomerProducts',
  data () {
    return {
      productAll: [],
      column: [],
      columnAll: [],
      counts: {},
      filter: '',
      filterText: '',
      favorites: JSON.parse(localStorage.getItem('addFavoriteID')) || [],
      sort: true,
      isLoading: false
    }
  },
  mixins: [addtoCart, goToCart, getCartProducts],
  methods: {
    getProductall () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        vm.productAll = res.data.products
        vm.column = [...new Set(vm.productAll.map((item) => item.category))]
        vm.columnAll = vm.productAll.map((item) => item.category)
        vm.isLoading = false
      })
    },
    addfavorite (id) {
      const vm = this
      const favoriteIndex = vm.favorites.indexOf(id)
      if (favoriteIndex === -1) {
        vm.favorites.push(id)
        vm.$swal.fire({
          position: 'center',
          width: '20rem',
          icon: 'success',
          title: '已加入收藏',
          showConfirmButton: false,
          timer: 1000
        })
      } else {
        vm.favorites.splice(favoriteIndex, 1)
        vm.$swal.fire({
          position: 'center',
          width: '20rem',
          icon: 'success',
          title: '已移除收藏',
          showConfirmButton: false,
          timer: 1000
        })
      }
      localStorage.setItem('addFavoriteID', JSON.stringify(vm.favorites))
    },
    getCategory () {
      const vm = this
      if (vm.$route.query.category) {
        vm.filter = vm.$route.query.category
      }
    },
    getItem (title) {
      const vm = this
      vm.filter = title
      if (vm.$route.query.category) {
        vm.$router.push('/customerProducts')
      }
    }
  },
  computed: {
    getCount () {
      const vm = this
      vm.columnAll.forEach((x) => {
        vm.counts[x] = (vm.counts[x] || 0) + 1
      })
      return vm.counts
    },
    filterProducts () {
      const vm = this
      return vm.productAll.filter((index) => {
        return index.category.match(vm.filter)
      })
    },
    sortProducts () {
      const vm = this
      return vm.filterProducts.sort((a, b) => {
        if (vm.sort) {
          return b.price - a.price
        } else if (!vm.sort) {
          return a.price - b.price
        }
      })
    },
    filterData () {
      const vm = this
      return vm.sortProducts.filter((item) => {
        return item.title.match(
          vm.filterText.toUpperCase(),
          vm.filterText.toUpperCase()
        )
      })
    }
  },
  created () {
    this.getProductall()
    this.getCategory()
  }
}
</script>
