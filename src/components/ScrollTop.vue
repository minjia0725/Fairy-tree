<template>
  <div class="ScrollTop rounded-left">
    <a href="#" @click.prevent="scrollTop">
      <i class="fas fa-angle-up"></i>
    </a>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'ScrollTop',
  methods: {
    scrollTop () {
      $('html ,body').animate(
        {
          scrollTop: 0
        },
        1000
      )
    }
  }
}
</script>
