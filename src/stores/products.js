import axios from 'axios'

export default {
  namespaced: true,
  strict: true,
  state: {
    products: [],
    product: [],
    randomproduct: []
  },
  mutations: {
    PRODUCTS (state, payload) {
      state.products = payload
      for (let i = state.products.length - 1; i >= 0; i--) {
        state.products[i].num = '1'
      }
    },
    PRODUCT (state, payload) {
      state.product = payload
      state.product.num = 0
    },
    RANDOMPRODUCT (state, payload) {
      state.randomproduct = []
      for (let i = 0; i <= 2; i++) {
        state.randomproduct.push(payload.shift())
      }
    }
  },
  actions: {
    getProducts (context, payload) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products/all`
      context.commit('LOADING', true, { root: true })
      if (payload === '全部') {
        axios.get(api).then(response => {
          context.commit('PRODUCTS', response.data.products)
          context.commit('LOADING', false, { root: true })
        })
      } else {
        axios.get(api).then(response => {
          context.commit('PRODUCTS', response.data.products.filter(item => {
            if (item.description === payload) {
              return true
            }
          }))
          context.commit('LOADING', false, { root: true })
        })
      }
    },
    getProduct (context, payload) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/product/${payload}`
      context.commit('LOADING', true, { root: true })
      axios.get(url).then(response => {
        context.commit('PRODUCT', response.data.product)
        context.commit('LOADING', false, { root: true })
      })
    },
    randomproducts (context, payload) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products/all`
      axios.get(api).then(response => {
        const productssort = response.data.products.sort(item => {
          return Math.random() - 0.5
        })
        context.commit('RANDOMPRODUCT', productssort)
      })
    }
  },
  getters: {
    products: state => state.products,
    product: state => state.product,
    randomproduct: state => state.randomproduct
  }
}
