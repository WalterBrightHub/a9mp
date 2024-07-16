<script>
  import topBar from '@/components/topBar/topBar.vue'
  import TaskCount from './components/TaskCount.vue'
  import Limit from './components/Limit.vue'
  import dp from './dp.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'

  const db = uniCloud.database()
  export default {
    components: {
      topBar,
      TaskCount,
      Limit,
    },
    props: [],
    data() {
      return {
        localLoaded: false,
        dsDataId: '',
        eventData: {
          _id: 'al-cc850',
          chapters: [],

        },
        form: {
          chapter: 2,
          stage: 1,
          stageSpDone: '',
          danger1: true,
          danger2: true,
          danger3: true,
        },
        result: undefined,
        errorNoChapter: false,
        errorNoStage: false,
        errorNoTasks: false,
        errorNoTasksCount: 0,
      }
    },
    computed: {
      ...mapState(['server']),
      currentChapter({
        eventData,
        form
      }) {
        return eventData.chapters.find(
          (chapter) => chapter.chapter === form.chapter
        )
      },
      currentStage({
        currentChapter,
        form
      }) {
        return currentChapter?.stages.find(
          (stage) => stage.stage === form.stage
        )
      },
      invalidStage({
        currentChapter,
        currentStage,
        form
      }) {
        return currentChapter && !currentStage && form.stage != 1
      },
      currentTasks({
        currentStage
      }) {
        return currentStage?.tasks

      },
      currentTask0({
        currentTasks
      }) {
        return currentTasks?.filter((task) => task.danger === 0)
      },
      currentTask1({
        currentTasks
      }) {
        return currentTasks?.filter((task) => task.danger === 1)
      },
      currentTask2({
        currentTasks
      }) {
        return currentTasks?.filter((task) => task.danger === 2)
      },
      currentTask3({
        currentTasks
      }) {
        return currentTasks?.filter((task) => task.danger === 3)
      },
      userTasks({
        currentTask0,
        currentTask1,
        currentTask2,
        currentTask3,
        form
      }) {

        const res = [...(currentTask0 || [])]
        if (form.danger1) {
          res.push(...(currentTask1 || []))
        }
        if (form.danger2) {
          res.push(...(currentTask2 || []))
        }
        if (form.danger3) {
          res.push(...(currentTask3 || []))
        }
        return res
      },
      dpValid({
        currentChapter,
        currentStage,
        userTasks
      }) {
        return currentChapter && currentStage && userTasks && userTasks.length > 0
      },
    },
    watch: {
      invalidStage(value) {
        if (value) {
          console.log('阶段归零！')
          this.form.stage = 1
        }
      },
      // 'form.chapter': function(n, o) {
      //   if (this.localLoaded && n !== o) {

      //     this.onSwitchChapterOrStage()
      //   }
      // },
      // 'form.stage': function(n, o) {
      //   if (this.localLoaded && n !== o) {

      //     this.onSwitchChapterOrStage()
      //   }
      // },
      form: {
        handler: async function() {
          if (this.localLoaded) {
            // console.log('设置本地',this.form)
            this.setLocalForm()
          }
          await this.$nextTick()
          if (!this.currentChapter) {
            this.errorNoChapter = true
            return
          } else if (!this.currentStage) {
            this.errorNoStage = true
            return
          } else if (this.userTasks?.length === 0) {
            this.errorNoTasks = true
            this.errorNoTasksCount++
          } else if (
            Number(this.form.stageSpDone) >= this.currentStage.sp ||
            Number(this.form.stageSpDone) < 0
          ) {
            this.form.stageSpDone = ''
          } else {
            this.runDP()
          }
        },
        deep: true
      }
    },
    methods: {
      async getEventData() {
        const res = await db.collection('dsData').where({
          '_id': this.dsDataId
        }).get()
        const target = res?.result?.data?.[0]
        // console.log(target)
        return target
      },
      runDP() {
        this.result = dp({
          chapter: this.currentChapter,
          stage: this.currentStage,
          tasks: this.userTasks,
          stageSpDone: Number(this.form.stageSpDone),
        })
      },
      resetForm() {
        this.form.stageSpDone = ''
        this.form.danger1 = true
        this.form.danger2 = true
        this.form.danger3 = true

      },
      async refresh() {

        const target = await this.getEventData()
        if (target) {
          this.eventData = target
          uni.showToast({
            title: '最新',
            duration: 500,
          })
        } else {
          uni.showToast({
            title: '失败了',
            duration: 500,
            icon: 'error'
          })
        }
        uni.stopPullDownRefresh()
        this.runDP()
      },
      getPackCount(task) {
        return (
          this.result?.res.find(
            (t) =>
            t.sp === task.sp &&
            t.packCount === task.packCount &&
            t.danger === task.danger
          )?.taskCount || 0
        )
      },
      onSwitchDanger3() {
        this.form.danger3 = !this.form.danger3
      },
      onSwitchDanger2() {
        this.form.danger2 = !this.form.danger2
      },
      onSwitchDanger1() {
        this.form.danger1 = !this.form.danger1
      },
      isTaskMax(task) {
        return (
          task.sp === this.result?.taskMax.sp &&
          task.packCount === this.result?.taskMax.packCount &&
          task.danger === this.result?.taskMax.danger
        )
      },
      getRandomKun() {
        const kun = ['🐰', '🦎', '🐻', '🦊']
        return kun[Math.floor(Math.random() * kun.length)]
      },
      getLimitText(limit) {
        if (typeof limit === 'string') {
          return limit
        } else {
          return `${limit}星及以上车辆请勾选`
        }
      },
      setChapter(chapter) {
        if(this.form.chapter === chapter){
          return
        }
        this.form.chapter = chapter
        this.resetForm()
      },
      setStage(stage) {
        if(this.form.stage === stage){
          return
        }
        this.form.stage = stage
        this.resetForm()
      },
      getLocalForm() {
        return uni.getStorage({
          key: 'ds-' + this.dsDataId,
        })
      },
      setLocalForm() {
        uni.setStorage({
          key: 'ds-' + this.dsDataId,
          data: this.form
        })
      },
      initForm: async function() {
        uni.showLoading()
        const target = await this.getEventData()
        if (target) {
          this.eventData = target
        } else {
          // TODO:提示失败了
          uni.showToast({
            title: '失败了',
            duration: 500,
            icon: 'error'
          })
        }
        this.getLocalForm().then(([err, res]) => {
          if (err) {
            console.log(err)

          } else {
            let form = res.data
            this.form = form
          }
        })
        this.localLoaded = true
        uni.hideLoading()

      }
    },
    async onLoad({
      dsDataId
    }) {
      console.log(dsDataId)
      this.dsDataId = dsDataId
      this.initForm()
      this.runDP()
    },
    onPullDownRefresh() {
      this.refresh();
    },
  }




  // const isAL = computed(() => eventData.value.server === 'al')
