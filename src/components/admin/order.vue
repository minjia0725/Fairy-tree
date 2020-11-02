<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4 text-nowrap table-responsive-md">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Orders" :key="item.id">
          <td>{{item.create_at | date}}</td>
          <td>{{item.user.email}}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量 {{ product.qty }} {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">
            {{ item.total | currency }}
          </td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未啟用</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "@/components/components/pagination";

export default {
  data() {
    return {
      Orders: [],
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getOrder(page = 1) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        console.log(res.data);
        vm.Orders = res.data.orders
        vm.pagination = res.data.pagination
      });
    },
  },
  created() {
    this.getOrder();
  },
};
</script>