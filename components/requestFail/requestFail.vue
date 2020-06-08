<template>
  <view class="fail-block">
    <image src="/static/packet.png" class="fail-icon"></image>
    <button class="retry" size="mini" @tap="onRetry">重试</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    methods:{
      onRetry(){
        
        this.$emit('onRetry');
      }
    }
  }
</script>

<style lang="scss">
/* components/request-fail/request-fail.wxss */
.fail-block{
  padding: 32px 0;
  display: flex;
  flex-direction: column;
}


.fail-text{
  text-align: center;
  color: #909090;
}

.fail-icon{
  width:32px;
  height: 32px;
  margin: 0 auto;
  margin-bottom: 24px;
  opacity: 0.38;
  display: block;

}

.retry{
  /* display: block; */
  /* position: static; */
  /* margin: 0 auto; */
  background-color: #ff0054;
  color: #ffffff;
  font-size: 12px;
}

.retry:active{
  background-color: rgba(255, 0, 84, 0.6);
}
</style>
