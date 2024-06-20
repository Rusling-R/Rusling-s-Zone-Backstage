<template>
  <div class="app-container">
    <p class="label">关于我</p>
    <el-input
      v-model="url"
      :disabled="!editing"
      placeholder="请输入地址链接"
    ></el-input>
    <el-button type="primary" @click="changeHandle" :loading="loading">{{
      editing ? "完成" : "编辑"
    }}</el-button>
  </div>
</template>

<script>
import { getAbout, changeAbout } from "@/api/about";
export default {
  data() {
    return {
      loading: false,
      editing: false,
      url: "",
    };
  },
  methods: {
    getAbout() {
      getAbout().then((resp) => {
        this.url = resp.data;
      });
    },
    changeHandle() {
      if (this.editing) {
        if (this.url) {
          this.loading = true;
          changeAbout(this.url).then((resp) => {
            this.loading = false;
            this.editing = false;
            this.$message({
              type: "success",
              message: "修改成功",
            });
          });
        } else {
          this.$message({
            type: "error",
            message: "请输入地址链接",
          });
        }
      } else {
        this.editing = true;
      }
    },
  },
  created() {
    this.getAbout();
  },
};
</script>

<style lang="scss" scoped>
.label {
  font-size: 20px;
  color: #606266;
  font-weight: 300;
  display: block;
}
.el-button {
  width: 100px;
  margin-top: 20px;
}
</style>
