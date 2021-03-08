<template>
  <view>
    hello?
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    onLoad({carIds}) {
      console.log(carIds.split(','))
    },
    methods: {

    }
  }
</script>

<style>

</style>