</script>
<template>
  <view class="page">
    <view class="top-fixed-wrapper">

      <top-bar title="车联计算器" :showBack="true" />
    </view>

    <div class="card"  >
      <div class="card-title card-title-chapter">选择章节</div>
      <div class="chapter-list">
        <div class="chapter" :class="{'chapter-selected':chapter.chapter===form.chapter}"
          @click="setChapter(chapter.chapter)" v-for="chapter in eventData.chapters">{{chapter?chapter.title:''}}</div>
      </div>
      <div class="card-title card-title-stage">选择关卡</div>
      <div class="stage-list" v-if="currentChapter">
        <div class="stage" :class="{'stage-selected':stage.stage===form.stage}" @click="setStage(stage.stage)"
          v-for="stage in currentChapter.stages">{{stage.stage}}</div>
      </div>
      <div class="card-title card-title-sp">本关已完成SP</div>
      <div class="sp-input-wrapper">
        <input class="input-sp" type="number" placeholder="可不填,默认为0" v-model="form.stageSpDone" />

      </div>
      <div class="sp-desc"> 本关剩余 SP 为 {{ currentStage?currentStage.sp:0 }} - {{ form.stageSpDone || 0 }} =
        {{ (currentStage?currentStage.sp:0 || 0) - Number(form.stageSpDone) }}
      </div>
    </div>

    <div class="task-module task-module-3" v-if="currentTask3&&currentTask3.length === 3" @click="onSwitchDanger3">
      <div class="danger-label">
        <div class="form-radio lock-radio" :class="{'form-radio-checked':form.danger3}">
          <div class="form-radio-label">{{!form.danger3?'':'✔'}}</div>
          <div class="form-radio-text">危险3</div>
        </div>

        <Limit class="limit" v-if="currentStage&&currentStage.limit&&currentStage.limit[2]"
          :limit="currentStage&&currentStage.limit&&currentStage.limit[2]" />
      </div>
      <div class="task-list">
        <div class="task" v-for="task in currentTask3" :class="{ 'task-selected': form.danger3 }">
          <div class="task-sp-sc">
            <div class="task-sp">{{ task.sp }}sp</div>
            <div class="task-sc">
              {{ task.packCount }}{{ server==='al' ? '包' : '币' }}
            </div>
          </div>
          <TaskCount class="task-count" :dpValid="dpValid" :task="task" :result="result"></TaskCount>
        </div>
      </div>
    </div>





    <div class="task-module task-module-2" v-if="currentTask3&&currentTask2.length === 3" @click="onSwitchDanger2">
      <div class="danger-label">
        <div class="form-radio lock-radio" :class="{'form-radio-checked':form.danger2}">
          <div class="form-radio-label">{{!form.danger2?'':'✔'}}</div>
          <div class="form-radio-text">危险2</div>
        </div>

        <Limit class="limit" v-if="currentStage&&currentStage.limit&&currentStage.limit[1]"
          :limit="currentStage&&currentStage.limit&&currentStage.limit[1]" />
      </div>
      <div class="task-list">
        <div class="task" v-for="task in currentTask2" :class="{ 'task-selected': form.danger2 }">
          <div class="task-sp-sc">
            <div class="task-sp">{{ task.sp }}sp</div>
            <div class="task-sc">
              {{ task.packCount }}{{ server==='al' ? '包' : '币' }}
            </div>
          </div>
          <TaskCount class="task-count" :dpValid="dpValid" :task="task" :result="result"></TaskCount>
        </div>
      </div>
    </div>

    <div class="task-module task-module-1" v-if="currentTask3&&currentTask1.length === 3" @click="onSwitchDanger1">
      <div class="danger-label">
        <div class="form-radio lock-radio" :class="{'form-radio-checked':form.danger1}">
          <div class="form-radio-label">{{!form.danger1?'':'✔'}}</div>
          <div class="form-radio-text">危险1</div>
        </div>

        <Limit class="limit" v-if="currentStage&&currentStage.limit&&currentStage.limit[0]"
          :limit="currentStage&&currentStage.limit&&currentStage.limit[0]" />
      </div>
      <div class="task-list">
        <div class="task" v-for="task in currentTask1" :class="{ 'task-selected': form.danger1 }">
          <div class="task-sp-sc">
            <div class="task-sp">{{ task.sp }}sp</div>
            <div class="task-sc">
              {{ task.packCount }}{{ server==='al' ? '包' : '币' }}
            </div>
          </div>
          <TaskCount class="task-count" :dpValid="dpValid" :task="task" :result="result"></TaskCount>
        </div>
      </div>
    </div>


    <div class="task-module task-module-0" v-if="currentTask0&&currentTask0.length >0">
      <div class="danger-label">
        <div class="form-radio lock-radio form-radio-checked">
          <div class="form-radio-label">{{'✔'}}</div>
          <div class="form-radio-text">危险0</div>
        </div>

      </div>
      <div class="task-list">
        <div class="task task-selected" v-for="task in currentTask0">
          <div class="task-sp-sc">
            <div class="task-sp">{{ task.sp }}sp</div>
            <div class="task-sc">
              {{ task.packCount }}{{ server==='al' ? '包' : '币' }}
            </div>
          </div>
          <TaskCount class="task-count" :dpValid="dpValid" :task="task" :result="result"></TaskCount>
        </div>
      </div>
    </div>


    <div class="card card-detail"  >
      <div class="card-title card-title-chapter">详细步骤</div>
      <div>{{ currentChapter?currentChapter.title:'' }} 第
        {{ currentStage?currentStage.stage :''}} 关
      </div>
      <div v-if="dpValid&&result" key="ok">
        <div v-for="task in result.res">
          <span class="result-number result-number-54">{{
                    task.taskCount
                  }}</span>
          把 {{ task.sp }} SP，危险 {{ task.danger }}，{{
                    task.taskCount === 1 ? '这' : '每'
                  }}把 {{ task.packCount }} {{ server==='al' ? '包' : '紫币' }}；
        </div>
        <div>
          此时距离过关只剩
          <span class="result-number-54">{{ result.lastSP }}</span> SP 了！
        </div>
        <div>
          最后 <span class="result-number result-number-54">1</span> 把
          {{ result.taskMax.sp }} SP，危险 {{ result.taskMax.danger }}，这把
          {{ result.taskMax.packCount }} {{ server==='al' ? '包' : '紫币' }}。
        </div>
        <div>本关战绩：</div>
        <div>
          <span class="result-number">{{ result.taskCountTotal }}</span>
          次比赛,
          <span class="result-number">{{ result.packTotal }}</span> 个{{
                    server==='al' ? '福币包，' : '紫币。'
                  }}
          <template v-if="server==='al'">
            <span class="result-number">{{ result.coinTotal }}</span>
            个福币，</template>
        </div>
        <div v-if="server==='al'">如果不出 🔑 和 888 福币的话</div>
      </div>
      <div v-else class="result-invalid" key="error">
        <div v-if="errorNoStage">选择一个关卡再来看看吧</div>
        <div v-if="errorNoTasks">
          {{
                    errorNoTasksCount > 9
                      ? '跟我们神秘组织走一趟！'
                      : '选择一些危险度再来看看吧'
                  }}
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title card-title-chapter">计算器说明书</div>
      <div>
        <div>选择章节和关卡，勾选或取消勾选可参加的危险度，即可获得每种任务所需要的次数了。
        </div>
        <div>
          填写本关已完成sp，会根据剩余sp继续计算接下来如何游玩才能收益最大化。
        </div>
        <div class="color-54">+1 的任务请务必在最后去完成！</div>
      </div>
    </div>

  </view>

