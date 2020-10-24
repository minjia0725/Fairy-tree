<template>
  <div>
    <header>
    <customerNavbar></customerNavbar>
    </header>
    <router-view></router-view>
    <footer>
      <customerFooter></customerFooter>
    </footer>
  </div>
</template>

<script>
import customerNavbar from "./customerNavber";
import customerFooter from "./customerFooter";
export default {
  components: {
    customerNavbar,
    customerFooter,
  },
};
</script>
