<template>
  <view>
    <view class="top-fixed-wrapper">

      <top-bar title="特赛计算器" :showBack="true" />
    </view>

    <div class="form card">
      <div class="card-title">我的车库</div>
      <div class="form-item" v-for="(toolCar,toolCarIndex) in specialEventData.toolCars" :key="toolCar._id">
        <div class="form-item-car-name-and-link">
          <div class="form-item-car-name">{{toolCar.fullName}}</div>
          <div class="form-item-link" @click="toCarArchives(toolCar._id)">查看卡片</div>
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
            <div class="form-radio-label">{{form[toolCarIndex].unlock?'':'✔'}}</div>未解锁
          </div>
          <div class="form-radio lock-radio" :class="{'form-radio-checked':form[toolCarIndex].unlock}"
            @click="onFormClickUnlock(toolCarIndex)">
            <div class="form-radio-label">{{form[toolCarIndex].unlock?'✔':''}}</div>已解锁
          </div>
          <div class="form-radio lock-radio" :class="{'form-radio-checked':form[toolCarIndex].rank>=rankLimit}"
            @click="form[toolCarIndex].rank=form[toolCarIndex].rank>=rankLimit?rankLimit-1:rankLimit"
            v-for="(rankLimit,rankLimitIndex) in specialEventData.toolCars[toolCarIndex].rankLimits"
            :key="rankLimitIndex">
            <div class="form-radio-label">{{form[toolCarIndex].rank>=rankLimit?'✔':''}}</div>{{rankLimit}}分
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
        <div class="user-reword" v-if="specialEventData.haveEventKey">
          <div class="user-reword-type">钥匙</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-golden':userTotalRewords.seKey>0}">{{userTotalRewords.seKey}}</span>/{{totalRewords.seKey}}
          </div>
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
        <div class="user-reword">
          <div class="user-reword-type">蓝币</div>
          <div class="user-reword-count"><span class="hl-disable"
              :class="{'hl-token':userTotalRewords.token>0}">{{userTotalRewords.token}}</span>/{{totalRewords.token}}
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

    <div class="user-process-module">

    </div>
  </view>
</template>

<script>
  import topBar from '@/components/topBar/topBar.vue'
  import specialEventData from './fakeData.json'
  const canJoin = (join, userCar) => join.rank <= userCar.rank &&
    (join.freeTry || userCar.unlock) &&
    join.star <= userCar.star
  const combineRewords = (r1, r2) =>
    Object.keys(r1).reduce((res, curr) => ({
      ...res,
      [curr]: r1[curr] + r2[curr]
    }), {})

  const getEmptyReword = () => ({
    token: 0,
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
    },
    data() {
      return {
        specialEventData,
        form: [

        ],
      };
    },
    computed: {
      seCar({
        specialEventData
      }) {
        return specialEventData.toolCars[0]
      },
      userStages({
        specialEventData,
        form
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

        let userConditions = 0
        let currStageIndex = 0
        console.log(form)
        let userCars = form.reduce((res, {
          unlock,
          star,
          rank,
          _id
        }) => ({
          ...res,
          [_id]: {
            unlock,
            star,
            rank
          }
        }), {})
        console.log(userCars)
        // 计算每个阶段的奖励
        while (currStageIndex < stages.length && userConditions >= stages[currStageIndex].unlockConditions) {
          userStageRewords[currStageIndex].unlock = true
          for (let mission of stages[currStageIndex].missions) {
            const {
              join,
              conditions,
              rewords
            } = mission
            const userCar = userCars[mission.tooCarId]
            if (canJoin(join, userCar)) {
              userConditions += conditions
              for (let {
                  type,
                  count
                } of rewords) {
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
          } of processRewords) {
          if (conditions <= userConditions) {
            userProcessRewords[reword.type] += reword.count
          }
        }

        const result = {
          userStageRewords,
          userConditions,
          userProcessRewords,
        }

        return result
      },
      userConditions({
        userStages: {
          userConditions
        }
      }) {
        console.log('user conditions', userConditions)
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
          } of processRewords) {
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
            } of stage.missions) {
            for (let {
                type,
                count
              } of rewords) {
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
      toNumber10K(credit) {
        return credit / 10000 + 'W'
      },
      resetForm() {
        let {
          toolCars
        } = this.specialEventData
        this.form = toolCars.map(toolCar => ({
          _id: toolCar._id,
          unlock: false,
          star: toolCar.isKeyCar ? 1 : 0,
          rank: 0,
        }))
      },
      initForm() {
        return this.resetForm()
      },
      fullForm() {
        let {
          toolCars
        } = this.specialEventData
        this.form = toolCars.map(toolCar => ({
          unlock: true,
          star: toolCar.star,
          rankLimit: (toolCar.rankLimits?.length - 1) || 10000,
        }))
      },
      onFormClickUnlock(toolCarIndex) {
        this.form[toolCarIndex].unlock = true
        //解锁了，说明至少1星
        this.form[toolCarIndex].star = this.form[toolCarIndex].star || 1
      },
      onFormClickLock(toolCarIndex) {
        this.form[toolCarIndex].unlock = false
        //未解锁，钥匙车不变，普通车是0星
        if (!this.specialEventData.toolCars[toolCarIndex].isKeyCar) {

          this.form[toolCarIndex].star = 0
        }
      },
      onFormClickStar(toolCarIndex, starIndex) {
        this.form[toolCarIndex].star = starIndex + 1
        // 普通车升星，包含解锁
        if (!this.specialEventData.toolCars[toolCarIndex].isKeyCar) {
          this.form[toolCarIndex].unlock = true

        }
      }
    },
    onLoad({
      _id
    }) {
      console.log(_id)
      // console.log(this.form)
    },
    created() {

      this.initForm()
    }
  }
</script>

<style lang="scss">
  .top-fixed-wrapper {
    z-index: 114514;
    position: sticky;
    top: 0;
  }

  .card {
    margin: 20rpx;
    padding: 20rpx;
    border-radius: 10rpx;
    background-color: var(--card-bg-color);

    &-title {
      color: var(--theme-color);
      font-size: 38rpx;
      font-weight: bold;
      padding-bottom: 20rpx;
    }
  }

  .form-item {
    &+& {
      margin-top: 30rpx;
    }
  }

  .form-item-car-name-and-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-item-car-name {

    font-size: 34rpx;
    color: var(--text-title-color);
    font-weight: bold;
  }

  .form-item-link {
    flex: none;
    margin-left: 1em;
    padding: 5rpx 10rpx;
    background-color: var(--divider-color);
    border-radius: 10rpx;
  }

  .form-item-star {
    display: flex;
    margin-top: 10rpx;
  }

  .form-item-star-image {
    width: 40rpx;
    height: 40rpx;

    &+& {
      margin-left: 20rpx;
    }
  }

  .form-item-star-image-disable {
    filter: grayscale(100%);
  }

  .form-item-lock-state {
    display: flex;
    margin-top: 10rpx;
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
    margin-right: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
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
    gap: 1em 2em;
    margin-top: 20rpx;
  }

  .user-reword {
    display: flex;
    justify-content: space-between;
  }
  
  .user-reword-count{
    font-weight: bold;
  }
  
  .hl-disable{
    color: var(--text-help-color);
  }
  
  .hl-golden{
    color:#ffc107;
  }
  
  .hl-pack{
    color: #da6dff;
  }
  
  .hl-token{
    color: #068ffc;
  }
  .hl-skin{
    color: #41b90a;
  }
</style>
