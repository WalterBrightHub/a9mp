<template>
  <view class="filter">

    <picker class="sort-block" :range="sortRange" :range-key="'name'" @change="onChangeSort">{{sortRange[sortValue].name}}</picker>

    <car-class-filter class="filter-block" v-if="sort==='carClass'" @onChangeSelectMethod="onChangeSelectMethod" />
    <!-- <car-class-al-filter class="filter-block" v-else-if="sort==='carClassAL'" @onChangeSelectMethod="onChangeSelectMethod" /> -->
    <release-version-filter class="filter-brand" v-else-if="sort==='releaseVersion'" :releaseVersionRange="releaseVersionRange" @onChangeSelectMethod="onChangeSelectMethod" />
    
    <all-filter class="filter-brand" v-else-if="sort==='all'" @onChangeSelectMethod="onChangeSelectMethod" />
    <brand-filter class="filter-brand" v-else-if="sort==='brand'" :brandRange="brandRange" @onChangeSelectMethod="onChangeSelectMethod" />

  </view>
</template>

<script>
  import carClassFilter from './filters/carClassFilter/carClassFilter.vue'
  import allFilter from './filters/allFilter/allFilter.vue'
  import brandFilter from './filters/brandFilter/brandFilter.vue'
  import releaseVersionFilter from './filters/releaseVersionFilter/releaseVersionFilter.vue'

  import {
    defaultSelect as defaultSelectCarClass
  } from './filters/carClassFilter/select.js'


  import {
    defaultSelect as defaultSelectAll
  } from './filters/allFilter/select.js'
  import  selectBrand from './filters/brandFilter/select.js'

  import selectReleaseVersion from './filters/releaseVersionFilter/select.js'



  export default {
    components: {
      'car-class-filter': carClassFilter,
      'all-filter': allFilter,
      'brand-filter': brandFilter,
      'release-version-filter':releaseVersionFilter,
    },
    props: ['brandRange','releaseVersionRange'],
    data() {
      return {
        sort: 'carClass',
        sortRange: [{
            name: '等级',
            value: 'carClass'
          },
          // {
          //   name: '国服等级',
          //   value: 'carClassAL'
          // },
          {
            name:'释放版本',
            value:'releaseVersion'
          },
          {
            name: '全车',
            value: 'all'
          },
          {
            name: '品牌',
            value: 'brand'
          },
        ],

      };
    },
    computed: {
      sortValue: function() {
        return this.sortRange.findIndex(item => item.value === this.sort)
      },
      defaultSelect(){
        return {
    'carClass': defaultSelectCarClass,
    'all': defaultSelectAll,
    'brand': selectBrand(this.brandRange[0]),
    'releaseVersion':selectReleaseVersion(this.releaseVersionRange&&this.releaseVersionRange[0])
  }
      }
    },
    methods: {

      onChangeSelectMethod(method) {
        this.$emit('onChangeSelectMethod', method)
      },
      onChangeSort(e) {
        let newSort = this.sortRange[e.target.value].value
        if (this.sort !== newSort) {
          this.sort = newSort

          this.$emit('onChangeSelectMethod', this.defaultSelect[newSort])
          // this.$emit('resetLimit')
          uni.pageScrollTo({
            scrollTop: 0,
            duration: 0
          })
          //切换时界面可能没有明显变化，加一个提示
          uni.showToast({
            title: '已切换',
            duration: 1000
          })
        }

      },


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
    padding: 0 20rpx;
    font-size: 36rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 10rpx;

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
  }




  .sort-block {
    color: $text-title-color;
    background-color: $card-bg-color;

    @media (prefers-color-scheme: dark) {

      color: $text-title-color-dark;
      background-color: $card-bg-color-dark;
    }
  }

  .filter-brand {

    margin-left: 36rpx;
    flex: 1;

    @include pad-devices {

      margin-left: toPadPx(36);
    }
  }
</style>
