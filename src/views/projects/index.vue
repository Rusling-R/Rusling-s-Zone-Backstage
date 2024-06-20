<template>
  <div class="app-container" v-loading="loading">
    <el-table :data="tableData" border>
      <el-table-column
        type="index"
        label="序号"
        header-align="center"
        align="center"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目名称"
        header-align="center"
        align="center"
        width="400"
      >
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="title">{{
            scope.row.name
          }}</a>
        </template>
      </el-table-column>
      <el-table-column label="项目描述" header-align="center">
        <template slot-scope="scope">
          <p v-html="scope.row.description"></p>
        </template>
      </el-table-column>
      <el-table-column
        label="首图预览"
        header-align="center"
        align="center"
        width="340"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.thumb" fit="cover" class="thumb"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        header-align="center"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <el-tooltip content="跳转" placement="top" :hide-after="1500">
            <el-button
              type="warning"
              circle
              size="small"
              @click="turnHandle(scope.row.github)"
            >
              <svg-icon icon-class="github" style="font-size: 12px" />
            </el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top" :hide-after="1500">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="small"
              @click="editHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top" :hide-after="1500">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="small"
              @click="deleteHandle(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑项目"
      v-loading="editForm.loading"
      :visible.sync="editForm.editing"
      top="0"
    >
      <el-form :model="editForm" label-position="top">
        <el-form-item label="项目名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input type="textarea" rows="4" v-model="editForm.description">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="finshHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProject, deleteProject, changeProject } from "@/api/project";
import Uploader from "@/components/Upload";

export default {
  components: { Uploader },
  data() {
    return {
      tableData: [],
      loading: true,
      editForm: {
        loading: false,
        editing: false,
        description: "",
        name: "",
        url: "",
        github: "",
        thumb: "",
        order: "",
        id: "",
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
    getProject() {
      getProject().then(({ data }) => {
        this.tableData = data.map((item) => {
          const temp = { ...item };
          temp.description = temp.description
            .join("\n")
            .replace(/\n/gm, "<br />");
          return temp;
        });
        this.loading = false;
      });
    },
    turnHandle(url) {
      window.open(url);
    },
    deleteHandle(id) {
      this.$confirm("此操作将永久删除该项目，是否确定？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          deleteProject(id).then((resp) => {
            if (!resp.code && resp.data) {
              this.getProject().then(() => {
                this.loading = false;
                this.$message({
                  message: "成功删除",
                  type: "success",
                });
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editHandle(row) {
      this.editForm.editing = true;
      for (const key in row) {
        if (key === "editing" || key === "loading") continue;
        if (key === "description") {
          this.editForm[key] = row[key].replace(/<br \/>/gm, "\n");
        } else {
          this.editForm[key] = row[key];
        }
      }
    },
    imgUploadHandle(src) {
      this.editForm.thumb = src;
    },
    finshHandle() {
      const temp = {
        data: {
          description: this.editForm.description.split("\n"),
          name: this.editForm.name,
          github: this.editForm.github,
          url: this.editForm.url,
          thumb: this.editForm.thumb,
          order: this.editForm.order,
        },
        id: this.editForm.id,
      };
      const isFinsh =
        !!this.editForm.name &&
        !!this.editForm.description &&
        !!this.editForm.order;
      if (!isFinsh) {
        this.$message({
          type: "error",
          message: "必须填写名称、描述、等级",
        });
        return;
      }
      this.editForm.loading = true;
      changeProject(temp).then((resp) => {
        this.editForm.loading = false;
        this.editForm.editing = false;
        this.loading = true;
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getProject();
      });
    },
    cancelEdit() {
      this.editForm.editing = false;
    },
  },
  created() {
    this.getProject();
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  line-height: 5em;
  display: block;
}
.thumb {
  min-width: 120px;
  height: 120px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
