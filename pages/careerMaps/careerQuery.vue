<template>
  <div class="context">
    <div class="head">精确查询</div>
    <div class="picker-block">
      <picker class="picker theme-picker" :range="selectedMapThemeRange" @change="onChangeMapTheme" :value="mapThemeValue">{{mapThemeDisplay}}<span
          class="tip-triangle">▼</span></picker>
      <picker class="picker name-picker" :range="mapNameAndLengthRange" @change="onChangeMapName" :value="mapNameValue">{{mapName}}<span
          class="tip-triangle">▼</span></picker>
    </div>
    <!-- <div class="career-season-list" v-if="selectedCareerSeasons.length>0">
      <div class="career-season" v-for="season in selectedCareerSeasons" :key="season._id">
        <div class="season-item chapter">{{season.chapter}}</div>
        <div class="season-item season">{{season.season}}</div>
        <div class="season-item race">{{season.race}}</div>
        <div class="season-item race-type" :class="'race-'+raceTypes[season.raceType]">{{season.raceType}}</div>
      </div>
    </div> -->
    <unicloud-db class="career-season-db" ref="careerSeasonDB" v-slot:default="{data, pagination, loading, error, options}"
      :options="options" collection="careerSeasons" :orderby="_id" :getone="false" :where="where" manual="true">
      <view v-if="error" class="error">{{error.message}}</view>
      <div class="career-season-list" v-else-if="data.length>0">
        <div class="career-season" v-for="season in data" :key="season._id">
          <div class="season-item chapter">{{options.server=='gl'?season.chapterCN:season.chapterAL}}</div>
          <div class="season-item season">{{options.server=='gl'?season.seasonEN:season.seasonAL}}</div>
          <div class="season-item race">{{season.race}}</div>
          <div class="season-item race-type" :class="'race-'+raceTypes[season.raceType]">{{season.raceType}}</div>
        </div>
      </div>
      <div v-if="data.length===0 && careerQueryStatus==='resolve' " class="empty-season-list">😮 生涯竟然没有这张图</div>
      <!-- <view v-if="loading" class="loading">加载中...</view> -->
    </unicloud-db>
  </div>
</template>

<script>
  import _ from 'lodash'

  const raceTypes = {
    '常规赛': 'race',
    '追逐赛': 'hunted',
    '计时赛': 'time-attack'
  }

  export default {
    props: ['trackDetails', 'careerSeasons', 'mapThemeRange', 'server', "careerQueryStatus"],
    data() {
      return {
        // 放在data内的是picker value，即"0"，"1"，"2"...，显示在界面上的String放在Computed中
        mapThemeValue: 0,
        mapNameValue: 0,
        raceTypes,
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
          server: this.server
        }
      },
      where() {
        return `mapNameCN=='${this.selectedMapNames[this.mapNameValue]
        ?this.selectedMapNames[this.mapNameValue].mapNameCN
        :'大桥景观'}'`

      },
      mapTheme() {
        return this.mapThemeRange.length > 0 ? this.mapThemeRange[this.mapThemeValue].mapThemeCN : ''
      },
      selectedMapThemeRange() {
        return this.server === 'gl' ? this.mapThemeRange.map(item => item.mapThemeCN) : this.mapThemeRange.map(item =>
          item.mapThemeAL)
      },
      mapThemeDisplay() {
        return this.mapThemeRange.length > 0 ?
          this.selectedMapThemeRange[this.mapThemeValue] :
          ''
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
      mapName() {
        if(!this.selectedMapNames[this.mapNameValue]){
          return ''
        }
        return this.server === 'gl' ?
          this.selectedMapNames[this.mapNameValue].mapNameCN :
          this.selectedMapNames[this.mapNameValue].mapNameAL
      }
    },
    methods: {

      onChangeMapTheme(e) {
        const newMapThemeValue = e.target.value
        if (newMapThemeValue !== this.mapThemeValue) {
          this.mapThemeValue = newMapThemeValue
          this.mapNameValue = 0
        }
      },
      onChangeMapName(e) {

        const newMapNameValue = e.target.value
        if (newMapNameValue !== this.mapNameValue) {
          this.mapNameValue = newMapNameValue
        }
      },
      refresh(){
          this.$refs.careerSeasonDB.loadData()
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

  .head {
    font-size: 36rpx;
    color: #41b90a;
    font-weight: bold;
    border-radius: 10rpx 10rpx 0 0;
    padding: 20rpx;
    background-color: $card-bg-color;
    margin: 0 20rpx 5rpx 20rpx;

    @include pad-devices {
      font-size: toPadPx(36);
      border-radius: toPadPx(10) toPadPx(10) 0 0;
      padding: toPadPx(20);
      background-color: $card-bg-color;
      margin: 0 toPadPx(20) toPadPx(5) toPadPx(20);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }
  }

  .picker-block {
    display: flex;
    margin: 0 20rpx;

    @include pad-devices {
      margin: 0 toPadPx(20);
    }
  }

  .picker {
    background-color: $card-bg-color;
    // border-radius: 5rpx;
    padding: 20rpx;
    font-size: 32rpx;
    color: $text-title-color;
    font-weight: bold;
    flex: 1;
    text-align: center;

    @include pad-devices {
      padding: toPadPx(20);
      font-size: toPadPx(32);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
      color: $text-title-color-dark;
    }
  }

  .picker+.picker {
    margin-left: 5rpx;

    @include pad-devices {
      margin-left: toPadPx(5);
    }
  }

  .tip-triangle {
    color: #d4d4d4;
    padding-left: 16rpx;

    @include pad-devices {
      padding-left: toPadPx(16);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-help-color-dark;
    }
  }

  .career-season-list,
  .empty-season-list {
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
    color: #5eb57a;
  }

  .race-hunted {
    color: #5b81e2;
  }
</style>
