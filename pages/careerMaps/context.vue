<template>
  <view class="context">
    <view class="mode-changer">
      <view class="mode-button" @tap="onChangeMode">{{mode==='al'?'国服名':'国际服名'}}</view>
    </view>
    <view class="map-list">
      <view class="map-card" v-for="theme in themes" :key="theme">
        <view class="theme">{{theme}}</view>
        <view class="row">
          <view class="map-name"></view>
          <view class="car-class" v-for="item in ['D','C','B','A','S']" :key="item">{{item}}</view>
        </view>
        <view class="row" v-for="item in selectedCareerMaps[theme]['l']" :key="item._id">
          <view class="map-name">{{item.mapName}}</view>
          <view class="place" v-for="place in [item['D'],item['C'],item['B'],item['A'],item['S']]" :key="place">{{betterName(place)}}</view>
        </view>
        <view class="divider" />
        <view class="row" v-for="item in selectedCareerMaps[theme]['m']" :key="item._id">
          <view class="map-name">{{item.mapName}}</view>
          <view class="place" v-for="place in [item['D'],item['C'],item['B'],item['A'],item['S']]" :key="place">{{betterName(place)}}</view>
        </view>
        <view class="divider" />
        <view class="row" v-for="item in selectedCareerMaps[theme]['s']" :key="item._id">
          <view class="map-name">{{item.mapName}}</view>
          <view class="place" v-for="place in [item['D'],item['C'],item['B'],item['A'],item['S']]" :key="place">{{betterName(place)}}</view>
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
        // console.log(selectCareerMaps[this.mode](this.careerMaps))
        return selectCareerMaps[this.mode](this.careerMaps)
      },
      themes() {
        // console.log(Object.keys(this.selectedCareerMaps))
        return Object.keys(this.selectedCareerMaps)
      }
    },
    methods: {
      onChangeMode(e) {
        this.$emit('onChangeMode')
      },
      betterName(name){
        return name?name.replace(/([DCBAS])(..)-/,'$2 '):name
      }
    }
  }
</script>

<style lang="scss">
  .context{
    max-width: 600px;
    margin: 0 auto;
  }
  .mode-changer {
    display: flex;
    background-color: $page-bg-color;

    padding: 20rpx;
    box-sizing: border-box;

    @include pad-devices {
      padding: toPadPx(20);
    }
    @media (prefers-color-scheme: dark){
      background-color: $page-bg-color-dark;
    }
  }

  .mode-button {
    // margin-left: 10rpx;
    color: $text-title-color;
    padding: 0 20rpx;
    font-size: 36rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 10rpx;
    background-color: $card-bg-color;

    @include pad-devices {
      font-size: toPadPx(36);
      padding: 0 toPadPx(20);
      height: toPadPx(72);
      line-height: toPadPx(72);
      border-radius: toPadPx(10);
    }
    @media (prefers-color-scheme: dark){
      background-color: $card-bg-color-dark;
      color: $text-title-color-dark;
    }
  }

  .map-list {
    padding: 0 20rpx 40rpx 20rpx;
    @include pad-devices {
      padding:0 toPadPx(20) toPadPx(40) toPadPx(20);
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
    @media (prefers-color-scheme: dark){
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
    @media (prefers-color-scheme: dark){
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
  .place{
    // flex:1;
    width: 90rpx;
    
    @include pad-devices {
      width: toPadPx(90);
    }
  }

  .divider {
    // height: 4rpx;
    padding-top: 1rpx;
    background-color: $divider-color;
    margin: 10rpx 0;    
    @include pad-devices {
      padding-top: toPadPx(1);
      margin: toPadPx(10) 0;
    }
    
    @media (prefers-color-scheme: dark){
      background-color: $divider-color-dark;
    }
  }
  .car-class{
    font-weight: bold;
    text-align: center;
    
  }
  .place,
  .car-class{
    width: 90rpx;
    
    @include pad-devices {
      width: toPadPx(90);
    }
  }
  .car-class,
  .map-name{
    font-weight: bold;
    color: $text-title-color;
    @media (prefers-color-scheme: dark){
      color: $text-title-color-dark;
    }
  }
</style>
