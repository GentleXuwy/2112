<template>
  <div class="home">
    <!-- 添加按钮 -->
    <el-button type="primary" @click="dialogVisible=true">添加todo</el-button>

    <!-- 日历 -->
    <el-calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
        </p>
    
        <div v-for="(item,index) in $store.state.list" :key="index" @click="edit(item,index)">
          <div v-show="item.time==data.day && item.status=='已完成'">
            <span :class="item.status?'active':'' ">{{item.name}}</span>
          </div>
          <div v-show="item.time==data.day && item.status=='未完成'">
             <span :class="item.status?'red':'' ">{{item.name}}</span>
          </div>
        </div>
       
      </template>
    </el-calendar>

    <!-- 对话框 -->
    <el-dialog title="添加" :visible.sync="dialogVisible"  width="50%">
        <!-- 添加表格 -->
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
         <el-form-item label="事件名称" prop="name">
           <el-input v-model="ruleForm.name"></el-input>
         </el-form-item>

         <el-form-item label="待办事项时间">
           <el-col :span="11">
               <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.time" 
               style="width: 100%;"></el-date-picker>
           </el-col>
         </el-form-item>
       
         <el-form-item label="状态" prop="status">
           <el-radio-group v-model="ruleForm.status">
             <el-radio label="已完成"></el-radio>
             <el-radio label="未完成"></el-radio>
           </el-radio-group>
         </el-form-item>
       
         <el-form-item>
           <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
           <el-button @click="resetForm('ruleForm')">重置</el-button>
         </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // value: new Date(),
      // 模态框的
      dialogVisible: false,
      //添加表单
      ruleForm: {
        name: "",
        time: "",
        status: ""
      },
      // 表单验证
      rules: {
        name: [{ required: true, message: "请输入事件名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      cId: -1
    };
  },
  methods: {
    // 添加
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.cId == -1) {
            let date = new Date(this.ruleForm.time);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            // 单数补零
            m = m < 10 ? "0" + m : m;
            let d = date.getDate();
            d = d < 10 ? "0" + d : d;
            let times = y + "-" + m + "-" + d;
            console.log(times);

            this.$store.commit("submitForm", {
              name: this.ruleForm.name,
              time: times,
              status: this.ruleForm.status
            });
            // 添加后输入框为空
            this.ruleForm = {};
            // 关闭模态框
            this.dialogVisible = false;
          } else {
            // 修改
            let timea = new Date(this.ruleForm.time).getTime();
            let date1 = new Date(timea);
            let year = date1.getFullYear() + "-";
            let month = date1.getMonth() + 1;
            // 单数补零
            month = month < 10 ? "0" + month : month;
            let day = date1.getDate();
            day = day < 10 ? "0" + day : day;
            let time = year + month + "-" + day;
            this.$store.commit("edits", {
              name: this.ruleForm.name,
              time: time,
              status: this.ruleForm.status,
              id: this.cId
            });
            this.cId = -1;
            // 关闭模态框
            this.dialogVisible = false;
          }
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //  数据回填
    edit(item, index) {
      this.dialogVisible = true;
      this.ruleForm.name = item.name;
      this.ruleForm.time = item.time;
      this.ruleForm.status = item.status;
      this.cId = index;
      // console.log(item.id);
    }
  }
};
</script>
<style scoped>
/* 日历的 */
.is-selected {
  color: #1989fa;
}
.active {
  background-color: hsl(210, 86%, 61%);
  color: #fff;
  border: 0;
  padding: 6px;
}
.red {
  background-color: rgb(255, 0, 0);
  color: #fff;
  border: 0;
  padding: 6px;
}
</style>