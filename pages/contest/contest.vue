<template>
  <view class="container">

    <request-fail v-if="contestStatus==='reject'" @onRetry='onRetry' />
    <context v-else-if="contestStatus==='resolve'" :contestPresent='contestPresent' :contestPast='contestPast' :now="now" />
  </view>
</template>

<script>
  import requestFail from '../../components/requestFail/requestFail.vue'
  import context from './context.vue'
  
  const {
    myCloud
  } = getApp().globalData
  const db = myCloud.database();
    const dbCmd = db.command;
    const dbCollectionName = 'events';
  
  
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

<style>

</style>
