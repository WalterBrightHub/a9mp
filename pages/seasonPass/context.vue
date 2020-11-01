<template>
  <view class="context">
    <view class="head">

      <view class="server-toggle" @tap="onToggleServer">{{serverName}} ⇌</view>
      <view class="season-title-block">
        <view class="season-name">{{seasonPass.seasonName}}</view>
        <view class="season-remain-time">{{remainTimeString}}后结束</view>
      </view>
    </view>
    <view class="mission-list-block">

      <view class="mission-list" v-for="episode in seasonPass.episodes" :key="episode.episode_id">
        <view class="episode-name">第 {{episode.episode_id}} 幕</view>
        <view class="mission" v-for="(mission,index) in episode.missions" :key="index">
          <view class="divider" v-if="index>0"></view>
          <view class="mission-tag-block">
            <view class="mission-tag" v-for="tag in mission.tags" :key="tag">{{tag}}</view>
          </view>
          <view class="mission-solution">{{mission.solution}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import moment from 'moment'
  export default {
    props: ['seasonPass', 'now', 'server'],
    data() {
      return {

      };
    },
    computed: {
      remainTimeString() {
        console.log(this.now)
        console.log(moment(this.seasonPass.endTime))
        return moment(this.seasonPass.endTime).from(this.now, true)
      },
      serverName() {
        return this.server === 'gl' ? "国际" : "国服"
      }
    },
    methods: {
      onToggleServer() {

        this.$emit('onToggleServer')
      }
    }
  }
</script>

<style lang="scss">
  
  .head{
    display: flex;
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
    color: $theme-color;  

    background-color: #fff;
  
    @media (prefers-color-scheme: dark) {
  
      color: $text-title-color-dark;
      background-color: $theme-color-dark;
    }
  
  }
  
  .season-title-block {
    display: flex;
    flex:1;
    margin: 20rpx;

    //好康的渐变
    //https://www.ui.cn/detail/198009.html 双色渐变用于中小面积，轻量渐变用于大面积
    // background: linear-gradient(to right, #f7ce26, #ff0054);
    
     // background: linear-gradient(to right, #f7ce26, #ff0054);
    border-radius: 10rpx;
  }

  .season-name {
    padding: 0 20rpx;
    line-height: 72rpx;
    border-radius: 10rpx 0 0 10rpx;
    flex: 1;
    display: flex;
    justify-content: center;
    // background-color: #f7ce26;
    
    background: linear-gradient(to right, #ffe681,#f7ce26 );
    color: #000;
    font-size: 36rpx;
    font-weight: bold;
  }

  .season-remain-time {
    padding: 0 20rpx;
    line-height: 72rpx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 0 10rpx 10rpx 0;
    color: #fff;
    background-color: $theme-color;
    // background: linear-gradient(to right, #ff9a77, #ff0054);
  }

  .mission-list-block {
    padding-bottom: 30rpx;
  }

  .mission-list {
    background-color: $card-bg-color;
    margin: 0 20rpx;
    border-radius: 10rpx;
    // padding: 20rpx 0;
  }

  .mission-list+.mission-list {
    margin-top: 20rpx;
  }

  .mission {}

  .mission-tag-block {
    display: flex;
  }

  .episode-name {
    font-weight: bold;
    font-size: 32rpx;
    color: $text-title-color;
    padding: 20rpx 20rpx 0 20rpx;
  }

  .mission-tag-block {
    margin: 20rpx 20rpx 10rpx 20rpx;
  }

  .mission-tag {
    font-size: 28rpx;
    border-radius: 5rpx;
    padding: 10rpx;
    color: #22a3df;
    background-color: #d9f1f5;
  }

  .mission-tag+.mission-tag {
    margin-left: 0.5em;

  }

  .mission-solution {
    padding: 0 20rpx 20rpx 20rpx;
  }

  .divider {
    padding-top: 3rpx;
    background-color: $divider-color;

    @include pad-devices {
      padding-top: toPadPx(3);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $divider-color-dark;
    }
  }
</style>
