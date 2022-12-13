<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-table :data="rights" border stripe style="width: 100%">
        <el-table-column type="index" label="#" width="180"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain v-show="scope.row.level == 0">一级</el-button>
            <el-button type="success" size="mini" plain v-show="scope.row.level == 1">二级</el-button>
            <el-button type="warning" size="mini" plain v-show="scope.row.level == 2">三级</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { rightsList } from "@/api/rights"
export default {
  data() {
    return {
      rights: []
    }
  },
  methods: {
    getRights() {
      rightsList({ type: "list" }).then((res) => {
        console.log(res)
        this.rights = res.data.data
      })
    }
  },
  created() {
    this.getRights()
  },
  mounted() {},
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 10px;
}
</style>
