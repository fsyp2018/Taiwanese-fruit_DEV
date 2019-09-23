<template>
    <input type="number" v-model="count" @change="numchange(count)">
</template>

<script>
export default {
  data: function () {
    return {
      count: 1
    }
  },
  methods: {
    numchange (count) {
      const vm = this
      const ikk = vm.ik
      this.$emit('numchange', [ count, ikk ])
    }
  },
  props: {
    ik: {
      type: Number
    }
  }
}
</script>
