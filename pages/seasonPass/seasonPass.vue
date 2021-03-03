<template>
  <view class="container">
    <context :seasonPass="computedSeasonPass" :now="now" :server="server" @onToggleServer="onToggleServer" />
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import context from './context.vue'
  
  import {seasonPassGL,seasonPassAL} from './fakeData.js'

  export default {
    components: {
      'context': context
    },
    data() {
      return {
        now: new Date().getTime(),
        seasonPassGL,
        seasonPassAL
      };
    },
    computed: {
      ...mapState(['server']),
      computedSeasonPass() {
        const seasonPass=this.server==='gl'?this.seasonPassGL:this.seasonPassAL
        const {
          episodes
        } = seasonPass
        return {
          ...seasonPass,
          episodes: episodes.sort((a, b) => b.episode_id - a.episode_id)
        }
      }
    },
    onLoad() {
      
    },
    methods: {
      ...mapMutations(['toggleServer']),
      onToggleServer() {
        uni.showToast({
          title: '已切换'
        })
        this.toggleServer()
      }
    }
  }
</script>

<style lang="scss">

</style>