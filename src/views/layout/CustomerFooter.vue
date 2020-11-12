<template>
  <div class="mt-12">
    <div class="bg-primary py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mt-auto mb-auto">
            <p class="text-white mb mb-md-0 h4 text-left">
              訂閱仙女樹獲取最新消息
            </p>
          </div>
          <div class="col-md-6">
            <div class="input-group position-relative">
              <label
                for="mail"
                class="position-absolute footer-form-icon-position h4 text-primary"
              >
                <i class="fas fa-envelope"></i>
              </label>
              <input
                type="email"
                class="form-control py-6 pl-8"
                style="background-clip: border-box"
                aria-describedby="button-addon2"
                id="mail"
                placeholder="請輸入Email，獲取最新消息與優惠碼"
                v-model="email"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-third px-5 text-primary rounded-0"
                  type="button"
                  id="button-addon2"
                  @click="subscribe"
                >
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-secondary pt-8 pb-5">
      <div class="container">
        <div class="row justi">
          <div class="col-md-4 text-right">
            <div class="text-white">
              <h6>關於Fairy Tree</h6>
              <ul class="footer-list">
                <li class="mb-1">
                  <a href="#" @click.prevent="" class="text-white"
                    ><i class="fas fa-truck-moving"></i> 運送方式</a
                  >
                </li>
                <li class="mb-1">
                  <a href="#" @click.prevent="" class="text-white"
                    ><i class="fas fa-question-circle"></i> 常見問題</a
                  >
                </li>
                <li class="mb-1">
                  <a href="#" @click.prevent="" class="text-white"
                    ><i class="fas fa-user-secret"></i> 隱私政策</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-4 text-center">
            <div class="text-white">
              <h6>關注我們</h6>
              <ul class="footer-list">
                <li class="mb-1">
                  <a href="#" @click.prevent="" class="text-white"
                    ><i class="fab fa-facebook-square"></i> Facebook</a
                  >
                </li>
                <li class="mb-1">
                  <a href="#" @click.prevent="" class="text-white"
                    ><i class="fab fa-instagram"></i> Instagram</a
                  >
                </li>
                <li class="mb-1">
                  <a href="#" @click.prevent="" class="text-white"
                    ><i class="fab fa-github-square"></i> 關於作者</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-4 text-left">
            <div class="text-white">
              <h6>客戶服務</h6>
              <ul class="footer-list">
                <li>
                  <a href="#" @click.prevent="" class="text-white"
                    ><i class="fas fa-phone-square-alt"></i>：0912-666-333</a
                  >
                </li>
                <li>
                  <a href="#" @click.prevent="" class="text-white"
                    ><i class="fas fa-clock"></i>：9am － 8pm</a
                  >
                </li>
                <li>
                  <a href="#" @click.prevent="" class="text-white"
                    ><i class="far fa-envelope"></i>：fairytree@fairytree.com</a
                  >
                </li>
                <li>
                  <a href="#" @click.prevent="" class="text-white"
                    ><i class="fab fa-line"></i>：@fairytree</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="text-white text-center">
          <p>
            © Fairy Tree 本網站僅供練習
            <br />圖資來源為網路資源，無任何商業營利用途
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerFooter',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    subscribe () {
      const vm = this
      const re = `${/^([a-zA-Z0-9])}${(([a-zA-Z0-9])${\.})}${([a-zA-Z0-9]{2,4})${$/}}`
      if (!re.test(vm.email)) {
        vm.$swal.fire({
          position: 'top',
          width: '20rem',
          icon: 'error',
          title: '請輸入正確格式',
          showConfirmButton: false,
          timer: 1000
        })
        vm.email = ''
      } else {
        vm.$swal.fire({
          position: 'center',
          width: '20rem',
          icon: 'success',
          title: '感謝訂閱',
          text: '優惠碼：FairyTree'
        })
        vm.email = ''
      }
    }
  }
}
</script>
