<template>
  <view>

    <view class="event-detail" v-if="startTime">
      <image class="event-detail-icon" src="../../../static/contest-icons/time.png"></image>
      <text class="event-detail-content">{{selectDays(startTime,endTime)}}</text>
    </view>

    <view class="event-detail" v-if="rewords && rewords.length">

      <image class="event-detail-icon" src="../../../static/contest-icons/gift.png"></image>
      <view class="event-detail-content">
        <view class="reword-item" v-for="reword in rewords" :key="reword._id">
          <text class="reword-text" :class="'reword-'+reword.rewordType">{{reword.rewordName}}</text>
        </view>
      </view>
    </view>

    <view class="event-detail" v-if="mapName">
      <image class="event-detail-icon" src="../../../static/contest-icons/map.png"></image>
      <text class="event-detail-content">{{mapName}}</text>
    </view>
  </view>
</template>

<script>
  const oneDay = 1000 * 60 * 60 * 24
  const formatDate = (date,now) => (date.getFullYear()===new Date(now).getFullYear()?'':`${date.getFullYear()}.`)+`${date.getMonth() + 1}.${date.getDate()}`
  export default {
    props: ['startTime', 'endTime','now', 'rewords', 'mapName'],
    data() {
      return {

      };
    },
    methods: {

      selectDays(startTime, endTime) {
        const startDay = formatDate(new Date(startTime),this.now)
        const endDay = formatDate(new Date(endTime),this.now)
        if (startDay === endDay) {
          return startDay
        } else {
          return `${startDay} → ${endDay}`
        }
      }
    }
  }
</script>

<style lang="scss">
  .event-detail {
    font-size: 26rpx;
    display: flex;
    color: $text-p-color;
    /* align-items: center; */
    margin-top: 8rpx;

    @include pad-devices {
      font-size: toPadPx(24);
      margin-top: toPadPx(8);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-p-color-dark;
    }
  }

  .event-detail-icon {
    width: 36rpx;
    height: 36rpx;
    flex-shrink: 0;

    filter: invert(30%);

    /*禁止压缩*/
    @include pad-devices {
      width: toPadPx(36);
      height: toPadPx(36);
    }

    @media (prefers-color-scheme: dark) {
      filter: invert(60%);
    }
  }

  .event-detail-content {
    margin-left: 8rpx;
    display: flex;
    line-height: 36rpx;

    flex-wrap: wrap;

    /*允许折行*/
    @include pad-devices {
      margin-left: toPadPx(8);
      line-height: toPadPx(36);
    }
  }

  .reword-item {
    display: flex;
    margin-right: 18rpx;

    @include pad-devices {
      margin-right: toPadPx(18);
    }
  }

  @import './rewordStyle.scss';
</style>
