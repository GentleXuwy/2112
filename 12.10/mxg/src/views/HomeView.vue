<template>
  <div>
    <el-container>
      <!-- 左侧 -->
      <el-aside :width="flag ? '65px' : '200px'">
        <h2>电商后台管理系统</h2>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="flag"
          router
        >
          <el-submenu :index="item.path" v-for="(item, i) in menus" :key="i">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="ele.path" v-for="(ele, index) in item.children" :key="index">{{
                ele.authName
              }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <i class="el-icon-s-operation" @click="flag = !flag"></i>
          <el-button type="info" @click="quit">退出</el-button>
        </el-header>
        <el-main>
          <!-- 坑 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 展开收起
      flag: false,
      menus: []
    }
  },
  methods: {
    // 退出登录
    quit() {
      this.$confirm("您确认退出登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 先清空
          sessionStorage.removeItem("token")
          // 再跳转
          this.$router.push({ path: "/login" })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          })
        })
    }
  },
  created() {
    // 获取侧边栏
    this.$http({ url: this.$http.addorUrl("/menus"), method: "get" }).then((res) => {
      // console.log(res)
      this.menus = res.data.data
    })
  },
  mounted() {},
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #373d41;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  i {
    font-size: 28px;
    margin: 8px 0 0 20px;
    color: #fff;
  }
}

.el-aside {
  background-color: #333744;
  color: #333;
  height: 92vh;
  h2 {
    color: #fff;
    margin: 15px 1px;
    width: 200px;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 92vh;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
