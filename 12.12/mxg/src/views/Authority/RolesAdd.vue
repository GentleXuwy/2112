<template>
  <div>
    <!-- 添加角色的模态框 -->
    <el-dialog :title="edit == -1 ? '添加角色' : '编辑角色'" :visible.sync="dialogVisible" width="35%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        roleDesc: [{ required: true, message: "请输入角色描述", trigger: "blur" }]
      },
      dialogVisible: false,
      edit: -1
    }
  },
  methods: {
    // 对话框的显示与隐藏
    info() {
      console.log("111")
      this.dialogVisible = true
    },
    // 点击确认将数据传给父组件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("adding", this.ruleForm)
          this.dialogVisible = false
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    // 点击编辑数据回填对话框显示
    compile(row) {
      console.log(row)
      this.edit = row.id
      this.dialogVisible = true
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
