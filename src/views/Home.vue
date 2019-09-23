<template>
  <div class="home">
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
  // created () {
  //   console.log(process.env.VUE_APP_API)
  //   console.log(process.env.VUE_APP_CUSTOM)
  // }
}
</script>
