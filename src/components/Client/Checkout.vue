<template>
  <div class="container">
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
      <div class="col-10">
        <orderProcess>
          <i class="far fa-check-circle" slot="change1"></i>
          <h6
            class="border border-primary bg-primary text-white text-center rounded py-2"
            slot="change2"
          >
            2.填寫訂單資料
            <i class="far fa-circle"></i>
          </h6>
        </orderProcess>
      </div>
      <div class="col-md-10">
        <div class="row mb-6">
          <div class="col-md-7 checkout mt-4">
            <h2 class="font-weight-bold">訂單資訊</h2>
            <form @submit.prevent="createOrder">
              <div class="form-group mt-4">
                <label for="nameInput">收件人姓名</label>
                <input
                  name="name"
                  type="text"
                  class="form-control rounded-0 border-primary"
                  :class="{ 'is-invalid': errors.has('name') }"
                  id="nameInput"
                  aria-describedby="nameImput"
                  placeholder="請輸入姓名"
                  v-model="form.user.name"
                  v-validate="'required'"
                />
                <span class="text-danger" v-if="errors.has('name')"
                  >請輸入姓名</span
                >
              </div>
              <div class="form-group">
                <label for="emailInput">Email</label>
                <input
                  name="email"
                  type="email"
                  class="form-control"
                  id="emailInput"
                  :class="{ 'is-invalid': errors.has('email') }"
                  aria-describedby="emailHelp"
                  placeholder="請輸入Email"
                  v-model="form.user.email"
                  v-validate="'required|email'"
                />
                <span class="text-danger" v-if="errors.has('email')">{{
                  errors.first("email")
                }}</span>
              </div>
              <div class="form-group">
                <label for="phoneInput">收件人電話</label>
                <input
                  :class="{ 'is-invalid': errors.has('tel') }"
                  name="tel"
                  type="tel"
                  class="form-control"
                  id="phoneInput"
                  aria-describedby="phoneImput"
                  placeholder="請輸入電話"
                  v-model="form.user.tel"
                  v-validate="'required'"
                />
                <span class="text-danger" v-if="errors.has('tel')"
                  >請輸入電話</span
                >
              </div>
              <div class="form-group">
                <label for="addressInput">收件人地址</label>
                <input
                  :class="{ 'is-invalid': errors.has('address') }"
                  name="address"
                  type="text"
                  class="form-control rounded-0"
                  id="addressInput"
                  aria-describedby="addressImput"
                  placeholder="請輸入地址"
                  v-model="form.user.address"
                  v-validate="'required'"
                />
                <span class="text-danger" v-if="errors.has('address')"
                  >請輸入地址</span
                >
              </div>
              <div class="form-group">
                <label for="paySelect">付款方式</label>
                <select
                  name="pay"
                  id="paySelect"
                  class="form-control rounded-0"
                  required="required"
                  v-model="form.user.pay"
                >
                  <option value="" disabled>請選擇付款方式</option>
                  <option value="貨到付款">貨到付款</option>
                  <option value="ATM">ATM</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="ApplePay">ApplePay</option>
                  <option value="GooglePay">GooglePay</option>
                </select>
              </div>
              <div class="form-group">
                <label for="message">留言</label>
                <textarea
                  class="form-control"
                  id="message"
                  cols="30"
                  rows="5"
                  v-model="form.message"
                  placeholder="歡迎留下備註"
                ></textarea>
              </div>
              <div class="text-right mb-3 mb-md-0">
                <input
                  type="submit"
                  value="送出訂單"
                  class="btn btn-outline-primary"
                />
              </div>
            </form>
          </div>
          <div class="col-md-5 checkout">
            <div class="border border-primary px-6 py-7 mt-md-4 sticky-top">
              <h2 class="h3 font-weight-bold">訂單明細</h2>
              <div class="d-flex justify-content-between mb-2" v-for="(order,key) in cartProducts.carts" :key="key">
                <div class="d-flex">
                  <img :src="order.product.imageUrl" class="checkout-orders-img" />
                  <div class="ml-3">
                    <h5 class="checkout-orders-title">{{order.product.title}}</h5>
                    <span>{{order.product.price | currency}} / {{order.product.unit}}</span>
                  </div>
                </div>
                <span class="ml-2">x{{order.qty}}</span>
              </div>
              <hr class="border-primary">
              <div class="d-flex justify-content-between">
                <span>小計</span>
                <span>NT {{cartProducts.total | currency}}</span>
              </div>
              <div class="d-flex justify-content-between" v-if="cartProducts.total !== cartProducts.final_total">
                <span>折扣</span>
                <span>- NT {{cartProducts.total - cartProducts.final_total | currency}}</span>
              </div>
              <div class="input-group mt-4">
                <input
                  type="text"
                  class="border-primary form-control rounded-0"
                  placeholder="請輸入優惠碼"
                  aria-label="請輸入優惠碼"
                  aria-describedby="button-addon2"
                  v-model="coupon_code"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary rounded-0"
                    type="button"
                    id="button-addon2"
                    @click="addCouponCode"
                  >
                    套用優惠碼
                  </button>
                  </div>
              </div>
              <hr class="border-primary">
              <div class="d-flex justify-content-between">
                <span class="h3">總計</span>
                <span class="h3">NT {{cartProducts.final_total | currency}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import orderProcess from "@/components/components/orderProcess";

export default {
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
          pay:"",
        },
        message: "",
      },
      cartProducts: {},
      isLoading:false,
      coupon_code:""
    };
  },
  methods: {
    createOrder() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.$http.post(api, { data: order }).then((res) => {
            if (res.data.success) {
              vm.$router.push(
                `/customerCheckOut/${res.data.orderId}`
              );
            }
          });
        } else {
          alert("欄位不完整，請填寫正確資料");
        }
      });
    },
    getCartProducts() {
      //取得購物車
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true
      this.$http.get(api).then((res) => {
        vm.cartProducts = res.data.data;
        vm.isLoading = false
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
        console.log(res)
        vm.isLoading = false
      });
    },
  },
  components: {
    orderProcess,
  },
  created() {
    this.getCartProducts();
  },
};
</script>