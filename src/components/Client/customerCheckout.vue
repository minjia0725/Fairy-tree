<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="my-5 row justify-content-center" v-if="!isLoading">
      <div class="col-10">
        <orderProcess>
          <i class="far fa-check-circle" slot="change1"></i>
          <h6
            class="border border-primary bg-primary text-white text-center rounded py-2"
            slot="change2"
          >
            2.填寫訂單資料
            <i class="far fa-check-circle"></i>
          </h6>
          <h6 class="border border-primary bg-primary text-white text-center rounded py-2"
            slot="change3"
          >
            3.付款 & 完成
            <i class="far fa-circle" v-if="!order.is_paid"></i>
            <i class="far fa-check-circle" v-else></i>
          </h6>
        </orderProcess>
      </div>
      <form class="col-md-10 mt-4" @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">
                {{ item.qty }}/{{ item.product.unit }}
              </td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ order.total }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款方式</th>
              <td>{{ order.user.pay }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import orderProcess from "@/components/components/orderProcess";

export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: "",
      isLoading: false,
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        vm.order = res.data.order;
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          this.getOrder();
        }
      });
    },
  },
  components: {
    orderProcess,
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>