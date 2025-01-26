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
      <label>Files  
          <input type="file" id="files" name="files[]" multiple ref="files" v-on:change="handleFilesUpload()"/>
        </label>
      <button v-on:click="submitFiles()">Загрузить несколько фото</button>
      
     
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
              file:"",
              files:{},
          
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
                  console.log('this.$refs', this.$refs)
                  console.log('this.$refs.file;', this.$refs.file)
                  console.log('this.$refs.file.files;', this.$refs.file.files)
                  console.log('this.$refs.file.files[0];', this.$refs.file.files[0])
                  console.log('this.$refs.file.files[0];', this.$refs.file.files[0])
                  },
                  handleFilesUpload(){
                    console.log('this.$refs.file.files[0];')
                    console.log('this.$refs', this.$refs)
                    console.log('this.$refs.file.files;', this.$refs.file.files)
                  console.log('this.$refs.files[1];', this.$refs.files[1])
                  console.log('this.$refs.files.files;', this.$refs.files.files)
                  console.log('this.$refs.files;', this.$refs.files)
                  console.log('this.$refs.file.files;', this.$refs.file.files)
                  this.files = this.$refs.files.files;
                   
                  }
                  ,
  
                   async  submitFile(){
                    console.log('this.file', this.file)
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
                    // formData.append('files', this.files);
                     try {
                      const data  = await axios.post(`http://127.0.0.1:3000/uploadFiles/`, 
                      formData,
                      {
                          headers: {
                          'Content-Type': 'multipart/form-data',
                          'filesNum': `${index}`
                          },
                        //   params: {
                        //         ID: 12345
                        //   },
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
                    this.pageNameFDB = this.data[0].pageName;
                    this.pageNameFDB = this.data[0].pageName;
                    this.headlineOneFDB = this.data[0].headlineOne;
                    this.initialTextFDB = this.data[0].initialText;
                    this.headlineTwoFDB = this.data[0].headlineTwo;
                    this.articleTextFDB = this.data[0].articleText;
                    this.headlineThreeFDB = this.data[0].headlineThree;
                    this. sectionTextFDB = this.data[0].sectionText;
                    this. imageSmallUrlFDB = this.data[0].imageSmallUrl;
                    this. imageBigUrlFDB = this.data[0].imageBigUrl;

    
   











                },
                showData(){
                    console.log('showData', this.data);
                    console.log('showData', this.data[0].pageName);
                },         
  
  
      }
  
  }
  </script>
  
  <style>
  
  </style>