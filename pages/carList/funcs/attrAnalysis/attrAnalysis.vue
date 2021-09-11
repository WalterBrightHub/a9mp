<template>
  <view>
    
      <div class="top-fixed-wrapper">
        <top-bar :showBack="true" :showServerToggle="true" :title="'数据统计'" />
      </div>
      <unicloud-db class="attr-analysis-db" ref="attrAnalysisDB" v-slot:default="{data, pagination, loading, error, options}"
        :options="options" :where="where" :field="queryField" :collection="collection" :orderby="'_id'"  page-size="479">
      
        <view class="loading" v-if="loading">
          <loading />
        </view>
        <view v-else-if="error" class="error">{{error.message}}</view>
        <view class="car-empty-list" v-else-if="data.length===0 && options.loaded===true">😮 这里空空如也</view>
      
        <view v-else class="analysis-list-wrapper">
          <attr-analysis-list :data="data"></attr-analysis-list>
          
        </view>
      
      
      </unicloud-db>
  </view>
</template>

<script>
  import {
    mapState,
  } from 'vuex'
  import loading from '@/components/loading/loading.vue'
  import topBar from '@/components/topBar/topBar.vue'
  import queryField from './attrAnalysisField.js'
  import attrAnalysisList from './attrAnalysisList.vue'
  export default {
    components: {
      'loading': loading,
      'top-bar': topBar,
      'attr-analysis-list':attrAnalysisList
    },
    data() {
      return {
        queryField,
        where:'releaseVersion!="0.0"'
      };
    },
    
    computed:{
      ...mapState(['server']),
      collection() {
        return this.server === 'al' ? 'carListAL' : 'carList'
      }
    },
    onPullDownRefresh() {
      this.$refs.attrAnalysisDB.loadData({
        clear: true
      }, () => {
        uni.showToast({
          title: '最新',
          duration: 500
        })
        uni.stopPullDownRefresh()
      })
    },
    onShareAppMessage() {
      return {
        title: `狂飙小助手`,
      }
    },
  }
</script>

<style lang="scss">
.loading{
  margin-top: 20rpx;
}
.top-fixed-wrapper {

    position: sticky;
    top: 0;
  }
</style>
