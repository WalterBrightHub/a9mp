<template>
  <view>
    <view class="top-fixed-wrapper">

      <top-bar title="特赛计算器" :showBack="true" />
    </view>

    <div class="form">
      <div class="form-item" v-for="(toolCar,toolCarIndex) in specialEventData.toolCars" :key="toolCar._id">
        <div class="form-item-car-name-and-link">
          <div class="form-item-car-name">{{toolCar.fullName}}</div>
          <div class="form-item-link" @click="toCarArchives(toolCar._id)">查看卡片</div>
        </div>
        <div class="form-item-get-method">获取方式：<span class="form-item-get-method-text">{{toolCar.getMethod}}</span>
        </div>
        <div class="form-item-star">
          <image class="form-item-star-image"
            :class="{'form-item-star-image-disable':form[toolCarIndex].star<=starIndex}"
            src="@/static/carcard-icons/star.png" v-for="(star,starIndex) in toolCar.star" :key="starIndex"
            @click="onFormClickStar(toolCarIndex,starIndex)"></image>
        </div>
        <div class="form-item-lock-state">
          <div class="form-radio lock-radio" :class="{'form-radio-checked':!form[toolCarIndex].unlock}"
            @click="onFormClickLock(toolCarIndex)">
            <div class="form-radio-label">{{form[toolCarIndex].unlock?'':'√'}}</div>未解锁
          </div>
          <div class="form-radio lock-radio" :class="{'form-radio-checked':form[toolCarIndex].unlock}"
            @click="onFormClickUnlock(toolCarIndex)">
            <div class="form-radio-label">{{form[toolCarIndex].unlock?'√':''}}</div>已解锁
          </div>
          <div class="form-radio lock-radio" :class="{'form-radio-checked':form[toolCarIndex].rank>=rankLimit}"
            @click="form[toolCarIndex].rank=form[toolCarIndex].rank>=rankLimit?rankLimit-1:rankLimit"
            v-for="(rankLimit,rankLimitIndex) in specialEventData.toolCars[toolCarIndex].rankLimits">
            <div class="form-radio-label">{{form[toolCarIndex].rank>=rankLimit?'√':''}}</div>{{rankLimit}}分
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
  import topBar from '@/components/topBar/topBar.vue'
  import specialEventData from './fakeData.js'
  const canJoin = (join, userCar) => join.rank <= userCar.rank &&
    (join.freeTry || userCar.unlock) &&
    join.star <= userCar.star
  const combineRewords = (r1, r2) =>
    Object.keys(r1).reduce((res, curr) => ({
      ...res,
      [curr]: r1[curr] + r2[curr]
    }), {})
    
  const getEmptyReword=()=>({
    token: 0,
    credit: 0,
    seCard: 0,
    seSkin: 0,
    sePack: 0,
    seKey: 0,
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
      userRewords({
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
      userConditions({userRewords:{
        userConditions
      }}){
        console.log('user conditions',userConditions)
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
        userRewords: {
          userProcessRewords
        }
      }) {
        return userProcessRewords
      },
      userStageRewords({
        userRewords: {
          userStageRewords
        }
      }) {
        return userStageRewords.map(({
          rewords
        }) => rewords).reduce(combineRewords)
      },
      userTotalRewords({
        userClubRewords,
        userProcessRewords,
        userStageRewords,
      }) {
        let res = [userClubRewords, userProcessRewords, userStageRewords].reduce(combineRewords)
        console.log(res)
        return res
      }
    },
    methods: {
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
        //未解锁，钥匙车是1星，普通车是0星
        this.form[toolCarIndex].star = this.specialEventData.toolCars[toolCarIndex].isKeyCar ? 1 : 0
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

  .form-item-car-name-and-link {
    display: flex;
  }

  .form-item-link {
    flex: none;
    margin-left: auto;
    padding-left: 1em;
    color: var(--theme-color);
  }

  .form-item-star {
    display: flex;
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

    width: 1em;
    height: 1em;
    box-sizing: border-box;
    border: 1px solid var(--theme-color);
    border-radius: 2px;
    margin-right: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-radio-checked {
    color: var(--theme-color);

    .form-radio-label {
      color: var(--divider-color);
      background-color: var(--theme-color);
    }
  }
</style>
