import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import vuexp from "vuex-persistedstate"
export default new Vuex.Store({
  plugins: [vuexp()],
  state: {
    // 到已读
    read: [],
    // 到回收站的
    recycle: [],
  },
  getters: {
  },
  mutations: {
    // 点击到已读
    reads(state, val) {
      state.read.push(val)
    },
    // 点击删除到回收站
    del(state, val) {
      state.recycle.push(val)
      state.read.splice(val, 1);
    },
    // 点击还原未读 到未读里
    restoring(state, val) {
      // 把已读的删除
      state.read.splice(val, 1);
    },
    // 还原
    restores(state, val) {
      // 把回收站的删除
      state.recycle.splice(val, 1);
    },
    // 全部标为已读
    all(state, val) {
      state.read.push(...val)
    },
    // 删除全部
    dels(state,val) {
      state.recycle.push(...val)
      state.read=[]
    },
    // 清空回收站
    empty(state) {
      state.recycle = []
    }
  },
  actions: {
  },
  modules: {
  }
})
