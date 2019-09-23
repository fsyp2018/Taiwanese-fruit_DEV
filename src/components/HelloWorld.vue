<template>
<div>
  <Alert></Alert>
  <loading :active.sync="isLoading"></loading>
  <TopNavbar class="sticky-top"/>
  <div class="mt-3">
      <router-view/>
  </div>
  </div>
</template>

<script>
import TopNavbar from '../views/TopNavbar.vue'
import Alert from '../views/AlertMessage'
export default {
  components: {
    TopNavbar,
    Alert
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
