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
}
.filter{
  display: flex;
  position: fixed;
  z-index: 114514;
  width: 100%;
  background-color: $page-bg-color;
  
  padding: 20rpx;
  box-sizing: border-box;
}
.car-card-list{
  padding: 20rpx;
}
.car-card+.car-card{
  margin-top: 20rpx;
}
</style>
