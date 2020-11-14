<template>
  <view class="container">
    <view class="mode-changer">
      <view class="mode-button" @tap="onChangeMode">{{server==='al'?'国服':'国际'}} ⇌</view>
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



  // let page = 0
  // const requestContestPresent = async function() {
  //   return wx.cloud.callFunction({
  //     name: 'getContest'
  //   })
  // }
  // const requestContestPast = async function({
  //   page,
  //   limit
  // }) {
  //   return uni.request({
  //     url: 'https://a9cn.walterbright.cc/api/contest',
  //     method: 'GET',
  //     data: {
  //       time: 'past',
  //       page,
  //       limit
  //     } 
  //   })
  // }
  export default {
    components: {

      'uni-clientdb': uniClientDB,
      'contest-item': contestItem
    },
    data() {
      return {
        // contestStatus: 'ready',
        // contestPresent: [],
        // contestPast: [],
        now: new Date().getTime(),
        action: '',
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
        // console.log(this.now)
        return '' //`server=='${this.server}'`
      }
    },
    onLoad() {
      // this.contestStatus = 'pending'
      uni.showLoading({
        title: '加载中'
      })
      // requestContestPresent()
      //   .then((res) => {
      //     const {
      //       contest
      //     } = res.result
      //     this.contestStatus = 'resolve'
      //     this.contestPresent = contest
      //   }).catch(e => {
      //     console.log(e)
      //     this.contestStatus = 'reject'
      //   }).finally(() => {
      //     uni.hideLoading()
      //   })
      // this.setContestPast()
    },
    onPullDownRefresh() {

      // testClientDB()

      this.now = new Date().getTime()
      this.$refs.contestDB.loadData({
        // clear: true
      }, () => {
        uni.stopPullDownRefresh()
        uni.showToast({
          title: '最新',
          duration: 500,
        })
      })
      // requestContestPresent()
      //   .then((res) => {
      //     const {
      //       contest
      //     } = res.result
      //     this.contestPresent = contest
      //     this.contestStatus = 'resolve'
      //     uni.showToast({
      //       title: '最新',
      //       duration: 500,
      //     })

      //   }).catch(e => {
      //     console.log(e)
      //     this.contestStatus = 'reject'
      //     uni.showToast({
      //       title: '失败',
      //       icon: 'none',
      //       duration: 500
      //     })
      //   }).finally(() => {
      //     uni.stopPullDownRefresh()
      //   })
      // page = 0
      // this.setContestPast()
    },
    onReachBottom() {

      this.$refs.contestDB.loadMore()
      // requestContestPast({
      //   page,
      //   limit: 20
      // }).then(([error, res]) => {
      //   if (error) {
      //     console.log(error)
      //   } else {
      //     page++
      //     const {
      //       data
      //     } = res
      //     if (data.status === 200) {
      //       // console.log(data.contest)
      //       this.contestPast = this.contestPast.concat(data.contest)
      //     }
      //   }
      // })
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
      // setContestPast() {
      //   requestContestPast({
      //       page,
      //       limit: 20
      //     })
      //     .then(([error, res]) => {
      //       if (error) {
      //         console.log(error)
      //       } else {
      //         page++
      //         const {
      //           data
      //         } = res
      //         if (data.status === 200) {
      //           // console.log(data.contest)
      //           this.contestPast = data.contest
      //         }
      //       }
      //     })
      // },
      // onRetry() {
      //   this.now = new Date().getTime()
      //   uni.showLoading({
      //     title: '重试中'
      //   })
      //   requestContestPresent()
      //     .then((res) => {
      //       const {
      //         contest
      //       } = res.result

      //       this.contestPresent = contest
      //       this.contestStatus = 'resolve'
      //       uni.hideLoading()
      //     }).catch(e => {
      //       console.log(e)
      //       this.contestStatus = 'reject'
      //       uni.showToast({
      //         title: '失败',
      //         duration: 500,
      //         icon: 'none'
      //       })
      //     })
      //   page = 0
      //   this.setContestPast()
      // },
      onqueryload() {
        uni.hideLoading()
      },
      onqueryerror() {},
    }
  }
</script>

<style lang="scss">
  .mode-changer {
    display: flex;
    // background-color: $page-bg-color;

    padding: 20rpx;
    box-sizing: border-box;

    @include pad-devices {
      padding: toPadPx(20);
      max-width: 768px;
      margin: 0 auto;
    }
  }

  .mode-button {
    padding: 0 20rpx;
    font-size: 36rpx;
    flex: 1;
    display: flex;
    justify-content: center;
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
