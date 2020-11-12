<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    const vm = this
    const api = `${process.env.VUE_APP_APIPATH}api/user/check`
    vm.$http.post(api).then((response) => {
      if (response.data.success) {
      } else {
        vm.$router.push('/')
      }
    })
  }
}
</script>

<style lang="scss">
@import "./assets/scss/all.scss";
</style>
