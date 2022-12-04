import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import vuex from 'vuex-persistedstate'

export default new Vuex.Store({
  plugins: [vuex()],
  state: {
    list: []
  },
  getters: {
  },
  mutations: {
    // 添加
    submitForm(state, val) {
      state.list.push({ ...val, id: state.list.length })
    },
    // 修改
    edits(state, val) {
      state.list[val.id].name = val.name
      state.list[val.id].status = val.status
      state.list[val.id].time = val.time

    }
  },
  actions: {
  },
  modules: {
  },
  
})
