<template>
  <view class="container">
    <filter-block id="filter-block" :brandRange="brandRange" :releaseVersionRange="releaseVersionRange"
      @onChangeSelectMethod="onChangeSelectMethod" />

    <context id="context" :carList="carList" :selectMethod="selectMethod" ref="carListDB" />

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  import filterBlock from './filterBlock.vue'
  import context from './context.vue'
  import selectCarClass from './components/filters/carClassFilter/select.js'
  import _ from 'lodash'

  const db = uniCloud.database()

  export default {
    components: {
      'filter-block': filterBlock,
      'context': context
    },
    data() {
      return {
        selectMethod: {},
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
      //默认为空对象，组件加载设置为手动，当重新赋值时就加载了，无需调用
      this.selectMethod = selectCarClass('D', this.server)
      // this.$refs.carListDB.loadData()

      //获取所有品牌，并按照车辆数降序排列。
      db.collection('carList').where('brand!=""').groupBy('brand').groupField('count(*) as count').orderBy(
        'count desc, brand asc').get().then(res => {
        // console.log(res.result.data)
        const brands = res.result.data
        this.brandRange = brands.map(car => car.brand)
      })

      //获取释放版本
      db.collection('versionNoteGL').orderBy('_id desc').limit(475).get().then(res => {
        // console.log(res.result.data)
        this.releaseVersionRangeGL = res.result.data.map(item => ({
          ...item,
          displaySelect: item.releaseVersion + ' ' + item.note
        }))

      })

      db.collection('versionNoteAL').orderBy('_id desc').limit(475).get().then(res => {
        // console.log(res.result.data)
        this.releaseVersionRangeAL = res.result.data.map(item => ({
          ...item,
          displaySelect: item.releaseVersion + ' ' + item.note
        }))

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
