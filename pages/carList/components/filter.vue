<template>
  <view class="filter">
    <view class="type-filter-block">
      <view class="type-filter-item" >等级</view>
    </view>

    <car-class-filter class="filter-block"
      @onChangeSelectMethod="onChangeSelectMethod" />

  </view>
</template>

<script>
  import {
    mapState,
  } from 'vuex'
  import carClassFilter from './filters/carClassFilter/carClassFilter.vue'

  import selectCarClass from './filters/carClassFilter/select.js'





  export default {
    components: {
      'car-class-filter': carClassFilter,
    },
    props: ['brandRange', 'releaseVersionRange'],
    data() {
      return {
      };
    },
    computed: {
      ...mapState(['server']),
    },
    methods: {

      onChangeSelectMethod(method) {
        this.$emit('onChangeSelectMethod', method)
      },


    }
  }
</script>

<style lang="scss">
  .filter {
    display: flex;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    align-items: center;
  }


  .filter-block {

    margin-left: auto;

    // @include pad-devices {

    //   margin-left: toPadPx(20);
    // }
  }


  .type-filter-block {
    // padding: 0 20rpx;
    font-size: 32rpx;
    font-weight: bold;
    display: flex;
    text-align: center;
    // justify-content: center;
    // flex: 1;
    // margin-left: 30rpx;
    height: 72rpx;
    line-height: 72rpx;
    background-color: $card-bg-color;
    color: $text-title-color;

    overflow-x: auto;
    overflow-y: hidden;

    @include pad-devices {
      font-size: toPadPx(32);
      // padding: 0 toPadPx(20);
      height: toPadPx(72);
      margin-left: toPadPx(30);
      line-height: toPadPx(72);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
      color: $text-title-color-dark;
    }
  }


  .type-filter-item {
    flex: none;
    color: $text-title-color;
    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }

</style>
