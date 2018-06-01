// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
import { routes } from "./routes.js";
import "../node_modules/bulma/bulma.sass";
import "../node_modules/alertifyjs/build/css/alertify.css";
import {User} from './UserClass.js';
import VeeValidate from 'vee-validate';





Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VeeValidate);

const router = new VueRouter({
 mode:'history',
  routes
});


//beforeEach executed before every route is accessed (global).
router.beforeEach((to,from,next)=>{

next(); // must be used so routing can proceed
// next(false); prevents route from proceeding
// next({name:'Home'}) or next('/') can also be used to redirect

});


//event bus to share data among components

export const eventBus = new Vue();


// let initialUserBase = [JSON.stringify(new User('jason', 10, 'email1@email.com')), JSON.stringify(new User('jack', 20, 'email2@email.com')), JSON.stringify(new User('Sarah', 30, 'email3@email.com'))];
// localStorage.setItem('Users',JSON.stringify(initialUserBase));

new Vue({
 
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
