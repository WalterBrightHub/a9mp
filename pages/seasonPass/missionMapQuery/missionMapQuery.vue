<template>
  <view class="container">
    <div class="head">{{mapName}}</div>

    <unicloud-db class="career-season-db" ref="careerSeasonDB"
      v-slot:default="{data, pagination, loading, error, options}" :options="options" :collection="careerSeasonName"
      :orderby="'_id'" :getone="false" :where="where" manual="true" page-size="479" @load="handleLoad">
      <view v-if="error" class="error">{{error.message}}</view>
      <view class="loading" v-else-if="loading">
        <loading />
      </view>
      <div class="career-season-list" v-else-if="data.length>0">
        <div class="career-season" v-for="season in data" :key="season._id">
          <div class="season-item chapter">{{season.chapter}}</div>
          <div class="season-item season">{{season.season}}</div>
          <div class="season-item race">{{season.race}}</div>
          <div class="season-item race-type" :class="'race-'+options.raceTypes[season.raceType]">{{season.raceType}}
          </div>
        </div>
      </div>
      <div v-if="!loading && data.length===0 " class="empty-season-list">😮 生涯竟然没有这张图</div>
    </unicloud-db>
  </view>
</template>

<script>
  const raceTypes = {
    '常规赛': 'race',
    '追逐赛': 'hunted',
    '计时赛': 'time-attack'
  }

  export default {
    data() {
      return {
        where: '',
        mapName: '',
        server: '',
        careerSeasonName:''
      }
    },
    computed: {
      options() {
        return {
          server: this.server,
          raceTypes
        }
      },
    },
    onLoad({
      server,
      mapName
    }) {
      this.server = server
      this.mapName = mapName
      this.where=`mapName=='${mapName}'` 
        this.careerSeasonName=this.server === 'gl' ? 'careerSeasonGL' : 'careerSeasonAL'
    },
    onShareAppMessage() {

      return {
        title: `我用狂飙小助手查到了“${this.mapName}"这张图的位置，你也来康康！`,
      }
    },
    methods: {
      handleLoad(data, ended, pagination){
        console.log(data)
        let careerSeasonRace=data.filter(season=>season.raceType==='常规赛')
        let careerSeasonHunted=data.filter(season=>season.raceType==='追逐赛')
        let careerSeasonTimeAttack=data.filter(season=>season.raceType==='计时赛')
        // 如有其它形式的生涯赛，要在这里添加类型
        // console.log(careerSeasonTimeAttack)
        // this.$refs.careerSeasonDB.clear()
        // 没效果
        data =[...careerSeasonTimeAttack,...careerSeasonHunted,...careerSeasonRace]
      }
    }
  }
</script>

<style lang="scss">
  .container {
    @include pad-devices {
      max-width: 768px;
      width: 100%;
      margin: 0 auto;
    }

    padding: 20rpx 0;
  }

  .head {
    font-size: 36rpx;
    color: #41b90a;
    font-weight: bold;
    border-radius: 10rpx 10rpx 0 0;
    padding: 20rpx 20rpx 5rpx 20rpx;
    background-color: $card-bg-color;
    margin: 0 20rpx;

    @include pad-devices {
      font-size: toPadPx(36);
      border-radius: toPadPx(10) toPadPx(10) 0 0;
      padding: toPadPx(20);
      background-color: $card-bg-color;
      margin: 0 toPadPx(20);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
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
