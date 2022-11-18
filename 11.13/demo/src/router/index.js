import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        // 图书管理
        path: '/books',
        name: 'books',
        component: () => import('../views/Books.vue')
      },
      {
        // 后台管理
        path: '/home',
        name: 'home',
        component: () => import('../views/Mome.vue')
      },
      {
        // 国际化
        path: '/inter',
        name: 'inter',
        component: () => import('../views/Inter.vue')
      },
      {
        // 基础表格
        path: '/basics',
        name: 'basics',
        component: () => import('../views/Basics.vue')
      },
      {
        // tab选项卡
        path: '/tab',
        name: 'tab',
        component: () => import('../views/Tab.vue')
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
