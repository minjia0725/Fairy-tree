<template>
  <div class="">
    <swiper></swiper>
    <div>
      <div
        class="mt-8 mb-8 home-product d-flex-center"
      >
        <h3 class="text-white">最新消息</h3>
      </div>
      <ul class="home-news-group col-md-5 ml-auto mr-auto">
          <li
            class="border-bottom py-3 text-secondary h5 font-weight-blod font-italic"
            v-for="item in news"
            :key="item.conteont"
            data-aos="fade-left"
            data-aos-delay="150"
          >
            <span class="text-third pr-3">{{ item.date }}</span
            >{{ item.content }}
          </li>
        </ul>
    </div>
    <div
      class="mt-8 home-product d-flex-center"
    >
      <h3 class="text-white">商品導覽</h3>
    </div>
    <section class="container">
      <div class="row mt-8" >
        <div class="col-md-4 mb-4 mb-md-0" v-for="(item, id) in guided" :key="id" data-aos="zoom-out" data-aos-delay="100">
          <div
            :style="{ backgroundImage: `url(${item.image})` }"
            class="bg-cover position-relative home-second-bgi"
          >
            <div class="home-border text-white h4 font-weight-bold">
              <div
                class="d-flex-center h-100 home-product-text"
              >
                <span>{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container">
      <div class="row mt-6" data-aos="zoom-out" data-aos-delay="200">
        <div class="col-md-12 mb-8">
          <div
            class="w-100 home-third-bgi bgi-fixed"
            style="
              background-image: url('https://images.unsplash.com/photo-1577991712260-4ee45603dab8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
            "
          >
            <div
              class="d-flex flex-column justify-content-center align-items-center text-center h-100 text-light"
            >
              <h3 class="mb-3 font-weight-bold">韓流明星周邊商品</h3>
              <p class="home-text-style">
                Fairy tree 專為你而生<br />
                為喜愛韓國流行音樂的你，都能找到想要的商品
              </p>
              <button class="btn btn-outline-light">SHOP NOW</button>
            </div>
          </div>
        </div>
        <div class="col-md-6"></div>
      </div>
    </section>
  </div>
</template>

<script>
import swiper from "@/components/swiper";
export default {
  data() {
    return {
      guided: [
        {
          title: "暢銷專輯",
          image: "https://lv2-cdn.azureedge.net/twice/TWICE_SIGNAL.jpg",
        },
        {
          title: "熱門周邊",
          image:
            "https://cdn.shopify.com/s/files/1/0069/4203/1983/products/shinee-official-fanlight-lightstick-accessories-shinee-default-title-851922_900x.jpg?v=1582679671",
        },
        {
          title: "精品海報",
          image: "https://lv2-cdn.azureedge.net/straykids/TOP-English_ver.jpg",
        },
      ],
      news: [
        {
          date: "2020/10/11",
          content: "全館輸入優惠碼即享額外9折，優惠碼：FairyTree",
        },
        {
          date: "2020/09/11",
          content: "Fairy Tree 正式上線訂單滿$999，即享免運",
        },
        {
          date: "2020/08/18",
          content: "Fairy Tree 即將上線!!",
        },
        {
          date: "2020/07/25",
          content: "Fairy Tree 網站架設中",
        },
      ],
    };
  },
  components: {
    swiper,
  },
};
</script>