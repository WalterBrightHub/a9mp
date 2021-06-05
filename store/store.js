// https://ask.dcloud.net.cn/article/37468
// 引入依赖  
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  server: 'gl',
  theme:'light'
}

export default new Vuex.Store({
  state,
  mutations: {
    toggleServer(state) {
      const {
        server
      } = state
      state.server = server === 'gl' ? 'al' : 'gl'
    },
    setTheme(state,theme){
      state.theme=theme==='light'?'light':'dark'
    }
  },
  plugins: [
    // 可以有多个持久化实例  
    createPersistedState({
      key: 'app_config_data', // 状态保存到本地的 key   
      paths: ['server','theme'], // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c   
      storage: { // 存储方式定义  
        getItem: (key) => uni.getStorageSync(key), // 获取  
        setItem: (key, value) => uni.setStorageSync(key, value), // 存储  
        removeItem: (key) => uni.removeStorageSync(key) // 删除  
      }
    })
  ]
})
