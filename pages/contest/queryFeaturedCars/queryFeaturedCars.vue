<template>
  <view class="container">
    <div class="top-fixed-wrapper">
      
    	<top-bar :showBack="true" :title="'精选车辆'" />
    </div>
    <unicloud-db class="cardb" ref="cardb" v-slot:default="{data, pagination, loading, error, options}"
      :collection="collection" :field="carCardField" :orderby="'_id desc'" :where="where" :manual="true" :page-size="479">
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
    </unicloud-db>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import carCard from '@/components/carCard/carCard.vue'
  import loading from '@/components/loading/loading.vue'
	import topBar from '@/components/topBar/topBar.vue'
  import carCardField from '@/config/carCardField.js'

  export default {
    components: {

      'car-card': carCard,
      'loading': loading,
			'top-bar':topBar,
    },
    data() {
      return {
        carCardField,
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

    display: flex;
    flex-direction: column;

  }
  
  .top-fixed-wrapper{
    z-index: 114514;
    position: sticky;
    top:0;
  }
  .cardb{
    padding-top: 20rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    @include pad-devices {
      padding-top: toPadPx(20);
    }
  }

@import '@/pages/carList/carList.scss';
</style>
