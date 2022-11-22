import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/manage',  // 重定向:重新指向其它path,会改变网址
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        // 首页
        path: '/manage',
        name: 'manage',
        component: () => import('../views/manage.vue')
      }, {
        // 数据管理部分---------------------------------------------
        // 用户列表
        path: '/userList',
        name: 'userList',
        component: () => import('../views/user/userList.vue')
      }
      , {
        // 商家列表
        path: '/shopList',
        name: 'shopList',
        component: () => import('../views/user/shopList.vue')
      }
      , {
        // 食品列表
        path: '/foodList',
        name: 'foodList',
        component: () => import('../views/user/foodList.vue')
      }
      , {
        // 订单列表
        path: '/orderList',
        name: 'orderList',
        component: () => import('../views/user/orderList.vue')
      }, {
        // 管理员列表
        path: '/adminList',
        name: 'adminList',
        component: () => import('../views/user/adminList.vue')
      },
      {
        // 添加数据部分------------------------------------------
        // 添加商铺
        path: '/addShop',
        name: 'addShop',
        component: () => import('../views/add/addShop.vue')
      },
      {
        // 添加商品
        path: '/addGoods',
        name: 'addGoods',
        component: () => import('../views/add/addGoods.vue')
      }, 
      {
        // 图表-------------------------------------------
        // 用户分布
        path: '/visitor',
        name: 'visitor',
        component: () => import('../views/chart/visitor.vue')
      }, 
      {
        // 编辑-------------------------------------------
        // 文本编辑
        path: '/vueEdit',
        name: 'vueEdit',
        component: () => import('../views/edit/vueEdit.vue')
      }, 
      {
        // 设置-------------------------------------------
        // 管理员设置
        path: '/adminSet',
        name: 'adminSet',
        component: () => import('../views/set/adminSet.vue')
      }, 
      {
        // 说明-------------------------------------------
        // 说明
        path: '/explain',
        name: 'explain',
        component: () => import('../views/explain/explain.vue')
      }, 
    ]
  },


]

const router = new VueRouter({
  routes
})

export default router
