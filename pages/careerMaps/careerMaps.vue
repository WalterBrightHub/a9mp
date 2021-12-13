<template>
  <view class="container">
    <div class="top-fixed-wrapper">
      
    <top-bar :showServerToggle="true" :ns="true" />
    </div>
    <view class="func-button-list-wrapper">
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
    </view>

    <career-query ref="careerQueryDB" :trackDetails="tracks" :mapThemeRange="mapThemeRange" :server="server" :realServer="realServer"
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
  import tapTabToTop from '@/mixin/tapTabToTop.js'

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

      ...mapState(['server','serverNS']),
      realServer(){
        return this.serverNS?'ns':this.server
      }
    },
    mixins:[tapTabToTop],
    onLoad() {

      this.requestThemesAndTracks()

    },
    onShareAppMessage() {

      return {
        'title': '我在用《狂飙小助手》精确查询生涯地图，你也来康康！'
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
  .top-fixed-wrapper{
    
    position: sticky;
    top:0;
  }


  .func-button-list-wrapper{
    display: flex;
    justify-content: center;
  }

  .func-button-list {
    display: flex;
    padding: 20rpx;
    box-sizing: border-box;
    max-width: 768px;
    width: 100%;

    @include pad-devices {
      padding: toPadPx(20);
    }
  }

  .func-button-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #cc52ea;
    background-color: #23bbfa;
    // background: linear-gradient(to right, #ff226b, #ff0054);
    color: #fff;
    border-radius: 10rpx;

    @include pad-devices {
      border-radius: toPadPx(10);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
      color: #23bbfa;
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
