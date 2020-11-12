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
import sidebar from '@/views/backend/Sidebar'
import adminNavbar from '@/views/backend/AdminNavbar'
import alertMessage from '@/components/AlertMessage.vue'

export default {
  name: 'Backstage',
  components: {
    sidebar,
    adminNavbar,
    alertMessage
  },
  created () {
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = myCookie
  }
}
</script>
