<template>
  <div>
    <!-- 订单列表 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 面包屑 -->
       <el-breadcrumb separator="/" class="bread">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>数据管理</el-breadcrumb-item>
         <el-breadcrumb-item>订单列表</el-breadcrumb-item>
       </el-breadcrumb>
        <div class="icon"><i class="el-icon-info"></i></div>
      </el-header>
     
     <!-- 内容部分 -->
      <el-main>
        <!-- 表格 -->
       <el-table :data="oList" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="用户名">
                  <span>{{ props.row.restaurant_name }}</span>
                </el-form-item>
                <el-form-item label="店铺名称">
                  <span>{{ props.row.time_pass }}</span>
                </el-form-item>
                <el-form-item label="收货地址">
                  <span>{{ props.row.order_time }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.unique_id }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.total_quantity }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="订单 ID" prop="address_id"> </el-table-column>
          <el-table-column label="总价格" prop="total_amount">
          </el-table-column>
          <el-table-column label="订单状态" prop="status_bar.title">
          </el-table-column>
        </el-table>
     
         <!-- 分页 -->
         <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page="pageNum"
           :page-sizes="[3, 5, 10, 15]"
           :page-size="pageSize"
           layout="total, sizes, prev, pager, next, jumper"
           :total="orderList.length"
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
      orderList: [],
      //每页5条数据
      pageSize: 5,
      //默认第1页
      pageNum: 1
    };
  },
  methods: {
    // 请求数据
    getList() {
      axios
        .get(
          "https://elm.cangdu.org/bos/orders?offset=0&limit=20&restaurant_id=undefined"
        )
        .then(res => {
          console.log(res);
          this.orderList = res.data;
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
    }
  },
  created() {
    this.getList();
  },
  mounted() {},
  components: {},
  computed: {
    // 计算分页
    oList() {
      return this.orderList.slice(
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
