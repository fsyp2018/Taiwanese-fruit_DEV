<template>
  <div>
      <div style="overflow-x: hidden">
        <h1 class="text-center">確認訂單</h1>
        <div class="d-flex justify-content-center row">
        <div class="col-md-4 mr-5">
        <table class="table mt-5">
          <thead>
            <th>刪除</th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
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
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
          </div>
        </div>
      </div>
        <!-- 訂購表單 -->
    <div class="col-md-4 ml-5">
      <form @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-model="form.user.email"
            v-validate="'required|email'"
            placeholder="請輸入 Email"
          >
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email')}}</span>
        </div>

        <div class="form-group">
          <label for="username" >收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            :class="{'is-invalid': errors.has('name')}"
            v-model="form.user.name"
            v-validate="'required'"
            placeholder="輸入姓名"
          >
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            name="tel"
            id="usertel"
            v-model="form.user.tel"
            v-validate="'required'"
            placeholder="請輸入電話"
          >
          <span class="text-danger" v-if="errors.has('tel')">電話必須輸入</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            v-validate="'required'"
            placeholder="請輸入地址"
          >
          <span class="text-danger" v-if="errors.has('address')">地址必須輸入</span>
        </div>
        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
        </div>
    </div>
        </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
      // isLoading: false
    }
  },
  methods: {
    ...mapActions('cartModules', ['getCart']),
    removeCartItem (id, title, qty) {
      this.$store.dispatch('cartModules/removeCartItem', { id, title, qty })
    },
    addCouponCode () {
      const vm = this
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.$store.dispatch('updateLoading', true)
      this.$http.post(url, { data: coupon }).then(response => {
        console.log(response)
        vm.getCart()
        vm.$store.dispatch('updateLoading', false)
      })
    },
    createOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/order`
      const order = vm.form
      vm.$store.dispatch('updateLoading', true)
      // 表單驗證程式碼
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(url, { data: order }).then(response => {
            // console.log('訂單已建立', response)
            if (response.data.success) {
              vm.$router.push(`/ordercheckout/${response.data.orderId}`)
            }
            vm.$store.dispatch('updateLoading', false)
          })
        } else {
          // console.log('欄位不完整')
          this.$bus.$emit('messsage:push', '欄位不完整', 'danger')
          vm.$store.dispatch('updateLoading', false)
        }
      })
    }
  },
  created () {
    const vm = this
    vm.getCart()
  },
  computed: {
    ...mapGetters('cartModules', ['cart'])
  }
}
</script>
