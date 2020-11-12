<template>
  <div class="sticky-top">
    <nav
      class="navbar navbar-expand-lg navbar-dark w-100 navbar-bg"
      :class="{ active: isScroll }"
    >
      <div class="container-xl">
        <router-link to="/" class="text-decoration-none">
          <h1 class="h2 text-white mb-0">FAIRY TREE</h1>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav h6 ml-auto font-weight-bold">
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/customerProducts"
                :class="{ 'px-2': !iswidth }"
                ><span>商品列表</span>
                <i class="fas fa-store pl-1" v-if="!iswidth"></i>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ 'px-2': !iswidth }"
                to="/favorites"
              >
                <span>我的收藏</span>
                <i class="far fa-heart pl-1" v-if="!iswidth"></i>
              </router-link>
            </li>
            <li class="nav-item navbar-cart">
              <router-link
                class="nav-link"
                :class="{ 'px-2': !iswidth }"
                to="/cart"
              >
                <span>購物車</span>
                <i class="fas fa-shopping-cart pl-1" v-if="!iswidth"></i>
                <span v-if="cartLength">({{ cartLength }})</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ 'px-2': !iswidth }"
                to="/login"
              >
                <span>後台登入</span>
                <i class="fas fa-user-cog pl-1" v-if="!iswidth"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'CustomerNavber',
  data () {
    return {
      carts: '',
      scroll: '',
      width: '',
      iswidth: false,
      isScroll: false
    }
  },
  methods: {
    getCartLength () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      let carts = []
      vm.$http.get(api).then((res) => {
        carts = res.data.data.carts
        vm.carts = carts
      })
    }
  },
  computed: {
    cartLength () {
      const vm = this
      vm.getCartLength()
      return vm.carts.length
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.scroll = document.documentElement.scrollTop
      if (this.scroll !== 0) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    })
    window.onresize = () => {
      this.width = document.documentElement.clientWidth
      if (this.width > 992) {
        this.iswidth = false
      } else {
        this.iswidth = true
      }
    }
  },
  created () {
    this.getCartLength()
  }
}
</script>
