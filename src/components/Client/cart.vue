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
    <div class="container">
      <div class="row mt-4 justify-content-center" v-if="cartProductsLen > 0">
        <div class="col-10">
          <orderProcess></orderProcess>
        </div>
        <div class="col-md-10 mt-4">
          <div class="table-responsive">
            <table class="carts table table-hover">
              <thead>
                <tr>
                  <th width="150" class="d-none d-md-table-cell">縮圖</th>
                  <th col>品名</th>
                  <th width="100" class="text-nowrap text-center">數量</th>
                  <th col class="text-right">單價</th>
                  <th col class="text-center">刪除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartProducts.carts" :key="item.id">
                  <td class="d-none d-md-table-cell py-2">
                    <img
                      class="carts-img border border-primary"
                      :src="item.product.imageUrl"
                      alt=""
                    />
                  </td>
                  <td class="align-middle">
                    <h4 class="h6 mb-0 carts-title">
                      {{ item.product.title }}
                    </h4>
                  </td>
                  <td class="align-middle text-center">
                    <i class="fas fa-minus carts-addordel" @click="changeNum(item.product.id,item.id,item.qty-1)"></i>
                    <span class="px-2">{{item.qty}}</span>
                    <i class="fas fa-plus carts-addordel" @click="changeNum(item.product.id,item.id,item.qty+1)"></i>
                  </td>
                  <td class="text-right align-middle">
                    {{ item.final_total | currency }}
                  </td>
                  <td class="text-center align-middle">
                    <button
                      class="btn btn-outline-secondary rounded-circle"
                      @click="delCartProduct(item.id)"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="text-right">
                  <td class="d-none d-md-table-cell"></td>
                  <td colspan="3">總計</td>
                  <td>{{ cartProducts.total | currency }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="row justify-content-between">
            <div class="col-12">
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <router-link to="/cart" class="h4 mb-0">
                  <i class="fas fa-chevron-left mr-1"></i>
                  繼續購物
                </router-link>
                <router-link
                  tag="input"
                  to="/Checkout"
                  type="button"
                  class="btn btn-outline-secondary"
                  value="填寫訂單資料"
                >
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4" v-else>
        <div>
          <div class="text-center my-10">
            <h4 class="h3">您的購物車目前是空的！</h4>
            <router-link to=/customerProducts class="text-decoration-none h4">
              <i class="fas fa-reply"></i>
              來去購物！
            </router-link>
          </div>
          <section class="container mb-8">
            <h3 class="mb-0">商品推薦</h3>
            <hr class=" border-primary" />
            <div class="row">
              <div class="col-md-4 mb-4 mb-md-0" v-for="(item, id) in guided" :key="id" data-aos="zoom-out" data-aos-delay="100">
                <div
                  :style="{ backgroundImage: `url(${item.image})` }"
                  class="bg-cover position-relative home-second-bgi"
                  >
              <div class="home-border text-white h3 font-weight-bold">
                <router-link
                  class="d-flex-center h-100 home-product-text" tag="div" :to="{path:'/customerProducts', query: {category: item.title}}"
                >
                  <span>{{ item.title }}</span>
                </router-link>
                    </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderProcess from "@/components/components/orderProcess";
export default {
  data() {
    return {
      cartProducts: [],
      cartProductsLen: "",
      isLoading: false,
      guided: [
        {
          title: "BTS",
          image:
            "https://ibighit.com/bts/images/bts/discography/2_cool_4_school/album-cover.jpg",
        },
        {
          title: "TWICE",
          image:
            "https://lv2-cdn.azureedge.net/twice/ff169a51fb0e4c73aab0afdb1c196337-TWICE%20EYES%20WIDE%20OPEN_ONLINECOVER.jpg",
        },
        {
          title: "STRAY KIDS",
          image: "https://lv2-cdn.azureedge.net/straykids/TOP-English_ver.jpg",
        },
      ],
    };
  },

  methods: {
    getCartProducts() {
      //取得購物車
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        vm.cartProducts = res.data.data;
        vm.cartProductsLen = vm.cartProducts.carts.length;
        vm.isLoading = false;
      });
    },
    delCartProduct(id) {
      //刪除購物車
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      this.$http.delete(api).then((res) => {
        vm.getCartProducts();
      });
    },
    changeNum(dataid, delid, qty = 1) {
      const vm = this;
      vm.delCartProduct(delid);
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const cart = {
        product_id: dataid,
        qty,
      };
      this.$http.post(api, { data: cart }).then((res) => {
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