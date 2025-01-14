<template>
  <div class="card">
    <h3>форма ввода значений страницы</h3>
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
    
   
  <hr/>
  <button class="btn" v-on:click="sendMessege">Отправить</button>
  <hr/>
  <textarea 
  class="input" 
  v-model="dataTextarea"
  />
</div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            pageName:"",
            headlineOne:"",
            initialText:"",
            headlineTwo:"",
            articleText:"",
            headlineThree:"",
            sectionText:"",
        
        }
    },
    methods:{
        sendMessege(){
            const data = {
                firstName: this.firstName,
                lastName: this.lastName,
                 password: this.dataInput
            }
            this.dataTextarea = data
            console.log('Messege sended', this.dataInput)
            axios.post('http://localhost:3000/form', {
                        pageName: this.pageName,
                        headlineOne: this.headlineOne,
                        initialText: this.initialText,
                        headlineTwo: this.headlineTwo,
                        articleText: this.articleText,
                        headlineThree: this.headlineThree,
                        sectionText: this.sectionText,

                    
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                        }

    }

}
</script>

<style>

</style>