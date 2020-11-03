<template>
  <div>
    <customerNavbar></customerNavbar>
    <router-view></router-view>
    <footer>
      <customerFooter></customerFooter>
    </footer>
    <scrolltop :style="{ opacity: isOpacity }"></scrolltop>
  </div>
</template>

<script>
import customerNavbar from "./layout/customerNavber";
import customerFooter from "./layout/customerFooter";
import scrolltop from "@/components/components/ScrollTop";

export default {
  data() {
    return {
      scrollTop: '',
      isOpacity: 0,
    };
  },
  components: {
    customerNavbar,
    customerFooter,
    scrolltop,
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.scrollTop = document.documentElement.scrollTop;
      if (this.scrollTop > 150) {
        this.isOpacity = 1;
      } else {
        this.isOpacity = 0;
      }
    });
  },
};
</script>
