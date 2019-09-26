import Vue from 'vue'
import axios from 'axios'

export default {
  // 是否變成區域變數
  namespaced: true,
  strict: true,
  state: {
    // isLoading: false,
    cart: {},
    nub: 0
  },
  mutations: {
    // LOADING (state, status) {
    //   state.isLoading = status
    // },
    CART (state, paylaod) {
      state.cart = paylaod
    },
    NUB (state, paylaod) {
      state.nub = paylaod
    }
  },
  actions: {
    // updateLoading (context, status) {
    //   context.commit('LOADING', status)
    // },
    getCart (context) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`
      context.commit('LOADING', true, { root: true })
      axios.get(url).then(response => {
        context.commit('CART', response.data.data)
        context.commit('NUB', response.data.data.carts.length)
        context.commit('LOADING', false, { root: true })
      })
    },
    removeCartItem (context, { id, title, qty }) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${id}`
      axios.delete(url).then(() => {
        new Vue().$bus.$emit('messsage:push', title + qty + '個刪除成功', 'danger')
        context.dispatch('getCart')
      })
    },
    addtoCart (context, { id, qty, title }) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`
      const cart = {
        product_id: id,
        qty
      }
      context.commit('LOADING', true, { root: true })
      axios.post(url, { data: cart }).then(response => {
        new Vue().$bus.$emit('messsage:push', title + qty + '個已加到購物車中', 'success')
        context.dispatch('getCart')
        context.commit('LOADING', false, { root: true })
      })
    }
  },
  getters: {
    cart: state => state.cart,
    nub: state => state.nub
    // cart (state) {
    //   return state.cart
    // },
    // nub (state) {
    //   return state.nub
    // }
  }
}
