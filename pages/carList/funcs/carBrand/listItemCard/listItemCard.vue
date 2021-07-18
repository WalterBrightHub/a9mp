<template>
  <view class="card" :style="cardBackgroundStyle">

    <view class="card-item">{{brandItem.brand}}</view>
    <view class="card-item-right">{{brandItem.count}}</view>
  </view>
</template>

<script>
  export default {
    props:['brandItem','percent','theme'],
    data() {
      return {
        
      };
    },
    
    computed:{
      
        cardBackgroundStyle(){

          let [fullColor,emptyColor]=this.theme==='light'?['#b7f0b7','#fff']:['#005b02','#1e1e1e']
          return `background: linear-gradient(to right,${fullColor} ${this.percent}%,${emptyColor} ${this.percent}%);`

        },
    },
  }
</script>

<style lang="scss">
  .card {
    display: flex;
    padding: 25rpx 20rpx;
    font-size: 30rpx;
    @include pad-devices {
      padding:  toPadPx(25) toPadPx(20);
      font-size: toPadPx(30);
    
    }
  }
  .card-item-right {
    margin-left: auto;
  }
</style>
