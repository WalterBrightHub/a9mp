<template>
  <view class="container">
    <view class="top-bar-wrapper">
      
		<top-bar  :showServerToggle="true" />
    </view>
    <div class="filter-wrapper">

      <view class="filter-block">
        <!--      <picker :range="typeFilterRange" class="type-filter" @change="onChangeType">{{typeFilterRange[typeFilterValue]}}
      </picker> -->
        <view class="type-filter-block">
          <view class="type-filter-item" :class="{['type-filter-item-selected']:index===typeFilterValue}"
            v-for="(type,index) in typeFilterRange" @tap="onChangeType(index)">
            {{type}}
          </view>
        </view>
      </view>
    </div>
    <div class="contest-db">
      <unicloud-db class="cdb" ref="contestDB" v-slot:default="{data, pagination, loading, error, options}"
        :options="options" collection="contest" orderby="startTime desc,contestName asc" :getone="false"
        :action="action" :where="where" @load="onqueryload" @error="onqueryerror">
        <view v-if="error" class="error">{{error.message}}</view>
        <view v-else class="contest-list">

          <contest-item :contest="contest" v-for="(contest, index) in data" :key="contest._id" class="contest-item"
            :now="options.now" :index="index" />
        </view>
        <view class="loading" v-if="loading">
          <loading />
        </view>
        <view class="contest-empty-list" v-if="data.length===0 && loading===false">😮 这里空空如也</view>
        <!-- <view v-if="loading" class="loading">加载中...</view> -->
      </unicloud-db>
    </div>
  </view>
</template>

<script>
  import contestItem from './components/contestItem.vue'
  import loading from '../../components/loading/loading.vue'
	import topBar from '@/components/topBar/topBar.vue'
  // import uniClientDB from '../../components/uni-clientdb/uni-clientdb.vue'

  import {
    mapState,
    mapMutations
  } from 'vuex'


  export default {
    components: {

      'contest-item': contestItem,
      'loading': loading,
			'top-bar':topBar
    },
    data() {
      return {
        now: new Date().getTime(),
        action: '',
        typeFilterValue: 0,
        typeFilterRange: ['热门', '往期', '寻车','惊艳亮相','速度爆发','传奇周末', '多人', '特殊赛', '大奖赛', '通行证', '巅峰', '节日'],
      }
    },
    computed: {

      ...mapState(['server']),
      options() {
        return {
          now: this.now
        }
      },
      where() {
        if (this.typeFilterValue === 0) {

          return `server=='${this.server}' && endTime>=${this.now}`
          // type:/.*/
        } else if (this.typeFilterValue === 1) {
          return `server=='${this.server}' && endTime<${this.now}`
        } else {
          return {
            server: this.server,
            type: this.typeFilterRange[this.typeFilterValue]
          }
        }
      }
    },
    onLoad() {
      // this.contestStatus = 'pending'

    },
    onPullDownRefresh() {

      this.now = new Date().getTime()
      this.$refs.contestDB.loadData({
        //设置false和不设置都会导致bug，真奇怪
        clear: true
      }, () => {
        // console.log(this.$refs.contestDB.dataList);
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom() {
      this.$refs.contestDB.loadMore()
    },
    onShareAppMessage() {

      return {
        'title': '赛事活动，点击查看',
        // imageUrl: 'https://6139-a9cn-wifx6-1301013383.tcb.qcloud.la/share1.jpg'
      }
    },

    firstTapTab: false,
    onHide() {
      this.firstTapTab = true
    },
    onTabItemTap() {
      if (this.firstTapTab) {
        this.firstTapTab = false
      } else {
        uni.pageScrollTo({
          scrollTop: 0
        })
      }
    },
    methods: {
      onChangeType(index) {
        this.typeFilterValue = index
      },
      onqueryload() {
        uni.hideLoading()
      },
      onqueryerror() {
        uni.hideLoading()
      }
    }
  }
</script>

<style lang="scss">
  .top-bar{
    
    border-bottom: 1px solid $divider-color;    
    @media (prefers-color-scheme: dark) {
      border-bottom-color: $divider-color-dark;
    }
  }
  .filter-wrapper {

    background-color: $card-bg-color;

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }

  }

  .filter-block {
    display: flex;

    padding: 0 20rpx;
    box-sizing: border-box;



    @include pad-devices {
      padding: 0 toPadPx(20);
      box-sizing: border-box;
      max-width: 768px;
      margin: 0 auto;
    }
  }



  .type-filter-block {
    // padding: 0 20rpx;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 20%);
    
    // margin: 0 20rpx;
    
    background-color: $card-bg-color;
    
    @include pad-devices {
      margin: 0 toPadPx(20);
    }
    
    
    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }
    
  }



  .type-filter-item {
    
    display: flex;
    justify-content: center;
    
    color: $text-title-color;
    
    padding: 10rpx 0;
    // border: 1rpx solid $divider-color;
    // box-sizing: border-box;
    
    
    font-size: 28rpx;
    line-height: 48rpx;
    
    @include pad-devices {
      font-size: toPadPx(28);
      line-height: toPadPx(48);
      padding: toPadPx(10) 0;
    }
    
    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }

  .type-filter-item-selected {

    font-weight: bold;
    background-color: #41b90a;
    color: #fff;

    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
      background-color: #2d8006;
    }
  }

  .type-filter-item+.type-filter-item {

  }



  @import './contest-list.scss';
</style>
