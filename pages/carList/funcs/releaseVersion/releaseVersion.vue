<template>
  <view>
    <div class="top-fixed-wrapper">

      <top-bar :showBack="true" :showServerToggle="true" :title="'版本新车'" />
    </div>
    <view class="list-wrapper">
      <view class="list-wrapper-in">
        <request-fail v-if="requestStatus==='reject'" @onRetry='onRetry' />
        <loading v-else-if="requestStatus==='pending'" />
        <view v-else-if="requestStatus==='resolve'">
          <view class="card" v-for="(versionItem,index) in releaseVersions" :key="versionItem._id"
            @tap="onTapReleaseVersionItem(versionItem.releaseVersion,versionItem.note)">
            <view class="card-head">
              <view class="version-note">{{versionItem.note}}</view>
              <view class="version-number">版本号 {{versionItem.releaseVersion}}</view>
              <view class="version-car-count">新车数 {{versionItem.newCar.length}}</view>
            </view>
            <view class="card-body new-car-wrapper">
              <view class="new-car-card" v-for="newCarItem in versionItem.newCar" :key="newCarItem._id">
                <view class="car-class" :class="'car-bp-'+newCarItem.quality">{{newCarItem.carClass}}</view>
                <view class="full-name">{{newCarItem.fullName}}</view>
                <view class="get-method">{{newCarItem.getMethod}}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
  } from 'vuex'
  import loading from '@/components/loading/loading.vue'
  import requestFail from '@/components/requestFail/requestFail.vue'
  import topBar from '@/components/topBar/topBar.vue'

  const requestReleaseVersions = (server) => {

    return uniCloud.callFunction({
      name: 'getReleaseVersions',
      data: {
        server
      }
    })
  }


  export default {
    components: {
      'loading': loading,
      'top-bar': topBar,
      'request-fail': requestFail,
    },
    data() {
      return {

        releaseVersions: [],
        requestStatus: 'ready'
      };
    },
    computed: {

      ...mapState(['server', "theme"]),
    },
    watch: {
      server(newServer) {
        this.requestStatus = 'pending'
        requestReleaseVersions(newServer).then(res => {
          // console.log(res)
          this.releaseVersions = res.result.data
          this.requestStatus = 'resolve'
        }).catch(e => {
          console.log(e)
          this.requestStatus = 'reject'
        })
      }
    },
    onLoad() {
      // console.log(this.server)
      this.requestStatus = 'pending'
      //获取所有品牌，并按照车辆数降序排列。
      requestReleaseVersions(this.server).then(res => {
        // console.log(res)
        this.releaseVersions = res.result.data
        this.requestStatus = 'resolve'
      }).catch(e => {
        console.log(e)
        this.requestStatus = 'reject'
      })
    },
    onPullDownRefresh() {
      requestReleaseVersions(this.server).then(res => {
        this.releaseVersions = res.result.data
        // this.requestStatus = 'reject'
        this.requestStatus = 'resolve'
        uni.showToast({
          title: '最新',
          duration: 500
        })
      }).catch(e => {
        console.log(e)
        this.requestStatus = 'reject'
      }).finally(() => {
        uni.stopPullDownRefresh()
      })
    },
    onShareAppMessage() {
      return {
        'title': '狂野飙车9版本新车',
      }
    },
    onShareAppMessage() {
      return {
        title: `狂飙小助手`,
      }
    },
    methods: {
      onTapReleaseVersionItem(releaseVersion, note) {
        uni.navigateTo({
          url: `/pages/carList/funcs/releaseVersion/carListBySelectedReleaseVersion?note=${note}&releaseVersion=${releaseVersion}&`
        })
      },
      getPercentOf(count) {
        return count / (this.brands[0]?.count || 20) * 100
      },
      onRetry() {
        this.requestStatus = 'loading'
        requestReleaseVersions(this.server)
          .then(res => {
            this.releaseVersions = res.result.data
            this.requestStatus = 'resolve'
          }).catch(e => {
            this.requestStatus = 'reject'
          }).finally(() => {
            uni.stopPullDownRefresh()
          })
      }
    },
  }
</script>

<style lang="scss">
  .top-fixed-wrapper {
    z-index: 114514;
    position: sticky;
    top: 0;
  }

  .list-wrapper {
    max-width: 768px;
    margin: 0 auto;
  }

  .list-wrapper-in {
    margin: 20rpx 0;
    margin-bottom: 30rpx;


    @include pad-devices {
      // 小屏左右无边距，卡片无圆角
      margin: toPadPx(20);
      margin-bottom: toPadPx(30);

    }
  }


  .card {
    // display: flex;
    align-items: center;
    // border-radius: 10rpx;
    padding: 20rpx;
    background-color: $card-bg-color;

    @media (prefers-color-scheme: dark) {

      background-color: $card-bg-color-dark;
    }


    @include pad-devices {
      border-radius: toPadPx(10);
      padding: toPadPx(20);

    }


  }

  .card+.card {
    margin-top: 20rpx;

    @include pad-devices {
      margin-top: toPadPx(20);
    }
  }

  .card-head {
    display: flex;
  }

  .version-number,
  .version-car-count {

    color: $text-help-color;
    margin-left: 48rpx;
    font-size: 30rpx;
    align-self: flex-end;

    @media (prefers-color-scheme: dark) {

      color: $text-help-color-dark;
    }

    @include pad-devices {
      margin-left: toPadPx(48);
      font-size: toPadPx(30);

    }
  }

  .version-note {
    font-size: 36rpx;

    color: $theme-color;
    font-weight: bold;

    @include pad-devices {
      font-size: toPadPx(36);

    }
  }

  .new-car-wrapper {
    margin-top: 30rpx;

    @include pad-devices {
      margin-top: toPadPx(30);

    }
  }

  .new-car-card {
    display: flex;
    // justify-content: space-between;
  }

  .car-class {
    background-color: #22a3df;
    color: #fff;
    border-radius: 5rpx;
    width: 36rpx;
    height: 36rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10rpx;

    @media (prefers-color-scheme: dark) {

      color: #000;

    }

    @include pad-devices {
      // border-radius: toPadPx(10);
      width: toPadPx(36);
      height: toPadPx(36);
      margin-left: toPadPx(10);
      border-radius: toPadPx(5);

    }
  }

  .car-bp-epic {
    background-color: #ffc107;
  }

  .car-bp-rare {
    background-color: #cc52ea;
  }

  .get-method {
    flex: none;
    margin-left: auto;
    color: #22a3df;
  }

  .new-car-card+.new-car-card {
    margin-top: 24rpx;

    @include pad-devices {
      // border-radius: toPadPx(10);
      margin-top: toPadPx(24);

    }
  }
</style>
