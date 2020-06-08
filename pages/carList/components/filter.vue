<template>
  <view class="filter">

    <picker class="sort-block" :range="sortRange" :range-key="'name'" 
     @change="onChangeSort">{{sortRange[sortValue].name}}</picker>

    <view class="filter-block" v-if="sort==='carClass'">
      <view class="class-block" :class="{['class-selected']:item===filter}" v-for="item in carFilter" :key="item" @tap="onChangeFilter(item)">
        {{item}}</view>
    </view>
    <view class="filter-block" v-else-if="sort==='carClassAL'">
      <view class="class-block" :class="{['class-selected']:item===filter}" v-for="item in carFilter" :key="item" @tap="onChangeFilter(item)">
        {{item}}</view>
    </view>
    <view class="filter-block" v-else-if="sort==='rank'">

    </view>
    <picker class="filter-brand" v-else-if="sort==='brand'" :range="brandRange" @change="onchangeBrand">
      {{filter}}
    </picker>
  </view>
</template>

<script>
  export default {
    props: ['sort', 'filter','brandRange'],
    data() {
      return {
        sortRange: [{
            name: '国际服等级',
            value: 'carClass'
          },
          {
            name: '国服等级',
            value: 'carClassAL'
          },
          {
            name: 'MAX性能分',
            value: 'rank'
          },
          {
            name: '品牌',
            value: 'brand'
          },
        ],
        carFilter: ['D', 'C', 'B', 'A', 'S'],
      };
    },
    computed: {
      sortValue: function() {
        return this.sortRange.findIndex(item => item.value === this.sort)
      }
    },
    methods: {
      onChangeSort(e) {

        this.$emit('onChangeSort', this.sortRange[e.target.value].value);
      },
      onChangeFilter(filter) {
        console.log('hi')
        this.$emit('onChangeFilter', filter)
      },
      onchangeBrand(e){
        this.$emit('onChangeFilter',this.brandRange[e.target.value])
      }
    }
  }
</script>

<style lang="scss">
  .filter {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .sort-block {
    // margin-left: 10rpx;
    color: #000;
    padding: 0 20rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  .filter-block {
    margin-left: auto;
    display: flex;
  }

  .class-block {
    font-size: 36rpx;
    width: 72rpx;
    height: 72rpx;
    line-height: 72rpx;
    text-align: center;
    box-sizing: border-box;
    font-weight: bold;
    // padding: 18rpx;
    background-color: #fff;
    color: #000;
    border-radius: 10rpx;
  }

  .class-block+.class-block {
    margin-left: 30rpx;
  }

  .class-selected {
    color: #fff;
    background-color: #000;
  }

  .filter-brand {
    margin-left: 72rpx;
    flex: 1;
    text-align: center;
    background-color: #fff;
    color: #000;
    font-size: 36rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 10rpx;
  }
</style>
