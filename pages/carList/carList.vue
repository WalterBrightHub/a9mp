<template>
  <view class="container">
    <filter-block @resetLimit="resetLimit" id="filter-block" :server="server" @onToggleServer="onToggleServer"
      :brandRange="brandRange" :releaseVersionRange="releaseVersionRange" @onChangeSelectMethod="onChangeSelectMethod" />

    <context id="context"  :carList="carList" :selectMethod="selectMethod" ref="carListDB" />

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  import requestFail from '../../components/requestFail/requestFail.vue'
  import filterBlock from './filterBlock.vue'
  import context from './context.vue'
  import {
    compareVersion
  } from './util.js'
  import selectCarClass from './components/filters/carClassFilter/select.js'
  import _ from 'lodash'

  const myCloud = uniCloud

  const db = myCloud.database()




  export default {
    components: {
      'filter-block': filterBlock,
      'context': context
    },
    data() {
      return {
        selectMethod: selectCarClass('D', this.server),
        releaseVersionRangeGL: [],
        releaseVersionRangeAL: [],
        brandRange: ['Ferrari'],
      }
    },
    computed: {
      ...mapState(['server']),
      releaseVersionRange() {
        return this.server === 'gl' ? this.releaseVersionRangeGL : this.releaseVersionRangeAL
      }
    },
    onReachBottom() {
      this.$refs.carListDB.loadMore()
      this.limit += 20
    },
    onLoad() {

      db.collection('carList').field('releaseVersion,brand').limit(475).get().then(res => {
        let rvr = _(res.result.data).map(car => car.releaseVersion)
          .union()
          .value()
          .sort(compareVersion)
        this.releaseVersionRangeGL = rvr

        let br = _(res.result.data)
          .filter(car => car.brand && car.brand !== '')
          .countBy(car => car.brand)
          .map((count, brand) => ({
            count,
            brand
          }))
          .orderBy(['count', 'brand'], ['desc', 'asc'])
          .map(obj => obj.brand)
          .value()

        this.brandRange = br
      })

      db.collection('carListAL').field('releaseVersion').limit(475).get().then(res => {
        let rvr = _(res.result.data).map(car => car.releaseVersion)
          .union()
          .value()
          .sort(compareVersion)
        this.releaseVersionRangeAL = rvr
      })





    },
    onShareAppMessage() {
      return {
        'title': '天赐三菱，不服不行'
      }
    },
    onPullDownRefresh() {
      this.$refs.carListDB.refresh();
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
    methods: {
      ...mapMutations(['toggleServer']),
      onToggleServer() {
        // uni.showToast({
        //   title: '已切换'
        // })
        this.toggleServer()
        // this.resetLimit()
        // uni.pageScrollTo({
        //   scrollTop: 0,
        //   duration: 0
        // })
      },
      onChangeSelectMethod(method) {
        this.selectMethod = method
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
</style>
