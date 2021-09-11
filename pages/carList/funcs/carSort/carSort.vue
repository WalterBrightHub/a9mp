<template>
  <view class="container">
    <div class="top-fixed-wrapper">

      <top-bar :showBack="true" :showServerToggle="true" :title="'数据排序'" />
    </div>
    <view class="option-card-list-wrapper">
      <view class="option-card-list">
        <view class="option-card">
          <view class="option-label">排序对象</view>
          <view class="option-item" :class="{['option-item-selected']:index===sortFieldValue}"
            v-for="(sortTarget,index) in sortFieldRange" :key="index" @tap="onChangeSortFieldValue(index)">
            {{sortTarget.name}}
          </view>
        </view>
        <view class="option-card">
          <view class="option-label">排序方式</view>
          <view class="option-item" :class="{['option-item-selected']:sortAsc}" @click="onChangeSortAsc(true)">升序</view>
          <view class="option-item" :class="{['option-item-selected']:!sortAsc}" @click="onChangeSortAsc(false)">降序
          </view>
        </view>
      </view>
    </view>

    <unicloud-db class="cardb" ref="carListDB" v-slot:default="{data, pagination, loading, error, options,hasMore}"
      :collection="collection" :where="'releaseVersion!=\'0.0\''" :field="carCardField" :orderby="orderby"
      @load="handleLoad">
      <view v-if="error" class="error">{{error.message}}</view>
      <view v-else class=" car-card-list">
        <view class="car-card-wrap" v-for="(carData,index) in data" :key="carData._id">
          <car-card :carData="carData"></car-card>
        </view>
      </view>

      <view class="loading" v-if="loading">
        <loading />
      </view>

      <view class="car-empty-list" v-if="data.length===0 && loading===false">😮 这里空空如也</view>
      <view class="has-no-more" v-if="!loading && !hasMore">🧐 没有更多啦！</view>
    </unicloud-db>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import carCard from '@/components/carCard/carCard.vue'
  import loading from '@/components/loading/loading.vue'
  import topBar from '@/components/topBar/topBar.vue'
  import carCardField from '@/config/carCardField.js'

  export default {
    components: {
      'car-card': carCard,
      'loading': loading,
      'top-bar': topBar,
    },
    data() {
      return {
        carCardField,
        sortFieldRange: [{
          name: '性能分',
          value: 'rank'
        }, {
          name: '最大速度',
          value: 'topSpeed'
        }, {
          name: '加速',
          value: 'acceleration'
        }, {
          name: '操控',
          value: 'handling'
        }, {
          name: '氮气',
          value: 'nitro'
        }],
        sortFieldValue: 0,
        sortAsc: true,
      }
    },
    computed: {
      ...mapState(['server']),
      collection() {
        return this.server === 'gl' ? 'carList' : 'carListAL'
      },
      sortField() {
        return this.sortFieldRange[this.sortFieldValue]
      },
      orderby() {
        return `${this.sortField.value}${this.sortAsc?'':' desc'}`
      }
    },
    onLoad() {

    },
    onReachBottom() {
      this.$refs.carListDB.loadMore()
      // this.limit += 20
    },
    onPullDownRefresh() {

      this.$refs.carDB.loadData({
        //设置true又正常了，真奇怪
        clear: true
      }, () => {
        uni.showToast({
          title: '最新',
          duration: 500
        })
        uni.stopPullDownRefresh()
        // this.options.loaded=true
      })
    },
    onShareAppMessage() {
      return {
        title: `狂飙小助手`,
      }
    },
    methods: {
      onChangeSortAsc(isAsc) {
        this.sortAsc = isAsc === true
      },
      onChangeSortFieldValue(index) {
        this.sortFieldValue = index
      },
      handleLoad(data, ended) {

      }
    }
  }
</script>

<style lang="scss">
  .container {

    display: flex;
    flex-direction: column;

  }

  .top-fixed-wrapper {
    z-index: 114514;
    position: sticky;
    top: 0;
  }

  .cardb {
    padding-top: 20rpx;

    @include pad-devices {
      padding-top: toPadPx(20);
    }
  }

  @import '@/pages/carList/carList.scss';

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

  .has-no-more {
    display: flex;
    justify-content: center;
    color: $text-help-color;
    padding-bottom: 40rpx;

    @media (prefers-color-scheme: dark) {
      color: $text-help-color-dark;
    }

    @include pad-devices {
      padding-bottom: toPadPx(40);
    }
  }
</style>
