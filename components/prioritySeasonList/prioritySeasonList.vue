<template>

  <div class="career-season-list">
    <div class="career-season" v-for="season in priorityData" :key="season._id">
      <div class="season-item chapter">{{season.chapter}}</div>
      <div class="season-item season">{{season.season}}</div>
      <div class="season-item race">{{season.race}}</div>
      <div class="season-item race-type" :class="'race-'+raceTypes[season.raceType]">{{season.raceType}}
      </div>
    </div>
  </div>
</template>

<script>
  const raceTypes = {
    '常规赛': 'race',
    '追逐赛': 'hunted',
    '计时赛': 'time-attack'
  }
  export default {
    props: ['data'],
    data() {
      return {
        raceTypes
      };
    },
    computed: {
      priorityData() {
        let careerSeasonRace = this.data.filter(season => season.raceType === '常规赛')
        let careerSeasonHunted = this.data.filter(season => season.raceType === '追逐赛')
        let careerSeasonTimeAttack = this.data.filter(season => season.raceType === '计时赛')
        return [...careerSeasonTimeAttack, ...careerSeasonHunted, ...careerSeasonRace]
      }
    }
  }
</script>

<style lang="scss">
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
    color: #41b90a;
  }

  .race-hunted {
    color: #5b81e2;
  }
</style>
