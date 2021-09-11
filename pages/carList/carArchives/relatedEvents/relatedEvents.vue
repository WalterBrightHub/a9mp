<template>
  <view>
    <top-bar :showBack="true" :title="'所有关联赛事'" />
    
    <div class="contest-db">
      <unicloud-db class="cdb" ref="contestDB" v-slot:default="{data, pagination, loading, error, options}"
        :options="options" collection="contest" orderby="startTime desc,contestName asc" :getone="false"
        :action="action" :where="where" @load="onqueryload" @error="onqueryerror" manual="true" page-size="479">
        <view v-if="error" class="error">{{error.message}}</view>
        <view v-else class="contest-list">
          <contest-item :contest="contest" v-for="(contest, index) in data" :key="contest._id" class="contest-item"
            :now="options.now" :index="index" />
        </view>
        <view class="loading" v-if="loading">
          <!-- <loading /> -->
        </view>
        <view class="contest-empty-list" v-if="data.length===0 && loading===false">😮 还没有赛事记录</view>
      </unicloud-db>
    </div>
  </view>
</template>

<script>
  import {
    mapState,
    // mapMutations
  } from 'vuex'
  import contestItem from '@/pages/contest/components/contestItem.vue'
  import loading from '@/components/loading/loading.vue'
	import topBar from '@/components/topBar/topBar.vue'
  const db = uniCloud.database()
  const dbCmd = db.command
  export default {
    components: {
      'contest-item': contestItem,
      'loading': loading,
      'top-bar':topBar,
    },
    data() {
      return {
        now: new Date().getTime(),
        car_id:'&&&'
      }
    },
    computed: {
      ...mapState(['server']),
      where() {
        return {
          featuredCars: dbCmd.all([this.car_id]),
          server:this.server
        }
      },
      options() {
        return {
          now: this.now
        }
      },
    },
    onLoad({car_id}) {
      // console.log(car_id)
      // console.log(this.server)
      this.car_id=car_id
      // db.collection('contest').where({
      //     featuredCars: dbCmd.all(['sian'])
      //   })
      //   .get()
      //   .then(res => {
      //     console.log(res)
      //   })
    },
    onShareAppMessage() {
      return {
        title: `狂飙小助手`,
      }
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

<style lang="scss">
  @import '@/pages/contest/contest-list.scss';

</style>
