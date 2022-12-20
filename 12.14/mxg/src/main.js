import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import http from "../untils/httpRequest"

Vue.config.productionTip = false

// 全局 ElementUI
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)

Vue.prototype.$http = http

/**引入echarts */
import echarts from "echarts"
Vue.prototype.$echarts = echarts

// 引入VCharts
import VCharts from "v-charts"
Vue.use(VCharts)

import VueQuillEditor from "vue-quill-editor"
// mount with global
Vue.use(VueQuillEditor)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
