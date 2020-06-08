<template>
  <view class="car-card">
    <view class="full-name">{{carData.fullName}}</view>
    <view class="stars-and-rank">
      <view class="stars">
        <image class="star-icon" v-for="item in starArray" :key="item" src="../../../static/carcard-icons/star.png" />
      </view>
      <view class="nick-name">{{carData.nickName}}</view>
      <view class="rank">{{carData.rank}}</view>
    </view>
    <view class="bps">
      <view class="bp" v-for="item in starArray" :key="item" :style="{flex:item}">{{item}}</view>
    </view>
    <view class="perf-and-update">
      <view class="perf">
        <view class="perf-item">
          <view class="perf-name">最大速度</view>
          <view class="perf-value">{{carData.topSpeed}}</view>
        </view>
        <view class="perf-bar" :style="{width:topSpeedWidth(carData.topSpeed)+'%'}" />

        <view class="perf-item">
          <view class="perf-name">加速</view>
          <view class="perf-value">{{carData.acceleration}}</view>
        </view>
        <view class="perf-bar" :style="{width:(carData.acceleration)+'%'}" />

        <view class="perf-item">
          <view class="perf-name">操控</view>
          <view class="perf-value">{{carData.handling}}</view>
        </view>
        <view class="perf-bar" :style="{width:handlingWidth(carData.handling)+'%'}" />

        <view class="perf-item">
          <view class="perf-name">氮气</view>
          <view class="perf-value">{{carData.nitro}}</view>
        </view>
        <view class="perf-bar" :style="{width:nitroWidth(carData.nitro)+'%'}" />

        <view class="perf-item">
          <view class="perf-name">单喷时间</view>
          <view class="perf-value">{{carData.nitroDuration}}</view>
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
    computed: {
      starArray: function() {

        let {
          star,
          star_1,
          star_2,
          star_3,
          star_4,
          star_5,
          star_6
        } = this.carData
        return [star_1, star_2, star_3, star_4, star_5, star_6].slice(0, star)
      }
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
    /* margin-left: 50px; */
    padding: 32rpx;
    background-color: #fff;
    border-radius: 20rpx;
    color: #606060;
    /* min-width: 280px; */
  }


  .full-name {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
    color: #303030;
  }

  .stars-and-rank {
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
    justify-content: space-between;
  }




  .star-icon {
    /* display: inline-block; */
    width: 32rpx;
    height: 32rpx;
  }

  .star-icon+.star-icon {
    margin-left: 8rpx;
  }

  .nick-name {
    color: #909090;
    font-size: 28rpx;
  }

  .rank {
    /* margin-left: auto; */
    font-size: 30rpx;
    border-radius: 6rpx;
    padding: 2rpx 6rpx;
    border: 1.5px solid #ffc107;
    color: #ffc107;
    /* border-color: #ff3176;
  color: #ff3175; */
    font-weight: bold;
  }

  .bps {
    display: flex;
    margin-bottom: 10rpx;
  }

  .bp {
    color: #fff;
    background-color: #303030;
    text-align: center;
    border-radius: 6rpx;
    font-size: 24rpx;
    /* min-width: 24px; */
    padding: 8rpx 14rpx;

    /* color: #606060; */
    background-color: #23bbfa;
  }

  .bp+.bp {
    margin-left: 10rpx;
  }

  .perf-and-update {
    display: flex;
    font-size: 24rpx;
  }

  .perf {
    flex: 1;
    margin-right: 2%;
    /* background-color: green; */
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
    border-radius: 4rpx;
    margin-bottom: 18rpx;
  }

  .perf-item+.perf-bar {
    margin-top: 6rpx;
  }

  .update {
    flex: 1;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
    /* background-color: red; */
  }

  .cost-list {
    display: flex;
    flex-direction: column;
  }

  .cost-item {
    display: flex;
    /* margin-bottom: 12px; */
  }

  .cost-item+.cost-item {
    margin-top: 24rpx;
  }

  .cost-value {
    margin-left: auto;
  }

  .part-list {
    margin-top: auto;
    display: static;
    /* margin-bottom: 5px; */
    /* display: flex; */
    /* flex-wrap: wrap; */
  }

  .part-item {
    /* height: 10px; */
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
  }

  .part-item+.part-item {
    margin-top: 12rpx;
  }

  .part-num {
    font-size: 24rpx;
    margin-left: 12rpx;
    width: 28rpx;
  }


  .part-icon {
    width: 24rpx;
    height: 24rpx;
    margin-left: auto;
    /* position: absolute; */
    /* left: 0; */
    /* bottom: 0; */
    /* display: block; */

    /* display: block; */
  }

  .part-icon+.part-icon {
    margin-left: 4rpx;
  }
</style>
