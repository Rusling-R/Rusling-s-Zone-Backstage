<template>
  <div class="app-container" v-loading="loading">
    <el-form :model="newBlog">
      <el-form-item>
        <label class="label">
          文章标题
          <el-input
            v-model="newBlog.title"
            placeholder="请输入文章标题"
          ></el-input>
        </label>
      </el-form-item>
      <el-form-item>
        <label class="label"> 内容编辑 </label>
        <Editor ref="editor" height="500px" :options="option" />
      </el-form-item>
      <el-form-item>
        <label class="label">
          文章描述
          <el-input
            type="textarea"
            rows="8"
            v-model="newBlog.description"
            placeholder="请输入文章描述"
          ></el-input>
        </label>
      </el-form-item>
      <el-form-item>
        <label class="label"> 文章首图 </label>
        <Uploader
          URL="/api/upload"
          :imageUrl="newBlog.thumb"
          @uploadFinsh="changeThumb"
        />
      </el-form-item>
      <el-form-item>
        <label class="label"> 类别等级 </label>
        <el-select v-model="newBlog.categoryId" placeholder="请选择级别">
          <el-option
            v-for="item in blogType"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editBlog">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import { Editor } from "@toast-ui/vue-editor";
import Uploader from "@/components/Upload";
import { getBlogType, addBlog, getBlog, changeBlog } from "@/api/blog";

export default {
  name: "Blog",
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
  components: {
    Uploader,
    Editor,
  },
  data() {
    return {
      newBlog: {
        title: "",
        description: "",
        createDate: 0,
        categoryId: "",
        toc: [],
        htmlContent: "",
        thumb: "",
        markdownContent: "",
      },
      loading: false,
      blogType: [],
      option: {
        language: "zh-CN",
      },
    };
  },
  methods: {
    async getBlogType() {
      const resp = await getBlogType();
      this.blogType = resp.data;
    },
    async getBlog() {
      const resp = await getBlog(this.$route.params.id);
      for (const key in this.newBlog) {
        if (key === "markdownContent" || key === "toc") {
          continue;
        } else if (key === "categoryId") {
          this.newBlog[key] = resp.data.category ? resp.data.category.id : "";
        } else {
          this.newBlog[key] = resp.data[key];
        }
      }
      this.$refs.editor.invoke("setHTML", this.newBlog.htmlContent);
    },
    changeThumb(src) {
      this.newBlog.thumb = src;
    },
    editBlog() {
      this.newBlog.htmlContent = this.$refs.editor.invoke("getHTML");
      this.newBlog.markdownContent = this.$refs.editor.invoke("getMarkdown");
      if (this.mode === "add") this.newBlog.createDate = Date.now();
      let isFinsh = true;
      for (const key in this.newBlog) {
        if (key !== "thumb") {
          isFinsh = isFinsh && !!this.newBlog[key];
        }
      }
      if (!isFinsh) {
        this.$message({
          type: "error",
          message: "请完整填写内容",
        });
        return;
      }
      this.loading = true;
      if (this.mode === "add") {
        addBlog(this.newBlog).then((resp) => {
          if (!resp.code && resp.data) {
            this.loading = false;
            this.$message({
              type: "success",
              message: "添加成功",
            });
            this.$router.push({ path: "/blogList" });
          }
        });
      } else {
        changeBlog({ id: this.$route.params.id, data: this.newBlog }).then(
          (resp) => {
            if (!resp.code && resp.data) {
              this.loading = false;
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.$router.push({ path: "/blogList" });
            }
          }
        );
      }
    },
  },
  created() {
    this.getBlogType();
    if (this.mode === "edit") this.getBlog();
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
  width: 200px;
}
</style>
