<template>
  <view>
    <view class="top-bar-wrapper" :style="bgColor">

      <view class="top-bar" :style="bgColor">
        <view class="status-bar" :style="'height:'+statusBarHeight+'px;'"></view>
        <view class="navigator">
          <view class="app-title-wrap">
            <image v-if="showBack" src="../../static/top-bar-icons/back.png" class="back-button" @click="onBack" />
            <view class="app-title">{{title || '狂飙小助手'}}</view>
          </view>
          <view class="server-toggle" v-if="showServerToggle">
            <view class="server server-gl" :class="{['server-selected']:server==='gl'}" @tap="changeServer('gl')">国际
            </view>
            <view class="server server-al" :class="{['server-selected']:server==='al'}" @tap="changeServer('al')">国服
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="placeholder" :style="'height:'+(statusBarHeight+44)+'px'"></view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: "topBar",
    props: ["title", "showServerToggle", "showBack", "themeConfig"],
    data() {
      return {
        //高度适配方案 https://developers.weixin.qq.com/community/develop/article/doc/0000ecde0e49a85a314c9d44d51013
        statusBarHeight: '25'
      };
    },
    created() {
      let systemInfo = uni.getSystemInfoSync()
      this.statusBarHeight = systemInfo.statusBarHeight
    },
    computed: {
      ...mapState(['server', 'theme']),
      bgColor() {
        if (this.themeConfig && this.themeConfig[this.theme]) {
          return `background-color:${this.themeConfig[this.theme].bgColor};`
        } else {
          return `background-color:${this.theme==='dark'?'#1e1e1e':'#ff0054'};`
        }
      }
    },
    methods: {
      ...mapMutations(['toggleServer']),
      changeServer(newServer) {
        if (this.server !== newServer) {
          this.toggleServer()
        }
      },
      onBack() {
        uni.navigateBack({

        })
      }
    }
  }
</script>

<style lang="scss">
  .placeholder {
    height: 67px;
    // background-color: $card-bg-color;
  }

  .top-bar-wrapper {
    display: flex;
    z-index: 114555;
    justify-content: center;
    width: 100%;
    position: fixed;
  }

  .top-bar {
    max-width: 768px;
    width: 100%;
    // background-color: $card-bg-color;

    // @media (prefers-color-scheme: dark) {
    //   background-color: $card-bg-color-dark;
    // }
  }

  .status-bar {
    height: 25px;
    // background-color: green;
  }

  .navigator {
    height: 44px;
  }

  .app-title-wrap {

    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
  }

  .app-title {
    padding-left: 20rpx;
    font-size: 16px;
    color: #fff;
    // font-weight: bold;
    @include pad-devices {
      padding-left: toPadPx(20);
    }


    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
    }
  }

  .server-toggle {
    font-size: 14px;
    // height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
  }

  .server {
    display: flex;
    align-items: center;
    border: 1px solid #fff;
    color: #fff;

    @media (prefers-color-scheme: dark) {
      color: $theme-color;
      border-color: $theme-color-dark;
    }
  }

  .server-selected {
    color: $theme-color;
    font-weight: bold;
    background-color: #fff;

    @media (prefers-color-scheme: dark) {
      color: $text-title-color-dark;
      background-color: $theme-color;
    }
  }

  .server-gl {
    border-radius: 100px 0 0 100px;
    padding: 2px 10px 2px 15px;
  }

  .server-al {

    border-radius: 0 100px 100px 0;
    padding: 2px 15px 2px 10px;
  }

  .back-button {
    width: 16px;
    height: 16px;
    padding: 6px;
    margin-left: 20rpx;

    @include pad-devices {
      margin-left: toPadPx(20);
    }

    filter: invert(100%);

  }
</style>
