<template>
  <view class="context">
    <view class="filter-block">
      <filter class="filter" :brandRange="brandRange" :releaseVersionRange="releaseVersionRange"  @onChangeSelectMethod="onChangeSelectMethod" />
      <view class="placeholder"></view>
    </view>

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
    props: ['carList', 'brandRange', 'limit',"releaseVersionRange"],
    data() {
      return {
        selectMethod: defaultSelect
      };
    },
    computed: {
      selectedCars: function() {
        return this.selectMethod(this.carList).slice(0, this.limit)
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
      }
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

  .filter {
    display: flex;
    position: fixed;
    z-index: 114514;
    width: 100%;
    background-color: $page-bg-color;

    @media (prefers-color-scheme: dark) {
      background-color: $page-bg-color-dark;
    }

    padding: 20rpx;
    box-sizing: border-box;

    @include pad-devices {
      padding: toPadPx(20);
    }
  }

  .car-card-list {
    padding: 0 20rpx;
    padding-bottom: 40rpx;

    @include pad-devices {
      padding: 0 toPadPx(20);
      padding-bottom: toPadPx(40);
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
