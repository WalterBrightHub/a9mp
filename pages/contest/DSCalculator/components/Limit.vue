<template>
  <div class="__limit">
    {{ limitText }}
  </div>
</template>

<script>
  export default {
    props: ['limit' ],
    data() {
      return {
        emoji: '',
      }
    },
    computed: {

      limitText({
        limit
      }) {
        if (typeof limit === 'string') {
          return limit
        } else {
          return `${limit}星及以上车辆请勾选`
        }
      },
    },

  }
</script>

<style lang="scss">
  .__limit{
    color:var(--theme-color);
  }
</style>