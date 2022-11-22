<template>
  <div>
    <!-- 用户列表 -->
     <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/" class="bread">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="icon"><i class="el-icon-info"></i></div>
      </el-header>
  
     <!-- 内容部分 -->
      <el-main>
        <!-- 表格 -->
     <el-table
        :data="resList"
        style="width: 100%">
        <el-table-column label="#" type="index" width="180"></el-table-column>
        <el-table-column prop="registe_time" label="注册日期" width="180"></el-table-column>
        <el-table-column prop="username" label="用户姓名"></el-table-column>
        <el-table-column prop="city" label="注册地址"></el-table-column>
     </el-table>

      <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsList.length"
    >
    </el-pagination>
      </el-main>
    </el-container>

 </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 获取到的数据
      goodsList: [],
      //每页5条数据
      pageSize: 5,
      //默认第1页
      pageNum: 1
    };
  },
  methods: {
    // 获取用户列表的数据
    getList() {
      axios.get("https://elm.cangdu.org/v1/users/list").then(res => {
        // console.log(res);
        this.goodsList = res.data;
      });
    },
    // 分页的
    handleSizeChange(val) {
      // console.log(val);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.pageNum = val;
    }
  },
  created() {
    this.getList();
  },
  mounted() {},
  components: {},
  computed: {
    // 计算分页
    resList() {
      return this.goodsList.slice(
        this.pageSize * (this.pageNum - 1),
        this.pageSize * this.pageNum
      );
    }
  },
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
</style>
