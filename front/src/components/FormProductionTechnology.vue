<template>
    <div class="card">
      <nav>
      <RouterLink to="/Page">Go to Page</RouterLink>
      <hr/>
       
    </nav>
      <h3>форма ввода значений страницы Production Technology</h3>
      <input class="input" v-model="pageName"  placeholder="Введите название страницы"/>
      <hr/>
      <input class="input" v-model="headlineOne"  placeholder="Введите заголовок Страницы"/>
      <hr/>
      <textarea   class="input" v-model="initialText" placeholder="Введите начальный текст"/>
      <hr/>
      <input class="input" v-model="headlineTwo"  placeholder="Введите заголовок Статьи"/>
      <hr/>
      <textarea   class="input" v-model="articleText" placeholder="Введите текст статьи"/>
      <hr/>
      <input class="input" v-model="headlineThree"  placeholder="Введите заголовок Раздела"/>
      <hr/>
      <textarea   class="input" v-model="sectionText" placeholder="Введите текст раздела"/>
      <hr/>
      <hr/>
      <label>File
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
      <button v-on:click="submitFile()">Загрузить фото</button>
      
     
    <hr/>
    <button class="btn" v-on:click="sendMessege">Отправить данные в базу</button>
    <hr/> <hr/>
    <button class="btn" v-on:click="receivePage">Получить данные из базы</button>
    <hr/>
   
  </div>
  <PageProductionTechnology/>
  </template>
  
     
  <script>
   import PageProductionTechnology from './PageProductionTechnology';
  import axios from 'axios';
  export default {
    components: {
            PageProductionTechnology      
                   
            },
      data(){
         
          return{
              pageName:"",
              headlineOne:"",
              initialText:"",
              headlineTwo:"",
              articleText:"",
              headlineThree:"",
              sectionText:"",
              imageSmallUrl:"",
              imageBigUrl:"",
              simpleText:"Просто текст",
              pageNameFDB:"",
              headlineOneFDB:"",
              initialTextFDB:"",
              headlineTwoFDB:"",
              articleTextFDB:"",
              headlineThreeFDB:"",
              sectionTextFDB:"",
              imageSmallUrlFDB:"",
              imageBigUrlFDB:"",
          
          }
      },
      
      methods:{
           
          sendMessege(){
              
              
              console.log('Messege sended', this.dataInput)
              axios.post('http://localhost:3000/formProductionTechnology', {
                          pageName: this.pageName,
                          headlineOne: this.headlineOne,
                          initialText: this.initialText,
                          headlineTwo: this.headlineTwo,
                          articleText: this.articleText,
                          headlineThree: this.headlineThree,
                          sectionText: this.sectionText,
                          imageSmallUrl: this.imageSmallUrl,
                          imageBigUrl: this.imageBigUrl,
  
                      
                  })
                  .then(function (response) {
                      console.log(response);
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
                 },
                 handleFileUpload(){
                  this.file = this.$refs.file.files[0];
                  
                  console.log('this.$refs.file.files[0];', this.file)
                  },
  
                   async  submitFile(){
                    let formData = new FormData();
                    formData.append('file', this.file);
                     try {
                      const data  = await axios.post('http://127.0.0.1:3000/singleFile', 
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
                      // console.log('this.imageUrl', this.imageUrl);
                      } catch (error) {
                         console.error(error);
                      }
                  },
                //   async receivePage(){
                //         try {
                    
                //     const response = await axios.get('http://localhost:3000/getpageProductionTechnology');
                //     console.log('response', response.data);
                //     console.log('data', this.data);
                //     this.data = response.data
                    
                // } catch (error) {
                //     console.error(error);
                // }
                // console.log('this.data', this.data[0]);
                //     this.pageNameFDB = this.data[0].pageName;
                //     this.pageNameFDB = this.data[0].pageName;
                //     this.headlineOneFDB = this.data[0].headlineOne;
                //     this.initialTextFDB = this.data[0].initialText;
                //     this.headlineTwoFDB = this.data[0].headlineTwo;
                //     this.articleTextFDB = this.data[0].articleText;
                //     this.headlineThreeFDB = this.data[0].headlineThree;
                //     this. sectionTextFDB = this.data[0].sectionText;
                //     this. imageSmallUrlFDB = this.data[0].imageSmallUrl;
                //     this. imageBigUrlFDB = this.data[0].imageBigUrl;

    
   











                // },
                // showData(){
                //     console.log('showData', this.data);
                //     console.log('showData', this.data[0].pageName);
                // },         
  
  
      }
  
  }
  </script>
  
  <style>
  
  </style>