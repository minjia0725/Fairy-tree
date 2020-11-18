
<template>
  <div>
    <swiper
      class="swiper"
      :options="swiperOption"
    >
      <swiper-slide
        v-for="(item, key) in swiper"
        :key="key"
        :style="{ backgroundImage: `url(${ item.image })` }"
        class="bg-cover position-relative swiper-bgi"
      >
        <div class="d-flex-center h-100">
          <div class="swiper-box">
            <div class="swiper-box-bg">
              <h1 class="mb-0">FAIRY TREE</h1>
              <div class="text-center mt-2">
                <router-link
                  to="/customerProducts"
                  class="btn font-weight-bold btn-light rounded-0"
                  >立即購物 BUY NOW</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'swiper-example-autoplay',
  title: 'Autoplay',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        effect: 'fade',
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      },
      swiper: [
        {
          image:
            'https://lv2-cdn.azureedge.net/straykids/17da18b30429442a862f76483352852d-1.Stray%20Kids_.jpg'
        },
        {
          image:
            'https://ibighit.com/bts/images/bts/discography/wings/photo-02.jpg'
        },
        {
          image:
            'https://lv2-cdn.azureedge.net/twice/c6211ea483ba40e8a67880c1f6984884-11.jpg'
        }
      ]
    }
  }
}
</script>
