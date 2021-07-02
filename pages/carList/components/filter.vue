<template>
  <view class="filter">
    <view class="type-filter-block">
      <view class="type-filter-item" :class="{['type-filter-item-selected']:index===sortValue}"
        v-for="(sort,index) in sortRange" @tap="onChangeSort(index)">
        {{sort.name}}
      </view>
    </view>

    <car-class-filter class="filter-block" v-if="sort.value==='carClass'"
      @onChangeSelectMethod="onChangeSelectMethod" />
    <!-- <car-class-al-filter class="filter-block" v-else-if="sort==='carClassAL'" @onChangeSelectMethod="onChangeSelectMethod" /> -->
    <release-version-filter class="filter-block" v-else-if="sort.value==='releaseVersion'"
      :releaseVersionRange="releaseVersionRange" @onChangeSelectMethod="onChangeSelectMethod" />

    <all-filter class="filter-block" v-else-if="sort.value==='all'" @onChangeSelectMethod="onChangeSelectMethod" />
    <brand-filter class="filter-block" v-else-if="sort.value==='brand'" :brandRange="brandRange"
      @onChangeSelectMethod="onChangeSelectMethod" />

  </view>
</template>

<script>
  import {
    mapState,
  } from 'vuex'
  import carClassFilter from './filters/carClassFilter/carClassFilter.vue'
  import allFilter from './filters/allFilter/allFilter.vue'
  import brandFilter from './filters/brandFilter/brandFilter.vue'
  import releaseVersionFilter from './filters/releaseVersionFilter/releaseVersionFilter.vue'

  import selectCarClass from './filters/carClassFilter/select.js'


  import selectAll from './filters/allFilter/select.js'
  import selectBrand from './filters/brandFilter/select.js'

  import selectReleaseVersion from './filters/releaseVersionFilter/select.js'



  export default {
    components: {
      'car-class-filter': carClassFilter,
      'all-filter': allFilter,
      'brand-filter': brandFilter,
      'release-version-filter': releaseVersionFilter,
    },
    props: ['brandRange', 'releaseVersionRange'],
    data() {
      return {
        sortValue: 0,
        sortRange: [{
            name: '等级',
            value: 'carClass'
          },
          {
            name: '排序',
            value: 'all'
          },
        ],

      };
    },
    computed: {
      ...mapState(['server']),
      sort: function() {
        return this.sortRange[this.sortValue]
      },
      defaultSelect() {
        return {
          'carClass': selectCarClass('D', this.server),
          'all': selectAll('rank', true, this.server),
          'brand': selectBrand(this.brandRange[0], this.server),
          'releaseVersion': selectReleaseVersion(this.releaseVersionRange[0] && this.releaseVersionRange[0]
            .releaseVersion,
            this.server)
        }
      }
    },
    methods: {

      onChangeSelectMethod(method) {
        this.$emit('onChangeSelectMethod', method)
      },
      onChangeSort(index) {
        let newSortValue = index
        if (this.sortValue !== newSortValue) {
          this.sortValue = newSortValue

          let newSort = this.sortRange[newSortValue].value

          this.$emit('onChangeSelectMethod', this.defaultSelect[newSort])
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


  .sort-block {
    color: $text-title-color;
    background-color: $card-bg-color;

    @media (prefers-color-scheme: dark) {

      color: $text-title-color-dark;
      background-color: $card-bg-color-dark;
    }
  }

  .filter-block {

    margin-left: auto;

    // @include pad-devices {

    //   margin-left: toPadPx(20);
    // }
  }


  .type-filter-block {
    // padding: 0 20rpx;
    font-size: 36rpx;
    display: flex;
    text-align: center;
    // justify-content: center;
    // flex: 1;
    // margin-left: 30rpx;
    height: 72rpx;
    line-height: 72rpx;
    background-color: $card-bg-color;
    color: $text-title-color;

    overflow-x: auto;
    overflow-y: hidden;

    @include pad-devices {
      font-size: toPadPx(36);
      // padding: 0 toPadPx(20);
      height: toPadPx(72);
      margin-left: toPadPx(30);
      line-height: toPadPx(72);
    }

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
      color: $text-title-color-dark;
    }
  }

  .type-filter-block::-webkit-scrollbar {
    height: 0 !important;
  }

  .type-filter-item {
    flex: none;
    color: $text-help-color;
    @media (prefers-color-scheme: dark) {
      color: $text-help-color-dark;
    }
  }

  .type-filter-item-selected {
    border-bottom: 8rpx solid $theme-color;
    font-weight: bold;
    color: $theme-color;

    @media (prefers-color-scheme: dark) {
      color: $theme-color-dark;
      border-bottom-color: $theme-color-dark;
    }

    @include pad-devices {
      border-bottom-width: toPadPx(8);
    }
  }

  .type-filter-item+.type-filter-item {
    margin-left: 32rpx;

    @include pad-devices {
      margin-left: toPadPx(32);
    }
  }
</style>
