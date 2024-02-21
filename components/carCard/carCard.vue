<template>
  <view class="car-card" @tap="jumpToArchives" v-if="carData">
    <view class="full-name">{{carData.fullName}}</view>
    <view class="stars-and-rank">
      <view class="stars">
        <image class="star-icon" v-for="(item,index) in carData.star" :key="index"
          src="@/static/carcard-icons/star.png" />
      </view>
      <view class="nick-name">{{carData.nickName}}</view>
      <view class="rank-over" v-if="carData.overRank">{{carData.overRank}}</view>
      <view class="rank">{{carData.rank}}</view>
      <view class="car-class">{{carData.carClass}}</view>
    </view>
    <view class="bps">
      <view :class="carData.quality?'bp-'+carData.quality:''" class="bp" v-for="(item,index) in starArray" :key="index"
        :style="{flex:item>0?item:20}">{{item}}</view>
      <view class="bp bp-total">{{totalBP}}</view>
    </view>

    <view class="perf-and-update">
      <view class="perf">
        <view class="perf-item">
          <view class="perf-name">最大速度</view>
          <view class="perf-value perf-value-over" v-if="carData.overTopSpeed">{{ carData.overTopSpeed.toFixed(1)}}</view>
          <view class="perf-value">{{ carData.topSpeed.toFixed(1)}}</view>
        </view>
        <view class="perf-bar" :style="{width:topSpeedWidth(carData.topSpeed?carData.topSpeed:0)+'%'}" />

        <view class="perf-item">
          <view class="perf-name">加速</view>
          <view class="perf-value perf-value-over" v-if="carData.overAcceleration">{{ carData.overAcceleration.toFixed(2)}}</view>
          <view class="perf-value">{{carData.acceleration.toFixed(2)}}</view>
        </view>
        <view class="perf-bar" :style="{width:accelerationWidth(carData.acceleration)+'%'}" />

        <view class="perf-item">
          <view class="perf-name">操控</view>
          <view class="perf-value perf-value-over" v-if="carData.overHandling">{{ carData.overHandling.toFixed(2)}}</view>
          <view class="perf-value">{{carData.handling.toFixed(2)}}</view>
        </view>
        <view class="perf-bar" :style="{width:handlingWidth(carData.handling)+'%'}" />

        <view class="perf-item">
          <view class="perf-name">氮气</view>
          <view class="perf-value perf-value-over" v-if="carData.overNitro">{{ carData.overNitro.toFixed(2)}}</view>
          <view class="perf-value">{{carData.nitro.toFixed(2)}}</view>
        </view>
        <view class="perf-bar" :style="{width:nitroWidth(carData.nitro)+'%'}" />

        <!--        <view class="perf-item">
          <view class="perf-name">单喷时间</view>
          <view class="perf-value" v-if="carData.nitroDuration>0">{{Number(carData.nitroDuration).toFixed(2)}}</view>
          <view class="perf-value" v-else>机密</view>
        </view> -->
      </view>
      <view class="update" v-if="carData.releaseVersion!=='0.0'">

        <view class="cost-item">
          <view class="cost-name">氮速空速</view>
          <view class="cost-value nitro-speed-list">
            <view class="nitro-speed-item">{{carData.nitroSpeed || '未知'}}</view>
            <view v-if="carData.blueSpeed>0" class="nitro-speed-item blue-speed">{{carData.blueSpeed}}</view>
            <view class="nitro-speed-item">{{carData.airSpeed || '未知'}}</view>

          </view>
        </view>
        <view class="perf-empty-bar"></view>

        <!-- <view class="cost-item">
          <view class="cost-name">图纸总数</view>
          <view class="cost-value">
            {{totalBP}}
          </view>
        </view>
        <view class="perf-empty-bar"></view> -->

        <view class="cost-item">
          <view class="cost-name">改装费用</view>
          <view class="cost-value">
            {{carData.totalCost>0?split3(carData.totalCost):'未知'}}

          </view>
        </view>
        <view class="perf-empty-bar"></view>



        <view class="part-list">
          <view class="part-title">进口零件</view>
          <view class="part-item" v-if="carData.uncommonPart">
            <!-- <image class="part-icon" src="@/static/carcard-icons/part-uncommon.png"></image> -->
            <view class="part-num uncommon-part-num">{{carData.uncommonPart}}</view>
          </view>
          <view class="part-item" v-if="carData.rarePart">
            <!-- <image class="part-icon" src="@/static/carcard-icons/part-rare.png"></image> -->
            <view class="part-num rare-part-num">{{carData.rarePart}}</view>
          </view>
          <view class="part-item" v-if="carData.epicPart">
            <!-- <image class="part-icon" src="@/static/carcard-icons/part-epic.png"></image> -->
            <view class="part-num epic-part-num">{{carData.epicPart}}</view>
          </view>
          <view class="part-item" v-if="!carData.uncommonPart&&!carData.rarePart&&!carData.epicPart">未知</view>
        </view>
        <view class="perf-empty-bar"></view>

        <view class="cost-item">
          <view class="cost-name">单喷时间</view>
          <view class="cost-value" v-if="carData.nitroDuration>0">{{Number(carData.nitroDuration).toFixed(2)}}</view>
          <view class="cost-value" v-else>未知</view>



        </view>
      </view>
      <view class="update feature-tip-block" v-else>
        <div class="feature-tip">尚未发布</div>
        <div class="feature-tip">仅供参考</div>
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
      starArray() {
        if (!this.carData) {
          return []
        }
        let {
          star,
          star_1,
          star_2,
          star_3,
          star_4,
          star_5,
          star_6,
        } = this.carData
        return [star_1, star_2, star_3, star_4, star_5, star_6].slice(0, star)
      },
      totalBP() {
        if (!this.carData) {
          return 0
        }
        let hasUnknowBP = this.starArray.reduce((res, curr) => res || curr === '?' || curr === '？', false)
        if (hasUnknowBP) {
          return '?'
        } else {

          return this.starArray.reduce((res, curr) => res + (Number(curr) || 0), 0)
        }
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
      },
      jumpToArchives() {
        if (this.carData.releaseVersion === '0.0') {
          uni.showToast({
            title: '尚未发布',
            duration: 500,
            icon: 'none'
          })
        } else {
          const {
            car_id,
            fullName
          } = this.carData
          const url = `/pages/carList/carArchives/carArchives?car_id=${car_id}&fullName=${fullName}`

          let pages = getCurrentPages()
          let currentPage = pages[pages.length - 1]
          // console.log(currentPage.route)
          if ('pages/carList/carArchives/carArchives' === currentPage.route) {
            //又回到最初的起点？
          } else {
            uni.navigateTo({
              url
            })
          }
        }

      }
    }
  }
