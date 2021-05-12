<template>
  <view class="container">
    <unicloud-db class="cardb" :ref="cardb" v-slot:default="{data, pagination, loading, error, options}"
      :collection="collection" :orderby="'_id desc'" :where="where" :manual="true" :page-size="479">
      <view v-if="error" class="error">{{error.message}}</view>
      <view v-else class=" car-card-list">
        <view class="car-card" v-for="(carData,index) in data" :key="carData._id">
          <car-card :carData="carData"></car-card>
        </view>
      </view>

      <view class="loading" v-if="loading">
        <loading />
      </view>

      <view class="car-empty-list" v-if="data.length===0 && loading===false">😮 这里空空如也</view>
    </unicloud-db>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import carCard from '../../carList/components/carCard.vue'
  import loading from '../../../components/loading/loading.vue'

  export default {
    components: {

      'car-card': carCard,
      'loading': loading
    },
    data() {
      return {

        carIds: []
      }
    },
    computed: {
      ...mapState(['server']),
      collection() {
        return this.server === 'gl' ? 'carList' : 'carListAL'
      },
      where() {
        let ins = this.carIds.map(carId => `'${carId}'`).join(',')
        return `car_id in [${ins}]`
      }
    },
    onLoad({
      carIds
    }) {
      this.carIds = carIds.split(',')
    },
    methods: {
      getWhere(carId) {
        return `car_id=="${carId}"`
      }
    }
  }
</script>

<style lang="scss">
  .container {
    padding-top: 20rpx;
  }

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

  .car-empty-list {
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

  .loading {
    padding: 24rpx;

    @include pad-devices {
      padding: toPadPx(24);
    }
  }
</style>
