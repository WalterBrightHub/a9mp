<template>
  <view>
    <view class="charts-box">
      <qiun-data-charts
        type="ring"
        :chartData="chartData"
        background="#fff"
      />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        chartData:{
          categories:[],
          series:[
        {
            "data": [
                {
                    "name": "D",
                    "value": 50
                },
                {
                    "name": "C",
                    "value": 30
                },
                {
                    "name": "B",
                    "value": 20
                },
                {
                    "name": "A",
                    "value": 18
                },
                {
                    "name": "S",
                    "value": 8
                }
            ]
        }
    ],
        },
      };
    }
  }
</script>

<style lang="scss">
/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
.charts-box{
  width: 100%;
  height:300px;
}
</style>
