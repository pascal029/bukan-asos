<script >
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Loader from './components/Loader.vue';
import { mapState } from 'pinia';
import { useCounterStore } from './stores/counter';
export default {
  components : {
    Navbar,
    Loader
  },
  computed :{
    ...mapState(useCounterStore, ['loading'])
  }
}


</script>

<template>
  <Navbar />
  <Loader v-if="loading == true"/>
  <RouterView />
</template>

<style >
</style>
