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
    <div class="text-right">
      <button class="btn btn-primary mt-4" @click="openModal(true)">
        建立新產品
      </button>
    </div>
    <table class="table mt-4 text-nowrap table-responsive-md">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ item.price | currency }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-if="!item.is_enabled">未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-info btn-sm"
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
    <Pagination :pages="pagination" @page="getProducts"></Pagination>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ modalTitle }}</span>
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
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="temProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img class="img-fluid" alt="" :src="temProduct.imageUrl" />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="temProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="temProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="unit">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="temProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="temProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="temProduct.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="temProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="temProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="temProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
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
              class="btn btn-primary"
              @click="upadteProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delProductModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">
              <span>刪除產品</span>
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
            <strong class="text-danger">{{ temProduct.title }}</strong>
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
            <button type="button" class="btn btn-danger" @click="delProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */ //ESlint用的
import $ from "jquery";
import Pagination from "@/components/components/pagination";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      temProduct: {}, //modal用的
      isNew: false,
      modalTitle: "",
      isLoading: false, //全域的loading
      status: {
        //局部的loading
        fileUploading: false,
      },
    };
  },
  components: {
    //載入元件
    Pagination,
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {

        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.temProduct = {};
        this.modalTitle = "新增產品";
        this.isNew = true;
      } else if (!isNew) {
        this.modalTitle = "編輯產品";
        this.temProduct = Object.assign({}, item); //Object.assign會將值寫到新的物件
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    deleteModel(item) {
      $("#delProductModal").modal("show");
      this.temProduct = item;
    },
    upadteProduct() {
      let api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = "post";
      const id = this.$refs.files.id;
      const vm = this;
      if (!vm.isNew) {
        //當vm.isNew = false
        api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/product/${vm.temProduct.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.temProduct }).then((response) => {
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
          document.getElementById(id).value = "";
        } else {
          $("#productModal").modal("hide");
          vm.getProducts();
        }
      });
    },
    delProduct() {
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/product/${vm.temProduct.id}`;
      this.$http.delete(api, { data: vm.temProduct }).then((response) => {
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          this.getProducts();
        }
      });
    },
    uploadFile() {
      //上傳圖片
      const uploadedFile = this.$refs.files.files[0]; //取出上傳圖片的檔案
      const vm = this;
      const formData = new FormData(); //建立物件
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true; //上傳中改true顯示loading圖案
      this.$http
        .post(url, formData, {
          headers: {
            //Content-type 表頭資訊 (header) 是指告訴客戶端實際返回的內容的內容類型
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          vm.status.fileUploading = false;
          if (response.data.success) {
            // vm.temProduct.imageUrl = response.data.imageUrl;//這個沒有雙向綁定
            vm.$set(vm.temProduct, "imageUrl", response.data.imageUrl); //運用$set強制雙向綁定
          } else {
            this.$bus.$emit("message:push", response.data.message, "danger");
          }
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>