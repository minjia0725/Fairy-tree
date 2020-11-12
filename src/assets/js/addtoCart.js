export default {
  data () {
    return {
      status: {
        loadingItem: ''
      }
    }
  },
  methods: {
    addtoCart (id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      const addtoCartIndex = vm.cartProductsID.indexOf(id)
      if (addtoCartIndex === -1) {
        this.$http.post(api, { data: cart }).then((res) => {
          vm.status.loadingItem = ''
          this.$swal.fire({
            position: 'center',
            width: '20rem',
            icon: 'success',
            title: '成功加入購物車',
            showConfirmButton: false,
            timer: 800
          })
          vm.getCartProducts()
        })
      } else {
        vm.status.loadingItem = ''
        this.$swal.fire({
          position: 'center',
          width: '22rem',
          icon: 'warning',
          title: '購物車有相同商品',
          showConfirmButton: false,
          timer: 800
        })
      }
    }
  }
}
