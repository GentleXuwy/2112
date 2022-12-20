<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <div class="top">
        <myInput v-model="value" @search="search"></myInput>
        <el-button class="but" type="primary" @click="add">添加用户</el-button>
      </div>
      <!-- 表格 -->
      <el-table ref="singleTable" :data="list" highlight-current-row style="width: 100%" border>
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column property="goods_name" label="商品名称" width="615px"> </el-table-column>
        <el-table-column property="goods_price" label="商品价格"> </el-table-column>
        <el-table-column property="goods_number" label="商品重量"> </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.add_time | times }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edits(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button>
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
  </div>
</template>

<script>
import myInput from "@/components/MyInput"
import { getGoods, delGoods } from "@/api/goods"
export default {
  components: { myInput },
  data() {
    return {
      // 搜索
      value: "",
      //  分页
      pagenum: 1,
      pagesize: 5,
      // 获取的数据
      list: [],
      // 总数
      total: 0,
      edit: -1
    }
  },
  methods: {
    // 获取商品列表数据
    goodsList(query = "") {
      getGoods({
        query: query,
        pagenum: this.pageCurrent,
        pagesize: this.pageSize
      }).then((res) => {
        console.log(res)
        this.list = res.data.data.goods
        this.total = res.data.data.total
      })
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.goodsList()
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      this.goodsList()
    },
    // 搜索
    search() {
      this.goodsList(this.value)
    },
    // 添加数据
    add() {
      this.edit = -1
      this.$router.push({ name: "goodsadd", params: { edit: this.edit } })
    },
    // 点击编辑数据回填
    edits(index, row) {
      console.log(row)
      this.edit = row.goods_id
      this.$router.push({ name: "goodsadd", params: { row, edit: this.edit } })
    },
    // 删除
    del(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delGoods({ id: row.goods_id }).then((res) => {
            console.log(res)
            if (res.data.meta.status == 200) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              })
            }
          })
          this.goodsList()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    }
  },
  created() {
    this.goodsList()
  },
  mounted() {},
  computed: {},
  watch: {},
  filters: {
    times(val) {
      return new Date(val * 1000).toLocaleString()
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  margin-bottom: 20px;
  .but {
    margin: 12px 0 0 20px;
    height: 43px;
  }
}
</style>
