<template>
  <view class="container">
    <request-fail v-if="{{carPerfStatus==='reject'}}" @onRetry='onRetry' />
    
  </view>
</template>

<script>
  import requestFail from '../../components/requestFail/requestFail.vue'
  export default {
    components:{
      'request-fail':requestFail
    },
    data() {
      return {
        // zcarPerfStatus:'ready'
      }
    },
    methods: {
      onRetry(){
        uni.showToast({
          title:'重试中'
        })
      }
    }
  }
</script>

<style lang="scss">


  .title {
    font-size: 32rpx;

    @include pad-devices {
      font-size: toPadPx(32);
    }
  }
</style>
