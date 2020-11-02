
<template>
  <div>
    <swiper class="swiper" :options="swiperOption"  data-aos="zoom-out" data-aos-delay="200">
      <swiper-slide
        v-for="(item, key) in swiper"
        :key="key"
        style="background-image: url(''); height: 100vh"
        :style="{ backgroundImage: `url(${item.image})` }"
        class="bg-cover position-relative"
      >
        <div class="swiperbox">
          <div class="swiperbox-bgi">
            <h1 class="mb-0">FAIRY TREE</h1>
            <div class="text-center mt-2">
            <router-link to="/customerProducts" class="btn font-weight-bold btn-light rounded-0">立即購物 BUY NOW</router-link>
          </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "swiper-example-autoplay",
  title: "Autoplay",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        effect: "fade",
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      },
      swiper: [
        {
          image:
            "https://lv2-cdn.azureedge.net/straykids/17da18b30429442a862f76483352852d-1.Stray%20Kids_.jpg",
        },
        {
          image:
            "https://ibighit.com/bts/images/bts/discography/wings/photo-02.jpg",
        },
        {
          image:
            "https://lv2-cdn.azureedge.net/twice/c6211ea483ba40e8a67880c1f6984884-11.jpg",
        },
      ],
    };
  },
};
</script>
