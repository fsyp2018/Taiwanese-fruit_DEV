import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import cartModules from './stores/cart.js'
import productsModules from './stores/products.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // 嚴謹模式
  strict: true,
  state: {
    isLoading: false
    // cart: {},
    // nub: 0
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    }
    // CART (state, paylaod) {
    //   state.cart = paylaod
    // },
    // NUB (state, paylaod) {
    //   state.nub = paylaod
    // }
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    }
    // getCart (context) {
    //   const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`
    //   context.commit('LOADING', true)
    //   axios.get(url).then(response => {
    //     context.commit('CART', response.data.data)
    //     context.commit('NUB', response.data.data.carts.length)
    //     context.commit('LOADING', false)
    //   })
    // },
    // removeCartItem (context, { id, title, qty }) {
    //   const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${id}`
    //   axios.delete(url).then(() => {
    //     context.dispatch('getCart')
    //   })
    // },
    // addtoCart (context, { id, qty }) {
    //   const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`
    //   const cart = {
    //     product_id: id,
    //     qty
    //   }
    //   axios.post(url, { data: cart }).then(response => {
    //     context.dispatch('getCart')
    //   })
    // }
  },
  getters: {
    // cart: state => state.cart,
    // nub: state => state.nub
    // cart (state) {
    //   return state.cart
    // },
    // nub (state) {
    //   return state.nub
    // }
  },
  modules: {
    cartModules,
    productsModules
  }
})
