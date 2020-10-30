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
      <div class="product-bgi bg-cover d-flex-center flex-column">
        <h2 class="product-bgi-text font-weight-bold mt-10 mb-0 text-white">
          {{ filter || "所有商品" }}
        </h2>
        <div>
          <ul class="product-group d-flex-center px-0">
            <li class="px-3 pt-3 product-bgi-text">
              <a
                href="#"
                class="h5 text-white product-bgi-text-style"
                @click.prevent="
                  filter = '';
                  changeproduct = false;
                "
                >所有商品</a
              >
            </li>
            <li class="px-3 pt-3 product-bgi-text">
              <a
                href="#"
                class="h5 dropdown-toggle text-white product-bgi-text-style"
                id="productDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click.prevent=""
                >商品分類</a
              >
              <div class="dropdown-menu rounded-0 py-0 border-bottom-0 border-primary" aria-labelledby="productDropdown">
                <a
                  class="dropdown-item product-dropdown-item border-bottom border-primary"
                  v-for="item in column"
                  :key="item"
                  @click.prevent="
                    changeproduct = true;
                    filter = item;
                  "
                >
                  {{ item }} （{{ getCount[item] }}）
                </a>
              </div>
            </li>
            <li class="px-3 pt-3 product-bgi-text">
              <a
                class="h5 dropdown-toggle text-white product-bgi-text-style"
                href="#"
                @click.prevent=""
                id="moneyDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                >商品排序</a
              >
              <div class="dropdown-menu rounded-0 py-0 border-bottom-0 border-primary" aria-labelledby="moneyDropdown">
                <a href="#" class="dropdown-item product-dropdown-item border-bottom border-primary" @click.prevent="sort = true"
                  >價格高到低</a
                >
                <a href="#" class="dropdown-item product-dropdown-item border-bottom border-primary" @click.prevent="sort = false"
                  >價格低到高</a
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container mt-6">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <template>
              <div
                class="col-md-4 mb-4"
                v-for="(item, key) in sortProducts"
                :key="key"
              >
                <div
                  class="card border-0 bg-transparent h-100 product-item-style"
                >
                  <div
                    class="bg-cover rounded-top product-card-img"
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
                    <div
                      class="d-flex-center w-100 rounded-top product-card-btn"
                    >
                      <router-link
                        :to="`/customerProduct/${item.id}`"
                        class="btn btn-primary text-decoration-none"
                        >查看更多</router-link
                      >
                    </div>
                  </div>
                  <div
                    class="card-body px-3 py-2 pb-3 d-flex flex-column justify-content-between"
                  >
                    <div class="">
                      <!-- <span class="badge badge-secondary float-right ml-2">{{
                        item.category
                      }}</span> -->
                      <h6 class="card-title text-secondary font-weight-bold">
                        {{ item.title }}
                      </h6>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center text-right"
                    >
                      <div>
                        <button
                          type="button"
                          class="btn btn-outline-secondary btn-sm"
                          @click="addtoCart(item.id)"
                        >
                          <i class="fas fa-shopping-basket"></i>
                        </button>
                        <i
                          class="fas fa-spinner fa-spin"
                          v-if="status.loadingItem === item.id"
                        ></i>
                      </div>
                      <div v-if="item.price">
                        <del class="text-black-50 font-weight-bold">{{
                          item.origin_price | currency
                        }}</del>
                        <span class="text-dark h5 font-weight-bold">{{
                          item.price | currency
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ product.title }}</span>
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
            <img :src="product.imageUrl" class="img-fluid" alt="" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!product.price">
                {{ product.origin_price | currency }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price | currency }}元</del
              >
              <div class="h5" v-if="product.price">
                現在只要 {{ product.price | currency }} 元
              </div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計<strong>{{ product.num * product.price }}</strong
              >元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id, product.num)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div> -->
    <div class="position-relative">
      <div class="product-goCart rounded-circle"></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
// import Pagination from "@/components/pagination";
import swiper from "@/components/swiper";

export default {
  data() {
    return {
      productID: "",
      productAll: [],
      column: [], //分類
      columnAll: [],
      counts: {},
      // pagination: {},
      filter: "",
      favorites: JSON.parse(localStorage.getItem("addFavoriteID")) || [],
      sort: true,
      status: {
        loadingItem: "",
      },
      isLoading: false,
      changeproduct: false,
    };
  },
  components: {
    // Pagination,
    swiper,
  },
  methods: {
    getProductID(id) {
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${id}`;
      this.$http.get(api).then((res) => {
        vm.productID = res.data.product.id;
      });
    },
    getProductall() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log(res.data.products);
        vm.productAll = res.data.products;
        vm.column = [...new Set(vm.productAll.map((item) => item.category))];
        console.log(vm.column);
        vm.columnAll = vm.productAll.map((item) => item.category);
        vm.isLoading = false;
      });
    },
    addtoCart(id, qty = 1) {
      //加入購物車
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then((res) => {
        vm.status.loadingItem = "";
        $("#productModal").modal("hide");
      });
    },
    // getCartLength() {
    //   const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
    //   const vm = this;
    //   let carts = [];
    //   this.$http.get(api).then((res) => {
    //     carts = res.data.data.carts;
    //     vm.cartLength = carts.length;
    //   });
    // },
    addfavorite(id) {
      const vm = this;
      let favoriteIndex = vm.favorites.indexOf(id);
      if (favoriteIndex === -1) {
        vm.favorites.push(id);
      } else {
        vm.favorites.splice(favoriteIndex, 1);
      }
      console.log(vm.favorites);
      localStorage.setItem("addFavoriteID", JSON.stringify(vm.favorites));
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
      if (!vm.changeproduct) {
        return vm.productAll.sort((a, b) => {
          if (vm.sort) {
            return b.price - a.price;
          } else if (!vm.sort) {
            return a.price - b.price;
          }
        });
      } else {
        return vm.filterProducts.sort((a, b) => {
          if (vm.sort) {
            return b.price - a.price;
          } else if (!vm.sort) {
            return a.price - b.price;
          }
        });
      }
    },
  },
  created() {
    this.getProductall();
  },
};
</script>