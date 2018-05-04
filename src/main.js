import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import Cambios from './Cambios.vue'
import Flujo from './Flujo.vue'
import VueRouter from 'vue-router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "./css/main.css"

Vue.use( BootstrapVue );
Vue.use( VueRouter );


const routes = [
    { path: '/', component: App },
    { path: '/cambios', component: Cambios },
    { path: '/flujo/:id', component: Flujo }
];

const router = new VueRouter({
    routes // short for `routes: routes`
})

new Vue( {
    router
} ).$mount("#app")


/*new Vue( {
    el: '#app',
    template: '<App />',
    components: {App}
} )*/
