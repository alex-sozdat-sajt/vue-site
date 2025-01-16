//  import Vue from 'vue'
// import Router from 'vue-router'
import { createMemoryHistory, createRouter } from 'vue-router'
import Form from './components/Form';
 import Page from './components/Page';
// import HomeView from './HomeView.vue'
// import AboutView from './AboutView.vue'
// Vue.use(Router)
// export default new Router({
//     mode: 'history',
//     routes:[
//         {
//             path: '/',
//             component: Form
//         },
//         {
//             path: '/Form',
//             component: ()=> import('./components/Page.vue')
//         }
//     ]
// }) 
const routes = [
    { path: '/', component: Page },
    { path: '/Form', component: Form },
  ]
  export  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })