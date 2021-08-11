<template>
  <view class="container">
    <top-bar :showBack="true" :title="'中英对照'" />
    <view class="context-wrapper">

      <view class="map-theme-block-list">
        <view class="map-theme-block" v-for="(mapTheme,index) of mapThemes" :key="mapTheme._id">
          <view class="map-theme-name-list">
            <view class="map-theme-name-item map-theme-name-item-cn">

              <view class="map-theme-name-cn">{{mapTheme.mapThemeCN}}</view>
              <view class="map-theme-name-al">{{mapTheme.mapThemeAL}}</view>
            </view>
            <view class="map-theme-name-item map-theme-name-en">{{mapTheme.mapThemeEN}}</view>
          </view>
          <view class="map-name-list">
            <view class="map-name-item-block" v-for="mapName of selectedMapNames[index]" :key="mapName.mapNameCN">
              <view class="map-name-item map-name-item-cn">
                <view class="map-name-cn">{{mapName.mapNameCN}}</view>
                <view class="map-name-al" v-if="mapName.mapNameCN!==mapName.mapNameAL">{{mapName.mapNameAL}}</view>
              </view>
              <view class="map-name-item">{{mapName.mapNameEN}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import topBar from '@/components/topBar/topBar.vue'
  const db = uniCloud.database()
  export default {
    components: {

      'top-bar': topBar,
    },
    data() {
      return {
        // careerSeasons: [],
        tracks: [],
        mapThemes: [],
        // 加载主题与赛道后开始查询
        careerQueryStatus: 'ready'
      }
    },
    computed: {
      selectedMapNames() {
        return this.mapThemes.map(mapTheme => this.tracks.filter(track => track.mapThemeCN === mapTheme.mapThemeCN))
      }
    },
    onLoad() {

      this.requestThemesAndTracks()

    },
    onShareAppMessage() {

      return {
        'title': '我在用《狂飙小助手》查看地图名字中英对照，你也来康康！'
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
          uni.showToast({
            title: '最新',
            icon: 'success'
          })
          uni.stopPullDownRefresh()
        })


    },
    methods: {
      requestThemesAndTracks() {
        let mapThemes = db.collection('mapThemes').orderBy('_id').get()
        //limit不设置的情况下默认返回100条数据；设置limit有最大值，腾讯云限制为最大1000条，阿里云限制为最大500条。
        let tracks = db.collection('tracks').orderBy('_id').limit(500).get()
        return Promise.all([mapThemes, tracks])
          .then(([mapThemes, tracks]) => {
            this.mapThemes = mapThemes.result.data
            this.tracks = tracks.result.data
            this.careerQueryStatus = 'resolve'
          })
      },
    }
  }
</script>

<style lang="scss">
  .container {}

  .context-wrapper {

    margin: 0 auto;
    width: 100%;
    max-width: 768px;
  }

  .map-theme-block-list {
    padding: 20rpx 20rpx 30rpx 20rpx;

    @include pad-devices {
      padding: toPadPx(20) toPadPx(20) toPadPx(30) toPadPx(20);
    }
  }

  .map-theme-block {
    background-color: $card-bg-color;
    border-radius: 10rpx;

    @include pad-devices {
      border-radius: toPadPx(10);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }
  }

  .map-theme-block+.map-theme-block {
    margin-top: 20rpx;

    @include pad-devices {
      margin-top: toPadPx(20);
    }
  }

  .map-theme-name-list {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    font-size: 34rpx;
    font-weight: bold;

    @include pad-devices {
      font-size: toPadPx(34);
      padding: toPadPx(20);
    }

    color: $text-title-color;

    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }

  .map-theme-name-item {
    flex: 1;
  }

  .map-theme-name-item-cn {
    display: flex;
  }

  .map-theme-name-cn,
  .map-theme-name-en {

    color: $theme-color;

    @media (prefers-color-scheme: dark) {
      color: $theme-color-dark;
    }
  }

  .map-theme-name-al {
    color: #41b90a;

    @media (prefers-color-scheme: dark) {
      color: #2d8006;
    }

    margin: 0 auto;
  }

  .map-name-list {
    padding: 20rpx;

    @include pad-devices {
      padding: toPadPx(20);
    }
  }

  .map-name-item-block {
    // border-top: 1rpx solid $divider-color;
    padding: 10rpx 0;

    @include pad-devices {
      // border-top-width: toPadPx(1);
      padding: toPadPx(10) 0;
    }

    display: flex;
    align-items:flex-start;

    @media (prefers-color-scheme: dark) {
      // border-top-color: $divider-color-dark;
    }
  }

  .map-name-item {
    flex: 1;
  }

  .map-name-item-cn {
    display: flex;
    flex-direction: column;
  }

  .map-name-al {
    margin-top: 5rpx;
    color: #41b90a;

    @media (prefers-color-scheme: dark) {
      color: #2d8006;
    }

    @include pad-devices {
      margin-top: toPadPx(5);
    }
  }
</style>
