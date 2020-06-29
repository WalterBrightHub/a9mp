<template>
  <view class="car-card">
    <view class="full-name">{{carData.fullName}}</view>
    <view class="stars-and-rank">
      <view class="stars">
        <image class="star-icon" v-for="(item,index) in carData.starArray"  src="../../../static/carcard-icons/star.png" />
      </view>
      <view class="nick-name">{{carData.nickName}}</view>
      <view class="rank">{{carData.rank}}</view>
    </view>
    <view class="bps">
      <view class="bp" v-for="(item,index) in carData.starArray" :key="index" :style="{flex:item}">{{item}}</view>
    </view>
    <view class="perf-and-update">
      <view class="perf">
        <view class="perf-item">
          <view class="perf-name">最大速度</view>
          <view class="perf-value">{{carData.topSpeed.toFixed(1)}}</view>
        </view>
        <view class="perf-bar" :style="{width:topSpeedWidth(carData.topSpeed)+'%'}" />

        <view class="perf-item">
          <view class="perf-name">加速</view>
          <view class="perf-value">{{carData.acceleration.toFixed(2)}}</view>
        </view>
        <view class="perf-bar" :style="{width:accelerationWidth(carData.acceleration)+'%'}" />

        <view class="perf-item">
          <view class="perf-name">操控</view>
          <view class="perf-value">{{carData.handling.toFixed(2)}}</view>
        </view>
        <view class="perf-bar" :style="{width:handlingWidth(carData.handling)+'%'}" />

        <view class="perf-item">
          <view class="perf-name">氮气</view>
          <view class="perf-value">{{carData.nitro.toFixed(2)}}</view>
        </view>
        <view class="perf-bar" :style="{width:nitroWidth(carData.nitro)+'%'}" />

        <view class="perf-item">
          <view class="perf-name">单喷时间</view>
          <view class="perf-value">{{Number(carData.nitroDuration).toFixed(2)}}</view>
        </view>
      </view>
      <view class="update">
        <view class="cost-list">
          <view class="cost-item">
            <view class="cost-name">升级</view>
            <view class="cost-value">{{split3(carData.stageCost)}}</view>
          </view>
          <view class="cost-item">
            <view class="cost-name">零件</view>
            <view class="cost-value">{{split3(carData.partCost)}}</view>
          </view>
          <view class="cost-item">
            <view class="cost-name">MAX</view>
            <view class="cost-value">{{split3(carData.totalCost)}}</view>
          </view>


        </view>

        <view class="part-list">
          <view class="part-item">
            <image class="part-icon" src="../../../static/carcard-icons/part-uncommon.png"></image>
            <view class="part-num">{{carData.uncommonPart}}</view>
          </view>
          <view class="part-item">
            <image class="part-icon" src="../../../static/carcard-icons/part-rare.png"></image>
            <view class="part-num">{{carData.rarePart}}</view>
          </view>
          <view class="part-item" v-if="carData.epicPart">
            <image class="part-icon" src="../../../static/carcard-icons/part-epic.png"></image>
            <view class="part-num">{{carData.epicPart}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: ['carData'],
    data() {
      return {

      };
    },
    methods: {
      //数值转化为宽度百分比
      topSpeedWidth: function(value) {
        return (value - 200) * 0.32
      },
      accelerationWidth: function(value) {
        return (value - 35) * 1.75
      },
      handlingWidth: function(value) {
        return (value - 20) * 1.13
      },
      nitroWidth: function(value) {
        return (value - 15) * 1.28
      },
      //数值千位符
      split3: function(value) {
        var s = value.toString()
        var res = []
        for (var i = 0; i < s.length; i++) {
          res.push(s[s.length - i - 1])
          if (i < s.length - 1 && (i + 1) % 3 === 0) {
            res.push(',')
          }

        }
        return res.reverse().join('')
      }
    }
  }
</script>

