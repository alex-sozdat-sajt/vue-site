<template>
<div class="img-wrap">
 
<div class="item-0-6">
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
<p>Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </p>
</div>
<h2> Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when</h2>
 <p>Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </p>
    <p>Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </p>
    
 <p>Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </p>
 
</div>
<div class="item-0-4">
      
      <hr/>
      <div   v-for="foto of this.foto_300p" :key = "foto">
          <!-- <a v-on:click="showMultiple(`http://localhost:3000/${foto}`)"  >  -->
          <img :src="`http://localhost:3000/${foto}`" width="300" height="250" />
        <!-- </a> -->
        </div>
        
        <hr/>
        <label>Files on page  
            <input type="file" id="files" name="files[]" multiple ref="files" v-on:change="handleFilesUpload()"/>
          </label>
        <button v-on:click="submitFiles()">Загрузить несколько фото</button>
        
       
      <hr/>
   </div>
</template>

<script>
 const   PATH_UPLOAD = process.env.VUE_APP_PATH_UPLOAD
console.log( ' PATH_UPLOAD', PATH_UPLOAD)
console.log( ' PATH_UPLOAD', process.env.VUE_APP_PATH_UPLOAD)
import axios from 'axios';
export default {
    data(){
         
  return{
    PATH_UPLOAD:process.env.VUE_APP_PATH_UPLOAD,
    imageSmallUrl:'',
    foto_300p: {},
        foto_700p: {},
        files:{},
  }
}, computed: {
    imagePath() {
      return this.PATH_UPLOAD+'/'+this.imageSmallUrl;
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
        
    },
    

}
</script>

<style>
.img-wrap {
    display: flex
;
    flex-wrap: wrap;
    margin: 0 auto;
}
.item-0-4 {
    /* padding-top: 40px; */
    text-align: center;
    width: 40%;
    height: auto;
    display: block;
}
.item-0-6 {
    width: 60%;
    height: auto;
    display: block;
}

</style>