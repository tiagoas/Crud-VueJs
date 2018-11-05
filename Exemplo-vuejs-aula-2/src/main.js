import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'

Vue.use(VueResource);
Vue.use(VueRouter);
new Vue({
  el: '#app',
  render: h => h(App)
});

/* const routes = [
  { path: '/', component: App }
];

const router = new VueRouter({
  routes // short for routes: routes
});

const vue = new Vue({
  router
}).$mount('#app'); */
