import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import './plugins/avue'
// 引入 vue-ele-form
import EleForm from 'vue-ele-form'
import router from './router'
import axios from 'axios'

// 注册 vue-ele-form
Vue.use(EleForm)

const http = axios.create({
  // baseURL: 'http://localhost:3000'
  baseURL: process.env.VUE_APP_API_URL
})
Vue.prototype.$httpajax = http
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
