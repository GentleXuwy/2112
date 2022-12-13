<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <el-button type="primary" @click="add">添加角色</el-button>
      <el-table :data="roles" style="width: 100%">
        <el-table-column type="expand">
          <!-- <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template> -->
        </el-table-column>
        <el-table-column type="index" label="#" width="180"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" icon="el-icon-delete" type="danger" @click="del(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色的模态框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="35%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" v-show="title == '添加角色'" @click="submitForm('ruleForm')">确定</el-button>
          <el-button type="primary" v-show="title == '修改角色'" @click="amend('ruleForm')">确定修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
      ruleForm: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        roleDesc: [{ required: true, message: "请输入角色描述", trigger: "blur" }]
      },
      dialogVisible: false,
      title: "添加角色",
      id: ""
    }
  },
  methods: {
    // 获取数据
    getRoles() {
      this.$http({ url: this.$http.addorUrl("/roles"), methods: "get" }).then((res) => {
        // console.log(res)
        this.roles = res.data.data
      })
    },
    // 点击修改打开模态框
    edit(index, row) {
      // console.log(index, row)
      this.dialogVisible = true
      this.title = "修改角色"
      // 数据回填
      this.ruleForm.roleName = row.roleName
      this.ruleForm.roleDesc = row.roleDesc
      this.id = row.id
    },
    // 删除
    del(index, row) {
      console.log(index, row)
      this.$http({ url: this.$http.addorUrl("/roles/" + row.id), method: "delete" }).then((res) => {
        // console.log(res)
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (res.data.meta.status == 200) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              })
            }
            this.$message({
              type: "success",
              message: "删除成功!"
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            })
          })
        this.getRoles()
      })
    },
    // 点击添加打开模态框
    add() {
      this.dialogVisible = true
      this.title = "添加角色"
      // 添加后清空输入框
      this.ruleForm = {
        roleName: "",
        roleDesc: ""
      }
    },
    // 确认添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({ url: this.$http.addorUrl("/roles"), data: this.ruleForm, method: "post" }).then((res) => {
            // console.log(res)
            if (res.data.meta.status == 201) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              })
            }
            this.dialogVisible = false
            this.getRoles()
            // 添加后清空输入框
            this.ruleForm = {
              roleName: "",
              roleDesc: ""
            }
          })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    // 确认修改
    amend() {
      this.$http({ url: this.$http.addorUrl(`/roles/${this.id}`), data: this.ruleForm, method: "put" }).then((res) => {
        console.log(res)
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          })
        }
        this.dialogVisible = false
        this.getRoles()
      })
    },
    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  created() {
    this.getRoles()
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
