<template>
  <div class="">
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <router-link to="/">
        <img src="@/assets/images/logo.png" width="135" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto h6 font-weight-bold">
          <li class="nav-item">
            <router-link class="nav-link" to="/aboutYou"
              >關於仙女樹</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/customerOrders"
              >逛逛商店</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">商品管理</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>