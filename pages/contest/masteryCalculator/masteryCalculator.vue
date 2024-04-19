<template>
  <view class="page">
    <view class="top-fixed-wrapper">

      <top-bar title="大师计算器" :showBack="true" />
    </view>
    <view>
      <div class="card">施工中，请坐和放宽！</div>
      <div class="card" v-for="(chapter,index) in masteryData.chapters">
        <div class="chapter-car-name">
          {{masteryInfo.toolCarMap[chapter.targetCarId].fullName}}
        </div>
        <div class="chapter-car-info stars-and-rank">
          <div class="stars">
            <image class="star-icon" v-for="(item,index) in masteryInfo.toolCarMap[chapter.targetCarId].star"
              :key="index" src="@/static/carcard-icons/star.png" />

          </div>
          <div class="rank" style="margin-left: auto;">{{masteryInfo.toolCarMap[chapter.targetCarId].rank}}</div>
          <div class="car-class">{{masteryInfo.toolCarMap[chapter.targetCarId].carClass}}</div>
        </div>
        <div class="chapter-info" style="display: flex;gap:1em;align-items: center;">
          <div style="min-width:2em;">#{{index+1}}</div>
          <div style="min-width:6em;">进度：0/{{chapterMissionsCount.list[index]}}</div>
          <div style="flex:1;background-color:#f7ecf9;height: 0.75em;border-radius: 1em;border:1px solid #f2aff4;">
            <div style="height: 100%; background-color:  #f2aff4;border-radius: 1em;" :style="{'width':'62%'}"></div>
          </div>
        </div>
        <div class="chapter-mission-list">
          <div class="chatper-mission" v-for="mission in chapter.missions" >
            <div class="mission-car-info" style="display: flex;align-items: center;">
              <div>{{masteryInfo.toolCarMap[mission.toolCarId].shortName}}</div>
              <div class="mastery-car-tag" v-if="masterySet.has(mission.toolCarId)" style="font-size: 0.75em;margin-left: 0.75em;">大师车</div>
            </div>
            <div class="rank-select-list">
              <div class="rank-select-item" :class="{'rank-select-item-highlight':!form[mission.toolCarId].unlock}"
                @click="clearFormCar(mission.toolCarId)">
                {{masteryInfo.toolCarMap[mission.toolCarId].isKeyCar?'没钥匙':'未解锁'}}
              </div>
              <div class="rank-select-item" v-for="rank in rankLimitMap[mission.toolCarId]"
                :class="{'rank-select-item-highlight':form[mission.toolCarId].unlock&&form[mission.toolCarId].rank>=rank}"
                @click="setFormCarRank(mission.toolCarId,rank)">{{rank}}</div>
            </div>
          </div>

        </div>
      </div>
    </view>
  </view>
</template>

