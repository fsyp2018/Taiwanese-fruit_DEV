<template>
    <div>
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <form class="modal-content" @submit.prevent="signin">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">請先登入</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="checkbox mb-3">
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control mb-3"
        placeholder="Email address"
        required
        autofocus
        v-model="user.username"
      >
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="user.password"
      >
      <div class="text-danger" v-if="confirmuser">帳號或密碼錯誤</div>
      </div>
      </div>
      <div class="modal-footer">
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </div>
    </form>
  </div>
</div>
    </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    },
    confirmuser: {
      type: Boolean
    }
  },
  methods: {
    signin () {
      this.$emit('signin')
    }
  }
}
</script>
