<script>
  import {
    mapMutations
  } from 'vuex'

  export default {

    onLaunch: function() {
      console.log(process.env.NODE_ENV)
      let that = this

      let systemInfo = uni.getSystemInfoSync()
      this.setStatusBarHeight(systemInfo.statusBarHeight)

      //#ifdef MP-WEIXIN

      wx.getSystemInfo({
        success(res) {
          let {
            theme
          } = res
          if (!theme) {
            //不支持theme
            return
          } else {
            // console.log(theme)
            that.setTheme(theme)
            wx.onThemeChange(({
              theme
            }) => {
              that.setTheme(theme)
            })
          }
        }
      })
      //#endif
      if (window && window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {

          that.setTheme('dark')
        } else {
          that.setTheme('light')
        }

        let listeners = {
          dark: (mediaQueryList) => {
            if (mediaQueryList.matches) {
              that.setTheme('dark')
            }
          },
          light: (mediaQueryList) => {
            if (mediaQueryList.matches) {
              that.setTheme('light')
            }
          }
        }

        window.matchMedia('(prefers-color-scheme: dark)').addListener(listeners.dark)
        window.matchMedia('(prefers-color-scheme: light)').addListener(listeners.light)
      }
    },
    methods: {

      ...mapMutations(['setTheme', 'setStatusBarHeight']),
    }
  }
</script>

<style lang="scss">
  body,

  page {

    --theme-color: #ff0054;
    --page-bg-color: #e5ebee;
    --card-bg-color: #fff;
    --text-title-color: #303030;
    --text-p-color: #606060;
    --text-help-color: #909090;
    --text-tip-color: #c0c0c0;
    --divider-color: #f0f0f0;
    
    --color-ruby: #dc0005;
    --color-ruby-lighter: #ff3136;

    @media (prefers-color-scheme: dark) {
      --theme-color: #ff1360;
      --page-bg-color: #121212;
      --card-bg-color: #1e1e1e;
      --text-title-color: #e0e0e0;
      --text-p-color: #c0c0c0;
      --text-help-color: #a0a0a0;
      --text-tip-color: #707070;
      --divider-color: #2c2c2c;
    }

    background-color: var(--page-bg-color);


    font-size: 32rpx;
    color: var(--text-p-color);

    @include pad-devices {
      font-size: toPadPx(32);
    }

  }

  .top-fixed-wrapper {
    z-index: 114555;
  }
</style>
