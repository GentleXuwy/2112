<template>
  <div>
    <!-- 食品列表 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 面包屑 -->
       <el-breadcrumb separator="/" class="bread">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>数据管理</el-breadcrumb-item>
         <el-breadcrumb-item>食品列表</el-breadcrumb-item>
       </el-breadcrumb>
        <div class="icon"><i class="el-icon-info"></i></div>
      </el-header>
      <el-main>
        <!-- 渲染出来的表格 -->
        <el-table :data="reslist" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="食品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="餐饮名称">
                  <span>{{ props.row.rating_count }}</span>
                </el-form-item>
                <el-form-item label="食品 ID">
                  <span>{{ props.row.item_id }}</span>
                </el-form-item>
                <el-form-item label="餐饮 ID">
                  <span>{{ props.row.category_id }}</span>
                </el-form-item>
                <el-form-item label="食品介绍">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="餐饮地址">
                  <span>{{ props.row.satisfy_rate }}</span>
                </el-form-item>
                <el-form-item label="食品评分">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="食品分类">
                  <span>{{ props.row.satisfy_rate }}</span>
                </el-form-item>
                <el-form-item label="月销量">
                  <span>{{ props.row.satisfy_rate }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="食品名称" prop="name"> </el-table-column>
          <el-table-column label="食品介绍" prop="description">
          </el-table-column>
          <el-table-column label="评分" prop="rating"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.row, scope.$index)"
                >编辑</el-button
              >
              <el-button size="mini" type="danger" @click="del(scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
         <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page="pageNum"
           :page-sizes="[3, 5, 10, 15]"
           :page-size="pageSize"
           layout="total, sizes, prev, pager, next, jumper"
           :total="list.length"
         >
        </el-pagination>
        <!-- 修改食品信息 -->
        <el-dialog title="修改食品信息" :visible.sync="dialogVisible" width="60%">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="食品名称">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="食品介绍">
              <el-input v-model="ruleForm.introduce"></el-input>
            </el-form-item>
            <el-form-item label="食品分类">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="炒饭" value="shanghai"></el-option>
                <el-option label="食品活动" value="beijing"></el-option>
                <el-option label="123" value="beijing"></el-option>
                <el-option label="rg" value="beijing"></el-option>
                <el-option label="158" value="beijing"></el-option>
                <el-option label="asdfghjkl" value="beijing"></el-option>
                <el-option label="456" value="beijing"></el-option>
                <el-option label="sssssssss" value="beijing"></el-option>
                <el-option label="11" value="beijing"></el-option>
                <el-option label="hyp" value="beijing"></el-option>
                <el-option label="hyp嗯嗯嗯" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="食品图片">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" 
              list-type="picture-card" :on-preview="handlePictureCardPreview" 
              :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible1">
                <img width="100%" :src="ruleForm.dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>

            <!-- 添加规格的表格 -->
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="name" label="规格" width="180">
              </el-table-column>
              <el-table-column prop="num" label="包装费" width="180">
              </el-table-column>
              <el-table-column prop="num1" label="价格"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="dels(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="dialogVisible2 = true" class="button">添加规格</el-button>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="ok">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 添加规格的弹框 -->
        <el-dialog title="修改食品信息" :visible.sync="dialogVisible2" width="40%">
          <el-form :model="from" ref="from" label-width="100px" class="demo-ruleForm" :rules="rules">
            <el-form-item label="规格" prop="name">
              <el-input v-model="from.name"></el-input>
            </el-form-item>
            <el-form-item label="包装费">
              <el-input-number v-model="from.num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
              <el-input-number v-model="from.num1" controls-position="right" @change="handleChange1" :min="1" :max="10"></el-input-number>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="edits">确 定</el-button>
          </span>
        </el-dialog>
       
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      //表格的
      tableData: [],
      //拿到的数据
      list: [],
      //编辑模态框
      dialogVisible: false,
      //图片
      dialogVisible1: false,
      //添加规格的
      dialogVisible2: false,
      //每页5条数据
      pageSize: 5,
      //默认第1页
      pageNum: 1,
      // 编辑模态框
      ruleForm: {
        name: "",
        introduce: "",
        dialogImageUrl: "",
        region: ""
      },
      // 添加规格
      from: {
        name: "",
        //保存添加的数据的包装费
        num: "",
        //保存添加的数据的价格
        num1: ""
      },
      // 添加的正则
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      },
      //保存编辑的id
      cId: -1
    };
  },
  methods: {
    // 获取数据
    fooList() {
      axios
        .get(
          "https://elm.cangdu.org/shopping/v2/foods?offset=0&limit=20&restaurant_id=undefined"
        )
        .then(res => {
          // console.log(res);
          this.list = res.data;
        });
    },
    // 添加数据的包装费
    handleChange(val) {
      // console.log(val);
      this.from.num = val;
    },
    // 添加数据的价格
    handleChange1(val) {
      // console.log(val);
      this.from.num1 = val;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 分页的
    handleSizeChange(val) {
      // console.log(val);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.pageNum = val;
    },
    // 删除
    del(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.list.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 数据回填
    edit(val, id) {
      // console.log(val);
      // console.log(id);
      this.dialogVisible = true;
      this.cId = id;
      this.ruleForm.name = val.name;
      this.ruleForm.introduce = val.description;
    },
    // 编辑
    edits() {
      this.tableData.push(this.from);
      // console.log(this.from);
      this.dialogVisible2 = false;
    },
    // 编辑食品列表
    ok() {
      this.list[this.cId].name = this.ruleForm.name;
      this.list[this.cId].description = this.ruleForm.introduce;
      this.dialogVisible = false;
    },
    // 添加规格的删除
    dels(index) {
      this.tableData.splice(index, 1);
    }
  },
  created() {
    this.fooList();
  },
  mounted() {},
  components: {},
  computed: {
    // 计算出来的分页数据
    reslist() {
      return this.list.slice(
        this.pageSize * (this.pageNum - 1),
        this.pageSize * this.pageNum
      );
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.el-header {
  background: #eff2f7;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  .bread {
    margin-top: 20px;
  }
  .icon {
    margin-top: 10px;
    font-size: 30px;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.button{
  margin-top: 20px;
  margin-left: 360px;
}
</style>
