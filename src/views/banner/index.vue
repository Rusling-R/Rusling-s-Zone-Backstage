<template>
  <div class="app-container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        type="index"
        header-align="center"
        label="序号"
        align="center"
        width="60"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        header-align="center"
        label="标题"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="description" header-align="center" label="描述">
      </el-table-column>
      <el-table-column header-align="center" label="缩略图预览" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.midImg" fit="cover">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="原图预览" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.bigImg" fit="cover">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        label="操作"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top" :hide-after="1500">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              circle
              @click="editBanner(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑信息" v-loading="uploading" :visible.sync="editing">
      <el-form :model="editBannerForm" label-position="top">
        <el-form-item label="标题">
          <el-input v-model="editBannerForm.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            rows="4"
            v-model="editBannerForm.description"
          >
          </el-input>
        </el-form-item>
        <div class="img-upload">
          <el-form-item>
            <Uploader
              title="缩略图"
              URL="/api/upload"
              :imageUrl="editBannerForm.midImg"
              @uploadFinsh="changeThumbnailSrc"
            />
          </el-form-item>
          <el-form-item>
            <Uploader
              title="原图"
              URL="/api/upload"
              :imageUrl="editBannerForm.bigImg"
              @uploadFinsh="changeOriginalSrc"
            />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditBanner">取 消</el-button>
        <el-button type="primary" @click="editFinsh">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, postBanner } from "@/api/banner";
import Uploader from "@/components/Upload";

export default {
  components: {
    Uploader,
  },
  data() {
    return {
      tableData: [],
      editing: false,
      editBannerForm: {
        id: "",
        title: "",
        description: "",
        midImg: "",
        bigImg: "",
      },
      tableLoading: true,
      uploading: false,
    };
  },
  methods: {
    editBanner(data) {
      this.editBannerForm = { ...data };
      this.editing = true;
    },
    cancelEditBanner() {
      this.editing = false;
    },
    changeOriginalSrc(src) {
      if (!src) return;
      this.editBannerForm.bigImg = src;
    },
    changeThumbnailSrc(src) {
      if (!src) return;
      this.editBannerForm.midImg = src;
    },
    async editFinsh() {
      this.uploading = true;
      let temp = [...this.tableData];
      temp.forEach((item, index) => {
        if (item.id === this.editBannerForm.id)
          temp[index] = { ...this.editBannerForm };
      });
      const resp = await postBanner(temp);
      this.tableData = resp.data;
      this.uploading = false;
      this.editing = false;
    },
    getBanner,
  },
  created() {
    this.getBanner()
      .then((resp) => {
        this.tableData = resp.data;
      })
      .catch((err) => {
        this.$message.error(err.msg);
      });
  },
};
</script>

<style lang="scss" scoped>
.img-upload {
  width: 100%;
  display: flex;
  gap: 100px;
}
.el-image {
  min-width: 120px;
  height: 120px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
