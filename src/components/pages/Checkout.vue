<template>
  <div>
    <div class="row mt-4 justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="createOrder">
          <div class="form-group mt-4">
            <label for="nameInput">收件人姓名</label>
            <input
              name="name"
              type="text"
              class="form-control"
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
            <span class="text-danger" v-if="errors.has('tel')">請輸入電話</span>
          </div>
          <div class="form-group">
            <label for="addressInput">收件人地址</label>
            <input
              :class="{ 'is-invalid': errors.has('address') }"
              name="address"
              type="text"
              class="form-control"
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
            <label for="message">留言</label>
            <textarea
              class="form-control"
              id="message"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-right">
            <input
              type="submit"
              value="送出訂單"
              class="btn btn-outline-primary"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
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
            if(res.data.success){
              vm.$router.push(`/simulation/customerCheckOut/${res.data.orderId}`)
            }
          });
        } else {
          alert('欄位不完整');
        }
      });
    },
  },
};
</script>