<template>
  <view class="container">
    <request-fail v-if="carListStatus==='reject'" @onRetry='onRetry' />
    <context v-else-if="carListStatus==='resolve'" @resetLimit="resetLimit" id="context" :server="server"
      @onToggleServer="onToggleServer" :carList="computedCarList" :limit="limit" :brandRange="brandRange"
      :releaseVersionRange="releaseVersionRange" />

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  import requestFail from '../../components/requestFail/requestFail.vue'
  import context from './context.vue'
  import {
    compareVersion
  } from './util.js'
  import _ from 'lodash'

  const {
    myCloud
  } = getApp().globalData


  const requestCarList = async function() {
    return myCloud.callFunction({
      name: 'getMultiFullTable',
      data: {
        tableNames: ['carList', 'carListAL']
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
        carListStatus: 'ready',

        limit: 20,
        carListBoth: {
          gl: [],
          al: []
        }
      }
    },
    computed: {
      ...mapState(['server']),
      carList() {
        return this.carListBoth[this.server]
      },
      computedCarList() {
        return this.carList.map(car => {
          let {
            star,
            star_1,
            star_2,
            star_3,
            star_4,
            star_5,
            star_6,
            stageCost,
            partCost
          } = car
          return {
            ...car,
            starArray: [star_1, star_2, star_3, star_4, star_5, star_6].slice(0, star),
            totalCost: stageCost + partCost
          }

        })
      },
      brandRange() {
        return _(this.carList)
          .filter(car => car.brand && car.brand !== '')
          .countBy(car => car.brand)
          .map((count, brand) => ({
            count,
            brand
          }))
          .orderBy(['count', 'brand'], ['desc', 'asc'])
          .map(obj => obj.brand)
          .value()
      },
      releaseVersionRange() {
        return _(this.carList)
          .filter(car => car.releaseVersion && car.releaseVersion !== '')
          .map(car => car.releaseVersion)
          .union()
          // .map(obj => obj.brand)
          .value()
          .sort(compareVersion)
      }
    },
    onReachBottom() {
      // if(this.limit<this.carList.)
      this.limit += 20
    },
    onLoad() {


      this.carListStatus = 'pending'
      uni.showLoading({
        title: '加载中',
      })

      requestCarList()
        .then(res => {
          // return Promise.reject()
          let [resultGL, resultAL] = res.result
          this.carListBoth = {
            gl: resultGL.data,
            al: resultAL.data
          }
          // this.carList = res.result.data
          this.carListStatus = 'resolve'
        }).catch(e => {
          console.log(e)
          this.carListStatus = 'reject'
        }).finally(() => {
          uni.hideLoading()
        })


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
          let [resultGL, resultAL] = res.result
          this.carListBoth = {
            gl: resultGL.data,
            al: resultAL.data
          }
          this.carListStatus = 'resolve'
          this.limit = 20
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
      onToggleServer() {
        uni.showToast({
          title: '已切换'
        })
        this.toggleServer()
        this.resetLimit()
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 0
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
            let [resultGL, resultAL] = res.result
            this.carListBoth = {
              gl: resultGL.data,
              al: resultAL.data
            }
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
      },
      resetLimit() {
        /*
        下拉的时候重置；切换filter的时候重置
        */
        this.limit = 20
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
