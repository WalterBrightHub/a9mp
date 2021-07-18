<template>
  <view>
    <!--    <view class="context features-context">
      <view class="context-card">
        <view class="card-title">
          获取方式
        </view>
        <view class="card-item-block">
          <view class="card-item-title">蓝喷</view>
        </view>
      </view>
    </view> -->
    <top-bar :showBack="true" :title="'车辆档案'" />

    <view class="contest-db-wrapper">

      <div class="contest-db">
        <unicloud-db class="cdb" ref="contestDB" v-slot:default="{data, pagination, loading, error, options}"
          :options="options" collection="contest" orderby="startTime desc,contestName asc" :getone="false"
          :action="action" :where="where" @load="onqueryload" @error="onqueryerror" manual="true" page-size="5">
          <view class="contest-db-title-block">
            <view class="contest-db-title">关联赛事</view>
            <view class="contest-db-all" @tap="jumpToRelatedEvents">查看所有 ></view>
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
        car_id: '&&&'
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
      options() {
        return {
          now: this.now
        }
      },
    },
    onLoad({
      car_id
    }) {
      // console.log(car_id)
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

      onqueryload() {
        // uni.hideLoading()
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
    color: $theme-color;

    @include pad-devices {
      font-size: toPadPx(36);
      padding: toPadPx(20);
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
</style>
