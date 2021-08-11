<template>
  <view class="container">

    	<top-bar :showBack="true" :showServerToggle="true" :title="'快速查询'" />

    <request-fail v-if="careerMapsStatus==='reject'" @onRetry='onRetryCareerMaps' />

    <view class="context" v-else-if="careerMapsStatus==='resolve'">
      <view class="map-list">
        <view class="map-card" v-for="theme in themes" :key="theme">
          <view class="theme">{{theme}}</view>
          <view class="row">
            <view class="map-name"></view>
            <view class="car-class" v-for="item in ['D','C','B','A','S']" :key="item">{{item}}</view>
          </view>
          <view class="row" v-for="item in selectedCareerMaps[theme]['ll']" :key="item._id">
            <view class="map-name">{{item.mapName}}</view>
            <view class="place" v-for="place in [item['D'],item['C'],item['B'],item['A'],item['S']]" :key="place">{{place}}</view>
          </view>
          <view class="divider" />
          <view class="row" v-for="item in selectedCareerMaps[theme]['l']" :key="item._id">
            <view class="map-name">{{item.mapName}}</view>
            <view class="place" v-for="place in [item['D'],item['C'],item['B'],item['A'],item['S']]" :key="place">{{place}}</view>
          </view>
          <view class="divider" />
          <view class="row" v-for="item in selectedCareerMaps[theme]['m']" :key="item._id">
            <view class="map-name">{{item.mapName}}</view>
            <view class="place" v-for="place in [item['D'],item['C'],item['B'],item['A'],item['S']]" :key="place">{{place}}</view>
          </view>
          <view class="divider" />
          <view class="row" v-for="item in selectedCareerMaps[theme]['s']" :key="item._id">
            <view class="map-name">{{item.mapName}}</view>
            <view class="place" v-for="place in [item['D'],item['C'],item['B'],item['A'],item['S']]" :key="place">{{place}}</view>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import requestFail from '@/components/requestFail/requestFail.vue'
	import topBar from '@/components/topBar/topBar.vue'
  
    import selectCareerMaps from './selectCareerMaps.js'

  const db = uniCloud.database()

  const requestCareerMaps = async function() {
    return db.collection('careerMaps2').orderBy('_id').limit(100).get()
  }

  export default {
    components: {

			'top-bar':topBar,
      'request-fail': requestFail,
    },
    data() {
      return {

        careerMaps: [],
        careerMapsStatus: 'ready',
      }
    },
    computed: {

      ...mapState(['server']),
      selectedCareerMaps() {
        return selectCareerMaps[this.server](this.careerMaps)
      },
      themes() {
        return Object.keys(this.selectedCareerMaps)
      }
    },
    onLoad() {

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
        'title': '我在用《狂飙小助手》快速查询生涯地图，你也来康康！'
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



      requestCareerMaps()
        .then(res => {
          // console.log(res.result) // 3
          // return Promise.reject()
          this.careerMaps = res.result.data,
            this.careerMapsStatus = 'resolve'

          uni.showToast({
            title: '最新',
            icon:'success'
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

      onRetryCareerMaps() {

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

  .context {
    max-width: 768px;
    margin: 0 auto;
  }


  .map-list {
    padding: 20rpx 20rpx 30rpx 20rpx;

    @include pad-devices {
      padding: toPadPx(20) toPadPx(20) toPadPx(30) toPadPx(20);
    }
  }

  .map-card {
    padding-bottom: 10rpx;
    border-radius: 10rpx;
    background-color: $card-bg-color;

    @include pad-devices {
      padding-bottom: toPadPx(10);
      border-radius: toPadPx(10);

    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }
  }

  .map-card+.map-card {
    margin-top: 20rpx;
    @include pad-devices {
      margin-top: toPadPx(20);
    }
  }

  .theme {
    padding: 20rpx;
    color: $theme-color;
    font-size: 36rpx;
    font-weight: bold;

    @include pad-devices {
      padding: toPadPx(20);
      font-size: toPadPx(36);
    }

    @media (prefers-color-scheme: dark) {
      color: $theme-color-dark;
    }


  }

  .row {
    padding: 8rpx 20rpx;
    font-size: 24rpx;
    display: flex;
    justify-content: space-between;

    @include pad-devices {
      padding: toPadPx(8) toPadPx(20);
      font-size: toPadPx(24);
    }
  }

  .map-name {

    width: 168rpx;

    @include pad-devices {
      width: toPadPx(168);
    }
  }

  .place {
    width: 90rpx;

    @include pad-devices {
      width: toPadPx(90);
    }
  }

  .divider {
    padding-top: 1rpx;
    background-color: $divider-color;
    margin: 10rpx 0;

    @include pad-devices {
      padding-top: toPadPx(1);
      margin: toPadPx(10) 0;
    }

    @media (prefers-color-scheme: dark) {
      background-color: $divider-color-dark;
    }
  }

  .car-class {
    font-weight: bold;
    text-align: center;

  }

  .place,
  .car-class {
    width: 90rpx;

    @include pad-devices {
      width: toPadPx(90);
    }
  }

  .car-class,
  .map-name {
    font-weight: bold;
    color: $text-title-color;

    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }
</style>
