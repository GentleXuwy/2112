<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 头部添加按钮 -->
      <el-button type="primary" @click="add">添加分类</el-button>
      <!-- 表格部分 -->
      <el-table
        :data="result"
        style="width: 100%; margin-bottom: 20px"
        row-key="cat_id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="index" label="#" width="60"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" width="280"> </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template>
            <el-button size="mini" type="success" icon="el-icon-check" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template slot-scope="scope">
            <el-button size="mini" v-show="scope.row.cat_level == 0" type="primary">一级</el-button>
            <el-button size="mini" v-show="scope.row.cat_level == 1" type="success">二级</el-button>
            <el-button size="mini" v-show="scope.row.cat_level == 2" type="warning">三级</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" class="el-icon-edit" type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" class="el-icon-delete" @click="del(scope.row.cat_id)">删除</el-button>
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
        style="margin-top: 15px"
      >
      </el-pagination>
    </el-card>

    <!-- 添加编辑对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="form.cat_name"></el-input>
        </el-form-item>

        <el-form-item label="父级分类" v-show="title == '添加商品分类'">
          <el-cascader
            :options="result"
            clearable
            change-on-select
            :props="defaultParams"
            @change="handleChange"
            ref="cascader"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" v-show="title == '添加商品分类'" @click="submit">确定</el-button>
        <el-button type="primary" v-show="title == '修改分类'" @click="amend">确定修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //级联选择器展示内容
      defaultParams: {
        label: "cat_name",
        value: "cat_name",
        children: "children"
      },
      //分页
      page: {
        pagenum: 1,
        pagesize: 5
      },
      result: [], //数据渲染
      total: 0,
      //动态模态框标题
      title: "添加商品分类",
      dialogVisible: false,
      //编辑拿到的id
      id: 0,
      form: {
        cat_name: "",
        cat_level: "",
        cat_pid: ""
      },
      //表单的正则
      rules: {
        cat_name: [{ required: true, message: "分类名称不能为空", trigger: "blur" }]
      }
    }
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.page.pagesize = val
      this.gitCate()
    },
    handleCurrentChange(val) {
      this.page.pagenum = val
      this.gitCate()
    },
    // 获取的数据
    gitCate() {
      this.$http({ url: this.$http.addorUrl("/categories"), params: this.page, method: "get" }).then((res) => {
        // console.log(res)
        this.result = res.data.data.result
        // 获取分页的总数
        this.total = res.data.data.total
      })
    },
    handleChange() {
      ;(this.form.cat_level = this.$refs["cascader"].getCheckedNodes()[0].data.cat_level + 1),
        (this.form.cat_pid = this.$refs["cascader"].getCheckedNodes()[0].data.cat_id)
    },
    // 点击添加按钮打开模态框
    add() {
      this.dialogVisible = true
      this.title = "添加商品分类"
      this.form.cat_name = ""
    },
    // 点击编辑按钮打开模态框，数据回填
    edit(row) {
      // console.log(row)
      this.dialogVisible = true
      this.title = "修改分类"
      this.form.cat_name = row.cat_name
      this.id = row.cat_id
    },
    // 添加
    submit() {
      this.$http({ url: this.$http.addorUrl("/categories"), data: this.form, method: "post" }).then((res) => {
        // console.log(res)
        if (res.data.meta.status == 201) {
          this.dialogVisible = false
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          })
          // 关闭模态框
          this.dialogVisible = false
          // 添加后输入框为空
          this.form.cat_name = ""
          this.gitCate()
        }
      })
    },
    // 确定修改
    amend() {
      this.$http({ url: this.$http.addorUrl(`/categories/${this.id}`), data: this.form, method: "put" }).then((res) => {
        // console.log(res)
        this.$message({
          message: res.data.meta.msg,
          type: "success"
        })
        // 关闭模态框
        this.dialogVisible = false
        this.form.cat_name = ""
        this.gitCate()
      })
    },

    // 删除
    del(id) {
      // console.log(id)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({ url: this.$http.addorUrl(`/categories/${id}`), method: "delete" }).then((res) => {
            // console.log(res)
            if (res.data.meta.status == 200) {
              this.gitCate()
              // 删除调用渲染
            }
          })
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
    }
  },
  created() {
    this.gitCate()
  },
  mounted() {},
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
