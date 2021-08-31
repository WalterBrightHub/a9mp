<template>
  <view>
    <div class="top-fixed-wrapper">
      <top-bar :showBack="true" :showServerToggle="true" :title="'获取方式'" />
    </div>

    <unicloud-db class="get-method-db" ref="getMethodDB" v-slot:default="{data, pagination, loading, error, options}"
      :options="options" :field="queryField" :collection="collection" :orderby="'_id'" @load="onqueryload"
      @error="onqueryerror" page-size="479">
      
      <view class="loading" v-if="loading">
        <loading />
      </view>
      <view v-else-if="error" class="error">{{error.message}}</view>
      <view v-else class="get-method-list-wrapper">

        <view class="list-wrapper">
          <view class="list-wrapper-in">
            <get-method-list :data="data" />
          </view>
        </view>
      </view>


      <view class="car-empty-list" v-else-if="data.length===0 && options.loaded===true">😮 这里空空如也</view>
    </unicloud-db>

  </view>
</template>

<script>
  import {
    mapState,
  } from 'vuex'
  import loading from '@/components/loading/loading.vue'
  import topBar from '@/components/topBar/topBar.vue'
  import getMethodList from './components/getMethodList.vue'
  import queryField, {
    getMethodField
  } from './getMethodField.js'
  const db = uniCloud.database()
 
  export default {
    components: {
      'loading': loading,
      'top-bar': topBar,
      'get-method-list': getMethodList,
    },
    data() {
      return {
        queryField: queryField.join(','),
      };
    },
    computed: {

      ...mapState(['server']),
      collection() {
        return this.server === 'al' ? 'carListAL' : 'carList'
      }
    },
    onLoad() {
    },
    methods: {
      onqueryload(data) {
        // console.log(data)
      },
      onqueryerror(){
        
      }
    }
  }
</script>

<style lang="scss">
  .top-fixed-wrapper {

    position: sticky;
    top: 0;
  }

  .list-wrapper {
    max-width: 768px;
    margin: 0 auto;
  }

  .list-wrapper-in {
    margin: 20rpx 0;
    margin-bottom: 30rpx;


    @include pad-devices {
      // 小屏左右无边距，卡片无圆角
      margin: toPadPx(20);
      margin-bottom: toPadPx(30);

    }
  }
  .loading{
    margin-top: 40rpx;
    @include pad-devices {
      margin-top: toPadPx(40);
    
    }
  }
</style>
