<template>
  <div>
    <el-container>
      <el-header>
        <div class="left">
          <i @click="isCollapse=!isCollapse" v-if="isCollapse==false" class="el-icon-s-unfold"></i>
          <i @click="isCollapse=!isCollapse" v-else class="el-icon-s-fold"></i>
          <h1>后台管理系统</h1>
        </div>
        <div class="right">
          <i class="el-icon-menu" @click="screen"></i>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse?'65px':'200px'">
            <el-menu
          default-active="2"
          router :collapse="isCollapse"
          class="el-menu-vertical-demo">
          <el-submenu index="/books">
            <template slot="title">
              <i class="el-icon-reading"></i>
              <span>图书管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/books">选项1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/home">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span>后台管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home">选项1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/inter">
            <template slot="title">
              <i class="el-icon-s-flag"></i>
              <span>国际化</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/inter">选项1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/basics">
            <i class="el-icon-menu"></i>
            <span slot="title">基础表格</span>
          </el-menu-item>
          <el-menu-item index="/tab">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">tab选项卡</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
        <el-main>
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
      // 展开收起侧边导航
      isCollapse: false,
      // 展示收起全屏
      fullscreen:false
    };
  },
  methods: {
    // 显示全屏
    screen(){
       let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.el-header {
  background-color: #232f43;
  color: #fff;
  height: 80vh;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    h1 {
      margin-left: 10px;
    }
  }
  i {
    font-size: 26px;
    margin-top: 18px;
  }
}

.el-main {
  // background-color: #E9EEF3;
  color: #333;
  // text-align: center;
  height: 92vh;
}
</style>
