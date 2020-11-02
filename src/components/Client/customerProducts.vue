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
    <div>
      <div
        class="product-bgi bg-cover d-flex-center flex-column"
        style="
          background-image: url('https://ibighit.com/bts/images/bts/schedule/schedule-kv.jpg');
        "
      >
        <h2 class="product-bgi-text font-weight-bold mb-0 text-white">
          {{ filter || "所有商品" }}
        </h2>
      </div>
    </div>
    <div class="container mt-6">
      <div class="row">
        <div class="col-sm-4 col-lg-3 mb-4 mb-md-0 product">
          <div class="list-group rounded-0 sticky-top">
            <a
              href="#"
              class="list-group-item list-group-item-action border-primary py-2 h4 mb-0 text-decoration-none"
              :class="{ active: filter == '' }"
              @click.prevent="
                filter = '';
                getItem(filter);
              "
            >
              所有商品
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action border-primary py-2 h4 mb-0 text-decoration-none"
              v-for="item in column"
              :class="{ active: filter == item }"
              :key="item"
              @click.prevent="
                filter = item;
                getItem(filter);
              "
            >
              {{ item }} （{{ getCount[item] }}）
            </a>
          </div>
        </div>
        <div class="col-sm-8 col-lg-9">
          <div class="form-row">
            <div class="col-12">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <div>
                  <input
                    type="text"
                    class="form-control rounded-0"
                    placeholder="Search："
                    aria-describedby="basic-addon1"
                    v-model="filterText"
                  />
                </div>
                <ul class="product-group border border-primary mb-0 py-1 px-2">
                  <li class="product-bgi-text">
                    <a
                      class="h5 product-bgi-text-style"
                      href="#"
                      @click.prevent=""
                      id="moneyDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      >商品排序 <i class="fas fa-sort"></i
                    ></a>
                    <div
                      class="dropdown-menu rounded-0 py-0 border-bottom-0 border-primary"
                      aria-labelledby="moneyDropdown"
                    >
                      <a
                        href="#"
                        class="dropdown-item pl-1 product-dropdown-item border-bottom border-primary"
                        @click.prevent="sort = true"
                      >
                        <i class="fas fa-sort-numeric-down-alt"></i>

                        價格高到低</a
                      >
                      <a
                        href="#"
                        class="dropdown-item pl-1 product-dropdown-item border-bottom border-primary"
                        @click.prevent="sort = false"
                      >
                        <i class="fas fa-sort-numeric-up-alt"></i>
                        價格低到高</a
                      >
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="col-12 col-md-6 col-lg-4 mb-4"
              v-for="(item, key) in filterData"
              :key="key"
            >
              <div
                class="card rounded-0 border-0 bg-transparent h-100 product-item-style"
              >
                <div
                  class="bg-cover product-card-img"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                >
                  <div
                    class="product-card-favorite text-danger"
                    @click="addfavorite(item.id)"
                  >
                    <i
                      class="far fa-heart"
                      v-if="!favorites.includes(item.id)"
                    ></i>
                    <i class="fas fa-heart" v-else></i>
                  </div>
                  <div class="d-flex-center w-100 product-card-btn">
                    <router-link
                      :to="`/customerProduct/${item.id}`"
                      class="btn btn-primary text-decoration-none"
                      >查看更多</router-link
                    >
                  </div>
                </div>
                <div
                  class="card-body bg-secondary px-3 py-2 pb-3 d-flex flex-column justify-content-between"
                >
                  <div class="text-white">
                    <h6 class="product-title text-white font-weight-bold mb-3">
                      {{ item.title }}
                    </h6>
                  </div>
                  <div class="">
                    <div>
                      <div
                        class="d-flex justify-content-between align-items-end border-top"
                      >
                        <del
                          class="text-third product-origin_price font-weight-bold"
                          >{{ item.origin_price | currency }}</del
                        >
                        <span class="text-white h4 mb-0 font-weight-bold"
                          ><span class="h5 mb-0">SALE</span> {{ item.price | currency }}</span
                        >
                      </div>
                    </div>
                    <div class="ml-auto mt-2">
                      <button
                        type="button"
                        class="btn btn-block product-goCart btn-sm rounded-0"
                        @click="addtoCart(item.id)"
                      >
                        <i
                          class="fas fa-spinner fa-spin"
                          v-if="status.loadingItem === item.id"
                        ></i>
                        加入購物車
                      </button>
                      <button
                        class="px-4 btn-block btn btn-danger btn-sm rounded-0"
                        @click="goToCart(item.id)"
                      >
                        直接購買
                      </button>
                    </div>
                  </div>
                </div>
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
import swiper from "@/components/components/swiper";

