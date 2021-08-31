<template>
  <view class="context">
    <unicloud-db class="cardb" ref="carListDB" v-slot:default="{data, pagination, loading, error, options}"
      :options="options" :field="carCardField" :collection="collection" :orderby="'_id'" :where="where"
      @load="onqueryload" @error="onqueryerror" >
      <view v-if="error" class="error">{{error.message}}</view>
      <view v-else class=" car-card-list">
        <view class="car-card-wrap" v-for="(carData,index) in data" :key="carData._id">
          <car-card :carData="carData"></car-card>
        </view>
      </view>

      <view class="loading" v-if="loading">
        <loading />
      </view>

      <view class="car-empty-list" v-else-if="data.length===0 && options.loaded===true">😮 这里空空如也</view>
    </unicloud-db>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import carCard from '@/components/carCard/carCard.vue'
  import loading from '@/components/loading/loading.vue'
  import carCardField from '@/config/carCardField.js'

  export default {
    components: {
      'car-card': carCard,
      'loading': loading
    },
    props: [ 'carClass'],
    data() {
      return {
        // where:this.selectMethod.where
        carCardField,
        options:{
          loaded:false
        }
      };
    },
    computed: {
        ...mapState(['server']),
      collection() {
        return this.server === 'gl' ? 'carList' : 'carListAL'
      },
      where(){
        return `carClass=='${this.carClass}'`
      }
    },
    methods: {
      loadData(){
        
          this.$refs.carListDB.loadData()
      },
      loadMore() {
        this.$refs.carListDB.loadMore()
      },
      refresh() {
        // this.options.loaded=false
        this.$refs.carListDB.loadData({
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
      onqueryload() {
        // console.log(data)
        // uni.hideLoading()
        this.options.loaded=true
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
