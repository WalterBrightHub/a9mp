<template>
  <view>
    <view class="divider" v-if="index>0"></view>
    <view class="card">
      <view class="title-block">
        <view class="contest-title" :class="'title-'+timeStatus">{{contest.contestName}}</view>
        <view class="time-tip" :class="'tip-'+timeStatus">{{timeTip}}</view>
      </view>

      <event-detail-list :startTime="contest.startTime" :endTime="contest.endTime" :now="now" :mapName="contest.mapName"
        :rewords="contest.rewords" />
    </view>
  </view>
</template>

<script>
  import moment from 'moment'
  import eventDetailList from './eventDetailList.vue'
  moment.locale('zh-cn')
  export default {
    components: {
      'event-detail-list': eventDetailList
    },
    props: ['contest', 'now', 'index'],
    data() {
      return {

      };
    },
    computed: {
      timeStatus() {
        const {
          startTime,
          endTime
        } = this.contest
        const {
          now
        } = this
        return startTime > now ? 'future' : endTime >= now ? 'now' : 'past'
      },
      timeTip() {

        const {
          startTime,
          endTime
        } = this.contest
        const {
          now
        } = this
        return startTime > now ? `${moment(startTime).to(this.now, true)}后开启` : endTime >= now ?
          `${moment(endTime).from(this.now, true)}后结束` : '已结束'
        if (startTime > this.now) {
          return moment(startTime).to(this.now, true)
        } else {
          return moment(endTime).from(this.now, true)
        }
      }
    },
  }
</script>

<style lang="scss">
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
