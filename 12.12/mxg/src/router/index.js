import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/home",
    redirect: "/welcomeTo" // 重定向:重新指向其它path,会改变网址
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/Common/IndexView.vue"),
    children: [
      {
        // 欢迎页面
        path: "/welcomeTo",
        name: "welcomeTo",
        component: () => import("../views/Common/WelcomeTo.vue")
      },
      {
        // 用户管理
        // 用户列表
        path: "/users",
        name: "users",
        component: () => import("../views/User/UsersView.vue")
      },
      {
        // 权限管理
        // 角色列表
        path: "/roles",
        name: "roles",
        component: () => import("../views/Authority/RolesView.vue")
      },
      {
        // 权限列表
        path: "/rights",
        name: "rights",
        component: () => import("../views/Authority/RightsView.vue")
      },
      {
        // 商品管理
        // 商品列表
        path: "/goods",
        name: "goods",
        component: () => import("../views/Goods/GoodsView.vue")
      },
      {
        // 商品列表 添加页面
        path: "/addList",
        name: "addList",
        component: () => import("../views/Goods/AddList.vue")
      },
      {
        // 参数列表
        path: "/params",
        name: "params",
        component: () => import("../views/Goods/ParamsView.vue")
      },
      {
        // 商品分类
        path: "/categories",
        name: "categories",
        component: () => import("../views/Goods/CateGories.vue")
      },
      {
        // 订单管理
        // 订单列表
        path: "/orders",
        name: "orders",
        component: () => import("../views/Orders/OrdersView.vue")
      },
      {
        // 数据统计
        // 数据报表
        path: "/reports",
        name: "reports",
        component: () => import("../views/Reports/ReportsView.vue")
      }
    ]
  },
  {
    // 登录页面
    path: "/login",
    name: "login",
    component: () => import("../views/Common/LoginView.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
