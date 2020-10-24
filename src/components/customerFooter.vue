<template>
  <div class="mt-10">
    <div class="bg-primary py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mt-auto mb-auto">
            <p class="text-white mb-0 h4 text-center">訂閱仙女樹獲取最新消息</p>
          </div>
          <div class="col-md-6">
            <div class="input-group position-relative">
              <label
                for="mail"
                class="position-absolute form-icon-position h4 text-primary"
              >
                <i class="fas fa-envelope"></i>
              </label>
              <input
                type="email"
                class="form-control py-6 pl-8"
                style="background-clip: border-box"
                aria-describedby="button-addon2"
                id="mail"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-secondary px-5 text-primary"
                  type="button"
                  id="button-addon2"
                >
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-secondary py-3">
      頁尾
    </div>
  </div>
</template>