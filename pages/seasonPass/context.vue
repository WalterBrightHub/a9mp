<template>
  <view class="context">

    <view class="mission-list-block" v-if="seasonPassStatus==='resolve' && seasonPass">

      <view class="mission-list" v-for="episode in seasonPass.episodes" :key="episode.episode_id">
        <view class="episode-name">第 {{episode.episode_id}} {{server === 'gl'?'幕':'章'}}</view>
        <view class="episode-list" v-if="episode.missions.length>0">
          <view class="mission" v-for="(mission,index) in episode.missions" :key="index">
            <view class="divider" v-if="index>0"></view>
            <view class="mission-tag-block">
              <view class="mission-tag map-query" v-for="mapName in mission.mapNames" :key="mapName"
                @click="onMissionMapQuery(mapName,mission.tags)">{{mapName}} 🔍</view>
              <view class="mission-tag" v-for="tag in mission.tags" :key="tag">{{tag}}</view>
            </view>
            <view class="mission-solution">{{mission.solution}}</view>
          </view>
        </view>
        <view v-else class="episode-empty-list">
          <view class="no-hard-mission-tip">🧐 本{{server === 'gl'?'幕':'章'}}没有特别难找的任务！</view>
        </view>
      </view>
    </view>

    <view class="loading" v-else-if="seasonPassStatus==='loading'">
      <loading></loading>
    </view>
    <view class="no-season-pass-tip" v-else-if="seasonPassStatus==='resolve' && !seasonPass">没有可用的通行证赛季。稍后再来！</view>
    <view class="no-season-pass-tip" v-else-if="seasonPassStatus==='reject'">
      <request-fail @onRetry='onRetry' />
    </view>
  </view>
</template>

<script>
  import loading from '@/components/loading/loading.vue'
  import requestFail from '@/components/requestFail/requestFail.vue'
  export default {
    components: {
      'loading': loading,
      'request-fail': requestFail,

    },
    props: ['seasonPass', 'seasonPassStatus', 'server'],
    data() {
      return {

      };
    },
    computed: {
      serverName() {
        return this.server === 'gl' ? "国际" : "国服"
      },
    },
    methods: {
      onToggleServer() {

        this.$emit('onToggleServer')
      },
      onMissionMapQuery(mapName, tags) {
        let url = ''
        let timeAttack = 0
        let hunted = 0
        for (let tag of tags) {
          if (tag === '追逐赛') {
            hunted = 1
            break
          } else if (tag === '计时赛') {
            timeAttack = 1
            break
          }
        }
        uni.navigateTo({
          url: `/pages/seasonPass/missionMapQuery/missionMapQuery?server=${this.server}&mapName=${mapName}&timeAttack=${timeAttack}&hunted=${hunted}`
        })
      },
      onRetry() {
        this.$emit('onRetry')
      }
    }
  }
</script>

<style lang="scss">
  .context {
    // position: relative;
  }



  .mission-list-block {

    max-width: 768px;
    margin: 0 auto;
  }




  .loading {
    padding-top: 30rpx;

    @include pad-devices {
      padding-top: toPadPx(30);
    }
  }

  .no-season-pass-tip {
    color: $text-help-color;
    font-size: 32rpx;
    display: flex;
    justify-content: center;
    padding-top: 48rpx;

    @media (prefers-color-scheme: dark) {

      color: $text-help-color-dark;
    }

    @include pad-devices {
      font-size: toPadPx(32);
      padding-top: toPadPx(48);
    }
  }

  .mission-list-block {
    padding: 0 20rpx 30rpx 20rpx;

    @include pad-devices {
      padding: 0 toPadPx(20) toPadPx(30) toPadPx(20);
    }
  }

  .mission-list {
    background-color: $card-bg-color;
    // margin: 0 20rpx;
    border-radius: 10rpx;

    // padding: 20rpx 0;
    @media (prefers-color-scheme: dark) {

      background-color: $card-bg-color-dark;
    }

    @include pad-devices {}

    // margin: 0 toPadPx(20);
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

      color: $theme-color-dark;
    }

    @include pad-devices {
      font-size: toPadPx(36);
      padding: toPadPx(20) toPadPx(20) 0 toPadPx(20);
    }
  }

  .mission-tag-block {
    padding: 20rpx 20rpx 0 20rpx;

    @include pad-devices {
      padding: toPadPx(20) toPadPx(20) 0 toPadPx(20);
    }
  }

  .mission-tag {
    margin: 0 10rpx 10rpx 0;
    font-size: 28rpx;
    border-radius: 5rpx;
    padding: 10rpx 16rpx;
    color: #22a3df;
    background-color: #e3f5f8;

    @media (prefers-color-scheme: dark) {

      color: $text-title-color-dark;
      background-color: #00577f;
    }

    @include pad-devices {
      font-size: toPadPx(28);
      padding: toPadPx(10) toPadPx(16);
      margin: 0 toPadPx(10) toPadPx(10) 0;
      border-radius: toPadPx(5);
    }
  }

  .map-query {
    color: #fff;
    background-color: #41b90a;

    @media (prefers-color-scheme: dark) {

      background-color: #2d8006;
    }
  }



  .mission-solution {
    padding: 0 20rpx 20rpx 20rpx;
    font-size: 32rpx;

    @include pad-devices {
      font-size: toPadPx(32);
      padding: 0 toPadPx(20) toPadPx(20) toPadPx(20);
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
