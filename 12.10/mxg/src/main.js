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

// 局部 ElementUI
// import { Button, Select } from "element-ui"
// Vue.use(Button)
// Vue.use(Select)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
