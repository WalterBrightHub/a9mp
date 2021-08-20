<template>
  <view class="func-button-list-wrapper">
    <view class="func-button-list">
      <navigator class="func-button-item" url="/pages/carList/funcs/carClass/carClass">
        <image class="func-icon" src="@/static/carlist-func-button-icons/car-class.png"></image>
        <view class="func-title">等级分布</view>
      </navigator>

      <navigator class="func-button-item" url="/pages/carList/funcs/carSort/carSort">
        <image class="func-icon" src="@/static/carlist-func-button-icons/data-sort.png"></image>
        <view class="func-title">数据排序</view>
      </navigator>

      <navigator class="func-button-item" url="/pages/carList/funcs/carBrand/carBrand">
        <image class="func-icon" src="@/static/carlist-func-button-icons/car-brand.png"></image>
        <view class="func-title">品牌分类</view>
      </navigator>

      <navigator class="func-button-item" url="/pages/carList/funcs/releaseVersion/releaseVersion">
        <image class="func-icon" src="@/static/carlist-func-button-icons/release-version.png"></image>
        <view class="func-title">版本新车</view>
      </navigator>

      <navigator class="func-button-item" url="/pages/careerMaps/mapNameComparison/mapNameComparison">
        <image class="func-icon" src="@/static/carlist-func-button-icons/get-way.png"></image>
        <view class="func-title">获取方式</view>
      </navigator>

      <navigator class="func-button-item" url="/pages/careerMaps/mapNameComparison/mapNameComparison">
        <image class="func-icon" src="@/static/carlist-func-button-icons/car-character.png"></image>
        <view class="func-title">车辆特性</view>
      </navigator>

    </view>
  </view>

</template>

<script>
  export default {
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .func-button-list-wrapper{
    display: flex;
    justify-content: center;
  }
  .func-button-list {
    max-width: 768px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 16.66%);
    grid-row-gap: 20rpx;
    // align-self: center;

    margin: 0 20rpx 20rpx 20rpx;

    @include pad-devices {
      margin: 0 toPadPx(20) toPadPx(20) toPadPx(20);
    grid-row-gap: toPadPx(20);
    }
  }

  .func-button-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $text-title-color;
    border-radius: 10rpx;

    @include pad-devices {
      border-radius: toPadPx(10);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }



  .func-icon {
    width: 64rpx;
    height: 64rpx;

    @include pad-devices {
      width: toPadPx(64);
      height: toPadPx(64);
    }

    @media (prefers-color-scheme: dark) {
      filter: invert(30%);
    }
  }

  .func-title {
    font-size: 24rpx;

    // margin-top: 10rpx;
    @include pad-devices {
      font-size: toPadPx(24);
    }
  }
</style>