</template>
<style lang="scss">
  .page {
    font-size: 26rpx;
    padding-bottom: 64rpx;

    @include pad-devices {
      font-size: toPadPx(26);
    }

  }

  .top-fixed-wrapper {
    z-index: 114514;
    position: sticky;
    top: 0;
  }

  .color-54 {
    color: var(--theme-color);
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
      font-weight: bold;
      padding-bottom: 20rpx;

      @include pad-devices {
        padding-bottom: toPadPx(20);
      }

      &-stage {
        margin-top: 20rpx;

        @include pad-devices {
          margin-top: toPadPx(20);
        }
      }

      &-sp {
        padding-bottom: 0;
        margin-top: 20rpx;

        @include pad-devices {
          margin-top: toPadPx(20);
        }
      }
    }
  }

  .chapter {
    &-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320rpx, 1fr));

      @include pad-devices {
        grid-template-columns: repeat(auto-fill, minmax(toPadPx(320), 1fr));
      }
    }

    &-selected {
      background-color: #41b90a;
      color: #fff;

      @media (prefers-color-scheme: dark) {
        color: $text-title-color-dark;
        background-color: #2d8006;
      }
    }

    padding : 20rpx;

    @include pad-devices {
      padding: toPadPx(20);
    }

    font-weight: bold;

  }

  .stage {
    &-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80rpx, 1fr));

      @include pad-devices {
        grid-template-columns: repeat(auto-fill, minmax(toPadPx(80), 1fr));

      }
    }

    text-align: center;
    font-weight: bold;

    &-selected {
      background-color: #41b90a;
      color: #fff;

      @media (prefers-color-scheme: dark) {
        color: $text-title-color-dark;
        background-color: #2d8006;
      }
    }

    padding : 15rpx 20rpx;

    @include pad-devices {
      padding: toPadPx(15) toPadPx(20);
    }
  }

  .card-divider {
    height: 2px;
    background-color: var(--divider-color);
  }



  .input-sp {
    // font-size: 24rpx;
    height: 64rpx;
    min-height: 64rpx;

    @include pad-devices {
      height: toPadPx(64);
      min-height: toPadPx(64);

    }
  }

  .task {
    &-module {
      padding: 0 20rpx;
      max-width: 768px;
      margin-left: auto;
      margin-right: auto;

      @include pad-devices {
        padding: 0 toPadPx(20);
      }

      &+& {
        margin-top: 30rpx;

        @include pad-devices {
          margin-top: 0 toPadPx(30);
        }
      }
    }

    &-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin-top: 15rpx;
      gap: 20rpx;

      @include pad-devices {
        margin-top: toPadPx(15);
        gap: toPadPx(20);
      }

    }

    background-color: var(--card-bg-color);
    border-radius: 10rpx;
    padding:15rpx;

    @include pad-devices {
      padding: toPadPx(15);
      border-radius: toPadPx(10);
    }

    &-selected {
      background-color: #41b90a;
      color: #fff;

      @media (prefers-color-scheme: dark) {
        color: $text-title-color-dark;
        background-color: #2d8006;
      }

    }

    &-sp-sc {
      display: flex;
      justify-content: space-between;
    }

    &-sp {}

    &-sc {}

    font-weight: bold;

    &-count {
      font-size: 48rpx;
      line-height: 48rpx;
      text-align: center;
      margin-top: 15rpx;

      @include pad-devices {
        font-size: toPadPx(48);
        line-height: toPadPx(48);
      margin-top: toPadPx(15);
      }

    }
  }

  .danger-label {
    display: flex;
    gap: 1em;
    font-weight: bold;
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

  .task-list {}

  .card-detail {
    line-height: 1.7;
  }

  .result-invalid {
    color: #cc52ea;
    text-align: center;
    font-weight: bold;

  }

  .result-number {

    color: #cc52ea;
    font-size: 36rpx;
    font-weight: bold;
    padding: 0 2rpx;

    @include pad-devices {
      font-size: toPadPx(36);
      padding: 0 toPadPx(2);
    }

    &-54 {
      color: var(--theme-color);
      font-weight: bold;
      padding: 0 2rpx;
      
      @include pad-devices {
        padding: 0 toPadPx(2);
      }
    }
  }
</style>