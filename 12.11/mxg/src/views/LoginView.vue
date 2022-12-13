<template>
  <div class="box">
    <div class="login">
      <!-- 头部图片 -->
      <img src="1.png" alt="" />
      <!-- 卡片 -->
      <el-card class="box-card">
        <!-- 表单 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" show-password prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { setToken } from "../../untils/auth.js"
import { STATUS } from "@/constStatus"
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({ url: this.$http.addorUrl("/login"), params: this.ruleForm, method: "post" }).then((res) => {
            /*判断是不是响应成功，和状态码 */
            if (res && res.data.meta.status === STATUS.SUCCESS) {
              const { token, username } = res.data.data
              /**把token储存到cookie中 */
              setToken(token)
              /**提示登录成功 */
              this.$notify({
                title: "登录成功",
                message: "欢迎光临[" + username + "]",
                type: "success",
                duration: 2000
              })
              /**进行跳转 */
              this.$router.replace("/welcomeTo")
            } else {
              this.$notify({
                title: "登录失败",
                message: res.data.meta.msg,
                type: "error"
              })
            }
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #2b4b6b;
  .login {
    width: 550px;
    // height: 400px;
    // background-color: aqua;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 150px;
      height: 150px;
      border-radius: 150px;
      position: absolute;
      left: 38%;
    }
    .box-card {
      margin-top: 70px;
      width: 550px;
      .demo-ruleForm {
        margin: 100px 30px 0 0;
        height: 230px;
      }
    }
  }
}
</style>