<script>
  import topBar from '@/components/topBar/topBar.vue'
  import fakeData from './fakeData'

  const db = uniCloud.database()
  export default {
    components: {
      topBar,
    },
    data() {
      return {
        masteryData: {

          toolCars: [],
          notes: [],
          processRewards: [],
          chapters: [],
        },
        form: {},
      }
    },
    computed: {
      masteryInfo({
        masteryData
      }) {
        const toolCarMap = {}
        for (let car of masteryData.toolCars) {
          toolCarMap[car.car_id] = car
        }
        return {
          toolCarMap
        }
      },
      rankLimitMap({
        masteryData
      }) {

        const carMissionMap = {}

        for (let chapter of masteryData.chapters) {
          for (let mission of chapter.missions) {
            if (carMissionMap[mission.toolCarId]) {
              carMissionMap[mission.toolCarId] = [...carMissionMap[mission.toolCarId], ...mission.rankList]

            } else {
              carMissionMap[mission.toolCarId] = [...mission.rankList]

            }
          }
        }
        for (let key of Object.keys(carMissionMap)) {
          carMissionMap[key] = Array.from(new Set(carMissionMap[key])).sort((a, b) => a - b)
        }
        console.log(carMissionMap)
        return carMissionMap
      },
      chapterMissionsCount({
        masteryData
      }) {
        const list = masteryData.chapters.map(chapter => chapter.missions.reduce((res, curr) => res + curr.rankList
          .length, 0))
        const total = list.reduce((res, curr) => res + curr, 0)
        return {
          list,
          total
        }
      },
      masterySet({
        masteryData
      }) {
        const set = new Set()
        for (let chapter of masteryData.chapters) {
          set.add(chapter.targetCarId)
        }
        return set
      }
    },
    methods: {
      getLocalForm() {
        return uni.getStorage({
          key: 'mastery-' + this._id,
        })
      },
      initForm: async function() {
        uni.showLoading()
        const masteryData = await this.getSpecialEventData()
        this.resetForm(masteryData)
        this.getLocalForm().then(([err, res]) => {
          if (err) {} else {
            let form = res.data

            for (let e of Object.entries(form)) {
              this.form[e[0].car_id].rank = e[1].rank
              this.form[e[0].car_id].unlock = !!e[1].unlock
            }
          }
        })
        this.masteryData = masteryData

        uni.hideLoading()
      },
      getSpecialEventData: async function() {
        const res = await db.collection('contest').where({
          '_id': this._id
        }).get()
        if (res.result.data.length) {
          this.contestName = res.result.data[0].contestName
          return fakeData
          return res.result.data[0].masteryData
        }
      },
      resetForm(masteryData = this.masteryData) {
        let {
          toolCars
        } = masteryData
        for (let car of toolCars) {
          this.$set(this.form, car.car_id, {
            rank: 0,
            unlock: false,
          })
        }

      },
      getChapterMissionsCount(chapter) {
        return chapter.missions.reduce((res, curr) => res + curr.rankList.length, 0)
      },
      clearFormCar(car_id) {
        this.form[car_id] = {
          rank: 0,
          unlock: false,
        }
      },
      setFormCarRank(car_id, rank) {
        // this.$set(this.form[car_id], 'rank', rank)
        // this.$set(this.form[car_id], 'unlock', true)
        this.form[car_id].rank=rank
        this.form[car_id].unlock=true
        console.log(this.form[car_id])
      }

    },
    onLoad({
      _id
    }) {
      console.log(_id)
      this._id = _id
      this.initForm()
    },
    created() {

    }

  }
</script>

<style lang="scss">
  .top-fixed-wrapper {
    z-index: 114514;
    position: sticky;
    top: 0;
  }

  .page {
    font-size:28rpx;
    padding-bottom: 20rpx;

    @include pad-devices {
      padding-bottom: toPadPx(20);
    font-size:toPadPx(28);
    }

  }

  .card {
    margin: 20rpx;
    padding: 20rpx;
    border-radius: 10rpx;
    background-color: var(--card-bg-color);

    @include pad-devices {
      margin: toPadPx(20);
      padding: toPadPx(20);
      border-radius: toPadPx(10);
      max-width: 768px;
      margin-left: auto;
      margin-right: auto;
    }

    &-title {
      color: var(--theme-color);
      font-size: 38rpx;
      font-weight: bold;
      padding-bottom: 20rpx;

      @include pad-devices {
        font-size: toPadPx(38);
        padding-bottom: toPadPx(20);
      }
    }
  }

  .stars-and-rank {
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
    // justify-content: space-between;

    @include pad-devices {
      margin-bottom: toPadPx(10);
    }
  }

  .star-icon {
    width: 32rpx;
    height: 32rpx;

    @include pad-devices {
      width: toPadPx(32);
      height: toPadPx(32);
    }
  }


  .car-class {
    color: $text-p-color;
    font-size: 30rpx;
    font-weight: bold;
    padding: 2rpx 6rpx;
    margin-left: 10rpx;

    @include pad-devices {
      padding: toPadPx(2) toPadPx(6);
      margin-left: toPadPx(10);
      font-size: toPadPx(30);
    }

    @media (prefers-color-scheme: dark) {
      color: $text-p-color-dark;
    }
  }

  .rank,
  .rank-over {
    font-size: 30rpx;
    border-radius: 8rpx;
    margin-left: 10rpx;
    color: #ffc107;
    font-weight: bold;

    @include pad-devices {
      font-size: toPadPx(30);
      border-radius: toPadPx(8);
      margin-left: toPadPx(10);
    }
  }


  .rank-select-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(4em, 1fr));
    gap:1px;
  }

  .rank-select-item {
    background-color: #ecf9ec;
    text-align: center;
    padding: 0.25em 0;

    &-highlight {
      background-color: #b7f0b7;
    }
  }
  
  .mastery-car-tag{
    background-color: #f9ecec;
    color:#ff0054;
    border-radius: 0.25em;
    padding:0.25em;
  }
  .rank-select-list{
    margin-top: 0.25em;
  }
  .chatper-mission{
    &+&{
      margin-top: 0.5em;
    }
  }
</style>