<template>
  <view class="container">
    <request-fail v-if="careerMapsStatus==='reject'" @onRetry='onRetry' />
    <context v-else-if="careerMapsStatus==='resolve'" :careerMaps='careerMaps' :mode='mode' @onChangeMode="onChangeMode" />

  </view>
</template>

<script>
  import requestFail from '../../components/requestFail/requestFail.vue'
  import context from './context.vue'
  const requestCareerMaps = async function() {
    return wx.cloud.callFunction({
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
        mode: 'gl'
      }
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
      const key = 'mapMode'
      uni.getStorage({
        key
      }).then(([error, res]) => {
        const defaultMode = 'gl'
        if (error) {
          uni.setStorage({
            key,
            data: defaultMode
          })
          this.mode = defaultMode
        } else {
          const mode = res.data
          if (mode !== 'al' && mode !== 'gl') {
            uni.setStorage({
              key,
              data: defaultMode
            })
            this.mode = defaultMode
          } else {
            this.mode = mode
          }
        }
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
            title: '更新成功',
            duration: 500
          })
        })
        .catch(e => {
          console.error(e)
          this.careerMapsStatus = 'reject'
          uni.showToast({
            title: '更新失败',
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
      onChangeMode() {
        let {
          mode
        } = this
        let newMode = mode === 'al' ? 'gl' : 'al'
        this.mode = newMode
        uni.setStorage({
          key: 'mapMode',
          data: newMode
        })
      }
    }
  }
</script>

<style>

</style>
