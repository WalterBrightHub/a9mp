<template>
  <view class="container">

    <top-bar :showServerToggle="true" />

    <view class="func-button-list">
      <navigator class="func-button-item" url="/pages/careerMaps/quickQuery/quickQuery">
        <image class="func-icon" src="../../static/func-button-icons/magnifier.png"></image>
        <view class="func-title">快速查询</view>
      </navigator>
      <navigator class="func-button-item" url="/pages/careerMaps/mapNameComparison/mapNameComparison">
        <image class="func-icon" src="../../static/func-button-icons/translate.png"></image>
        <view class="func-title">中英对照</view>
      </navigator>
    </view>
    <career-query ref="careerQueryDB" :trackDetails="tracks" :mapThemeRange="mapThemeRange" :server="server"
      :careerQueryStatus="careerQueryStatus"></career-query>

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import careerQuery from './careerQuery.vue'
  import topBar from '../../components/topBar/topBar.vue'

  const db = uniCloud.database()

  export default {
    components: {
      'career-query': careerQuery,
      'top-bar': topBar
    },
    data() {
      return {
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

    },
    onShareAppMessage() {

      return {
        'title': '我在用《狂飙小助手》精确查询生涯地图，你也来康康！'
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

    }
  }
</script>

<style lang="scss">
  
    .top-bar{
      
      border-bottom: 1px solid $divider-color;    
      @media (prefers-color-scheme: dark) {
        border-bottom-color: $divider-color-dark;
      }
    }
  .func-button-list {
    display: flex;
    margin: 20rpx;

    @include pad-devices {
      margin: toPadPx(20);
    }
  }

  .func-button-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: #cc52ea;
    background: linear-gradient(to right, #d866f4, #cc52ea);
    color: #fff;
    border-radius: 10rpx;

    @include pad-devices {
      border-radius: toPadPx(10);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
      color: #cc52ea;
    }
  }

  .func-button-item+.func-button-item {
    margin-left: 20rpx;
    @include pad-devices {
      margin-left: toPadPx(20);
    }
  }

  .func-icon {
    width: 32rpx;
    height: 32rpx;

    @include pad-devices {
      width: toPadPx(32);
      height: toPadPx(32);
    }

    @media (prefers-color-scheme: dark) {
      filter: invert(30%);
    }
  }

  .func-title {
    font-size: 32rpx;
    padding: 16rpx 0;
    margin-left: 32rpx;
    @include pad-devices {
      font-size: toPadPx(32);
      padding: toPadPx(16) 0;
      margin-left: toPadPx(32);
    }
  }
</style>
