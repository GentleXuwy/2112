<template>
  <div>
    <el-dialog title="修改地址" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="详细地址" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="省市区/县" prop="city">
          <el-cascader :options="cityOptions" v-model="ruleForm.city" change-on-select> </el-cascader>
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
import cityOptions from "@/assets/city_data2017_element"
export default {
  data() {
    return {
      cityOptions: [],
      ruleForm: {
        name: "",
        city: ""
      },
      rules: {
        name: [{ required: true, message: "请输入详情地址", trigger: "blur" }],
        city: [{ required: true, message: "请选择省市区", trigger: "blur" }]
      },
      dialogFormVisible: false
    }
  },
  methods: {
    // 控制对话框的显示与隐藏
    info() {
      this.dialogFormVisible = true
    },
    // 点击确认表单，它不为空就把数据传递给父
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
    }
  },
  created() {
    this.cityOptions = cityOptions
  },
  mounted() {},
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
