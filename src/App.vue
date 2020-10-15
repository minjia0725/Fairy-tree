<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created () {
    const api = `${process.env.APIPATH}api/user/check`;
      const vm = this
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if(response.data.success) {
          
        }else {
          vm.$router.push('/')
        }
      });
  },
};
</script>

<style lang="scss">
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
@import "./assets/all";
</style>
