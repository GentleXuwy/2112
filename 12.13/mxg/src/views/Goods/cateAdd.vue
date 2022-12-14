<template>
  <div>
    <el-dialog :title="edit == -1 ? '添加商品分类' : '修改数据'" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="ruleForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" v-if="edit == -1">
          <el-cascader
            v-model="ruleForm.region"
            :options="options"
            :props="{ label: 'cat_name', value: 'cat_id', checkStrictly: true }"
            clearable
          ></el-cascader>
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
import { GoodsCate } from "@/api/cate"
export default {
  data() {
    return {
      dialogFormVisible: false,
      ruleForm: {
        cat_name: "",
        region: []
      },
      rules: {
        cat_name: [{ required: true, message: "分类名称不能为空", trigger: "blur" }]
      },
      edit: -1,
      options: []
    }
  },
  methods: {
    // 获取父级分类列表数据
    getCate() {
      GoodsCate({ type: [1, 2] }).then((res) => {
        console.log(res)
        if (res.data.data instanceof Array) {
          this.options = res.data.data
        } else {
          this.options = res.data.data.result
        }
      })
    },
    // 控制对话框的显示和隐藏
    info(edit) {
      this.edit = edit
      this.dialogFormVisible = true
    },
    // 点击确认表单不为空就把数据传给父
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.edit == -1) {
            let level = this.ruleForm.region.length
            let pid = level == 0 ? 0 : level == 1 ? this.ruleForm.region[0] : this.ruleForm.region[1]
            this.$emit("confirm", {
              cat_level: level,
              cat_name: this.ruleForm.cat_name,
              cat_pid: pid
            })
          } else {
            this.$emit("confirm", {
              id: this.edit,
              cat_name: this.ruleForm.cat_name
            })
          }

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
        this.ruleForm.cat_name = row.cat_name
      })
    }
  },
  created() {
    this.getCate()
  },
  mounted() {},
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
