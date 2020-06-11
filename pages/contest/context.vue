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

          <event-detail-list :startTime="contest.startTime" :endTime="contest.endTime" :mapName="contest.mapName" :rewords="contest.rewords" />


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

          <event-detail-list :startTime="contest.startTime" :endTime="contest.endTime" :mapName="contest.mapName" :rewords="contest.rewords" />



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

          <event-detail-list :startTime="contest.startTime" :endTime="contest.endTime" :mapName="contest.mapName" :rewords="contest.rewords" />


        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import moment from 'moment'
  import eventDetailList from './components/eventDetailList.vue'
  moment.locale('zh-cn')
  export default {
    components:{
      'event-detail-list':eventDetailList
    },
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
    }
  }
</script>

<style lang="scss">
  .context {
    max-width: 768px;
    margin: 0 auto;
    padding: 20rpx;

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


</style>
