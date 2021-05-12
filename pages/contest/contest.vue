<template>
  <view class="container">
    <div class="filter-wrapper">

      <view class="filter-block">
        <view class="mode-button" @tap="toggleServer">{{server==='al'?'国服':'国际'}} ⇌</view>
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
  // import uniClientDB from '../../components/uni-clientdb/uni-clientdb.vue'

  import {
    mapState,
    mapMutations
  } from 'vuex'


  export default {
    components: {

      'contest-item': contestItem,
      'loading': loading
    },
    data() {
      return {
        now: new Date().getTime(),
        action: '',
        typeFilterValue: 0,
        typeFilterRange: ['热门', '往期', '寻车', '多人', '特殊赛', '大奖赛', '通行证', '巅峰', '节日'],
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
      ...mapMutations(['toggleServer']),
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
    font-size: 36rpx;
    display: flex;
    text-align: center;
    // justify-content: center;
    flex: 1;
    margin-left: 30rpx;
    height: 72rpx;
    line-height: 72rpx;
    background-color: $card-bg-color;
    color: $text-title-color;

    overflow-x: auto;
    overflow-y: hidden;

    @include pad-devices {
      font-size: toPadPx(36);
      // padding: 0 toPadPx(20);
      height: toPadPx(72);
      margin-left: toPadPx(30);
      line-height: toPadPx(72);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
      color: $text-title-color-dark;
    }
  }

  .type-filter-block::-webkit-scrollbar {
    height: 0 !important;
  }

  .type-filter-item {
    flex: none;
  }

  .type-filter-item-selected {
    border-bottom: 8rpx solid $theme-color;
    font-weight: bold;
    color: $theme-color;

    @media (prefers-color-scheme: dark) {
      color: $theme-color-dark;
      border-bottom-color: $theme-color-dark;
    }

    @include pad-devices {
      border-bottom-width: toPadPx(8);
    }
  }

  .type-filter-item+.type-filter-item {
    margin-left: 32rpx;

    @include pad-devices {
      margin-left: toPadPx(32);
    }
  }

  .mode-button {
    // padding: 0 20rpx;
    font-size: 36rpx;
    display: flex;
    justify-content: center;
    // flex: 1;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 10rpx;
    // background-color: $page-bg-color;
    color: $theme-color;

    @include pad-devices {
      font-size: toPadPx(36);
      // padding: 0 toPadPx(20);
      height: toPadPx(72);
      line-height: toPadPx(72);
      border-radius: toPadPx(10);
    }

    @media (prefers-color-scheme: dark) {
      // background-color: $page-bg-color-dark;
      color: $theme-color-dark;
    }
  }

  @import './contest-list.scss';
</style>
