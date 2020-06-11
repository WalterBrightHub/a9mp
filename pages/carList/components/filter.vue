<template>
  <view class="filter">

    <picker class="sort-block" :range="sortRange" :range-key="'name'" @change="onChangeSort">{{sortRange[sortValue].name}}</picker>

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
    props: ['sort', 'filter', 'brandRange'],
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
        let newSort = this.sortRange[e.target.value].value
        if (this.sort !== newSort) {
          this.$emit('onChangeSort', newSort);
          uni.pageScrollTo({
            scrollTop: 0
          })
          //切换时界面可能没有明显变化，加一个提示
          uni.showToast({
            title:'已切换',
            duration:1000
          })
        }

      },
      onChangeFilter(filter) {
        if (this.filter !== filter) {
          this.$emit('onChangeFilter', filter)
          
          uni.pageScrollTo({
            scrollTop: 0
          })
        }

      },
      onchangeBrand(e) {
        this.$emit('onChangeFilter', this.brandRange[e.target.value])
      }
    }
  }
</script>

<style lang="scss">
  .filter {
    display: flex;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    align-items: center;
  }

  .sort-block {
    // margin-left: 10rpx;
    color: #000;
    padding: 0 20rpx;
    font-size: 36rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 10rpx;
    background-color: #fff;

    @include pad-devices {
      font-size: toPadPx(36);
      padding: 0 toPadPx(20);
      height: toPadPx(72);
      line-height: toPadPx(72);
      border-radius: toPadPx(10);
    }

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

    @include pad-devices {

      font-size: toPadPx(36);
      width: toPadPx(72);
      height: toPadPx(72);
      line-height: toPadPx(72);
      border-radius: toPadPx(10);
    }

  }

  .class-block+.class-block {
    margin-left: 30rpx;

    @include pad-devices {

      margin-left: toPadPx(30);
    }
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

    @include pad-devices {

      margin-left: toPadPx(72);
      font-size: toPadPx(36);
      height: toPadPx(72);
      line-height: toPadPx(72);
      border-radius: toPadPx(10);
    }
  }
  .filter-brand,
  .sort-block,
  .class-block{
    color: $text-title-color;
    background-color: $card-bg-color;
  @media (prefers-color-scheme: dark){
    
      color: $text-title-color-dark;
      background-color: $card-bg-color-dark;
  }
  }
  .class-selected {
    color: #fff;
    background-color: #000;
  @media (prefers-color-scheme: dark){
    
      color: $card-bg-color-dark;
      background-color: $text-title-color-dark;
  }
    
  }
</style>
