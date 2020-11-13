<template>
  <view class="container">
    <view class="mode-changer">
      <view class="mode-button" @tap="onChangeMode">{{server==='al'?'国服':'国际'}} ⇌</view>
    </view>
    <request-fail v-if="careerQueryStatus==='reject'" @onRetry='onRetryCareerQuery' />
    <career-query v-else-if="careerQueryStatus==='resolve'" :trackDetails="selectedTracks" :careerSeasons="selectedCareerSeasons"
      :mapThemeRange="selectedMapThemeRange"></career-query>

    <request-fail v-if="careerMapsStatus==='reject'" @onRetry='onRetryCareerMaps' />
    <context v-else-if="careerMapsStatus==='resolve'" :careerMaps='careerMaps' :mode='server' />

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import requestFail from '../../components/requestFail/requestFail.vue'
  import context from './context.vue'
  import careerQuery from './careerQuery.vue'
  const {
    myCloud
  } = getApp().globalData
  const requestCareerMaps = async function() {
    return myCloud.callFunction({
      name: 'getCareerMapsAll'
    })
  }
  //精确查询所需的所有数据
  const requestCareerQuery = async function() {
    return myCloud.callFunction({
      name: 'getMultiFullTable',
      data: {
        tableNames: ['careerSeasons', 'tracks', 'mapThemes']
      }
    })
  }

  export default {
    components: {
      'request-fail': requestFail,
      'context': context,
      'career-query': careerQuery,
    },
    data() {
      return {
        careerMaps: [],
        careerMapsStatus: 'ready',
        careerSeasons: [],
        tracks: [],
        mapThemes: [],
        careerQueryStatus: 'ready'
        // mode: 'gl'
      }
    },
    computed: {

      ...mapState(['server']),
      selectedMapThemeRange() {
        return this.server === 'gl' ?
          this.mapThemes.map(item => item.mapThemeCN) :
          this.mapThemes.map(item => item.mapThemeAL)
      },
      selectedTracks() {
        return this.server === 'gl' ?
          this.tracks.map(item => ({ ...item,
            mapName: item.mapNameCN,
            mapTheme: item.mapThemeCN
          })) :
          this.tracks.map(item => ({ ...item,
            mapName: item.mapNameAL,
            mapTheme: item.mapThemeAL
          }))
      },
      selectedCareerSeasons() {
        return this.server === 'gl' ?
          this.careerSeasons.map(item => ({ ...item,
            mapName: item.mapNameCN,
            season: item.seasonEN
          })) :
          this.careerSeasons.map(item => ({ ...item,
            mapName: item.mapNameAL,
            season: item.seasonAL
          }))
      }
    },
    onLoad() {
      this.careerMapsStatus = 'pending'



      requestCareerQuery()
        .then(res => {
          const [careerSeasonsTable, tracksTable, mapThemesTable] = res.result
          this.careerSeasons = careerSeasonsTable.data
          this.tracks = tracksTable.data
          this.mapThemes = mapThemesTable.data

          this.careerQueryStatus = 'resolve'
        }).catch(e => {

          console.error(e)
          this.careerQueryStatus = 'reject'
        })

      uni.showLoading({
        title: '加载中',
      })

      requestCareerMaps()
        .then(res => {
          // console.log(res.result) // 3
          // return Promise.reject()
          this.careerMaps = res.result,
            this.careerMapsStatus = 'resolve'

        })
        .catch(e => {
          console.error(e)
          this.careerMapsStatus = 'reject'
        })
        .finally(() => {
          uni.hideLoading()
        })

    },
    onShareAppMessage() {

      return {
        'title': '等你很久了！'
      }
    },

    firstTapTab: false,
    onHide() {
      this.firstTapTab = true
    },
    onTabItemTap() {
      if (this.firstTapTab) {
        this.firstTapTab = false
      } else {
        uni.pageScrollTo({
          scrollTop: 0
        })
      }
    },
    onPullDownRefresh() {

      requestCareerQuery()
        .then(res => {
          // return Promise.reject()
          const [careerSeasonsTable, tracksTable, mapThemesTable] = res.result
          this.careerSeasons = careerSeasonsTable.data
          this.tracks = tracksTable.data
          this.mapThemes = mapThemesTable.data

          this.careerQueryStatus = 'resolve'
        }).catch(e => {

          console.error(e)
          this.careerQueryStatus = 'reject'
        })


      requestCareerMaps()
        .then(res => {
          // console.log(res.result) // 3
          // return Promise.reject()
          this.careerMaps = res.result,
            this.careerMapsStatus = 'resolve'

          uni.showToast({
            title: '最新',
            duration: 500
          })
        })
        .catch(e => {
          console.error(e)
          this.careerMapsStatus = 'reject'
          uni.showToast({
            title: '失败',
            icon: 'none'
          })
        })
        .finally(() => {
          uni.stopPullDownRefresh()
        })
    },
    methods: {
      onRetryCareerQuery() {
        uni.showLoading({
          title: '重试中',
        })
        requestCareerQuery()
          .then(res => {
            const [careerSeasonsTable, tracksTable, mapThemesTable] = res.result
            this.careerSeasons = careerSeasonsTable.data
            this.tracks = tracksTable.data
            this.mapThemes = mapThemesTable.data

            this.careerQueryStatus = 'resolve'
            uni.showToast({
              title: '成功'
            })
          }).catch(e => {
            uni.showToast({
              title: '失败',
              icon: 'none'
            })

            console.error(e)
            this.careerQueryStatus = 'reject'
          })
      },

      onRetryCareerMaps() {
        uni.showLoading({
          title: '重试中',
        })

        requestCareerMaps()
          .then(res => {
            // console.log(res.result) // 3
            // return Promise.reject()
            this.careerMaps = res.result,
              this.careerMapsStatus = 'resolve'
            uni.showToast({
              title: '成功'
            })
          })
          .catch(e => {
            console.error(e)
            this.careerMapsStatus = 'reject'
            uni.showToast({
              title: '失败',
              icon: 'none'
            })
          })
      },

      ...mapMutations(['toggleServer']),
      onChangeMode() {
        uni.showToast({
          title: '已切换'
        })
        this.toggleServer()
      }
    }
  }
</script>

<style lang="scss">
  .mode-changer {
    display: flex;
    // background-color: $page-bg-color;

    padding: 20rpx;
    box-sizing: border-box;

    @include pad-devices {
      padding: toPadPx(20);
    }

    // @media (prefers-color-scheme: dark) {
    //   background-color: $page-bg-color-dark;
    // }
  }

  .mode-button {
    padding: 0 20rpx;
    font-size: 36rpx;
    flex: 1;
    display: flex;
    justify-content: center;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 10rpx;
    background-color: $card-bg-color;
    color: $theme-color;

    @include pad-devices {
      font-size: toPadPx(36);
      padding: 0 toPadPx(20);
      height: toPadPx(72);
      line-height: toPadPx(72);
      border-radius: toPadPx(10);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
      color: $theme-color-dark;
    }
  }
</style>
