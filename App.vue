<script>
  import {
    mapMutations
  } from 'vuex'

  export default {

    onLaunch: function() {
      console.log(process.env.NODE_ENV)
      let that = this

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
            console.log(theme)
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
    },
    methods: {

      ...mapMutations(['setTheme']),
    }
  }
</script>

<style lang="scss">
  
  page {
    
    --theme-color: #ff0054;
    --page-bg-color: #e5ebee;
    --card-bg-color: #fff;
    --text-title-color: #303030;
    --text-p-color: #606060;
    --text-help-color: #909090;
    --text-tip-color: #c0c0c0;
    --divider-color: #f0f0f0;
    
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

    display: flex;
    flex-direction: column;

    font-size: 32rpx;
    color: var(--text-p-color);

    @include pad-devices {
      font-size: toPadPx(32);
    }

  }
</style>
