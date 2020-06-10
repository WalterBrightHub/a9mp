<template>
  <view class="context">
    <view class="filter-block">
      <filter :sort="sort" :filter="filter" class="filter" :brandRange="brandRange"  @onChangeSort="onChangeSort" @onChangeFilter="onChangeFilter" />
      <view class="placeholder"></view>
    </view>
    
    <view class="car-card-list">
      <view   v-for="item in selectedCars" :key="item._id" class="car-card" >
        <car-card :carData="item"></car-card>
      </view>
    </view>
  </view>
</template>

<script>
  import filter from './components/filter.vue'
  import carCard from './components/carCard.vue'
  const select = {
    'carClass': (carList, carClass) => {
      return carList.filter(car=>car.carClass===carClass)
        .sort((a,b)=>a.rank-b.rank)
    },
    'carClassAL': (carList, carClassAL) => {
      return carList.filter(car=>car.carClassAL===carClassAL)
        .sort((a,b)=>a.rank-b.rank)

    },
    'rank': (carList, rank) => {
      return carList.sort((a,b)=>a.rank-b.rank)

    },
    'brand': (carList, brand) => {
      return carList.filter(car=>car.brand===brand)
        .sort((a,b)=>a.rank-b.rank)

    }
  }
  const defaultFilter={
    'carClass':'D',
    'carClassAL':'D',
    'rank':0,
    'brand':'Lamborghini'
  }
  export default {
    components:{
      'filter':filter,
      'car-card':carCard
    },
    props: ['carList','brandRange'],
    data() {
      return {
        sort: 'carClass',
        filter: 'D',
      };
    },
    computed: {
      selectedCars:function() {
        return select[this.sort](this.carList, this.filter)
      },
    },
    methods:{
      onChangeSort:function(sort){
        if(sort!==this.sort){
          
        this.sort=sort
        this.filter=defaultFilter[sort]
        }
      },
      onChangeFilter:function(filter){
        this.filter=filter
      }
    }
  }
</script>

<style lang="scss">
.context{
  // margin: 0 10rpx 0 10rpx;
  
}
.filter-block{
}
.placeholder{
  height: 112rpx;
  @include pad-devices{
    height: toPadPx(112);
  }
}
.filter{
  display: flex;
  position: fixed;
  z-index: 114514;
  width: 100%;
  background-color: $page-bg-color;
  
  @media (prefers-color-scheme: dark){
    background-color: $page-bg-color-dark;
  }
  padding: 20rpx;
  box-sizing: border-box;
  @include pad-devices {
    padding: toPadPx(20);
  }
}
.car-card-list{
  padding: 0 20rpx;
  padding-bottom: 40rpx;
  @include pad-devices {
    padding: toPadPx(20);
    padding-bottom: toPadPx(40);
  }
  margin: 0 auto;
  max-width: 768px;
  // background-color: $page-bg-color;
  // @media (prefers-color-scheme: dark){
  //   background-color: $page-bg-color-dark;
  // }
}
.car-card+.car-card{
  margin-top: 20rpx;
  @include pad-devices {
    margin-top: toPadPx(20);
  }
}
@media (min-width:750px) {
  .car-card-list {
      display: flex;
      flex-wrap: wrap;
      // padding: 20px;
      /* justify-content: center; */
    }
  
    .car-card {
      flex: 1 1 340px;
      margin-top: 20px;
      padding: 0 10px;
      max-width: 354px;
    }
    .car-card+.car-card{
      margin-top: 20px;
    }
}
</style>
