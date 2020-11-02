<template>
  <div class="sticky-top">
    <nav class="navbar navbar-expand-lg navbar-dark w-100 navbar-bg">
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
          <ul class="navbar-nav h6 ml-auto mr-10 font-weight-bold">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/customerProducts"
                >商品列表</router-link
              >
            </li>
          </ul>
          <ul class="navbar-nav h6 ml-auto font-weight-bold">
            <li class="nav-item">
              <router-link class="nav-link px-2" to="/favorites">
                <i class="far fa-heart"></i>
              </router-link>
            </li>
            <li class="nav-item navbar-cart">
              <router-link class="nav-link px-2" to="/cart">
                <i class="fas fa-shopping-cart"></i>
                <span v-if="cartLength">({{ cartLength }})</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link px-2" to="/login">
                <i class="fas fa-user-cog"></i>
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