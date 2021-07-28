<template>
  <view class="container">
		<top-bar :showServerToggle="true" :themeConfig="themeConfig"  />
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
    
    firstTapTab: false,
    onHide() {
      this.firstTapTab = true
    },
    onTabItemTap() {
      if (this.firstTapTab) {
        this.firstTapTab = false
      } else {
        uni.pageScrollTo({
          scrollTop: 0
        })
      }
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

</style>
