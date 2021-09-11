<template>
  <view class="filter-block">
    <view class="filter-wrapper">
      <navigator url="/pages/carList/carSearch/carSearch" class="search-bar">
        <div>快速搜索</div>
        <image class="search-icon" src="@/static/search-glass.png" />
      </navigator>

      <view class="car-class-list">
        <view class="class-block" :class="{['class-selected']:item===carClass}" v-for="item in carFilter" :key="item"
          @tap="onChangeCarClass(item)">
          {{item}}
        </view>
      </view>
    </view>
    <div class="divider"></div>
  </view>
</template>

<script>
  import {
    mapState,
  } from 'vuex'



  export default {
    props: ['carClass'],
    data() {
      return {
        carFilter: ['D', 'C', 'B', 'A', 'S'],
      };
    },
    computed: {

    },
    methods: {
      onChangeCarClass(carClass) {
        if (this.carClass !== carClass) {

          this.$emit('onChangeCarClass', carClass)
        }
      },
    }
  }
</script>

<style lang="scss">
  .filter-block {
    // display: flex;
    z-index: 114514;
    background-color: $theme-color;

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }

    width: 100%;
  }

  .filter-wrapper {
    display: flex;
    margin: 0 auto;
    padding: 0 20rpx;
    box-sizing: border-box;
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
      height: toPadPx(2);
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

  .filter-label {
    flex: none;
    color: #fff;

    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }


  .car-class-list {
    display: flex;
    margin-left: auto;
    // width: 100%;
  }

  .class-block {
    font-size: 36rpx;
    // flex: 1;
    width: 72rpx;
    // border-radius: 1000rpx;
    display: flex;
    justify-content: center;
    height: 72rpx;
    line-height: 72rpx;
    // text-align: center;
    box-sizing: border-box;
    font-weight: bold;
    // background-color: #fff;

    @include pad-devices {

      font-size: toPadPx(36);
      width: toPadPx(72);
      height: toPadPx(72);
      line-height: toPadPx(72);
    }

  }


  .class-block {
    color: #fff;

    @media (prefers-color-scheme: dark) {

      color: $text-title-color-dark;
    }
  }

  .class-selected {
    color: $theme-color;
    background-color: #fff;

    @media (prefers-color-scheme: dark) {

      color: $card-bg-color-dark;
      background-color: $text-title-color-dark;
    }

  }

  .search-bar {
    flex: 1;
    margin-right: 32rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;
    padding: 12rpx 20rpx;
    border-radius: 100px;
    background-color: #aa0038;
    color: #fff;

    @media (prefers-color-scheme: dark) {
      color: var(--text-title-color);
      background-color: var(--page-bg-color);
    }

    @include pad-devices {
      margin-right: toPadPx(32);
      font-size: toPadPx(28);
      padding: toPadPx(12) toPadPx(20);
      border-radius: toPadPx(100);

    }
  }

  .search-icon {
    width: 28rpx;
    height: 28rpx;

    @include pad-devices {
      width: toPadPx(28);
      height: toPadPx(28);

    }
  }
</style>