export default {
  data() {
    return {
      productAll: [],
      cartProducts: [],
      cartProductsID: [],
      column: [], //分類
      columnAll: [],
      counts: {},
      filter: "",
      filterText: "",
      favorites: JSON.parse(localStorage.getItem("addFavoriteID")) || [],
      sort: true,
      status: {
        loadingItem: "",
      },
      isLoading: false,
    };
  },
  components: {
    swiper,
  },
  methods: {
    getProductall() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        vm.productAll = res.data.products;
        vm.column = [...new Set(vm.productAll.map((item) => item.category))];
        vm.columnAll = vm.productAll.map((item) => item.category);
        vm.isLoading = false;
      });
    },
    getCartProducts() {
      //取得購物車
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then((res) => {
        vm.cartProducts = res.data.data;
        vm.cartProductsID = [
          ...new Set(vm.cartProducts.carts.map((item) => item.product_id)),
        ];
      });
    },
    addtoCart(id, qty = 1) {
      //加入購物車
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      let addtoCartIndex = vm.cartProductsID.indexOf(id);
      if (addtoCartIndex === -1) {
        this.$http.post(api, { data: cart }).then((res) => {
          vm.status.loadingItem = "";
          this.$swal.fire({
            position: "center",
            width: "20rem",
            icon: "success",
            title: "成功加入購物車",
            showConfirmButton: false,
            timer: 800,
          });
          vm.getCartProducts()
        });
      } else {
        vm.status.loadingItem = "";
        this.$swal.fire({
          position: "center",
          width: "22rem",
          icon: "warning",
          title: "購物車有相同商品",
          showConfirmButton: false,
          timer: 800,
        });
      }
    },
    addfavorite(id) {
      const vm = this;
      let favoriteIndex = vm.favorites.indexOf(id);
      if (favoriteIndex === -1) {
        vm.favorites.push(id);
        this.$swal.fire({
          position: "center",
          width: "20rem",
          icon: "success",
          title: "已加入收藏",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        vm.favorites.splice(favoriteIndex, 1);
        this.$swal.fire({
          position: "center",
          width: "20rem",
          icon: "success",
          title: "已移除收藏",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      localStorage.setItem("addFavoriteID", JSON.stringify(vm.favorites));
    },
    goToCart(id, qty = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      let addtoCartIndex = vm.cartProductsID.indexOf(id);
      if (addtoCartIndex === -1) {
        this.$http.post(api, { data: cart }).then((res) => {
          vm.isLoading = false;
          vm.$router.push("/cart");
        });
      } else {
        vm.$router.push("/cart");
      }
    },
    getCategory() {
      const vm = this;
      if (vm.$route.query.category) {
        vm.filter = vm.$route.query.category;
      }
    },
    getItem(title) {
      const vm = this;
      vm.filter = title;
      if (vm.$route.query.category) {
        vm.$router.push("/customerProducts");
      }
    },
  },
  computed: {
    getCount() {
      //計算個別商品數量
      const vm = this;
      vm.columnAll.forEach((x) => {
        vm.counts[x] = (vm.counts[x] || 0) + 1;
      });
      return vm.counts;
    },
    filterProducts() {
      //選取過濾商品
      const vm = this;
      return vm.productAll.filter((index) => {
        return index.category.match(vm.filter);
      });
    },
    sortProducts() {
      //排序商品
      const vm = this;
      return vm.filterProducts.sort((a, b) => {
        if (vm.sort) {
          return b.price - a.price;
        } else if (!vm.sort) {
          return a.price - b.price;
        }
      });
    },
    filterData() {
      //即時查詢
      const vm = this;
      return vm.sortProducts.filter((item) => {
        return item.title.match(
          vm.filterText.toUpperCase(),
          vm.filterText.toUpperCase()
        );
      });
    },
  },
  created() {
    this.getProductall();
    this.getCartProducts();
    this.getCategory();
  },
};
</script>