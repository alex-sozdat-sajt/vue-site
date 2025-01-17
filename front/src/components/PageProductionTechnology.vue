<template>
  <hr/>
  <div class="card">
     
   
   <h1>data</h1>
   <h4>{{pageName}}</h4> 
   <h1>{{headlineOne}}</h1> 
   <p>{{initialText}}</p> 
   <h2>{{headlineTwo}}</h2>
   <img  :src="`http://localhost:3000/${imageSmallUrl}`">
   <p>{{articleText}}</p> 
   <h3>{{headlineThree}}</h3> 
   <p>{{sectionText}}</p> 
   <img  :src="`http://localhost:3000/${imageBigUrl}`">
   
  </div>
  <hr/>
</template>

<script>
import axios from 'axios';
export default {
  // created () {
  //           document.title = " Page Look Ma!";
  //       },
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
    
    const response = await axios.get('http://localhost:3000/getpageProductionTechnology');
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
    // console.log('showData', this.data[0].pageName);
},
showTitle(){
   
    this.pageName = this.data[0].pageName ? this.data[0].pageName : "";
    this.headlineOne = this.data[0].headlineOne ? this.data[0].headlineOne : "";
    this.initialText = this.data[0].initialText ? this.data[0].initialText : "";
    this.headlineTwo = this.data[0].headlineTwo ? this.data[0].headlineTwo : "";
    this.articleText = this.data[0].articleText ? this.data[0].articleText : "";
    this.headlineThree = this.data[0].headlineThree ? this.data[0].headlineThree : "";
    this. sectionText = this.data[0].sectionText ? this.data[0].sectionText : "";
    this. imageSmallUrl = this.data[0].imageSmallUrl ? this.data[0].imageSmallUrl : "";
    this. imageBigUrl = this.data[0].imageBigUrl ? this.data[0].imageBigUrl : "";

    
}
},
async created(){
    await this.receivePage(),
            // this.showData()
            this.showTitle()

}
}

</script>

<style>

</style>