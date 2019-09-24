<template>
      <div class="mr-3 ml-3" style="overflow-x: hidden;">
        <div class="text-center">
           <h2>根據季節進行選購，以品味最好的味道</h2>
        </div>
<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#" role="tab" aria-controls="pills-home" aria-selected="true" @click.prevent="getProducts('全部')">全部</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#" role="tab" aria-controls="pills-profile" aria-selected="false" @click.prevent="getProducts('春季')">春季水果</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#" role="tab" aria-controls="pills-profile" aria-selected="false" @click.prevent="getProducts('夏季')">夏季水果</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#" role="tab" aria-controls="pills-profile" aria-selected="false" @click.prevent="getProducts('秋季')">秋季水果</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#" role="tab" aria-controls="pills-profile" aria-selected="false" @click.prevent="getProducts('冬季')">冬季水果</a>
  </li>
</ul>
  <div class="link-top"></div>
    <ul class="grid cs-style-3">
      <li v-for="(item) in products" :key="item.id">
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
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    getProducts (selitem) {
      this.$store.dispatch('productsModules/getProducts', selitem)
    },
    details (id) {
      const vm = this
      vm.$router.push(`/ProductDetails/${id}`)
    }
  },
  created () {
    const vm = this
    vm.getProducts('全部')
  },
  computed: {
    ...mapGetters('productsModules', ['products'])
  }
}
</script>
