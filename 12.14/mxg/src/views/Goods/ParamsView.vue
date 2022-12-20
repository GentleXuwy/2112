<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 警告 -->
    <!-- 卡片 -->
    <el-card class="box-card">
      <div data-v-043e2146="" role="alert" class="el-alert el-alert--warning is-dark">
        <i class="el-alert__icon el-icon-warning"></i>
        <div class="el-alert__content">
          <span class="el-alert__title">注意：只允许为第三级分类设置相关参数！</span
          ><i class="el-alert__closebtn el-icon-close" style="display: none"></i>
        </div>
      </div>
      <!-- 商品分类内容展示 -->
      <p style="margin: 20px 0">
        选择商品分类<el-cascader
          v-model="goods_cat"
          :options="options"
          :props="{ value: 'cat_id', label: 'cat_name' }"
          @change="handleChange"
        ></el-cascader>
      </p>

      <!-- 动态参数 -->
      <el-tabs type="border-card" @tab-click="handoff">
        <el-tab-pane label="动态参数">
          <el-button type="primary" @click="add" :disabled="goods_cat.length != 3">添加参数</el-button>
          <el-table stripe ref="singleTable" :data="list" highlight-current-row style="width: 100%" border>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-tag
                  :key="tag"
                  v-for="tag in props.row.attr_vals.split(',')"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(props.row)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(props.row)"
                  @blur="handleInputConfirm(props.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" width="50" label="#"></el-table-column>
            <el-table-column property="attr_name" label="参数名称"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"
                  ><i class="el-icon-edit">编辑</i></el-button
                >
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                  ><i class="el-icon-delete">删除</i></el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数">
          <el-button type="primary" @click="add">添加参数</el-button>
          <el-table stripe ref="singleTable" :data="list" highlight-current-row style="width: 100%" border>
            <el-table-column type="expand">
              <!-- <template slot-scope="props"> </template> -->
            </el-table-column>
            <el-table-column type="index" width="50" label="#"></el-table-column>
            <el-table-column property="attr_name" label="参数名称"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"
                  ><i class="el-icon-edit">编辑</i></el-button
                >
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                  ><i class="el-icon-delete">删除</i></el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <Paramsadd v-if="visivle" ref="addedits" @confirm="confirm"></Paramsadd>
  </div>
</template>

<script>
import Paramsadd from "./ParamsAdd.vue"
import { GoodsCate } from "@/api/cate"
import { getAttr, addAttrs, editAttr, delAttr } from "@/api/params"
export default {
  components: {
    Paramsadd
  },
  data() {
    return {
      options: [],
      goods_cat: [],
      sel: "many",
      list: [],
      visivle: false,
      edit: -1,
      inputVisible: false,
      inputValue: ""
    }
  },
  methods: {
    // 选择商品分类数据
    getCate() {
      GoodsCate().then((res) => {
        console.log(res)
        this.options = res.data.data.result
      })
    },
    // 获取动态参数或者静态参数
    handleChange() {
      if (this.goods_cat.length == 3) {
        getAttr({ id: this.goods_cat[2], sel: this.sel }).then((res) => {
          console.log(res.data.data)
          this.list = res.data.data
        })
      } else {
        this.$message({
          message: "只允许为三级分类设置参数！",
          type: "warning"
        })
        this.goods_cat = []
      }
    },
    // 切换动态参数还是静态参数
    handoff(val) {
      if (val.paneName == 0) {
        this.sel = "many"
      } else {
        this.sel = "only"
      }
      this.handleChange()
    },
    // 点击添加打开模态框
    add() {
      this.visivle = true
      this.edit = -1
      this.$nextTick(() => {
        this.$refs.addedits.info(this.edit)
      })
    },
    // 点击编辑打开模态框，回填数据
    handleEdit(index, row) {
      console.log(row)
      this.visivle = true
      this.edit = row.attr_id
      this.$nextTick(() => {
        this.$refs.addedits.backfill(row)
      })
    },
    // 确认添加或者编辑
    confirm(formName) {
      if (this.edit == -1) {
        addAttrs({
          id: this.goods_cat[2],
          attr_name: formName.attr_name,
          attr_sel: this.sel
        }).then((res) => {
          console.log(res.data.meta.status)
          if (res.data.meta.status == 201) {
            this.handleChange()
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            })
          }
        })
      } else {
        editAttr({
          id: this.goods_cat[2],
          attrid: this.edit,
          attr_name: formName.attr_name,
          attr_sel: this.sel
        }).then((res) => {
          if (res.data.meta.status == 200) {
            this.handleChange()
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            })
          }
        })
      }
      this.visivle = false
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delAttr({ id: this.goods_cat[2], attrid: row.attr_id }).then((res) => {
            console.log(res)
            if (res.data.meta.status == 200) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              })
            }
          })
          this.getTable()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    // 点击删除更新按钮
    handleClose(row) {
      editAttr({
        id: row.cat_id,
        attrid: row.attr_id,
        attr_vals: row.attr_vals,
        attr_name: row.attr_name,
        attr_sel: this.sel
      }).then((res) => {
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          })
        }
      })
    },

    // 点击按钮变成input框
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    // 按下回车或者失去焦点去更新按钮
    handleInputConfirm(row) {
      console.log(row)
      let inputValue = this.inputValue
      if (inputValue) {
        editAttr({
          id: row.cat_id,
          attrid: row.attr_id,
          attr_name: row.attr_name,
          attr_vals: row.attr_vals,
          attr_sel: this.sel
        }).then((res) => {
          if (res.data.meta.status == 200) {
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            })
          }
        })
      }
      this.inputVisible = false
      this.inputValue = ""
    }
  },
  created() {
    this.getCate()
  },
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.el-alert--warning.is-dark {
  background-color: #e6a23c;
  color: #fff;
}
.el-alert {
  width: 100%;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 0;
  background-color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  position: relative;
  overflow: hidden;
  opacity: 1;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  margin-left: 10px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
