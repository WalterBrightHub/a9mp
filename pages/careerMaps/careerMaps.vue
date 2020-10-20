<template>
  <view class="container">
    <request-fail v-if="careerMapsStatus==='reject'" @onRetry='onRetry' />
    <context v-else-if="careerMapsStatus==='resolve'" :careerMaps='careerMaps' :mode='server' @onChangeMode="onChangeMode" />

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import requestFail from '../../components/requestFail/requestFail.vue'
  import context from './context.vue'
  const {
    myCloud
  } = getApp().globalData
  const requestCareerMaps = async function() {
    return myCloud.callFunction({
      name: 'getCareerMapsAll'
    })
  }
  export default {
    components: {
      'request-fail': requestFail,
      'context': context
    },
    data() {
      return {
        careerMaps: [],
        careerMapsStatus: 'ready',
        // mode: 'gl'
      }
    },
    computed: {

      ...mapState(['server']),
    },
    onLoad() {
      this.careerMapsStatus = 'pending'
      uni.showLoading({
        title: '加载中',
      })

      requestCareerMaps()
        .then(res => {
          // console.log(res.result) // 3
          // return Promise.reject()
          this.careerMaps = res.result,
            this.careerMapsStatus = 'resolve'

        })
        .catch(e => {
          console.error(e)
          this.careerMapsStatus = 'reject'
        })
        .finally(() => {
          uni.hideLoading()
        })

    },
    onShareAppMessage() {

      return {
        'title': '等你很久了！'
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
    onPullDownRefresh() {


      requestCareerMaps()
        .then(res => {
          // console.log(res.result) // 3
          // return Promise.reject()
          this.careerMaps = res.result,
            this.careerMapsStatus = 'resolve'

          uni.showToast({
            title: '最新',
            duration: 500
          })
        })
        .catch(e => {
          console.error(e)
          this.careerMapsStatus = 'reject'
          uni.showToast({
            title: '失败',
            icon: 'none'
          })
        })
        .finally(() => {
          uni.stopPullDownRefresh()
        })
    },
    methods: {

      onRetry() {
        uni.showLoading({
          title: '重试中',
        })

        requestCareerMaps()
          .then(res => {
            // console.log(res.result) // 3
            // return Promise.reject()
            this.careerMaps = res.result,
              this.careerMapsStatus = 'resolve'
            uni.showToast({
              title: '成功'
            })
          })
          .catch(e => {
            console.error(e)
            this.careerMapsStatus = 'reject'
            uni.showToast({
              title: '失败',
              icon: 'none'
            })
          })
      },

      ...mapMutations(['toggleServer']),
      onChangeMode() {
        uni.showToast({
          title: '已切换'
        })
        this.toggleServer()
      }
    }
  }
</script>

<style>

</style>
