<template>
  <view class="container">
    <view class="mode-changer">
      <view class="mode-button" @tap="onChangeMode">{{server==='al'?'国服':'国际'}} ⇌</view>
    </view>

    <request-fail v-if="contestStatus==='reject'" @onRetry='onRetry' />
    <context v-else-if="contestStatus==='resolve'" :contestPresent='contestPresent' :contestPast='contestPast' :now="now" />
  </view>
</template>

<script>
  import requestFail from '../../components/requestFail/requestFail.vue'
  import context from './context.vue'
  
    import {
      mapState,
      mapMutations
    } from 'vuex'
    
  const {
    myCloud
  } = getApp().globalData
  const db = myCloud.database();
    const dbCmd = db.command;
    const dbCollectionName = 'contest';
  
  const testClientDB=()=>{
    db.collection('contest').count().then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
  
  let page = 0
  const requestContestPresent = async function() {
    return wx.cloud.callFunction({
      name: 'getContest'
    })
  }
  const requestContestPast = async function({
    page,
    limit
  }) {
    return uni.request({
      url: 'https://a9cn.walterbright.cc/api/contest',
      method: 'GET',
      data: {
        time: 'past',
        page,
        limit
      }
    })
  }
  export default {
    components: {

      'request-fail': requestFail,
      'context': context
    },
    data() {
      return {
        contestStatus: 'ready',
        contestPresent: [],
        contestPast: [],
        now: new Date().getTime()
      }
    },
    computed:{
      
      ...mapState(['server']),
    },
    onLoad() {
      this.contestStatus = 'pending'
      uni.showLoading({
        title: '加载中'
      })
      requestContestPresent()
        .then((res) => {
          const {
            contest
          } = res.result
          this.contestStatus = 'resolve'
          this.contestPresent = contest
        }).catch(e => {
          console.log(e)
          this.contestStatus = 'reject'
        }).finally(() => {
          uni.hideLoading()
        })
      this.setContestPast()
    },
    onPullDownRefresh() {
      
      testClientDB()

      this.now = new Date().getTime()
      requestContestPresent()
        .then((res) => {
          const {
            contest
          } = res.result
          this.contestPresent = contest
          this.contestStatus = 'resolve'
          uni.showToast({
            title: '最新',
            duration: 500,
          })

        }).catch(e => {
          console.log(e)
          this.contestStatus = 'reject'
          uni.showToast({
            title: '失败',
            icon: 'none',
            duration: 500
          })
        }).finally(() => {
          uni.stopPullDownRefresh()
        })
      page = 0
      this.setContestPast()
    },
    onReachBottom() {
      requestContestPast({
        page,
        limit: 20
      }).then(([error, res]) => {
        if (error) {
          console.log(error)
        } else {
          page++
          const {
            data
          } = res
          if (data.status === 200) {
            // console.log(data.contest)
            this.contestPast = this.contestPast.concat(data.contest)
          }
        }
      })
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
      setContestPast() {
        requestContestPast({
            page,
            limit: 20
          })
          .then(([error, res]) => {
            if (error) {
              console.log(error)
            } else {
              page++
              const {
                data
              } = res
              if (data.status === 200) {
                // console.log(data.contest)
                this.contestPast = data.contest
              }
            }
          })
      },
      onRetry() {
        this.now = new Date().getTime()
        uni.showLoading({
          title: '重试中'
        })
        requestContestPresent()
          .then((res) => {
            const {
              contest
            } = res.result

            this.contestPresent = contest
            this.contestStatus = 'resolve'
            uni.hideLoading()
          }).catch(e => {
            console.log(e)
            this.contestStatus = 'reject'
            uni.showToast({
              title: '失败',
              duration: 500,
              icon: 'none'
            })
          })
        page = 0
        this.setContestPast()
      },
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
</style>
