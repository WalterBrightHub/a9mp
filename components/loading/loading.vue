<template>
  <view class="loading">
    <view class="loading-css"></view>
  </view>
</template>

<script>
  // [三种 Loading 制作方案] https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==
  export default {
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .loading {
    display: flex;
    justify-content: center;
  }

  @keyframes loading-360 {
    0% {
      transform: rotate(0deg);
      /*动画起始的时候旋转了0度*/
    }

    100% {
      transform: rotate(360deg);
      /*动画结束的时候旋转了360度*/
    }
  }

  .loading-css {
    width: 48rpx;
    /*先将loading区域变成正方形*/
    height: 48rpx;
    display: inline-block;
    /*将loading区域变成行内元素，防止旋转的时候，100%宽度都在旋转*/
    border: 6rpx solid $theme-color;
    /*将上边框颜色设置为红色高亮，以便旋转的时候能够看到旋转的效果*/
    border-right: 6rpx solid rgba($color: #000000, $alpha: 0);
    /*设置四周边框大小，并将颜色设置为浅白色*/
    border-radius: 50%;
    /*将边框和内容区域都变成圆形*/

    animation: loading-360 0.5s infinite linear;
    /*给圆环添加旋转360度的动画，并且是无限次*/

    @include pad-devices {
      width: toPadPx(48);
      height: toPadPx(48);

      border-width: toPadPx(6);

    }

    @media (prefers-color-scheme: dark) {
      border-color: $theme-color-dark;
      border-right-color: rgba($color: #000000, $alpha: 0);
    }
  }
</style>
