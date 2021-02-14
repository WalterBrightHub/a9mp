<template>
  <view class="filter-block">
    <picker class="filter-picker" :range="sortFieldRange" :value="sortFieldValue" :range-key="'name'" @change="onChangeSortField">{{sortField.name}}</picker>
    <view class="filter-toggle" @tap="onToggleIsAsc">{{isAsc?'从低到高':'从高到低'}}</view>
  </view>
</template>

<script>
  import {
    mapState,
  } from 'vuex'
  import select from './select.js'
  export default {
    data() {
      return {
        isAsc: true,
        sortFieldValue: 0,
        sortFieldRange: [{
            name: '性能分',
            value: 'rank',
          },
          {
            name: '最大速度',
            value: 'topSpeed',
          },
          {
            name: '加速',
            value: 'acceleration',
          },
          {
            name: '操控',
            value: 'handling',
          },
          {
            name: '氮气',
            value: 'nitro',
          },
        ],
      };
    },
    watch: {
      server(newServer) {
        this.$emit('onChangeSelectMethod', select(this.sortField.value, this.isAsc, newServer))
      }
    },
    computed: {
      ...mapState(['server']),
      sortField() {
        return this.sortFieldRange[this.sortFieldValue]
      },
    },
    methods: {
      onChangeSortField(e) {
        let newSortFieldValue = e.target.value
        if (this.sortFieldValue !== newSortFieldValue) {
          this.sortFieldValue = newSortFieldValue
          let newSortField = this.sortFieldRange[newSortFieldValue].value
          this.$emit('onChangeSelectMethod', select(newSortField, this.isAsc, this.server))
        }
      },
      onToggleIsAsc() {
        let newIsAsc = !this.isAsc
        this.isAsc = newIsAsc
        this.$emit('onChangeSelectMethod', select(this.sortField.value, newIsAsc, this.server))
      }
    }
  }
</script>

<style lang="scss">
  .filter-block {
    display: flex;
  }

  .filter-picker {
    flex: 1;
    text-align: center;
    background-color: #fff;
    color: #000;
    font-size: 36rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 10rpx;

    @include pad-devices {
      font-size: toPadPx(36);
      height: toPadPx(72);
      line-height: toPadPx(72);
      border-radius: toPadPx(10);
    }
  }

  .filter-picker,
  .filter-toggle {
    color: $text-title-color;
    background-color: $card-bg-color;

    @media (prefers-color-scheme: dark) {

      color: $text-title-color-dark;
      background-color: $card-bg-color-dark;
    }
  }

  .filter-toggle {
    padding: 0 20rpx;
    font-size: 36rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 10rpx;
    margin-left: 20rpx;

    @include pad-devices {
      font-size: toPadPx(36);
      padding: 0 toPadPx(20);
      height: toPadPx(72);
      line-height: toPadPx(72);
      border-radius: toPadPx(10);
      margin-left: toPadPx(20);
    }
  }
</style>
