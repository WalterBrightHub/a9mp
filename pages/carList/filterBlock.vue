<template>
  <view class="context">
    <view class="filter-block">
      <view class="filter-wrapper">
        <view class="server-toggle" @tap="toggleServer">{{serverName}} ⇌</view>
        <v-filter class="filter" :brandRange="brandRange" :releaseVersionRange="releaseVersionRange"
          @onChangeSelectMethod="onChangeSelectMethod" />

      </view>
      <view class="divider"></view>
    </view>
    <view class="placeholder"></view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import filter from './components/filter.vue'

  import {
    defaultSelect
  } from './components/filters/carClassFilter/select.js'

  const defaultFilter = {
    'carClass': 'D',
    'carClassAL': 'D',
    'brand': 'Lamborghini',
    'all': 'rank'
  }
  export default {
    components: {
      'v-filter': filter,
    },
    props: ['brandRange', "releaseVersionRange", ],
    data() {
      return {
        selectMethod: defaultSelect
      };
    },
    computed: {
      ...mapState(['server']),
      serverName() {
        return this.server === 'gl' ? "国际" : "国服"
      }
    },
    methods: {
      /*
      server决定collection，filter决定where
      短时间间隔分别unicloud-db的collection属性和where属性，会造成查询错误
      用filter监听server改动，同时改变collection和where
      */
      ...mapMutations(['toggleServer']),
      onChangeSelectMethod(method) {
        this.$emit('onChangeSelectMethod', method)
      },
    }
  }
</script>

<style lang="scss">
  .placeholder {
    height: 92rpx;

    @include pad-devices {
      height: toPadPx(92);
    }
  }

  .filter-block {
    // display: flex;
    position: fixed;
    z-index: 114514;
    background-color: $card-bg-color;

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }

    width: 100%;
  }

  .filter-wrapper {
    display: flex;
    margin: 0 auto;
    padding: 0 20rpx;
    max-width: 768px;
    align-items: center;

    // box-shadow: 0 2rpx 2rpx $divider-color;
    @include pad-devices {
      padding: 0 toPadPx(20);
      // box-shadow: ;

    }

  }

  .divider {
    height: 2rpx;
    background-color: $divider-color;

    @include pad-devices {
      height: 0 toPadPx(2);
      // box-shadow: ;

    }
    
    @media (prefers-color-scheme: dark) {
    
      background-color: $divider-color-dark;
    }
  }

  .filter {
    display: flex;
    flex: 1;
    // 
    box-sizing: border-box;

    @include pad-devices {
      // padding: toPadPx(20);
    }
  }

  .server-toggle {
    // padding: 0 20rpx;
    font-size: 36rpx;
    height: 72rpx;
    line-height: 72rpx;
    // border-radius: 10rpx;
    // margin: 20rpx 0 20rpx 20rpx;

    @include pad-devices {
      font-size: toPadPx(36);
      // padding: 0 toPadPx(20);
      height: toPadPx(72);
      line-height: toPadPx(72);
      // border-radius: toPadPx(10);
      // margin: toPadPx(20) 0 toPadPx(20) toPadPx(20);

    }

    // color: #fff;
    // background-color: $theme-color;
    color: $theme-color;
    background-color: $card-bg-color;

    @media (prefers-color-scheme: dark) {

      color: $theme-color-dark;
      background-color: $card-bg-color-dark;
    }

  }
</style>
