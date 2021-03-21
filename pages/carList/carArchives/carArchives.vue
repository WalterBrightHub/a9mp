<template>
  <view>
    <unicloud-db class="cdb" ref="contestDB" v-slot:default="{data, pagination, loading, error, options}"
      :options="options" collection="contest" orderby="startTime desc,contestName asc" :getone="false" :action="action"
      :where="where" @load="onqueryload" @error="onqueryerror">
      <view v-if="error" class="error">{{error.message}}</view>
      <view v-else class="contest-list">
        <contest-item :contest="contest" v-for="(contest, index) in data" :key="contest._id" class="contest-item"
          :now="options.now" :index="index" />
      </view>
      <view class="loading" v-if="loading">
        <!-- <loading /> -->
      </view>
      <view class="contest-empty-list" v-if="data.length===0 && loading===false">😮 这里空空如也</view>
      <!-- <view v-if="loading" class="loading">加载中...</view> -->
    </unicloud-db>
  </view>
</template>

<script>
  import contestItem from '../../contest/components/contestItem.vue'
  import loading from '../../../components/loading/loading.vue'
  const db = uniCloud.database()
  const dbCmd = db.command
  export default {
    components:{
      'contest-item': contestItem,
      'loading': loading
    },
    data() {
      return {
        now:new Date().getTime()
      }
    },
    computed:{
      where(){
        return {
          featuredCars: dbCmd.all(['sian'])
        }
      },
      options(){
        return {
          now:this.now
        }
      }
    },
    onLoad() {
      db.collection('contest').where({
          featuredCars: dbCmd.all(['sian'])
        })
        .get()
        .then(res => {
          console.log(res)
        })
    },
    methods: {

      onqueryload() {
        // uni.hideLoading()
      },
      onqueryerror() {
        // uni.hideLoading()
      },
    }
  }
</script>

<style>

</style>
