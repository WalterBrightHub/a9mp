<template>
  <view>
    <top-bar :showBack="true" :showServerToggle="true" :title="'版本新车'" />
    <view class="list-wrapper">
      <view class="list-wrapper-in">
        <request-fail v-if="requestStatus==='reject'" @onRetry='onRetry' />
        <loading v-else-if="requestStatus==='pending'" />
        <view v-else-if="requestStatus==='resolve'">
          <view class="card" v-for="versionItem in releaseVersions" :key="versionItem._id">
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

  const requestReleaseVersions = () => {

    return uniCloud.callFunction({
      name: 'getReleaseVersionsBoth'
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
        releaseVersionsBoth: [
          [],
          []
        ],
        requestStatus: 'ready'
      };
    },
    computed: {

      ...mapState(['server', "theme"]),
      releaseVersions() {
        return this.releaseVersionsBoth[this.server === 'gl' ? '0' : '1'].data
      }
    },
    onLoad() {
      // console.log(this.server)
      this.requestStatus = 'pending'
      //获取所有品牌，并按照车辆数降序排列。
      requestReleaseVersions().then(res => {
        console.log(res.result)
        this.releaseVersionsBoth = res.result
        this.requestStatus = 'resolve'
      }).catch(e => {
        console.log(e)
        this.requestStatus = 'reject'
      })
    },
    onPullDownRefresh() {
      requestReleaseVersions().then(res => {
        this.releaseVersionsBoth = res.result
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
    methods: {
      onTapReleaseVersionItem(version) {
        uni.navigateTo({
          url: `/pages/carList/funcs/carBrand/carListBySelectedReleaseVersion?version=${version}`
        })
      },
      getPercentOf(count) {
        return count / (this.brands[0]?.count || 20) * 100
      },
      onRetry() {
        this.requestStatus = 'loading'
        requestReleaseVersions()
          .then(res => {
            this.releaseVersionsBoth = res.result
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
  .list-wrapper {
    max-width: 768px;
    margin: 0 auto;
  }

  .list-wrapper-in {
    margin: 20rpx 0;
    margin-bottom: 30rpx;


    @include pad-devices {
      margin: toPadPx(20) 0;
      margin-bottom: toPadPx(30);

    }
  }

  .list-head {
    display: flex;
    color: $text-title-color;
    padding: 20rpx;
    font-size: 32rpx;

    @media (prefers-color-scheme: dark) {

      color: $text-title-color-dark;
    }

    @include pad-devices {
      padding: toPadPx(20);
      font-size: toPadPx(32);

    }
  }

  .list-head-item {
    font-weight: bold;
  }

  .list-head-item-right {
    margin-left: auto;
  }

  .list {
    color: $text-title-color;
    font-size: 30rpx;

    @media (prefers-color-scheme: dark) {

      color: $text-title-color-dark;
    }

    @include pad-devices {
      font-size: toPadPx(30);

    }
  }



  .divider {
    height: 1px;
    background-color: $divider-color;

    @media (prefers-color-scheme: dark) {

      background-color: $divider-color-dark;
    }
  }

  .card-wrapper {

    padding: 15rpx 20rpx 20rpx 20rpx;

    @include pad-devices {
      padding: toPadPx(15) toPadPx(20) toPadPx(20) toPadPx(20);

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
      // border-radius: toPadPx(10);
    
    }


  }
  .card+.card{
    margin-top: 20rpx;
  }

  .card-head{
    display: flex;
  }
  .version-number,.version-car-count{
    
     color: $text-help-color;
     margin-left: 48rpx;
     font-size: 30rpx;
     align-self: flex-end;
  }
  .version-note{
    font-size: 36rpx;
    
    color:$theme-color;
    font-weight: bold;
  }
  .new-car-wrapper{
    margin-top: 30rpx;
  }
  .new-car-card{
    display: flex;
    // justify-content: space-between;
  }
  .car-class{
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
  }
  .car-bp-epic{
    background-color: #ffc107;
  }
  .car-bp-rare{
    background-color: #cc52ea;
  }
  .get-method{
    flex:none;
    margin-left: auto;
    color: #22a3df;
  }
   .new-car-card+.new-car-card{
     margin-top: 24rpx;
   }
  .count-bar {
    height: 20rpx;
    margin-top: 10rpx;
    border-radius: 5rpx;
    background-color: #5dd284;

    @media (prefers-color-scheme: dark) {

      background-color: #41b90a;
    }

    @include pad-devices {
      height: toPadPx(20);
      margin-top: toPadPx(10);
      border-radius: toPadPx(5);

    }
  }
</style>
