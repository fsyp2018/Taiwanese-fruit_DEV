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
              <button type="button" class="btn btn-secondary">優惠輪盤</button>
            </router-link>
      </li>
    </ul>
<div class=" mr-3" v-if="nub">
  <a  href="#" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="fas fa-cart-plus fa-2x"><span class="nub" >{{ nub }}</span></i>
  </a>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
    <div class="mr-2 ml-2" style="width:500px">
    <h5 class="modal-title text-center mt-2" id="exampleModalCenterTitle">購物清單</h5><br>
          <div>
        <table class="table">
          <thead>
            <th>刪除</th>
            <th >品名</th>
            <th >數量</th>
            <th >單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click.prevent="removeCartItem(item.id,item.product.title,item.qty)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-left">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-left">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-left text-success">折扣價</td>
              <td class="text-left text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div>
      <router-link to="/orderform" class="nav-link">
      <button class="btn btn-sg btn-primary btn-block text-center">結帳去</button>
      </router-link>
      </div>
    </div>
  </div>
</div>
    <div class="form-inline my-2 my-lg-0">
      <a href="#" @click="openModal"><i class="fas fa-cog fa-2x"></i></a>
    </div>
  </div>
</nav>
<!-- LoginModal -->
<LoginModal :user="user" :confirmuser="confirmuser" @signin="signin"/>
    </div>
</template>

<script>
import $ from 'jquery'
import LoginModal from '../components/LoginModal.vue'
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
    LoginModal
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
