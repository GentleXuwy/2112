<template>
  <div>
    <!-- 模态框 -->
    <el-dialog :title="edit == -1 ? '添加用户' : '编辑用户'" :visible.sync="dialogFormVisible">
      <!-- 表单 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" :prop="edit != -1 ? ' ' : 'username'">
          <el-input v-model="ruleForm.username" :disabled="edit != -1"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="edit == -1">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    edit: {
      type: Number
    }
  },
  data() {
    return {
      // 模态框的打开收起
      dialogFormVisible: false,
      // 表单
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 表单的正则
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入电话", trigger: "blur" }]
      }
    }
  },
  methods: {
    // 控制对话框的显示和隐藏
    info() {
      this.dialogFormVisible = true
    },
    // 点击确认按钮把数据传给父组件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("confirm", this.ruleForm)
          this.dialogFormVisible = false
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    //  点击编辑打开对话框，数据回填
    amend(row) {
      console.log(row)
      this.dialogFormVisible = true
      this.ruleForm = row
    }
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
