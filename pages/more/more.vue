<template>
  <view class="container">
    <div class="context">

      <view class="context-item custom-car-list-list-block">
        <view class="card-title">个性车单</view>
        <view class="card-flex custom-car-list-grid">
          <view class="custom-car-list-block">
            <view class="card-item-title">品牌</view>
            <view class="card-item-tip custom-car-list-tip">法拉利、保时捷等品牌</view>
          </view>
          <view class="custom-car-list-block">
            <view class="card-item-title">释放版本</view>
            <view class="card-item-tip custom-car-list-tip">版本更新的新车！</view>
          </view>
          <view class="custom-car-list-block">
            <view class="card-item-title">特性</view>
            <view class="card-item-tip custom-car-list-tip">蓝喷、贴纸等特性</view>
          </view>
          <view class="custom-car-list-block">
            <view class="card-item-title">属性</view>
            <view class="card-item-tip custom-car-list-tip">商店金卡等属性</view>
          </view>
          
          
        </view>

      </view>
      
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
  export default {
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
  .custom-car-list-grid{
    display: grid;
    grid-template-columns: repeat(2,50%);
  }
  .custom-car-list-block{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20rpx;
  }
   .custom-car-list-tip{
     margin-left: 0;
     margin-top: 5rpx;
   }
</style>
