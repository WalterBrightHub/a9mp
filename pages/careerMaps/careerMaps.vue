<template>
  <view class="container">
    <view class="mode-changer">
      <view class="mode-button" @tap="onChangeMode">{{server==='al'?'国服':'国际'}} ⇌</view>
    </view>
    <career-query ref="careerQueryDB" :trackDetails="tracks" :mapThemeRange="mapThemeRange" :server="server" :careerQueryStatus="careerQueryStatus"></career-query>

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
  const myCloud = uniCloud
  const db = myCloud.database()
  const requestCareerMaps = async function() {
    return myCloud.callFunction({
      name: 'getCareerMapsAll'
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
        // careerSeasons: [],
        tracks: [],
        mapThemeRange:[],
        // 加载主题与赛道后开始查询
        careerQueryStatus: 'ready'
      }
    },
    computed: {

      ...mapState(['server']),
    },
    onLoad() {

      let mapThemeRange = db.collection('mapThemes').orderBy('_id').get()
      let tracks = db.collection('tracks').orderBy('_id').get()
      Promise.all([mapThemeRange, tracks])
        .then(([mapThemeRange, tracks]) => {
          this.mapThemeRange = mapThemeRange.result.data
          this.tracks = tracks.result.data
          this.careerQueryStatus = 'resolve'
        })

      this.careerMapsStatus = 'pending'

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

      this.$refs.careerQueryDB.refresh()


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
      max-width: 768px;
      margin: 0 auto;
    }
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
