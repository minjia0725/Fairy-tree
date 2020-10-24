<template>
  <div class="container">
    <!-- <span v-text="getCount"></span> -->
    <loading :active.sync="isLoading" class="text-center"></loading>
    <div class="row mt-4">
      <div class="col-lg-4 col-md-6 mb-3 mb-md-0">
        <ul class="list-group sticky-top" v-if="!isLoading">
          <li
            class="border-0 text-decoration-none list-group-item list-group-item-primary py-3"
            @click="
              filter = '';
              changeproduct = false;
            "
          >
            <span class="d-block h4 mb-0 pl-4 list-group-style">所有商品</span>
          </li>
          <li
            v-for="item in column"
            :key="item"
            class="border-0 text-decoration-none list-group-item list-group-item-primary py-3"
            @click="
              changeproduct = true;
              filter = item;
            "
          >
            <div
              class="d-flex justify-content-between h4 mb-0 pl-4 list-group-style"
            >
              <span>
                {{ item }}
              </span>
              <span>（{{ getCount[item] }}）</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-lg-8 col-md-6">
        <div class="row">
          <template v-if="!changeproduct">
            <div class="col-lg-6 mb-4" v-for="item in products" :key="item.id">
              <div class="card bg-transparent h-100 list-item-style">
                <div
                  style="height: 280px"
                  class="bg-cover rounded-top"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div>
                <div
                  class="card-body  pb-3 d-flex flex-column justify-content-between"
                >
                  <div class="">
                    <span class="badge badge-secondary float-right ml-2">{{
                      item.category
                    }}</span>
                    <h6 class="card-title text-secondary font-weight-bold">
                      {{ item.title }}
                    </h6>
                  </div>
                  <!-- <p class="card-text">{{ item.content }}</p> -->
                  <div
                    class="d-flex justify-content-between align-items-end text-right"
                  >
                    <button
                      type="button"
                      class="btn btn-outline-third btn-sm"
                      @click="addtoCart(item.id)"
                    >
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.loadingItem === item.id"
                      ></i>
                      加到購物車
                    </button>
                    <div class="h5" v-if="!item.price">
                      {{ item.origin_price | currency }} 元
                    </div>
                    <div class="" v-if="item.price">
                      <del class="h6 text-black-50">{{
                        item.origin_price | currency
                      }}</del
                      ><br />
                      <span class="text-danger h5 font-weight-bold">{{
                        item.price | currency
                      }}</span>
                    </div>
                  </div>
                </div>
                <!-- <div class="card-footer d-flex">
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  @click="getProduct(item.id)"
                >
                  <i
                    class="fas fa-spinner fa-spin"
                    v-if="status.loadingItem === item.id"
                  ></i>
                  查看更多
                </button>
              </div> -->
              </div>
            </div>
          </template>
          <template v-if="changeproduct">
            <div class="col-lg-6 mb-4" v-for="item in filterProducts" :key="item.id">
              <div class="card bg-transparent h-100 list-item-style">
                <div
                  style="height: 280px"
                  class="bg-cover rounded-top"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div>
                <div
                  class="card-body pb-3 d-flex flex-column justify-content-between"
                >
                  <div class="">
                    <span class="badge badge-secondary float-right ml-2">{{
                      item.category
                    }}</span>
                    <h6 class="card-title text-secondary font-weight-bold">
                      {{ item.title }}
                    </h6>
                  </div>
                  <!-- <p class="card-text">{{ item.content }}</p> -->
                  <div
                    class="d-flex justify-content-between align-items-end text-right"
                  >
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="addtoCart(item.id)"
                    >
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.loadingItem === item.id"
                      ></i>
                      加到購物車
                    </button>
                    <div class="h5" v-if="!item.price">
                      {{ item.origin_price | currency }} 元
                    </div>
                    <div class="" v-if="item.price">
                      <del class="h6 text-black-50">{{
                        item.origin_price | currency
                      }}</del
                      ><br />
                      <span class="text-danger h5 font-weight-bold">{{
                        item.price | currency
                      }}</span>
                    </div>
                  </div>
                </div>
                <!-- <div class="card-footer d-flex">
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  @click="getProduct(item.id)"
                >
                  <i
                    class="fas fa-spinner fa-spin"
                    v-if="status.loadingItem === item.id"
                  ></i>
                  查看更多
                </button>
              </div> -->
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <pagination
      :pages="pagination"
      @page="getProducts"
      class="d-flex justify-content-md-end"
      v-if="!changeproduct && !isLoading"
    ></pagination>
    <div
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
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "@/components/pagination";

export default {
  data() {
    return {
      product: {},
      products: [],
      productAll: [],
      fiterproduct: [],
      column: [], //分類
      columnAll: [],
      counts: {},
      pagination: {},
      filter: "",
      status: {
        loadingItem: "",
      },
      isLoading: false,
      changeproduct: false,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log(res);
        vm.products = res.data.products;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      });
    },
    getProductall() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      this.$http.get(api).then((res) => {
        console.log(res);
        vm.productAll = res.data.products;
        vm.column = [...new Set(vm.productAll.map((item) => item.category))];
        console.log(vm.column);
        vm.columnAll = vm.productAll.map((item) => item.category);
      });
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then((res) => {
        vm.product = res.data.product;
        res.data.product.num = 1;
        console.log(vm.product);
        $("#productModal").modal("show");
        vm.status.loadingItem = "";
      });
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then((res) => {
        vm.status.loadingItem = "";
        vm.getCart();
        $("#productModal").modal("hide");
      });
    },
    getCart() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then((res) => {
        console.log(res.data);
      });
    },
  },
  computed: {
    getCount() {
      const vm = this;
      vm.columnAll.forEach((x) => {
        vm.counts[x] = (vm.counts[x] || 0) + 1;
      });
      return vm.counts;
    },
    filterProducts() {
      const vm = this;
      vm.changeproduct = true;
      return vm.productAll.filter((index) => {
        return index.category.match(vm.filter)
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
    this.getProductall();
  },
};
</script>