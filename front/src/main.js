import { createApp } from 'vue'
import App from './App.vue'
import '/theme.css'
// import router from './router'
import { createMemoryHistory, createRouter } from 'vue-router'
import Form from './components/Form';
 import Page from './components/Page';
 const routes = [
     {
        name: 'MyCustomRoutePage',
         path: '/Page',
         component: Page,
          meta: {
            title: 'Amazing Title Page',
            description: 'Awesome Amazing Title Page Description',
          }
            
        },

     { 
        name: 'MyCustomRouteForm',
         path: '/Form',
         component: Form,
          meta: {
            title: 'Amazing Title Form',
            description: 'Awesome Amazing Title Form Description',
          }
        
     },
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
  
    const descriptionElement = document.querySelector('head meta[name="description"]')
  
    descriptionElement.setAttribute('content', description || defaultDescription)
  })



const app = createApp(App);
app.use(router);
app.mount('#app');

// createApp(App).mount('#app')



