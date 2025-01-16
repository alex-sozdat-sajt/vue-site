<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
<div class="card">
  <HelloWorld />
</div>
<div class="card">
  <RouterView />
</div>
 
 
</template>






<script>
 

import HelloWorld from './components/HelloWorld.vue';


 

export default {
  name: 'App',
  components: {
    HelloWorld,
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
