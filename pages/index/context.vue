<template>
  <view class="context">
    <view class="contest-list">
      <view v-for="(contest,index) in contestFuture" :key="contest._id">
        <view class="divider" v-if="index>0"></view>
        <view class="card">
          <view class="title-block">
            <view class="contest-title title-future">{{contest.contestName}}</view>
            <view class="time-tip tip-future">{{getTimeTip(contest.startTime,contest.endTime)}}后开启</view>
          </view>


          <view class="event-detail" v-if="contest.startTime">
            <image class="event-detail-icon" src="../../static/contest-icons/time.png"></image>
            <text class="event-detail-content">{{selectDays(contest.startTime,contest.endTime)}}</text>
          </view>

          <view class="event-detail" v-if="contest.rewords && contest.rewords.length">

            <image class="event-detail-icon" src="../../static/contest-icons/gift.png"></image>
            <view class="event-detail-content">
              <view class="reword-item" v-for="reword in contest.rewords" :key="reword._id">
                <text class="reword-text" :class="'reword-'+reword.rewordType">{{reword.rewordName}}</text>
              </view>
            </view>
          </view>

          <view class="event-detail" v-if="contest.mapName">
            <image class="event-detail-icon" src="../../static/contest-icons/map.png"></image>
            <text class="event-detail-content">{{contest.mapName}}</text>
          </view>


        </view>
      </view>
      <view class="divider" v-if="contestFuture.length>0"></view>
      <view v-for="(contest,index) in contestNow" :key="contest._id">
        <view class="divider" v-if="index>0"></view>
        <view class="card">
          <view class="title-block">
            <view class="contest-title title-now">{{contest.contestName}}</view>
            <view class="time-tip tip-now">{{getTimeTip(contest.startTime,contest.endTime)}}后结束</view>
          </view>

          <view class="event-detail" v-if="contest.startTime">
            <image class="event-detail-icon" src="../../static/contest-icons/time.png"></image>
            <text class="event-detail-content">{{selectDays(contest.startTime,contest.endTime)}}</text>
          </view>

          <view class="event-detail" v-if="contest.rewords && contest.rewords.length">

            <image class="event-detail-icon" src="../../static/contest-icons/gift.png"></image>
            <view class="event-detail-content">
              <view class="reword-item" v-for="reword in contest.rewords" :key="reword._id">
                <text class="reword-text" :class="'reword-'+reword.rewordType">{{reword.rewordName}}</text>
              </view>
            </view>
          </view>

          <view class="event-detail" v-if="contest.mapName">
            <image class="event-detail-icon" src="../../static/contest-icons/map.png"></image>
            <text class="event-detail-content">{{contest.mapName}}</text>
          </view>


        </view>
      </view>
      <view class="divider" v-if="contestNow.length>0"></view>
      <view v-for="(contest,index) in contestPast" :key="contest._id">
        <view class="divider" v-if="index>0"></view>
        <view class="card">
          <view class="title-block">
            <view class="contest-title title-past">{{contest.contestName}}</view>
            <view class="time-tip tip-finish">已结束</view>
          </view>

          <view class="event-detail" v-if="contest.startTime">
            <image class="event-detail-icon" src="../../static/contest-icons/time.png"></image>
            <text class="event-detail-content">{{selectDays(contest.startTime,contest.endTime)}}</text>
          </view>

          <view class="event-detail" v-if="contest.rewords && contest.rewords.length">

            <image class="event-detail-icon" src="../../static/contest-icons/gift.png"></image>
            <view class="event-detail-content">
              <view class="reword-item" v-for="reword in contest.rewords" :key="reword._id">
                <text class="reword-text" :class="'reword-'+reword.rewordType">{{reword.rewordName}}</text>
              </view>
            </view>
          </view>

          <view class="event-detail" v-if="contest.mapName">
            <image class="event-detail-icon" src="../../static/contest-icons/map.png"></image>
            <text class="event-detail-content">{{contest.mapName}}</text>
          </view>

        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import moment from 'moment'
  moment.locale('zh-cn')
  const oneDay = 1000 * 60 * 60 * 24
  const formatDate = date => `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
  export default {
    props: ['contestPresent', 'contestPast', 'now'],
    data() {
      return {

      };
    },
    computed: {
      contestFuture() {
        return this.contestPresent.filter(contest => contest.startTime > this.now)
      },
      contestNow() {

        return this.contestPresent.filter(contest => contest.startTime <= this.now)
      }
    },
    methods: {
      getTimeTip(startTime, endTime) {
        if (startTime > this.now) {
          return moment(startTime).to(this.now, true)
        } else {
          return moment(endTime).from(this.now, true)
        }
      },
      selectDays(startTime, endTime) {
        const startDay = formatDate(new Date(startTime))
        const endDay = formatDate(new Date(endTime))
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
  .context {
    max-width: 768px;
    margin: 0 auto;
    padding: 20rpx;
    // padding-bottom: 60rpx;
    @include pad-devices {
      padding: toPadPx(20);
    }
  }

  .contest-list {
    background-color: $card-bg-color;
    border-radius: 10rpx;
    font-size: 28rpx;
    
    @include pad-devices {
      border-radius: toPadPx(10);
      font-size: toPadPx(28);
    }
    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }
  }

  .contest-list+.contest-list {
    margin-top: 20rpx;
    @include pad-devices {
      margin-top: toPadPx(20);
    }
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

  .card {
    padding: 20rpx;
    @include pad-devices {
      padding: toPadPx(20);
    }
  }

  .title-block {
    display: flex;
  }

  .contest-title {
    font-size: 32rpx;
    color: $text-title-color;
    font-weight: bold;
    @include pad-devices {
      font-size: toPadPx(32);
    }
    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }

  .time-tip {
    margin-left: auto;

  }

  .title-future,
  .tip-future {
    color: $theme-color;
    @media (prefers-color-scheme: dark) {
      color: $theme-color-dark;
    }
  }

  .title-now,
  .tip-now {
    color: #08a00b;
  }

  .title-past {
    color: $text-title-color;
    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }

  .tip-reword {
    color: #ffd800;
  }

  .tip-finish {
    color: $text-help-color;
    @media (prefers-color-scheme: dark) {
      color: $text-help-color-dark;
    }
  }

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
