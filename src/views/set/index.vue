<template>
  <div class="app-container" v-loading="loading">
    <div class="setting">
      <el-form :model="setting" :disabled="disabled">
        <p class="label">网站信息</p>
        <el-form-item label="网站标题">
          <el-input
            v-model="setting.siteTitle"
            placeholder="请输入网站标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="setting.mail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="备案号">
          <el-input
            v-model="setting.icp"
            placeholder="请输入网站备案号"
          ></el-input>
        </el-form-item>
        <p class="label">个人头像</p>
        <el-form-item>
          <Uploader
            URL="/api/upload"
            :imageUrl="setting.avatar"
            @uploadFinsh="changeAvatar"
          />
        </el-form-item>
        <p class="label">网站图标</p>
        <el-form-item label="图标地址">
          <el-input
            v-model="setting.favicon"
            placeholder="请输入图标地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标预览">
          <el-image :src="setting.favicon"></el-image>
        </el-form-item>
        <p class="label">GitHub信息</p>
        <el-form-item label="GitHub名称">
          <el-input
            v-model="setting.githubName"
            placeholder="请输入GitHub名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="GitHub地址">
          <el-input
            v-model="setting.github"
            placeholder="请输入GitHub地址"
          ></el-input>
        </el-form-item>
        <p class="label">QQ信息</p>
        <el-form-item label="QQ号码">
          <el-input v-model="setting.qq" placeholder="请输入QQ号码"></el-input>
        </el-form-item>
        <el-form-item label="QQ二维码预览">
          <Uploader
            URL="/api/upload"
            :imageUrl="setting.qqQrCode"
            @uploadFinsh="changeQQQrcode"
          />
        </el-form-item>
        <p class="label">微信信息</p>
        <el-form-item label="微信号码">
          <el-input
            v-model="setting.weixin"
            placeholder="请输入微信号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信二维码预览">
          <Uploader
            URL="/api/upload"
            :imageUrl="setting.weixinQrCode"
            @uploadFinsh="changeWeixinQrcode"
          />
        </el-form-item>
      </el-form>
      <el-button @click="cancelEdit" :disabled="!editing">取消编辑</el-button>
      <el-button type="primary" @click="editSetting">{{
        editing ? "完成编辑" : "进入编辑"
      }}</el-button>
    </div>
  </div>
</template>

<script>
import Uploader from "@/components/Upload";
import { getSetting, changeSetting } from "@/api/setting";

export default {
  components: {
    Uploader,
  },
  data() {
    return {
      loading: true,
      disabled: true,
      editing: false,
      setting: {
        siteTitle: "",
        mail: "",
        icp: "",
        avatar: "",
        favicon: "",
        githubName: "",
        github: "",
        qq: "",
        qqQrCode: "",
        weixin: "",
        weixinQrCode: "",
      },
      tempSetting: {
        siteTitle: "",
        mail: "",
        icp: "",
        avatar: "",
        favicon: "",
        githubName: "",
        github: "",
        qq: "",
        qqQrCode: "",
        weixin: "",
        weixinQrCode: "",
      },
    };
  },
  methods: {
    getSetting() {
      getSetting().then((resp) => {
        for (const key in this.setting) {
          this.setting[key] = resp.data[key];
        }
        this.loading = false;
      });
    },
    changeAvatar(src) {
      this.setting.avatar = src;
    },
    changeQQQrcode(src) {
      this.setting.qqQrCode = src;
    },
    changeWeixinQrcode(src) {
      this.setting.weixinQrCode = src;
    },
    editSetting() {
      if (this.editing) {
        let isFinsh = true;
        for (const key in this.setting) {
          isFinsh = isFinsh && !!this.setting[key];
        }
        if (isFinsh) {
          this.loading = true;
          changeSetting(this.setting).then((resp) => {
            if (!resp.code && resp.data) {
              this.loading = false;
              this.editing = false;
              this.disabled = true;
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "请将信息填写完整",
          });
        }
      } else {
        this.disabled = false;
        this.editing = true;
        for (const key in this.setting) {
          this.tempSetting[key] = this.setting[key];
        }
      }
    },
    cancelEdit() {
      this.disabled = true;
      this.editing = false;
      for (const key in this.setting) {
        this.setting[key] = this.tempSetting[key];
      }
    },
  },
  created() {
    this.getSetting();
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
.app-container {
  height: calc(100vh - 50px);
  padding: 0;
}
.setting {
  height: 100%;
  padding: 30px;
  overflow: auto;
}
.el-image {
  width: 150px;
  display: block;
  clear: both;
  border: 1px solid rgb(0, 0, 0, 0.6);
}
.el-button {
  margin: 20px 20px 20px 0;
}
</style>
