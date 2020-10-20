import Vue from 'vue'
import store from './store/store.js'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
