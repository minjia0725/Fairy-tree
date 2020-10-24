<template>
  <div>
    <swiper></swiper>
    <div
      class="mt-8 home-product d-flex justify-content-center align-items-center"
    >
      <h3 class="text-white">商品介紹</h3>
    </div>
    <section>
      <div class="container">
        <div class="my-10 row">
          <div class="col-md-6">
            <div
              style="
                background-image: url('https://lv2-cdn.azureedge.net/twice/MORE_MORE(1).jpg');
              "
              class="bg-cover position-relative home-second-bgi"
            >
              <div class="home-border text-white h4 pl-3 pt-3 font-weight-bold">
                專輯
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mt-10 d-flex flex-column justify-content-center">
              <h3 class="font-weight-bold">專輯</h3>
              <p class="mt-4 home-text-style">
                仙女樹提供各式各樣你最喜歡的團體、歌手的專輯<br />只要是你想的到的應有盡有
              </p>
            </div>
            <div class="text-right">
              <router-link class="btn btn-outline-primary" to="/customerOrders"
                >查看更多</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <section style="background-image:url(https://images.unsplash.com/photo-1577991712260-4ee45603dab8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80);background-attachment: fixed" class="bg-cover">
      <div class="container">
        <div class="my-10 row">
          <div class="col-md-6">
            <div class="mt-10 d-flex flex-column justify-content-center text-white">
              <h3 class="font-weight-bold">海報</h3>
              <p class="mt-4 home-text-style">
              想把最喜愛的韓國歐巴、歐尼貼在自己的房間嗎?<br/>快來仙女樹挑選吧
              </p>
            </div>
            <div class="text-right">
              <router-link class="btn btn-outline-light" to="/customerOrders"
                >查看更多</router-link
              >
            </div>
          </div>
          <div class="col-md-6">
            <div
              style="
                background-image: url('https://lv2-cdn.azureedge.net/twice/MORE_MORE(1).jpg');
              "
              class="bg-cover position-relative home-second-bgi ml-auto"
            >
              <div class="home-border text-white h4 pl-3 pt-3 font-weight-bold">
                海報
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="mt-10 row">
          <div class="col-md-6">
            <div
              style="
                background-image: url('https://lv2-cdn.azureedge.net/twice/MORE_MORE(1).jpg');
              "
              class="bg-cover position-relative home-second-bgi"
            >
              <div class="home-border text-white h4 pl-3 pt-3 font-weight-bold">
                各式周邊
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mt-10 d-flex flex-column justify-content-center">
              <h3 class="font-weight-bold">各式周邊</h3>
              <p class="mt-4 home-text-style">
                身為歐爸、歐尼的紛絲一定要有的商品<br />快來選購！
              </p>
            </div>
            <div class="text-right">
              <router-link class="btn btn-outline-primary" to="/customerOrders"
                >查看更多</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import swiper from "@/components/swiper";
export default {
  components: {
    swiper,
  },
};
</script>