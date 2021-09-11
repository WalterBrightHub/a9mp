<template>
  <view class="get-method-list">
    <view class="card" v-for="(getMethodItem,index) in getMethods" :key="index" @tap="onTapGetMethod(getMethodItem)">
      <view class="card-head">
        <view class="version-note">{{getMethodItem.name}}</view>
        
        <view class="version-car-count">小计 {{countGetMethod[getMethodItem.field].length}}</view>
      </view>
      <view class="card-body new-car-wrapper">
        <view class="new-car-card" v-for="newCarItem in countGetMethod[getMethodItem.field]" :key="newCarItem._id">
          <view class="car-class" :class="'car-bp-'+newCarItem.quality">{{newCarItem.carClass}}</view>
          <view class="full-name">{{newCarItem.fullName}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import  {
    getMethods,
    getMethodField
  } from '../getMethodField.js'
  export default {
    props:['data'],
    data() {
      return {
          getMethods,
      };
    },
    computed:{
      countGetMethod() {
        return getMethodField.map(getMethod => ({
            [getMethod]: this.data.filter(car => car[getMethod] === 1)
          }))
          .reduce((res, curr) => ({
            ...res,
            ...curr
          }))
      }
    },
    methods:{
      onTapGetMethod({name,field}){
        uni.navigateTo({
          url:`/pages/carList/funcs/getMethod/carListBySelectedGetMethod?name=${name}&field=${field}`
        })
      }
    }
  }
</script>

<style lang="scss">




  .card {
    // display: flex;
    align-items: center;
    // border-radius: 10rpx;
    padding: 20rpx;
    background-color: $card-bg-color;
    
    @media (prefers-color-scheme: dark) {
    
      background-color: $card-bg-color-dark;
    }
    
    
    @include pad-devices {
      border-radius: toPadPx(10);
      padding:toPadPx(20);
    
    }


  }
  .card+.card{
    margin-top: 20rpx;
    @include  pad-devices{
      margin-top:toPadPx(20);
    }
  }

  .card-head{
    display: flex;
  }.version-car-count{
    
     color: $text-help-color;
     margin-left: 48rpx;
     font-size: 30rpx;
     align-self: flex-end;
     @media (prefers-color-scheme: dark) {
     
       color: $text-help-color-dark;
     }
     @include pad-devices {
       margin-left:toPadPx(48);
       font-size: toPadPx(30);
     
     }
  }
  .version-note{
    font-size: 36rpx;
    
    color:$theme-color;
    font-weight: bold;
    @include pad-devices {
      font-size: toPadPx(36);
    
    }
  }
  .version-car-count{
    
    margin-left: auto;
  }
  .new-car-wrapper{
    margin-top: 30rpx;
     @include pad-devices {
       margin-top:toPadPx(30);
     
     }
  }
  .new-car-card{
    display: flex;
    justify-content:flex-start;
  }
  .car-class{
    background-color: #22a3df;
    color: #fff;
    border-radius: 5rpx;
    width: 36rpx;
    height: 36rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10rpx;
    @media (prefers-color-scheme: dark) {
    
      color: #000;
      
    }
    @include pad-devices {
      // border-radius: toPadPx(10);
      width:toPadPx(36);
      height: toPadPx(36);
      margin-left: toPadPx(10);
      border-radius: toPadPx(5);
    
    }
  }
  .car-bp-epic{
    background-color: #ffc107;
  }
  .car-bp-rare{
    background-color: #cc52ea;
  }
   .new-car-card+.new-car-card{
     margin-top: 24rpx;

     @include pad-devices {
       // border-radius: toPadPx(10);
       margin-top:toPadPx(24);
     
     }
   }
</style>
