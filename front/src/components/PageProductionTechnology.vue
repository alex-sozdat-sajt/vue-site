<template>
   <label>Files on page  
          <input type="file" id="files" name="files[]" multiple ref="files" v-on:change="handleFilesUpload()"/>
        </label>
      <button v-on:click="submitFiles()">Загрузить несколько фото</button>
      
     
    <hr/>
  <hr/>
  <div class="card">
    <a v-on:click="showSingle('https://lipsum.app/id/63/1600x1200')"  >
    <img src="https://lipsum.app/id/63/200x150" width="300" height="200" /></a>

    <a v-on:click="showMultiple('https://lipsum.app/id/60/1600x1200')"  >
      <img src="https://lipsum.app/id/60/200x150" width="300" height="200" /></a>
      </div>
      <button @click="console.log(this.foto_300)"> console.log(this.foto_300 P) </button>
      <div class="gallery-1"> 
      <div   v-for="foto of this.foto_300" :key = "foto">
        <a v-on:click="showMultiple(`http://localhost:3000/${foto}`)"  > 
        <img :src="`http://localhost:3000/${foto}`" width="300" height="250" />
      </a>
      </div>
      <div   v-for="foto of this.foto_300p" :key = "foto">
        <!-- <a v-on:click="showMultiple(`http://localhost:3000/${foto}`)"  >  -->
        <img :src="`http://localhost:3000/${foto}`" width="300" height="250" />
      <!-- </a> -->
      </div>
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
      // console.log('props.foto_300', props.foto_300)
      // console.log('this.foto_300[1]', props.foto_300[1])
  
      let p = ""
      let arrFoto=[] 
      const arrImg=['resized_300-15.jpg', 'resized_300-16.jpg']
      console.log('arrImg 0', arrImg)
      console.log('arrFoto 0', arrFoto)
                  
           
       for (const foto of props.foto_700) {
      //  for (const foto of this.foto_700) {
      
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
        foto_300p: {},
        foto_700p: {},
        files:{},


         
    }
},
methods:{
  handleFilesUpload(){
                    console.log('this.$refs.file.files[0];')
                    console.log('this.$refs', this.$refs)
                    // console.log('this.$refs.file.files;', this.$refs.file.files)
                  console.log('this.$refs.files[1];', this.$refs.files[1])
                  console.log('this.$refs.files;', this.$refs.files)
                  console.log('this.$refs.files.files;', this.$refs.files.files)
                  console.log('this.$refs.files;', this.$refs.files)
                  
                  this.files = this.$refs.files.files;
                   
                  }
                  ,
                 async  submitFiles(){
                    console.log('this.files', this.files)
                    console.log('this.files.length', this.files.length)
                    const index =  this.files.length;
                    console.log('index 0', index)
                    let formData = new FormData();
                    formData.append("data", {"index": `${index}`});
                    for (let i = 0; i < this.files.length ; i++) { // выведет 0, затем 1, затем 2
                        formData.append('file', this.files[i]);
                        console.log('formData', formData)
                        }
                    
                     try {
                      const response  = await axios.post(`http://127.0.0.1:3000/uploadFiles/`, 
                      formData,
                      {
                          headers: {
                          'Content-Type': 'multipart/form-data',
                          'filesnum': `${index}`
                          },
                       
                      }
                      )
                      
                      console.log('const response', response);
                       this.foto_300p = response.data.arr_resized_300
                       this.foto_700p = response.data.arr_resized_700
                       ;
                       console.log('this.foto_300p 0', this.foto_300p);
                      
                      
                      } catch (error) {
                         console.error(error);
                      }
                  },
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
.gallery-1 {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   gap: 20px;

   width: 100%;
	 
	 
	flex-direction: row;
	
;


 }
 .gallery-1 div a img{
   flex-grow: 1;
   flex-shrink: 1;
   flex-basis: auto;
   object-fit: cover; 
   width: 100%; height: 100%; 
   vertical-align: middle; 
   border-radius: 5px;

 }

 
</style>