<template>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <!-- <loading :active.sync="isLoading"></loading> -->
    <!-- 產品列表 -->
    <table class="table mt-4">
      <thead>
        <tr style="border:3px #AAAAAA ridge;border-radius:10px;font-size:24px;">
          <th>產品名稱</th>
          <th>產品說明</th>
          <th>售價</th>
          <th>數量</th>
          <th width="120">購買</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="item.id" style="border:3px #AAAAAA ridge;border-radius:10px;font-size:24px;">
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.price | currency }}</td>
          <td><NumInput @numchange="nchange" :ik="index"></NumInput></td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="addtoCart(item.id,item.num,item.title)">加到購物車</button>
          </td>
        </tr>
      </tbody>
    </table>
        </main>
</template>

<script>
import NumInput from './NumInput.vue'
export default {
  data () {
    return {
      products: []
      // isLoading: false
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products/all`
      vm.$store.dispatch('updateLoading', true)
      this.$http.get(api).then(response => {
        vm.products = response.data.products.filter(item => {
          if (item.category === '道具') {
            return true
          }
        })
        for (let i = vm.products.length - 1; i >= 0; i--) {
          vm.products[i].num = '1'
        }
        vm.$store.dispatch('updateLoading', false)
      })
    },
    addtoCart (id, qty, title) {
      this.$store.dispatch('cartModules/addtoCart', { id, qty, title })
      // const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`
      // const cart = {
      //   product_id: id,
      //   qty
      // }
      // // console.log(cart)
      // this.$http.post(url, { data: cart }).then(response => {
      //   this.$bus.$emit('messsage:push', title + qty + '個已加到購物車中', 'success')
      //   console.log(response)
      // })
    },
    nchange (count) {
      const vm = this
      const pnum = count[0]
      const pindex = count[1]
      vm.products[pindex].num = pnum
      // console.log(pnum, pindex)
    }
  },
  created () {
    const vm = this
    vm.getProducts()
  },
  components: {
    NumInput
  }
}
</script>
