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
              <!-- <el-input v-model="ruleForm.goods_cat"></el-input> -->
              <!-- 级联选择器 -->
              <!-- :options 绑定级联选择器要渲染的数据 -->
              <!-- :props 自定义配置项 -->
              <el-cascader
                style="width: 20%"
                v-model="ruleForm.goods_cat"
                :options="cate"
                @change="handleChange"
                :props="{ label: 'cat_name', value: 'cat_id', children: 'children' }"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">
          <el-button type="primary">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0, // 步骤条的index
      ruleForm: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: "" // 分类
      },
      rules: {
        goods_name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        goods_price: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        goods_number: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        goods_weight: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        goods_cat: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      },
      cate: [] // 所有的分类
    }
  },
  methods: {
    // 获取的数据
    getAdd() {
      this.$http({ url: this.$http.addorUrl("/categories"), method: "get" }).then((res) => {
        console.log(res)
        this.cate = res.data.data
      })
    },
    handleChange(val) {
      // val 就是级联选择器选中的数据
      console.log(val)
    },
    ok(val) {
      console.log(val)
      this.active++
    }
  },
  created() {
    this.getAdd()
  },
  mounted() {},
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.el-steps {
  margin-top: 20px;
}
</style>
