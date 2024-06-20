<template>
  <div class="upload">
    <p class="title">{{ title }}</p>
    <el-upload
      class="uploader"
      v-loading="loading"
      :show-file-list="false"
      :action="URL"
      :headers="headers"
      :on-success="afterUpload"
      :before-upload="beforeUpload"
    >
      <el-image v-if="imageUrl" :src="imageUrl" class="imgPreview" />
      <i v-else class="el-icon-plus uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "Uploader",
  props: {
    URL: {
      type: String,
      require: true,
    },
    title: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    headers() {
      return { Authorization: `Bearer ${localStorage.getItem("token")}` };
    },
  },
  methods: {
    afterUpload(resp) {
      this.loading = false;
      if (!resp.code && resp.data) {
        this.$emit("uploadFinsh", resp.data);
      }
    },
    beforeUpload(file) {
      const allowedType = /^image\/(.*)$/;
      const isImg = allowedType.test(file.type);
      if (!isImg) {
        this.$emit("uploadFinsh");
        this.$message.error("文件不是图片!");
      } else {
        this.loading = true;
      }
      return isImg;
    },
  },
};
</script>

<style lang="scss" scoped>
.upload {
  width: fit-content;
}
.title {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  font-weight: 700;
}
.uploader {
  min-width: 240px;
  height: 240px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.uploader:hover {
  border-color: #409eff;
}
.uploader-icon {
  font-size: 60px;
  color: #8c939d;
  width: 240px;
  height: 240px;
  line-height: 240px;
  text-align: center;
}
.imgPreview {
  height: 240px;
  min-width: 240px;
}
</style>
