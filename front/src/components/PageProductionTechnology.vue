<template>
  <hr/>
  <div class="card">
    <a v-on:click="showSingle('https://lipsum.app/id/63/1600x1200')"  >
    <img src="https://lipsum.app/id/63/200x150" width="300" height="200" /></a>

    <a v-on:click="showMultiple('https://lipsum.app/id/60/1600x1200')"  >
      <img src="https://lipsum.app/id/60/200x150" width="300" height="200" /></a>
      </div>
      <button @click="console.log(this.foto_300)"> console.log(this.foto_300 P) </button>
        
      <div v-for="foto of this.foto_300" :key = "foto">
        <a v-on:click="showMultiple(`http://localhost:3000/${foto}`)"  > 
        <img :src="`http://localhost:3000/${foto}`" width="300" height="250" /></a>
        
      </div>
     
    
      
      
 
   <div>
   <h1>data</h1>
   <h4>{{pageName}}</h4> 
   <h1>{{headlineOne}}</h1> 
   <p>{{initialText}}</p> 
   <h2>{{headlineTwo}}</h2>
   <a v-on:click="showSingle(`http://localhost:3000/${imageBigUrl}`)"  >
    <img :src="`http://localhost:3000/${imageSmallUrl}`" width="300" height="250" />
  </a>
   <img  :src="`http://localhost:3000/${imageSmallUrl}`">
   <p>{{articleText}}</p> 
   <h3>{{headlineThree}}</h3> 
   <p>{{sectionText}}</p> 
   <img  :src="`http://localhost:3000/${imageBigUrl}`">
   <img  :src="`http://localhost:3000/upload/${imageBigUrl}`">
   
  </div>
  <hr/>
  <div ref="container">
    <slot></slot>
  </div>
  <div>
    <button @click="showSingle">Show single picture.</button>
    <button @click="showMultiple">Show a group of pictures.</button>

    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>
  </div>

   
</template>   

<script>
import VueEasyLightbox from 'vue-easy-lightbox'
import { ref, defineComponent } from 'vue'
 
import axios from 'axios';
export default {
  props: {
    foto_300: {},
    foto_700: {},
  },
  components: {
    VueEasyLightbox
  },
  setup(props) {
    const text = "просто текст"
    const visibleRef = ref(false)
    const indexRef = ref(0) // default 0
    const imgsRef = ref([])
    
    // Img Url , string or Array of string
    // ImgObj { src: '', title: '', alt: '' }
    // 'src' is required
    // allow mixing

    const onShow = () => {
      visibleRef.value = true
    }
    const showSingle = (http) => {
      
       imgsRef.value = http
      // imgsRef.value = 'https://lipsum.app/id/63/200x150'
      // or
      // imgsRef.value  = {
      //   title: 'this is a placeholder',
      //   src: 'http://via.placeholder.com/350x150'
      // }
      onShow()
    }
    const showMultiple = () => {
     

       
      console.log('this.text', text)
      console.log('props.foto_300', props.foto_300)
      console.log('this.foto_300[1]', props.foto_300[1])
  
      let p = ""
      let arrFoto=[] 
      const arrImg=['resized_300-15.jpg', 'resized_300-16.jpg']
      console.log('arrImg 0', arrImg)
      console.log('arrFoto 0', arrFoto)
                  
           
      for (const foto of props.foto_700) {
        console.log('foto 0', foto)
         p = `http://localhost:3000/${foto}`
         console.log('http://localhost:3000/${foto}', `http://localhost:3000/${foto}`)
         arrFoto.push(p)
        
        }
        console.log('arrFoto 1', arrFoto)
        
        imgsRef.value = arrFoto
     
      indexRef.value = 0 // index of imgList
      onShow()
    }
    const onHide = () => (visibleRef.value = false)

    return {
      visibleRef,
      indexRef,
      imgsRef,
      showSingle,
      showMultiple,
      onHide
    }
  },
   
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

<style  scoped>

 
</style>