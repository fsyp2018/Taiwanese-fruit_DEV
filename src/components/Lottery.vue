<template>
<div>
  <div class="d-flex justify-content-center">
    <div class="container row mt-5">
<div class="wraper col">
        <lottery
            @lotteryClick="lotteryClick"
            @lotteryDone="lotteryDone"
            :lottery-start="lotteryStart"
            :lottery-prizenum="prizeNum"
            :lottery-prizeno="prizeNo"
            lottery-bg="./static/turnplate-bg.png"
            content-bg="./static/turntable.png"
            pointer-bg="./static/pointer.png"
            :lottery-width="['85%','35%']"
        />
    </div>
    <div class="col">
      <h1>歡迎來到幸運大輪盤，請按下抽獎以獲取你的優惠代碼。
        <div class="blink" v-if="Winning">恭喜你獲得了{{ Winning }}。<br>你的優惠代碼是{{ WinningCode }}。</div>
      </h1>
    </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      Winning: '',
      WinningCode: '',
      lotteryStart: 0,
      prizeNo: 1,
      prizeNum: 8,
      prizeList: [{ title: '95折', code: '95' }, { title: '9折', code: '90' }, { title: '85折', code: '85' }, { title: '8折', code: '80' }, { title: '75折', code: '75' }, { title: '7折', code: '70' }, { title: '65折', code: '65' }, { title: '6折', code: '60' }]
    }
  },
  methods: {
    lotteryClick () {
      const vm = this
      vm.lotteryStart = 1
      let randomNum = 1 + parseInt(Math.random() * vm.prizeNum)
      vm.prizeNo = randomNum
    },
    lotteryDone (res) {
      const vm = this
      vm.lotteryStart = 0
      let index = res.prizeNo - 1
      vm.Winning = vm.prizeList[index].title
      vm.WinningCode = vm.prizeList[index].code
    }
  }
}
</script>

<style>
.blink {
    line-height:1.5;
    color: red;
    animation-duration: 1s;
    animation-name: blink;
    animation-iteration-count: infinite;
    animation-timing-function: steps(2, start);
}
@keyframes blink {
    80% {
        visibility: hidden;
    }
}
</style>
