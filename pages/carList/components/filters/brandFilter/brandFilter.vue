<template>
  <picker class="filter-picker" :range="brandRange" @change="onChangeBrand">
    {{brand}}
  </picker>
</template>

<script>
  import select from './select.js'
  export default {
    props: ['brandRange'],
    data() {
      return {
        brand: 'Lamborghini'
      }

    },
    methods: {

      onChangeBrand(e) {
        const newBrand = this.brandRange[e.target.value]
        if (newBrand !== this.brand) {

          this.brand = newBrand
          this.$emit('onChangeSelectMethod', select(newBrand))
        }
      }
    }
  }
</script>

<style lang="scss">
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

  .filter-picker {
    color: $text-title-color;
    background-color: $card-bg-color;

    @media (prefers-color-scheme: dark) {

      color: $text-title-color-dark;
      background-color: $card-bg-color-dark;
    }
  }
</style>
