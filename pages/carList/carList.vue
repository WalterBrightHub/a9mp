<template>
  <view class="container">
    <request-fail v-if="carListStatus==='reject'" @onRetry='onRetry' />
    <context v-else-if="carListStatus==='resolve'" id="context" :carList="computedCarList" :brandRange="brandRange" />

  </view>
</template>

<script>
  import requestFail from '../../components/requestFail/requestFail.vue'
  import context from './context.vue'
  const requestCarList = async function() {
    return wx.cloud.callFunction({
      name: 'getCarList'
    })
  }

  const requestBrands = async function() {
    return wx.cloud.callFunction({
      name: 'getBrands'
    })
  }
  export default {
    components: {
      'request-fail': requestFail,
      'context': context
    },
    data() {
      return {
        carListStatus: 'ready',
        carList: [],
        brandRange: ["Lamborghini", "Porsche", "Ferrari", "McLaren", "Aston Martin", "Koenigsegg", "W Motors",
          "Chevrolet", "Dodge", "Nissan", "Ford", "BMW", "Lotus", "Mercedes-Benz"
        ]
      }
    },
    computed: {
      computedCarList() {
        return this.carList.map(car => {
          let {
            star,
            star_1,
            star_2,
            star_3,
            star_4,
            star_5,
            star_6
          } = car
          return {
            ...car,
            starArray: [star_1, star_2, star_3, star_4, star_5, star_6].slice(0, star)
          }

        })
      }
    },
    onLoad() {
      this.carListStatus = 'pending'
      uni.showLoading({
        title: '加载中',
      })

      requestCarList()
        .then(res => {
          // console.log(res.result.data)
          // return Promise.reject()
          this.carList = res.result.data
          this.carListStatus = 'resolve'
        }).catch(e => {
          console.log(e)
          this.carListStatus = 'reject'
        }).finally(() => {
          uni.hideLoading()
        })
      this.setBrands()
    },
    onShareAppMessage() {
      return {
        'title': '天赐三菱，不服不行'
      }
    },
    onPullDownRefresh() {
      requestCarList()
        .then(res => {
          // console.log(res.result.data)
          // return Promise.reject()
          this.carList = res.result.data
          this.carListStatus = 'resolve'
          uni.showToast({
            title: '最新',
            duration: 500
          })
        }).catch(e => {
          console.log(e)
          this.carListStatus = 'reject'
          uni.showToast({
            title: '更新失败',
            icon: 'none'
          })
        }).finally(() => {
          uni.stopPullDownRefresh()
        })
      this.setBrands()
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
      setBrands() {
        requestBrands()
          .then(res => {
            this.brandRange = res.result
          })
      },
      onRetry() {
        uni.showLoading({
          title: '重试中',
        })

        requestCarList()
          .then(res => {
            // console.log(res.result.data)
            // return Promise.reject()
            this.carList = res.result.data
            this.carListStatus = 'resolve'
            uni.showToast({
              title: '成功'
            })
          }).catch(e => {
            console.log(e)
            this.carListStatus = 'reject'
            uni.showToast({
              title: '失败',
              icon: 'none'
            })
          })
        this.setBrands()
      }
    }
  }
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
  }
</style>
