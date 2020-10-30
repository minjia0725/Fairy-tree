<template>
  <div class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-dark w-100 navbar-bg">
      <router-link to="/">
        <h1 class="h2 text-white">FAIRY TREE</h1>
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
        <ul class="navbar-nav ml-auto h6 font-weight-bold">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/customerProducts"
              >商品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/favorites"
              >收藏清單
              <i class="far fa-heart"></i>
            </router-link>
          </li>
          <li class="nav-item navbar-cart">
            <router-link class="nav-link" to="/cart">
              購物車
              <i class="fas fa-shopping-cart"></i>
              <span v-if="cartLength">({{ cartLength }})</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login"
              >後台登入
              <i class="fas fa-user-cog"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: "",
    };
  },
  methods: {
    getCartLength() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      let carts = [];
      this.$http.get(api).then((res) => {
        carts = res.data.data.carts;
        vm.carts = carts;
      });
    },
  },
  computed: {
    cartLength() {
      const vm = this;
      vm.getCartLength();
      return vm.carts.length;
    },
  },
  created() {
    this.getCartLength();
  },
};
</script>