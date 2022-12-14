<template>
  <div>
    <el-dialog :title="edit == -1 ? '添加角色' : '编辑角色'" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="attr_name">
          <el-input v-model="ruleForm.attr_name"></el-input>
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
  data() {
    return {
      dialogFormVisible: false,
      edit: -1,
      ruleForm: {
        attr_name: ""
      },
      rules: {
        attr_name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      }
    }
  },
  methods: {
    // 控制对话框的显示与隐藏
    info(edit) {
      this.edit = edit
      this.dialogFormVisible = true
    },
    // 点击确认表单不为空就把数据传给父
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
    // 点击编辑数据回填对话框显示
    backfill(row) {
      console.log(row)
      this.edit = row.id
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.ruleForm.attr_name = row.attr_name
      })
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
