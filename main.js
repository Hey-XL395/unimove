import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
Vue.config.productionTip = false
Vue.prototype.$url = "https://www.imovietrailer.com/superhero"
App.mpType = 'app'
Vue.use(Vuex)
const store = require('./store').default
Vue.prototype.$store = store
const app = new Vue({
    ...App
})
app.$mount()
