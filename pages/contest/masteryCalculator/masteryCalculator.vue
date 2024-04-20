<template>
  <view class="page">
    <view class="top-fixed-wrapper">

      <top-bar :title="`大师计算器 - 当前进度 ${userProgress.total} / ${chapterMissionsCount.total}`" :showBack="true" />
    </view>
    <view>
      <div class="card">施工中，请坐和放宽！</div>
      <div class="panel-group-calc">
        <div>
          <div class="action-list">
            <div class="action" @click="showPanel=false">隐藏计算</div>
            <div class="action" @click="showPanel=true">打开计算</div>
            <div class="action" @click="onActionClear">清空车库</div>
            <div class="action" @click="onActionFull">拉满车库</div>
          </div>
          <div class="card">
            <div>工具车速查</div>
            <div class="panel-tool-car-list">

              <div class="panel-tool-car-item" v-for="(car, carIndex) in masteryData.toolCars">
                <div class="mission-car-info" style="display: flex;align-items: center;">
                  <!-- <div class="card-title-number" style="margin-right: 0.5em;">{{carIndex+1}}</div> -->
                  <div @click="toCarArchives(car.car_id,car.fullName)">{{carIndex+1}}. {{car.shortName}}</div>
                  <div class="mastery-car-tag" v-if="masterySet.has(car.car_id)"
                    style="font-size: 0.75em;margin-left: 0.75em;">大师车</div>
                  <div class="stars stars-tool-car" style="margin-left: auto;">
                    <image class="star-icon" v-for="(item,index) in car.star" :key="index"
                      src="@/static/carcard-icons/star.png" />

                  </div>
                  <div class="rank">{{car.rank}}</div>
                  <div class="car-class">{{car.carClass}}</div>
                </div>
                <div v-show="showPanel">

                  <div class="rank-select-list">
                    <div class="rank-select-item" :class="{'rank-select-item-highlight':!form[car.car_id].unlock}"
                      @click="clearFormCar(car.car_id)">
                      {{masteryInfo.toolCarMap[car.car_id].isKeyCar?'没钥匙':'未解锁'}}
                    </div>
                    <div class="rank-select-item" v-for="rank in rankLimitMap[car.car_id]"
                      :class="{'rank-select-item-highlight':form[car.car_id].unlock&&form[car.car_id].rank>=rank}"
                      @click="setFormCarRank(car.car_id,rank)">{{rank}}</div>
                  </div>
                  <div class="panel-tool-car-to-chapter-list" style="margin-top: 0.25em;">
                    <div class="panel-tool-car-to-chapter-item" v-for="mission in toolCarChapterMap[car.car_id]">
                      <div style="display:flex;gap:1em">
                        <div>大师{{mission.chapterIndex+1}}</div>
                        <div>{{masteryInfo.toolCarMap[mission.chapter.targetCarId].shortName}}</div>
                        <div>任务
                          {{userProgress.list[mission.chapterIndex].missionList[mission.missionIndex]}}/{{mission.mission.rankList.length}}
                        </div>
                        <div>金卡 16/16</div>

                      </div>
                    </div>

                  </div>
                </div>
                <!--              <div style="display:flex;gap:0.5em;">
                <div>{{carIndex+1}}. </div>
                <div style="width:6em;">{{car.shortName}}</div>
                <div>{{car.rank}}</div>
                <div>{{car.carClass}}</div>
                <div class="mastery-car-tag" v-if="masterySet.has(car.car_id)" style="font-size: 0.75em;">大师车</div>
                <div class="panel-tool-car-mission-list" style="margin-left: auto;">
                  <div class="panel-tool-car-mission-item" v-for="mission in toolCarChapterMap[car.car_id]"
                    style="display: flex;gap:0.5em;">
                    <div>#{{mission.chapterIndex+1}}</div>
                    <div style="width:6em;">{{masteryInfo.toolCarMap[mission.chapter.targetCarId].shortName}}</div>
                  </div>
                </div>
              </div> -->

              </div>
            </div>
          </div>
        </div>
        <div class="chapter-list">

          <div class="card" v-for="(chapter,index) in masteryData.chapters">
            <div class="card-title-group" style="display:flex;align-items:center;">
              <div class="card-title-number" style="margin-right: 0.5em;">{{index+1}}</div>

              <div class="chapter-car-name"
                @click="toCarArchives(chapter.targetCarId,masteryInfo.toolCarMap[chapter.targetCarId].fullName)">
                {{masteryInfo.toolCarMap[chapter.targetCarId].fullName}}
              </div>
            </div>
            <div class="chapter-car-info stars-and-rank" style="margin-top: 0.25em;">
              <div class="stars stars-tool-car">
                <image class="star-icon" v-for="(item,index) in masteryInfo.toolCarMap[chapter.targetCarId].star"
                  :key="index" src="@/static/carcard-icons/star.png" />

              </div>
              <div class="card-title-number" style="margin:0 auto" v-if="chapter.unlockConditions>0">
                🔒{{chapter.unlockConditions}}</div>
              <div class="rank" style="margin-left: auto;">{{masteryInfo.toolCarMap[chapter.targetCarId].rank}}</div>
              <div class="car-class">{{masteryInfo.toolCarMap[chapter.targetCarId].carClass}}</div>
              <!--              <div style="min-width:5em;margin-left: 1em;">进度 0/{{chapterMissionsCount.list[index]}}</div>
              <div style="flex:1;background-color:#f7ecf9;height: 0.75em;border-radius: 1em;border:1px solid #f2aff4;">
                <div style="height: 100%; background-color:  #f2aff4;border-radius: 1em;" :style="{'width':'62%'}">
                </div>
              </div> -->
            </div>
            <div class="chapter-info" style="display: flex;align-items: center;">
              <!-- <div style="min-width:2em;">#{{index+1}}</div> -->
              <!-- <div>前期图纸 2/2</div>
              <div v-if="masteryInfo.toolCarMap[chapter.targetCarId].isKeyCar">全奖钥匙或图纸 {{masteryInfo.toolCarMap[chapter.targetCarId].rewardBP}}</div>
              <div v-else>全奖图纸 {{masteryInfo.toolCarMap[chapter.targetCarId].rewardBP}}</div> -->
              <div v-if="masteryInfo.toolCarMap[chapter.targetCarId].isKeyCar">图纸 🔑+0/8 或 0/53</div>
              <div v-else>图纸 0/53</div>
              <div style="margin-right: 0.5em;margin-left:auto;padding-left: 1.5em;">进度
                0/{{chapterMissionsCount.list[index]}}</div>
              <div
                style="max-width: 9em;flex:1;background-color:#f7ecf9;height: 0.75em;border-radius: 1em;border:1px solid #f2aff4;">
                <div style="height: 100%; background-color:  #f2aff4;border-radius: 1em;" :style="{'width':'62%'}">
                </div>
              </div>
            </div>
            <div class="chapter-mission-list" style="margin-top: 0.25em;">
              <div class="chatper-mission" v-for="mission in chapter.missions">
                <div class="mission-car-info" style="display: flex;align-items: center;">
                  <div @click="toCarArchives(mission.toolCarId,masteryInfo.toolCarMap[mission.toolCarId].fullName)">
                    {{masteryInfo.toolCarMap[mission.toolCarId].shortName}}
                  </div>
                  <div class="mastery-car-tag" v-if="masterySet.has(mission.toolCarId)"
                    style="font-size: 0.75em;margin-left: 0.75em;">大师车</div>
                  <div class="stars stars-tool-car" style="margin-left: auto;">
                    <image class="star-icon" v-for="(item,index) in masteryInfo.toolCarMap[mission.toolCarId].star"
                      :key="index" src="@/static/carcard-icons/star.png" />

                  </div>
                  <div class="rank">{{masteryInfo.toolCarMap[mission.toolCarId].rank}}</div>
                  <div class="car-class">{{masteryInfo.toolCarMap[mission.toolCarId].carClass}}</div>
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
        showPanel: false,
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
      toolCarChapterMap({
        masteryData

      }) {
        const map = {}
        for (let i = 0; i < masteryData.chapters.length; i++) {
          const chapter = masteryData.chapters[i]
          for (let k = 0; k < chapter.missions.length; k++) {
            const mission = chapter.missions[k]
            if (map[mission.toolCarId]) {
              map[mission.toolCarId] = [...map[mission.toolCarId], {
                chapter,
                chapterIndex: i,
                mission,
                missionIndex: k,
              }]

            } else {
              map[mission.toolCarId] = [{
                chapter,
                chapterIndex: i,
                mission,
                missionIndex: k,
              }]

            }
          }
        }
        return map
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
      userProgress({
        masteryData,
        form
      }) {
        let total = 0
        const list = masteryData.chapters.map(chapter => {
          const missionList = new Array(chapter.missions.length).fill(0)
          let missionTotal = 0
          if (total < chapter.unlockConditions) {
            return {
              missionList,
              missionTotal,
            }
          }
          for (let i = 0; i < chapter.missions.length; i++) {
            const mission = chapter.missions[i]
            const userStatus = form[mission.toolCarId] || {
              unlock: false,
              rank: 0,
            }
            if (userStatus.unlock) {
              missionList[i] = mission.rankList.filter(rank => rank <= userStatus.rank).length
              missionTotal += missionList[i]
            }
          }
          total += missionTotal
          return {
            missionList,
            missionTotal,
          }
        })
        // const total = list.reduce((res, curr) => res + curr, 0)
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
          const data = fakeData
          // const data= res.result.data[0].masteryData
          data.toolCars.sort((car1, car2) => {
            const orderClass1 = ['D', 'C', 'B', 'A', 'S', 'R'].findIndex(c => c === car1.carClass) || 0
            const orderClass2 = ['D', 'C', 'B', 'A', 'S', 'R'].findIndex(c => c === car2.carClass) || 0
            return orderClass1 === orderClass2 ? car1.rank - car2.rank : orderClass1 - orderClass2
          })
          return data
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
        this.form[car_id].rank = rank
        this.form[car_id].unlock = true
        console.log(this.form[car_id])
      },
      toCarArchives(car_id, fullName) {
        const url = `/pages/carList/carArchives/carArchives?car_id=${car_id}&fullName=${fullName}`
        uni.navigateTo({
          url
        })
      },
      fullForm() {
        for (let key of Object.keys(this.form)) {
          this.form[key].unlock = true
          this.form[key].rank = 10000
        }
      },

      onActionClear: async function() {
        const [err, res] = await uni.showModal({
          title: '确认清空车库',
          content: '将移除所有车辆'
        })
        if (res.confirm) {

          this.resetForm()
          // this.setLocalForm()
        }
      },
      onActionFull: async function() {
        const [err, res] = await uni.showModal({
          title: '确认拉满车库',
          content: '将拉满所有车辆'
        })
        if (res.confirm) {

          this.fullForm()
          // this.setLocalForm()
        }
      },

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
    font-size: 28rpx;
    padding-bottom: 20rpx;

    @include pad-devices {
      padding-bottom: toPadPx(20);
      font-size: toPadPx(28);
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
    width: 28rpx;
    height: 28rpx;

    @include pad-devices {
      width: toPadPx(28);
      height: toPadPx(28);
    }
  }

  .stars-tool-car {
    width: 170rpx;

    @include pad-devices {
      width: toPadPx(170);
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
    gap: 1px;
  }

  .rank-select-item {
    background-color: #ecf9ec;
    text-align: center;
    padding: 0.25em 0;

    &-highlight {
      background-color: #b7f0b7;
    }
  }

  .mastery-car-tag {
    background-color: #f9ecec;
    color: #ff0054;
    border-radius: 0.25em;
    padding: 0.25em 0.5em;
  }

  .card-title-number {
    background-color: #f7ecf9;
    color: #d800ff;
    font-size: 26rpx;
    border-radius: 0.25em;
    padding: 0.25em 0.5em;

    @include pad-devices {
      font-size: toPadPx(26);
    }

  }

  .rank-select-list {
    margin-top: 0.25em;
  }

  .chatper-mission {
    &+& {
      margin-top: 0.75em;
    }
  }
  
  .panel-tool-car-item{
    &+& {
      margin-top: 0.75em;
    }
    
  }

  .panel-group-calc {
    max-width: 960px;
    margin: 0 auto;

    @media(min-width:960px) {
      display: grid;
      grid-template-columns: 475px 475px;



      justify-content: space-between;
    }
  }

  .action-list {
    display: flex;
    margin: 20rpx;

    @include pad-devices {
      max-width: 768px;
      margin: toPadPx(20);
      margin-left: auto;
      margin-right: auto;
    }
  }

  .action {
    flex: 1;
    background-color: #23bbfa;
    color: #fff;
    text-align: center;
    line-height: 2.5;
    border-radius: 10rpx;

    @include pad-devices {
      border-radius: toPadPx(10);
    }

    @media (prefers-color-scheme: dark) {
      background-color: var(--card-bg-color);
      color: #23bbfa;
    }

    &+& {
      margin-left: 20rpx;

      @include pad-devices {
        margin-left: toPadPx(20);
      }
    }
  }
</style>