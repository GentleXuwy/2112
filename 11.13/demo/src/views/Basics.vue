<template>
  <div>
    <!-- 基础表格 -->
     <div class="box">
      <p @click="$router.push('/basics')">表格×</p>
      <p @click="$router.push('/tab')">tab选项卡×</p>
    </div>
    <!-- 表单 -->
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" icon="el-icon-delete" @click="dels">选中删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.status" placeholder="地址">
          <el-option label="地址" :value="-1"></el-option>
          <el-option label="成功" :value="0"></el-option>
          <el-option label="失败" :value="1"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item>
        <el-input v-model="form.name" placeholder="用户名" @blur="search"></el-input>
      </el-form-item>
    </el-form>

    <!-- 表格 渲染出来的数据 -->
    <el-table
      ref="multipleTable"
      :data="page"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="change">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" type="id" width="120"></el-table-column>
      <el-table-column prop="name" label="用户名" width="120"></el-table-column>
      <el-table-column prop="money" label="账户余额"></el-table-column>
      <el-table-column prop="thumb" label="头像(查看大图)">
        <template slot-scope="scope">
          <img :src="scope.row.thumb">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
           <el-button size="mini" v-if="scope.row.state=='成功'" type="success" plain>成功</el-button>
           <el-button size="mini" v-if="scope.row.state=='失败'" type="danger" plain>失败</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="注册时间"></el-table-column>
      <el-table-column label="操作">
         <template slot-scope="scope">
           <el-button
             size="mini"
              icon="el-icon-edit"
             @click="edit(scope.$index, scope.row)">编辑</el-button>
           <el-button
             size="mini"
             type="danger"
              icon="el-icon-delete"
             @click="del(scope.$index, scope.row)">删除</el-button>
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
      :total="400">
    </el-pagination>

    <!-- 编辑弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
     <!-- 表格 -->
     <el-form ref="form" :model="val" label-width="80px">
       <el-form-item label="用户名">
         <el-input v-model="val.name"></el-input>
       </el-form-item>
       <el-form-item label="地址">
         <el-input v-model="val.address"></el-input>
       </el-form-item>
     </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOk">确 定</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 表单
      form: {
        status: -1,
        name: ""
      },
      // 获取的数据
      list: [],
      // 备用数据
      lists: [],
      // 每页几条数据
      pageSize: 3,
      // 当前的页码
      pageNum: 1,
      // 编辑弹框的状态
      dialogVisible: false,
      // 编辑的
      val: {
        name: "",
        address: ""
      },
      // 编辑的下标
      cid: "",
      // 选中的
      flag: []
    };
  },
  methods: {
    // 获取表格的数据
    getTable() {
      axios.get("table.json").then(res => {
        // console.log(res);
        this.list = res.data.list;
        this.lists = res.data.list;
      });
    },
    // 复选框的状态
    change(val) {
      // console.log(val);
      this.flag = val;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
    },
    // 搜索
    search() {
      this.list = this.lists.filter(i => {
        return i.name.includes(this.form.name);
      });
    },
    // 编辑 数据回填
    edit(i, row) {
      this.dialogVisible = true;
      this.val.name = row.name;
      this.val.address = row.address;
      this.cid = i;
    },
    // 编辑
    editOk() {
      this.list[this.cid].name = this.val.name;
      this.list[this.cid].address = this.val.address;
      this.dialogVisible = false;
    },
    // 删除
    del(i) {
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.list.splice(i, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    // 选中删除
    dels() {
      this.flag.forEach(ele => {
        this.list = this.list.filter(i => {
          return i != ele;
        });
      });
    }
  },
  created() {
    this.getTable();
  },
  mounted() {},
  components: {},
  computed: {
    // 计算分页
    page() {
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
.box {
  display: flex;
  p {
    width: 86px;
    height: 25px;
    background-color: #81c9ee;
    color: #fff;
    margin-right: 6px;
    text-align: center;
  }
}
.el-form {
  margin-top: 10px;
}
.el-table {
  img {
    width: 90px;
    height: 90px;
  }
}
</style>
