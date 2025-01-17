<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
<div class="card">
  <Navigation />
  
</div>
<div class="card">
  <RouterView />
</div>
 
 
</template>






<script>
 

import Navigation from './components/Navigation.vue';


 

export default {
  name: 'App',
  components: {
    Navigation,
    // Page,
    // Form
  }
}
 
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
