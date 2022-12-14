<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <el-button type="primary" @click="add">添加角色</el-button>

      <!-- 表格 -->
      <el-table stripe ref="singleTable" :data="roles" highlight-current-row style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="roles-slot">
              <el-row v-for="item in props.row.children" :key="item.id" style="border: 1px solid #ccc">
                <el-col :span="5" style="border-left: 1px solid #ccc">
                  <el-button type="primary"
                    >{{ item.authName }} <i class="el-icon-close" @click="delRoles(props.row.id, item.id)"></i
                  ></el-button>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="16">
                  <el-row v-for="ele in item.children" :key="ele.id">
                    <el-col :span="8">
                      <el-button type="success"
                        >{{ ele.authName }} <i class="el-icon-close" @click="delRoles(props.row.id, ele.id)"></i
                      ></el-button>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="12">
                      <el-button v-for="i in ele.children" :key="i.id" type="warning"
                        >{{ i.authName }} <i class="el-icon-close" @click="delRoles(props.row.id, i.id)"></i></el-button
                    ></el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column property="roleName" label="角色名称"> </el-table-column>
        <el-table-column property="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="amend(scope.$index, scope.row)"
              ><i class="el-icon-edit">编辑</i></el-button
            >
            <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)"
              ><i class="el-icon-delete">删除</i></el-button
            >
            <el-button size="mini" type="warning" @click="privileges(scope.row)"
              ><i class="el-icon-setting">分配权限</i></el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹出框的 -->
    <rolesadd v-if="visivle" ref="addEdit" @adding="adding"></rolesadd>
    <!-- 分配权限的弹框 -->
    <privileges v-if="visivlePri" ref="leges" @privileges="privileges"></privileges>
  </div>
</template>

<script>
import { roles, addRoles, editRoles, deleteRoles } from "@/api/roles"
// 引入子组件
import rolesadd from "./RolesAdd.vue"
import privileges from "./PriviLeges.vue"
export default {
  components: {
    rolesadd,
    privileges
  },
  data() {
    return {
      roles: [],
      visivle: false,
      visivlePri: false,
      edit: -1,
      roleId: -1
      // 当前修改权限的id
    }
  },
  methods: {
    // 获取数据
    getRolesList() {
      roles().then((res) => {
        // console.log(res)
        this.roles = res.data.data
      })
    },
    // 点击添加打开模态框
    add() {
      this.visivle = true
      this.edit = -1
      this.$nextTick(() => {
        this.$refs.addEdit.info()
      })
    },
    // 点击修改打开模态框,回填数据
    amend(index, row) {
      this.visivle = true
      this.edit = row.id
      this.$nextTick(() => {
        this.$refs.addEdit.compile(row)
      })
    },

    adding(ruleForm) {
      // 确认添加
      if (this.edit == -1) {
        addRoles(ruleForm).then((res) => {
          if (res.data.meta.status == 201) {
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            })
            this.getRolesList()
          }
        })
      } else {
        // 确认修改
        editRoles({
          id: this.edit,
          roleName: ruleForm.roleName,
          roleDesc: ruleForm.roleDesc
        }).then((res) => {
          if (res.data.meta.status == 200) {
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            })
            this.getRolesList()
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
          deleteRoles(row.id).then((res) => {
            console.log(res)
            if (res.data.meta.status == 200) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              })
            }
            this.getRolesList()
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    // 点击分配权限显示并显示拥有的权限
    privileges(row) {
      console.log(row)
    }
  },
  created() {
    this.getRolesList()
  },
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 10px;
}
</style>