<style lang="scss">
  .car-card {
    padding: 32rpx;
    background-color: #fff;
    border-radius: 20rpx;
    color: $text-p-color;

    @include pad-devices {
      padding: toPadPx(32);
      border-radius: toPadPx(20);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-p-color-dark;
      background-color: $card-bg-color-dark;
    }
  }


  .full-name {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
    color: $text-title-color;

    @include pad-devices {
      font-size: toPadPx(36);
      margin-bottom: toPadPx(10);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }

  .stars-and-rank {
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
    justify-content: space-between;

    @include pad-devices {
      margin-bottom: toPadPx(10);
    }
  }




  .star-icon {
    width: 32rpx;
    height: 32rpx;

    @include pad-devices {
      width: toPadPx(32);
      height: toPadPx(32);
    }
  }

  .star-icon+.star-icon {
    margin-left: 8rpx;

    @include pad-devices {
      margin-left: toPadPx(8);
    }
  }

  .nick-name {
    color: $text-help-color;
    font-size: 28rpx;

    @include pad-devices {
      font-size: toPadPx(28);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-help-color-dark;
    }
  }

  .rank {
    font-size: 30rpx;
    border-radius: 6rpx;
    padding: 2rpx 6rpx;
    // border: 1px solid #ffc107;
    color: #ffc107;
    font-weight: bold;

    @include pad-devices {
      font-size: toPadPx(30);
      border-radius: toPadPx(6);
      padding: toPadPx(2) toPadPx(6);
      // border: toPadPx(3) solid #ffc107;
    }
  }

  .bps {
    display: flex;
    margin-bottom: 10rpx;

    @include pad-devices {
      margin-bottom: toPadPx(10);
    }
  }

  .bp {
    color: #fff;
    background-color: #303030;
    text-align: center;
    border-radius: 6rpx;
    font-size: 24rpx;
    padding: 8rpx 14rpx;

    background-color: #23bbfa;

    @include pad-devices {
      border-radius: toPadPx(6);
      font-size: toPadPx(24);
      padding: toPadPx(8) toPadPx(14);
    }
  }

  .bp+.bp {
    margin-left: 10rpx;

    @include pad-devices {
      margin-left: toPadPx(10);
    }
  }

  .perf-and-update {
    display: flex;
    font-size: 24rpx;

    @include pad-devices {
      font-size: toPadPx(24);
    }


  }

  .perf {
    flex: 1;
    margin-right: 2%;
  }

  .perf-item {
    display: flex;
  }

  .perf-value {
    margin-left: auto;
  }

  .perf-bar {
    height: 10rpx;
    background-color: #05d1dc;
    border-radius: 6rpx;
    margin-bottom: 18rpx;

    @include pad-devices {
      height: toPadPx(10);
      border-radius: toPadPx(6);
      margin-bottom: toPadPx(18);
    }
  }

  .perf-item+.perf-bar {
    margin-top: 6rpx;

    @include pad-devices {
      margin-top: toPadPx(6);
    }
  }

  .update {
    flex: 1;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
  }

  .cost-list {
    display: flex;
    flex-direction: column;
  }

  .cost-item {
    display: flex;
  }

  .cost-item+.cost-item {
    margin-top: 24rpx;

    @include pad-devices {
      margin-top: toPadPx(24);
    }
  }

  .cost-value {
    margin-left: auto;
  }

  .part-list {
    margin-top: auto;
    display: static;
  }

  .part-item {
    display: flex;
    align-items: center;
  }

  .part-item+.part-item {
    margin-top: 12rpx;

    @include pad-devices {
      margin-top: toPadPx(12);
    }
  }

  .part-num {
    font-size: 24rpx;
    margin-left: 12rpx;
    width: 28rpx;

    @include pad-devices {
      font-size: toPadPx(24);
      margin-left: toPadPx(12);
      width: toPadPx(28);
    }
  }


  .part-icon {
    width: 24rpx;
    height: 24rpx;
    margin-left: auto;

    @include pad-devices {
      width: toPadPx(24);
      height: toPadPx(24);
    }
  }

  .part-icon+.part-icon {
    margin-left: 4rpx;

    @include pad-devices {
      margin-left: toPadPx(4);
    }
  }
</style>
