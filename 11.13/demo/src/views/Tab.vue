<template>
  <div>
    <!-- tab页面 -->
    <div class="box">
      <p @click="$router.push('/basics')">表格×</p>
      <p @click="$router.push('/tab')">tab选项卡×</p>
    </div>
    <!-- 标签页 -->
    <el-tabs v-model="activeName">
      <!-- 未读消息 -->
      <el-tab-pane :label="'未读消息'+this.list.length" name="first">
        <div class="con" v-for="(item,i) in pages" :key="i">
          <p>{{item.title}}</p>
          <p>{{item.date}}</p>
          <el-button size="mini" @click="reads(item,i)">标为已读</el-button>
        </div>
        <el-button type="primary" @click="all">全部标为已读</el-button>
      </el-tab-pane>
      <!-- 已读消息 -->
      <el-tab-pane :label="'已读消息'+$store.state.read.length" name="second">
        <div class="con" v-for="(item,i) in $store.state.read" :key="i">
          <p>{{item.title}}</p>
          <p>{{item.date}}</p>
          <el-button type="danger" @click="del(item,i)">删除</el-button>
          <el-button size="mini" type="info" @click="restoring(item,i)">还原未读</el-button>
        </div>
        <el-button type="danger" @click="dels">删除全部</el-button>
      </el-tab-pane>
      <!-- 回收站 -->
      <el-tab-pane :label="'回收站'+$store.state.recycle.length" name="third">
        <div class="con" v-for="(item,i) in $store.state.recycle" :key="i">
          <p>{{item.title}}</p>
          <p>{{item.date}}</p>
          <el-button size="mini" @click="restores(item,i)">还原</el-button>
        </div>
        <el-button type="danger" @click="empty">清空回收站</el-button>
      </el-tab-pane>
    </el-tabs>

    <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activeName: "first",
      // 获取的数据
      list: [],
      pageSize: 3,
      pagenum: 1,
      total:100
    };
  },
  methods: {
    // 获取到的数据
    getList() {
      axios.get("tabs.json").then(res => {
        console.log(res);
        this.list = res.data.unread;
      });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
    },
    // 点击标为已读
    reads(item, i) {
      this.$store.commit("reads", item, i);
      this.list.splice(i, 1);
    },
    // 点击删除让数据到回收站里
    del(item, i) {
      this.$store.commit("del", item, i);
      // this.$store.state.read.splice(i, 1);
    },
    // 点击还原未读 到未读里
    restoring(item, i) {
      this.list.push(item);
      this.$store.commit("restoring", item, i);
    },
    // 还原
    restores(item, i) {
      this.list.push(item);
      this.$store.commit("restores", item, i);
    },
    // 全部标为已读
    all() {
      this.$store.commit("all", this.list);
      this.list = [];
    },
    // 删除全部
    dels() {
      this.$store.commit("dels", this.$store.state.read);
    },
    // 清空回收站
    empty() {
      // this.$store.state.recycle = [];
      this.$store.commit('empty')
    }
  },
  created() {
    this.getList();
  },
  mounted() {},
  components: {},
  computed: {
    pages() {
      return this.list.slice(
        this.pageSize * (this.pagenum - 1),
        this.pageSize * this.pagenum
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
.con {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #666;
  button {
    height: 30px;
    margin-top: 5px;
  }
}
</style>
