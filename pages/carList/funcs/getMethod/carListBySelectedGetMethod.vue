<template>
  <view class="container">
    <div class="top-fixed-wrapper">
      
    <top-bar :showBack="true"  :title="'获取方式：'+name" />
    </div>
    <unicloud-db class="cardb" ref="carDB" v-slot:default="{data, pagination, loading, error, options}"
      :collection="collection" :field="carCardField" loadtime="maunal" :orderby="'_id'" :where="where"  :page-size="479">
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
        name:'',
        field:'',
      }
    },
    computed: {
      ...mapState(['server']),
      collection() {
        return this.server === 'gl' ? 'carList' : 'carListAL'
      },
      where() {
        return `${this.field}==1`
      }
    },
    onLoad({
      name,field
    }) {
      this.name = name
      this.field=field
    },
	onReady() {
		
	  this.$refs.carDB.loadData()
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
    
    position: sticky;
    top:0;
    z-index: 114514;
  }

  .cardb {
    padding-top: 20rpx;

    @include pad-devices {
      padding-top: toPadPx(20);
    }
  }

  @import '@/pages/carList/carList.scss';
</style>
