<template>
  <view class="container">
    <div class="top-fixed-wrapper">

      <top-bar :showBack="true" :title="'地图任务指引'" />
    </div>
    <div class="body-wrapper">

      <div class="head">{{mapName}}</div>

      <unicloud-db class="career-season-db" ref="careerSeasonDB"
        v-slot:default="{data, pagination, loading, error, options}" :options="options" :collection="careerSeasonName"
        :orderby="'_id'" :getone="false" :where="where" loadtime="manual" :page-size="479" @load="handleLoad">
        <view v-if="error" class="error">{{error.message}}</view>
        <view class="loading" v-else-if="loading">
          <loading />
        </view>

        <prioritySeasonList :data="data" v-else-if="data.length>0" />
        <div v-if="!loading && data.length===0 " class="empty-season-list">😮 生涯竟然没有这张图</div>
      </unicloud-db>
    </div>
  </view>
</template>

<script>
  import prioritySeasonList from '@/components/prioritySeasonList/prioritySeasonList.vue'

  import topBar from '@/components/topBar/topBar.vue'


  export default {
    components: {
      prioritySeasonList,
      'top-bar': topBar,
    },
    data() {
      return {
        where: '',
        mapName: '',
        server: '',
        careerSeasonName: ''
      }
    },
    computed: {
      options() {
        return {
          server: this.server,
        }
      },
    },
    onLoad({
      server,
      mapName,
      timeAttack,
      hunted
    }) {
      this.server = server
      this.mapName = mapName
      if (timeAttack === '1') {
        this.where = `mapName=='${mapName}'&&raceType=='计时赛'`
      } else if (hunted === '1') {
        this.where = `mapName=='${mapName}'&&raceType=='追逐赛'`
      } else {

        this.where = `mapName=='${mapName}'`
      }
      this.careerSeasonName = this.server === 'gl' ? 'careerSeasonGL' : 'careerSeasonAL'
    },
	onReady() {
    this.$refs.careerSeasonDB.loadData()
	},
    onShareAppMessage() {

      return {
        title: `我用狂飙小助手查到了“${this.mapName}"这张图的位置，你也来康康！`,
      }
    },
    methods: {
      handleLoad(data, ended, pagination) {

      }
    }
  }
</script>

<style lang="scss">
  .container {}

  .top-fixed-wrapper {

    position: sticky;
    top: 0;
  }

  .head {
    font-size: 36rpx;
    color: #41b90a;
    font-weight: bold;
    border-radius: 10rpx 10rpx 0 0;
    padding: 20rpx 20rpx 10rpx 20rpx;
    background-color: $card-bg-color;
    margin: 20rpx 20rpx 0 20rpx;

    @include pad-devices {
      font-size: toPadPx(36);
      border-radius: toPadPx(10) toPadPx(10) 0 0;
      padding: toPadPx(20);
      background-color: $card-bg-color;
      margin: toPadPx(20) toPadPx(20) 0 toPadPx(20);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }
  }

  .body-wrapper {

    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    @include pad-devices {
      max-width: 768px;
      width: 100%;
      margin: 0 auto;
    }
  }

  .career-season-list,
  .empty-season-list,
  .loading {
    background-color: $card-bg-color;
    border-radius: 0 0 10rpx 10rpx;
    margin: 0 20rpx;
    padding: 20rpx;

    @include pad-devices {
      border-radius: 0 0 toPadPx(10) toPadPx(10);
      margin: 0 toPadPx(20);
      padding: toPadPx(20);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }
  }

  .empty-season-list {
    display: flex;
    font-size: 28rpx;
    justify-content: center;
    color: $text-help-color;

    @include pad-devices {
      font-size: toPadPx(28);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-help-color-dark;
    }
  }

  .career-season {
    display: flex;
    font-size: 28rpx;

    @include pad-devices {
      font-size: toPadPx(28);
    }

  }

  .career-season+.career-season {
    margin-top: 10rpx;

    @include pad-devices {
      margin-top: toPadPx(10);
    }
  }

  .season-item {
    border-radius: 5rpx;
    padding: 5rpx;

    @include pad-devices {
      border-radius: toPadPx(5);
      padding: toPadPx(5);
    }
  }



  .chapter {
    font-weight: bold;
    color: $text-title-color;
    flex: none;

    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }

  .season {
    margin-left: 10rpx;
    overflow: hidden;
    /*隐藏溢出的文本  */
    white-space: nowrap;
    /*不换行  */
    text-overflow: ellipsis;
  }

  .race {
    color: #41b90a;
    font-weight: bold;
    margin-left: auto;
    flex: none;
    width: 48rpx;
    text-align: center;
    // @media (prefers-color-scheme: dark) {
    //   color: $theme-color-dark;
    // }
  }

  .race-type {

    color: $text-help-color;

    @media (prefers-color-scheme: dark) {
      color: $text-help-color-dark;
    }

    flex: none;
  }

  .race-time-attack {
    color: #5eb57a;
  }

  .race-hunted {
    color: #5b81e2;
  }
</style>
