<template>
  <view>
    <div class="top-fixed-wrapper">

      <top-bar :showBack="true" :showServerToggle="true" title="车辆搜索" />
      <div class="input-wrapper">
        <div class="input-wrapper-in">

          <input class="input" type="text" :value="searchWord" @input="onInput" placeholder="请输入车名 / 昵称 / 外号 / 关键词">
          <div class="clear" @tap="onClear">清空</div>
        </div>
      </div>
    </div>
    <div class="content">

      <unicloud-db class="cardb" ref="carListDB" v-slot:default="{data, pagination, loading, error, options}"
        :options="options" :field="carSearchField" :collection="collection" :orderby="'_id'" :where="where"
        @load="onqueryload" @error="onqueryerror" :page-size="479">
        <view class="loading" v-if="loading">
          <loading />
        </view>
        <view v-else-if="error" class="error">{{error.message}}</view>
        <view v-else-if="data.length===0" class=" car-empty-list">
          😮 再怎么找也没有啦
        </view>
        <view v-else-if="data.length>0" class=" car-card-list">
          <view class="car-card-wrap" v-for="(carData,index) in data" :key="carData._id"
            @tap="jumpToArchives(carData.car_id,carData.fullName)">
            <view class="car-class" :class="'car-bp-'+carData.quality">{{carData.carClass}}</view>
            <view class="full-name">{{carData.fullName}}</view>
          </view>
        </view>

      </unicloud-db>
    </div>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import _ from 'lodash'
  import topBar from '@/components/topBar/topBar.vue'
  import loading from '@/components/loading/loading.vue'
  export default {
    components: {

      'top-bar': topBar,
      'loading': loading
    },
    data() {
      return {
        searchWord: '',
        carSearchField: ['fullName', 'carClass', 'quality', 'car_id', 'keyWords']
      };
    },
    computed: {
      ...mapState(['server']),
      collection() {
        return this.server === 'gl' ? 'carList' : 'carListAL'
      },
      where() {
        // 公共数据随便查，如果是非公共数据，要用云函数做转义
        let exp = RegExp(_.escapeRegExp(this.searchWord)).toString()
        // exp=this.searchWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        return `releaseVersion!="0.0"&&(${exp}i.test(fullName)||${exp}i.test(nickName)||${exp}i.test(keyWords))`
      }
    },
    onPullDownRefresh() {
      this.$refs.carListDB.loadData({
        clear: true
      }, () => {
        uni.showToast({
          title: '最新',
          duration: 500
        })
        uni.stopPullDownRefresh()
      })
    },
    onShareAppMessage() {
      return {
        title: `狂飙小助手`,
      }
    },
    methods: {
      onqueryload(data) {
        // console.log(data)
      },
      onqueryerror(e) {
        console.log(e)
      },
      onInput(event) {
        this.searchWord = event.detail.value
      },
      onClear() {
        this.searchWord = ''
      },
      jumpToArchives(car_id, fullName) {
        const url = `/pages/carList/carArchives/carArchives?car_id=${car_id}&fullName=${fullName}`

        uni.navigateTo({
          url
        })
      }
    }
  }
</script>

<style lang="scss">
  .top-fixed-wrapper {

    position: sticky;
    top: 0;
    z-index: 114514;
  }

  .input-wrapper {

    background-color: var(--card-bg-color);
    padding: 20rpx;

    @include pad-devices {
      padding: toPadPx(20);

    }
  }

  .input-wrapper-in {

    max-width: calc(768px - 40px);
    margin: 0 auto;
    display: flex;
    align-items: center;
    background-color: var(--page-bg-color);
    border-radius: 10rpx;

    @include pad-devices {
      border-radius: toPadPx(10);
    }
  }

  .input {
    padding: 20rpx;
    flex: 1;

    @include pad-devices {
      padding: toPadPx(20);
    }
  }

  .clear {
    padding: 0 20rpx;
    color: var(--theme-color);

    @include pad-devices {
      padding: 0 toPadPx(20);
    }
  }

  .car-card-list {
    max-width: calc(768px - 40px);
    margin: 20rpx auto 30rpx auto;
    padding: 20rpx;
    background-color: var(--card-bg-color);

    @include pad-devices {
      padding: toPadPx(20);
      margin: toPadPx(20) auto toPadPx(30) auto;
    }
  }


  .car-card-wrap {
    display: flex;
    margin: 24rpx 0;

    @include pad-devices {
      margin: toPadPx(24) 0;
    }
  }

  .car-class {
    background-color: #22a3df;
    color: #fff;
    border-radius: 5rpx;
    width: 36rpx;
    height: 36rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10rpx;

    @media (prefers-color-scheme: dark) {

      color: #000;

    }

    @include pad-devices {
      // border-radius: toPadPx(10);
      width: toPadPx(36);
      height: toPadPx(36);
      margin-left: toPadPx(10);
      border-radius: toPadPx(5);

    }
  }

  .car-bp-epic {
    background-color: #ffc107;
  }

  .car-bp-rare {
    background-color: #cc52ea;
  }

  .car-empty-list {
    margin-top: 40rpx;
    display: flex;
    justify-content: center;

    @include pad-devices {
      margin-top: toPadPx(40);
    }
  }

  .loading {
    margin-top: 40rpx;

    @include pad-devices {
      margin-top: toPadPx(40);
    }
  }
</style>
