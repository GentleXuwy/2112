<template>
  <div class="box">
    <!-- 说明 -->
    <el-container>
       <!-- 头部 -->
      <el-header>
        <!-- 面包屑 -->
       <el-breadcrumb separator="/" class="bread">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>说明</el-breadcrumb-item>
         <el-breadcrumb-item>说明</el-breadcrumb-item>
       </el-breadcrumb>
        <div class="icon"><i class="el-icon-info"></i></div>
      </el-header>
      
      <!-- 内容部分 -->
      <el-main>
        <div class="wrap">
          <div class="top">node-elm后台管理系统</div>
          <div class="top1">第一次登录的用户自动注册成为普通管理员</div>
          <div class="top2">普通管理员可以添加，修改信息</div>
          <div class="top3">超级管理员可以删除信息</div>
        </div>
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
  watch: {},
};
</script>

<style lang='scss' scoped>
.el-header {
  background: #eff2f7;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  .bread {
    margin-top: 20px;
  }
  .icon {
    margin-top: 10px;
    font-size: 30px;
  }
}
.wrap {
  width: 500px;
  margin: 0 auto;
  font-size: 20px;
}
.top {
  margin-left: 130px;
}
.top1 {
  margin-left: 30px;
  margin-top: 20px;
}
.top2 {
  margin-left: 100px;
  margin-top: 20px;
}
.top3 {
  margin-left: 130px;
  margin-top: 20px;
}
</style>
