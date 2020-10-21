<template>
  <div>
    <header class="d-flex justify-content-center py-2">
      <router-link to="/">
        <img src="@/assets/images/logo.png" width="135" />
      </router-link>
    </header>
    <nav class="navbar navbar-expand navbar-light">
      <div class="container">
        <router-link class="btn btn-sm customerNavbar-btn-style" to="/simulation/cart"
          >我的購物車</router-link
        >
        <ul class="navbar-nav mr-auto ml-auto h6 font-weight-bold">
          <li class="nav-item">
            <router-link class="nav-link" to="/aboutYou"
              >關於仙女樹</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/simulation/customerOrders"
              >我們的商品</router-link
            >
          </li>
        </ul>
        <router-link class="btn btn-sm customerNavbar-btn-style" to="/login"
          >管理員後台</router-link
        >
      </div>
    </nav>
    <router-view class="container"></router-view>
  </div>
</template>