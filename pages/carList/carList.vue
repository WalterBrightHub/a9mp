<template>
  <view class="container">
    <request-fail v-if="carListStatus==='reject'" @onRetry='onRetry' />
    <context v-else="carListStatus==='resolve'" id="context" :carList="carList" :brandRange="brandRange" />

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
  export default {
    components: {
      'request-fail': requestFail,
      'context':context
    },
    data() {
      return {
        carListStatus: 'ready',
        carList: [],
        brandRange:["Lamborghini", "Porsche", "Ferrari", "McLaren", "Aston Martin", "Koenigsegg", "W Motors", "Chevrolet", "Dodge", "Nissan", "Ford", "BMW", "Lotus", "Mercedes-Benz"]
      }
    },
    onLoad() {
      this.setCarList()
    },
    onPullDownRefresh() {
      this.setCarList()
    },
    methods: {
      setCarList() {
        this.carListStatus = 'pending'

        uni.showLoading({
          title: '加载中',
        })

        requestCarList()
          .then(res => {
            console.log(res.result.data)
            // return Promise.reject()
            this.carList = res.result.data
            this.carListStatus = 'resolve'
          }).catch(e => {
            console.log(e)
            this.carListStatus = 'reject'
          }).finally(() => {
            uni.hideLoading({
              complete: (res) => {},
            })
            uni.stopPullDownRefresh()
          })
      },
      onRetry() {
        this.setCarList()
      }
    }
  }
</script>

<style lang="scss">
  .container{
    display: flex;
    flex-direction: column;
  }
</style>
