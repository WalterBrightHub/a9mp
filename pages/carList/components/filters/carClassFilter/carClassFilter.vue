<template>
  <view class="filter-block">
    <view class="class-block" :class="{['class-selected']:item===carClass}" v-for="item in carFilter" :key="item" @tap="onChangeCarClass(item)">
      {{item}}</view>
  </view>
</template>

<script>
  import {
    mapState,
  } from 'vuex'
  import select from './select.js'
  export default {
    data() {
      return {
        carClass: 'D',
        carFilter: ['D', 'C', 'B', 'A', 'S'],
      };
    },
    watch: {
      server(newServer) {
        this.$emit('onChangeSelectMethod', select(this.carClass, newServer))
      }
    },
    computed: {
      ...mapState(['server']),
    },
    methods: {
      onChangeCarClass(newCarClass) {
        if (this.carClass !== newCarClass) {
          this.carClass = newCarClass
          this.$emit('onChangeSelectMethod', select(newCarClass, this.server))
        }
      }
    }
  }
</script>

<style lang="scss">
  .filter-block {
    display: flex;
    // width: 100%;
  }

  .class-block {
    font-size: 36rpx;
    flex: 1;
    height: 72rpx;
    line-height: 72rpx;
    text-align: center;
    box-sizing: border-box;
    font-weight: bold;
    background-color: #fff;

    @include pad-devices {

      font-size: toPadPx(36);
      height: toPadPx(72);
      line-height: toPadPx(72);
    }

  }

  .class-block+.class-block {
    border-left: 2rpx solid $page-bg-color;

    @include pad-devices {

      border-left: toPadPx(2) solid $page-bg-color;
    }

    @media (prefers-color-scheme: dark) {

      border-left: 2rpx solid $page-bg-color-dark;

      @include pad-devices {

        border-left: toPadPx(2) solid $page-bg-color-dark;
      }
    }
  }

  .class-block:first-child {
    border-radius: 10rpx 0 0 10rpx;
  }

  .class-block:last-child {
    border-radius: 0 10rpx 10rpx 0;
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
