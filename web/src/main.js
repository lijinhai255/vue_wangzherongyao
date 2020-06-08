import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'




import VueAwesomeSwiper from 'vue-awesome-swiper'
// require swiper styles
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)


// Introduce card component
import Card from './components/Card'
Vue.component('m-card', Card)

// Introduce ListCard component
import ListCard from './components/ListCard'
Vue.component('m-list-card', ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  // baseURL:process.env.VUE_APP_API_URL || '/web/api'
  baseURL:'http://localhost:3001/web/api'
})

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
