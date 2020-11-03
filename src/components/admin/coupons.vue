<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary mt-4" @click="openModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>優惠碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th width="150">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date | date }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未起用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteModel(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :pages="pagination"
      @page="getCoupons"
      v-if="pagination.total_pages >= 1"
    ></Pagination>
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">新增優惠券</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                type="date"
                class="form-control"
                id="due_date"
                v-model="due_date"
              />
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="tempCoupon.percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              關閉
            </button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delCouponModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">
              <span>刪除優惠券</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="delCoupon(tempCoupon.id)"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "@/components/components/pagination";

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
      isLoading: false,
      isNew: false,
      due_date: new Date(),
    };
  },
  components: {
    //載入元件
    Pagination,
  },
  watch: {//監聽
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);//Math.flooer 取小於這個數的最大整數
      vm.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    getCoupons(page = 1) {
      //更新取得優惠券內容
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        vm.coupons = res.data.coupons;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      });
    },
    openModal(isNew, item) {
      //打開新增或是編輯優惠券modal
      const vm = this;
      $("#couponModal").modal("show");
      if (isNew) {
        vm.tempCoupon = {};
        vm.isNew = true;
      } else if (!isNew) {
        vm.tempCoupon = Object.assign({}, item); //Object.assign會將值寫到新的物件
        vm.isNew = false;
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000)
          .toISOString()
          .split("T");//分割切割
        vm.due_date = dateAndTime[0];
      }
    },
    updateCoupon() {
      //新增或是編輯優惠券
      let api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        //當vm.isNew = false
        api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = "put";
        vm.due_date = new Date(vm.tempCoupon.due_date * 1000);
      }

      this.$http[httpMethod](api, { data: vm.tempCoupon }).then((res) => {
        if (res.data.success) {
          $("#couponModal").modal("hide");
          vm.getCoupons();
        } else {
          $("#couponModal").modal("hide");
          vm.getCoupons();
        }
      });
    },
    deleteModel(item) {
      //打開刪除model
      $("#delCouponModal").modal("show");
      this.tempCoupon = item;
    },
    delCoupon(id) {
      //刪除優惠券
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon/${id}`;
      this.$http.delete(api, { data: vm.tempCoupon }).then((response) => {
        if (response.data.success) {
          $("#delCouponModal").modal("hide");
          this.getCoupons();
        }
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>