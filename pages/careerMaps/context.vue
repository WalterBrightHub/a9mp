<template>
  <view class="context">
    <view class="map-list">
      <view class="map-card" v-for="theme in themes" :key="theme">
        <view class="theme">{{theme}}</view>
        <view class="row">
          <view class="map-name"></view>
          <view class="car-class" v-for="item in ['D','C','B','A','S']" :key="item">{{item}}</view>
        </view>
        <view class="row" v-for="item in selectedCareerMaps[theme]['ll']" :key="item._id">
          <view class="map-name">{{item.mapName}}</view>
          <view class="place" v-for="place in [item['D'],item['C'],item['B'],item['A'],item['S']]">{{place}}</view>
        </view>
        <view class="divider" />
        <view class="row" v-for="item in selectedCareerMaps[theme]['l']" :key="item._id">
          <view class="map-name">{{item.mapName}}</view>
          <view class="place" v-for="place in [item['D'],item['C'],item['B'],item['A'],item['S']]">{{place}}</view>
        </view>
        <view class="divider" />
        <view class="row" v-for="item in selectedCareerMaps[theme]['m']" :key="item._id">
          <view class="map-name">{{item.mapName}}</view>
          <view class="place" v-for="place in [item['D'],item['C'],item['B'],item['A'],item['S']]">{{place}}</view>
        </view>
        <view class="divider" />
        <view class="row" v-for="item in selectedCareerMaps[theme]['s']" :key="item._id">
          <view class="map-name">{{item.mapName}}</view>
          <view class="place" v-for="place in [item['D'],item['C'],item['B'],item['A'],item['S']]">{{place}}</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import selectCareerMaps from './selectCareerMaps.js'
  export default {
    props: ['careerMaps', 'mode'],
    data() {
      return {

      };
    },
    computed: {
      selectedCareerMaps() {
        return selectCareerMaps[this.mode](this.careerMaps)
      },
      themes() {
        return Object.keys(this.selectedCareerMaps)
      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  .context {
    max-width: 768px;
    margin: 0 auto;
  }


  .map-list {
    padding: 20rpx 20rpx 30rpx 20rpx;

    @include pad-devices {
      padding: toPadPx(20) toPadPx(20) toPadPx(30) toPadPx(20);
    }
  }

  .map-card {
    padding-bottom: 10rpx;
    border-radius: 10rpx;
    background-color: $card-bg-color;

    @include pad-devices {
      padding-bottom: toPadPx(10);
      border-radius: toPadPx(10);

    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }
  }

  .map-card+.map-card {
    margin-top: 20rpx;
  }

  .theme {
    padding: 20rpx;
    color: $theme-color;
    font-size: 36rpx;
    font-weight: bold;

    @include pad-devices {
      padding: toPadPx(20);
      font-size: toPadPx(36);
    }

    @media (prefers-color-scheme: dark) {
      color: $theme-color-dark;
    }


  }

  .row {
    padding: 8rpx 20rpx;
    font-size: 24rpx;
    display: flex;
    justify-content: space-between;

    @include pad-devices {
      padding: toPadPx(8) toPadPx(20);
      font-size: toPadPx(24);
    }
  }

  .map-name {

    width: 168rpx;

    @include pad-devices {
      width: toPadPx(168);
    }
  }

  .place {
    width: 90rpx;

    @include pad-devices {
      width: toPadPx(90);
    }
  }

  .divider {
    padding-top: 1rpx;
    background-color: $divider-color;
    margin: 10rpx 0;

    @include pad-devices {
      padding-top: toPadPx(1);
      margin: toPadPx(10) 0;
    }

    @media (prefers-color-scheme: dark) {
      background-color: $divider-color-dark;
    }
  }

  .car-class {
    font-weight: bold;
    text-align: center;

  }

  .place,
  .car-class {
    width: 90rpx;

    @include pad-devices {
      width: toPadPx(90);
    }
  }

  .car-class,
  .map-name {
    font-weight: bold;
    color: $text-title-color;

    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }
</style>
