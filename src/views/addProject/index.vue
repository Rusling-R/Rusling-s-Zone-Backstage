<template>
  <div class="app-container" v-loading="loading">
    <el-form :model="editForm" label-position="top">
      <el-form-item label="项目名称">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input type="textarea" rows="10" v-model="editForm.description">
        </el-input>
      </el-form-item>
      <el-form-item label="项目链接">
        <el-input v-model="editForm.url"></el-input>
      </el-form-item>
      <el-form-item label="GitHub地址">
        <el-input v-model="editForm.github"></el-input>
      </el-form-item>
      <div class="imgUpload">
        <el-form-item>
          <Uploader
            title="项目预览图"
            URL="/api/upload"
            :imageUrl="editForm.thumb"
            @uploadFinsh="imgUploadHandle"
          />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="editForm.order" placeholder="请选择级别">
            <el-option
              v-for="item in order"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-button type="primary" @click="finshHandle">确 定</el-button>
    </el-form>
  </div>
</template>

<script>
import { addProject } from "@/api/project";
import Uploader from "@/components/Upload";

export default {
  components: {
    Uploader,
  },
  data() {
    return {
      loading: false,
      editForm: {
        description: "",
        name: "",
        url: "",
        github: "",
        thumb: "",
        order: "",
      },
      order: [
        { label: "1级", value: 1 },
        { label: "2级", value: 2 },
        { label: "3级", value: 3 },
        { label: "4级", value: 4 },
        { label: "5级", value: 5 },
      ],
    };
  },
  methods: {
    imgUploadHandle(src) {
      this.editForm.thumb = src;
    },
    finshHandle() {
      const isFinsh =
        !!this.editForm.name &&
        !!this.editForm.description &&
        !!this.editForm.order &&
        !!this.editForm.url &&
        !!this.editForm.github &&
        !!this.editForm.thumb;
      if (!isFinsh) {
        this.$message({
          type: "error",
          message: "必须填写名称、描述、等级",
        });
        return;
      }
      const temp = { ...this.editForm };
      temp.description = temp.description.split("\n");
      this.loading = true;
      addProject(temp).then((resp) => {
        this.loading = false;
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.$router.push({ path: "projectsList" });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  margin-top: 50px;
  width: 150px;
}
</style>
