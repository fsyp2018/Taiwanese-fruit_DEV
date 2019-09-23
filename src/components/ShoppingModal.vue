<template>
    <div>
<div class="modal fade" id="shoppingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <form class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">購物清單</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="padding:0 10px 0 10px">
      <div >
<div>
      <div>
        <table class="table">
          <thead>
            <th></th>
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
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
      </div>
      </div>
      <div class="modal-footer">
      <router-link to="/orderform" class="nav-link">
      <button class="btn btn-lg btn-primary btn-block" @click="fillin">結帳去</button>
      </router-link>
      </div>
    </form>
  </div>
</div>
    </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Object
    }
  },
  methods: {
    fillin () {
      this.$emit('fillin')
    },
    removeCartItem (id, title, qty) {
      this.$emit('removeCartItem', id, title, qty)
    }
  }
}
</script>
