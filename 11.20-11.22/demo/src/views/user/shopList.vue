<template>
  <div>
    <!-- 商家列表 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 面包屑 -->
       <el-breadcrumb separator="/" class="bread">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>数据管理</el-breadcrumb-item>
         <el-breadcrumb-item>商家列表</el-breadcrumb-item>
       </el-breadcrumb>
        <div class="icon"><i class="el-icon-info"></i></div>
      </el-header>
      <!-- 内容部分 -->
      <el-main>
        <el-table :data="shop" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="店铺名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="店铺介绍">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="联系电话">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="评分">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="销售量">
                  <span>{{ props.row.recent_order_num }}</span>
                </el-form-item>
                <el-form-item label="分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="店铺名称" prop="name"> </el-table-column>
          <el-table-column label="店铺地址" prop="address"> </el-table-column>
          <el-table-column label="店铺介绍" prop="description">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.row, scope.$index)"
                >编辑</el-button
              >
              <el-button size="mini" @click="$router.push('/addGoods')"
                >添加食品</el-button
              >
              <el-button size="mini" type="danger" @click="del(scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
        <!-- 分页 -->

        <el-dialog title="修改店铺信息" :visible.sync="dialogVisible" width="50%">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="店铺名称">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-autocomplete class="inline-input" v-model="ruleForm.address" placeholder="请输入地址" style="width: 310px">
              </el-autocomplete> <br />
              当前城市：{{ address }}
            </el-form-item>

            <el-form-item label="店铺介绍">
              <el-input v-model="ruleForm.introduce"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>

            <el-form-item label="店铺分类">
              <el-cascader :options="list">
                <template slot-scope="{ node, data }">
                  <span>{{ list.name }}</span>
                  <span v-if="!node.isLeaf">
                    ({{ data.children.length }})
                  </span>
                </template>
              </el-cascader>
            </el-form-item>

            <el-form-item label="上传店铺头像">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible1">
                <img width="100%" :src="ruleForm.dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="ok">确 定</el-button>
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
      dialogVisible1: false, //图片的
      list: [], //拿到的数据
      address: "", //城市的
      dialogVisible: false, //编辑模态框
     //每页5条数据
      pageSize: 5,
      //默认第1页
      pageNum: 1,
      // 分页的数据
      ruleForm: {
        name: "",
        address: "",
        tel: "",
        introduce: "",
        dialogImageUrl: "",
      },
      // 编辑模态框
      cId: -1, //编辑拿到的id
    };
  },
  methods: {
    // 获取数据
    getShop(){
    axios.get('https://elm.cangdu.org/shopping/restaurants?latitude=35.895161&longitude=115.498688&offset=0&limit=20').then(res=>{
      // console.log(res);
      this.list = res.data;
    })
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
        type: "warning",
      })
        .then(() => {
          this.list.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 数据回填
    edit(val, id) {
      // console.log(val);
      // console.log(id);
      this.dialogVisible = true;
      this.ruleForm.name = val.name;
      this.ruleForm.address = val.address;
      this.ruleForm.tel = val.phone;
      this.ruleForm.introduce = val.description;
      this.ruleForm.dialogImageUrl = val.image_path;
      this.cId = id;
    },
    // 编辑
    ok() {
      this.list[this.cId].name = this.ruleForm.name;
      this.list[this.cId].address = this.ruleForm.address;
      this.list[this.cId].description = this.ruleForm.introduce;
      this.list[this.cId].phone = this.ruleForm.tel;
      this.dialogVisible = false;
    },
  },
  created() {
   this.getShop()
  },
  mounted() {
    axios({
      url: "https://elm.cangdu.org/v1/cities?type=guess",
      method: "GET",
    }).then((res) => {
      // console.log(res);
      this.address = res.data.name;
    });
  },
  components: {},
  computed: {
    // 分页的计算
    shop() {
      return this.list.slice(
        this.pageSize * (this.pageNum - 1),
        this.pageSize * this.pageNum
      );
    },
  },
  watch: {},
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
