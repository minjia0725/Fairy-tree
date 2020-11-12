<template>
  <div class="layout">
    <div>
      <customerNavbar></customerNavbar>
      <router-view></router-view>
    </div>
    <footer>
      <customerFooter></customerFooter>
      <scrolltop :style="{ opacity: isOpacity }"></scrolltop>
    </footer>
  </div>
</template>

<script>
import customerNavbar from '@/views/layout/CustomerNavber.vue'
import customerFooter from '@/views//layout/CustomerFooter.vue'
import scrolltop from '@/components/ScrollTop.vue'

export default {
  name: 'Index',
  data () {
    return {
      scrollTop: '',
      isOpacity: 0
    }
  },
  components: {
    customerNavbar,
    customerFooter,
    scrolltop
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.scrollTop = document.documentElement.scrollTop
      if (this.scrollTop > 150) {
        this.isOpacity = 1
      } else {
        this.isOpacity = 0
      }
    })
  }
}
</script>
