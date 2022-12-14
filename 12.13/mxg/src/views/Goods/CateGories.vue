<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 头部添加按钮 -->
      <el-button size="mini" type="primary" @click="add">添加分类</el-button>
      <el-table :data="list" style="width: 100%" row-key="cat_id" border :tree-props="{ children: 'children' }">
        <!-- 表格 -->
        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
        <el-table-column label="是否有效">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="scope.row.cat_deleted == false"
              type="success"
              icon="el-icon-check"
              circle
            ></el-button>
            <el-button v-else size="mini" type="danger" icon="el-icon-close" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.cat_level == 0" size="mini">一级</el-button>
            <el-button type="success" v-if="scope.row.cat_level == 1" size="mini">二级</el-button>
            <el-button type="warning" v-if="scope.row.cat_level == 2" size="mini">三级</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
    <cateadd v-if="visivle" ref="addedits" @confirm="confirm"></cateadd>
  </div>
</template>

<script>
import cateadd from "./cateAdd.vue"
import { GoodsCate, cateAdd, cateDel, cateEdit } from "@/api/cate"
export default {
  components: { cateadd },
  data() {
    return {
      //分页
      pagenum: 1,
      pagesize: 5,
      list: [],
      total: 0,
      visivle: false,
      edit: -1
    }
  },
  methods: {
    // 获取商品分类
    gitCate(type = "") {
      GoodsCate({ type, pagenum: this.pagenum, pagesize: this.pagesize }).then((res) => {
        console.log(res)
        this.total = res.data.data.total
        this.list = res.data.data.result
      })
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.gitCate()
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      this.gitCate()
    },
    // 点击添加打开模态框
    add() {
      this.visivle = true
      this.edit = -1
      this.$nextTick(() => {
        this.$refs.addedits.info(this.edit)
      })
    },
    // 点击编辑打开模态框，回填数据
    handleEdit(index, row) {
      this.visivle = true
      this.edit = row.id
      this.$nextTick(() => {
        this.$refs.addedits.backfill(row)
      })
    },
    // 确认添加或确认编辑
    confirm(ruleForm) {
      console.log(ruleForm)
      if (this.edit == -1) {
        cateAdd(ruleForm).then((res) => {
          if (res.data.meta.status == 201) {
            this.gitCate()
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            })
          }
        })
      } else {
        cateEdit(ruleForm).then((res) => {
          if (res.data.meta.status == 200) {
            this.gitCate()
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            })
          }
        })
      }
      this.visivle = false
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          cateDel({ id: row.cat_id }).then((res) => {
            console.log(res)
            if (res.data.meta.status == 200) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              })
            }
          })
          this.gitCate()
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
    this.gitCate()
  },
  mounted() {},

  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
