<template>
<div class="img-wrap">
  <div>
    <h2> {{ h2_message }}</h2>   
    <input v-show="changeTitle" class="input" v-model="title_h2"  placeholder="Введите Заголовок раздела"/>
    <button v-on:click="changeTitleM">Изменить заголовок</button>
    <button v-show="changeTitle"  v-on:click="saveTitleM">Сохранить заголовок</button>
     <button v-on:click="changeTextM">Изменить текст</button>
      <button v-show="changeText"  v-on:click="saveTextM">Сохранить текст</button>
  </div>
<div class="item-0-4">
    
    <div   v-for="foto of this.foto_300p" :key = "foto">
        <!-- <a v-on:click="showMultiple(`http://localhost:3000/${foto}`)"  >  -->
        <img :src="`http://localhost:3000/${foto}`" width="300" height="250" />
      <!-- </a> -->
      </div>
      
      <hr/>
      <label>Files on page  
          <input type="file" id="files" name="files[]" multiple ref="files" v-on:change="handleFilesUpload(), submitFiles()"/>
        </label>
      <button v-on:click="submitFiles()">Загрузить несколько фото</button>
      
     
    <hr/>
 </div>
 <div v-show="changeText" class="item-0-6">
    
  <Textarea v-model="textarea_value" rows="5" cols="30" />

    
</div>
<div  v-show="!changeText" class="item-0-6">
    
    <p>{{ text_message }}</p>
    
</div>
  
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
        changeTitle: false,
        title_h2: '',
        h2_message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        text_message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        changeText: false,
        textarea_value: '',
      }

}, computed: {
    imagePath() {
      return this.PATH_UPLOAD+'/'+this.imageSmallUrl;
    }
  },
    methods:{
      
      changeTextM(){
         this.changeText=true
        
      },
      changeTitleM(){
         this.changeTitle=true
        console.log('changeTitle')
      },
      saveTextM(){
        this.text_message = this.textarea_value;
        this.changeText=false
      },
      saveTitleM(){
        this.h2_message =  this.title_h2;
        this.changeTitle=false
        console.log('this.title_h2.value', this.title_h2)
      },
                  handleFilesUpload(){
                    console.log('this.$refs.file.files[0];')
                    console.log('this.$refs', this.$refs)
                    // console.log('this.$refs.file.files;', this.$refs.file.files)
                  console.log('this.$refs.files[1];', this.$refs.files[1])
                  console.log('this.$refs.files;', this.$refs.files)
                  console.log('this.$refs.files.files;', this.$refs.files.files)
                  console.log('this.$refs.files;', this.$refs.files)
                  
                  this.files = this.$refs.files.files;
                   this.submitFiles()
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