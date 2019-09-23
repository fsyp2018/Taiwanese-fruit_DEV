import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import currencyFilter from './filters/currency.js'
import './bus.js'
import dateFilter from './filters/date.js'
import VeeValidate from 'vee-validate'
import zhWValidate from 'vee-validate/dist/locale/zh_TW'
import lottery from 'vue-lottery'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true
Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_Th', zhWValidate)
Vue.use(lottery)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next)
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API}/api/user/check`

    axios.post(api).then((response) => {
      // console.log(response.data)
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/'
        })
      }
    })
  } else {
    next()
  }
})
