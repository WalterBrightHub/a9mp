<script>
  import {
    mapMutations
  } from 'vuex'
  
  export default {

    onLaunch: function() {
      console.log(process.env.NODE_ENV)
      let that=this
      
      //#ifdef MP-WEIXIN

      wx.getSystemInfo({
        success(res) {
          let {theme}=res
          if(!theme){
            //不支持theme
            return
          }else{
            console.log(theme)
            that.setTheme(theme)
            wx.onThemeChange(({theme})=>{
              that.setTheme(theme)
            })
          }
        }
      })
      //#endif
    },
    methods:{
      
        ...mapMutations(['setTheme']),
    }
  }
</script>

<style lang="scss">
  page {
    background-color: $page-bg-color;

    display: flex;
    flex-direction: column;

    font-size: 32rpx;
    color: $text-p-color;  
      @include pad-devices {
      font-size: toPadPx(32);
    }


    @media (prefers-color-scheme: dark) {
      background-color: $page-bg-color-dark;
      color: $text-p-color-dark;
    }
  }
</style>
