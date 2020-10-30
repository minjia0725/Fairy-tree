
<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item,key) in swiper" :key="key"
        style="
          background-image: url('');
          background-color: rgba(0, 0, 0, 0.95);
          height: 100vh;
        "
        :style="{backgroundImage:`url(${item.image})`}"
        class="bg-cover"
      ></swiper-slide>
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
        effect: 'fade',
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      },
      swiper : [
        {
          image:'https://lv2-cdn.azureedge.net/straykids/17da18b30429442a862f76483352852d-1.Stray%20Kids_.jpg'
        },
        {
          image:'https://ibighit.com/bts/images/bts/discography/be/bOsyIvG5dbDey3FuKQyAFard.jpg'
        },
        {
          image:'https://lv2-cdn.azureedge.net/twice/20181212_3.jpg'
        }
      ]
    };
  },
};
</script>
