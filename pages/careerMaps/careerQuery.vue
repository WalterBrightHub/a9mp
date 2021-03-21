<template>
  <div class="context">
    <div class="map-theme-block">
      <div class="map-theme" :class="{['map-theme-selected']:index===mapThemeValue}"
        v-for="(mapTheme,index) in selectedMapThemeRange" @tap="onChangeMapTheme(index)">{{mapTheme}}</div>
    </div>
    <div class="map-name-block">

      <div class="map-name" :class="{['map-name-selected']:index===mapNameValue}"
        v-for="(item,index) in mapNameAndLengthRange" @tap="onChangeMapName(index)">{{item}}</div>



    </div>
    <unicloud-db class="career-season-db" ref="careerSeasonDB"
      v-slot:default="{data, pagination, loading, error, options}" :options="options" collection="careerSeasons"
      :orderby="'_id'" :getone="false" :where="where" manual="true" page-size="479">
      <view v-if="error" class="error">{{error.message}}</view>
      <view class="loading" v-else-if="loading">
        <loading />
      </view>
      <div class="career-season-list" v-else-if="data.length>0">
        <div class="career-season" v-for="season in data" :key="season._id">
          <div class="season-item chapter">{{options.server=='gl'?season.chapterCN:season.chapterAL}}</div>
          <div class="season-item season">{{options.server=='gl'?season.seasonEN:season.seasonAL}}</div>
          <div class="season-item race">{{season.race}}</div>
          <div class="season-item race-type" :class="'race-'+options.raceTypes[season.raceType]">{{season.raceType}}
          </div>
        </div>
      </div>
      <div v-if="!loading && data.length===0 && options.careerQueryStatus==='resolve' " class="empty-season-list">😮
        生涯竟然没有这张图</div>
    </unicloud-db>
  </div>
</template>

<script>
  import _ from 'lodash'
  import loading from '../../components/loading/loading.vue'

  const raceTypes = {
    '常规赛': 'race',
    '追逐赛': 'hunted',
    '计时赛': 'time-attack'
  }

  export default {
    components: {
      'loading': loading
    },
    props: ['trackDetails', 'careerSeasons', 'mapThemeRange', 'server', "careerQueryStatus"],
    data() {
      return {
        // 放在data内的是picker value，即"0"，"1"，"2"...，显示在界面上的String放在Computed中
        mapThemeValue: 0,
        mapNameValue: 0,
        // raceTypes,
      };
    },
    watch: {
      careerQueryStatus(newStatus) {
        if (newStatus === 'resolve') {
          // console.log('起飞！')
          this.$refs.careerSeasonDB.loadData()
        }
      }
    },
    computed: {
      options() {
        return {
          server: this.server,
          raceTypes,
          careerQueryStatus: this.careerQueryStatus
        }
      },
      where() {
        return `mapNameCN=='${this.selectedMapNames[this.mapNameValue]
        ?this.selectedMapNames[this.mapNameValue].mapNameCN
        :'大桥景观'}'`

      },
      selectedMapThemeRange() {
        return this.server === 'gl' ? this.mapThemeRange.map(item => item.mapThemeCN) : this.mapThemeRange.map(item =>
          item.mapThemeAL)
      },
      mapTheme() {
        return this.mapThemeRange.length > 0 ? this.mapThemeRange[this.mapThemeValue].mapThemeCN : ''
      },
      selectedMapNames() {
        return this.trackDetails.filter(item => item.mapThemeCN === this.mapTheme)
      },
      mapNameAndLengthRange() {
        return this.server === 'gl' ?
          this.selectedMapNames.map(item =>
            item.mapNameCN + ` ${item.length}'`) :
          this.selectedMapNames.map(item =>
            item.mapNameAL + ` ${item.length}'`)
      },
    },
    methods: {

      onChangeMapTheme(index) {
        if (this.mapThemeValue !== index) {
          this.mapNameValue = 0
          this.mapThemeValue = index
        }
      },
      onChangeMapName(index) {
        this.mapNameValue = index
      },
      refresh() {
        this.$refs.careerSeasonDB.loadData({
          clear: true
        })
      }
    }
  }
</script>



<style lang="scss">
  .context {
    @include pad-devices {
      max-width: 768px;
      margin: 0 auto;
    }
  }

  .map-theme-block,
  .map-name-block {
    display: grid;
    grid-template-columns: repeat(4, 25%);

    margin: 0 20rpx;
    padding: 20rpx 0;

    background-color: $card-bg-color;

    @include pad-devices {
      margin: 0 toPadPx(20);
    }


    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }
  }

  .map-theme-block {
    border-radius: 10rpx 10rpx 0 0;

    @include pad-devices {
      border-radius: toPadPx(10) toPadPx(10) 0 0;
    }

    @media (min-width:760px) {
      grid-template-columns: repeat(5, 20%);

    }
  }

  .map-name-block {
    margin-top: 5rpx;
    grid-template-columns: repeat(3, 33.3333333%);

    @include pad-devices {
      margin-top: toPadPx(5);
    }
  }

  .map-theme,
  .map-name {


    display: flex;
    justify-content: center;

    color: $text-title-color;
    font-weight: bold;

    padding: 10rpx 0;
    // border: 1rpx solid $divider-color;
    // box-sizing: border-box;


    font-size: 28rpx;
    line-height: 48rpx;

    @include pad-devices {
      font-size: toPadPx(28);
      line-height: toPadPx(48);
      padding: toPadPx(10) 0;
    }

    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }

  .map-name {
    color: $text-p-color;
    font-weight: normal;

    @media (prefers-color-scheme: dark) {
      color: $text-p-color-dark;
    }
  }

  .map-theme-selected,
  .map-name-selected {
    background-color: #41b90a;
    color: #fff;

    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
      background-color: #2d8006;
    }
  }



  .career-season-list,
  .empty-season-list,
  .loading {
    background-color: $card-bg-color;
    border-radius: 0 0 10rpx 10rpx;
    margin: 5rpx 20rpx 0 20rpx;
    padding: 20rpx;

    @include pad-devices {
      border-radius: 0 0 toPadPx(10) toPadPx(10);
      margin: toPadPx(5) toPadPx(20) 0 toPadPx(20);
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

    flex: none;
  }

  .race-time-attack {
    color: #41b90a;
  }

  .race-hunted {
    color: #5b81e2;
  }
</style>
