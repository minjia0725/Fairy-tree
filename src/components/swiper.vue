
<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide
        style="
          background-image: url('https://lv2-cdn.azureedge.net/straykids/17da18b30429442a862f76483352852d-1.Stray%20Kids_.jpg');
          background-color: rgba(0, 0, 0, 0.95);
          height: 600px;
        "
        class="bg-contain"
      ></swiper-slide>
      <swiper-slide
        style="
          background-image: url('https://ibighit.com/bts/images/bts/discography/be/bOsyIvG5dbDey3FuKQyAFard.jpg');
          background-color: rgba(0, 0, 0, 0.95);
          height: 600px;
        "
        class="bg-contain"
      ></swiper-slide>
      <swiper-slide
        style="
          background-image: url('https://lv2-cdn.azureedge.net/twice/20181212_3.jpg');
          background-color: rgba(0, 0, 0, 0.95);
          height: 600px;
        "
        class="bg-contain"
      ></swiper-slide>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div>
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
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
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
};
</script>
