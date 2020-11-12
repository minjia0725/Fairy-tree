export default {
  methods: {
    goToCart (id, qty = 1) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      const addtoCartIndex = vm.cartProductsID.indexOf(id)
      if (addtoCartIndex === -1) {
        this.$http.post(api, { data: cart }).then((res) => {
          vm.isLoading = false
          vm.$router.push('/cart')
        })
      } else {
        vm.$router.push('/cart')
      }
    }
  }
}
