<template>
  <view class="context">
    <unicloud-db class="cardb" ref="carListDB" v-slot:default="{data, pagination, loading, error, options}"
      :options="options" :collection="collection" :orderby="selectMethod.sort" :where="selectMethod.where"
      @load="onqueryload" @error="onqueryerror" :manual="true">
      <view v-if="error" class="error">{{error.message}}</view>
      <view v-else class=" car-card-list">
        <view class="car-card-wrap" v-for="(carData,index) in data" :key="carData._id">
          <car-card :carData="carData"></car-card>
        </view>
      </view>

      <view class="loading" v-if="loading">
        <loading />
      </view>

      <view class="car-empty-list" v-if="data.length===0 && options.loaded===true">😮 这里空空如也</view>
    </unicloud-db>
  </view>
</template>

<script>
  import carCard from '@/components/carCard/carCard.vue'
  import loading from '../../components/loading/loading.vue'

  export default {
    components: {
      'car-card': carCard,
      'loading': loading
    },
    props: ['carList', 'selectMethod'],
    data() {
      return {
        // where:this.selectMethod.where
        options:{
          loaded:false
        }
      };
    },
    computed: {
      collection() {
        return this.selectMethod.server === 'gl' ? 'carList' : 'carListAL'
      },
    },
    methods: {
      loadData(){
        
          this.$refs.carListDB.loadData()
      },
      loadMore() {
        this.$refs.carListDB.loadMore()
      },
      refresh() {
        this.$refs.carListDB.loadData({
          //设置true又正常了，真奇怪
          clear: true
        }, () => {
          uni.showToast({
            title: '最新',
            duration: 500
          })
          uni.stopPullDownRefresh()
        })
      },
      onqueryload() {
        // uni.hideLoading()
        this.ooptions.loaded=true
      },
      onqueryerror() {
        // uni.hideLoading()
      },
    }
  }
</script>

<style lang="scss">
@import './carList.scss';
</style>
