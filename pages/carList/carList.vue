<template>
  <view class="container">
    <div class="top-fixed-wrapper">
      <top-bar :showServerToggle="true" />
      <filter-block id="filter-block" :carClass="carClass" @onChangeCarClass="onChangeCarClass" />
    </div>
    <func-list />
    <context id="context" :carClass="carClass" ref="carListDB" />
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  import filterBlock from './filterBlock.vue'
  import context from './context.vue'
  import topBar from '@/components/topBar/topBar.vue'
  import funcList from './components/funcList/funcList.vue'
  import tapTabToTop from '@/mixin/tapTabToTop.js'

  const db = uniCloud.database()

  export default {
    components: {
      'filter-block': filterBlock,
      'context': context,
      'top-bar': topBar,
      'func-list': funcList
    },
    data() {
      return {
        carClass: 'D',
      }
    },
    computed: {
      ...mapState(['server']),
      releaseVersionRange() {
        return this.server === 'gl' ? this.releaseVersionRangeGL : this.releaseVersionRangeAL
      }
    },
    watch: {
      server(newServer) {
        if (newServer !== 'al' && this.carClass === 'R') {
          this.carClass = 'S'
        }
      }
    },
    mixins: [tapTabToTop],
    onReachBottom() {
      this.$refs.carListDB.loadMore()
    },
    onLoad() {

    },
    onReady() {

    },
    onShareAppMessage() {
      return {
        'title': '天赐三菱，不服不行'
      }
    },
    onPullDownRefresh() {
      this.$refs.carListDB.refresh();
    },

    methods: {
      onChangeCarClass(carClass) {
        this.carClass = carClass
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 0
        })
      },
    }
  }
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
  }

  .top-fixed-wrapper {

    position: sticky;
    top: 0;
    z-index: 114514;
    margin-bottom: 20rpx;

    @include pad-devices {
      margin-bottom: toPadPx(20);
    }
  }
</style>