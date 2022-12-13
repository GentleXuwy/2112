<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <div class="top">
        <!-- 搜索框 -->
        <div style="margin-top: 15px">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="page.query" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search"> </el-button>
          </el-input>
        </div>
        <!-- 添加按钮 -->
        <el-button class="but" type="primary" @click="add">添加用户</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="user" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="change(scope.row.id, scope.row.mg_state)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              size="mini"
              type="primary"
              @click="edit(scope.$index, scope.row)"
              icon="el-icon-edit"
            ></el-button>
            <!-- 删除 -->
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="del(scope.$index, scope.row)"
            ></el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="page.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加弹框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <!-- 表单 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" :disabled="title == '编辑用户'"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" v-show="title == '添加用户'">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" v-show="title == '添加用户'" @click="submitForm('ruleForm')">确定</el-button>
          <el-button type="primary" v-show="title == '编辑用户'" @click="amend('ruleForm')">确定修改</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [],
      //分页
      page: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      // 添加表单
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 添加正则
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入电话", trigger: "blur" }]
      },
      dialogVisible: false,
      title: "添加用户",
      // 修改的id
      ids: ""
    }
  },
  methods: {
    // 获取数据
    getList() {
      this.$http({ url: this.$http.addorUrl("/users"), params: this.page, method: "get" }).then((res) => {
        this.user = res.data.data.users
        // 获取总条数
        this.total = res.data.data.total
      })
    },
    //状态
    change(id, status) {
      this.$http({ url: this.$http.addorUrl(`users/${id}/state/${status}`), method: "put" }).then((res) => {
        // console.log(res)
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          })
        }
        this.getList()
      })
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.page.pagesize = val
      this.getList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page.pagenum = val
      this.getList()
    },
    // 点击添加按钮打开模态框
    add() {
      this.dialogVisible = true
      this.title = "添加用户"
      this.ruleForm = {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }
    },
    // 点击编辑打开模态框,数据回填
    edit(i, val) {
      console.log(i, val, "12")
      this.dialogVisible = true
      this.title = "编辑用户"
      this.ruleForm.username = val.username
      this.ruleForm.email = val.email
      this.ruleForm.mobile = val.mobile
      this.ids = val.id
    },
    // 确定修改
    amend() {
      this.$http({ url: this.$http.addorUrl(`/users/${this.ids}`), data: this.ruleForm, method: "put" }).then((res) => {
        console.log(res)
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          })
        }
        this.getList()
        this.dialogVisible = false
      })
    },
    // 确定添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 添加
          this.$http({ url: this.$http.addorUrl("/users"), data: this.ruleForm, method: "post" }).then((res) => {
            // console.log(res)
            if (res.data.meta.status == 201) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              })
            }
            this.getList()
            this.dialogVisible = false
            this.ruleForm = {
              username: "",
              password: "",
              email: "",
              mobile: ""
            }
          })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 删除
    del(i, val) {
      this.$http({ url: this.$http.addorUrl("/users/" + val.id), method: "delete" }).then((res) => {
        // console.log(res)
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          })
        }
        this.getAdd()
      })
    },
    // 搜索
    search() {
      this.getList()
    }
  },
  created() {
    this.getList()
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
  .top {
    display: flex;
    margin-bottom: 20px;
    .but {
      margin: 12px 0 0 20px;
      height: 43px;
    }
  }
}
</style>
