<template>
  <view class="filter-block">
    <view class="class-block" :class="{['class-selected']:item===carClass}" v-for="item in carFilter" :key="item" @tap="onChangeCarClass(item)">
      {{item}}</view>
  </view>
</template>

<script>
  //此组件完全复制了carClass组件，只区别于select.js
  import select from './select.js'
  export default {
    data() {
      return {
        carClass: 'D',
        carFilter: ['D', 'C', 'B', 'A', 'S'],
      };
    },
    methods: {
      onChangeCarClass(newCarClass) {
        if (this.carClass !== newCarClass) {
          this.carClass = newCarClass
          this.$emit('onChangeSelectMethod', select(newCarClass))
        }
      }
    }
  }
</script>

<style lang="scss">
  .filter-block {
    display: flex;
  }

  .class-block {
    font-size: 36rpx;
    width: 72rpx;
    height: 72rpx;
    line-height: 72rpx;
    text-align: center;
    box-sizing: border-box;
    font-weight: bold;
    background-color: #fff;
    color: #000;
    border-radius: 10rpx;

    @include pad-devices {

      font-size: toPadPx(36);
      width: toPadPx(72);
      height: toPadPx(72);
      line-height: toPadPx(72);
      border-radius: toPadPx(10);
    }

  }

  .class-block+.class-block {
    margin-left: 30rpx;

    @include pad-devices {

      margin-left: toPadPx(30);
    }
  }

  .class-block {
    color: $text-title-color;
    background-color: $card-bg-color;

    @media (prefers-color-scheme: dark) {

      color: $text-title-color-dark;
      background-color: $card-bg-color-dark;
    }
  }

  .class-selected {
    color: #fff;
    background-color: #000;

    @media (prefers-color-scheme: dark) {

      color: $card-bg-color-dark;
      background-color: $text-title-color-dark;
    }

  }
</style>
