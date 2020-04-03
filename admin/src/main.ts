import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
// 引入 vue-ele-form
import EleForm from 'vue-ele-form'
import router from './router'
import axios from 'axios'

// 注册 vue-ele-form
Vue.use(EleForm)

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
