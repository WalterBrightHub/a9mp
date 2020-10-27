<template>
  <view>
    <div class="head">精确查询</div>
    <div class="picker-block">
      <picker class="picker theme-picker" :range="mapThemeRange" @change="onChangeMapTheme">{{mapTheme}}<span class="tip-triangle">▼</span></picker>
      <picker class="picker name-picker" :range="mapNameRange" @change="onChangeMapName" :value="mapNameValue">{{mapName}}<span
          class="tip-triangle">▼</span></picker>
    </div>
    <div class="career-season-list">
      <div class="career-season" v-for="season in selectedCareerSeasons">
        <div class="season-item chapter">{{season.chapter}}</div>
        <div class="season-item season">{{season.season}}</div>
        <div class="season-item race">{{season.race}}</div>
      </div>
    </div>
  </view>
</template>

<script>
  import _ from 'lodash'
  export default {
    props: ['trackDetails', 'careerSeasons'],
    data() {
      return {
        mapTheme: this.trackDetails[0].mapTheme,
        // mapName:this.trackDetails[0].mapNameCN,
        mapNameValue: 0,
      };
    },
    computed: {
      selectedCareerSeasons() {
        return this.careerSeasons.filter(item => item.mapNameCN === this.mapName)
      },
      mapThemeRange() {
        return _(this.trackDetails).map(item => item.mapTheme).uniq().value()
      },
      mapNameRange() {
        return this.trackDetails.filter(item => item.mapTheme === this.mapTheme).map(item => item.mapNameCN)
      },
      mapName() {
        return this.mapNameRange[this.mapNameValue]
      }
    },
    methods: {

      onChangeMapTheme(e) {
        const newMapTheme = this.mapThemeRange[e.target.value]
        if (newMapTheme !== this.mapTheme) {

          this.mapTheme = newMapTheme
          // this.mapName=this.mapNameRange[0]
          this.mapNameValue = 0
        }
      },
      onChangeMapName(e) {

        const newMapName = this.mapNameRange[e.target.value]
        if (newMapName !== this.mapName) {

          // this.mapName = newMapName
          this.mapNameValue = e.target.value
        }
      }
    }
  }
</script>

<style lang="scss">
  .head {
    font-size: 36rpx;
    color: #41b90a;
    font-weight: bold;
    border-radius: 10rpx 10rpx 0 0;
    padding: 20rpx;
    background-color: $card-bg-color;
    margin: 20rpx 20rpx 5rpx 20rpx;
  }

  .picker-block {
    display: flex;
    margin: 0 20rpx;
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
  }

  .picker+.picker {
    margin-left: 5rpx;
  }

  .tip-triangle {
    color: #d4d4d4;
    padding-left: 16rpx;
  }

  .career-season-list {
    background-color: $card-bg-color;
    border-radius: 0 0 10rpx 10rpx;
    margin: 5rpx 20rpx 0 20rpx;
    padding: 20rpx;
  }

  .career-season {
    display: flex;
    font-size: 28rpx;


  }

  .career-season+.career-season {
    margin-top: 10rpx;
  }

  .season-item {
    // background-color: #b3ff92;
    border-radius: 5rpx;
    padding: 5rpx;
  }

  .season-item+.season-item {
    margin-left: 10rpx;
  }

  .chapter {
    font-weight: bold;
    color: $text-title-color;
  }

  .race {
    color: #41b90a;
    font-weight: bold;
  }
</style>
