import Vue from 'vue'
import App from './App.vue'
import { store } from "./store"
import { router } from './router/router'

import popup from './components/popup.vue';

Vue.component('popup', popup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
