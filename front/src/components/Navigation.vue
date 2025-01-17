<template>
  <div class="hello">
   <nav>
    <RouterLink to="/Page">Page</RouterLink>    <br> <RouterLink to="/Form">Form</RouterLink>  <br>
    <RouterLink to="/UsualPage">UsualPage</RouterLink><br>
     <RouterLink to="/PageProductionTechnology">PageProductionTechnology</RouterLink> <br>
     <RouterLink to="/FormProductionTechnology">FormProductionTechnology</RouterLink> 
    <hr/>
  </nav>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
