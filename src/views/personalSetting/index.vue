<template>
  <div class="app-container">
    <el-form
      :model="newPassword"
      :rules="passwordRules"
      label-position="left"
      label-width="auto"
    >
      <el-form-item label="用户名" prop="name">
        <el-input
          v-model="newPassword.name"
          placeholder="请输入管理员名称"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input
          v-model="newPassword.oldLoginPwd"
          placeholder="请输入旧密码"
          name="oldLoginPwd"
          type="password"
          tabindex="2"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="loginPwd">
        <el-input
          v-model="newPassword.loginPwd"
          placeholder="请输入新密码"
          name="loginPwd"
          type="password"
          tabindex="3"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="loginPwd">
        <el-input
          v-model="confirm"
          placeholder="请再次输入新密码"
          name="confirm"
          type="password"
          tabindex="4"
        />
      </el-form-item>
      <el-button @click.native.prevent="exitHandle">返回</el-button>
      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="postHandle"
        >提交</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { changeInfo } from "@/api/user";

export default {
  data() {
    function checkPwd(rule, value, callback) {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    }
    return {
      loading: false,
      confirm: "",
      newPassword: {
        name: "",
        loginId: "",
        loginPwd: "",
        oldLoginPwd: "",
      },
      passwordRules: {
        name: [{ required: true, trigger: "blur" }],
        loginId: [{ required: true, trigger: "blur" }],
        loginPwd: [{ required: true, trigger: "blur", validator: checkPwd }],
        oldLoginPwd: [{ required: true, trigger: "blur", validator: checkPwd }],
      },
    };
  },
  methods: {
    exitHandle() {
      this.$router.push({ path: this.$route.query.redirect });
    },
    postHandle() {
      if (
        this.newPassword.name &&
        this.newPassword.loginPwd &&
        this.newPassword.oldLoginPwd
      ) {
        if (this.confirm === this.newPassword.loginPwd) {
          this.loading = true;
          changeInfo(this.newPassword).then((resp) => {
            if (typeof resp === "string") {
              resp = JSON.parse(resp);
              this.$message({
                type: "error",
                message: resp.msg,
              });
              this.loading = false;
            } else {
              this.$store.dispatch("user/getInfo");
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.loading = false;
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "两次输入的密码不一致",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请填写所有信息",
        });
      }
    },
  },
  created() {
    this.newPassword.name = this.$store.state.user.info.name;
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  width: 500px;
}
</style>
