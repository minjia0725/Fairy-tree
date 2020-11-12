export default {
  data () {
    return {
      cartProducts: [],
      cartProductsLen: '',
      cartProductsID: []
    }
  },
  methods: {
    getCartProducts () {
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((res) => {
        vm.cartProducts = res.data.data
        vm.cartProductsLen = vm.cartProducts.carts.length
        vm.cartProductsID = [
          ...new Set(vm.cartProducts.carts.map((item) => item.product_id))
        ]
        vm.isLoading = false
      })
    }
  },
  created () {
    this.getCartProducts()
  }
}
