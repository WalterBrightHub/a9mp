<template>
  <view class="page">
    <view class="top-fixed-wrapper">

      <top-bar title="特赛计算器" :showBack="true" />
    </view>

    <div class="card">
      <div class="card-title contest-name">{{contestName}}</div>
    </div>

    <div class="action-list">
      <div class="action" @click="onActionClear">清空车库</div>
      <div class="action" @click="onActionFull">拉满车库</div>
    </div>

    <div class="form card">
      <div class="card-title">我的车库</div>
      <div class="form-item" v-for="(toolCar,toolCarIndex) in specialEventData.toolCars" :key="toolCar.car_id">
        <div class="form-item-car-name-and-link" @click="toCarArchives(toolCar.car_id,toolCar.fullName)">
          <div class="form-item-car-name">{{toolCar.fullName}}</div>
          <div class="form-item-link">查看卡片</div>
        </div>
        <!-- <div class="form-item-get-method">获取方式：<span class="form-item-get-method-text">{{toolCar.getMethod}}</span>
        </div> -->
        <div class="form-item-star">
          <image class="form-item-star-image"
            :class="{'form-item-star-image-disable':form[toolCarIndex].star<=starIndex}"
            src="@/static/carcard-icons/star.png" v-for="(star,starIndex) in toolCar.star" :key="starIndex"
            @click="onFormClickStar(toolCarIndex,starIndex)"></image>
        </div>
        <div class="form-item-lock-state">
          <div class="form-radio lock-radio" :class="{'form-radio-checked':!form[toolCarIndex].unlock}"
            @click="onFormClickLock(toolCarIndex)">
            <div class="form-radio-label">{{form[toolCarIndex].unlock?'':'✔'}}</div>
            <div class="form-radio-text">未解锁</div>
          </div>
          <div class="form-radio lock-radio" :class="{'form-radio-checked':form[toolCarIndex].unlock}"
            @click="onFormClickUnlock(toolCarIndex)">
            <div class="form-radio-label">{{form[toolCarIndex].unlock?'✔':''}}</div>
            <div class="form-radio-text">已解锁</div>
          </div>
          <div class="form-radio lock-radio" :class="{'form-radio-checked':form[toolCarIndex].rank>=rankLimit}"
            @click="onFormClickRank(toolCarIndex,rankLimit)"
            v-for="(rankLimit,rankLimitIndex) in specialEventData.toolCars[toolCarIndex].rankLimits"
            :key="rankLimitIndex">
            <div class="form-radio-label">{{form[toolCarIndex].rank>=rankLimit?'✔':''}}</div>
            <div class="form-radio-text">{{rankLimit}}分</div>
          </div>
        </div>
      </div>
    </div>

    <div class="user-reword-module card">
      <div class="card-title">我的奖励</div>
      <div class="user-reword-list">
        <div class="user-reword">
          <div class="user-reword-type">图纸</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-golden':userTotalRewords.seCard>0}">{{userTotalRewords.seCard}}</span>/{{totalRewords.seCard}}
          </div>
        </div>
        <div class="user-reword">
          <div class="user-reword-type">进度</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-pack':userConditions>0}">{{userConditions}}</span>/{{totalConditions}}</div>
        </div>
        <div class="user-reword" v-if="specialEventData.haveEventKey">
          <div class="user-reword-type">钥匙</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-golden':userTotalRewords.seKey>0}">{{userTotalRewords.seKey}}</span>/{{totalRewords.seKey}}
          </div>
        </div>
        <div class="user-reword">
          <div class="user-reword-type">金卡</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-golden':userTotalRewords.sePart>0}">{{userTotalRewords.sePart}}</span>/{{totalRewords.sePart}}
          </div>
        </div>
        <div class="user-reword" v-if="specialEventData.haveSkin">
          <div class="user-reword-type">贴纸</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-skin':userTotalRewords.seSkin>0}">{{userTotalRewords.seSkin}}</span>/{{totalRewords.seSkin}}
          </div>
        </div>
        <div class="user-reword" v-if="progressKeyConditions>0">
          <div class="user-reword-type">钥匙条件</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-pack':userConditions>0}">{{userConditions}}</span>/{{progressKeyConditions}}</div>
        </div>
        <div class="user-reword" v-if="progressSkinConditions>0">
          <div class="user-reword-type">贴纸条件</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-pack':userConditions>0}">{{userConditions}}</span>/{{progressSkinConditions}}</div>
        </div>
        <div class="user-reword" v-if="specialEventData.havePack">
          <div class="user-reword-type">图纸包</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-pack':userTotalRewords.sePack>0}">{{userTotalRewords.sePack}}</span>/{{totalRewords.sePack}}
          </div>
        </div>
        <div class="user-reword" v-if="specialEventData.havePackConditions">
          <div class="user-reword-type">商店包条件</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-pack':userConditions>0}">{{userConditions}}</span>/{{specialEventData.packConditions}}</div>
        </div>
        <div class="user-reword">
          <div class="user-reword-type">蓝币</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-token':userTotalRewords.token>0}">{{userTotalRewords.token}}</span>/{{totalRewords.token}}
          </div>
        </div>
        <div class="user-reword" v-if="totalRewords.seasonToken>0">
          <div class="user-reword-type">绿币</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-season-token':userTotalRewords.seasonToken>0}">{{userTotalRewords.seasonToken}}</span>/{{totalRewords.seasonToken}}
          </div>
        </div>
        <div class="user-reword">
          <div class="user-reword-type">金币</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-golden':userTotalRewords.credit>0}">{{toNumber10K(userTotalRewords.credit)}}</span>/{{toNumber10K(totalRewords.credit)}}
          </div>
        </div>
      </div>
    </div>

    <div class="user-process-module card">
      <div class="card-title">我的进度</div>
      <div class="user-process-list">
        <div class="user-process-header">
          <div>阶段</div>
          <div>解锁</div>
          <div>主工具车</div>
          <div>条件</div>
          <div>累计条件</div>
        </div>
        <div class="user-process" v-for="(userStage,index) in userStages.userStageRewords" :key="index"
          @click="openUserStageModal(index)">
          <div>{{index+1}}</div>
          <div class="form-radio lock-radio" :class="{'form-radio-checked':userStage.unlock}">
            <div class="form-radio-label">{{userStage.unlock?'✔':''}}</div>
            <div class="form-radio-text">{{specialEventData.stages[index].unlockConditions}}</div>
          </div>
          <div>{{userCars[specialEventData.stages[index].missions[0].toolCars[0].car_id].nickName}}</div>
          <div class="user-process-conditions">
            <div>{{userProcessConditions[index]}}/{{processConditions[index]}}</div>
            <div>
              <condition-bar class="condition-bar" :rate="userProcessConditions[index]/(processConditions[index]||1)">
              </condition-bar>
            </div>
          </div>
          <div>{{userProcessConditionsSum[index]}}/{{processConditionsSum[index]}}</div>
        </div>
      </div>
    </div>

    <div class="card" v-if="specialEventData.dataTableImage">
      <div class="card-title">
        数据表格
      </div>
      <image class="data-table-image" :src="specialEventData.dataTableImage" mode="widthFix"
        @click="previewDataTableImage"></image>
    </div>

    <div class="card">
      <div class="card-title">说明</div>
      <div class="note-list">
        <div class="note" v-for="(note,index) in specialEventData.notes" :key="index">{{note}}</div>
        <div class="note-divider"></div>
        <div class="note">本工具使用方法：点击“我的车库”中的星星和选项定制车库，可以得到特殊赛事的结果。</div>
        <div class="note">点击“我的进度”中的任意一行，可以查看每一阶段的具体情况。</div>
        <div class="note">本工具只计算特殊赛事中可获得的奖励,<span
            style="font-weight: bold;color:#ff0054;">【包括关卡的个人奖励、关卡的俱乐部奖励、特殊赛事的进度奖励】</span>。车手们可以自行寻找特赛村落获得关卡的俱乐部奖励。一般地，你还可以在多人赛事、俱乐部赛季、充值赛事、传奇通行证、商店礼包、VIP奖励等途径获得奖励。因此，你应该手动勾选特赛车辆的星级、钥匙等选项。
        </div>
        <div class="note">本工具仅供参考，并非满足车辆条件就一定能完成可完成的任务。实际奖励以游戏内为准。数据如有错误之处可联系小助手龟速修复。</div>
      </div>
    </div>

    <div class="user-stage-modal" v-show="showUserStageModal">
      <div class="user-stage-modal-mask" @touchmove.stop @click="showUserStageModal=false"></div>
      <div class="user-stage-modal-context">
        <div class="user-stage-modal-title card-title">第 {{userStageClickIndex+1}} 阶段要求</div>
        <div class="user-stage-info-list">
          <div class="user-stage-info-header">
            <div>工具车</div>
            <div>试驾</div>
            <div>星级</div>
            <div>性能分</div>
            <div>我的</div>
          </div>
          <div class="user-stage-info" v-for=" (info,index) in userStageInfo" :key="index">
            <div>{{info.carNickNames.join(',')}}</div>
            <div>{{info.freeTry||'/'}}</div>
            <div>{{info.star||'/'}}</div>
            <div>{{info.rank>0?info.rank:'/'}}</div>
            <div class="form-radio lock-radio" :class="{'form-radio-checked':info.canJoin}">
              <div class="form-radio-label">{{info.canJoin?'✔':'✘'}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
  import topBar from '@/components/topBar/topBar.vue'
  // import specialEventData from './fakeData.js'
  import conditionBar from './conditionBar.vue'
  const db = uniCloud.database()
  const canJoin = (join, userCar) => join.rank <= userCar.rank &&
    (userCar.freeTry ?
      (join.star <= (userCar.star || 1)) :
      (userCar.unlock && join.star <= userCar.star)
    )

  const combineRewords = (r1, r2) =>
    Object.keys(r1).reduce((res, curr) => ({
      ...res,
      [curr]: r1[curr] + r2[curr]
    }), {})

  const getEmptyReword = () => ({
    token: 0,
    seasonToken: 0,
    credit: 0,
    seCard: 0,
    seSkin: 0,
    sePack: 0,
    seKey: 0,
    sePart: 0,
  })

  export default {
    components: {
      topBar,
      conditionBar,
    },
    data() {
      return {
        _id: '',
        contestName: ' ',
        showUserStageModal: false,
        specialEventData: {
          "havePack": true,
          "haveClubRewords": true,
          "haveSkin": true,
          "havePackConditions": true,
          "haveTokenPack": false,
          "haveEventKey": true,
          "packConditions": 0,
          "dataTableImage": "",
          "toolCars": [],
          "notes": [],
          "processRewords": [],
          "stages": []
        },
        form: [

        ],
        userStageInfo: [],
        userStageClickIndex: 0,
      };
    },
    computed: {
      progressKeyConditions({
        specialEventData
      }) {
        const {
          processRewords
        } = specialEventData
        const reword = processRewords.find(r => r.reword.type === 'seKey')
        if (!reword) {
          return 0;
        } else {
          return reword.conditions
        }

      },
      progressSkinConditions({
        specialEventData
      }) {
        const {
          processRewords
        } = specialEventData
        const reword = processRewords.find(r => r.reword.type === 'seSkin')
        if (!reword) {
          return 0;
        } else {
          return reword.conditions
        }

      },
      processConditions({
        specialEventData
      }) {
        let res = specialEventData.stages.map(({
          missions
        }) => missions.reduce((m1, m2) => m1 + m2.conditions, 0))
        return res
      },
      processConditionsSum({
        processConditions
      }) {
        return processConditions.reduce((c1, c2) => c1.concat((c1[c1.length - 1] || 0) + c2), [])
      },
      totalConditions({
        processConditionsSum
      }) {
        return processConditionsSum[processConditionsSum.length - 1]
      },
      userProcessConditionsSum({
        userProcessConditions
      }) {
        return userProcessConditions.reduce((c1, c2) => c1.concat((c1[c1.length - 1] || 0) + c2), [])
      },
      seCar({
        specialEventData: {
          toolCars
        }
      }) {
        return toolCars[toolCars.length - 1]
      },
      userCars({
        form
      }) {
        return form.reduce((res, {
          unlock,
          star,
          rank,
          car_id,
          nickName
        }) => ({
          ...res,
          [car_id]: {
            unlock,
            star,
            rank,
            nickName
          }
        }), {})
      },
      userStages({
        specialEventData,
        userCars
      }) {
        const {
          stages,
          processRewords
        } = specialEventData
        let userStageRewords = stages.map(stage => ({
          unlock: false,
          rewords: getEmptyReword()
        }))
        let userProcessRewords = getEmptyReword()

        let userProcessConditions = new Array(stages.length).fill(0)

        let userConditions = 0
        let currStageIndex = 0
        // 计算每个阶段的奖励
        while (currStageIndex < stages.length && userConditions >= stages[currStageIndex].unlockConditions) {
          userStageRewords[currStageIndex].unlock = true
          for (let mission of stages[currStageIndex].missions) {
            const {
              join,
              conditions,
              rewords
            } = mission
            const userCarList = mission.toolCars.map(({
              car_id,
              freeTry
            }) => ({
              ...userCars[car_id],
              freeTry
            }))
            if (userCarList.some(userCar => canJoin(join, userCar))) {
              userProcessConditions[currStageIndex] += conditions
              userConditions += conditions
              for (let {
                  type,
                  count
                }
                of rewords) {
                userStageRewords[currStageIndex].rewords[type] += count
              }
            }
          }
          currStageIndex++
        }

        // 计算进度奖励

        for (let {
            conditions,
            reword
          }
          of processRewords) {
          if (conditions <= userConditions) {
            userProcessRewords[reword.type] += reword.count
          }
        }

        const result = {
          userStageRewords,
          userConditions,
          userProcessRewords,
          userProcessConditions,
        }

        return result
      },
      userProcessConditions({
        userStages: {
          userProcessConditions
        }
      }) {
        return userProcessConditions
      },
      userConditions({
        userStages: {
          userConditions
        }
      }) {
        return userConditions
      },
      userClubRewords({
        specialEventData,
      }) {
        const {
          stages,
          processRewords
        } = specialEventData
        // 计算俱乐部奖励，全部白嫖
        let userClubRewords = getEmptyReword()
        for (let reword of stages.reduce((res, curr) => res.concat(curr.clubRewords), [])) {
          userClubRewords[reword.type] += reword.count
        }
        return userClubRewords
      },
      userProcessRewords({
        userStages: {
          userProcessRewords
        }
      }) {
        return userProcessRewords
      },
      userStageRewords({
        userStages: {
          userStageRewords
        }
      }) {
        if (!userStageRewords.length) {
          return getEmptyReword()
        }
        return userStageRewords.map(({
          rewords
        }) => rewords).reduce(combineRewords)
      },
      processTotalRewords({
        specialEventData: {
          processRewords
        }
      }) {
        const processTotalRewords = getEmptyReword()
        for (let {
            reword
          }
          of processRewords) {
          processTotalRewords[reword.type] += reword.count
        }
        return processTotalRewords
      },
      stageTotalRewords({
        specialEventData: {
          stages
        }
      }) {
        const stageTotalRewords = getEmptyReword()
        for (let stage of stages) {
          for (let {
              rewords
            }
            of stage.missions) {
            for (let {
                type,
                count
              }
              of rewords) {
              stageTotalRewords[type] += count
            }
          }
        }
        return stageTotalRewords
      },
      totalRewords({

        userClubRewords,
        processTotalRewords,
        stageTotalRewords,
      }) {
        return [userClubRewords, processTotalRewords, stageTotalRewords].reduce(combineRewords)
      },
      userTotalRewords({
        userClubRewords,
        userProcessRewords,
        userStageRewords,
      }) {
        return [userClubRewords, userProcessRewords, userStageRewords].reduce(combineRewords)
      }
    },
    methods: {
      onActionClear: async function() {
        const [err, res] = await uni.showModal({
          title: '确认清空车库',
          content: '将移除所有车辆'
        })
        if (res.confirm) {

          this.resetForm()
          this.setLocalForm()
        }
      },
      onActionFull: async function() {
        const [err, res] = await uni.showModal({
          title: '确认拉满车库',
          content: '将拉满所有车辆'
        })
        if (res.confirm) {

          this.fullForm()
          this.setLocalForm()
        }
      },
      openUserStageModal(index) {
        this.userStageClickIndex = index
        this.userStageInfo = this.specialEventData.stages[index].missions.map(({
          join,
          toolCars
        }) => {
          let userCarList = toolCars.map(({
            car_id,
            freeTry
          }) => ({
            ...this.userCars[car_id],
            freeTry
          }))
          return {

            canJoin: userCarList.some(userCar => canJoin(join, userCar)),
            carNickNames: userCarList.map(({
              nickName
            }) => nickName),
            freeTry: userCarList.filter(car => car.freeTry).map(({
              nickName
            }) => nickName).join('，'),
            ...join
          }

        })

        this.showUserStageModal = true
      },
      toNumber10K(credit) {
        return Math.floor(credit / 10000) + 'W'
      },
      getLocalForm() {
        return uni.getStorage({
          key: 'sed-' + this._id,
        })
      },
      setLocalForm() {
        uni.setStorage({
          key: 'sed-' + this._id,
          data: this.form.map(({
            car_id,
            unlock,
            star,
            rank
          }) => ({
            car_id,
            unlock,
            star,
            rank
          }))
        })
      },
      resetForm(specialEventData = this.specialEventData) {
        let {
          toolCars
        } = specialEventData
        this.form = toolCars.map(toolCar => ({
          car_id: toolCar.car_id,
          unlock: false,
          star: toolCar.isKeyCar ? 1 : 0,
          rank: 0,
          nickName: toolCar.nickName,
        }))
      },
      initForm: async function() {
        uni.showLoading()
        const specialEventData = await this.getSpecialEventData()
        this.resetForm(specialEventData)
        this.getLocalForm().then(([err, res]) => {
          if (err) {} else {
            let form = res.data
            // car_id可以对应
            if (form.every((car, index) => car.car_id === this.specialEventData.toolCars[index].car_id)) {
              form.forEach(({
                star,
                rank,
                unlock
              }, index) => {
                this.form[index].star = star
                this.form[index].rank = rank
                this.form[index].unlock = unlock
              })
            }
          }
        })
        this.specialEventData = specialEventData

        uni.hideLoading()
      },
      fullForm() {
        let {
          toolCars
        } = this.specialEventData
        // console.log(toolCars, this.form)
        this.form = toolCars.map(({
          star,
          rankLimits,
          car_id,
          nickName
        }) => ({
          unlock: true,
          star,
          rank: (rankLimits[rankLimits.length - 1]) || 10000,
          car_id,
          nickName,
        }))
      },
      onFormClickUnlock(toolCarIndex) {
        this.form[toolCarIndex].unlock = true
        //解锁了，说明至少1星
        this.form[toolCarIndex].star = this.form[toolCarIndex].star || 1
        this.setLocalForm()
      },
      onFormClickLock(toolCarIndex) {
        this.form[toolCarIndex].unlock = false
        //未解锁，钥匙车不变，普通车是0星
        if (!this.specialEventData.toolCars[toolCarIndex].isKeyCar) {

          this.form[toolCarIndex].star = 0
        }
        this.setLocalForm()
      },
      onFormClickStar(toolCarIndex, starIndex) {
        this.form[toolCarIndex].star = starIndex + 1
        // 普通车升星，包含解锁
        if (!this.specialEventData.toolCars[toolCarIndex].isKeyCar) {
          this.form[toolCarIndex].unlock = true

        }
        this.setLocalForm()
      },
      onFormClickRank(toolCarIndex, rankLimit) {
        this.form[toolCarIndex].rank = this.form[toolCarIndex].rank >= rankLimit ? rankLimit - 1 : rankLimit
        this.setLocalForm()
      },
      previewDataTableImage() {
        uni.previewImage({
          urls: [this.specialEventData.dataTableImage]
        })
      },
      toCarArchives(car_id, fullName) {
        const url = `/pages/carList/carArchives/carArchives?car_id=${car_id}&fullName=${fullName}`
        uni.navigateTo({
          url
        })
      },
      getSpecialEventData: async function() {
        const res = await db.collection('contest').where({
          '_id': this._id
        }).get()
        if (res.result.data.length) {
          this.contestName = res.result.data[0].contestName
          // return specialEventData
          return res.result.data[0].specialEventData
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
    padding-bottom: 20rpx;

    @include pad-devices {
      padding-bottom: toPadPx(20);
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

  .form-item {
    &+& {
      margin-top: 35rpx;

      @include pad-devices {
        margin-top: toPadPx(35);
      }
    }
  }

  .form-item-car-name-and-link {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include pad-devices {}
  }

  .form-item-car-name {

    font-size: 34rpx;
    color: var(--text-title-color);
    font-weight: bold;

    @include pad-devices {
      font-size: toPadPx(34);
    }
  }

  .form-item-link {
    flex: none;
    margin-left: 1em;
    padding: 5rpx 10rpx;
    background-color: var(--divider-color);
    border-radius: 10rpx;

    @include pad-devices {
      font-size: toPadPx(34);
      padding: toPadPx(5) toPadPx(10);
      border-radius: toPadPx(10);
    }
  }

  .form-item-star {
    display: flex;
    margin-top: 5rpx;

    @include pad-devices {
      margin-top: toPadPx(5);
    }
  }

  .form-item-star-image {
    width: 40rpx;
    height: 40rpx;

    @include pad-devices {
      width: toPadPx(40);
      height: toPadPx(40);
    }

    &+& {
      margin-left: 20rpx;

      @include pad-devices {
        margin-left: toPadPx(20);
      }
    }
  }

  .form-item-star-image-disable {
    filter: grayscale(100%);
  }

  .form-item-lock-state {
    display: flex;
    margin-top: 10rpx;

    @include pad-devices {
      margin-top: toPadPx(10);
    }
  }

  .form-radio {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: var(--text-help-color);
  }

  .lock-radio {
    flex: none;

    &+& {
      margin-left: 1em;
    }
  }

  .form-radio-label {

    width: 1.2em;
    height: 1.2em;
    box-sizing: border-box;
    border: 1px solid var(--text-help-color);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;


    @include pad-devices {
      border-radius: toPadPx(2);
    }
  }

  .form-radio-text {
    margin-left: 0.5em;
  }

  .form-radio-checked {
    color: #41b90a;

    .form-radio-label {
      color: var(--divider-color);
      border-color: #41b90a;
      background-color: #41b90a;
    }
  }

  .user-reword-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6em 2em;
    margin-top: 20rpx;

    @include pad-devices {
      margin-top: toPadPx(20);
    }
  }

  .user-reword {
    display: flex;
    justify-content: space-between;
  }

  .user-reword-count {
    font-weight: bold;
  }

  .hl-disable {
    color: var(--text-help-color);
  }

  .hl-golden {
    color: #ffc107;
  }

  .hl-pack {
    color: #da6dff;
  }

  .hl-token {
    color: #068ffc;
  }
  
  .hl-season-token,
  .hl-skin{
    color: #41b90a;
  }

  .user-process-list {}

  .user-process-header,
  .user-process {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
    justify-items: center;
    align-items: center;
  }

  .user-process-header {
    font-weight: bold;
  }

  .user-process {
    margin-top: 20rpx;

    @include pad-devices {
      margin-top: toPadPx(20);
    }
  }

  .user-process-conditions {
    // width: 100%;
    justify-self: stretch;
    text-align: center;
  }

  .user-stage-info,
  .user-stage-info-header {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
    justify-items: center;
  }

  .user-stage-info-header {
    font-weight: bold;
  }

  .user-stage-info {
    margin-top: 40rpx;

    @include pad-devices {
      margin-top: toPadPx(40);
    }
  }


  .data-table-image {
    border-radius: 10rpx;
    width: 100%;

    @include pad-devices {
      border-radius: toPadPx(10);
    }
  }


  .note {
    line-height: 1.7;

    &+& {
      margin-top: 20px;

      @include pad-devices {
        margin-top: toPadPx(20);
      }
    }
  }

  .note-divider {
    height: 1px;
    background-color: var(--divider-color);
    margin: 1em 0;
  }

  .user-stage-modal {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
  }

  .user-stage-modal-mask {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.38);
  }

  .user-stage-modal-context {
    margin: auto;
    width: 710rpx;
    max-width: 720px;
    background-color: var(--card-bg-color);
    z-index: 114514;
    border-radius: 10rpx;
    padding: 40rpx 20rpx;
    box-sizing: border-box;

    @include pad-devices {
      border-radius: toPadPx(10);
      padding: toPadPx(40) toPadPx(20);
    }
  }

  .contest-name {
    padding-bottom: 0;
  }
</style>