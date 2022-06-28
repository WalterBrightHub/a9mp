<template>
  <div class="bar-wrapper">
    <div class="bar" :style="style"></div>
  </div>
</template>

<script>
  export default {
    props: ['rate'],
    computed: {
      style({
        rate
      }) {
        return `width: ${rate* 100 + '%'} ;`
      }
    }
  }
</script>

<style lang="scss">
  .bar-wrapper {
    width: 80%;
    margin: 0 auto;
    margin-top: 2rpx;
    height: 5rpx;
    border: 1px solid #41b90a;
    @include pad-devices {
      height: toPadPx(5);
      margin-top: toPadPx(2);
    }
  }

  .bar {
    height: 5rpx;
    background-color: #41b90a;
    @include pad-devices {
      height: toPadPx(5);
    }
  }
</style>
