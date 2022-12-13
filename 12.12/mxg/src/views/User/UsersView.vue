<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <div class="top">
        <!-- 搜索框 -->
        <myInput v-model="value" @search="search"></myInput>
        <!-- 添加按钮 -->
        <el-button class="but" type="primary" @click="add">添加用户</el-button>
      </div>
      <!-- 表格 -->
      <el-table ref="singleTable" :data="list" highlight-current-row style="width: 100%" border>
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column property="username" label="姓名"> </el-table-column>
        <el-table-column property="email" label="邮箱"> </el-table-column>
        <el-table-column property="mobile" label="电话"> </el-table-column>
        <el-table-column property="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="change(scope.row, scope.row.mg_state)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <!-- 删除 -->
            <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button>
            <el-button size="mini" type="warning" @click="allot(scope.$index, scope.row)"
              ><i class="el-icon-setting"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 添加修改的子组件 -->
      <useradd v-if="visivle" ref="addedits" @confirm="confirm" :edit="edit"></useradd>
      <!-- 分配角色弹框 -->
      <rolelist v-if="visivleRole" ref="roles" @part="part"></rolelist>
    </el-card>
  </div>
</template>

<script>
// mock数据
import { users, addUsers, editUser, deleteUser, typeUser, role } from "@/api/user"
// 引入子组件
import useradd from "./UserAdd"
import rolelist from "./RoleList.vue"
import myInput from "@/components/MyInput"
export default {
  components: {
    myInput,
    useradd,
    rolelist
  },
  data() {
    return {
      // 分页
      pagenum: 1,
      pagesize: 5,
      // 搜索框
      value: "",
      // 获取的数据
      list: [],
      // 分页数量
      total: 0,
      // 添加模态框
      visivle: false,
      // 修改
      edit: -1,
      // 修改的模态框
      visivleRole: false
    }
  },
  methods: {
    // 获取数据
    getUser(query = "") {
      users({
        query: query,
        pagenum: this.pageCurrent,
        pagesize: this.pageSize
      }).then((res) => {
        console.log(res)
        // 获取列表数据
        this.list = res.data.data.users
        // 获取总数
        this.total = res.data.data.total
      })
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.getUser()
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      this.getUser()
    },
    // 点击添加弹出模态框
    add() {
      this.visivle = true
      this.edit = -1
      this.$nextTick(() => {
        this.$refs.addedits.info()
      })
    },
    // 点击编辑弹出模态框，回填数据
    handleEdit(index, row) {
      this.visivle = true
      this.edit = row.id
      this.$nextTick(() => {
        this.$refs.addedits.amend(row)
      })
    },
    // 确认添加
    confirm(ruleForm) {
      if (this.edit == -1) {
        addUsers(ruleForm).then((res) => {
          if (res.data.meta.status == 201) {
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            })
            this.getUser()
          }
        })
      } else {
        // 确认编辑
        editUser({
          id: this.edit,
          email: ruleForm.email,
          mobile: ruleForm.mobile
        }).then((res) => {
          if (res.data.meta.status == 200) {
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            })
            this.getUser()
          }
        })
      }
      this.visivle = false
    },
    // 点击删除数据
    del(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser(row.id).then((res) => {
            // console.log(res)
            if (res.data.meta.status == 200) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              })
            }
          })
          this.getUser()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    // 点击修改用户状态
    change(row) {
      typeUser({ cid: row.id, type: row.mg_state }).then((res) => {
        console.log(res)
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          })
        }
        this.getUser()
      })
    },
    // 搜索
    search() {
      this.getUser(this.value)
    },
    // 点击弹出分配权限并回填数据
    allot(index, row) {
      this.visivleRole = true
      // console.log(this.$refs.roles)
      this.$nextTick(() => {
        this.$refs.roles.info(row)
      })
    },
    // 点击确认修改用户角色
    part(data) {
      role({ id: data.id, rid: data.rid }).then((res) => {
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          })
        }
        this.visivleRole = false
      })
    }
  },
  created() {
    this.getUser(this.value)
  },
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 10px;
  .top {
    display: flex;
    margin-bottom: 20px;
    .but {
      margin: 0 0 0 20px;
      height: 43px;
    }
  }
}
</style>
