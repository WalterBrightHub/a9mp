<template>
  <view>
    
    <top-bar :showBack="true" :title="'车辆档案'" />

    <unicloud-db class=" get-method-db" ref="getMethodDB" v-slot:default="{data, pagination, loading, error, options}"
      :collection="carListCollection" getone="true" @load="onqueryload" @error="onqueryerror" manual="true"
      :where="whereGetMethod" :field="carArchivesField">

      <div class="contest-db-wrapper">

        <div class="contest-db">
          <view class="contest-db-title-block">
            <view class="contest-db-title">详细信息</view>
          </view>
          <view v-if="error" class="error">{{error.message}}</view>
          <view v-else-if="!data" class="noData"></view>
          <view v-else class="detail-block">
            <div class="detail-row-list">
              <div class="detail-row">
              <div class="detail-title">升级费用</div>
              <div class="detail-content">{{data.stageCost>0?split3(data.stageCost):'未知'}}</div>
            </div>
            <div class="detail-row">
              <div class="detail-title">零件费用</div>
              <div class="detail-content">{{data.partCost>0?split3(data.partCost):'未知'}}</div>
            </div>
            <div class="detail-row">
              <div class="detail-title">MAX费用</div>
              <div class="detail-content">{{data.stageCost>0?split3(data.stageCost+data.partCost):'未知'}}</div>
            </div>
            <div class="detail-row attr-row" :class="{'attr-enable':data.openCar!==''}">
              <div class="detail-title">敞篷</div>
              <div class="detail-content">{{data.openCar!==''?data.openCar:'否'}}</div>
            </div>
            <div class="detail-row attr-row" :class="{'attr-enable':data.decalsExclusive!==''}">
              <div class="detail-title">独占贴纸</div>
              <div class="detail-content">{{data.decalsExclusive!==''?data.decalsExclusive:'否'}}</div>
            </div>
            </div>
            
            <div class="divider"></div>
            <div class="attr-list">
              <div class="attr-item" :class="{['attr-item-selected']:data.keyCar===1}">钥匙</div>
              <div class="attr-item" :class="{['attr-item-selected']:data.decals===1}">贴纸</div>
              <div class="attr-item" :class="{['attr-item-selected']:data.bodyParts===1}">外观套件</div>
              <div class="attr-item" :class="{['attr-item-selected']:data.nitroVusuals===1}">氮气特效</div>
              <div class="attr-item" :class="{['attr-item-selected']:data.storeEpicPart===1}">商店金卡</div>
            </div>
          </view>
          <view class="contest-empty-list" v-if="!data && loading===false">😮 出错啦！</view>
        </div>
        <div class="contest-db">
          <view class="contest-db-title-block">
            <view class="contest-db-title">获取方式</view>
          </view>
          <view v-if="error" class="error">{{error.message}}</view>
          <view v-else class="get-method-block">
            <div class="get-method-item" :class="{['get-method-item-selected']:data.getLoot===1}">战利品</div>
            <div class="get-method-item" :class="{['get-method-item-selected']:data.getGoals===1}">每日任务</div>
            <div class="get-method-item" :class="{['get-method-item-selected']:data.getClassCup===1}">级别杯</div>
            <div class="get-method-item" :class="{['get-method-item-selected']:data.getStore===1}">传奇商店</div>
            <div class="get-method-item" :class="{['get-method-item-selected']:data.getExclusive===1}">独家赛事</div>
            <div class="get-method-item" :class="{['get-method-item-selected']:data.getHunt===1}">寻车</div>
            <div class="get-method-item" :class="{['get-method-item-selected']:data.getLegendPass===1}">通行证</div>
            <div class="get-method-item" :class="{['get-method-item-selected']:data.getUnleash===1}">惊艳亮相</div>
            <div class="get-method-item" :class="{['get-method-item-selected']:data.getClassicMP===1}">经典多人</div>
            <div class="get-method-item" :class="{['get-method-item-selected']:data.get1vs1===1}">1VS1</div>
            <div class="get-method-item" :class="{['get-method-item-selected']:data.getSpecialEvent===1}">特殊赛事</div>
            <div class="get-method-item" :class="{['get-method-item-selected']:data.getGrandPrix===1}">大奖赛</div>
            <div class="get-method-item" :class="{['get-method-item-selected']:data.getDriveSyndicate===1}">车联赛事</div>
          </view>
          <view class="contest-empty-list" v-if="!data && loading===false">😮 出错啦！</view>
        </div>



      </div>
    </unicloud-db>

    <view class="contest-db-wrapper">

      <div class="contest-db">
        <unicloud-db class="cdb" ref="contestDB" v-slot:default="{data, pagination, loading, error, options}"
          :options="options" collection="contest" orderby="startTime desc,contestName asc" :getone="false"
          :action="action" :where="where" @load="onqueryload" @error="onqueryerror" manual="true" page-size="5">
          <view class="contest-db-title-block">
            <view class="contest-db-title">关联赛事</view>
            <view class="contest-db-all" @tap="jumpToRelatedEvents" v-if="data.length>0 && loading===false">查看所有 >
            </view>
          </view>
          <view v-if="error" class="error">{{error.message}}</view>
          <view v-else class="contest-list">
            <contest-item :contest="contest" v-for="(contest, index) in data" :key="contest._id" class="contest-item"
              :now="options.now" :index="index" />
          </view>
          <view class="loading" v-if="loading">
            <!-- <loading /> -->
          </view>
          <view class="contest-empty-list" v-if="data.length===0 && loading===false">😮 还没有赛事记录</view>
        </unicloud-db>
      </div>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    // mapMutations
  } from 'vuex'
  import contestItem from '../../contest/components/contestItem.vue'
  import loading from '@/components/loading/loading.vue'
  import topBar from '@/components/topBar/topBar.vue'

  import carArchivesField from './carArchivesField.js'

  const db = uniCloud.database()
  const dbCmd = db.command
  export default {
    components: {
      'contest-item': contestItem,
      'loading': loading,
      'top-bar': topBar,
    },
    data() {
      return {
        now: new Date().getTime(),
        car_id: '',
        fullName: '',
        carArchivesField,
      }
    },
    computed: {
      ...mapState(['server']),
      where() {
        return {
          featuredCars: dbCmd.all([this.car_id]),
          server: this.server
        }
      },
      whereGetMethod() {
        return `car_id=='${this.car_id}'`
      },
      options() {
        return {
          now: this.now
        }
      },
      carListCollection() {
        return this.server === 'al' ? 'carListAL' : 'carList'
      }
    },
    onLoad({
      car_id,
      fullName
    }) {
      console.log(car_id,fullName)
      this.fullName = fullName
      this.car_id = car_id
      // db.collection('contest').where({
      //     featuredCars: dbCmd.all(['sian'])
      //   })
      //   .get()
      //   .then(res => {
      //     console.log(res)
      //   })
    },
    methods: {

      //数值千位符
      split3: function(value) {
        var s = value.toString()
        var res = []
        for (var i = 0; i < s.length; i++) {
          res.push(s[s.length - i - 1])
          if (i < s.length - 1 && (i + 1) % 3 === 0) {
            res.push(',')
          }

        }
        return res.reverse().join('')
      },
      onqueryload(data) {
        // uni.hideLoading()
        console.log(data)
      },
      onqueryerror() {
        // uni.hideLoading()
      },
      jumpToRelatedEvents() {
        uni.navigateTo({
          url: `./relatedEvents/relatedEvents?car_id=${this.car_id}`
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../contest/contest-list.scss';

  .contest-db-title-block {
    display: flex;
    align-items: center;
  }

  .contest-db-title {
    font-size: 36rpx;
    font-weight: bold;
    padding: 20rpx;
    padding-bottom: 10rpx;
    color: $theme-color;

    @include pad-devices {
      font-size: toPadPx(36);
      padding: toPadPx(20);
      padding-bottom: toPadPx(10);
    }
  }

  .contest-db-all {
    margin-left: auto;
    font-size: 32rpx;
    color: #22a3df;
    padding: 20rpx;

    @include pad-devices {
      font-size: toPadPx(32);
      padding: toPadPx(20);
    }
  }

  .contest-db-wrapper {
    margin: 0 auto;
    max-width: 768px;
  }

  .contest-db {
    padding: 0;
    // box-sizing: border-box;
    margin: 20rpx;
    background-color: $card-bg-color;

    @media (prefers-color-scheme: dark) {
      background-color: $card-bg-color-dark;
    }

    border-radius: 10rpx;

    @include pad-devices {
      margin: toPadPx(20);
      border-radius: toPadPx(10);
    }
  }

  .contest-empty-list,
  .loading {
    padding-bottom: 40rpx;

    @include pad-devices {
      padding-bottom: toPadPx(40);
    }
  }

  .get-method-block,
  .attr-list {
    display: grid;
    padding: 20rpx;
    grid-template-columns: repeat(3, 33.33%);
    grid-row-gap: 20rpx;

    @include pad-devices {
      grid-template-columns: repeat(4, 25%);
      padding: toPadPx(20);
      grid-row-gap: toPadPx(20);
    }
  }

  .get-method-item,
  .attr-item {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-tip-color);
  }

  .get-method-item-selected,
  .attr-item-selected {
    color: #41b90a;
    font-weight: bold;
  }

  .get-method-item-selected:after,
  .attr-item-selected:after {
    content: "✅";
    padding-left: 6rpx;

    @include pad-devices {
      padding-left: toPadPx(6);
    }
  }
  .detail-row-list{
    padding: 20rpx 0;
  }
  .detail-row{
    padding: 0 20rpx;
    display: flex;
    justify-content: space-between;
  }
  .detail-row+.detail-row{
    margin-top: 15rpx;
  }
  .divider{
    background-color: var(--divider-color);
    height: 2px;
  }
  .attr-row{
    color:var(--text-tip-color);
  }
  .attr-enable{
    color:var(--text-p-color);
  }
</style>
