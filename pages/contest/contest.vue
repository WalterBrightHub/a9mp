<template>
  <view class="container">
    <view class="filter-block">
      <view class="mode-button" @tap="onChangeMode">{{server==='al'?'国服':'国际'}} ⇌</view>
      <picker :range="typeFilterRange" class="type-filter" @change="onChangeType">{{typeFilterRange[typeFilterValue]}}</picker>
    </view>
    <div class="contest-db">
      <uni-clientdb class="cdb" ref="contestDB" v-slot:default="{data, pagination, loading, error, options}" :options="options"
        collection="contest" orderby="startTime desc,contestName asc" :getone="false" :action="action" :where="where"
        @load="onqueryload" @error="onqueryerror">
        <view v-if="error" class="error">{{error.message}}</view>
        <view v-else class="contest-list">

          <contest-item :contest="contest" v-for="(contest, index) in data" :key="contest._id" class="contest-item"
            :now="options.now" :index="index" />
        </view>
        <view class="contest-empty-list" v-if="data.length===0 && loading===false">😮 这里空空如也</view>
        <!-- <view v-if="loading" class="loading">加载中...</view> -->
      </uni-clientdb>
    </div>
  </view>
</template>

<script>
  import contestItem from './components/contestItem.vue'
  import uniClientDB from '../../components/uni-clientdb/uni-clientdb.vue'

  import {
    mapState,
    mapMutations
  } from 'vuex'


  export default {
    components: {

      'uni-clientdb': uniClientDB,
      'contest-item': contestItem
    },
    data() {
      return {
        now: new Date().getTime(),
        action: '',
        typeFilterValue: "0", //注意picker的坑
        typeFilterRange: ['全部', '寻车', '特殊赛', '大奖赛', '通行证', '巅峰', '多人', '节日'],
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
        if (this.typeFilterValue === "0") {

          return {
            server: this.server,
            // type:/.*/
          }
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
      uni.showLoading({
        title: '加载中'
      })
    },
    onPullDownRefresh() {

      // console.log(this.where)
      // console.log(this.typeFilterValue)
      // testClientDB()

      const that = this
      this.now = new Date().getTime()
      this.$refs.contestDB.loadData({
        clear: true
      }, () => {
        // console.log(this.$refs.contestDB.dataList);
        uni.stopPullDownRefresh()
        uni.showToast({
          title: '最新',
          duration: 500,
        })
      })
    },
    onReachBottom() {

      this.$refs.contestDB.loadMore()
    },
    onShareAppMessage() {

      return {
        'title': '你的专属客服！',
        imageUrl: 'https://6139-a9cn-wifx6-1301013383.tcb.qcloud.la/share1.jpg'
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
      onChangeMode() {
        uni.showToast({
          title: '已切换'
        })
        this.toggleServer()
      },
      onChangeType(e) {
        this.typeFilterValue = e.target.value
      },
      onqueryload() {
        uni.hideLoading()
      },
      onqueryerror() {},
    }
  }
</script>

<style lang="scss">
  .filter-block {
    display: flex;
    // background-color: $page-bg-color;

    padding: 20rpx;
    padding-bottom: 0;
    box-sizing: border-box;

    @include pad-devices {
      padding: toPadPx(20);
      padding-bottom: 0;
      box-sizing: border-box;
      max-width: 768px;
      margin: 0 auto;
    }
  }

  .type-filter {
    padding: 0 20rpx;
    font-size: 36rpx;
    // display: flex;
    text-align: center;
    justify-content: center;
    flex: 1;
    margin-left: 20rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 10rpx;
    background-color: $card-bg-color;
    color: $text-title-color;

    @include pad-devices {
      font-size: toPadPx(36);
      padding: 0 toPadPx(20);
      height: toPadPx(72);
      margin-left: toPadPx(20);
      line-height: toPadPx(72);
      border-radius: toPadPx(10);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
      color: $text-title-color-dark;
    }
  }

  .mode-button {
    padding: 0 20rpx;
    font-size: 36rpx;
    display: flex;
    justify-content: center;
    // flex: 1;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 10rpx;
    background-color: $card-bg-color;
    color: $theme-color;

    @include pad-devices {
      font-size: toPadPx(36);
      padding: 0 toPadPx(20);
      height: toPadPx(72);
      line-height: toPadPx(72);
      border-radius: toPadPx(10);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
      color: $theme-color-dark;
    }
  }

  .contest-db {
    max-width: 768px;
    margin: 0 auto;
    padding: 20rpx 20rpx 30rpx 20rpx;
    box-sizing: border-box;

    @include pad-devices {
      padding: toPadPx(20) toPadPx(20) toPadPx(30) toPadPx(20);
    }
  }

  .contest-list {
    background-color: $card-bg-color;
    border-radius: 10rpx;
    font-size: 28rpx;

    @include pad-devices {
      border-radius: toPadPx(10);
      font-size: toPadPx(28);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }
  }

  .contest-empty-list {
    margin-top: 20rpx;
    color: $text-help-color;
    display: flex;
    justify-content: center;

    @include pad-devices {
      margin-top: toPadPx(20);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-help-color-dark;
    }
  }

  .contest-list+.contest-list {
    margin-top: 20rpx;

    @include pad-devices {
      margin-top: toPadPx(20);
    }
  }

  .loading,
  .error {
    margin-top: 10rpx;
    color: $text-help-color;
    display: flex;
    justify-content: center;

    @include pad-devices {
      margin-top: toPadPx(10);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-help-color-dark
    }
  }
</style>
