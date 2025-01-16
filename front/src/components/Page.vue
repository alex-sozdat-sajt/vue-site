<template>
  <hr/>
  <div class="card">
    <nav>
    <RouterLink to="/Form">Go to Form</RouterLink>
    <hr/>
  </nav>
    <button class="btn" v-on:click="receivePage">Получить данные</button>
    <button class="btn" v-on:click="showData">Отобразить данные</button>
    <button class="btn" v-on:click="showTitle">Отобразить заголовок</button>
  </div>
   <h1>data</h1>
   <h4>{{pageName}}</h4> 
   <h1>{{headlineOne}}</h1> 
   <p>{{initialText}}</p> 
   <h2>{{headlineTwo}}</h2>
   <img  :src="`http://localhost:3000/upload/${imageSmallUrl}`">
   <p>{{articleText}}</p> 
   <h3>{{headlineThree}}</h3> 
   <p>{{sectionText}}</p> 
   <img  :src="`http://localhost:3000/upload/${imageBigUrl}`">
   
   
  <hr/>
</template>

<script>
import axios from 'axios';
export default {
data(){
    return{
        pageName: "",
        headlineOne: "",
        initialText: "",
        headlineTwo: "",
        articleText: "",
        headlineThree: "",
        sectionText: "",
        imageSmallUrl:"",
        imageBigUrl:"",
        text: "Заголовок",
        data: {},
        title:'',
    }
},
methods:{
    async receivePage(){
        try {
    
    const response = await axios.get('http://localhost:3000/getpage');
    console.log('response', response.data);
    console.log('data', this.data);
    this.data = response.data
    
  } catch (error) {
    console.error(error);
  }
  console.log('this.data', this.data[0]);
},
showData(){
    console.log('showData', this.data);
    console.log('showData', this.data[0].pageName);
},
showTitle(){
    this.pageName = this.data[0].pageName;
    this.pageName = this.data[0].pageName;
    this.headlineOne = this.data[0].headlineOne;
    this.initialText = this.data[0].initialText;
    this.headlineTwo = this.data[0].headlineTwo;
    this.articleText = this.data[0].articleText;
    this.headlineThree = this.data[0].headlineThree;
    this. sectionText = this.data[0].sectionText;
    this. imageSmallUrl = this.data[0].imageSmallUrl;
    this. imageBigUrl = this.data[0].imageBigUrl;

    
}
},
async created(){
    await this.receivePage(),
            this.showData()

}
}

</script>

<style>

</style>