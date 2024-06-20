<template>
  <div class="app-container">
    <el-input placeholder="请输入分类名称" v-model="newType.name">
      <el-select
        v-model="newType.order"
        slot="prepend"
        placeholder="请选择级别"
      >
        <el-option
          v-for="item in order"
          :label="item.label"
          :value="item.value"
          :key="item.value"
        ></el-option>
      </el-select>
      <el-button
        class="add-btn"
        size="medium"
        type="primary"
        slot="append"
        @click="addHanle"
        >添加分类</el-button
      >
    </el-input>
    <el-table :data="tableData" border v-loading="loading">
      <el-table-column
        label="序号"
        type="index"
        width="50"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="类别"
        prop="name"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="篇数"
        prop="articleCount"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        header-align="center"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top" :hide-after="1500">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              circle
              @click="editHandle(scope.row)"
            ></el-button
          ></el-tooltip>
          <el-tooltip content="删除" placement="top" :hide-after="1500">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              circle
              @click="deleteHandle(scope.row.id)"
            ></el-button
          ></el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑信息" v-loading="uploading" :visible.sync="editing">
      <el-form :model="editForm">
        <el-form-item label="类别名称">
          <el-input v-model="editForm.data.name"></el-input>
        </el-form-item>
        <el-form-item label="类别等级">
          <el-select v-model="editForm.data.order" placeholder="请选择级别">
            <el-option
              v-for="item in order"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="editFinsh">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogType,
  deleteBlogType,
  addBlogType,
  changeBlogType,
} from "@/api/blog";

export default {
  name: "BlogType",
  data() {
    return {
      newType: {
        name: "",
        order: "",
      },
      tableData: [],
      loading: true,
      editForm: {
        id: "",
        data: {
          name: "",
          order: "",
        },
      },
      editing: false,
      uploading: false,
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
    async fetchData() {
      const resp = await getBlogType();
      this.tableData = resp.data;
      this.uploading = false;
      this.loading = false;
    },
    editHandle(row) {
      this.editing = true;
      this.editForm.id = row.id;
      this.editForm.data.name = row.name;
      this.editForm.data.order = row.order;
    },
    cancelEdit() {
      this.editing = false;
      this.editForm.id = "";
      this.editForm.data.name = "";
      this.editForm.data.order = "";
    },
    editFinsh() {
      this.uploading = true;
      changeBlogType(this.editForm).then((resp) => {
        if (!resp.code && resp.data) {
          this.$message({ type: "success", message: "成功修改" });
          this.cancelEdit();
          this.loading = true;
          this.fetchData();
        }
      });
    },
    addHanle() {
      if (!this.newType.name) {
        this.$message({ type: "error", message: "请填写类别名称" });
        return;
      }
      if (!this.newType.order) {
        this.$message({ type: "error", message: "请选择等级" });
        return;
      }
      this.newType.order = this.newType.order
        ? this.newType.order
        : this.order[this.order.length - 1]["value"];
      this.loading = true;
      addBlogType(this.newType).then(() => {
        this.fetchData();
        this.newType.name = "";
        this.$message({ type: "success", message: "成功添加" });
      });
    },
    deleteHandle(id) {
      this.$confirm(
        "删除分类后，分类下的所有文章将变为无分类状态！",
        "确定删除？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.loading = true;
          deleteBlogType(id).then((resp) => {
            if (!resp.data && !resp.code) {
              this.fetchData().then(() => {
                this.$message({ type: "success", message: "成功删除" });
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
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  min-width: 500px;
  width: 50%;
}
.el-select {
  width: 120px;
}
.el-table {
  margin: 50px 0;
}
</style>
