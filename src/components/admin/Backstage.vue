<template>
  <div>
    <adminNavbar></adminNavbar>
    <alertMessage></alertMessage>
    <div class="container-fluid">
      <div class="row">
        <sidebar></sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "./sidebar";
import adminNavbar from "./adminNavbar";
import alertMessage from "./alertMessage"

export default {
  components: {
    sidebar,
    adminNavbar,
    alertMessage,
  },
  created () {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    this.$http.defaults.headers.common['Authorization'] = myCookie;
  }
};
</script>