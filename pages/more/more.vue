<template>
  <view class="container">
	  
	  	<top-bar :showServerToggle="true" />
    <div class="context">

      
      <view class="context-item help-and-service">
        
          <view class="card-title">帮助与反馈</view>
          
          <view class="card-flex">
            
            <view class="card-item-block">
              <view class="card-item-title">关于小程序</view>
              <view class="card-item-tip">版本 1.7</view>
            </view>
            <view class="divider"></view>
            <!-- #ifdef MP-WEIXIN -->
            <view class="card-item-block">
              <view class="card-item-title">联系客服</view>
              <button open-type="contact" class="card-item-tip">唤醒客服</button>
            </view>
            <view class="divider"></view>
            <!-- #endif -->
            <view class="card-item-block">
              <view class="card-item-title">意见反馈</view>
              <button open-type="feedback" class="card-item-tip">填写反馈</button>
            </view>
            <view class="divider"></view>
            <view class="card-item-block" @tap="copyGroupNumber">
              <view class="card-item-title">加入交流群</view>
              <view class="card-item-tip">点击复制QQ群号 {{groupNumber}}</view>
            </view>
            
            
          </view>
      </view>
      
      
      
    </div>
  </view>
</template>

<script>
	
	import topBar from '@/components/topBar/topBar.vue'
  export default {
	  components:{
		  'top-bar':topBar
	  },
    data() {
      return {
        groupNumber:'1041602955'
      }
    },
    methods: {
      copyGroupNumber(){
        uni.setClipboardData({
          data:this.groupNumber,
          complete() {
            uni.showToast({
              title:'复制成功',
              duration:500,
              icon:'success'
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .container {

    max-width: 768px;
    width: 100%;
    margin: 0 auto;
  }

  .context {
    padding: 20rpx 20rpx 30rpx 20rpx;
  }
  

  .context-item {
    border-radius: 20rpx;
    background-color: $card-bg-color;    
    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }
  }
  .context-item+.context-item{
    margin-top: 20rpx;
  }

  .card-title {
    padding: 20rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: $theme-color;
  }

  .card-flex {
    // padding-bottom: 20rpx;
  }

  .card-item-block {
    display: flex;
    // align-items: center;
    justify-content: center;
    height: 100rpx;
    align-items: center;
    padding: 0 20rpx;
  }
  
  .divider{
    height:  2rpx;
    background-color: $divider-color;
    @media (prefers-color-scheme: dark) {
      background-color: $divider-color-dark;
    }
  }


  .card-item-title {
    font-weight: bold;
    color:$text-title-color;
    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }

  .card-item-tip {
    color: $text-p-color;
    margin-left: auto;
    margin-right: 0;
    flex:none;
    font-size: 28rpx;
    @media (prefers-color-scheme: dark) {
      color: $text-p-color-dark;
    }
  }

</style>
