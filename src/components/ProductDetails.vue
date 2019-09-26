<template>
  <div>
    <div class="container px-lg-5">
      <div class="row justify-content-center my-5">
        <div class="col">
          <img
            :src="product.imageUrl"
            alt
            srcset
          />
        </div>
        <div class="col">
          <div class="h3 mb-4">{{ product.title }}</div>
          <div class="d-flex justify-content-end">
            <del class="mr-2">原價${{ product.origin_price }}</del>
            <div class="h5 text-danger">特價${{ product.price }}</div>
          </div>
          <hr />
          <div class="d-flex my-4">
            <select name="" class="form-control mr-2" v-model="num">
              <option value="0" selected="selected" disabled="disabled">請選擇商品數量</option>
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>
          </div>
         <button class="btn btn-primary u-pointer" @click.prevent="addtoCart(product.id,num,product.title)">加入購物車</button>
         <div class="text-danger" v-if="confirmnum">請選擇商品數量</div>
         </div>
      </div>
        <div class="u-desc text-left">
            <h4>水果說明</h4>
          </div>
      <hr />
      <div class="row justify-content-center mb-4">
        <div class="col-10">
          <div class="u-desc text-left">
            <h4>{{ product.content }}</h4>
          </div>
        </div>
      </div>
      <hr />
       <div class="u-desc text-left">
            <h4>為你推薦</h4>
          </div>
    <ul class="grid cs-style-3 row justify-content-center my-5">
      <li v-for="(item) in randomproduct" :key="item.id" class="col">
        <figure>
          <img :src="item.imageUrl" alt="img04" />
          <figcaption>
            <h3>{{ item.title }}</h3>
            <span>每{{ item.unit }}特價${{ item.price }}元</span>
            <a href="#" @click.prevent="details(item.id)">詳細內容</a>
          </figcaption>
        </figure>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      num: 0,
      confirmnum: false
    }
  },
  methods: {
    getProduct (id) {
      this.$store.dispatch('productsModules/getProduct', id)
    },
    addtoCart (id, qty, title) {
      const vm = this
      if (qty === 0) {
        vm.confirmnum = true
      } else {
        vm.confirmnum = false
        this.$store.dispatch('cartModules/addtoCart', { id, qty, title })
      }
    },
    getRandom () {
      this.$store.dispatch('productsModules/randomproducts')
    },
    details (id) {
      const vm = this
      vm.$router.push(`/ProductDetails/${id}`)
      vm.getProduct(id)
      vm.getRandom()
    }
  },
  created () {
    const vm = this
    vm.getProduct(this.$route.params.id)
    vm.getRandom()
  },
  computed: {
    ...mapGetters('productsModules', ['product', 'randomproduct'])
  }
}
</script>
