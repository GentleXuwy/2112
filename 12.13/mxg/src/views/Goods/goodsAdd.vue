<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
      <!-- 步骤条 -->
      <el-steps :space="230" align-center :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 侧边标签页 -->
      <el-tabs tab-position="left" @tab-click="ok">
        <el-tab-pane label="基本信息">
          <!-- 带验证表单 -->
          <el-form
            :model="ruleForm"
            label-position="top"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="ruleForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="ruleForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="ruleForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <!-- 级联选择器 -->
              <!-- :options 绑定级联选择器要渲染的数据 -->
              <!-- :props 自定义配置项 -->
              <el-cascader
                style="width: 20%"
                v-model="ruleForm.goods_cat"
                :options="cate"
                :props="{ value: 'cat_name', label: 'cat_name' }"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <quill-editor
            ref="myQuillEditor"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          />
          <el-button type="primary" @click="confirm">{{ edit == -1 ? "添加商品" : "编辑商品" }}</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { addGoods, editGoods } from "@/api/goods"
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"
import { quillEditor } from "vue-quill-editor"
import { GoodsCate } from "@/api/cate"
export default {
  data() {
    return {
      imageUrl: "",
      active: 0,
      cate: [],
      ruleForm: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_cat: []
      },
      rules: {
        goods_name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { pattern: /^\d+$/, message: "价格只能是数字", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
          { pattern: /^\d+$/, message: "重量只能是数字", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { pattern: /^\d+$/, message: "数量只能是数字", trigger: "blur" }
        ],
        goods_cat: [{ required: true, message: "请输入商品分类", trigger: "blur" }]
      },
      content: "<h2>I am Example</h2>",
      editorOption: {
        // Some Quill options...
      },
      edit: this.$route.params.edit,
      res: this.$route.params.row
    }
  },
  methods: {
    ok(val) {
      console.log(val)
      if (
        this.ruleForm.goods_cat != "" &&
        this.ruleForm.goods_price != "" &&
        this.ruleForm.goods_weight != "" &&
        this.ruleForm.goods_number != "" &&
        this.ruleForm.goods_cat != []
      ) {
        this.active = Number(val.paneName)
      } else {
        return
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg"
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!")
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!")
      }
      return isJPG && isLt2M
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill)
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill)
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text)
      this.content = html
    },
    confirm() {
      if (this.edit == -1) {
        addGoods({
          goods_name: this.ruleForm.goods_name,
          goods_cat: this.ruleForm.goods_cat.join(","),
          goods_price: this.ruleForm.goods_price,
          goods_number: this.ruleForm.goods_number,
          goods_weight: this.ruleForm.goods_weight,
          pics: Array(this.imageUrl)
        }).then((res) => {
          console.log(res)
          if (res.data.meta.status == 201) {
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            })
          }
          this.ruleForm = {}
          this.imageUrl = ""
          this.$router.push("/goods")
        })
      } else {
        editGoods({
          id: this.edit,
          goods_name: this.ruleForm.goods_name,
          goods_cat: this.ruleForm.goods_cat.join(","),
          goods_price: this.ruleForm.goods_price,
          goods_number: this.ruleForm.goods_number,
          goods_weight: this.ruleForm.goods_weight,
          pics: Array(this.imageUrl)
        }).then((res) => {
          console.log(res)
          if (res.data.data.meta.status == 200) {
            this.$message({
              message: res.data.data.meta.msg,
              type: "success"
            })
          }
          this.ruleForm = {}
          this.imageUrl = ""
          this.$router.push("/goods")
        })
      }
    },
    editAdd() {
      if (this.edit != -1) {
        // console.log(this.edit)
        // console.log(this.res)
        this.ruleForm.goods_name = this.res.goods_name
        this.ruleForm.goods_cat = this.res.goods_cat
        this.ruleForm.goods_price = this.res.goods_price
        this.ruleForm.goods_number = this.res.goods_number
        this.ruleForm.goods_weight = this.res.goods_weight
        this.imageUrl = this.res.imageUrl
      }
    }
  },
  // 获取的数据
  created() {
    this.editAdd()
    GoodsCate().then((res) => {
      console.log(res.data.data)
      if (res.data.data instanceof Array) {
        this.cate = res.data.data
      } else {
        this.cate = res.data.data.result
      }
    })
  },
  mounted() {
    console.log("this is current quill instance object", this.editor)
  },
  components: {
    quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  }
}
</script>

<style lang="scss" scoped>
.el-steps {
  margin-top: 20px;
}
::v-deep .el-steps {
  width: 90%;
  margin: auto;
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
::v-deep.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
::v-deep.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
