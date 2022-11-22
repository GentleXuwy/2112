<template>
  <div>
    <!-- 管理员列表 -->
     <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 面包屑 -->
       <el-breadcrumb separator="/" class="bread">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>数据管理</el-breadcrumb-item>
         <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
       </el-breadcrumb>
        <div class="icon"><i class="el-icon-info"></i></div>
      </el-header>
     
     <!-- 内容部分 -->
      <el-main>
        <!-- 表格 -->
        <el-table :data="adList" style="width: 100%">
          <el-table-column prop="user_name" label="姓名"></el-table-column>
          <el-table-column prop="create_time" label="注册日期"></el-table-column>
          <el-table-column prop="city" label="地址"></el-table-column>
          <el-table-column prop="admin" label="管理员"></el-table-column>
        </el-table>
     
         <!-- 分页 -->
         <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page="pageNum"
           :page-sizes="[3, 5, 10, 15]"
           :page-size="pageSize"
           layout="total, sizes, prev, pager, next, jumper"
           :total="adminList.length"
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
      // 获取的数据
      adminList: [],
        //每页5条数据
      pageSize: 5,
      //默认第1页
      pageNum: 1
    };
  },
  methods: {
    // 请求数据
    getAdmin() {
      axios
        .get("https://elm.cangdu.org/admin/all?offset=0&limit=20")
        .then(res => {
          console.log(res);
          this.adminList = res.data.data;
        });
    },
    // 分页
    handleSizeChange(val) {
      //   console.log(val);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      //   console.log(val);
      this.pageNum = val;
    },
  },
  created() {
    this.getAdmin();
  },
  mounted() {},
  components: {},
  computed: {
     // 计算分页
    adList() {
      return this.adminList.slice(
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
