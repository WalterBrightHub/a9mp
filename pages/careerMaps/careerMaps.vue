<template>
  <view class="container">
    
    	<top-bar :showServerToggle="true" />
    <view class="head-wrapper">

      <view class="head">
        <view class="tab-block">
          <view class="tab-item tab-item-selected">精确查询</view>
          <navigator class="tab-item" url="/pages/careerMaps/quickQuery/quickQuery">快速查询</navigator>
          <navigator class="tab-item" url="/pages/careerMaps/mapNameComparison/mapNameComparison">中英对照</navigator>
        </view>
      </view>
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
			'top-bar':topBar
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
  .head-wrapper {

    background-color: $card-bg-color;
    margin-bottom: 20rpx;
    @include pad-devices {
      margin-bottom: toPadPx(20);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }
  }

  .head {
    display: flex;
    // background-color: $page-bg-color;

    padding: 0 20rpx;
    box-sizing: border-box;

    @include pad-devices {
      padding: 0 toPadPx(20);
      max-width: 768px;
      margin: 0 auto;
    }
  }



  .tab-block {
    // padding: 0 20rpx;
    font-size: 36rpx;
    display: flex;
    // text-align: center;
    // justify-content: space-between;
    flex: 1;
    // margin-left: 32rpx;
    height: 72rpx;
    line-height: 72rpx;
    background-color: $card-bg-color;
    color: $text-title-color;


    @include pad-devices {
      font-size: toPadPx(36);
      // padding: 0 toPadPx(20);
      height: toPadPx(72);
      // margin-left: toPadPx(32);
      line-height: toPadPx(72);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
      color: $text-title-color-dark;
    }
  }



  .tab-item {
    // flex: 1;
  }

  .tab-item-selected {
    border-bottom: 8rpx solid $theme-color;
    font-weight: bold;
    color: $theme-color;

    @media (prefers-color-scheme: dark) {
      color: $theme-color-dark;
      border-bottom-color: $theme-color-dark;
    }

    @include pad-devices {
      border-bottom-width: toPadPx(8);
    }
  }

  .tab-item+.tab-item {
    margin-left: 32rpx;

    @include pad-devices {
      margin-left: toPadPx(32);
    }
  }



</style>
