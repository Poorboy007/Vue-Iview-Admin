import Vue from 'vue'
// Iview
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import App from './App.vue'
import store from './store'
import router from './router'
// import axios from 'axios'
// import './libs/axios'

Vue.config.productionTip = false

if (process.env.APP_ENV === 'mock') require('@/mock')
// Vue.prototype.$axios = axios
Vue.use(ViewUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#ICS-Main')
