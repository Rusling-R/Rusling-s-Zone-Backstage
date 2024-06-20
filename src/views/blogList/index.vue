<template>
  <div class="app-container">
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column
        label="序号"
        header-align="center"
        align="center"
        width="50"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 + pageLimit * (currPage - 1) }}
        </template>
      </el-table-column>
      <el-table-column label="文章名称" header-align="center" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title="内容图片预览"
            trigger="hover"
            width="280"
            :open-delay="1500"
          >
            <el-image :src="scope.row.thumb" fit="cover"></el-image>
            <a
              :href="`/blog/details/${scope.row.id}`"
              target="_blank"
              slot="reference"
              class="title"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="文章描述"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="scanNumber"
        label="浏览量"
        header-align="center"
        align="center"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="commentNumber"
        label="评论数"
        header-align="center"
        align="center"
        width="80"
      >
      </el-table-column>
      <el-table-column
        label="分类"
        header-align="center"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.category ? scope.row.category.name : "未分类" }}
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        header-align="center"
        align="center"
        width="240"
      >
        <template slot-scope="scope">
          {{ format(scope.row.createDate) }}
        </template>
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
              @click="editHandle(scope.row.id)"
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
    <el-pagination
      background
      :total="total"
      :current-page="currPage"
      :pager-count="11"
      :page-sizes="[5, 10, 20]"
      :page-size.sync="pageLimit"
      layout="prev, pager, next, total, ->, sizes, jumper"
      @size-change="sizeChangeHandle"
      @current-change="currChangeHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getBlogList, deleteBlog } from "@/api/blog";
import format from "@/utils/format";

export default {
  name: "BlogList",
  data() {
    return {
      loading: true,
      total: 0,
      tableData: [],
      currPage: 1,
      pageLimit: 10,
    };
  },
  methods: {
    async fetchData() {
      const resp = await getBlogList(this.currPage, this.pageLimit);
      this.tableData = resp.data.rows;
      this.total = resp.data.total;
      if (this.currPage * this.pageLimit > this.total)
        this.currPage = Math.ceil(this.total / this.pageLimit);
      this.loading = false;
    },
    sizeChangeHandle(limit) {
      this.pageLimit = limit;
      this.currPage = 1;
      this.loading = true;
      this.fetchData();
    },
    currChangeHandle(currPage) {
      this.currPage = currPage;
      this.loading = true;
      this.fetchData();
    },
    deleteHandle(id) {
      this.$confirm("此操作将永久删除该文章，是否确定？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteBlog(id).then((resp) => {
            if (!resp.code && resp.data) {
              this.fetchData().then(() => {
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
    editHandle(id) {
      this.$router.push({ path: `/editBlog/${id}` });
    },
    format,
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin: 50px 0;
}
.el-image {
  width: 100%;
  display: block;
}
.title {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
