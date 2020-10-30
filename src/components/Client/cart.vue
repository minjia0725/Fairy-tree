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
    <div class="row mt-4 justify-content-center">
      <div class="col-md-6">
        <table class="table">
          <thead>
            <tr>
              <th width="50"></th>
              <th>品名</th>
              <th width="120">數量</th>
              <th width="80">單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartProducts.carts" :key="item.id">
              <td>
                <button
                  class="btn btn-outline-danger"
                  @click="delCartProduct(item.id)"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td>{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="text-right">{{ item.final_total | currency }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="text-right">
              <td colspan="3">總計</td>
              <td>{{ cartProducts.total | currency }}</td>
            </tr>
            <tr
              class="text-right text-success"
              v-if="cartProducts.total !== cartProducts.final_total"
            >
              <td colspan="3">折扣價</td>
              <td>{{ cartProducts.final_total | currency }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mt-3">
          <input
            type="text"
            class="form-control"
            placeholder="請輸入優惠碼"
            aria-label="請輸入優惠碼"
            aria-describedby="button-addon2"
            v-model="coupon_code"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              @click="addCouponCode"
            >
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartProducts: [],
      isLoading: false,
      coupon_code: "",
    };
  },
  methods: {
    getCartProducts() {
      //取得購物車
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log(res);
        vm.cartProducts = res.data.data;
        vm.isLoading = false;
      });
    },
    delCartProduct(id) {
      //刪除購物車
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then((res) => {
        vm.getCartProducts();
      });
    },
    addCouponCode() {
      //套用優惠券
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      this.$http.post(api, { data: coupon }).then((res) => {
        vm.getCartProducts();
      });
    },
  },
  created() {
    this.getCartProducts();
  },
};
</script>