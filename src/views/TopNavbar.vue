<template>
    <div>
      <!-- <loading :active.sync="isLoading"></loading> -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <router-link to="/">
            <a  href="#"><img src="../assets/img/logo.png" alt="" srcset="" style="width:80%;"></a>
          </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto ml-5 ">
      <li class="nav-item mr-3 ml-3 active">
            <router-link to="/PurchaseItem">
              <button type="button" class="btn btn-primary">購買水果</button>
            </router-link>
      </li>
      <li class="nav-item mr-3 ml-3">
            <router-link to="/Transport">
              <button type="button" class="btn btn-success">運送方式</button>
            </router-link>
      </li>
      <li class="nav-item mr-3 ml-3">
            <router-link to="/Lottery">
              <button type="button" class="btn btn-warning">優惠輪盤</button>
            </router-link>
      </li>
    </ul>
    <div class="form-inline my-2 my-lg-0 mr-3">
      <a href="#" @click="openshoppingModal" v-if="nub"><i class="fas fa-cart-plus"><span class="nub" >{{ nub }}</span></i></a>
   </div>
    <div class="form-inline my-2 my-lg-0">
      <a href="#" @click="openModal"><i class="fas fa-cog fa-2x"></i></a>
    </div>
  </div>
</nav>
<!-- LoginModal -->
<LoginModal :user="user" :confirmuser="confirmuser" @signin="signin"/>
<!-- 開起購物車model -->
<ShoppingModal :cart="cart" @fillin="fillin" @removeCartItem="removeCartItem"/>
    </div>
</template>

<script>
import $ from 'jquery'
import LoginModal from '../components/LoginModal.vue'
import ShoppingModal from '../components/ShoppingModal.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      // cart: {},
      confirmuser: false,
      // nub: 0,
      coupon_code: ''
    }
  },
  methods: {
    openModal () {
      const vm = this
      vm.user.username = ''
      vm.user.password = ''
      vm.confirmuser = false
      $('#exampleModalCenter').modal('show')
    },
    openshoppingModal () {
      $('#shoppingModal').modal('show')
    },
    signin () {
      const api = `${process.env.VUE_APP_API}/admin/signin`
      const vm = this
      this.$http.post(api, vm.user).then(response => {
        console.log(response.data)
        if (response.data.success) {
          $('#exampleModalCenter').modal('hide')
          vm.$router.push('/admin/products')
        } else {
          vm.confirmuser = true
        }
      })
    },
    fillin () {
      $('#shoppingModal').modal('hide')
      // this.$router.push('/orderform')
    },
    // 區域時
    ...mapActions('cartModules', ['getCart']),
    // 全域時
    // ...mapActions(['getCart']),
    // 如果有參數的話，還是要用下面執行
    // getCart () {
    //   this.$store.dispatch('getCart')
    //   // const vm = this
    //   // const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`
    //   // // vm.isLoading = true
    //   // vm.$store.dispatch('updateLoading', true)
    //   // this.$http.get(url).then(response => {
    //   //   // console.log(response.data)
    //   //   vm.cart = response.data.data
    //   //   vm.nub = response.data.data.carts.length
    //   //   // vm.isLoading = false
    //   //   vm.$store.dispatch('updateLoading', false)
    //   // })
    // },
    removeCartItem (id, title, qty) {
      // 區域時
      this.$store.dispatch('cartModules/removeCartItem', { id, title, qty })
      // 全域時
      // this.$store.dispatch('removeCartItem', { id, title, qty })
      // const vm = this
      // const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${id}`
      // this.$http.delete(url).then(() => {
      //   this.$bus.$emit('messsage:push', title + qty + '個刪除成功', 'danger')
      //   vm.getCart()
      // })
    }
  },
  created () {
    const vm = this
    vm.getCart()
  },
  components: {
    LoginModal,
    ShoppingModal
  },
  computed: {
    // 區域時
    ...mapGetters('cartModules', ['cart', 'nub'])
    // 全域時
    // ...mapGetters(['cart', 'nub'])
    // cart () {
    //   return this.$store.state.cart
    // },
    // nub () {
    //   return this.$store.state.nub
    // }
  }
}
</script>
