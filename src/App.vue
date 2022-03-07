<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
  components: {
    Navigation
  },
  mounted () {
    this.$store.dispatch('apiCall')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Quicksand&display=swap');
#app {
  font-family: 'Lato', sans-serif;
  font-family: 'Quicksand', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 50px;
}
</style>
