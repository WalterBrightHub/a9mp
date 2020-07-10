<template>
  <picker class="filter-picker" :range="releaseVersionRange" @change="onChangeReleaseVersion">
    {{releaseVersion}}
  </picker>
</template>

<script>
  //本组件由brandFilter复制而来
  import select from './select.js'
  export default {
    props: ['releaseVersionRange'],
    data() {
      return {
        releaseVersion: this.releaseVersionRange[0]
      }

    },
    methods: {

      onChangeReleaseVersion(e) {
        const newVersion = this.releaseVersionRange[e.target.value]
        if (newVersion !== this.releaseVersion) {

          this.releaseVersion = newVersion
          this.$emit('onChangeSelectMethod', select(newVersion))
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
