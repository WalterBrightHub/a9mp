<template>
  <view class="context">
    <view class="season-title-block">
      <view class="season-name">{{seasonPass.seasonName}}</view>
      <view class="season-remain-time">{{remainTimeString}}后结束</view>
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
    props: ['seasonPass', 'now'],
    data() {
      return {

      };
    },
    computed: {
      remainTimeString() {
        console.log(this.now)
        console.log(moment(this.seasonPass.endTime))
        return moment(this.seasonPass.endTime).from(this.now, true)
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .season-title-block {
    display: flex;
    margin: 20rpx;

    //好康的渐变
    //https://www.ui.cn/detail/198009.html 双色渐变用于中小面积，轻量渐变用于大面积
    background: linear-gradient(to right, #f7ce26, #ff0054);
    border-radius: 10rpx;
  }

  .season-name {
    padding: 20rpx;
    // border-radius: 10rpx 0 0 10rpx;
    // background-color: #f7ce26;
    color: #000;
    font-size: 36rpx;
    font-weight: bold;
    flex: 1;
  }

  .season-remain-time {
    padding: 20rpx;
    display: flex;
    align-items: center;
    // border-radius: 0 10rpx 10rpx 0;
    color: #fff;
    // background-color: $theme-color;
  }

.mission-list-block{
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
