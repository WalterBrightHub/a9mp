<template>
  <view>
    <div class="top-fixed-wrapper">
      
    <top-bar :showBack="true" :showServerToggle="false" :title="'品牌分类'" />
    </div>
    <view class="option-card-list-wrapper">
      <view class="option-card-list">
        <view class="option-card">
          <view class="option-label">排序方式</view>
          <view class="option-item" :class="{['option-item-selected']:sortOption==='brandName'}"
            @tap="onChangeSortOption('brandName')">
            品牌名称
          </view>
          <view class="option-item" :class="{['option-item-selected']:sortOption==='modelNumber'}"
            @tap="onChangeSortOption('modelNumber')">
            车型数量
          </view>
        </view>
      </view>
    </view>
    <view class="list-wrapper">
      <view class="list-wrapper-in">
        <request-fail v-if="requestStatus==='reject'" @onRetry='onRetry' />
        <view class="loading-wrapper" v-else-if="requestStatus==='pending'">

          <loading />
        </view>
        <view v-else-if="requestStatus==='resolve'">

          <view class="list-head">
            <view class="list-head-item">品牌</view>
            <view class="list-head-item list-head-item-right">车辆数</view>
          </view>
          <view class="list">
            <view class="list-item card-wrapper" v-for="(brandItem,index) in brandsSorted" :key="brandItem.brand"
              @tap="onTapBrandItem(brandItem.brand)">
              <!-- <view class="divider" v-if="index>0"></view> -->
              <!-- <list-item-card :brandItem="brandItem" :percent="getPercentOf(brandItem.count)" :theme="theme" /> -->

              <view class="card">

                <view class="card-item">{{brandItem.brand}}</view>
                <view class="card-item-right">{{brandItem.count}}</view>
                <image class="card-item right-arrow-icon" src="@/static/common/right-arrow.png"></image>
              </view>
              <view class="count-bar" :style="{width:getPercentOf(brandItem.count)+'%'}"></view>
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

  const db = uniCloud.database()
  const requestBrands = () => {
    return db.collection('carList').where('brand!=""').groupBy('brand').groupField('count(*) as count').orderBy(
      'count desc, brand asc').get()
  }


  export default {
    components: {
      'loading': loading,
      'top-bar': topBar,
      'request-fail': requestFail,
    },
    data() {
      return {
        brands: [],
        requestStatus: 'ready',
        sortOption: 'modelNumber'
      };
    },
    computed: {

      ...mapState(['server', "theme"]),
      maxBrandCount() {
        return this.brands.reduce((res, curr) => Math.max(res, curr.count), 1)
      },
      brandsSortedByName() {
        return this.brands.slice().sort((a, b) => a.brand < b.brand ? -1 : 1)
      },
      brandsSorted() {
        return this.sortOption === 'modelNumber' ?this.brands :  this.brandsSortedByName 
      }
    },
    onLoad() {
      // console.log(this.server)
      this.requestStatus = 'pending'
      //获取所有品牌，并按照车辆数降序排列。
      requestBrands().then(res => {
        // console.log(res.result.data)
        this.brands = res.result.data
        this.requestStatus = 'resolve'
      }).catch(e => {
        console.log(e)
        this.requestStatus = 'reject'
      })
    },
    onPullDownRefresh() {
      requestBrands().then(res => {
        this.brands = res.result.data
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
        'title': '狂野飙车9车辆品牌分类',
      }
    },
    onShareAppMessage() {
      return {
        title: `狂飙小助手`,
      }
    },
    methods: {
      onTapBrandItem(brand) {
        uni.navigateTo({
          url: `/pages/carList/funcs/carBrand/carListBySelectedBrand?brand=${brand}`
        })
      },
      getPercentOf(count) {
        return count / (this.brands[0]?.count || 20) * 100
      },
      onRetry() {
        this.requestStatus = 'loading'
        requestBrands()
          .then(res => {
            this.brands = res.result.data
            this.requestStatus = 'resolve'
          }).catch(e => {
            this.requestStatus = 'reject'
          }).finally(() => {
            uni.stopPullDownRefresh()
          })
      },
      onChangeSortOption(option) {
        this.sortOption = option
      }
    },
  }
</script>

<style lang="scss">
  
  .top-fixed-wrapper{
    z-index: 114514;
    position: sticky;
    top:0;
  }
  .option-card-list-wrapper {

    display: flex;
    justify-content: center;
    width: 100%;
    background-color: $card-bg-color;

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }
  }

  .option-card-list {
    max-width: 768px;
    width: 100%;
    padding: 20rpx;

    @include pad-devices {
      padding: toPadPx(20);
    }
  }

  .option-card {
    display: flex;
    align-items: center;
  }

  .option-card+.option-card {
    margin-top: 10rpx;

    @include pad-devices {
      margin-top: toPadPx(10);
    }
  }

  .option-label {
    font-size: 28rpx;
    margin-right: auto;
    color: $text-p-color;

    @media (prefers-color-scheme: dark) {
      color: $text-p-color-dark;
    }

    @include pad-devices {
      font-size: toPadPx(28);
    }
  }

  .option-item {
    flex: none;
    font-size: 28rpx;
    line-height: 48rpx;
    padding: 10rpx 20rpx;

    color: $text-title-color;

    // font-weight: normal;
    @include pad-devices {
      font-size: toPadPx(28);
      line-height: toPadPx(48);
      padding: toPadPx(10) toPadPx(20);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }

    @include pad-devices {
      font-size: toPadPx(28);
      line-height: toPadPx(48);
      padding: toPadPx(10) toPadPx(20);
    }
  }

  .option-item-selected {
    border-radius: 2rpx;
    background-color: #41b90a;
    color: #fff;
    font-weight: bold;

    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
      background-color: #2d8006;
    }

    @include pad-devices {
      border-radius: toPadPx(2);
    }
  }

  .list-wrapper {
    max-width: 768px;
    margin: 0 auto;
    
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .list-wrapper-in {
    margin: 20rpx;
    margin-bottom: 30rpx;
    border-radius: 10rpx;
    background-color: $card-bg-color;

    @media (prefers-color-scheme: dark) {

      background-color: $card-bg-color-dark;
    }

    @include pad-devices {
      margin: toPadPx(20);
      margin-bottom: toPadPx(30);
      border-radius: toPadPx(10);

    }
  }

  .loading-wrapper {
    padding: 20rpx 0;
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




  .card-wrapper {

    padding: 20rpx;

    @include pad-devices {
      padding: toPadPx(15) toPadPx(20) toPadPx(20) toPadPx(20);

    }
  }

  .card {
    display: flex;
    align-items: center;
    font-size: 30rpx;

    @include pad-devices {
      font-size: toPadPx(30);

    }
  }



  .card-item-right {
    margin-left: auto;
  }

  .right-arrow-icon {
    width: 18rpx;
    height: 18rpx;
    margin-left: 18rpx;
    filter: invert(70%);

    @media (prefers-color-scheme: dark) {

      filter: invert(30%);
    }

    @include pad-devices {
      width: toPadPx(18);
      height: toPadPx(18);
      margin-left: toPadPx(18);

    }
  }

  .count-bar {
    height: 10rpx;
    margin-top: 5rpx;
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
