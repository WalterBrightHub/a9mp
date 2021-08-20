<template>
  <view class="container">
    <top-bar :showBack="true" :showServerToggle="true" :title="'版本新车'" />
    <unicloud-db class="cardb" ref="carDB" v-slot:default="{data, pagination, loading, error, options}"
      :collection="collection" :field="carCardField" :orderby="'_id'" :where="where" :manual="true" :page-size="479">
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
      'top-bar': topBar,
    },
    data() {
      return {
        releaseVersion: '',
        carCardField,
      }
    },
    computed: {
      ...mapState(['server']),
      collection() {
        return this.server === 'gl' ? 'carList' : 'carListAL'
      },
      where() {
        return `releaseVersion=='${this.releaseVersion}'`
      }
    },
    onLoad({
      releaseVersion
    }) {
      // console.log(releaseVersion)
      this.releaseVersion = releaseVersion
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

  .cardb {
    padding-top: 20rpx;

    @include pad-devices {
      padding-top: toPadPx(20);
    }
  }

  @import '@/pages/carList/carList.scss';
</style>
