<template>
  <view class="fail-block">
    <image src="/static/packet.png" class="fail-icon"></image>
    <button class="retry" size="mini" @tap="onRetry">重试</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    methods: {
      onRetry() {
        this.$emit('onRetry');
      }
    }
  }
</script>

<style lang="scss">
  .fail-block {
    padding: 64rpx 0;
    display: flex;
    flex-direction: column;

    @include pad-devices {
      padding: toPadPx(64) 0;
    }
  }


  .fail-text {
    text-align: center;
    color: #909090;
  }

  .fail-icon {
    width: 64rpx;
    height: 64rpx;
    margin: 0 auto;
    margin-bottom: 48rpx;
    filter: invert(60%);
    display: block;

    @include pad-devices {
      width: toPadPx(64);
      height: toPadPx(64);
      margin-bottom: toPadPx(48);
    }

    @media (prefers-color-scheme: dark) {
      filter: invert(30%);
    }
  }

  .retry {
    background-color: #ff0054;
    color: #ffffff;
    font-size: 24rpx;

    @include pad-devices {
      font-size: toPadPx(24);
    }
  }

  .retry:active {
    background-color: rgba(255, 0, 84, 0.6);
  }
</style>
