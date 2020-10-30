<template>
  <div>
    <customerNavbar></customerNavbar>
    <router-view></router-view>
    <footer>
      <customerFooter></customerFooter>
    </footer>
  </div>
</template>

<script>
import customerNavbar from "./layout/customerNavber";
import customerFooter from "./layout/customerFooter";
export default {
  components: {
    customerNavbar,
    customerFooter,
  },
};
</script>
