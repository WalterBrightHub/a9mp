<template>
  <view class="context">
    <view class="head">

      <view class="server-toggle" @tap="onToggleServer">{{serverName}} ⇌</view>
      <view class="season-title-block">
        <view class="season-name">{{seasonPass.seasonName}}</view>
      </view>
    </view>
    <view class="mission-list-block">

      <view class="mission-list" v-for="episode in seasonPass.episodes" :key="episode.episode_id">
        <view class="episode-name">第 {{episode.episode_id}} 幕</view>
        <view class="episode-list" v-if="episode.missions.length>0">
          <view class="mission" v-for="(mission,index) in episode.missions" :key="index">
            <view class="divider" v-if="index>0"></view>
            <view class="mission-tag-block">
              <view class="mission-tag map-query" v-for="mapName in mission.mapNames" :key="mapName"
                @click="onMissionMapQuery(mapName)">{{mapName}} 🔍</view>
              <view class="mission-tag" v-for="tag in mission.tags" :key="tag">{{tag}}</view>
            </view>
            <view class="mission-solution">{{mission.solution}}</view>
          </view>
        </view>
        <view v-else class="episode-empty-list">
          <view class="no-hard-mission-tip">🧐本幕没有特别难找的任务！</view>
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
      },
      onMissionMapQuery(mapName) {
        console.log(mapName)
        uni.navigateTo({
          url: `/pages/seasonPass/missionMapQuery/missionMapQuery?server=${this.server}&mapName=${mapName}`
        })
      }
    }
  }
</script>

<style lang="scss">
  .context{
    max-width: 768px;
    margin: 0 auto;
  }
  .head {
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
      border-radius: toPadPx(10);
      margin: toPadPx(20) 0 toPadPx(20) toPadPx(20);

    }

    color: $theme-color;

    background-color: $card-bg-color;

    @media (prefers-color-scheme: dark) {

      color: $theme-color-dark;
      background-color: $card-bg-color-dark;
    }

  }

  .season-title-block {
    display: flex;
    flex: 1;
    margin: 20rpx;

    //好康的渐变
    //https://www.ui.cn/detail/198009.html 双色渐变用于中小面积，轻量渐变用于大面积
    // background: linear-gradient(to right, #f7ce26, #ff0054);

    // background: linear-gradient(to right, #f7ce26, #ff0054);
    border-radius: 10rpx;

    @include pad-devices {
      margin: toPadPx(20);
      border-radius: toPadPx(10);
    }
  }

  .season-name {
    padding: 0 20rpx;
    line-height: 72rpx;
    border-radius: 10rpx;
    flex: 1;
    display: flex;
    justify-content: center;
    background-color: #f7ce26;


    // background: linear-gradient(to right, #ffe681,#f7ce26 );
    color: #000;
    font-size: 36rpx;
    font-weight: bold;

    @media (prefers-color-scheme: dark) {

      color: #f7ce26;
      background-color: $card-bg-color-dark;
    }

    @include pad-devices {
      padding: 0 toPadPx(20);
      line-height: toPadPx(72);
      border-radius: toPadPx(10);
      font-size: toPadPx(36);
    }
  }



  .mission-list-block {
    padding-bottom: 30rpx;
  }

  .mission-list {
    background-color: $card-bg-color;
    margin: 0 20rpx;
    border-radius: 10rpx;

    // padding: 20rpx 0;
    @media (prefers-color-scheme: dark) {

      background-color: $card-bg-color-dark;
    }

    @include pad-devices {}

    margin: 0 toPadPx(20);
    border-radius: toPadPx(10);
  }

  .mission-list+.mission-list {
    margin-top: 20rpx;

    @include pad-devices {
      margin-top: toPadPx(20);
    }
  }

  .mission {
    // padding: 10rpx 0;
  }

  .mission-tag-block {
    display: flex;
    flex-wrap: wrap;
  }

  .episode-name {
    font-weight: bold;
    font-size: 36rpx;
    color: $theme-color;
    padding: 20rpx 20rpx 0 20rpx;

    @media (prefers-color-scheme: dark) {

      color: $text-title-color-dark;
    }

    @include pad-devices {
      font-size: toPadPx(36);
      padding: toPadPx(20) toPadPx(20) 0 toPadPx(20);
    }
  }

  .mission-tag-block {
    padding: 30rpx 20rpx 0 20rpx;

    @include pad-devices {
      padding: toPadPx(30) toPadPx(20) 0 toPadPx(20);
    }
  }

  .mission-tag {
    margin: 0 10rpx 10rpx 0;
    font-size: 28rpx;
    border-radius: 5rpx;
    padding: 10rpx;
    color: #22a3df;
    background-color: #d9f1f5;

    @media (prefers-color-scheme: dark) {

      color: $text-title-color-dark;
      background-color: #00577f;
    }

    @include pad-devices {
      font-size: toPadPx(28);
      padding: toPadPx(10);
      margin: 0 toPadPx(10) toPadPx(10) 0;
      border-radius: toPadPx(5);
    }
  }

  .map-query {
    color: #d9f5d9;
    background-color: #41b90a;

    @media (prefers-color-scheme: dark) {

      background-color: #2d8006;
    }
  }



  .mission-solution {
    padding: 0 20rpx 30rpx 20rpx;
    font-size: 32rpx;

    @include pad-devices {
      font-size: toPadPx(32);
      padding: 0 toPadPx(20) toPadPx(30) toPadPx(20);
    }
  }

  .episode-empty-list {
    padding: 20rpx;

    @include pad-devices {
      padding: toPadPx(20);
    }
  }

  .no-hard-mission-tip {
    color: $text-help-color;
    font-size: 32rpx;

    @media (prefers-color-scheme: dark) {

      color: $text-help-color-dark;
    }

    @include pad-devices {
      font-size: toPadPx(32);
    }
  }

  .divider {
    padding-top: 4rpx;
    background-color: $divider-color;

    @include pad-devices {
      padding-top: toPadPx(4);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $divider-color-dark;
    }
  }
</style>
