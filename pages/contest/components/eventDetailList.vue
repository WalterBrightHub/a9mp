<template>
  <view class="event-detail-list">

    <view class="event-detail" v-if="!isPreRelease&&startTime">
      <image class="event-detail-icon" src="../../../static/contest-icons/time.png"></image>
      <text class="event-detail-content time-detail" :style="cardBackgroundStyle">{{selectDays(startTime,endTime)}}</text>
    </view>



    <view class="event-detail" v-if="mapName">
      <image class="event-detail-icon" src="../../../static/contest-icons/map.png"></image>
      <text class="event-detail-content">{{mapName}}</text>
    </view>
    <view class="event-detail" v-if="rewords && rewords.length">

      <image class="event-detail-icon" src="../../../static/contest-icons/gift.png"></image>
      <view class="event-detail-content">
        <view class="reword-item" v-for="reword in rewords" :key="reword._id">
          <text class="reword-text" :class="'reword-'+reword.rewordType">{{reword.rewordName}}</text>
        </view>
      </view>
    </view>
    <!-- <view class="event-detail" v-if="featuredCars && featuredCars.length"> -->

      <!-- <image class="event-detail-icon" src="../../../static/contest-icons/car.png"></image> -->
      <!-- <view class="featured-cars-button" @tap="onQueryFeaturedCars">查看精选车辆</view> -->
    <!-- </view> -->
    <div class="special-evnet-calculator" @click="toSECalculator">赛事计算器</div>
  </view>
</template>

<script>  import {
    mapState,
  } from 'vuex'
  // const oneDay = 1000 * 60 * 60 * 24
  const formatDate = (date, now) => (date.getFullYear() === new Date(now).getFullYear() ? '' :
      `${date.getFullYear()}.`) +
    `${date.getMonth() + 1}.${date.getDate()}`
  export default {
    props: ['startTime', 'endTime', 'now', 'rewords', 'featuredCars', 'mapName','isPreRelease','_id'],
    data() {
      return {

      };
    },
    computed:{
      
      ...mapState(['theme']),
        cardBackgroundStyle(){
          
            const {
              startTime,
              endTime,
              now
            } = this
          if(now>=startTime&&now<=endTime){
            let percent=(now-startTime)*100/(endTime-startTime)
          let [fullColor,emptyColor]=this.theme==='light'?['#b7f0b7','#ecf9ec']:['#005b02','#003001']
          return `background: linear-gradient(to right,${fullColor} ${percent}%,${emptyColor} ${percent}%);`
          }
          else{
            return ''
          }
        },
    },
    methods: {

      selectDays(startTime, endTime) {
        const startDay = formatDate(new Date(startTime), this.now)
        const endDay = formatDate(new Date(endTime), this.now)
        if (startDay === endDay) {
          return startDay
        } else {
          return `${startDay} → ${endDay}`
        }
      },
      onQueryFeaturedCars() {
        const params = this.featuredCars.join(',')
        let pages = getCurrentPages()
        let currentPage = pages[pages.length - 1]
        const url = `/pages/contest/queryFeaturedCars/queryFeaturedCars?carIds=${params}`
        // if ('pages/carList/carArchives/carArchives' === currentPage.route) {
        //   uni.redirectTo({
        //     url
        //   })
        // } else {
          uni.navigateTo({
            url
          })
        // }
      },
      toSECalculator(){
        uni.navigateTo({
          url:`/pages/contest/specialEventCalculator/specialEventCalculator?_id=${this._id}`
        })
      }
    }
  }
</script>

<style lang="scss">
  .event-detail-list {
    padding-top: 4rpx;

    @include pad-devices {
      padding-top: toPadPx(4);
    }
  }

  .event-detail {
    font-size: 26rpx;
    display: flex;
    color: $text-p-color;
    /* align-items: center; */
    margin-top: 8rpx;

    @include pad-devices {
      font-size: toPadPx(26);
      margin-top: toPadPx(8);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-p-color-dark;
    }
  }
  
  .time-detail{
    flex:1;
    display: flex;
    align-items: center;
    height: 36rpx;
    border-radius: 1145px;
    padding: 0 16rpx;
    // border: 1rpx solid #d5f1da;
    @media (prefers-color-scheme: dark) {
      // border-color: $text-help-color-dark;
    }
    @include pad-devices {
      padding:0 toPadPx(16);
      height: toPadPx(36);
      // border-width: toPadPx(1);
    }
  }

  .event-detail+.event-detail {
    margin-top: 12rpx;

    @include pad-devices {
      margin-top: toPadPx(12);
    }
  }

  .event-detail-icon {
    width: 36rpx;
    height: 36rpx;
    flex-shrink: 0;

    filter: invert(30%);

    /*禁止压缩*/
    @include pad-devices {
      width: toPadPx(36);
      height: toPadPx(36);
    }

    @media (prefers-color-scheme: dark) {
      filter: invert(60%);
    }
  }

  .event-detail-content {
    margin-left: 8rpx;
    display: flex;
    line-height: 36rpx;

    flex-wrap: wrap;

    /*允许折行*/
    @include pad-devices {
      margin-left: toPadPx(8);
      line-height: toPadPx(36);
    }
  }

  .reword-item {
    display: flex;
    margin-right: 18rpx;

    @include pad-devices {
      margin-right: toPadPx(18);
    }
  }

  .featured-cars-button {
    font-size: 28rpx;
    color: #22a3df;
    // background-color: #d9f1f5;
    background-color: $page-bg-color;
    border-radius: 5rpx;
    padding: 10rpx 20rpx;

    @media (prefers-color-scheme: dark) {
      background-color: $text-tip-color-dark;
    }

    @include pad-devices {
      font-size: toPadPx(28);
      border-radius: toPadPx(5);
      padding: toPadPx(10) toPadPx(20);
    }
  }

  @import './rewordStyle.scss';
</style>
