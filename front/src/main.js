import { createApp } from 'vue'
import App from './App.vue'
import '/theme.css'
// import router from './router'
import { createMemoryHistory, createRouter } from 'vue-router'
import Form from './components/Form';
import Page from './components/Page';
 import UsualPage from './components/UsualPage';
 import PageProductionTechnology from './components/PageProductionTechnology';
 import FormProductionTechnology from './components/FormProductionTechnology';
 
 const routes = [
     {
         name: 'MyCustomRoutePage',
         path: '/Page',
         component: Page,
           meta: {
             title: 'Page Amazing Title Page',
             description: 'Awesome Amazing Title Page Description',
                    
        }
    },

     { 
         name: 'MyCustomRouteForm',
         path: '/Form',
         component: Form,
           meta: {
             title: 'Form Amazing Title Form',
             description: 'Awesome Amazing Title Form Description',
          }
        
     },
     { 
        name: 'MyCustomRouteUsual',
        path: '/UsualPage',
        component: UsualPage,
          meta: {
            title: 'Usual Amazing Title Usual',
            description: 'Usual Usual Title Form Description',
         }
       
    },
    { 
        name: 'Production Technology',
        path: '/PageProductionTechnology',
        component: PageProductionTechnology,
          meta: {
            title: 'Production Technology Amazing Title Production Technology',
            description: 'Production Technology Production Technology Title Form Description',
         }
       
    },
    { 
        name: 'Form Production Technology',
        path: '/FormProductionTechnology',
        component: FormProductionTechnology,
          meta: {
            title: 'FormProductionTechnology Technology Amazing Title Production Technology',
            description: 'FormProductionTechnology Technology Production Technology Title Form Description',
         }
       
    }
   ]
     const router = createRouter({
     history: createMemoryHistory(),
     routes,
   })
   router.beforeEach((to) => {
    const { title, description } = to.meta;
    const defaultTitle = 'Default Title';
    const defaultDescription = 'Default Description';
  
    document.title = title || defaultTitle
  
//     // const descriptionElement = document.querySelector('head meta[name="description"]')
//     //если раскоментить перестает работать description не появляется
//     // descriptionElement.setAttribute('content', description || defaultDescription)
  })



const app = createApp(App);
app.use(router);
app.mount('#app');

// createApp(App).mount('#app')



