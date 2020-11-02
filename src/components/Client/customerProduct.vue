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
    <div
      class="product-bgi bg-cover d-flex-center flex-column"
      style="
        background-image: url('https://ibighit.com/bts/images/bts/discography/be/bOsyIvG5dbDey3FuKQyAFard.jpg');
      "
    >
      <h2 class="product-bgi-text font-weight-bold mb-0 text-white">
        商品介紹
      </h2>
    </div>

    <div class="container my-6" v-if="!isLoading">
      <nav aria-label="breadcrumb ">
        <ol class="breadcrumb bg-third text-primary font-weight-bold">
          <li class="breadcrumb-item">
            <router-link to="/" class="text-decoration-none">首頁</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/customerProducts" class="text-decoration-none"
              >所有商品</router-link
            >
          </li>
          <li class="breadcrumb-item">
            <router-link
              class="text-decoration-none"
              :to="{
                path: '/customerProducts',
                query: { category: product.category },
              }"
              >{{ product.category }}</router-link
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.title }}
          </li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-5">
          <div class="text-center mb-4 mb-md-0">
            <img
              :src="product.imageUrl"
              class="product-img border border-primary"
            />
          </div>
        </div>
        <div class="col-md-7">
          <div class="d-flex flex-column justify-content-between h-100">
            <div>
              <h2 class="h4 product-title">{{ product.title }}</h2>
              <hr class="border-primary" />
              <div class="d-flex justify-content-between">
                <div>
                  <p class="mb-2 h5 font-weight-bold">商品內容：</p>
                  <span class="product-description">{{
                    product.description
                  }}</span>
                </div>
              </div>
            </div>
            <div>
              <div class="mt-auto text-right">
                <span class="h2">{{ product.price | currency }}</span>
                <del>{{ product.origin_price | currency }}</del>
              </div>
              <select
                name=""
                id=""
                class="form-control rounded-0 border-primary mt-2"
                v-model="product.num"
              >
                <option :value="num" v-for="num in 10" :key="num">
                  {{ num }} {{ product.unit }}
                </option>
              </select>
              <hr class="border-primary" />
              <div class="d-flex justify-content-end align-items-center mt-4">
                <span class="h5 mb-0"
                  >小計：{{ (product.num * product.price) | currency }}</span
                >
                <button
                  class="ml-4 btn btn-outline-secondary"
                  @click="addtoCart(product.id, product.num)"
                >
                  <i
                    class="fas fa-spinner fa-spin"
                    v-if="status.loadingItem === product.id"
                  ></i>
                  加入購物車
                </button>
                <button
                  class="ml-4 px-4 btn btn-secondary"
                  @click="goToCart(product.id)"
                >
                  直接購買
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-12 mb-6">
            <ul
              class="nav nav-tabs border-0 h6 font-weight-bold"
              id="myTab"
              role="tablist"
            >
              <li class="nav-item mb-0">
                <a
                  class="nav-link product-nav-link active border-bottom-0"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                  >商品介紹
                </a>
              </li>
              <li class="nav-item mb-0">
                <a
                  class="nav-link product-nav-link border-bottom-0"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                  >購物資訊</a
                >
              </li>
              <li class="nav-item mb-0">
                <a
                  class="nav-link product-nav-link border-bottom-0"
                  id="contact-tab"
                  data-toggle="tab"
                  href="#contact"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  >退換貨說明</a
                >
              </li>
            </ul>
            <div
              class="tab-content product-precautions rounded-bottom rounded-right pt-2 pb-4 px-4"
              id="myTabContent"
            >
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <span class="product-content">{{ product.content }}</span>
              </div>
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <span>
                  確認付款後，約 3~5 工作天可配送至指定地址。<br />
                  配送範圍限於台北市、新北市、基隆市、桃園市、新竹市、台中市、彰化縣、嘉義縣、嘉義市、台南市、高雄市、屏東縣、宜蘭縣、花蓮縣。<br />
                  其餘地區的配送資訊，敬請聯繫客服部門。商品寄達後，如投遞逾三次未簽收，商品將暫返還本公司物流中心，並由客服與您通知。<br />
                  如需再次配送，需支付 200 元運費，懇請消費者留意。
                </span>
              </div>
              <div
                class="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <span
                  >為守護彼此權益，拆封時請務必拍攝開箱影片。<br />
                  商品從韓國到台灣經歷各種運送，但過程中難免碰撞，無法退換貨。<br />
                  本賣場屬於代購性質，故不享有7天鑑賞期，皆無法退換貨
                  (如遇商品瑕疵，需提供完整的開箱影片唷！)。<br />
                  商品均開放貨到付款，多次不取貨的買家視情況拒絕使用貨到付款。
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      productId: "",
      cartProducts: [],
      cartProductsID: [],
      isLoading: false,
      status: {
        loadingItem: "",
      },
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${vm.productId}`;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        res.data.product.num = 1;
        vm.product = res.data.product;
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
          vm.getCartProducts();
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
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getCartProducts();
    this.getProduct();
  },
};
</script>