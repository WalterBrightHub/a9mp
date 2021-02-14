<template>
  <view class="context">
    <unicloud-db class="cardb" ref="carListDB" v-slot:default="{data, pagination, loading, error, options}" :options="options"
      :collection="collection" :orderby="selectMethod.sort"  :where="selectMethod.where"
      >
      <view v-if="error" class="error">{{error.message}}</view>
      <view v-else class=" car-card-list">
        <view class="car-card" v-for="(carData,index) in data" :key="carData._id">
          <car-card :carData="carData"></car-card>
        </view>
      </view>

      <view class="car-empty-list" v-if="data.length===0 && loading===false">😮 这里空空如也</view>
      <view v-if="loading" class="loading">加载中...</view>
    </unicloud-db>
  </view>
</template>

<script>
  import carCard from './components/carCard.vue'

  export default {
    components: {
      'car-card': carCard
    },
    props: ['carList', 'selectMethod'],
    data() {
      return {
        // where:this.selectMethod.where
      };
    },
    computed: {
      collection() {
        return this.selectMethod.server === 'gl' ? 'carList' : 'carListAL'
      },
    },
    methods: {
      loadMore() {
        this.$refs.carListDB.loadMore()
      },
      refresh() {
        this.$refs.carListDB.loadData({
          // clear: true
        }, () => {
          uni.showToast({
            title: '最新',
            duration: 500
          })
          uni.stopPullDownRefresh()
        })
      },
    }
  }
</script>

<style lang="scss">
  .car-card-list {
    padding: 0 20rpx;
    padding-bottom: 30rpx;

    @include pad-devices {
      padding: 0 toPadPx(20);
      padding-bottom: toPadPx(30);
    }

    margin: 0 auto;
    max-width: 768px;

  }

  .cardb {
    // width: 100%;
  }

  .car-card+.car-card {
    margin-top: 20rpx;

    @include pad-devices {
      margin-top: toPadPx(20);
    }
  }

  //宽屏设备，双列排布
  @media (min-width:750px) {
    .car-card-list {
      display: flex;
      flex-wrap: wrap;
    }

    .car-card {
      flex: 1 1 340px;
      margin-top: 20px;
      padding: 0 10px;
      max-width: 354px;
    }

    .car-card+.car-card {
      margin-top: 20px;
    }
  }

  .car-empty-list,
  .loading {
    font-size: 36rpx;
    margin-top: 20rpx;
    color: $text-help-color;
    display: flex;
    justify-content: center;

    @include pad-devices {
      margin-top: toPadPx(20);
      font-size: toPadPx(36);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-help-color-dark;
    }
  }
</style>
