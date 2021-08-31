<template>
  <view class="container">
    <div class="top-fixed-wrapper">
      
		<top-bar :showServerToggle="true" :themeConfig="themeConfig"  />
    <view class="head-wrapper">
      <view class="head">

        <view class="season-title-block">
          <view class="season-name">{{seasonName}}</view>
        </view>
      </view>
    </view>
    </div>
    <context :seasonPass="computedSeasonPass" :seasonPassStatus="seasonPassMissionsStatus" :server="server"
      @onToggleServer="toggleServer" @onRetry="onRetry" />
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import context from './context.vue'
	import topBar from '@/components/topBar/topBar.vue'
  import tapTabToTop from '@/mixin/tapTabToTop.js'

  const db = uniCloud.database()
  const requestSeasonPassMissions = async function(now, server) {
    return db.collection('seasonPassMissions').where(`server=="${server}"&&endTime>${now}&&startTime<=${now}`).get({
      getOne: true
    })
  }
  
  const themeConfig={
    light:{
      bgColor:'#dbb620'
    }
  }

  export default {
    components: {
      'context': context,
			'top-bar':topBar
    },
    data() {
      return {
        seasonPassMissions: {
          episodes: []
        },
        seasonPassMissionsStatus: 'ready',
        themeConfig,
      };
    },
    computed: {
      ...mapState(['server']),
      computedSeasonPass() {
        const seasonPass = this.seasonPassMissions
        if (!seasonPass) {
          return null
        }
        const {
          episodes
        } = seasonPass
        return {
          ...seasonPass,
          episodes: episodes.sort((a, b) => b.episode_id - a.episode_id)
        }
      },
      seasonName() {
        return this.seasonPassMissionsStatus === 'resolve' ?
          (this.computedSeasonPass ? this.computedSeasonPass.seasonName : '敬请期待') :
          ''
      }
    },
    watch: {
      server(newServer) {

        let now = new Date().getTime()
        this.seasonPassMissionsStatus = 'loading'
        requestSeasonPassMissions(now, this.server)
          .then(res => {
            this.seasonPassMissions = res.result.data
            this.seasonPassMissionsStatus = 'resolve'
          }).catch(e => {
            this.seasonPassMissionsStatus = 'reject'
          })
      }
    },
    mixins:[tapTabToTop],
    onLoad() {

      this.seasonPassMissionsStatus = 'loading'
      let now = new Date().getTime()
      requestSeasonPassMissions(now, this.server)
        .then(res => {
          this.seasonPassMissions = res.result.data
          this.seasonPassMissionsStatus = 'resolve'
        }).catch(e => {
          this.seasonPassMissionsStatus = 'reject'
        })
    },
    onPullDownRefresh() {
      // this.seasonPassMissionsStatus = 'loading'
      let now = new Date().getTime()
      requestSeasonPassMissions(now, this.server)
        .then(res => {
          // return Promise.reject()
          this.seasonPassMissions = res.result.data
          this.seasonPassMissionsStatus = 'resolve'
          uni.showToast({
            title: '最新',
            duration: 500
          })
        }).catch(e => {
          console.log(e)
          this.seasonPassMissionsStatus = 'reject'
        }).finally(() => {
          uni.stopPullDownRefresh()
        })
    },
    

    onShareAppMessage() {

      return {
        'title': '通行证任务，快速指引',
      }
    },
    methods: {
      ...mapMutations(['toggleServer']),
      onRetry() {
        this.seasonPassMissionsStatus = 'loading'
        let now = new Date().getTime()
        requestSeasonPassMissions(now, this.server)
          .then(res => {
            this.seasonPassMissions = res.result.data
            this.seasonPassMissionsStatus = 'resolve'
          }).catch(e => {
            this.seasonPassMissionsStatus = 'reject'
          }).finally(() => {
            uni.stopPullDownRefresh()
          })
      }
    }
  }
</script>

<style lang="scss">
  .top-fixed-wrapper{
    
    position: sticky;
    top:0;
  }
  
  .head-wrapper {
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #dbb620;
    // border-bottom: 2px solid $divider-color;
    margin-bottom: 20rpx;
    @include pad-devices {
      margin-bottom:  toPadPx(20);
    
    }
  
    @media (prefers-color-scheme: dark) {
  
      background-color: $card-bg-color-dark;
      // border-bottom-color: $divider-color-dark;
    }
  }
  .head{
    
    max-width: 768px;
    margin: 0 auto;
    display: flex;
  }
  
  .season-title-block {
    display: flex;
    flex: 1;
    height:72rpx;
    // margin: 20rpx;
  
    //好康的渐变
    //https://www.ui.cn/detail/198009.html 双色渐变用于中小面积，轻量渐变用于大面积
    // background: linear-gradient(to right, #f7ce26, #ff0054);
  
    // background: linear-gradient(to right, #f7ce26, #ff0054);
    // border-radius: 10rpx;
  
    @include pad-devices {
      // margin: toPadPx(20);
      border-radius: toPadPx(10);
    height:toPadPx(72);
    }
  }
  
  .season-name {
    // padding: 0 20rpx;
    // line-height: 72rpx;
    // border-radius: 10rpx;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: #f7ce26;
  
  
    // background: linear-gradient(to right, #ffe681,#f7ce26 );
    color:$text-title-color;
    // color: #f18200;
    font-size: 36rpx;
    font-weight: bold;
  
    @media (prefers-color-scheme: dark) {
  
      color: #f7ce26;
      background-color: $card-bg-color-dark;
    }
  
    @include pad-devices {
      // padding: 0 toPadPx(20);
      line-height: toPadPx(72);
      // border-radius: toPadPx(10);
      font-size: toPadPx(36);
    }
  }
  
</style>
