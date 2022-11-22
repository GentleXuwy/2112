<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <!-- 侧边导航 -->
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="/manage">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 数据管理 -->
      <el-submenu index="/userList">
        <template slot="title">
          <i class="el-icon-document-remove"></i>
          <span>数据管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userList">用户列表</el-menu-item>
        </el-menu-item-group>
       <el-menu-item-group>
          <el-menu-item index="/shopList">商家列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/foodList">食品列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/orderList">订单列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/adminList">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- 添加数据 -->
      <el-submenu index="/addShop">
        <template slot="title">
          <i class="el-icon-plus"></i>
          <span>添加数据</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addShop">添加商铺</el-menu-item>
        </el-menu-item-group>
       <el-menu-item-group>
          <el-menu-item index="/addGoods">添加商品</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- 图表 -->
      <el-submenu index="/visitor">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span>图表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/visitor">用户分布</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- 编辑 -->
      <el-submenu index="/vueEdit">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span>编辑</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/vueEdit">文本编辑</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
      <!-- 设置 -->
      <el-submenu index="/adminSet">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/adminSet">管理员设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
      <!-- 说明 -->
      <el-submenu index="/explain">
        <template slot="title">
          <i class="el-icon-warning"></i>
          <span>说明</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/explain">说明</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
      </el-aside>
      <el-main>
        <!-- 坑 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  components: {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.el-aside,
.el-main {
  height: 100vh;
}
</style>

