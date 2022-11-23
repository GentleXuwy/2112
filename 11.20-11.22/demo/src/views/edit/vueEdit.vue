<template>
  <div>
    <el-container>
      <!-- 文本编辑 -->
       <el-header>
        <!-- 面包屑 -->
       <el-breadcrumb separator="/" class="bread">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>编辑</el-breadcrumb-item>
         <el-breadcrumb-item>文本编辑</el-breadcrumb-item>
       </el-breadcrumb>
        <div class="icon"><i class="el-icon-info"></i></div>
      </el-header>


      <el-main>
        <!-- 富文本 -->
        <quill-editor class="rich" v-model="richtext" ref="myQuillEditor">
        </quill-editor>
     
        <div class="submit"><el-button type="primary">提交</el-button></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //富文本内容
      richtext: "", 
    };
  },
  methods: {
    // 富文本的配置
    editorOption() {},
  },
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
.rich {
  height: 280px;
}
.el-main {
  height: 80vh;
}
.submit{
  margin-top: 100px;
  margin-left: 500px;
}
</style>