</script>

<style lang="scss">
  .car-card {
    padding: 20rpx;
    padding-bottom: 25rpx;
    background-color: #fff;
    background-color: var(--card-bg-color);

    // background: linear-gradient(to right, #fffdec, #fffbcf);
    border-radius: 10rpx;
    color: $text-p-color;

    @include pad-devices {
      padding: toPadPx(20);
      padding-bottom: toPadPx(25);
      border-radius: toPadPx(10);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-p-color-dark;
      // background-color: $card-bg-color-dark;
    }
  }


  .full-name {
    font-size: 38rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
    color: $text-title-color;

    @include pad-devices {
      font-size: toPadPx(38);
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
    // justify-content: space-between;

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
    margin: 0 auto;

    @include pad-devices {
      font-size: toPadPx(28);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-help-color-dark;
    }
  }

  .car-class {
    color: $text-p-color;
    font-size: 30rpx;
    font-weight: bold;
    padding: 2rpx 6rpx;
    margin-left: 10rpx;

    @include pad-devices {
      padding: toPadPx(2) toPadPx(6);
      margin-left: toPadPx(10);
      font-size: toPadPx(30);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-p-color-dark;
    }
  }

  .rank ,.rank-over{
    font-size: 30rpx;
    border-radius: 8rpx;
    margin-left: 10rpx;
    color: #ffc107;
    font-weight: bold;

    @include pad-devices {
      font-size: toPadPx(30);
      border-radius: toPadPx(8);
      margin-left: toPadPx(10);
    }
  }

  .bps {
    display: flex;
    margin-bottom: 18rpx;

    @include pad-devices {
      margin-bottom: toPadPx(18);
    }
  }

  .bp {
    color: #fff;
    background-color: #303030;
    text-align: center;
    border-radius: 6rpx;
    font-size: 30rpx;
    padding: 4rpx 14rpx;

    // background-color: #23bbfa;

    background: linear-gradient(to right, #54cdff, #23bbfa);

    @include pad-devices {
      border-radius: toPadPx(6);
      font-size: toPadPx(30);
      padding: toPadPx(4) toPadPx(14);
    }

    @media (prefers-color-scheme: dark) {
      color: $card-bg-color-dark;
    }
  }

  .bp-rare {
    background: linear-gradient(to right, #d667f1, #cc52ea);
  }

  .bp-epic {
    background: linear-gradient(to right, #fed016, #ffc107);
  }

  .bp-ruby {
    background: linear-gradient(to right, var(--color-ruby-lighter), var(--color-ruby));
  }

  .bp+.bp {
    margin-left: 10rpx;

    @include pad-devices {
      margin-left: toPadPx(10);
    }
  }

  .bp-total {
    color: #23bbfa;
    background: none;
    border: 1px solid #23bbfa;
  }

  .bp-rare+.bp-total {
    color: #cc52ea;
    border-color: #cc52ea;
  }

  .bp-epic+.bp-total {
    color: #ffc107;
    border-color: #ffc107;
  }

  .bp-ruby+.bp-total {
    color: var(--color-ruby);
    border-color: var(--color-ruby);
  }

  .perf-and-update {
    display: flex;
    font-size: 28rpx;

    @include pad-devices {
      font-size: toPadPx(28);
    }


  }

  // .info-grid-wrapper {
  //   display: grid;
  //   grid-template-columns: 1fr 1fr;
  //   grid-row-gap: 18rpx;
  //   grid-column-gap: 18rpx;
  //   // grid-auto-flow: column;
  // }

  // .info-item {
  //   // padding-bottom: ;
  // }

  .perf {
    flex: 1;
    margin-right: 2%;
  }

  .perf-item {
    display: flex;
    height: 40rpx;
    line-height: 40rpx;

    @include pad-devices {
      height: toPadPx(40);
      line-height: toPadPx(40);
    }
  }
  
  // e6401c

  .perf-name {
    margin-right: auto;
  }
  
  .perf-value-over+.perf-value{
    margin-left: 6rpx;
     @include pad-devices {
      margin-left: toPadPx(6);
      // margin-bottom: toPadPx(18);
    }
  }
  
  .perf-over,.rank-over{
    color:#e6401c;
  }
  
  .rank-over,.perf-value-over{
    // background-color:#e6401c;
    // color:#fff;
     color:#e6401c;
    background-color:rgba(#e6401c,0.1);
    border-radius: 8rpx;
    text-align: center;
    padding: 0 0.5ch;
     @include pad-devices {
      border-radius: toPadPx(8);
      // margin-bottom: toPadPx(18);
    }
    @media (prefers-color-scheme: dark) {
    background-color:rgba(#fff,0.1);
    }
    
  }
  
  .rank-over{
    font-size: 28rpx;   
     @include pad-devices {
      font-size: toPadPx(28);
      // margin-bottom: toPadPx(18);
    }
    
  }
  
.perf-value-over{  
    font-size: 26rpx;   
     @include pad-devices {
      font-size: toPadPx(26);
      // margin-bottom: toPadPx(18);
    }
    
  }

  .perf-bar {
    height: 12rpx;
    background-color: #05d1dc;
    background: linear-gradient(to right, #0cd6e1, #05d1dc);

    border-radius: 6rpx;
    // margin-bottom: 18rpx;

    @include pad-devices {
      height: toPadPx(12);
      border-radius: toPadPx(6);
      // margin-bottom: toPadPx(18);
    }
  }

  .perf-empty-bar {

    height: 12rpx;
    margin-top: 6rpx;

    @include pad-devices {
      height: toPadPx(12);
      margin-top: toPadPx(6);
      // margin-bottom: toPadPx(18);
    }
  }

  .perf-bar+.perf-item {
    margin-top: 18rpx;

    @include pad-devices {
      margin-top: toPadPx(18);
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
  }

  .feature-tip-block {
    display: flex;
    // flex-direction: column;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .feature-tip {
    color: $text-help-color;
    line-height: 56rpx;

    @media (prefers-color-scheme: dark) {
      color: $text-help-color-dark;
    }

    @include pad-devices {
      line-height: toPadPx(56);
    }
  }



  .cost-item {
    display: flex;
    height: 40rpx;
    line-height: 40rpx;

    @include pad-devices {
      height: toPadPx(40);
      line-height: toPadPx(40);
    }
  }


  .perf-empty-bar+.part-list,
  .perf-empty-bar+.cost-item {
    margin-top: 18rpx;

    @include pad-devices {
      margin-top: toPadPx(18);
    }
  }



  .cost-value {
    margin-left: auto;
  }

  .part-list {
    display: flex;

    @include pad-devices {}

    // justify-content: flex-end;
  }



  .part-title {
    display: flex;
    align-items: center;
    height: 40rpx;
    line-height: 40rpx;

    @include pad-devices {
      height: toPadPx(40);
      line-height: toPadPx(40);
    }
  }

  .part-title+.part-item {
    margin-left: auto;
  }

  .part-item {
    display: flex;
    align-items: center;
  }

  .part-item+.part-item {
    margin-left: 12rpx;

    @include pad-devices {
      margin-left: toPadPx(18);
    }
  }

  .part-num {
    font-size: 28rpx;
    // margin-left: 12rpx;
    width: 40rpx;
    height: 40rpx;
    line-height: 40rpx;
    clip-path: polygon(25% 6.7%, 0% 50%, 25% 93.3%, 75% 93.3%, 100% 50%, 75% 6.7%);
    // vertical-align: center;
    text-align: center;
    z-index: 1;
    color: #fff;

    @media (prefers-color-scheme: dark) {
      color: $card-bg-color-dark;
    }

    // text-shadow: 0 0 20rpx rgba(0,0,0,0.6);

    @include pad-devices {
      font-size: toPadPx(28);
      width: toPadPx(40);
      height: toPadPx(40);
      line-height: toPadPx(40);
    }

    background-color: #63c0ff;
  }

  .rare-part-num {
    background-color: #da6dff;
  }

  .epic-part-num {
    background-color: #ffc107;
  }



  // .part-icon {
  //   width: 40rpx;
  //   height: 40rpx;
  //   // margin-left: auto;
  //   position: absolute;
  //   // z-index: -114514;

  //   @include pad-devices {
  //     width: toPadPx(40);
  //     height: toPadPx(40);
  //   }
  // }
  .nitro-speed-list {
    display: flex;
  }

  .nitro-speed-item+.nitro-speed-item {
    margin-left: 0.5em;
  }

  .blue-speed {
    color: #23bbfa;
  }
</style>