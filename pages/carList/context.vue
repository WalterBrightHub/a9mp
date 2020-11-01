<template>
  <view class="context">
    <view class="filter-block">
      <view class="filter-wrapper">
        <view class="server-toggle" @tap="onToggleServer">{{serverName}} ⇌</view>
        <filter class="filter" :brandRange="brandRange" :releaseVersionRange="releaseVersionRange"
          @onChangeSelectMethod="onChangeSelectMethod" />

      </view>
    </view>
      <view class="placeholder"></view>

    <view class="car-card-list">
      <view v-for="item in selectedCars" :key="item._id" class="car-card">
        <car-card :carData="item"></car-card>
      </view>
    </view>
  </view>
</template>

<script>
  import filter from './components/filter.vue'
  import carCard from './components/carCard.vue'

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
      'filter': filter,
      'car-card': carCard
    },
    props: ['carList', 'brandRange', 'limit', "releaseVersionRange", "server"],
    data() {
      return {
        selectMethod: defaultSelect
      };
    },
    computed: {
      selectedCars: function() {
        return this.selectMethod(this.carList).slice(0, this.limit)
      },
      serverName() {
        return this.server === 'gl' ? "国际" : "国服"
      }
    },
    methods: {
      onChangeSelectMethod(method) {
        this.selectMethod = method
        this.$emit('resetLimit')
        // console.log('change')
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 0
        })
      },
      onToggleServer(){
        this.$emit('onToggleServer')
      },
    }
  }
</script>

<style lang="scss">
  .placeholder {
    height: 112rpx;

    @include pad-devices {
      height: toPadPx(112);
    }
  }

.filter-block{
  // display: flex;
    position: fixed;
    z-index: 114514;
    width: 100%;
}

  .filter-wrapper {
    display: flex;
    margin: 0 auto;
    max-width: 768px;
    align-items: center;
    background-color: $page-bg-color;

    @media (prefers-color-scheme: dark) {
      background-color: $page-bg-color-dark;
    }

  }

  .filter {
    display: flex;
    flex: 1;
    padding: 20rpx;
    box-sizing: border-box;
    @include pad-devices {
      padding: toPadPx(20);
    }
  }

  .server-toggle {
    padding: 0 20rpx;
    font-size: 36rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 10rpx;
    margin: 20rpx 0 20rpx 20rpx;

    @include pad-devices {
      font-size: toPadPx(36);
      padding: 0 toPadPx(20);
      height: toPadPx(72);
      line-height: toPadPx(72);
      border-radius:  toPadPx(10) ;
      margin: toPadPx(20) 0 toPadPx(20) toPadPx(20);

    }

    // color: #fff;
    // background-color: $theme-color;
    color: $theme-color;
    background-color: #fff;

    @media (prefers-color-scheme: dark) {

      color: $text-title-color-dark;
      background-color: $theme-color-dark;
    }

  }


  .car-card-list {
    padding: 0 20rpx;
    padding-bottom: 30rpx;

    @include pad-devices {
      padding: 0 toPadPx(20);
      padding-bottom: toPadPx(30);
    }

    margin: 0 auto;
    max-width: 768px;

  }

  .car-card+.car-card {
    margin-top: 20rpx;

    @include pad-devices {
      margin-top: toPadPx(20);
    }
  }

  //宽屏设备，双列排布
  @media (min-width:750px) {
    .car-card-list {
      display: flex;
      flex-wrap: wrap;
    }

    .car-card {
      flex: 1 1 340px;
      margin-top: 20px;
      padding: 0 10px;
      max-width: 354px;
    }

    .car-card+.car-card {
      margin-top: 20px;
    }
  }
</style>
