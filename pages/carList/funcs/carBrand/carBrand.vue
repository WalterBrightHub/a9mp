<template>
  <view>
    <top-bar :showBack="true" :showServerToggle="false" :title="'品牌分类'" />
    <view class="list-wrapper">
      <view class="list-wrapper-in">
        <request-fail v-if="requestStatus==='reject'" @onRetry='onRetry' />
        <loading v-else-if="requestStatus==='pending'" />
        <view v-else-if="requestStatus==='resolve'">

          <view class="list-head">
            <view class="list-head-item">品牌</view>
            <view class="list-head-item list-head-item-right">车辆数</view>
          </view>
          <view class="list">
            <view class="list-item" v-for="(brandItem,index) in brands" @tap="onTapBrandItem(brandItem.brand)">
              <view class="divider" v-if="index>0"></view>
              <list-item-card :brandItem="brandItem" :percent="getPercentOf(brandItem.count)" :theme="theme" />
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
  import listItemCard from './listItemCard/listItemCard.vue'

  const db = uniCloud.database()
  const requestBrands = () => {
    return db.collection('carList').where('brand!=""').groupBy('brand').groupField('count(*) as count').orderBy(
      'count desc, brand asc').get()
  }


  export default {
    components: {
      'loading': loading,
      'top-bar': topBar,
      'list-item-card': listItemCard,
      'request-fail': requestFail,
    },
    data() {
      return {
        brands: [],
        requestStatus: 'ready'
      };
    },
    computed: {

      ...mapState(['server', "theme"]),
      maxBrandCount() {
        return this.brands.reduce((res, curr) => Math.max(res, curr.count), 1)
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
    methods: {
      onTapBrandItem(brand) {
        uni.navigateTo({
          url: `/pages/carList/funcs/carBrand/carListBySelectedBrand?brand=${brand}`
        })
      },
      getPercentOf(count) {
        return count > 1 ? count / (this.brands[0]?.count || 20) * 100 : 0
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

  .list-head {
    display: flex;
    color: $text-title-color;
    padding: 20rpx;
    font-size: 32rpx;   
    @media (prefers-color-scheme: dark) {

      color: $text-title-color-dark;
    }
    @include pad-devices {
      padding:  toPadPx(20);
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
      font-size:  toPadPx(30);
    
    }
  }



  .divider {
    height: 1px;
    background-color: $divider-color;   
    @media (prefers-color-scheme: dark) {

      background-color: $divider-color-dark;
    }
  }
</style>
