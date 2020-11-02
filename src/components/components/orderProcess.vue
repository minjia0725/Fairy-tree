<template>
  <div class="row  justify-content-center">
    <div class="col-lg-3">
      <h6
        class="border border-primary bg-primary text-white text-center rounded py-2"
      >
        1.確認購物清單
        <slot name='change1'>
          <i class="far fa-circle"></i>
        </slot>
      </h6>
    </div>
    <div class="col-lg-3">
      <slot name='change2'>
        <h6 class="border border-primary text-center rounded py-2">
        2.填寫訂單資料
        <i class="far fa-circle"></i>
      </h6>
      </slot>
    </div>
    <div class="col-lg-3">
      <slot name='change3'>
        <h6 class="border border-primary text-center rounded py-2">
        3.付款 & 完成
        <i class="far fa-circle"></i>
      </h6>
      </slot>
    </div>
  </div>
</template>