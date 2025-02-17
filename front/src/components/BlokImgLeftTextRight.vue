<template>
<div class="img-wrap">
<div class="item-0-4">
    <a><img src="https://lipsum.app/id/63/200x150" width="300" height="200" /></a>
    <a><img src="http://localhost:3000/resized_300-8.jpg" width="300" height="200" /></a>
    <a><img v-show="imageSmallUrl" :src="imagePath" width="300" height="200" /></a>
     <a><img v-show="imageSmallUrl" :src="`${PATH_UPLOAD}/${imageSmallUrl}`" width="300" height="200" /></a>
    <!-- <a><img :src="require(`${PATH_UPLOAD}/resized_300-7.jpg`)" width="300" height="200" /></a> -->
    <!-- <img :src="require(`${PATH_UPLOAD}/resized_300-7.jpg`)" alt="selectedImage"> -->
    <!-- <img :src="require(`../assets/images/${selectedImage.toLowerCase()}.jpg`)" :alt="selectedImage"> -->
    <hr/>
      <label>File
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
      <button v-on:click="submitFile()">Загрузить фото</button>
      <hr/>
 </div>
<div class="item-0-6">
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
<p>Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </p>
</div>
<h2> Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when</h2>
 <p>Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </p>
    <p>Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </p>
    
 <p>Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when </p>
 
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
    imageSmallUrl:''
  }
}, computed: {
    imagePath() {
      return this.PATH_UPLOAD+'/'+this.imageSmallUrl;
    }
  },
    methods:{
        handleFileUpload(){
                  this.file = this.$refs.file.files[0];
                  console.log('this.$refs', this.$refs)
                  console.log('this.$refs.file;', this.$refs.file)
                  console.log('this.$refs.file.files;', this.$refs.file.files)
                  console.log('this.$refs.file.files[0];', this.$refs.file.files[0])
                  console.log('this.$refs.file.files[0];', this.$refs.file.files[0])
                  },
                  async  submitFile(){
                    console.log('this.file', this.file)
                    let formData = new FormData();
                    formData.append('file', this.file);
                     try {
                      const data  = await axios.post('http://127.0.0.1:3000/BlokImgLeftTextRightFile', 
                      formData, 
                      {
                          headers: {
                          'Content-Type': 'multipart/form-data'
                          }
                      }
                      )
                       this.imageSmallUrl=data.data.small
                       this.imageBigUrl=data.data.big
                      console.log('data', data, this.simpleText);
                      console.log('this.imageSmallUrl', this.imageSmallUrl);
                      console.log('imageBigUrl', this.imageBigUrl);
                     
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