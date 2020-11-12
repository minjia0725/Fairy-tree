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
          <td>{{ item.create_at | date }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量 {{ product.qty }}
                {{ product.product.unit }}
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
    <pagination :pages="pagination"></pagination>
  </div>
</template>

<script>
import pagination from '@/components/Pagination.vue'

export default {
  name: 'Order',
  data () {
    return {
      Orders: [],
      pagination: {},
      isLoading: false
    }
  },
  components: {
    pagination
  },
  methods: {
    getOrder (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        vm.isLoading = false
        vm.Orders = res.data.orders
        vm.pagination = res.data.pagination
      })
    }
  },
  created () {
    this.getOrder()
  }
}
</script>
