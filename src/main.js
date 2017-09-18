// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import constants from './constants'
import './assets/css/pure-min.css'
import './assets/css/style.scss'
import 'vue-toast/dist/vue-toast.min.css'

Vue.config.productionTip = false

Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  created () {
    axios.defaults.baseURL = constants.baseURL
    const accessToken = sessionStorage.getItem('x-access-token')
    if (accessToken) {
      axios.defaults.headers.common['x-access-token'] = accessToken
    }
  }
})
