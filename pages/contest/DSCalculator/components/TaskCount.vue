<template>
  <div class="__task-count">
    <div>{{ !dpValid ? emoji : packCount
        }}{{ dpValid && isTaskMax ? '+1' : '' }}</div>
    <div class="after" v-if="dpValid">次</div>
  </div>
</template>

<script>
  export default {
    props: ['dpValid', 'task', 'result'],
    data() {
      return {
        emoji: '',
      }
    },
    computed: {

      isTaskMax({
        task,
        result
      }) {
        return (
          task.sp === result?.taskMax.sp &&
          task.packCount === result?.taskMax.packCount &&
          task.danger === result?.taskMax.danger
        )
      },
      packCount({
        task,
        result
      }) {
        return (
          result?.res.find(
            (t) =>
            t.sp === task.sp &&
            t.packCount === task.packCount &&
            t.danger === task.danger
          )?.taskCount || 0
        )
      },
    },
    watch: {
      dpValid(value) {
        if (!value) {
          this.getEmoji()
        }
      }
    },
    methods: {
      getEmoji() {
        const kun = ['🐰', '🦎', '🐻', '🦊']
        this.emoji = kun[Math.floor(Math.random() * kun.length)]
      }
    },
    mounted() {
      this.getEmoji()
    }

  }
</script>

<style lang="scss">
  .after {
    font-size: 26rpx;
    padding-top: 8rpx;

    @include pad-devices {
      font-size: toPadPx(26);
      padding-top: toPadPx(8);
    }
  }

  .__task-count {
    display: flex;
    justify-content: center;
    gap: 4rpx;
    align-items: center;
  }
</style>