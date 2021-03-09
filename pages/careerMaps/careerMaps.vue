<template>
  <view class="container">
    <view class="mode-changer">
      <view class="mode-button" @tap="toggleServer">{{server==='al'?'国服':'国际'}} ⇌</view>
    </view>
    <career-query ref="careerQueryDB" :trackDetails="tracks" :mapThemeRange="mapThemeRange" :server="server"
      :careerQueryStatus="careerQueryStatus"></career-query>

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
  const db = uniCloud.database()
  const requestCareerMaps = async function() {
    return db.collection('careerMaps2').orderBy('_id').limit(100).get()
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
        mapThemeRange: [],
        // 加载主题与赛道后开始查询
        careerQueryStatus: 'ready'
      }
    },
    computed: {

      ...mapState(['server']),
    },
    onLoad() {

      this.requestThemesAndTracks()

      this.careerMapsStatus = 'pending'

      requestCareerMaps()
        .then(res => {
          // console.log(res.result) // 3
          // return Promise.reject()
          this.careerMaps = res.result.data,
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
        'title': '生涯地图，精确查询'
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

      this.requestThemesAndTracks()
        .then(() => {

          this.$refs.careerQueryDB.refresh()
        })


      requestCareerMaps()
        .then(res => {
          // console.log(res.result) // 3
          // return Promise.reject()
          this.careerMaps = res.result.data,
            this.careerMapsStatus = 'resolve'


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
      requestThemesAndTracks() {
        let mapThemeRange = db.collection('mapThemes').orderBy('_id').get()
        //limit不设置的情况下默认返回100条数据；设置limit有最大值，腾讯云限制为最大1000条，阿里云限制为最大500条。
        let tracks = db.collection('tracks').orderBy('_id').limit(500).get()
        return Promise.all([mapThemeRange, tracks])
          .then(([mapThemeRange, tracks]) => {
            this.mapThemeRange = mapThemeRange.result.data
            this.tracks = tracks.result.data
            this.careerQueryStatus = 'resolve'
          })
      },
      onRetryCareerMaps() {
        this.requestThemesAndTracks()

        uni.showLoading({
          title: '重试中',
        })

        requestCareerMaps()
          .then(res => {
            // console.log(res.result) // 3
            // return Promise.reject()
            this.careerMaps = res.result.data,
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
