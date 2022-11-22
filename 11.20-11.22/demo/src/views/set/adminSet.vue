<template>
  <div>
    <el-container>
      <!-- 管理员设置 -->
      <!-- 头部 -->
      <el-header>
        <!-- 面包屑 -->
       <el-breadcrumb separator="/" class="bread">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>设置</el-breadcrumb-item>
         <el-breadcrumb-item>管理员设置</el-breadcrumb-item>
       </el-breadcrumb>
        <div class="icon"><i class="el-icon-info"></i></div>
      </el-header>

     <!-- 内容部分 -->
      <el-main>
        <div class="centers">管理员设置</div>
        <div class="wrap">
          <div class="top">姓名：</div>
          <div class="top">注册时间：</div>
          <div class="top">管理员权限：</div>
          <div class="top">管理员ID：</div>
          <div class="top">更换头像：</div>
          <!-- 图片框框 -->
          <div>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
.centers {
  font-size: 22px;
  margin-left: 600px;
}
.wrap {
  width: 700px;
  height: 400px;
  background: #f9fafc;
  margin: 30px 0 0 280px;
}
.top {
  padding-top: 25px;
  padding-left: 15px;
  font-size: 18px;
}
</style>
