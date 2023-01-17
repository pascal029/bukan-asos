<script>
  import {mapWritableState, mapActions} from 'pinia'
  import { useCounterStore } from '../stores/counter';
  export default {

    computed : {
      ...mapWritableState(useCounterStore,['isLoggedIn','page', 'filterPriceMax', 'filterPriceMin', 'loading'])
    },
    methods: {
      ...mapActions(useCounterStore,['logout', 'renderProducts']),
      goHome(){
        this.loading = true
        setTimeout(() => {
          this.page = 1
          this.filterPriceMax = ''
          this.filterPriceMin = ''
          this.$router.push('/')
          this.renderProducts({page : this.page})
          this.loading = false
        }, 1000);
        
      }
    },
  }
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">BUKAN ASOS</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a href="#" @click.prevent="goHome" class="me-2 text-muted" style="text-decoration: none;">Home</a>
        </li>
      </ul>
      <div class="d-flex">
        <div class="container" v-show="isLoggedIn == true">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/wishlist" class="me-2 text-muted" style="text-decoration: none;">My WishList</router-link>
            </li>
            <li class="nav-item">
              <a @click.prevent="logout" href="#" class="me-2 text-muted" style="text-decoration: none;">Logout</a>
            </li>
          </ul>
          
          
        </div>
        <div class="container" v-show="isLoggedIn == false">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/register" class="me-2 text-muted" style="text-decoration: none;">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="me-2 text-muted" style="text-decoration: none;">Login</router-link>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  </div>
</nav>
</template>