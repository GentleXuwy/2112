<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <div class="header">
        <myInput v-model="value" @search="search"></myInput>
      </div>
      <el-table ref="singleTable" :data="list" highlight-current-row style="width: 100%" border>
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column property="order_number" label="订单编号"> </el-table-column>
        <el-table-column property="order_price" label="订单价格"> </el-table-column>
        <el-table-column property="mobile" label="是否付款">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.order_pay == 1">已付款</el-button>
            <el-button type="danger" v-else>未付款</el-button>
          </template>
        </el-table-column>
        <el-table-column property="is_send" label="是否发货"> </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ new Date(scope.row.update_time).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edits(scope.row)"><i class="el-icon-edit"></i></el-button>
            <el-button size="mini" type="success" @click="del(scope.row)"><i class="el-icon-s-check"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 3, 4, 5]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <KuaiDi v-if="visivle" ref="keaidi"></KuaiDi>
    <Messages v-if="dialogVisible" ref="messages"></Messages>
  </div>
</template>

<script>
import myInput from "@/components/MyInput"
import Messages from "./MessaGes.vue"
import { orders } from "@/api/order"
import KuaiDi from "./KuaiDi.vue"

export default {
  components: {
    myInput,
    Messages,
    KuaiDi
  },
  data() {
    return {
      // 搜索
      value: "",
      //分页
      pagenum: 1,
      pagesize: 5,
      //渲染页面数据
      list: [],
      //总条数
      total: 0,
      visivle: false,
      edit: -1,
      dialogVisible: false
    }
  },
  methods: {
    // 点击添加打开模态框
    getTable(query = "") {
      orders({
        query: query,
        pagenum: this.pageCurrent,
        pagesize: this.pageSize
      }).then((res) => {
        console.log(res)
        this.list = res.data.data.goods
        // 分页的数据
        this.total = res.data.data.total
      })
    },
    // 获取订单数据
    edits() {
      this.visivleProv = true
      this.$nextTick(() => {
        this.$refs.messages.info()
      })
    },
    // 搜索
    search() {
      this.getTable(this.value)
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.getTable()
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      this.getTable()
    },
    del(row) {
      this.visivle = true
      this.$nextTick(() => {
        this.$refs.keaidi.info(row.id)
      })
    }
  },
  mounted() {},
  created() {
    this.getTable()
  },

  watch: {}
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
}
.box {
  width: 50px;
  height: 20px;
  background: #409eff;
  border-radius: 15%;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #fff;
}
.box1 {
  width: 50px;
  height: 20px;
  background: #f56c6c;
  border-radius: 15%;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #fff;
}
</style>
